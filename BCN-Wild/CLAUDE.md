# CLAUDE.md — BCN-Wild
## Premium African Wildlife Photography Portfolio

---

## Concept
A modern, breathtaking digital gallery pairing the raw authenticity of African wildlife with the uncompromising elegance and performance of a luxury brand.

Three pillars: **Professionalism · Cultural Authenticity · Dream-like Motion**

---

## Visual References
- **Mood & Aesthetics**: Porsche Cayenne Black Edition — deep blacks, high-contrast, powerful but restrained
- **Motion & UX**: Milez.jp (Gizan Kato) — scroll-triggered Z-axis magnification, fluid dream-like transitions
- **Mechanics & Conversion**: Adovasio.it — minimalist contact architecture, context before conversion

---

## Colour Palette
```
--bg:       #111111   deep charcoal — default background
--white:    #FFFFFF   stark white — primary text
--silver:   #A3A3A3   brushed silver — metadata, labels
--overlay:  rgba(17,17,17,0.6)  — panel overlays
```
**Never use pure #000000 as background — use #111111.**

---

## Typography
- **Wordmark / Display**: system `serif` or Georgia — bold for BCN, regular for Wild
- **Body / UI**: `'Inter', sans-serif` — 300/400 weights
- **Labels**: 11px, letter-spacing 0.2em, uppercase, silver

---

## The Endless Zoom Architecture
- Y-axis scroll input → Z-axis magnification → Endless reveal
- Each panel is `height: 200vh` with `position: sticky` inner
- As user scrolls through a panel, image scales from 1.0 → 1.25
- NO horizontal carousels. NO static grids.
- Images must intersect and transition with a fluid, flying effect

---

## Contact Form (Adovasio style)
- Title: "Authentic experiences captured."
- Fields: First Name · Email · Area of Interest (Wildlife / Cultural & People / Landscapes) · Message / Intended Usage
- Inputs: underline-only (border-bottom, no box)
- Submit: full-width pill button

---

## Brand Voice
- Authenticity: 95% — deeply respectful of African culture, never exploitative touristy
- Elegance: 100% — uncompromisingly premium
- Awe: 90% — evokes breathtaking scale of nature
- Minimalism: text is sparse, perfectly chosen. Let photography dominate.

---

## Contact Details
- Email: bcn@wild.com
- Phone/WhatsApp: +256 777 784 807
- Social: @bcnwild (Instagram, Twitter/X, Facebook)

---

## File Structure
```
BCN-Wild/
  index.html       — Single-page endless scroll
  css/style.css    — All styles, bcn- prefix
  js/main.js       — Scroll zoom engine, cursor, nav, form
  CLAUDE.md
```

## Images
Referenced from `../wildluna-africa/img/` — shared image pool.

---

## What NOT to Touch
- The Z-axis zoom engine in main.js (scroll + scale logic)
- The `bcn-panel` sticky architecture in CSS
- Custom cursor logic
