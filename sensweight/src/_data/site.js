// Site-wide config that isn't per-language copy (see translations.js for that).
module.exports = {
  // Canonical origin. sensweight.com still 301s to the legacy en.sensweight.eu
  // site, so nothing here is live yet — every absolute URL (canonical, OG,
  // sitemap, JSON-LD) is built from this one value, so the DNS cutover is a
  // one-line change. `www` matches how unifiedcloudsensors.com had to be set
  // up (Zoner's DNS has no ALIAS/ANAME record, so the apex can only be
  // forwarded, and only `www` is served directly by CloudFront).
  url: "https://www.sensweight.com",

  name: "Unified Cloud Sensors",
  legalName: "Unified Cloud Sensors, s.r.o.",
  description:
    "Remote monitoring systems for industrial weighing — sensors, edge hardware and cloud software delivered as one engineered system.",
  ogImage: "/assets/images/og-default.jpg",

  street: "Ostrovačice",
  country: "CZ",
  vatId: "23272686",
  patent: "EP 4 524 526",
  linkedin: "https://www.linkedin.com/company/unified-cloud-sensors/",

  // Cloudflare Turnstile site key for the dealer-request form — public value,
  // safe to commit (the matching secret key lives only in the Lambda's env
  // var, set via Terraform, never in this repo). Widget created 2026-09-21
  // via the Cloudflare API, scoped to the sensweight.com domain.
  turnstileSiteKey: "0x4AAAAAAE-ojNPnvjut91t_",

  // ── /admin/ news publisher ────────────────────────────────────────────
  // Cognito user-pool app client for the news publisher. Like the Turnstile
  // site key above, the client id is a PUBLIC value: it identifies the app,
  // it does not authorise anything. The pool is a public client with no
  // secret, so there is nothing here to leak.
  //
  // Both values come from the Terraform outputs (sensweight_news_admin_*).
  // While cognitoClientId is empty, /admin/ renders but refuses to sign in
  // and says so, rather than failing silently.
  cognitoRegion: "eu-central-1",
  cognitoClientId: "s7dthrgmdvkn5lu5tgq0hb2v2",
};
