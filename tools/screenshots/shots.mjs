// Takes every screenshot and animation the docs use, from the demo vault (see README.md).
// Start the demo server first (`npm run server`), then `npm run shots`. Needs Chrome and, for animations, ffmpeg.
//
//   node shots.mjs            everything
//   node shots.mjs editor     only the pictures whose name contains "editor"
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(HERE, '../../docs/assets/images')
const FRAMES = path.join(HERE, '.frames')
const ORIGIN = process.env.DEMO_URL ?? 'http://127.0.0.1:8788'
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const only = process.argv[2]
const SIENA = 'travel/Weekend%20in%20Siena.md'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true })

/** A phone-sized page on the demo app, starting from an untouched vault. */
async function open(hash, { width = 390, height = 780, scale = 2, keep = false } = {}) {
  if (!keep) await fetch(`${ORIGIN}/demo/reset`, { method: 'POST' })
  const page = await (await browser.createBrowserContext()).newPage()
  await page.setCacheEnabled(false)
  await page.setViewport({ width, height, isMobile: true, hasTouch: true, deviceScaleFactor: scale })
  await page.goto(`${ORIGIN}/app/${hash}`, { waitUntil: 'networkidle0' })
  await calm(page)
  return page
}
/** The same, with the Agents page (alpha) turned on in the demo server. `open` resets the demo, which turns it off again. */
async function agents(hash, options = {}) {
  await fetch(`${ORIGIN}/demo/reset`, { method: 'POST' })
  await fetch(`${ORIGIN}/demo/agents`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ on: true }) })
  return open(hash, { ...options, keep: true })
}
/** No red spelling squiggles in the pictures. */
const calm = (page) => page.evaluate(() => { const c = document.querySelector('.cm-content'); if (c) c.spellcheck = false })
const line = (page, text) => page.evaluateHandle((t) => [...document.querySelectorAll('.cm-line')].find((l) => l.textContent.includes(t)), text)
const clickText = (page, selector, text) => page.evaluate((s, t) => [...document.querySelectorAll(s)].find((e) => e.textContent.trim() === t)?.click(), selector, text)

/** An animation: call frame(seconds) after each step; it becomes a GIF 480 px wide. */
async function animate(name, page, steps) {
  fs.rmSync(FRAMES, { recursive: true, force: true })
  fs.mkdirSync(FRAMES, { recursive: true })
  const list = []
  const frame = async (seconds) => {
    const file = `f${String(list.length).padStart(3, '0')}.png`
    await page.screenshot({ path: path.join(FRAMES, file) })
    list.push(`file '${file}'\nduration ${seconds}`)
  }
  await steps(frame)
  // The concat format needs the last file named twice for its duration to count
  fs.writeFileSync(path.join(FRAMES, 'list.txt'), `${list.join('\n')}\n${list.at(-1).split('\n')[0]}\n`)
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', 'list.txt', '-vf', 'scale=480:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=bayer:bayer_scale=4', '-loop', '0', path.join(OUT, name)], { cwd: FRAMES })
  fs.rmSync(FRAMES, { recursive: true, force: true })
}

const shots = {
  // ── The web app ──
  'shot-home.png': async (file) => {
    const page = await open('#/')
    await page.waitForSelector('.item-title'); await sleep(300)
    await page.screenshot({ path: file })
  },
  'shot-note.png': async (file) => {
    const page = await open('#/note/tech/Kafka%20Tiered%20Storage.md')
    await page.waitForSelector('.content svg'); await sleep(500)
    await page.screenshot({ path: file })
  },
  'shot-tasks.png': async (file) => {
    const page = await open('#/tasks')
    await page.waitForSelector('.task-list, details'); await sleep(300)
    await clickText(page, 'button', 'Expand all'); await sleep(300)
    await page.screenshot({ path: file })
  },
  'shot-history.png': async (file) => {
    const page = await open(`#/history/${SIENA}`)
    await page.waitForSelector('.diff .diff-line'); await sleep(400)
    await page.select('.diff-pick select', await page.evaluate(() => document.querySelectorAll('.diff-pick option')[1].value)); await sleep(700)
    await page.screenshot({ path: file })
  },
  'shot-organize.png': async (file) => {
    const page = await open(`#/note/${SIENA}`)
    await page.waitForSelector('.chip-btn.organize'); await sleep(400)
    await page.evaluate(() => document.querySelector('.chip-btn.organize').click())
    await page.waitForSelector('.sheet'); await sleep(500)
    await page.screenshot({ path: file })
  },
  'shot-settings.png': async (file) => {
    const page = await open('#/settings')
    await page.waitForSelector('form, .form'); await sleep(400)
    await page.screenshot({ path: file })
  },

  // ── Writing ──
  'shot-editor.png': async (file) => {
    const page = await open(`#/edit/${SIENA}`)
    await page.waitForSelector('.cm-block svg'); await sleep(800)
    await (await line(page, 'Two days in')).tap(); await sleep(400)
    await page.screenshot({ path: file })
  },
  'shot-properties.png': async (file) => {
    const page = await open(`#/edit/${SIENA}`)
    await page.waitForSelector('.cm-props'); await sleep(600)
    await page.tap('.cm-props-head'); await sleep(400)
    await page.screenshot({ path: file })
  },
  'shot-suggest.png': async (file) => {
    const page = await open(`#/edit/${SIENA}`)
    await page.waitForSelector('.cm-block svg'); await sleep(600)
    await (await line(page, 'Dinner at Osteria')).tap(); await sleep(300)
    await page.keyboard.press('End'); await page.keyboard.type(', from [[Si'); await sleep(900)
    await page.screenshot({ path: file })
  },
  'editor-live.gif': async () => {
    const page = await open(`#/edit/${SIENA}`, { scale: 1.5 })
    await page.waitForSelector('.cm-block svg'); await sleep(800)
    await animate('editor-live.gif', page, async (frame) => {
      await frame(1.4)
      await (await line(page, 'Two days in')).tap(); await sleep(300); await frame(1.8)
      await (await line(page, 'Dinner at Osteria')).tap(); await sleep(300); await page.keyboard.press('End'); await frame(0.7)
      await page.keyboard.press('Enter'); await sleep(150); await frame(0.6)
      for (const chunk of ['Wine', ' tasting', ', see ', '[[', 'Tu', 's']) {
        await page.keyboard.type(chunk)
        await sleep(['[[', 'Tu', 's'].includes(chunk) ? 600 : 120)
        await frame(chunk === 's' ? 1.3 : 0.28)
      }
      await page.keyboard.press('Enter'); await sleep(300); await frame(1.2)
      await page.evaluate(() => [...document.querySelectorAll('.cm-task')].find((b) => !b.checked).click()); await sleep(300); await frame(0.9)
      await (await line(page, 'Sunday is for')).tap().catch(() => {}); await sleep(300); await frame(2.2)
    })
  },

  // ── An agent writes a note and it shows up on the phone ──
  'agent-writes.gif': async () => {
    const page = await open('#/', { scale: 1.5 })
    await page.waitForSelector('.item-title'); await sleep(300)
    await animate('agent-writes.gif', page, async (frame) => {
      await frame(1.6)
      await fetch(`${ORIGIN}/demo/agent-write`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        path: 'travel/Florence Day Trip.md',
        author: 'claude (brain-mcp)',
        content: '---\ntitle: Florence Day Trip\ntags:\n  - italy\n  - itinerary\nsource: claude\n---\n\n# Florence Day Trip\n\n> [!abstract] In short\n> One day, three stops, all within a **20 minute walk** of the station.\n\n## The plan\n\n- [ ] Uffizi at opening, 8:15 (book ahead)\n- [ ] Lunch at the Mercato Centrale\n- [ ] Sunset from Piazzale Michelangelo\n\n```mermaid\nflowchart LR\n  S[Station] --> U[Uffizi] --> M[Mercato] --> P[Piazzale]\n```\n\nFits before the [[Weekend in Siena]].\n',
      }) })
      await page.reload({ waitUntil: 'networkidle0' }); await page.waitForSelector('.item-title'); await sleep(300)
      await frame(2.2)
      await page.evaluate(() => [...document.querySelectorAll('a')].find((a) => a.textContent.includes('Florence Day Trip')).click())
      await page.waitForSelector('.content svg'); await sleep(500)
      await frame(3)
    })
  },

  // ── Mission control: the Agents page (alpha), which the demo server answers with made-up data ──
  'shot-agents.png': async (file) => {
    const page = await agents('#/agents')
    await page.waitForSelector('.agent-row'); await sleep(300)
    await page.screenshot({ path: file })
  },
  'shot-agents-timeline.png': async (file) => {
    const page = await agents('#/agents')
    await page.waitForSelector('.timeline'); await sleep(300)
    await page.evaluate(() => { [...document.querySelectorAll('.section-title')].find((e) => e.textContent === 'Unknown agents').scrollIntoView(); window.scrollBy(0, -70) }); await sleep(300)
    await page.screenshot({ path: file })
  },
  'shot-agent.png': async (file) => {
    const page = await agents('#/agents/news-digest')
    await page.waitForSelector('.agent-card'); await sleep(300)
    await page.screenshot({ path: file })
  },
  'shot-run.png': async (file) => {
    const page = await agents(`#/run/${'a'.repeat(32)}`, { height: 960 })
    await page.waitForSelector('.agent-card'); await sleep(300)
    await page.screenshot({ path: file })
  },
  'shot-agents-home.png': async (file) => {
    const page = await agents('#/')
    await page.waitForSelector('.home-stats a'); await sleep(300)
    await page.screenshot({ path: file, clip: { x: 0, y: 0, width: 390, height: 300 } })
  },
  'shot-agents-settings.png': async (file) => {
    const page = await agents('#/settings')
    await page.waitForSelector('form'); await sleep(400)
    // A clip is measured from the top of the page, not of the screen
    const top = await page.evaluate(() => [...document.querySelectorAll('.section-title')].find((e) => e.textContent.startsWith('Agents page')).getBoundingClientRect().top + window.scrollY)
    await page.screenshot({ path: file, clip: { x: 0, y: top - 12, width: 390, height: 330 } })
  },

  // ── Slides ──
  'shot-slides.png': async (file) => {
    const page = await open('#/note/talks/Team%20Update.md')
    await page.waitForSelector('.deck, section'); await sleep(900)
    await page.screenshot({ path: file })
  },
  'shot-present.png': async (file) => {
    // A phone turned on its side
    const page = await open('#/note/talks/Team%20Update.md', { width: 780, height: 390 })
    await page.waitForSelector('.deck, section'); await sleep(700)
    await clickText(page, '.chip-btn', 'Present'); await sleep(900)
    await page.screenshot({ path: file })
  },

  // ── Diagrams and math ──
  'shot-diagrams.png': async (file) => {
    const page = await open('#/note/tech/System%20Overview.md', { height: 985 })
    await page.waitForSelector('.content img.diagram', { timeout: 20000 }); await page.waitForSelector('.content svg'); await sleep(800)
    await page.screenshot({ path: file })
  },
}

for (const [name, take] of Object.entries(shots)) {
  if (only && !name.includes(only)) continue
  try {
    await take(path.join(OUT, name))
    console.log('✓', name, `${Math.round(fs.statSync(path.join(OUT, name)).size / 1024)} KB`)
  } catch (err) {
    console.log('✗', name, err.message.split('\n')[0])
    process.exitCode = 1
  }
  for (const page of await browser.pages()) if (page.url() !== 'about:blank') await page.close().catch(() => {})
}
await browser.close()
