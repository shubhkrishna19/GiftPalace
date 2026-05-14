# Gift Palace India — Master Image Catalog

**Date:** 2026-05-14
**Status:** Complete spec. Awaiting higgsfield MCP reconnect to begin batch generation.
**Uniqueness rule:** Each row below has a unique `id` and a unique `filename`. Same image never reused across the site. To enforce: theme code references each filename exactly once.

---

## 0. Style guide (shared across every prompt)

**Base style prefix** — paste at the start of every higgsfield prompt. Tweak only the **scene** for each entry.

```
luxury indian gemstone jewelry brand editorial, fine art photography,
soft directional natural light from the left, warm ivory backdrop
(hex #fbf7ef), subtle film grain, considered composition, calm intentional
mood, restrained palette of ivory / warm gold (#8b6326) / deep ink (#18140f) /
warm taupe (#cfbda2), shallow depth of field where appropriate, sharp focus
on subject, no harsh studio lighting, no synthetic glare, no plastic finish,
no cluttered backgrounds, no chrome, no overly polished cgi look, heritage
craft feeling, suitable for a high-end indian gemstone jeweller founded 1989
```

**Negatives (apply to every render):**
`harsh studio strobe, neon, plastic, cgi shine, cluttered table, busy props, blurry hands, watermarks, text overlays, logos other than the intended one, oversaturated colours, gemstone identification mistakes (e.g. ruby that looks like garnet)`

**Output rules:**
- Format: WebP primary + PNG fallback (same filename, both extensions).
- Color space: sRGB, no embedded ICC larger than necessary.
- Compression: WebP quality 82–88; PNG 256-colour palette for tiles, full-RGB for photography.
- Dimensions: see each row. Always at exact pixel size — no upscaling, no cropping after generation.
- Naming: lowercase, kebab-case, prefix `gpi-`. Filename listed per row is canonical.
- After generation, place WebP + PNG in `assets/` (Shopify theme assets) OR upload to Shopify Files for admin-picked slots. Tag in this catalog with `[asset]` or `[files]`.

**Workflow (once higgsfield MCP returns):**

```
for each row in this catalog:
  1. Compose prompt = base_style + scene
  2. Call higgsfield with size + aspect ratio + negative prompt
  3. Save WebP at assets/<filename>.webp and PNG at assets/<filename>.png
  4. Mark row Status = ✅ in this file
  5. If [files] row, also upload to Shopify Files via shopify-cli or admin
  6. Commit batch every 10–15 images
```

---

## 1. Brand chrome (uploaded once, used everywhere)

| ID | Filename | W×H | AR | Where used | Status | Prompt scene |
|---|---|---|---|---|---|---|
| GPI-CHROME-01 | `gpi-logo-wordmark-light.webp` | 600×160 | 15:4 | header on light bg, footer | NEW | `the wordmark "GIFT PALACE" in elegant marcellus-style serif capitals, 0.04em letterspacing, deep ink colour, transparent png background, optional tiny 6-pointed gemstone glyph immediately preceding the wordmark, single line, plenty of empty space around the lockup, the kind of mark a mature 1989-founded jeweller would have refined over decades — confident, quiet, expensive, never busy` |
| GPI-CHROME-02 | `gpi-logo-wordmark-dark.webp` | 600×160 | 15:4 | password page hero, dark backgrounds | NEW | `same wordmark as GPI-CHROME-01 but rendered in warm ivory (#fbf7ef) on transparent background, slightly thinner stroke compensation, ready for dark surfaces` |
| GPI-CHROME-03 | `gpi-favicon-512.png` | 512×512 | 1:1 | favicon source | NEW | `single 6-pointed gemstone glyph, deep ink fill, warm gold inner facet lines, centred on warm ivory background, no text, suitable for downscaling to 32px favicon — readable at 16px is the test` |
| GPI-CHROME-04 | `gpi-og-default.webp` | 1200×630 | 40:21 | Open Graph + Twitter card default | NEW | `editorial composition of three minimal gemstone jewellery pieces laid on warm ivory linen — a thin gold chain with a small certified ruby pendant top-left, a single yellow-sapphire stud bottom-right, an open velvet box centre-right, soft window light from upper-left, wordmark "GIFT PALACE" small bottom-left in deep ink serif, no overlay text other than the wordmark` |
| GPI-CHROME-05 | `gpi-apple-touch-180.png` | 180×180 | 1:1 | iOS home-screen icon | NEW | `same glyph as GPI-CHROME-03 rendered for iOS — slightly larger glyph, rounded square not applied (iOS does it), warm ivory bg` |

---

## 2. Homepage — existing sections, regenerated for stylistic coherence

These filenames are already referenced by `sections/home-*.liquid` files. Regenerating overwrites in place — no code changes needed.

### 2a. Hero variants (rotated across header section settings)

| ID | Filename | W×H | AR | Where used | Prompt scene |
|---|---|---|---|---|---|
| GPI-HERO-01 | `gpi-hero-wearing.webp` | 1920×1080 | 16:9 | hero MoonMagic default bg | `young indian woman, mid-twenties, three-quarter profile, soft natural window light, wearing a single delicate yellow-sapphire-and-gold pendant resting at the collarbone, simple ivory silk camisole, head tilted slightly down so the pendant is the focal point, eyes closed peacefully, hands not in frame, warm ivory backdrop with soft falloff, intentional calm gifting mood` |
| GPI-HERO-02 | `gpi-hero-bracelet.webp` | 1920×1080 | 16:9 | hero alt 1 | `close detail of two indian feminine wrists resting on a warm linen surface, one wearing a delicate ruby-gold tennis bracelet, the other wearing a thin black-jade beaded mala, fingers softly relaxed, natural diffused light, shallow depth of field on the ruby clasp, ivory and warm taupe palette, no nail polish, no rings, hands clearly belonging to a wearer who values quietness over flash` |
| GPI-HERO-03 | `gpi-hero-crystal.webp` | 1920×1080 | 16:9 | hero alt 2, also discover-rail header bg | `still life of three large raw crystal specimens — a smoky amethyst point, a piece of rose quartz, a polished selenite tower — arranged asymmetrically on warm ivory linen, slim brass measuring tape and a folded certificate of authenticity beside them, single window light, no jewellery in frame, atelier-on-a-quiet-morning mood` |
| GPI-HERO-04 | `gpi-hero-luxury.webp` | 1920×1080 | 16:9 | home-luxury-hero | `editorial-magazine cover composition: an indian woman in profile, light golden hour through a window, wearing a single high-carat pukhraj ring on the index finger, holding a small velvet pouch in cupped hands, ivory silk blouse, no other jewellery, warm bronze and ivory palette, the suggestion of an indian heritage home in soft background bokeh` |
| GPI-HERO-VID-01 | `gpi-hero-video.mp4` | 1920×1080@30fps, ≤8s loop | 16:9 | optional hero motion bg | `short looping cinematic of a single piece of jewellery being placed into an open velvet ring box on warm ivory linen, hand enters from right, single window light, no audio needed, ≤8 seconds, seamlessly loopable, soft grain for filmic feel` |

### 2b. Stone macros (used in product chips, gemstone atlas, intention tiles)

Each stone needs its own unique macro shot. **No stone reused.**

| ID | Filename | W×H | AR | Prompt scene |
|---|---|---|---|---|
| GPI-STONE-01 | `gpi-stone-ruby.webp` | 1200×1200 | 1:1 | `macro close-up of a single certified burma-style ruby, oval cut, ~6mm, resting on warm ivory linen, side-lit so internal redness glows without becoming neon, no jewellery setting, paper certificate corner just visible in background bokeh` |
| GPI-STONE-02 | `gpi-stone-emerald.webp` | 1200×1200 | 1:1 | `macro of a single colombian-style emerald, emerald-cut step facets, ~7mm, soft top light, faint natural inclusions visible (jardin), tone reads as a real natural emerald not synthetic, on linen` |
| GPI-STONE-03 | `gpi-stone-neelam.webp` | 1200×1200 | 1:1 | `macro of one blue sapphire (neelam), cushion cut, royal blue with slight velvet undertone, ~7mm, natural lighting reveals slight pleochroism, jyotish-grade quality without being overly perfect` |
| GPI-STONE-04 | `gpi-stone-pukhraj.webp` | 1200×1200 | 1:1 | `macro of one yellow sapphire (pukhraj), cushion cut, lemon-honey tone, ~6mm, soft northern light, faint silk visible inside indicating natural origin` |
| GPI-STONE-05 | `gpi-stone-diamond.webp` | 1200×1200 | 1:1 | `macro of a round-brilliant diamond, ~0.7ct equivalent visual, set on neutral ivory linen, no setting visible, light captures fire without becoming a fake studio sparkle, certificate corner blurred behind` |
| GPI-STONE-06 | `gpi-stone-pearl.webp` | 1200×1200 | 1:1 | `macro of a single round south-sea pearl, ~9mm, warm cream lustre with subtle pink overtone, resting on linen, soft directional light to reveal the orient without making it look painted` |
| GPI-STONE-07 | `gpi-stone-coral.webp` | 1200×1200 | 1:1 | `macro of a single round red mediterranean coral bead, ~7mm, slight natural variation in colour intensity, drilled bead visible, warm matte surface, on linen` |
| GPI-STONE-08 | `gpi-stone-gomed.webp` | 1200×1200 | 1:1 | `macro of one hessonite (gomed), cushion cut, honey-cinnamon colour with faint internal granular texture characteristic of hessonite, ~6mm` |
| GPI-STONE-09 | `gpi-stone-lehsuniya.webp` | 1200×1200 | 1:1 | `macro of one cat's eye chrysoberyl (lehsuniya), oval cabochon, milky-honey body, sharp single chatoyant line of light bisecting the dome, natural light, on linen` |
| GPI-STONE-10 | `gpi-stone-moonga.webp` | 1200×1200 | 1:1 | NEW — `macro of red coral bead detail, slightly different angle than GPI-STONE-07 (this version shows the front-on bead vs. side-on), distinct asset` |
| GPI-STONE-11 | `gpi-stone-moti.webp` | 1200×1200 | 1:1 | NEW — `macro of a baroque pearl variant, distinct from GPI-STONE-06's round south-sea — irregular silhouette, deeper cream tone` |
| GPI-STONE-12 | `gpi-stone-panna.webp` | 1200×1200 | 1:1 | NEW — `macro of a smaller calibrated emerald, oval cut, ~5mm, distinct from GPI-STONE-02 — tighter detail on a single facet` |

### 2c. Atelier & people (already exist — regenerate with coherent prompt)

| ID | Filename | W×H | AR | Where | Prompt scene |
|---|---|---|---|---|---|
| GPI-PEOPLE-01 | `gpi-advisor.webp` | 800×1000 | 4:5 | concierge cta | `seated indian woman in her early forties, warm ivory blouse, gold studs, lanyard with the word "advisor" half-visible, soft three-quarter portrait, kind eyes, sitting at an atelier table with a velvet display tray, hands gesturing as if mid-conversation, single window light` |
| GPI-PEOPLE-02 | `gpi-artisan.webp` | 800×1000 | 4:5 | about story | `indian male artisan, mid-fifties, weathered focused hands, working a small piece of jewellery in a bench peg setup, soft directional light, the moment captured at hand level with the face slightly out of frame so the labour is the subject, warm taupe apron, brass tools visible` |
| GPI-PEOPLE-03 | `gpi-atelier.webp` | 1920×1080 | 16:9 | about hero, password page bg | `wide environmental shot of the gift palace atelier: warm ivory walls, a long workbench with three artisans focused on their craft, soft northern window light, brass and glass cabinets in the background containing labelled gem specimens, a single brass kettle and chai cup on a side table, no signage other than a small framed founding-year plaque "since 1989" on the wall` |
| GPI-PEOPLE-04 | `gpi-testimonial-1-woman.webp` | 400×400 | 1:1 | testimonial card 1 | `friendly natural portrait of an indian woman in her thirties, smiling without showing teeth, warm cream blouse, neutral soft background, no jewellery competing with the subject, looks like a real customer photo not a stock image` |
| GPI-PEOPLE-05 | `gpi-testimonial-2-man.webp` | 400×400 | 1:1 | testimonial card 2 | `natural portrait of an indian man in his forties, slight smile, simple kurta in deep ink, neutral soft background, looks like a customer who values the considered approach of a heritage jeweller` |
| GPI-PEOPLE-06 | `gpi-testimonial-3-elder.webp` | 400×400 | 1:1 | testimonial card 3 | `warm natural portrait of an indian elder woman in her sixties, soft smile, traditional cotton sari in muted cream-and-gold, neutral background, looks like a long-term customer who has gifted jewellery to her grandchildren` |
| GPI-PEOPLE-07 | `gpi-team-founder.webp` | 800×1000 | 4:5 | about team grid #1 (new) | `dignified head-and-shoulders portrait of the (depicted) founder — indian man in his late sixties, silver hair, half-rim glasses, simple white kurta, slight smile, against a warm ivory wall, looks the part of a 1989 heritage jeweller who built the brand` |
| GPI-PEOPLE-08 | `gpi-team-curator.webp` | 800×1000 | 4:5 | about team #2 | `indian woman in her thirties, head-and-shoulders, contemporary ivory blouse, single thin gold chain visible, warm intelligent eyes, lit identical to GPI-PEOPLE-07 so the team grid feels unified` |
| GPI-PEOPLE-09 | `gpi-team-gemologist.webp` | 800×1000 | 4:5 | about team #3 | `indian man in his forties, head-and-shoulders, magnifying loupe hanging on a cord around his neck, single thin gold chain visible, looking just-off-camera as if mid-evaluation, same lighting as the others` |
| GPI-PEOPLE-10 | `gpi-team-stylist.webp` | 800×1000 | 4:5 | about team #4 | `indian woman in her late twenties, head-and-shoulders, simple ivory cotton dress, small pearl studs, slight playful smile, same lighting` |

### 2d. Atelier process strip (about page wave 6) — 4 unique scenes

| ID | Filename | W×H | AR | Prompt scene |
|---|---|---|---|---|
| GPI-PROCESS-01 | `gpi-process-source.webp` | 800×1000 | 4:5 | `hands of an indian buyer examining a single loose gemstone in a small paper packet, brass tweezers, gemmological loupe just out of focus in foreground, warm bench surface, "source" stage of the workflow` |
| GPI-PROCESS-02 | `gpi-process-cut.webp` | 800×1000 | 4:5 | `over-the-shoulder of an artisan at a faceting wheel, fine spray of water, single bright pinpoint light on the stone being cut, hands and face anonymised by composition, "cut" stage` |
| GPI-PROCESS-03 | `gpi-process-set.webp` | 800×1000 | 4:5 | `top-down detail of fine pliers setting a ruby into a yellow-gold prong setting, the piece held by a wax stick, brass dust on the bench, "set" stage` |
| GPI-PROCESS-04 | `gpi-process-certify.webp` | 800×1000 | 4:5 | `paper certificate of authenticity face-up, embossed seal in warm gold, the finished pendant from GPI-PROCESS-03 resting on top, BIS hallmark visible on the metal, "certify" stage` |

---

## 3. Discover rail / shop shortcuts (homepage)

Six unique category-context shots used in `home-discover-rail.liquid` and `home-shop-shortcuts.liquid`. **Different image per tile.**

| ID | Filename | W×H | AR | Tile |
|---|---|---|---|---|
| GPI-CAT-01 | `gpi-cat-necklaces.webp` | 800×1000 | 4:5 | Necklaces tile — `single layered necklace stack on neck silhouette, three thin chains of different lengths, one with a small stone pendant, warm ivory backdrop, no face` |
| GPI-CAT-02 | `gpi-cat-bracelets.webp` | 800×1000 | 4:5 | Bracelets tile — `single feminine indian wrist wearing a stack of two delicate gemstone bracelets and one beaded mala, hand relaxed on linen, distinct angle from GPI-HERO-02` |
| GPI-CAT-03 | `gpi-cat-rings.webp` | 800×1000 | 4:5 | Rings tile — `top-down of three rings arranged on a velvet ring tray: one solitaire ruby, one yellow-sapphire band, one thin diamond eternity band, no fingers in frame` |
| GPI-CAT-04 | `gpi-cat-earrings.webp` | 800×1000 | 4:5 | Earrings tile — `pair of small pearl-and-gold drop earrings displayed on a folded ivory linen square, soft top light, single shadow` |
| GPI-CAT-05 | `gpi-cat-mala.webp` | 800×1000 | 4:5 | Mala tile — `108-bead rudraksha mala laid in a perfect circle on warm ivory linen, the guru bead at the top of the circle, single window light, no hands` |
| GPI-CAT-06 | `gpi-cat-gemstones.webp` | 800×1000 | 4:5 | Loose gemstones tile — `four loose certified gemstones — ruby, emerald, blue sapphire, yellow sapphire — arranged in a square on a paper certificate with the GJEPC-style seal corner visible` |

---

## 4. Meaning guide (6 cards, homepage)

Distinct concept image per card; never reuse anywhere else.

| ID | Filename | W×H | AR | Card |
|---|---|---|---|---|
| GPI-MEAN-01 | `gpi-mean-intention.webp` | 800×600 | 4:3 | Find your intention — `single hand holding a single piece of rose quartz close to the heart area of a person in an ivory kurta, soft contemplative mood` |
| GPI-MEAN-02 | `gpi-mean-zodiac.webp` | 800×600 | 4:3 | Gift by zodiac — `flat-lay of 12 small zodiac glyphs hand-painted onto cream paper cards arranged in a circle, single stone in the centre, brass compass beside the layout` |
| GPI-MEAN-03 | `gpi-mean-crystal.webp` | 800×600 | 4:3 | Statement crystals — `large amethyst geode point displayed on a low wooden plinth in a softly lit corner of a home, single book and ceramic vessel beside, lifestyle interior not studio` |
| GPI-MEAN-04 | `gpi-mean-layering.webp` | 800×600 | 4:3 | Layering-ready necklaces — `three thin necklaces displayed flat on linen, overlapping slightly, no clasps visible, ready-to-wear mood` |
| GPI-MEAN-05 | `gpi-mean-mala.webp` | 800×600 | 4:3 | Jaap mala — `hand counting beads of a sandalwood mala against an ivory shawl, only the hand and beads in frame, prayerful calm` |
| GPI-MEAN-06 | `gpi-mean-loose.webp` | 800×600 | 4:3 | Loose gemstones — `single paper certificate face-up, three loose certified stones placed on top, magnifying loupe beside, no jewellery` |

---

## 5. Gemstone atlas (homepage, distinct from §2b stone macros — these are atlas-card heroes)

`home-gemstone-atlas.liquid` shows wider scene cards per stone family — these need lifestyle context, not isolated macros. **Use a distinct angle / scene from §2b.**

| ID | Filename | W×H | AR | Stone family |
|---|---|---|---|---|
| GPI-ATLAS-01 | `gpi-atlas-ruby.webp` | 1200×800 | 3:2 | Ruby — `hand wearing a ruby pendant resting on a chest in an ivory blouse, candlelight from off-screen, intimate scale` |
| GPI-ATLAS-02 | `gpi-atlas-emerald.webp` | 1200×800 | 3:2 | Emerald — `emerald-and-gold earring being lifted by tweezers from a velvet tray, focused on the act of curation` |
| GPI-ATLAS-03 | `gpi-atlas-neelam.webp` | 1200×800 | 3:2 | Neelam (blue sapphire) — `blue sapphire ring sitting on a stack of vedic astrology books, single brass diya unlit behind` |
| GPI-ATLAS-04 | `gpi-atlas-pukhraj.webp` | 1200×800 | 3:2 | Pukhraj (yellow sapphire) — `pukhraj pendant being clasped onto a thin gold chain on a velvet bust, hands in soft focus` |
| GPI-ATLAS-05 | `gpi-atlas-moonga.webp` | 1200×800 | 3:2 | Coral — `red coral bead bracelet on a wrist, the wrist resting on an open book of mantras` |
| GPI-ATLAS-06 | `gpi-atlas-moti.webp` | 1200×800 | 3:2 | Pearl — `pearl strand laid on warm white silk in a folded fan shape, single drop of water just visible suggesting freshness` |
| GPI-ATLAS-07 | `gpi-atlas-gomed.webp` | 1200×800 | 3:2 | Gomed — `hessonite ring being placed in an open ring box, top-down, the box on warm wood` |
| GPI-ATLAS-08 | `gpi-atlas-lehsuniya.webp` | 1200×800 | 3:2 | Lehsuniya — `cat's eye cabochon pendant against a black silk square, single sharp band of light revealing the chatoyancy` |
| GPI-ATLAS-09 | `gpi-atlas-diamond.webp` | 1200×800 | 3:2 | Diamond — `loose diamond inside a glass cylinder being weighed on a small brass scale, anonymous hands` |

---

## 6. Press strip (homepage)

5 logos — these should be **real publication marks** (Vogue India, Harper's Bazaar India, etc.) if you have media coverage, or generated "as-if-press" mark plates if not. Mark the row `[admin]` if real press exists — never generate fake media logos.

| ID | Filename | W×H | AR | Status | Prompt scene |
|---|---|---|---|---|---|
| GPI-PRESS-01..05 | `gpi-press-{01..05}.webp` | 300×120 each | 5:2 | `[admin]` recommended | Upload real publication logos via Shopify admin if available. **Do not generate fake press logos** — legal risk. If you don't have press, hide the section. |

---

## 7. Lookbook (5 editorial images)

Each image is unique and intentional. Sequence reads as a single short story.

| ID | Filename | W×H | AR | Beat |
|---|---|---|---|---|
| GPI-LB-01 | `gpi-lb-01-arrival.webp` | 1600×1000 | 8:5 | Arrival — `woman entering a softly lit room in a cream sari, hand grazing a velvet jewellery box on a console table, late-afternoon light, mood: anticipation` |
| GPI-LB-02 | `gpi-lb-02-choice.webp` | 1600×1000 | 8:5 | Choice — `top-down of two necklaces being compared in cupped hands above a velvet tray, brass mirror beside, mood: decision` |
| GPI-LB-03 | `gpi-lb-03-mirror.webp` | 1600×1000 | 8:5 | Mirror — `she fastens the necklace at the mirror, only the back of her head and the clasp in focus, golden hour, mood: ritual` |
| GPI-LB-04 | `gpi-lb-04-detail.webp` | 1600×1000 | 8:5 | Detail — `the pendant now resting on her collarbone, soft side light, eyes closed momentarily, mood: satisfaction` |
| GPI-LB-05 | `gpi-lb-05-departure.webp` | 1600×1000 | 8:5 | Departure — `she leaves through a doorway into evening light, blurred motion in the lower frame, mood: confidence` |

---

## 8. Intention page (12 organic blob frames — homepage uses glyph fallback, but these elevate it)

Each intention gets a unique abstract / symbolic illustration. Style across all 12 must be coherent (single illustrator's hand).

| ID | Filename | W×H | AR | Intention |
|---|---|---|---|---|
| GPI-INT-01 | `gpi-intent-calm.webp` | 640×640 | 1:1 | Calm — `single moon-shaped piece of moonstone hovering above still water, monochrome ivory-and-warm-gold illustration, hand-rendered watercolour feel, no realistic photo` |
| GPI-INT-02 | `gpi-intent-clarity.webp` | 640×640 | 1:1 | Clarity — `clear quartz point with a single ray of light passing through it, same illustrative style as INT-01` |
| GPI-INT-03 | `gpi-intent-protection.webp` | 640×640 | 1:1 | Protection — `black obsidian arrowhead inside a soft halo, same style` |
| GPI-INT-04 | `gpi-intent-love.webp` | 640×640 | 1:1 | Love — `rose quartz heart cradled in two illustrated hands` |
| GPI-INT-05 | `gpi-intent-wealth.webp` | 640×640 | 1:1 | Wealth — `citrine point with three tiny gold coins beneath` |
| GPI-INT-06 | `gpi-intent-confidence.webp` | 640×640 | 1:1 | Confidence — `tiger's eye cabochon with rays radiating outward, sun-coded` |
| GPI-INT-07 | `gpi-intent-healing.webp` | 640×640 | 1:1 | Healing — `green aventurine sprig with two leaves emerging from it` |
| GPI-INT-08 | `gpi-intent-spiritual.webp` | 640×640 | 1:1 | Spiritual growth — `amethyst point ascending out of a lotus base` |
| GPI-INT-09 | `gpi-intent-creativity.webp` | 640×640 | 1:1 | Creativity — `carnelian crystal with three branching flame-like lines` |
| GPI-INT-10 | `gpi-intent-grounding.webp` | 640×640 | 1:1 | Grounding — `smoky quartz crystal half-buried in illustrated earth strata` |
| GPI-INT-11 | `gpi-intent-joy.webp` | 640×640 | 1:1 | Joy — `sunstone sphere with concentric warm-gold rings emanating` |
| GPI-INT-12 | `gpi-intent-strength.webp` | 640×640 | 1:1 | Strength — `garnet stone shaped like a polished arrowhead atop a small ribbon` |

---

## 9. Other homepage sections

| ID | Filename | W×H | AR | Section | Prompt scene |
|---|---|---|---|---|---|
| GPI-MOST-01 | `gpi-most-gifted-bg.webp` | 1920×1080 | 16:9 | home-most-gifted bg | `still life of a stack of three small velvet gift boxes tied with a single brown ribbon, beside an unopened envelope, on warm linen, soft window light, suggests gift-giving` |
| GPI-ORIGIN-01 | `gpi-origin-1989.webp` | 1200×800 | 3:2 | home-origin-story | `archival-feel photo (slightly desaturated) of an old shop front signboard reading "GIFT PALACE — EST. 1989", weathered ivory wall, single brass plaque, warm taupe shadow, evokes heritage without being kitsch` |
| GPI-BRAND-01 | `gpi-brand-story.webp` | 1200×800 | 3:2 | home-brand-story | `wide environmental shot of three generations of indian jewellers — grandfather, father, daughter — standing in their atelier, not posed, mid-conversation around a workbench, soft natural light, family-business mood` |
| GPI-SIG-01 | `gpi-signature-drop.webp` | 1920×900 | 64:30 | home-signature-drop hero | `single piece of signature-collection jewellery — a delicate gold-and-emerald pendant — displayed dramatically on a single fold of black silk in a glass dome, theatrical low-key lighting, the only spotlight in an otherwise ivory room` |
| GPI-CONCIERGE-01 | `gpi-concierge-bg.webp` | 1920×900 | 64:30 | home-concierge-cta bg | `warm atelier corner: two chairs, a small low table with a velvet tray containing three pieces being shown to a customer (only hands and tray visible from the customer side), brass kettle of chai in the corner, mood of consultation` |
| GPI-COMMUNITY-01 | `gpi-community.webp` | 1200×800 | 3:2 | home-community-proof | `mosaic-style composite of 9 small instagram-style customer photos of people wearing their gift palace pieces in everyday life — wedding, festival, daily wear — arranged in a 3×3 grid, each tile slightly cropped, ivory borders between` |
| GPI-STORE-01 | `gpi-store-proof.webp` | 1200×800 | 3:2 | home-store-proof | `wide shot of the gift palace boutique storefront at dusk in delhi, soft warm interior light spilling through the windows, a single uniformed greeter just visible holding a door, no street clutter, heritage retail mood` |

---

## 10. Product imagery (admin-managed — generated through higgsfield for each SKU)

**Scope:** Each product variant gets 3–5 unique images (front, side, on-model, detail, scale). DO NOT use one image across multiple products. The Shopify product admin manages these; higgsfield generates the source pixels.

**Catalog file:** I'll generate `docs/PRODUCT_IMAGE_QUEUE.csv` from your live product list once you confirm higgsfield is back — it iterates Shopify's product list, allocates 4 unique IDs per product, and emits prompts dynamically based on product title + variant + metafields (stone type, intention).

Placeholder structure:

```
gpi-prod-{handle}-01-hero.webp        # main front shot
gpi-prod-{handle}-02-detail.webp      # macro of stone/setting
gpi-prod-{handle}-03-onmodel.webp     # worn shot
gpi-prod-{handle}-04-scale.webp       # hand or coin for size reference
gpi-prod-{handle}-05-pair.webp        # styled with one complementary piece
```

Filename incorporates product handle so a unique image per product is enforced by name.

---

## 11. Collection hero imagery (admin-managed)

One unique hero per collection, dimensioned for `gpi-collection-hero.liquid`.

| Collection handle | Filename | W×H | Prompt theme |
|---|---|---|---|
| `necklaces` | `gpi-coll-necklaces.webp` | 1920×900 | `flat-lay of seven necklaces fanned across warm ivory linen, all distinct designs, no repetition, soft window light` |
| `bracelets` | `gpi-coll-bracelets.webp` | 1920×900 | `four feminine wrists side-by-side, each wearing a different bracelet style, light fade to ivory` |
| `rings` | `gpi-coll-rings.webp` | 1920×900 | `six rings arranged in a hexagon on velvet, each a different stone family` |
| `earrings` | `gpi-coll-earrings.webp` | 1920×900 | `studio shot of three pairs of earrings on individual brass posts on an ivory plinth` |
| `gemstones` | `gpi-coll-gemstones.webp` | 1920×900 | `nine loose certified stones arranged on a paper certificate spread, each one labelled in small handwritten script` |
| `jaap-mala` | `gpi-coll-mala.webp` | 1920×900 | `three different malas laid in concentric circles, beads catching soft side light` |
| `celestial-heirlooms` | `gpi-coll-zodiac.webp` | 1920×900 | `twelve thin metal zodiac glyphs hand-engraved on small ivory tags arranged in a 4×3 grid` |
| `raw-crystals` | `gpi-coll-raw.webp` | 1920×900 | `assortment of five raw crystal specimens — amethyst point, citrine cluster, selenite tower, rose quartz chunk, smoky quartz — on warm linen, atelier-on-a-quiet-morning mood` |
| `gift-sets` | `gpi-coll-gift.webp` | 1920×900 | `three wrapped gift boxes of varying sizes, each tied with a different ribbon — cream silk, brown twine, deep ink ribbon — beside a single envelope` |

---

## 12. Edge pages

| ID | Filename | W×H | AR | Section | Prompt scene |
|---|---|---|---|---|---|
| GPI-404-01 | `gpi-404-bg.webp` | 1920×1080 | 16:9 | gpi-404 hero bg | `a single dropped gemstone on a stone floor, soft beam of light catching it, slight motion blur suggesting it just fell, evocative of "we lost the gem you were looking for"` |
| GPI-PASS-01 | `gpi-password-bg.webp` | 1920×1080 | 16:9 | gpi-password hero bg | `closed velvet drape backstage of a small show, single spotlight from above, intimate "about to open" mood, no people, deep ink with warm gold highlights` |
| GPI-GC-01 | `gpi-gift-card-bg.webp` | 1200×750 | 8:5 | gift_card.liquid bg accent | `a gift card-shaped piece of warm ivory paper printed with a small gold gem glyph, resting on velvet, soft shadow, ready to be downloaded/printed` |

---

## 13. Blog / Article (per-article via admin)

Each blog post needs a unique featured image. Stored per-article in Shopify admin under "Featured image".

`docs/BLOG_IMAGE_QUEUE.csv` will be generated alongside the product queue once we resume.

Existing healing-crystals article needs: `gpi-blog-healing-hero.webp` (1200×800).

---

## 14. Integration map (where each filename is wired)

For everything in `assets/` (most rows above), no admin step needed — the theme already references the filename via `{{ 'gpi-NAME.webp' | asset_url }}` in the relevant home/about/section liquid. **The instant the file lands in `assets/`, the section renders it.**

For admin-managed slots (product images, collection heroes, blog featured images, press logos), upload via Shopify Admin → Files (or product/collection editor), then assign via the corresponding `image_picker` setting.

| Section file | Setting | Catalog entry |
|---|---|---|
| `sections/home-hero-moonmagic.liquid` | `image` setting | GPI-HERO-01 |
| `sections/home-luxury-hero.liquid` | hardcoded asset ref | GPI-HERO-04 |
| `sections/home-discover-rail.liquid` | per-tile `image` | GPI-CAT-01..06 |
| `sections/home-gemstone-atlas.liquid` | per-block `stone_image` | GPI-ATLAS-01..09 |
| `sections/home-meaning-guide.liquid` | per-card `image` (if added) | GPI-MEAN-01..06 |
| `sections/home-press-strip.liquid` | per-block `logo_image` | GPI-PRESS-01..05 (admin only) |
| `sections/home-testimonials.liquid` | per-block `image` | GPI-PEOPLE-04..06 |
| `sections/home-most-gifted.liquid` | bg `image` | GPI-MOST-01 |
| `sections/home-origin-story.liquid` | `image` | GPI-ORIGIN-01 |
| `sections/home-brand-story.liquid` | `image` | GPI-BRAND-01 |
| `sections/home-signature-drop.liquid` | `image` | GPI-SIG-01 |
| `sections/home-concierge-cta.liquid` | bg | GPI-CONCIERGE-01 |
| `sections/home-store-proof.liquid` | `image` | GPI-STORE-01 |
| `sections/home-community-proof.liquid` | `image` | GPI-COMMUNITY-01 |
| `sections/gpi-page-about.liquid` | `hero_image`, `story_image`, per-block `image` | GPI-PEOPLE-03, GPI-PEOPLE-02, GPI-PROCESS-01..04, GPI-PEOPLE-07..10 |
| `sections/gpi-page-intention.liquid` | per-tile `image` | GPI-INT-01..12 |
| `sections/gpi-page-lookbook.liquid` | per-block `image` | GPI-LB-01..05 |
| `sections/gpi-404.liquid` | bg via `gpi-image` snippet | GPI-404-01 |
| `sections/gpi-password.liquid` | `bg_image` | GPI-PASS-01 |
| `sections/gpi-header.liquid` | `logo` | GPI-CHROME-01 |
| `sections/gpi-footer.liquid` | `logo` | GPI-CHROME-01 |

---

## 15. Quality gates after batch generation

Run from main repo root:

```
# Confirm every catalog filename exists as both .webp and .png in assets/
python -c "
import re, os, sys
spec = open('docs/IMAGE_CATALOG.md').read()
files = set(re.findall(r'\`(gpi-[a-z0-9-]+)\.webp\`', spec))
missing = []
for f in sorted(files):
    if not (os.path.exists(f'assets/{f}.webp') and os.path.exists(f'assets/{f}.png')):
        missing.append(f)
print('Missing assets:', len(missing))
for m in missing[:20]: print('  -', m)
sys.exit(1 if missing else 0)
"

# Confirm no asset filename appears more than once in code (uniqueness gate)
python -c "
import re, glob
asset_pattern = re.compile(r\"gpi-[a-z0-9-]+\\.(?:webp|png|mp4)\")
hits = {}
for p in glob.glob('sections/*.liquid') + glob.glob('snippets/*.liquid') + glob.glob('layout/*.liquid'):
    for m in asset_pattern.findall(open(p,'r',encoding='utf-8',errors='ignore').read()):
        hits.setdefault(m, []).append(p)
dupes = {k:v for k,v in hits.items() if len(v) > 1}
print('Files referenced from multiple sections (potential reuse):')
for k,v in dupes.items(): print(f'  {k}: {v}')
"
```

---

## 16. What I need from you to start generation

Once higgsfield MCP is reachable in this session, confirm by typing `mcp ok` and I will:

1. Loop the catalog above, batch-call higgsfield with prompt = base_style + per-row scene.
2. Save each output as `assets/<filename>.webp` and `assets/<filename>.png`.
3. Tick each row Status to ✅ in this catalog inline.
4. Commit every 10 generations.
5. Run the §15 quality gates.
6. Push final commit with a summary of files generated and any rows that failed (so we can retry).

For Shopify-Files-managed slots (press logos, product images, collection heroes), I'll generate the WebP/PNG, then either:
- Upload via `shopify file add` CLI (if you have CLI auth)
- Hand them off in a folder for you to drag-drop into Shopify Admin → Content → Files

Confirm preference and I begin the moment the MCP is back.
