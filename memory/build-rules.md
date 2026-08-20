# Build Rules — HTML Patterns & Sections

## Building from Stitch

1. Extract Stitch ZIP into `design/`
2. Use `screen.png` files as pixel-accurate visual reference
3. Extract design tokens into `:root` in `css/style.css`
4. Build HTML section by section matching the screen
5. Drop optimised photos into `images/`

Tips:
- Zoom into `screen.png` at 2x to read exact spacing and font sizes
- Stitch uses 4px or 8px base unit — set `--sp-1` accordingly
- Start mobile, layer up with breakpoints

### Stitch ZIP vs screen.png — What Wins

If the Stitch-generated HTML/CSS conflicts with what `screen.png` shows, **screen.png always wins**.

- Ignore Stitch-generated CSS entirely — it uses Tailwind CDN and generic class names, both forbidden
- Never copy Stitch-generated CSS directly into the project
- Use `screen.png` files as the pixel-accurate visual reference
- Write all HTML and CSS from scratch based on what you see in the screen
- Zoom into `screen.png` at 2x to read exact spacing, font sizes, and layout intent

---

## Sections in index.html

| Section | ID | Description |
|---|---|---|
| Navigation | `#nav` | Fixed: logo left, links center, lang + reserve right, hamburger mobile |
| Hero | `#hero` | Full-bleed photo, heading bottom-aligned, editorial feel |
| About | `#about` | Restaurant story, 2-column desktop |
| Experience | `#experience` | BBQ experience, grill explanation (if relevant) |
| Menu | `#menu` | Tabbed menu, all categories |
| Gallery | `#gallery` | Asymmetric grid, Instagram link |
| Reviews | `#reviews` | 4 real Google reviews, rating, Maps link |
| Find Us | `#find-us` | Address, hours, WhatsApp card, Maps embed |
| Footer | `footer` | Brand statement, nav links, lang switcher, copyright |

---

## Hero Section

```html
<section id="hero">
  <picture>
    <source srcset="images/Hero-mobile.webp" media="(max-width: 767px)" type="image/webp">
    <source srcset="images/Hero.webp" type="image/webp">
    <img src="images/Hero.jpg" alt="" id="hero-img"
         fetchpriority="high" loading="eager" decoding="auto"
         width="1440" height="810">
  </picture>
  <div class="hero__overlay"></div>
  <div class="hero__content">
    <img src="images/logo.webp" alt="Restaurant name" class="hero__logo"
         loading="eager" decoding="sync" fetchpriority="high">
    <h2 class="hero__title" data-i18n="hero.title">Tagline</h2>
  </div>
</section>
```

- Single `h1` is `sr-only` — visible headline uses `h2`
- `fetchpriority="high"` + `<link rel="preload">` in `<head>` — always keep in sync
- Preload must use `imagesrcset` to cover both mobile and desktop:
```html
<link rel="preload" as="image"
      imagesrcset="images/Hero-mobile.webp 750w, images/Hero.webp 1440w"
      imagesizes="(max-width: 767px) 750px, 1440px"
      type="image/webp" fetchpriority="high">
```
- Never `loading="lazy"` on hero — always `loading="eager"`
- Hero fallback `<img src>` must point to JPG not PNG (PNG is too large)
- Mobile hero: `Hero-mobile.webp` at 750px wide ≤50KB in `srcset`
- Hero content bottom-aligned — editorial, not centered template

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

- Set `body { background: transparent; }`
- Dark sections keep their own `background-color` — they paint over naturally
- Light sections use semi-transparent overlays for alternating tint effect
- Never `background-attachment: fixed` on body

### Mobile — Body Scroll (iOS Fix)
> ⚠️ `position: fixed` on pseudo-elements does NOT work on iOS — affects ALL browsers (Chrome, Firefox, Safari) because Apple forces WebKit on all iOS browsers.

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

Reference Pan & Más implementation if stuck.

---

## Navigation

```css
#nav { position: fixed; top: 0; background: transparent; }
#nav.nav--scrolled {
  background: rgba(240,236,228,0.96);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: var(--shadow-nav);
}
```

- Hamburger hidden on desktop (`display: none` above 768px)
- Reserve button hidden on mobile nav bar — it's in the mobile overlay
- Mobile nav: `role="dialog"`, `aria-modal="true"`, `aria-hidden` toggled (NOT `display:none`)
- Focus trap: Tab/Shift+Tab cycles within menu, Escape closes, focus returns to hamburger
- Close button (×) always in top-right corner — `min-width: 44px; min-height: 44px`
- `body { overflow: hidden }` when menu is open
- `aria-expanded` on hamburger button
- Active lang button on transparent dark hero: override to `var(--white)` — gold is invisible on dark

Mobile nav hamburger toggle:
```javascript
hamburger.addEventListener('click', () => {
  if (hamburger.getAttribute('aria-expanded') === 'true') {
    closeMenu()
  } else {
    openMenu()
  }
})
```

Every `<a>` inside mobile menu must call `closeMenu()` on click.

---

## Menu Section (Tabbed)

```html
<div class="menu__tabs" role="tablist" aria-label="..." data-i18n-aria="menu.aria.tabs">
  <button role="tab" aria-selected="true" aria-controls="panel-brunch" id="tab-brunch">BRUNCH</button>
  ...
</div>
<div class="menu__panels">
  <div id="panel-brunch" role="tabpanel" aria-labelledby="tab-brunch">
    <h3 class="menu__subcat">TOSTADAS</h3>
    <div class="menu__items">
      <h4 class="menu__item-name">Tostada de aguacate</h4>
      ...
    </div>
  </div>
</div>
```

**Heading hierarchy in menu — critical:**
- `h2` — section heading ("La Carta")
- `h3` — subcategory labels (TOSTADAS, BEBIDAS, DULCES…)
- `h4` — individual menu items (Café solo, Tostada de aguacate…)
- `h5` — sub-subcategory labels (BARRIL, BOTELLAS, TINTOS…)
- Never reverse h3/h4 — subcategories must be h3, items must be h4

- `role="tablist"` + `aria-selected` + `aria-controls` on tabs
- Keyboard: Arrow Left/Right, Home, End
- **Do NOT add `aria-live="polite"` to tab panels** — causes unwanted announcements on language switch
- Mobile tabs: `overflow-x: auto`, `white-space: nowrap`, `scrollbar-width: none`
- All tab labels uppercase via `text-transform: uppercase` in CSS

Fix panel height jump on tab switch:
```javascript
function setMenuHeight() {
  const panels = document.querySelectorAll('.menu__panel')
  const container = document.querySelector('.menu__panels')
  let max = 0
  panels.forEach(p => {
    p.style.display = 'block'
    max = Math.max(max, p.scrollHeight)
    p.style.display = ''
  })
  container.style.minHeight = max + 'px'
}
document.addEventListener('DOMContentLoaded', setMenuHeight)
window.addEventListener('resize', setMenuHeight)
```

---

## Gallery Section

- Asymmetric grid — varied column spans (e.g. 5-col, 4-col, 3-col)
- Not a uniform equal-grid — editorial, intentional layout
- All images: `<picture>` with WebP source + JPG fallback, `loading="lazy"`, `decoding="async"`
- Specific alt text per image — describe the actual dish or scene, not "food photo"
- Instagram link: `data-i18n-aria` on the link element

---

## Reviews Section

- 4 real Google reviews — get from client
- 4 equal cards in a row (2×2 on tablet, 1 column mobile)
- `grid-template-columns: repeat(4, 1fr)` desktop, `repeat(2, 1fr)` tablet, `1fr` mobile
- Star rating: `role="img"` + `aria-label` describing the rating
- Star color: `#B45309` — never `#F59E0B`
- Average rating + star display above cards
- "View on Google Maps" link: real Maps URL, `target="_blank" rel="noopener noreferrer"`
- No "Leave a review" button needed — Maps link covers it

---

## Find Us Section

- Address, opening hours table
- WhatsApp reserve card (dark background, primary CTA)
- Google Maps iframe — `maps/embed?pb=` URL only — add `sandbox="allow-scripts allow-same-origin allow-popups"`
- Maps iframe `aria-label` must use `data-i18n-aria` — not hardcoded in any language
- "Open in Google Maps" text link below map
- All Maps links: `target="_blank" rel="noopener noreferrer"`

Hours table using `<dl>/<dt>/<dd>`:
```html
<dl class="hours__list">
  <dt data-i18n="hours.mon_thu">Monday – Thursday</dt>
  <dd>9:30 – 23:30</dd>
  <dt data-i18n="hours.fri_sat">Friday – Saturday</dt>
  <dd>9:30 – 00:00</dd>
</dl>
```

---

## Footer

Full-width statement layout:
1. Large restaurant name in display font (clamp 3.5rem–6rem)
2. Descriptor subtitle
3. Nav links in single horizontal row — centered, separated by `·`
4. Bottom bar: copyright left, lang switcher right
5. Copyright year must use `{year}` placeholder resolved dynamically — never hardcode

```css
.footer { padding-top: var(--sp-16); background: var(--teal-dk); }
.footer__brand { font-size: clamp(3.5rem, 7vw, 6rem); text-align: center; }
.footer__nav { display: flex; gap: var(--sp-6); justify-content: center; flex-wrap: wrap; }
```

---

## WhatsApp

```html
<!-- Floating button -->
<button id="whatsapp-btn" data-phone="+34XXXXXXXXX"
        aria-label="..." data-i18n-aria="whatsapp.aria">
  <!-- WhatsApp SVG icon -->
</button>

<!-- Find Us card -->
<a id="whatsapp-find-us" data-phone="+34XXXXXXXXX">...</a>
```

- Pre-fill message translated per language in `i18n.js`
- Placeholder: `+34600000000` — update `data-phone` before launch
- Floating button bottom-right, above back-to-top button
- Both buttons update href on language switch
- `--wa-green: #25d366` — always tokenized

---

## Loading Screen

```javascript
window.addEventListener('load', () => {
  if (sessionStorage.getItem('visited')) {
    document.getElementById('loading-screen').style.display = 'none'
    return
  }
  sessionStorage.setItem('visited', '1')
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden')
  }, 700)
})
```

Shows on first visit only (sessionStorage). Brand personality moment.

---

## Back to Top Button

```javascript
window.addEventListener('scroll', () => {
  backTopBtn.classList.toggle('visible', window.scrollY > 400)
}, { passive: true })
```

Sits above WhatsApp button, bottom-right.

---

## Google Analytics 4

```javascript
function loadGA4() {
  const s = document.createElement('script')
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'
  s.async = true
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date())
  gtag('config', 'G-XXXXXXXXXX')
}
```

Placeholder: `G-XXXXXXXXXX` — replace before launch. Only call after cookie consent.

---

## Cookie Consent (GDPR / Spain)

- Consent stored in `localStorage`
- GA4 only loads after consent accepted
- Privacy link: separate `<a>` in its own `<p>` — NOT inside `data-i18n` paragraph (innerHTML wipes child nodes)
- `btnAccept.focus()` when banner appears — keyboard accessibility
- Reset for testing: `localStorage.removeItem('cookie_consent')` in console

---

## SEO and Schema.org

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Restaurant Name",
  "address": { "@type": "PostalAddress", "streetAddress": "...", "addressLocality": "Barcelona" },
  "telephone": "+34XXXXXXXXX",
  "openingHoursSpecification": [...],
  "aggregateRating": {
    "ratingValue": 4.8,
    "reviewCount": 89
  }
}
```

- `reviewCount` must be Number (no quotes)
- `og:type` must be `"website"` (not `"restaurant"`)
- `og:image`, `twitter:image`, Schema.org `"image"` must all point to `og-image.jpg` (1200×630)
- Update domain in: canonical, `og:url`, Schema.org URL, `robots.txt`, `sitemap.xml`

---

## CSS Conventions

- All colors, typography, spacing in CSS custom properties on `:root`
- Never use raw `#fff` — use `var(--white)` (add `--white: #fff` to `:root`)
- Mobile-first: `@media (min-width: 768px)` and `@media (min-width: 1200px)`
- Never `!important`
- Cards: no hard borders — soft `box-shadow`
- Only animate `transform` and `opacity`
- Skip-nav: `transform: translateY()` not `top`
- `prefers-reduced-motion`: wrap all animations in media query AND JS early exit

---

## Print Stylesheet

`css/print.css` linked with `media="print"`. Hides everything except menu. Test with Cmd+P.
Update section IDs and category headings to match actual project structure before launch.

---

## Privacy, 404, robots, sitemap

- `privacy.html` — GDPR Spanish law. Replace all `<!-- UPDATE -->` comments. `noindex`.
- `404.html` — branded, Vercel serves automatically
- `robots.txt` / `sitemap.xml` — replace placeholder domain before launch

---

## Restaurant Design Guidelines

- **Korean/Asian:** bold display font + warm palette + bilingual Korean/Spanish typography
- **Mediterranean/casual:** warm, inviting — cream/terracotta, not fast food
- **Nightlife/bar:** dark moody, bold typography
- **Botanical/artisan café:** editorial serif (Cormorant Garamond), cream/teal palette, botanical texture
- **Pet friendly:** feature prominently — big selling point in Barcelona
- Always real Google Reviews — social proof is critical
- Instagram handle always in gallery section
- Schema.org JSON-LD with real address, hours, phone — required for Google rich results
