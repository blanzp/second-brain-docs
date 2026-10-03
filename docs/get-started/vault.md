---
title: 1. Create your vault
---

# 1. Create your vault

Your **vault** is a private GitHub repository of Markdown notes. It belongs to you, and Second Brain only ever works inside it.

## Create the repository

1. Go to **[github.com/new](https://github.com/new)**.
2. **Repository name:** anything you like, such as `second-brain` or `notes`.
3. **Visibility: Private.** Only you, and the apps you allow, can see a private repo.
4. Tick **Add a README file**, so the repo isn't empty.
5. Click **Create repository**.

!!! note "Using an existing repo"
    Any repo of Markdown notes works, including an Obsidian vault. Folders, links, tags and attachments are understood as they are.

## Recommended: tell your AI what the vault is for

Add a file called **`AGENTS.md`** at the top of the repo (on GitHub: **Add file → Create new file**). Second Brain sends it to every AI app each time it connects, so all of them follow the same rules: where notes go, how you like them written, what never to store.

Edit it whenever you like; changes apply within a minute. Here's a starting point:

```markdown
# Rules for AI assistants

## What this vault is for
My personal knowledge base. I mostly read it on my phone; assistants write to it when I ask
them to research, summarize or record something. Write for me reading later on my phone:
clear, self-contained, summary first.

## Where notes go
- `Projects/<name>/` — things I'm working on
- `Areas/<name>/` — ongoing responsibilities (home, health, finances…)
- `Resources/<topic>/` — reference material and research
- `Archives/` — finished or inactive material (only move things here when I ask)
- `inbox/` — when unsure where something belongs

## Rules
- Search before creating, to avoid duplicates; add to an existing note instead.
- Cite sources with links.
- Link related notes with [[Note Name]] only if they exist.
- Never store passwords, API keys or account numbers — write where they're kept instead.
- If your instructions give you a name, pass it as `agent` on every tool that writes.
```

The folders above follow the popular PARA method. Use any structure you like and describe it here. More ideas: [Write your AGENTS.md](../guides/agents-md.md).

[Next: install the GitHub App :material-arrow-right:](github-app.md){ .md-button .md-button--primary }
