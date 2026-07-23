# Video carousel — AI-generation prompt brief (Task 4)

**Status: active, 2026-07-23 — concept fully redesigned.** The original 4 concepts (trust/seal, precision macro, abstract journey, fraud checkmark) were scrapped — they were too abstract to read as "a monitoring product" to an outside viewer, and didn't match anything the company already puts out. Archived, not deleted: see `archived-abstract-concepts/` in this folder.

**New direction:** stop inventing new visual language. The company's own LinkedIn marketing (`brand-style-reference/1.jpg`–`8.jpg`, saved 2026-07-23 from `linkedin.com/company/unified-cloud-sensors/posts`) already has a consistent, chief-approved formula for "explain the monitoring product visually" — reuse it for the video backgrounds instead of designing something new. Two of those reference images lean on an AI-generated background and read as slightly plasticky/uncanny — a real quality bar to avoid repeating in the generated video clips.

## The established brand formula (extracted from `brand-style-reference/`)

Every post follows the same recipe:
1. A real (or real-feeling) industrial photo — weighbridge/truck, silo, warehouse floor, a worker in a safety vest
2. A thin blue wifi/signal icon, with a glowing connection line arcing up to the brand's circular cloud-and-circuit badge icon
3. A device reveal — tablet or laptop — showing an actual dashboard UI: line graphs, pie charts, colored data cards, sometimes the real SensWEIGHT branding
4. Bold bilingual headline text + a navy bottom banner ("UCS® CLOUD SOLUTIONS — CONTINUOUS MONITORING | DIAGNOSTICS | ALERTS")

**For the hero video, only items 1–3 get generated as footage.** Item 4 (headline, logo, banner) is a separate text/graphic layer composited on top in the actual site code (real HTML/CSS, crisp brand font) — never baked into the AI-generated video itself, same reasoning as before: AI video garbles legible text, and these reference posts themselves clearly build headline text as a separate design layer over the photo, not part of it.

## Reference material

- `brand-style-reference/1.jpg`–`8.jpg` — the company's own LinkedIn post creatives, the visual formula to reuse (see above)
- `references/video-carousel/mt-com-hero-reference.html` (saved copy of `mt.com/cz/cs/home.html`) — kept only for the *structural* hero-carousel mechanics (full-bleed video bg + overlay text + pagination dots), not for its visual style
- WeighingReview article (`weighingreview.com`, the SensWEIGHT European-patent-grant piece) — its hero image (truck + AR weight-overlay) and its UCS X-series flow graphic (load cell → gateway → cloud → tablet dashboard) match the same brand formula and confirm it as the house style, not a one-off

## Logo note (unchanged)

Literal readable logos/wordmarks and the bilingual headline text render badly in AI video (garbled, warped, flickering). Don't attempt to bake the UCS logo, brand wordmark, or any headline copy into the generated clip — that's the composited text layer's job, added in code.

## Shared technical spec (all clips)

- 16:9, cropped to `cover` in the full-bleed hero
- 8s target duration (6–15s range acceptable)
- Color grade: navy `#1D2C49` / blue `#476DB8` / blue-pale `#DCE5F4`, rare sky `#7ED3F0` highlight — matches the brand reference images' own blue glow treatment almost exactly, no change needed there
- Photoreal, grounded lighting with natural imperfections (dust, uneven light, real material texture) — explicitly avoid the glossy/plasticky over-rendered look that made 2 of the 8 reference images read as "too AI"
- Recurring brand motifs to include: wifi/signal icon, glowing blue connection line, the circular cloud-and-circuit badge icon, a dashboard UI reveal (line graph / pie chart / data cards) on a tablet or laptop
- Shallow depth of field where natural, slow deliberate camera (push-in, pan, or static — no handheld shake)
- No legible text or logos anywhere in frame (composited separately, see above)
- No clear human faces (hands/torso/safety-vest OK, matches image 6's worker shot; avoid AI face artifacts — real people are for the "real footage later" phase per CLAUDE.md)
- No multiple vehicles/crowds

## Concepts (each grounded in a real existing brand post, not invented)

---

### 1. Weighbridge / truck monitoring — based on brand images 5 & 6

**Status: scoped and decided** (one continuous sequence, no A/B needed) — see `generation-manifest.md` for the full prompt and start image.

Wide shot: a truck stopped on a weighbridge, thin glowing blue connection lines rising from the scale to a wifi icon and the cloud-badge icon. Camera moves to reveal a tablet in someone's hands (no face) showing a live dashboard with the same data. One continuous take, no cuts.

---

### 2. Silo monitoring — based on brand images 7 & 8

**Status: not yet generated.**

**A — exterior-to-device continuous move:** Wide shot of a real silo/hopper structure, wifi icon and glowing connection line rising to the cloud badge. Camera pushes toward a tablet/laptop reveal showing a live dashboard (pie chart + data table, matching brand image 8's SensWEIGHT UI style).

**B — staged two-shot:** (1) static wide shot of the silo with the wifi/cloud-connection glow; (2) static close-up on the tablet/laptop dashboard reveal. Hard cut between the two — lower risk for AI generation than one continuous move.

---

### 3. Warehouse / installation monitoring — based on brand images 1 & 3

**Status: not yet generated.**

**A — continuous move:** Wide shot of an industrial warehouse floor/installation, wifi icon + glowing connection line to the cloud badge. Camera moves to reveal a laptop screen with a live multi-panel dashboard (matches brand image 3's monitoring UI).

**B — staged two-shot:** (1) static wide warehouse shot with the connection glow; (2) static close-up on the laptop dashboard. Hard cut, no continuous camera move.

---

### 4. Field worker at dusk — based on brand image 6

**Status: not yet generated.**

**A — worker-first:** A person in a safety vest (torso/hands only, no face) checking a tablet near industrial equipment at dusk/night, a small glowing chart graphic floating near the tablet, truck/warehouse softly lit in the background.

**B — equipment-first:** Same dusk setting, but the camera starts on the equipment/truck and pans to reveal the worker's tablet check, rather than starting on the person.

---

## Next steps

1. ~~Send this brief to chief for the paid video-gen tool access/budget sign-off.~~ Done — chief pointed to Magnific (magnific.com).
2. ~~Pick a visual direction.~~ Done — reusing the company's own established LinkedIn-post formula instead of inventing new concepts.
3. Generate a start-image still per concept/variant (ChatGPT or similar), store under `images/`, log it in `generation-manifest.md`. Concept 1 done.
4. Run each start image + prompt through Magnific's video generation (needs a paid tier — free tier only covers image gen). Expect re-rolls; pick the cleanest, least "AI-plasticky" result per concept.
5. Trim to spec length, strip audio, extract poster frames.
6. Confirm the hero-rebuild scope question (mt.com's structural pattern) before starting code integration (see `TASKS.md` Task 4).
