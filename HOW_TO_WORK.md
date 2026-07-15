# How to work with this project

## Project structure

```
ucs_web/
├── src/                        ← Eleventy source (edit these files)
│   ├── _data/
│   │   └── translations.js     ← ALL text content for EN / CS / PL
│   ├── _includes/
│   │   ├── base.njk            ← HTML shell (head, scripts)
│   │   ├── nav.njk             ← Top navigation bar
│   │   ├── footer.njk          ← Footer
│   │   └── _content/
│   │       ├── home.njk        ← Homepage sections (hero, products, ROI, video...)
│   │       ├── sensweight.njk  ← SensWEIGHT™ product page
│   │       ├── ucsx3.njk       ← UCS X3 hardware page
│   │       └── demo.njk        ← Live demo page
│   ├── assets/
│   │   ├── css/main.css        ← All styles — design tokens, layout, components
│   │   ├── js/home.js          ← ROI calculator + video lazy loader
│   │   └── images/ucs-logo.png ← Logo (also at project root for deploy/)
│   ├── en/                     ← EN page entry points (import home.njk etc.)
│   ├── cs/                     ← CZ page entry points
│   └── pl/                     ← PL page entry points
├── _site/                      ← BUILD OUTPUT — do not edit, auto-generated
├── deploy/                     ← Three standalone concept HTML files for Vercel
│   ├── index.html              ← Concept picker page
│   ├── a.html                  ← Concept A: Light/Precision
│   ├── b.html                  ← Concept B: Dark/Tech
│   ├── c.html                  ← Concept C: Minimal/Bold
│   ├── ucs-logo.png            ← Logo copy for deploy/
│   └── vercel.json             ← Vercel config (cleanUrls: true)
├── ucs-logo.png                ← Master logo file
├── CLAUDE.md                   ← Project brief + current state (auto-loaded by Claude)
├── HOW_TO_WORK.md              ← This file
├── eleventy.config.js          ← Eleventy config
└── package.json
```

---

## Running locally

```bash
cd C:\Users\e.chetvergov.UTILCELL\Desktop\ucs\ucs_web
npm start
```

Opens at **http://localhost:8080/en/** — keep the terminal open. Eleventy watches
files and rebuilds automatically on every save. No browser refresh needed (BrowserSync included).

> If you get ERR_CONNECTION_REFUSED: the terminal was closed. Run `npm start` again.

---

## How to edit content

All text is in one file: `src/_data/translations.js`

It exports an object with keys `en`, `cs`, `pl`. Every string on the site comes from here.
To change English homepage headline: find `en.hero.headline` and edit the value.

Template files (`*.njk`) reference translations as `{{ t.hero.headline }}` etc.
You should not need to touch the templates for pure content changes.

---

## How to edit styles

All CSS is in `src/assets/css/main.css`.

Design tokens are CSS custom properties at the top of the file (`--navy`, `--blue`, `--sky`, etc.).
Change a token and it propagates everywhere.

Current design direction: **Concept A — Light/Precision** (white nav, light blue-grey hero, sky blue accents).

---

## Deploying design concepts to Vercel

The `deploy/` folder contains three standalone concept HTML files deployed to Vercel
for team design review. These are independent of the main Eleventy build.

**Vercel project:** `ucs-frontend`
**Team:** `zhenyachet91-7909s-projects`
**Dashboard:** https://vercel.com/zhenyachet91-7909s-projects/ucs-frontend/settings
**Live URL:** https://ucs-frontend-ivory.vercel.app

To redeploy after changes:

```bash
cd C:\Users\e.chetvergov.UTILCELL\Desktop\ucs\ucs_web\deploy
vercel --yes
```

Vercel CLI is already authenticated and linked to the project. No login needed.

Concept URLs:
- `/` — Picker page (share this with colleagues)
- `/a` — Light / Precision
- `/b` — Dark / Tech
- `/c` — Minimal / Bold

---

## Adding a new language string

1. Open `src/_data/translations.js`
2. Add the key to all three language objects (`en`, `cs`, `pl`)
3. Reference it in the template as `{{ t.your.key }}`

---

## Adding a YouTube video

In `src/_includes/_content/home.njk`, find the video section.
Replace `YOUR_VIDEO_ID_1` with the actual YouTube video ID (the part after `?v=`).
The JS in `home.js` will automatically load the thumbnail and enable click-to-play.

---

## ROI calculator

Logic is in `src/assets/js/home.js`. Formula:
- Labour saving = FTE × 2080h × hourly wage × 0.40
- Downtime saving = failures/yr × downtime hours × hourly cost × 0.55
- Payback = system cost ÷ (total saving / 12) → months
- ROI = (total saving − system cost) / system cost × 100

Currency and locale come from `data-locale` / `data-currency` attributes on `.roi-grid`,
set per language in `translations.js`.

---

## What still needs to happen

| Next step | Notes |
|---|---|
| Decide design direction | Team vote — meeting 2026-06-30 |
| Apply chosen concept to Eleventy main build | Currently Concept A styling in main.css |
| YouTube video IDs | Provide real IDs — placeholders already in place |
| ThingsBoard demo integration | Waiting on M500 public URL or REST API access |
| ROI formula document | User to share — placeholder formula is in place |
| AWS infrastructure setup | S3 + CloudFront + ACM + Route 53 |
| Content migration | Product pages, FAQ, resources |
