# Accessibility Checklist

WCAG 2.1 AA compliance checklist for B1C3 UX Tools development.

## Automated Testing

### Color Contrast
- [ ] All text meets 4.5:1 contrast ratio (3:1 for large text)
- [ ] Focus indicators meet 3:1 contrast against background
- [ ] Error states provide sufficient contrast
- [ ] Link text contrast in all states (normal, hover, focus, visited)

### Keyboard Navigation
- [ ] All interactive elements reachable via Tab key
- [ ] Logical tab order matches visual layout
- [ ] No keyboard traps (can Tab out of all containers)
- [ ] Custom widgets support arrow key navigation
- [ ] Escape key closes modals/dropdowns

### Screen Reader Support
- [ ] All images have alt text or are decorative
- [ ] Form inputs have associated labels
- [ ] Dynamic content announced to screen readers
- [ ] Focus changes announced appropriately
- [ ] ARIA attributes used correctly (not overused)

## Manual Testing

### Visual Inspection
- [ ] Focus indicators are clearly visible
- [ ] Text is readable at default browser zoom
- [ ] Color is not the only way information is conveyed
- [ ] Interactive elements have sufficient touch targets (44px minimum)
- [ ] Content doesn't require horizontal scrolling on mobile

### Screen Reader Testing
- [ ] JAWS + Chrome/Edge
- [ ] NVDA + Firefox
- [ ] VoiceOver + Safari (macOS)
- [ ] TalkBack + Chrome (Android)
- [ ] VoiceOver + Safari (iOS)

### Keyboard Testing
- [ ] Tab through entire interface
- [ ] Shift+Tab backwards navigation
- [ ] Enter/Space to activate controls
- [ ] Arrow keys for custom widgets
- [ ] Keyboard shortcuts don't conflict with screen readers

## Code Review Checklist

### HTML/Semantic
- [ ] Semantic elements used appropriately (`<button>`, `<input>`, `<nav>`)
- [ ] Heading hierarchy is logical (h1 → h2 → h3, no skipping)
- [ ] Form structure with `<fieldset>` and `<legend>` for groups
- [ ] Table headers associated with data cells
- [ ] List items properly nested in `<ul>`, `<ol>`, or `<dl>`

### ARIA Implementation
- [ ] ARIA used only when semantic elements insufficient
- [ ] Required ARIA attributes present (`aria-label`, `aria-labelledby`)
- [ ] ARIA relationships correct (`aria-describedby`, `aria-controls`)
- [ ] ARIA live regions for dynamic content (`aria-live`)
- [ ] ARIA expanded/collapsed states for disclosure widgets

### Focus Management
- [ ] Focus programmatically managed in SPAs
- [ ] Focus returned to trigger element after modal close
- [ ] Focus trapped in modals during interaction
- [ ] Skip links provided for keyboard users
- [ ] Focus not moved unexpectedly on page load

### Error Handling
- [ ] Form errors associated with inputs (`aria-describedby`)
- [ ] Error messages clearly visible and descriptive
- [ ] Multiple error formats (text, icon, color)
- [ ] Errors announced to screen readers

## Browser/Device Testing

### Desktop Browsers
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

### Mobile Browsers
- [ ] iOS Safari 14+
- [ ] Chrome Android 90+
- [ ] Samsung Internet 15+

### Assistive Technology
- [ ] Screen readers (JAWS, NVDA, VoiceOver, TalkBack)
- [ ] Screen magnification software
- [ ] Voice control software
- [ ] Switch control devices

## Performance & Reliability

### Loading Performance
- [ ] No accessibility features block page rendering
- [ ] ARIA attributes don't cause layout shifts
- [ ] Focus management doesn't impact scroll performance
- [ ] Color scheme detection doesn't delay rendering

### Error Boundaries
- [ ] Accessibility features degrade gracefully
- [ ] Screen reader users not left without functionality
- [ ] Keyboard navigation works even when JavaScript fails
- [ ] Color contrast maintained in error states

## Documentation

### Developer Documentation
- [ ] Accessibility considerations documented for each component
- [ ] Keyboard interaction patterns explained
- [ ] Screen reader behavior described
- [ ] ARIA attribute usage justified

### User Documentation
- [ ] Keyboard shortcuts documented
- [ ] Screen reader instructions provided where needed
- [ ] Accessibility features highlighted in release notes
- [ ] Contact information for accessibility feedback</content>
<parameter name="filePath">c:\Users\lars-\Documents\B1C3\projects\b1c3-ux-tools\docs\ACCESSIBILITY_CHECKLIST.md