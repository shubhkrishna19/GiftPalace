# Homepage Moonmagic Redesign - Design Specification

**Date:** 2026-04-24  
**Status:** APPROVED - Ready for Implementation  
**Approach:** Full-Site Template Adoption (Approach 3)  
**Timeline:** 24-32 hours  
**Focus:** Maximum visual + customer impact

---

## Executive Summary

Remake Gift Palace India homepage using MoonMagic's proven structure as the template. All MoonMagic patterns (hero + trust stack + image-first + compact + gift-intention framing) are non-negotiable. Pragmatic speed-first approach with parallel agents coordinating on discrete sections.

---

## Design Objective

Ship a MoonMagic-quality homepage within 32 hours that:
- Uses MoonMagic's structural template (not a copy, an adaptation)
- Maintains Gift Palace's trust-first gemstone narrative
- Prioritizes image-first visual language (imagery dominates)
- Implements compact information architecture (no long-form above fold)
- Remains responsive at all breakpoints (320px → 1440px)
- Uses existing design system tokens (no new colors/spacing)
- Prevents conflicts between parallel Claude instances

---

## Reference Materials

**Primary Reference:**
- MoonMagic live homepage: https://moonmagic.com
- Extract patterns: hero layout, trust placement, spacing, image treatment, typography, color usage

**Secondary Reference:**
- `design-system/gift-palace-india/MASTER.md` (design tokens, locked)
- `docs/reference-sites/MOONMAGIC_REFERENCE_NOTES.md` (existing guidance)

---

## Content Mapping: MoonMagic Structure → Gift Palace Content

| MoonMagic Section | Purpose | Gift Palace Equivalent | Status | Notes |
|---|---|---|---|---|
| **Hero** | Single focused message + primary CTA | "Since 1989 / Certified Gemstones" + hero image | New | Image-first, single headline, one CTA |
| **Trust Stack** | Reassurance anchors below/near hero | GJEPC badge, certified, consultation CTA | Exists (needs repositioning) | Move to first-screen visibility |
| **Discover Rail** | Browse entry: gemstone types + intention | Gemstone collections + meaning/intention | Exists (needs compacting) | Minimal nav, image-supported |
| **Featured Browse Grid** | Product cards, image-led | Best-sellers / featured collections | Exists (needs style audit) | Compact cards: image + name + price + trust cue |
| **Gift Framing** | Intention/meaning context | "Gift Ready" + meaning guides | Exists (needs visual tightening) | Minimal text, strong imagery |
| **Trust Modules** | Educational, reassurance | Consultation, authenticity, shipping | Exists (move to lower sections) | Accordion-based, specs-heavy |
| **Footer Trust Center** | Bottom reassurance layer | Support, shipping, about, reviews | Complete (reuse) | Already aligned |

---

## Phase 1: MoonMagic Pattern Extraction (2-3 hrs)

**Tasks:**
1. Study MoonMagic homepage live (desktop + mobile)
2. Document:
   - Hero: Layout (full-width? side image?), headline structure, CTA copy + placement, image treatment
   - Trust anchors: Count, placement, visual style (badges? text? inline?)
   - Discover section: Card format, spacing, sorting options visibility
   - Navigation: Compact structure, image support, dropdown style
   - Typography: Headline hierarchy (sizes, weights), body restraint, uppercase usage
   - Spacing: Section gaps, card internals, breathing room
   - Color: Neutral palette dominance, accent placement, border treatment
   - Motion: Hover states, transitions (if any)

3. Save pattern notes to `docs/MOONMAGIC_PATTERN_EXTRACT.md`

**Output:** Pattern extraction document (reference for all agents)

---

## Phase 2: Content Mapping (1-2 hrs)

**Deliverable:** Updated mapping table (above) with specific Gift Palace content + image references

**Key Decisions:**
- Hero headline: Short, emotional but factual (e.g., "Certified Gemstones. Trusted Since 1989.")
- Hero image: Hero product shot or gemstone cluster (high quality, editorial)
- Trust anchors: GJEPC, Certified, Consultation (WhatsApp), Insured shipping
- Browse entry: Gemstone type (Ruby, Emerald, etc.) + Intention (Love, Clarity, etc.) tabs
- Card format: Product image → name → gem type → price → one trust cue
- Gift framing: Short copy ("Perfect for…") + image

---

## Phase 3: Parallel Build (18-24 hrs)

### Agent Assignments

| Agent | Section | Component File | CSS File | Effort | Dependencies |
|---|---|---|---|---|---|
| **Agent 1: Hero & Trust** | Hero section + Trust anchors | `sections/home-hero-moonmagic.liquid` | `assets/component-home-hero-moonmagic.css` | 4-6 hrs | Pattern extract doc |
| **Agent 2: Discover Rail** | Gemstone/intention browse | `sections/home-discover-rail.liquid` | `assets/component-home-discover-rail.css` | 4-6 hrs | Hero completion |
| **Agent 3: Browse Grid** | Product cards + grid system | `sections/home-featured-browse.liquid` | `assets/component-home-featured-browse.css` | 4-6 hrs | Design tokens |
| **Agent 4: Visual Polish** | Spacing, typography, responsive QA | (across all sections) | (audit all CSS files) | 4-6 hrs | All sections drafted |

### Coordination Protocol

**Source of Truth:**
- Design tokens: `design-system/gift-palace-india/MASTER.md` (READ-ONLY)
- Current status: `docs/HOMEPAGE_REBUILD_COORDINATION.md` (live updates)
- Git: Single source for code changes

**Workflow:**
1. **Before starting:** Agent checks `docs/HOMEPAGE_REBUILD_COORDINATION.md` for status + blockers
2. **During work:** Agent owns ONE section file + ONE CSS file (no overlaps)
3. **CSS rules:** 
   - Scoped to component (use `.home-hero`, `.home-discover`, `.home-browse` prefixes)
   - No global overwrites (e.g., no modifying `layout/theme.liquid` without team approval)
   - Use existing design tokens (`--gpi-color-*`, `--gpi-space-*`, `--gpi-radius-*`, `--gpi-shadow-*`)
4. **Handoff points:**
   - Hero ships → Discover Rail adapts spacing/color from hero
   - Discover complete → Browse Grid uses same token hierarchy
   - Grid complete → Polish passes final QA at all breakpoints
5. **Git commits:** Frequent, clear messages (e.g., "feat: Homepage hero section per MoonMagic template")
6. **Conflict prevention:** 
   - Agents commit after each logical unit (don't hoard work)
   - Check git status before starting; pull latest before writing
   - If conflict: merge strategically (prefer design system tokens over individual overrides)
7. **Communication:** Update `HOMEPAGE_REBUILD_COORDINATION.md` after each agent milestone

---

## Section Specifications

### Section 1: Hero + Trust Anchors

**File:** `sections/home-hero-moonmagic.liquid`  
**CSS:** `assets/component-home-hero-moonmagic.css`

**Structure:**
```
Hero Container
├── Hero Image (full-width or side-positioned)
├── Hero Content
│   ├── Eyebrow (optional, short)
│   ├── Headline (short, 1-2 lines)
│   ├── Subheading (optional, one line)
│   └── Primary CTA Button
└── Trust Anchors (below or beside hero)
    ├── Trust badge 1 (e.g., "GJEPC Certified")
    ├── Trust badge 2 (e.g., "Since 1989")
    └── Trust badge 3 (e.g., "WhatsApp Consultation")
```

**Content Examples:**
- **Headline:** "Certified Gemstones. Trusted Since 1989."
- **Subheading:** "Authentic, insured, and gift-ready."
- **CTA:** "Browse Collections" or "Start Your Story"
- **Trust anchors:** "GJEPC Certified" | "25+ Years" | "WhatsApp Help"

**Design Rules (from MoonMagic patterns):**
- Image dominates (60-70% of space)
- Headline is calm, not aggressive
- One primary CTA only
- Trust anchors visible on first screen
- Responsive: Stack to single column on mobile
- Spacing: Use `--gpi-space-7` and `--gpi-space-8` for breathing room

---

### Section 2: Discover Rail (Gemstone/Intention Browse)

**File:** `sections/home-discover-rail.liquid`  
**CSS:** `assets/component-home-discover-rail.css`

**Structure:**
```
Discover Container
├── Section Header
│   ├── Title ("Discover by Gemstone" or "Browse by Intention")
│   └── Optional: Short description
├── Tab/Filter System
│   ├── Tab 1: Gemstone types (Ruby, Emerald, Sapphire, etc.)
│   └── Tab 2: Intention (Love, Clarity, Prosperity, etc.)
└── Browse Grid (compact cards)
    └── Cards (image + name + link)
```

**Design Rules:**
- Tabs are compact, minimal
- Cards are image-first (image takes 80%+ of card space)
- One short label per card
- Hover state: Subtle lift or opacity change
- Spacing: Tight padding within cards (`--gpi-space-3` to `--gpi-space-4`)
- Mobile: Single column or staggered grid

---

### Section 3: Featured Browse Grid (Product Cards)

**File:** `sections/home-featured-browse.liquid`  
**CSS:** `assets/component-home-featured-browse.css`

**Structure:**
```
Browse Grid
├── Grid Header (optional)
│   ├── Title ("Featured Collections" or "Best Sellers")
│   └── Optional: "View All" link
└── Card Grid (responsive: 2-4 columns depending on breakpoint)
    └── Card (repeated)
        ├── Product Image
        ├── Product Name
        ├── Gemstone Type (optional)
        ├── Price
        └── Trust Cue (1 short badge or text, e.g., "Certified")
```

**Card Anatomy:**
```
┌─────────────────┐
│                 │
│   Product       │ ← Image-first (takes 70%+ of card)
│   Image         │
│                 │
├─────────────────┤
│ Product Name    │
│ Gemstone Type   │ ← Minimal text
│ ₹XX,XXX         │
│ ✓ Certified     │ ← Trust cue
└─────────────────┘
```

**Design Rules:**
- Image-led (no text on image)
- Minimal text below image
- Price visible but not emphasized
- One trust cue per card (max)
- Padding: `--gpi-space-4` (compact but breathable)
- Hover: Image zoom (5-10%) or card lift
- Breakpoints: 2 cols @ 320px, 3 cols @ 768px, 4 cols @ 1024px+

---

### Section 4: Gift Framing / Meaning Modules

**File:** Reuse existing `sections/home-meaning-guide.liquid`  
**CSS:** `assets/component-home-meaning-guide.css` (audit + tighten)

**Design Rules:**
- Short headline + image + link to collection
- No long-form copy above fold
- Image-first (support + visual)
- Compact spacing
- Responsive: Single column on mobile

---

## Responsive Breakpoints

Test at all key sizes:
- **320px** (mobile)
- **375px** (mobile large)
- **768px** (tablet)
- **1024px** (desktop)
- **1440px** (large desktop)

**Mobile-specific rules:**
- Stack all sections single-column
- Hero: Image above text
- Cards: 2-column grid
- Typography: Reduce headline size (but keep hierarchy)
- Spacing: Reduce section gaps (use `--gpi-space-5` instead of `--gpi-space-7`)

---

## Design System Token Usage

**Mandate:** Use existing tokens from `design-system/gift-palace-india/MASTER.md`. Do not introduce new colors/spacing.

**Key tokens:**
- **Colors:** `--gpi-color-ink-strong`, `--gpi-color-accent-gold`, `--gpi-color-surface-ivory`, `--gpi-color-border-soft`
- **Spacing:** `--gpi-space-3` through `--gpi-space-8`
- **Typography:** `--gpi-font-heading` (Cormorant Garamond), `--gpi-font-body` (Montserrat)
- **Radius:** `--gpi-radius-small` (12px), `--gpi-radius-card` (18px)
- **Shadows:** `--gpi-shadow-low`, `--gpi-shadow-medium`, `--gpi-shadow-high`

---

## Success Criteria

✅ **Visual**
- Homepage matches MoonMagic aesthetic (image-first, compact, refined)
- All 4 MoonMagic patterns present (hero + trust + compact + image-first)
- Responsive at 320, 768, 1024, 1440px
- No visual regressions (header, footer, nav intact)

✅ **Technical**
- All sections use design system tokens
- CSS scoped (no global overwrites)
- Zero conflicts between parallel Claude instances
- Liquid syntax valid (Theme Check passes)
- Git history clean (logical commits)

✅ **Timeline**
- Delivered within 32 hours
- All 4 agents coordinate without blocking each other

✅ **Business Impact**
- Homepage ready for A/B test vs. current version
- Expected to improve conversion through:
  - Higher trust visibility (trust anchors first-screen)
  - Clearer browse intent (gemstone + intention)
  - Stronger image treatment (editorial quality)
  - Reduced cognitive load (minimal text, compact info)

---

## Out of Scope

- Collection pages (can harmonize later)
- Product detail pages (can harmonize later)
- Blog/guides hub
- Meta Pixel integration
- Trust-center pages
- Any changes to header, footer, or navigation structure (reuse existing)

---

## Blockers & Risks

| Risk | Mitigation |
|---|---|
| Parallel Claude conflicts | Clear section ownership + git discipline |
| MoonMagic pattern misinterpretation | Pattern extraction doc shared with all agents |
| Responsive breakpoints | Agent 4 (Polish) does comprehensive QA |
| Design token mismatch | All agents reference MASTER.md (locked) |
| Git merge conflicts | Frequent small commits; communicate blockers |

---

## Next Steps (After Approval)

1. ✅ Design approved
2. → Write implementation plan (writing-plans skill)
3. → Create coordination workflow file
4. → Dispatch 4 parallel agents
5. → Agent 1 extracts MoonMagic patterns
6. → Agents 2-3 begin section builds in parallel
7. → Agent 4 conducts final QA
8. → Merge to main, test live

---

**Design Approved By:** User  
**Date Approved:** 2026-04-24  
**Ready for Implementation:** YES ✅
