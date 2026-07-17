# How to work with this project

## Project structure

```
ucs_web/
├── sensweight/                 ← Eleventy project for sensweight.com — THE active build
│   ├── src/
│   │   ├── _data/
│   │   │   ├── translations.js ← ALL text content, English only (translations.en)
│   │   │   └── lang.js         ← global data file, exports "en" — used by templates as {{ lang }}
│   │   ├── _includes/
│   │   │   ├── base.njk        ← HTML shell (head, scripts)
│   │   │   ├── nav.njk         ← Top navigation bar (logo only, no language switcher)
│   │   │   ├── footer.njk      ← Footer
│   │   │   └── _content/
│   │   │       ├── home.njk         ← Homepage sections (hero, industries hub, products, ROI, video...)
│   │   │       ├── sensweight.njk   ← SensWEIGHT™ product page
│   │   │       ├── ucsx3.njk        ← UCS X3 hardware page
│   │   │       ├── solution.njk     ← generic solutions-page template
│   │   │       ├── product.njk      ← generic product-page template
│   │   │       ├── demo-product.njk ← generic per-product live demo template
│   │   │       └── hardware.njk     ← mocked hardware/components catalog
│   │   ├── assets/
│   │   │   ├── css/main.css    ← All styles — design tokens, layout, components
│   │   │   ├── js/home.js      ← ROI calculator + video lazy loader
│   │   │   ├── js/demo.js + demo-configs.js ← shared live-demo engine (radar chart/table/summary)
│   │   │   └── images/ucs-logo.png
│   │   ├── index.njk, sensweight.njk, senssilo.njk, sensgeo.njk, sensatmo.njk, sensgreen.njk, ucsx3.njk, hardware.njk, how-to-buy.njk, request-a-dealer.njk, events.njk ← page entry points, flat (no /en/ prefix)
│   │   ├── solutions/           ← 8 industry pages (quarries, concrete, silos, recycling, logistics, beltscale, geotechnical, greenroofs)
│   │   └── demo/                ← demo hub + 5 per-product live demo pages
│   ├── _site/                  ← BUILD OUTPUT — do not edit, auto-generated
│   ├── eleventy.config.js
│   └── package.json
├── unifiedcloudsensors/         ← minimal static placeholder for unifiedcloudsensors.com (index.html, no build step) — NOT the real site, see its README.md
├── references/                  ← shared design/brand material, not part of either build
│   ├── UCS-Web-DNA.html               ← sensweight's design source
│   ├── roi-example-truckscale.jpg     ← source for the ROI calculator's rate formula
│   ├── leaflets/, mockups/            ← brand/design reference material
│   └── ucs-logo-master.png
├── CLAUDE.md                    ← Project brief + current state (auto-loaded by Claude)
├── HOW_TO_WORK.md                ← This file
└── .gitignore
```

---

## Running locally

```bash
cd C:\Users\e.chetvergov.UTILCELL\Desktop\ucs\ucs_web\sensweight
npm start
```

Opens at **http://localhost:8080/** (root — no language prefix) — keep the terminal open. Eleventy watches files and rebuilds automatically on every save. No browser refresh needed (BrowserSync included).

> If you get ERR_CONNECTION_REFUSED: the terminal was closed. Run `npm start` again.
> If `node_modules/` is missing (e.g. after a fresh clone): run `npm install` first.

---

## The unifiedcloudsensors.com placeholder

`unifiedcloudsensors/index.html` is a static, single-file holding page — no Eleventy, no build step. Just open it directly in a browser, or serve the folder with any static file server (e.g. `npx http-server unifiedcloudsensors`). Edit the HTML/inline `<style>` directly.

This is **not** the real site — it's a plain placeholder (logo, a paragraph, a link to sensweight.com) standing in until the domain's own design DNA is sourced and a proper build starts. Don't invest in it beyond quick copy/logo tweaks; expect it to be replaced wholesale later.

---

## How to edit content

All text is in one file: `sensweight/src/_data/translations.js`

It exports `{ en: {...} }` — a single language now, no more `cs`/`pl` keys. Every string on the site comes from here.
To change the homepage headline: find `en.hero.headline` and edit the value.

Template files (`*.njk`) reference translations as `{{ t.hero.headline }}` etc., where `t = translations[lang]` and `lang` is always `"en"` (from `src/_data/lang.js`).

Template files use `{{ lang }}` only for the `translations[lang]` lookup now — NOT for URL prefixes. All internal links are plain paths (`/senssilo/`, `/solutions/`, etc.), not `/{{ lang }}/senssilo/`. If you ever add a new internal link, don't prefix it with a language segment.

---

## How to edit styles

All CSS is in `sensweight/src/assets/css/main.css`.

Design tokens are CSS custom properties at the top of the file (`--navy`, `--blue`, `--ink`, `--ok`, `--warn`, `--alarm`, `--off`, etc. — see CLAUDE.md for the current token table). Change a token and it propagates everywhere.

Current design direction: the DNA in `references/UCS-Web-DNA.html`, applied wholesale (Chakra Petch display font, navy/blue/ink palette, 8-industry radial hub on the homepage).

---

## Adding a new language string

Single-language now — just add the key under `en:` in `translations.js` and reference it in the template as `{{ t.your.key }}`. No need to touch multiple language blocks anymore.

---

## Adding a YouTube video

In `sensweight/src/_includes/_content/home.njk`, find the video section.
Replace `YOUR_VIDEO_ID_1` with the actual YouTube video ID (the part after `?v=`).
The JS in `home.js` will automatically load the thumbnail and enable click-to-play.

---

## ROI calculator

Logic is in `sensweight/src/assets/js/home.js`. It's a per-category rate model, sourced from `references/roi-example-truckscale.jpg` (a real "Truck Scale Digitization" quote):

- Categories: downtime, efficiency, weighing errors, fraud, calibration drift, structural stress, financial audit, multi-site analytics.
- Each category = a fixed €-rate (set per-language in `translations.js` as `rate_<category>`) × the visitor's entered quantity.
- Total saving = sum of all categories.
- Net benefit = total saving − system cost.
- Payback (months) = system cost ÷ (total saving / 12).
- ROI = net benefit / system cost × 100.

Currency and locale come from `data-locale`/`data-currency` attributes on `.roi-grid`, set in `translations.js`.

---

## What's still open

See "Open questions" in CLAUDE.md for the full list — highlights: ROI formula generalization beyond the one worked example, industries→brand mapping confirmation, unifiedcloudsensors.com DNA sourcing, ThingsBoard demo integration, YouTube video IDs, dealer-form backend.
