# Video carousel — AI-generation prompt brief (Task 4)

**Status: drafted, conserved pending chief's sign-off/access to the paid video-generation tool.** Not yet sent for generation. See `TASKS.md` Task 4 for how this plugs into the actual build.

## Reference used

`references/METTLER TOLEDO Balances & Scales for Industry, Lab, Retail - METTLER TOLEDO.html` (saved copy of `mt.com/cz/cs/home.html`) — its hero is a 3-slide `heroCarousel`, each slide a **full-bleed video background** with a dark overlay, a large H1/H2 text pair, a CTA button, and pagination dots. This is a bigger structural change than TASKS.md's Task 4 currently scopes (which only swaps the small `.hero-visual` SVG icon) — **confirm the hero-rebuild scope with the user before starting the code-integration part of Task 4**, not just the clip content.

## Logo note

Literal readable logos/wordmarks render badly in AI video (garbled, warped, flickering text). "With logo" below means a plain **non-text brand mark/emblem shape**, not the actual UCS wordmark. A crisp real logo is normally composited on top in post-production, not baked into the AI generation.

## Shared technical spec (all clips, all variants)

- 16:9, cropped to `cover` in the full-bleed hero
- 8s target duration (within the 6–15s range from TASKS.md Task 4)
- Color grade restricted almost entirely to navy `#1D2C49` / blue `#476DB8` / blue-pale `#DCE5F4`, rare sky `#7ED3F0` highlight
- Shallow depth of field, slow deliberate camera (push-in or static — no handheld shake)
- No legible text or logos anywhere in frame
- No clear human faces (avoid AI face artifacts; real people are for the "real footage later" phase per CLAUDE.md's decision table)
- No multiple vehicles/crowds

## Concepts (trust goes first, per user's instruction)

Each concept has two variants (A/B) for discussion — same subject, one axis changed — plus a one-line "what we're testing" caption.

---

### 1. Trust — patented, verified, Czech-engineered

**Testing:** does a subtle branded emblem in the seal read as more premium/ownable, or does a fully anonymous seal feel more universally "certified" (less like self-promotion)?

**A — with mark:**
- *Prose:* Macro shot, dim workshop, navy-blue monochrome grade. A metal stamp descends and presses a simple geometric emblem (a plain circular/shield outline shape, no letters) into a dark metal plate, leaving a glowing blue-white embossed impression as it lifts. Shallow DOF, blue bokeh background, slow dolly-in.
- *Keywords:* macro, dim workshop, navy-blue grade, stamp descending, geometric shield/circle emblem no text, glowing embossed impression, shallow DOF, blue bokeh, slow dolly-in, 16:9, 8s, no text, no faces

**B — anonymous seal:**
- *Prose:* Same shot, but the stamp face is a fully blank, featureless circular disc — no emblem, no shape detail, just a plain seal. Impression left behind is a soft glow with no discernible pattern, purely symbolic of "certified" rather than referencing any specific mark.
- *Keywords:* macro, dim workshop, navy-blue grade, stamp descending, blank featureless disc, soft glowing impression no pattern, shallow DOF, blue bokeh, slow dolly-in, 16:9, 8s, no text, no faces

---

### 2. Precision & monitoring (the pitch)

**Testing:** does showing a human hand making the adjustment communicate "engineered by real people, precisely" — or does it dilute the pure-mechanism, purely-exact feel of leaving it equipment-only?

**A — equipment only:**
- *Prose:* Extreme macro, slow motion, load-cell/sensor mechanism, cool blue lighting, dust in a light beam. A needle or light settles exactly on a mark with a blue glow-pulse. No hands, no people — pure mechanism.
- *Keywords:* extreme macro, slow motion, load-cell mechanism, cool blue lighting, dust in beam, indicator glow-pulse settling, no hands, static tripod, 16:9, 8s

**B — human-present:**
- *Prose:* Same macro subject and lighting, but a gloved hand (no face) enters frame to make a small precise adjustment on the sensor housing, then withdraws as the indicator locks in with the same blue glow-pulse.
- *Keywords:* extreme macro, slow motion, load-cell mechanism, cool blue lighting, gloved hand precise adjustment no face, indicator glow-pulse settling, static tripod, 16:9, 8s

---

### 3. Problem → solution → dashboard (the journey)

**Testing:** does one continuous camera move sell the "we handle it all, seamlessly" story better — or do three staged cuts land the message more clearly (and give AI generation an easier, more reliable target)?

**A — continuous shot:**
- *Prose:* Single unbroken camera push: wide industrial silhouette at dusk, cool blue tones → glides toward gloved hands installing a sensor module → racks focus onto a tablet dashboard (line graph, soft green pulse) held as final frame. No cuts.
- *Keywords:* continuous camera push, industrial silhouette dusk, cool blue, gloved hands installing sensor, rack focus to tablet dashboard, green pulse indicator, no cuts, 16:9, 8s

**B — staged cuts:**
- *Prose:* Three clean, distinct shots with a hard cut between each: (1) static wide shot of industrial site silhouette at dusk; (2) static close-up of gloved hands installing a sensor module; (3) static close-up hold on a tablet dashboard with line graph and green pulse.
- *Keywords:* three static shots, hard cuts, industrial silhouette dusk / gloved hands installing sensor / tablet dashboard green pulse, cool blue grade, 16:9, 8s total

---

### 4. Fraud/theft prevention

**Testing:** does staying fully abstract (light pulse only) keep it tasteful and safely non-literal — or does showing an actual weighbridge display with a verification cue make the fraud-prevention message more concrete and immediately understood?

**A — abstract signal:**
- *Prose:* Cinematic macro, night, weighbridge sensor housing, navy-blue lighting. A small indicator light pulses amber, holds, then shifts smoothly to steady green — purely symbolic of an anomaly resolving. No display, no numbers.
- *Keywords:* macro, night, weighbridge sensor housing, navy-blue lighting, amber-to-green pulse transition, no display, no people, 16:9, 8s

**B — literal readout:**
- *Prose:* Close-up on an actual weighbridge digital display (numerals blurred/out of focus enough to stay illegible — avoids AI garbling), navy-blue lighting, a small checkmark-shaped icon glow (not text) appears briefly over the display as if confirming a verified reading, then fades.
- *Keywords:* macro, weighbridge digital display defocused illegible numerals, navy-blue lighting, glowing checkmark icon overlay no text, brief confirm-and-fade, 16:9, 8s

---

## Next steps

1. Send this brief to chief for the paid video-gen tool access/budget sign-off.
2. Once access is granted: generate, expect re-rolls, pick the cleanest result per concept (one variant, not both A/B, ships).
3. Trim to spec length, strip audio, extract poster frames.
4. Confirm the hero-rebuild scope question above before starting code integration (see `TASKS.md` Task 4).
