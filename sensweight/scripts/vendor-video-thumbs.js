#!/usr/bin/env node
/**
 * Download the poster image for every video in translations.js, so the
 * click-to-play tiles show a thumbnail without the page contacting Google.
 *
 *   node scripts/vendor-video-thumbs.js
 *
 * Writes src/assets/images/video-thumbs/<id>.jpg, which is committed. Run it
 * after adding or changing a video id in src/_data/translations.js.
 *
 * Why: the player was already click-to-play through youtube-nocookie.com, so
 * nothing loaded until a visitor pressed play — except the poster frames,
 * which came from img.youtube.com on page load and sent every visitor's IP
 * address to Google before they interacted with anything. Serving the posters
 * ourselves closes that, and the pages carrying them (home, quarries,
 * beltscale) now reach no third party at all until someone clicks play.
 *
 * YouTube only generates maxresdefault (1280x720) for videos uploaded at that
 * resolution; for the rest it answers 200 with a 120x90 grey placeholder, so
 * this prefers maxres and falls back to hqdefault (480x360) by checking the
 * size of what came back.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "src/assets/images/video-thumbs");
const en = require(path.join(ROOT, "src/_data/translations.js")).en;

// Every `id` in the translation tree, which is where video ids live.
const ids = new Set();
(function walk(node) {
  if (!node || typeof node !== "object") return;
  for (const [k, v] of Object.entries(node)) {
    if (k === "id" && typeof v === "string" && v && !v.startsWith("YOUR_")) ids.add(v);
    else walk(v);
  }
})(en);

const get = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) return resolve(null);
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });

// A real 1280x720 frame is always well above this; the grey "no maxres" stub
// YouTube substitutes is a couple of kB.
const STUB_LIMIT = 10 * 1024;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  let total = 0;
  for (const id of [...ids].sort()) {
    let used = "maxresdefault";
    let buf = await get(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
    if (!buf || buf.length < STUB_LIMIT) {
      used = "hqdefault";
      buf = await get(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
    }
    if (!buf) {
      console.error(`  ${id}  FAILED - no poster available`);
      process.exitCode = 1;
      continue;
    }
    fs.writeFileSync(path.join(OUT, `${id}.jpg`), buf);
    total += buf.length;
    console.log(`  ${id}.jpg  ${(buf.length / 1024).toFixed(0)} kB  (${used})`);
  }
  console.log(
    `\n${ids.size} posters, ${(total / 1024).toFixed(0)} kB -> ${path.relative(ROOT, OUT)}`
  );
})().catch((e) => {
  console.error("vendor-video-thumbs failed:", e.message);
  process.exit(1);
});
