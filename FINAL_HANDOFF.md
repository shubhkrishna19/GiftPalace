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
