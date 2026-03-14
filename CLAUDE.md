# Panda Studios — Site Brief for Claude

## What This Is
The Panda Studios website. A brand identity, web design and creative agency based in Kampala, Uganda. Static HTML/CSS/JS, multi-page, no build tools.

---

## Audience
CEOs and co-founders of growth-stage companies · NGO directors and programme officers · Corporate communications and marketing leads · Government and institutional bodies · East African diaspora businesses

These are decision-makers. They don't need to be educated — they need to be convinced their current brand is costing them. Lead with that.

---

## Voice Rules (non-negotiable)
- **Lead with the client's problem or outcome** — not what we do
- **Outcome language**: authority, trust, impact, credibility — never features
- **Confident and direct**: no filler phrases
- **East Africa positioning**: name Uganda / East Africa deliberately — it's a geographic authority signal, not an afterthought
- **Never say**: "we are a team of professionals", "cutting-edge", "seamlessly", "we help brands grow", "innovative solutions", "passionate about"

---

## Services
1. Brand Identity Design — logo, visual system, typography, guidelines, collateral
2. Web Design & Development — corporate, NGO, portfolio, government
3. Package Design & Branding
4. Print & Marketing Solutions
5. Advertising & Campaign Design
6. Creative Consulting & Brand Strategy

---

## SEO Standard (every page)
- **Title**: `[Page topic] | Panda Studios — Uganda & East Africa`
- **Meta description**: ~155 chars, decision-maker framing, Uganda/East Africa keywords
- **Canonical**: `https://www.pandastudios.co.ug/[filename]`
- **Geo**: `name="geo.region" content="UG-C"` / `geo.placename="Kampala, Uganda"`
- **Open Graph + Twitter Card**: every page
- **Schema.org JSON-LD** (ProfessionalService): homepage only

---

## Contact Details (use these — no placeholders)
- **Uganda (HQ):** Span House, Portal Avenue, Kampala, Uganda · +256 772 233-050
- **United States:** SeaTac, WA 98158, 6734 Main Street · +1 (206) 730-8512
- Email: hello@pandastudios.co
- WhatsApp: https://whatsform.com/T8aqVV
- Social: @pandastudios77 on Instagram, Facebook, Twitter/X, LinkedIn

---

## Technical Stack
- Static HTML/CSS/JS · Bootstrap grid · GSAP + ScrollTrigger · Swiper · FancyBox · Swup.js
- **Service icons**: Phosphor Icons `ph-light` via `unpkg.com/@phosphor-icons/web@2.1.1`
- **Social/UI icons**: Font Awesome (local `css/plugins/font-awesome.min.css`) — do NOT add CDN duplicates
- **Logo morph**: scroll-triggered panda head → PANDA wordmark via `clip-path` + JS class `panda-scrolled`
- **Logo filter**: context-aware inversion via JS class `panda-over-dark` — do NOT use blanket `filter: invert(1)` on `.mil-frame .mil-logo-icon`
- **Fonts**: Montserrat (Google Fonts, already loaded) for headlines and accents
- **Brand red**: `#FF0000` / `#ff0000`

---

## Page Map
| File | Purpose |
|------|---------|
| `index.html` | Homepage — reference standard for tone and structure |
| `service.html` | Web design + branding services detail page |
| `services.html` | Services overview |
| `team.html` | Team grid |
| `contact.html` | Contact form + map |
| `FAQs.html` | FAQ accordions |
| `portfolio.html` | Portfolio slider |
| `portfolio-2.html` | Portfolio grid |
| `project-1.html` | Maisha Naturals — Packaging & Brand Identity |
| `project-2.html` | Uganda Wildlife Authority — Conservation Campaigns |
| `project-3.html` | Uganda Wildlife Authority — Visual Brand Identity |
| `project-4.html` | ARAPAPA — Portrait & Visual Direction |
| `project-5.html` | Kampala Connect — Web Design & Digital Presence |
| `project-6.html` | Savanna Coffee Co. — Brand Identity & Packaging |
| `All-Blogs.html` | Blog listing |
| `publication1–5.html` | Blog posts |
| `404.html` | Error page |

---

## Project Titles (use consistently across all nav menus and pages)
| File | Title | Category |
|------|-------|----------|
| project-1 | Maisha Naturals — Packaging & Brand Identity | Branding |
| project-2 | Uganda Wildlife Authority — Conservation Campaigns | Branding |
| project-3 | Uganda Wildlife Authority — Visual Brand Identity | Brand Identity |
| project-4 | ARAPAPA — Portrait & Visual Direction | Photography |
| project-5 | Kampala Connect — Web Design & Digital Presence | Web Design |
| project-6 | Savanna Coffee Co. — Brand Identity & Packaging | Branding |

---

## CTA Pattern (use site-wide)
- **Suptitle**: A sharp, problem-aware one-liner naming the cost of inaction
- **H2**: `<span style="color:#FF0000; font-family:'Montserrat',sans-serif; font-weight:bold;">The brief starts</span> <span class="mil-thin">with a conversation.</span>`
- **Button**: "Start the conversation" → links to `contact.html`

---

## What NOT to Touch
- CSS class names, HTML structure, JS logic, image paths
- Logo animation CSS/JS blocks (already correct in all pages)
- Footer addresses (Uganda: Span House, Portal Avenue, Kampala · US: SeaTac, WA 98158, 6734 Main Street)
- Schema.org JSON-LD block in index.html
