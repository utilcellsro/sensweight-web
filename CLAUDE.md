# UCS Website Relaunch — Project Brief

This file is auto-loaded every session. Read it before doing anything else.

## What this project is

**Unified Cloud Sensors, s.r.o.** (Ostrovačice, Czech Republic) is an IIoT company making remote monitoring systems for industrial weighing. The company owns **two domains**, which are now built as **two separate sites in this one monorepo**:

- **`sensweight.com`** — the real product/industry sales site, organized around a three-tier IA: **Industries** (thin routing layer, "find yourself") → **Solutions** / **Products** (the real depth). See below. **This is where all active work happens right now.**
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
| **sensweight.com IA — Industries → Solutions/Products (2026-07-17, current, 3rd iteration)** | **Industries** (`/industries/`) is the front door — thin pages, one short paragraph + "recommended solutions" links, no duplicated depth. **Solutions** (`/solutions/`) = the five dashboard-based monitoring systems. **Products** (`/products/`) = the real, physical, touchable catalog. Industry pages route INTO Solutions/Products; they don't restate their content. |
| Why industries came back | First try: industries as the primary `/solutions/` taxonomy (8 pages) + a homepage radial hub — redundant, two places showing the same 8 things. Second try: dropped industries entirely, just Products vs Solutions — but a customer's first instinct is to click their industry, not a brand name like "SensGEO." Landed on: industries as a thin routing layer, not a content layer — solves both problems. |
| How to Buy / Request a Dealer | Merged into one page (`/how-to-buy/`) — the 3-step buying explainer flows straight into the dealer-request form. There is no separate `/request-a-dealer/` page anymore; two pages for one linear flow was judged redundant. |
| **Positioning — full turnkey system, not bring-your-own-hardware** | The homepage's "How it works" flow diagram used to open with "Your existing equipment" (implying the customer already owns the sensor/scale and UCS just bolts on a module + cloud). User flagged this as wrong: UCS should sell **the whole circle — sensors through installation through cloud — as one system**, individually specified per customer's site/case, not a modular add-on to equipment they already have. Flow diagram rewritten accordingly (`t.flow` in translations.js): "We assess your site" → "We engineer & install the hardware" → "UCS Cloud, live." Don't reintroduce "your existing equipment" framing anywhere else on the site without checking first. |
| sensweight.com language | **English only** — no CS/PL. The old trilingual (EN/CS/PL) decision was for the combined single-site plan and is superseded here |
| sensweight.com hero | DNA visual style adopted (tokens, fonts, card treatments) — the DNA's own industries-hub navigation concept went through iteration (see above) before landing on the thin-routing-layer version |
| sensweight.com ROI + demo | Reuse the existing ROI calculator and demo engine as-is, don't rebuild |
| unifiedcloudsensors.com | Different DNA (not yet sourced), minimal/premium, corporate tone — scoped later |
| Build tool | Eleventy (11ty) v3 — one template set, single English translation object (`translations.en`) |
| Hosting | AWS S3 + CloudFront + ACM + Route 53 — fully static, no server (unchanged) |
| Demo access | Open to all visitors — no login gate |
| Demo content | 8 load cells — radar/spider plot, data table, summary bar (unchanged) |

## The three tiers

**Industries** (`/industries/` index + 8 thin pages) — the front door, "find yourself first":
- quarries, concrete, silos, recycling, logistics, beltscale, geotechnical, greenroofs
- Each page: hero (tagline/headline/sub) + a "recommended for you" grid linking to 1–2 Solutions + a CTA to How to Buy / Products. No capabilities/steps/specs content — that all lives one level down, in Solutions.
- Industry → Solution(s) mapping: Belt Scale/Logistics/Concrete → SensWEIGHT; Silos → SensSILO; Geotechnical → SensGEO; Green Roofs → SensGREEN; Recycling → SensWEIGHT + SensATMO; Quarries → SensWEIGHT + SensGEO.

**Solutions** (`/solutions/` index + one page each) — dashboard-based monitoring systems, the real depth:
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
- **IA went through three iterations on 2026-07-17 before landing** (all same day):
  1. Built `/solutions/` around the 8 DNA industries (quarries, concrete, silos, recycling, logistics, beltscale, geotechnical, greenroofs) plus a homepage industries radial hub, and a separate `/hardware/` catalog page.
  2. User feedback: too many overlapping axes — simplified to two clean pillars, **Products** (real, touchable) and **Solutions** (the 5 dashboard systems), dropped industries entirely. Also merged How to Buy + Request a Dealer, they were "too close to each other."
  3. User feedback again: a customer's first instinct is to click their industry, not a brand name like "SensGEO" — industries needed to come back, but as a thin routing layer this time, not a duplicated content layer.
  - **Final state**: `/hardware/` renamed to `/products/` (nav label, translations key `products_page`, file names). `/solutions/` is a plain index of the 5 Sens- systems (reuses `t.products[key]` name/desc/badge — no new copy). `/industries/` is a NEW index + 8 thin pages (`t.industries.items[key]`: name/tagline/headline/sub/`solutions[]`) — each just a hero + a small grid linking to 1–2 real Solution pages + a CTA to How to Buy / Products; no capabilities/steps/specs duplicated from Solutions. Homepage's 5-brand section is labeled "Solutions" (UCS X3 card removed — it's hardware, lives in Products + `/ucsx3/`). Hero tiles: **Industries → Products → Solutions** (Industries first, matching the "click industry first" insight); How to Buy dropped from the hero (still in footer + every page's CTA). `/request-a-dealer/` deleted; its form lives at the bottom of `/how-to-buy/`.
  - **If asked to make industry pages full-depth again (capabilities/steps/specs) or to re-split How to Buy/Request a Dealer, check with the user first** — both were deliberately tried and reverted once already, this is the settled shape.

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

## Implementation phases (original estimate, predates the 2-domain split — treat as directional only)

| Phase | Weeks | Focus |
|---|---|---|
| 1 | 1–2 | AWS infra + Eleventy template system + homepage |
| 2 | 3–5 | Content migration (5 product lines, hardware, guides, FAQ) |
| 3 | 6–7 | ThingsBoard demo + ROI calculator |
| 4 | 8–9 | Video gallery, events/promotions, resources page |
| 5 | 10 | QA, analytics, soft launch, DNS cutover |
