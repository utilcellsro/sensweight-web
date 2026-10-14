// Languages the site is built in. English stays at the root so every URL that
// shipped before the CS/PL rollout (and the sitemap, canonicals and OG tags
// built from them) keeps working; the others are served under a path prefix.
module.exports = ["en", "cs", "pl"];
