---
name: Heritage & Hearth (Daylight Edition)
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#414844'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#727973'
  outline-variant: '#c1c8c2'
  surface-tint: '#426653'
  primary: '#00150b'
  on-primary: '#ffffff'
  primary-container: '#062c1d'
  on-primary-container: '#709581'
  inverse-primary: '#a8cfb9'
  secondary: '#7d562d'
  on-secondary: '#ffffff'
  secondary-container: '#ffca98'
  on-secondary-container: '#7a532a'
  tertiary: '#190f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#342300'
  on-tertiary-container: '#ab8844'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c4ecd4'
  primary-fixed-dim: '#a8cfb9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#2a4e3d'
  secondary-fixed: '#ffdcbd'
  secondary-fixed-dim: '#f0bd8b'
  on-secondary-fixed: '#2c1600'
  on-secondary-fixed-variant: '#623f18'
  tertiary-fixed: '#ffdea5'
  tertiary-fixed-dim: '#e9c176'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5d4201'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
  headline-charcoal: '#1A1A1A'
  body-slate: '#4A4E54'
  oak-wood: '#D4A373'
  brass-accent: '#C5A059'
  forest-accent: '#062C1D'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  nav-link:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 20px
  section-gap: 120px
  container-max: 1200px
---

## Brand & Style

The design system evolves the "Heritage & Hearth" identity from a dark, nocturnal pub atmosphere to a **warm, airy afternoon** setting. The personality remains "Elevated Pub Culture," but the visual narrative shifts from intimate candlelight to natural sun-drenched interiors. 

The style is a blend of **Minimalism** and **Modern Corporate**, utilizing heavy whitespace and refined typography to create an editorial, premium feel. It evokes the sensation of a light-filled conservatory or a historic pub at midday—bright, welcoming, and sophisticated. The "tactile" elements now lean into the textures of light oak, polished brass, and crisp linen, maintaining a connection to traditional craftsmanship while prioritizing clarity and openness.

## Colors

The palette transitions to a high-contrast light mode that retains its premium roots through sophisticated earth tones.

- **Primary Canvas:** The background is anchored by **Parchment (#FDFBF7)**, providing a warmer, more organic foundation than pure white.
- **Accents:** **Forest Green (#062C1D)** is used as a refined accent for primary calls-to-action and brand marks.
- **Timber Tones:** We transition from dark walnut to **Light Oak (#D4A373)** for secondary elements and container backgrounds.
- **Typography:** To ensure accessibility and editorial punch, headlines are set in **Rich Charcoal (#1A1A1A)**, while body text uses a **Deep Slate (#4A4E54)** for comfortable long-form reading.
- **Metals:** **Antique Gold (#C5A059)** remains as a highlight color for decorative borders, iconography, and subtle UI flourishes.

## Typography

This system maintains the high-contrast pairing of a romantic serif and a geometric sans-serif to preserve its editorial heritage.

- **Playfair Display:** Reserved for headlines and display text. The high stroke contrast is particularly effective in light mode against the parchment background.
- **Montserrat:** Used for all functional UI elements, body copy, and labels. The geometric clarity balances the traditional serif, ensuring the design feels "now" rather than purely "historical."
- **Styling:** Use `label-caps` for category markers and section headers to provide a structured, curated navigation experience.

## Layout & Spacing

The layout utilizes an **Editorial Fixed Grid** that prioritizes whitespace to evoke a sense of "airiness" and premium hospitality.

- **Grid:** A 12-column grid for desktop (1200px max) allows for asymmetrical image placements that feel like a luxury magazine spread.
- **Rhythm:** Generous vertical `section-gap` spacing is essential to keep the layout feeling light and unhurried.
- **Responsive:** On mobile, margins tighten to 20px with a 4-column structure, ensuring content remains the focus.

## Elevation & Depth

In the light mode variant, depth is achieved through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Surface Tiers:** Use the Oak Wood color (#D4A373) at very low opacities (5-10%) or the natural parchment color to create subtle container differences.
- **Outlines:** Use 1px solid borders in Brass Accent (#C5A059) at 30% opacity to define UI boundaries.
- **Shadows:** If used, they should be "Ambient Shadows"—extremely diffused, with a very low opacity (5-8%) using the Slate or Charcoal color as a base to avoid looking "muddy" on the cream background.

## Shapes

The shape language is **Soft (0.25rem)**, maintaining a crisp, architectural silhouette that reflects professional hospitality.

- **Buttons & Inputs:** Use the base 4px (0.25rem) radius for a modern, tailored look.
- **Display Cards:** Use `rounded-lg` (0.5rem) for photography containers to soften the visual impact of large images.
- **Dividers:** Use hairline-thin horizontal and vertical lines in light brass or oak tones to separate content, nodding to wood paneling and cabinetry.

## Components

### Buttons
- **Primary:** Forest Green background with Parchment text. Bold, authoritative, and used for the main conversion point.
- **Secondary:** Light Oak background with Charcoal text or a Ghost style with a Forest Green 1px border.
- **Tertiary/Text:** Montserrat bold in Label Caps, featuring a Brass bottom border on hover.

### Cards
- **The "Library" Card:** Parchment background with a 1px Brass border. High-quality photography takes up the top half, with Playfair Display headlines below.
- **The "Oak" Container:** A subtle Light Oak (#D4A373) background with no border, used to group related informational items like opening hours or location details.

### Input Fields
- Parchment background with a 1px Light Oak border. On focus, the border transitions to Forest Green or Antique Gold to indicate activity.

### Navigation
- A clean, fixed header using the Parchment background. Links use the `nav-link` style in Charcoal, with a Forest Green underline for the active state.

### Lists
- Menu items should be separated by thin Oak-colored horizontal dividers. Price points should be set in Montserrat Bold, while item names use Playfair Display for an elevated dining feel.