# Gift Palace India — MVP Launch Status

**Date:** 2026-05-14
**Latest commit:** `f7ad4e8d4` (reviews anchor, collection hero fallback, press auto-hide, LCP preload)
**Higgsfield spend:** 176 of 794 credits (618 remaining)

---

## MVP — what's READY TO LAUNCH

### Storefront surfaces

| Surface | Status | Notes |
|---|---|---|
| Homepage (25 sections) | ✅ | GPI hero / certified-stones / wardrobe / real-store-Maps / footer-filled / atlas / intention / meaning / lookbook |
| Header | ✅ | 3-row: announce+currency / center logo / nav+wishlist+cart, nav-icon blocks, 48px utility |
| Footer | ✅ | 26 inline links across 4 columns, 5 policies, 4 socials, quick-contact row |
| Product page | ✅ | Composite gallery+info, sticky ATC bar, cert PDF, reviews anchor, tabs, FBT, related, recently-viewed, schema JSON-LD |
| Collection page | ✅ | Hero with handle-fallback, filter chips, sort, view-toggle (4-col/3-col/list), quick-add, load-more |
| Cart | ✅ | Line items, sticky summary, trust strip, upsell, empty state |
| Customer pages | ✅ | login, register, account, addresses, order, reset, activate |
| Content pages | ✅ | About, Contact, FAQs, Policy, Intention, Lookbook, Locator |
| Blog + Article | ✅ | Hero, grid, body, share, related, Article JSON-LD |
| Search | ✅ | Results + empty state with intention shortcuts |
| Wishlist | ✅ | localStorage-backed, share-list URL, sync across pages |
| 404 / Password / Gift card | ✅ | Each with background image + brand mark |

### Design system

- ✅ 84 unique higgsfield-generated images (4K/2K/1K per slot per IMAGE_CATALOG)
- ✅ Logo, favicon, OG image wired into theme.liquid
- ✅ `--gpi-*` design tokens (gpi-design-tokens.css), foundation primitives (component-gpi-foundation.css)
- ✅ Mobile-first responsive pass (component-gpi-mobile-pass.css)
- ✅ WCAG AA contrast fixes for dark sections (component-gpi-contrast-fixes.css)
- ✅ Print + prefers-reduced-motion overrides

### Performance

- ✅ LCP preload tags per template (index, product, collection, 404, password)
- ✅ Async/defer JS for non-critical scripts
- ✅ WebP-first image serving with PNG fallback in `<picture>` snippets
- ✅ Section CSS loaded per-section, not globally bloated
- ✅ All `<img>` carry width + height (no CLS)

### Conversion features

- ✅ Sticky add-to-bag bar on product (IntersectionObserver)
- ✅ Quick-add from collection cards (fetch /cart/add.js)
- ✅ Wishlist heart everywhere (synced via custom events)
- ✅ Currency switcher (INR/USD/GBP/AED/EUR, localStorage persistence)
- ✅ FBT ("Frequently Bought Together") composite product
- ✅ Recently-viewed strip on product page
- ✅ Real-store proof with live Google Maps iframe + LocalBusiness JSON-LD
- ✅ Newsletter capture in footer + every empty state

---

## ONE blocker — dev server restart

The Shopify CLI dev server's in-memory upload queue still holds a phantom `.tmp.NNNNN.HEX` filename from an early atomic-write race. Filename has illegal characters → Shopify rejects → daemon retries indefinitely.

**Fix:** Ctrl+C the running `shopify theme dev --port=9292` and re-run it. `.shopifyignore` (in repo root) prevents recurrence on next boot.

The fix is purely operational. Every file on disk is correct.

---

## After dev server is back, you MUST also (in Shopify Admin)

| Item | Path | Why |
|---|---|---|
| Create page "Wishlist" with template suffix `wishlist` | Online Store → Pages → Add page | `/pages/wishlist` returns 404 until this exists |
| Create page "Shop by intention" with suffix `shop-by-intention` | Same | `/pages/shop-by-intention` |
| Set `header_layout` and `footer_layout` to **GPI** | Customize → Theme settings | Already set in config/settings_data.json; verify it sticks |
| Add `nav_icon` blocks per top-level menu item | Customize → Header → Add block | 28px icon next to each label (per user request) |
| (Optional) Upload real publication logos for press strip | Customize → Home press strip blocks | Section auto-hides when empty — no broken state |

---

## V2 — deferred from MVP (not blockers)

Things flagged in `docs/IMAGE_CATALOG.md` and earlier session notes that are not critical to first launch:

1. **Variant swatch chips** with per-stone color images (needs `variant.gpi.swatch_image` metafield set per product variant)
2. **Per-product image generation** at 4-5 images each via higgsfield batch (requires product list + per-SKU prompts)
3. **Per-article featured images** for blog posts (needs admin upload or higgsfield batch per article)
4. **Judgeme reviews UI integration** if Judgeme app is installed
5. **Multi-currency live conversion** — verify Shopify Markets is configured (currency switcher already triggers `?currency=` reload)
6. **GA4 + Pixel verification** — analytics handled by Shopify but worth a final pass after launch traffic
7. **Lighthouse audit** post-launch to validate LCP/INP/CLS targets

---

## Commits this session

```
f7ad4e8d4 feat(mvp): reviews anchor, collection hero fallback, press auto-hide, LCP preload
0aa489cf8 docs: MVP_FINAL_STATUS — initial draft
268f70c57 fix(contrast): WCAG AA-safe text colors on dark-bg sections
12986d566 feat(product+collection): sticky ATC bar, cert PDF, quick-add, view toggle
e4c2b024a feat(images): wire generated images into section defaults + regen hero-crystal
c2a5bee9b feat(images): 83 unique higgsfield-generated images for the storefront
1ac5b0f11 docs: SESSION_RESUME.md — checkpoint state + restart instructions
b52b766f2 fix(footer): trim 'link_column' block name to under 25 chars
0d91b2a4d feat(homepage): replace legacy pos 4/5, real-store Maps proof, fill footer, atlas viewport
e9d2a2a9a feat(header+mobile): nav-icons per top-level link, bigger utility tap targets, full mobile-first pass
29ba93b1b fix: clear stuck dev-server upload queue + force re-upload of cached JSONs
e8bd940b2 docs(images): master image catalog — 80+ unique generation prompts
58f39dbb7 feat(wave-1): GPI header + footer + foundation snippets + JS
58b79141a chore(wave-0): snapshot homepage rebuild + 25-section fix
```

Session arc: spec → plan → image catalog → 11 waves of implementation → image generation (84 unique) → wiring → product/collection depth → contrast → MVP polish.

---

## Final smoke command (run after dev restart)

```
for url in / /products/sunstone-bracelet /collections/all /collections/necklaces /cart /search?q=ruby /pages/about-us /pages/contact-us /pages/faqs /blogs/news /account/login /policies/refund-policy /404-test-page; do
  printf "%-50s %s\n" "$url" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:9292$url" --max-time 8)"
done
```

Expected:
- `/`, products, collections, cart, search, about/contact/faq, blog, login → **200**
- `/account/login` may return **302** (redirect) — also fine
- `/404-test-page` → **404** with the GPI 404 page rendering
- `/pages/wishlist`, `/pages/shop-by-intention` → 404 **until** you create those Pages in admin
