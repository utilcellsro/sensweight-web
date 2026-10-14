# Translations for unifiedcloudsensors.com

The site is published in three languages:

| Language | URL | Source |
|---|---|---|
| English | `https://www.unifiedcloudsensors.com/` | `../index_v6.html` |
| Czech | `https://www.unifiedcloudsensors.com/cs/` | generated |
| Polish | `https://www.unifiedcloudsensors.com/pl/` | generated |

**`index_v6.html` is the only file anyone edits.** It stays an ordinary HTML
file you can double-click and preview in a browser — there is no translation
markup in it and nothing to install. The Czech and Polish pages are generated
from it at deploy time by `../scripts/build-i18n.js`.

## Editing copy

Change the English in `index_v6.html` as usual. Then:

```
node scripts/build-i18n.js --report     # how much of each language is translated
node scripts/build-i18n.js --todo cs    # the untranslated strings, as a JSON stub
```

`--todo` prints a ready-to-paste block where each key is the English text and
each value is a copy of it; replace the values with the translation and merge
them into `cs.json` / `pl.json`.

Strings are keyed by their exact English text. So when you **reword** English,
its old key stops matching — `--report` flags the orphan as stale, and the new
wording shows up as missing. Fix both together.

## Files

- `cs.json`, `pl.json` — `"English text": "translation"`.
- `keep.txt` — strings that stay English in every language (brand names, the
  patent number, people's names, CEO/COO/CTO). Listed so coverage reports 100%
  and nobody "fixes" them later.

## What the generator does beyond swapping strings

- `<html lang>`, `og:locale`, canonical and `og:url` per language.
- `rel=alternate hreflang` for all three languages plus `x-default`, on every
  page including the English one.
- A language switcher in the header nav.
- Rewrites relative asset paths to root-relative in the `/cs/` and `/pl/`
  pages, since those live one directory down and the images do not. The
  English page keeps relative paths, so it still previews from the folder.
- Translates the handful of strings that live inside `<script>`: the Updates
  carousel titles and the form's success message. Only quoted strings of 25+
  characters are considered, so a short key can never be swapped into code.

It throws rather than producing a page quietly missing the switcher, and the
deploy workflow runs it, so a broken translation setup fails the deploy instead
of silently publishing English.

## Caveat

The Czech and Polish text here was translated by Claude and **has not been
reviewed by a native speaker**, same as the non-English copy in the product
decks. Worth a pass from Radek or Nikola before it is treated as final.

`privacy-policy.html` is deliberately English-only — it is legal text that has
not had a legal review, so there is no machine-translated version of it.
