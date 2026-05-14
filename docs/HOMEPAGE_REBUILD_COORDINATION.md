# Homepage Rebuild — Master Plan & Multi-Agent Coordination

**Project:** Gift Palace India — MoonMagic-style homepage rebuild
**Status:** PHASE 5 — PARALLEL EXPANSION 🟢
**Last Updated:** 2026-05-12

---

## 🎯 PROJECT GOAL (READ FIRST)

Transform the Gift Palace India homepage into a high-conversion, MoonMagic-inspired storefront for certified gemstones. The end state must be:

1. **Visually cohesive** — every section uses canonical `--gpi-*` tokens from `assets/gpi-tokens.css`. No hardcoded colors/spacing.
2. **Conversion-focused** — clear hero, browse-by-intent rails, featured products, social proof, FAQ, trust pillars, concierge CTA.
3. **Mobile-perfect** — clean at 320 / 768 / 1024 / 1440px.
4. **Performant** — image lazy-load, deferred CSS, no render-blocking junk.
5. **Theme-Check clean** — `shopify theme check` returns zero errors.
6. **Schema-valid** — every new section has a complete Shopify schema with presets.
7. **Accessible** — semantic HTML, alt text, focus states, prefers-reduced-motion.

If anything in this file is ambiguous, optimize for these 7 outcomes in order.

---

## 🤝 MULTI-AGENT PROTOCOL (READ BEFORE TOUCHING ANY FILE)

Multiple agents (Claude, Gemini CLI, others) work this file in parallel. To prevent collisions, follow this protocol:

### Before starting work
1. `git pull` — get latest commits from other agents.
2. Read this file end-to-end.
3. In the **Open Tasks** table below, find a task marked 🟡 OPEN.
4. **Claim it:** edit this file, change status to 🔵 IN PROGRESS, add your agent name + UTC timestamp in the "Owner" column. Commit immediately with message `chore: claim <task-id>`.
5. `git push` (or commit locally if no remote) so other agents see your claim.

### During work
- Edit ONLY the files listed in your task's "Owns" column.
- Use canonical tokens from `assets/gpi-tokens.css`. **Never** redeclare `--gpi-*` in another file.
- Never modify `layout/theme.liquid`, `templates/index.json`, or another agent's owned files unless your task explicitly says so.
- If your section needs to be wired into the homepage, do NOT edit `templates/index.json` directly — instead append your section preset name + suggested order to `docs/SECTIONS_TO_WIRE.md`. The orchestrator wires them in a single batch.
- Commit frequently with clear messages.

### When done
1. Update the **Open Tasks** table — change status to ✅ COMPLETE.
2. Add a Communication Log entry at the bottom: agent name, UTC timestamp, files touched, commit hashes, anything other agents need to know.
3. Final commit: `feat(<task-id>): <description>`.

### If you must stop early (rate limit, context limit, error)
1. Update the task status to ⚠️ HANDOFF in the table.
2. Add a Communication Log entry describing exactly what's done, what's left, and any pitfalls discovered.
3. Commit with `chore: handoff <task-id> — <reason>`. Another agent picks up from there.

### Locked files (require coordination — do not edit without claim)
- `templates/index.json` — orchestrator only
- `layout/theme.liquid` — orchestrator only
- `assets/gpi-tokens.css` — single source of truth; only ADD tokens, never override
- `docs/HOMEPAGE_REBUILD_COORDINATION.md` — this file; update only your own row

---

## 🔴 LIVE CLAIM STATUS (always `git pull` + `git log -10` before claiming)

```
🟢 OPEN — safe to claim:        (none)
🔵 IN PROGRESS — DO NOT TOUCH:  (none)
✅ COMPLETE:                     T-01, T-02, T-03, T-04, T-05, T-06, T-07, T-08, T-09, T-10, T-11, T-12, O-01, O-02
🟡 RESERVED — orchestrator:     O-03 (smoke test, runs after T-08..T-12)
👤 USER ONLY:                    U-01, U-02, U-03, U-04
```

**For the manual window / human collaborator:** pick from 🟢 OPEN list. Claim by editing this file (change Status → 🔵 IN PROGRESS, set Owner='Manual <name> <UTC>') and committing `chore: claim T-XX` BEFORE writing code. Do not pick a 🔵 task even if it looks idle — agents may be mid-work. If a 🔵 task hasn't moved in >30 min, mark it ⚠️ HANDOFF and grab it.

**Files NEVER touched in parallel:** `templates/index.json`, `layout/theme.liquid`, `assets/gpi-tokens.css`. Append to `docs/SECTIONS_TO_WIRE.md` instead of editing index.json.

---

## 📋 OPEN TASKS (CLAIM ONE)

| ID | Task | Owns (files) | Status | Owner | Notes |
|---|---|---|---|---|---|
| T-01 | Theme Check validation + fix any errors | (read all, fix only what theme-check flags) | ✅ COMPLETE | Gemini-Validator 2026-05-08 | Final pass after T-02..T-12 complete |
| T-02 | Build Trust Pillars section (4-icon row: GJEPC, Certified, Insured Shipping, Lifetime Support) | `sections/home-trust-pillars.liquid`, `assets/component-home-trust-pillars.css` | ✅ COMPLETE | Gemini-A 2026-05-08 | Block-based: each block = 1 pillar with icon + title + text. Append to `docs/SECTIONS_TO_WIRE.md` when done. |
| T-03 | Build Testimonials section (3-card customer review carousel) | `sections/home-testimonials.liquid`, `assets/component-home-testimonials.css` | ✅ COMPLETE | Gemini-B 2026-05-08 | Block-based: each block = 1 review (name, location, rating, text, optional image). Use schema.org Review structured data. |
| T-04 | Build FAQ section (accordion, schema.org FAQPage) | `sections/home-faq.liquid`, `assets/component-home-faq.css` | ✅ COMPLETE | Gemini-C 2026-05-08 | Block-based: each block = 1 Q&A. Use `<details>` + `<summary>` for native accordion. Inject FAQPage JSON-LD. |
| T-05 | Build Newsletter signup section (email capture + value prop) | `sections/home-newsletter-signup.liquid`, `assets/component-home-newsletter-signup.css` | ✅ COMPLETE | Gemini-D 2026-05-08 | Use Shopify's `{% form 'customer' %}`. Honeypot + double-opt-in copy. |
| T-06 | Add structured data snippet for homepage (Organization + Website + BreadcrumbList JSON-LD) | `snippets/home-structured-data.liquid` | ✅ COMPLETE | Gemini-E 2026-05-08 | New snippet only. Do NOT modify `theme.liquid`; orchestrator will include it. |
| T-07 | Accessibility audit pass on existing 6 sections (alt text, aria-labels, focus rings, color contrast) | (surgical edits to 6 home-*.liquid + their CSS) | ✅ COMPLETE | Gemini-F 2026-05-08 | Don't restructure markup. Add `aria-*`, fix `alt=""` placeholders, ensure focus-visible. |
| T-08 | Build "Why Buy From Us" section (3-column value props with checkmark icons) | `sections/home-why-us.liquid`, `assets/component-home-why-us.css` | ✅ COMPLETE | Codex 2026-05-12 | Built block-based section, max 6 props, token-aligned CSS, presets appended to `docs/SECTIONS_TO_WIRE.md`. Needs Shopify-admin copy/icon review after wiring. |
| T-09 | Build Lookbook Spotlight section (single hero image + overlay copy + dual CTA) | `sections/home-lookbook-spotlight.liquid`, `assets/component-home-lookbook-spotlight.css` | ✅ COMPLETE | Codex 2026-05-12 | Built image-picker spotlight with overlay copy, dual CTA, responsive min-height. Queued after `home-brand-story`. Needs Shopify-admin image/link population and storefront preview review. |
| T-10 | Build Compact Brand Story section (text + small portrait, "Since 1989" angle) | `sections/home-brand-story.liquid`, `assets/component-home-brand-story.css` | ✅ COMPLETE | Codex 2026-05-12 | Built 60/40 story section with portrait picker, pull quote, and "Selling since 1989" badge. Queued after `home_meaning_guide`. Needs Shopify-admin portrait/link population and preview review. |
| T-11 | Build Featured Press / Press Mentions logo strip | `sections/home-press-strip.liquid`, `assets/component-home-press-strip.css` | ✅ COMPLETE | Codex 2026-05-12 | Built block-based logo strip, max 8 logos, grayscale-to-color hover, responsive wrap. Added to `docs/SECTIONS_TO_WIRE.md`. Needs Shopify-admin logo/link population after wiring. |
| T-12 | Image optimization audit on all 6 existing home sections (preload hero, srcset, sizes attr) | (surgical edits to existing 6 home-*.liquid only) | ✅ COMPLETE | Codex 2026-05-12 | Added hero preload plus responsive `srcset`/`sizes`/`decoding` to hero, discover rail, featured browse, conversion intro, and meaning guide images. Concierge CTA has no images to optimize. |

### Tasks reserved for orchestrator (do not claim)
| ID | Task | Notes |
|---|---|---|
| O-01 | Wire newly-built sections into `templates/index.json` | After T-02..T-05 complete, batch-add their presets in canonical order |
| O-02 | Include `home-structured-data` snippet in `layout/theme.liquid` | After T-06 completes |
| O-03 | Final integration smoke test + commit "Phase 5 ship" | After all above |

### Tasks for the user (Shubh, not agents)
| ID | Task | Notes |
|---|---|---|
| U-01 | Populate hero section in Shopify admin (image, headline, trust badges) | Theme settings only |
| U-02 | Add Discover Rail tab blocks (1 per gemstone collection) | Theme settings only |
| U-03 | Choose collection in Featured Browse Grid | Theme settings only |
| U-04 | Populate new Phase 5 sections after orchestrator wiring | Add lookbook hero image/links, brand portrait/link, press logos/links, and final copy review for Why Us cards |

---

## 🎨 DESIGN SYSTEM (CANONICAL TOKENS)

**Single source of truth:** `assets/gpi-tokens.css` — loaded globally via `layout/theme.liquid`.

**Rule:** Never redeclare `--gpi-*` tokens in another CSS file. If you need a new token, ADD it to `gpi-tokens.css` (and document below).

### Available tokens
- **Colors:** `--gpi-color-ink-strong`, `--gpi-color-ink`, `--gpi-color-text-muted`, `--gpi-color-accent-gold`, `--gpi-color-accent-gold-strong`, `--gpi-color-accent-gold-soft`, `--gpi-color-surface-canvas`, `--gpi-color-surface-ivory`, `--gpi-color-surface-card`, `--gpi-color-border-soft`
- **Typography:** `--gpi-font-heading` (Cormorant Garamond), `--gpi-font-body` (inherit)
- **Spacing:** `--gpi-space-1`..`--gpi-space-9` (4 → 96px, 8px-base)
- **Radii:** `--gpi-radius-small` (8px), `--gpi-radius-card` (12px), `--gpi-radius-large` (20px)
- **Shadows:** `--gpi-shadow-low`, `--gpi-shadow-medium`, `--gpi-shadow-high`

### Standard breakpoints (use these exact values)
- `@media (max-width: 1024px)` — tablet
- `@media (max-width: 768px)` — mobile
- `@media (max-width: 320px)` — small mobile

### Section padding rhythm (use these exact tokens)
- Desktop: `padding: var(--gpi-space-8) var(--gpi-space-7);` (64px / 48px)
- Tablet (1024px): `padding: var(--gpi-space-7) var(--gpi-space-6);` (48px / 32px)
- Mobile (768px): `padding: var(--gpi-space-7) var(--gpi-space-5);` (48px / 24px)
- Small mobile (320px): `padding: var(--gpi-space-5) var(--gpi-space-4);` (24px / 16px)

---

## 🧱 SECTION SCAFFOLD (use as a starting point)

Every new section file follows this skeleton — copy it, don't reinvent it.

```liquid
{%- comment -%} Section: <name> — <one-line purpose> {%- endcomment -%}
<link rel="stylesheet" href="{{ '<your-css-file>.css' | asset_url }}">

<section class="home-<name>" aria-labelledby="home-<name>-heading">
  <div class="home-<name>__header">
    {% if section.settings.title != blank %}
      <h2 id="home-<name>-heading" class="home-<name>__title">{{ section.settings.title }}</h2>
    {% endif %}
    {% if section.settings.subheading != blank %}
      <p class="home-<name>__subheading">{{ section.settings.subheading }}</p>
    {% endif %}
  </div>

  {% if section.blocks.size > 0 %}
    <div class="home-<name>__grid">
      {% for block in section.blocks %}
        <article class="home-<name>__item" {{ block.shopify_attributes }}>
          <!-- block content -->
        </article>
      {% endfor %}
    </div>
  {% endif %}
</section>

{% schema %}
{
  "name": "<Display Name>",
  "blocks": [
    {
      "type": "item",
      "name": "Item",
      "settings": [ /* ... */ ]
    }
  ],
  "settings": [
    { "type": "text", "id": "title", "label": "Title", "default": "..." },
    { "type": "text", "id": "subheading", "label": "Subheading" }
  ],
  "presets": [
    { "name": "<Display Name>" }
  ]
}
{% endschema %}
```

CSS skeleton (paired with the above):

```css
.home-<name> {
  padding: var(--gpi-space-8) var(--gpi-space-7);
  background-color: var(--gpi-color-surface-canvas);
}
.home-<name>__title {
  font-family: var(--gpi-font-heading);
  font-size: 40px;
  color: var(--gpi-color-ink-strong);
  margin: 0;
}
@media (max-width: 1024px) { .home-<name> { padding: var(--gpi-space-7) var(--gpi-space-6); } }
@media (max-width: 768px)  { .home-<name> { padding: var(--gpi-space-7) var(--gpi-space-5); } .home-<name>__title { font-size: 32px; } }
@media (max-width: 320px)  { .home-<name> { padding: var(--gpi-space-5) var(--gpi-space-4); } .home-<name>__title { font-size: 24px; } }
```

---

## ✅ COMPLETED PHASES

### Phase 1 — Pattern Extraction ✅
`docs/MOONMAGIC_PATTERN_EXTRACT.md`

### Phase 2 — Content Mapping ✅
`docs/superpowers/specs/2026-04-24-homepage-moonmagic-redesign.md`

### Phase 3 — Core Sections Built ✅
| Section | Liquid | CSS |
|---|---|---|
| Hero + Trust | `sections/home-hero-moonmagic.liquid` | `assets/component-home-hero-moonmagic.css` |
| Discover Rail | `sections/home-discover-rail.liquid` | `assets/component-home-discover-rail.css` |
| Featured Browse | `sections/home-featured-browse.liquid` | `assets/component-home-featured-browse.css` |
| Conversion Intro | `sections/home-conversion-intro.liquid` | `assets/component-home-conversion.css` |
| Meaning Guide | `sections/home-meaning-guide.liquid` | `assets/component-home-conversion.css` |
| Concierge CTA | `sections/home-concierge-cta.liquid` | `assets/component-home-conversion.css` |

### Phase 4 — Cleanup, Wiring, Responsive Polish ✅
- Reordered `templates/index.json` (MoonMagic sections first, legacy disabled)
- Created canonical `assets/gpi-tokens.css`, loaded via `layout/theme.liquid`
- Rewrote discover rail (block-based collection tabs) and featured browse (collection picker)
- Standardized breakpoints to 320/768/1024/1440 across all 6 sections
- Refactored `component-home-conversion.css` to use canonical tokens; removed ~250 lines of legacy CSS
- Commits: `a5ceac0d5`, `a45c7a064`, `e4503cc58`, `901d3444e`, `4eed76c4e`

---

## 📜 COMMUNICATION LOG

### Entry 1 — Session Start (2026-04-24)
Project approved.

### Entry 2 — Pattern Extract Complete (2026-04-24)
`docs/MOONMAGIC_PATTERN_EXTRACT.md` saved.

### Entry 3 — All MoonMagic sections shipped (2026-04-24 → 2026-04-25)
Hero, Discover Rail, Featured Browse, conversion-intro, meaning-guide, concierge-cta built.

### Entry 4 — Cleanup + Wiring Pass (Sonnet 4.6, 2026-05-08)
Section order, gpi-tokens.css, block-based discover rail, collection-picker featured browse.

### Entry 5 — Phase 4 Cross-section Audit (Gemini CLI, 2026-05-08)
Standardized breakpoints, refactored conversion CSS to canonical tokens, removed ~250 lines of legacy CSS.

### Entry 6 — Phase 5 Launched (Sonnet 4.6, 2026-05-08)
Master plan refactored for parallel multi-agent work. 7 open tasks (T-01..T-07), 3 orchestrator tasks, 3 user tasks. Multiple agents now working in parallel.
### Entry 7 — T-02 Trust Pillars section built (Gemini-A, 2026-05-08)
Built `sections/home-trust-pillars.liquid` and `assets/component-home-trust-pillars.css`. Section is block-based (max 6 pillars). Uses canonical `--gpi-*` tokens. Responsive grid (4/2/1 columns). Added to wiring queue in `docs/SECTIONS_TO_WIRE.md`.

### Entry 9 — T-05 Newsletter signup section built (Gemini-D, 2026-05-08)
Built `sections/home-newsletter-signup.liquid` and `assets/component-home-newsletter-signup.css`. Uses Shopify's `{% form 'customer' %}` with honeypot field. Centered layout, max-width 720px, ivory background. Support for up to 4 value-prop bullets. Uses canonical `--gpi-*` tokens. Added to wiring queue in `docs/SECTIONS_TO_WIRE.md`.

### Entry 10 — T-04 FAQ section built (Gemini-C, 2026-05-08)
Built `sections/home-faq.liquid` and `assets/component-home-faq.css`. Block-based (max 20 Q&A). Uses native `<details>`/`<summary>` for accordion. Two-column desktop layout (heading 1/3, list 2/3). Inject FAQPage JSON-LD. Uses canonical `--gpi-*` tokens. Added to wiring queue in `docs/SECTIONS_TO_WIRE.md`. Commit: `feat(T-04): FAQ section`.

---
### Entry 8 — T-03 Testimonials section built (Gemini-B, 2026-05-08)
Built `sections/home-testimonials.liquid` and `assets/component-home-testimonials.css`. Section is block-based (max 12 reviews). Includes schema.org Review structured data (JSON-LD). Responsive 3-column grid on desktop, scroll-snap carousel on mobile. Uses canonical `--gpi-*` tokens. Added to wiring queue in `docs/SECTIONS_TO_WIRE.md`. Commit: `feat(T-03): Testimonials section`.

### Entry 9 — T-07 Accessibility Audit Pass (Gemini-F, 2026-05-08)
Completed accessibility audit for 6 sections (Hero, Discover Rail, Featured Browse, Intro, Meaning Guide, Concierge CTA). Added ARIA landmarks, improved alt text, implemented keyboard navigation for Discover Rail tabs, and added focus-visible styles across all sections. Noted potential color contrast issues with --gpi-color-text-muted and --gpi-color-accent-gold on light backgrounds. Added visually-hidden helper to conversion CSS.
Files touched:
- sections/home-hero-moonmagic.liquid
- assets/component-home-hero-moonmagic.css
- sections/home-discover-rail.liquid
- assets/component-home-discover-rail.css
- sections/home-featured-browse.liquid
- assets/component-home-featured-browse.css
- sections/home-conversion-intro.liquid
- sections/home-meaning-guide.liquid
- sections/home-concierge-cta.liquid
- assets/component-home-conversion.css

### Entry 11 — T-06: Homepage structured data snippet (Gemini-E, 2026-05-08)
Created `snippets/home-structured-data.liquid`. Emits @graph with Organization, WebSite, and BreadcrumbList. Uses request.origin and fallbacks for logo/social. Structured data is only output when `template == 'index'`. Commit: `feat(T-06): Homepage structured data snippet`.

---

### Entry 12 — T-01: Theme Check validation + Final pass (Gemini-Validator, 2026-05-08)
Verified all 10 `home_*` sections in `templates/index.json` match canonical order. All new sections have valid schemas and presets. CSS token hygiene confirmed (no forbidden redeclarations). Improved `urlTemplate` safety in `home-structured-data.liquid`. `shopify theme check` flagged pre-existing missing `gemstone-loader.png` asset in `theme.liquid` and other legacy files; new sections are clean. Commit: `fix(T-01): Theme check validation pass`.

---

### Entry 13 — T-08/T-09/T-10: Remaining homepage section trio (Codex, 2026-05-12)
Built `sections/home-why-us.liquid`, `sections/home-lookbook-spotlight.liquid`, and `sections/home-brand-story.liquid` with matching CSS assets. All three use canonical `--gpi-*` tokens, complete Shopify schemas, and presets. Added the three sections to `docs/SECTIONS_TO_WIRE.md` instead of editing `templates/index.json`. Remaining work: orchestrator wiring, Shopify-admin media/link/content population, then storefront preview review across mobile and desktop.

---

### Entry 14 — T-11/T-12: Press strip and image optimization pass (Codex, 2026-05-12)
Built `sections/home-press-strip.liquid` and `assets/component-home-press-strip.css`; queued the Press Mentions preset in `docs/SECTIONS_TO_WIRE.md`. Completed the scoped image optimization pass on the existing six MoonMagic homepage sections: hero now preloads the selected Shopify image, collection/product images have responsive `srcset`/`sizes`, static asset images use responsive asset image URLs, and Concierge CTA was left unchanged because it has no images.

---

## 🚨 IF YOU RUN OUT OF CONTEXT / TOKENS

The next agent picking up this project must:
1. Read this file first (it's the source of truth).
2. Read `docs/SECTIONS_TO_WIRE.md` to see what's built but not wired.
3. Run `git log --oneline -20` to see recent work.
4. Check the Open Tasks table for ⚠️ HANDOFF or 🔵 IN PROGRESS items.
5. Continue from there.

The 7 goals at the top of this file are the contract. Optimize for them.
