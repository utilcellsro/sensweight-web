# UCS Web DNA — intro / outro spec for the presentation video

Everything below is lifted **literally** from `references/UCS-Web-DNA.html` (section numbers are its own).
Nothing here is invented. Where the DNA says nothing, it says so.

Source of truth for the logo itself: **UCS logo manual (dadastudio.cz)** — the DNA states its logo
colors and rules are binding.

---

## 1. Files to hand to whoever cuts the video

| File | What it is |
|---|---|
| `references/UCS-Web-DNA-standalone.html` | **Send this one.** One self-contained file — fonts, logos and images all embedded, opens offline in any browser, prints to PDF. |
| `references/UCS-Web-DNA.html` | The original Claude Design export (713 KB). Same content, plus the editor's Tweaks panel. Keep as the master. |

Logo artwork in this repo (all raster — **there is no vector logo here**):

| File | Size | Use |
|---|---|---|
| `unifiedcloudsensors/partnership-deck/ucs-logo-horizontal.png` | 2454 × 438 | Biggest one. Fine for 1080p; **tight for 4K** — at full-width it would upscale. |
| `references/ucs-logo-master.png` | 456 × 438 | Stacked logo, white background, small. |
| `sensweight/src/assets/images/ucs-mark-white.png` | 279 × 85 | The "uCs" mark, white, transparent — for dark frames. Too small for a full-screen intro. |
| `sensweight/src/assets/images/apple-touch-icon.png` | 180 × 180 | Favicon-grade only. |

> **Do this before the intro is rendered:** get the vector logo (AI/EPS/SVG) from the dadastudio
> logo manual. A 2454 px PNG scaled up to a full-frame 4K intro will show soft edges, and the DNA
> forbids low resolution outright (§01 Forbidden).

Fonts — both are free (Google Fonts, OFL), install the desktop versions:
**Chakra Petch** and **IBM Plex Sans** / **IBM Plex Mono**.
Web copies already in the repo: `sensweight/src/assets/fonts/*.woff2`.

---

## 2. Color (§02)

| Role | Hex | Notes |
|---|---|---|
| UCS Blue — lead | `#476DB8` | Pantone 660 C · CMYK 84/53/0/0 · RGB 71/109/184 |
| UCS Ink | `#484847` | Pantone 446 C · RGB 72/72/71 |
| UCS Sky — live-data accent | `#7ED3F0` | CMYK 50/0/0/0. **Rare.** Only where a signal lives. |
| Navy — dark surface | `#1D2C49` | The one legal dark ground. Text on it: `#DCE5F4` |
| Light ground | `#F7F7F6` / white | |
| Grey text scale | `#2F2F2E` `#484847` `#6F6F6E` `#B9B9B8` `#ECECEB` | |
| Sensor states | OK `#3F8F6B` · WARN `#C98A2E` · ALARM `#BF4B41` · OFF `#9A9A99` | |

**60 / 30 / 10** — 60 % light surface, 30 % grey text and structure, 10 % blue (actions, key
figures). Sky appears rarely.

**The gradient lives only in the logo.** Light→dark blue is a logo property. Do not put a gradient
sweep behind the title card, and do not animate a gradient across the frame.

---

## 3. Type (§03)

- **Chakra Petch 600–700** — headlines and section numbers **only**.
- **IBM Plex Sans 400–600** — body, subtitles, lower thirds.
- **IBM Plex Mono 400–500** — numbers, units, device IDs, timecodes. Tabular figures.
- **Overline**: Mono 500, ALL CAPS, letter-spacing **+0.14em** — this echoes the
  "UNIFIED CLOUD SENSORS" line in the logo. It is the house device for a small label above a title.

DNA's own scale: Display 56/1.05 · H1 40/1.15 · H2 28/1.25 · Body 16/1.6 · Data 15/1.4 · Overline 12.
For 1080p, multiply by roughly 1.6–2 and keep the ratios.

---

## 4. Motion (§08) — this is the section that governs the intro

| Duration | What it is for | Easing |
|---|---|---|
| **120 ms** | hover, focus, toggles | ease-out |
| **200 ms** | panels, dialogs, page transitions | `cubic-bezier(.2,0,0,1)` |
| **320 ms** | charts, number transitions, fills | `cubic-bezier(.2,0,0,1)` |

Frames: at 25 fps → **3 / 5 / 8**. At 30 fps → **4 / 6 / 10**.

> "Motion is an instrument, not theatre. Things **slide and fade** — they never bounce. Live data
> may pulse (the ONLINE status dot); everything else holds still. **No parallax, no reflections**,
> no scroll animations longer than 200 ms."

Practical reading for a video intro: the DNA caps the *movement*, not the *shot*. Each element
arrives in 200–320 ms and then **holds still**. A 4-second intro is four held states with short
slides between them — not one long continuous animation. In After Effects: no overshoot, no
elastic/bounce keyframes, no scale-up-past-100 %.

The one motif that is built to animate: the **triple rule** (§04) — three 2 px lines, 6 px gap,
taken from the favicon, representing data channels. Drawing them on, left to right, in 320 ms is
the most on-brand move available.

---

## 5. Intro — suggested build (≈ 4 s)

Grounded in the DNA's own rules; the copy is a placeholder, swap in the real line.

| t | Frame | Motion |
|---|---|---|
| 0.0 s | Navy `#1D2C49`, empty | — |
| 0.2 s | Triple rule draws in, Sky `#7ED3F0`, centred | 320 ms, draw L→R |
| 0.6 s | Overline fades up under it: `UNIFIED CLOUD SENSORS`, Mono 500 caps +0.14em, `#DCE5F4` | 200 ms fade + 8 px slide up |
| 1.1 s | Logo (white negative) fades in above the rule | 200 ms fade, **no scale** |
| 1.6 s | **Hold** — nothing moves for ~1.4 s | — |
| 3.0 s | Everything fades out, 200 ms; cut to the first content slide | 200 ms |

Alternative light version: ground `#F7F7F6`, logo in 4C, rule in `#476DB8`, text `#2F2F2E`.

**Hard rules this respects:** logo on a solid surface, never on footage (§01); clear space ≥ ½ the
height of the "C" on every side (§01); horizontal logo ≥ 140 px wide — for 1080p keep it well
above that; flat blue, no gradient; slide and fade, no bounce.

---

## 6. Outro — suggested build (≈ 5 s)

| t | Frame | Motion |
|---|---|---|
| 0.0 s | Navy ground, logo already placed, no animation | — |
| 0.2 s | One line of fact, Chakra Petch 600 — a **number**, not an adjective | 200 ms fade + slide |
| 0.8 s | Contact block, IBM Plex Sans 400, `#DCE5F4`: site, e-mail, Ostrovačice CZ | 200 ms, staggered 120 ms |
| 1.4 s | Triple rule under the block, `#476DB8` | 320 ms draw |
| 1.8 s | **Hold** to the end | — |

§09 tone, which applies to every word on screen:
- **Yes:** "We read cold-store temperature every 30 seconds. An alarm reaches you within 15."
- **No:** "A revolutionary next-gen AI-powered solution for your digital transformation journey!"
- Concrete numbers, active voice, short sentences. No superlatives, no exclamation marks,
  no hollow buzzwords.

Facts available to use on an end card: patent **EP 4 524 526** · **TRL 9** · Ostrovačice, Czech
Republic · `www.sensweight.com` / `www.unifiedcloudsensors.com`.

---

## 7. Footage and stills (§07)

- Real operations: halls, piping, silos, cold storage. **No stock smiles.**
- Grade: slightly desaturate and cool toward blue so the footage sits with `#476DB8`.
- **Text and logo never sit on a photo** — always on a solid panel beside it. This is the rule most
  easily broken by a video editor; for a title over footage, put the type on a solid navy band.
- Illustration means 2 px monoline diagrams, not cartoon characters.

---

## 8. Not covered by the DNA

The DNA is a visual document. It says nothing about **audio** — no sonic logo, no music direction,
no voice-over guidance. If the video needs those, they are a decision to make, not something to
pull from this file.
