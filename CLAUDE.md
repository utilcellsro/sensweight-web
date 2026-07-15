# UCS Website Relaunch — Project Brief

This file is auto-loaded every session. Read it before doing anything else.

## What this project is

Rebuilding **unifiedcloudsensors.eu** → **unifiedcloudsensors.com**, hosted on AWS CloudFront (S3 static files). The company is **Unified Cloud Sensors, s.r.o.** (Ostrovačice, Czech Republic) — an IIoT company making remote monitoring systems for industrial weighing.

## Decisions already made — do NOT re-ask

| Topic | Decision |
|---|---|
| Three versions | **CZ / PL / EN** language editions — not product sites or audience tiers |
| Primary language | **English** on .com (global); CS and PL are co-equal variants |
| Build tool | **Eleventy (11ty)** — one template, three JSON translation files (`en.json`, `cs.json`, `pl.json`) |
| Hosting | **AWS S3 + CloudFront + ACM + Route 53** — fully static, no server |
| Language routing | **CloudFront Function** reads `Accept-Language` header on root `/` → redirects to `/en/`, `/cs/`, `/pl/` |
| Demo access | **Open to all visitors** — no login gate |
| Demo content | **8 load cells** — spider/radar plot, data table, analytics panel, summary bar |
| ThingsBoard approach | Recommended: move TB to `iot.unifiedcloudsensors.com` (DNS + nginx), then REST API + custom Chart.js |

## Product lines (5 + hardware)

- **SensWEIGHT™** — remote weighing monitor (flagship; has the M500 ThingsBoard demo data)
- **SensSILO™** — silo/container level monitoring
- **SensGEO™** — geotechnical inclination monitoring (construction)
- **SensATMO™** — atmospheric/environmental monitoring
- **SensGREEN™** — green roof/wall structural monitoring
- **Hardware**: UCS X, X1, X2, X2-DIN modules + UCS Cloud platform

## Current .eu site facts

- 96 URLs, Czech-primary, trilingual (CZ/PL/EN switcher already exists)
- Sitemap: `https://www.unifiedcloudsensors.eu/sitemap.xml`
- The existing ROI page has **no numbers** — only narrative text. The ROI calculator must be built from scratch once the user shares the formula document.

## Key files in this folder

| File | Purpose |
|---|---|
| `ucs-relaunch-plan.html` | Full implementation plan (open in browser) |
| `SensWEIGHT_BeltScale_Leaflet_A3_PRINT_READY.pdf` | Brand/design reference |
| `SensWEIGHT_Leaflet_A3_SILOPRINT_READY.pdf` | Brand/design reference |
| `SensWEIGHT_Leaflet_A3_TruckScalePRINT_READY.pdf` | Brand/design reference |
| claude.ai/design project "Unified Cloud Sensors redesign" (`4d1bd223-d7b1-46cf-9718-ca8f86eb8417`) | Source of current homepage design (dark hero, live-dashboard product cards, Archivo/IBM Plex type) — access via the `DesignSync` tool |

## Current state — as of 2026-07-15

### What has been built

| Item | Status |
|---|---|
| Eleventy project scaffold | ✅ Done — `npm start` → `localhost:8080/en/` |
| Homepage template (`home.njk`) | ✅ Done — all sections complete |
| ROI calculator | ✅ Done — live JS, EUR/CZK/PLN per language |
| Video section | ✅ Done — placeholders, will lazy-load YouTube on real IDs |
| Three language editions EN/CS/PL | ✅ Done — translations in `src/_data/translations.js` |
| Product pages: SensWEIGHT, UCS X3 | ✅ Done |
| Demo page scaffold | ✅ Done (no live ThingsBoard yet) |
| Logo | ✅ `ucs-logo.png` in project root + `src/assets/images/` |
| CSS redesign — light/precision style | ✅ Superseded — see "Homepage redesign" row below |
| Homepage redesign — dark hero + live-dashboard product cards | ✅ Done 2026-07-15 — sourced from user's Claude Design project ("Unified Cloud Sensors redesign", `UCS Home.dc.html`). New fonts (Archivo/IBM Plex Sans/IBM Plex Mono), new tokens (see table below), dark navy hero with 3 glass quick-link tiles, new "how it works" 3-node flow section, product cards rebuilt with per-product live mini-dashboards (axle bars, silo levels, tilt gauge, env readouts, load/moisture donut). Real 5 product lines used (mockup's placeholder SensBELT/SensPOOL were not adopted). |
| Three Vercel concept previews | ✅ Deployed and shared with team |

### Vercel deployment (design concepts)

- **Project:** `ucs-frontend` — team `zhenyachet91-7909s-projects`
- **Dashboard:** https://vercel.com/zhenyachet91-7909s-projects/ucs-frontend/settings
- **Live URL:** https://ucs-frontend-ivory.vercel.app
- **Concept A (Light):** https://ucs-frontend-ivory.vercel.app/a
- **Concept B (Dark):** https://ucs-frontend-ivory.vercel.app/b
- **Concept C (Minimal):** https://ucs-frontend-ivory.vercel.app/c
- **Source folder:** `deploy/` in project root
- **To redeploy:** `cd deploy && vercel --yes` (CLI already authenticated)

### Design direction

Three concepts were built for team review. Meeting scheduled 2026-06-30.
- **A — Light/Precision:** white nav, light blue-grey hero, sky blue accents. Preferred by user so far.
- **B — Dark/Tech:** full navy, electric blue glow, teal accents.
- **C — Minimal/Bold:** white, huge type, products as numbered list rows.

**The Eleventy main build currently uses Concept A styling** (light redesign committed to `main.css`).

### Design tokens (current — from Claude Design mockup, 2026-07-15)

| Token | Value | Use |
|---|---|---|
| Navy | `#0C2233` | Dark hero, product card headers, footer, CTAs, ROI results panel |
| Electric Blue | `#0E6FD1` | Primary buttons, CTA sections, hero tile icons |
| Sky | `#3D91D6` | Nav accent, section taglines, section headers, SensGEO accent |
| Teal | `#0FA594` | Data/live indicators, ROI highlight, SensSILO accent |
| Live Green | `#28D07A` | Pulsing "● live" dot on product dashboard cards |
| Amber | `#F0A020` | ROI payback value, SensATMO accent |
| Cool Grey | `#F4F8FC` | Section alt backgrounds |
| Border | `#D8E4F0` | All dividers |

Fonts: `Archivo` (headings), `IBM Plex Sans` (body), `IBM Plex Mono` (data labels, monospace UI) — replaces the earlier Segoe UI / Cascadia Code pairing.

### Open questions (as of 2026-06-29)

1. ~~Design direction — team vote happening 2026-06-30.~~ **Resolved 2026-07-15** — user brought a new design (Claude Design project "Unified Cloud Sensors redesign") superseding the A/B/C Vercel concepts; adopted into the main Eleventy build (see Current state above).
2. **ThingsBoard cross-domain approach** — A (public iframe), B (REST API custom charts), or C (subdomain + proxy)? Recommendation is C then B.
3. **ROI formula document** — not yet shared by user
4. **AWS account** — existing prod environment or fresh setup?
5. **YouTube video URLs** — for the video gallery page (placeholders in place)
6. **M500 identity** — customer installation or UCS reference system?

## Design system (from leaflets)

| Token | Value |
|---|---|
| Navy (authority) | `#091828` |
| Electric Blue (brand) | `#1560E0` |
| Teal (live/data) | `#00B4A6` |
| Sky (secondary) | `#3D91D6` |
| Cool Grey (bg) | `#ECF0F7` |
| Amber (ROI/alerts) | `#D68C10` |

Typography (original leaflet reference — superseded 2026-07-15 by Archivo/IBM Plex, see current tokens table above): `Segoe UI` (headings + body), `Cascadia Code / Consolas` (data labels, monospace UI).

## Implementation phases (10 weeks total)

| Phase | Weeks | Focus |
|---|---|---|
| 1 | 1–2 | AWS infra + Eleventy template system + homepage |
| 2 | 3–5 | Content migration (5 product lines, hardware, guides, FAQ) |
| 3 | 6–7 | ThingsBoard demo + ROI calculator |
| 4 | 8–9 | Video gallery, events/promotions, resources page |
| 5 | 10 | QA, analytics, soft launch, DNS cutover |
