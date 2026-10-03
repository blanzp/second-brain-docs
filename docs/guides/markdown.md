---
title: Note-writing syntax
---

# Note-writing syntax

Notes are plain Markdown following **Obsidian's conventions**, so they're readable anywhere and portable forever.

| You write | You get |
|---|---|
| `[[Note Name]]`, `[[Note Name\|shown text]]` | a link to another note |
| `[[Note Name#Heading]]`, `[[Note Name#^block-id]]` | a link to a heading or a block (end a line with ` ^block-id`) |
| `![[Note Name]]`, `![[photo.png\|300]]` | an embedded note or image (with width) |
| `#tag`, `#trip/italy` | a tag (tap it to see all notes with it) |
| `> [!tip] Title` then `> text` | a callout: note, tip, warning, danger, question, example, quote, success, bug… `[!tip]-` starts collapsed |
| `- [ ] task 📅 2026-10-05` | a todo with a due date |
| `==highlight==` | highlighted text |
| `%%comment%%` | a comment hidden when reading |
| `[^1]` and `[^1]: text` | a footnote |
| `$x^2$`, `$$ … $$` | math |
| ```` ```mermaid ```` and 25 more | a [diagram](../features/diagrams.md) |

## Properties

Notes start with YAML front matter. Agents fill it in for you:

```yaml
---
title: Kafka Tiered Storage
created: 2026-10-03
tags: [kafka, research]
source: Igor
prompt: compare Kafka tiered storage options
---
```

`source` records who wrote the note, and `prompt` what they were asked.
