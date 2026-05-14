# Sections Built But Not Yet Wired

Agents append to this file when they complete a new section. The orchestrator batch-wires them into `templates/index.json` to avoid merge conflicts.

## Format
```
- [x] WIRED 2026-05-08 | <preset-name> | <section-file> | <suggested-position-relative-to-existing> | <agent>
```

Position values: `after:home_hero_moonmagic`, `after:home_featured_browse`, `before:home_concierge_cta`, etc.

---

## Queue

<!-- Agents: append your line below when your section is built. -->
- [x] WIRED 2026-05-08 | Trust Pillars | home-trust-pillars | after:home_hero_moonmagic | Gemini-A
- [x] WIRED 2026-05-08 | FAQ | home-faq | before:home_concierge_cta | Gemini-C
- [x] WIRED 2026-05-08 | Testimonials | home-testimonials | after:home_featured_browse | Gemini-B
- [x] WIRED 2026-05-08 | Newsletter Signup | home-newsletter-signup | before:home_concierge_cta | Gemini-D
- [ ] READY 2026-05-12 | Why Buy From Us | home-why-us | after:home_testimonials | Codex
- [ ] READY 2026-05-12 | Brand Story | home-brand-story | after:home_meaning_guide | Codex
- [ ] READY 2026-05-12 | Lookbook Spotlight | home-lookbook-spotlight | after:home_brand_story | Codex
- [ ] READY 2026-05-12 | Press Mentions | home-press-strip | before:home_concierge_cta | Codex
