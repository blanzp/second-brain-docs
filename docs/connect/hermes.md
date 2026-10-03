---
title: Connect Hermes
---

# Connect Hermes

[Hermes Agent](https://github.com/NousResearch/hermes-agent) is a great always-on agent: it runs on your server, chats on Telegram and other channels, runs scheduled jobs, and now shares a memory with everything else you use.

## Add the server

On the machine where Hermes runs:

```bash
hermes mcp add unibrain --url https://unibrain.dev/mcp --auth oauth
hermes mcp login unibrain
```

The login opens GitHub's sign-in page; approve **Uni Brain MCP** and you're done. Check it with:

```bash
hermes mcp test unibrain
```

This adds an entry like this to `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  unibrain:
    url: https://unibrain.dev/mcp
    auth: oauth
```

!!! note "Hermes on a server without a browser"
    If Hermes runs on a headless machine, start `hermes mcp login unibrain` there and complete the sign-in from a computer with a browser. If the sign-in returns to a `localhost` address, forward that port from your computer with `ssh -L <port>:localhost:<port> you@server` (run it on your computer).

## Teach Hermes about your vault

Give Hermes a name and a habit in its persona or a skill, so its changes are signed and it follows your rules:

```text
You can read and write my Unibrain vault through the unibrain MCP tools.
Call vault_guide once per session before writing. Sign every write with agent: "Hermes".
```

## Great uses

- *"Hermes, save this article's key points to Unibrain"*, from Telegram on your phone.
- A **morning briefing** job that reads your open tasks and recent changes and messages you a summary.
- **Starting other agents on request:** for example, a skill that kicks off a weekly tidy-up run when you ask. See [Run a team of agents](../guides/multi-agent.md).
