#!/usr/bin/env node
/**
 * Merge a batch of translations into i18n/<lang>.json.
 *
 *   node scripts/i18n-merge.js cs batch.json
 *
 * Refuses the whole batch if any key has no English counterpart (a typo in a
 * dot-path would otherwise sit in the file forever, silently translating
 * nothing). Output is sorted into English key order so the file stays
 * diffable and reviewable section by section.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const [lang, batchPath] = process.argv.slice(2);
if (!lang || !batchPath) {
  console.error("usage: node scripts/i18n-merge.js <lang> <batch.json>");
  process.exit(1);
}

const en = require(path.join(ROOT, "src/_data/translations.js")).en;

function flatten(node, prefix, out) {
  if (typeof node === "string") out[prefix] = node;
  else if (Array.isArray(node)) node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
  else if (node && typeof node === "object") {
    for (const k of Object.keys(node)) flatten(node[k], prefix ? `${prefix}.${k}` : k, out);
  }
  return out;
}

const enFlat = flatten(en, "", {});
const order = Object.keys(enFlat);

const target = path.join(ROOT, "i18n", `${lang}.json`);
const current = JSON.parse(fs.readFileSync(target, "utf8"));
const batch = JSON.parse(fs.readFileSync(batchPath, "utf8"));

// meta.<route>.title / .description have no English counterpart by design:
// English page metadata lives in each page template's front matter, and this
// block exists only to override it per language. Everything else must match a
// real English key.
const META = /^meta\.\/[^.]*\.(title|description)$/;
const unknown = Object.keys(batch).filter((k) => !(k in enFlat) && !META.test(k));
if (unknown.length) {
  console.error(`refusing batch — ${unknown.length} key(s) have no English counterpart:`);
  unknown.forEach((k) => console.error(`  ${k}`));
  process.exit(1);
}

const overwritten = Object.keys(batch).filter((k) => k in current && current[k] !== batch[k]);
const merged = { ...current, ...batch };
// English key order first, then the meta.* block (which has no English
// counterpart to order against) sorted by route, so the file stays stable.
const sorted = {};
for (const k of order) if (k in merged) sorted[k] = merged[k];
for (const k of Object.keys(merged).filter((k) => !(k in enFlat)).sort()) {
  sorted[k] = merged[k];
}

fs.writeFileSync(target, JSON.stringify(sorted, null, 1) + "\n");

// Record the English each translated key was written from. The translation
// files are keyed by dot-path, so when English is reworded the old translation
// silently stays in place and still counts as covered — this lock is what lets
// i18n-report.js call it stale instead.
const lockPath = path.join(ROOT, "i18n", `${lang}.lock.json`);
const lock = fs.existsSync(lockPath) ? JSON.parse(fs.readFileSync(lockPath, "utf8")) : {};
for (const k of Object.keys(batch)) {
  if (k in enFlat) lock[k] = enFlat[k];
}
const lockSorted = {};
for (const k of order) if (k in lock) lockSorted[k] = lock[k];
fs.writeFileSync(lockPath, JSON.stringify(lockSorted, null, 1) + "\n");
console.log(
  `${lang}: +${Object.keys(batch).filter((k) => !(k in current)).length} new, ` +
    `${overwritten.length} changed, ${Object.keys(sorted).length} total`
);
if (overwritten.length) overwritten.forEach((k) => console.log(`  changed: ${k}`));
