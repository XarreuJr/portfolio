# GitHub Pages deployment

The current public URL is https://xarreujr.github.io/portfolio/.

## Build and preview

```sh
npm run build
npm run check
npm run preview
```

`build` generates the crawlable English `index.html` in the repository root and a self-contained `dist/` directory. The page loads Portuguese/English JSON through relative URLs; it works under a project subpath such as `/portfolio/` without client-side routing or rewrites. `preview` serves the root and `/portfolio/` locally on port 8766. Set `PORT` if that port is already used.

No dependency installation is required for these commands with Node.js 20 or newer. The legacy Sass dependency is retained for the original source files but is not needed by the current site.

## Preserve the existing Pages arrangement

The repository has no checked-in GitHub Actions deployment workflow. Before publishing, inspect Settings → Pages in GitHub to confirm the current source branch and folder. Do not switch deployment methods unnecessarily.

If the site is published from `main` and the repository root, review and merge the redesign branch into that branch. The generated root `index.html`, `css/portfolio.css`, `javascript/`, `lang/`, `assets/` and `.nojekyll` are already compatible with that configuration. Review the source diff before merging.

If Pages uses a separate deployment branch, publish the contents of `dist/` to the configured branch/folder. The production archive contains exactly that directory's contents; `index.html` must sit at the published root, not inside an extra nested directory.

For an Actions-based setup, upload `dist/` as the Pages artifact using GitHub's official Pages actions. This delivery does not add an automatic deployment trigger or change repository permissions.

## Verify after publication

Open the public URL and check the portrait, language switcher, theme toggle, mobile menu, project filters, CV and PDF reports. Confirm that the server serves JavaScript as JavaScript and that `/portfolio/lang/en.json` and `/portfolio/lang/pt.json` are accessible.

Local build success is not confirmation of a public deployment. No remote push, merge or publication is performed by the build scripts.
