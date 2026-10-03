---
title: Connect Claude Code
---

# Connect Claude Code

One command adds Unibrain to Claude Code for every project on your machine:

```bash
claude mcp add --transport http --scope user unibrain https://unibrain.dev/mcp
```

Restart Claude Code, run **`/mcp`**, select **unibrain → Authenticate**, and sign in with GitHub.

!!! tip "The name you choose shows up in your history"
    Claude Code labels its changes with the name you give the connection: added as `unibrain`, its commits show as `claude-code-unibrain`. Use a different name per machine or per job (for example `gardener` for a scheduled tidy-up agent) to tell them apart.

## Great uses

- **Project memory:** keep specs, decisions, architecture notes and diagrams for your code in your vault, and let Claude Code read them before it starts work.
- **Session notes:** *"Write up what we changed today as a note in Projects/my-app, with the reasons."*
- **Scheduled agents:** run Claude Code on a timer to tidy, summarize or report. See [Run a team of agents](../guides/multi-agent.md).
- **Shared memory across machines:** point Claude's own memory at a folder in your vault, and every machine you run Claude Code on shares it.

## On a server without a browser

Authenticating opens a browser on the same machine. On a headless server, start the sign-in there, then forward the callback port from your laptop with `ssh -L <port>:localhost:<port> you@server` (run that on the laptop) and open the sign-in link locally.
