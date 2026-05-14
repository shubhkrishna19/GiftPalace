# MoonMagic Pattern Extraction

**Status:** IN PROGRESS  
**Agent:** Subagent 1  
**Last Updated:** 2026-04-24  

---

## Overview

This document captures visual, typographic, spacing, and interaction patterns from MoonMagic homepage (https://moonmagic.com) to inform Gift Palace India's redesigned homepage sections.

Studied at:
- Desktop viewport: 1440px
- Mobile viewport: 375px
- Date: 2026-04-24

---

## 1. Hero Section

### Layout
- [x] Layout structure documented
- [x] Image positioning noted
- [x] Text placement and proportions
- [x] Mobile responsive behavior

**Desktop Layout:**
- Position: Full-width section with photographic background
- Image placement: Full-width background image (hero image spans entire viewport)
- Text area proportion: Centered overlay text, approximately 60-70% of viewport width
- Aspect ratio handling: Hero maintains full-height or tall aspect ratio (likely 16:9 or taller)
- Padding top: ~60-80px before next section
- Padding bottom: ~60-80px

**Mobile Layout:**
- Stack direction: Vertical - hero image full-width, text centered
- Image height: Full viewport height or tall enough to accommodate centered text
- Text full-width: Yes - text is centered and spans with comfortable margins
- Gutters: ~16-20px left/right padding

### Image Treatment
- Dimensions (desktop): Full viewport width, typically 1440+px; height varies but tall enough for centered overlay text
- Dimensions (mobile): Full viewport width (375px), full viewport height or tall
- Aspect ratio: ~16:9 or taller (hero prioritizes height over width ratio)
- Cropping style: Cover - image scales to fill entire hero area
- Border radius: None - full-width hero image extends edge-to-edge
- Shadow/elevation: Subtle dark overlay to ensure text readability
- Overlay present: Yes - dark overlay layer (likely rgba(0, 0, 0, 0.3-0.5)) to increase contrast with white text
- Object fit: cover - prioritizes filling the viewport without distortion

### Headline
- Font family: Modern geometric sans-serif (likely similar to Inter, Poppins, or custom geometric typeface)
- Font size (desktop): ~56-72px (bold and impactful)
- Font size (mobile): ~32-40px (scales down but maintains impact)
- Font weight: 600-700 (bold/extra-bold)
- Line height: 1.2-1.3 (tight for impact)
- Color: White (#FFFFFF) for contrast against dark overlay
- Max-width: ~600px (constrains line width for readability)
- Letter spacing: Normal to slightly loose (0-2px)
- Text transform: UPPERCASE (strong brand voice emphasis)
- Example text: "ENERGY YOU CAN WEAR"

### Subheading
- Font family: Modern sans-serif (same or complementary to headline)
- Font size: ~18-24px
- Font weight: 400-500 (regular to medium - less emphasis than headline)
- Line height: 1.4-1.5 (more generous than headline)
- Color: White (#FFFFFF)
- Margin top (from headline): ~20-24px
- Example text: "JEWELRY WITH MEANING - CRAFTED TO LAST"

### CTA Button (Primary)
- Text label: "SHOP THE SALE"
- Background color: Dark/contrasting color (appears to be dark navy, charcoal, or brand-specific accent)
- Text color: White (#FFFFFF)
- Padding: ~16-20px vertical, ~32-40px horizontal (sizing: ~18px tall text + padding = ~48-56px total height)
- Border radius: ~4-8px (subtle, not pill-shaped)
- Font size: ~14-16px
- Font weight: 600-700 (bold)
- Margin top (from subheading): ~32-40px
- Hover state: Likely subtle color shift or opacity change (darker or lighter shade)
- Hover timing: ~200-300ms ease transition
- Border present: No - solid fill button

### Trust Anchors / Proof Badges (Section Below Hero, Not On Hero)
Note: MoonMagic places trust proof in a dedicated section below hero, not on the hero itself. Gift Palace should consider placement after CTA or in a separate trust section.

- Count: 3-4 major trust markers
- Badge format: Icon (star, checkmark) + text (combined proof statement)
- Badge examples: 
  - "Trusted by 600K+ women worldwide"
  - "2M+ followers"
  - "31K+ 5-Star Reviews" (with Trustpilot badge)
  - "GIA Tested" or certification mark
- Badge font size: ~12-14px
- Badge font weight: 500-600 (slightly bolder for emphasis)
- Badge icon size: ~16-20px (small but visible)
- Gap between badges: ~24-32px (generous, not cramped)
- Positioning: Below CTA button (in a separate section or row below hero)
- Margin top (from CTA): ~40-60px (clear separation)
- Background color: Transparent or light ivory/white for contrast
- Border style: None (clean, not boxed)

### Hero Section Inspiration Points
- [TBD - 3-5 key visual insights]

---

## 2. Discover / Browse Section

### Section Header
- Title text: "SHOP BY CATEGORY" or "DESIGNED TO MEAN MORE"
- Title font: Modern sans-serif (same family as hero)
- Title size (desktop): ~36-48px
- Title size (mobile): ~24-32px
- Title color: Dark charcoal/navy (#1a1a1a or similar)
- Title alignment: Left (not centered)
- Subtitle present: No (just title)
- Uppercase: Yes - title appears in uppercase for emphasis

### Filter/Tab Bar
- Tab count: 4-6 categories (e.g., Rings, Necklaces, Earrings, Bracelets, Zodiac, Birthstone)
- Tab format: Text links/buttons (not filled pills)
- Tab labels (examples):
  - "Rings"
  - "Necklaces"
  - "Earrings"
  - "Bracelets"
  - "Zodiac"
  - "Birthstone"
- Active tab indicator: Underline or bold weight increase (subtle)
- Tab padding: ~12-16px horizontal, ~8-12px vertical
- Gap between tabs: ~20-24px
- Hover styling: Text color shift or slight opacity change
- Font size: ~14-16px
- Font weight: 500 (medium) for active, 400 for inactive

### Card Grid Layout
- Columns (desktop): 4 columns
- Columns (tablet): 2-3 columns
- Columns (mobile): 1-2 columns (likely 1 on very small screens)
- Column gap: ~20-30px
- Row gap: ~24-32px
- Grid background: Transparent (inherits page background)

### Product Cards
- Card height: Auto (follows content height)
- Card width: 100% of column width
- Card padding: 0 (card layout is image above, text below - no internal padding around the layout)
- Card background: Transparent (no card container background)
- Card border: None
- Card border radius: 0 (sharp edges on image)
- Card shadow: None or very subtle

#### Image Section
- Image aspect ratio: 1:1 (square - very clean and uniform)
- Image height: ~100-280px depending on viewport (scales with column width)
- Image width: 100% of card width
- Image border radius: 0-8px (slight roundness optional)
- Image object fit: cover (ensures square fill)
- Image padding/margin: 0 (image touches column edges)

#### Text Section (below image)
- Product name font size: ~14-16px
- Product name weight: 600 (semibold/bold for emphasis)
- Product name color: Dark charcoal (#1a1a1a or similar)
- Price/descriptor font size: ~12-14px
- Price color: Medium gray (#666 or similar)
- Text alignment: Left
- Spacing between image and text: ~16-20px (margin-top on text container)
- Spacing between product name and price: ~4-8px

### Card Hover Effects
- Hover transform: Subtle image zoom (~1.02-1.05 scale) or slight opacity shift
- Hover shadow: None or very subtle (maintains clean aesthetic)
- Hover timing: ~200-300ms
- Hover easing: ease-out or ease-in-out
- Image hover effect: Zoom on image only, text stays static

---

## 3. Product Cards (Standalone Details)

### Card Container
- Width: [TBD - px or percentage]
- Aspect ratio: [TBD - 1:1, 4:5, 3:4, etc.]
- Padding: [TBD - px]
- Background: [TBD]
- Border radius: [TBD - px]
- Border: [TBD]
- Shadow: [TBD]

### Image Leading
- Image percentage of card: [TBD - %]
- Image aspect ratio: [TBD]
- Image border radius: [TBD]
- Image position: [TBD - top, full-height]

### Trust Badge / Certification Mark
- Badge text: "[TBD - e.g., 'Certified', 'GJEPC', etc.]"
- Badge position: [TBD - top-left, top-right, bottom, overlay]
- Badge background: [TBD]
- Badge text color: [TBD]
- Badge font size: [TBD - px]
- Badge padding: [TBD - px]
- Badge border radius: [TBD]
- Badge icon: [TBD - checkmark, star, other]

### Price / Product Info Area
- Background color: [TBD]
- Padding: [TBD - px]
- Product name size: [TBD - px]
- Price size: [TBD - px]
- Price color: [TBD]
- Additional info (if any): [TBD]

---

## 4. Typography System

### Font Stack
- Heading font (family name): Modern geometric sans-serif (likely Poppins, Inter, DM Sans, or similar)
- Heading font fallback: sans-serif
- Body font (family name): Same modern sans-serif or complementary sans (clean, readable)
- Body font fallback: sans-serif

### Type Scale
| Role | Size (Desktop) | Size (Mobile) | Weight | Line Height | Color |
|------|---|---|---|---|---|
| Hero Headline | 56-72px | 32-40px | 600-700 | 1.2-1.3 | #FFFFFF (on dark overlay) |
| Section Title | 36-48px | 24-32px | 600-700 | 1.2-1.3 | #1a1a1a |
| Subheading | 18-24px | 16-20px | 400-500 | 1.4-1.5 | #1a1a1a or white (context-dependent) |
| Card Title | 14-16px | 14-16px | 600 | 1.3-1.4 | #1a1a1a |
| Body Text | 14-16px | 14-16px | 400 | 1.5-1.6 | #333 or #51473C |
| Small Text | 12-14px | 12-14px | 400 | 1.4-1.5 | #666 or muted gray |
| Label / Uppercase | 12-14px | 11-13px | 600-700 | 1.3 | Varies by context |

### Weight Hierarchy
- Lightest: 400 (body, secondary copy)
- Regular: 400-500 (supporting text, subheadings)
- Semibold: 600 (card titles, emphasis)
- Bold: 600-700 (headlines, CTAs, trust anchors)
- Where uppercase is used: Section headers ("SHOP BY CATEGORY"), trust proof ("TRUSTED BY 600K+"), button labels

### Letter Spacing
- Tight: 0 (default)
- Normal: 0-1px
- Wide: 1-2px (on all-caps headlines for breathing room)
- Uppercase spacing: 0.5-1.5px (uppercase titles benefit from increased letter-spacing)

---

## 5. Color Palette

### Primary Colors
| Role | Hex | RGB | Usage |
|---|---|---|---|
| Dark Navy/Charcoal | #1a1a1a or #0a0a0a | 26,26,26 or 10,10,10 | Headlines, primary text, button backgrounds |
| White | #FFFFFF | 255,255,255 | Hero text (on overlay), card backgrounds |
| Off-white | #f5f5f5 or #fafafa | 245,245,245 or 250,250,250 | Page background, subtle sections |
| Rose Gold / Blush | #d4a5a5 or #d9a8a8 | 212,165,165 | Accent color for gift-related visuals |

### Secondary Colors
| Role | Hex | RGB | Usage |
|---|---|---|---|
| Medium Gray | #666 or #777 | 102,102,102 | Secondary text, prices, descriptions |
| Light Gray | #999 or #aaa | 153,153,153 | Tertiary text, lighter captions |
| Cool Accent | Teal/Sage (~#4a7c7e or similar) | Variable | CTA buttons, interactive elements |

### Backgrounds
- Page background: Off-white/white (#f5f5f5, #fafafa, or #FFFFFF)
- Section background: White (#FFFFFF) or subtle off-white for contrast
- Card background: Transparent (no background - clean product card layout)
- Hero overlay: Dark overlay (rgba(0, 0, 0, 0.3-0.5)) to ensure text legibility on image

### Text Colors
- Headline: Dark Navy/Charcoal (#1a1a1a)
- Primary text: Dark Navy (#1a1a1a)
- Secondary text: Medium Gray (#666-#777)
- Muted text: Light Gray (#999-#aaa)
- Hero text: White (#FFFFFF)

### Accents
- Primary accent: Rose Gold/Blush (#d4a5a5 or #d9a8a8) - reflects jewelry/gift aesthetic
- Secondary accent: Teal/Sage or cool tone (~#4a7c7e) - for CTAs and interactive elements
- Success/positive: Green (if used in reviews/trust badges)
- Alert/warning: Warm tone (if used for urgency)

### Borders
- Border color (subtle): Light gray (#e0e0e0 or #d0d0d0) - rarely used on MoonMagic
- Border color (emphasis): None - MoonMagic design is very clean, minimal borders
- Border width: Not prominent (0-1px when used)

---

## 6. Spacing & Layout Grid

### Spacing Scale
| Token | Value | Usage |
|---|---|---|
| xs | 4-8px | Icon-to-text gaps, micro spacing |
| sm | 12-16px | Compact internals, small component spacing |
| md | 16-20px | Standard padding, card internals |
| lg | 24-32px | Section internals, generous gaps |
| xl | 40-60px | Major section rhythm, gap between sections |
| 2xl | 60-80px | Large breathing room, prominent section separation |

### Section Spacing (Vertical)
- Top padding (contained sections): ~40-60px
- Bottom padding (contained sections): ~40-60px
- Top padding (hero): ~60-80px after hero to next section
- Gap between major sections: ~60-80px (generous, creates breathing room)

### Card/Component Spacing
- Card padding: 0 (product cards are image + text below, no container padding)
- Image-to-text gap: ~16-20px (margin-top on text section)
- Text element gaps (product name to price): ~4-8px
- Button margin top: ~32-40px from subheading
- Trust badge gap: ~24-32px between individual badges

### Grid Layout
- Container max-width: ~1200-1400px (depends on column count and gutter)
- Gutter width (column gap): ~20-30px
- Column count (desktop): 4 for products
- Margin (sides): Auto-center container, with ~20-40px padding on mobile

---

## 7. Radius & Elevation

### Border Radius
- Extra small: 0px (sharp edges on images)
- Small: 4-6px (subtle rounding on buttons)
- Medium: 8-12px (optional on image corners)
- Large: 16-20px (not commonly used)
- Pill (border-radius): 999px (not used in MoonMagic design)

### Box Shadows
| Elevation | Shadow Value | Usage |
|---|---|---|
| None | none | Primary - MoonMagic is very flat, minimal shadows |
| Low | 0 4px 12px rgba(0, 0, 0, 0.08) | Subtle lift on hover (optional) |
| Medium | 0 8px 24px rgba(0, 0, 0, 0.12) | Dropdowns, modals (if used) |
| High | 0 16px 40px rgba(0, 0, 0, 0.16) | Not commonly used - brand stays flat |

---

## 8. Motion & Interaction

### Transitions
- Fast duration: 150-200ms (quick interactions)
- Normal duration: 200-300ms (standard hover/focus)
- Slow duration: 400-500ms (scroll-triggered animations)
- Default easing: ease-out or ease-in-out (smooth, not linear)

### Hover States
- Button hover: Subtle color shift (slightly darker or lighter shade) or opacity change
- Card hover: Image zoom (~1.02-1.05x scale) or slight opacity fade
- Link hover: Underline or color shift (context-dependent)
- Timing: ~200-300ms ease-out

### Focus States
- Focus ring color: Teal/accent color or dark charcoal
- Focus ring width: 2-3px (visible but not heavy)
- Focus timing: Instant (no delay)
- Keyboard accessible: Yes (focus rings on interactive elements)

### Animations
- Scroll trigger animations: Fade-in, slide-up on section entry (if used)
- Duration: ~400-600ms (smooth, not jarring)
- Easing: ease-out for entrance animations
- Respect prefers-reduced-motion: Yes - disable animations for users with reduced-motion preference
- Smooth scroll: Enabled throughout page

---

## 9. Responsive Breakpoints

### Breakpoints
- Mobile: < 640px (small screens, phones)
- Tablet: 640px - 1024px (tablets, landscape phones)
- Desktop: 1024px - 1440px (standard desktop)
- Large desktop: > 1440px (ultra-wide)

### Mobile-Specific Changes
- Column count (mobile): 1-2 columns (product grid becomes single column or 2-col on larger mobile)
- Padding reduction: Section padding reduces from 40-60px to 20-30px
- Font size reduction: Headline 56-72px -> 32-40px; body scales down proportionally
- Image aspect ratio (mobile): Maintains 1:1 square aspect for consistency
- Stack direction: Hero stacks vertically; layout flows from top to bottom
- Hero image height: Full viewport or tall (ensures text is vertically centered)
- Navigation: Hamburger menu collapses at tablet breakpoint
- Trust badges: Stack vertically on mobile instead of horizontal row
- Button height: Increases to 48-52px minimum (touch-friendly on mobile)

---

## 10. Key Insights & Inspiration

### Hero Section Standout Elements
- **Full-width lifestyle imagery with centered overlay text** - Creates immediate brand presence and emotional connection
- **Strong typographic hierarchy with all-caps headlines** - Bold, confident brand voice that demands attention
- **Dark overlay on hero image** - Ensures white text is always readable while maintaining beautiful product/lifestyle imagery
- **Generous spacing around CTA** - Button is prominent but not cramped; breathing room increases trust
- **Proof section positioned immediately below hero** - Trust markers reinforce credibility from the first fold

### Discover Section Standout Elements
- **Clean tab navigation** - Minimal visual weight, lets content speak for itself
- **4-column grid on desktop (perfect for jewelry products)** - Showcases variety without overwhelming
- **1:1 square product images** - Creates visual harmony and consistent card heights
- **Hover zoom on image only** - Subtle, doesn't disrupt layout, maintains product focus
- **Minimal text below images** - Name + price/description, no extra clutter

### Overall Visual Direction
- **Premium minimalism**: Luxe brand without flash or excessive decoration
- **Typography-driven**: Clean sans-serif, strong weight hierarchy, generous spacing
- **Image-led**: High-quality photography is the star, not decorative elements
- **Trust-first**: Credibility markers woven in naturally, not forced
- **Refined calm**: Generous whitespace, muted color palette (dark + rose gold + white), easy to scan

### Unique Patterns Worth Replicating for Gift Palace
- **All-caps editorial headlines** - Strong brand voice, different from typical lowercase
- **Lifestyle hero imagery with centered overlay** - Not just product shots, tells a story
- **Dark overlay on hero** - Ensures text legibility without compromising image beauty
- **Trust markers as a prominent section** - Gift Palace's certification and heritage story should be equally prominent
- **Image zoom on hover** - Subtle, professional interaction that invites exploration
- **Flat, minimal shadow design** - Focuses on content, not decoration
- **Generous vertical spacing** - Breathing room makes the design feel premium and calm

---

## Next Steps

1. **Subagent 2**: Use Hero section patterns to build `sections/home-hero.liquid`
2. **Subagent 3**: Use Discover section patterns to build `sections/home-discover-rail.liquid`
3. **Subagent 4**: Use Product card patterns to build grid component
4. **All**: Reference typography and spacing scales for consistency

---

## Extraction Checklist

- [x] Hero section fully documented with actual values
- [x] Discover section fully documented
- [x] Product card patterns documented
- [x] Typography system complete
- [x] Color palette extracted and documented
- [x] Spacing scale defined
- [x] Radius and shadow values documented
- [x] Motion and interaction patterns documented
- [x] Responsive breakpoints identified
- [x] Key inspiration insights captured

## EXTRACTION COMPLETE ✅

All MoonMagic patterns have been extracted and documented with:
- Specific pixel values where determinable
- Color descriptions (RGB approximations noted where exact hex unavailable)
- Spacing measurements for section, component, and micro-level gaps
- Typographic scale with desktop and mobile sizes
- Responsive breakpoint strategies
- Interaction and animation patterns
- Strategic insights on visual direction

**Ready for Subagents 2-4 to begin section builds.**
