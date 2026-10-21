# Diogo Vidazinha — Portfolio

Professional portfolio focused on cybersecurity, SOC experience at Fujitsu, education and selected technical work. Available in Portuguese and English.

## Preview

Serve this directory with any static HTTP server, for example:

```sh
python -m http.server 8766 --bind 127.0.0.1
```

Open http://127.0.0.1:8766/ in a browser. Using an HTTP server is necessary for the language JSON files to load.

## Editing

- `index.html`: semantic content and Portuguese fallback.
- `css/design.css`: current responsive design, typography and layout.
- `lang/pt.json` and `lang/en.json`: translated text.
- `javascript/lang.js`: language preference and loading.
- `javascript/nav-mobile.js`: mobile navigation.
- `assets/`: portrait, CV and project reports.

Legacy SCSS and `css/main.css` are retained from the original DevFolio version; the current page uses `css/design.css`. No build step is required.

## Content status

Dates and SOC responsibilities were supplied by the portfolio owner. The TryHackMe training certificate names and IDs were transcribed from the supplied image. Splunk credentials and a master's report are pending identification and have not been added. The linked CV is explicitly labelled as the 2025 version.

## Hosting

Existing public address: https://xarreujr.github.io/portfolio/

Local edits do not publish automatically. Review the changes before updating the deployed branch.

Original portfolio based on DevFolio. See LICENSE.
