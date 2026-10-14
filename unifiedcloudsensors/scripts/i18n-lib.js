/**
 * Shared parsing for the unifiedcloudsensors.com translation tooling.
 *
 * The site is one hand-edited HTML file. A colleague opens index_v6.html
 * straight in a browser to preview it, so the file must stay plain HTML with
 * no translation markup in it at all. Strings are therefore keyed by their own
 * English text, and located by walking the markup here rather than by any
 * attribute an editor would have to remember to add.
 *
 * Only two kinds of string are touched: text between tags, and the values of
 * the attributes listed in ATTRS. Everything inside <script>, <style> and
 * comments is left alone.
 */

// Attributes whose value is shown to or read by a person.
const ATTRS = [
  "alt",
  "placeholder",
  "aria-label",
  "title",
  "content", // meta description / og: / twitter: — filtered by name below
];

// <meta> whose content is prose rather than configuration.
const META_PROSE = /^(description|og:title|og:description|twitter:title|twitter:description)$/;

// Regions the walker must not touch.
const SKIP_BLOCK = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>|<!--[\s\S]*?-->/gi;

/** Replace skipped regions with same-length filler so offsets stay valid. */
function maskSkipped(html) {
  return html.replace(SKIP_BLOCK, (m) => "\u0000".repeat(m.length));
}

/** A string worth translating: has a letter, and is not a bare number/symbol. */
function translatable(s) {
  const t = s.trim();
  if (t.length < 2) return false;
  if (!/[A-Za-zÀ-ɏ]/.test(t)) return false;
  if (/^[\d\s.,%+-]+$/.test(t)) return false;
  return true;
}

/**
 * Every translatable string in the document, in order, each with the exact
 * source span it occupies so a caller can rewrite it.
 *   { text, start, end, kind: "text" | "attr", attr?, metaName? }
 */
function extract(html) {
  const masked = maskSkipped(html);
  const found = [];

  // Text nodes: everything between a '>' and the next '<'.
  const textRe = />([^<>]+)</g;
  let m;
  while ((m = textRe.exec(masked)) !== null) {
    const raw = m[1];
    if (raw.includes("\u0000") || !translatable(raw)) continue;
    const lead = raw.length - raw.trimStart().length;
    const text = raw.trim();
    const start = m.index + 1 + lead;
    found.push({ text, start, end: start + text.length, kind: "text" });
    textRe.lastIndex = m.index + 1; // allow adjacent matches
  }

  // Attribute values.
  for (const attr of ATTRS) {
    const re = new RegExp(`\\b${attr}="([^"]*)"`, "g");
    let a;
    while ((a = re.exec(masked)) !== null) {
      const value = a[1];
      if (value.includes("\u0000") || !translatable(value)) continue;

      let metaName;
      if (attr === "content") {
        // Only translate <meta> content when it is prose. Find the tag start.
        const tagStart = masked.lastIndexOf("<", a.index);
        const tag = masked.slice(tagStart, a.index + a[0].length + 40);
        const nm = /\b(?:name|property)="([^"]+)"/.exec(tag);
        metaName = nm && nm[1];
        if (!metaName || !META_PROSE.test(metaName)) continue;
      }

      const start = a.index + a[0].indexOf('"') + 1;
      found.push({ text: value, start, end: start + value.length, kind: "attr", attr, metaName });
    }
  }

  found.sort((x, y) => x.start - y.start);
  return found;
}

/**
 * Prose inside inline <script> blocks: the Updates carousel's titles and the
 * form's success message, which JS writes over the HTML copy on submit. Only
 * double-quoted literals of 25+ characters count, which is the same threshold
 * the generator applies, so a short string that happens to be a selector or a
 * property name is never treated as copy.
 */
function scriptStrings(html) {
  const out = [];
  const blocks = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let b;
  while ((b = blocks.exec(html)) !== null) {
    const body = b[1].replace(/\/\/[^\n]*/g, ""); // drop line comments
    for (const m of body.matchAll(/"([^"\\\n]{25,})"/g)) {
      const t = m[1];
      if (!/[A-Za-zÀ-ɏ]/.test(t)) continue;
      if (!/\s/.test(t)) continue; // a single long token is not a sentence
      if (/[{};]|^\s*[.#]|:\s*\d|px\b|font-family|style/i.test(t)) continue; // CSS / code
      out.push(t);
    }
  }
  return out;
}

/** Distinct English strings, in document order, markup and inline script. */
function strings(html) {
  const seen = new Set();
  const out = [];
  for (const text of [...extract(html).map((f) => f.text), ...scriptStrings(html)]) {
    if (seen.has(text)) continue;
    seen.add(text);
    out.push(text);
  }
  return out;
}

module.exports = { extract, strings, scriptStrings, ATTRS, META_PROSE };
