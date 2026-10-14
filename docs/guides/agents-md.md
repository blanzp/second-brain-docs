---
title: Write your AGENTS.md
---

# Write your AGENTS.md

`AGENTS.md` at the top of your vault is the single place you tell **every** AI how to behave in your notes. Unibrain sends it to each app when it connects, so Claude, ChatGPT, Claude Code and Hermes all follow the same rules.

It comes after Unibrain's own rules, which every vault gets. So `AGENTS.md` only needs what is specific to **your** vault.

## What to put in it

1. **What the vault is for.** Who reads it, and how: *"I read on my phone; write summary first."*
2. **Where notes go.** Your folders and what belongs in each.
3. **How to write.** Front matter you want beyond the basics, tone, length.
4. **Your tags.** The topic tags you use, settled synonyms (`infra`, not `infrastructure`), and any change to the default tag style.
5. **What never to do.** No secrets, no deleting, don't reorganize without asking.
6. **How agents should behave together.** Propose cleanups instead of doing them, log big changes, a shared note to leave messages in.

!!! info "What you don't need to write"
    Unibrain already tells every AI these, so leave them out of `AGENTS.md`:

    - Git: the server commits and pushes every change.
    - Versions: re-read a note if a change is refused.
    - Moving, renaming and archiving with the tools that keep links working.
    - Signing changes with the agent's name (`agent`), and reporting runs on the Agents page.
    - Properties, and `tags` always being a list.
    - The default tag style (lowercase, hyphenated, singular, one type tag plus topic tags) and the type tags.
    - Todos and lists, `#todo` and due dates.
    - How to write [proposals](../features/proposals.md).
    - Daily notes, attachments, links, Markdown, diagrams and slides.
    - Your settings: inbox, archive folder, time zone, list-type tags.

    Say any of them again only to do it differently in your vault.

## A fuller example

```markdown
# Rules for AI assistants

## What this vault is for
My long-term memory, shared by me and my agents. I read and write it on my phone.
Write for me reading later: clear, self-contained, skimmable, summary first.

## Where notes go
- `Projects/<name>/` — software projects: specs, decisions, research, bugs
- `travel/` — trips, place guides, checklists
- `personal/` — home, money, health. Private: factual, never shared
- `Daily/` — daily notes, only when I ask
- `inbox/` — when unsure

Put a note in the most specific existing folder. Don't create new top-level folders;
suggest one instead.

## Tags
Topic tags I use: `kafka`, `ai`, `infra`, `italy`, `wine`, `food`.
Use `infra`, not `infrastructure`.

## How I want you to work
- Add to an existing note rather than duplicating it.
- For notes you didn't write, append rather than rewrite.
- Cite sources with links.
- Never store passwords, keys or account numbers: say where they're kept.
- Propose cleanups (moves, archives, merges) instead of doing them unasked.
- When you change the vault, add a line to `Agents/Change Log.md`.
```

## Rules for agents with their own Git clone

Some agents (Claude Code on your computer, for example) work in their own copy of the repository instead of through Unibrain. Put instructions only they need under a heading `## If you work in your own Git clone`. Unibrain leaves that section out when it sends `AGENTS.md` to apps, so they never see Git steps meant for others.

!!! tip "Keep it short"
    Agents read it at the start of every session. A page or two of clear rules beats ten pages of detail.
