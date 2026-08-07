# teampass.net

The marketing and product website for [Teampass](https://github.com/nilsteampassnet/TeamPass),
the open-source self-hosted password manager.

Built with Jekyll. SCSS is compiled by Jekyll itself (dart-sass), so there is
no Node toolchain — the previous gulp 3 / node-sass setup no longer ran on
current Node versions and was removed.

## Requirements

- Ruby with [Jekyll](https://jekyllrb.com/) 4.x — `gem install jekyll`

## Development

```bash
jekyll serve --livereload
```

The site is served on <http://localhost:4000> and rebuilds on change.

```bash
jekyll build
```

Builds into `_site/`.

## Where things live

| Path | Contents |
|---|---|
| `_config.yml` | Build settings, site identity, canonical external links. No editorial copy. |
| `_data/` | All content that is a list: navigation, features, segments, releases, pricing, comparison, testimonials. |
| `_includes/sections/` | Home page sections. |
| `_includes/components/` | Reusable pieces — `icon.html`, `cta-band.html`, `faq.html`. |
| `_layouts/` | `base` → `page` → `prose`. `default` is the home page. |
| `_sass/` | `main.scss` imports modules, components and layout partials. |
| `css/style.scss` | Compilation entry point. Must not be renamed to match `_sass/main.scss`, or it would import itself. |

## Conventions

- **Content belongs in `_data/`**, not in `_config.yml` and not hard-coded in a
  page. If you are adding a list, add a YAML file.
- **Icons are inline SVG** via `{% include components/icon.html name="shield" %}`.
  Add new ones to `_includes/components/icon.html`. No icon fonts, no CDN.
- **Colours go through CSS custom properties** (`--tp-*`) so dark mode keeps
  working. Do not hard-code hex values in components.
- **Claims must be checkable.** The comparison table and the compliance mapping
  carry editorial rules in their data files — read them before editing.

## Deployment

The site is served from this repository (see `CNAME`). Push to `master`.
