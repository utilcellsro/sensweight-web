#!/usr/bin/env node
/**
 * Download this site's webfonts from Google and generate a local @font-face
 * stylesheet, so no visitor's browser ever contacts Google to render a page.
 *
 *   node scripts/vendor-fonts.js
 *
 * Writes fonts/*.woff2 and fonts.css at the project root, replacing whatever
 * is there. Both are committed — this script exists to change a weight or add
 * a family, not to run at build or deploy time.
 *
 * Paths are deliberately RELATIVE, unlike sensweight.com's copy of this
 * script. index_v6.html has to keep working when a colleague double-clicks it
 * and previews it from the filesystem, where a root-relative /fonts/ path
 * resolves to the drive root. fonts.css lives at the root and refers to
 * fonts/<file>.woff2, and a url() inside a stylesheet resolves against the
 * stylesheet's own location rather than the page's — so the same file serves
 * the English page at / and the generated pages at /cs/ and /pl/ without a
 * second copy. build-i18n.js rewrites the <link href> itself for those two.
 *
 * Why: until 2026-10-14 both pages linked fonts.googleapis.com directly, which
 * sent every visitor's IP address to Google on page load, before they clicked
 * anything. That is the practice a German court awarded damages over
 * (LG München I, 3 O 17493/20, January 2022). Self-hosting removes the
 * transfer, and a render-blocking request to another origin with it.
 *
 * Only the latin and latin-ext subsets are kept: between them they cover
 * English, Czech and Polish, which is every language this site is built in.
 * Google also offers cyrillic, greek, thai and vietnamese for these families;
 * shipping them would roughly double the font payload for nothing.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const FONT_DIR = path.join(ROOT, "fonts");
const CSS_OUT = path.join(ROOT, "fonts.css");

// The exact request index_v6.html and privacy-policy.html used to make. These
// are narrower than sensweight.com's set — this page uses Chakra Petch 600-700
// for headings, IBM Plex Sans 400/600 for body, IBM Plex Mono 400/500 for the
// overlines. Keep it in step with the inline styles in index_v6.html.
const SRC =
  "https://fonts.googleapis.com/css2" +
  "?family=Chakra+Petch:wght@600;700" +
  "&family=IBM+Plex+Sans:wght@400;600" +
  "&family=IBM+Plex+Mono:wght@400;500" +
  "&display=swap";

const KEEP_SUBSETS = new Set(["latin", "latin-ext"]);

// Google serves woff2 only to a browser that advertises support for it; a bare
// Node request gets the ttf fallback stylesheet instead.
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

const fetch = (url, headers = {}) =>
  new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        if (res.statusCode !== 200) {
          return reject(new Error(`${url} -> HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

(async () => {
  const css = (await fetch(SRC, { "User-Agent": UA })).toString("utf8");
  const blocks = [...css.matchAll(/\/\* ([a-z-]+) \*\/\s*@font-face \{([\s\S]*?)\}/g)];
  if (!blocks.length) throw new Error("no @font-face blocks in the response");

  // One record per (family, subset, file). A variable font — IBM Plex Sans is
  // one — returns the SAME url for every weight requested, so grouping by url
  // collapses three identical downloads into one file and one @font-face
  // carrying a weight range. Static families keep a file per weight.
  const faces = new Map();
  for (const [, subset, body] of blocks) {
    if (!KEEP_SUBSETS.has(subset)) continue;
    const family = /font-family: '([^']+)'/.exec(body)[1];
    const weight = Number(/font-weight: (\d+)/.exec(body)[1]);
    const url = /src: url\((https:[^)]+)\)/.exec(body)[1];
    const range = /unicode-range: ([^;]+);/.exec(body)[1];
    const stretch = /font-stretch: ([^;]+);/.exec(body);

    const key = `${family}|${subset}|${url}`;
    const face = faces.get(key) || {
      family,
      subset,
      url,
      range,
      stretch: stretch && stretch[1],
      weights: [],
    };
    face.weights.push(weight);
    faces.set(key, face);
  }

  fs.rmSync(FONT_DIR, { recursive: true, force: true });
  fs.mkdirSync(FONT_DIR, { recursive: true });

  const out = [];
  let total = 0;
  for (const face of faces.values()) {
    const lo = Math.min(...face.weights);
    const hi = Math.max(...face.weights);
    const variable = lo !== hi;
    const file = `${slug(face.family)}-${variable ? "var" : lo}-${face.subset}.woff2`;

    const bytes = await fetch(face.url);
    fs.writeFileSync(path.join(FONT_DIR, file), bytes);
    total += bytes.length;
    console.log(`  ${file}  ${(bytes.length / 1024).toFixed(1)} kB` + (variable ? `  (${lo}-${hi})` : ""));

    out.push(
      [
        `/* ${face.family} ${variable ? `${lo}–${hi} variable` : lo} · ${face.subset} */`,
        "@font-face {",
        `  font-family: '${face.family}';`,
        "  font-style: normal;",
        `  font-weight: ${variable ? `${lo} ${hi}` : lo};`,
        ...(face.stretch ? [`  font-stretch: ${face.stretch};`] : []),
        "  font-display: swap;",
        `  src: url('fonts/${file}') format('woff2');`,
        `  unicode-range: ${face.range};`,
        "}",
      ].join("\n")
    );
  }

  const header = `/* Self-hosted webfonts — GENERATED by scripts/vendor-fonts.js, do not hand-edit.
 *
 * Regenerate with:  node scripts/vendor-fonts.js
 *
 * These were loaded straight from fonts.googleapis.com until 2026-10-14, which
 * sent every visitor's IP address to Google on page load. Serving them
 * ourselves removes that transfer entirely. Only latin and latin-ext are
 * included: together they cover English, Czech and Polish.
 *
 * The url()s are relative on purpose, so index_v6.html still previews from the
 * filesystem and so /cs/ and /pl/ can share this one stylesheet — a url()
 * resolves against the stylesheet, not the page.
 *
 * A family that ships as a variable font (IBM Plex Sans) gets one file per
 * subset and one @font-face with a weight range — Google returns the same file
 * for every weight requested, so splitting it per weight would download the
 * same bytes twice.
 */
`;
  fs.writeFileSync(CSS_OUT, header + "\n" + out.join("\n\n") + "\n");
  console.log(
    `\n${faces.size} @font-face declarations from ${blocks.length} offered, ` +
      `${(total / 1024).toFixed(0)} kB total -> ${path.relative(ROOT, CSS_OUT)}`
  );
})().catch((e) => {
  console.error("vendor-fonts failed:", e.message);
  process.exit(1);
});
