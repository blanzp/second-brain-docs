---
title: Other MCP clients
---

# Other MCP clients

Unibrain is a standard **remote MCP server** using **Streamable HTTP** and **OAuth 2.1** with dynamic client registration, the same setup Claude and ChatGPT use. Any client that supports that can connect.

| Setting | Value |
|---|---|
| Server URL | `https://unibrain.dev/mcp` |
| Transport | Streamable HTTP (POST) |
| Authentication | OAuth, discovered automatically from the server; sign in with GitHub |
| Client registration | Dynamic (the client registers itself) |

The **name your client registers with** becomes the label on its commits, for example `openclaw-mcp`. Choose something recognizable.

## Agents with their own Git clone

Agents that work directly in a clone of your repo can still share the vault: Unibrain picks up their pushes within about a second through GitHub webhooks. Through the MCP server is better, though: writes are labelled, queued safely, and links are rewritten on moves.

## Tools

The full list of what clients can do is in [MCP tools](../reference/tools.md).
