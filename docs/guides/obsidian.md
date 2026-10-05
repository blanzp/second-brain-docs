---
title: Moving from Obsidian
---

# Moving from Obsidian

An Obsidian vault is a folder of Markdown files, which is exactly what Unibrain works with. Your folders, `[[wiki links]]`, `#tags`, callouts, embeds and attachments carry over as they are. The one thing Unibrain needs is for that folder to live in a **private GitHub repository**.

You can move completely, or keep Obsidian on your computer and use Unibrain everywhere else.

## Why you might

Obsidian is an excellent editor on a computer. Unibrain doesn't try to beat it there. It covers what Obsidian leaves out.

**Reasons to add Unibrain to the vault you have**

- **Your AI assistants can use it, from anywhere.** Claude, ChatGPT and other assistants read and write your vault directly, including from their phone and web apps. Obsidian's AI options are plugins that run on your computer, each with its own setup and API key, and nothing outside that computer can reach your notes.
- **One memory across every assistant.** What you saved with one is there when you ask another, and in Obsidian the next time it syncs.
- **Your vault in any browser.** Obsidian has no web version. Unibrain opens on a work computer, a borrowed laptop or a tablet, with nothing to install.
- **You can see what an assistant did.** Every change is recorded with who made it, and each note has a [History](../features/web-app.md#history) showing exactly what was added and removed. Assistants can't delete notes, and when one rewrites a section, the change is refused if the note was edited since the assistant read it.
- **Nothing to give up.** The files don't change format and Obsidian keeps working on them.

**Reasons to move, at least on your phone**

- **A phone app built for the phone.** Fast to open, a toolbar that sits on the keyboard, notes formatted as you type, a page of every task, whole folders kept offline.
- **Sync you don't have to think about.** There's no sync plugin on the phone to misbehave and no duplicate files to tidy. You open the app and your notes are current.
- **No plugins to maintain.** Tasks, diagrams, math, slides and history are built in, and work the same on every device.
- **Free of sync fees.** Your notes are in your own GitHub account, on its free plan.

**Reasons to stay with Obsidian alone**

It's worth being straight about these:

- **You rely on plugins.** Dataview dashboards, Excalidraw drawings, Canvas and Templater don't work in Unibrain. See [what doesn't carry over](#what-doesnt).
- **You need to write with no connection.** Unibrain reads offline, but editing needs a connection.
- **You don't use AI assistants with your notes**, and Obsidian on your devices already suits you. Then there's little to gain.
- **You'd rather not use GitHub.** Unibrain needs your vault there.

If the first two lists sound like you, the rest of this page shows how.

| You want | Do this |
|---|---|
| Your vault in any browser and on your phone, without fighting sync | [Put the vault on GitHub](#put-your-vault-on-github), then use Unibrain in place of Obsidian's mobile app |
| Your AI assistants to read and write your vault from anywhere | The same. Once it's on GitHub, [connect them](../connect/index.md) |
| To keep writing in Obsidian on your computer | [Use both](#keeping-obsidian-on-your-computer), with Obsidian's Git plugin on the desktop |

## What carries over

- **Notes, folders and file names**, unchanged.
- **Links and embeds:** `[[Note]]`, `[[Note|other text]]`, `[[Note#Heading]]`, `![[image.png]]`, block links.
- **Properties** (the block at the top of a note), **tags**, including nested ones.
- **Callouts, highlights, footnotes, math, Mermaid diagrams.**
- **Tasks**, including due dates written the Tasks plugin's way (`📅 2026-10-05`).
- **Your attachment folder setting:** new pictures go where Obsidian would put them.

## What doesn't

Unibrain reads Markdown. It doesn't run Obsidian plugins, so what a plugin adds is shown as the text underneath:

| In Obsidian | In Unibrain |
|---|---|
| **Dataview** queries | Shown as a code block. Ask your AI the question instead ("list my book notes rated 4 or more"), or have it write the list into a note. |
| **Templater** and core templates | Template code is shown as text. Describe how you like notes written in [`AGENTS.md`](agents-md.md) and your AI follows it. |
| **Excalidraw** drawings and **Canvas** files | Not shown. They stay in your vault, untouched, for Obsidian. |
| **Tasks** query blocks | Shown as code. The [Tasks page](../features/tasks.md) lists every todo. |
| Themes, CSS snippets, plugin settings | Ignored. The `.obsidian` folder is never read or changed, apart from the attachment folder setting. |
| Daily notes | Your existing ones are ordinary notes. Notes your AI adds to "today" go in `Daily/YYYY-MM-DD-daily.md`. |

Nothing is deleted or rewritten by moving. If you go back to Obsidian, everything is as you left it.

## Put your vault on GitHub

You need a [GitHub account](../get-started/github-account.md) first. Then choose the way that suits you.

!!! warning "Before you start"
    - **Make a copy of your vault folder** somewhere safe. Nothing here should harm it, but a copy costs nothing.
    - **Don't keep a Git vault inside iCloud Drive, Dropbox or OneDrive.** Two systems syncing the same folder corrupt each other. If your vault is in one of those, move the folder somewhere ordinary first, such as your Documents folder outside iCloud. Obsidian Sync is fine to leave on.
    - **GitHub refuses files over 100 MB**, and a vault works best under 1 GB. Large videos or PDFs are better kept elsewhere.

### With GitHub Desktop (no command line)

[GitHub Desktop](https://desktop.github.com/) is a free app from GitHub for Mac and Windows.

1. Install it and sign in with your GitHub account.
2. Choose **File → Add Local Repository** and select your vault folder.
3. GitHub Desktop says the folder isn't a repository yet and offers to **create a repository** there. Click that link, leave the suggested settings, and click **Create Repository**.
4. Click **Publish repository** at the top. Make sure **Keep this code private** is ticked, then click **Publish Repository**.

Your vault is now on GitHub. After this, whenever you've changed notes on your computer, open GitHub Desktop, type a few words in the summary box, click **Commit**, then **Push origin**. And click **Fetch origin** to bring down what Unibrain and your AI have changed.

### With the command line

```bash
cd path/to/your-vault
git init -b main
printf '.obsidian/workspace*.json\n.obsidian/cache\n.trash/\n.DS_Store\n' > .gitignore
git add -A
git commit -m "My vault"
gh repo create my-vault --private --source . --push   # with GitHub's gh tool
```

Without `gh`: create an empty private repository on GitHub, then `git remote add origin <its address>` and `git push -u origin main`.

### Files worth leaving out

Obsidian rewrites a few files constantly, which makes for noisy history and needless conflicts. A `.gitignore` file at the top of the vault keeps them out:

```
.obsidian/workspace*.json
.obsidian/cache
.trash/
.DS_Store
```

The command-line steps above create it. In GitHub Desktop, **Repository → Repository Settings → Ignored Files** does the same.

## Connect it to Unibrain

From here it's the normal setup, starting at step 2:

1. [Install the GitHub App](../get-started/github-app.md) on the repository you just made.
2. [Request access](../get-started/access.md), giving that repository's name.
3. [Open the web app](../get-started/web-app.md) and [connect your AI](../connect/index.md).

Then two things make a vault that was built for Obsidian work well with assistants:

- **Add an `AGENTS.md`** at the top of the vault describing how it's organized: what the folders are for, how you name notes, which tags you use. The quickest way is to ask your AI once it's connected: *"Look through my vault and draft an AGENTS.md describing how it's organized."* See [Write your AGENTS.md](agents-md.md).
- **Check [Vault settings](../features/settings.md)**: where new notes go, your time zone, and which tags mark a note as a list instead of todos.

## Keeping Obsidian on your computer

Obsidian and Unibrain can share a vault, because both simply read and write the files. Git is what carries changes between them, so the rule is the usual one for anything shared: **get the latest before you edit, and send your changes soon after.**

On a computer, the community plugin **Git** (often called Obsidian Git) can do that for you. Set it to pull when Obsidian starts and to commit and sync every few minutes. GitHub Desktop, used by hand, works too.

What to expect:

- **Changes made in Unibrain or by your AI** appear in Obsidian the next time it pulls.
- **Changes made in Obsidian** appear in Unibrain about a second after they're pushed.
- **If the same note was changed in both places** between syncs, Git reports a conflict and you choose which lines to keep. Syncing often makes this rare. Unibrain itself never overwrites silently: its editor won't save over a note that changed since you opened it, and an assistant's rewrite of a section is refused if the note changed since the assistant read it.

!!! note "On your phone, use Unibrain"
    The Git plugin's own developers advise against using it on mobile, where it is unreliable. Unibrain is built for the phone: install it to your home screen and leave Obsidian for the computer.

## Good to know

- **Unibrain hasn't been tried with very large vaults.** It is used daily with a few hundred notes. With several thousand, search and the Tasks page may be slow; please [say so](https://github.com/blanzp/second-brain-docs/issues) if you find that.
- **When an assistant changes a note's properties, the properties block is rewritten** in a standard form. The values are kept; hand-tuned spacing, quoting or comments in that block may not be. The web editor doesn't do this: it changes only the property you edit.
- **Your vault's history starts when you put it on GitHub.** From then on, every change, yours or an assistant's, is recorded and shown under [History](../features/web-app.md#history).
