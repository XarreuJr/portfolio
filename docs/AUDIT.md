# Portfolio audit — 21 October 2026

## Baseline and recovery

The repository is a static HTML/CSS/JavaScript site with legacy SCSS and Sass as its only development dependency. The reviewed local version is preserved in Git commit `f977dbd` on `portfolio-redesign`; the original public version remains on `origin/main`.

## Findings

- The public content still emphasises AI and undergraduate study; the local revision adds SOC work but lacks the full professional background supplied in the new brief.
- Several generations of CSS coexist. Tiny legacy typography, duplicated content and partial translations made maintenance and mobile readability difficult.
- There is no persistent theme switcher, project filtering, dedicated education section or structured project data.
- The original page loads icon fonts, animation libraries and tilt effects unnecessarily. The portrait and report PDFs are valuable and should be retained.
- The CV is from 2025; it must remain explicitly labelled. No Splunk certificate name or proof was supplied.
- BigData Helper is confirmed by the owner's new brief. The owner clarified that a scientific article, not BigData Helper, was presented at CISTI 2026. These are kept separate. A GitHub search found the BigData Helper repository is private, so it is not linked as a public project. No demonstration URL was supplied.
- Original markup includes mixed language labels, an invalid list child and an unclosed main landmark. The current reconstruction should use semantic markup and consistent accessible controls.

## Hosting inspection

The repository root contains `index.html` and relative assets, consistent with GitHub Pages at `/portfolio/`. No `.github` directory/workflow exists locally or at the repository contents endpoint. The connected GitHub tool rejected Actions/deployment endpoint reads, so the exact Pages source setting cannot be confirmed from that connector. Preserve the existing branch-based hosting arrangement; provide a static `dist/` build without changing remote settings or adding an automatically deploying workflow.

## Implementation plan

1. Retain static delivery; generate crawlable English HTML from structured bilingual content and reusable rendering functions. No framework or runtime dependency is needed.
2. Establish dark navy/cyan design tokens and a separately tuned light theme, with persistent choices and early theme initialisation.
3. Build a portrait-led hero, concise biography, experience timeline, featured project and filterable gallery, skills categories, education/training, and verified contact links.
4. Replace legacy scripts with one small module; support keyboard navigation, reduced motion, semantic filters, clear focus states and accessible mobile navigation.
5. Keep the 2025 CV and existing reports. Optimise the portrait to WebP; use honest schematic project visuals rather than fabricated screenshots.
6. Validate all requested viewport widths, both languages/themes, filtering and navigation. Produce a static build, source archive, validation report and deployment instructions. Report unavailable checks without inventing scores.
