# Tech Rules — Tokens, Fonts, Lenis, Images, i18n, WCAG

## CSS Token System (Required on Every Project)

Every project must have a full CSS custom property system in `:root`. No raw hex values outside `:root`. This includes `--white: #fff` — never use raw `#fff` in CSS rules.

Required token groups:
```css
:root {
  /* Palette primitives */
  --hanji: #F0ECE4;
  --charcoal: #231F20;
  --gold: #9A845A;
  --gold-dk: #7A6742;       /* passes WCAG AA on light backgrounds */
  --brown-muted: #5c5249;   /* use for labels on light bg */
  --white: #fff;            /* always token, never raw #fff */

  /* Semantic aliases */
  --color-bg: var(--hanji);
  --color-text: var(--charcoal);
  --color-accent: var(--gold);
  --color-label: var(--brown-muted);  /* section labels, small text on light */

  /* White opacity scale */
  --white-08: rgba(255,255,255,0.08);
  --white-10: rgba(255,255,255,0.10);
  --white-12: rgba(255,255,255,0.12);
  --white-25: rgba(255,255,255,0.25);
  --white-40: rgba(255,255,255,0.40);
  --white-45: rgba(255,255,255,0.45);
  --white-50: rgba(255,255,255,0.50);
  --white-55: rgba(255,255,255,0.55);
  --white-60: rgba(255,255,255,0.60);
  --white-65: rgba(255,255,255,0.65);
  --white-70: rgba(255,255,255,0.70);
  --white-75: rgba(255,255,255,0.75);
  --white-78: rgba(255,255,255,0.78);
  --white-85: rgba(255,255,255,0.85);
  --white-90: rgba(255,255,255,0.90);

  /* Named shadows — warm tint only, never pure black */
  --shadow-sm: 0 1px 4px rgba(35,20,10,0.08);
  --shadow-md: 0 4px 16px rgba(35,20,10,0.12);
  --shadow-card: 0 2px 12px rgba(35,20,10,0.10);
  --shadow-nav: 0 1px 20px rgba(35,20,10,0.08);
  --shadow-gold: 0 4px 16px rgba(253,196,0,0.40);
  --shadow-wa: 0 4px 16px rgba(37,211,102,0.40);

  /* Touch targets */
  --touch-min: 44px;

  /* WhatsApp */
  --wa-green: #25d366;

  /* Hero overlays */
  --overlay-heavy: rgba(16,10,6,0.90);
  --overlay-mid: rgba(16,10,6,0.50);
  --overlay-soft: rgba(16,10,6,0.30);

  /* Spacing (8px base) */
  --sp-1: 0.25rem;
  --sp-2: 0.5rem;
  --sp-3: 0.75rem;
  --sp-4: 1rem;
  --sp-6: 1.5rem;
  --sp-8: 2rem;
  --sp-12: 3rem;
  --sp-16: 4rem;
  --sp-24: 6rem;
}
```

---

## Fonts

### Critical: WOFF2 Conversion Verification
After converting TTF/OTF to WOFF2, always verify:
```bash
ls -lh fonts/
```
A **0-byte `.woff2` file** means the conversion failed silently. The browser downloads it, fails to parse it, and falls back to system font with no console error. Reconvert or download the WOFF2 directly.

Convert with:
```bash
npx ttf2woff2 fonts/FontName.ttf > fonts/FontName.woff2
```

### Critical: Font File Case Sensitivity
Font files with uppercase extensions will silently fail on Vercel (Linux = case-sensitive).
Always run `ls fonts/` and copy the exact filename before writing `@font-face`.

```css
/* WRONG — will 404 on Vercel if file is Font.TTF */
src: url('../fonts/font.ttf') format('truetype');

/* CORRECT — match exact filename from disk */
src: url('../fonts/Font.TTF') format('truetype');
```

### General Font Rules
- **WOFF2 required** — no exceptions. Verify with `ls -lh` after conversion.
- Self-host everything — no Google Fonts CDN (render-blocking)
- `font-display: swap` on all `@font-face`
- Always `preload` BOTH heading font AND body font in `<head>`
- Delete unused font files before launch
- The browser registers font under `font-family` name in `@font-face`, NOT the filename — check DevTools → Network → Font tab to confirm

```css
@font-face {
  font-family: 'FontName';
  src: url('../fonts/fontname.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

```html
<!-- Preload both fonts -->
<link rel="preload" href="fonts/HeadingFont.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/BodyFont.woff2" as="font" type="font/woff2" crossorigin>
```

**Good pairings:**
- Korean/Asian restaurants: **Black Han Sans** (headings) + **DM Sans** (body)
- Mediterranean/bar: **Playfair Display** (headings) + **DM Sans** (body)
- Nightlife: **Sregs Serif Display** (headings) + **DM Sans** (body)
- Spanish-Asian fusion: **AveriaSerifLibre** (headings) + **DM Sans** (body)
- Botanical/artisan café: **Cormorant Garamond SemiBold** (headings) + **Be Vietnam Pro** (body)

> ⚠️ Avoid display fonts without accented Latin — á é í ó ú ñ ü will render as blank gaps in Spanish/Catalan headings. Always test accented characters before committing to a font.

---

## Lenis Smooth Scroll (Conditional — Not Default)

Lenis is not added by default. La Malcriada Esmorzars hit scroll-hijacking conflicts with Lenis and it was removed entirely in favor of native scroll. Never reintroduce Lenis on a project where scroll conflicts have appeared — remove it entirely, don't patch around it. Only add Lenis if the client brief specifically calls for a heavier smooth-scroll feel and the build has no other scroll-dependent behavior (parallax via rAF, IntersectionObserver reveals, tab panels, sticky nav) that could fight it. Default to native scroll.

Self-host the bundle — never use CDN (may be blocked by network config).

Download from: `https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js`
Save as: `js/lenis.min.js`

Add to `index.html` before closing `</body>` — before `i18n.js` and `main.js`:
```html
<script src="js/lenis.min.js" defer></script>
```

Init at bottom of `main.js`:
```javascript
;(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (typeof Lenis === 'undefined') return
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  })
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
  requestAnimationFrame(raf)
})()
```

Rules:
- Never create two separate rAF loops — merge into existing one if present
- Lenis fires native `scroll` events — existing passive scroll listeners still work
- Skip entirely if `prefers-reduced-motion` is set

---

## Background Texture

### Desktop — Fixed Pseudo-Element
```css
html::before {
  content: '';
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: url('../images/Background.webp');
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;
  z-index: -1;
  pointer-events: none;
}
```

Rules:
- Set `body { background: transparent; }` — no background on body
- Dark sections keep their own `background-color` — they paint over naturally
- Light sections use semi-transparent overlays: `--section-bg-a: rgba(255,248,240,0.55)` and `--section-bg-b: rgba(235,220,200,0.55)` for alternating tint effect
- Never `background-attachment: fixed` on body
- Never use JS scroll listeners to simulate parallax on mobile — causes jitter

### Mobile — Body Scroll Fallback (iOS Fix)
> ⚠️ `position: fixed` on pseudo-elements does NOT work on iOS. This affects ALL browsers on iPhone/iPad — Chrome, Firefox, Safari — because Apple forces WebKit on all iOS browsers.

```css
@media (max-width: 768px) {
  html::before {
    display: none;
  }
  body {
    background-image: url('../images/Background.webp');
    background-size: cover;
    background-position: center top;
    background-attachment: scroll;
    background-repeat: no-repeat;
  }
}
```

The texture scrolls with the page on mobile (no parallax) — this is correct and expected behavior.
Reference Pan & Más implementation if stuck.

---

## Image Optimization

Use `cwebp` CLI:

| Image | Command | Target |
|-------|---------|--------|
| Hero desktop | `cwebp -q 72 -resize 1440 0 Hero.jpg -o Hero.webp` | ≤200KB |
| Hero mobile | `cwebp -q 72 -resize 750 0 Hero.jpg -o Hero-mobile.webp` | ≤50KB |
| Gallery | `cwebp -q 72 -resize 1200 0 image.jpg -o image.webp` | ≤200KB each |
| Background | `cwebp -q 85 Background.png -o Background.webp` | ≤100KB |
| Logo | `cwebp -q 80 -resize 440 0 logo.png -o logo.webp` | ≤30KB |
| OG image | `sips -s format jpeg -z 630 1200 hero.png --out og-image.jpg` | 1200×630px |

Always:
- Use `<picture>` with WebP source + JPG/PNG fallback — **only after WebP files exist**
- Hero fallback `<img src>` must point to JPG not PNG (PNG is too large)
- Add `width` and `height` to all `<img>` tags — prevents CLS
- Background texture: `loading="lazy"` — never `loading="eager"`
- Hero: `fetchpriority="high"` + `<link rel="preload">` in `<head>` — keep in sync

Mobile hero srcset (required):
```html
<!-- In <head> -->
<link rel="preload" as="image"
      imagesrcset="images/Hero-mobile.webp 750w, images/Hero.webp 1440w"
      imagesizes="(max-width: 767px) 750px, 1440px"
      type="image/webp" fetchpriority="high">

<!-- In <body> -->
<picture>
  <source media="(max-width: 767px)" srcset="images/Hero-mobile.webp" type="image/webp">
  <source srcset="images/Hero.webp" type="image/webp">
  <img src="images/Hero.jpg" ...>
</picture>
```

---

## Multi-Language (ES / CA / EN)

- Every visible text element needs `data-i18n` attribute — including all menu items
- Every translatable `aria-label` needs `data-i18n-aria`
- `applyLang()` always uses `innerHTML` not `textContent`
- Cookie banner privacy link: separate `<a>` in own `<p>` — NOT inside data-i18n paragraph
- Language switcher in: nav, mobile menu, AND footer — all three synced simultaneously
- WhatsApp pre-fill message updates per language
- `aria-pressed` synced on every language switch
- All nav landmark aria-labels use `data-i18n-aria`
- Map iframe `aria-label` must use `data-i18n-aria` — never hardcoded
- Copyright year: use `{year}` placeholder resolved dynamically — never hardcode
- **Do NOT put `aria-live="polite"` on tab panels** — causes unwanted announcements on language switch

```javascript
// Always innerHTML, never textContent
function applyLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n
    if (translations[lang][key]) el.innerHTML = translations[lang][key]
  })
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.dataset.i18nAria
    if (translations[lang][key]) el.setAttribute('aria-label', translations[lang][key])
  })
}
```

---

## WCAG / Accessibility Rules

**Touch targets:**
- All interactive elements: `min-height: var(--touch-min)` (44px)
- Use `var(--touch-min)` not hardcoded `44px` — token must follow if value changes
- Applies to: nav buttons, footer links, lang buttons, cookie banner buttons, gallery links, back-to-top

**Contrast:**
- Focus ring: `2px solid var(--gold-dk)` — `var(--gold)` fails WCAG 2.2 at 2.86:1
- Gold on light backgrounds: always `--gold-dk` (4.67:1) not `--gold` (3.06:1 — fails)
- Active lang button on transparent dark hero: override to `var(--white)`
- Star ratings: `#B45309` on white = 4.85:1 ✓ — never `#F59E0B` (fails)
- Avoid CSS `opacity` for text color dimming — it composites against background and makes contrast unpredictable. Use explicit `rgba()` color values instead.

**ARIA:**
- `aria-expanded` on hamburger
- `aria-pressed` on lang buttons — synced on every switch
- `aria-modal="true"` + focus trap on mobile menu
- `aria-hidden` toggle on mobile nav overlay — NOT `display:none` (breaks transitions)
- All nav landmark `aria-label` via `data-i18n-aria` — never hardcoded Spanish
- `role="tablist"` + `aria-selected` + keyboard Arrow/Home/End on menu tabs
- `role="img"` + `aria-label` on star ratings
- `role="dialog"` on mobile menu
- **No `aria-live` on tab panels**
- Single `h1` per page (`sr-only`)
- Heading hierarchy: `h1` (sr-only) → `h2` per section → `h3` subcategory → `h4` item → `h5` sub-group
- Menu: subcategory labels must be `h3`, individual items must be `h4` — never reversed
- Skip nav: `transform: translateY(-200%)` hidden, `translateY(0)` on focus — never `top`
- Cookie banner: `btnAccept.focus()` on appearance

**Motion:**
- `prefers-reduced-motion`: CSS `transition-duration: 0.01ms !important` override
- `prefers-reduced-motion`: JS IntersectionObserver early exit
- Lenis: skip entirely if reduced motion is set

**Performance:**
- All below-fold images: `loading="lazy"` + `decoding="async"`
- Scripts: `defer` on all non-critical
- GA4: conditional on cookie consent only
- No `background-attachment: fixed` — use fixed pseudo-element on desktop, body scroll on mobile
- No `100vh` — use `100svh`
- No top/left/width/height animation — only `transform` and `opacity`
- `will-change: transform, opacity` on scroll-reveal elements — reset to `auto` after animation fires
