# Session Resume — Gift Palace India MVP

**Last session ended:** 2026-05-14
**Last commit on `main`:** `b52b766f2`  (`fix(footer): trim 'link_column' block name`)
**Branch:** main (also a feature branch worktree exists at `claude/relaxed-euclid-6b54e0`)

---

## After restart, do these 3 things in order

### 1. Verify higgsfield MCP is loaded

In Claude Code, type `/mcp`. The list must include `higgsfield`. If it doesn't:

Run from a terminal:
```
claude mcp add --transport http higgsfield https://mcp.higgsfield.ai/mcp
```

Or hand-edit `~/.claude/claude_config.json` (or your project `.mcp.json`):
```json
{
  "mcpServers": {
    "higgsfield": {
      "type": "http",
      "url": "https://mcp.higgsfield.ai/mcp"
    }
  }
}
```

Then close Claude Code and reopen. Confirm with `/mcp` again.

### 2. Restart the Shopify dev server

The dev server has a stuck phantom-tmp file in its upload queue from earlier atomic-write race. `.shopifyignore` (already in repo) prevents future occurrences but cannot clear the running daemon's queue.

In your terminal where `shopify theme dev --port=9292` is running:
```
Ctrl+C
shopify theme dev --port=9292
```

Then verify localhost:9292 returns 200 on `/`, `/products/<any>`, `/collections/all`, `/cart`.

### 3. Paste this prompt into Claude Code

> Resume the Gift Palace India MVP build per `docs/SESSION_RESUME.md`. Start with the queued task list in that file's §"Next 5 priorities", continue from task 1.

I will pick up from the priority list below.

---

## Where the build is right now

### Storefront — done

| Surface | Status |
|---|---|
| Homepage (25 sections, GPI section types) | ✅ live, GPI sections 1-25 wired in `templates/index.json` |
| Header (3-row, oversized centered logo, nav-icons, 48px utility) | ✅ live |
| Footer (26 inline links, 5 policies, 4 socials, quick-contact row, Maps in store proof) | ✅ live (block name fix in `b52b766f2`) |
| Product page (gallery + info composite, tabs, FBT, related, recently-viewed, schema JSON-LD) | ✅ live |
| Collection page (hero, toolbar, filters, grid, load-more, SEO block) | ✅ live |
| Cart page (line items, sticky summary, trust, upsell, empty state) | ✅ live |
| Customer pages (login/register/account/addresses/order/reset/activate) | ✅ live |
| Content pages (About/Contact/FAQ/Policy/Intention/Lookbook/Locator) | ✅ live |
| Blog + Article (hero, grid, body, share, related, JSON-LD) | ✅ live |
| Search results page | ✅ live |
| Wishlist page (localStorage-backed) | ✅ live |
| Edge pages (404, password, gift card, list-collections) | ✅ live |
| Mobile-first responsive pass via `component-gpi-mobile-pass.css` | ✅ live |
| Currency switcher (5 currencies, localStorage + `?currency=`) | ✅ live |
| Wishlist heart toggle (localStorage + custom events) | ✅ live |

### Recent commits (newest first)

```
b52b766f2 fix(footer): trim 'link_column' block name to under 25 chars (Shopify limit)
0d91b2a4d feat(homepage): replace legacy pos 4/5, real-store Maps proof, fill footer, atlas viewport
e9d2a2a9a feat(header+mobile): nav-icons per top-level link, bigger utility tap targets, full mobile-first pass
29ba93b1b fix: clear stuck dev-server upload queue + force re-upload of cached JSONs
e8bd940b2 docs(images): master image catalog — 80+ unique generation prompts
f3f9a576f chore(wave-11): launch status doc + final audit
7dbda5733 feat(wave-7-10): blog/article/search/wishlist/404/password/gift card/collections index
436862fef feat(wave-6): content pages
6fd422891 feat(wave-5): customer pages
82f04b789 feat(wave-4): cart page
165c1303d feat(wave-3): collection page
c311613e8 feat(wave-2): product page
58f39dbb7 feat(wave-1): header + footer + foundation
58b79141a chore(wave-0): snapshot homepage rebuild + 25-section fix
```

---

## Next 5 priorities (run in order)

### 1. Higgsfield batch generation of intention tiles + brand chrome

**File:** `docs/IMAGE_CATALOG.md` §0 + §1 + §8 (intention tiles 12 unique)
**Why:** unblocks `/pages/shop-by-intention` and gives the homepage its hero imagery
**Tools to use** (will appear after restart): whatever the higgsfield MCP exposes — likely `mcp__higgsfield__create` or `mcp__higgsfield__generate_image`. Probe first with ToolSearch `higgsfield`.
**Save outputs to:** `assets/gpi-intent-01.webp` through `assets/gpi-intent-12.webp` (+ PNG fallbacks per catalog §0 output rules).
**Verify with:** `python -c "import os; print([f for f in ['gpi-intent-01.webp','gpi-intent-02.webp'] if not os.path.exists(f'assets/{f}')])"` — should print `[]`.

### 2. Contrast audit + fix dark sections

**User feedback in screenshot:** "it has contrast issues and some components need to be updated"
**Suspect sections** (visible in user's full-page screenshot at session end):
- `sections/home-trust-proof.liquid` — has a dark `#18140f` bg block with text that may not meet AA contrast
- `sections/home-concierge-cta.liquid` — dark hero, gold text on near-black may be borderline
- `sections/home-most-gifted.liquid` — dark accent strip
- `sections/home-signature-drop.liquid` — same dark-theatrical lighting
- `sections/gpi-page-about.liquid` `.gpi-page-about__cta` block — explicit `background: var(--gpi-ink-strong)` with white text (likely fine but verify)

**Audit script** (run from repo root):
```
python -c "
import re, glob, os
suspects=[]
for p in glob.glob('assets/component-home-*.css')+glob.glob('assets/component-gpi-*.css'):
    css=open(p,'r',encoding='utf-8',errors='ignore').read()
    if re.search(r'background[^;]*(--gpi-ink|#1[0-9a-f]{5}|rgb\\(\\s*[0-3][0-9],)',css):
        suspects.append(p)
print('Files with dark backgrounds to audit:')
for s in suspects: print(' ',s)
"
```
**Fix pattern:** wherever a dark bg appears, text must use `var(--gpi-surface-canvas)` or `var(--gpi-color-bg-primary)` and supporting text must stay at ≥4.5:1 contrast (use `var(--gpi-color-text-secondary)` only if it tests >4.5:1 against the bg).

### 3. Catalog (collection) page interior — deepen beyond MVP

**File:** `sections/gpi-collection-toolbar.liquid` + `gpi-coll-grid.liquid` + `gpi-collection-hero.liquid`
**What to add:**
- Saved-filter chips at top of grid that persist via URL
- "Sort by" + "View 4-col / 3-col / list" toggle (skeleton already there, wire it up via `data-gpi-view-toggle`)
- Quick-view modal on hover (skeleton snippet `gpi-product-card.liquid` has `quick-add` — extend to open a side-drawer with full product info via `fetch /products/{handle}.js`)
- Sticky add-to-bag from grid (mobile only — bottom drawer)

### 4. Product page interior — deepen beyond MVP

**Files:** `sections/gpi-product-main.liquid`, `gpi-product-tabs.liquid`
**What to add:**
- Sticky add-to-bag bar on scroll (mobile + desktop): appears when user scrolls past the main ATC button
- Variant selector chips: swatch images for stone colours where metafield `variant.gpi.swatch_image` exists
- Inline pairing block ("Often bought with") above tabs — already in FBT but make it inline in info column for first-fold visibility
- Certificate of authenticity download CTA (PDF link from product metafield `gpi.certificate_pdf`)
- Inline reviews summary (avg rating + count) clickable to anchor to reviews tab

### 5. Long tests (final QA)

**Only after 1-4 are done.** Run from repo root:
```
# Section count audit
python -c "
import json, glob
for p in sorted(glob.glob('templates/*.json')):
  try:
    raw=open(p,'r',encoding='utf-8').read()
    if raw.startswith('/*'): raw=raw[raw.find('*/')+2:].lstrip()
    d=json.loads(raw)
    n=len(d.get('sections',{}))
    flag='*** OVER 25 ***' if n>25 else ''
    if n>0: print(f'{p:50} {n:3} {flag}')
  except: pass
"

# Image uniqueness audit
python -c "
import re, glob
hits={}
for p in glob.glob('sections/*.liquid')+glob.glob('snippets/*.liquid'):
    for m in re.findall(r'gpi-[a-z0-9-]+\\.(?:webp|png|mp4)',open(p,'r',encoding='utf-8',errors='ignore').read()):
        hits.setdefault(m,[]).append(p)
print('Duplicated image references:')
for k,v in hits.items():
    if len(v)>1: print(f'  {k}: {v}')
"

# Smoke test of every page type
for url in / /products/sunstone-bracelet /collections/all /cart /search?q=ruby /pages/shop-by-intention /pages/about-us /pages/contact-us /pages/faqs /blogs/news /account/login /policies/refund-policy /nonexistent-test; do
  echo -n "$url: "
  curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:9292$url" --max-time 10
done
```

All sections ≤25, zero duplicate images, every URL returns 200/302/404 as expected.

---

## Known issues at this checkpoint

1. **Phantom .tmp file blocking dev server** — clears on dev-server restart (step 2 above).
2. **`/pages/wishlist`, `/pages/shop-by-intention`, possibly `/pages/store-locator` may return 404** — user needs to create the Shopify Page objects in Admin with matching template suffixes:
   - Wishlist → suffix `wishlist`
   - Shop by intention → suffix `shop-by-intention`
   - Store locator → suffix `store-locator`
3. **Intention tile imagery is glyph-only** until higgsfield batch (priority 1).
4. **Press strip section** — flagged in catalog as `[admin]` because fake press logos are a legal risk; user must upload real publication marks via Shopify admin or the section should be hidden.

---

## Critical reference docs

- `docs/IMAGE_CATALOG.md` — 80+ image prompts, single source of truth for higgsfield batch
- `docs/MVP_LAUNCH_STATUS.md` — wave-by-wave completion + final inventory
- `docs/superpowers/specs/2026-05-14-storefront-redesign-design.md` — original spec
- `docs/superpowers/plans/2026-05-14-storefront-redesign.md` — implementation plan
- `docs/archive/` — original templates archived before replacement (product, collection, cart, customers, pages, search, edge)
- `.shopifyignore` — blocks `*.tmp.*` from dev-server upload queue

---

## When you (the user) need to do something manually in Shopify Admin

The theme code is complete, but a few admin tasks remain to make the live site work as intended:

1. **Switch header_layout to 'gpi'** in Shopify Admin → Themes → Customize → Theme settings → Header (already set in `config/settings_data.json` to `"gpi"` but verify it sticks).
2. **Switch footer_layout to 'gpi'** same way.
3. **Add nav-icon blocks to the GPI Header** in Customize → Header section → Add block "Nav icon", one per top-level menu item:
   - Match label: exact menu link title (e.g., `BRACELETS`)
   - Icon image: pick a square PNG/WebP (will be generated by higgsfield catalog §3)
4. **Create the missing pages** with the template suffixes listed above.
5. **Assign the Policy template** to `/policies/*` pages if you want the GPI policy layout (Admin → Settings → Policies → each policy has a template dropdown).
