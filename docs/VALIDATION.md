# Validation and delivery — 21 October 2026

## Completed checks

- Static production build and JavaScript syntax checks pass using Node.js built-ins; no new package installation is required.
- Both language files have matching structure. Rendered English and Portuguese contain one H1, unique IDs, valid section anchors, existing local assets and known project categories.
- Browser checks covered 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560 and 3440 CSS pixels in English/dark and Portuguese/light. Requested widths were confirmed against the actual viewport. No horizontal overflow was detected in document dimensions or visible main-content element bounds. Raw measurements are in `responsive-results.json`.
- Project filtering was exercised in the browser: Data & analytics shows BigData Helper, the Netflix scientific article and Earth–Moon Simulation; All work restores five cards. Filter state is exposed with `aria-pressed` and results are announced through a live region.
- English/Portuguese switching updates navigation, body content, image alternative text, accessible labels, page title, description and the document language.
- Theme and language choices survive reload. Dark and English are defaults on a new visit.
- Mobile menu opens/closes, exposes `aria-expanded`, closes with Escape and returns keyboard focus to its toggle. Closed mobile navigation uses `inert`; focusable menu items are unavailable while closed.
- Semantic landmarks, heading hierarchy, visible focus styles, reduced-motion CSS and 44-pixel control targets are implemented. Text design-token combinations against the principal backgrounds have contrast ratios of at least 4.55:1.
- The portrait is 63,002 bytes in WebP versus 175,289 bytes in the original PNG (64% smaller). Only the hero image loads initially; project diagrams are native SVG/CSS and linked PDFs load when opened. There are no third-party runtime, font, icon-font or animation requests.
- Existing CV and project reports are preserved. The CV remains labelled as 2025. The scientific article at CISTI is explicitly separate from BigData Helper.

## Limits and remaining content

- No Lighthouse score or blanket accessibility certification is claimed. A Lighthouse audit, full assistive-technology review and cross-browser/device testing were not run.
- Physical multi-monitor movement, operating-system display scaling and each browser's zoom implementation were not directly exercised. Layouts were tested at the effective CSS viewport widths above, including narrow widths used by zoomed/side-by-side windows.
- GitHub and LinkedIn destinations are preserved from the existing portfolio. GitHub repository/profile identity was checked through the connector; LinkedIn's authenticated availability and deliverability of the email address were not independently verified. Local document links and production paths were verified.
- The exact GitHub Pages source setting could not be read through the available connector. No remote hosting configuration was changed. Production is a static directory with relative asset URLs and `.nojekyll`.
- The BigData Helper repository is private; no inaccessible public source button or invented live demo is shown. The article's DOI and the Splunk training credential were not supplied, so neither is fabricated.

## Recovery

Git commit `f977dbd` preserves the previously reviewed local design. The redesign is on `portfolio-redesign`; the existing public `main` branch is not changed by this delivery.
