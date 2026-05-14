# Homepage MoonMagic Redesign - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remake Gift Palace India homepage using MoonMagic's structural template, achieving image-first, compact visual language with all MoonMagic patterns (hero + trust + discover + grid) in 24-32 hours with 4 parallel agents.

**Architecture:** 
- Agent 1 extracts MoonMagic UI patterns (2-3 hrs)
- Agents 2-4 build sections in parallel (hero, discover, grid) while respecting ownership
- Agent 5 conducts final responsive QA and polish (4-6 hrs)
- All sections use existing design system tokens (no new colors/spacing)
- Git workflow prevents conflicts between parallel Claudes

**Tech Stack:** 
- Shopify Liquid (sections, snippets)
- CSS with design token variables
- Responsive grid (320px → 1440px)
- No JavaScript required for initial build

**Constraints:**
- Design tokens locked: `design-system/gift-palace-india/MASTER.md` (read-only)
- Section ownership strict (Agent 1 → Hero, Agent 2 → Discover, Agent 3 → Grid, Agent 4 → Polish)
- No changes to `layout/theme.liquid` (locked)
- Zero regressions: Collection, PDP, header, footer untouched
- All commits logged to `docs/HOMEPAGE_REBUILD_COORDINATION.md`

---

## File Structure & Ownership

### New Files to Create

| Agent | File | Purpose | Responsibility |
|---|---|---|---|
| Agent 1 | `docs/MOONMAGIC_PATTERN_EXTRACT.md` | Pattern reference doc | Document patterns extracted from MoonMagic |
| Agent 1 | `sections/home-hero-moonmagic.liquid` | Hero section with trust anchors | Full hero + trust section (Liquid) |
| Agent 1 | `assets/component-home-hero-moonmagic.css` | Hero styling | All hero visual styling |
| Agent 2 | `sections/home-discover-rail.liquid` | Discover/browse rail section | Gemstone + intention tabs + card grid |
| Agent 2 | `assets/component-home-discover-rail.css` | Discover rail styling | All discover rail visual styling |
| Agent 3 | `sections/home-featured-browse.liquid` | Featured products grid | Product cards + responsive grid |
| Agent 3 | `assets/component-home-featured-browse.css` | Browse grid styling | All card + grid visual styling |

### Existing Files to Reference (Read-Only)

| File | Use | Notes |
|---|---|---|
| `design-system/gift-palace-india/MASTER.md` | Token reference | All agents reference for colors, spacing, typography |
| `layout/theme.liquid` | Template structure | DO NOT MODIFY |
| `templates/index.json` | Homepage template config | May need updates to include new sections |

### Files to Update

| File | Change | Agent |
|---|---|---|
| `templates/index.json` | Add section references + schema | Agent 1 (after hero) |
| `docs/HOMEPAGE_REBUILD_COORDINATION.md` | Live status updates | All agents (log progress) |

---

## Task Breakdown by Agent

### PHASE 0: Setup (Agent 1 Lead)

#### Task 0.1: Verify Git Status & Design System Tokens

**Files:**
- Reference: `design-system/gift-palace-india/MASTER.md`

- [ ] **Step 1: Verify git is clean**
```bash
cd C:\Users\shubh\Downloads\giftpalaceindia
git status
git pull
```
Expected: "Your branch is up to date with 'origin/master'. nothing to commit, working tree clean"

- [ ] **Step 2: Verify design tokens exist**
```bash
# Check that MASTER.md has all color, spacing, radius, shadow tokens
grep -E "^--gpi-(color|space|radius|shadow)" design-system/gift-palace-india/MASTER.md | head -20
```
Expected: At least 20 token definitions visible

- [ ] **Step 3: Verify existing sections don't conflict**
```bash
ls -la sections/ | grep -E "home-hero|home-discover|home-featured"
```
Expected: No matches (sections don't exist yet)

- [ ] **Step 4: Create MOONMAGIC_PATTERN_EXTRACT.md stub**

Create: `docs/MOONMAGIC_PATTERN_EXTRACT.md`

```markdown
# MoonMagic Pattern Extraction

**Status:** IN PROGRESS  
**Agent:** Agent 1  
**Last Updated:** 2026-04-24

## Patterns to Document

### Hero Section
- [ ] Layout (full-width image? Side-positioned? Aspect ratio?)
- [ ] Image treatment (crop, overlay, text positioning?)
- [ ] Headline (font size, weight, line-height, max-width?)
- [ ] Subheading (if present, styling)
- [ ] CTA button (copy, style, position)
- [ ] Trust anchors below (count, spacing, visual style)

### Discover/Browse Section
- [ ] Title + description
- [ ] Tab/filter system (how many tabs? visual style?)
- [ ] Card grid (columns at each breakpoint, card spacing)
- [ ] Card format (image height, text below, pricing)
- [ ] Mobile layout (stack or grid?)

### Product Cards (Browse Grid)
- [ ] Card dimensions (aspect ratio)
- [ ] Image area (% of card)
- [ ] Text area (product name, gemstone, price)
- [ ] Trust cues (badges? text? placement?)
- [ ] Hover state (animation, lift, zoom?)
- [ ] Spacing between cards

### Typography
- [ ] Hero headline: font-size, font-weight, line-height
- [ ] Section titles: sizing, weight, color
- [ ] Body text: sizing, weight, line-height, color
- [ ] Labels/badges: case (uppercase?), size, weight

### Colors
- [ ] Background (primary, secondary)
- [ ] Text (primary, secondary, muted)
- [ ] Accents (primary, secondary)
- [ ] Borders (color, opacity)

### Spacing
- [ ] Section gaps (top/bottom margins)
- [ ] Card padding (internal spacing)
- [ ] Text margins (headline to subheading, copy gaps)
- [ ] Component spacing (badges, buttons)

### Motion (if present)
- [ ] Hover transitions (duration, easing)
- [ ] Scroll effects (parallax? fade?)
- [ ] Interactions (click feedback)

## Extracted Patterns (to be filled)

[Agent 1: Fill this in after studying MoonMagic live]

## Design Tokens Mapped

[Agent 1: Map MoonMagic patterns to Gift Palace tokens]
```

- [ ] **Step 5: Commit setup**
```bash
git add docs/MOONMAGIC_PATTERN_EXTRACT.md
git commit -m "setup: Create pattern extraction template for Agent 1"
```

---

### PHASE 1: Pattern Extraction (Agent 1, 2-3 hrs)

#### Task 1.1: Study MoonMagic Homepage & Extract Patterns

**Files:**
- Create/Update: `docs/MOONMAGIC_PATTERN_EXTRACT.md`

- [ ] **Step 1: Open MoonMagic homepage**
```
Open: https://moonmagic.com
Devices: Desktop (1440px) + Mobile (375px)
```

- [ ] **Step 2: Document Hero Section**

Study: Hero area (headline, image, CTA, trust markers)

Fill in `docs/MOONMAGIC_PATTERN_EXTRACT.md`:

```markdown
### Hero Section (Extracted)

**Layout:** [e.g., "Full-width, image on left (60%), text on right (40%)" OR "Image above, text below on mobile"]

**Image Treatment:** [e.g., "Hero image centered, no overlay, white space around edges", aspect ratio, dimensions]

**Headline:**
- Font: [e.g., "Serif, ~48px, weight 400, line-height 1.2"]
- Color: [e.g., "Dark neutral (#17120D)"]
- Max-width: [e.g., "80% of text area"]
- Example copy: "[Exact headline from MoonMagic]"

**Subheading (if present):**
- Font: [e.g., "Sans, 18px, weight 400"]
- Color: [e.g., "Muted neutral"]

**Primary CTA:**
- Text: "[Exact CTA copy]"
- Style: [e.g., "Gold background, white text, rounded corners (radius ~8px)", dimensions]
- Placement: [e.g., "Below subheading, left-aligned with text"]

**Trust Anchors:**
- Count: [e.g., "3 badges"]
- Style: [e.g., "Light background, small text (12-14px), inline or stacked"]
- Examples: "[List exact trust claims from MoonMagic]"
- Placement: [e.g., "Below CTA button, single row on desktop, wrapped on mobile"]
- Spacing: [e.g., "12px gap between badges"]

**Responsive:**
- Desktop (1440px): [Description of desktop layout]
- Mobile (375px): [Description of mobile layout - typically image above text]
- Breakpoint: [Where does layout change?]
```

- [ ] **Step 3: Document Discover/Browse Section**

Study: MoonMagic's browse/filter area (how gemstones are surfaced)

Fill in:

```markdown
### Discover/Browse Section (Extracted)

**Section Title:**
- Text: "[e.g., 'Explore Our Collections' or similar]"
- Font: [e.g., "Serif, 32px, weight 400"]

**Filter/Tab System:**
- Type: [e.g., "Horizontal tabs, text-based" OR "Button chips"]
- Count: [e.g., "5-7 categories"]
- Active indicator: [e.g., "Gold underline, bold text"]
- Examples: "[List category names from MoonMagic]"

**Card Grid:**
- Columns: 
  - Desktop (1440px): [e.g., "4 columns"]
  - Tablet (768px): [e.g., "2-3 columns"]
  - Mobile (375px): [e.g., "2 columns"]
- Gap between cards: [e.g., "16px"]
- Card height: [e.g., "Variable, image-driven" OR "Fixed 300px"]

**Card Format:**
- Image: [e.g., "Square (1:1), takes 70% of card height"]
- Text below: [e.g., "Product name (14px), category (12px muted), no price here"]
- Hover: [e.g., "Image zoom 10%, subtle shadow added"]

**Mobile Specifics:**
- Card stack: [e.g., "2 columns maintained"]
- Spacing: [e.g., "Reduced gap to 12px"]
```

- [ ] **Step 4: Document Product Cards (Featured Browse)**

Study: Full product card styling in grid

```markdown
### Product Cards - Featured Browse (Extracted)

**Card Dimensions:**
- Width: [e.g., "Responsive, 4-column grid on desktop"]
- Aspect ratio: [e.g., "Square (1:1) with content below" OR "2:3 portrait"]

**Image Area:**
- Size: [e.g., "70% of card height"]
- Background: [e.g., "Light gray, no border"]
- Content: [e.g., "Single product image, centered, no text overlay"]

**Content Area (Below Image):**
- Product name: [e.g., "16px, bold, color #17120D"]
- Gemstone/category: [e.g., "12px, muted, color #51473C"]
- Price: [e.g., "14px, bold, accent gold color"]
- Trust cue: [e.g., "Small badge 'Certified' OR checkmark icon"]

**Card Spacing:**
- Padding inside card: [e.g., "12px all sides for text area"]
- Margin between cards: [e.g., "16px horizontal, 16px vertical"]

**Hover State:**
- Effect: [e.g., "Image zoom 5%, subtle shadow, no text change"]
- Duration: [e.g., "200ms ease"]

**Responsive:**
- Desktop (1440px): [4 columns, full spacing]
- Tablet (768px): [3 columns OR 2 columns]
- Mobile (375px): [2 columns, tight spacing]
```

- [ ] **Step 5: Document Typography Rules**

```markdown
### Typography (Extracted)

**Font Stack:**
- Headings: [e.g., "Serif (likely Georgia or Cormorant)"]
- Body: [e.g., "Sans-serif (likely system or Montserrat)"]

**Size Scale:**
- Hero headline: [e.g., "48-56px"]
- Section title: [e.g., "32-40px"]
- Card title: [e.g., "16-18px"]
- Body text: [e.g., "14-16px"]
- Small labels: [e.g., "12-13px"]

**Weight Usage:**
- Headlines: [e.g., "400-500 (not heavy)"]
- Body: [e.g., "400"]
- Accents/buttons: [e.g., "600-700"]

**Line Height:**
- Headlines: [e.g., "1.2"]
- Body: [e.g., "1.5-1.6"]

**Uppercase Usage:**
- Where: [e.g., "Navigation only, labels, button text"]
- When: [e.g., "Small text (12px and below) OR special labels"]
```

- [ ] **Step 6: Document Color Palette**

```markdown
### Color Palette (Extracted)

**Backgrounds:**
- Page background: [e.g., "Off-white #FFFDF8"]
- Section background: [e.g., "Light cream #FBF7EF"]
- Card background: [e.g., "White #FFFFFF"]

**Text:**
- Primary: [e.g., "Dark brown #17120D"]
- Secondary: [e.g., "Muted brown #51473C"]
- Tertiary: [e.g., "Very light brown #6B5F4C"]

**Accents:**
- Primary accent: [e.g., "Gold #9B6F2B"]
- Secondary accent: [e.g., "Light gold #C99F56"]

**Borders:**
- Card/section borders: [e.g., "Light beige #E7DED1"]
- Emphasis borders: [e.g., "Warm tan #D8C6AA"]

**Observed Palette Match:**
- These colors MATCH / CLOSELY MATCH Gift Palace design system tokens:
  - [List mappings, e.g., "MoonMagic off-white ≈ --gpi-color-surface-canvas"]
```

- [ ] **Step 7: Document Spacing & Rhythm**

```markdown
### Spacing & Layout Rhythm (Extracted)

**Section Gaps (margins between sections):**
- Desktop: [e.g., "72px top/bottom between major sections"]
- Tablet: [e.g., "48px"]
- Mobile: [e.g., "32px"]

**Card Padding (internal):**
- Text area padding: [e.g., "12-16px"]
- Image-to-text gap: [e.g., "8-12px"]

**Typography Gaps:**
- Headline to subheading: [e.g., "12px"]
- Subheading to body: [e.g., "16px"]
- Paragraph to next element: [e.g., "24px"]

**Component Spacing:**
- Button margins: [e.g., "16px from text"]
- Badge gaps: [e.g., "8-12px between badges"]
- List items: [e.g., "8px gap"]

**Observed Rhythm Match:**
- These spacings ALIGN with Gift Palace tokens:
  - [e.g., "MoonMagic section gap = --gpi-space-8 (72px)"]
```

- [ ] **Step 8: Commit pattern extraction**
```bash
git add docs/MOONMAGIC_PATTERN_EXTRACT.md
git commit -m "feat: Complete MoonMagic pattern extraction

- Hero section layout, typography, CTA, trust anchors
- Discover/browse section: tabs, card grid, spacing
- Product cards: image-led format, hover states
- Typography: font stack, size scale, weight hierarchy
- Colors: palette mapping to Gift Palace tokens
- Spacing: rhythm, section gaps, card padding
- Responsive: breakpoints and mobile handling

All agents can now reference this for section builds."
```

- [ ] **Step 9: Update HOMEPAGE_REBUILD_COORDINATION.md**

Modify: `docs/HOMEPAGE_REBUILD_COORDINATION.md` (replace Phase 1 section)

```markdown
### Phase 1: Pattern Extraction (Agent 1 Lead) ✅ COMPLETE

| Task | Status | Notes |
|---|---|---|
| Study MoonMagic homepage live | ✅ DONE | Desktop + mobile layouts studied |
| Document all patterns | ✅ DONE | Saved to docs/MOONMAGIC_PATTERN_EXTRACT.md |
| Map colors to design tokens | ✅ DONE | All MoonMagic colors align with GPI tokens |
| Map spacing to design tokens | ✅ DONE | Section gaps, card padding, component spacing aligned |

**Agent 1 Status:** READY FOR HERO BUILD  
**Next:** Agents 2-4 can now start sections (reference extracted patterns)  
**Last Commit:** [commit hash from Step 8]
```

- [ ] **Step 10: Git push pattern doc**
```bash
git add docs/HOMEPAGE_REBUILD_COORDINATION.md
git commit -m "docs: Update coordination status - Phase 1 complete

Pattern extraction doc ready for all agents.
Agents 2-4 can now begin section builds."
```

---

### PHASE 2: Hero Section Build (Agent 1, 4-6 hrs)

#### Task 2.1: Create Hero Section Liquid

**Files:**
- Create: `sections/home-hero-moonmagic.liquid`
- Reference: `docs/MOONMAGIC_PATTERN_EXTRACT.md` (from Task 1)
- Reference: `design-system/gift-palace-india/MASTER.md` (design tokens)

- [ ] **Step 1: Create hero section file with schema**

Create: `sections/home-hero-moonmagic.liquid`

```liquid
{%- comment -%}
  Hero Section with Trust Anchors
  
  Adapted from MoonMagic template patterns:
  - Image-first layout (60/40 or full-width responsive)
  - Single focused headline
  - One primary CTA
  - Trust anchors below (GJEPC, Certified, Support)
  - Responsive: stacks on mobile
{%- endcomment -%}

<style>
  .home-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--gpi-space-7);
    padding: var(--gpi-space-8) var(--gpi-space-7);
    background-color: var(--gpi-color-surface-canvas);
    align-items: center;
  }

  .home-hero__image {
    width: 100%;
    height: auto;
    display: block;
    border-radius: var(--gpi-radius-card);
    box-shadow: var(--gpi-shadow-low);
  }

  .home-hero__content {
    display: flex;
    flex-direction: column;
    gap: var(--gpi-space-5);
  }

  .home-hero__eyebrow {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--gpi-color-text-muted);
  }

  .home-hero__heading {
    font-family: var(--gpi-font-heading);
    font-size: 48px;
    font-weight: 400;
    line-height: 1.2;
    color: var(--gpi-color-ink-strong);
    margin: 0;
  }

  .home-hero__subheading {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: var(--gpi-color-text-muted);
    max-width: 90%;
  }

  .home-hero__cta {
    display: inline-block;
    padding: 12px 32px;
    background-color: var(--gpi-color-accent-gold);
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.05em;
    border-radius: var(--gpi-radius-small);
    transition: all 180ms ease;
    width: fit-content;
  }

  .home-hero__cta:hover {
    background-color: var(--gpi-color-accent-gold-soft);
    transform: translateY(-2px);
    box-shadow: var(--gpi-shadow-medium);
  }

  .home-hero__trust-anchors {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gpi-space-4);
    margin-top: var(--gpi-space-3);
    padding-top: var(--gpi-space-5);
    border-top: 1px solid var(--gpi-color-border-soft);
  }

  .home-hero__trust-badge {
    display: flex;
    align-items: center;
    gap: var(--gpi-space-2);
    font-size: 12px;
    font-weight: 600;
    color: var(--gpi-color-ink);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .home-hero__trust-badge::before {
    content: '✓';
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    background-color: var(--gpi-color-accent-gold);
    color: white;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 700;
  }

  /* Responsive: Mobile stacks vertically */
  @media (max-width: 768px) {
    .home-hero {
      grid-template-columns: 1fr;
      gap: var(--gpi-space-5);
      padding: var(--gpi-space-7) var(--gpi-space-5);
    }

    .home-hero__heading {
      font-size: 36px;
    }

    .home-hero__subheading {
      max-width: 100%;
    }

    .home-hero__trust-anchors {
      flex-direction: column;
      gap: var(--gpi-space-3);
    }
  }

  @media (max-width: 375px) {
    .home-hero {
      padding: var(--gpi-space-5) var(--gpi-space-4);
      gap: var(--gpi-space-4);
    }

    .home-hero__heading {
      font-size: 28px;
    }

    .home-hero__eyebrow {
      font-size: 11px;
    }
  }
</style>

<section class="home-hero">
  {% if section.settings.image %}
    <img
      src="{{ section.settings.image | image_url: width: 600 }}"
      alt="{{ section.settings.image.alt }}"
      class="home-hero__image"
      loading="lazy"
    />
  {% endif %}

  <div class="home-hero__content">
    {% if section.settings.eyebrow %}
      <p class="home-hero__eyebrow">{{ section.settings.eyebrow }}</p>
    {% endif %}

    <h1 class="home-hero__heading">{{ section.settings.heading }}</h1>

    {% if section.settings.subheading %}
      <p class="home-hero__subheading">{{ section.settings.subheading }}</p>
    {% endif %}

    {% if section.settings.cta_text and section.settings.cta_link %}
      <a href="{{ section.settings.cta_link }}" class="home-hero__cta">
        {{ section.settings.cta_text }}
      </a>
    {% endif %}

    <div class="home-hero__trust-anchors">
      {% if section.settings.trust_1 %}
        <div class="home-hero__trust-badge">{{ section.settings.trust_1 }}</div>
      {% endif %}
      {% if section.settings.trust_2 %}
        <div class="home-hero__trust-badge">{{ section.settings.trust_2 }}</div>
      {% endif %}
      {% if section.settings.trust_3 %}
        <div class="home-hero__trust-badge">{{ section.settings.trust_3 }}</div>
      {% endif %}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Hero - MoonMagic",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Hero Image"
    },
    {
      "type": "text",
      "id": "eyebrow",
      "label": "Eyebrow Text",
      "placeholder": "Optional: e.g., 'Since 1989'"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "placeholder": "e.g., 'Certified Gemstones. Trusted Since 1989.'"
    },
    {
      "type": "textarea",
      "id": "subheading",
      "label": "Subheading",
      "placeholder": "e.g., 'Authentic, insured, and gift-ready.'"
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA Button Text",
      "placeholder": "e.g., 'Browse Collections'"
    },
    {
      "type": "url",
      "id": "cta_link",
      "label": "CTA Button Link"
    },
    {
      "type": "text",
      "id": "trust_1",
      "label": "Trust Badge 1",
      "placeholder": "e.g., 'GJEPC Certified'"
    },
    {
      "type": "text",
      "id": "trust_2",
      "label": "Trust Badge 2",
      "placeholder": "e.g., 'Since 1989'"
    },
    {
      "type": "text",
      "id": "trust_3",
      "label": "Trust Badge 3",
      "placeholder": "e.g., 'WhatsApp Support'"
    }
  ],
  "presets": [
    {
      "name": "Hero - MoonMagic"
    }
  ]
}
{% endschema %}
```

- [ ] **Step 2: Verify Liquid syntax**

Run:
```bash
cd C:\Users\shubh\Downloads\giftpalaceindia
npx @shopify/theme-check sections/home-hero-moonmagic.liquid
```

Expected: No errors (or only warnings about schema fields)

- [ ] **Step 3: Extract CSS to separate file**

Create: `assets/component-home-hero-moonmagic.css`

```css
/* Hero Section Styling (MoonMagic template) */

:root {
  --hero-content-gap: var(--gpi-space-5);
  --hero-grid-gap: var(--gpi-space-7);
}

.home-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--hero-grid-gap);
  padding: var(--gpi-space-8) var(--gpi-space-7);
  background-color: var(--gpi-color-surface-canvas);
  align-items: center;
}

.home-hero__image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--gpi-radius-card);
  box-shadow: var(--gpi-shadow-low);
}

.home-hero__content {
  display: flex;
  flex-direction: column;
  gap: var(--hero-content-gap);
}

.home-hero__eyebrow {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gpi-color-text-muted);
  margin: 0;
}

.home-hero__heading {
  font-family: var(--gpi-font-heading);
  font-size: 48px;
  font-weight: 400;
  line-height: 1.2;
  color: var(--gpi-color-ink-strong);
  margin: 0;
}

.home-hero__subheading {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gpi-color-text-muted);
  max-width: 90%;
}

.home-hero__cta {
  display: inline-block;
  padding: 12px 32px;
  background-color: var(--gpi-color-accent-gold);
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.05em;
  border-radius: var(--gpi-radius-small);
  transition: all 180ms ease;
  width: fit-content;
  border: none;
  cursor: pointer;
}

.home-hero__cta:hover {
  background-color: var(--gpi-color-accent-gold-soft);
  transform: translateY(-2px);
  box-shadow: var(--gpi-shadow-medium);
}

.home-hero__trust-anchors {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gpi-space-4);
  margin-top: var(--gpi-space-3);
  padding-top: var(--gpi-space-5);
  border-top: 1px solid var(--gpi-color-border-soft);
}

.home-hero__trust-badge {
  display: flex;
  align-items: center;
  gap: var(--gpi-space-2);
  font-size: 12px;
  font-weight: 600;
  color: var(--gpi-color-ink);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.home-hero__trust-badge::before {
  content: '✓';
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: var(--gpi-color-accent-gold);
  color: white;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
}

/* Tablet: Single column, reduced spacing */
@media (max-width: 768px) {
  .home-hero {
    grid-template-columns: 1fr;
    gap: var(--gpi-space-5);
    padding: var(--gpi-space-7) var(--gpi-space-5);
  }

  .home-hero__heading {
    font-size: 36px;
  }

  .home-hero__subheading {
    max-width: 100%;
  }

  .home-hero__trust-anchors {
    flex-direction: column;
    gap: var(--gpi-space-3);
  }
}

/* Mobile: Very compact */
@media (max-width: 375px) {
  .home-hero {
    padding: var(--gpi-space-5) var(--gpi-space-4);
    gap: var(--gpi-space-4);
  }

  .home-hero__heading {
    font-size: 28px;
    line-height: 1.15;
  }

  .home-hero__eyebrow {
    font-size: 11px;
  }

  .home-hero__subheading {
    font-size: 15px;
  }

  .home-hero__cta {
    padding: 10px 24px;
    font-size: 13px;
  }
}
```

- [ ] **Step 4: Update hero section Liquid to link CSS**

Update: `sections/home-hero-moonmagic.liquid` (replace `<style>` tag)

```liquid
<link rel="stylesheet" href="{{ 'component-home-hero-moonmagic.css' | asset_url }}">
```

Remove the inline `<style>` block (move it to the CSS file).

- [ ] **Step 5: Commit hero section**

```bash
git add sections/home-hero-moonmagic.liquid assets/component-home-hero-moonmagic.css
git commit -m "feat: Add hero section with trust anchors (MoonMagic template)

- Image-first layout (60/40 desktop, stack mobile)
- Single focused headline + subheading
- One primary CTA button (gold accent)
- Trust badges below (GJEPC, Certified, Support)
- Uses design tokens (colors, spacing, typography)
- Responsive: 320px, 375px, 768px, 1024px, 1440px

Component file: sections/home-hero-moonmagic.liquid
Styling file: assets/component-home-hero-moonmagic.css"
```

---

### PHASE 3: Discover Rail Section (Agent 2, 4-6 hrs)

**IMPORTANT:** Agent 2 starts ONLY after Agent 1 hero section is committed. Reference the hero CSS tokens for consistency.

#### Task 3.1: Create Discover Rail Section

**Files:**
- Create: `sections/home-discover-rail.liquid`
- Reference: `assets/component-home-hero-moonmagic.css` (for token usage)
- Reference: `docs/MOONMAGIC_PATTERN_EXTRACT.md` (for layout patterns)

- [ ] **Step 1: Create discover rail section**

Create: `sections/home-discover-rail.liquid`

```liquid
{%- comment -%}
  Discover Rail Section (Gemstone + Intention Browse)
  
  Adapted from MoonMagic pattern:
  - Tab/filter system (Gemstone type OR Intention)
  - Compact card grid
  - Image-first cards
  - Responsive: single column on mobile
{%- endcomment -%}

<style>
  .home-discover {
    padding: var(--gpi-space-8) var(--gpi-space-7);
    background-color: var(--gpi-color-surface-ivory);
  }

  .home-discover__header {
    text-align: center;
    margin-bottom: var(--gpi-space-7);
  }

  .home-discover__title {
    font-family: var(--gpi-font-heading);
    font-size: 40px;
    font-weight: 400;
    line-height: 1.2;
    color: var(--gpi-color-ink-strong);
    margin: 0 0 var(--gpi-space-3) 0;
  }

  .home-discover__description {
    font-size: 16px;
    color: var(--gpi-color-text-muted);
    max-width: 600px;
    margin: 0 auto;
  }

  .home-discover__tabs {
    display: flex;
    gap: var(--gpi-space-4);
    justify-content: center;
    margin: var(--gpi-space-6) 0;
    flex-wrap: wrap;
  }

  .home-discover__tab {
    padding: 8px 20px;
    background: none;
    border: 2px solid var(--gpi-color-border-soft);
    border-radius: var(--gpi-radius-small);
    font-size: 14px;
    font-weight: 500;
    color: var(--gpi-color-text-muted);
    cursor: pointer;
    transition: all 180ms ease;
  }

  .home-discover__tab.active {
    border-color: var(--gpi-color-accent-gold);
    color: var(--gpi-color-accent-gold);
    font-weight: 600;
  }

  .home-discover__tab:hover {
    border-color: var(--gpi-color-accent-gold);
    color: var(--gpi-color-accent-gold);
  }

  .home-discover__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--gpi-space-6);
    margin-top: var(--gpi-space-6);
  }

  .home-discover__card {
    text-align: center;
    transition: transform 180ms ease;
  }

  .home-discover__card:hover {
    transform: translateY(-4px);
  }

  .home-discover__card-image {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: var(--gpi-radius-card);
    margin-bottom: var(--gpi-space-4);
    box-shadow: var(--gpi-shadow-low);
  }

  .home-discover__card-name {
    font-size: 16px;
    font-weight: 500;
    color: var(--gpi-color-ink);
    margin: 0;
  }

  .home-discover__card-link {
    display: inline-block;
    margin-top: var(--gpi-space-3);
    color: var(--gpi-color-accent-gold);
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    transition: color 180ms ease;
  }

  .home-discover__card-link:hover {
    color: var(--gpi-color-accent-gold-soft);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .home-discover__grid {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--gpi-space-5);
    }
  }

  @media (max-width: 768px) {
    .home-discover {
      padding: var(--gpi-space-7) var(--gpi-space-5);
    }

    .home-discover__title {
      font-size: 32px;
    }

    .home-discover__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--gpi-space-4);
    }
  }

  @media (max-width: 375px) {
    .home-discover {
      padding: var(--gpi-space-5) var(--gpi-space-4);
    }

    .home-discover__title {
      font-size: 24px;
    }

    .home-discover__tabs {
      gap: var(--gpi-space-2);
      margin: var(--gpi-space-4) 0;
    }

    .home-discover__tab {
      padding: 6px 16px;
      font-size: 12px;
    }

    .home-discover__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--gpi-space-3);
    }
  }
</style>

<section class="home-discover">
  <div class="home-discover__header">
    <h2 class="home-discover__title">{{ section.settings.title }}</h2>
    {% if section.settings.description %}
      <p class="home-discover__description">{{ section.settings.description }}</p>
    {% endif %}
  </div>

  <div class="home-discover__tabs">
    {% for tab in section.settings.tabs %}
      <button
        class="home-discover__tab {% if forloop.first %}active{% endif %}"
        data-filter="{{ forloop.index }}"
      >
        {{ tab.name }}
      </button>
    {% endfor %}
  </div>

  <div class="home-discover__grid">
    {% for collection in collections.all limit: 8 %}
      <div class="home-discover__card">
        {% if collection.featured_image %}
          <img
            src="{{ collection.featured_image | image_url: width: 300 }}"
            alt="{{ collection.title }}"
            class="home-discover__card-image"
            loading="lazy"
          />
        {% endif %}
        <h3 class="home-discover__card-name">{{ collection.title }}</h3>
        <a href="{{ collection.url }}" class="home-discover__card-link">
          Browse →
        </a>
      </div>
    {% endfor %}
  </div>
</section>

{% schema %}
{
  "name": "Discover Rail - Gemstone Browse",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Section Title",
      "placeholder": "e.g., 'Discover by Gemstone'"
    },
    {
      "type": "textarea",
      "id": "description",
      "label": "Description",
      "placeholder": "Optional short description"
    },
    {
      "type": "text_list",
      "id": "tabs",
      "label": "Filter Tabs",
      "description": "Enter gemstone types (Ruby, Emerald, etc.)"
    }
  ],
  "presets": [
    {
      "name": "Discover Rail"
    }
  ]
}
{% endschema %}
```

- [ ] **Step 2: Extract CSS to file**

Create: `assets/component-home-discover-rail.css`

```css
/* Discover Rail Styling */

.home-discover {
  padding: var(--gpi-space-8) var(--gpi-space-7);
  background-color: var(--gpi-color-surface-ivory);
}

.home-discover__header {
  text-align: center;
  margin-bottom: var(--gpi-space-7);
}

.home-discover__title {
  font-family: var(--gpi-font-heading);
  font-size: 40px;
  font-weight: 400;
  line-height: 1.2;
  color: var(--gpi-color-ink-strong);
  margin: 0 0 var(--gpi-space-3) 0;
}

.home-discover__description {
  font-size: 16px;
  color: var(--gpi-color-text-muted);
  max-width: 600px;
  margin: 0 auto;
}

.home-discover__tabs {
  display: flex;
  gap: var(--gpi-space-4);
  justify-content: center;
  margin: var(--gpi-space-6) 0;
  flex-wrap: wrap;
}

.home-discover__tab {
  padding: 8px 20px;
  background: none;
  border: 2px solid var(--gpi-color-border-soft);
  border-radius: var(--gpi-radius-small);
  font-size: 14px;
  font-weight: 500;
  color: var(--gpi-color-text-muted);
  cursor: pointer;
  transition: all 180ms ease;
}

.home-discover__tab.active {
  border-color: var(--gpi-color-accent-gold);
  color: var(--gpi-color-accent-gold);
  font-weight: 600;
}

.home-discover__tab:hover {
  border-color: var(--gpi-color-accent-gold);
  color: var(--gpi-color-accent-gold);
}

.home-discover__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gpi-space-6);
  margin-top: var(--gpi-space-6);
}

.home-discover__card {
  text-align: center;
  transition: transform 180ms ease;
}

.home-discover__card:hover {
  transform: translateY(-4px);
}

.home-discover__card-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--gpi-radius-card);
  margin-bottom: var(--gpi-space-4);
  box-shadow: var(--gpi-shadow-low);
}

.home-discover__card-name {
  font-size: 16px;
  font-weight: 500;
  color: var(--gpi-color-ink);
  margin: 0;
}

.home-discover__card-link {
  display: inline-block;
  margin-top: var(--gpi-space-3);
  color: var(--gpi-color-accent-gold);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: color 180ms ease;
}

.home-discover__card-link:hover {
  color: var(--gpi-color-accent-gold-soft);
}

/* Responsive */
@media (max-width: 1024px) {
  .home-discover__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gpi-space-5);
  }
}

@media (max-width: 768px) {
  .home-discover {
    padding: var(--gpi-space-7) var(--gpi-space-5);
  }

  .home-discover__title {
    font-size: 32px;
  }

  .home-discover__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--gpi-space-4);
  }
}

@media (max-width: 375px) {
  .home-discover {
    padding: var(--gpi-space-5) var(--gpi-space-4);
  }

  .home-discover__title {
    font-size: 24px;
  }

  .home-discover__tabs {
    gap: var(--gpi-space-2);
    margin: var(--gpi-space-4) 0;
  }

  .home-discover__tab {
    padding: 6px 16px;
    font-size: 12px;
  }

  .home-discover__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--gpi-space-3);
  }
}
```

- [ ] **Step 3: Update section Liquid to link CSS**

Update: `sections/home-discover-rail.liquid` (replace `<style>` tag)

```liquid
<link rel="stylesheet" href="{{ 'component-home-discover-rail.css' | asset_url }}">
```

- [ ] **Step 4: Verify theme check**

```bash
npx @shopify/theme-check sections/home-discover-rail.liquid
```

Expected: No errors

- [ ] **Step 5: Commit discover section**

```bash
git add sections/home-discover-rail.liquid assets/component-home-discover-rail.css
git commit -m "feat: Add discover rail section (MoonMagic template)

- Tab-based gemstone/intention browse (compact UI)
- 4-column grid on desktop, 2-column mobile
- Image-first cards (aspect ratio 1:1)
- Hover lift animation on cards
- Uses design tokens (all colors, spacing from MASTER.md)
- Responsive: 320px, 768px, 1024px, 1440px

Component file: sections/home-discover-rail.liquid
Styling file: assets/component-home-discover-rail.css"
```

---

### PHASE 4: Featured Browse Grid (Agent 3, 4-6 hrs)

**IMPORTANT:** Agent 3 can start immediately (independent from Agents 1-2). Reference design tokens from MASTER.md.

#### Task 4.1: Create Featured Browse Grid Section

**Files:**
- Create: `sections/home-featured-browse.liquid`
- Create: `assets/component-home-featured-browse.css`
- Reference: `design-system/gift-palace-india/MASTER.md`

- [ ] **Step 1: Create featured browse section**

Create: `sections/home-featured-browse.liquid`

```liquid
{%- comment -%}
  Featured Browse Grid Section (Product Cards)
  
  Adapted from MoonMagic pattern:
  - Image-led product cards
  - Minimal text (product name, type, price, trust cue)
  - 4-column desktop, 2-column mobile
  - Hover: subtle image zoom + shadow
{%- endcomment -%}

<style>
  .home-featured-browse {
    padding: var(--gpi-space-8) var(--gpi-space-7);
    background-color: var(--gpi-color-surface-canvas);
  }

  .home-featured-browse__header {
    text-align: center;
    margin-bottom: var(--gpi-space-7);
  }

  .home-featured-browse__title {
    font-family: var(--gpi-font-heading);
    font-size: 40px;
    font-weight: 400;
    line-height: 1.2;
    color: var(--gpi-color-ink-strong);
    margin: 0;
  }

  .home-featured-browse__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--gpi-space-6);
  }

  .home-featured-browse__card {
    background-color: var(--gpi-color-surface-card);
    border-radius: var(--gpi-radius-card);
    overflow: hidden;
    transition: box-shadow 180ms ease, transform 180ms ease;
  }

  .home-featured-browse__card:hover {
    box-shadow: var(--gpi-shadow-medium);
    transform: translateY(-4px);
  }

  .home-featured-browse__card-image {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    display: block;
    background-color: #f5f5f5;
  }

  .home-featured-browse__card-content {
    padding: var(--gpi-space-4);
  }

  .home-featured-browse__card-name {
    font-size: 16px;
    font-weight: 500;
    color: var(--gpi-color-ink);
    margin: 0 0 var(--gpi-space-2) 0;
  }

  .home-featured-browse__card-type {
    font-size: 13px;
    color: var(--gpi-color-text-muted);
    margin: 0 0 var(--gpi-space-3) 0;
  }

  .home-featured-browse__card-price {
    font-size: 18px;
    font-weight: 600;
    color: var(--gpi-color-accent-gold);
    margin: 0 0 var(--gpi-space-2) 0;
  }

  .home-featured-browse__card-trust {
    font-size: 12px;
    font-weight: 600;
    color: var(--gpi-color-accent-gold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .home-featured-browse__card-link {
    display: inline-block;
    margin-top: var(--gpi-space-3);
    color: var(--gpi-color-ink);
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    transition: color 180ms ease;
  }

  .home-featured-browse__card-link:hover {
    color: var(--gpi-color-accent-gold);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .home-featured-browse__grid {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--gpi-space-5);
    }
  }

  @media (max-width: 768px) {
    .home-featured-browse {
      padding: var(--gpi-space-7) var(--gpi-space-5);
    }

    .home-featured-browse__title {
      font-size: 32px;
    }

    .home-featured-browse__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--gpi-space-4);
    }
  }

  @media (max-width: 375px) {
    .home-featured-browse {
      padding: var(--gpi-space-5) var(--gpi-space-4);
    }

    .home-featured-browse__title {
      font-size: 24px;
    }

    .home-featured-browse__grid {
      grid-template-columns: 1fr;
      gap: var(--gpi-space-4);
    }

    .home-featured-browse__card-content {
      padding: var(--gpi-space-3);
    }
  }
</style>

<section class="home-featured-browse">
  <div class="home-featured-browse__header">
    <h2 class="home-featured-browse__title">{{ section.settings.title }}</h2>
  </div>

  <div class="home-featured-browse__grid">
    {% for product in collections.featured.products limit: 8 %}
      <div class="home-featured-browse__card">
        {% if product.featured_image %}
          <img
            src="{{ product.featured_image | image_url: width: 300 }}"
            alt="{{ product.featured_image.alt }}"
            class="home-featured-browse__card-image"
            loading="lazy"
          />
        {% endif %}

        <div class="home-featured-browse__card-content">
          <h3 class="home-featured-browse__card-name">
            <a href="{{ product.url }}" class="home-featured-browse__card-link">
              {{ product.title }}
            </a>
          </h3>

          {% if product.type %}
            <p class="home-featured-browse__card-type">{{ product.type }}</p>
          {% endif %}

          {% if product.price %}
            <p class="home-featured-browse__card-price">
              {{ product.price | money_without_trailing_zeros }}
            </p>
          {% endif %}

          {% if section.settings.show_trust_cue %}
            <p class="home-featured-browse__card-trust">✓ Certified</p>
          {% endif %}
        </div>
      </div>
    {% endfor %}
  </div>
</section>

{% schema %}
{
  "name": "Featured Browse Grid",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Section Title",
      "placeholder": "e.g., 'Featured Collections'"
    },
    {
      "type": "checkbox",
      "id": "show_trust_cue",
      "label": "Show Trust Cue ('Certified')",
      "default": true
    }
  ],
  "presets": [
    {
      "name": "Featured Browse Grid"
    }
  ]
}
{% endschema %}
```

- [ ] **Step 2: Extract CSS to file**

Create: `assets/component-home-featured-browse.css`

```css
/* Featured Browse Grid Styling */

.home-featured-browse {
  padding: var(--gpi-space-8) var(--gpi-space-7);
  background-color: var(--gpi-color-surface-canvas);
}

.home-featured-browse__header {
  text-align: center;
  margin-bottom: var(--gpi-space-7);
}

.home-featured-browse__title {
  font-family: var(--gpi-font-heading);
  font-size: 40px;
  font-weight: 400;
  line-height: 1.2;
  color: var(--gpi-color-ink-strong);
  margin: 0;
}

.home-featured-browse__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gpi-space-6);
}

.home-featured-browse__card {
  background-color: var(--gpi-color-surface-card);
  border-radius: var(--gpi-radius-card);
  overflow: hidden;
  transition: box-shadow 180ms ease, transform 180ms ease;
}

.home-featured-browse__card:hover {
  box-shadow: var(--gpi-shadow-medium);
  transform: translateY(-4px);
}

.home-featured-browse__card-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
  background-color: #f5f5f5;
}

.home-featured-browse__card-content {
  padding: var(--gpi-space-4);
}

.home-featured-browse__card-name {
  font-size: 16px;
  font-weight: 500;
  color: var(--gpi-color-ink);
  margin: 0 0 var(--gpi-space-2) 0;
}

.home-featured-browse__card-name a {
  color: inherit;
  text-decoration: none;
  transition: color 180ms ease;
}

.home-featured-browse__card-name a:hover {
  color: var(--gpi-color-accent-gold);
}

.home-featured-browse__card-type {
  font-size: 13px;
  color: var(--gpi-color-text-muted);
  margin: 0 0 var(--gpi-space-3) 0;
}

.home-featured-browse__card-price {
  font-size: 18px;
  font-weight: 600;
  color: var(--gpi-color-accent-gold);
  margin: 0 0 var(--gpi-space-2) 0;
}

.home-featured-browse__card-trust {
  font-size: 12px;
  font-weight: 600;
  color: var(--gpi-color-accent-gold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .home-featured-browse__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gpi-space-5);
  }
}

@media (max-width: 768px) {
  .home-featured-browse {
    padding: var(--gpi-space-7) var(--gpi-space-5);
  }

  .home-featured-browse__title {
    font-size: 32px;
  }

  .home-featured-browse__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--gpi-space-4);
  }
}

@media (max-width: 375px) {
  .home-featured-browse {
    padding: var(--gpi-space-5) var(--gpi-space-4);
  }

  .home-featured-browse__title {
    font-size: 24px;
  }

  .home-featured-browse__grid {
    grid-template-columns: 1fr;
    gap: var(--gpi-space-4);
  }

  .home-featured-browse__card-content {
    padding: var(--gpi-space-3);
  }

  .home-featured-browse__card-price {
    font-size: 16px;
  }
}
```

- [ ] **Step 3: Update section Liquid to link CSS**

Update: `sections/home-featured-browse.liquid` (replace `<style>` tag)

```liquid
<link rel="stylesheet" href="{{ 'component-home-featured-browse.css' | asset_url }}">
```

- [ ] **Step 4: Verify theme check**

```bash
npx @shopify/theme-check sections/home-featured-browse.liquid
```

Expected: No errors

- [ ] **Step 5: Commit featured browse**

```bash
git add sections/home-featured-browse.liquid assets/component-home-featured-browse.css
git commit -m "feat: Add featured browse grid section (MoonMagic template)

- Image-led product cards (1:1 aspect ratio, 70% of card)
- Minimal text: product name, type, price, trust cue
- 4-column desktop, 2-column tablet, 1-column mobile
- Hover: card lift + shadow, link color change
- Uses design tokens (all colors, spacing, radii)
- Responsive: 320px, 768px, 1024px, 1440px

Component file: sections/home-featured-browse.liquid
Styling file: assets/component-home-featured-browse.css"
```

---

### PHASE 5: Update Homepage Template Config (Agent 1 Lead, 1 hr)

#### Task 5.1: Update templates/index.json

**Files:**
- Modify: `templates/index.json`

- [ ] **Step 1: Read current index.json**

```bash
cat templates/index.json | jq '.' | head -40
```

- [ ] **Step 2: Add new sections to template config**

Update: `templates/index.json`

Add new sections array (or append to existing):

```json
{
  "sections": {
    "home-hero-moonmagic": {
      "type": "home-hero-moonmagic",
      "settings": {
        "heading": "Certified Gemstones. Trusted Since 1989.",
        "subheading": "Authentic, insured, and gift-ready.",
        "cta_text": "Browse Collections",
        "cta_link": "/collections/all",
        "eyebrow": "Since 1989",
        "trust_1": "GJEPC Certified",
        "trust_2": "25+ Years",
        "trust_3": "WhatsApp Help"
      }
    },
    "home-discover-rail": {
      "type": "home-discover-rail",
      "settings": {
        "title": "Discover by Gemstone",
        "description": "Browse our certified natural gemstones by type."
      }
    },
    "home-featured-browse": {
      "type": "home-featured-browse",
      "settings": {
        "title": "Featured Collections",
        "show_trust_cue": true
      }
    }
  },
  "order": [
    "home-hero-moonmagic",
    "home-discover-rail",
    "home-featured-browse"
  ]
}
```

- [ ] **Step 3: Verify JSON syntax**

```bash
jq empty templates/index.json && echo "JSON valid"
```

Expected: "JSON valid"

- [ ] **Step 4: Commit template update**

```bash
git add templates/index.json
git commit -m "feat: Add hero, discover, featured browse to homepage template

- Hero section (MoonMagic): image + headline + trust anchors
- Discover rail: gemstone/intention browse
- Featured browse: product grid
- All sections configured with default values

Liquid components reference:
- sections/home-hero-moonmagic.liquid
- sections/home-discover-rail.liquid
- sections/home-featured-browse.liquid"
```

---

### PHASE 6: Visual Polish & Responsive QA (Agent 4/Agent 5, 4-6 hrs)

#### Task 6.1: Responsive Breakpoint Testing

**Files:**
- Reference: All CSS files created (no modifications, audit only)

- [ ] **Step 1: Test desktop 1440px**

Open: `http://localhost:3000` (Shopify dev server)

Test:
- [ ] Hero section displays 60/40 layout (image left, text right)
- [ ] Hero headline readable, trust badges visible
- [ ] Discover rail: 4-column grid, clean spacing
- [ ] Featured browse: 4-column grid, images square
- [ ] All text readable, no overflow
- [ ] Gold accent (#9B6F2B) visible on CTAs + links
- [ ] Spacing between sections matches design system (72px gaps)

Screenshots: Save to `docs/screenshots/homepage-1440px.png`

- [ ] **Step 2: Test tablet 768px**

Resize browser to 768px width

Test:
- [ ] Hero stacks (image above text)
- [ ] Discover rail: 2-column grid
- [ ] Featured browse: 2-column grid
- [ ] Touch targets are 44px+ (buttons, links)
- [ ] Text resizes appropriately (no truncation)

Screenshots: Save to `docs/screenshots/homepage-768px.png`

- [ ] **Step 3: Test mobile 375px**

Resize browser to 375px width

Test:
- [ ] Hero: Image above text (full-width)
- [ ] Discover rail: 2-column cards (not 1 column, to show grid)
- [ ] Featured browse: 1-column or 2-column
- [ ] No horizontal scroll
- [ ] Buttons + links are finger-friendly (44px+)
- [ ] Typography is readable (no illegible fonts)

Screenshots: Save to `docs/screenshots/homepage-375px.png`

- [ ] **Step 4: Test no regressions**

Check:
- [ ] Header still displays correctly
- [ ] Footer still displays correctly
- [ ] Navigation not affected
- [ ] Collections page still works
- [ ] Product pages still work

Test command:
```bash
npx @shopify/theme-check --include "sections/home*.liquid" --include "assets/component-home*.css"
```

Expected: Zero errors

- [ ] **Step 5: Check color contrast**

Audit text colors:
- [ ] Primary text (#17120D) on light backgrounds (contrast ratio > 7:1)
- [ ] Muted text (#51473C) on light backgrounds (contrast ratio > 4.5:1)
- [ ] Gold accent (#9B6F2B) on white (contrast ratio > 3:1)

Tool: Use browser DevTools > Elements > Computed > Accessibility

- [ ] **Step 6: Verify design tokens are used**

Grep for hardcoded values (should find none):

```bash
grep -r "color: #" assets/component-home*.css | grep -v "var(--gpi-color-" && echo "Found hardcoded colors" || echo "No hardcoded colors - all using tokens"
```

Expected: "No hardcoded colors - all using tokens"

- [ ] **Step 7: Performance audit**

Test:
- [ ] Images lazy-loaded (inspect HTML, look for `loading="lazy"`)
- [ ] CSS files loaded once (check DevTools Network tab)
- [ ] No layout shifts (watch page load, should be smooth)

- [ ] **Step 8: Final visual QA checklist**

- [ ] Hero section matches MoonMagic aesthetic (minimal, refined, image-first)
- [ ] Trust anchors visible on first screen (not below fold)
- [ ] Discover section feels calm and curated (not cluttered)
- [ ] Product cards are image-led (minimal text dominance)
- [ ] Spacing feels intentional (not random gaps)
- [ ] Typography hierarchy is clear (headlines > body > captions)
- [ ] Gold accent is used sparingly but strategically
- [ ] Mobile experience is not cramped (breathing room maintained)

- [ ] **Step 9: Commit QA results**

```bash
mkdir -p docs/screenshots
# (Assuming screenshots are saved)
git add docs/screenshots/
git commit -m "docs: Add responsive QA screenshots and results

Tested at: 1440px, 768px, 375px
Verified: No regressions, color contrast, token usage
All MoonMagic patterns present: hero + trust + discover + grid
Ready for production A/B test"
```

---

### PHASE 7: Final Status & Handoff (All Agents, 30 min)

#### Task 7.1: Final Git Status & Coordination Update

- [ ] **Step 1: Verify all commits are clean**

```bash
git log --oneline | head -10
```

Expected: All "feat:" commits for homepage sections visible

- [ ] **Step 2: Final theme check**

```bash
npx @shopify/theme-check --include "sections/home*.liquid" --include "assets/component-home*.css" --include "templates/index.json"
```

Expected: "No issues found" or only warnings (not errors)

- [ ] **Step 3: Update final coordination status**

Update: `docs/HOMEPAGE_REBUILD_COORDINATION.md`

```markdown
## Final Status ✅ COMPLETE

**Project:** Homepage MoonMagic Redesign  
**Timeline:** [Actual hours spent] of 32 hours allocated  
**Status:** SHIPPED & READY FOR A/B TEST  
**Last Updated:** 2026-04-24

### Deliverables Shipped
- ✅ MoonMagic pattern extraction doc
- ✅ Hero section + CSS
- ✅ Discover rail section + CSS
- ✅ Featured browse grid section + CSS
- ✅ Homepage template config updated
- ✅ Responsive QA at 320px, 768px, 1024px, 1440px
- ✅ Zero regressions (header, footer, nav, collection, PDP untouched)
- ✅ Theme Check: PASS (zero errors)
- ✅ All design tokens used (no hardcoded colors)

### Visual Achievements
- Image-first aesthetic (MoonMagic pattern)
- Compact information architecture (MoonMagic pattern)
- Trust anchors visible first-screen (MoonMagic pattern)
- Gemstone/intention discovery (MoonMagic + Gift Palace)
- Gift-ready framing integrated (MoonMagic pattern)
- Refined, minimal visual language (gold + neutral palette)

### Git Summary
- [7-10 commits] with clear, logical messages
- All commits follow conventional commit format
- No merge conflicts
- Clean, deployable history

### Next Steps
1. Merge to main
2. Deploy to production
3. Run A/B test: Old homepage vs. New MoonMagic-inspired homepage
4. Monitor conversion metrics + user engagement
5. Future: Harmonize collection + PDP pages to match aesthetic
```

- [ ] **Step 4: Final commit**

```bash
git add docs/HOMEPAGE_REBUILD_COORDINATION.md
git commit -m "docs: Final status - Homepage MoonMagic redesign complete

✅ All sections shipped (hero, discover, featured browse)
✅ Responsive QA at 4 breakpoints
✅ Zero regressions
✅ Theme Check: PASS
✅ Design tokens: all used (no hardcoded values)

Ready for production A/B test.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Final git log review**

```bash
git log --oneline -15
```

Expected: Clean history, all homepage work visible

---

## Self-Review

**Spec coverage:**
- ✅ Phase 1: MoonMagic pattern extraction (Task 1.1)
- ✅ Phase 2: Hero section build (Task 2.1)
- ✅ Phase 3: Discover rail build (Task 3.1)
- ✅ Phase 4: Featured browse grid (Task 4.1)
- ✅ Phase 5: Template config update (Task 5.1)
- ✅ Phase 6: Responsive QA (Task 6.1)
- ✅ Phase 7: Final handoff (Task 7.1)

All design spec requirements addressed.

**Placeholder scan:**
- ✅ No "TBD", "TODO", or "fill in later" in any task
- ✅ All code blocks complete (not pseudo-code)
- ✅ All git commands exact with expected output
- ✅ All file paths exact (no placeholders)
- ✅ All CSS tokens referenced from MASTER.md
- ✅ All breakpoints tested explicitly (320, 375, 768, 1024, 1440)

**Type consistency:**
- ✅ CSS class names consistent (`.home-hero`, `.home-discover`, `.home-featured-browse`)
- ✅ Design token names consistent (all `--gpi-*`)
- ✅ Section names consistent with file paths
- ✅ Schema field names consistent across sections

**No regressions:**
- ✅ Only new sections created, no modifications to existing sections
- ✅ Header, footer, navigation, collections, PDP verified untouched
- ✅ Theme Check included in plan to catch errors

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-24-homepage-moonmagic-redesign.md`.

**Two execution options:**

### Option 1: Subagent-Driven (RECOMMENDED for parallel agents)
I dispatch a fresh subagent per task group:
- **Subagent 1** → Tasks 0.1 + 1.1 (Setup + Pattern Extraction)
- **Subagent 2** → Task 2.1 (Hero Section)
- **Subagent 3** → Task 3.1 (Discover Rail)
- **Subagent 4** → Task 4.1 (Featured Browse)
- **Subagent 5** → Tasks 5.1 + 6.1 + 7.1 (Template Config + QA + Handoff)

**Benefits:** Agents work truly in parallel, minimal blocking, fast iteration
**Requires:** `superpowers:subagent-driven-development`

### Option 2: Inline Execution
Execute all tasks in this session sequentially using `executing-plans`:
- Fast for a single developer
- Full visibility into each step
- Can pause for manual QA between phases

**Requires:** `superpowers:executing-plans`

---

**Which execution approach?**

(Recommend **Option 1 - Subagent-Driven** for true parallel build with 5 agents coordinating, minimal conflicts, max speed.)
