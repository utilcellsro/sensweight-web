# Active task plan — JIC presentation follow-through (agreed items only)

**Start here.** If you're picking this project back up, work these tasks **in order, one at a time** — don't jump ahead or batch them. Check a box and add a one-line note when a task finishes; that note is the log, no separate write-up needed.

Full background: see CLAUDE.md's "Stakeholder feedback — JIC presentation (2026-07-22)" section. Short version: the chief gave feedback on the site; the items below are the ones the user agreed with. Two other chief asks (a more colorful/animated design, trust/verified badges as the primary sell) are deliberately **excluded** from this plan — they conflict with the user's own confirmed design preference and are still unresolved, tracked as open decisions in CLAUDE.md instead.

## Status

- [x] Task 1 — Extract the ROI calculator into a shared partial (done on `task/roi-calculator-partial`: new `roi-calculator.njk`, homepage now shows a teaser linking to `/solutions/`, `home.js` logic untouched)
- [x] Task 2 — Wire the ROI calculator onto each Solution page (done on `task/roi-calculator-partial`: included in `product.njk` + `sensweight.njk` before each CTA strip, `home.js` added to both templates so the calc logic runs)
- [ ] Task 3 — Add the fraud/theft-prevention feature card to SensWEIGHT
- [ ] Task 4 — Video carousel replacing the hero visual
- [ ] Task 5 — Scope the safety/weight-logistics content (clarification, not a build task)

---

### Task 1 — Extract the ROI calculator into a shared partial

**Why first:** everything else in this plan either depends on it (Task 2) or is independent of it (Task 3/4) — lowest risk, already a locked decision, good first task.

**Current state** (confirmed via code read): the whole calculator — markup (`sensweight/src/_includes/_content/home.njk` lines 286–392, `#roi` section) and logic (`sensweight/src/assets/js/home.js` lines 1–54, guarded by `document.querySelector('.roi-grid')`) — lives only on the homepage, driven by one flat `t.roi` object in `translations.js` (lines 101–128: per-category labels/units/rates/defaults for 8 categories + `syscost`).

**Done when:**
- New shared partial `sensweight/src/_includes/_content/roi-calculator.njk` exists, containing the extracted `#roi` markup.
- `#roi` section removed from `home.njk`, replaced with a short teaser line ("See exact payback numbers on each Solution page →") linking to `/solutions/` — avoids an abrupt homepage gap and reinforces Phase 3's internal-linking goal.
- `home.js`'s ROI logic (lines 1–54) still runs correctly wherever the partial is included — it's already selector/dataset-driven, not homepage-specific, so no logic rewrite needed, just confirm it loads on the pages that need it.
- **Known simplification, deliberately not solved here:** every Solution page will show the same 8 categories/rates (`t.roi` stays one global object) — per-product rate variants remain the pre-existing Phase 4 backlog item, not new scope.

**Files:** `home.njk`, new `roi-calculator.njk`, `home.js` (all under `sensweight/src/`).

**Verify:** `cd sensweight && npm start`, confirm homepage no longer shows `#roi` but shows the teaser line.

---

### Task 2 — Wire the ROI calculator onto each Solution page

**Depends on:** Task 1 (the partial must exist).

**Done when:**
- The partial is included in `sensweight/src/_includes/_content/product.njk` (covers SensSILO/SensGEO/SensATMO/SensGREEN in one change) and in `sensweight/src/_includes/_content/sensweight.njk` (SensWEIGHT's dedicated template), placed immediately before each page's final CTA strip.
- All 5 Solution pages render a working calculator with the same numbers it used to produce on the homepage.

**Files:** `product.njk`, `sensweight.njk` (both under `sensweight/src/_includes/_content/`).

**Verify:** visit `/sensweight/`, `/senssilo/`, `/sensgeo/`, `/sensatmo/`, `/sensgreen/` — calculator present and computing correctly on each.

---

### Task 3 — Add the fraud/theft-prevention feature card to SensWEIGHT

**Independent of Tasks 1–2** (can be done any time), but reads best once Task 2 has landed since the ROI calculator's `fraud` category will sit on the same page reinforcing this copy.

**Done when:**
- One new entry added to `t.sensweight.features[]` in `translations.js` (lines 162–199) — a feature card built around "stops weighing fraud & theft before it costs you," using the existing `.feature-card` pattern already rendered by `_content/sensweight.njk`.
- **Explicitly not touched in this task:** `t.sensweight.hero_sub`, the homepage `t.hero.sub`/headline, or any other page's copy — elevating this beyond one feature card is a bigger positioning move that needs its own sign-off after you've seen how the card reads.

**Files:** `sensweight/src/_data/translations.js`.

**Verify:** visit `/sensweight/`, confirm the new feature card renders in the features grid with the rest unchanged.

---

### Task 4 — Video carousel replacing the hero visual

**Blocked on a content prerequisite, not code:** needs 3–5 actual video clips before it can be built — this was the user's own stated order ("firstly generated them and then add to the background"). Treat clip generation as the first sub-step of this task, not a separate task, since the code work can't be verified without them.

**Current state:** `home.njk` lines 4–59 is the hero; the right-hand `.hero-visual` (lines 13–32) is a static inline SVG, hidden below 900px (`main.css` line 124). The unrelated `#videos` section (lines 257–284, 3 click-to-play YouTube thumbnails) stays untouched — per the user's choice, the carousel replaces the hero visual, not that grid.

**Done when:**
- 3–5 short (6–15s), muted, seamlessly-looping clips exist, visually restrained (navy/blue tones) so they don't clash with the existing minimalist system more than this ask already requires.
- New data file `sensweight/src/_data/heroVideos.js` exports an array of `{ mp4, poster }` entries.
- `.hero-visual` SVG markup replaced with a `.hero-video-carousel` container: one `<video>` per clip (`muted playsinline loop preload="none"` except the first), each with a `poster` fallback frame; only one visible at a time.
- A crossfade script (added to `home.js` or a new `hero-carousel.js`) rotates the active clip every ~6–8s, and respects `prefers-reduced-motion: reduce` by freezing on the poster frame instead of autoplaying.
- CSS extends the existing `.hero-visual` sizing/positioning rules for `.hero-video-carousel`; keeps the current "hide below 900px" behavior by default (desktop-only, matching today's SVG) — flagged as an assumption to confirm once clips are ready, not re-asked now.

**Files:** `home.njk`, new `heroVideos.js`, `main.css`, `home.js` or new `hero-carousel.js` (all under `sensweight/src/`).

**Verify:** hero autoplays muted/looped on desktop, falls back to a static poster under `prefers-reduced-motion` and on mobile widths; `npm run build` produces clean output with no broken asset links.

---

### Task 5 — Scope the safety/weight-logistics content (clarification, not a build task)

The meeting notes only say "safety and weight logistics" came up — too vague to write real copy from without guessing. This task is a short follow-up conversation (what specifically was raised — compliance? operational safety for the Logistics industry page? a geotechnical-safety angle?) before touching `t.industries.items.logistics` or adding `usecases[]` entries to SensWEIGHT/SensGEO. Stays a Phase 3 backlog item in CLAUDE.md until scoped.

**Done when:** the specifics are captured from the user, and — if there's real content to add — a follow-up task is created for it.

---

## After all tasks

Update CLAUDE.md's "Stakeholder feedback — JIC presentation" section and Implementation-phases checklist to reflect what shipped (use `/ucs-log`), and delete or archive this file once every box above is checked.
