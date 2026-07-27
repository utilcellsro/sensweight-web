# Active task plan — JIC presentation follow-through (agreed items only)

**Start here.** If you're picking this project back up, work these tasks **in order, one at a time** — don't jump ahead or batch them. Check a box and add a one-line note when a task finishes; that note is the log, no separate write-up needed.

Full background: see CLAUDE.md's "Stakeholder feedback — JIC presentation (2026-07-22)" section. Short version: the chief gave feedback on the site; the items below are the ones the user agreed with. Two other chief asks (a more colorful/animated design, trust/verified badges as the primary sell) are deliberately **excluded** from this plan — they conflict with the user's own confirmed design preference and are still unresolved, tracked as open decisions in CLAUDE.md instead.

## Status

- [x] Task 1 — Extract the ROI calculator into a shared partial (done on `task/roi-calculator-partial`: new `roi-calculator.njk`, homepage now shows a teaser linking to `/solutions/`, `home.js` logic untouched)
- [x] Task 2 — Wire the ROI calculator onto each Solution page (done on `task/roi-calculator-partial`: included in `product.njk` + `sensweight.njk` before each CTA strip, `home.js` added to both templates so the calc logic runs)
- [x] Task 3 — DROPPED 2026-07-23 (was: fraud/theft feature card, then reframed to "Load Anomaly Detection" — turned out redundant with the existing "Predictive Drift Alerts" card; no code changed, see detail below)
- [x] Task 4 — Video carousel replacing the hero visual (**done 2026-07-26 for Concepts 1–3** — weighbridge/silo/warehouse clips generated via Magnific, integrated and live on `main`; Concept 4 (field worker at dusk) deliberately skipped for this deadline, see below)
- [x] Task 5 — Scope the safety/weight-logistics content (done 2026-07-22: two angles confirmed — operational safety for Logistics, and regulatory/compliance weight limits; structural/geotechnical-safety framing explicitly not selected; target pages left undecided, see Task 7)
- [x] Task 6 — Define a shared-review mechanism so the team can comment/edit, not just receive finished deliverables (**final decision 2026-07-22, superseding two earlier passes**: a shared Drive folder containing (a) the live site preview link and (b) `references/site-proposals.md`, a running list of open site proposals — team adds comments/thoughts, discussed in meetings, status retroactively marked Integrated/Not integrated. Earlier passes — a Google Docs pilot of the video brief, then live pinned comments on the rendered site via Vercel Comments — were both superseded before being built. Remaining step: create the Drive folder and paste in the weblink + doc)
- [x] Task 7 — Draft safety/compliance content for Logistics + SensWEIGHT (done 2026-07-23: two new SensWEIGHT feature cards — "Overload & Site Safety Alerts" and "Compliance-Ready Records" — placed on SensWEIGHT rather than the Logistics industry page, keeping that page thin per the settled IA)
- [ ] Task 8 — Give the patent more visual/content focus in the Certified & Patented section (scoped 2026-07-27, in progress)

**Out-of-plan, shipped 2026-07-23:** the chief's "we sell trust" JIC ask (CLAUDE.md, previously logged unresolved) resurfaced — user initiated adding a real, factual trust signal (not the disputed badge-driven-as-primary-positioning version). Built as a supporting homepage section, not the site's lead pitch: minimalist circular seal icon + 3 sourced facts (granted EU patent EP 4 524 526, TRL 9, live pilot/commercial installations, from `references/UCS for JIC.docx`), placed between the ROI teaser and the closing CTA. Branched, built, verified via Playwright screenshot, merged to `main`, pushed to `origin/main` (`0aa6d63`). Also updated `references/site-walkthrough.md` + its Google Doc copy to reflect the new section. This doesn't resolve the design-style or trust-vs-value-prop conflicts in CLAUDE.md — still flag both if they resurface — it's a separate, narrower, factual addition the user chose to move on independently.

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

### Task 3 — DROPPED 2026-07-23 (was: add an honest "load anomaly detection" feature card to SensWEIGHT)

**Reframed once (2026-07-23):** fraud/theft prevention is a positioning/vision narrative for the video carousel (Task 4), not a real, shipped SensWEIGHT capability — a literal "stops weighing fraud & theft" feature-card claim would misrepresent the product. Reframed to "Load Anomaly Detection" (flags unexpected weight discrepancies) instead.

**Then dropped entirely, same day:** that replacement copy was never sourced from a real spec/document — it was a paraphrase invented on the spot to avoid the false fraud claim. On review, it turned out to duplicate an **existing** feature card already on `/sensweight/`: "Predictive Drift Alerts — Detects creep and drift weeks before tolerance is exceeded." Adding a second card for the same real capability would be redundant, not new content. User called this out and dropped the task. No code changes were made for Task 3 — SensWEIGHT's features grid is unchanged.

**If a genuinely new SensWEIGHT feature card is wanted later:** source it from a real product document (e.g. `references/UCS for JIC.docx`, the leaflets) rather than inventing paraphrased capability language, and check it against the existing 6 cards in `t.sensweight.features[]` (`translations.js` lines 162–199) for overlap first.

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

**2026-07-22 update — on hold, conserved:** creative direction pivoted from an abstract vector-line animation to cinematic AI-generated video modeled on `mt.com/cz/cs/home.html`'s hero carousel (saved locally at `references/METTLER TOLEDO Balances & Scales for Industry, Lab, Retail - METTLER TOLEDO.html`). Full prompt brief — 4 concepts (trust, precision & monitoring, problem→solution→dashboard journey, fraud/theft prevention), trust ordered first, 2 discussion variants each — written to `references/video-carousel/video-carousel-prompts.md`. **Scope note surfaced in that brief:** mt.com's hero is a full-bleed video background with per-slide overlay text/CTA/pagination, which is a bigger structural change than this task's current "Done when" list (which only swaps the small `.hero-visual` SVG icon) — confirm with the user which scope applies before starting the code-integration part of this task.

**2026-07-23 update — reframed, active again:** the "fraud/theft prevention" angle is a positioning/narrative to sell through this video carousel, not a real SensWEIGHT capability — it must never be added as a literal product feature claim (see Task 3 below, which was corrected because of this). Chief pointed to Magnific (magnific.com) for video generation; its free tier covers image generation only, not video — a paid tier is needed for the actual clips. All video-carousel assets now live in `references/video-carousel/` (moved out of the flat `references/` root to keep this "different domain" grouped): `video-carousel-prompts.md` (creative brief), `generation-manifest.md` (per-concept production record), `images/` (generated start-image stills), `mt-com-hero-reference.html` (saved mt.com hero markup, kept for structural reference only).

**2026-07-23 update — concept fully redesigned, brand-precedent-driven:** the first attempt (4 abstract concepts — trust/seal, precision macro, journey, fraud checkmark) was scrapped mid-production. User's read: too abstract to be understood as "a monitoring product" by an outside viewer, and it was inventing new visual language instead of reusing what the company already puts out. User pulled 8 images from the company's actual LinkedIn page (`linkedin.com/company/unified-cloud-sensors/posts`, saved to `references/video-carousel/brand-style-reference/`) — these reveal a consistent, chief-approved marketing formula: real industrial photo (weighbridge/truck, silo, warehouse, safety-vest worker) + a glowing blue wifi icon/connection line to the brand's cloud-and-circuit badge icon + a tablet/laptop reveal showing an actual dashboard UI (line graphs, pie charts, data cards) + bilingual headline text and a navy bottom banner composited as a separate design layer (not baked into the photo). Two of those 8 images lean on an AI-generated background and read as slightly plasticky/uncanny — flagged as a real quality bar the generated video clips need to avoid repeating. New rule: the 4 video concepts are now literal recreations of 4 of these real brand posts (not invented), and only the photo+wifi-icon+dashboard-reveal layer gets AI-generated — headline/logo/banner text stays a separate composited layer in the site's actual code, same reasoning as before (AI video garbles legible text). New concept set: (1) Weighbridge/truck monitoring, (2) Silo monitoring, (3) Warehouse/installation monitoring, (4) Field worker at dusk — see `video-carousel-prompts.md` for full descriptions and `generation-manifest.md` for prompts/status. The old 4 abstract concepts' start images are archived (not deleted) at `references/video-carousel/archived-abstract-concepts/`. **2026-07-23 update — 3 of 4 start images done, paused on free-tier limits:** Concepts 1 (weighbridge/truck), 2 (silo, Variant A), and 3 (warehouse/installation, Variant A) all have generated start images, confirmed on-brand, and full video prompts logged in `generation-manifest.md`. Concept 4 (field worker at dusk) is scoped (both variants drafted) but not started — paused because the user's free image-generation tokens are exhausted until tomorrow morning. User is separately pinging the chief to get shared/paid access to the video-generation tool itself (still needed regardless, since Magnific's free tier only covers image generation, not video).

**Next steps, in order:**
1. Tomorrow: generate Concept 4's start image once free tokens reset, pick a variant (A — worker-first / B — equipment-first), log it the same way as 1–3.
2. ~~Once chief grants video-gen tool access~~ **Unblocked 2026-07-26 — user has Magnific access now.** Run each of the 4 start image + prompt pairs through Magnific's actual video generation (expect re-rolls, pick the cleanest/least "AI-plasticky" result per concept).
3. Trim to spec length, strip audio, extract poster frames.
4. Confirm the hero-rebuild scope question (mt.com's structural full-bleed-carousel pattern vs. just swapping the small `.hero-visual` SVG) before starting code integration.

**2026-07-26 update — hero copy and video background decoupled, deliberately:** user confirmed the 3 patent-forward hero headline/sub-headline drafts (logged in CLAUDE.md's "Decisions already made") should be picked and built independently of this task — the headline is a text-overlay layer sitting on top of whatever hero background exists (today's static SVG, tomorrow's video carousel), not content that needs to wait on video production or be folded into the video's script. Don't block picking/shipping a headline on this task's progress, and don't fold patent messaging into the video concepts themselves unless separately asked.

**2026-07-26 update — urgent deadline (tomorrow's presentation), code scaffold built ahead of real clips:** user needs actual video clips delivered by tomorrow. Confirmed scope: **live on the site** (not just raw clips) using the **minimal hero-visual swap** (not the full mt.com-style full-bleed rebuild) — chosen for reliability under deadline pressure. Concept 4 (field worker at dusk) explicitly **skipped** for this deadline; only Concepts 1–3 (weighbridge, silo, warehouse) are in scope.

Built and merged to `main` (`1eff058`) ahead of the real clips existing: `.hero-visual` SVG replaced with a `.hero-video-carousel` container (3 crossfading slides), new `heroVideos.js` data file, crossfade script (`hero-carousel.js`, ~7s rotation, respects `prefers-reduced-motion`), CSS sized to the existing hero slot (not full-bleed). Each of the 3 slides currently falls back to its confirmed-on-brand start-image still (already copied into `sensweight/src/assets/images/hero/`) as a plain `<img>`, since `heroVideos.js`'s `mp4` field is `null` per entry — this means **the site is presentable right now even if real video generation runs late**.

**Done 2026-07-26 — real clips wired in:** all 3 Magnific clips (~10s each, already silent — no audio track to strip) remuxed with `ffmpeg` (faststart, no re-encode needed — source was already h264/yuv420p) into `sensweight/src/assets/video/hero/`, poster images extracted from each clip's own first frame (replacing the earlier separate start-image stills for a seamless autoplay→paused match), `heroVideos.js` updated to point at the real files. Raw Magnific outputs also saved to `references/video-carousel/` as source-of-record. Verified via clean build (`_site/` regenerated from scratch) + grep confirming real `<video src>` paths render, plus a visual check of each extracted poster frame against the brief — all 3 match (truck-on-weighbridge, silo, warehouse interior, consistent cloud-badge icon across all three). Merged to `main`, pushed (`a7005d2`).

**Not done, deliberately out of scope for this deadline:** Concept 4 (field worker at dusk) — skipped per user's 2026-07-26 call given the presentation deadline. Pick up later as its own follow-up if wanted (needs a variant choice, a start image, and a prompt from scratch — see the concept's still-empty entry in `generation-manifest.md`).

**Security note, same thread:** user pasted a live Magnific API key and a webhook signing secret directly into chat while trying to find a faster (API-based) generation path. Neither was written to any file or committed — flagged to the user to avoid pasting secrets into chat going forward and to consider rotating both. Magnific's API wasn't actually used (no verified docs found, `docs.magnific.ai` doesn't resolve) — generation is still expected to go through the Magnific web UI by hand.

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

**Final decision 2026-07-22:** simpler than either pass above — a shared Drive folder containing (a) the live site preview link and (b) `references/site-proposals.md`, a running proposals list (colorful/animated design, trust badges vs value-led positioning, fraud/theft-prevention as primary value prop, safety/compliance content, hero video carousel, real hardware catalog, live-demo data source — pulled from CLAUDE.md's actual unresolved items, written neutral with no attribution). Team adds comments/thoughts directly in the doc, items get discussed in meetings, and the Status column is updated retroactively (Proposed → Discussed → Integrated / Not integrated) — same shape as the user's own memory-style running record.

**Refined 2026-07-22, from an actual team chat (Nikola Avramovic) surfaced by the user:** the review format isn't a live editable site, it's a screenshot-per-view document — a picture of each page/section, a short description of that part, room for people to add notes underneath. Built `references/site-walkthrough.md`: 6 full-page screenshots (Home, Industries index, Solutions index, SensWEIGHT as the representative Solution page, Products, How to Buy), captured via Playwright from the local dev server against the current `main` build (the deployed Vercel preview is SSO-gated so couldn't be screenshotted directly), each page broken into its real sections (e.g. Home → hero / how-it-works / solutions grid / industries grid / video section / ROI teaser+CTA) with a Notes line under each. Images live in `references/site-walkthrough-shots/`. This is the actual per-view document Nikola described; `site-proposals.md` stays the separate topic/decision-level tracker (design direction, positioning, etc.) — both go in the same Drive folder.

**Google Drive access, for the record:** no Google Drive/Docs connector is available in this environment, and a plain API key won't work for Drive writes (Google requires OAuth or a service account for write access). User chose the service-account path: created a GCP project (`ucs-site-review`), enabled Drive + Docs APIs, created service account `ucs-doc-publisher@ucs-site-review.iam.gserviceaccount.com`, and dropped the downloaded JSON key at `references/ucs-site-review-b83c6c569b2f.json` — **immediately gitignored** (`.gitignore` now excludes `references/*.json` and `*.serviceaccount.json`), never committed.

**First folder attempt failed — real Google API gotcha:** user's first share was a regular "My Drive" folder (`.../folders/1swJz85cRXt83XMIzuGG_OoYTJIVXGX_I`, "Sensweight web"). Service-account auth worked and the folder was genuinely shared (`canEdit: true`), but creating a file still 403'd with `storageQuotaExceeded` — **service accounts have zero personal storage quota and cannot own new files in a regular folder**, only inside an actual Shared Drive. Confirmed via `files.get` that the folder had no `driveId` (i.e. not a Shared Drive).

**Fixed:** user created a real Shared Drive instead — `https://drive.google.com/drive/folders/0AENXban7GLA8Uk9PVA` ("Web-sensweight", `drives.get` confirms it's a genuine Shared Drive, `canAddChildren: true` for the service account). This is the correct target going forward — don't reuse the old regular-folder link.

**Working setup, ready to resume:** OAuth (JWT-bearer service-account flow, RS256 via Python's `cryptography` lib, no pip installs needed beyond what's already present — `requests` and `cryptography` both available) and a publish script both built and confirmed working through the Drive API auth + access-check steps: scratchpad `gauth.py` (token minting) and `publish_docs.py` (uploads `site-proposals.md` and `site-walkthrough.md`, images inlined as base64, as real Google Docs via Drive API multipart upload with `mimeType: application/vnd.google-apps.document` against the Shared Drive ID).

**Resolved 2026-07-22 — publish completed:** rerunning `publish_docs.py` against the Shared Drive first hit a real Google API gotcha: uploading into a Shared Drive parent 404s unless `supportsAllDrives=true` is added to the upload request's query params (fixed in the script). Both docs are now live in the Shared Drive:
- Proposals doc: `https://docs.google.com/document/d/1rnxy06lbpss-WOWXhkI5Yg161DWh0-TIzQlt0nV12XU/edit`
- Walkthrough doc: `https://docs.google.com/document/d/1vcTiHsT0oef43W2gBfaWmPNEW7AzUPLELs5MMZoiA2k/edit`

For the weblink, skipped the SSO-gated preview URL entirely — `vercel project ls` showed the `sensweight` project has a plain production alias, **`https://sensweight.vercel.app`**, confirmed publicly accessible (200, no auth) and already serving the current build (`vercel inspect` confirms `target: production`, deployed 2026-07-20). Used that instead of chasing a Protection Bypass token from the Vercel dashboard.

Filling the placeholder line hit one more snag: the Google Docs API (needed for a targeted text replace) turned out not to be enabled on the `ucs-site-review` GCP project, and enabling it requires a console visit. Worked around it without touching Docs API — regenerated each doc's source HTML with the link substituted in, then overwrote the existing Doc's content via Drive API `files.update` (multipart PATCH, `uploadType=multipart&supportsAllDrives=true`, with a `{"mimeType": "application/vnd.google-apps.document"}` metadata part alongside the HTML — omitting that metadata part causes a 400 "Unsupported content with type: text/html"). Verified via Drive's plain-text `export` endpoint that both docs now read "Live preview: https://sensweight.vercel.app" correctly.

**Remaining step:** none — both docs are live with the link filled in. What's left is the human side: share the Shared Drive folder with the team and get the first meeting's Status/notes pass going.

**Done when:** the Drive folder exists with the weblink, the proposals doc, and the walkthrough doc ✅ (all three done 2026-07-22) — outstanding: at least one meeting producing a first round of Status/notes updates.

**Files:** `references/site-proposals.md`, `references/site-walkthrough.md`, `references/site-walkthrough-shots/*.png` (all new, doc-only, no code).

---

### Task 7 — Draft safety/compliance content for Logistics + SensWEIGHT ✅ done 2026-07-23

**Depends on:** Task 5's scoping (done above).

Wrote real copy for the two confirmed angles: operational safety (overload prevention, weighbridge/site safety, traffic/queueing) and regulatory/compliance weight limits (legal load limits, axle weight regs, certified weighing for audit).

**Placement decided:** SensWEIGHT's Key Features grid only — not `t.industries.items.logistics`. Putting real depth content on the Logistics industry page would reverse the settled "thin Industries" IA decision (industry pages are hero + routing only, no capabilities/specs — that was tried full-depth once already and deliberately reverted). Flagged to the user before proceeding; confirmed SensWEIGHT-only.

**Shipped:** two new entries in `t.sensweight.features[]` (`translations.js`) — "Overload & Site Safety Alerts" (operational safety angle) and "Compliance-Ready Records" (regulatory/compliance angle). Chose Key Features over Application Areas (`usecases[]`) since these read as capabilities/benefits, matching the existing feature-card style, rather than physical installation types. Built on `task/safety-compliance-features`, verified via build + Playwright screenshot (8-card grid renders cleanly), merged to `main`, pushed.

**Done when:** copy exists and is placed on the agreed page(s), reviewed against the two confirmed angles above (no structural/geotechnical-safety content mixed in). ✅

---

### Task 8 — Give the patent more visual/content focus in the Certified & Patented section

**Why:** logged 2026-07-26 as a refinement request (see CLAUDE.md "Stakeholder feedback" + memory) — the shipped 2026-07-23 version treats the patent as one line among three equal facts (patent / TRL 9 / deployment). User wants the patent specifically to stand out more, to differentiate from other weighing companies.

**Scope confirmed 2026-07-27:** "larger dedicated patent block" — keep the existing 3-fact layout and section, but pull the patent fact out into its own bigger sub-block (prominent patent number, certificate-style treatment) above the remaining two facts (TRL 9, Deployment), rather than reordering or splitting into a whole separate section.

**Done when:**
- `t.trust` in `translations.js` restructured: `patent: { label, number, detail }` pulled out of the `items[]` array; `items[]` keeps only TRL 9 + Deployment.
- `detail` copy sourced from `references/UCS for JIC.docx` ("covering the monitoring and diagnostic methodology of industrial weighing systems"), not invented.
- `home.njk`'s trust section renders a new `.patent-block` (label + large number + detail line) before the existing `.trust-items` row.
- New `.patent-block` CSS in `main.css` — certificate-style bordered box using existing tokens only (`--blue`/`--blue-pale`/`--blue-dark`/`--mono`), no new colors. `--navy` not used for text (existing token rule: navy is bg/chrome only, never text).

**Files:** `translations.js`, `home.njk`, `main.css` (all under `sensweight/src/`).

**Verify:** `npm run build`, visual check via Playwright screenshot of the homepage `#certifications` section — patent number reads clearly larger/more prominent than the other two facts.

---

## After all tasks

Update CLAUDE.md's "Stakeholder feedback — JIC presentation" section and Implementation-phases checklist to reflect what shipped (use `/ucs-log`), and delete or archive this file once every box above is checked.
