module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  // used by base.njk to take the page name out of "Page | Unified Cloud Sensors"
  eleventyConfig.addFilter("split", (str, sep) => String(str).split(sep));

  // JSON string literal (quotes included) for values dropped into JSON-LD —
  // without it Nunjucks HTML-escapes them and "&" ships as "&amp;"
  //
  // < > & are additionally escaped as \uXXXX. They are legal JSON escapes, so
  // the value a parser sees is unchanged, but it means a string can never
  // contain the literal "</script>" and close the surrounding tag early. With
  // plain JSON.stringify, a news item whose summary contained "</script>"
  // would both corrupt the structured data and inject live HTML into the page
  // — reachable by anyone who can publish through /admin/.
  eleventyConfig.addFilter("jsonstr", (v) =>
    JSON.stringify(String(v))
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026"));

  // Site-root-relative path -> the same path in `lang`. English is served at
  // the root (unprefixed), every other language under /<lang>/. Use it for
  // every internal page link; asset paths (/assets/..., /favicon.ico) are the
  // same file for all languages and must NOT be passed through it.
  //
  // Fragments survive: "/sensweight/#roi" in cs -> "/cs/sensweight/#roi".
  eleventyConfig.addFilter("localeUrl", (path, lang) => {
    const p = String(path || "/");
    if (!lang || lang === "en") return p;
    if (!p.startsWith("/")) return p;
    return "/" + lang + p;
  });

  // ── /events/ content (src/_data/news.json) ────────────────────────────────
  //
  // Kept as filters rather than a prepared _data file so news.json stays plain
  // data that the /admin/ publisher can rewrite wholesale without knowing
  // anything about the build.

  // Published items of one type, in reading order: news and promotions newest
  // first, events soonest first. An event whose last day has passed is dropped
  // — at build time, so a stale one survives until the next deploy.
  eleventyConfig.addFilter("newsOfType", (items, type) => {
    const today = new Date().toISOString().slice(0, 10);
    const list = (items || []).filter((i) => i && i.published && i.type === type);
    if (type === "event") {
      return list
        .filter((i) => (i.dateEnd || i.date) >= today)
        .sort((a, b) => String(a.date).localeCompare(String(b.date)));
    }
    return list.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  });

  // The item's text in `lang`, falling back to English per-field, so a item
  // translated only in part still renders rather than showing "undefined".
  eleventyConfig.addFilter("newsText", (item, lang) => {
    const en = (item && item.en) || {};
    const loc = (item && item[lang]) || {};
    return { title: loc.title || en.title || "", summary: loc.summary || en.summary || "" };
  });

  // ISO date -> the language's own long form (1. října 2026 / 1 October 2026).
  // Falls back to the raw ISO string if the date is malformed, rather than
  // rendering "Invalid Date" into the page.
  eleventyConfig.addFilter("newsDate", (iso, lang) => {
    const d = new Date(String(iso) + "T00:00:00Z");
    if (Number.isNaN(d.getTime())) return String(iso || "");
    return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : lang, {
      day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    }).format(d);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
  };
};
