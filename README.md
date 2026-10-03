# Second Brain documentation

The user documentation for **Second Brain**: one Markdown knowledge base, in your own GitHub repo, shared by Claude, ChatGPT and your agents, with a signed record of every change.

**Read it at https://blanzp.github.io/second-brain-docs/**

Want to try Second Brain? [Request access](https://github.com/blanzp/second-brain-docs/issues/new?template=request-access.yml).

## Working on the docs

The site is built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) and published to GitHub Pages on every push to `main`.

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/mkdocs serve        # preview at http://127.0.0.1:8000
.venv/bin/mkdocs build --strict
```

Pages are in `docs/`, the navigation is in `mkdocs.yml`.
