# Scroll Motion Skill
> For Andri's restaurant & bar websites · Plain HTML/CSS/JS · No libraries · Mobile-first · Barcelona

## When to Use This Skill
Load this skill whenever adding motion or animation to a restaurant/bar website. It covers scroll-triggered reveals, hero parallax, staggered card entrances, and section heading animations — all in vanilla HTML/CSS/JS, no React, no GSAP, no Framer Motion.

---

## Core Philosophy (Emil Kowalski-inspired)

**Motion should make the interface feel alive, not show off.**
The goal is "noticeable but tasteful" — clients should say *"this feels really polished"*, not *"whoa, crazy animations"*.

Rules to always follow:
- Only animate `transform` and `opacity` — never `width`, `height`, `margin`, `padding` (causes layout jank)
- Entrances: **ease-out** (elements decelerate as they arrive)
- Exits: faster than entrances (users are waiting to do something)
- Always respect `prefers-reduced-motion` — it's the law in accessibility terms
- Mobile gets the same animations, just ensure 60fps on mid-range Android phones
- Never animate more than ~600ms total for any single element

---

## Setup: Add Once Per Project

### 1. CSS Animation Tokens
Add to `css/style.css`, in the design tokens section at the top:

```css
/* ============================================
   MOTION TOKENS
   ============================================ */
:root {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);   /* Snappy deceleration — use for entrances */
  --ease-in-out: cubic-bezier(0.87, 0, 0.13, 1); /* Smooth both ends — use for parallax */
  
  --dur-fast: 200ms;    /* Hover states, micro-interactions */
  --dur-base: 400ms;    /* Standard element reveal */
  --dur-slow: 650ms;    /* Hero load-in, section headings */
  --dur-crawl: 900ms;   /* Dramatic heading entrances */
  
  --stagger: 80ms;      /* Delay between staggered items */
}

/* Reduced motion: respect user preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2. Base Reveal Classes
Add to `css/style.css`:

```css
/* ============================================
   SCROLL REVEAL — BASE
   Elements start hidden, JS adds .is-visible
   ============================================ */

/* Default: fade + rise */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

/* Variant: fade only (for backgrounds, overlays) */
.reveal--fade {
  opacity: 0;
  transform: none;
  transition: opacity var(--dur-base) var(--ease-out);
}

/* Variant: rise further (for section headings) */
.reveal--heading {
  opacity: 0;
  transform: translateY(48px);
  transition:
    opacity var(--dur-slow) var(--ease-out),
    transform var(--dur-slow) var(--ease-out);
}

/* Variant: scale in (for logo, hero badge) */
.reveal--scale {
  opacity: 0;
  transform: scale(0.92);
  transition:
    opacity var(--dur-slow) var(--ease-out),
    transform var(--dur-slow) var(--ease-out);
}

/* Triggered state — JS adds this class */
.reveal.is-visible,
.reveal--fade.is-visible,
.reveal--heading.is-visible,
.reveal--scale.is-visible {
  opacity: 1;
  transform: none;
}

/* Stagger delays — add to children inside a .stagger-group */
.stagger-group .reveal:nth-child(1) { transition-delay: 0ms; }
.stagger-group .reveal:nth-child(2) { transition-delay: var(--stagger); }
.stagger-group .reveal:nth-child(3) { transition-delay: calc(var(--stagger) * 2); }
.stagger-group .reveal:nth-child(4) { transition-delay: calc(var(--stagger) * 3); }
.stagger-group .reveal:nth-child(5) { transition-delay: calc(var(--stagger) * 4); }
.stagger-group .reveal:nth-child(6) { transition-delay: calc(var(--stagger) * 5); }
.stagger-group .reveal:nth-child(7) { transition-delay: calc(var(--stagger) * 6); }
.stagger-group .reveal:nth-child(8) { transition-delay: calc(var(--stagger) * 7); }
/* Add more as needed, max ~8 items per stagger group */
```

### 3. Intersection Observer Script
Add to `js/main.js` (or a dedicated `js/motion.js` file):

```javascript
/* ============================================
   SCROLL REVEAL — Intersection Observer
   Watches .reveal elements and adds .is-visible
   when they enter the viewport
   ============================================ */
(function () {
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Skip animation setup — make everything visible immediately
    document.querySelectorAll('.reveal, .reveal--fade, .reveal--heading, .reveal--scale')
      .forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Fire once only — don't re-animate on scroll up
        }
      });
    },
    {
      threshold: 0.12,    // Trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px', // Trigger slightly before element fully enters
    }
  );

  // Observe all reveal elements
  document.querySelectorAll(
    '.reveal, .reveal--fade, .reveal--heading, .reveal--scale'
  ).forEach((el) => observer.observe(el));
})();
```

---

## Effect 1: Fade + Slide Up (The Essential)

**When:** Use on almost everything — paragraphs, buttons, images, cards, the About section intro text.

**HTML pattern:**
```html
<!-- Single element -->
<p class="reveal">We source our ingredients from local Barcelona markets every morning.</p>

<!-- Image -->
<img class="reveal" src="images/about.webp" alt="Chef preparing food" width="800" height="600">

<!-- Button -->
<a class="btn reveal" href="#find-us">Reserve a table</a>
```

**Notes:**
- Default delay is 0 — elements animate as soon as they enter view
- If multiple non-related elements are close together, manually add a small delay:
  ```html
  <p class="reveal" style="transition-delay: 100ms;">Second paragraph</p>
  ```
- Don't apply `.reveal` to the nav — it's fixed and always visible

---

## Effect 2: Hero Parallax

**What it does:** The hero background photo scrolls at ~60% the speed of the page, creating a 3D depth illusion. The logo/text stays on top and moves at normal speed. Clients always notice this.

**IMPORTANT — iOS Rule:** Do NOT use `background-attachment: fixed` (broken on iOS Safari). Use a JS-driven transform on the hero `<img>` instead.

**HTML — your hero already has this structure, just add the id:**
```html
<section id="hero">
  <div class="hero__bg">
    <picture>
      <source srcset="images/hero.webp" type="image/webp">
      <img id="hero-parallax-img" src="images/hero.jpg" alt="" fetchpriority="high" loading="eager">
    </picture>
    <div class="hero__overlay"></div>
  </div>
  <div class="hero__content">
    <!-- logo, heading etc -->
  </div>
</section>
```

**CSS — add to style.css:**
```css
/* Parallax: overflow hidden clips the image as it moves */
#hero {
  overflow: hidden;
}

#hero-parallax-img {
  /* Slightly taller than hero so parallax movement doesn't show gaps */
  height: 115%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  will-change: transform; /* Hint to browser to GPU-accelerate */
  transition: transform 0.05s linear; /* Very short — keeps it responsive to scroll */
}
```

**JS — add to main.js:**
```javascript
/* ============================================
   HERO PARALLAX
   Moves hero image at 40% of scroll speed
   ============================================ */
(function () {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (prefersReducedMotion) return;

  const img = document.getElementById('hero-parallax-img');
  if (!img) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    // Move image up at 40% of scroll speed (0.4 = intensity)
    // Negative = image moves up as user scrolls down
    img.style.transform = `translateY(${scrollY * 0.4}px)`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true; // Throttle to one RAF per frame
    }
  }, { passive: true }); // passive: true = better scroll performance
})();
```

**Intensity guide:**
- `0.2` = very subtle, barely noticeable
- `0.4` = noticeable and satisfying (recommended)
- `0.6` = dramatic, use for bold nightlife/bar sites

---

## Effect 3: Staggered Card Reveals

**When:** Menu items, Google Reviews cards, gallery grid, any repeating card layout.

**HTML pattern — wrap cards in `.stagger-group`:**
```html
<!-- Menu category -->
<div class="stagger-group">
  <div class="menu-card reveal">
    <h3>Huevos Rotos</h3>
    <p>Fried eggs, Iberian ham, house potatoes</p>
    <span>€12</span>
  </div>
  <div class="menu-card reveal">
    <h3>Patatas Bravas</h3>
    <p>Crispy potatoes, spicy brava sauce, aioli</p>
    <span>€8</span>
  </div>
  <div class="menu-card reveal">
    <h3>Pan con Tomate</h3>
    <p>Sourdough, ripe tomato, Arbequina olive oil</p>
    <span>€5</span>
  </div>
</div>

<!-- Google Reviews cards -->
<div class="stagger-group">
  <div class="review-card reveal"><!-- review 1 --></div>
  <div class="review-card reveal"><!-- review 2 --></div>
  <div class="review-card reveal"><!-- review 3 --></div>
  <div class="review-card reveal"><!-- review 4 --></div>
</div>
```

**CSS already handles this** via the `.stagger-group .reveal:nth-child(n)` rules in the base setup. Each card appears 80ms after the previous one.

**Notes:**
- Keep stagger groups to max 8 items. For menus with 12+ items, split into multiple `.stagger-group` divs per category.
- The stagger only fires when the group enters the viewport — so items off-screen don't wait for previous ones.

---

## Effect 4: Section Heading Animations

**What it does:** Section titles rise in from further below with a slower, more dramatic transition. Makes the section feel like it's "announcing itself."

**HTML pattern:**
```html
<section id="menu">
  <div class="section-header">
    <h2 class="reveal--heading">Our Menu</h2>
    <p class="reveal" style="transition-delay: 120ms;">
      Traditional recipes with a modern touch
    </p>
  </div>
  <!-- rest of section -->
</section>
```

**CSS is already set** via `.reveal--heading` in the base setup (48px rise, 650ms duration).

**For nightlife/bar clients — add a line reveal:**
```css
/* Animated underline that draws in after heading appears */
.heading-underline {
  display: block;
  height: 2px;
  background: var(--accent); /* your neon/gold accent color */
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 600ms var(--ease-out);
  transition-delay: 400ms; /* Fires after heading has risen */
}

.reveal--heading.is-visible + .heading-underline,
.reveal--heading.is-visible ~ * .heading-underline {
  transform: scaleX(1);
}
```

**Usage:**
```html
<h2 class="reveal--heading">Our Story</h2>
<span class="heading-underline" aria-hidden="true"></span>
```

---

## Hero Load-In Animation (Bonus — On Page Load)

This isn't scroll-triggered — it fires when the page loads. Gives the hero a cinematic entrance. Add after your loading animation completes.

```css
/* Hero load-in — fires once on page load */
@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-logo-in {
  from {
    opacity: 0;
    transform: scale(0.90);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.hero__logo {
  animation: hero-logo-in var(--dur-slow) var(--ease-out) 200ms both;
}

.hero__title {
  animation: hero-rise var(--dur-base) var(--ease-out) 500ms both;
}
```

> `both` fill-mode means: element starts in the `from` state even before the delay, and stays at `to` state after it ends. This prevents flash-of-content.

---

## Section-by-Section Implementation Guide

Apply this to every new restaurant build:

| Section | Elements to animate | Class to use |
|---|---|---|
| **Hero** | Logo, tagline | `hero-logo-in` + `hero-rise` keyframes (load-in, not scroll) |
| **Hero photo** | Background image | Parallax JS (`#hero-parallax-img`) |
| **About** | Heading | `.reveal--heading` |
| **About** | Text paragraphs | `.reveal` (stagger manually with `transition-delay`) |
| **About** | Photo | `.reveal--scale` |
| **Menu** | Section heading + subtitle | `.reveal--heading` + `.reveal` |
| **Menu** | Each category of cards | `.stagger-group` wrapping `.reveal` cards |
| **Gallery** | Grid images | `.stagger-group` (max 8 per group) |
| **Reviews** | All 4 cards | `.stagger-group` wrapping `.reveal` cards |
| **Find Us** | Heading, text, WhatsApp card | `.reveal--heading` + `.reveal` |
| **Footer** | Leave as-is | Don't animate footer — users scroll past it fast |

---

## Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---|---|
| Animating `height` or `top` | Use `transform: translateY()` |
| `background-attachment: fixed` for parallax | JS `transform` on the `<img>` element |
| Applying `.reveal` to the nav | Nav is fixed, always visible — skip it |
| Stagger group with 12+ items | Split into multiple groups per menu category |
| Not testing on real Android | Mid-range phones can drop frames — test via Vercel URL |
| Forgetting `prefers-reduced-motion` | Already handled by the setup script — don't remove it |
| Hero image without `will-change: transform` | Add it — prevents jank during parallax |
| `transition-delay` on ALL elements | Only use delay for intentional stagger; most elements delay: 0 |

---

## Testing Checklist

After adding motion to a project:

- [ ] Desktop Chrome: all reveals fire correctly on scroll
- [ ] Mobile Safari (iPhone): parallax smooth, no jank
- [ ] Android Chrome (real device via Vercel URL): 60fps confirmed
- [ ] `prefers-reduced-motion: reduce` in System Settings → everything is instant, nothing missing
- [ ] Hero load-in: logo appears cleanly (no flash before animation)
- [ ] Stagger groups: cards appear in sequence, not all at once
- [ ] Scroll up and back down: elements don't re-animate (observer fires once only)
- [ ] Elements below the fold on load: start hidden (not briefly visible then hidden)

---

## How to Tell Claude Code to Use This Skill

In Claude Code, say:

> *"Use the scroll-motion skill in memory/ to add scroll animations to the website. Apply to all sections as described in the skill."*

Or more specifically:

> *"Add hero parallax and stagger reveals to the menu cards using the scroll-motion skill."*

---

*Scroll Motion Skill v1.0 — Built for Andri's restaurant websites — Barcelona 2026*
*Based on Emil Kowalski's animation principles — adapted for plain HTML/CSS/JS*
