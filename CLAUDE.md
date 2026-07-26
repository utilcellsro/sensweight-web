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
│   ├── SEO_AIEO_Strategy.docx / .pdf   ← reviewed 2026-07-17, its 4-phase action plan is folded into "Implementation phases" below
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
| ROI calculator placement | Moved off the homepage — lives on each Solution page instead, next to that solution's own numbers (2026-07-22, chief's presentation feedback) |
| Video carousel | Adding a carousel of videos (AI-generated first, real footage later) as a hero/section background, modeled on mt.com/cz/cs/home.html (2026-07-22) |
| Content review/markup tool | **Shared Drive folder** containing the live site preview link + `references/site-proposals.md` (a running proposals list team members comment on, discussed in meetings, status retroactively marked Integrated/Not integrated) — settled after two superseded passes (Google Docs comment mode on the video brief; live pinned comments on the rendered site via Vercel Comments/BugHerd-class tools). See `TASKS.md` Task 6 for the full history |
| ROI teaser routing (homepage) | The homepage's ROI teaser should point into each individual Solution page (SensWEIGHT, SensSILO, etc.) rather than a single generic link to `/solutions/` — user's own note, 2026-07-26. Not yet implemented. |
| Solution-page pitch framing | Solution pages explain what they do via a health/medical diagnostic analogy rather than purely technical framing, each with its own distinct analogy (not one template reused). **Shipped for SensWEIGHT** (2026-07-26, "vital signs"/heart-monitor framing) and **SensSILO** (2026-07-26, continuous-glucose-monitor vs. manual-dip framing, rendered conditionally in the shared `product.njk` so it doesn't affect other products). SensGEO/SensATMO/SensGREEN still held for later. |
| Products page scope (near-term) | Products = UCS's own application + hardware (sensors, edge gateways) — scope near-term Products-page work to that, not the full catalog breadth (indicators/terminals/junction boxes/accessories/calibration) already listed under "The three tiers" below. User's own note, 2026-07-26. |
| Hero headline vs. video background — decoupled | The hero headline/sub-headline (text overlay) is picked and shipped independently of the video carousel (Task 4) — it sits on top of whatever hero background exists (today's static SVG, tomorrow's video) and isn't folded into the video's script/content. Confirmed 2026-07-26 after the user considered and rejected coupling the two. |

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

## Active task plan

**`TASKS.md` (repo root) is the current in-progress work** — 5 tasks from the JIC follow-through below, meant to be done one at a time, in order. Check it first before assuming what to work on next; it has file paths, "done when" criteria, and per-task verification already worked out. Update its checkboxes as tasks land.

## Stakeholder feedback — JIC presentation (2026-07-22, unresolved)

Chief (founder) reviewed the current design/positioning and pushed back in two places; user disagrees with both but is logging them rather than deciding unilaterally. Do not silently pick a side on either if this resurfaces — flag both positions.

- **Design direction conflict** — chief wants a more colorful, animated/"movable" design. This directly contradicts the confirmed minimalist/SVG-icon preference (see memory `feedback_visual_style`, 2026-07-17: "colorful generated pictures could make it worse"). Unresolved.
- **"We sell trust" positioning** — asked what drives ~65% of revenue, chief's answer was trust; proposal to add visual trust signals (approved/verified/certified stamps) referencing the European patent (EP 4 524 526), TRL 9 status, and validated pilots described in `references/UCS for JIC.docx` (a JIC/EU funding brief — reuse its facts, not its funding-pitch framing, on the actual site). User prefers leading with concrete real-world value over badge-driven trust signaling. Unresolved.
- **Primary real value prop — leading candidate** — asked a second time what the actual primary product/service is, the answer was theft/fraud prevention: industrial customers lose money to weighing fraud/theft, and SensWEIGHT's monitoring catches it. User agrees this reads as real. This already exists as one of 8 rate categories in the ROI calculator (`references/roi-example-truckscale.jpg`) — candidate answer to the Phase 4 "confirm primary product/service" item below; consider elevating fraud/theft prevention into headline positioning, pending user sign-off.
- **Implementation considerations raised in the meeting** — safety and weight-logistics operational aspects came up as things page content should eventually reflect; scoped 2026-07-22 into operational safety (Logistics) + regulatory/compliance weight limits, target page(s) still TBD (see Phase 3 below and `TASKS.md` Task 7).
- **User's own hero-copy drafts (2026-07-26, raw/unfiltered notes, no final pick yet)** — three candidate hero headline/sub-headline pairs to replace the current "Remote monitoring that pays for itself," all leading with patent EP 4 524 526 as the differentiator: (1) *"Standard Systems Guess the Weight. We Guarantee the Truth."* — micro-voltage diagnostics on every load cell, "no other system can legally offer"; (2) *"Beyond Monitoring: Deep Diagnostic Intelligence for Weighing Systems."* — patented analytics as an "X-ray for your weighbridge"; (3) *"Stop Paying for Weighing Errors. Start Guaranteeing True Value."* — uncalibrated/failing load cells bleed revenue, ROI within months. These lead with patent-backed value claims rather than pure certification badges, so they soften — without resolving — the trust-vs-value conflict above. No headline chosen yet. Same note also asks to give the existing "Certified & Patented" homepage section (shipped 2026-07-23 as a supporting signal before the closing CTA, not the lead pitch) more visual/content focus on the patent specifically, to differentiate from other weighing companies — a refinement to log, not yet built.

## Open questions

Everything that used to live in this list is now tracked as a checklist item inside a specific phase below (Phase 4 has ROI formula/ThingsBoard/video IDs/M500 identity; Phase 5 has AWS/dealer-form-backend/sales-inbox). The one item that doesn't belong to sensweight.com's roadmap at all:

1. **unifiedcloudsensors.com DNA** — not sourced yet. Separate domain, deferred, not part of the phases below.

## Implementation phases — sensweight.com (current roadmap, written 2026-07-17)

Supersedes the old 5-week estimate (that one predated the 2-domain split and was never phase-tracked against real work). Phase 1–2 fold in `references/SEO_AIEO_Strategy.docx`'s 4-phase action plan (reviewed 2026-07-17), adapted for a single English-only domain — the doc's EN/CS hreflang recommendations don't apply here since sensweight.com dropped CS. Phases aren't strictly sequential — 1–2 are cheap/high-leverage and can start immediately; 3–4 are ongoing; 5–6 gate an actual public launch.

**Phase 1 — SEO/AIEO technical foundations** *(no design changes needed)*
- [ ] Unique `<title>` + meta description per page (titles mostly exist already, descriptions don't)
- [ ] `sitemap.xml` (Eleventy plugin) + `robots.txt`
- [ ] Canonical tags on every page
- [ ] Open Graph + Twitter Card meta tags (reuse existing logo/brand imagery)
- [ ] Organization schema (JSON-LD), added once via `base.njk`
- [ ] Favicon — currently missing entirely

**Phase 2 — Structured data & citation-readiness**
- [ ] Product schema (JSON-LD) on all 5 Solution pages + `/ucsx3/`
- [ ] BreadcrumbList schema across Industry/Solution/Product pages
- [ ] FAQPage schema with real FAQ content — start with 5–10 Q&A per major Solution page
- [ ] Rewrite key opening paragraphs as self-contained, quotable definitions (doc's example: *"SensWEIGHT is a remote weighing monitor that reads up to 8 load cells in real time..."*) — this is what AI answer engines lift verbatim as citations

**Phase 3 — Content depth & internal linking** *(ongoing)*
- [ ] Glossary of industry/technical terms
- [ ] Resources/knowledge-base section (install guides, technical bulletins, case studies)
- [ ] Blog/articles cadence for freshness signals
- [ ] Reflect safety & weight-logistics operational considerations in content depth — scoped 2026-07-22: two angles confirmed (operational safety for Logistics — overload prevention, weighbridge/site safety, traffic/queueing; and regulatory/compliance weight limits — legal load limits, axle weight regs, certified weighing for audit); structural/geotechnical-safety framing explicitly not selected; target page(s) still TBD (see `TASKS.md` Task 7)
- [x] Deepen Industries→Solutions internal linking — the doc calls this out as already "the right pattern," repeat it wherever else it fits (e.g. Product pages linking back to the Industries/Solutions that use them)

**Phase 4 — Replace remaining mocks with real data**
- [ ] ROI formula generalization — `references/roi-example-truckscale.jpg` gives one worked example (Truck Scale Digitization); confirm whether its per-category rates apply site-wide or need variants
- [ ] Real hardware SKU catalog + pricing for `/products/` (currently mocked, flagged as illustrative in the page copy itself)
- [ ] ThingsBoard cross-domain approach for the live demo — public iframe vs REST API vs subdomain+proxy, still undecided
- [ ] 3 YouTube video ID placeholders in `home.njk` need real IDs
- [x] Video carousel — **done 2026-07-26 for 3 of 4 concepts** (weighbridge, silo, warehouse) — generated via Magnific, live in the homepage hero's `.hero-video-carousel` (minimal hero-visual-swap scope, not a full mt.com-style full-bleed rebuild). Concept 4 (field worker at dusk) intentionally skipped for the presentation deadline; pick up separately if wanted. See `TASKS.md` Task 4.
- [ ] M500 identity — customer installation or UCS reference system? (privacy sign-off needed before using its data publicly)

**Phase 5 — Infra & launch mechanics**
- [ ] AWS account — existing prod environment or fresh setup?
- [ ] S3 + CloudFront + ACM + Route 53 setup
- [ ] sensweight.com domain registration/DNS pointing
- [ ] Real dealer-form backend (Lambda + API Gateway, or a third-party form service) — replacing the current `mailto:` fallback at the bottom of `/how-to-buy/`
- [ ] Confirm the sales/dealer inbox that mailto target should actually point to
- [ ] Privacy policy + terms of service — currently nonexistent
- [ ] Analytics (GA4 or similar) — not set up; if cookie-based, needs a cookie notice too

**Phase 6 — QA & soft launch**
- [ ] Cross-browser/mobile visual QA (only structural/curl-level checks done so far this session)
- [ ] Accessibility pass
- [ ] Performance/Lighthouse pass
- [ ] Human content proofread — most copy on the site is AI-written and hasn't had a human marketing review yet
- [ ] Soft launch → monitor → full DNS cutover
