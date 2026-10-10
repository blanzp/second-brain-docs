---
title: Why Unibrain
---

# Why Unibrain

## AI agents are becoming coworkers. They need a shared memory.

Most people now use more than one AI. Claude for writing and research, ChatGPT for quick questions, a coding agent in the terminal, maybe an agent on a server that runs on a schedule or answers on Telegram. Each of them is useful, and each of them forgets everything the others did.

The built-in memory in each app only helps that app. Copying notes between them by hand doesn't scale. And letting several agents write into one place raises a new question: **what did they change, and can I trust it?**

Unibrain is the answer to both:

- **One memory for all of them.** Every agent reads and writes the same vault through the open [Model Context Protocol](https://modelcontextprotocol.io) (MCP).
- **Accountability for every write.** Every change is a Git commit that says which app and which named agent made it. You can see it, review it and undo it.

## The promise

> **Give every agent your notes and stay in control.**
> Your Markdown vault, in your own Git repo, with a signed record of every change and a phone app to review it.

### 1. You own the notes

Your notes are ordinary Markdown files in a **private GitHub repo that belongs to you**. There's no proprietary format, no export step and no lock-in. The same files open in any editor that understands Markdown, and your full history is in Git from day one.

**A format that won't grow old.** Markdown is plain text with a few marks for headings, lists and links. It has been in use since 2004, and plain text has been readable on every computer for more than fifty years. A note you write today needs no app, no account and no conversion to be read in twenty years: any text editor opens it, and it still makes sense with the marks showing. Apps come and go, including this one; your notes don't depend on any of them.

### 2. Agents are accountable

- Every change is **one commit**, labelled with the app that made it (`claude`, `chatgpt`, `web`…).
- Agents with a name **sign their writes**: a change by your "Igor" persona shows as `Igor (claude)`, separate from plain Claude.
- **There is no delete tool.** Agents can create, add, edit, move, rename and archive, but they can't make notes disappear.
- A **safety net** watches every new commit and flags anything that rolls notes back to an older version or deletes notes, such as a stale copy pushed from another device.
- Moves and renames **rewrite every link** across the vault, so reorganizing never breaks anything.

### 3. Reading and writing are a pleasure

Your agents write, and so do you. The web app is built for both: fast search, beautiful rendering of diagrams, math and callouts, an editor that formats your note as you type, a history that shows exactly what an agent changed, a Tasks page that pulls every todo out of your notes, and whole folders kept offline for a flight.

## How it compares

The landscape moves quickly. This is our honest reading as of October 2026; check each product for its latest features.

| | **Unibrain** | Basic Memory | Obsidian | Notion | Built-in AI memory |
|---|---|---|---|---|---|
| Plain Markdown files you own | <span class="yes">Yes</span> | <span class="yes">Yes</span> | <span class="yes">Yes</span> | <span class="no">No</span> | <span class="no">No</span> |
| Lives in your own Git repo, with history | <span class="yes">Yes, built in</span> | Optional | With a plugin | <span class="no">No</span> | <span class="no">No</span> |
| Hosted connection for any AI app (MCP) | <span class="yes">Yes</span> | <span class="yes">Yes</span> | Desktop tools and plugins | <span class="yes">Yes</span> | One app each |
| Every change signed by app and agent | <span class="yes">Yes, every commit</span> | Audit logs on business plans | <span class="no">No</span> | Page history | <span class="no">No</span> |
| No delete tool, plus a rollback safety net | <span class="yes">Yes</span> | Version history | File recovery | Trash and history | n/a |
| Phone reading, offline folders | <span class="yes">Yes</span> | Mobile access | <span class="yes">Yes</span> | <span class="yes">Yes</span> | n/a |
| 26 diagram types and math | <span class="yes">Yes</span> | Not checked | Mermaid, plugins | Mermaid | n/a |
| Teams and shared workspaces | No | <span class="yes">Yes</span> | Shared vaults | <span class="yes">Yes</span> | n/a |

**Where Unibrain shines:** people who let several agents write to their notes and want to stay in control, and anyone who wants their knowledge base to be a plain Git repo rather than someone else's database.

**Where others are ahead today:** team workspaces and collaboration (Notion, Basic Memory), deep desktop editing and plugins (Obsidian), and semantic search (Basic Memory). See [What's new](reference/whats-new.md) for where Unibrain is heading.

### Works with Obsidian, doesn't replace it

Unibrain follows Obsidian's Markdown conventions: `[[wiki links]]`, `#tags`, callouts, embeds, block links and task due dates. An existing Obsidian vault in GitHub works as-is, and you can keep editing it in Obsidian on your desktop while your agents and phone use Unibrain. [Moving from Obsidian](guides/obsidian.md) shows how.

## Who it's for

- **AI power users** who use several assistants and want them to share what they know.
- **Builders running their own agents** (Hermes, OpenClaw, scheduled Claude Code jobs) who need a safe, auditable place for them to write.
- **Developers and technical writers** who already live in Git and want their notes there too.
- **Anyone who reads more than they write** and wants a great phone experience for the knowledge their agents produce.

[Get started :material-arrow-right:](get-started/index.md){ .md-button .md-button--primary }
