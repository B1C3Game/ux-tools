# B1C3 UX Tools: Core Utilities Implementation Plan

**Phase 2 Roadmap:** February 6-March 20, 2026

## Core Utilities to Implement (Priority Order)

### Category 1: Form Validation (3 utilities)
1. **isValidEmail(email: string): boolean**
   - Checks email format validity
   - Accessibility: Pure function (no DOM side effects)
   - Test case: valid/invalid emails, edge cases (unicode, +, etc.)

2. **isValidUrl(url: string): boolean**
   - Checks URL format validity
   - Accessibility: Pure function
   - Test case: http/https, paths, query params

3. **sanitizeInput(input: string, options?: SanitizeOptions): string**
   - Removes XSS vectors, whitespace, special chars
   - Accessibility: Can preserve unicode for international text
   - Test case: script tags, html entities, unicode

### Category 2: DOM & Text Utilities (3 utilities)
4. **measureTextWidth(text: string, fontSize: number, fontFamily?: string): number**
   - Calculates text width for truncation/layout decisions
   - Accessibility: DOM-dependent (requires canvas)
   - Test case: various fonts, sizes, unicode

5. **truncateText(options: {text: string, maxLength: number, ellipsis?: string}): string**
   - Truncates text with ellipsis, respects word boundaries
   - Accessibility: Returns plain string (no DOM mutation)
   - Test case: short/long text, word vs char truncation

6. **getElementVisibleText(element: HTMLElement): string**
   - Gets text content excluding display:none elements
   - Accessibility: Respects screen reader visibility
   - Test case: nested elements, hidden content, special nodes

### Category 3: Focus & Keyboard (2 utilities)
7. **getFocusableElements(container: HTMLElement): HTMLElement[]**
   - Gets all keyboard-focusable elements
   - Accessibility: Respects tabindex, disabled state
   - Test case: buttons, inputs, links, custom tabindex

8. **useFocusTrap(containerRef: HTMLElement, options?: {returnFocus?: boolean}): void**
   - Traps focus within a container (modals, dropdowns)
   - Accessibility: Keyboard-only navigation, Escape to exit
   - Test case: tab cycling, escape key, return focus

### Category 4: Object/Array Utilities (2 utilities)
9. **clamp(value: number, min: number, max: number): number**
   - Constrains number to range [min, max]
   - Accessibility: Pure function
   - Test case: boundary values, negative numbers, floats

10. **debounce(callback: (value: unknown) => void, delayMs: number): (value: unknown) => void**
    - Delays function execution until after timeout
    - Accessibility: Important for a11y testing (delays screen reader announcements)
    - Test case: rapid calls, timing, cleanup

---

## Implementation Schedule

- **Week 1 (Feb 6-13):** Implement utilities 1-5, basic tests
- **Week 2 (Feb 13-20):** Implement utilities 6-10, complete tests, documentation
- **Week 3 (Feb 20-27):** Real-world testing, refinement, v0.1.0 prep
- **Week 4+ (Feb 27+):** Launch, gather feedback, Phase 2B planning

---

## Testing Strategy

Each utility requires:
1. **Unit tests** (vitest/jest) - pure function behavior
2. **Type safety tests** - TypeScript compilation
3. **Accessibility tests** - WCAG compliance (where applicable)
4. **Edge cases** - boundary values, invalid inputs
5. **Real-world tests** - integrated into sample projects

---

## Definition of Done (per utility)
- ✅ Implementation complete with full JSDoc
- ✅ 100% test coverage (unit + types)
- ✅ Accessibility checklist completed
- ✅ No external dependencies (except @types/node for React utilities)
- ✅ Proper error handling (throws vs returns null)
- ✅ Auto-generated API docs (TypeDoc)
