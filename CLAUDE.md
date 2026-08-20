# Stitch Restaurant Template — Claude Instructions
> v7.0 — Read this first. For details, read the memory files listed below.

## Who I Am
**Andri** — freelance web designer in Barcelona building restaurant websites. I work in English.

## Read Before Every Build
```
Read memory/taste-skill/SKILL.md and memory/redmotion/SKILL.md before full builds, audits, or architectural changes. Not required for single-file edits or small fixes.
```
For HTML patterns, sections, nav, hero, menu: read `memory/build-rules.md`
For tokens, fonts, Lenis, images, i18n, WCAG: read `memory/tech-rules.md`
For audit pipeline, checklist, common fixes, Vercel: read `memory/launch-rules.md`

---

## Directory Structure
```
restaurant-name/          ← ALL files at ROOT (required for Vercel)
├── index.html
├── privacy.html
├── 404.html
├── favicon.svg
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── css/
│   ├── style.css
│   └── print.css
├── js/
│   ├── main.js
│   ├── i18n.js
│   └── lenis.min.js
├── fonts/                ← active fonts only, WOFF2
├── images/
│   ├── logo.webp         ← ≤30KB, max 440px wide
│   ├── Hero.webp         ← desktop ≤200KB
│   ├── Hero-mobile.webp  ← 750px, ≤50KB
│   ├── Background.webp   ← lazy loaded
│   ├── og-image.jpg      ← 1200×630
│   ├── apple-touch-icon.png (180×180) — optional, remove refs if not provided
│   ├── icon-192.png      — optional
│   └── icon-512.png      — optional
├── design/               ← Stitch ZIP extracted here
└── memory/
    ├── redmotion/SKILL.md
    ├── taste-skill/SKILL.md
    ├── build-rules.md
    ├── tech-rules.md
    └── launch-rules.md
```
> ⚠️ NEVER use a `src/` subfolder. Vercel serves `index.html` from root.
> ⚠️ PWA icons are optional. If files don't exist, remove ALL references from index.html and site.webmanifest to prevent 404 errors.

---

## Critical Rules (Always Apply)

- **No Tailwind** — native CSS only. Never use Tailwind CDN. Forbidden.
- **No Google Fonts CDN** — self-host all fonts including body font
- **No `background-attachment: fixed`** — broken on iOS Safari
- **No `100vh`** — use `100svh`
- **No `top` animation** — use `transform: translateY()`
- **No `aria-live` on tab panels** — causes unwanted announcements on language switch
- **No raw hex outside `:root`** — full CSS token system required. Includes `--white: #fff`
- **`og:type="website"`** — never `"restaurant"`
- **`reviewCount` must be Number** — never String
- **Star rating color: `#B45309`** — never `#F59E0B`
- **`applyLang()` uses `innerHTML`** — never `textContent`
- **Maps embed: `maps/embed?pb=` URL** — never `maps.google.com/maps?q=`
- **Skip-nav uses `transform: translateY()`** — never `top`
- **Menu heading hierarchy: `h2` section → `h3` subcategory → `h4` item** — never reversed
- **Preload both heading AND body fonts** — not just heading font
- **Audit target: 20/20** — do not push until final audit is 20/20
- **Always end every prompt with git push** — `git add . && git commit -m "fix: description" && git push`

---

## Pre-Build Checklist (Run Before Building)
- [ ] All font files are WOFF2 — verify with `ls -lh fonts/` after conversion (0 bytes = failed)
- [ ] All images converted to WebP — confirm `.webp` pairs exist
- [ ] No spaces in any filenames — rename with hyphens
- [ ] Check exact font filename case with `ls fonts/` before writing `@font-face`
- [ ] Delete orphaned font files not used in CSS

---

## Workflow
1. Design in Stitch → export ZIP → drop in `design/`
2. Run pre-build checklist
3. Read both skills + relevant memory files
4. Build from `screen.png` visual references
5. Preview locally
6. Review section by section via screenshots
7. Run full audit pipeline (see `memory/launch-rules.md`)
8. Spell check ES / CA / EN
9. Push to GitHub → Vercel auto-deploys
10. Run mobile Lighthouse (90+ required)
11. Test on real phone via Vercel URL
12. Send URL to client

---

## Claude Code Recovery (Token Cutoff Mid-Build)
If tokens run out mid-session, start a new session with:
*"Review the current state of index.html and i18n.js. Check if [feature] is complete or partially done. List what's missing and continue from where you left off."*

---

## Completed Projects
| Project | URL | Type | Score |
|---|---|---|---|
| Monalisa BCN | monalisa-bcn.vercel.app | LGBT Gastrobar | ✅ Live |
| Brunch.ar BCN | brunch-ar.vercel.app | Argentine Brunch | ✅ Live |
| Seoul Nadri | seoul-nadri.vercel.app | Korean BBQ | ✅ 20/20 |
| Pan & Más | pan-mas.vercel.app | Spanish-Asian Brunch Café | ✅ 18/20 |
| Flora Café | flora-cafe-zeta.vercel.app | Brunch Café | ✅ 20/20 |
| T-Born Brasa | [add live URL] | Dark Steakhouse (El Born) | ✅ Live |
| La Malcriada Esmorzars | [add live URL] | Brunch Café (Ronda de Sant Pere) | ✅ Spec site |
