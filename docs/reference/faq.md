---
title: FAQ
---

# FAQ

??? question "Do I need Obsidian?"
    No. The web app covers reading, editing, tasks and offline reading. But Unibrain follows Obsidian's conventions, so you can keep using Obsidian on the same repo if you like.

??? question "Can I use a repo I already have?"
    Yes. Any repo of Markdown notes works, including an existing Obsidian vault. Install the GitHub App on it and request access with that repo.

??? question "Which AI apps work?"
    Claude (desktop, web, iPhone, Android), ChatGPT (paid plans, Developer mode), Claude Code, Hermes, and any client that supports remote MCP with OAuth. See [Connect your AI](../connect/index.md).

??? question "Can an AI delete my notes?"
    There is no delete tool. Agents can archive, which moves a note to `Archives/` and can be undone. Everything is in Git history, and the safety net flags deletions pushed from anywhere else.

??? question "How do I know which agent changed something?"
    Every change is a commit labelled with the app, and with the agent's name if it [signs its writes](../guides/named-agents.md). The web app's Recently changed list shows it, and you can ask any agent *"who changed this note?"*.

??? question "What if two agents write at the same time?"
    Writes are queued per vault and each one is applied on top of the latest version, so neither overwrites the other.

??? question "I edit notes on my laptop with Git too. Is that OK?"
    Yes. Unibrain notices your pushes within about a second through GitHub webhooks. Pull before you edit, and push soon after, as with any shared repo.

??? question "Can I share a vault with someone?"
    No: each vault belongs to one user.

??? question "Does it work offline?"
    Reading does: notes you've opened, and whole folders you keep offline. Editing needs a connection. See [Offline reading](../features/offline.md).

??? question "How much does it cost?"
    Unibrain is in invite-only early access. Pricing hasn't been set.

??? question "Is it open source?"
    Not at the moment.
