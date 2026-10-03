---
title: Agents and MCP
---

# Agents and MCP

Second Brain is a **remote MCP server**. Any AI app that supports the Model Context Protocol connects with one address and a GitHub sign-in, and gets a full toolkit for your vault.

## What agents can do

| | Tools |
|---|---|
| **Find** | full-text and tag search, list folders, read notes, look at images, follow links and backlinks, list tags |
| **Write** | create notes, append (to the end or under a heading), replace a section, fix exact text, set properties, add links, attach images, add to the daily note |
| **Tasks** | list open tasks anywhere in the vault, tick them off |
| **Organize** | move and rename notes and folders, rename tags vault-wide, archive and unarchive, all with links rewritten |
| **Check** | recent changes and who made them, vault health |
| **Research mode** | standard `search` and `fetch` for ChatGPT deep research |

Full details: [MCP tools](../reference/tools.md).

## Rules that travel with your vault

When an agent connects, Second Brain hands it a **vault guide**:

1. **How the server works:** it handles Git, every write is a commit, prefer adding to rewriting, never recreate a note to move it.
2. **Your `AGENTS.md`:** what the vault is for, where things go, your rules. You write it once, in your repo; every agent follows it.
3. **Your [vault settings](settings.md):** your inbox and archive folders, time zone, and which tags mark lists rather than todos.
4. **The note syntax:** links, embeds, callouts, tasks, math and every diagram type.

Change `AGENTS.md` and every agent picks it up within a minute, with no redeploy and no per-app setup.

## Every agent, labelled

- Each app registers a name when it connects (`claude`, `chatgpt`, `claude-code-second-brain`…), and every commit it makes carries that name.
- **Named agents sign their writes.** Personas sharing one app, like two Claude Projects, pass their own name, and their changes show as `Igor (claude)` or `Brainstorm Partner (claude)`. The note's `source` says "by Igor" too. See [Name your agents](../guides/named-agents.md).
- Ask any agent *"what changed this week, and who changed it?"* and it reads the history.

## Built for safe edits

- **One commit per write**, so every change can be reviewed and undone on its own.
- **Writes are queued per vault** and applied on top of the latest version from GitHub, so two agents writing at once never overwrite each other.
- **Section-level edits** (append under a heading, replace one section, fix exact text) keep agents from rewriting whole notes.
- **Moves and renames rewrite every link** across the vault, in the shortest form Obsidian understands.
- **No delete tool.** Retiring something means archiving it, which can be undone.
