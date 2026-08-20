# Stitch Restaurant Template

Static restaurant website template for Barcelona clients. Plain HTML, CSS, JavaScript — no build tools, no frameworks.

Designed to work with [Google Stitch](https://stitch.withgoogle.com) ZIP exports.

---

## Quick Start

1. Duplicate this folder, rename to restaurant name
2. Drop Stitch ZIP contents into `design/`
3. Add fonts to `fonts/`, photos to `images/`
4. Open in VS Code with Claude Code
5. Tell Claude Code to build from the Stitch files

---

## File Structure

```
restaurant-name/
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
├── fonts/
├── images/
├── design/           ← Stitch ZIP goes here
└── memory/
    ├── redmotion/SKILL.md
    ├── taste-skill/SKILL.md
    ├── build-rules.md
    ├── tech-rules.md
    └── launch-rules.md
```

---

## Customization

**Colors & Typography** — edit CSS variables in `css/style.css`:
```css
:root {
  --color-primary: #your-brand-color;
  --font-heading: 'Your Font', serif;
}
```

**Menu Items** — duplicate this block in `index.html`:
```html
<div class="menu-item">
  <span class="menu-item__name">Dish Name</span>
  <span class="menu-item__price">€00</span>
  <p class="menu-item__desc">Short description.</p>
</div>
```

**WhatsApp Button** — update `data-phone` with real number in international format:
```html
<button id="whatsapp-btn" data-phone="+34612345678">...</button>
```

---

## Sections

| Section | Description |
|---|---|
| Navigation | Fixed nav, language switcher (ES/CA/EN), reserve CTA |
| Hero | Full-bleed photo, heading, tagline |
| About | Restaurant story, 2-column desktop |
| Menu | Tabbed by category, bilingual dish names |
| Gallery | Asymmetric grid, Instagram link |
| Reviews | 4 real Google reviews, rating |
| Find Us | Address, hours, WhatsApp reserve card, Google Maps |
| Footer | Brand statement, nav links, copyright |

---

## Languages

Ships with ES / CA / EN via `js/i18n.js`. All text uses `data-i18n` attributes. Language preference stored in `localStorage`.

---

## Deployment

Push to GitHub → Vercel auto-deploys. After first deploy:
**Settings → Deployment Protection → Off** (clients get a login wall otherwise).

---

## Completed Sites

| Restaurant | URL | Type |
|---|---|---|
| Monalisa BCN | monalisa-bcn.vercel.app | LGBT Gastrobar |
| Brunch.ar BCN | brunch-ar.vercel.app | Argentine Brunch |
| Seoul Nadri | seoul-nadri.vercel.app | Korean BBQ |
