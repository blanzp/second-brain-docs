---
title: MCP tools
---

# MCP tools

The 28 tools every connected app gets. Every tool that **writes** also accepts an optional `agent`: the agent's own name, used to [sign the change](../guides/named-agents.md).

## Start here

| Tool | What it does |
|---|---|
| `vault_guide` | What the vault is for and how to write in it: your `AGENTS.md`, your settings and the note syntax. Agents call it first. |

## Find and read

| Tool | Parameters | What it does |
|---|---|---|
| `search_notes` | `query`, `tag`, `folder`, `limit` | Full-text search (every word must appear), optionally limited to a tag (nested tags count) or folder. Returns paths, titles and snippets. |
| `list_folder` | `folder` | Subfolders, notes and other files in a folder. |
| `read_note` | `path` | A note's full Markdown, including its properties, followed by the note's **version**. |
| `view_image` | `path` | Look at an image in the vault. |
| `get_links` | `path` | A note's outgoing links (and where each resolves) and its backlinks, with context. |
| `list_tags` | | Every tag in the vault, with note counts. |
| `recent_changes` | `since`, `author`, `folder`, `limit` | What changed and who changed it, from Git history. Filter by app or agent name. |
| `list_tasks` | `folder`, `tag`, `query`, `include_done`, `limit` | Checkbox tasks across the vault, with their note, line and heading. |
| `vault_health` | | Broken links, orphan notes, ambiguous names, empty notes, settings problems, suspicious commits and recent deletions. |

## Write

| Tool | Parameters | What it does |
|---|---|---|
| `create_note` | `title`, `content`, `folder`, `tags`, `prompt` | A new note; the file name is the title. Properties (created, source, prompt) are added for you. |
| `append_to_note` | `path`, `content`, `heading` | Add to a note without changing what's there: under a heading, or as a dated *Update* section. |
| `replace_section` | `path`, `heading`, `content`, `expected_version` | Replace one section's body. The version from `read_note` is required: if the note has changed since it was read, nothing is saved. |
| `replace_text` | `path`, `find`, `replace`, `all`, `expected_version` | Replace exact text, such as one link or a typo. |
| `set_properties` | `path`, `set`, `remove`, `expected_version` | Set or remove properties (tags, status, dates, custom fields). |
| `add_link` | `from`, `to`, `heading`, `label` | Link one note to another under a heading (default *Related*), with link text that resolves correctly. |
| `attach_image` | `note`, `url` or `data_base64` or `svg`, `filename`, `width`, `caption`, `heading` | Save an image in the note's attachments folder and embed it. Up to 10 MB; downloads only from public addresses. |
| `append_to_daily` | `content`, `date`, `heading` | Add to a daily note (created if needed), with a timestamp in your time zone. |
| `complete_task` | `path`, `text`, `line`, `done` | Tick (or untick) a task. |

## Organize

| Tool | Parameters | What it does |
|---|---|---|
| `move_note` | `path`, `folder` | Move a note; links update everywhere. |
| `rename_note` | `path`, `title` | Rename a note; links update everywhere. |
| `move_folder` | `folder`, `parent` | Move a folder and everything in it. |
| `rename_folder` | `folder`, `name` | Rename a folder in place. |
| `rename_tag` | `from`, `to` | Rename a tag across the vault, including nested tags; merges into an existing tag. |
| `archive` | `path` | Move a note or folder to the archive under the same path. |
| `unarchive` | `path` | Put an archived note or folder back where it was. |

There is **no delete tool**, by design.

## ChatGPT deep research

| Tool | What it does |
|---|---|
| `search` | Search in the standard shape deep research expects; results link to the note on GitHub. |
| `fetch` | Read a note found by `search`. |
