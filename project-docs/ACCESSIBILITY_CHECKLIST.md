# Accessibility Checklist & Testing Guide

Standards and procedures for ensuring all utilities meet WCAG 2.1 Level AA accessibility requirements.

## Pre-Development Checklist

Before implementing a new utility, ask:

- [ ] **Is this utility DOM-interactive?** (needs keyboard, focus management)
- [ ] **Does it involve color?** (needs contrast ratio testing)
- [ ] **Does it involve timing/animation?** (needs `prefers-reduced-motion` support)
- [ ] **Is it form-related?** (needs proper labels and error messaging)
- [ ] **Does it display content dynamically?** (needs aria-live regions)

---

## Testing Standards

### 1. Keyboard Navigation

**Requirement:** All interactive utilities must be fully navigable with keyboard.

**Test Procedures:**
- [ ] Tab through all interactive elements in logical order
- [ ] Shift+Tab reverse navigation works correctly
- [ ] No keyboard traps (user can escape any element)
- [ ] Enter/Space keys trigger actions appropriately
- [ ] Arrow keys work for applicable components (menus, sliders, etc.)

**Tools:**
- Manual testing: Use Tab, Shift+Tab, Enter, Space, Arrows
- Document test results in PR

**Example Test Case:**
```typescript
describe('useFocusTrap', () => {
  it('should trap focus within container using tab navigation', () => {
    // User presses Tab repeatedly - focus should cycle within trap
  })

  it('should allow escape to exit trap', () => {
    // User presses Escape - trap should deactivate
  })
})
```

### 2. Screen Reader Testing

**Requirement:** All content and interactive elements must be announced correctly to screen readers.

**Test Procedures:**
- [ ] Tested with NVDA (Windows) or VoiceOver (macOS)
- [ ] All interactive elements are announced with purpose
- [ ] Form labels and error messages are associated correctly
- [ ] Live regions use proper `aria-live` attributes
- [ ] Hidden decorative elements use `aria-hidden="true"`

**Tools:**
- **Windows:** NVDA (free, open-source)
- **macOS:** VoiceOver (built-in)
- **Chrome:** ChromeVox extension
- **Browser DevTools:** Accessibility Tree inspector

**Checklist for Interactive Elements:**
```html
<!-- ✅ Good - Clear semantic role and label -->
<button aria-label="Close menu" onclick="closeMenu()">×</button>

<!-- ❌ Bad - No accessible name -->
<div onclick="closeMenu()">×</div>

<!-- ✅ Good - Form field with associated label -->
<label for="email">Email Address</label>
<input id="email" type="email" required />

<!-- ❌ Bad - Label not associated -->
<label>Email Address</label>
<input type="email" required />
```

### 3. Color Contrast

**Requirement:** Text must have at least 4.5:1 contrast ratio (WCAG AA standard).

**Test Procedures:**
- [ ] All text passes 4.5:1 minimum contrast ratio
- [ ] Large text (18pt+) passes 3:1 minimum contrast
- [ ] Color alone is not used to convey information (add patterns, icons, text)

**Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Axe DevTools](https://www.deque.com/axe/devtools/) (browser extension)
- [Polypane](https://polypane.app/) (built-in contrast checking)

**Test Example:**
```
Primary Text (#333333) on White (#FFFFFF)
Contrast Ratio: 12.6:1 ✅ (exceeds 4.5:1)

Button Text (#666666) on Light Gray (#EEEEEE)
Contrast Ratio: 3.8:1 ❌ (fails 4.5:1, needs adjustment)
```

### 4. Motion & Animation

**Requirement:** Utilities must respect `prefers-reduced-motion` media query.

**Test Procedures:**
- [ ] Tested with `prefers-reduced-motion: reduce` enabled
- [ ] Animations are disabled or significantly reduced
- [ ] Content is still accessible without animation
- [ ] Essential transitions still work (modals appearing, etc.)

**Test Code:**
```typescript
describe('fadeInAnimation', () => {
  it('should disable animation when prefers-reduced-motion is set', () => {
    // Setup: matchMedia('(prefers-reduced-motion: reduce)').matches = true
    // Element should appear instantly without animation
    // duration should be 0ms
  })

  it('should animate normally when prefers-reduced-motion is not set', () => {
    // Element should fade in over 300ms
  })
})
```

**CSS Implementation:**
```css
/* ✅ Good - respects prefers-reduced-motion */
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@media (prefers-reduced-motion: reduce) {
  .fade-in {
    animation: none;
    opacity: 1;
  }
}

/* ❌ Bad - ignores user preference */
.fade-in {
  animation: fadeIn 0.3s ease-in;  /* always animates */
}
```

### 5. Focus Management

**Requirement:** Focus indicators must be visible and meet contrast requirements.

**Test Procedures:**
- [ ] Focus ring is visible and has sufficient contrast
- [ ] Focus ring is not removed without replacement
- [ ] Focus order follows logical document flow
- [ ] Focus is managed correctly in modals/overlays

**Test Example:**
```css
/* ✅ Good - custom focus style with high contrast */
button:focus-visible {
  outline: 3px solid #0066CC;
  outline-offset: 2px;
}

/* ❌ Bad - focus removed with no replacement */
button:focus {
  outline: none;  /* Violates accessibility */
}
```

### 6. Form Accessibility

**Requirement:** All form utilities must be properly labeled and have error handling.

**Test Procedures:**
- [ ] Each input has associated `<label>` element
- [ ] Error messages are associated with input via `aria-describedby`
- [ ] Required fields are marked with `required` attribute or `aria-required="true"`
- [ ] Form can be submitted via keyboard
- [ ] Error messages are announced to screen readers

**Example:**
```html
<!-- ✅ Good -->
<label for="password">Password</label>
<input
  id="password"
  type="password"
  required
  aria-describedby="password-hint password-error"
/>
<p id="password-hint" class="hint">Must be at least 12 characters</p>
<p id="password-error" role="alert" class="error" aria-live="polite"></p>

<!-- ❌ Bad -->
<input type="password" placeholder="Password" />
<span>Error: Password too short</span>
```

---

## Automated Testing Tools

### Setup & Configuration

1. **axe-core** - Automated accessibility testing
```bash
npm.cmd install --save-dev @axe-core/react
```

2. **jest-axe** - Jest integration
```bash
npm.cmd install --save-dev jest-axe
```

### Example Test Integration

```typescript
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('MyButton component', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<MyButton>Click me</MyButton>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

---

## Documentation Requirements

Every utility with accessibility considerations must include:

```typescript
/**
 * My accessible utility.
 *
 * @accessibility
 * - ✅ Fully keyboard navigable (Tab, Shift+Tab, Enter, Space)
 * - ✅ Announces correctly to screen readers (ARIA labels included)
 * - ✅ Respects prefers-reduced-motion
 * - ✅ Focus indicators are visible (3px outline, 4.5:1 contrast)
 * - ✅ Form labels are properly associated
 */
export function myUtility() {
  // ...
}
```

---

## PR Review Checklist

When reviewing PRs that add utilities, verify:

**Accessibility Review:**
- [ ] Automated tests pass (axe, etc.)
- [ ] Manual keyboard navigation tested ✓
- [ ] Screen reader tested (NVDA/VoiceOver)
- [ ] Color contrast verified (4.5:1 minimum)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Focus management is correct
- [ ] Form fields properly labeled (if applicable)
- [ ] JSDoc includes `@accessibility` section
- [ ] No console accessibility warnings

**Documentation:**
- [ ] Accessibility considerations are documented
- [ ] Examples show accessible patterns
- [ ] Test coverage includes edge cases

---

## Resources & References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/)
- [A11ycasts by Google Chrome](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9Xc-RgEzwLvsPccXP)

---

## Reporting Accessibility Issues

If an accessibility issue is found:
1. Create issue with label `accessibility`
2. Include: affected utility, issue description, WCAG criterion violated
3. Assign to library maintainer
4. Priority: Fix before next release
