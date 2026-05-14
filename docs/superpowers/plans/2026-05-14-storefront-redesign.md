# GPI Storefront Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Atomic GPI-native rewrite of every shopper-facing surface (header, footer, product, collection, cart, customer, content pages, blog/article, search, wishlist, edge pages) layered onto the existing Halo theme. Homepage sections stay; everything else becomes `gpi-*` sections consuming the existing `--gpi-*` token system.

**Architecture:** Halo's `templates/*.json` files re-point to new `sections/gpi-*.liquid` files; legacy `main-*.liquid` and `header-NN.liquid` remain on disk untouched. `wrapper-header.liquid` / `wrapper-footer.liquid` learn one new `'gpi'` case. All cross-cutting UI lives in `snippets/gpi-*.liquid` + `assets/component-gpi-*.css` + `assets/gpi-*.js`.

**Tech Stack:** Shopify Online Store 2.0 (JSON templates + sections), Liquid, vanilla CSS (no preprocessor), vanilla JS (no framework), localStorage for client state.

**Hard rules:**
1. No JSON template exceeds 25 sections.
2. Never redeclare `--gpi-*` outside `assets/gpi-design-tokens.css`.
3. Every section has `{% schema %}` with `presets`.
4. Every `<img>` carries `width`, `height`, `loading`, and `srcset` when ≥600px wide.
5. Every interactive element has `:focus-visible` ring and reachable via keyboard.
6. Before destructive replacement, archive original to `docs/archive/<surface>/`.
7. Commit at the end of each wave with conventional message.

---

## File structure overview

### New snippets (cross-cutting — Wave 1 prerequisite)

```
snippets/gpi-image.liquid                    # responsive img w/ srcset+sizes+lazy+dims
snippets/gpi-price.liquid                    # price + compare-at + EMI line
snippets/gpi-rating-stars.liquid             # 5-star rating display
snippets/gpi-stone-badge.liquid              # stone-type chip
snippets/gpi-trust-strip.liquid              # 4-icon trust row
snippets/gpi-breadcrumbs.liquid              # accessible breadcrumb + JSON-LD
snippets/gpi-newsletter-form.liquid          # email capture form (Shopify customer form)
snippets/gpi-cta-link.liquid                 # styled link/button
snippets/gpi-currency-switcher.liquid        # dropdown w/ flags
snippets/gpi-wishlist-heart.liquid           # heart toggle button
snippets/gpi-product-card.liquid             # the canonical product card
snippets/gpi-schema-product.liquid           # Product JSON-LD
snippets/gpi-schema-article.liquid           # Article JSON-LD
snippets/gpi-mega-menu.liquid                # mega-menu content for header
```

### New assets

```
assets/component-gpi-foundation.css          # body resets, primitives, btn variants
assets/component-gpi-header.css
assets/component-gpi-footer.css
assets/component-gpi-product.css             # all product sections share
assets/component-gpi-collection.css          # all collection sections share
assets/component-gpi-cart.css
assets/component-gpi-customer.css
assets/component-gpi-page.css                # content pages share
assets/component-gpi-blog.css
assets/component-gpi-search.css
assets/component-gpi-wishlist.css
assets/component-gpi-edge.css                # 404, password, gift card
assets/gpi-currency.js
assets/gpi-wishlist.js
assets/gpi-header.js                         # sticky/scroll, mobile nav, search expand
assets/gpi-product.js                        # gallery, variant, qty, tabs, ATC
assets/gpi-collection.js                     # filter/sort/load-more
```

### New sections (~45 total)

```
sections/gpi-header.liquid
sections/gpi-footer.liquid
sections/gpi-product-main.liquid             # gallery + info (composite)
sections/gpi-product-trust-strip.liquid
sections/gpi-product-tabs.liquid
sections/gpi-product-fbt.liquid
sections/gpi-product-related.liquid
sections/gpi-product-reviews.liquid
sections/gpi-product-recently-viewed.liquid
sections/gpi-collection-hero.liquid
sections/gpi-collection-toolbar.liquid
sections/gpi-collection-grid.liquid
sections/gpi-collection-empty.liquid
sections/gpi-collection-seo-block.liquid
sections/gpi-cart-main.liquid
sections/gpi-cart-trust.liquid
sections/gpi-cart-upsell.liquid
sections/gpi-cart-empty.liquid
sections/gpi-collections-index-hero.liquid
sections/gpi-collections-index-grid.liquid
sections/gpi-page-about-hero.liquid
sections/gpi-page-about-story.liquid
sections/gpi-page-about-values.liquid
sections/gpi-page-about-atelier.liquid
sections/gpi-page-about-team.liquid
sections/gpi-page-about-cta.liquid
sections/gpi-page-contact-hero.liquid
sections/gpi-page-contact-form.liquid
sections/gpi-page-contact-channels.liquid
sections/gpi-page-contact-map.liquid
sections/gpi-page-contact-faq.liquid
sections/gpi-page-faqs.liquid
sections/gpi-page-policy.liquid
sections/gpi-page-intention-hero.liquid
sections/gpi-page-intention-grid.liquid
sections/gpi-page-lookbook.liquid
sections/gpi-page-locator.liquid
sections/gpi-blog-hero.liquid
sections/gpi-blog-grid.liquid
sections/gpi-blog-newsletter.liquid
sections/gpi-article-hero.liquid
sections/gpi-article-body.liquid
sections/gpi-article-share.liquid
sections/gpi-article-related.liquid
sections/gpi-search-results.liquid
sections/gpi-search-empty.liquid
sections/gpi-wishlist-hero.liquid
sections/gpi-wishlist-grid.liquid
sections/gpi-wishlist-empty.liquid
sections/gpi-404.liquid
sections/gpi-password.liquid
sections/gpi-gift-card.liquid
```

### Templates touched

`templates/product.json`, `collection.json`, `cart.json`, `search.json`, `404.json`, `password.json`, `list-collections.json`, `page.template-about-us-1.json`, `page.template-contact-us-1.json`, `page.template-faqs.json`, `page.template-wishlist.json`, `page.template-lookbook.json`, `page.template-store-locator.json`, `page.healing-crystals-guide.json`, `blog.json`, `article.json`, plus new `page.shop-by-intention.json` and `page.policy.json`. `templates/gift_card.liquid` rewritten inline.

### Templates modified (light touch)

`snippets/wrapper-header.liquid` — adds `when 'gpi'` case.
`snippets/wrapper-footer.liquid` — adds `when 'gpi'` case.
`config/settings_schema.json` — adds `'gpi'` option to header_layout / footer_layout dropdowns.

---

## Wave 0 — Plumbing

**Goal:** Get the main repo into a clean, committed state so localhost:9292 reflects everything we'll build on.

**Files:** none new — only git operations.

- [ ] **Step 0.1: Verify live dev server is running on 9292**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:9292`
Expected: `200`. If not 200, ask user to start `shopify theme dev --port=9292`.

- [ ] **Step 0.2: Inspect uncommitted state in main repo**

Run from `C:\Users\shubh\Downloads\giftpalaceindia`:
```
git status --short | wc -l
git status --short | grep '^??' | wc -l
git status --short | grep '^ M' | wc -l
```
Expected: ~620 total, ~132 untracked, ~488 modified.

- [ ] **Step 0.3: Stage everything (intentional snapshot of current build state)**

```
git add -A
git status --short | wc -l   # should be 0 now (all staged)
```

- [ ] **Step 0.4: Verify no secrets staged**

```
git diff --cached --name-only | xargs -I{} grep -lE "(API_KEY|SECRET|TOKEN|PASSWORD|PRIVATE_KEY)" "{}" 2>/dev/null || echo "clean"
```
Expected: `clean`. If a file shows up, unstage it and investigate.

- [ ] **Step 0.5: Commit Wave 0 snapshot**

```
git commit -m "chore(wave-0): snapshot of homepage rebuild work + 25-section fix for templates/index.json"
```

- [ ] **Step 0.6: Reload localhost:9292 and confirm homepage renders**

Open browser to http://localhost:9292/. Confirm all 25 sections render in order: hero → trust-proof → trust-pillars → testimonials → why-us → concierge → store-proof → origin → meaning → atlas → signature-drop → featured-browse → custom-service → shortcuts → community-proof → press-strip → discover → faq → apps → newsletter. No console errors.

---

## Wave 1 — Foundation snippets + Header + Footer

**Goal:** Build every cross-cutting snippet (consumed by every later wave) + the new GPI header (3-row, oversized center logo, currency switcher, wishlist) + GPI footer (4-column + currency switcher redundancy).

### Task 1.1: Build cross-cutting snippets

**Files:**
- Create: `snippets/gpi-image.liquid`
- Create: `snippets/gpi-price.liquid`
- Create: `snippets/gpi-rating-stars.liquid`
- Create: `snippets/gpi-stone-badge.liquid`
- Create: `snippets/gpi-trust-strip.liquid`
- Create: `snippets/gpi-breadcrumbs.liquid`
- Create: `snippets/gpi-cta-link.liquid`
- Create: `snippets/gpi-currency-switcher.liquid`
- Create: `snippets/gpi-wishlist-heart.liquid`
- Create: `snippets/gpi-newsletter-form.liquid`
- Create: `snippets/gpi-product-card.liquid`
- Create: `assets/component-gpi-foundation.css`

- [ ] **Step 1.1.1: `snippets/gpi-image.liquid`** — responsive image. Inputs: `image` (Image object), `alt`, `class`, `sizes` (default `"(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"`), `loading` (default `"lazy"`), `fetchpriority`. Emits `<img>` with explicit `width`/`height` from image dims, `srcset` at 360/540/720/900/1200/1500/1800 widths via `image_url` filter, no inline styles.

- [ ] **Step 1.1.2: `snippets/gpi-price.liquid`** — inputs: `product` or `variant`. Renders: current price (gold accent if on sale), compare-at strikethrough, EMI line "EMI from ₹X/mo" when price ≥ ₹3000, "Save X%" badge, "Tax included" microcopy. Markup classes: `.gpi-price`, `.gpi-price__current`, `.gpi-price__compare`, `.gpi-price__emi`, `.gpi-price__save`.

- [ ] **Step 1.1.3: `snippets/gpi-rating-stars.liquid`** — inputs: `rating` (0–5), `count` (review count). Emits 5 SVG stars (filled / half / empty) + count. Accessible label `aria-label="Rated X out of 5 stars from Y reviews"`.

- [ ] **Step 1.1.4: `snippets/gpi-stone-badge.liquid`** — input: `stone` (string). Emits `<span class="gpi-stone-badge" data-stone="{{ stone | handleize }}">{{ stone }}</span>`. CSS variations per stone via `[data-stone="ruby"]` etc.

- [ ] **Step 1.1.5: `snippets/gpi-trust-strip.liquid`** — accepts 4 hardcoded trust cues (BIS Hallmarked, Free India Shipping, 7-Day Returns, Certified Gemstones) but allows overrides via params `cue_1_icon`/`cue_1_label`/`cue_1_text` etc. Each cue: SVG icon + label + microcopy. Horizontal on desktop, 2x2 on tablet, stacked on mobile.

- [ ] **Step 1.1.6: `snippets/gpi-breadcrumbs.liquid`** — emits semantic `<nav aria-label="Breadcrumb"><ol>` with separator chevrons. Also emits BreadcrumbList JSON-LD via `{% capture %}`. Reads `request` + `template` + current object (collection / product / article / page).

- [ ] **Step 1.1.7: `snippets/gpi-cta-link.liquid`** — inputs: `href`, `label`, `variant` (`primary` / `secondary` / `ghost` / `text`), `size` (`sm` / `md` / `lg`), `icon` (optional SVG name), `block` (boolean for full width). Reuses `.gpi-button` from existing tokens; adds variants.

- [ ] **Step 1.1.8: `snippets/gpi-currency-switcher.liquid`** — emits `<div class="gpi-currency" data-gpi-currency>` containing a `<button>` showing current currency (e.g., `₹ INR ▾`) and a hidden `<ul role="listbox">` with options INR, USD, GBP, AED, EUR (each with flag glyph from text). Wired up via `gpi-currency.js` (Task 1.4). Keyboard reachable.

- [ ] **Step 1.1.9: `snippets/gpi-wishlist-heart.liquid`** — inputs: `product_id`, `product_handle`, `size` (`sm`/`md`/`lg`). Emits `<button class="gpi-wishlist-heart" data-gpi-wishlist-toggle data-product-id="{{ id }}" data-product-handle="{{ handle }}" aria-pressed="false" aria-label="Save to wishlist">` with SVG heart (outline default, filled when active).

- [ ] **Step 1.1.10: `snippets/gpi-newsletter-form.liquid`** — Shopify customer form variant `customer` with email field + submit. Includes honeypot, success/error messages, `aria-live="polite"`. Class hooks `.gpi-newsletter`, `.gpi-newsletter__input`, `.gpi-newsletter__submit`, `.gpi-newsletter__feedback`.

- [ ] **Step 1.1.11: `snippets/gpi-product-card.liquid`** — inputs: `product`, `aspect_ratio` (default `"4/5"`), `show_stone_badge` (default true), `show_quick_add` (default true), `show_wishlist` (default true). Markup:
```
<article class="gpi-product-card" data-product-id="{{ product.id }}">
  <a href="{{ product.url }}" class="gpi-product-card__link">
    <div class="gpi-product-card__media" style="--aspect: {{ aspect_ratio }};">
      {%- render 'gpi-image', image: product.featured_image, alt: product.title -%}
      {%- if show_stone_badge and product.metafields.gpi.stone_type %}
        {%- render 'gpi-stone-badge', stone: product.metafields.gpi.stone_type -%}
      {%- endif -%}
    </div>
    <div class="gpi-product-card__info">
      <h3 class="gpi-product-card__title">{{ product.title }}</h3>
      {%- render 'gpi-price', product: product -%}
      {%- if product.metafields.judgeme.rating -%}
        {%- render 'gpi-rating-stars', rating: product.metafields.judgeme.rating, count: product.metafields.judgeme.review_count -%}
      {%- endif -%}
    </div>
  </a>
  {%- if show_wishlist -%}
    {%- render 'gpi-wishlist-heart', product_id: product.id, product_handle: product.handle, size: 'sm' -%}
  {%- endif -%}
  {%- if show_quick_add and product.available -%}
    <button class="gpi-product-card__quickadd" data-gpi-quick-add="{{ product.variants.first.id }}">Quick add</button>
  {%- endif -%}
</article>
```

- [ ] **Step 1.1.12: `assets/component-gpi-foundation.css`** — body resets (box-sizing, no scroll bounce), `.gpi-button` size variants (sm/md/lg), `.gpi-button--ghost` and `--text` variants, `.gpi-stone-badge` base + per-stone color overrides, `.gpi-product-card` base + hover (image scale 1.02, shadow lift), `.gpi-product-card__quickadd` hidden-until-hover on desktop / always-visible mobile, `.gpi-currency` dropdown, `.gpi-wishlist-heart` toggle styles, `.gpi-trust-strip` grid, `.gpi-newsletter` form, `.gpi-rating-stars`, `.gpi-price` styles, `.gpi-breadcrumbs` styles, `.visually-hidden` utility, `.gpi-container` (max-width 1440, side padding), `.gpi-section` (vertical padding rhythm), focus-visible rings.

- [ ] **Step 1.1.13: Commit snippets foundation**

```
git add snippets/gpi-*.liquid assets/component-gpi-foundation.css
git commit -m "feat(wave-1): cross-cutting GPI snippets + foundation CSS"
```

### Task 1.2: Build GPI header section

**Files:**
- Create: `sections/gpi-header.liquid`
- Create: `assets/component-gpi-header.css`
- Create: `assets/gpi-header.js`
- Modify: `snippets/wrapper-header.liquid` — add `when 'gpi'` case
- Modify: `config/settings_schema.json` — add `'gpi'` option to `header_layout` select

- [ ] **Step 1.2.1: `sections/gpi-header.liquid`** — three-row layout:
  - Row 1 (announcement): `<div class="gpi-header__announce">` with rotating message blocks (block-based) on left, `{% render 'gpi-currency-switcher' %}` on right.
  - Row 2 (logo): `<div class="gpi-header__brand"><a href="/" class="gpi-header__logo">` containing either `<img>` (if `section.settings.logo` set) or the wordmark `<span class="gpi-header__wordmark">GIFT PALACE</span>` with serif Marcellus, 32–44px clamp, 0.04em letter-spacing, optional gem glyph SVG.
  - Row 3 (nav): primary nav `<nav class="gpi-header__nav">` left (linklist from `section.settings.main_menu`, mega-menu trigger via `data-mega`), utility cluster right with search button (expands inline), `{% render 'gpi-wishlist-heart' %}`-style header link, account link, cart link with count badge.
  - Mega-menus: each top-level item with sublinks renders `{% render 'gpi-mega-menu', linklist: link.links %}`.
  - `<script src="{{ 'gpi-header.js' | asset_url }}" defer></script>` at bottom.
  - Schema settings: `logo` (image_picker), `logo_max_height` (range 24-80, default 44), `main_menu` (link_list), `show_search` (checkbox default true), `show_account` (checkbox default true), `sticky` (checkbox default true), `transparent_on_home` (checkbox default false). Blocks: `announcement` (text), max 5. Presets: `{"name": "GPI Header"}`.

- [ ] **Step 1.2.2: `assets/component-gpi-header.css`** — sticky behavior (`position: sticky; top: 0; z-index: 100`), three-row grid, mega-menu absolute positioned with grid columns, mobile drawer (off-canvas left), scroll-collapse class `.gpi-header--scrolled` shrinks announcement + nav rows but logo stays centered, search-expanded class hides nav and shows full-width search input.

- [ ] **Step 1.2.3: `assets/gpi-header.js`** — IIFE that:
  - On scroll past 80px, toggles `.gpi-header--scrolled` on `.gpi-header`.
  - On mobile menu button click, toggles `.gpi-header--menu-open` + locks body scroll.
  - On search button click, toggles `.gpi-header--search-open`, focuses input.
  - On mega-menu trigger hover/focus, opens the menu; Esc closes.
  - Listens for custom event `gpi:wishlist:change` (from `gpi-wishlist.js`) and updates header wishlist count badge.
  - Listens for custom event `cart:change` and updates cart count badge.

- [ ] **Step 1.2.4: `snippets/wrapper-header.liquid` — add gpi case**

Add inside the `case settings.header_layout` block, before the `{%- endcase -%}`:
```liquid
{%- when 'gpi' -%}
  {% section 'gpi-header' %}
```

- [ ] **Step 1.2.5: `config/settings_schema.json` — register 'gpi' option**

Find the header_layout select (likely in "Header" settings group) and add `{"value": "gpi", "label": "GPI (Gift Palace India)"}` as the FIRST option. Set the default to `"gpi"`.

- [ ] **Step 1.2.6: Build `snippets/gpi-mega-menu.liquid`** — column grid (4 cols desktop, 2 cols tablet) of sublinks; each column has heading + linklist + optional featured-image card. Accepts `linklist` param.

- [ ] **Step 1.2.7: Verify on localhost** — reload homepage. Confirm: (a) header renders, (b) logo is center-aligned and large, (c) currency switcher visible top-right, (d) sticky on scroll, (e) no console errors. If layout looks broken, fix in CSS only.

- [ ] **Step 1.2.8: Commit header**

```
git add sections/gpi-header.liquid assets/component-gpi-header.css assets/gpi-header.js snippets/wrapper-header.liquid snippets/gpi-mega-menu.liquid config/settings_schema.json
git commit -m "feat(wave-1): GPI header with center logo, currency switcher, sticky nav"
```

### Task 1.3: Build GPI footer section

**Files:**
- Create: `sections/gpi-footer.liquid`
- Create: `assets/component-gpi-footer.css`
- Modify: `snippets/wrapper-footer.liquid` — add `when 'gpi'` case
- Modify: `config/settings_schema.json` — add `'gpi'` option to `footer_layout` select

- [ ] **Step 1.3.1: `sections/gpi-footer.liquid`** — block-based:
  - Top section: 4-column grid of `link_column` blocks (each: heading + link_list). Default columns: Shop, About, Help, Connect.
  - Middle section: newsletter block (heading + lede + `{% render 'gpi-newsletter-form' %}`).
  - Trust strip row: `{% render 'gpi-trust-strip' %}`.
  - Social row: blocks of `social` (platform select + url) rendered as SVG icon links.
  - Currency switcher: `{% render 'gpi-currency-switcher' %}` in footer-right (redundancy per spec).
  - Legal strip: copyright + payment-method icons + policy links.
  - Schema: settings (logo, address text, copyright_text), blocks: link_column (max 4), social (max 6), payment_icon (max 8). Preset: GPI Footer.

- [ ] **Step 1.3.2: `assets/component-gpi-footer.css`** — ivory-dark background, top padding 80px / bottom 32px, 4-col grid (1fr per col, gap 48px), responsive 2-col tablet / 1-col mobile, newsletter occupies a column on desktop or full-width strip on mobile, legal strip flex layout, payment-method icons grayscale w/ hover color.

- [ ] **Step 1.3.3: `snippets/wrapper-footer.liquid` — add gpi case**

Mirror the change from 1.2.4: add `when 'gpi'` → `{% section 'gpi-footer' %}` before `endcase`.

- [ ] **Step 1.3.4: Register footer_layout 'gpi' option** in `config/settings_schema.json`.

- [ ] **Step 1.3.5: Verify on localhost** — reload, confirm footer renders, currency switcher works (placeholder for now), newsletter form submits.

- [ ] **Step 1.3.6: Commit footer**

```
git add sections/gpi-footer.liquid assets/component-gpi-footer.css snippets/wrapper-footer.liquid config/settings_schema.json
git commit -m "feat(wave-1): GPI footer with 4-column grid, newsletter, trust strip, currency switcher"
```

### Task 1.4: Currency switcher JS + persistence

**Files:**
- Create: `assets/gpi-currency.js`

- [ ] **Step 1.4.1: `assets/gpi-currency.js`** — IIFE. Reads `?currency=` URL param or `localStorage.gpiCurrency` (default `INR`). On switcher click, opens listbox; on selection, persists to localStorage, dispatches `gpi:currency:change` custom event, and reloads page with `?currency=XYZ` so Shopify Markets context swaps prices server-side (since `{{ money }}` is server-rendered, the only reliable path is a reload). Stub gracefully if Shopify Markets not enabled (just update display label).

- [ ] **Step 1.4.2: Include script in `sections/gpi-header.liquid`**

Add `<script src="{{ 'gpi-currency.js' | asset_url }}" defer></script>` near end of section template.

- [ ] **Step 1.4.3: Verify** — click switcher on localhost, choose USD, page reloads with `?currency=USD`. Persists across page nav.

- [ ] **Step 1.4.4: Commit**

```
git add assets/gpi-currency.js sections/gpi-header.liquid
git commit -m "feat(wave-1): currency switcher persistence + page reload"
```

### Task 1.5: Wishlist JS + heart sync

**Files:**
- Create: `assets/gpi-wishlist.js`

- [ ] **Step 1.5.1: `assets/gpi-wishlist.js`** — IIFE managing `localStorage.gpiWishlist` (JSON array of `{id, handle, added_at}`). API: `window.gpiWishlist = { add(id, handle), remove(id), has(id), list(), count() }`. On any `[data-gpi-wishlist-toggle]` click: toggle entry, update `aria-pressed`, dispatch `gpi:wishlist:change` event with payload `{count, action, id}`. On page load: read storage, set `aria-pressed="true"` on all matching toggles + update header count badge.

- [ ] **Step 1.5.2: Include script globally** — add to `sections/gpi-header.liquid` near end (loaded once per page).

- [ ] **Step 1.5.3: Verify** — click a heart on a product card, confirm heart fills, header badge increments, persists across reload.

- [ ] **Step 1.5.4: Commit**

```
git add assets/gpi-wishlist.js sections/gpi-header.liquid
git commit -m "feat(wave-1): wishlist heart toggle + localStorage persistence"
```

### Wave 1 acceptance

- Homepage loads with new header + footer rendering (after admin user switches header_layout/footer_layout to 'gpi').
- Currency switcher dropdown opens, persists choice, reloads with `?currency=` param.
- Wishlist heart toggles on product cards; header badge updates.
- No console errors.
- `shopify theme check` passes on all new files.

---

## Wave 2 — Product page

**Goal:** Replace `templates/product.json` with one canonical GPI product layout.

**Files:**
- Archive: `templates/product.json` → `docs/archive/product/product.json.bak`
- Create (replace): `templates/product.json`
- Create: `sections/gpi-product-main.liquid` (composite: breadcrumb + gallery + info)
- Create: `sections/gpi-product-trust-strip.liquid`
- Create: `sections/gpi-product-tabs.liquid`
- Create: `sections/gpi-product-fbt.liquid`
- Create: `sections/gpi-product-related.liquid`
- Create: `sections/gpi-product-reviews.liquid`
- Create: `sections/gpi-product-recently-viewed.liquid`
- Create: `assets/component-gpi-product.css`
- Create: `assets/gpi-product.js`
- Create: `snippets/gpi-schema-product.liquid`

- [ ] **Step 2.1: Archive original** `cp templates/product.json docs/archive/product/product.json.bak` (create dir first).

- [ ] **Step 2.2: `sections/gpi-product-main.liquid`** — single composite section. Above-fold layout:
  - Left column (desktop sticky, mobile-first stack): vertical thumbnail rail (small thumbs left) + main image area with zoom on hover; mobile is horizontal swipeable carousel. Use `{% render 'gpi-image' %}` for each image.
  - Right column: `{% render 'gpi-breadcrumbs' %}` → product title (`<h1>` serif Marcellus 36–48px) → vendor + sku microcopy → `{% render 'gpi-price' %}` → `{% render 'gpi-rating-stars' %}` + "See N reviews" anchor → certification chip row (BIS / GJEPC / Lab tested) → short description (first paragraph of body or metafield `gpi.short_desc`) → variant selectors (radio for size/style, swatches for color/stone) → quantity stepper → `<form action="/cart/add" method="post"><button class="gpi-button gpi-button--lg">Add to Bag</button></form>` + `{% render 'gpi-wishlist-heart' %}` + buy-it-now button → trust microcopy row (free shipping, returns, certificate) → "Why this piece" (healing benefits if metafield `gpi.healing_benefits` exists) → "What's in the box" list (chain, certificate, gift box).
  - Schema settings: `show_vendor` (default true), `show_sku` (default true), `show_buynow` (default true), `enable_zoom` (default true), `gallery_layout` (select: `thumbs-left` / `thumbs-bottom` / `stacked`, default `thumbs-left`), `sticky_info` (default true). No blocks (composite is fixed). Preset: GPI Product Main.

- [ ] **Step 2.3: `sections/gpi-product-trust-strip.liquid`** — wraps `{% render 'gpi-trust-strip' %}` with section-level settings to override the 4 trust cues. Preset.

- [ ] **Step 2.4: `sections/gpi-product-tabs.liquid`** — accordion (mobile) / tabs (desktop) for: Description (full body), Specifications (metafield grid), Care Instructions, Reviews (Judgeme embed via `{% render 'gpi-judgeme-widget' %}` if present, else fallback list), Shipping & Returns. Block-based for adding custom tabs.

- [ ] **Step 2.5: `sections/gpi-product-fbt.liquid`** — Frequently Bought Together. Reads metafield `gpi.fbt_products` (list.product_reference) or falls back to first 3 products in the same collection. Renders bundle UI: main product card + "+" + 2 companions, total price with savings, "Add bundle to cart" button posting all variant IDs at once. (Reuses existing FBT mapping work per commit 4a162990c.)

- [ ] **Step 2.6: `sections/gpi-product-related.liquid`** — "You may also like" carousel. Reads `product.collections[0].products` minus current product, limit 8. Uses `gpi-product-card` snippet.

- [ ] **Step 2.7: `sections/gpi-product-reviews.liquid`** — Judgeme reviews block (if Judgeme installed) or fallback to manual review blocks. Renders aggregate rating + filter chips (5★/4★/etc.) + paginated review list (cards w/ author, date, rating, text, optional image).

- [ ] **Step 2.8: `sections/gpi-product-recently-viewed.liquid`** — JS-rendered horizontal scroller. Reads from `localStorage.gpiRecentlyViewed`. Add tiny script that on product page load, pushes current product to the list (max 8, dedup).

- [ ] **Step 2.9: `sections/gpi-product-fbt.liquid` JS** — handled inline in section template: bundle checkboxes + "Add bundle" posts to `/cart/add.js` via fetch and updates cart.

- [ ] **Step 2.10: `assets/component-gpi-product.css`** — two-col grid (60/40 desktop, stack mobile), sticky info column, gallery thumb rail + main image w/ hover-zoom, variant selector chip styles, quantity stepper, ATC button XL variant, tabs/accordion behavior, FBT bundle layout, related carousel scroll-snap, reviews list, recently-viewed.

- [ ] **Step 2.11: `assets/gpi-product.js`** — IIFE handling: variant selection (update price/image/availability), quantity stepper +/-, tabs toggle, gallery image swap on thumb click, gallery zoom on hover/tap, scroll-to-reviews anchor, ATC fetch + cart-drawer-open event.

- [ ] **Step 2.12: `snippets/gpi-schema-product.liquid`** — Product JSON-LD with `@type: Product`, `name`, `image`, `description`, `sku`, `brand`, `offers` (Offer with `priceCurrency`, `price`, `availability`, `url`), `aggregateRating` if reviews exist. Include in `gpi-product-main.liquid`.

- [ ] **Step 2.13: Write new `templates/product.json`** — sections in order:
```json
{
  "sections": {
    "main": {"type": "gpi-product-main"},
    "trust": {"type": "gpi-product-trust-strip"},
    "tabs": {"type": "gpi-product-tabs"},
    "fbt": {"type": "gpi-product-fbt"},
    "related": {"type": "gpi-product-related"},
    "reviews": {"type": "gpi-product-reviews"},
    "recently": {"type": "gpi-product-recently-viewed"}
  },
  "order": ["main", "trust", "tabs", "fbt", "related", "reviews", "recently"]
}
```

- [ ] **Step 2.14: Verify on localhost** — open any product page. Confirm full layout renders, gallery works, variants switch price/image, ATC adds to cart, reviews tab opens. Test on mobile width.

- [ ] **Step 2.15: Commit Wave 2**

```
git add templates/product.json sections/gpi-product-*.liquid assets/component-gpi-product.css assets/gpi-product.js snippets/gpi-schema-product.liquid docs/archive/product/
git commit -m "feat(wave-2): GPI product page — composite gallery+info, trust, tabs, FBT, related, reviews, recently-viewed"
```

### Wave 2 acceptance

- Product page renders with gallery (thumbs-left desktop, carousel mobile), info column, all tabs, FBT, related, reviews, recently-viewed.
- Variant selection updates price + image + availability.
- ATC posts to cart and triggers drawer/notification.
- Lighthouse mobile ≥ 80.
- Product JSON-LD validates.

---

## Wave 3 — Collection page

**Goal:** Replace `templates/collection.json` with GPI collection layout.

**Files:**
- Archive: `templates/collection.json` → `docs/archive/collection/collection.json.bak`
- Create (replace): `templates/collection.json`
- Create: `sections/gpi-collection-hero.liquid`
- Create: `sections/gpi-collection-toolbar.liquid`
- Create: `sections/gpi-collection-grid.liquid`
- Create: `sections/gpi-collection-empty.liquid`
- Create: `sections/gpi-collection-seo-block.liquid`
- Create: `assets/component-gpi-collection.css`
- Create: `assets/gpi-collection.js`

- [ ] **Step 3.1: Archive original**.

- [ ] **Step 3.2: `sections/gpi-collection-hero.liquid`** — hero with `collection.image` as background, breadcrumb top, title (serif 48px), description (lede 18px), filter-chip rail (Stone, Style, Price, Zodiac, Intention) using `collection.filters` (Shopify Search & Discovery filters). Mobile: filter chips become "Filter & Sort" button → opens drawer.

- [ ] **Step 3.3: `sections/gpi-collection-toolbar.liquid`** — sort dropdown (price-asc/desc, best-selling, newest), result count, view-toggle (grid 4-col / grid 3-col).

- [ ] **Step 3.4: `sections/gpi-collection-grid.liquid`** — `<ul class="gpi-collection-grid">` of `gpi-product-card` for each product in `collection.products` (paginate 24). Load-more button at bottom (fetches next page via Shopify section_rendering API). Empty state if products.size == 0 renders `{% section 'gpi-collection-empty' %}`.

- [ ] **Step 3.5: `sections/gpi-collection-empty.liquid`** — "No pieces match your filters yet" + 6 intention shortcuts + reset-filters button.

- [ ] **Step 3.6: `sections/gpi-collection-seo-block.liquid`** — collection-specific SEO copy + related collections grid (2-col card row).

- [ ] **Step 3.7: `assets/component-gpi-collection.css`** — hero with background-image cover, filter chip styles (pill, selected state w/ gold border), grid 4-col → 3-col → 2-col responsive, mobile filter drawer (off-canvas right), toolbar sticky-on-scroll-up.

- [ ] **Step 3.8: `assets/gpi-collection.js`** — filter chip click → reload with query string OR live-update via Shopify section_rendering. Sort dropdown change → reload with `?sort_by=`. Load-more click → fetch next page, append cards, increment page. Mobile filter drawer open/close.

- [ ] **Step 3.9: Write new `templates/collection.json`**:
```json
{
  "sections": {
    "hero": {"type": "gpi-collection-hero"},
    "toolbar": {"type": "gpi-collection-toolbar"},
    "grid": {"type": "gpi-collection-grid"},
    "seo": {"type": "gpi-collection-seo-block"}
  },
  "order": ["hero", "toolbar", "grid", "seo"]
}
```

- [ ] **Step 3.10: Verify on localhost** — open any collection, confirm hero + filters + grid + sort + load-more work.

- [ ] **Step 3.11: Commit Wave 3**

```
git add templates/collection.json sections/gpi-collection-*.liquid assets/component-gpi-collection.* docs/archive/collection/
git commit -m "feat(wave-3): GPI collection page — hero, filter chips, grid, load-more, SEO block"
```

---

## Wave 4 — Cart

**Goal:** Replace `templates/cart.json` with GPI cart.

**Files:**
- Archive: `templates/cart.json` → `docs/archive/cart/`
- Create: `templates/cart.json`
- Create: `sections/gpi-cart-main.liquid` (line items + summary, composite)
- Create: `sections/gpi-cart-trust.liquid`
- Create: `sections/gpi-cart-upsell.liquid`
- Create: `sections/gpi-cart-empty.liquid`
- Create: `assets/component-gpi-cart.css`

- [ ] **Step 4.1: Archive original**.

- [ ] **Step 4.2: `sections/gpi-cart-main.liquid`** — two-column desktop, stack mobile. Left: `<form action="/cart" method="post"><ul class="gpi-cart__items">` of line items (image, title, variant text, qty stepper, line price, remove button). Order-note textarea + gift-wrap checkbox below. Right: sticky summary card with subtotal, shipping note ("Free India shipping above ₹2999"), promo input, taxes line, total, primary checkout button (`/checkout`), secondary "Continue shopping" link, payment-method icons, secure-checkout microcopy. If `cart.item_count == 0`, render `{% section 'gpi-cart-empty' %}` instead of items.

- [ ] **Step 4.3: `sections/gpi-cart-trust.liquid`** — `{% render 'gpi-trust-strip' %}` with cart-specific copy.

- [ ] **Step 4.4: `sections/gpi-cart-upsell.liquid`** — "Add these to your gift" — 4 related products via metafield `gpi.cart_upsells` or fallback to bestsellers.

- [ ] **Step 4.5: `sections/gpi-cart-empty.liquid`** — "Your gift palace is waiting" + 6 intention shortcuts + "Browse bestsellers" CTA.

- [ ] **Step 4.6: `assets/component-gpi-cart.css`** — line item card layout, qty stepper, sticky summary card (top: 100px on desktop), promo input, checkout button XL.

- [ ] **Step 4.7: Write new `templates/cart.json`**:
```json
{
  "sections": {
    "main": {"type": "gpi-cart-main"},
    "trust": {"type": "gpi-cart-trust"},
    "upsell": {"type": "gpi-cart-upsell"}
  },
  "order": ["main", "trust", "upsell"]
}
```

- [ ] **Step 4.8: Verify** — add to cart from product page, navigate to /cart, confirm layout, qty +/- update, remove item, checkout link works.

- [ ] **Step 4.9: Commit Wave 4**

```
git add templates/cart.json sections/gpi-cart-*.liquid assets/component-gpi-cart.css docs/archive/cart/
git commit -m "feat(wave-4): GPI cart page — line items, sticky summary, trust, upsell, empty state"
```

---

## Wave 5 — Customer pages

**Goal:** GPI-style customer auth + account pages.

**Files:**
- Modify (replace bodies of): `templates/customers/login.liquid`, `register.liquid`, `account.liquid`, `addresses.liquid`, `order.liquid`, `reset_password.liquid`, `activate_account.liquid`
- Create: `assets/component-gpi-customer.css`

- [ ] **Step 5.1: Archive all customer templates** → `docs/archive/customers/`.

- [ ] **Step 5.2: Rewrite `templates/customers/login.liquid`** — centered card on ivory canvas (max-width 480px), brand mark above, h1 "Welcome back", `{% form 'customer_login' %}` with email/password fields, "Forgot password?" link, primary submit button, divider, "New here? Create an account" link.

- [ ] **Step 5.3: Rewrite `register.liquid`** — same shell, "Create your account" heading, first_name/last_name/email/password fields, accept-marketing checkbox, submit, "Already have an account? Sign in" link.

- [ ] **Step 5.4: Rewrite `account.liquid`** — full-width page. Header: "Hi {{ customer.first_name }}" + logout link. Three-col layout: left sidebar nav (Orders, Addresses, Wishlist preview, Settings), right main panel showing recent orders table (date, order #, total, status, "View" link) + reorder rail of last-bought products.

- [ ] **Step 5.5: Rewrite `addresses.liquid`** — list of address cards + "Add new address" form (collapsed by default).

- [ ] **Step 5.6: Rewrite `order.liquid`** — order detail: line items, shipping address, billing address, fulfillment timeline.

- [ ] **Step 5.7: Rewrite `reset_password.liquid` + `activate_account.liquid`** — match login shell.

- [ ] **Step 5.8: `assets/component-gpi-customer.css`** — auth card shell, form input styles (`.gpi-input` with focus ring), account sidebar nav, order table.

- [ ] **Step 5.9: Verify** — visit /account/login, /account/register on localhost (must be logged out to see auth pages).

- [ ] **Step 5.10: Commit Wave 5**

```
git add templates/customers/ assets/component-gpi-customer.css docs/archive/customers/
git commit -m "feat(wave-5): GPI customer pages — login, register, account, addresses, order detail"
```

---

## Wave 6 — Content pages

**Goal:** GPI-native About, Contact, FAQs, Policies, Shop-by-intention, Lookbook, Store locator, Healing-crystals-guide.

For each page below, follow this pattern:

1. Archive current template JSON.
2. Build the listed `gpi-page-<surface>-<role>.liquid` sections (block-based where possible).
3. Write a new template JSON that orders the sections.
4. Verify on localhost.
5. Commit per-surface.

### Task 6.1: About page

- [ ] Archive `templates/page.template-about-us-1.json` → `docs/archive/pages/`.
- [ ] Create `sections/gpi-page-about-hero.liquid` — large hero with `gpi-atelier.webp` background, h1 "Crafted in trust since 1989", eyebrow "Our story", lede.
- [ ] Create `sections/gpi-page-about-story.liquid` — two-column: left rich-text story, right portrait `gpi-artisan.webp` w/ caption.
- [ ] Create `sections/gpi-page-about-values.liquid` — 3-col grid of value props (Certified, Crafted, Cared-for), each w/ SVG icon + heading + body.
- [ ] Create `sections/gpi-page-about-atelier.liquid` — process step strip (4 steps: Source → Cut → Set → Certify) w/ images.
- [ ] Create `sections/gpi-page-about-team.liquid` — team card grid (block-based, image + name + role).
- [ ] Create `sections/gpi-page-about-cta.liquid` — "Begin your search" with primary CTA to /collections/all + secondary to /pages/shop-by-intention.
- [ ] Rewrite `templates/page.template-about-us-1.json` to order these 6 sections.
- [ ] Verify on localhost, commit `feat(wave-6): GPI About page`.

### Task 6.2: Contact page

- [ ] Archive `templates/page.template-contact-us-1.json`.
- [ ] Create `sections/gpi-page-contact-hero.liquid` — eyebrow + h1 + lede.
- [ ] Create `sections/gpi-page-contact-form.liquid` — `{% form 'contact' %}` with name, email, subject dropdown (General / Order / Custom design / Wholesale / Press), message, submit. Server-side success message shown via `form.posted_successfully?`.
- [ ] Create `sections/gpi-page-contact-channels.liquid` — 3-col cards: Call (+91 70110 99721), WhatsApp (tap link), Email (support@giftpalaceindia.com).
- [ ] Create `sections/gpi-page-contact-map.liquid` — Google Maps embed (settings: maps_url + address).
- [ ] Create `sections/gpi-page-contact-faq.liquid` — uses `home-faq` pattern (reuse pattern via own section, no shared file).
- [ ] Rewrite template JSON; verify; commit `feat(wave-6): GPI Contact page`.

### Task 6.3: FAQs page

- [ ] Archive `templates/page.template-faqs.json`.
- [ ] Create `sections/gpi-page-faqs.liquid` — same block-based Q&A pattern as `home-faq.liquid` but standalone, with FAQPage JSON-LD.
- [ ] Rewrite template JSON; verify; commit `feat(wave-6): GPI FAQs page`.

### Task 6.4: Policy pages

- [ ] Create `templates/page.policy.json` — single section `gpi-page-policy`.
- [ ] Create `sections/gpi-page-policy.liquid` — reads Shopify policy content (passed via metafield or page body). Sidebar nav of all policies + main content column.
- [ ] Assign template to Shipping, Returns, Privacy, Terms pages via Shopify admin.
- [ ] Verify; commit `feat(wave-6): GPI policy template`.

### Task 6.5: Shop-by-intention page

- [ ] Create `templates/page.shop-by-intention.json`.
- [ ] Create `sections/gpi-page-intention-hero.liquid` — eyebrow + h1 "Shop by intention" + lede.
- [ ] Create `sections/gpi-page-intention-grid.liquid` — 12-tile grid of intentions (Calm, Clarity, Protection, Love, Wealth, Confidence, Healing, Spiritual Growth, Creativity, Grounding, Joy, Strength). Each tile: round illustration frame + intention name + linked to filtered collection or tag page.
- [ ] Verify; commit `feat(wave-6): Shop-by-intention page`.

### Task 6.6: Lookbook page

- [ ] Archive `templates/page.template-lookbook.json`.
- [ ] Create `sections/gpi-page-lookbook.liquid` — full-bleed editorial layout. Block-based: each block is a hero image with optional overlay copy + 1–4 shoppable hotspots (x/y % + product link). Mobile: stacked images w/ caption below.
- [ ] Rewrite template JSON; verify; commit `feat(wave-6): GPI Lookbook page`.

### Task 6.7: Store locator page

- [ ] Archive `templates/page.template-store-locator.json`.
- [ ] Create `sections/gpi-page-locator.liquid` — single store card (address, hours, phone, directions link) + Google Maps embed.
- [ ] Rewrite template JSON; verify; commit `feat(wave-6): GPI Store locator page`.

### Task 6.8: Healing-crystals-guide page (polish)

- [ ] Read existing `templates/page.healing-crystals-guide.json`. Re-point any non-GPI sections to GPI equivalents (or leave as-is if blog-style content). Apply `assets/component-gpi-page.css` for typography polish.
- [ ] Commit `feat(wave-6): Healing crystals guide polish`.

### Task 6.9: Shared page CSS

- [ ] Create `assets/component-gpi-page.css` with shared styles for all page sections (hero treatments, two-col copy/image, value-prop grid, contact form, map embed, policy sidebar).

---

## Wave 7 — Blog & Article

**Goal:** GPI-style blog list + article detail.

**Files:**
- Archive: `templates/blog.json`, `templates/article.json`.
- Create: `sections/gpi-blog-hero.liquid`, `gpi-blog-grid.liquid`, `gpi-blog-newsletter.liquid`
- Create: `sections/gpi-article-hero.liquid`, `gpi-article-body.liquid`, `gpi-article-share.liquid`, `gpi-article-related.liquid`
- Create: `assets/component-gpi-blog.css`
- Create: `snippets/gpi-schema-article.liquid`

- [ ] **Step 7.1: `sections/gpi-blog-hero.liquid`** — featured post (first article in blog) with large image + title + lede + read-time + author.
- [ ] **Step 7.2: `sections/gpi-blog-grid.liquid`** — 3-col grid of remaining articles, each card: image + tag chip + title + excerpt + read-time + date. Category chips at top filter via `?tag=`.
- [ ] **Step 7.3: `sections/gpi-blog-newsletter.liquid`** — inline newsletter capture between posts.
- [ ] **Step 7.4: `sections/gpi-article-hero.liquid`** — full-bleed image + breadcrumb + title (serif 48px) + meta row (author, date, read-time).
- [ ] **Step 7.5: `sections/gpi-article-body.liquid`** — narrow column (max-width 720px) of `{{ article.content }}`, large body type, drop-cap on first paragraph, blockquote + image-with-caption styles. Sidebar (sticky desktop): TOC links auto-generated from h2s.
- [ ] **Step 7.6: `sections/gpi-article-share.liquid`** — share buttons (X, Facebook, WhatsApp, copy-link). Sticky on desktop, inline mobile.
- [ ] **Step 7.7: `sections/gpi-article-related.liquid`** — 3 related articles (same tag or fallback to newest).
- [ ] **Step 7.8: `snippets/gpi-schema-article.liquid`** — Article JSON-LD.
- [ ] **Step 7.9: `assets/component-gpi-blog.css`** — blog grid + card, hero, article body typography, TOC, share buttons.
- [ ] **Step 7.10: Write new `templates/blog.json` + `article.json`**.
- [ ] **Step 7.11: Verify on localhost; commit `feat(wave-7): GPI blog + article pages`**.

---

## Wave 8 — Search

**Goal:** GPI search results page.

**Files:**
- Archive: `templates/search.json`.
- Create: `sections/gpi-search-results.liquid` (composite: header + tabs + grid)
- Create: `sections/gpi-search-empty.liquid`
- Create: `assets/component-gpi-search.css`

- [ ] **Step 8.1: `sections/gpi-search-results.liquid`** — search bar at top showing current query, result count "N results for 'X'", tabbed view (Products / Collections / Articles), grid for active tab using `gpi-product-card` (products) or simpler card snippets. If `search.results_count == 0`, render `gpi-search-empty`.
- [ ] **Step 8.2: `sections/gpi-search-empty.liquid`** — "No matches for 'X'" + 6 intention shortcuts + bestseller rail.
- [ ] **Step 8.3: `assets/component-gpi-search.css`** — search bar XL, tabs, result grid (reuses gpi-product-card styles).
- [ ] **Step 8.4: Write new `templates/search.json`**.
- [ ] **Step 8.5: Verify localhost?q=ruby. Commit `feat(wave-8): GPI search page`**.

---

## Wave 9 — Wishlist (MVP V1)

**Goal:** GPI wishlist page backed by localStorage (from `gpi-wishlist.js` in Wave 1).

**Files:**
- Modify (re-point): `templates/page.template-wishlist.json`
- Create: `sections/gpi-wishlist-hero.liquid`, `gpi-wishlist-grid.liquid`, `gpi-wishlist-empty.liquid`
- Create: `assets/component-gpi-wishlist.css`

- [ ] **Step 9.1: `sections/gpi-wishlist-hero.liquid`** — h1 "Saved for later" + count badge (`<span data-gpi-wishlist-count>0</span>`) + share-list button (copies URL with `?wl=` containing wishlist IDs).
- [ ] **Step 9.2: `sections/gpi-wishlist-grid.liquid`** — empty container `<ul data-gpi-wishlist-list></ul>`. JS reads localStorage, fetches each product via `/products/{handle}.js`, renders cards (reuse `gpi-product-card` pattern via fetch + template stamping) with remove button (×). If count == 0, render `gpi-wishlist-empty`.
- [ ] **Step 9.3: `sections/gpi-wishlist-empty.liquid`** — "Your wishlist is waiting" + 6 intention shortcuts + "Browse bestsellers" CTA.
- [ ] **Step 9.4: Add to `gpi-wishlist.js`**: `renderList(container)` method that hydrates wishlist UI given a container element. Called from wishlist page on load.
- [ ] **Step 9.5: `assets/component-gpi-wishlist.css`** — page hero, grid, empty state.
- [ ] **Step 9.6: Re-point `templates/page.template-wishlist.json`** to order: hero + grid.
- [ ] **Step 9.7: Verify on localhost** — add 3 products to wishlist (click hearts), visit /pages/wishlist, confirm rendering, remove an item, confirm sync.
- [ ] **Step 9.8: Commit `feat(wave-9): GPI wishlist page MVP V1`**.

---

## Wave 10 — Edge pages

### Task 10.1: 404 page

- [ ] Archive `templates/404.json`.
- [ ] Create `sections/gpi-404.liquid` — muted full-bleed gemstone image + "We lost the gem you were looking for" + 3 popular collection cards (Necklaces, Bracelets, Rings) + back-to-home CTA + search bar.
- [ ] Rewrite `templates/404.json`.
- [ ] Verify by visiting `localhost:9292/foo`.
- [ ] Commit `feat(wave-10): GPI 404 page`.

### Task 10.2: Password page

- [ ] Archive `templates/password.json`.
- [ ] Create `sections/gpi-password.liquid` — brand mark center + "Something beautiful is coming" + email capture (uses `gpi-newsletter-form`) + password form below ({% form 'storefront_password' %}).
- [ ] Rewrite `templates/password.json`.
- [ ] Commit `feat(wave-10): GPI password page`.

### Task 10.3: Gift card page

- [ ] Archive `templates/gift_card.liquid`.
- [ ] Rewrite `templates/gift_card.liquid` inline (no JSON): large gift-card visual (QR code from Shopify object `gift_card.qr_identifier_url`), redemption code (large monospace), balance, "Add to Apple Wallet" link if iOS, "Print" button, "Use at checkout" instructions.
- [ ] Verify by appending `?gift_card_id=test` to a known gift card URL.
- [ ] Commit `feat(wave-10): GPI gift card page`.

### Task 10.4: list-collections page

- [ ] Archive `templates/list-collections.json`.
- [ ] Create `sections/gpi-collections-index-hero.liquid` — eyebrow + h1 "All collections" + lede.
- [ ] Create `sections/gpi-collections-index-grid.liquid` — grid of collection cards (image + name + product count + link).
- [ ] Rewrite `templates/list-collections.json`.
- [ ] Commit `feat(wave-10): GPI collections index`.

### Task 10.5: Edge CSS

- [ ] Create `assets/component-gpi-edge.css` — shared styles for 404 + password + gift card.

---

## Wave 11 — Quality gates (before launch)

- [ ] **Step 11.1: Theme check** — run `shopify theme check` in main repo. Expect zero NEW errors on any `gpi-*` file. Fix any flagged issues.
- [ ] **Step 11.2: Section limit audit** — for each JSON template touched, confirm `len(sections)` ≤ 25.
- [ ] **Step 11.3: Image audit** — grep all new sections for `<img` without `width=` or `height=`. Every match is a bug; fix.
- [ ] **Step 11.4: Accessibility pass** — Tab through each new surface on localhost. Every interactive element focusable, focus ring visible, no keyboard traps.
- [ ] **Step 11.5: Lighthouse audit** — run mobile lighthouse on homepage, product, collection, cart. Target ≥80 mobile / ≥90 desktop. Fix any sub-target.
- [ ] **Step 11.6: Token audit** — `grep -rn "^\s*--gpi-" assets/component-gpi-*.css` should show zero matches OUTSIDE `assets/gpi-design-tokens.css` (only `--` is fine if it's a non-gpi prefix).
- [ ] **Step 11.7: Smoke E2E** — homepage → click a product card → product page renders → click ATC → cart page renders → click checkout (verify URL, do not complete).
- [ ] **Step 11.8: Final commit + push**

```
git commit --allow-empty -m "chore(launch): MVP storefront redesign ready for theme push"
git push origin <branch>
```

---

## Spec coverage check

Every spec section maps to tasks:
- Spec §1–3 (goal, approach, constraints) → embedded in this plan header.
- Spec §4 (inventory) → file structure section + per-wave files.
- Spec §5 (naming) → file paths use exact convention.
- Spec §6 (build sequence) → Waves 0–10 match exactly.
- Spec §7 (cross-cutting snippets/JS) → Wave 1, Task 1.1 + 1.4 + 1.5.
- Spec §8 (acceptance criteria) → Wave 11 quality gates.
- Spec §9 (risks) → handled by archive-first + atomic-section discipline + per-wave commits.
- Spec §10 (out of scope) → not in this plan; out-of-MVP items deferred.
- Spec §11 (DoD) → Wave 11.
- Spec §12 (resolved decisions) → embedded in Wave 1 (currency + logo + wishlist).

---

## Execution choice

Two options:

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between, parallel where independent.
2. **Inline Execution** — execute waves sequentially in this session.

Default given user's stated preference for continuous work + token efficiency + live preview review: **Inline Execution, wave-by-wave with localhost checkpoints**.
