#!/usr/bin/env node
/**
 * Generate the Czech and Polish versions of unifiedcloudsensors.com.
 *
 *   node scripts/build-i18n.js [outDir]     default outDir: _i18n
 *   node scripts/build-i18n.js --report     coverage per language
 *   node scripts/build-i18n.js --todo cs    untranslated strings as a JSON stub
 *
 * index_v6.html is the English source and stays an ordinary HTML file a
 * colleague can open straight in a browser — there is no translation markup in
 * it, and this script never writes to it. Each run produces <outDir>/cs/index.html
 * and <outDir>/pl/index.html, which the deploy workflow syncs to /cs/ and /pl/.
 *
 * Besides swapping the strings, each generated page gets:
 *   - <html lang> set to the language
 *   - canonical, og:url and og:locale pointed at the language URL
 *   - rel=alternate hreflang for all three languages plus x-default
 *   - the same links added to the English page (written to <outDir>/index.html)
 *   - relative asset paths (favicon.ico, Jorge.jpg, …) rewritten to root-relative,
 *     since the page now lives one directory down and the assets do not
 *   - a language switcher in the header nav
 */
const fs = require("fs");
const path = require("path");
const { extract, strings } = require("./i18n-lib.js");

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "index_v6.html");
const ORIGIN = "https://www.unifiedcloudsensors.com";
const LANGS = ["en", "cs", "pl"];
const OG_LOCALE = { en: "en_GB", cs: "cs_CZ", pl: "pl_PL" };

const html = fs.readFileSync(SOURCE, "utf8");

// Strings deliberately identical in every language (brands, the patent number,
// people's names). Listed in i18n/keep.txt so coverage reads as complete and
// nobody later mistakes them for an oversight.
const KEEP = new Set(
  fs
    .readFileSync(path.join(ROOT, "i18n", "keep.txt"), "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
);
const dict = Object.fromEntries(
  LANGS.filter((l) => l !== "en").map((l) => [
    l,
    JSON.parse(fs.readFileSync(path.join(ROOT, "i18n", `${l}.json`), "utf8")),
  ])
);

// ---- reporting modes ------------------------------------------------------

const args = process.argv.slice(2);
const all = strings(html).filter((s) => !KEEP.has(s));

if (args[0] === "--report") {
  console.log(`English source: ${all.length} translatable strings (plus ${KEEP.size} kept in English on purpose, see i18n/keep.txt)\n`);
  for (const l of Object.keys(dict)) {
    const done = all.filter((s) => s in dict[l]).length;
    const stale = Object.keys(dict[l]).filter((s) => !all.includes(s));
    console.log(
      `${l.toUpperCase()}  ${done}/${all.length} (${((done / all.length) * 100).toFixed(1)}%)` +
        (stale.length ? `   !! ${stale.length} string(s) no longer in the page` : "")
    );
    stale.forEach((s) => console.log(`     stale: ${s}`));
  }
  process.exit(0);
}

if (args[0] === "--todo") {
  const l = args[1];
  if (!dict[l]) {
    console.error(`unknown language "${l}" (have: ${Object.keys(dict).join(", ")})`);
    process.exit(1);
  }
  const missing = all.filter((s) => !(s in dict[l]));
  console.log(JSON.stringify(Object.fromEntries(missing.map((s) => [s, s])), null, 1));
  process.exit(0);
}

// ---- generation -----------------------------------------------------------

const outDir = args[0] || path.join(ROOT, "_i18n");

/** hreflang block + og:locale, same for every language. */
function alternates() {
  return (
    LANGS.map(
      (l) =>
        `<link rel="alternate" hreflang="${l}" href="${ORIGIN}/${l === "en" ? "" : l + "/"}">`
    ).join("\n") + `\n<link rel="alternate" hreflang="x-default" href="${ORIGIN}/">`
  );
}

/** The language switcher, matching the header's own link styling. */
function switcher(lang) {
  const items = LANGS.map((l) => {
    const href = l === "en" ? "/" : `/${l}/`;
    return l === lang
      ? `<span class="lang-switch-item is-active" aria-current="true">${l.toUpperCase()}</span>`
      : `<a class="lang-switch-item" href="${href}" lang="${l}" hreflang="${l}">${l.toUpperCase()}</a>`;
  }).join("");
  return `<span class="lang-switch" role="group" aria-label="Language">${items}</span>`;
}

const SWITCH_CSS = `
<style>
/* Language switcher — injected by scripts/build-i18n.js, not in the source file. */
.lang-switch{display:inline-flex;align-items:center;gap:2px;margin-left:18px;vertical-align:middle}
.lang-switch-item{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.08em;
  padding:3px 6px;border-radius:3px;text-decoration:none;color:#BAC4D5}
.lang-switch-item:hover{color:#1D2C49;background:#7ED3F0}
.lang-switch-item.is-active{color:#1D2C49;background:#DCE5F4;font-weight:600}
</style>`;

/** Apply a replacement to the markup only, leaving <script> bodies untouched. */
function replaceOutsideScripts(html, re, fn) {
  const parts = html.split(/(<script[\s\S]*?<\/script>)/i);
  return parts
    .map((part, i) => (i % 2 === 1 ? part : part.replace(re, fn)))
    .join("");
}

/** Rewrite the document for one language. */
function render(lang) {
  const table = dict[lang] || {};
  const spans = extract(html);

  // Apply string replacements back-to-front so earlier offsets stay valid.
  let out = html;
  for (let i = spans.length - 1; i >= 0; i--) {
    const s = spans[i];
    const to = table[s.text];
    if (!to || to === s.text) continue;
    out = out.slice(0, s.start) + to + out.slice(s.end);
  }

  // Strings the walker deliberately skips because they live inside <script>:
  // the Updates carousel's titles (UPDATES_DATA) and the form's success
  // message, which JS writes over the HTML copy on submit. Only strings of 25+
  // characters are matched, so a short dictionary key that happens to equal a
  // selector or property name ("Company", "Close") can never be swapped into
  // code. Everything matched must still be an exact dictionary key.
  out = out.replace(/"([^"\\\n]{25,})"/g, (m, text) => {
    const to = table[text];
    return to && to !== text ? JSON.stringify(to) : m;
  });

  if (lang !== "en") {
    out = out.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);

    // The page moves one directory down; its assets do not, so every relative
    // src/href has to become root-relative. Skipped: anything already
    // absolute, protocol-relative, a fragment, or carrying any URI scheme —
    // an explicit mailto:/tel:/data: list missed javascript:void(0) and turned
    // the header's Get in Touch link into /javascript:void(0).
    //
    // Markup only. Inside <script> an href= lives in a string being assembled
    // ("href=\"' + item.url + '\""), and prefixing that turns the carousel's
    // absolute LinkedIn and YouTube links into broken relative ones. The one
    // script-local path that does need fixing is handled explicitly below.
    out = replaceOutsideScripts(
      out,
      /\b(src|href)="(?![a-z][a-z0-9+.-]*:|\/\/|\/|#)([^"]+)"/gi,
      (m, attr, url) => `${attr}="/${url}"`
    );

    // The JSON-LD block, which the string walker deliberately skips.
    out = out.replace(/"(og-image\.jpg|apple-touch-icon\.png|favicon[^"]*)"/g, '"/$1"');

    // The carousel's image paths, which are JS string literals.
    out = out.replace(/\bimage:\s*"(?!\/)([^"]+)"/g, 'image: "/$1"');
  }

  // Canonical + og:url point at this language's URL.
  const self = `${ORIGIN}/${lang === "en" ? "" : lang + "/"}`;
  out = out
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${self}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${self}">`);

  // hreflang set + og:locale, inserted after the canonical tag.
  out = out.replace(
    /(<link rel="canonical"[^>]*>)/,
    `$1\n${alternates()}\n<meta property="og:locale" content="${OG_LOCALE[lang]}">`
  );

  // Switcher goes at the end of the nav bar's link group. The header is a
  // <div class="nav-bar"> holding a logo div and a links div — there is no
  // <nav> element and no CTA class to hang it on — so anchor on the nav-bar
  // itself and inject before the links div closes. Nothing here depends on the
  // link text, which has already been translated by this point.
  const navBar = /(<div class="nav-bar[\s\S]*?)(<\/div>\s*<\/div>)/;
  if (!navBar.test(out)) {
    // Loudly, rather than quietly shipping three pages with no way to switch
    // language — which is exactly what an earlier silent fallback did.
    throw new Error(
      "build-i18n: could not find the nav bar to place the language switcher in. " +
        "The header markup in index_v6.html changed; update the navBar pattern in this script."
    );
  }
  out = out.replace(navBar, `$1${switcher(lang)}\n    $2`);
  out = out.replace("</head>", `${SWITCH_CSS}\n</head>`);

  return out;
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const lang of LANGS) {
  const dir = lang === "en" ? outDir : path.join(outDir, lang);
  fs.mkdirSync(dir, { recursive: true });
  const page = render(lang);
  fs.writeFileSync(path.join(dir, "index.html"), page);
  const done = lang === "en" ? all.length : all.filter((s) => s in dict[lang]).length;
  console.log(
    `${lang}  ->  ${path.relative(ROOT, path.join(dir, "index.html"))}` +
      `   ${done}/${all.length} strings` +
      (done < all.length ? `  (${all.length - done} still English)` : "")
  );
}
