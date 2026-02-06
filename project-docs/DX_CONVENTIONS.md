# Developer Experience (DX) Conventions

Guidelines for creating consistent, intuitive utilities in the B1C3 UX Tools library.

## Naming Conventions

### Utility Functions
Use descriptive, verb-based names that clearly indicate what the utility does.

```typescript
// ✅ Good - clear intent
export function validateEmail(email: string): boolean
export function measureTextHeight(text: string, fontSize: number): number
export function clampValue(value: number, min: number, max: number): number

// ❌ Bad - vague or abbreviated
export function check(email: string): boolean
export function calc(text: string, size: number): number
export function limit(v: number, m: number, x: number): number
```

### Boolean Functions
Prefix boolean-returning functions with `is`, `has`, or `should`.

```typescript
// ✅ Good
export function isValidEmail(email: string): boolean
export function hasOpaqueBackground(element: HTMLElement): boolean
export function shouldTruncateText(text: string, maxLength: number): boolean

// ❌ Bad
export function validateEmail(email: string): boolean
export function checkBackground(element: HTMLElement): boolean
export function textNeedsTruncation(text: string, maxLength: number): boolean
```

### Hooks (React)
Prefix React hooks with `use`.

```typescript
// ✅ Good
export function useFocusTrap(ref: React.RefObject<HTMLElement>): void
export function useMediaQuery(query: string): boolean
export function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void): void

// ❌ Bad
export function focusTrap(ref: React.RefObject<HTMLElement>): void
export function mediaQuery(query: string): boolean
```

## Parameter Patterns

### Parameter Order
Place required parameters before optional ones. Use destructured objects for 3+ parameters.

```typescript
// ✅ Good - simple function
export function clamp(value: number, min: number, max: number): number

// ✅ Good - many parameters → use object
export function truncateText(options: {
  text: string
  maxLength: number
  ellipsis?: string  // optional, defaults to "..."
  truncateOn?: 'word' | 'char'  // optional, defaults to 'word'
}): string

// ❌ Bad - mixed required/optional
export function truncateText(
  text: string,
  maxLength?: number,
  ellipsis: string = "...",
  truncateOn: 'word' | 'char' = 'word'
): string
```

### Callback Parameters
Use descriptive callback names. Avoid generic names like `fn` or `cb`.

```typescript
// ✅ Good
export function debounce(
  callback: (value: string) => void,
  delay: number
): (value: string) => void

// ❌ Bad
export function debounce(fn: (value: string) => void, delay: number): Function
```

## Type Patterns

### Return Types
Always explicitly type return values. Use `readonly` for immutable data.

```typescript
// ✅ Good
export function parseColor(color: string): { r: number; g: number; b: number }

export function getThemeTokens(): readonly string[]

// ❌ Bad
export function parseColor(color: string) {
  return { r: 0, g: 0, b: 0 }
}

export function getThemeTokens() {
  return ['primary', 'secondary']
}
```

### Error Handling
- Return `null` or `undefined` for expected failures (missing config)
- Throw errors for unexpected failures (invalid input, programming errors)
- Document which behavior applies

```typescript
// ✅ Good
/**
 * Parses a color string to RGB values.
 * @throws {Error} If the color format is invalid
 */
export function parseColor(color: string): { r: number; g: number; b: number } {
  if (!isValidColorFormat(color)) {
    throw new Error(`Invalid color format: ${color}`)
  }
  // ...
}

/**
 * Gets user preference or null if not found.
 * @returns The preference value or null if not configured
 */
export function getUserPreference(key: string): string | null {
  return localStorage.getItem(key)
}
```

## JSDoc Documentation

Every exported function must have JSDoc documentation. Use this template:

```typescript
/**
 * Brief description of what the utility does.
 *
 * Longer explanation if needed, including use cases or important context.
 * 
 * @param paramName - Description of parameter
 * @returns Description of what is returned
 * @throws {Error} When this error is thrown and why
 * 
 * @example
 * ```typescript
 * const result = myUtility("input")
 * console.log(result) // outputs something
 * ```
 *
 * @accessibility
 * - Respects `prefers-reduced-motion` media query
 * - Works with keyboard-only navigation
 * - Provides proper ARIA labels
 */
export function myUtility(input: string): string {
  // ...
}
```

## File Organization

```
src/
├── index.ts                    # Main export file
├── utilities/                  # Standalone utility functions
│   ├── string/
│   │   ├── truncate.ts
│   │   └── capitalize.ts
│   ├── number/
│   │   ├── clamp.ts
│   │   └── round.ts
│   └── dom/
│       ├── measure.ts
│       └── query.ts
├── hooks/                      # React hooks (if applicable)
│   ├── useFocusTrap.ts
│   └── useMediaQuery.ts
└── types/                      # Shared type definitions
    └── index.ts
```

## Exports

The main `index.ts` should use named exports only. Avoid default exports.

```typescript
// ✅ Good
export { truncateText } from './utilities/string/truncate'
export { clamp } from './utilities/number/clamp'
export type { TruncateOptions } from './utilities/string/truncate'

// ❌ Bad
export { default as truncateText } from './utilities/string/truncate'
export * from './utilities'  // Too broad, hard to discover
```

## Testing Expectations

Every utility must have tests covering:
- ✅ Happy path with typical inputs
- ✅ Edge cases (empty strings, zero, null, undefined)
- ✅ Error cases (invalid input, expected exceptions)
- ✅ Accessibility implications (if DOM-related)

```typescript
describe('truncateText', () => {
  it('should truncate text when exceeding max length', () => {
    // happy path
  })

  it('should handle empty strings gracefully', () => {
    // edge case
  })

  it('should throw error for invalid max length', () => {
    // error case
  })
})
```

## Version & Changelog

When adding utilities:
1. Update version in `package.json` (semantic versioning)
2. Add entry to `CHANGELOG.md`
3. Document breaking changes prominently

Format:
```markdown
## [0.2.0] - 2026-02-15
### Added
- `truncateText()` utility for text truncation with word boundary support

### Fixed
- `validateEmail()` now correctly handles international domains

### Breaking Changes
- Removed deprecated `checkEmail()` function (use `validateEmail()` instead)
```

## Checklist for New Utilities

- [ ] Function has clear, descriptive name (verb-based for actions)
- [ ] All parameters are typed correctly
- [ ] Return type is explicitly defined
- [ ] Comprehensive JSDoc documentation added (with `@example`)
- [ ] `@accessibility` section completed (if DOM/UI related)
- [ ] Zero TypeScript errors in strict mode
- [ ] Utility is exported in main `index.ts`
- [ ] Tests cover happy path, edge cases, and errors
- [ ] No external dependencies (unless approved)
- [ ] Follows file organization patterns
- [ ] `CHANGELOG.md` updated
