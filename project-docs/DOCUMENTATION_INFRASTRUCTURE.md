# Documentation Infrastructure Setup

Configuration and structure for auto-generated and maintainable documentation.

## Overview

The documentation system is built on:
- **TypeScript/JSDoc** for API documentation source
- **TypeDoc** for automated API reference generation
- **Markdown** for guides and examples
- **GitHub Pages** for hosting (optional)

---

## File Structure

```
b1c3-ux-tools/
├── README.md                    # Main entry point
├── docs/
│   ├── index.md                # Documentation home
│   ├── getting-started.md       # Quick start guide
│   ├── api-reference.md         # Auto-generated API docs (see TypeDoc)
│   ├── DX_CONVENTIONS.md        # Developer conventions
│   ├── ACCESSIBILITY_CHECKLIST.md
│   ├── examples/
│   │   ├── form-validation.md
│   │   ├── text-manipulation.md
│   │   └── dom-queries.md
│   ├── patterns/
│   │   ├── keyboard-navigation.md
│   │   ├── focus-management.md
│   │   └── error-handling.md
│   └── troubleshooting.md
├── src/
│   ├── index.ts                 # Main exports (documented with JSDoc)
│   └── utilities/
│       └── ...
└── CHANGELOG.md                 # Version history
```

---

## JSDoc to API Reference

Every exported function must have complete JSDoc documentation. This feeds into:

### Standard JSDoc Template

```typescript
/**
 * Brief one-sentence description.
 *
 * Longer explanation of what the utility does, when to use it,
 * and any important context for developers.
 *
 * @param paramName - Parameter description
 * @param optionalParam - Optional parameter description (include default)
 * @returns Description of return value
 * @throws {ErrorType} When and why this error is thrown
 *
 * @example
 * ```typescript
 * // Basic usage
 * const result = myUtility("input")
 * console.log(result) // outputs: "expected result"
 * ```
 *
 * @example
 * ```typescript
 * // Advanced usage with options
 * const advanced = myUtility("input", { verbose: true })
 * ```
 *
 * @accessibility
 * - Keyboard navigable: Yes/No
 * - Screen reader support: Yes/No
 * - Respects prefers-reduced-motion: Yes/No
 *
 * @since 0.1.0
 */
export function myUtility(input: string): string {
  return input
}
```

### Key JSDoc Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `@param` | Parameter documentation | `@param name - The user's name` |
| `@returns` | Return value description | `@returns The computed value` |
| `@throws` | Error documentation | `@throws {Error} If input is invalid` |
| `@example` | Code examples | Triple-backtick code block |
| `@accessibility` | A11y considerations | Bullet list of a11y features |
| `@since` | Version introduced | `@since 0.1.0` |
| `@deprecated` | Mark as deprecated | `@deprecated Use newFunction() instead` |

---

## TypeDoc Setup

Generate API reference from TypeScript/JSDoc automatically.

### Installation

```bash
npm.cmd install --save-dev typedoc typedoc-plugin-markdown
```

### Configuration (typedoc.json)

```json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs/api-generated",
  "plugin": ["typedoc-plugin-markdown"],
  "readme": "none",
  "excludePrivate": true,
  "excludeProtected": true,
  "excludeExternals": true,
  "hideGenerator": true,
  "sort": ["source-order"],
  "includeVersion": true
}
```

### npm Script

Add to `package.json`:

```json
{
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts --sourcemap --clean",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "docs": "typedoc"
  }
}
```

Run with:
```bash
npm.cmd run docs
```

---

## Documentation Pages

### 1. Main README.md

Purpose: Project overview, quick start, key features

Structure:
```markdown
# B1C3 UX Tools

## Overview
- What is it?
- Who should use it?

## Quick Start
- Installation
- Basic example (copy-paste ready)

## Key Features
- Feature 1
- Feature 2

## Documentation Links
- [Getting Started](docs/getting-started.md)
- [API Reference](docs/api-reference.md)
- [Examples](docs/examples/)

## Contributing
- How to add utilities
- Standards and checklist

## License
```

### 2. docs/index.md

Purpose: Documentation home page

```markdown
# Documentation

- [Getting Started](getting-started.md) - Installation and first utility
- [API Reference](api-reference.md) - Complete function reference
- [Examples](examples/) - Real-world usage patterns
- [Patterns & Best Practices](patterns/) - Design patterns
- [Troubleshooting](troubleshooting.md) - Common issues and solutions
- [Contributing](../CONTRIBUTING.md) - How to add utilities
```

### 3. docs/getting-started.md

```markdown
# Getting Started

## Installation

```bash
npm.cmd install b1c3-ux-tools
```

## Your First Utility

### Example: Validate an Email

```typescript
import { validateEmail } from 'b1c3-ux-tools'

const isValid = validateEmail('user@example.com')
console.log(isValid) // true
```

## Next Steps
- Browse the [API Reference](api-reference.md)
- Explore [Examples](examples/)
- Read [DX Conventions](DX_CONVENTIONS.md) if contributing
```

### 4. docs/examples/

Create example files grouped by category:

**docs/examples/form-validation.md:**
```markdown
# Form Validation Examples

Common patterns for validating form inputs using B1C3 UX Tools.

## Email Validation

```typescript
import { validateEmail } from 'b1c3-ux-tools'

const email = "user@example.com"
if (validateEmail(email)) {
  submitForm()
} else {
  showError("Invalid email address")
}
```

[See full example](../api-reference.md#validateEmail)
```

### 5. docs/patterns/

Document common patterns and best practices:

**docs/patterns/keyboard-navigation.md:**
```markdown
# Keyboard Navigation Patterns

Guidelines for making utilities keyboard accessible.

## Tab Order

Always maintain a logical tab order following visual layout...

## Example: Custom Button

```typescript
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
  Click me
</button>
```
```

### 6. CHANGELOG.md

Track all changes and breaking updates:

```markdown
# Changelog

All notable changes to B1C3 UX Tools are documented here.

## [Unreleased]

## [0.2.0] - 2026-02-20

### Added
- `validateEmail()` function for email validation
- `truncateText()` utility with word boundary support
- New `@accessibility` section in JSDoc template

### Fixed
- Focus trap now correctly releases on unmount
- Color contrast ratio in documentation examples

### Changed
- Renamed `checkEmail()` to `validateEmail()`

### Breaking Changes
- **BREAKING:** `checkEmail()` has been removed. Use `validateEmail()` instead.
- **BREAKING:** Changed return type of `parseColor()` from array to object

## [0.1.0] - 2026-02-01

### Added
- Initial release
- `helloUxTools()` placeholder function
```

---

## Searchability & Discovery

### 1. Utility Catalog

Create a searchable index (docs/utilities-index.md):

```markdown
# Utility Catalog

| Function | Category | Use Case |
|----------|----------|----------|
| `validateEmail()` | Form | Validate email addresses |
| `truncateText()` | String | Limit text display length |
| `clamp()` | Number | Constrain number between min/max |
| `useFocusTrap()` | Hooks | Manage focus in modals |

## By Category

### Form Utilities
- [validateEmail](api-reference.md#validateEmail)
- [validatePhone](api-reference.md#validatePhone)

### String Utilities
- [truncateText](api-reference.md#truncateText)
- [capitalize](api-reference.md#capitalize)

### Number Utilities
- [clamp](api-reference.md#clamp)
- [round](api-reference.md#round)

### Accessibility
- [useFocusTrap](api-reference.md#useFocusTrap)
```

### 2. Search Implementation

For GitHub Pages or static sites:
- Use [Algolia DocSearch](https://docsearch.algolia.com/) (free for open source)
- Or [MkDocs](https://www.mkdocs.org/) built-in search
- Or simple `Ctrl+F` with good page organization

### 3. Tags/Labels

Add search tags to JSDoc:

```typescript
/**
 * Validates an email address.
 *
 * Tags: email, form, validation, regex
 *
 * ...
 */
export function validateEmail(email: string): boolean {
  // ...
}
```

---

## CI/CD Integration

### Auto-Generate Docs on Release

Add to `.github/workflows/docs.yml`:

```yaml
name: Generate Documentation

on:
  push:
    branches: [main]
  release:
    types: [published]

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm.cmd ci
      - run: npm.cmd run docs
      - uses: actions/upload-artifact@v3
        with:
          name: api-docs
          path: docs/api-generated/
```

---

## Documentation Checklist

For every new utility:

- [ ] JSDoc comment added with all required fields
- [ ] `@example` section includes at least one practical example
- [ ] `@accessibility` section completed
- [ ] Example added to appropriate docs/examples/ file
- [ ] Utility added to utilities-index.md
- [ ] CHANGELOG.md updated
- [ ] API docs regenerated (`npm.cmd run docs`)
- [ ] Documentation builds without errors
- [ ] Links work correctly
- [ ] Examples are copy-paste ready and tested

---

## Maintenance

### Regular Updates
- Monthly review of documentation quality
- Remove outdated examples
- Update links after major changes
- Check for broken code snippets

### Metrics
- Track documentation views (if possible)
- Monitor search queries
- Collect user feedback on clarity

### Deprecation Process
1. Add `@deprecated` tag in JSDoc
2. Add note in CHANGELOG
3. Keep working for 2 major versions
4. Remove in version 3+
