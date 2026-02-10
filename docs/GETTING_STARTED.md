# Getting Started with B1C3 UX Tools

Welcome to B1C3 UX Tools! This guide will help you get up and running with our accessibility-first utility library.

## Quick Start

### Installation

```bash
npm install b1c3-ux-tools
```

> **Note:** If you are using the published npm package, use `import { ... } from 'b1c3-ux-tools'`. For local development or direct file usage, use a relative path like `import { ... } from '../src/index'`.

### Basic Usage

```typescript
import {
  applyB1c3Tokens,
  isValidEmail,
  clamp,
  useFocusTrap
} from 'b1c3-ux-tools';

// Apply design tokens to your document
applyB1c3Tokens();

// Use validation utilities
const emailValid = isValidEmail('user@example.com'); // true

// Use utility functions
const boundedValue = clamp(15, 0, 10); // 10

// Use focus management in modals
const modal = document.querySelector('[role="dialog"]');
const cleanup = useFocusTrap(modal);
// ... later
cleanup();
```

## Core Concepts

### Design Tokens
B1C3 UX Tools uses a consistent design token system for colors, spacing, and typography. Apply tokens globally or customize them for your project.

### Accessibility First
All utilities are built with WCAG 2.1 AA compliance in mind. Focus management, validation, and DOM utilities include accessibility considerations.

### TypeScript Native
Full TypeScript support with comprehensive type definitions. Get IntelliSense and compile-time safety out of the box.

## Common Patterns

### Form Validation
```typescript
import { isValidEmail, sanitizeInput } from 'b1c3-ux-tools';

function handleFormSubmit(event) {
  event.preventDefault();

  const email = sanitizeInput(event.target.email.value);
  const isValid = isValidEmail(email);

  if (!isValid) {
    // Show error message
    return;
  }

  // Process form
}
```

### Modal Management
```typescript
import { useFocusTrap, getFocusableElements } from 'b1c3-ux-tools';

function openModal(modalElement) {
  modalElement.showModal();

  // Trap focus within modal
  const cleanup = useFocusTrap(modalElement, {
    returnFocus: true,
    escapeKey: true
  });

  // Store cleanup for later
  modalElement.cleanup = cleanup;
}

function closeModal(modalElement) {
  modalElement.cleanup();
  modalElement.close();
}
```

### Text Truncation
```typescript
import { truncateText, measureTextWidth } from 'b1c3-ux-tools';

function truncateTitle(title, maxWidth) {
  const textWidth = measureTextWidth(title, 16, 'Arial');

  if (textWidth > maxWidth) {
    return truncateText({
      text: title,
      maxLength: Math.floor(maxWidth / 10), // Rough estimate
      truncateOn: 'word'
    });
  }

  return title;
}
```

### Debounced Search
```typescript
import { debounce } from 'b1c3-ux-tools';

const searchInput = document.querySelector('#search');

const debouncedSearch = debounce(async (query) => {
  const results = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  // Update UI with results
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

## Styling with CSS Variables

After applying tokens, use CSS variables for consistent theming:

```css
/* Buttons */
.btn-primary {
  background: var(--b1c3-primary-teal);
  color: var(--b1c3-primary-white);
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
}

.btn-primary:focus-visible {
  outline: 2px solid var(--b1c3-primary-navy);
  outline-offset: 2px;
}

/* Form fields */
.field input {
  border: 1px solid var(--b1c3-gray-400);
  padding: 8px 12px;
  border-radius: 4px;
}

.field input:focus {
  border-color: var(--b1c3-primary-teal);
  outline: 2px solid var(--b1c3-primary-teal);
  outline-offset: -1px;
}

/* Status indicators */
.status-success {
  color: var(--b1c3-accent-success);
}

.status-error {
  color: var(--b1c3-accent-error);
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Next Steps

- Explore the [API Documentation](api/) for detailed function references
- Check out the [interactive examples](#) (coming soon)
- Read the [accessibility guide](accessibility-guide.md) for best practices
- Browse the [utility catalog](utility-catalog.html) to discover available tools

## Need Help?

- [API Documentation](api/) - Complete reference
- [GitHub Issues](https://github.com/B1C3Game/ux-tools/issues) - Report bugs or request features
- [Contributing Guide](../CONTRIBUTING.md) - Help improve the library</content>
<parameter name="filePath">c:\Users\lars-\Documents\B1C3\projects\b1c3-ux-tools\docs\GETTING_STARTED.md