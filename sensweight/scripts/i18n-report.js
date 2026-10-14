#!/usr/bin/env node
/**
 * Translation coverage for sensweight.com.
 *
 *   node scripts/i18n-report.js            summary per language
 *   node scripts/i18n-report.js cs         keys still missing in Czech
 *   node scripts/i18n-report.js cs --todo  the same, as flat JSON to fill in
 *
 * English is the source of truth; a language "covers" a key when i18n/<lang>.json
 * has an entry for it. Keys belonging to pages that no longer exist are
 * excluded, so coverage reflects the live site rather than dead data.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const en = require(path.join(ROOT, "src/_data/translations.js")).en;

// Copy for solutions deleted in the 2026-09-25 trim to three solutions. The
// data is still in translations.js but nothing renders it, so translating it
// would be wasted work.
const DEAD = ["sensgeo.", "sensatmo.", "sensgreen."];

// Individual keys that are deferred rather than whole sections. The SKU rows
// came off the Products page in the same 2026-09-25 trim (the data stays in
// translations.js for the per-product listings to be added later), so nothing
// renders them today.
const DEFERRED_KEYS = [
  { re: /^products_page\.categories\[\d+\]\.skus\[/, why: "SKU rows are not rendered (removed 2026-09-25)" },
];

// Whole sections not worth a translator's time right now, tracked separately
// so the headline number is not quietly dragged down by copy nobody can reach.
const DEFERRED = {
  roi: "ROI calculator — commented out sitewide since 2026-09-01",
  demos: "demo pages — every link to them is hidden sitewide since 2026-10-12",
  demo_hub: "demo pages — links hidden sitewide",
  demo_cta: "demo pages — links hidden sitewide",
};

function flatten(node, prefix, out) {
  if (typeof node === "string") {
    out[prefix] = node;
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
  } else if (node && typeof node === "object") {
    for (const k of Object.keys(node)) {
      flatten(node[k], prefix ? `${prefix}.${k}` : k, out);
    }
  }
  return out;
}

const flat = flatten(en, "", {});
const group = (k) => k.split(/[.[]/)[0];
const deferredKey = (k) => DEFERRED_KEYS.some((d) => d.re.test(k));
// meta.<route>.title/.description deliberately have no English counterpart —
// English page metadata lives in each page template's front matter.
const isMeta = (k) => /^meta\.\//.test(k);

const live = Object.keys(flat).filter((k) => !DEAD.some((d) => k.startsWith(d)));
const active = live.filter((k) => !(group(k) in DEFERRED) && !deferredKey(k));

const langs = require(path.join(ROOT, "src/_data/langs.js")).filter((l) => l !== "en");
const loaded = Object.fromEntries(
  langs.map((l) => [l, JSON.parse(fs.readFileSync(path.join(ROOT, "i18n", `${l}.json`), "utf8"))])
);

// The English each translation was written from, recorded by i18n-merge.js.
// Keys here are dot-paths, so a reworded English string leaves its old
// translation in place and still counts as covered — comparing against the
// lock is the only way to catch that drift.
const locks = Object.fromEntries(
  langs.map((l) => {
    const f = path.join(ROOT, "i18n", `${l}.lock.json`);
    return [l, fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : {}];
  })
);
const drifted = (l) =>
  Object.keys(loaded[l]).filter(
    (k) => k in flat && k in locks[l] && locks[l][k] !== flat[k]
  );

// Page metadata is not part of `en`: English titles/descriptions live in each
// page template's front matter, so coverage is measured against the routes the
// build actually produces.
const routes = fs
  .readdirSync(path.join(ROOT, "src"), { recursive: true })
  .filter((f) => String(f).endsWith(".njk"))
  .map((f) => fs.readFileSync(path.join(ROOT, "src", String(f)), "utf8"))
  .map((src) => /^route: "(.*)"$/m.exec(src))
  .filter(Boolean)
  .map((m) => m[1]);

const wanted = process.argv[2];
const flagTodo = process.argv.includes("--todo");

if (!wanted) {
  const pct = (a, b) => (b === 0 ? "100" : ((a / b) * 100).toFixed(1));
  console.log(
    `English source: ${Object.keys(flat).length} strings ` +
      `(${live.length} live, ${active.length} excluding deferred)\n`
  );
  for (const l of langs) {
    const have = Object.keys(loaded[l]);
    const done = active.filter((k) => k in loaded[l]).length;
    const stale = have.filter((k) => !(k in flat) && !isMeta(k));
    const drift = drifted(l);
    console.log(
      `${l.toUpperCase()}  ${done}/${active.length} active (${pct(done, active.length)}%)` +
        `   ${live.filter((k) => k in loaded[l]).length}/${live.length} of all live copy` +
        (stale.length ? `   !! ${stale.length} key(s) not in English` : "") +
        (drift.length ? `   !! ${drift.length} translated from English that has since changed` : "")
    );
    drift.forEach((k) => console.log(`       stale: ${k}`));
  }
  console.log("\nPage metadata (title + description per route, English in front matter):");
  for (const l of langs) {
    const done = routes.filter((r) => `meta.${r}.title` in loaded[l]).length;
    console.log(`  ${l.toUpperCase()}  ${done}/${routes.length} routes`);
  }
  console.log("\nDeferred (excluded from the active count):");
  for (const d of DEFERRED_KEYS) {
    const n = live.filter((k) => d.re.test(k)).length;
    if (n) console.log(`  ${String(n).padStart(3)} products_page …skus — ${d.why}`);
  }
  for (const [k, why] of Object.entries(DEFERRED)) {
    const n = live.filter((x) => group(x) === k).length;
    if (n) console.log(`  ${String(n).padStart(3)} ${k} — ${why}`);
  }
  const dead = Object.keys(flat).length - live.length;
  if (dead) console.log(`  ${String(dead).padStart(3)} sensgeo/sensatmo/sensgreen — pages deleted 2026-09-25`);
  process.exit(0);
}

if (!langs.includes(wanted)) {
  console.error(`unknown language "${wanted}" (have: ${langs.join(", ")})`);
  process.exit(1);
}

const missing = active.filter((k) => !(k in loaded[wanted]));
if (flagTodo) {
  console.log(JSON.stringify(Object.fromEntries(missing.map((k) => [k, flat[k]])), null, 1));
  process.exit(0);
}

const stale = Object.keys(loaded[wanted]).filter((k) => !(k in flat) && !isMeta(k));
if (stale.length) {
  console.log(`!! ${stale.length} key(s) in i18n/${wanted}.json have no English counterpart:`);
  stale.forEach((k) => console.log(`   ${k}`));
  console.log("");
}
const drift = drifted(wanted);
if (drift.length) {
  console.log(
    `!! ${drift.length} key(s) were translated from English that has since changed —\n` +
      `   the translation is still in place and still counts as covered, but it\n` +
      `   now describes the old wording. Retranslate these:\n`
  );
  for (const k of drift) {
    console.log(`   ${k}`);
    console.log(`     was: ${locks[wanted][k]}`);
    console.log(`     now: ${flat[k]}`);
    console.log(`      ${wanted}: ${loaded[wanted][k]}\n`);
  }
}
console.log(`${missing.length} active key(s) missing in ${wanted.toUpperCase()}:\n`);
let last = null;
for (const k of missing) {
  if (group(k) !== last) {
    last = group(k);
    console.log(`-- ${last}`);
  }
  console.log(`   ${k}\n     EN: ${flat[k]}`);
}
