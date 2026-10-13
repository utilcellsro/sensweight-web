module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  // used by base.njk to take the page name out of "Page | Unified Cloud Sensors"
  eleventyConfig.addFilter("split", (str, sep) => String(str).split(sep));

  // JSON string literal (quotes included) for values dropped into JSON-LD —
  // without it Nunjucks HTML-escapes them and "&" ships as "&amp;"
  eleventyConfig.addFilter("jsonstr", (v) => JSON.stringify(String(v)));
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
