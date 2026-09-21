// Site-wide config that isn't per-language copy (see translations.js for that).
module.exports = {
  // Cloudflare Turnstile site key for the dealer-request form — public value,
  // safe to commit (the matching secret key lives only in the Lambda's env
  // var, set via Terraform, never in this repo). Widget created 2026-09-21
  // via the Cloudflare API, scoped to the sensweight.com domain.
  turnstileSiteKey: "0x4AAAAAAE-ojNPnvjut91t_",
};
