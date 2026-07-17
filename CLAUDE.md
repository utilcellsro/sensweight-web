# UCS Website Relaunch — Project Brief

This file is auto-loaded every session. Read it before doing anything else.

## What this project is

**Unified Cloud Sensors, s.r.o.** (Ostrovačice, Czech Republic) is an IIoT company making remote monitoring systems for industrial weighing. The company owns **two domains**, which are now built as **two separate sites in this one monorepo**:

- **`sensweight.com`** — the real product/industry sales site, organized around a clean **Products vs Solutions** split (see below). **This is where all active work happens right now.**
- **`unifiedcloudsensors.com`** — a small, separate, minimal/premium corporate "about us" page, safe to link from LinkedIn. Not started. Own design DNA (not yet sourced). Scoped for later — do not build unless asked.

This supersedes the original plan of one combined trilingual site on `unifiedcloudsensors.eu` → `.com`. That plan is dead; see "Decisions already made" below for what replaced it.

## Repo structure (monorepo, reorganized 2026-07-17)

```
ucs_web/
├── sensweight/            ← Eleventy project that builds sensweight.com — THE active build
│   ├── src/                 (single language now — no /en//cs//pl/ split, no language switcher)
│   ├── package.json, eleventy.config.js
│   └── HOW_TO_WORK.md-equivalent instructions live in the root HOW_TO_WORK.md
├── unifiedcloudsensors/    ← placeholder only, not started (see its README.md)
├── references/             ← shared design/brand material, outside both builds
│   ├── UCS-Web-DNA.html               ← sensweight's visual design source (tokens, fonts, hero/card styling) — its industries-hub concept was tried and then dropped, see Decisions below
│   ├── roi-example-truckscale.jpg     ← real worked ROI example ("Truck Scale Digitization"), source for the ROI calculator's per-category rate formula
│   ├── SEO_AIEO_Strategy.docx / .pdf
│   ├── ucs-relaunch-plan.html         ← original single-site plan, superseded, kept for history
│   ├── ucs-logo-master.png
│   ├── leaflets/                       ← 3 SensWEIGHT print-ready leaflets (brand/design reference)
│   └── mockups/                        ← 2 radial-wheel infographics (product lines / platform capabilities) + 1 homepage concept screenshot (Czech), all reference material for the industries-hub direction
├── CLAUDE.md
└── HOW_TO_WORK.md
```

`site/`, `concepts/`, and `deploy/` (three generations of pre-DNA design prototypes — an early standalone CZ-only build, 4 exploratory concept HTMLs, and the A/B/C Vercel concepts the team voted on and moved past) were deleted 2026-07-17 as part of this reorg. They're recoverable from git history if ever needed; `deploy/`'s A/B/C concepts are also still live at `ucs-frontend-ivory.vercel.app` as a separate hosted artifact, unaffected by the local deletion.

## Decisions already made — do NOT re-ask

| Topic | Decision |
|---|---|
| Two domains | `sensweight.com` (product/industry hub) and `unifiedcloudsensors.com` (corporate/brand) are separate sites, not one combined site |
| Priority | `sensweight.com` only, for now — `unifiedcloudsensors.com` is deferred |
| **sensweight.com IA — Products vs Solutions (2026-07-17, current)** | Two clean top-level pillars, nothing else competing for primary nav space: **Products** = the real, physical, touchable catalog (sensors, indicators, junction boxes, gateways, accessories) at `/products/`. **Solutions** = the five dashboard-based monitoring systems (SensWEIGHT, SensSILO, SensGEO, SensATMO, SensGREEN) at `/solutions/`, each pairing UCS hardware with a UCS Cloud dashboard. |
| Industries — dropped for now | The 8-industry taxonomy (quarries, concrete, silos, recycling, logistics, belt scale, geotechnical, green roofs) was tried as the primary nav axis, then as a homepage teaser hub — both were judged redundant/overcomplicated once Products vs Solutions was settled on. **Not currently a distinct section anywhere on the site.** The old industry→brand mapping (see git history / commit `dd0d1c5`) may still be useful if industry-specific content gets added back inside each Solution's own page later — that hasn't been decided. |
| How to Buy / Request a Dealer | Merged into one page (`/how-to-buy/`) — the 3-step buying explainer flows straight into the dealer-request form. There is no separate `/request-a-dealer/` page anymore; two pages for one linear flow was judged redundant. |
| sensweight.com language | **English only** — no CS/PL. The old trilingual (EN/CS/PL) decision was for the combined single-site plan and is superseded here |
| sensweight.com hero | DNA visual style adopted (tokens, fonts, card treatments) — but the DNA's own industries-hub navigation concept was NOT kept, see above |
| sensweight.com ROI + demo | Reuse the existing ROI calculator and demo engine as-is, don't rebuild |
| unifiedcloudsensors.com | Different DNA (not yet sourced), minimal/premium, corporate tone — scoped later |
| Build tool | Eleventy (11ty) v3 — one template set, single English translation object (`translations.en`) |
| Hosting | AWS S3 + CloudFront + ACM + Route 53 — fully static, no server (unchanged) |
| Demo access | Open to all visitors — no login gate |
| Demo content | 8 load cells — radar/spider plot, data table, summary bar (unchanged) |

## The two pillars

**Solutions** (`/solutions/` index + one page each) — dashboard-based monitoring systems:
- **SensWEIGHT™** — remote weighing monitor (has the M500 ThingsBoard demo data)
- **SensSILO™** — silo/container level monitoring
- **SensGEO™** — geotechnical inclination monitoring (construction)
- **SensATMO™** — atmospheric/environmental monitoring
- **SensGREEN™** — green roof/wall structural monitoring

**Products** (`/products/`, one catalog page, mocked) — the physical, touchable components:
- Load cells & sensors, indicators & terminals, junction & summing boxes, IIoT edge gateways (UCS X1/X2/X2-DIN/X3 — X3 has its own detail page at `/ucsx3/`), accessories & calibration services.

## Current state — 2026-07-17

- **Monorepo reorg complete**: `sensweight/` holds the Eleventy build, `unifiedcloudsensors/` is an empty placeholder, `references/` holds shared brand/design material. Verified: `cd sensweight && npm install && npm start` boots at `localhost:8080/` (no `/en/` prefix), all pages return 200.
- **Carried forward from pre-reorg WIP** (was uncommitted, already anticipated the domain-split pivot): the ROI calculator is rewired to a per-category rate formula matching `references/roi-example-truckscale.jpg` exactly (downtime, efficiency, weighing errors, fraud, calibration, structural, audit, multi-site — each a fixed rate × visitor-entered quantity); design tokens replaced (Chakra Petch display font, navy `#1D2C49`/blue `#476DB8`/ink `#2F2F2E` palette with `--ok`/`--warn`/`--alarm`/`--off` sensor-state colors — see table below).
- **This reorg session removed**: the `/en/` URL prefix and the EN/CZ language switcher entirely (English-only now — flattened `src/en/*` up to `src/*`, deleted `src/cs/`, deleted the `cs:` block from `translations.js`, added `src/_data/lang.js` as a flat `"en"` global replacing the old per-directory `en.json`/`cs.json` convention).
- **IA simplified to Products vs Solutions (2026-07-17, same day, later pass)** — this went through two iterations before landing:
  1. First built `/solutions/` around the 8 DNA industries (quarries, concrete, silos, recycling, logistics, beltscale, geotechnical, greenroofs) plus a homepage industries radial hub, and a separate `/hardware/` catalog page.
  2. User feedback: keep it to two clean pillars — **Products** (real, touchable: sensors, indicators, etc.) and **Solutions** (the 5 dashboard systems) — and drop industries as a distinct axis, it was redundant. Also merge How to Buy + Request a Dealer, they were "too close to each other."
  - Final state: `/hardware/` renamed to `/products/` (nav label, translations key `products_page`, file names). `/solutions/` rewritten as a simple index of the 5 Sens- systems (reusing existing `t.products[key]` name/desc/badge content — no new copy needed); the 8 industry pages, `solution.njk`, and the `t.solutions` data block were deleted. Homepage industries radial hub removed entirely (`t.industries` data and `.industries-*`/`.industry-*` CSS deleted too). Homepage's 5-brand card section relabeled from "Product Lines" to "Solutions" and the UCS X3 card dropped from it (X3 is hardware, lives in the Products catalog and its own `/ucsx3/` page instead). Hero tiles are now Products → Solutions → How to Buy, all linking to real pages (no more `#anchor` scroll-links). `/request-a-dealer/` deleted; its form now lives at the bottom of `/how-to-buy/` (same `dealer-form.js`, same `#dealer-form` id).
  - **If asked to re-add an industries section or re-split How to Buy/Request a Dealer, check with the user first** — this was a deliberate simplification after trying the richer version, not an oversight.

### Design tokens (current, from main.css — 2026-07-17)

| Token | Value | Role |
|---|---|---|
| Navy | `#1D2C49` | Dark chrome / product-dark-surface backgrounds only — never text |
| Blue | `#476DB8` | Brand lead — actions, links, key figures |
| Blue Dark | `#2F4D89` | Hover/pressed state for blue |
| Blue Pale | `#DCE5F4` | Chips, focus rings, dark-surface text |
| Sky | `#7ED3F0` | Rare live-data accent only |
| Ink | `#2F2F2E` | Headings + primary text |
| Ink2 | `#484847` | Secondary/emphasis text |
| Muted | `#6F6F6E` | Tertiary/meta text |
| Muted2 | `#B9B9B8` | Quaternary, lightest muted |
| Bg | `#F7F7F6` | Section-alt / page background |
| Border | `#ECECEB` | Dividers |
| Ok | `#3F8F6B` | Sensor/device state — good |
| Warn | `#C98A2E` | Sensor/device state — warning |
| Alarm | `#BF4B41` | Sensor/device state — alarm |
| Off | `#9A9A99` | Sensor/device state — offline |

Fonts: `Chakra Petch` (headings/display), `IBM Plex Sans` (body), `IBM Plex Mono` (data labels, monospace UI).

## Open questions

1. **ROI formula generalization** — `references/roi-example-truckscale.jpg` gives one worked example (Truck Scale Digitization). Confirm whether its per-category rates apply site-wide or need variants.
2. **unifiedcloudsensors.com DNA** — not sourced yet.
3. **ThingsBoard cross-domain approach** for the live demo — still open (public iframe vs REST API vs subdomain+proxy).
4. **YouTube video URLs** — placeholders still in place in `home.njk`.
5. **M500 identity** — customer installation or UCS reference system? (privacy)
6. **AWS account** — existing prod environment or fresh setup?
7. **Dealer form backend** — currently a `mailto:` fallback (static site, no server), now living at the bottom of `/how-to-buy/`. Needs a real endpoint before launch if silent submission is required.
8. **`sales@unifiedcloudsensors.com` inbox** — placeholder mailto target, confirm it exists/is monitored, or swap in the real sales inbox. (Note: now that sensweight.com and unifiedcloudsensors.com are separate, confirm which domain's inbox this should actually be.)
9. **Whether industry-specific content ever comes back** — not currently planned, but if it does, the working assumption (per user feedback) is it belongs inside each Solution's own page, not as a separate top-level section.

## Implementation phases (original estimate, predates the 2-domain split — treat as directional only)

| Phase | Weeks | Focus |
|---|---|---|
| 1 | 1–2 | AWS infra + Eleventy template system + homepage |
| 2 | 3–5 | Content migration (5 product lines, hardware, guides, FAQ) |
| 3 | 6–7 | ThingsBoard demo + ROI calculator |
| 4 | 8–9 | Video gallery, events/promotions, resources page |
| 5 | 10 | QA, analytics, soft launch, DNS cutover |
