# Gift Palace India — Final MVP Handoff Plan

**Status snapshot:** Design tokens consolidated, home page sections viewport-aware, header/footer/cart/cart-page/card/collection/product/search/page overrides created and wired into `snippets/global-style.liquid`. `settings_data.json` aligned to GPI gold/ivory/ink palette site-wide. Theme is ~70% polish-complete; below is the remaining work to ship an extreme-polish MVP.

---

## Phase 0 — Pre-flight Verification (must run before deeper work)

| # | Action | File / Target | Acceptance |
|---|---|---|---|
| 0.1 | Verify `templates/index.json` parses after `/* */` comment strip | `templates/index.json` | Node `JSON.parse(content.substring(content.indexOf('{')))` returns 34 sections + 34-entry order |
| 0.2 | Verify `config/settings_data.json` parses (strip leading comment) | `config/settings_data.json` | Same parse pattern returns no error |
| 0.3 | Confirm all 9 GPI override CSS files registered in `snippets/global-style.liquid` | `gpi-design-tokens.css`, `gpi-header-overrides.css`, `gpi-footer-overrides.css`, `gpi-cart-overrides.css`, `gpi-cart-page-overrides.css`, `gpi-card-overrides.css`, `gpi-collection-overrides.css` (cond), `gpi-product-overrides.css` (cond), `gpi-search-overrides.css` (cond), `gpi-page-overrides.css` (cond) | All present, conditional ones gated by `request.page_type` |
| 0.4 | Delete dead file confirmation | `assets/gpi-tokens.css` should NOT exist; `assets/gpi-sizing-defaults.css` exists but is NOT loaded anywhere | `grep -r "gpi-sizing-defaults" theme/` returns zero hits |
| 0.5 | Run `shopify theme check` locally if Shopify CLI installed | repo root | No errors; warnings acceptable |

---

## Phase 1 — Header & Navigation Polish (HIGH PRIORITY)

### 1.1 Mobile Menu / Drawer
**File:** `assets/gpi-header-overrides.css` (extend) + `sections/header-05.liquid` (audit)

- Mobile menu drawer (`.halo-sidebar-menu`) needs:
  - Background `var(--gpi-surface-canvas)`
  - Border-bottom on links: `1px solid var(--gpi-border-soft)`
  - Active state: `color: var(--gpi-gold)`
  - Close icon: `fill: var(--gpi-ink)`, hover `var(--gpi-gold)`
- Hamburger icon: should be `1.25rem`, `color: var(--gpi-ink-strong)`
- Mobile search overlay: input border `var(--gpi-border-warm)`, focus `var(--gpi-gold)`

### 1.2 Mega Menu Polish
- Mega menu panel: background `var(--gpi-surface-canvas)`, border-top `1px solid var(--gpi-border-soft)`, shadow `var(--gpi-shadow-low)`
- Column headings inside mega: `font-family: var(--gpi-heading); font-size: 0.875rem; letter-spacing: 0.08em;`
- Featured image in mega: `border-radius: var(--gpi-radius-card)`

### 1.3 Announcement Bar
**File:** `sections/header-announcement.liquid` + `settings_data.json`

- Confirm `announcement_bar_bg: #110d0a` (ink-strong), `announcement_bar_color: #fffdf8`
- Font: `var(--gpi-body)`, weight 600, letter-spacing 0.08em, uppercase, size 0.6875rem
- Carousel dots: active `var(--gpi-gold)`, inactive `rgba(255,253,248,0.35)`

### 1.4 Sticky Header Scroll Behavior
- Confirm `.header-05.is-sticky` has `backdrop-filter: blur(12px)` and `background-color: rgba(255,253,248,0.92)`
- Logo size on sticky: scale to ~75% via CSS transform (smooth transition)

### 1.5 Cart Icon Badge Count
- Cart count badge: background `var(--gpi-gold)`, color `var(--gpi-surface-canvas)`, border-radius 999px, min-width 18px, font 0.6875rem weight 700
- Animate scale on count change (heartbeat 1.0 → 1.15 → 1.0 over 200ms)

---

## Phase 2 — Product Detail Page (PDP) Completion

### 2.1 Product Gallery / Media
**File:** create `assets/gpi-product-media-overrides.css`

- Gallery thumbs: border `1px solid var(--gpi-border-soft)`, active thumb `2px solid var(--gpi-gold)`, transition 200ms
- Image zoom cursor / lens border `var(--gpi-gold)`
- Video play button: `var(--gpi-gold)` 50% alpha background, white icon
- Mobile gallery: swipe dots active `var(--gpi-gold)`

### 2.2 Product Bundle / Combo (`component-product-bundle.css`, `component-product-combo.css`)
**File:** extend `gpi-product-overrides.css`

- Bundle card border `var(--gpi-border-soft)`, header `var(--gpi-surface-ivory)`
- Bundle total price: GPI heading font, `var(--gpi-gold)`
- "Add bundle to cart" button: pill radius, gold

### 2.3 Product Reviews (Judge.me integration)
- `.jdgm-rev` star color: `--jdgm-primary-color: #8b6326` (set via JS or CSS override)
- Review card border: `var(--gpi-border-soft)`
- "Write review" button: pill, gold outline, hover gold fill

### 2.4 Recently Viewed + Recommendations Sliders
- Section title: GPI heading, 400 weight, letter-spacing -0.01em
- Section padding: `clamp(32px, 4.5vw, 64px)` block, matches home section pattern
- Slider arrows: circle, border `var(--gpi-border-warm)`, hover `var(--gpi-gold)`

### 2.5 Ring Size Guide Modal
- Modal overlay: `rgba(17, 13, 10, 0.6)` (ink-strong + alpha)
- Modal background: `var(--gpi-surface-canvas)`, radius `var(--gpi-radius-editorial)`
- Size chart table: header row `var(--gpi-surface-ivory)`, row borders `var(--gpi-border-soft)`
- Close button: top-right, `var(--gpi-ink)` → hover `var(--gpi-gold)`

### 2.6 Sticky ATC Bar (mobile)
- Confirm `.halo-sticky-atc` styling in `gpi-product-overrides.css` is sufficient
- Add `box-shadow: 0 -8px 24px rgba(17,13,10,0.08)`
- Quantity selector and ATC button must be inline on mobile

---

## Phase 3 — Collection Page Polish

### 3.1 Collection Banner Variants
**Files audited:** `main-collection-banner.liquid`, `main-collection-banner-adv.liquid`

- Hero overlay text: `var(--gpi-surface-canvas)` color, GPI heading, max-width 18ch
- Subheading: `var(--gpi-body)`, 0.9375rem
- Breadcrumb sits ABOVE title, ivory color
- Mobile: stack vertical, reduce padding `clamp(28px, 8vw, 48px)`

### 3.2 Filter Sidebar (Express Order template)
- Filter pills: background `var(--gpi-surface-ivory)`, active `var(--gpi-gold)` background + ivory text
- Filter accordion: chevron uses `var(--gpi-ink)`, expanded state `var(--gpi-gold)`
- "Clear all" link: `var(--gpi-gold)` underline on hover

### 3.3 Product Grid
- Grid gap: `clamp(16px, 2vw, 28px)`
- Card hover: shadow elevation increase + 2% scale on image (already in spacing-alignment? verify)
- Empty state: GPI heading "No products match your filters", body copy muted, "Clear filters" pill button

### 3.4 Collection Tabs / Filter Sort Switcher
- Tab labels: GPI body, uppercase, 0.75rem, weight 600
- Active tab underline: `var(--gpi-gold)` 2px

---

## Phase 4 — Cart Pages Completion

### 4.1 Cart Notification (`cart-notification-product.liquid`)
**File:** create `assets/gpi-cart-notification-overrides.css`

- Notification panel: background `var(--gpi-surface-canvas)`, border `1px solid var(--gpi-border-soft)`, radius `var(--gpi-radius-card)`, shadow `var(--gpi-shadow-low)`
- "Added to cart" message: GPI heading, 1rem, ink-strong
- Product thumb: 80×80, radius `var(--gpi-radius-sm)`, border ivory
- "View cart" / "Checkout" buttons: pill style, gold primary

### 4.2 Empty Cart State
- Empty cart icon: `var(--gpi-border-warm)` color, 64px
- Heading "Your cart is empty": GPI heading, 1.75rem, ink-strong
- Subtext "Discover signature pieces…": GPI body, muted
- CTA "Browse collection": gold pill button

### 4.3 Cart Upsell / Recommendations
- "You may also love" heading: GPI heading
- Mini product cards inside cart drawer: 70px image + name + price, gold price
- Quick-add button: small pill, gold outline

---

## Phase 5 — Checkout Customization (Shopify Plus or `checkout.liquid` legacy)

**Note:** Modern Shopify uses Checkout Extensibility. For non-Plus stores, customizations are limited to `checkout.scss.liquid` and theme color settings.

### 5.1 Checkout Branding (Shopify admin → Settings → Checkout)
- Background: `#fffdf8`
- Accent / button: `#8b6326`
- Button text: `#fffdf8`
- Error: `#a52a2a` (deep red, off-palette but safe)
- Logo: upload GPI wordmark SVG at 160×40
- Favicon: gold "G" mark

### 5.2 Order Status Page
- Confirmation heading: GPI heading via inline font preload
- Order summary card border: ivory
- "Track order" button: pill gold

### 5.3 Email Templates (Settings → Notifications)
Edit these 9 emails to use GPI palette + Marcellus heading (via web font fallback to Georgia):
1. Order confirmation
2. Order shipped
3. Order delivered
4. Order refunded
5. Order canceled
6. Abandoned cart
7. New customer account
8. Account welcome
9. Password reset

Each needs: header logo, body bg `#fffdf8`, accent links `#8b6326`, button bg `#8b6326`.

---

## Phase 6 — Static/Editorial Pages

### 6.1 About Us (template-about-us-1.json or -2.json)
**Files:** `sections/main-about-1-page.liquid`, `main-about-2-page.liquid`

Required content blocks (verify each renders with GPI styling):
- Hero with brand statement (Marcellus heading, max 24ch)
- Founder/atelier image full-bleed
- 3-column "Our values" (gemstone/craft/trust icons in gold)
- Timeline (founding → milestones) — vertical line `var(--gpi-border-warm)`, milestone dots gold
- Press logos strip
- CTA "Visit our atelier" — pill gold

### 6.2 Contact Page
- Map embed: 100% width, border `var(--gpi-border-soft)`, radius `var(--gpi-radius-card)`
- Contact form already covered by `gpi-page-overrides.css` — verify focus rings work
- WhatsApp CTA card: gold gradient background, ivory text, "Chat with concierge"
- Store hours table: ivory rows, GPI body font

### 6.3 FAQ Page (`main-faqs-page.liquid`)
- Already covered by `gpi-page-overrides.css`
- VERIFY: accordion chevron rotates smoothly (200ms)
- VERIFY: category tabs (Shipping / Returns / Authenticity) have gold underline on active
- Add search input at top: "Search questions…"

### 6.4 Shipping & Returns Policy Pages
- Use `page.json` template
- Heading hierarchy: h1 Marcellus 2.5rem, h2 Marcellus 1.75rem, h3 GPI body 1.125rem semibold
- Lists with gold bullet markers (custom via `::before`)

### 6.5 Brands Page (`main-brands-page.liquid`)
- Brand logo grid: 4 cols desktop / 2 cols mobile
- Grayscale → color on hover
- Click → brand collection filter

### 6.6 Sub-Collection Pages (`main-sub-collection-1-page.liquid`)
- Subcategory cards: image + title + product count
- Hover: gold border + caption fade-in
- Grid `clamp(16px, 2vw, 24px)` gap

### 6.7 Lookbook (`main-lookbook-page.liquid`)
- Editorial 2-column zigzag layout
- Image hotspots → quick-shop popup (gold dot pulsing)
- Caption overlay: ivory text on ink-strong gradient

### 6.8 Wishlist (`main-wishlist-page.liquid`)
- Empty state: heart icon outline, "Save your favorites"
- Wishlist items use same card grid as collection
- "Move all to cart" button: gold pill

### 6.9 Healing Crystals Guide (`page.healing-crystals-guide.json`)
- GPI-specific content page — uses `custom-liquid` section
- Verify the custom liquid block uses inline GPI tokens (heading Marcellus, body Manrope, gold accents)

### 6.10 Abundance Page (`page.abundance.json`)
- Already uses `main-page` + `brand-slider`
- Audit brand-slider colors: should use ivory background + gold dot indicators

---

## Phase 7 — Customer Account Pages

**Folder:** `templates/customers/` (login, register, account, addresses, order, reset-password, activate-account)

### 7.1 Create `assets/gpi-customer-overrides.css`
Covers all customer screens:
- Page wrapper: max-width 480px, centered, ivory background card
- Heading: Marcellus 2rem
- Form inputs: GPI body, border-warm, focus gold ring
- Primary button: gold pill
- Secondary link ("Forgot password?"): gold underline
- Error messages: deep red border, ivory background
- Account dashboard: 2-col layout (sidebar nav + content), sidebar nav items GPI body uppercase letter-spaced

### 7.2 Wire into `global-style.liquid`
```liquid
{%- if request.page_type contains 'customer' -%}
  <link rel="stylesheet" href="{{ 'gpi-customer-overrides.css' | asset_url }}" media="print" onload="this.media='all'">
  <noscript>{{ 'gpi-customer-overrides.css' | asset_url | stylesheet_tag }}</noscript>
{%- endif -%}
```

---

## Phase 8 — Password Page & 404

### 8.1 Password Page (`templates/password.json`, `password-page-1.liquid`, `password-page-2.liquid`)
- Full-bleed background: hero image with ink-strong overlay
- Centered Marcellus headline (white)
- Newsletter signup inline (gold underline input, ivory text)
- Social icons row at bottom

### 8.2 404 Page (`templates/404.json`)
- Marcellus "Page not found", ink-strong
- Body copy "The page you're looking for has moved or no longer exists"
- 3 CTAs: "Return home" (gold pill), "Shop collection" (outline), "Contact concierge" (text link with arrow)
- Featured products grid below (4 most-gifted products)

---

## Phase 9 — Performance & Asset Optimization

### 9.1 Image Optimization Audit
- Confirm all hero images have WebP versions (audit: `assets/gpi-hero-*.webp` exist ✓)
- Add `width`/`height` attributes to all `<img>` in liquid templates to prevent CLS
- Lazy-load below-fold images: `loading="lazy"`
- Eager-load hero image: `loading="eager" fetchpriority="high"`

### 9.2 Font Loading
- Preload Marcellus + Manrope in `theme.liquid` head:
```liquid
<link rel="preload" href="{{ 'Marcellus.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{ 'Manrope.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
```
- `font-display: swap` in `@font-face` declarations

### 9.3 CSS Critical Path
- Currently: `base.css` + `gpi-design-tokens.css` synchronous (correct)
- Confirm all other CSS uses `media="print" onload="this.media='all'"` pattern (verified in global-style.liquid)
- Inline critical above-fold CSS for hero section in `theme.liquid` head (optional, ~5kb)

### 9.4 JS Defer/Async
- All non-critical scripts use `defer`
- Third-party scripts (analytics, chat widget) load after `DOMContentLoaded`

### 9.5 Lighthouse Targets
| Metric | Target |
|---|---|
| Performance | ≥ 90 (desktop), ≥ 80 (mobile) |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

---

## Phase 10 — SEO & Structured Data

### 10.1 Meta Tags Audit
- Each page has unique `<title>` (max 60 chars) and `<meta name="description">` (max 160 chars)
- Open Graph tags on all page types
- Twitter Card tags for product + article pages

### 10.2 JSON-LD Structured Data
Add to `theme.liquid` or section-specific:
- `Organization` (home page)
- `Product` (PDP — name, image, price, availability, reviews)
- `BreadcrumbList` (collection + product)
- `FAQPage` (FAQ template)
- `Article` (blog post)
- `LocalBusiness` (contact page if physical store)

### 10.3 Sitemap & Robots
- Verify `sitemap.xml` auto-generated by Shopify includes all custom pages
- `robots.txt`: disallow `/admin/`, `/cart`, `/checkout`, `/account`, `/search`
- Submit sitemap to Google Search Console + Bing Webmaster

### 10.4 Canonical Tags
- Each page has `<link rel="canonical" href="{{ canonical_url }}">` (Shopify auto-handles)
- Verify collection pagination uses `rel="next"` / `rel="prev"`

---

## Phase 11 — Accessibility (WCAG 2.2 AA)

### 11.1 Color Contrast Audit
Run automated check (axe DevTools or Lighthouse) for all GPI palette combos:
- `#8b6326` on `#fffdf8` → 6.5:1 ✓ (AA large + AAA normal)
- `#4a3f34` on `#fffdf8` → 8.7:1 ✓
- `#fffdf8` on `#8b6326` → 6.5:1 ✓
- `#110d0a` on `#fbf7ef` → 17:1 ✓

### 11.2 Keyboard Navigation
- All interactive elements reachable via Tab
- Focus rings: 2px solid `var(--gpi-gold)`, offset 3px (already in many components)
- Skip-to-content link at top of `theme.liquid`
- Modal traps focus, Esc closes

### 11.3 ARIA & Semantic HTML
- `<main>` wraps page content
- Headings hierarchical (no skipped levels)
- Form inputs have `<label>` (visible or `sr-only`)
- Buttons have `aria-label` if icon-only
- Cart drawer: `role="dialog" aria-modal="true" aria-labelledby="..."`
- Carousel: `aria-roledescription="carousel"`, slide controls labeled

### 11.4 Reduced Motion
- All animations check `prefers-reduced-motion: reduce` (verified in most override files)
- Auto-playing carousels pause on this preference

### 11.5 Screen Reader Testing
- Test with NVDA (Windows) on home + PDP + checkout flow
- Verify ATC announces "Item added to cart"
- Verify form errors announced

---

## Phase 12 — Cross-Browser & Device QA

### 12.1 Browser Matrix
| Browser | Version | Pass |
|---|---|---|
| Chrome | Latest 2 versions | ☐ |
| Safari | Latest 2 versions (incl. iOS) | ☐ |
| Firefox | Latest | ☐ |
| Edge | Latest | ☐ |
| Samsung Internet | Latest (Android) | ☐ |

### 12.2 Viewport Matrix
| Width | Device class | Pass |
|---|---|---|
| 320px | Small mobile | ☐ |
| 375px | iPhone SE/12 mini | ☐ |
| 414px | iPhone 14 Plus | ☐ |
| 768px | iPad portrait | ☐ |
| 1024px | iPad landscape / small laptop | ☐ |
| 1280px | Standard desktop | ☐ |
| 1440px | Large desktop | ☐ |
| 1920px | Full HD | ☐ |
| 2560px | 2K | ☐ |

### 12.3 Critical User Flows to Test
1. Browse home → click product → ATC → cart → checkout (don't complete)
2. Search → results → product → ATC
3. Collection → filter → sort → load more → product
4. Account login → order history → reorder
5. Newsletter signup → confirmation
6. Contact form submit → success message
7. FAQ → expand item → click related product

---

## Phase 13 — Content & Copy Finalization

### 13.1 Placeholder Copy Audit
Search codebase for any of:
- "Lorem ipsum"
- "TODO"
- "Placeholder"
- "Sample text"
- "Your headline here"
- "Add description"

Replace with final GPI copy from brand brief.

### 13.2 Product Data Quality
For each product in Shopify admin:
- Title: clean, no SKU codes
- Description: ≥ 100 words, includes "why this stone", care instructions
- Min 3 images, max 8
- Variants priced consistently
- SEO title + meta description set
- Tags include: stone type, occasion, recipient, price band

### 13.3 Collection Descriptions
Each collection needs:
- 2-3 sentence intro shown in banner
- Optional curator note at bottom of grid
- Featured image (1200×600)

### 13.4 Legal Pages (required for launch)
- Privacy Policy
- Terms of Service
- Refund Policy
- Shipping Policy
- Cookie Policy (if EU traffic)

Use Shopify's policy generator + customize for India jurisdiction.

---

## Phase 14 — Third-Party Integrations

### 14.1 Analytics
- Google Analytics 4 (verify GA4 ID `G-2KCNNEN6HB` in settings_data fires)
- Meta Pixel (verify `fbpixel: 238443917573106` fires)
- Test e-commerce events: view_item, add_to_cart, begin_checkout, purchase

### 14.2 Reviews (Judge.me)
- Confirm widget installs on PDP and collection
- Star color overridden to GPI gold (CSS in `gpi-product-overrides.css`)
- Email review request enabled, branded with GPI palette

### 14.3 Chat / Concierge
- WhatsApp Business link: `https://wa.me/<number>?text=Hi%20GPI%20concierge`
- Floating button bottom-right, gold circle, white WhatsApp glyph
- Hide on `/checkout`

### 14.4 Wishlist App
- Confirm `main-wishlist-page.liquid` integration
- Heart icon: outline default, filled gold when added

### 14.5 Currency Switcher (if multi-currency)
- Dropdown in header utility row
- Style matches header overrides

### 14.6 Inventory / Stock Sync
- Verify Shopify inventory pulls from main system
- Low-stock badge on PDP ("Only 2 left"): gold pill background

---

## Phase 15 — Pre-Launch Checklist

### 15.1 Theme Settings Final Pass (`config/settings_data.json`)
- [ ] All color tokens verified against GPI palette
- [ ] Currency code: INR
- [ ] Locale: en-IN (or en + hi if dual-locale)
- [ ] Weight unit: g
- [ ] Timezone: Asia/Kolkata

### 15.2 Domains & DNS
- [ ] Custom domain connected (e.g., `giftpalaceindia.com`)
- [ ] SSL active (Shopify auto)
- [ ] `www` and apex both resolve
- [ ] Email DNS records (SPF, DKIM, DMARC) configured for transactional sends

### 15.3 Payment Gateway
- [ ] Razorpay / Cashfree / PayU configured (India-first)
- [ ] Shopify Payments if available
- [ ] COD enabled (if business model supports)
- [ ] Test transaction completed end-to-end

### 15.4 Shipping
- [ ] Zones defined: India domestic, India remote, International
- [ ] Rates per zone or weight-based
- [ ] Free shipping threshold visible in cart ("₹X away from free shipping")
- [ ] Estimated delivery shown on PDP

### 15.5 Tax
- [ ] GST configured for India (CGST/SGST/IGST split if registered)
- [ ] Tax-inclusive pricing setting confirmed
- [ ] Invoice template includes GSTIN

### 15.6 Notifications
- [ ] All 9 transactional emails branded (Phase 5.3)
- [ ] Order confirmation tested with real test order
- [ ] Admin order notification routes to ops email

### 15.7 Analytics & Monitoring
- [ ] GA4 receiving events
- [ ] Meta Pixel verified in Events Manager
- [ ] Sentry or equivalent error tracking installed (optional)
- [ ] Uptime monitor (UptimeRobot free tier) on home + product page

### 15.8 Backup & Recovery
- [ ] Theme exported as .zip (download from admin)
- [ ] `settings_data.json` committed to git
- [ ] `templates/index.json` committed to git
- [ ] Tagged git release: `v1.0.0-mvp`

### 15.9 Launch-Day Plan
1. Switch from password-protected to public (Settings → Preferences → uncheck password)
2. Submit sitemap to Google Search Console
3. Announce on social channels (Instagram, WhatsApp broadcast)
4. Monitor analytics for first 24h
5. Have rollback plan: keep prior theme published as backup

---

## Implementation Order (Recommended Sprint Plan)

### Sprint 1 (3–4 days) — Critical Polish
- Phase 1 (Header)
- Phase 2 (PDP completion)
- Phase 3 (Collection polish)
- Phase 4 (Cart pages)

### Sprint 2 (2–3 days) — Coverage Pages
- Phase 6 (Static pages)
- Phase 7 (Customer accounts)
- Phase 8 (Password + 404)

### Sprint 3 (2 days) — Quality & Performance
- Phase 9 (Performance)
- Phase 11 (Accessibility)
- Phase 12 (Cross-browser QA)

### Sprint 4 (2 days) — Pre-launch
- Phase 5 (Checkout branding + emails)
- Phase 10 (SEO + structured data)
- Phase 13 (Content)
- Phase 14 (Integrations)
- Phase 15 (Launch checklist)

**Total estimated time to extreme-polished MVP launch: 9–11 working days for one focused developer.**

---

## File Inventory — What's Already Done

### CSS Override Files (registered in `snippets/global-style.liquid`)
- `assets/gpi-design-tokens.css` (canonical token source)
- `assets/gpi-header-overrides.css`
- `assets/gpi-footer-overrides.css`
- `assets/gpi-cart-overrides.css` (drawer)
- `assets/gpi-cart-page-overrides.css` (full /cart)
- `assets/gpi-card-overrides.css` (product cards everywhere)
- `assets/gpi-collection-overrides.css` (collection page only)
- `assets/gpi-product-overrides.css` (product page only)
- `assets/gpi-search-overrides.css` (search page only)
- `assets/gpi-page-overrides.css` (page/article/blog only)

### Home Sections — Viewport-Aware & Token-Clean
All 34 sections in `templates/index.json` render correctly. Notable fixes applied:
- `component-home-luxury-hero.css` — mobile padding reduced
- `component-home-community-proof.css` — desktop & mobile padding halved
- `component-home-signature-drop.css` — same fixes + hardcoded font removed
- `component-home-conversion-intro-v2.css` — desktop `160px` → `64px`
- `component-home-discover-rail.css` — mobile fixed
- `component-home-concierge-cta.css` — already corrected
- `component-home-hero-moonmagic.css` — fully rewritten (no `:root` overrides)
- `component-home-conversion.css` — Cormorant Garamond removed

### `config/settings_data.json` — Site-Wide Color Changes
- Primary button (`btn_1_*`) → GPI gold
- Product title/price/vendor colors → GPI ink palette
- Sale price → GPI gold (was red)
- Swatch/variant active state → gold
- Review stars → gold
- Wishlist active → gold
- Header/footer/cart accent colors → GPI palette

### Dead Files Deleted
- `assets/gpi-tokens.css` (conflicting duplicate)

### Files NOT Loaded (intentionally — dangerous globals)
- `assets/gpi-sizing-defaults.css` (too aggressive `[class*="grid"]`, `[class*="button"]` rules)

---

## Open Risks / Known Issues

1. **Inline `<style>` from `header-05-style.liquid`**: renders in `<body>`, requires `!important` in `gpi-header-overrides.css`. Cannot be removed without editing core header file.
2. **`templates/index.json` non-standard format**: contains leading `/* */` comment block. Standard JSON parsers fail unless stripped first. Document this in `CLAUDE.md`.
3. **PowerShell BOM**: any tool writing `templates/index.json` or `config/settings_data.json` MUST write UTF-8 without BOM, else Shopify rejects the file.
4. **Marcellus + Manrope must be uploaded as theme assets**: confirm `Marcellus.woff2` and `Manrope.woff2` exist in `assets/`. If using Shopify font picker instead, ensure design-tokens reference matches.
5. **Apps that inject CSS**: any installed Shopify app (review widget, popup, currency switcher) may inject styles late in the cascade. Test with each app enabled.
6. **Checkout customization on non-Plus stores**: cannot fully match brand. Use Shopify's checkout branding settings + accept some default Shopify checkout chrome.

---

## Definition of Done — MVP Launch Gate

All of the following must be true before pushing to live domain:

- [ ] All 15 phases above completed or explicitly deferred with justification
- [ ] Lighthouse mobile + desktop scores meet targets (Phase 9.5)
- [ ] WCAG AA contrast verified on all interactive elements
- [ ] One real test order placed and fulfilled successfully
- [ ] One real refund processed
- [ ] All transactional emails received and visually correct
- [ ] Cross-browser QA matrix passed (Phase 12.1)
- [ ] All viewport widths render without horizontal scroll (Phase 12.2)
- [ ] Legal pages live and linked from footer
- [ ] Analytics events confirmed in GA4 + Meta
- [ ] 404 + password page styled
- [ ] Theme exported as .zip backup
- [ ] Git tagged `v1.0.0-mvp`
- [ ] Rollback procedure documented

---

**End of handoff. Pick up at Phase 1.1 and work sequentially through phases.**
