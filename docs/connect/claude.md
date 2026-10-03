---
title: Connect Claude
---

# Connect Claude

Works in the **Claude desktop app**, **claude.ai** and the **iPhone and Android apps**. Connectors belong to your Claude account, so you only set it up once.

## Add the connector

1. Open **Settings → Connectors** (on some versions, **Customize → Connectors**).
2. Click **Add custom connector**.
3. **Name:** `Second Brain`. **URL:** `https://brain.mdcrypt.dev/mcp`. Leave the advanced OAuth fields empty.
4. Click **Add**, then **Connect**, and sign in with GitHub when asked.
5. In a chat, open the **+** menu (or the tools menu) → **Connectors** and make sure **Second Brain** is on.

## Use it

Just ask. Claude reads your `AGENTS.md` first, then searches, reads and writes as needed:

> Research the best options for backing up a home server, compare three of them, and save the comparison to my second brain under Projects/homelab.

> What did I decide about the kitchen renovation? Check my notes.

## Make it yours with Claude Projects

A **Claude Project** with its own instructions makes a great specialist: a research assistant, a brainstorming partner, a travel planner. Give each one a name and ask it to sign its writes:

```text
You are Igor, my research librarian. Sign your second-brain writes:
pass agent: "Igor" on every tool that writes.
```

Their changes then show as `Igor (claude)` in your history, your Recently changed list and your usage stats. More: [Name your agents](../guides/named-agents.md).

## Ask Claude about any note

Every note in the web app has an **Ask Claude** button. It opens a new Claude chat (the Claude app on iPhone) that reads that note through the connector and asks what you'd like to do with it.
