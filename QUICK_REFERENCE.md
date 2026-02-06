# B1C3 UX Tools - Quick Reference

## Installation

```bash
npm install b1c3-ux-tools
```

## Usage

```typescript
import {
  // Validation
  isValidEmail,
  isValidUrl,
  sanitizeInput,
  
  // DOM & Text
  measureTextWidth,
  truncateText,
  getElementVisibleText,
  
  // Focus & Keyboard
  getFocusableElements,
  useFocusTrap,
  
  // Utilities
  clamp,
  debounce,
  throttle,
} from 'b1c3-ux-tools';
```

---

## Validation Utilities

### `isValidEmail(email: string): boolean`
Validates email address format (RFC 5322 simplified pattern)

```typescript
isValidEmail('user@example.com')      // ✓ true
isValidEmail('user+tag@example.co.uk') // ✓ true
isValidEmail('invalid-email')          // ✗ false
```

### `isValidUrl(url: string): boolean`
Validates HTTP/HTTPS URLs

```typescript
isValidUrl('https://example.com')           // ✓ true
isValidUrl('https://example.com/path?q=1') // ✓ true
isValidUrl('example.com')                   // ✗ false
```

### `sanitizeInput(input: string, options?): string`
Removes XSS vectors and normalizes whitespace

```typescript
sanitizeInput('<script>alert("xss")</script>')
// → &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;

sanitizeInput('  hello   world  ', { normalize: true })
// → 'hello world'
```

---

## DOM & Text Utilities

### `measureTextWidth(text: string, fontSize: number, fontFamily?: string): number`
Calculates rendered text width (requires browser environment)

```typescript
const width = measureTextWidth('Hello World', 16, 'Arial')
// → ~95 (pixels)

// Use case: Check if text fits in container
if (measureTextWidth(text, 14) > containerWidth) {
  // Truncate text
}
```

### `truncateText(options): string`
Truncates strings with ellipsis

```typescript
truncateText({
  text: 'The quick brown fox jumps over the lazy dog',
  maxLength: 20,
  truncateOn: 'word'  // 'word' or 'char'
})
// → 'The quick brown fox...'
```

### `getElementVisibleText(element: HTMLElement): string`
Extracts visible text content (excludes `display:none`, etc)

```typescript
const container = document.querySelector('#form')
const visibleText = getElementVisibleText(container)
// → 'Name Email Phone Submit Cancel' (ignoring hidden elements)
```

---

## Focus & Keyboard Utilities

### `getFocusableElements(container: HTMLElement): HTMLElement[]`
Gets all keyboard-focusable elements

```typescript
const modal = document.querySelector('[role="dialog"]')
const focusable = getFocusableElements(modal)
// → [HTMLButtonElement, HTMLInputElement, HTMLButtonElement]

// Use case: Implement focus trap or focus restoration
const firstFocusable = focusable[0]
const lastFocusable = focusable[focusable.length - 1]
```

### `useFocusTrap(container: HTMLElement, options?): () => void`
Traps keyboard focus within a container (modals, menus, etc)

```typescript
const modal = document.querySelector('[role="dialog"]')

// Activate trap
const cleanup = useFocusTrap(modal, { returnFocus: true })

// Later, when closing:
cleanup()  // Restores focus to previously-focused element
```

Behavior:
- **Tab** → cycles focus forward
- **Shift+Tab** → cycles focus backward
- **Escape** → exits trap (if enabled)

---

## General Utilities

### `clamp(value: number, min: number, max: number): number`
Constrains a number to a range

```typescript
clamp(5, 0, 10)   // → 5
clamp(-5, 0, 10)  // → 0
clamp(15, 0, 10)  // → 10

// Use case: Slider position
const position = clamp(mouseX, 0, sliderWidth)
```

### `debounce(callback: Function, delayMs: number): Function`
Delays function execution until after inactivity

```typescript
const handleSearch = debounce((query: string) => {
  fetch(`/api/search?q=${query}`)
}, 300)

// Caller
input.addEventListener('input', (e) => {
  handleSearch(e.target.value)
})
// Only executes if user stops typing for 300ms
```

### `throttle(callback: Function, intervalMs: number): Function`
Rate-limits function execution to once per interval

```typescript
const handleScroll = throttle(() => {
  updateLayout()
}, 100)

window.addEventListener('scroll', handleScroll)
// Executes at most once per 100ms
```

---

## Error Handling

All utilities throw descriptive errors for invalid input:

```typescript
try {
  isValidEmail(null)
} catch (e) {
  // Should return false, not throw
}

try {
  clamp(5, 10, 0)  // min > max
} catch (e) {
  console.error(e.message)
  // → "min must be less than or equal to max"
}
```

---

## Accessibility Features

| Utility | WCAG Compliance | Notes |
|---------|-----------------|-------|
| `isValidEmail` | N/A | Pure function |
| `sanitizeInput` | N/A | Prevents XSS |
| `truncateText` | 2.4.4 Link Purpose | Consider title/"Read more" |
| `measureTextWidth` | 1.4.4 Resize Text | Helps detect overflow |
| `getFocusableElements` | 2.1.1 Keyboard | Essential for keyboard nav |
| `useFocusTrap` | 2.1.2 No Keyboard Trap | Must provide escape method |
| `clamp` | N/A | Pure function |
| `debounce` | N/A | Improve performance |
| `throttle` | N/A | Improve performance |

---

## TypeScript Types

All utilities are fully typed:

```typescript
// Validation
function isValidEmail(email: string): boolean
function isValidUrl(url: string): boolean
interface SanitizeOptions {
  trim?: boolean
  normalize?: boolean
  preserveLineBreaks?: boolean
}
function sanitizeInput(input: string, options?: SanitizeOptions): string

// DOM
function measureTextWidth(
  text: string,
  fontSize: number,
  fontFamily?: string,
  fontWeight?: string
): number

interface TruncateOptions {
  text: string
  maxLength: number
  ellipsis?: string
  truncateOn?: 'word' | 'char'
}
function truncateText(options: TruncateOptions): string

function getElementVisibleText(element: HTMLElement): string

// Focus
function getFocusableElements(container: HTMLElement): HTMLElement[]

interface FocusTrapOptions {
  returnFocus?: boolean
  escapeKey?: boolean
}
function useFocusTrap(
  container: HTMLElement,
  options?: FocusTrapOptions
): () => void

// Utils
function clamp(value: number, min: number, max: number): number
function debounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delayMs: number
): (...args: Parameters<T>) => void
function throttle<T extends (...args: unknown[]) => void>(
  callback: T,
  intervalMs: number
): (...args: Parameters<T>) => void
```

---

## Performance Notes

| Utility | Performance | Notes |
|---------|-------------|-------|
| `isValidEmail` | O(1) | Regex pattern match |
| `isValidUrl` | O(1) | URL constructor |
| `sanitizeInput` | O(n) | String iterations |
| `measureTextWidth` | O(1) | Canvas measurement |
| `truncateText` | O(n) | String search |
| `getElementVisibleText` | O(n) | DOM traversal |
| `getFocusableElements` | O(n) | DOM selector |
| `useFocusTrap` | O(1) | Event listener |
| `clamp` | O(1) | Math operations |
| `debounce` | O(1) | Timer scheduling |
| `throttle` | O(1) | Timer scheduling |

---

## Browser Support

- **Modern browsers:** Chrome, Firefox, Safari 12+, Edge 79+
- **Node.js:** 16.0+
- **Bundle size:** 8KB (ESM), 9.4KB (CJS)

---

## Contributing

Found a bug? Have a feature request?

1. Check the [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) for roadmap
2. Review [docs/DX_CONVENTIONS.md](docs/DX_CONVENTIONS.md) for code style
3. Check [docs/ACCESSIBILITY_CHECKLIST.md](docs/ACCESSIBILITY_CHECKLIST.md) for a11y requirements
4. Submit issue or PR on GitHub

---

## License

MIT (see LICENSE file)

---

**Need help?** See the full documentation in [README.md](README.md) or check individual utility JSDoc comments.
