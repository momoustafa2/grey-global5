# Grey Global website

Static site. `src/` holds the hand-written pages. `build.js` generates the 130 language pages,
the video and image type pages and `sitemap.xml` into `dist/` on every deploy.

## Deploy
1. Upload this folder to a GitHub repo (about 15 files).
2. In Vercel: Add New Project, import the repo. Leave the settings as they are, `vercel.json` already sets them.
3. Every push to GitHub redeploys automatically.

## Editing
- Languages and dialects: the `LD` and `RD` lists at the top of `src/site.js`.
- Video and image types: the `V` and `I` lists in `build.js`.
- Other pages: the `.html` files in `src/`.
- Local build: `node build.js`, then open `dist/`.
