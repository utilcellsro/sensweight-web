# UCS Website Relaunch — Project Brief

This file is auto-loaded every session. Read it before doing anything else.

## What this project is

**Unified Cloud Sensors, s.r.o.** (Ostrovačice, Czech Republic) is an IIoT company making remote monitoring systems for industrial weighing. The company owns **two domains**, which are now built as **two separate sites in this one monorepo**:

- **`sensweight.com`** — the real product/industry sales site, organized around a three-tier IA: **Industries** (thin routing layer, "find yourself") → **Solutions** / **Products** (the real depth). See below. **Conserved as of 2026-09-01 — all `TASKS.md` items done, deployed, verified live. No known open work; check with the user for new asks before assuming there's more to do here.**
- **`unifiedcloudsensors.com`** — a small, separate, minimal/premium corporate "about us" page, safe to link from LinkedIn. **Priority as of 2026-09-01 — active work starts now.** See "unifiedcloudsensors.com" section below.

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
| unifiedcloudsensors.com — DNA | **Sourced 2026-09-01, corrected same day against the literal source file.** Not a from-scratch different DNA — reuses sensweight's exact color tokens, verified directly against `references/UCS-Web-DNA.html` (a bundled Claude Design export, ~700KB — grep it for hex codes/`font-family`, don't try to `Read` it whole). The DNA file states its own rules explicitly, and a first draft that summarized rather than read it violated several: **flat colors only** ("The gradient (light → dark blue) lives only in the logo. UI uses flat blue #476DB8 exclusively" — no gradients, no invented derived shades); Chakra Petch headings are **600–700 weight only** ("Headlines and section numbers only"), IBM Plex Sans body 400–600 — no lighter "editorial" weight; a literal marketing-hero example exists (H1 white/700 on navy `#1D2C49`, subhead text `#7EA4D8`, primary button `#476DB8`→hover `#7ED3F0` bg + `#1D2C49` text); dark/"product dark surface" guidance is navy `#1D2C49` bg, text `#DCE5F4`, accents in Sky `#7ED3F0` — Sky, not Blue, is the accent-on-dark color. The file's own condensed "DNA in a nutshell" block also gives: radius 6px, monoline 2px / triple-rule motif, 12-col grid / 16px gutter / max 1120px, spacing ×8, motion 120/200/320ms `cubic-bezier(.2,0,0,1)` "slide & fade, never bounce." unifiedcloudsensors.com's premium/darker feel comes from composition and restraint (navy as the dominant ground, generous 8px-multiple spacing, airy per the DNA's own "marketing airy, product dense" note) — not from any token invented outside this file. See [[feedback_visual_style]] for the general rule this reinforces. **Same-day follow-up:** a literal-only pass still read too close to sensweight's own dark "product surface" look; user asked for more shade/depth and a more modern feel. Second pass keeps the same literal token identity but adds real depth on top — much larger asymmetric Chakra Petch display type, glass/blur panels, soft shadows, a sparing ambient radial glow, and one additional canvas tone (`#12192B`, a touch deeper than literal Navy) used only for page background depth, not as a replacement for the brand's Navy/Blue/Sky roles. Design draft: see the published canvas at `https://claude.ai/code/artifact/d31afa1b-4220-4994-ae8e-826faf2203e7`, still under review. |
| unifiedcloudsensors.com — content scope | **Confirmed 2026-09-01:** company story/about (patent EP 4 524 526, TRL 9, Ostrovačice HQ — same sourced facts as sensweight's `/about/`, reframed corporate-tone), Team/Leadership, Press/News, Careers, plus Contact. No ROI calculator, no demo, no per-industry content — those stay sensweight-only. |
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
| Hero headline (final) | Option 3 chosen and shipped 2026-07-26: **"Stop Paying for Weighing Errors. Start Guaranteeing True Value."** — leads with the value/revenue-loss problem, patent EP 4 524 526 appears in the sub-copy as evidence, not the headline itself. **Presentation feedback 2026-07-27: the sub-headline reads as too long — shortening pass needed, see `TASKS.md` Task 9.** |
| Certified & Patented — patent visual emphasis | Patent pulled out of the flat 3-fact row into its own larger bordered block (bigger number, TRL 9/Deployment remain as secondary facts below) — shipped 2026-07-27 (`TASKS.md` Task 8). |
| ROI teaser routing (homepage) — resolved | Superseded the still-open item below: teaser now renders 5 real per-solution buttons, each deep-linking to that page's own `#roi` calculator, instead of one plain-text link to `/solutions/`. Shipped 2026-07-27 (`TASKS.md` Task 8b). |
| Repo ownership | Repo moved from the personal GitHub account (`echetvergov/ucs-frontend`) into the **`utilcellsro`** organization, renamed to **`sensweight-web`**. Done 2026-07-30 via GitHub's native transfer (not a fresh-repo copy) — local `origin` repointed to `github.com/utilcellsro/sensweight-web.git`, old URL redirects. Vercel's Git integration still points at the old location; user is re-linking it separately. See `TASKS.md` Task 10. |
| Hero tile order | Swapped the homepage hero tiles to **Industries → Solutions → Products** (was Industries → Products → Solutions, the 2026-07-17 order). **Shipped 2026-09-01** — see `TASKS.md` Task 11. |
| Products catalog — UCS Cloud | Added a "UCS Cloud" tile to `/products/`, linking through to Solutions — the cloud platform gets its own catalog entry (dashboards/alerts/ROI-reporting rows), not just an implied part of the hardware list. **Shipped 2026-09-01** — see `TASKS.md` Task 12. |
| Hosting | Not Vercel for the production site — real infra goes through the company's existing `terraform-cloud` repo (Terraform Cloud–managed, AWS account `008568556096`), matching the pattern already used for `rma.utilcell.com`/Terrasense/Ucsnose. S3 + CloudFront (OAC), CloudFront default domain only for now — sensweight.com currently redirects to a live site at `en.sensweight.eu`, so DNS cutover is a deliberately separate later step. **Live** — PR `utilcellsro/terraform-cloud#115` merged/applied 2026-07-31, site serving from `https://d3onkrnmhl2kuy.cloudfront.net/` — see `TASKS.md` Task 13. |
| Dealer form backend | Real backend via **Lambda + API Gateway triggering AWS SES** — sends a confirmation email to the submitting client and a notification email to the sales team, replacing the old `mailto:` fallback. **Done end-to-end 2026-09-01**: PR `utilcellsro/terraform-cloud#116` (SES IAM identity-ARN fix) merged/applied, live test confirmed both emails delivered. Sales-notify address stays the placeholder `e.chetvergov@unifiedcloudsensors.com` — user's explicit call to keep it for now rather than repoint to a real sales inbox — see `TASKS.md` Task 13. |
| Non-programmer dev workflow | Four project slash commands (`/new-task`, `/local-deploy`, `/finish-task`, `/deploy-live`) plus a Docker-based local preview and a GitHub Actions deploy pipeline, so a non-programmer colleague can pick up a task, preview it, and ship it without AWS access. Shipped 2026-07-31 — see `TASKS.md` Task 14. |
| Header nav | Real header nav added (About Us / Contacts / News) — new `/about/` and `/contact/` pages with real sourced content, News reuses the existing `/events/` page rather than a new duplicate page. Shipped 2026-09-01 — see `TASKS.md` Task 15. |
| Homepage Solutions grid | Trimmed from 5 cards to 4 — dropped SensSILO and SensGREEN (their own `/senssilo/` and `/sensgreen/` pages, and Industries routing into them, are untouched), added one "Custom, Built to Your Site" card linking to `/how-to-buy/`. Shipped 2026-09-01 — see `TASKS.md` Task 16. |
| SensWEIGHT spec table | Trimmed from 12 rows to 7 (removed Measurement range/Accuracy/Sampling rate/A-D resolution/Load cell excitation — table now starts with Connectivity); Power input range widened from 12–36 V DC to 9–36 V DC to match the UCS X3 gateway's own range. Shipped 2026-09-01 — see `TASKS.md` Task 17. |
| Trademark symbol | Product-name trademarks (SensWEIGHT, SensSILO, etc.) are registered, not just claimed — every "™" sitewide swapped to "®" (55 occurrences across `translations.js` and 12 `.njk` templates). Shipped 2026-09-01 — see `TASKS.md` Task 18. |
| ROI calculator — temporarily held | The ROI calculator is commented out sitewide (all 5 Solution-page includes, plus the homepage's ROI-teaser section) — a deliberate hold, not a removal; each is a one-step comment-wrapper to restore. Shipped 2026-09-01 — see `TASKS.md` Task 19. |

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

**Products** (`/products/`, one catalog page, mocked) — the physical, touchable components, plus one non-physical entry for the platform itself:
- Load cells & sensors, indicators & terminals, junction & summing boxes, IIoT edge gateways (UCS X1/X2/X2-DIN/X3 — X3 has its own detail page at `/ucsx3/`), accessories & calibration services.
- **UCS Cloud** — the cloud platform itself, as its own tile linking through to Solutions. Flagged 2026-07-27, not yet built — see `TASKS.md` Task 12.

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
- **User's own hero-copy drafts (2026-07-26, raw/unfiltered notes, no final pick yet)** — three candidate hero headline/sub-headline pairs to replace the current "Remote monitoring that pays for itself," all leading with patent EP 4 524 526 as the differentiator: (1) *"Standard Systems Guess the Weight. We Guarantee the Truth."* — micro-voltage diagnostics on every load cell, "no other system can legally offer"; (2) *"Beyond Monitoring: Deep Diagnostic Intelligence for Weighing Systems."* — patented analytics as an "X-ray for your weighbridge"; (3) *"Stop Paying for Weighing Errors. Start Guaranteeing True Value."* — uncalibrated/failing load cells bleed revenue, ROI within months. These lead with patent-backed value claims rather than pure certification badges, so they soften — without resolving — the trust-vs-value conflict above. Option 3 was chosen and shipped 2026-07-26 (see "Decisions already made" table). The "Certified & Patented" homepage section's patent-focus refinement (more visual/content weight on the patent specifically, to differentiate from other weighing companies) also shipped 2026-07-27, as a dedicated bordered patent block ahead of the TRL 9/Deployment facts. **New presentation feedback, 2026-07-27:** the shipped sub-headline itself now reads as too long — needs a shortening pass, logged as `TASKS.md` Task 9.

## Open questions

Everything that used to live in this list is now tracked as a checklist item inside a specific phase below (Phase 4 has ROI formula/ThingsBoard/video IDs/M500 identity; Phase 5 has AWS/dealer-form-backend/sales-inbox). unifiedcloudsensors.com's DNA was the one item that didn't belong to sensweight.com's roadmap at all — **resolved 2026-09-01, see "Decisions already made"** — that domain's own plan now lives in the "unifiedcloudsensors.com" section below.

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
- [ ] ROI formula generalization — `references/roi-example-truckscale.jpg` gives one worked example (Truck Scale Digitization); confirm whether its per-category rates apply site-wide or need variants. **Moot for now — the ROI calculator itself is temporarily held/commented out sitewide, 2026-09-01, see `TASKS.md` Task 19; revisit this item once it's restored.**
- [ ] Real hardware SKU catalog + pricing for `/products/` (currently mocked, flagged as illustrative in the page copy itself)
- [ ] ThingsBoard cross-domain approach for the live demo — public iframe vs REST API vs subdomain+proxy, still undecided
- [ ] 3 YouTube video ID placeholders in `home.njk` need real IDs
- [x] Video carousel — **done 2026-07-26 for 3 of 4 concepts** (weighbridge, silo, warehouse) — generated via Magnific, live in the homepage hero's `.hero-video-carousel` (minimal hero-visual-swap scope, not a full mt.com-style full-bleed rebuild). Concept 4 (field worker at dusk) intentionally skipped for the presentation deadline; pick up separately if wanted. See `TASKS.md` Task 4.
- [ ] M500 identity — customer installation or UCS reference system? (privacy sign-off needed before using its data publicly)

**Phase 5 — Infra & launch mechanics**
- [x] AWS account — resolved 2026-07-30: same account as everything else (`008568556096`, `eu-central-1`), not a fresh setup
- [x] S3 + CloudFront (OAC) setup — live 2026-07-31 at the CloudFront default domain (`https://d3onkrnmhl2kuy.cloudfront.net/`); ACM + Route 53 / real DNS cutover still deliberately deferred, see next item
- [ ] sensweight.com domain registration/DNS pointing — still pending; sensweight.com currently 301-redirects to the live legacy site at `en.sensweight.eu`, so this is a deliberately separate later step
- [x] Real dealer-form backend — **Lambda + API Gateway triggering AWS SES**, emailing both the submitting client (confirmation) and the sales team (notification), replacing the old `mailto:` fallback. Done end-to-end 2026-09-01 — see `TASKS.md` Task 13.
- [x] Sales/dealer inbox SES notifies — resolved as a deliberate placeholder, not a gap: user's explicit call 2026-09-01 to keep `e.chetvergov@unifiedcloudsensors.com` for now rather than repoint to a real sales inbox; revisit `sensweight_ses_notify_email` in `terraform-cloud/environments/prod/main.tf` if/when a real one is confirmed
- [ ] Privacy policy + terms of service — currently nonexistent
- [ ] Analytics (GA4 or similar) — not set up; if cookie-based, needs a cookie notice too

**Phase 6 — QA & soft launch**
- [ ] Cross-browser/mobile visual QA (only structural/curl-level checks done so far this session)
- [ ] Accessibility pass
- [ ] Performance/Lighthouse pass
- [ ] Human content proofread — most copy on the site is AI-written and hasn't had a human marketing review yet
- [ ] Soft launch → monitor → full DNS cutover

## unifiedcloudsensors.com (active work started 2026-09-01)

Small, separate, minimal/premium corporate "about us" site — distinct from sensweight.com's product/industry sales content, safe to link from LinkedIn. Currently just a disposable placeholder (`unifiedcloudsensors/README.md` + a plain static `index.html`, no build step, no design system). **Design phase in progress on a Claude Design canvas — not yet built as real code.** Canvas: `https://claude.ai/code/artifact/d31afa1b-4220-4994-ae8e-826faf2203e7` (single-page homepage draft; re-read it before continuing design work rather than assuming the state described here is current). A static, standalone snapshot (no editor chrome, just the plain rendered page — for sharing/review, e.g. with the chief) is saved at `references/unifiedcloudsensors-design-draft/index.html`; it's a point-in-time export, not synced automatically when the canvas changes — regenerate it if the canvas moves on and a fresh copy is needed.

**DNA — verified against the literal source file, not a summary (2026-09-01):** `references/UCS-Web-DNA.html` (a ~700KB bundled Claude Design export — grep it for hex codes/`font-family`, don't `Read` it whole) states its own rules explicitly: **flat colors only**, no gradients in UI ("The gradient lives only in the logo... UI uses flat blue #476DB8 exclusively"); Chakra Petch headings **600–700 weight only**; a literal marketing-hero example (H1 white/700 on Navy `#1D2C49`, subhead `#7EA4D8`, primary button `#476DB8`→hover `#7ED3F0`+`#1D2C49` text, Sky as the accent-on-dark color, not Blue); a condensed "DNA in a nutshell" block (radius 6px, 2px monoline/triple-rule motif, 12-col/1120px-max layout, spacing ×8, motion 120/200/320ms `cubic-bezier(.2,0,0,1)` "slide & fade, never bounce"). A first draft built from CLAUDE.md's summarized tokens table plus invented derivations (extra navy shades, lighter font weights, a hero gradient) was rejected — see [[feedback_visual_style]]. Rebuilt strictly against the literal file; the only tone not lifted verbatim is one deeper ambient canvas background (`#12192B`) added after the user asked for more depth/"shades" — everything else (colors, weights, button/hover behavior) is literal.

**Content scope (confirmed 2026-09-01, now built into the canvas):** company story/about (patent EP 4 524 526, TRL 9, Ostrovačice HQ), Team/Leadership, Updates (renamed from "Press" — see below), Careers, Contact. Out of scope: ROI calculator, live demo, per-industry content — sensweight-only.

**Real assets now in the draft — nothing fabricated:**
- Logo: the real `references/ucs-logo-master.png` (not an invented mark) — the file itself has an opaque white background and unreadably-dark-on-navy caption text, so the "uCs" glyph alone was cropped and alpha-matted transparent (script-based, pixel-exact to the source) for use on the dark page; paired with live "Unified Cloud Sensors" text since the caption couldn't carry over legibly.
- Team: real photos, `unifiedcloudsensors/Jorge.jpg` (Jorge Truffin, CEO) and `unifiedcloudsensors/Nikola.jpg` (Nikola Avramovic, COO) — user-supplied. Desaturated/toned for visual consistency (very different original backgrounds — indoor office vs. outdoor). A third slot stays an explicit "more profiles coming soon" placeholder.
- Press → **renamed "Updates"**: LinkedIn (`linkedin.com/company/unified-cloud-sensors/posts`) isn't scrapable (login wall). Used the 8 real posts already saved in this repo at `references/video-carousel/brand-style-reference/` (from the 2026-07-23 video-brief pull) — these are the company's own product-marketing creative, not third-party press, so the section is honestly framed as "From our LinkedIn" / company updates rather than press coverage, with 3 real taglines pulled from those posts, each linking to the real LinkedIn page.

**Still not decided:** exact page structure as real code (single long-scroll vs. routed pages), whether this becomes its own Eleventy project mirroring `sensweight/` or something lighter, a third team member (if any), real third-party press mentions (none exist yet — the Updates section is first-party only), real open Careers roles. Don't invent any of these — flag and ask.
