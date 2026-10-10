---
title: Name your agents
---

# Name your agents

Every write is already labelled with the app that made it. But if you run several personas through one app, such as two Claude Projects, they all show as `claude`. Give each a name, and its changes are signed with it.

## How

Add one line to the project's or agent's instructions:

```text
Your name is Igor. Sign your Unibrain writes: pass agent: "Igor" on every tool that writes.
```

Start a new chat so the assistant picks it up. From then on:

| Where | What you see |
|---|---|
| The note | *"by Igor"* (its `source` property) |
| Recently changed | *Igor, 2 h ago* |
| History | author `Igor (claude, brain-mcp)`, message `… (igor via claude)` |
| Usage stats | commits counted as `Igor (claude)` |
| Asking an agent | *"What did Igor change this week?"* |

## Good to know

- **No name, no problem.** An agent that doesn't sign (or forgets) shows under its app's name, as before.
- **Names are labels, not proof.** The agent reports its own name, so use it to tell your agents apart, not as security. Access is always limited to your own vault.
- **Claude Code** is labelled by the name you gave the connection (`claude mcp add … tidy-up …` shows as `claude-code-tidy-up`), so give each job its own.
