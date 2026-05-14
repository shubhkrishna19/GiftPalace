# Gift Palace India — Homepage Conversion Tracker

## Overview
Rebuild of the Gift Palace India homepage into a richer, more persuasive conversion journey while keeping all current homepage assets/sections intact (especially the main hero banner and live-sale banner).

**Goal:** Maximum sales conversion through clarity, trust, richer product context, and best-in-class modern UI/UX.

---

## Status Legend
| Status | Meaning |
|--------|---------|
| Backlog | Not started, prioritized |
| In Progress | Actively being worked |
| Done | Completed and verified |
| QA | Ready for quality assurance |
| Post-launch ideas | Future improvements |

---

## Section Order on Homepage
1. videobanner (DISABLED)
2. image-banner (Pisces Zodiac banner - hero)
3. brand-slider (Shop by product type)
4. apps (ReelUp shoppable videos)
5. product-block (Most gifted right now - necklaces)
6. brand-slider (Shop by intention)
7. image-banner (Live-sale banner)
8. custom-service-block (Trust strip)
9. custom-text-block (Quick paths)
10. instagram (UGC section)
11. apps (Judge.me reviews carousel)
12. home-conversion-intro (Custom)
13. home-meaning-guide (Custom)
14. home-concierge-cta (Custom)

---

## Audit Findings

### Critical Bugs
- [x] Judge.me badge uses product.id instead of product_card_product.id (product-card.liquid:205, product-card-06.liquid:201)
- [x] Syntax error: trailing dot instead of comma in render calls (product-card.liquid:263, product-card-06.liquid:145,257)
- [ ] Homepage 404 error - needs investigation
- [ ] Text below product cards rendering incorrectly - needs investigation

### Design Issues
- [ ] Product card 06 has dated hover-first feel
- [ ] Brand slider grids feel generic
- [ ] Trust strip needs concierge-style CTAs
- [ ] Custom text block (quick paths) needs real shortcut chips
- [ ] Live-sale banner needs surrounding urgency framing
- [ ] Instagram/Judge.me sections need stronger framing

---

## Workstream Backlog

### Phase 1: Critical Bug Fixes
- [x] FIXED - Judge.me badge in product-card.liquid
- [x] FIXED - Judge.me badge in product-card-06.liquid
- [x] FIXED - Syntax error in product-card.liquid
- [x] FIXED - Syntax errors in product-card-06.liquid
- [ ] IN PROGRESS - Homepage 404 error fix
- [ ] IN PROGRESS - Product card text rendering fix
- [ ] QA - Homepage render verification

### Phase 2: Product Card Improvements
- [ ] Add neutral fallback for products missing subtext
- [ ] Improve product-card-06 spacing, hierarchy, CTA
- [ ] Remove dark overlay, improve subtext visual intentionality
- [ ] Ensure mobile product card actions work without hover
- [ ] De-emphasize compare globally

### Phase 3: Homepage Section Enhancements
- [ ] Enhance home-conversion-intro copy and CTAs
- [ ] Refresh brand-slider (Shop by product type) with editorial framing
- [ ] Wrap ReelUp in conversion-focused section
- [ ] Refresh brand-slider (Shop by intention)
- [ ] Reframe live-sale banner with surrounding urgency copy
- [ ] Upgrade trust strip to concierge-style cards
- [ ] Fill custom-text-block with real shortcut chips
- [ ] Upgrade home-meaning-guide
- [ ] Upgrade Instagram section
- [ ] Upgrade Judge.me section wrapper
- [ ] Enhance home-concierge-cta

### Phase 4: Visual and Technical Polish
- [ ] Apply warm premium palette (dark stone + soft ivory + gold)
- [ ] Ensure contrast, focus states, alt text, keyboard nav
- [ ] Test across 375, 768, 1024, 1440px
- [ ] Add scroll-reveal animation to new sections
- [ ] No false urgency or unsupported claims

### Phase 5: Infrastructure Cleanup
- [x] Remove duplicate canonical output (confirmed none currently)
- [x] Fix best-selllers typo in gsf-conversion-pixels.liquid

---

## Test Plan
- [ ] Homepage order and all sections appear
- [ ] Hero and live-sale banner assets intact
- [ ] One visible H1, sensible heading hierarchy
- [ ] Zodiac dates render on applicable product cards
- [ ] Metafield subtexts preserved; missing cards show fallback
- [ ] Product card actions work on mobile
- [ ] ReelUp, Instagram, Judge.me render correctly
- [ ] No horizontal scroll at 375, 768, 1024, 1440px
- [ ] No false urgency or unsupported claims

---

## Post-Launch Ideas
- Add Recently Viewed section
- Gifting quiz interstitial
- Floating WhatsApp chat widget
- Staff picks curated collection
- FAQPage structured data

---

## Technical Notes

### Product Card Subheading Priority
1. Zodiac date range (highest - preserved)
2. Handcrafted benefit text
3. Product metafields
4. Neutral fallback

### Key Files
| File | Purpose |
|------|---------|
| templates/index.json | Homepage template |
| sections/home-conversion-intro.liquid | Custom top conversion hero |
| sections/home-meaning-guide.liquid | Custom guided discovery |
| sections/home-concierge-cta.liquid | Custom closing CTA |
| snippets/product-card-subheading.liquid | Subtext logic |
| assets/component-home-conversion.css | Custom conversion styles |
| assets/home-conversion.js | Scroll reveal |
| sections/product-block.liquid | Product shelf |
| sections/apps.liquid | App embed wrapper |

---

Last updated: 2026-04-16
