---
title: Trust and safety
---

# Trust and safety

Letting AI write to your notes is only comfortable when you can see what it did and undo it. That's the heart of Unibrain.

## A signed record of every change

Every change, by you or any agent, is a **Git commit in your own repo**:

```text
Igor (claude, brain-mcp)      note: add Kafka tiered storage (igor via claude)
web (brain-mcp)               update: check task in travel/Tuscany Trip.md (web)
claude-code-gardener          organize: archive Projects/old-idea.md (claude-code-gardener)
```

- The **author** says which app made the change, and which named agent if it gave one.
- The **message** says what kind of change it was.
- Your phone's **Recently changed** list shows the same: *"Igor, 2 h ago"*.

## Nothing disappears

- **There is no delete tool.** Agents can create, add, edit, move, rename and archive. Archiving moves a note to `Archives/` under the same path, and **Unarchive** puts it back exactly where it was.
- **Full history.** Every version of every note is in Git. Anything can be restored.

## A safety net that watches every commit

Unibrain inspects each new commit as it arrives, including ones pushed from outside (a laptop, a phone, an agent with its own clone), and **flags** two kinds of trouble:

- **Rollbacks:** notes reverted to an older version, the classic sign of a stale copy being pushed from another device.
- **Deletions:** notes removed outright.

Nothing is undone automatically. Flagged commits show up when you or an agent ask for *recent changes* or *vault health*, with the exact commit to revert.

## Safe by construction

- **Writes never clobber each other.** Each write starts from the latest version on GitHub and is re-applied if someone else pushed first.
- **Edits made elsewhere arrive in about a second**, through GitHub webhooks, so agents and the web app always work on current notes.
- **The editor won't overwrite** a note that changed while you were editing: you choose what to keep.
- **Paths can't escape your vault**, and hidden folders such as `.git` are off limits.

## Your vault, nobody else's

Every request is tied to your GitHub sign-in and can only reach your own repo. Another user who opens a link to one of your notes sees their own vault, not yours. More in [Privacy and security](../reference/privacy.md).
