---
title: Write your AGENTS.md
---

# Write your AGENTS.md

`AGENTS.md` at the top of your vault is the single place you tell **every** AI how to behave in your notes. Unibrain sends it to each app when it connects, so Claude, ChatGPT, Claude Code and Hermes all follow the same rules.

## What to put in it

1. **What the vault is for.** Who reads it, and how: *"I read on my phone; write summary first."*
2. **Where notes go.** Your folders and what belongs in each.
3. **How to write.** Front matter you want, tag conventions, tone, length.
4. **What never to do.** No secrets, no deleting, don't reorganize without asking.
5. **How agents should behave together.** Propose cleanups instead of doing them, sign writes, log big changes.

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
- `Daily/` — daily notes (use append_to_daily)
- `inbox/` — when unsure

Put a note in the most specific existing folder. Don't create new top-level folders;
suggest one instead.

## Tags
Lowercase, hyphenated (`food-wine`). One type tag (`research`, `plan`, `guide`,
`itinerary`, `checklist`…) plus topic tags. Reuse existing tags (list_tags).

## Todos vs lists
Itineraries, checklists and guides are lists. A real action inside one gets `#todo`
and a due date: `- [ ] book the tour #todo 📅 2026-10-05`.

## Rules
- Search before creating; add to an existing note rather than duplicating.
- For notes you didn't write, append rather than rewrite.
- Cite sources with links. Only link notes that exist.
- Never store passwords, keys or account numbers: say where they're kept.
- Propose cleanups (moves, archives, merges) instead of doing them unasked.
- If you have a name, sign your writes with it (`agent`).
```

!!! tip "Keep it short"
    Agents read it at the start of every session. A page or two of clear rules beats ten pages of detail.
