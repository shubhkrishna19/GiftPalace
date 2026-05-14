## Homepage Broken Diagnosis & Comprehensive Fix Plan

**ROOT CAUSE:** The templates/index.json file references 10 section types, but these section implementation files either don't exist in the sections/ directory or aren't being properly loaded by the Shopify dev server.

**Current State:**
- templates/index.json: Properly structured with 10 sections in correct order
- sections/home-featured-browse.liquid: EXISTS (confirmed read earlier)
- Other sections referenced: home-hero-moonmagic, home-trust-pillars, home-discover-rail, home-testimonials, home-conversion-intro, home-meaning-guide, home-faq, home-newsletter-signup, home-concierge-cta
- Status: UNKNOWN if these files exist in sections/ directory; glob search returned no results earlier

**Why Homepage Only Shows Header/Footer:**
When Shopify's theme engine loads templates/index.json, it tries to render each section by looking for corresponding .liquid files in the sections/ directory. If files are missing, that section fails silently and renders nothing.

---

## Step-by-Step Fix Plan

### Phase 1: Restore Missing Sections (Immediate Priority)

**ACTION 1:** Check worktree sections/ directory at C:\Users\shubh\.claude\worktrees\musing-volhard-431fec\sections\ to see if section files exist there but weren't synced to main.

**ACTION 2:** If files exist in worktree but not in main:
- Copy all home-*.liquid section files from worktree/sections/ to main worktree/sections/
- Commit with message: "fix: sync section implementations from feature branch"
- Push to origin main

**ACTION 3:** If files don't exist anywhere:
- Check docs/SECTIONS_TO_WIRE.md for section definitions and implementation details
- Verify which agents built which sections (Gemini-A: Trust Pillars, Gemini-B: Testimonials, Gemini-C: FAQ, Gemini-D: Newsletter)
- These sections should have been created during earlier work but may not have been committed

**ACTION 4:** Restart dev server on port 9292 after files are restored

**ACTION 5:** Test homepage rendering - all 10 sections should now load

---

## Completed Work Summary (Sessions 1-Previous)

✅ **Setup & Infrastructure**
- Dev server configured on port 9292
- Git worktree created (musing-volhard-431fec branch)
- Theme structure aligned with Shopify requirements

✅ **Homepage Foundation**
- templates/index.json: Created with 10-section layout
- Section order: hero → trust pillars → discover → featured browse → testimonials → conversion intro → meaning guide → FAQ → newsletter → concierge CTA
- Proper section references and block_order defined

✅ **Section Implementations**
- home-featured-browse.liquid: Complete with product grid, badges, trust cue, view-all link
- home-structured-data.liquid: Fixed Liquid syntax for JSON-LD schema
- Section stubs created for: trust-pillars, testimonials, faq, newsletter-signup, hero-moonmagic, discover-rail (empty but registered in index.json)

✅ **Fixes Applied**
- Removed password.liquid (duplicate with password.json, resolved Shopify filename conflict)
- Fixed home-structured-data.liquid Liquid-in-JSON concatenation syntax
- Synced working files from worktree to main branch

✅ **Documentation**
- Created SECTIONS_TO_WIRE.md tracking wired sections
- HOMEPAGE_REBUILD_COORDINATION.md with full section manifest
- Status documents for build progress

---

## Remaining Work (Detailed Plan for Next Developer)

### Tier 1: Critical (Blocks Homepage Rendering)
**T-00: Restore & Verify Sections**
- Restore missing section files to sections/ directory
- Verify all 10 sections render on homepage
- Smoke test: homepage loads with header, all 10 sections, footer

### Tier 2: Section Implementation Completion
**T-01: Hero Section (home-hero-moonmagic.liquid)**
- Implement hero image + overlay
- Primary CTA ("Shop bestselling pieces")
- Secondary CTA ("Browse by intention")
- Responsive scaling for mobile/tablet/desktop
- Dependencies: asset/hero image, color tokens

**T-02: Discover Rail (home-discover-rail.liquid)**
- Horizontal scrolling rail of category cards
- Tap/swipe navigation
- 6-8 category cards minimum
- Dependencies: asset/category images, collection links

**T-03: Trust Pillars (home-trust-pillars.liquid)**
- 3-column layout on desktop, 1 column mobile
- Icon + text + CTA per pillar
- Semantic HTML headings
- Dependencies: pillar icons, content copy

**T-04: Testimonials (home-testimonials.liquid)**
- 3-4 customer testimonials carousel
- Star rating + author name + text
- Autoplay 5s, manual swipe/click navigation
- Dependencies: testimonial content, avatar images

**T-05: FAQ Section (home-faq.liquid)**
- Accordion component
- 6-8 common questions
- Smooth expand/collapse animation
- Dependencies: accordion styling, FAQ content

**T-06: Newsletter Signup (home-newsletter-signup.liquid)**
- Email input + CTA button
- Success/error messaging
- Backend integration with email service
- Dependencies: email service API, form validation

### Tier 3: Content & Polish
**T-07: Conversion Intro Section (home-conversion-intro.liquid)**
- 3 trust bullets + 3 proof items + 8 shortcuts
- Already designed in index.json but .liquid not created
- Desktop: side-by-side layout; Mobile: stacked
- Dependencies: shortcut links verified, content copy

**T-08: Meaning Guide (home-meaning-guide.liquid)**
- 6 guide cards (Intention, Zodiac, Crystals, Necklaces, Mala, Gemstones)
- Card image + kicker + title + description + CTA
- Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
- Dependencies: card images, collection links

**T-09: Concierge CTA (home-concierge-cta.liquid)**
- Final conversion section with 3 benefit points
- Primary CTA ("Shop gift-ready picks")
- Secondary CTA ("Call for assistance" → tel:+917011099721)
- Dependencies: styling, phone number verified

### Tier 4: Advanced Features
**T-10: Image Optimization**
- AVIF/WebP with fallbacks for all hero/section images
- Explicit width/height on all images
- Loading="lazy" for below-fold sections
- Source maps and optimization report

**T-11: SEO & Accessibility**
- h1 → h2 hierarchy verification
- ARIA labels on all interactive elements
- Color contrast audit (WCAG AA minimum)
- Meta tags, OG tags, structured data validation

**T-12: Performance & Analytics**
- Lighthouse audit (target: 90+ on desktop, 80+ on mobile)
- Core Web Vitals validation
- Google Tag Manager + conversion tracking
- Facebook Pixel integration verification

### Tier 5: Handoff & Testing
**O-01: Full Build Verification**
- Dev build completes without errors
- All 10 sections render
- Mobile responsive check (320, 375, 768, 1024, 1440)
- Cross-browser test (Chrome, Firefox, Safari)

**O-02: Shopify Theme Upload**
- Upload theme to Shopify store
- Verify sections appear in theme editor
- Test customization via Shopify admin UI

**O-03: Final Smoke Test**
- Homepage loads in < 3 seconds
- No console errors
- All CTAs link to correct destinations
- Form submissions work
- Analytics fire correctly

---

## Current Blockers → Unblock Path

**IMMEDIATE BLOCKER:** Section files missing from sections/ directory
- **Unblock:** Check worktree, sync files, or rebuild from documentation
- **Time to unblock:** 5-10 minutes (if files exist in worktree) or 30 minutes (if rebuild needed)
- **Risk:** None if syncing; low if rebuilding from documented spec

**NEXT BLOCKER:** Section files exist but not fully implemented (likely)
- **Signs:** Homepage renders but sections have placeholder content
- **Unblock:** Implement remaining sections based on T-01 through T-09 plan
- **Time estimate:** 2-4 hours total, 20-30 min per section
- **Sequence:** Start with T-01 (hero), then T-02 (discover), then remaining in tier order

---

## Handoff Checklist for Next Developer

- [ ] Restore section files from worktree or documentation
- [ ] Verify homepage renders with all 10 sections visible
- [ ] Restart dev server, confirm no errors
- [ ] Review HOMEPAGE_REBUILD_COORDINATION.md for section specs
- [ ] Implement sections in tier order (critical first)
- [ ] Test each section as you go (screenshot + console check)
- [ ] Run npm test after each major section
- [ ] Document any blockers or missing dependencies
- [ ] Push commits to origin main with conventional commit messages
- [ ] Final smoke test before marking complete

---

## Key Files to Know

- **templates/index.json** — Homepage structure definition (DO NOT modify order without testing)
- **sections/home-*.liquid** — Individual section implementations (these are the priority)
- **snippets/home-structured-data.liquid** — JSON-LD schema for SEO
- **layout/theme.liquid** — Master template that renders sections
- **docs/SECTIONS_TO_WIRE.md** — Section wiring status and history
- **docs/HOMEPAGE_REBUILD_COORDINATION.md** — Full section manifest and specs

---

## 2026-05-08 Codex Recovery Update

Current main theme recovery status:
- Restored homepage remains capped at Shopify's 25-template-section limit.
- Wired the three recovered missing homepage sections into `templates/index.json`:
  - `home_concierge_booking` (`sections/home-concierge-booking.liquid`)
  - `home_origin_story` (`sections/home-origin-story.liquid`)
  - `home_gemstone_atlas` (`sections/home-gemstone-atlas.liquid`)
- Removed only the disabled legacy `videobanner_6dzw9q` entry from `templates/index.json` to stay at 25 sections. No section or asset files were deleted.
- Added GPI token compatibility aliases in `assets/gpi-design-tokens.css` so recovered sections using `--gpi-color-*` variables render with the active design-system colors.
- Added local asset fallbacks in `sections/home-gemstone-atlas.liquid` so `gpi-stone-*.webp` graphics render even when Shopify image pickers are empty.
- Tightened restored section CSS:
  - `assets/component-home-gemstone-atlas.css`: premium rounded cards, mobile horizontal cards, no hover-only mobile dependency.
  - `assets/component-home-origin-story.css`: editorial image framing, mobile copy/image flow.
  - `assets/component-home-concierge-booking.css`: stronger advisor CTA card, mobile touch-safe CTAs.
  - `assets/component-home-conversion.css`: homepage product-card gallery images now fill frames with cover behavior.

Targeted validation completed:
- `templates/index.json` parses.
- Homepage template has 25 sections and 25 order entries.
- All referenced section files exist.
- New section schema names are under Shopify's 25-character limit.
- Touched CSS files have balanced braces.

Manual localhost review still needed after user restarts/keeps dev server running:
- Full homepage visual scroll on desktop and mobile.
- Product-card image cropping quality after cover behavior.
- New atlas/origin/concierge section spacing against the surrounding sections.
- Footer mobile spacing/text fit remains a separate review item if still visible.

---

## 2026-05-11 Development Status And Completion Standards

### Current Development Progress
- Homepage structure is recovered and valid at the Shopify template level: 25 sections in `templates/index.json`, 25 entries in order, no missing section files.
- Active homepage has 16 visible/rendering sections plus disabled legacy/app sections kept in the template for now.
- Recovered visual system is partially integrated: GPI token aliases, generated local WebP graphics, recovered homepage sections, trust proof, store proof, origin story, concierge booking, gemstone atlas, shop shortcuts, signature drop, community proof.
- The build is not yet final-polished. It is in recovered MVP plus visual-improvement stage.

### Current Active Homepage Sequence
1. `home_luxury_hero` - premium hero with generated local visuals.
2. `home_conversion_intro` - second-section conversion/trust intro, still needs final visual review.
3. `brand-slider` - category/intention rail from existing theme, needs final consistency review.
4. `product-block` - existing product grid, image composition recently adjusted and needs visual QA.
5. `home_trust_proof` - GJEPC/100K/store/support trust section.
6. `home_concierge_cta` - guided buying CTA.
7. `home_concierge_booking` - recovered advisor/contact section.
8. `home_store_proof` - Chanakyapuri/GJEPC proof with images.
9. `home_origin_story` - recovered brand/store heritage section.
10. `home_meaning_guide` - shop by intention section.
11. `home_gemstone_atlas` - Navratna/gemstone meaning section with local fallback images.
12. `home_signature_drop` - curated product edit.
13. `custom-service-block` - service/trust strip from base theme.
14. `home_shop_shortcuts` - category shortcut cards.
15. `home_community_proof` - customer proof/reviews visual section.
16. Judge.me app section.

### Remaining Design Work To Reach Flawless State
- Top-to-bottom visual QA on desktop and mobile: spacing, hierarchy, image crops, section transitions, and repeated claims.
- Decide which recovered/legacy sections should stay active. Current homepage may still feel long and slightly stitched together.
- Harmonize type scale across hero, conversion intro, trust sections, product rails, and footer.
- Product-card final pass: mobile image crop, product title/subtext rhythm, price/rating spacing, hover fallback on touch devices.
- Footer final pass: mobile spacing/text wrapping/contact button layout.
- Navigation/page alignment: navbar labels must map to matching pages and section language.
- Trust/support page-family polish: authenticity, consultation, reviews/proof, shipping/support pages need final copy/design/CTA alignment.
- Collection/PDP parity: homepage design system must be reflected in collection cards and product pages.
- Performance pass: WebP image sizes, lazy loading, no layout shift, no unnecessary disabled section bloat.
- Accessibility pass: 44px touch targets, visible focus states, contrast, no hover-only critical interactions, readable mobile body text.

### Engineering Standards Required Before Final Push
1. Discovery: read `FINAL_HANDOFF.md`, `templates/index.json`, active section files, and touched CSS before editing.
2. Design-system discipline: use `assets/gpi-design-tokens.css` variables and existing GPI typography/colors; avoid one-off palettes.
3. Section isolation: edit one section/component at a time where possible; avoid changing `templates/index.json` unless section order/wiring truly requires it.
4. Shopify limits: keep homepage at max 25 sections; schema names max 25 chars for custom sections; no `.css` files inside `sections/`.
5. Responsive standard: every section must be checked at desktop, tablet, and mobile widths.
6. Interaction standard: hover effects cannot hide essential content on mobile; touch controls must be obvious and tappable.
7. Image standard: product visuals should either fill frames intentionally or use contain only where cropping harms product clarity; no random tiny floating thumbnails.
8. Content standard: no placeholder/guidance copy. Every section must sell product quality, GJEPC lab-tested confidence, Chanakyapuri store trust, 100K customer proof, or buying support.
9. Validation standard: JSON parse, section existence scan, schema scan, CSS brace check, localhost render check, upload-error scan.
10. Final QA standard: visual screenshots, CTA click-path review, console check, theme check, and only then push/deploy with user approval.

### Immediate Next Work Queue
1. Run localhost visual QA when server is available.
2. Fix hero and second-section hierarchy if they still feel uneven.
3. Finalize product-card image crop rules section by section.
4. Tighten homepage section spacing and remove/disable any section that weakens the premium flow.
5. Polish footer mobile spacing.
6. Align navbar destinations and trust/support pages.
7. Clean git state: decide which recovered files are kept, stage only intended files, leave unrelated legacy changes alone.

### Current Risk Notes
- Worktree contains many untracked recovered files. Do not delete them until the final retained section list is decided.
- `templates/index.json` is collision-prone in multi-agent work; coordinate before changing section order.
- Full repo `theme check` may show legacy noise; use targeted validation first, then final theme check near push.

### 2026-05-11 Codex Implementation Pass 2

Completed in this pass:
- Rebuilt `sections/home-conversion-intro.liquid` structure so the second section has a real premium two-column decision layout instead of loose stacked blocks.
- Replaced `assets/component-home-conversion-intro.css` with live-markup-matching styles: concise heading, trust proof strip, clickable decision cards, CTA row, mobile swipe chips, and touch-safe behavior.
- Fixed `home-conversion-intro` schema so `proof_item` blocks officially support saved `link` settings from `templates/index.json`.
- Cleaned `assets/component-home-luxury-hero.css` by removing decorative glyph/orb noise and replacing the eyebrow symbol with a minimal line treatment.
- Added contained footer mobile polish in `assets/section-footer.css` for layout 01 footer: better contact text wrapping, footer row spacing, mobile accordion touch targets, and GPI token-aligned colors.

Targeted validation:
- `templates/index.json`: 25 sections, 25 order entries, no missing order references.
- `sections/home-conversion-intro.liquid`: schema parses and saved block settings map cleanly.
- CSS brace check passed for `section-footer.css`, `component-home-conversion-intro.css`, `component-home-luxury-hero.css`, and `component-home-conversion.css`.

Still needs localhost visual review:
- Hero visual balance after removing decorative elements.
- Second conversion section desktop/mobile rhythm.
- Footer mobile contact pill and link-list accordion behavior.
- Product-card image crop quality after gallery-style cover behavior.

---

# AUTHORITATIVE MASTER HANDOFF - READ THIS FIRST

Updated: 2026-05-12  
Project: Gift Palace India Shopify theme rebuild  
Primary workspace: `C:\Users\shubh\Downloads\giftpalaceindia`  
Current master handoff file: `FINAL_HANDOFF.md`  
Note: `docs/ai-prompts/GPI_FINAL_REBUILD_FRESH_WINDOW_MASTER_PROMPT.md` was not present in this checkout during the 2026-05-12 pass, so this file is the current source of truth.

## Mission

Take the recovered Gift Palace India Shopify theme from "structurally restored MVP" to a polished, premium, conversion-focused gemstone storefront.

The target design direction is:
- Minimal, product-forward, premium, and concise like Moon Magic.
- Strong Indian-market trust psychology like World of Oorja and Shubh Gems.
- Customer-facing selling material only. Do not use placeholder/guidance copy.
- Every section must prove one of these ideas: product quality, GJEPC lab-tested gemstone confidence, 100K customer trust, Chanakyapuri offline store presence, gifting clarity, human buying support, or customer proof.
- The homepage, navbar, collection pages, PDP, footer, and trust/support pages must feel like one coherent store, not separate recovered fragments.

## Current Build State

The homepage is structurally restored and valid at the Shopify template level.

Current `templates/index.json` status:
- `25` sections.
- `25` order entries.
- No missing section files.
- This is at Shopify's practical homepage section cap, so do not add new homepage sections without disabling/removing another section entry.

Current ordered homepage sections:
1. `1a5a958c-6831-4702-9a7a-bcfe79e60c83` -> `image-banner` -> disabled.
2. `home_luxury_hero` -> `home-luxury-hero`.
3. `home_conversion_intro` -> `home-conversion-intro`.
4. `f69000d3-4d8c-439d-a650-6f122fcd1b9d` -> `brand-slider`.
5. `163945138066afddf5` -> `product-block`.
6. `home_trust_proof` -> `home-trust-proof`.
7. `home_concierge_cta` -> `home-concierge-cta`.
8. `home_concierge_booking` -> `home-concierge-booking`.
9. `home_store_proof` -> `home-store-proof`.
10. `home_origin_story` -> `home-origin-story`.
11. `home_meaning_guide` -> `home-meaning-guide`.
12. `home_gemstone_atlas` -> `home-gemstone-atlas`.
13. `home_signature_drop` -> `home-signature-drop`.
14. `1635930670b6b2f58d` -> `product-block` -> disabled.
15. `163835209394385a65` -> `brand-slider` -> disabled.
16. `home_most_gifted` -> `home-most-gifted` -> disabled.
17. `1730882357020c7d82` -> `apps` -> disabled.
18. `fbd9e39b-08c2-4348-869a-d38c962d1a3e` -> `image-banner` -> disabled.
19. `16393870238958f868` -> `custom-service-block`.
20. `home_shop_shortcuts` -> `home-shop-shortcuts`.
21. `6420176e-bb2c-4a54-bc8f-03b58a5c5c97` -> `custom-text-block` -> disabled.
22. `home_community_proof` -> `home-community-proof`.
23. `dec54ec7-7930-4d0e-84ca-d2a965cd8d92` -> `instagram` -> disabled.
24. `173081418900bda130` -> `apps`.
25. `16394502839cbe45cc` -> `image-banner` -> disabled.

## Completed Recovery And Design Work

Recovered and wired:
- `sections/home-luxury-hero.liquid`
- `sections/home-conversion-intro.liquid`
- `sections/home-trust-proof.liquid`
- `sections/home-concierge-cta.liquid`
- `sections/home-concierge-booking.liquid`
- `sections/home-store-proof.liquid`
- `sections/home-origin-story.liquid`
- `sections/home-meaning-guide.liquid`
- `sections/home-gemstone-atlas.liquid`
- `sections/home-signature-drop.liquid`
- `sections/home-shop-shortcuts.liquid`
- `sections/home-community-proof.liquid`

Recovered and/or integrated design assets:
- `assets/gpi-design-tokens.css`
- `assets/component-home-luxury-hero.css`
- `assets/component-home-conversion-intro.css`
- `assets/component-home-conversion.css`
- `assets/component-home-trust-proof.css`
- `assets/component-home-concierge-cta.css`
- `assets/component-home-concierge-booking.css`
- `assets/component-home-store-proof.css` if present through recovered set.
- `assets/component-home-origin-story.css`
- `assets/component-home-meaning-guide.css`
- `assets/component-home-gemstone-atlas.css`
- `assets/component-home-signature-drop.css`
- `assets/component-home-shop-shortcuts.css`
- `assets/component-home-community-proof.css`
- Generated local graphics under `assets/gpi-*.webp` and `assets/gpi-*.png`.

Important completed fixes:
- Added `--gpi-color-*` compatibility aliases in `assets/gpi-design-tokens.css`, because recovered sections use both `--gpi-*` and `--gpi-color-*` variable families.
- Added gemstone atlas fallback images in `sections/home-gemstone-atlas.liquid`, mapping Ruby, Pearl, Coral, Emerald, Pukhraj, Diamond, Neelam, Gomed, and Cat's Eye to local `gpi-stone-*.webp` assets.
- Rebuilt `sections/home-conversion-intro.liquid` into a real premium two-column decision section.
- Replaced `assets/component-home-conversion-intro.css` so the CSS matches the live Liquid markup.
- Added official `link` support to `proof_item` blocks in `home-conversion-intro` schema.
- Cleaned `assets/component-home-luxury-hero.css` by removing visual noise from decorative glyph/orb treatments.
- Added contained mobile/footer polish in `assets/section-footer.css` for layout 01 footer.
- Patched homepage product-card image behavior toward full-frame gallery presentation in `assets/component-home-conversion.css`.

## Current Worktree Reality

The working tree is intentionally not clean. Many recovered homepage files are untracked or modified. Do not delete these files casually.

Known current state categories:
- `templates/index.json` is modified and is the current homepage truth source.
- `FINAL_HANDOFF.md` is modified and is the current collaboration source.
- Several `sections/home-*.liquid` and `assets/component-home*.css` files are recovered/untracked.
- Generated graphics in `assets/gpi-*.webp` and `assets/gpi-*.png` may still be untracked.

Important instruction:
- Do not remove recovered files just to make `git status` cleaner.
- First decide which recovered sections remain in the final design.
- Then stage only the intended final files.
- Ignore unrelated legacy modified files unless they directly affect the current task.

## Immediate Next Work

Start with visual validation, not new section creation.

1. Start/confirm local Shopify dev server only if the user asks or is already running it. The user prefers to manage server start/stop.
2. Open homepage on localhost and screenshot/inspect:
   - Desktop wide.
   - Laptop width.
   - Tablet width.
   - Mobile width around 390px.
3. Review top to bottom and mark each section:
   - Keep and polish.
   - Merge with nearby section.
   - Disable from `templates/index.json`.
4. Do not exceed 25 homepage sections.
5. Validate after every template-order change.

## Remaining Design Work By Area

### 1. Hero

Files:
- `sections/home-luxury-hero.liquid`
- `assets/component-home-luxury-hero.css`

Current status:
- Hero is recovered and visually improved.
- Local fallback graphics exist.
- Decorative glyph/orb noise was removed.

Remaining work:
- Browser-review hero composition on desktop and mobile.
- Ensure the headline does not wrap awkwardly.
- Ensure product frames feel premium and product images are not awkwardly cropped.
- Confirm CTAs are obvious and not too large on mobile.
- Confirm hero height does not consume too much first viewport on mobile.
- Ensure first viewport hints at the next section.

Design standard:
- Hero must immediately sell "Gemstone gifts that feel personal, proven, and ready to wear."
- It should feel premium and product-led, not like a template banner.

### 2. Second Section / Conversion Intro

Files:
- `sections/home-conversion-intro.liquid`
- `assets/component-home-conversion-intro.css`

Current status:
- Rebuilt into a premium two-column section.
- Trust strip, proof cards, CTAs, and shortcut chips exist.

Remaining work:
- Localhost visual review.
- Check if this section is too dense after the hero.
- Ensure mobile swipe chips are obvious and not clipped.
- Ensure clickable proof cards feel like intentional decision paths.
- Confirm text hierarchy is calmer than hero and does not compete with it.

Design standard:
- This is the first decision-assistance section after hero.
- It should help shoppers choose between bestsellers, intention, and guided support.
- It must not sound like internal conversion strategy.

### 3. Category / Intention Rail

Files:
- Active `brand-slider` section in `templates/index.json`.
- Related styling currently influenced by `assets/component-home-conversion.css`.

Current status:
- Active section still comes from existing theme structure.
- Previously planned as "Shop by intention" style.

Remaining work:
- Confirm product/category images fill frames beautifully.
- Make sure mobile horizontal scroll is clear.
- Ensure labels match final navbar language.
- Consider whether this duplicates `home_meaning_guide`; if yes, merge or disable one.

Design standard:
- Minimal Moon Magic-inspired intention browsing.
- Use real selling labels: Money, Protection, Love, Peaceful Energies, Health.
- Product imagery should feel curated, not like tiny thumbnails.

### 4. Product Block / Product Cards

Files:
- Existing `product-block` section id `163945138066afddf5`.
- Shared product card snippets likely include `snippets/product-card*.liquid`, `snippets/halo-product-card.liquid`, and `snippets/image-product-card.liquid`.
- CSS influences include `assets/component-home-conversion.css`, `assets/component-card-06.css`, and related card CSS.

Current status:
- Product image behavior was moved toward full-frame `cover`.
- User previously complained that mobile product images were cut off.

Remaining work:
- Inspect real products on mobile.
- If cover crops important product detail, use section-specific `object-fit: contain` or object-position rules only where required.
- Ensure card titles, subtext, price, ratings, and badges are evenly spaced.
- Remove hover-only behaviors that block mobile usability.
- Ensure product-card subtext rendering works across gemstone, jewellery, crystal, zodiac, bracelet, and gift categories.

Design standard:
- Product images must look like a premium gallery.
- No tiny floating product thumbnails.
- No messy inconsistent card heights.
- Product details must support conversion without clutter.

### 5. Trust Proof / Store Proof / Origin Story

Files:
- `sections/home-trust-proof.liquid`
- `assets/component-home-trust-proof.css`
- `sections/home-store-proof.liquid`
- `sections/home-origin-story.liquid`
- `assets/component-home-origin-story.css`

Current status:
- Trust proof includes GJEPC, 100K customers, Chanakyapuri store, human support.
- Store proof and origin story are active.

Remaining work:
- Check if trust claims are repeated too many times across adjacent sections.
- Reduce repetition while keeping confidence.
- Ensure GJEPC lab-tested language is accurate and not overclaiming beyond documentation.
- Add/align customer-centric documentation pages once available.
- Integrate Google Maps link for Chanakyapuri store when user provides it.

Design standard:
- Trust should appear early and often, but not feel repetitive.
- Claims must be concrete: GJEPC lab-tested gemstones, 100K online/offline customers, Chanakyapuri offline store, real support.

### 6. Concierge / Buying Support

Files:
- `sections/home-concierge-cta.liquid`
- `assets/component-home-concierge-cta.css`
- `sections/home-concierge-booking.liquid`
- `assets/component-home-concierge-booking.css`

Current status:
- Two concierge/support sections are currently active.

Remaining work:
- Decide whether both should remain active.
- If both remain, they need distinct roles:
  - `home_concierge_cta`: short conversion CTA.
  - `home_concierge_booking`: richer advisor/contact section.
- Check mobile CTA sizes and WhatsApp link behavior.
- Add actual consultation/support page destination if available.

Design standard:
- Human support should reduce buying anxiety.
- Do not make it feel like generic chatbot support.

### 7. Meaning Guide / Gemstone Atlas

Files:
- `sections/home-meaning-guide.liquid`
- `assets/component-home-meaning-guide.css`
- `sections/home-gemstone-atlas.liquid`
- `assets/component-home-gemstone-atlas.css`

Current status:
- Meaning guide is active.
- Gemstone atlas is active with local stone fallbacks.

Remaining work:
- Check if these two sections repeat the same purpose.
- Consider giving each a clear role:
  - Meaning guide: shopping by intention.
  - Gemstone atlas: education and confidence for Navratna/planetary gemstone buyers.
- Verify mobile atlas cards do not depend on hover to reveal important content.
- Ensure gemstone images are beautiful and not distorted.

Design standard:
- Keep this minimal, useful, and product-selling.
- Avoid long spiritual explanations that delay shopping.

### 8. Signature Drop / Shop Shortcuts / Community Proof

Files:
- `sections/home-signature-drop.liquid`
- `assets/component-home-signature-drop.css`
- `sections/home-shop-shortcuts.liquid`
- `assets/component-home-shop-shortcuts.css`
- `sections/home-community-proof.liquid`
- `assets/component-home-community-proof.css`

Current status:
- All are active.

Remaining work:
- Check section order and visual rhythm near the bottom of homepage.
- Confirm signature drop product imagery feels premium.
- Confirm shortcuts are useful, not repetitive with the nav.
- Confirm community proof uses believable customer proof and does not feel fake.
- Replace placeholder testimonials with real customer documentation when ready.

Design standard:
- Bottom-half sections should reinforce purchase confidence, not introduce new confusion.

### 9. Footer

Files:
- `sections/footer.liquid` because `config/settings_data.json` currently has `"footer_layout": "01"`.
- `assets/section-footer.css`.
- `snippets/wrapper-footer.liquid`.

Current status:
- Mobile footer patch was added in `assets/section-footer.css`.
- Earlier screenshot showed footer contact/trust text spacing problems.

Remaining work:
- Localhost mobile review required.
- Confirm phone pill wraps correctly.
- Confirm address text does not collide.
- Confirm footer headings/accordion touch targets are at least 44px.
- Confirm newsletter/payment/social rows are aligned.

Design standard:
- Footer should feel like a premium support/trust close, not a cramped default theme footer.

### 10. Navbar And Destination Alignment

Current status:
- Homepage language has evolved faster than the nav/page set.

Remaining work:
- Audit navbar labels.
- For every nav label, confirm the destination page/collection matches the label.
- Create or redesign matching landing pages where needed:
  - Shop by Intention.
  - Gemstones / Navratna / Lab-tested gemstones.
  - Zodiac gifts.
  - Bracelets.
  - Raw crystals.
  - Authenticity.
  - Reviews / customer proof.
  - Shipping/support.
  - Consultation / WhatsApp support.
  - Chanakyapuri store.

Design standard:
- No mismatch where nav says one thing and the page feels unrelated.

### 11. Trust / Support Page Family

Current status:
- Some trust/support destinations were planned but still need final content/design QA.

Remaining work:
- Finish authenticity page with GJEPC lab-tested gemstone explanation, documentation cues, and CTA to shop/chat.
- Finish consultation page with WhatsApp, phone, store visit, video consultation flow.
- Add/finish reviews/proof destination with real buyer proof and 100K online/offline context.
- Add/finish shipping/support destination with clear processing, delivery, returns, support contact, and escalation path.
- Wire homepage CTAs to these destinations.

Design standard:
- These pages must reduce anxiety before purchase.
- Keep copy concrete, clear, and customer-facing.

### 12. Collection Pages

Remaining work:
- Apply homepage design system to collection header, filters, product grid, product cards, and empty states.
- Review product-card subtext rendering by category type.
- Ensure mobile filters and sorting do not cover content or depend on hover.
- Product images should be consistent with homepage gallery standard.

Design standard:
- Collections must feel like premium shopping pages, not default Shopify grids.

### 13. PDP / Product Detail Pages

Remaining work:
- Review product gallery image fit on mobile and desktop.
- Add/verify gemstone-specific trust modules:
  - Lab-tested confidence.
  - Product meaning/benefits.
  - Shipping/returns.
  - WhatsApp support.
  - Store support.
  - Reviews.
- Ensure CTA stack is clean and mobile-first.
- Reduce old/default product-page text where it weakens trust.

Design standard:
- PDP should answer: What is it? Why this stone? Is it authentic? Will it fit? Can I trust delivery? Who helps me if unsure?

## Technical Standards For Final Completion

Use this checklist for every future pass.

### Discovery Standard

Before editing:
1. Read `FINAL_HANDOFF.md`.
2. Read `templates/index.json`.
3. Read the exact section Liquid and CSS files you will touch.
4. Check `git status --short` for files you might collide with.
5. If another agent is active, avoid shared files unless required.

### Shopify Standard

Rules:
- Keep homepage template at max 25 sections.
- Do not put `.css` files in `sections/`.
- Custom section schema `name` must be 25 characters or fewer.
- Block types saved in `templates/*.json` must exist in section schema.
- Setting IDs saved in `templates/*.json` should exist in section schema.
- Avoid broad rewrites of `layout/theme.liquid`, `snippets/global-style.liquid`, and `templates/index.json` unless necessary.

Recommended validation commands:
```powershell
node -e "const fs=require('fs'); const raw=fs.readFileSync('templates/index.json','utf8').replace(/^\/\*[\s\S]*?\*\/[\r\n]*/,''); const j=JSON.parse(raw); const missing=[]; for (const [id,s] of Object.entries(j.sections)) if (!fs.existsSync('sections/'+s.type+'.liquid')) missing.push(id+':'+s.type); console.log('sections',Object.keys(j.sections).length,'order',j.order.length,'missing',missing.length?missing.join(', '):'none');"
```

```powershell
node -e "const fs=require('fs'); const files=['assets/gpi-design-tokens.css','assets/component-home-conversion-intro.css','assets/component-home-luxury-hero.css','assets/component-home-conversion.css','assets/section-footer.css']; for (const f of files.filter(fs.existsSync)) { const t=fs.readFileSync(f,'utf8'); let b=0; for (const ch of t) { if (ch==='{') b++; else if (ch==='}') b--; if (b<0) throw new Error('brace underflow '+f); } if (b!==0) throw new Error('brace mismatch '+f+' '+b); console.log(f,'brace ok'); }"
```

### Design-System Standard

Use these token files:
- `assets/gpi-design-tokens.css`
- Existing recovered `component-home-*.css` files.

Use:
- `--gpi-heading`
- `--gpi-body`
- `--gpi-color-bg-primary`
- `--gpi-color-bg-secondary`
- `--gpi-color-bg-tertiary`
- `--gpi-color-text`
- `--gpi-color-text-secondary`
- `--gpi-color-accent`
- `--gpi-color-border`
- `--gpi-radius-pill`

Avoid:
- Random new colors.
- Purple/blue gradients.
- Decorative orb backgrounds.
- Over-rounded generic cards everywhere.
- Negative letter spacing.
- Viewport-width font scaling.

### UX Standard

Each active section must pass:
- Mobile readable text, minimum practical body size around 15-16px.
- Touch targets at least 44px high for buttons/links.
- No essential content hidden behind hover-only behavior.
- Focus-visible styles on links/buttons.
- No horizontal page overflow.
- No text clipping inside buttons/cards.
- No overlapping UI.
- Images have stable frames/aspect ratios.
- CTAs are obvious and consistent.

### Image Standard

Homepage/product imagery must be intentional.

Use `cover` when:
- The frame is editorial and cropping improves visual impact.
- The product remains legible.

Use `contain` when:
- Cropping cuts off important product details.
- Product is jewellery/crystal with small details shoppers need to inspect.

Do not leave:
- Tiny centered product thumbnails inside huge blank frames.
- Mixed object-fit rules that fight each other.
- Cropping that cuts bracelets/pendants/rings in half on mobile.

### Content Standard

Allowed claims and themes:
- 100K customers total online and offline.
- Chanakyapuri offline store.
- GJEPC lab-tested gemstones.
- Human WhatsApp buying support.
- Gift-ready gemstone jewellery.
- Zodiac/intention-led shopping.
- Certified/lab-tested confidence where documentation exists.

Avoid:
- Placeholder copy.
- Internal strategy wording like "why this path converts better."
- Overpromising medical/astrological outcomes.
- Generic "learn more" sections without product or brand selling value.

### QA Standard Before Final Push

Required:
1. `templates/index.json` parse.
2. Section existence scan.
3. Schema/block setting scan for touched sections.
4. CSS brace check.
5. Localhost homepage render check.
6. Desktop screenshot.
7. Mobile screenshot.
8. Upload-error scan.
9. CTA click-path spot check.
10. Product-card visual spot check.
11. Footer mobile spot check.
12. Final theme check, expecting possible legacy warnings but no new blocking upload errors.

Do not push/deploy without user approval.

## Recommended Next Pass Order

Follow this order to finish efficiently:

1. Visual QA on localhost homepage.
2. Fix obvious hero/second-section issues.
3. Fix product-card image composition.
4. Decide if duplicate sections should be disabled or merged.
5. Polish bottom-half flow.
6. Footer mobile final pass.
7. Navbar/page alignment audit.
8. Trust/support page-family final design.
9. Collection page parity.
10. PDP parity.
11. Performance/accessibility pass.
12. Git cleanup/staging.
13. Final validation.

## Do Not Do

- Do not delete `backup/`.
- Do not delete recovered untracked files just because they are untracked.
- Do not reset the worktree.
- Do not add new global visual systems unless necessary.
- Do not start a from-scratch theme while this recovered theme still contains valid Shopify wiring.
- Do not exceed 25 homepage sections.
- Do not leave upload errors unresolved.
- Do not deploy without explicit user approval.

## 2026-05-12 Codex Precision Pass

Completed:
- Loaded `assets/component-home-spacing-alignment.css` from `snippets/global-style.liquid` on the homepage so the existing spacing/alignment recovery layer actually applies after the active homepage CSS.
- Tuned mobile hero hierarchy in `assets/component-home-luxury-hero.css`: headline remains before the product collage on mobile, mobile type is calmer, and the collage height is reduced to expose more first-viewport content.
- Adjusted mobile product-card media in `assets/component-home-conversion.css` so small jewellery/product details use contained framing on mobile instead of being cropped by the gallery cover rule.

Validation:
- `templates/index.json` parses: 25 sections, 25 order entries, no missing section files.
- Schemas parse for `home-luxury-hero`, `home-conversion-intro`, `home-signature-drop`, and `home-community-proof`.
- CSS brace checks pass for touched and active homepage/footer CSS files.
- `shopify theme check --path . --output json` was attempted but timed out in this checkout, consistent with known legacy/noisy validation behavior.

Still needs:
- Browser visual QA when a local Shopify preview is running.
- Desktop/mobile screenshot pass for hero, product cards, footer, and lower-homepage rhythm.

# SINGLE-FILE CONSOLIDATION OF ALL ACTIVE MASTER DOCS - 2026-05-12

This section consolidates the instructions from the previously split project files:

- `README.md`
- `SEO_GUIDE.md`
- `docs/HOMEPAGE_REBUILD_COORDINATION.md`
- `docs/SECTIONS_TO_WIRE.md`
- `docs/homepage-conversion-tracker.md`
- `docs/MOONMAGIC_PATTERN_EXTRACT.md`
- `docs/superpowers/specs/2026-04-24-homepage-moonmagic-redesign.md`
- `docs/superpowers/plans/2026-04-24-homepage-moonmagic-redesign.md`

Future agents should read this `FINAL_HANDOFF.md` first and treat it as the canonical project context. The older files may remain in the repo for audit/history, but their instructions are absorbed here. When a conflict exists between old docs and this handoff, follow this handoff and the current `templates/index.json` state.

## Project Baseline

Gift Palace India is a Shopify theme rebuild for a certified gemstone, crystal, zodiac gifting, and jewellery storefront. The target direction is a premium, minimal, image-led commerce experience inspired by MoonMagic's concise visual merchandising, strengthened with Indian-market trust tactics similar to Shubh Gems and World of Oorja.

The store should sell through:

- Product-led visuals, not internal strategy copy.
- Certified/lab-tested gemstone confidence.
- 100K online and offline customer proof.
- Chanakyapuri offline store credibility.
- Gift-ready crystal and gemstone jewellery.
- Intention, zodiac, birthstone, and occasion discovery.
- Human WhatsApp consultation.
- Fast, reassuring shipping and return support.

The active goal is not to preserve the existing homepage look. The active goal is to preserve Shopify wiring and data compatibility while redesigning the visible storefront into a coherent premium system.

## Theme Setup And Commands

This repo is a Shopify theme project. The expected project structure is:

- `assets/` for CSS, JS, fonts, and theme assets.
- `layout/` for global theme layout.
- `sections/` for Shopify sections.
- `snippets/` for reusable Liquid snippets.
- `templates/` for JSON templates.
- `locales/` for translations.
- `config/` for theme settings.

Typical local commands from `README.md`:

```powershell
npm install
npm run shopify:serve
npm run shopify:pull
npm run shopify:push
```

User preference: the user manages starting and stopping local servers. Do not start/stop the Shopify dev server unless the user explicitly asks.

Do not deploy or push live without explicit approval.

## Canonical Development Flow

Before editing:

1. Read this `FINAL_HANDOFF.md`.
2. Check `git status --short`.
3. Inspect the exact files you will touch.
4. Assume another agent may be working in parallel.
5. Avoid collision-prone files unless necessary.

Collision-prone files:

- `templates/index.json`
- `layout/theme.liquid`
- Global snippets loaded by the whole theme.
- Token/global CSS files.

When possible, work in narrow section or asset files. If `templates/index.json` must change, validate JSON immediately after the edit.

After editing:

1. Validate syntax for touched JSON/Liquid/CSS/JS.
2. Check for obvious section schema errors.
3. Confirm upload-error class issues are not introduced.
4. Update this handoff with shipped work and remaining work.

Do not remove files from `backup/`.
Do not delete recovered files just because they are untracked.
Do not reset the worktree.

## Design System Direction

Use the current GPI design system, not random one-off styling.

Primary token file:

- `assets/gpi-design-tokens.css`

Legacy docs mention `assets/gpi-tokens.css`; treat that as historical. The current direction is `gpi-design-tokens.css` plus recovered `component-home-*.css` files.

Preferred token concepts:

- Ivory/off-white backgrounds.
- Ink/charcoal typography.
- Controlled gold accents.
- Soft champagne/stone neutrals.
- Minimal borders.
- Subtle elevation only where it improves hierarchy.
- Product images as the main color and emotion source.

Avoid:

- Purple/blue gradient-heavy UI.
- Decorative orbs and generic bokeh blobs.
- Over-rounded generic cards everywhere.
- Negative letter spacing.
- Viewport-width font scaling.
- Placeholder copy or internal planning language.
- Medical or guaranteed astrological claims.

Typography targets:

- Hero heading desktop: 56-72px when space allows.
- Hero heading mobile: 32-40px.
- Section heading desktop: 36-48px.
- Section heading mobile: 24-32px.
- Product/card titles: 14-18px.
- Body text: 14-16px.
- Small proof text: 12-14px.
- Uppercase label text is acceptable when restrained and letter spacing is modest.

Responsive breakpoints:

- 1440 desktop QA.
- 1024 tablet/compact desktop QA.
- 768 tablet QA.
- 375 mobile QA.
- 320 small mobile QA.

Spacing rhythm:

- Desktop section vertical padding: about 56-80px depending section weight.
- Tablet section vertical padding: about 40-56px.
- Mobile section vertical padding: about 32-48px.
- Grid gaps: 20-30px desktop, 12-18px mobile.
- Image-to-text gaps: 12-20px.

Buttons:

- Minimum touch target height: 44px.
- Prefer concise labels.
- CTAs should feel premium, not stretched full-width without reason.
- On mobile, full-width CTAs are acceptable only when visually intentional.

## Visual Reference Model

The target inspiration is MoonMagic-style minimal commerce:

- Image-led hero.
- Editorial product photography.
- Concise value proposition.
- Strong first CTA.
- Trust cues close to shopping decisions.
- Minimal discover rails.
- 4-column product/category grids on desktop.
- 1-2 column mobile layouts.
- Flat or lightly elevated cards.
- No heavy visual clutter.

Reference patterns to keep:

- Full-width/lifestyle hero with strong product signal.
- "Designed to mean more" type section, but in this build the third section should be named and framed as "Shop by Intention" unless changed later.
- Minimal product/category items: image first, short uppercase meaning/intention, stone or product type below.
- Strong central CTA after the rail.
- Split editorial sections with large image and concise product/trust copy.
- Trust blocks that sell authenticity, certification, customer proof, warranty/support, and store credibility.

Indian-market trust tactics to adapt:

- Lab-tested/certified gemstone proof.
- Offline store trust.
- WhatsApp consultation.
- Clear delivery/return reassurance.
- Review and customer-count proof.
- Straightforward price/product information.
- Avoid making shoppers decode abstract brand language.

## Homepage Strategy

The homepage must become a coherent conversion path:

1. Hero: immediate product and trust signal.
2. Second section: premium trust/value bridge, visually simpler than current heavy strategy cards.
3. Third section: `Shop by Intention`.
4. Bestseller/product gallery: product images must fill the frame and showcase details.
5. Lab-tested/authenticity proof.
6. Gift/occasion/zodiac browsing.
7. Consultation/store/WhatsApp support.
8. Reviews/community proof.
9. Shipping/returns/support reassurance.
10. Footer with clean mobile spacing and no text crowding.

Current homepage should avoid:

- Sections explaining why the design converts.
- Duplicate or redundant proof blocks.
- Too many inconsistent card systems.
- Tiny thumbnails inside large empty frames.
- Product cards with important details hidden on hover.
- Large blank spaces caused by disabled or empty data.

Homepage section count should remain controlled. Prefer merging weaker duplicate sections rather than adding endless new sections.

## Hero Requirements

Hero should communicate:

- Gemstone gifts and jewellery that feel personal.
- Certified/lab-tested trust.
- 100K customer proof.
- Offline Chanakyapuri store credibility where appropriate.
- Clear primary shopping CTA.
- Clear secondary trust/consultation CTA.

Hero visual:

- Product image or generated gemstone/product editorial composition.
- Avoid generic strategy panels.
- Avoid text-heavy cards.
- Keep first viewport premium and calm.
- The brand/product should be obvious immediately.

Hero content should be short. Example direction:

- Heading: "Gemstone gifts that feel personal, proven, and ready to wear."
- Support: "Certified gemstone jewellery, zodiac gifts, and crystal pieces curated for meaning, gifting, and everyday wear."
- Trust chips: "GJEPC lab-tested", "100K customers", "Chanakyapuri store", "WhatsApp guidance".

Do not overfill the hero with long paragraphs.

## Second Section Direction

The second section still needs refinement. It should be a premium trust/value bridge, not a long conversion-strategy explainer.

Possible direction:

- A compact editorial split section.
- Left: one strong line about certified gemstone jewellery.
- Right: product/trust proof stack.
- Include one CTA to authenticity/certification and one CTA to consultation or bestsellers.

Content themes:

- "Certified stones. Thoughtful gifts. Real guidance."
- "Lab-tested gemstones, hand-selected for color, clarity, and everyday wear."
- "Visit us in Chanakyapuri or get WhatsApp help before you buy."

This section should feel minimal and premium. It should not use large nested cards or internal planning copy.

## Third Section: Shop By Intention

The third section should be named `Shop by Intention`, not `Designed to Mean More` unless the user later changes it.

Required intention items from user:

1. Money - Pyrite crystal photo.
2. Protection - Evil eye or protective crystal photo.
3. Love - Rose quartz heart shapes.
4. Peaceful Energies - Crystal photo, likely amethyst or calming stones.
5. Health - Crystal photo.

Desired visual:

- Minimal MoonMagic-like rail.
- More premium than square thumbnails.
- Images in refined frames, not basic squares.
- Desktop shows all five cleanly.
- Mobile should hint that more items exist next to it, using horizontal scroll, partial next-card visibility, arrows/dots, or a refined rail treatment.
- CTA should be shorter than the earlier oversized pill. Suggested label: "Find My Crystal" or "Shop Crystals".

Image treatment:

- Use stable aspect ratio.
- Avoid cutting product details.
- Use full-frame product presence.
- Light background is acceptable, but products should not look tiny.

## Product Card And Gallery Requirements

User explicitly wants product images to take up all available frame space and display the highest-quality product image, like a gallery of products.

Rules:

- Product image frames must be stable.
- Use `object-fit: cover` for editorial category/gallery cards when the product remains legible.
- Use `object-fit: contain` for jewellery/crystal product photos where cropping cuts details.
- Avoid inconsistent object-fit across the same grid.
- Remove hover-only behavior that hides important mobile actions or details.
- Product cards need visible product name, price, useful subtext/trust cue, and CTA/action access on mobile.

Subtext priority from conversion tracker:

1. Zodiac/date range where relevant.
2. Handcrafted or product-benefit text where available.
3. Product metafields where available.
4. Neutral fallback if no richer data exists.

Do not strip existing merchandising detail. Improve presentation around it.

## Trust And Support Page Family

Trust/support pages are in scope, even if old superpowers docs originally treated them as out of scope.

Required destinations:

- Consultation.
- Authenticity/lab-tested gemstone proof.
- Reviews/proof.
- Shipping/support.
- Store/location page for Chanakyapuri once Google Maps link is provided.

CTA wiring:

- Hero to bestsellers and consultation/authenticity.
- Product sections to product details and collection pages.
- Trust proof to authenticity and reviews.
- Footer to shipping/support, authenticity, consultation, contact, store.
- PDP to authenticity, shipping, support, and WhatsApp consultation.

Content must be customer-facing and sales-oriented, not placeholder strategy notes.

## SEO And Structured Data Requirements

From `SEO_GUIDE.md`, the theme already includes or expects these SEO systems:

- Product schema.
- Organization schema.
- Breadcrumb schema.
- Meta tags.
- Open Graph tags.
- Twitter cards.
- Resource hints.
- Analytics scripts in head.
- Canonical URLs.
- Mobile viewport.
- Language attributes.
- Favicon support.

Important snippets/files:

- `snippets/schema-product.liquid`
- `snippets/schema-organization.liquid`
- `snippets/schema-breadcrumbs.liquid`
- `snippets/meta-tags.liquid`
- `layout/theme.liquid`

Theme settings historically include:

- Google site verification: `jHzys8zjzeRmtGVUoNDxEEkmJ9kzcYynLX7JeuB4kUk`
- Google Analytics: `G-NBNXJ57532`
- Meta Pixel: `6026655854124379`

Do not remove these integrations casually.

SEO editor checklist:

- Product title around 50-60 characters where practical.
- Unique product description of at least about 150 words for important products.
- Meta description around 150-160 characters.
- High-quality image alt text.
- Clean keyword-friendly URL handles.
- Product vendor populated.

Validation tools referenced in old docs:

- Google Rich Results Test.
- Facebook Sharing Debugger.
- Twitter Card Validator.
- Google Search Console.
- Lighthouse SEO.

## Historical Wiring Notes

`docs/SECTIONS_TO_WIRE.md` records historical wiring work for:

- `trust-pillars`
- `FAQ`
- `testimonials`
- `newsletter-signup`

Those were marked wired on 2026-05-08 in the old queue. Do not blindly rewire them. Always compare against current `templates/index.json` and the current design direction first.

Old docs also included task IDs:

- T-01 pattern extraction.
- T-02 content mapping.
- T-03 token/scaffold work.
- T-04 section builds.
- T-05 cleanup/wiring.
- T-06 accessibility/structured data.
- T-07 QA/theme check.

These are historical. Current work is the recovered homepage transformation and final polish.

## Accessibility Requirements

Every section should pass:

- One logical H1 on the page.
- Proper heading order.
- Keyboard focus-visible styles.
- Touch targets at least 44px.
- Text contrast that passes reasonable WCAG expectations.
- No hover-only essential content.
- Reduced motion support for animations.
- Images with useful alt text when meaningful.
- No horizontal overflow at 320/375 mobile.
- No text clipping or overlap.

Motion:

- Keep animations subtle, around 150-300ms.
- Image hover zoom may be 1.02-1.05.
- Do not animate layout in a way that causes content jump.
- Respect `prefers-reduced-motion`.

## Performance Requirements

Homepage must stay fast:

- Lazy-load non-critical images.
- Keep hero image optimized and prioritized appropriately.
- Avoid adding heavy JS for interactions CSS can handle.
- Avoid giant background images where product assets would work.
- Use stable dimensions/aspect ratios to reduce layout shift.
- Do not load multiple font families/weights without reason.

If generated 3D/gemstone assets are added later:

- Use compressed web formats where practical.
- Provide poster/fallback images.
- Avoid blocking first paint with 3D.
- Use 3D as an enhancement, not a dependency for shopping.

## Validation Checklist

Before claiming a pass is complete:

1. `templates/index.json` parses.
2. All section types referenced in `templates/index.json` have matching files in `sections/`.
3. Touched Liquid section schemas are valid.
4. No schema name exceeds Shopify limits.
5. Block types in JSON exist in section schema.
6. CSS braces are balanced for touched CSS.
7. Touched JS passes syntax check when applicable.
8. Desktop homepage visual check.
9. Mobile homepage visual check.
10. Product-card image framing check.
11. Footer mobile spacing check.
12. Upload errors checked.

Useful validation commands:

```powershell
node -e "JSON.parse(require('fs').readFileSync('templates/index.json','utf8')); console.log('index ok')"
```

```powershell
& 'C:\Users\shubh\AppData\Roaming\npm\shopify.cmd' theme check --path . --output json
```

Theme check may include legacy warnings. Do not treat old unrelated warnings as blockers unless they affect upload/rendering. New upload-blocking errors must be fixed.

## Current Remaining Work Queue

Highest priority:

1. Finish visual recovery and polish of homepage.
2. Reduce visual inconsistency between top and bottom homepage sections.
3. Rework the second section into a premium concise trust/value bridge.
4. Perfect `Shop by Intention` desktop and mobile UI.
5. Fix all product image frames in homepage product/gallery sections.
6. Remove remaining placeholder or internal planning copy.
7. Footer mobile spacing and text wrapping final pass.
8. Validate `templates/index.json` and section schemas.

Next priority:

1. Collection page visual parity with homepage.
2. PDP visual parity with homepage.
3. Product-card subtext rendering across category types.
4. Trust/support page family final content.
5. Consultation and authenticity pages finished properly.
6. Reviews/proof destination.
7. Shipping/support destination.
8. Navbar labels aligned to destination pages.
9. Mobile navigation polish.
10. SEO/schema spot check after page changes.

Deferred but important:

1. Generated gemstone/product hero assets.
2. 3D gemstone experiments.
3. Conversion quiz or guided finder.
4. Recently viewed products.
5. Staff picks/founder picks.
6. FAQPage structured data.
7. Store locator with Google Maps link after user provides it.

## Recommended Next Build Pass

The next agent should work in this order:

1. Inspect current homepage render at desktop and mobile.
2. Identify the weakest visible sections by screenshot, not by assumptions.
3. Patch image composition and spacing first, because those issues are most visible.
4. Redesign the second section using existing tokens.
5. Polish `Shop by Intention`.
6. Normalize product gallery/card image behavior.
7. Update this handoff with exactly what changed and what still needs manual review.

Keep output concise while working. The user wants momentum and concrete repo changes, not long status reports.

## 2026-05-12 Codex Backup Sync And Spacing Pass

Completed:
- Confirmed the latest 1am backup path is `C:\Users\shubh\Downloads\giftpalaceindia-restored-1am`.
- Copied missing `assets/gpi-hero-video.mp4` from the 1am backup into the main `giftpalaceindia` build.
- Merged backup design fallbacks into the main build:
  - Hero now uses the local ambient video if no Shopify video URL is set.
  - Signature Drop now renders local gemstone fallback cards if product collection images are missing.
  - Shop Shortcuts now renders useful fallback cards if blocks are absent.
- Tightened homepage spacing in `assets/component-home-spacing-alignment.css` using homepage-only overrides for active legacy and GPI sections.
- Mirrored the latest selected homepage design files from `giftpalaceindia` back into `giftpalaceindia-restored-1am`.

Validation:
- Main build: `templates/index.json` parses with 25 sections, 25 order entries, no missing section files.
- 1am backup build: `templates/index.json` parses with 25 sections, 25 order entries, no missing section files.
- CSS brace checks passed for the touched active homepage files.
- Edited section schemas parse for hero, signature drop, and shop shortcuts.

## 2026-05-12 Codex Homepage Refinement Pass

Completed:
- Added contained homepage-only styling for active `home-store-proof`, because no dedicated store-proof CSS file exists in this checkout.
- Tightened trust proof cards, store proof prooflets, gemstone atlas grid, and shop shortcut grid gaps through the loaded spacing layer.
- Reduced Gemstone Atlas mobile card height and header spacing so the section scans faster.
- Calmed Concierge Booking card proportions, removed continuous pulse animation, and reduced mobile vertical padding.
- Mirrored the edited CSS files back into `giftpalaceindia-restored-1am`.

Validation:
- Main build still parses with 25 sections, 25 order entries, no missing section files.
- CSS brace checks passed for edited spacing, atlas, and concierge booking styles.

## 2026-05-12 Codex Product Card And Buyer Intent Pass

Completed:
- Added a global GPI product-card override for active card layout 06 in `assets/component-card-06.css`.
- Normalized product-card media frames, image containment, card height, title rhythm, pricing position, and button radius through the existing GPI token system.
- Preserved list-view/search/nav exceptions so compact theme surfaces are not over-framed.
- Removed internal planning copy from the `home-concierge-cta` schema defaults and replaced it with customer-facing buyer-assist language.
- Tightened homepage buyer-intent routing by changing negative helper copy into positive shortlist copy and correcting bracelet CTAs away from the frontpage collection.
- Mirrored the changed card CSS and concierge CTA section into `giftpalaceindia-restored-1am`.

Validation:
- `assets/component-card-06.css` brace check passed.
- `sections/home-concierge-cta.liquid` schema parses.
- Main build still parses with 25 sections, 25 order entries, no missing section files.

## 2026-05-12 Codex Visual Completion Pass

Completed:
- Added a real gemstone visual cluster to the second homepage section using existing compressed theme assets.
- Added reliable fallback imagery to every active Trust Proof card when no Shopify image is configured.
- Added gemstone images to the active Shop By Intention / Meaning Guide cards.
- Added a final cascade lock in `assets/component-home-spacing-alignment.css` to remove remaining section margin drift and unify product-card CTAs into one pill-button style.
- Added detailed replacement prompts at `docs/GPI_IMAGE_GENERATION_PROMPTS.md` for future generated second-section, trust, and intention imagery.
- Mirrored all edited files into `giftpalaceindia-restored-1am`.

Validation:
- Main and 1am backup builds parse with 25 sections, 25 order entries, no missing section files.
- Touched CSS brace checks passed in both builds.
- Touched section schemas parse in both builds.
- Shopify `theme check` was attempted but timed out after 2 minutes; targeted validation completed successfully.

## 2026-05-12 Codex Homepage Card Lock Pass

Completed:
- Added a stronger homepage-only product-card lock to neutralize mixed legacy card actions, variant panels, compare rows, wishlist rows, and quickview bottoms.
- Forced homepage product cards into one card height/media/title/price/button rhythm across carousel/grid product surfaces.
- Tightened legacy section wrapper and footer spacing so inherited `halo-block` margins create less vertical drift.
- Mirrored latest section/CSS work into `giftpalaceindia-restored-1am`.

Validation:
- `assets/component-home-spacing-alignment.css` brace check passed.
- Main and 1am backup builds parse with 25 sections, 25 order entries, no missing section files.

Follow-up completed:
- Filled the active sixth `home_meaning_guide` card with a finished Ruby / Confidence route instead of leaving a blank intention card.
- Replaced the remaining internal schema default copy in `home-meaning-guide` with customer-facing copy.
- Pointed the new Confidence route to the known `gemstones` collection instead of an unverified new handle.

## 2026-05-12 Codex Gap And Wardrobe Priority Fix

Completed:
- Fixed the actual homepage gap source by overriding the old `#MainContent .shopify-section { padding-top: 100px !important; }` rule directly.
- Reduced hero vertical minimums/padding so the first viewport no longer creates a large empty band before content.
- Moved rendered homepage order to: hero, conversion intro, Certified Gemstone Edits, Gemstone Wardrobe, Trust Proof.
- Redesigned the Gemstone Wardrobe/brand-slider section through the GPI design system: framed cards, contained product imagery, token typography, compact spacing, and mobile horizontal scroll.
- Equalized Certified Gemstone Edits product-card heights, title rows, price rows, media frames, and card information area.
- Added missing `snippets/dark-mode-toggle.liquid` compatibility snippet to remove the visible Liquid render error from the header.
- Mirrored `templates/index.json`, spacing CSS, and dark-mode compatibility snippet into `giftpalaceindia-restored-1am`.

Validation:
- Main and 1am backup first rendered sections now match: `home-luxury-hero > home-conversion-intro > product-block > brand-slider > home-trust-proof`.
- `assets/component-home-spacing-alignment.css` brace check passed in main and backup.
- Main and backup `templates/index.json` hashes match after sync.
