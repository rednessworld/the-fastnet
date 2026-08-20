# Taste Skill — Restaurant Edition
> Adapted from taste-skill by Leonxlnx · Trimmed for plain HTML/CSS/JS · Barcelona restaurant & bar websites

## 1. ACTIVE BASELINE CONFIGURATION
* DESIGN_VARIANCE: 6 (1=Perfect Symmetry, 10=Artsy Chaos)
* MOTION_INTENSITY: 5 (1=Static, 10=Cinematic) — redmotion skill handles scroll animations separately
* VISUAL_DENSITY: 3 (1=Art Gallery/Airy, 10=Packed Data)

**AI Instruction:** These are the defaults. Override dynamically based on the client brief:
- Nightlife/bar clients → DESIGN_VARIANCE: 8, MOTION_INTENSITY: 6, VISUAL_DENSITY: 4
- Fine dining → DESIGN_VARIANCE: 5, MOTION_INTENSITY: 4, VISUAL_DENSITY: 2
- Casual brunch/café → DESIGN_VARIANCE: 6, MOTION_INTENSITY: 5, VISUAL_DENSITY: 3

---

## 2. STACK CONSTRAINTS (Always apply)
This skill is for **plain HTML, CSS, and vanilla JavaScript only**. No React, no Next.js, no Framer Motion.

* No Tailwind CDN or any CSS framework, at any stage, including during development. Native CSS only, written directly to css/style.css.
* **Animate only** `transform` and `opacity`. Never `width`, `height`, `top`, `left`, `margin`, or `padding`.
* **CSS transitions** use `cubic-bezier(0.16, 1, 0.3, 1)` for all interactive elements.
* **No custom mouse cursors.** They break accessibility and performance.
* **Viewport height:** Never use `100vh` for full-height sections. Always use `100svh` (iOS Safari safe).
* **No `background-attachment: fixed`.** Use a fixed `<div>` with a JS-driven `transform` instead (redmotion skill handles this).
* **Grid over flex math:** Never use `width: calc(33% - 1rem)`. Use CSS Grid.

---

## 3. TYPOGRAPHY RULES

* **Headings:** Large, tight tracking. Default: `font-size: clamp(2.5rem, 6vw, 5rem); letter-spacing: -0.02em; line-height: 1`.
* **Body:** `font-size: 1rem; line-height: 1.7; max-width: 65ch`.
* **Restaurant font pairings (from project brief):**
  - Restaurants: Playfair Display (headings) + DM Sans (body)
  - Nightlife/bars: Sregs Serif Display (headings) + DM Sans (body)
* **Font loading:** Always `font-display: swap`. Always `preload` the heading font in `<head>`.
* **NO system fonts** like Arial or Helvetica for client-facing text. Always use the project fonts.
* **NO oversized H1s that scream.** Control hierarchy with weight and spacing, not just scale.
* **Serif fonts** are appropriate for restaurant/editorial designs. Avoid on dashboards or admin UIs.

---

## 4. COLOR RULES

* **Max 1 accent color per project.** Saturation below 80%.
* **No pure black (#000000).** Use off-black, zinc-950, or charcoal (`#1a1a1a`).
* **No neon glows or purple/blue "AI" aesthetics.** Use warm neutrals with a single strong accent.
* **Color consistency:** Pick warm OR cool grays and stick to one. Never mix in the same project.
* **Shadows:** Tint shadows to the background hue. Never use flat black `rgba(0,0,0,0.x)` shadows on warm backgrounds — use `rgba(80,40,20,0.x)` instead.
* **Cards:** No hard borders. Use `box-shadow` with soft rgba values. No `border: 1px solid #ccc`.
* **Star ratings:** Use `#B45309` (not `#F59E0B` — fails WCAG AA on white).

---

## 5. LAYOUT RULES

* **No centered hero/H1 as default.** When DESIGN_VARIANCE > 4, force left-aligned content or split-screen layout. Centered is allowed only for logo-dominant heroes (which is the standard hero pattern for these restaurant sites).
* **No 3-equal-column card grids.** Use 2-column zig-zag, asymmetric grid, or horizontal scroll instead.
* **Cards only when elevation communicates hierarchy.** Avoid boxing everything in cards — use spacing and dividers (`border-top`) to group content.
* **Section padding:** Use generous, consistent vertical rhythm. `padding: clamp(4rem, 10vw, 8rem) 0` as default.
* **Max content width:** `max-width: 1280px; margin: 0 auto` for all content containers.
* **Mobile-first always.** Every layout must be single-column on `< 768px`. No horizontal scroll ever.

---

## 6. INTERACTION & MOTION RULES

Motion on these sites is handled by the **redmotion skill** (scroll animations). This skill covers hover states and micro-interactions.

* **All hover transitions:** `transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease`.
* **Button active state:** `transform: scale(0.98)` or `translateY(1px)` to simulate physical press.
* **CTA buttons:** Always have a visible hover state — scale, background shift, or underline. Never static.
* **Links:** Underline on hover. No color-only hover changes (accessibility).
* **Images on hover:** Subtle `transform: scale(1.03)` inside an `overflow: hidden` container. Never animate the container itself.
* **Never animate layout properties** (`width`, `height`, `margin`, `padding`). Only `transform` and `opacity`.
* **`prefers-reduced-motion`:** Every animation must be wrapped in a media query check. The redmotion skill handles scroll animations — apply the same rule to all hover/transition CSS:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
  ```

---

## 7. FORBIDDEN PATTERNS (AI Tells to Avoid)

These are the most common signs that a site was built by AI without taste. Avoid all of them:

### Visual
* No neon outer glows or `box-shadow: 0 0 20px color`
* No pure black `#000000`
* No gradient text on large headings
* No oversaturated accent colors
* No purple/blue "AI aesthetic" color schemes
* No fake glassmorphism without proper backdrop-filter support fallback

### Layout
* No 3 equal cards in a row as the main feature section
* No centered layout as default when content has visual assets
* No floating elements with awkward asymmetric gaps
* No `height: 100vh` (use `100svh`)
* No `background-attachment: fixed` (iOS Safari breaks) — use `html::before` fixed pseudo-element instead

### Content (The "AI Slop" Effect)
* No placeholder restaurant names like "La Bella Italia" or "Restaurant Name"
* No fake phone numbers like `+34 600 000 000` in visible UI (placeholder only in code)
* No filler copy like "Elevate your dining experience" or "Unleash the flavors"
* No generic "about us" text — use client's actual voice or leave a clear placeholder comment
* No stock photo URLs — use the actual images from `images/` folder
* No lorem ipsum in any section that will be reviewed by client

### Technical
* No inline styles for anything that belongs in CSS
* No `!important` spam
* No `z-index: 9999` unless for a modal or overlay with clear purpose
* No unused CSS classes
* No arbitrary font-weight shorthand outside the design token system — use the project's defined weight scale.
* No `og:type="restaurant"` — use `og:type="website"`
* No `reviewCount` as a string in Schema.org — must be a Number
* No `<source type="image/webp">` in `<picture>` unless the `.webp` file exists on disk — causes 404s and empty broken layout spaces

---

## 8. RESTAURANT-SPECIFIC DESIGN RULES

### Hero Section
* Full-bleed photo with overlay. Logo centered and dominant.
* Overlay: use the project's `--overlay-mid` token (warm-tinted, e.g. `rgba(16,10,6,0.50)`) as default — adjust per photo. Never a flat `rgba(0,0,0,X)` overlay — contradicts this file's own Section 4 color rules and tech-rules.md's warm-overlay tokens.
* Nav links white over hero, dark after scroll (JS class toggle on scroll).
* Hero image: `fetchpriority="high"` + `loading="eager"`. Never `loading="lazy"` on hero.

### Menu Section
* Warm, readable. Never a PDF embed — always coded HTML menu.
* Group by category. Use clear visual hierarchy between category title, dish name, description, price.
* Dietary tags (vegetarian, gluten-free, etc.) as small inline badges.
* Must be fully translated in all 3 languages (ES/CA/EN).

### Reviews Section
* 4 real Google reviews. Star color `#B45309`.
* Link to Google Maps. No separate "leave a review" CTA needed — the Maps link covers it.
* Cards with soft shadow, no hard borders.

### Find Us / Contact Section
* Google Maps embed using `maps/embed?pb=` URL format, not regular maps URL.
* WhatsApp CTA card — primary reservation method for Barcelona.
* Address, phone, hours all present.
* Hours note: many Barcelona spots close Mon–Tue — confirm with client.

### Floating WhatsApp Button
* Bottom right, always visible.
* `data-phone` attribute for easy number update before launch.
* Tooltip on hover: "Reserve via WhatsApp" (translated in all 3 languages).

---

## 9. PERFORMANCE RULES

* **Hero image ≤ 200KB WebP.** LCP killer if ignored.
* **Logo ≤ 30KB WebP.** Large PNG logos are the #1 Core Web Vitals failure.
* **All images:** WebP with `<picture>` + PNG/JPG fallback.
* **Lazy load** all images except hero (`loading="lazy"` on everything below the fold).
* **`width` and `height` attributes** on all `<img>` tags to prevent layout shift (CLS).
* **Grain/noise overlays:** Apply only to `position: fixed; pointer-events: none` pseudo-elements. Never to scrolling containers.
* **`will-change: transform`** only where actively needed. Remove after animation completes if possible.
* **favicon.png must be 512×512px** exported from the logo — add to `images/` folder

---

## 10. PRE-LAUNCH CHECK (Taste-Specific)
Before calling a build done, verify:
- [ ] No centered hero if there's a strong photo — left-align content or use logo-dominant pattern
- [ ] No 3-column equal card grid anywhere
- [ ] No hard card borders — soft shadows only
- [ ] Star rating color is `#B45309` not `#F59E0B`
- [ ] No arbitrary font-weight shorthand outside the design token system
- [ ] No `og:type="restaurant"`
- [ ] No pure black `#000000` in CSS
- [ ] `reviewCount` is a Number in Schema.org JSON-LD
- [ ] All hover states have transitions
- [ ] `prefers-reduced-motion` respected
- [ ] No lorem ipsum or placeholder copy visible in client preview
- [ ] Logo is WebP ≤ 30KB
- [ ] Hero image is WebP ≤ 200KB

---

*v1.1 — Removed residual Tailwind CDN references to align with the site-wide native-CSS-only rule (Aug 2026).*
*Taste Skill — Restaurant Edition v1.1*
*Adapted from Leonxlnx/taste-skill for Andri's plain HTML/CSS/JS restaurant websites · Barcelona 2026*
*Pair with: redmotion skill (scroll animations) · Use together for full design quality coverage*
