# B1C3 Web Standards & UX Philosophy

**Version:** 1.0  
**Last Updated:** February 6, 2026  
**Purpose:** Define design and UX standards for all B1C3 web properties

---

## 1. Core Principles

### 1.1 Accessibility First
- **WCAG 2.1 Level AA minimum** for all pages
- Keyboard navigation for all interactive elements
- Screen reader compatibility (tested with NVDA, VoiceOver)
- Color contrast ratio 4.5:1 for text
- No information conveyed by color alone
- Support for `prefers-reduced-motion`
- Clear focus indicators (no outline removal)

**Why:** Accessibility isn't a feature—it's a requirement. We practice what we preach.

### 1.2 Performance First
- **First Contentful Paint (FCP):** < 1.5s on 4G
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Time to Interactive (TTI):** < 3.5s
- **Total page size:** < 200KB (including image optimization)
- No unnecessary JavaScript (progressive enhancement)

**Why:** A slow page loses users. Respect their time and bandwidth.

### 1.3 Mobile-First Design
- Responsive design: mobile first, then tablet, then desktop
- Touch targets minimum 48×48px
- Readable text without zooming (font size 16px+)
- Efficient use of space on small screens

**Why:** 60%+ of traffic is mobile. Design for the smallest screen first.

### 1.4 Clear Communication
- Simple, jargon-free language (avoid tech-speak)
- Short paragraphs and scannable content
- Clear hierarchy (H1 → H2 → H3)
- Consistent voice and tone
- No marketing fluff; focus on real value

**Why:** Business owners, not engineers, are making purchase decisions.

### 1.5 Trust & Transparency
- Show real numbers and metrics
- Link to documentation and source code
- Display third-party validation (audit results, certifications)
- Be honest about limitations
- Privacy-respecting (minimal tracking, GDPR-compliant)

**Why:** B1C3 is built on credibility. Back claims with evidence.

---

## 2. Design System

### 2.1 Color Palette

**Primary Colors:**
- **Navy Blue** `#1a365d` — Trust, professionalism, authority
- **Bright Teal** `#0891b2` — Innovation, accessibility, action
- **Clean White** `#ffffff` — Clarity, minimalism

**Accent Colors:**
- **Success Green** `#059669` — Positive, compliance, go
- **Warning Orange** `#d97706` — Caution, risk awareness
- **Error Red** `#dc2626` — Stop, critical issues

**Neutral Gray Scale:**
- `#f9fafb` (bg-light)
- `#f3f4f6` (bg)
- `#e5e7eb` (border)
- `#9ca3af` (text-muted)
- `#374151` (text-default)
- `#111827` (text-dark)

**Contrast Testing:** All text/background combinations tested for WCAG AA (4.5:1 minimum)

### 2.2 Typography

**Font Family (System Stack for Performance):**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```
*Reason: Loads instantly, familiar to users, optimized for legibility*

**Type Scale:**
```
H1: 48px / 1.2 line-height (desktop)
H2: 32px / 1.3 line-height
H3: 24px / 1.4 line-height
Body: 16px / 1.6 line-height
Small: 14px / 1.5 line-height
Micro: 12px / 1.4 line-height
```

**Font Weights:**
- Regular: 400 (body text)
- Semibold: 600 (headings, emphasis)
- Bold: 700 (strong emphasis)

**Minimum Font Size:** 16px on mobile (prevents iOS zoom on form focus)

### 2.3 Spacing (8px Grid)

```
Small:   4px (xs)
Default: 8px (sm)
Medium:  16px (md)
Large:   24px (lg)
XL:      32px (xl)
2XL:     48px (2xl)
3XL:     64px (3xl)
```

**Example:** Button padding 12px (1.5 units), section padding 48px (6 units)

### 2.4 Components

#### Buttons
```
Primary (CTA):
  - Background: Teal (#0891b2)
  - Text: White
  - Padding: 12px 24px
  - Border radius: 6px
  - Hover: Darker teal (#0369a1)
  - Active: Even darker (#0555a1)
  - Focus visible: 2px outline in navy

Secondary (Alternative):
  - Background: Light gray (#f3f4f6)
  - Text: Navy (#1a365d)
  - Border: 1px solid #e5e7eb
  - Hover: Lighter gray (#f9fafb)

Disabled:
  - Opacity: 50%
  - Cursor: not-allowed
  - No focus state
```

#### Links
```
Color: Teal (#0891b2)
Underline: On hover/focus
Focus: 2px outline in navy, 4px padding
Icon: External link icon for off-site links
```

#### Cards
```
Background: White (#ffffff)
Border: 1px #e5e7eb
Border radius: 8px
Box shadow: 0 1px 3px rgba(0,0,0,0.1)
Padding: 24px (md/lg), 16px (sm)
Hover: Subtle shadow increase + slight scale
```

#### Forms
```
Input text:
  - Font size: 16px (prevents iOS zoom)
  - Padding: 12px 16px
  - Border: 2px #e5e7eb
  - Focus border: 2px teal
  - Border radius: 6px
  - Background: White
  - Min height: 44px

Label:
  - Always visible (not placeholder)
  - Font weight: 600
  - Top: margin 16px
  - Color: Navy (#1a365d)

Error:
  - Border color: Red (#dc2626)
  - Error message: Red text, 14px, below input
```

### 2.5 Images & Icons

**Rules:**
- All images optimized (WebP with JPG fallback)
- All `<img>` tags have descriptive alt text
- Icons from simple SVG library (no external deps)
- Max image width: 1200px (no oversized assets)
- Use `srcset` for responsive images

**Icon Style:**
- 2px stroke width
- 24×24px default size
- Consistent line style (not filled)
- Color: Inherit from parent text color

### 2.6 Responsive Breakpoints

```
Mobile:    < 640px
Tablet:    640px - 1024px
Desktop:   > 1024px
Large:     > 1280px
```

**Mobile-first approach:**
1. Design for mobile first (base styles)
2. Add tablet enhancements at 640px
3. Add desktop enhancements at 1024px
4. Do NOT hide content on mobile (always available)

### 2.7 Animations & Motion

**Rules:**
- Duration: 200-300ms (fast)
- Easing: `ease-out` for appearing elements, `ease-in` for leaving
- Prefers reduced motion: Disable all animations if `prefers-reduced-motion: reduce`
- No auto-playing animations or videos

**Examples:**
```css
/* Button hover */
transition: all 200ms ease-out;

/* Modal entrance */
animation: slideInDown 300ms ease-out;

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

---

## 3. Content Strategy

### 3.1 Language & Tone

**Not this (too technical):**
> "Our NLP-powered accessibility audit utilizes machine learning to detect WCAG 2.1 violations with 98% precision."

**Write this (business-focused):**
> "Know your accessibility risks before users find them. We scan your code and show you exactly what to fix."

### 3.2 Message Hierarchy

**For Business Decision-Makers (CEO, CTO, Legal):**
1. Problem: Why accessibility matters to YOUR business
2. Risk: What happens if you don't comply
3. Solution: What you get
4. Proof: Numbers, case studies, testimonials
5. Action: Call to action (book a demo, start free trial)

**For Developers:**
1. What it does (clear use cases)
2. How to use it (code examples)
3. What makes it special (comparison to alternatives)
4. How to integrate (installation, docs)
5. Support (GitHub issues, docs, community)

### 3.3 Jargon Translation

| Technical Term | Business Translation |
|----------------|----------------------|
| WCAG 2.1 Level AA | Accessibility standard required by law |
| A11y | Accessibility (easier for humans!) |
| Semantic HTML | Code structure that screen readers understand |
| Focus trap | Keep keyboard users from getting stuck |
| Keyboard navigation | Use the site with Tab key only |
| Alt text | Text description for images |
| Contrast ratio | Color brightness difference (for readability) |

### 3.4 Section Templates

#### Hero Section
- Clear headline (problem + solution)
- Sub-headline (benefit statement)
- Background: Simple gradient or pattern
- CTA button (primary action)
- No autoplay video or animations

#### Feature Section
- Icon or illustration
- Headline (what it does)
- 2-3 bullet points (benefits, not features)
- Real example or screenshot
- Scannable layout

#### Social Proof
- Customer logo or quote
- Metric or statistic
- Link to case study
- Keep it real (no fake testimonials)

#### Pricing/Plans
- Clear pricing tiers
- What's included (checkmarks)
- What's NOT included (honesty)
- Easy comparison
- CTAs for signup/contact

#### FAQ Section
- Common questions from prospects
- Short, direct answers
- Links to detailed docs for deep dives
- Organized by topic

---

## 4. Code Standards

### 4.1 HTML Best Practices

```html
<!-- Do this -->
<button type="button" aria-label="Close menu">×</button>
<h1>Page Title</h1>
<a href="/docs">Documentation</a>
<img src="logo.svg" alt="B1C3 Logo" width="200" height="60" />

<!-- NOT this -->
<div onclick="closeMenu()">×</div>
<div class="title">Page Title</div>
<a href="/docs" target="_blank">Documentation</a>
<img src="logo.svg" />
```

### 4.2 CSS Standards

```css
/* Mobile-first */
.button {
  padding: 12px 24px;
  font-size: 16px;
}

/* Tablet and up */
@media (min-width: 640px) {
  .button {
    padding: 16px 32px;
  }
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4.3 JavaScript Best Practices

```javascript
// Progressive enhancement: works without JS
// - Forms work with HTML5 validation
// - Links navigate normally
// - Content is readable without JS

// Only use JS for enhancements:
// - Form validation feedback
// - Modal interactions
// - Search filtering
// - Analytics

// Never:
// - Hide critical content behind JS
// - Require JS for basic navigation
// - Make JavaScript-only forms
```

### 4.4 Performance Optimization

```html
<!-- Critical CSS inline -->
<style>/* Critical styles only */</style>

<!-- Defer non-critical scripts -->
<script src="analytics.js" defer></script>

<!-- Preload critical resources -->
<link rel="preload" href="/fonts/system-font.woff2" as="font" />

<!-- Lazy load images -->
<img src="hero.webp" alt="..." loading="lazy" />

<!-- Optimize images -->
<picture>
  <source srcset="image.webp" type="image/webp" />
  <source srcset="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="..." />
</picture>
```

---

## 5. Testing & Quality Assurance

### 5.1 Accessibility Testing

- [ ] WAVE tool (WebAIM)
- [ ] Lighthouse accessibility audit (>90 score)
- [ ] Keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- [ ] Screen reader testing (NVDA on Windows, VoiceOver on Mac)
- [ ] Color contrast check (WCAG AA minimum)
- [ ] Focus indicators visible
- [ ] No keyboard traps

### 5.2 Performance Testing

- [ ] Google Lighthouse (>90 for all metrics)
- [ ] WebPageTest (FCP < 1.5s, LCP < 2.5s)
- [ ] Mobile performance (test on throttled 4G)
- [ ] Image optimization (WebP + JPG)
- [ ] JavaScript bundle size (< 50KB gzipped)

### 5.3 Usability Testing

- [ ] Task completion rate (can users find what they need?)
- [ ] A/B testing CTAs
- [ ] Heat mapping (Hotjar, Clarity)
- [ ] Real user feedback (surveys, user interviews)
- [ ] Mobile usability (test on real devices)

### 5.4 Cross-Browser Testing

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android)

---

## 6. Governance & Maintenance

### 6.1 Design System Updates
- Changes documented in version control
- Breaking changes require stakeholder approval
- Deprecation warnings for 2 versions before removal
- Regular audits (quarterly) for compliance

### 6.2 Content Updates
- Review messaging quarterly against market feedback
- Update testimonials and case studies annually
- Keep pricing current
- Archive outdated blog posts instead of deleting

### 6.3 Performance Monitoring
- Weekly Lighthouse audits (automated CI/CD)
- Monthly user metrics review
- Quarterly accessibility audit
- Annual security review

---

## 7. Examples: Good vs. Bad

### Example 1: Form Validation

**❌ Bad:**
```html
<input type="email" placeholder="Email address" />
<!-- No label, no error handling, broken on mobile (16px required) -->
```

**✅ Good:**
```html
<label for="email">Email address</label>
<input 
  id="email" 
  type="email" 
  name="email"
  required
  aria-required="true"
  aria-describedby="email-error"
  minlength="5"
/>
<p id="email-error" role="alert" aria-live="polite"></p>
```

### Example 2: Hero Section

**❌ Bad:**
```html
<div style="background: url(bg.jpg); height: 100vh;">
  <h1 style="color: #333;">Welcome</h1>
  <video autoplay muted><source src="video.mp4"></video>
</div>
<!-- No semantic meaning, autoplay video, no alt text, poor contrast -->
```

**✅ Good:**
```html
<section class="hero" style="background: linear-gradient(to right, #1a365d, #0891b2);">
  <div class="hero__content">
    <h1>Accessibility isn't optional—it's the law</h1>
    <p>Reduce compliance risk with pre-audited utilities</p>
    <a href="/try-free" class="button button--primary">Start Free Trial</a>
  </div>
</section>
```

### Example 3: Navigation

**❌ Bad:**
```html
<nav>
  <div onclick="navigate('/about')">About</div>
  <div onclick="navigate('/pricing')">Pricing</div>
  <div onclick="navigate('/contact')">Contact</div>
</nav>
<!-- Links are divs, keyboard inaccessible, poor semantics -->
```

**✅ Good:**
```html
<nav aria-label="Main navigation">
  <a href="/about" class="nav__link">About</a>
  <a href="/pricing" class="nav__link">Pricing</a>
  <a href="/contact" class="nav__link">Contact</a>
</nav>
```

---

## 8. Checklist for New Pages

Before launching any new web page, verify:

### Content
- [ ] Headline answers "why should I care?"
- [ ] No unnecessary jargon
- [ ] Clear value proposition in first 2 seconds
- [ ] Real data/metrics (not marketing fluff)
- [ ] Call to action is obvious

### Design
- [ ] Mobile-first responsive design
- [ ] All images optimized and have alt text
- [ ] Color contrast 4.5:1 minimum
- [ ] Touch targets 48×48px minimum
- [ ] Consistent with design system

### Accessibility
- [ ] WAVE audit passes
- [ ] Lighthouse accessibility > 90
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader tested

### Performance
- [ ] Lighthouse performance > 90
- [ ] FCP < 1.5s, LCP < 2.5s
- [ ] Total size < 200KB
- [ ] No layout shifts (CLS < 0.1)
- [ ] Works on 4G throttled network

### Testing
- [ ] Tested on mobile, tablet, desktop
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Form validation works
- [ ] Links are correct
- [ ] No console errors

---

## 9. Resources & References

- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **WebAIM Tools:** https://webaim.org/tools/
- **Color Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Google Lighthouse:** https://developers.google.com/web/tools/lighthouse
- **Web Almanac:** https://web.almanac.sh/ (web standards data)
- **A11y Project Checklist:** https://www.a11yproject.com/checklist/

---

**Last Updated:** February 6, 2026  
**Next Review:** May 6, 2026  
**Owner:** B1C3 Product Team
