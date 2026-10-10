// A stand-in Unibrain for documentation screenshots: the real web app files and the real vault and rendering code
// from the app's repo, over the made-up notes in ./vault. No sign-in, no GitHub, nothing saved outside a temp folder.
//
//   APP_REPO=../../../second-brain-mcp  (default)   the app's repo: its public/ and src/ are used as they are
//   PORT=8788
//   VAULT_DIR=./vault  (default)   the notes to serve; point it at any folder of Markdown to try that vault
import http from 'node:http'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const APP = path.resolve(process.env.APP_REPO ?? path.join(HERE, '../../../second-brain-mcp'))
const PORT = Number(process.env.PORT ?? 8788)
// The notes to serve: the made-up demo vault, or any folder of Markdown (e.g. a real Obsidian vault, to try it out)
const VAULT_DIR = path.resolve(process.env.VAULT_DIR ?? path.join(HERE, 'vault'))
const { Vault } = await import(path.join(APP, 'src/vault.ts'))
const { renderNote } = await import(path.join(APP, 'src/render.ts'))
const { wikiTextFor } = await import(path.join(APP, 'src/links.ts'))
const PUBLIC = path.join(APP, 'public')
const KATEX = path.join(APP, 'node_modules/katex/dist')
const TYPES: Record<string, string> = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2' }
const HOUR = 3600_000

const day = (offset: number) => new Date(Date.now() + offset * 24 * HOUR).toLocaleDateString('sv-SE')
const sha = (s: string) => crypto.createHash('sha256').update(s).digest('hex')

type Version = { commit: string; author: string; date: string; message: string; path: string; content: string }
type Recent = { path: string; title: string; date: string; author: string }
let root = ''
let vault: InstanceType<typeof Vault>
let recent: Recent[] = []
let history = new Map<string, Version[]>()

/** Copy ./vault to a fresh temp folder (due dates made relative to today) and rebuild the made-up history. */
function reset() {
  if (root) fs.rmSync(root, { recursive: true, force: true })
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'unibrain-demo-'))
  const copy = (from: string, to: string) => {
    fs.mkdirSync(to, { recursive: true })
    for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
      if (entry.name === '.git') continue
      const a = path.join(from, entry.name)
      const b = path.join(to, entry.name)
      if (entry.isDirectory()) copy(a, b)
      else if (/\.md$/i.test(entry.name)) fs.writeFileSync(b, fs.readFileSync(a, 'utf8').replace(/\{\{([+-]\d+)d\}\}/g, (_m, n) => day(Number(n))))
      else fs.copyFileSync(a, b) // pictures and other attachments, byte for byte
    }
  }
  copy(VAULT_DIR, root)
  vault = new Vault(root, 'Europe/Rome')

  // Who changed what, and when: made up, newest first
  const changed: [string, string, number][] = [
    ['travel/Weekend in Siena.md', 'Igor (claude, brain-mcp)', 2],
    ['tech/Kafka Tiered Storage.md', 'Igor (claude, brain-mcp)', 5],
    ['Projects/Launch Plan.md', 'claude (brain-mcp)', 20],
    ['travel/Tuscany Wine Notes.md', 'chatgpt (brain-mcp)', 26],
    ['home/House Admin.md', 'web (brain-mcp)', 49],
    ['talks/Team Update.md', 'claude (brain-mcp)', 70],
    ['tech/System Overview.md', 'claude-code (brain-mcp)', 96],
    ['inbox/Reading List.md', 'web (brain-mcp)', 120],
  ]
  recent = changed
    .filter(([p]) => fs.existsSync(path.join(root, p)))
    .map(([p, author, hoursAgo]) => ({ path: p, title: path.posix.basename(p, '.md'), date: new Date(Date.now() - hoursAgo * HOUR).toISOString(), author }))
  history = new Map()
  // Another vault (VAULT_DIR): there is no made-up history for it, and "recently changed" is simply its newest files
  if (!recent.length) {
    const all: { p: string; at: number }[] = []
    const walk = (dir: string, rel: string) => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (e.name.startsWith('.')) continue
        if (e.isDirectory()) walk(path.join(dir, e.name), rel ? `${rel}/${e.name}` : e.name)
        else if (/\.md$/i.test(e.name)) all.push({ p: rel ? `${rel}/${e.name}` : e.name, at: fs.statSync(path.join(VAULT_DIR, rel, e.name)).mtimeMs })
      }
    }
    walk(root, '')
    recent = all.sort((a, b) => b.at - a.at).slice(0, 25).map(({ p, at }) => ({ path: p, title: path.posix.basename(p, '.md'), date: new Date(at).toISOString(), author: 'obsidian' }))
    return
  }

  // One note with a history worth looking at: Claude wrote it, you edited it for a while, then an agent updated it
  const p = 'travel/Weekend in Siena.md'
  const now = fs.readFileSync(path.join(root, p), 'utf8')
  const first = now
    .replace('- [x] Train from Florence, 9:10', '- [ ] Train from Florence')
    .replace('| Dinner | 45 | 90 |\n', '')
    .replace('\n> [!tip] Book ahead\n> The Duomo floor is only uncovered in **autumn**. Reserve a slot online.\n', '')
    .replace('Booked through ==Hotel Athena==; see', 'Hotel to be decided; see')
  const second = first.replace('Hotel to be decided; see', 'Booked through ==Hotel Athena==; see')
  record(p, first, 'claude (brain-mcp)', 'note: add Weekend in Siena (claude)', 72 * 60)
  for (let i = 5; i >= 1; i--) record(p, i === 1 ? second : first + ' '.repeat(i), 'web (brain-mcp)', `update: edit ${p} (web)`, 26 * 60 + i * 4)
  record(p, now, 'Igor (claude, brain-mcp)', `update: edit ${p} (igor via claude)`, 2 * 60)
}

function record(p: string, content: string, author: string, message: string, minutesAgo = 0) {
  const date = new Date(Date.now() - minutesAgo * 60_000).toISOString()
  const list = history.get(p) ?? []
  list.unshift({ commit: sha(content + date).slice(0, 40), author, date, message, path: p, content })
  history.set(p, list)
}


// ── Made-up data for the Agents page (mission control), in the shape the real server returns ──
let agentsOn = false // the Agents page (alpha) is off until a screenshot turns it on: POST /demo/agents {on: true}
const AGO = (hours: number) => new Date(Date.now() - hours * HOUR).toISOString()
const RUN_ID = 'a'.repeat(32)
const demoAgents = () => ({
  summary: { agents: 7, healthy: 6, needs: 3, problems: 1 },
  needs: [
    { kind: 'proposals', text: '3 proposals to approve or reject', detail: 'Tidy-up 2026-10-04 · T13–T16', action: 'Review', href: '#/note/reports/Tidy-up%202026-10-04.md', at: null },
    { kind: 'attention', text: 'Car insurance renews 30 Nov', detail: 'from Bills watcher', action: 'Open', href: '#/note/home/House%20Admin.md', at: AGO(60) },
    { kind: 'agent', text: "OpenClaw hasn't run", detail: 'expected daily 08:00 · 3 days late', action: 'Details', href: '#/agents/openclaw', at: AGO(72) },
  ],
  agents: [
    { id: 'openclaw', name: 'OpenClaw', schedule: 'daily 08:00', state: 'overdue', lastSeen: AGO(80), due: AGO(8), lateMs: 72 * HOUR },
    { id: 'claude-code', name: 'Claude Code', schedule: 'on demand', state: 'active', lastSeen: AGO(0.3), run: { run_id: RUN_ID, status: 'open', start: AGO(0.5), tools: 44 } },
    { id: 'weekly-tidy-up', name: 'Weekly tidy-up', schedule: 'Sun 07:00', state: 'ok', lastSeen: AGO(100), due: AGO(100), run: { run_id: RUN_ID, status: 'ok', start: AGO(100), end: AGO(99.98), summary: '1 change, 3 proposals', tools: 31 } },
    { id: 'news-digest', name: 'News digest', schedule: 'daily 07:30', state: 'ok', lastSeen: AGO(3), due: AGO(3), run: { run_id: RUN_ID, status: 'ok', start: AGO(3), end: AGO(2.99), summary: '5 stories saved to Reading List', tools: 6 } },
    { id: 'bills-watcher', name: 'Bills watcher', schedule: 'Mon 08:52', state: 'ok', lastSeen: AGO(60), due: AGO(60), run: { run_id: RUN_ID, status: 'ok', start: AGO(60), end: AGO(59.99), summary: '1 new bill, due 30 Nov', tools: 9 } },
    { id: 'hermes', name: 'Hermes', schedule: 'on demand', state: 'idle', lastSeen: AGO(44), run: { run_id: RUN_ID, status: 'unreported', start: AGO(44.2), end: AGO(44), tools: 4 } },
    { id: 'igor', name: 'Igor', schedule: 'on demand', state: 'idle', lastSeen: AGO(170) },
    { id: 'old-bot', name: 'Old bot', schedule: 'daily 06:00', state: 'off', lastSeen: null },
  ],
  unknown: [{ name: 'chatgpt', app: 'chatgpt', lastSeen: AGO(26), tools: 0, commits: 2 }],
  timeline: [
    { at: AGO(0.3), agent: 'Claude Code', agent_id: 'claude-code', kind: 'commit', text: 'changed Kafka Tiered Storage and 2 more', detail: 'update: replace section in Kafka Tiered Storage', note: 'tech/Kafka Tiered Storage.md' },
    { at: AGO(2.99), agent: 'News digest', agent_id: 'news-digest', kind: 'run', text: '5 stories saved to Reading List', detail: '33s · 6 tool calls · 41k tokens · 1 commit', run_id: RUN_ID, status: 'ok' },
    { at: AGO(26), agent: 'chatgpt', kind: 'commit', text: 'changed Tuscany Wine Notes', detail: 'update: append to Tuscany Wine Notes', note: 'travel/Tuscany Wine Notes.md' },
    { at: AGO(30), agent: 'Hermes', agent_id: 'hermes', kind: 'run', text: 'Could not reach the calendar', detail: '12s · 3 tool calls', run_id: RUN_ID, status: 'error' },
    { at: AGO(44), agent: 'Hermes', agent_id: 'hermes', kind: 'run', text: '4 tool calls, no report', detail: '720s · 4 tool calls', run_id: RUN_ID, status: 'unreported' },
  ],
  range: 'week',
  registryFolder: 'Agents/Registry',
  registryProblems: [],
})
const demoAgent = (id: string) => {
  const a = demoAgents().agents.find((x) => x.id === id)
  if (!a) return null
  return {
    card: { id: a.id, name: a.name, description: id === 'news-digest' ? 'Saves the day\'s most relevant stories to the Reading List' : 'An example agent', host: 'Claude scheduled task', apps: ['claude'], schedule: a.schedule, timezone: 'Europe/Rome', model: 'claude-sonnet-5-5', skills: ['reading-list'], enabled: a.state !== 'off', note: 'inbox/Reading List.md' },
    state: a.state, lastSeen: a.lastSeen, due: (a as { due?: string }).due,
    runs: [
      { run_id: RUN_ID, status: 'ok', start: AGO(3), end: AGO(2.99), summary: '5 stories saved to Reading List', tools: 6, commits: 1, notes: 1 },
      { run_id: RUN_ID, status: 'error', start: AGO(27), end: AGO(26.99), error: 'Two of the sources could not be reached', tools: 2, commits: 0, notes: 1 },
      { run_id: RUN_ID, status: 'unreported', start: AGO(51), end: AGO(50.9), tools: 5, commits: 1, notes: 2 },
    ],
  }
}
const demoRun = () => ({
  run: { run_id: RUN_ID, agent: 'News digest', agent_name: 'News digest', agent_id: 'news-digest', app: 'claude', start: AGO(3), last: AGO(2.991), end: AGO(2.99), status: 'partial', summary: '4 stories saved, one source failed', error: 'One source asked for a sign-in and was skipped', model: 'claude-sonnet-5-5', input_tokens: 41200, output_tokens: 880, needs_attention: [{ text: 'Check the story about Kafka 4.0', note: 'inbox/Reading List.md' }], tools: 4, errors: 1, commits: ['a73eeb1'], notes: ['inbox/Reading List.md'] },
  spans: [
    { tool: 'vault_guide', start: AGO(3), ms: 12, status: 'ok', note: null, commit: null },
    { tool: 'read_note', start: AGO(2.998), ms: 48, status: 'ok', note: 'inbox/Reading List.md', commit: null },
    { tool: 'add_link', start: AGO(2.995), ms: 30, status: 'error', note: 'inbox/Reading List.md', commit: null },
    { tool: 'append_to_note', start: AGO(2.992), ms: 540, status: 'ok', note: 'inbox/Reading List.md', commit: 'a73eeb1' },
  ],
})

const json = (res: http.ServerResponse, code: number, data: unknown) => {
  res.writeHead(code, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}
const render = async (p: string, content: string) => renderNote(content, { notePath: p, files: await vault.files(), slides: { theme: 'default', dark: false, pageNumbers: true, size: '16:9' } })

async function api(name: string, method: string, query: URLSearchParams, body: Record<string, unknown>): Promise<[number, unknown]> {
  const p = query.get('path') ?? ''
  const { settings, problems } = vault.loadSettings()
  // The Agents page: made-up answers (see demoAgents above); ?off=1 on /demo/agents turns the feature off
  if (method === 'GET' && name === 'agents') return agentsOn ? [200, { ...demoAgents(), range: query.get('range') ?? 'week' }] : [404, { error: 'Not found' }]
  if (method === 'GET' && name.startsWith('agents/')) { const a = agentsOn ? demoAgent(decodeURIComponent(name.slice(7))) : null; return a ? [200, a] : [404, { error: 'No such agent' }] }
  if (method === 'GET' && name.startsWith('runs/')) return agentsOn ? [200, demoRun()] : [404, { error: 'Not found' }]
  switch (`${method} ${name}`) {
    case 'GET me':
      return [200, { login: 'alice', repo: 'alice/second-brain', appName: 'Unibrain', archiveFolder: settings.archiveFolder, inboxFolder: 'inbox', askProvider: settings.askProvider, askClaudePrompt: settings.askClaudePrompt, timeZone: settings.timeZone, timeZoneSaved: true, admin: false, missionControl: { available: true, enabled: agentsOn } }]
    case 'GET settings':
      return [200, { settings: { ...settings, inboxFolder: 'inbox' }, defaults: vault.defaults, problems, serverAppName: 'Unibrain', folders: await vault.folders(), timeZones: Intl.supportedValuesOf('timeZone') }]
    case 'GET recent': {
      const files = (await vault.files()).filter((f) => /\.md$/i.test(f) && !vault.inArchive(f))
      const todos = (await vault.taskBoard()).notes.reduce((n, note) => n + note.tasks.length, 0)
      if (query.get('nocounts') === '1') return [200, { notes: recent }] // an older saved reply, for checking the page copes
      return [200, { notes: recent, favorites: settings.favorites.map((f) => ({ path: f, title: path.posix.basename(f, '.md') })), counts: { notes: files.length, todos }, ...(agentsOn ? { agents: query.get('agents') === 'problem' ? { text: 'Agents: 1 failing', level: 'problem' } : query.get('agents') === 'ok' ? { text: 'Agents: OK', level: 'ok' } : { text: 'Agents: 3 for you', level: 'attention' } } : {}) }]
    }
    case 'POST favorite':
      return [200, { favorite: (await vault.setFavorite(String(body.path), body.on === true)).includes(String(body.path)) }]
    // Made up like the rest of the history: a note with recorded versions shows its real last change,
    // any other note shows its last few lines as just added
    case 'GET changes': {
      const limit = Math.min(25, Number(query.get('limit')) || 5)
      const list = recent.filter((r) => query.get('all') === '1' || r.author !== 'web (brain-mcp)')
      const changes = await Promise.all(list.slice(0, limit).map(async (r) => {
        const after = await vault.read(r.path)
        const versions = history.get(r.path) ?? []
        const lines = after.trimEnd().split('\n')
        const before = versions[1]?.content ?? `${lines.slice(0, -3).join('\n')}\n`
        return { path: r.path, title: r.title, author: r.author, date: r.date, from: r.date, saves: 1, created: false, before, after }
      }))
      return [200, { changes, more: list.length > limit }]
    }
    case 'GET search': {
      const q = (query.get('q') ?? '').trim()
      const tags = [...q.matchAll(/(?:^|\s)#([^\s#]+)/g)].map((m) => m[1])
      const words = q.replace(/(?:^|\s)#[^\s#]+/g, ' ').trim()
      return [200, { results: words || tags.length ? await vault.search(words, '', tags.length ? 200 : 40, tags) : [] }]
    }
    case 'GET list':
      return [200, await vault.list(query.get('folder') ?? '')]
    case 'GET folders':
      return [200, { folders: await vault.folders() }]
    case 'GET tasks':
      return [200, await vault.taskBoard(query.get('done') === '1')]
    case 'GET tags':
      return [200, { tags: Object.keys(await vault.tags()) }]
    case 'GET links': {
      const files = await vault.files()
      return [200, { notes: files.filter((f: string) => f.toLowerCase().endsWith('.md')).map((f: string) => ({ path: f, link: wikiTextFor(f, files) })) }]
    }
    case 'GET backlinks': {
      const { backlinks } = await vault.links(p)
      const seen = new Set<string>()
      return [200, { backlinks: backlinks.filter((b: { from: string }) => !seen.has(b.from) && seen.add(b.from)).map((b: { from: string; context: string }) => ({ path: b.from, title: path.posix.basename(b.from, '.md'), context: b.context })) }]
    }
    case 'GET note': {
      const content = await vault.read(p)
      const r = await render(p, content)
      return [200, { path: p, title: r.title, html: r.html, properties: r.properties, deck: r.deck, content, hash: sha(content), favorite: settings.favorites.includes(p) }]
    }
    case 'PUT note': {
      await vault.writeNote(String(body.path), String(body.content))
      record(String(body.path), String(body.content), 'web (brain-mcp)', `update: edit ${body.path} (web)`)
      return [200, { hash: sha(String(body.content)) }]
    }
    case 'POST preview': {
      const r = await render(String(body.path ?? 'Untitled.md'), String(body.content ?? ''))
      return [200, { html: r.html, deck: r.deck }]
    }
    case 'POST task': {
      await vault.setTask(String(body.path), String(body.text), body.done === 'rejected' ? 'rejected' : Boolean(body.done), Number(body.line))
      const content = await vault.read(String(body.path))
      return [200, { content, hash: sha(content) }]
    }
    case 'GET file': {
      // Handled before this function (it isn't JSON); listed here so the default below never answers for it
      return [404, { error: 'not found' }]
    }
    case 'GET history':
      return [200, { versions: (history.get(p) ?? []).map(({ content, ...v }) => v) }]
    case 'GET version': {
      const v = (history.get(p) ?? []).find((x) => x.commit === query.get('commit'))
      if (!v) return [404, { error: 'No such version of this note' }]
      const { content, ...version } = v
      return [200, { content, version }]
    }
    case 'POST diagram': {
      // The real server draws these with its own Kroki; here the public one does (demo diagrams only)
      const r = await fetch(`https://kroki.io/${body.type}/svg`, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: String(body.source) })
      return r.ok ? [200, { svg: await r.text() }] : [422, { error: `Diagram not drawn (kroki.io answered ${r.status})` }]
    }
    default:
      return [200, {}]
  }
}

/** Things only the screenshot script asks for: start over, or have an "agent" write a note. */
async function demo(name: string, body: Record<string, unknown>): Promise<[number, unknown]> {
  if (name === 'agents') {
    agentsOn = body.on !== false
    return [200, { on: agentsOn }]
  }
  if (name === 'reset') {
    reset()
    agentsOn = false
    return [200, { ok: true }]
  }
  if (name === 'agent-write') {
    const p = String(body.path)
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true })
    fs.writeFileSync(path.join(root, p), String(body.content))
    const author = String(body.author ?? 'claude (brain-mcp)')
    recent = [{ path: p, title: path.posix.basename(p, '.md'), date: new Date().toISOString(), author }, ...recent.filter((r) => r.path !== p)]
    record(p, String(body.content), author, `note: add ${path.posix.basename(p, '.md')}`)
    return [200, { ok: true }]
  }
  return [404, { error: 'unknown' }]
}

reset()
http.createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://x')
  const chunks: Buffer[] = []
  req.on('data', (c) => chunks.push(c)).on('end', async () => {
    try {
      const isApi = url.pathname.startsWith('/app/api/web/')
      if (url.pathname === '/app/api/web/file') {
        // Pictures and other attachments, from inside the temporary vault only
        const full = path.resolve(root, url.searchParams.get('path') ?? '')
        if (!full.startsWith(root + path.sep) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) { res.writeHead(404); return res.end() }
        const type = ({ '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.pdf': 'application/pdf' } as Record<string, string>)[path.extname(full).toLowerCase()] ?? 'application/octet-stream'
        res.writeHead(200, { 'Content-Type': type })
        return fs.createReadStream(full).pipe(res)
      }
      if (isApi || url.pathname.startsWith('/demo/')) {
        const raw = Buffer.concat(chunks).toString()
        const body = raw.startsWith('{') ? JSON.parse(raw) : {}
        const [code, data] = isApi ? await api(url.pathname.slice('/app/api/web/'.length), req.method ?? 'GET', url.searchParams, body) : await demo(url.pathname.slice('/demo/'.length), body)
        return json(res, code, data)
      }
      const rel = url.pathname.replace(/^\/app\/?/, '') || 'index.html'
      const full = rel.startsWith('vendor/katex/') ? path.join(KATEX, rel.slice(13)) : path.join(PUBLIC, rel)
      if (!(full.startsWith(PUBLIC) || full.startsWith(KATEX)) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
        res.writeHead(404)
        return res.end('not found')
      }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(full)] || 'application/octet-stream', 'Cache-Control': 'no-store' })
      fs.createReadStream(full).pipe(res)
    } catch (err) {
      json(res, 400, { error: (err as Error).message })
    }
  })
}).listen(PORT, '127.0.0.1', () => console.log(`demo vault on http://127.0.0.1:${PORT}/app/`))
