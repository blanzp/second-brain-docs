---
title: Vault settings
---

# Vault settings

Your vault, your conventions. Settings live **in your vault** as `.brain/settings.json`, so the web app, the MCP tools and every agent follow the same rules. Change them under **⚙ Settings** in the web app.

| Setting | What it does | Default |
|---|---|---|
| **Title** | The app's name in the header and tab, e.g. "My brain" | Second Brain |
| **New notes go in** | Where notes go when no folder is given | Top level |
| **Time zone** | Dates in notes and the daily note | Taken from your device on first sign-in |
| **Archive folder** | Where archived notes go | `Archives` |
| **List tags** | Notes with these tags are lists, not todos | none |
| **Todo tag** | Marks a real action inside a list | `todo` |
| **Hide notes tagged** | Notes with these tags never show on Tasks | none |
| **Hide from Recent** | Files that never show in Recently changed | none |
| **Ask Claude prompt** | The prompt the Ask Claude button uses (`{path}` is the note) | a neutral prompt |

## Safe by design

- **No file is fine:** defaults apply until you change something.
- **You edit a form, not the file.** Every value is checked before it's saved.
- **A broken file can't break the app.** If an agent or a hand edit damages it, each bad value falls back to its default and the problem is shown in Settings and in *vault health*.
- Agents read your settings in their vault guide and never edit the file.
