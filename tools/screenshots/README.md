# Screenshots and animations

Every picture in the docs is taken by `shots.mjs` from a made-up vault (`vault/`), so nobody's real notes appear and
the whole set can be retaken after the app's look changes.

## How it works

- `demo-server.mts` serves the **real web app** (its `public/` files) and uses the **real vault and rendering code**
  from the app's repo, over a temporary copy of `vault/`. There is no sign-in and no GitHub; "recently changed" and one
  note's history are made up in the script. Diagrams other than Mermaid are drawn by the public kroki.io.
- `shots.mjs` drives Chrome at phone size, takes each picture, and writes it to `docs/assets/images/`. Animations are
  a few frames joined into a GIF with ffmpeg.

## Retake the pictures

Needs the app's repo next to this one (`../second-brain-mcp`, with its `npm install` done), Google Chrome, and ffmpeg.

```bash
cd tools/screenshots
npm install
npm run server          # leave running; APP_REPO=/path/to/second-brain-mcp if it is elsewhere
npm run shots           # in another terminal: everything
node shots.mjs editor   # or only the pictures whose name contains "editor"
```

Then look at the changed images, build the site (`mkdocs build --strict`) and commit.

## Add a picture

1. Add an entry to `shots` in `shots.mjs`: open a screen, wait for it, take the screenshot.
2. If it needs content, add or change a note in `vault/`. Due dates written as `{{+2d}}` or `{{-2d}}` become dates
   relative to today, so "overdue" stays overdue.
3. Use it in a page inside a `<div class="shots" markdown>` block (see `docs/features/editor.md`).

Not covered here: screens in other products (installing the GitHub App, adding the connector in Claude or ChatGPT),
which need real screenshots, and the Offline and Usage stats pages, which need a service worker and real statistics.
