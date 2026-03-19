# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**no-style-please** is a minimalist Jekyll theme emphasizing performance and readability with ~1KB of CSS. It's designed as a gem-based theme that can be integrated into Jekyll sites or used as a standalone demo.

Key characteristics:
- Nearly no CSS — styling achieved through minimal custom styles and semantic HTML
- Dark mode via CSS `filter: invert()` with image handling (`class="ioda"` to invert on dark appearance)
- Monospace typography for content-first readability
- SEO optimized (Jekyll SEO Tag plugin)
- RSS feed support (Jekyll Feed plugin)
- GitHub Pages compatible
- Optional analytics (GoatCounter) and comments (Cactus)

## Repository Structure

### Core Theme Files (bundled in gem)
- **`_layouts/`** - HTML templates:
  - `default.html` - Base layout wrapping all pages
  - `post.html` - Blog post layout with metadata (date, author, categories), navigation
  - `page.html` - Simple page layout
  - `home.html` - Homepage layout (displays menu)
  - `archive.html` - Archive page showing filtered post lists

- **`_includes/`** - Reusable components:
  - `head.html` - Document head with metadata, Open Graph, schema.org JSON-LD
  - `header.html` - Site title/header
  - `footer.html` - Site footer
  - `post_list.html` - Renders list of posts (used in menu and archive)
  - `menu_item.html` - Recursive menu item rendering
  - `back_link.html` - Navigation back to home
  - `next_prev_nav.html` - Post navigation
  - `goat_counter.html` - Optional analytics tracking

- **`_sass/`** - Styling:
  - `no-style-please.scss` - Main theme styles (~152 lines)
  - `custom-styles.scss` - Hook for custom additions

- **`assets/`**:
  - `assets/css/main.scss` - CSS compilation entrypoint
  - `assets/js/mouse_coords.js` - Optional utility
  - `assets/js/cactus.js` - Optional comments system
  - `assets/css/cactus-style.css` - Cactus comments styling

### Configuration & Content
- **`_config.yml`** - Main Jekyll configuration
- **`_data/menu.yml`** - Navigation menu structure (nested entries, post lists)
- **`Gemfile`** / **`Gemfile.lock`** - Ruby dependencies
- **`no-style-please.gemspec`** - Gem specification (defines bundled files via regex on lines 13-14)

### Demo Content
- **`_posts/`** - Example blog posts
- **`about.md`**, **`archive.md`**, **`example2-archive.md`** - Example pages

## Development Commands

```bash
# Install dependencies (required first)
bundle install

# Run local dev server (serves at http://localhost:4000)
bundle exec jekyll serve

# Build site for production
bundle exec jekyll build

# Clean build artifacts
bundle exec jekyll clean
```

## Architecture Notes

### Template Inheritance & Includes
- All pages inherit from `default.html`, which wraps content in `.page-content` and `.w` (max-width container)
- `default.html` optionally includes GoatCounter analytics (only in production, excludes 404 pages)
- Custom JavaScript can be loaded per-page via `custom_js` frontmatter array

### Styling Approach
- **Light mode**: Black text on white background
- **Dark mode**: Uses CSS `filter: invert(1)` on body with `body[a="dark"]` or media query
- **Images in dark mode**: By default NOT inverted; add `class="ioda"` to invert specific images
- **SCSS**: Minimal (~150 lines), emphasis on semantic HTML over classes
- **Responsive**: Uses max-width container and responsive typography sizing

### Menu System (`_data/menu.yml`)
- Hierarchical structure with nested `entries`
- Each entry supports:
  - `title` (required) - can contain HTML
  - `url` (optional) - creates a link
  - `entries` (optional) - nested submenu
  - `post_list` (optional) - auto-generates list of posts with filtering:
    - `category` - filter by post category
    - `limit` - max posts shown
    - `show_more` / `show_more_url` / `show_more_text` - pagination link

### Post Metadata
- **Standard frontmatter**: `title`, `date`, `categories`
- **Custom fields** (used in `post.html`):
  - `author` (object with `login`, `display_name`)
  - `series-title` - displayed above post title
  - `comments` (boolean) - enables Cactus comments
  - `custom_js` (array) - loads JS files from `assets/js/`

### Configuration Options (`_config.yml`)
- `theme_config.appearance` - "light", "dark", or "auto"
- `theme_config.back_home_text` - customize homepage link text
- `theme_config.date_format` - strftime format string
- `theme_config.show_description` - display blog description on home
- `goat_counter` - enable/disable analytics (sitename)
- `cactus_comments.sitename` - enable/disable comments

## Key Implementation Details

### CSS Color Inversion Strategy
The theme uses CSS `filter: invert(1)` for dark mode instead of separate stylesheets. This keeps CSS size minimal but requires careful image handling (use `ioda` class to prevent image inversion).

### Gem File Inclusion
The gemspec (line 13) uses a regex to include only specific directories in the bundled gem:
```ruby
spec.files = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }
```
Demo content (`_posts/`, `_data/`, etc.) is NOT bundled — only theme files are.

### Jekyll Environment Handling
- GoatCounter analytics only loads when `jekyll.environment == "production"` AND page title is not "404"
- Use `JEKYLL_ENV=production bundle exec jekyll build` to test production behavior

## Common Development Tasks

### Adding a New Layout
1. Create file in `_layouts/` that extends `default.html` or `post.html`
2. Use Liquid template syntax and Jekyll variables
3. Include necessary meta tags via `head.html`

### Modifying Styles
1. Edit `_sass/no-style-please.scss` for theme changes
2. Edit `_sass/custom-styles.scss` for custom additions (imported by `main.scss`)
3. Keep minification enabled in `_config.yml`: `sass: style: :compressed`

### Customizing the Menu
1. Edit `_data/menu.yml`
2. See README for nested entries, post lists, and filtering options

### Testing Post Lists
- Use `post_list.html` which renders posts based on:
  - Optional `category` filter
  - Optional `limit` on number of posts
  - Supports "show more" pagination links

## Testing & Deployment

The theme is fully compatible with GitHub Pages. To test against the gem package:
```bash
gem build no-style-please.gemspec
gem install ./no-style-please-*.gem
```

When modifying layouts/includes/sass, Jekyll's `bundle exec jekyll serve` watches files and auto-rebuilds.
