# Active task plan — JIC presentation follow-through (agreed items only)

**Start here.** If you're picking this project back up, work these tasks **in order, one at a time** — don't jump ahead or batch them. Check a box and add a one-line note when a task finishes; that note is the log, no separate write-up needed.

Full background: see CLAUDE.md's "Stakeholder feedback — JIC presentation (2026-07-22)" section. Short version: the chief gave feedback on the site; the items below are the ones the user agreed with. Two other chief asks (a more colorful/animated design, trust/verified badges as the primary sell) are deliberately **excluded** from this plan — they conflict with the user's own confirmed design preference and are still unresolved, tracked as open decisions in CLAUDE.md instead.

## Status

- [x] Task 1 — Extract the ROI calculator into a shared partial (done on `task/roi-calculator-partial`: new `roi-calculator.njk`, homepage now shows a teaser linking to `/solutions/`, `home.js` logic untouched)
- [x] Task 2 — Wire the ROI calculator onto each Solution page (done on `task/roi-calculator-partial`: included in `product.njk` + `sensweight.njk` before each CTA strip, `home.js` added to both templates so the calc logic runs)
- [ ] Task 3 — Add the fraud/theft-prevention feature card to SensWEIGHT
- [ ] Task 4 — Video carousel replacing the hero visual (**on hold, conserved** — creative brief drafted, see below, pending chief's sign-off/tool access)
- [x] Task 5 — Scope the safety/weight-logistics content (done 2026-07-22: two angles confirmed — operational safety for Logistics, and regulatory/compliance weight limits; structural/geotechnical-safety framing explicitly not selected; target pages left undecided, see Task 7)
- [x] Task 6 — Define a shared-review mechanism so the team can comment/edit, not just receive finished deliverables (**final decision 2026-07-22, superseding two earlier passes**: a shared Drive folder containing (a) the live site preview link and (b) `references/site-proposals.md`, a running list of open site proposals — team adds comments/thoughts, discussed in meetings, status retroactively marked Integrated/Not integrated. Earlier passes — a Google Docs pilot of the video brief, then live pinned comments on the rendered site via Vercel Comments — were both superseded before being built. Remaining step: create the Drive folder and paste in the weblink + doc)
- [ ] Task 7 — Draft safety/compliance content for Logistics + SensWEIGHT

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

**2026-07-22 update — on hold, conserved:** creative direction pivoted from an abstract vector-line animation to cinematic AI-generated video modeled on `mt.com/cz/cs/home.html`'s hero carousel (saved locally at `references/METTLER TOLEDO Balances & Scales for Industry, Lab, Retail - METTLER TOLEDO.html`). Full prompt brief — 4 concepts (trust, precision & monitoring, problem→solution→dashboard journey, fraud/theft prevention), trust ordered first, 2 discussion variants each — written to `references/video-carousel-prompts.md`. **Not yet sent for generation** — waiting on the user to get chief's sign-off/access to the paid video-gen tool. **Scope note surfaced in that brief:** mt.com's hero is a full-bleed video background with per-slide overlay text/CTA/pagination, which is a bigger structural change than this task's current "Done when" list (which only swaps the small `.hero-visual` SVG icon) — confirm with the user which scope applies before starting the code-integration part of this task.

---

### Task 5 — Scope the safety/weight-logistics content (clarification, not a build task)

The meeting notes only say "safety and weight logistics" came up — too vague to write real copy from without guessing. This task is a short follow-up conversation (what specifically was raised — compliance? operational safety for the Logistics industry page? a geotechnical-safety angle?) before touching `t.industries.items.logistics` or adding `usecases[]` entries to SensWEIGHT/SensGEO. Stays a Phase 3 backlog item in CLAUDE.md until scoped.

**Done when:** the specifics are captured from the user, and — if there's real content to add — a follow-up task is created for it.

**Resolved 2026-07-22:** two angles confirmed — (1) operational safety for the Logistics industry (overload prevention, weighbridge/site safety, traffic/queueing at weigh points), and (2) regulatory/compliance weight limits (legal load limits, axle weight regs, certified weighing for audit). Structural/geotechnical-safety framing for SensGEO was explicitly **not** selected — leave SensGEO copy alone unless separately asked. Target pages (Industries/Logistics vs SensWEIGHT `usecases[]` vs both) left undecided — see Task 7.

---

### Task 6 — Define a shared-review mechanism so the team can comment/edit, not just receive finished deliverables

**Why:** right now the pattern is one-way — the user prepares a finished proposal (e.g. the Task 4 video-carousel brief) and delivers it; the team/chief only react afterward, never touch the work itself. The user wants to distribute responsibility for these decisions instead of carrying them alone, starting with the video-carousel brief (`references/video-carousel-prompts.md`) as the pilot case.

**Current state:** no shared collaboration surface has been identified yet. Nothing in project memory or CLAUDE.md references an existing team tool (Notion, Google Docs, Confluence, Slack, Figma, etc.) — this needs to come from the user, not be assumed.

**Open questions (must resolve before this becomes a build/setup task):**
- What surface does the team already use day-to-day, if any? (Notion, Google Workspace, Confluence/Jira, Slack threads, Figma comments, GitHub PR review on markdown files — all have very different "can non-technical people comment" tradeoffs.)
- Is the goal comment/annotate on the user's draft, or genuinely propose edits/alternatives (co-authoring, not just reacting)?
- Who is "the team" — how many people, technical or non-technical? Decides whether a GitHub-native flow (PR comments on `references/*.md`) is viable or whether a no-login-friendly tool is needed.
- Should this mechanism generalize to future deliverables (design directions, positioning calls) or is it scoped to video-concept review only for now?

**Narrowed 2026-07-22:** team already has both Confluence and Google Workspace — narrowed to those two, exact pick still open ("let's decide"). Scope confirmed as **both**: pilot on `references/video-carousel-prompts.md` (Task 4's brief) AND a general mechanism reusable for future deliverables — not video-review-only.

**Superseded pass 1 (2026-07-22): Google Workspace (Google Docs), publish the video brief.** Reasoning at the time: content in scope (video briefs, copy drafts) is transient, reviewers are a wider non-technical team, Google Docs' comment/suggestion mode is low-friction. Dropped before being built — see final decision below.

**Superseded pass 2 (2026-07-22): live pinned comments on the rendered site via Vercel Comments.** User reframed the ask mid-thread from "review a text brief" to "review the actual live website" (design + content together), which needs a tool that supports clicking directly on a rendered page. Researched options: Vercel Comments (free, built into the existing Vercel preview workflow, but reviewers need a Vercel account and external/non-team commenting may need a paid team tier — unconfirmed) vs. paid snippet tools BugHerd/Marker.io/Usersnap (no real free tier, $39–79+/mo) vs. several unfamiliar "free" sites (Simple Commenter, Annot.io, UX Peeker, Huddlekit) flagged as low-trust SEO-directory content, one of which proxies your live site through a third party. User moved on before picking one of these.

**Final decision 2026-07-22:** simpler than either pass above — a shared Drive folder containing (a) the live site preview link and (b) `references/site-proposals.md`, a running proposals list (colorful/animated design, trust badges vs value-led positioning, fraud/theft-prevention as primary value prop, safety/compliance content, hero video carousel, real hardware catalog, live-demo data source — pulled from CLAUDE.md's actual unresolved items). Team adds comments/thoughts directly in the doc, items get discussed in meetings, and the Status column is updated retroactively (Proposed → Discussed → Integrated / Not integrated) — same shape as the user's own memory-style running record.

**Remaining step (mechanical, not a decision):** create the Drive folder, paste in the fresh preview link (`https://site-3nur7wp3k-zhenyachet91-7909s-projects.vercel.app` — currently Vercel-SSO-protected; user is generating a Protection Bypass share link from the Vercel dashboard's "Share" button on this deployment), and add `site-proposals.md`'s content as a Doc in that folder.

**Done when:** the Drive folder exists with both the weblink and the proposals doc, and at least one meeting has produced a first round of Status updates in the doc.

**Files:** `references/site-proposals.md` (new, doc-only, no code).

---

### Task 7 — Draft safety/compliance content for Logistics + SensWEIGHT

**Depends on:** Task 5's scoping (done above).

Write real copy for the two confirmed angles: operational safety (overload prevention, weighbridge/site safety, traffic/queueing) and regulatory/compliance weight limits (legal load limits, axle weight regs, certified weighing for audit). Still open: which page(s) — `t.industries.items.logistics`, a new `usecases[]` entry on SensWEIGHT, or both — decide once a first draft makes the fit obvious rather than guessing now.

**Done when:** copy exists and is placed on the agreed page(s), reviewed against the two confirmed angles above (no structural/geotechnical-safety content mixed in).

**Files:** likely `sensweight/src/_data/translations.js` (`t.industries.items.logistics` and/or `t.sensweight`), exact scope TBD.

---

## After all tasks

Update CLAUDE.md's "Stakeholder feedback — JIC presentation" section and Implementation-phases checklist to reflect what shipped (use `/ucs-log`), and delete or archive this file once every box above is checked.
