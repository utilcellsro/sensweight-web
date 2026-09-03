# unifiedcloudsensors.com — Design Tickets (v3 redesign, started 2026-09-03)

Boss's feedback on the v2 canvas (relayed via user, 2026-09-03): move away from the
heavy navy-panel/glow treatment toward something closer to procimo.com — minimal,
restrained, dark-but-photographic rather than dark-and-glowing. Confirmed with user:
procimo.com is itself dark-themed (near-black body, white footer), not light — so the
fix is "more restrained/minimal," not "go light." See CLAUDE.md for the full brief.

Canvas: https://claude.ai/code/artifact/d31afa1b-4220-4994-ae8e-826faf2203e7

## Ticket 1 — Visual system overhaul — SHIPPED 2026-09-03
- Swapped the navy/glow/glass-panel treatment for a near-black ground (`#0C0D10`,
  procimo-style) — removed the ambient radial glows and the blurred glass team cards
  in favor of flat bordered cards.
- Footer flipped to a light break (`#F7F7F6`/Ink/Muted, sensweight's own existing
  light tokens — not invented) echoing procimo's dark-body/white-footer structure.
- Swapped the display font from Chakra Petch (reads technical/industrial) to
  Bricolage Grotesque — kept IBM Plex Sans body and IBM Plex Mono overlines/labels.
- Copy pass toward "truth/proof" framing: new hero H1 ("We turn industrial guesswork
  into proof."), rewrote the pull-quote (previously read as internal design-system
  notes leaking into customer copy, not real messaging), light touch-up on the Story
  paragraph.
- Patent stat block resized to fit "EP 4 524 526" on one line (64px → 42px, all
  three stat values matched for consistency).
- TRL 9 de-acronymed: big display value now reads "Field-Proven," with "Technology
  Readiness Level 9" spelled out in the caption underneath instead of a bare acronym.
- **Not done this ticket, flagged instead of faked**: background photography. The
  only real UCS photos on hand (`references/video-carousel/brand-style-reference/`)
  are LinkedIn marketing graphics with logos/cloud-icon overlays and bilingual text
  baked in — not clean enough for a full-bleed minimal hero like procimo's. Rather
  than fabricate stock-style imagery, this stayed photography-free. If real, clean
  site/facility/product photography turns up (the way Jorge's and Nikola's headshots
  did), revisit adding it — likely to the hero or as a section break.

## Ticket 2 — Cost value prop (~0.5% of asset cost) — SHIPPED 2026-09-03
Added a dedicated highlight bar ("Cost of Certainty") right after the patent/TRL/
deployment stat row, before Values: a large "~0.5%" in Sky (the accent-on-dark
color, per DNA) next to one line of copy — "That's roughly what a fully installed
UCS monitoring system costs, measured against the value of the equipment it
protects — the price of certainty, not a guess." Kept as one honest proof stat, not
a calculator (content-scope still excludes ROI tooling). Used "roughly"/"~" language
since the user gave 0.5% as an illustrative figure, not a guaranteed universal rate —
**flag: worded as approximate on purpose; confirm the number itself is one the
company is comfortable stating publicly before this goes to the boss.**

## Ticket 3 — Solutions cards linking to sensweight.com — SHIPPED 2026-09-03
Added a new "03 — Solutions" section (between Values and Team; sections renumbered
01-06 accordingly: Story, Values, Solutions, Leadership, Updates, Careers), plus a
"Solutions" nav/footer link. Went with cards, not a carousel — reasoning: only a
handful of items, simultaneous scannability beats a carousel at that count; a
carousel is the better fit for Updates (Ticket 4), which is chronological and
naturally many-item.

Mirrored sensweight.com's OWN current homepage curation exactly, verified against
`sensweight/src/_data/translations.js` and `_includes/_content/home.njk` rather than
assumed — sensweight's homepage grid was already trimmed 2026-09-01 to 4 cards
(SensWEIGHT, SensGEO, SensATMO, + a "Custom, Built to Your Site" card), dropping
SensSILO/SensGREEN from the *homepage* (their own pages still exist, just not
featured there). Matched that same 4-card set here rather than the full 5-product
catalog, so this stays a routing/teaser section, not duplicated depth — each card
links straight to the real page: sensweight.com/sensweight/, /sensgeo/, /sensatmo/,
and /how-to-buy/ for the custom card. Also linked the section header out to
sensweight.com/solutions/ for the full list.

Note: this is a deliberate scope change from the earlier "no per-industry content,
sensweight-only" content-scope call — flagging it explicitly per that decision's own
instructions, since it's new: unifiedcloudsensors.com now routes to sensweight, it
doesn't duplicate its depth.

## Ticket 4 — Updates section → carousel — SHIPPED 2026-09-03
Replaced the static stacked-row Updates list with a one-item-at-a-time carousel:
prev/next arrows plus dot indicators, cycling through all 6 real updates (the 3
dated LinkedIn posts and 3 undated taglines from Ticket-list-era content are all
still there, nothing dropped). Built as a real interactive component (state-driven,
not a CSS-only auto-play) since the canvas editor supports it — marked
`is_interactive: true` on the artboard.

---
All 4 tickets shipped 2026-09-03. Then a round of direct pushback from the user
(relaying the boss's reaction to v3): not minimal enough, wants real background
photos, the Solutions section didn't land ("you forget about solutions" — meant the
style, not that it was missing) and should look like procimo's "Featured Projects"
— large photo tiles, 4-5 items, redirecting to sensweight.com — and the whole draft
"looks now like AI generated." Addressed in one pass, v4, same day:

- **Hero background**: added an abstract topographic line-art SVG layer (matches
  what procimo's own hero actually does — it's not a photo there either, just
  animated flowing line art on near-black). Resolves the "needs a background photo"
  ask for the hero specifically without fabricating a fake industrial photo.
- **Stat wall**: dropped the vertical rule-line dividers and the separate
  bordered/tinted "Cost of Certainty" bar from Ticket 2 — folded into one plain
  4-column grid (Patent / Readiness / Deployment / Cost of Certainty), no boxes,
  closer to procimo's naked stat numbers.
- **Values**: replaced the 4-icon feature-card grid with a plain numbered
  typographic list (01-04, thin top rule, no icons, no boxes) — the icon-grid was
  flagged as a stock "AI-generated feature section" pattern; removing it directly
  addresses the "looks AI generated" note.
- **Solutions — rebuilt as "Featured Projects"**: now 5 real solutions (added
  SensSILO and SensGREEN back, dropped the "Custom" text-card style), each a large
  4:3 tile linking straight to its real sensweight.com page. Each tile carries an
  abstract per-solution engineering-schematic graphic (in that solution's own real
  DNA accent color, matching sensweight's own `solutions-index.njk` icon-color
  convention) with a bottom name/description overlay — procimo's large-photo-tile
  structure, honestly built as a graphic mark rather than a fake photo (see the
  photography note below for why).
- **Team**: removed the bordered/rounded card treatment — photos are now flush,
  square-cornered, borderless tiles with plain text below, matching procimo's team
  grid exactly. Kept the "more profiles" slot as a dashed placeholder.

**Photography — resolved for now with licensed stock, 2026-09-03 (v5):** the user
pushed back a second time ("I need background photos, let's find something together
... too structural ... I need life"), so rather than keep waiting on real UCS
photography that doesn't exist yet in usable form, sourced 5 free-to-use Unsplash
photos (Unsplash License — free for commercial use, no attribution required) as
honest generic stand-ins, one per solution: a moody night truck/bridge shot for
SensWEIGHT, grain silos for SensSILO, an excavator for SensGEO, an industrial
skyline with smokestacks for SensATMO, and a green-roofed building for SensGREEN.
None claim to depict a real UCS installation — that distinction matters, since they
sit right next to copy making truth/proof claims. Toned all 5 through a Python/
Pillow pass (`unifiedcloudsensors/` scratch script, not checked in) — grayscale,
duotone toward the site's near-black/blue-pale palette, darkened — so they read as
part of this system, not raw stock photos. Wired into the 5 Solutions tiles
(replacing the abstract schematic placeholders) and, once more, as a full-bleed
background behind the Careers section (previously flat text-only, sensatmo.jpg
reused there — flagged as a repeat, swap if the user wants a distinct 6th image for
that spot). Hero kept its abstract line-art background from v4, not a photo,
matching what procimo's own hero actually does.

**Still open:** if/when real UCS site, product, or installation photography turns
up (the same way Jorge's and Nikola's headshots were sourced), swap it in for these
stock stand-ins — the licensed photos are a real improvement over the placeholder
graphics but are still generic, not UCS's own.

**2026-09-03, v6 — quick follow-up:** dropped SensSILO and SensGREEN from the
Solutions section per the user's direct ask (back to SensWEIGHT, SensGEO, SensATMO
+ the Custom "Built to Your Site" tile — 4 tiles, switched the grid from 3 to 2
columns so they land as a clean 2x2, larger tiles too, closer to procimo's actual
proportions). That freed up the silo and green-roof photos, since the user also
asked for a hero background photo — used the now-unused silo shot there (full-bleed,
same dark scrim treatment as the other photo sections) in place of the abstract
line-art background from v4. Green-roof photo is now unused entirely, dropped from
the canvas; still sitting in `photos/sensgreen.jpg` in the scratch working files if
wanted again later.

**2026-09-03, v7 — carousel made to actually auto-play:** the Updates carousel
(Ticket 4) was click-only — user asked for it to be "live live," not static.
Added a 5s auto-advance timer (`componentDidMount`/`setInterval` in the artboard's
component logic), pauses on mouse hover so it doesn't yank the item away mid-read,
and resumes on mouse-leave; manual prev/next/dot clicks restart the 5s timer from
that point rather than fighting the auto-advance.

**2026-09-03 — zipped for review:** regenerated the static, no-editor-chrome
snapshot at `references/unifiedcloudsensors-design-draft/index.html` (same
convention as v1/v2 — plain rendered HTML, `<style>` moved to `<head>`, DC-only
wrapper tags/script stripped) against the current canvas state, added the 4 toned
photo files it now references (sensweight/senssilo/sensgeo/sensatmo — sensgreen not
included since it's unused), and zipped the whole folder as
`references/ucs-web_v3.zip` (v1 = sent 2026-09-01, v2 = named but not sent
2026-09-02). The Updates carousel is frozen on its first item in this static
export (auto-advance needs the live canvas's JS runtime) — buttons/dots render but
don't do anything, same as the mailto/external links already being the only real
functional bits. Not sent anywhere yet — that's the user's call.

**2026-09-03, v8 — nav trimmed:** header had grown to 8 links (About, Values,
Solutions, Team, Updates, Careers, Contact, Products→) — user called it out as too
busy for "really minimalistic." Cut to 3 (About, Solutions, Team) plus a hamburger
icon on the right, matching procimo's own nav exactly (logo, 3 links, hamburger).
Everything dropped is still reachable — all sections are anchors on this one page
(scroll gets you there) and every link still lives in the footer's Company column.
The hamburger is visual-only for now (a static icon, not a wired-up dropdown) —
matches the rest of this draft, where only the Updates carousel has real behind-
the-scenes logic; a real open/close menu is a real-code concern for whenever this
becomes an actual Eleventy build, not this canvas.

**2026-09-03, v9 — section order + a light variant:**
- **Solutions now comes before Story** (was Story → Values → Solutions; now
  Solutions → Story → Values), per the user's direct ask — sections renumbered
  01-06 accordingly. Nav and footer link order updated to match (Solutions first).
- **Added a light variant as a second artboard** (`MainLight.dc.html`) on the same
  canvas, side by side with the dark one — same content and structure, not a
  separate draft. Light reuses sensweight.com's own existing light tokens (Bg
  #F7F7F6, Ink #2F2F2E, Muted #6F6F6E, Border #ECECEB) rather than inventing new
  ones. Deliberate choice: the Hero, Solutions tiles, and Careers section stay dark
  photographic panels in BOTH variants — those sections work as contrast moments
  against a light page, not just a dark one, and the toned photos were built for a
  dark treatment; forcing them lighter would have fought their own toning. Every
  other section (nav, stat wall, values, team, updates carousel, footer) is fully
  light-themed, including the accent flip from Sky (the DNA's accent-on-dark) to
  Blue (accent-on-light) for links/labels/dots. The "Custom" Solutions tile has no
  photo of its own, so it's the one tile that actually changes appearance between
  variants (transparent-on-dark vs. white-card-on-light).
- **Cost-of-certainty number** (flagged under original Ticket 2, still open):
  confirm the ~0.5% figure is one the company wants stated publicly before this
  goes to the boss.

**2026-09-03 — zipped again (v4):** regenerated `references/unifiedcloudsensors-
design-draft/index.html` (dark, reordered) and added `light.html` alongside it
(same folder, same convention — static, no editor chrome) for the new light
variant. Zipped as `references/ucs-web_v4.zip` (v1 = 2026-09-01, v2 = named but
not sent 2026-09-02, v3 = 2026-09-03 after the procimo-minimal pass, v4 = this
one). Both HTML files share the same image set already in that folder — no new
assets needed. Not sent anywhere yet.
