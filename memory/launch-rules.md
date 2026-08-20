# Launch Rules — Audit Pipeline, Fixes, Checklist, Vercel

## Testing Pipeline (Run In This Order)

```
/audit
Fix all issues found, then:

/harden
Fix all issues found, then:

/normalize
Fix all issues found, then:

/optimize
Fix all issues found, then:

/polish
Fix all issues found, then:

/audit
```

**Target: 20/20.** Do not push to GitHub until final audit is 20/20.

> `/clarify` and `/adapt` are optional — run only if the build has ambiguous copy or responsiveness issues.

---

## Slash Command Definitions

If slash commands fail or context is lost mid-session, use these definitions to reconstruct what each command checks manually.

**/audit** — checks: Schema.org validity (`reviewCount` Number, `og:type="website"`), Open Graph tags complete, star rating color `#B45309`, heading hierarchy (`h2` section → `h3` subcategory → `h4` item), touch targets 44px minimum, skip-nav uses `transform` not `top`, `100svh` not `100vh`, `aria-live` absent from tab panels, nav landmark aria-labels via `data-i18n-aria`, map iframe has `sandbox` + `data-i18n-aria`, cookie banner privacy link in separate `<p>`, focus ring uses `--gold-dk`, `applyLang()` uses `innerHTML`

**/harden** — checks: no inline event handlers, all external links have `rel="noopener noreferrer"`, no exposed API keys or tokens, GA4 only loads after cookie consent, no `console.log` statements left in production code, CSP-friendly patterns (no `eval`, no `javascript:` hrefs)

**/normalize** — checks: no raw hex values outside `:root`, no raw `#fff` in CSS rules (must be `var(--white)`), no magic numbers outside token system, no Tailwind CDN, no Google Fonts CDN, no `!important`, only `transform` and `opacity` animated, spacing uses `--sp-X` scale

**/optimize** — checks: hero image ≤200KB desktop / ≤50KB mobile, logo ≤30KB, gallery images ≤200KB each, background texture has `loading="lazy"`, hero has `fetchpriority="high"` + `<link rel="preload">` in sync, all below-fold images have `loading="lazy"` + `decoding="async"`, both heading and body fonts preloaded, WOFF2 verified non-zero with `ls -lh fonts/`, no unused font files in `fonts/`

**/polish** — checks: no lorem ipsum visible, no placeholder phone numbers visible, no hardcoded copyright year (must use `{year}` placeholder), price format consistent throughout (pick one: `€16` or `16€`), all accented characters render correctly (á é í ó ú ñ ü · à è ò ç l·l), WhatsApp pre-fill message exists in all 3 languages, lang switcher present in nav + mobile menu + footer, `aria-pressed` synced on lang buttons

---

## Spell Check (Before Every Push)

Run after the audit pipeline, before pushing:
- Check ES, CA, EN separately
- Verify all accented characters render: á é í ó ú ñ ü · à è ò ç l·l
- Check price format consistency (e.g. `€16` throughout — pick one format)
- Check Korean text renders correctly (no garbled characters)
- Check dish names consistent across tabs, cards, and any other mentions
- Check section labels, buttons, nav links, footer, cookie banner, 404 page

---

## Mobile Lighthouse Audit (After Every Vercel Deploy)

```bash
npx lighthouse https://[site].vercel.app --output=html --output-path=./lighthouse-mobile.html --chrome-flags="--headless" --emulated-form-factor=mobile --throttling-method=simulate
```

> Note: `--preset=mobile` is not supported in all Lighthouse versions — use `--emulated-form-factor=mobile` instead.

Open `lighthouse-mobile.html` in browser and check scores. All must be **90+**:
- Performance ≥ 90
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 90

Performance below 90 is a **launch blocker** — fix before sending to client.

Common mobile performance fixes:
- Hero image too large → create `Hero-mobile.webp` at 750px, ≤50KB, add to srcset
- Background texture `loading="eager"` → change to `loading="lazy"`
- Google Fonts CDN → self-host WOFF2
- Missing `fetchpriority="high"` on hero → add it
- Logo too large → `cwebp -q 80 -resize 440 0 logo.png -o logo.webp`

---

## Common Audit Fixes

| Issue | Fix |
|-------|-----|
| `og:type="restaurant"` | → `og:type="website"` |
| `reviewCount` as String | → Number (no quotes) |
| Star rating `#F59E0B` | → `#B45309` |
| Gold on light bg fails contrast | → `--gold-dk` or `--color-label` |
| Active lang on dark hero invisible | → `var(--white)` override for transparent nav state |
| Skip-nav uses `top` | → `transform: translateY(-200%)` hidden, `translateY(0)` on focus |
| `background-attachment: fixed` | → `html::before` pseudo-element desktop + `body` scroll mobile |
| `100vh` | → `100svh` |
| Touch targets under 44px | → `min-height: var(--touch-min)` |
| Tailwind CDN in `<head>` | → remove, write native CSS |
| Google Fonts CDN | → self-host WOFF2 |
| `aria-live` on tab panels | → remove entirely |
| Maps deprecated URL | → `maps/embed?pb=` format |
| Maps iframe no sandbox | → add `sandbox="allow-scripts allow-same-origin allow-popups"` |
| Maps iframe aria hardcoded | → `data-i18n-aria` + key in all 3 language blocks |
| Mobile tabs overflow | → `overflow-x: auto` + `white-space: nowrap` + `scrollbar-width: none` |
| Panel height jump on tab switch | → fixed container height from tallest panel |
| Cookie banner privacy link inside data-i18n | → separate `<p><a>` element |
| `aria-hidden` missing on closed mobile nav | → toggle in `openMenu()` / `closeMenu()` |
| Nav aria-labels hardcoded Spanish | → `data-i18n-aria` on all nav landmarks |
| Focus ring `var(--gold)` | → `var(--gold-dk)` (WCAG 2.2 compliant) |
| Background texture `loading="eager"` | → `loading="lazy"` |
| Missing mobile hero srcset | → `Hero-mobile.webp` + `<source media="(max-width: 767px)">` + `imagesrcset` preload |
| Hero fallback is PNG (too large) | → convert to JPG with `sips -s format jpeg` and update `<img src>` |
| Mobile menu won't close | → check hamburger toggles `aria-expanded`, all links call `closeMenu()` |
| Raw hex outside `:root` | → tokenize in CSS custom properties |
| Raw `#fff` in CSS rules | → add `--white: #fff` to `:root`, replace all occurrences |
| White opacity not tokenized | → use `--white-XX` scale |
| `applyLang()` uses `textContent` | → always `innerHTML` |
| Orphaned font files | → delete unused fonts before launch |
| `font-display` missing | → add `font-display: swap` to all `@font-face` |
| Missing `preload` for body font | → add `<link rel="preload" as="font" type="font/woff2" crossorigin>` |
| Copyright year hardcoded | → use `{year}` placeholder resolved dynamically in `i18n.js` |
| Font not loading | → check exact filename case with `ls fonts/` and match `@font-face src` exactly |
| WOFF2 font is 0 bytes | → conversion failed silently — reconvert and verify with `ls -lh fonts/` |
| Empty space in section | → check DevTools Network for 404 `.webp` files from `<source>` tags |
| Background not showing on mobile | → apply to `body` with `background-attachment: scroll` (not `html::before`) |
| Menu heading hierarchy wrong | → subcategory labels = `h3`, individual items = `h4`, never reversed |
| Missing PWA icons causing 404s | → generate icons OR remove all references from index.html and site.webmanifest |
| OG image wrong format/size | → export `og-image.jpg` at exactly 1200×630 with `sips -s format jpeg -z 630 1200` |
| Logo too large | → `cwebp -q 80 -resize 440 0 logo.png -o logo.webp` (target ≤30KB) |
| `.btn--sm` touch target | → use `var(--touch-min)` not hardcoded `44px` |

---

## Before Launch Checklist

### Client content (get from client):
- [ ] Real WhatsApp number → `data-phone` on floating btn + Find Us card
- [ ] Google Maps embed URL (`maps/embed?pb=` from Google Maps → Share → Embed a map)
- [ ] GA4 Measurement ID → replace `G-XXXXXXXXXX`
- [ ] Real domain → `robots.txt`, `sitemap.xml`, `og:url`, canonical, Schema.org
- [ ] Privacy policy → fill all `<!-- UPDATE -->` comments
- [ ] Menu content verified — all dishes, prices, descriptions in 3 languages
- [ ] Opening hours confirmed
- [ ] Address confirmed
- [ ] Real phone number → Schema.org `telephone` field

### Code checks:
- [ ] No Tailwind CDN: `grep -r "cdn.tailwindcss" .` returns nothing
- [ ] No Google Fonts CDN: `grep -r "fonts.googleapis" .` returns nothing
- [ ] No placeholder phone numbers visible
- [ ] No lorem ipsum visible
- [ ] No `src/` folder — all files at root
- [ ] Star rating color is `#B45309` not `#F59E0B`
- [ ] `og:type="website"` not `"restaurant"`
- [ ] `reviewCount` is Number not String
- [ ] All nav landmark aria-labels use `data-i18n-aria`
- [ ] Map iframe has `data-i18n-aria` and `sandbox` attribute
- [ ] No `aria-live` on tab panels
- [ ] Cookie banner privacy link in separate `<p><a>`
- [ ] `btnAccept.focus()` in cookie banner JS
- [ ] If Lenis is used, it's initialized in `main.js` with a `prefers-reduced-motion` guard. If not used, confirm no orphaned Lenis references remain (`js/lenis.min.js` not linked, no leftover rAF loop)
- [ ] All WebP `<source>` tags only present if WebP files actually exist on disk
- [ ] Font filenames in `@font-face` match exact case from `ls fonts/` output
- [ ] WOFF2 font files verified non-zero with `ls -lh fonts/`
- [ ] Menu heading hierarchy: subcategories `h3`, items `h4`
- [ ] Skip-nav uses `transform: translateY()` not `top`
- [ ] `--white: #fff` token in `:root`, no raw `#fff` in CSS rules

### Images:
- [ ] Hero desktop WebP ≤200KB
- [ ] Hero mobile WebP ≤50KB (`Hero-mobile.webp`) — wired in `<picture>` + `imagesrcset` preload
- [ ] Hero fallback is JPG not PNG
- [ ] Logo WebP ≤30KB (max 440px wide)
- [ ] All gallery images ≤200KB
- [ ] Background texture `loading="lazy"`
- [ ] og-image.jpg created (exactly 1200×630)
- [ ] PWA icons created OR all references removed from index.html and site.webmanifest
- [ ] favicon.png created (512×512 from logo)
- [ ] All unused font files deleted from `fonts/`
- [ ] All unused images deleted from `images/`
- [ ] Dead/unused asset files removed (old video files, unused images)

### Final checks:
- [ ] Spell check ES / CA / EN completed
- [ ] Final audit score 20/20
- [ ] Vercel Deployment Protection → Off (Settings → Deployment Protection → Off)
- [ ] Mobile Lighthouse 90+ all categories
- [ ] Tested on real phone via Vercel URL
- [ ] `prefers-reduced-motion` disables all animations correctly
- [ ] Background texture visible on mobile (via body scroll fallback)

---

## Vercel Deployment

- Root Directory: **leave blank** (default `./`)
- After first deploy: **Settings → Deployment Protection → Off** — clients get login wall otherwise
- Auto-deploys on every `git push` to `main`

> ⚠️ All git commands must be run through Claude Code bash — never ask to run them in a separate terminal.
> ⚠️ Always end every Claude Code prompt with: `After all changes are verified, run git add . && git commit -m "fix: description" && git push`

**First deploy (new project):**
```bash
git init
git add .
git commit -m "feat: [Restaurant Name] — production ready 20/20"
git branch -M main
git remote add origin https://github.com/rednessworld/[repo-name].git
git push -u origin main
```

**Subsequent pushes:**
```bash
git add .
git commit -m "fix: description of change"
git push
```

Always test on real phone via Vercel URL after every push.

---

## How to Start a New Project

1. Duplicate the `Stitch Restaurant Template` folder
2. Rename to restaurant name
3. Open in VS Code
4. Run pre-build checklist (see CLAUDE.md)
5. Add fonts to `fonts/` (WOFF2 only — verify with `ls -lh fonts/` after conversion)
6. Add photos to `images/` — compress all to WebP before build
7. Drop extracted Stitch ZIP folders in `design/`
8. Tell Claude Code:
   ```
   Read memory/taste-skill/SKILL.md and memory/redmotion/SKILL.md before building.
   Then read memory/build-rules.md for HTML patterns.
   Then build the website from the Stitch files in the design folder.
   Use screen.png files as visual reference.
   After all changes are verified, run git add . && git commit -m "feat: initial build" && git push
   ```
9. Preview locally
10. Review section by section via screenshots
11. Run full audit pipeline
12. Spell check all 3 languages
13. Push to GitHub
14. Run mobile Lighthouse
15. Test on real phone
16. Send Vercel URL to client
