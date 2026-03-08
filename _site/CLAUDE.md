# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

The marketing/product website for **Teampass** (teampass.net) — an open-source collaborative password manager. Built with Jekyll + Gulp + SASS + BrowserSync.

## Development Commands

```bash
# Install dependencies (first time)
npm install

# Start development server (file watching, browser-sync, auto-rebuild, CSS injecting)
gulp

# Build Jekyll site only
jekyll build

# Compile SASS only
gulp sass
```

On Windows, Jekyll is invoked as `jekyll.bat` (handled automatically in `gulpfile.js`).

The compiled site outputs to `_site/`. This directory is served by BrowserSync during development.

## Architecture

### Content Configuration
All site content (text, team info, features, testimonials, pricing, social links, etc.) is centralized in `_config.yml`. Page sections pull their data from this file via Liquid template variables (`{{ site.* }}`).

### Page Structure
- `index.html` — main single-page site, composed entirely of `{% include sections/*.html %}` calls
- `features.html`, `donation.html`, `requirements.html`, `teampassconnect.html` — standalone pages
- `blog.html` — blog listing page
- `_posts/` — Jekyll blog posts (Markdown)

### Layouts (`_layouts/`)
- `default.html` — base layout wrapping all pages
- `single_page.html` — layout for standalone pages (no sidebar)
- `page.html`, `page-sidebar-left.html`, `page-sidebar-right.html` — sidebar variants
- `post.html` — blog post layout

### Includes (`_includes/`)
- `sections/` — one file per homepage section (about, features, portfolio, testimonials, prices, team, contact, commercial, parallax-features, offer, blog)
- `head.html`, `header.html`, `header-page.html`, `footer.html`, `scripts.html`, `sidebar.html` — global layout partials
- `widgets/`, `components/` — reusable UI pieces

### SCSS (`_scss/`)
Entry point: `style.scss` imports everything in order.
- `modules/` — reset, config variables, color skin, bootstrap grid, animations, icon fonts
- `components/` — forms, social icons, tags, buttons
- `layout/` — one file per section (mirrors `_includes/sections/`)

Gulp compiles SCSS to both `css/` (source) and `_site/css/` (live inject).

### Other Directories
- `js/` — jQuery, carousel, smooth scroll, and `main.js` for page behavior
- `utils/` — TeampassConnect browser extension XPI files and related files
- `tpc/` — TeampassConnect page content
- `dist/` — distribution assets
- `fonts/` — icon font files

## Key Patterns

- **To add a new homepage section**: create `_includes/sections/<name>.html`, add the include to `index.html`, add data to `_config.yml`, and create `_scss/layout/_<name>.scss` (import it in `style.scss`)
- **To update site content**: edit `_config.yml` — most visible text, links, and data live there
- **Icons**: the site uses `pe-7s-*` classes (7-stroke icon font) and flaticon social icons
- **Gulp watch** monitors `_scss/**/*.scss` for style changes and `*.html`, `_includes/**`, `_layouts/**`, `_posts/*`, `js/*.js`, `images/*` for full Jekyll rebuilds
