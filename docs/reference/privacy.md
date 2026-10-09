---
title: Privacy and security
---

# Privacy and security

Your notes are yours. Here's exactly how they're handled.

## Where your notes live

- **In your own private GitHub repo.** That's the source of truth. Everything else is a working copy.
- **The server keeps a working copy** of your vault while you use it, so search, the web app and the AI tools can read it. It's readable only by the server's own account.

## Who can see your notes

| Who | Can they read your notes? |
|---|---|
| **You**, signed in with GitHub | Yes |
| **AI apps you connected** | Yes, through the tools, while connected |
| **Other Unibrain users** | **No.** Every request is tied to your GitHub sign-in and can only reach your own repo. A link to one of your notes shows *their* vault, not yours. |
| **The server's operator** | Technically yes: they run the machine that holds the working copy. Only use a server whose operator you trust, or run your own. |
| **GitHub** | Under [GitHub's terms](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) for private repositories. |

!!! question "Why not encrypt notes so even the server can't read them?"
    Search, rendering, links, tasks and the AI tools all work by reading your notes. Encrypting them that way would turn all of it off. Your notes are protected by access control, private storage and HTTPS everywhere.

## What the server stores

- **No passwords.** You sign in with GitHub; the server gets short-lived (hourly) access keys from GitHub for your one repo.
- **Sign-in tokens are stored hashed.**
- **Usage counts only:** requests, commits, tools used, timings. Never note contents, titles, paths, searches or commit messages. See [Usage stats](../features/stats.md).
- **Only if you turn on [Mission control](../features/mission-control.md) (alpha, off by default):** a record of each tool call your agents make: the tool, the agent, the path of the note it was about, the time, and what the agent reported at the end of its run. Never what a note says or what was searched for. Kept 30 days; you can delete it at any time in Settings.

## On your devices

- The web app keeps the notes you open, and folders you keep offline, on that device. **Signing out deletes them.**
- Its sign-in cookie can't be read by page scripts, is sent only over HTTPS, and requests that change anything from another website are refused.

## Leaving

1. **Uninstall the GitHub App** (GitHub → Settings → Applications). Access stops immediately.
2. Ask to be removed from the invite list. Within an hour you're signed out of every app; the server's working copy and your usage entries are deleted after 7 days.

Your repo on GitHub is untouched: it stays yours, with all its history.
