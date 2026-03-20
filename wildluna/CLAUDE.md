# CLAUDE.md — Wild Luna Africa
## The Unscripted Journey · Boutique Safari · Kampala, Uganda

---

## Mood & Reference Benchmark

**Primary visual reference: [apehills.com](https://apehills.com)**

Study Apes Hill Barbados for:
- **Dark, sophisticated navigation** — near-black header with generous white-space, minimal links, a bordered CTA button (right-aligned), and an all-caps sans-serif hamburger pattern
- **Serif/sans pairing** — large italic serif display text paired with tight uppercase sans-serif labels. Headings feel editorial, not corporate
- **Section rhythm** — long horizontal splits: left text + right image, or full-bleed image panels with text overlaid bottom-left
- **Muted colour restraint** — cream backgrounds, off-whites, a single warm accent (gold/terracotta), deep navy/forest dark sections
- **Photography-first thinking** — every section is designed to frame a photograph. Colour gradients act as image placeholders until real photography arrives
- **"Sustainability at Our Core" layout style** — eyebrow label (small caps, gold) → large bold heading mix (italic serif + upright serif) → body paragraph → CTA. Replicate this hierarchy across all Wild Luna sections
- **Card style** — clean rectangular cards, visible but subtle borders, category label above title, date + read link in footer row

---

## Typography — Match Apes Hill Scale & Weight

### Fonts in Use
```
Heading / Display: Cormorant Garamond
  — weights: 300 (default), 400 (card titles), 500 (bold emphasis)
  — italic variant for the "motion word" in every headline (e.g. "journey.", "moon.", "field.")

Label / Body / UI: Jost
  — weights: 300 (body text), 400 (labels, buttons), 500 (footer column heads)
```

**Google Fonts link (already in `<head>`):**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet" />
```

### Type Scale (do not shrink — match Apes Hill boldness)
| Role | Class | Size |
|---|---|---|
| Hero / Display | `.wl-hero-title` | clamp(60px, 9vw, 130px) — Cormorant 300 |
| Section H2 | `.wl-h2` | clamp(32px, 4.5vw, 60px) — Cormorant 300 |
| Card H3 | `.wl-h3` | clamp(22px, 3vw, 36px) — Cormorant 300 |
| Eyebrow label | `.wl-label` | 11px, Jost 400, letter-spacing 0.2em, uppercase, gold |
| Body text | `.wl-body` | clamp(15px, 1.1vw, 17px) — Jost 300 |
| Card excerpt | — | 14px — Jost 300 |
| Buttons | `.wl-btn` | 12px, Jost 400, letter-spacing 0.18em, uppercase |

### Heading Pattern (Apes Hill style)
Every major section heading should follow this formula:
```
[EYEBROW — small caps gold label]
[DIVIDER — 60px gold horizontal rule]
[H2 — upright Cormorant for line 1]
[H2 — italic Cormorant for the "feeling" word, typically last]
```
Example: `Four countries. Infinite <em>possibilities.</em>`

**Bold emphasis rule:** Section headings that introduce a place or philosophy can use `font-weight: 400` or `500` on the serif to push visual weight. The italic word at the end remains 300.

---

## Colour Palette
```css
--midnight-moon:  #0D0D1F;   /* deep navy-black — dark sections, nav overlay, footer */
--savannah-sage:  #5C6B4E;   /* muted forest green — accents, card gradients */
--crescent-gold:  #C8A97A;   /* warm gold — ALL labels, dividers, hover states, buttons */
--dusty-rose:     #C4928A;   /* soft terracotta — secondary accent, occasional use */
--cream:          #F4F1EB;   /* warm cream — "Our Collection" section bg */
--off-white:      #FDFBF7;   /* near-white — default page bg, light section bg */
--light-border:   #E8E4DC;   /* warm light grey — card borders, form fields */
--mid-gray:       #7A7A7A;   /* body text on light backgrounds */
```

**Never use pure black (#000) or pure white (#FFF) anywhere.**

---

## Design Principles

1. **Laid-back sophistication** — the brand voice is unhurried. Spacing should feel generous. Nothing should feel cramped or rushed.

2. **Photography placeholder thinking** — until real images arrive, every image area uses a directional gradient (`linear-gradient(160deg, darker-tone 0%, lighter-tone 100%)`). The gradient must feel like a landscape (dark top-left, lighter bottom-right or vice versa for drama).

3. **Gold as the only accent** — `--crescent-gold` (#C8A97A) is the sole accent colour. It appears on: labels, dividers, CTA button borders, hover states, and the "Africa" wordmark sub-label. Never use blue, red, or bright green as accents.

4. **Scroll reveals on everything** — every section element gets `class="wl-reveal"` (and `wl-reveal-delay-1/2/3` for staggered siblings). The IntersectionObserver in `main.js` handles animation automatically.

5. **Italic as emotion** — the last word of every major heading should be wrapped in `<em>` to produce the Cormorant italic. This is a brand signature, not decoration.

6. **Section alternation** — backgrounds should alternate: `--off-white` → `--midnight-moon` → `--cream` → `--off-white`. Never two dark sections back-to-back (except footer after dark CTA).

7. **Journal cards need visible borders** — use `border: 1.5px solid var(--light-border)` minimum. On hover, border transitions to `var(--crescent-gold)`. Card titles use `var(--midnight-moon)` at full opacity — never muted.

---

## Page Structure

### Files
```
index.html          — Home (hero, ethos, luna phases, collection, slow safari, journal teaser, CTA)
journal.html        — The Luna Journal (filter bar, featured article, article grid, CTA)
plan-your-journey.html — Private Journeys (multi-step form)
about.html          — Our Story / Founder (to be built)
css/style.css       — Single stylesheet, BEM-style with wl- prefix
js/main.js          — Single JS file, no frameworks
```

### Naming Convention
- All CSS classes prefixed with `wl-` (Wild Luna)
- BEM-inspired: `wl-block`, `wl-block__element`, modifier via `wl-block--modifier`
- JS: vanilla ES5-compatible, wrapped in IIFE

---

## Navigation Rules (match Apes Hill)
- Fixed, transparent over hero → transitions to `rgba(13,13,31,0.95)` with `backdrop-filter: blur` on scroll
- Left: `Wild Luna / Africa` wordmark (serif + gold subtext)
- Right: `Begin Your Cycle` bordered-pill CTA + hamburger
- Full-screen overlay menu (dark): large serif items that slide up on open
- Sub-menu for "Our Collection" reveals country list in gold sans-serif
- **Always include**: Home, Our Collection (Uganda/Rwanda/Kenya/Tanzania), The Luna Philosophy, Conservation, Private Journeys, The Journal, Our Story

---

## Interactive & "Lively" Features

The following must always be present and maintained:

### 1. Scroll Reveal
- Class `wl-reveal` on all section-level elements
- Delays: `wl-reveal-delay-1` (0.15s), `wl-reveal-delay-2` (0.3s), `wl-reveal-delay-3` (0.45s)
- Triggered by `IntersectionObserver` at threshold 0.12

### 2. Hero Ken Burns Zoom
- Hero bg starts at `scale(1.05)`, transitions to `scale(1)` over 8s on load
- Class `.loaded` added via JS `requestAnimationFrame` chain

### 3. Custom Cursor (gold crescent dot)
- A small `14px × 14px` circular gold dot follows the mouse
- On hovering links/buttons it expands to `40px × 40px` and turns semi-transparent
- Implemented via `#wl-cursor` div in `<body>`, moved by `mousemove` listener

### 4. Card Image Hover Zoom
- `.wl-card-img` and `.wl-journal-card-img` scale to `1.04` on parent hover (already in CSS)

### 5. Mouse-tilt on Collection Cards
- Subtle 3D tilt (max ±6°) on `.wl-card` based on mouse position within card
- `transform: perspective(800px) rotateX(Ydeg) rotateY(Xdeg)` applied via `mousemove`
- Reset to flat on `mouseleave`

### 6. Parallax on Hero
- Hero background image translates at 0.35× scroll speed (slower than page)
- Applied via `scroll` event: `heroBg.style.transform = \`translateY(\${scrollY * 0.35}px) scale(1)\``

### 7. Smooth Anchor Scroll
- All `href="#..."` links scroll smoothly (CSS `scroll-behavior: smooth` + JS fallback)

### 8. Page-transition Fade
- A thin gold line sweeps across the top of the viewport on page load (CSS animation, `wl-page-line` element)

### 9. Journal Filter Animation
- Cards that are hidden on filter slide out with `opacity: 0; transform: scale(0.96)` over 0.3s
- Visible cards fade/slide in

### 10. Newsletter Feedback
- On submit: input clears, button text → "Subscribed ✓", reverts after 3s

---

## Component Quick Reference

### Section with eyebrow + heading
```html
<section class="wl-section wl-section--off-white">
  <div class="wl-container">
    <span class="wl-label wl-reveal">Section Label</span>
    <span class="wl-divider wl-reveal wl-reveal-delay-1"></span>
    <h2 class="wl-h2 wl-reveal wl-reveal-delay-1">
      First line. <em>Italic emotion word.</em>
    </h2>
  </div>
</section>
```

### Gold CTA Button
```html
<a href="..." class="wl-btn wl-btn-gold">Begin Your Cycle &rarr;</a>
```

### Outlined Button (dark bg)
```html
<a href="..." class="wl-btn wl-btn-outline">Read the Story</a>
```

### Journal Card
```html
<article class="wl-journal-card wl-reveal" data-category="conservation">
  <div class="wl-journal-card-img" style="background: linear-gradient(160deg, #0d1a0d 0%, #2a4020 100%);"></div>
  <div class="wl-journal-card-body">
    <span class="wl-journal-card-cat">Conservation</span>
    <h3 class="wl-journal-card-title">Title here</h3>
    <p class="wl-journal-card-excerpt">Excerpt...</p>
    <div class="wl-journal-card-footer">
      <span class="wl-journal-card-date">March 2026</span>
      <a href="#" class="wl-text-link">Read</a>
    </div>
  </div>
</article>
```

---

## About Page (`about.html`) Blueprint

The About page tells the story of Wild Luna Africa and its founder. Structure:

1. **Hero** — `wl-hero wl-hero--medium`, centered, title: *"To the Woman Who Carries the Moon in Her Heart."*
2. **Philosophy split** — left: large quote/pullquote; right: body text about the brand ethos
3. **Founder section** — image placeholder left, text right: "Rooted in Kyanja, Kampala..."
4. **The Wild Luna Way** — 3-column dark grid (like Luna Phases) with icons for: Beyond the Routine / The Untamed & The Refined / Heart-Led Conservation
5. **The Invitation** — centered dark CTA with "Full Moon" / "New Moon" journey types
6. **Standard footer**

---

## Writing Voice

- Present tense, second person ("you", "your")
- Short declarative sentences mixed with longer lyrical ones
- Never use: "world-class", "state-of-the-art", "cutting-edge", "seamless experience"
- Do use: "unhurried", "unscripted", "at altitude", "green cathedral", "laid-back sophistication", "the particular silence of..."
- Every section should feel like it was written at dusk, by the fire

---

## SEO & Meta Checklist (every page)
- `<title>` — unique, includes "Wild Luna Africa", destination/topic, max 60 chars
- `<meta name="description">` — 140–160 chars, includes primary keyword
- `<link rel="canonical">` — absolute URL
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`
- Twitter Card: `summary_large_image`
- Schema.org JSON-LD: `ProfessionalService` on home, `Article` on journal pages
- All images: descriptive `alt` text, never empty

---

## Image Guidelines (for when photography arrives)
- Hero: full-bleed landscape, 16:9 or wider, golden hour preferred
- Collection cards: portrait 3:4, destination-specific
- Journal cards: 16:10 landscape crop
- Founder/About: editorial portrait, natural light
- File format: WebP with JPEG fallback
- Lazy-load all below-fold images with `loading="lazy"`
