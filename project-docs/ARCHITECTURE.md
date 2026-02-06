# B1C3 UX Tools Architecture

## Overview
B1C3 UX Tools is a shared, dependency-light library of UX utilities and patterns for the B1C3 ecosystem. It provides reusable components, accessibility helpers, and design tokens.

## Core Components

### Utility Modules

#### DOM Utilities (`src/dom.ts`)
- Query and manipulation helpers
- Event delegation
- Class and attribute management
- Traversal utilities

#### Focus Management (`src/focus.ts`)
- Focus trap implementation
- Focus restoration
- Focus visible polyfill
- Keyboard navigation helpers

#### Validation (`src/validation.ts`)
- Schema validation utilities
- Type guards and narrowing
- Custom validators
- Error formatting

#### General Utils (`src/utils.ts`)
- Type helpers and guards
- String manipulation
- Array/object utilities
- Common algorithm implementations

### Documentation & Governance

#### Development Standards
- **[DX_CONVENTIONS.md](DX_CONVENTIONS.md)** — API design patterns, naming, style guide
- **[ACCESSIBILITY_CHECKLIST.md](ACCESSIBILITY_CHECKLIST.md)** — Testing and WCAG compliance
- **[DOCUMENTATION_INFRASTRUCTURE.md](DOCUMENTATION_INFRASTRUCTURE.md)** — Auto-generated docs setup

#### Project Strategy
- **[UX_STRATEGY.md](../UX_STRATEGY.md)** — Overall DX, accessibility, and documentation strategy

## Technology Stack

- **Language**: TypeScript for static type safety
- **Build**: Vitest for testing, TypeScript compiler for transpilation
- **Package Manager**: npm
- **Testing**: Vitest + jsdom for unit tests
- **Documentation**: JSDoc comments + generated API docs

## Package Structure

```
src/
  ├── dom.ts          (DOM utilities)
  ├── focus.ts        (Focus management)
  ├── validation.ts   (Validation helpers)
  ├── utils.ts        (General utilities)
  ├── index.ts        (Public exports)
  └── __tests__/      (Unit tests)

docs/
  ├── DX_CONVENTIONS.md
  ├── ACCESSIBILITY_CHECKLIST.md
  └── DOCUMENTATION_INFRASTRUCTURE.md

examples/
  └── real-world-integration.ts
```

## Design Principles

1. **Minimal Dependencies** — Max developer happiness with minimal overhead
2. **Tree-shakeable** — Only bundle what you use
3. **Accessible First** — WCAG compliance built into components
4. **Strongly Typed** — Full TypeScript support with inference
5. **Small Bundle Size** — Utilities, not frameworks

## Development Workflow

1. **Develop** — Write utility functions with JSDoc
2. **Test** — Unit tests in `__tests__/`
3. **Document** — Auto-generated API docs from JSDoc
4. **Review** — Accessibility and DX review against standards
5. **Release** — Publish to npm with semantic versioning

## Testing Strategy

- **Unit tests** — `vitest` for synchronous utility testing
- **DOM tests** — `jsdom` for DOM manipulation tests
- **Accessibility tests** — Manual review + axe-core where applicable
- **Integration** — Real-world examples in `examples/`

## Export Strategy

- **Default export** — Not used (named exports only)
- **Named exports** — Tree-shakeable individual utilities
- **TypeScript types** — Exported with source code

## Future Enhancements

- [ ] Interactive playground/demo site
- [ ] Storybook for component discovery
- [ ] Automated accessibility audits (axe-core)
- [ ] Visual regression testing
- [ ] Performance benchmarking

