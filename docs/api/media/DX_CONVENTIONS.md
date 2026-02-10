# DX Conventions

Developer experience standards and patterns for B1C3 UX Tools.

## API Design Principles

### Function Signatures
- **Pure functions preferred**: No side effects unless explicitly documented
- **Consistent parameter order**: `(value, options)` or `(target, config)`
- **Options objects**: Use for optional parameters with defaults
- **TypeScript first**: Full type safety with exported interfaces

### Error Handling
- **Descriptive errors**: Include context and expected values
- **Type checking**: Validate input types and throw early
- **No silent failures**: Always provide feedback for invalid usage

### Naming Conventions
- **camelCase** for functions and variables
- **PascalCase** for types and interfaces
- **kebab-case** for CSS custom properties
- **Descriptive names**: `isValidEmail` not `validateEmail`

## Code Quality Standards

### JSDoc Requirements
- **Complete coverage**: Every exported function/type
- **@since tags**: Version when feature was added
- **@example blocks**: Practical usage examples
- **@accessibility notes**: A11y implications and best practices
- **@throws documentation**: All possible error conditions

### Testing
- **Unit tests**: All public APIs
- **Edge cases**: Invalid inputs, boundary conditions
- **Accessibility testing**: Screen reader compatibility
- **Cross-browser**: Modern browser support

### Performance
- **No DOM queries in loops**: Cache element references
- **Debounce/throttle**: For high-frequency events
- **Memory management**: Clean up event listeners/timeouts

## Accessibility Standards

### WCAG 2.1 AA Compliance
- **4.5:1 contrast ratio** minimum for text
- **3:1 ratio** for large text (18pt+ or 14pt+ bold)
- **Keyboard navigation** for all interactive elements
- **Screen reader support** with proper ARIA labels

### Focus Management
- **Visible focus indicators**: Never remove default outlines
- **Logical tab order**: Matches visual layout
- **Focus trapping**: For modals and dropdowns
- **Focus restoration**: Return to trigger element

### Semantic HTML
- **Proper element roles**: Use semantic elements when possible
- **ARIA attributes**: Only when semantic elements insufficient
- **Form labels**: All inputs must have associated labels
- **Heading hierarchy**: Proper h1-h6 structure

## Documentation

### README Structure
- **Clear purpose**: What problem does this solve?
- **Quick start**: Minimal code to get running
- **API reference**: Complete function signatures
- **Examples**: Real-world usage patterns

### Code Comments
- **Why, not what**: Explain intent and trade-offs
- **Accessibility notes**: How feature impacts a11y
- **Performance warnings**: When function may be expensive
- **Browser compatibility**: Known limitations

## Build and Distribution

### Package Structure
- **ESM + CJS**: Support both module systems
- **TypeScript declarations**: Full .d.ts files
- **Source maps**: For debugging
- **Minimal bundle**: Tree-shakeable exports

### Versioning
- **Semantic versioning**: Breaking.Major.Minor
- **Changelog**: Document all changes
- **Deprecation warnings**: For breaking changes
- **Migration guides**: When APIs change</content>
<parameter name="filePath">c:\Users\lars-\Documents\B1C3\projects\b1c3-ux-tools\docs\DX_CONVENTIONS.md