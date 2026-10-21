# Diogo Vidazinha — Cybersecurity Portfolio

Responsive static portfolio for a Cybersecurity Analyst / SOC Analyst at Fujitsu in Portugal. Dark and light themes, English and Portuguese, a filterable project gallery, professional and education timelines, and verified training records.

## Development

Node.js 20+ is sufficient; the active build has no third-party runtime or build dependency.

```sh
npm run build
npm run check
npm run preview
```

Preview: http://127.0.0.1:8766/portfolio/. Set `PORT` if needed. Serve over HTTP rather than opening `index.html` directly, because translations load through fetch.

## Source map

- `lang/en.json`, `lang/pt.json`: complete bilingual content and structured project, experience, skills and education data.
- `javascript/render.js`: shared semantic rendering components used by the build and browser.
- `javascript/app.js`: progressive interactions, themes, language preference, filters and accessible navigation.
- `javascript/theme-init.js`: sets the persisted theme before CSS paints.
- `css/portfolio.css`: central design tokens, two themes and responsive components.
- `scripts/build.mjs`: generates crawlable English HTML and the `dist/` production directory.
- `scripts/validate.mjs`: syntax, bilingual structure, asset/anchor and content checks.
- `assets/`: optimised portrait, original social image, favicon, 2025 CV and project reports.
- `docs/`: audit, browser measurements, validation limits and deployment instructions.

Edit both JSON files, then rebuild. To add a project, supply an ID, categories, description, technical focus, outcomes, technology tags and an honest visual overview. Optional `repository`, `demo` and `report` fields produce links only when supplied. Filters are derived from categories that actually contain projects. Do not add unfinished labs as completed work.

English is the default language and dark the default theme for a new visitor. Choices persist in local storage. Main content remains available as static English HTML if JavaScript cannot load.

## Hosting and recovery

Compatible with https://xarreujr.github.io/portfolio/ through relative asset URLs and `.nojekyll`; no SPA routing or framework server is needed. See `docs/DEPLOYMENT.md`. The build never publishes or changes remote settings.

The previous reviewed version is preserved in commit `f977dbd`. Legacy DevFolio styles/scripts and the Sass development dependency remain in the checkout for reference, but are not loaded or included as runtime code in the production build. Original attribution and licence are preserved in LICENSE.

## Content accuracy

Responsibilities and project details come from the owner's supplied information. The CISTI 2026 scientific article presentation is separate from BigData Helper. The latter's repository is private and is not shown as a public source link. The article title, period and co-author are transcribed from the supplied image. No DOI, demo URL or Splunk credential has been invented. TryHackMe records are completed learning paths, not labelled professional certifications. The undergraduate degree and master's are explicitly ongoing. The downloadable CV is labelled 2025.
