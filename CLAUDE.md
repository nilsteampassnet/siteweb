# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

The marketing/product website for **Teampass** (teampass.net) — an open-source
self-hosted password manager. Jekyll only: SCSS is compiled by Jekyll's own
dart-sass converter. There is no Node toolchain (the old gulp 3 / node-sass
setup was removed — it no longer ran on current Node).

## Development Commands

```bash
# Development server with live reload
jekyll serve --livereload

# One-off build into _site/
jekyll build
```

No `npm install`. No gulp.

## Architecture

### Content lives in `_data/`, not `_config.yml`
`_config.yml` holds build settings, site identity and canonical external links
(`site.links.*`, `site.product.*`). Everything editorial that is a list lives in
`_data/`:

- `nav.yml` — the navigation, rendered once in `_includes/nav.html`
- `capabilities.yml`, `features.yml`, `integrations.yml` — product content
- `segments.yml` — the three audience paths (individuals / teams / enterprise)
- `releases.yml` — release highlights and changelog
- `pricing.yml` — plans, capacity packs, and the free-server framing statement
- `comparison.yml` — the competitor table **and** the honest weaknesses block
- `testimonials.yml`, `screenshots.yml`

### Layout chain
`base.html` (html skeleton, nav, main, footer) → `page.html` (adds the page
hero from front matter) → `prose.html` (single readable column for legal or
long-form pages). `default.html` is the home page: base with no hero, because
`index.html` composes its own sections.

Front matter drives the hero: `title`, `eyebrow`, `lead`, `cta` (a list of
`{label, url}`), plus `description` for SEO and optionally `image`.

### Includes
- `_includes/sections/` — one file per home page section
- `_includes/components/icon.html` — the inline SVG icon set
- `_includes/components/cta-band.html` — the closing call to action
- `_includes/components/faq.html` — renders a `faq` front-matter array
- `_includes/components/consent-banner.html` — the cookie banner; rendered only
  when an analytics tag is configured, wired in `js/main.js`, state handled by
  `window.tpConsent` in `_includes/analytics.html`

### SCSS (`_sass/`)
Entry point `_sass/main.scss`, compiled through `css/style.scss` (which carries
the empty front matter Jekyll needs). **`_sass/main.scss` must not be renamed to
`style.scss`** — `css/style.scss` would then import itself.

- `modules/` — reset, design tokens (`_config.scss`), colours (`_color-skin.scss`)
- `components/` — icons, buttons, badges, cards, callout, steps, faq, tables,
  forms, consent
- `layout/` — global, nav, hero, page, pricing, contact, footer

## Key Patterns

- **Adding a page**: create `<name>.html` with `layout: page` and the hero front
  matter, add it to `_data/nav.yml` and to the footer columns.
- **Adding a home section**: create `_includes/sections/<name>.html`, add the
  include to `index.html`, put its content in a `_data/` file.
- **Icons**: `{% include components/icon.html name="shield-check" %}`. New icons
  are added as a `when` branch in `_includes/components/icon.html`. No icon
  fonts, no external CDN — apart from the analytics tag, the site makes zero
  third-party requests.
- **Colours**: always through the `--tp-*` custom properties, so dark mode
  (`prefers-color-scheme`) keeps working. Hard-coded hex in a component is a bug.
- **Mobile**: wide content scrolls inside `.tp-table-scroll`; the page body must
  never scroll horizontally.

## Editorial rules

These are not stylistic preferences — the site's credibility depends on them.

- **Every factual claim must be checkable** against the Teampass release notes,
  documentation or source. Version numbers, advisory IDs and feature names come
  from the GitHub releases.
- **The comparison table stays honest.** `_data/comparison.yml` carries a
  `weaknesses` block naming where alternatives beat Teampass. It is rendered on
  `/compare.html` and must not be removed to make the table look better.
- **Never claim compliance certification.** `/compliance.html` maps features to
  control expectations using the word "supports". Teampass is not certified
  against ISO 27001, SOC 2 or anything else, and says so.
- **Testimonials are reproduced as given**, trimmed only with ellipses. Do not
  rewrite someone's quote.
- **No ads, one analytics tag, behind consent.** The AdSense scripts were
  removed deliberately and are not coming back. `_includes/analytics.html` is
  the single place a script may be added, and it ships nothing unless
  `analytics.provider` is set in `_config.yml`. Currently `google` (GA4
  property 361510583) — the site's only third-party request, and only after
  the visitor accepts.
- **Consent is prior blocking, not just a denied signal.** `gtag/js` is never
  requested until `tpConsent.accept()` runs; Consent Mode v2 defaults are all
  `denied` and the advertising ones are never granted. Declining deletes the
  `_ga*` cookies. Do not "simplify" this into a plain gtag snippet — a denied
  Consent Mode tag still pings Google, which the CNIL does not treat as exempt.
  If a new script that stores anything is ever added, it goes behind the same
  gate and gets a row in `/privacy.html`.

## Outstanding work

Marked with `TODO(nils)` in the files that need it:

- `_config.yml` — `images/og-image.png` (1200×630) does not exist yet
- `_data/comparison.yml` — re-verify every row against vendor docs before launch
- `_data/testimonials.yml` — collect quotes covering the 3.2 governance features
- `_includes/sections/contact.html` — confirm the legacy Formspree endpoint still delivers
- `privacy.md` — state the real GA4 data-retention setting, and name the host
  and its access-log retention
