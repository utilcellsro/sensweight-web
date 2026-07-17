# UCS Website Relaunch — Project Brief

This file is auto-loaded every session. Read it before doing anything else.

## What this project is

**Unified Cloud Sensors, s.r.o.** (Ostrovačice, Czech Republic) is an IIoT company making remote monitoring systems for industrial weighing. The company owns **two domains**, which are now built as **two separate sites in this one monorepo**:

- **`sensweight.com`** — the real product/industry sales site. A hub for all five Sens- product lines, organized around 8 industries, showing prospects what UCS can do for their specific operation. **This is where all active work happens right now.**
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
│   ├── UCS-Web-DNA.html               ← sensweight's design source (bundled Claude Design export, 8-industry radial hub)
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
| sensweight.com nav axis | **8 industries**, not the 5 product lines: belt scale, logistics/weighbridge, geotechnical, silos, recycling, concrete, green roofs, quarries. Source: `references/UCS-Web-DNA.html` |
| sensweight.com brand scope | It's a **hub for all 5 Sens- brands** — SensWEIGHT isn't privileged over SensSILO/SensGEO/SensATMO/SensGREEN just because of the domain name. Industries are the navigational lens across all of them |
| sensweight.com hardware | A `/hardware/` section (sensors/indicators/junction boxes/gateways/accessories) is built, mocked — SKUs are illustrative, grounded in the real `references/roi-example-truckscale.jpg` quote, not a confirmed catalog |
| sensweight.com language | **English only** — no CS/PL. The old trilingual (EN/CS/PL) decision was for the combined single-site plan and is superseded here |
| sensweight.com hero | DNA hero adopted wholesale, full fidelity — not just tokens/colors |
| sensweight.com ROI + demo | Reuse the existing ROI calculator and demo engine as-is, don't rebuild |
| unifiedcloudsensors.com | Different DNA (not yet sourced), minimal/premium, corporate tone — scoped later |
| Build tool | Eleventy (11ty) v3 — one template set, single English translation object (`translations.en`) |
| Hosting | AWS S3 + CloudFront + ACM + Route 53 — fully static, no server (unchanged) |
| Demo access | Open to all visitors — no login gate |
| Demo content | 8 load cells — radar/spider plot, data table, summary bar (unchanged) |

## Product lines (5 + hardware)

- **SensWEIGHT™** — remote weighing monitor (has the M500 ThingsBoard demo data)
- **SensSILO™** — silo/container level monitoring
- **SensGEO™** — geotechnical inclination monitoring (construction)
- **SensATMO™** — atmospheric/environmental monitoring
- **SensGREEN™** — green roof/wall structural monitoring
- **Hardware**: UCS X, X1, X2, X2-DIN modules + UCS Cloud platform — plus the underlying components (load cells, indicators, junction boxes, accessories) catalogued at `/hardware/` (mocked, see Current state below)

## Industries → brand mapping (proposed, confirm before treating as final)

All 5 brands are equal citizens of the hub; this is which brand(s) apply per industry, not a primary/secondary ranking:

| Industry | Brand(s) |
|---|---|
| Belt Scale | SensWEIGHT |
| Logistics / Weighbridge | SensWEIGHT |
| Silos | SensSILO |
| Geotechnical | SensGEO |
| Green Roofs | SensGREEN |
| Recycling | SensWEIGHT + SensATMO |
| Concrete | SensWEIGHT |
| Quarries | SensWEIGHT + SensGEO |

## Current state — 2026-07-17

- **Monorepo reorg complete**: `sensweight/` holds the Eleventy build, `unifiedcloudsensors/` is an empty placeholder, `references/` holds shared brand/design material. Verified: `cd sensweight && npm install && npm start` boots at `localhost:8080/` (no `/en/` prefix), all pages return 200.
- **Carried forward from pre-reorg WIP** (was uncommitted, already anticipated this pivot before the reorg conversation happened): homepage has an 8-industry radial hub section; the ROI calculator is rewired to a per-category rate formula matching `references/roi-example-truckscale.jpg` exactly (downtime, efficiency, weighing errors, fraud, calibration, structural, audit, multi-site — each a fixed rate × visitor-entered quantity); design tokens replaced (Chakra Petch display font, navy `#1D2C49`/blue `#476DB8`/ink `#2F2F2E` palette with `--ok`/`--warn`/`--alarm`/`--off` sensor-state colors — see table below).
- **This reorg session removed**: the `/en/` URL prefix and the EN/CZ language switcher entirely (English-only now — flattened `src/en/*` up to `src/*`, deleted `src/cs/`, deleted the `cs:` block from `translations.js`, added `src/_data/lang.js` as a flat `"en"` global replacing the old per-directory `en.json`/`cs.json` convention).
- **`/solutions/` remapped to the 8 DNA industries** (quarries, concrete, silos, recycling, logistics, beltscale, geotechnical, greenroofs), replacing the old 6-item taxonomy (belt-scale, silo-inventory, truck-weighbridge, geotechnical, environmental, green-roof). Direct content reuse for the 5 that mapped cleanly; new copy written for quarries/concrete/recycling; `environmental` retired as a standalone page (its angle folded into recycling as a secondary SensATMO capability — SensATMO still has its own product page). Solution entries now carry a `products` array (not a single `product` field) so dual-brand industries show both badges. Solutions-grid icons now reuse the homepage hub's inline SVGs instead of 3-letter text codes.
- **`/hardware/` built**: 5 mocked categories — load cells & sensors, indicators & terminals, junction & summing boxes, IIoT edge gateways (cross-links to `/ucsx3/`), accessories & calibration. SKU codes (CLM8INOX, WDESK-BL, OPZWALIBI, M740) pulled from `references/roi-example-truckscale.jpg` so it reads as plausible rather than invented; page copy flags it as illustrative pending a real catalog. Linked from footer nav.

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

1. **ROI formula generalization** — `references/roi-example-truckscale.jpg` gives one worked example (Truck Scale Digitization). Confirm whether its per-category rates apply site-wide or need per-industry variants.
2. **Industries → brand mapping** — table above is proposed, not fully confirmed for Recycling/Quarries' dual-brand cases.
3. **unifiedcloudsensors.com DNA** — not sourced yet.
4. **ThingsBoard cross-domain approach** for the live demo — still open (public iframe vs REST API vs subdomain+proxy).
5. **YouTube video URLs** — placeholders still in place in `home.njk`.
6. **M500 identity** — customer installation or UCS reference system? (privacy)
7. **AWS account** — existing prod environment or fresh setup?
8. **Request a Dealer form backend** — currently a `mailto:` fallback (static site, no server). Needs a real endpoint before launch if silent submission is required.
9. **`sales@unifiedcloudsensors.com` inbox** — placeholder mailto target, confirm it exists/is monitored, or swap in the real sales inbox. (Note: now that sensweight.com and unifiedcloudsensors.com are separate, confirm which domain's inbox this should actually be.)

## Implementation phases (original estimate, predates the 2-domain split — treat as directional only)

| Phase | Weeks | Focus |
|---|---|---|
| 1 | 1–2 | AWS infra + Eleventy template system + homepage |
| 2 | 3–5 | Content migration (5 product lines, hardware, guides, FAQ) |
| 3 | 6–7 | ThingsBoard demo + ROI calculator |
| 4 | 8–9 | Video gallery, events/promotions, resources page |
| 5 | 10 | QA, analytics, soft launch, DNS cutover |
