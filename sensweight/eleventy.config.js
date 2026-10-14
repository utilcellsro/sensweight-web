module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  // used by base.njk to take the page name out of "Page | Unified Cloud Sensors"
  eleventyConfig.addFilter("split", (str, sep) => String(str).split(sep));

  // JSON string literal (quotes included) for values dropped into JSON-LD —
  // without it Nunjucks HTML-escapes them and "&" ships as "&amp;"
  eleventyConfig.addFilter("jsonstr", (v) => JSON.stringify(String(v)));

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
