# Gift Palace India — Full Storefront Redesign Spec

**Date:** 2026-05-14
**Status:** Design draft — pending user review
**Continues:** [2026-04-24-homepage-moonmagic-redesign.md](2026-04-24-homepage-moonmagic-redesign.md)
**Live preview:** localhost:9292 (Shopify dev server, main repo)

---

## 1. Goal

Deliver a deployable MVP of the Gift Palace India Shopify store where **every shopper-facing surface** carries the same MoonMagic-inspired luxury jewelry aesthetic that the homepage already has. Beat CaratLane / BlueStone / Tanishq on visual confidence; beat MoonMagic on conversion clarity for the gemstone-jewelry niche in India.

## 2. Approach (decided)

- **Atomic GPI-native** rewrite for any surface that hasn't been redesigned yet (product, collection, cart, header, footer, customer, content pages, blog, search, 404, password, gift card).
- **Minimal polish only** on already-built homepage sections (`sections/home-*.liquid`). No structural changes; only bug fixes, accessibility, image optimization, content cleanup.
- **One canonical layout per surface.** Halo's spare layout variants (e.g., `product.template-left-thumbs.json`) remain on disk but are not the production target.
- Every new file lives at `sections/gpi-*.liquid` + `assets/component-gpi-*.css`. No new design system; everything consumes `--gpi-*` tokens from `assets/gpi-design-tokens.css`.

## 3. Hard constraints

1. **Shopify section limit:** any JSON template ≤ 25 sections (already hit on homepage; archived 9 disabled sections to `docs/archive/index-disabled-sections.json` on 2026-05-14).
2. **No data loss:** if a section/template/asset is replaced, archive original to `docs/archive/<surface>/<filename>` first.
3. **No reuse across pages, no combining sections** (per user directive while fixing index.json).
4. **Live preview parity:** every change must render correctly on localhost:9292 before commit.
5. **Token discipline:** never redeclare `--gpi-*` outside `gpi-design-tokens.css`; only add new tokens there.
6. **Theme-check clean** on every new file.
7. **Accessibility:** semantic HTML, alt text, focus-visible, prefers-reduced-motion, WCAG AA contrast.
8. **Performance:** lazy-load below fold, srcset/sizes on every `<img>`, preload hero, no render-blocking JS.

## 4. Inventory snapshot (2026-05-14)

### What's built (homepage + foundation)

- `assets/gpi-design-tokens.css` — colors, type, spacing, radii, shadows, motion, primitives (button/card/eyebrow). Comprehensive.
- 26 `sections/home-*.liquid` files + 27 `component-home-*.css` files (live on disk, mostly uncommitted in main).
- 9 GPI hero/portrait/stone images in WebP + PNG fallback (`gpi-hero-*`, `gpi-stone-*`, `gpi-testimonial-*`, `gpi-advisor`, `gpi-artisan`, `gpi-atelier`, plus `gpi-hero-video.mp4`).
- Overrides in place: `gpi-card-overrides.css`, `gpi-cart-overrides.css`, `gpi-cart-page-overrides.css`, `gpi-collection-overrides.css`, `gpi-footer-overrides.css`, `gpi-header-overrides.css`, `gpi-page-overrides.css`, `gpi-product-overrides.css`, `gpi-search-overrides.css`, `gpi-sizing-defaults.css`.
- `snippets/home-structured-data.liquid` (Organization + Website + BreadcrumbList JSON-LD).

### What's missing (the work)

| Surface | Templates that need GPI-native canonical | Sections to create |
|---|---|---|
| **Header** | `layout/theme.liquid` (header rewrite, not template) | `gpi-header.liquid` |
| **Footer** | `layout/theme.liquid` (footer rewrite) | `gpi-footer.liquid` |
| **Product** | `templates/product.json` | `gpi-product-main.liquid`, `gpi-product-gallery.liquid`, `gpi-product-info.liquid`, `gpi-product-tabs.liquid`, `gpi-product-trust-strip.liquid`, `gpi-product-fbt.liquid`, `gpi-product-related.liquid`, `gpi-product-reviews.liquid`, `gpi-product-recently-viewed.liquid` |
| **Collection** | `templates/collection.json` | `gpi-collection-hero.liquid`, `gpi-collection-toolbar.liquid`, `gpi-collection-grid.liquid`, `gpi-collection-empty.liquid`, `gpi-collection-seo-block.liquid` |
| **Cart** | `templates/cart.json` | `gpi-cart-main.liquid`, `gpi-cart-trust.liquid`, `gpi-cart-upsell.liquid`, `gpi-cart-empty.liquid` |
| **Customer** | `templates/customers/*.liquid` (login, register, account, addresses, order, reset_password, activate_account) | `gpi-customer-shell.liquid` (rewrite each customer template inline; no sub-sections needed) |
| **Pages — About** | `templates/page.template-about-us-1.json` (canonical) | `gpi-page-about-hero.liquid`, `gpi-page-about-story.liquid`, `gpi-page-about-values.liquid`, `gpi-page-about-atelier.liquid`, `gpi-page-about-team.liquid`, `gpi-page-about-cta.liquid` |
| **Pages — Contact** | `templates/page.template-contact-us-1.json` (canonical) | `gpi-page-contact-hero.liquid`, `gpi-page-contact-form.liquid`, `gpi-page-contact-channels.liquid`, `gpi-page-contact-map.liquid`, `gpi-page-contact-faq.liquid` |
| **Pages — FAQs** | `templates/page.template-faqs.json` | `gpi-page-faqs.liquid` (reuse `home-faq.liquid` pattern, new section ID) |
| **Pages — Policies** | Shipping, Returns, Privacy, Terms (Shopify-managed) | `gpi-page-policy.liquid` (one section, renders policy content) |
| **Pages — Healing crystals guide** | `templates/page.healing-crystals-guide.json` | Already partially built; polish + GPI-tokenize |
| **Pages — Shop-by-intention** | New `templates/page.shop-by-intention.json` | `gpi-page-intention-hero.liquid`, `gpi-page-intention-grid.liquid` |
| **Pages — Lookbook** | `templates/page.template-lookbook.json` | `gpi-page-lookbook.liquid` |
| **Pages — Store locator** | `templates/page.template-store-locator.json` | `gpi-page-locator.liquid` |
| **Blog list** | `templates/blog.json` | `gpi-blog-hero.liquid`, `gpi-blog-grid.liquid`, `gpi-blog-newsletter.liquid` |
| **Article** | `templates/article.json` | `gpi-article-hero.liquid`, `gpi-article-body.liquid`, `gpi-article-share.liquid`, `gpi-article-related.liquid` |
| **Search** | `templates/search.json` | `gpi-search-results.liquid`, `gpi-search-empty.liquid` |
| **404** | `templates/404.json` | `gpi-404.liquid` |
| **Password** | `templates/password.json` | `gpi-password.liquid` |
| **Gift card** | `templates/gift_card.liquid` | inline rewrite |
| **list-collections** | `templates/list-collections.json` | `gpi-collections-index-hero.liquid`, `gpi-collections-index-grid.liquid` |
| **Wishlist (MVP V1)** | `templates/page.template-wishlist.json` | `gpi-wishlist-hero.liquid`, `gpi-wishlist-grid.liquid`, `gpi-wishlist-empty.liquid` |

Total new sections: **≈45** atomic GPI sections across **~19 surface templates**.

## 5. Section taxonomy & naming

- All new section files: `sections/gpi-<surface>-<role>.liquid`.
- All new CSS: `assets/component-gpi-<surface>-<role>.css`.
- All new snippets: `snippets/gpi-<role>.liquid` (e.g., `gpi-price.liquid`, `gpi-rating-stars.liquid`, `gpi-stone-badge.liquid`, `gpi-trust-cue.liquid`).
- All section schemas must declare `presets` so Shopify theme editor can drop them in.
- Header/footer rewritten as section files (`sections/gpi-header.liquid`, `sections/gpi-footer.liquid`) included from `layout/theme.liquid` via `{% sections 'gpi-header-group' %}` if Shopify section groups are used, else direct `{% section 'gpi-header' %}`.

## 6. Build sequence (conversion priority)

The order matters because (a) you can preview each wave on localhost:9292 before the next begins and (b) earlier work informs reusable snippets that later work consumes.

**Wave 0 — Plumbing (1 commit, no design work)**
- Commit the 620 uncommitted files sitting in main so localhost:9292 reflects the actual built homepage.
- Delete obsolete `gpi-cart-page-overrides.css` if `gpi-cart-overrides.css` supersedes (verify first).
- Verify `gpi-design-tokens.css` is loaded once in `layout/theme.liquid`.

**Wave 1 — Header & Footer** (chrome on every page)
- `gpi-header.liquid`: three-row layout.
  - **Row 1 — Announcement strip:** rotating microcopy (free India shipping above ₹X · BIS hallmarked · 7-day returns) with **currency switcher** anchored right (₹ INR ▾ — dropdown lists INR/USD/GBP/AED/EUR with flag glyphs). Switcher is keyboard-reachable, persists choice in localStorage and `?currency=` URL param, and updates all price snippets via Shopify's `{{ money }}` filter context. **Functional, not decorative.**
  - **Row 2 — Primary bar:** **center-aligned, oversized logo** as the visual anchor — wordmark in serif (Marcellus, 32–44px desktop / 24px mobile), letter-spaced 0.04em, optional 28px gemstone glyph left of the wordmark. Logo dominates the row; nothing else competes with it on this row.
  - **Row 3 — Nav + utility:** primary nav left (Shop ▾ / Collections ▾ / Stones ▾ / Gifting ▾ / Journal / About / Contact) with mega-menus carrying stone-type thumbnails; utility cluster right (search icon → expanding search, **wishlist heart with count badge**, account, cart with count badge). Sticky on scroll; rows 1+3 collapse into one compact bar after 80px scroll while logo remains center.
- `gpi-footer.liquid`: 4-column grid (Shop / About / Help / Connect) + newsletter block + social row + legal strip. Trust badges row (GJEPC, BIS, secure checkout, free India shipping). Secondary currency switcher in footer right column for redundancy.

**Wave 2 — Product page** (highest revenue page)
- Two-column layout above fold: gallery left (sticky on desktop, swipeable on mobile), info right.
- Info column: breadcrumb → title → price + EMI → certification badge row → variant selector → quantity + ATC + wishlist → trust microcopy (free India shipping, BIS hallmark, 7-day returns, certificate of authenticity).
- Healing benefits inline (already exists per recent commits — preserve as snippet `gpi-healing-benefits.liquid` and call from new product section).
- Below fold: tabs (Description / Specifications / Care / Reviews / Shipping & Returns), FBT, related, recently viewed.
- Schema: `Product` + `Offer` + `AggregateRating` JSON-LD.

**Wave 3 — Collection page** (highest entry-from-Google page)
- Collection hero: large background image + breadcrumb + collection title + lede + chip filters (Stone type, Style, Price, Zodiac, Intention).
- Toolbar: sort + view-toggle + result count.
- Grid: 4-col desktop, 3-col tablet, 2-col mobile. Each product card uses `gpi-product-card` snippet (image with hover swap, stone-type badge, title, price, quick-add).
- Pagination: load-more button + cursor (no infinite scroll).
- Bottom SEO block: collection-specific copy + related collections.
- Empty state with intention shortcuts.

**Wave 4 — Cart** (the conversion gate)
- Cart main: line items (image, title, variant, qty stepper, line price, remove), order note, gift wrap option.
- Sticky summary right: subtotal, shipping note (free above ₹X), promo input, checkout CTA, payment-method badges, secure-checkout microcopy.
- Trust strip below: free shipping + returns + certificate + 24x7 support.
- Upsell rail: "Frequently bought with your cart" (FBT engine already exists per commits).
- Empty state: "Your gift palace is waiting" + intention shortcuts.

**Wave 5 — Customer pages**
- Single `gpi-customer-shell.liquid` design language: centered card on ivory canvas, brand mark, form, microcopy, alt-action link.
- Account dashboard: greeting → recent orders → saved addresses → wishlist preview → reorder rail.

**Wave 6 — Content pages**
- About (canonical: template-about-us-1.json): brand hero with `gpi-atelier.webp`, founding story 1989, materials & certification, atelier process, team, CTA back to shop.
- Contact (canonical: template-contact-us-1.json): hero, form with subject dropdown, channels (phone +91 7011099721, WhatsApp, email), map embed, FAQ teaser.
- FAQs: reuse home-faq pattern, full Q&A list, schema FAQPage.
- Policies (Shipping / Returns / Privacy / Terms): unified `gpi-page-policy.liquid` reads Shopify policy content.
- Shop-by-intention: hero + 12-tile intention grid (Calm, Clarity, Protection, Love, Wealth, Confidence, Healing, Spiritual Growth, Creativity, Grounding, Joy, Strength) → each tile links to filtered collection.
- Healing-crystals-guide: polish existing.
- Lookbook: single-image-per-row editorial layout with shoppable hotspots.
- Store locator: address card + map + hours.

**Wave 7 — Blog & Article**
- Blog list: hero with featured post, then 3-col grid, category chips, newsletter inline.
- Article: hero image + reading meta → body → share rail → author bio → related articles → newsletter.

**Wave 8 — Search**
- Results: search bar with current query → result count → tabbed results (Products / Collections / Articles) → grid → empty state with intention shortcuts.

**Wave 9 — Wishlist** (added per user direction; MVP-V1 scope)
- `templates/page.template-wishlist.json` already exists — repoint to GPI sections.
- `gpi-wishlist-hero.liquid`: header with item count, "Saved for later" lede, share-list link (copy URL).
- `gpi-wishlist-grid.liquid`: reuse `gpi-product-card.liquid` snippet with extra `data-wishlist-id`. Each card has remove (×) and move-to-cart actions.
- `gpi-wishlist-empty.liquid`: empty state with intention shortcuts and "Start saving from collections" CTA.
- JS: lightweight `assets/gpi-wishlist.js` using localStorage (no app dependency for MVP); add/remove syncs heart icon state in header + product page + collection cards.

**Wave 10 — Edge pages**
- 404: full-bleed muted hero + "We lost the gem you were looking for" + 3 popular collection cards + back-to-home CTA.
- Password: brand mark + password form + "Coming soon" copy + email capture.
- Gift card: large gift-card visual + redemption code + balance + "Use on checkout" CTA.

## 7. Cross-cutting work

- **Snippets to extract** (consumed by multiple waves):
  - `gpi-product-card.liquid` (used in collection, search, related, FBT, recently-viewed, cart upsell, intention pages)
  - `gpi-price.liquid` (price + compare-at + EMI line)
  - `gpi-rating-stars.liquid`
  - `gpi-stone-badge.liquid` (stone type chip)
  - `gpi-trust-strip.liquid` (4-icon row)
  - `gpi-breadcrumbs.liquid`
  - `gpi-newsletter-form.liquid`
  - `gpi-image-responsive.liquid` (srcset/sizes/lazy with explicit dimensions)
  - `gpi-cta-link.liquid`
  - `gpi-currency-switcher.liquid` (dropdown with flag glyphs; reads/writes localStorage + URL param; rendered in header announcement strip + footer)
  - `gpi-wishlist-heart.liquid` (toggle button with optimistic UI; reads/writes localStorage list; shared across product card, product page, header count badge)
- **Cross-cutting JS** (`assets/gpi-*.js`):
  - `gpi-currency.js` — listens to switcher events, swaps prices via Shopify Markets / `?currency=` round-trip, persists state.
  - `gpi-wishlist.js` — localStorage-backed wishlist with custom events `gpi:wishlist:add` / `gpi:wishlist:remove` so header badge and all heart buttons stay in sync.
- **Schema markup snippets:**
  - `gpi-schema-product.liquid`
  - `gpi-schema-breadcrumb.liquid`
  - `gpi-schema-article.liquid`
  - `gpi-schema-faqpage.liquid` (already in home-faq)
- **Asset additions** (placeholders; admin can swap):
  - 12 intention tile illustrations
  - Lookbook hero photography (3-5 images)
  - About-page atelier & team photography (use `gpi-atelier.webp`, `gpi-artisan.webp` as starters)
  - 404 hero (muted gemstone close-up)

## 8. Acceptance criteria

Per surface, the wave is "ready to ship" only when:

1. Surface renders on localhost:9292 without console errors.
2. `shopify theme check` returns no new errors against the new files.
3. Section limit ≤ 25 in every JSON template touched.
4. All `<img>` have `width`, `height`, `loading`, `srcset` when ≥ 600px wide.
5. Keyboard navigation works (tab order makes sense, all interactive elements focusable, focus ring visible).
6. Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text.
7. Lighthouse mobile ≥ 80, desktop ≥ 90 on the surface.
8. Mobile renders cleanly at 320, 375, 414, 768.
9. JSON-LD validates against schema.org for surfaces that emit it.
10. No `--gpi-*` token redeclared outside `gpi-design-tokens.css`.

## 9. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Halo theme JS hooks break when we replace `main-*` sections | Atomic rewrite keeps Halo files untouched; we only swap the section references in `templates/*.json`. Halo JS coupled to specific class names; we attach those classes to GPI sections where the JS adds value (cart drawer, ajax pagination). |
| 25-section-limit hit on heavy templates (product, collection) | Bake variant pickers, gallery, trust strip into single composite sections rather than block-per-feature. |
| Customer template overrides are Liquid-only (no JSON) | Rewrite `templates/customers/*.liquid` inline; can't use sections. Style with `component-gpi-customer.css`. |
| Halo cart drawer JS conflicts with new cart page | Keep Halo drawer for header cart icon; new cart page replaces only `main-cart` template. |
| Uncommitted main-directory state (620 files) makes branch hygiene messy | Wave 0 is a single commit that stages everything sitting on disk; from there, every wave is one focused commit. |
| Image weight from new GPI photography | Already shipped as WebP + PNG fallback; new images must follow same pattern. |
| Theme editor breakage when section presets change | Every section schema has a stable `id`; only add settings, never remove without migration. |

## 10. Out of scope for MVP

- Compare-product redesign (kept as-is)
- Multi-language theme adjustments (multi-currency IS in scope per user; see Wave 1)
- Apps integrations (Judgeme reviews UI, etc.) beyond ensuring they don't break
- A/B testing harness
- Replacing `main-portfolio-*`, `main-brands-page`, `main-bulk-editor` (low-traffic pages keep Halo defaults)
- Halo template variants we aren't canonicalizing (left on disk for one quarter post-launch per user direction, then audited and deleted)

## 11. Definition of done for MVP launch

- All Waves 0–10 shipped to localhost:9292 and user-approved.
- Every shopper-facing template references at least one `gpi-*` section.
- `shopify theme push` succeeds without section-limit or schema errors.
- A single end-to-end smoke test passes on a real product: homepage → collection → product → cart → checkout → account.
- All commits on `main` (or merged via PR per user's branch preference).

## 12. Resolved decisions (2026-05-14)

- Halo template variants not canonicalized: **keep on disk for one quarter post-launch, then audit and delete.**
- Wishlist page redesign: **in MVP V1** (Wave 9; localStorage-backed, no app dependency).
- Multi-currency: **functional, prominent placement.** Lives in announcement-strip right (primary) + footer right column (secondary). NOT top-left. Persists in localStorage + URL param. Currencies: INR / USD / GBP / AED / EUR.
- Logo presentation: **center-aligned, oversized serif wordmark** (Marcellus 32–44px desktop, 24px mobile, 0.04em letter-spacing) with optional 28px gemstone glyph. Dominates the primary header row; nothing else competes with it visually.
