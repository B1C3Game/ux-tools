# Accessibility Guide

## Quick Reference Table

| Section | Description |
|---------|-------------|
| [Perceivable](#perceivable-guideline-11---14) | Text alternatives, color contrast, and more |
| [Operable](#operable-guideline-21---25) | Keyboard navigation, focus management |
| [Understandable](#understandable-guideline-31---33) | Error handling, readable content |
| [Robust](#robust-guideline-41) | Compatibility, ARIA usage |

Building accessible web applications with B1C3 UX Tools. This guide covers WCAG 2.1 AA compliance patterns and best practices.

## Overview

B1C3 UX Tools is designed with accessibility as a core principle. All utilities include accessibility considerations and help you build compliant interfaces.

## WCAG 2.1 AA Success Criteria

### Perceivable (Guideline 1.1 - 1.4)

#### Text Alternatives (1.1)
```typescript
import { getElementVisibleText } from 'b1c3-ux-tools';

// Ensure visible text is accessible to screen readers
const button = document.querySelector('.btn');
const visibleText = getElementVisibleText(button);

// For images, always provide alt text
// <img src="logo.png" alt="B1C3 Company Logo" />
```

#### Color Contrast (1.4.3)
```typescript
import { applyB1c3Tokens } from 'b1c3-ux-tools';

// Apply design tokens with guaranteed contrast ratios
applyB1c3Tokens();

// CSS variables provide AA-compliant colors
.btn-primary {
  background: var(--b1c3-primary-teal); /* 4.5:1 contrast */
  color: var(--b1c3-primary-white);
}
```

### Operable (Guideline 2.1 - 2.5)

#### Keyboard Accessible (2.1.1)
```typescript
import { getFocusableElements, useFocusTrap } from 'b1c3-ux-tools';

// Ensure all interactive elements are keyboard accessible
const container = document.querySelector('.modal');
const focusable = getFocusableElements(container);

// Trap focus in modals
const cleanup = useFocusTrap(container, {
  returnFocus: true, // Return focus when modal closes
  escapeKey: true    // Allow Escape to exit
});
```

#### Enough Time (2.2.1)
```typescript
import { debounce } from 'b1c3-ux-tools';

// Debounce rapid events to give users time to respond
const searchInput = document.querySelector('#search');
const debouncedSearch = debounce((query) => {
  // Process search after user stops typing
  performSearch(query);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

#### Seizures and Physical Reactions (2.3.1)
```typescript
import { throttle } from 'b1c3-ux-tools';

// Throttle animations and transitions
const throttledScroll = throttle(() => {
  updateScrollIndicators();
}, 100);

window.addEventListener('scroll', throttledScroll);
```

### Understandable (Guideline 3.1 - 3.3)

#### Error Identification (3.3.1)
```typescript
import { isValidEmail, sanitizeInput } from 'b1c3-ux-tools';

function validateForm() {
  const email = sanitizeInput(form.email.value);

  if (!isValidEmail(email)) {
    // Associate error with input field
    const errorEl = document.getElementById('email-error');
    errorEl.textContent = 'Please enter a valid email address';
    errorEl.setAttribute('aria-live', 'polite');

    // Link error to input
    form.email.setAttribute('aria-describedby', 'email-error');
    form.email.setAttribute('aria-invalid', 'true');

    return false;
  }

  return true;
}
```

#### Labels and Instructions (3.3.2)
```html
<!-- Proper form labeling -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required />

<!-- Or with aria-labelledby -->
<div id="email-label">Email Address <span class="required">*</span></div>
<input type="email" aria-labelledby="email-label" />
```

### Robust (Guideline 4.1)

#### Name, Role, Value (4.1.2)
```typescript
// Ensure dynamic content announces changes
function updateStatus(message: string) {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.setAttribute('aria-live', 'polite');
  statusEl.setAttribute('role', 'status');
}

// For buttons, ensure accessible names
const button = document.createElement('button');
button.textContent = 'Save Changes';
button.setAttribute('aria-describedby', 'save-description');

// Screen reader will announce: "Save Changes button, description"
```

## Common Accessibility Patterns

### Modal Dialogs
```typescript
import { useFocusTrap, getFocusableElements } from 'b1c3-ux-tools';

class AccessibleModal {
  constructor(modalElement) {
    this.modal = modalElement;
    this.setupAccessibility();
  }

  open() {
    this.modal.style.display = 'block';
    this.modal.setAttribute('aria-hidden', 'false');

    // Trap focus
    this.cleanup = useFocusTrap(this.modal, {
      returnFocus: true,
      escapeKey: true
    });

    // Announce to screen readers
    this.announce('Modal opened');
  }

  close() {
    this.modal.style.display = 'none';
    this.modal.setAttribute('aria-hidden', 'true');

    // Restore focus
    this.cleanup();

    // Announce closure
    this.announce('Modal closed');
  }

  announce(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = message;

    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }
}
```

### Form Validation
```typescript
import { isValidEmail, sanitizeInput } from 'b1c3-ux-tools';

class AccessibleForm {
  constructor(formElement) {
    this.form = formElement;
    this.errors = new Map();
    this.setupValidation();
  }

  validateField(field) {
    const value = sanitizeInput(field.value);
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Email validation
    if (field.type === 'email' && !isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }

    // Update field accessibility
    field.setAttribute('aria-invalid', (!isValid).toString());

    if (!isValid) {
      this.showError(field, errorMessage);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  showError(field, message) {
    const errorId = `${field.id}-error`;
    let errorEl = document.getElementById(errorId);

    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.id = errorId;
      errorEl.setAttribute('role', 'alert');
      errorEl.setAttribute('aria-live', 'polite');
      field.parentNode.appendChild(errorEl);
    }

    errorEl.textContent = message;
    field.setAttribute('aria-describedby', errorId);
  }

  clearError(field) {
    const errorId = `${field.id}-error`;
    const errorEl = document.getElementById(errorId);

    if (errorEl) {
      errorEl.remove();
    }

    field.removeAttribute('aria-describedby');
  }
}
```

### Dynamic Content
```typescript
import { truncateText } from 'b1c3-ux-tools';

// Handle content that might overflow
function updateContent(content, container) {
  const maxLength = calculateMaxLength(container);

  if (content.length > maxLength) {
    const truncated = truncateText({
      text: content,
      maxLength: maxLength,
      truncateOn: 'word'
    });

    container.textContent = truncated;
    container.setAttribute('title', content); // Full text on hover
    container.setAttribute('aria-label', content); // Screen reader gets full text
  } else {
    container.textContent = content;
    container.removeAttribute('title');
    container.removeAttribute('aria-label');
  }
}
```

## Testing Accessibility

### Automated Testing
```typescript
import { getFocusableElements } from 'b1c3-ux-tools';

// Test keyboard navigation
describe('Modal Accessibility', () => {
  it('should trap focus within modal', () => {
    const modal = renderModal();
    const focusable = getFocusableElements(modal);

    expect(focusable.length).toBeGreaterThan(0);

    // Simulate Tab navigation
    // Verify focus stays within modal
  });

  it('should return focus on close', () => {
    const trigger = document.activeElement;
    const modal = openModal();

    closeModal(modal);

    expect(document.activeElement).toBe(trigger);
  });
});
```

### Manual Testing Checklist

- [ ] Tab through all interactive elements
- [ ] Shift+Tab backwards navigation works
- [ ] All form fields have visible labels
- [ ] Error messages are associated with inputs
- [ ] Color is not the only way information is conveyed
- [ ] Content is readable at 200% zoom
- [ ] Screen reader announces dynamic changes
- [ ] Keyboard shortcuts don't conflict with screen readers

## Tools and Resources

### Testing Tools
- **Lighthouse**: Automated accessibility auditing
- **axe-core**: Programmatic accessibility testing
- **NVDA**: Windows screen reader testing
- **JAWS**: Professional screen reader testing
- **VoiceOver**: macOS/iOS screen reader testing

### Learning Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Accessibility Resources](https://webaim.org/resources/)
- [MDN Accessibility Documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Browser Developer Tools
- Chrome DevTools Accessibility pane
- Firefox Accessibility Inspector
- Edge Accessibility Insights

Remember: Accessibility is about people. Test with real users, especially those who rely on assistive technologies. The goal is to create inclusive experiences for everyone.</content>
<parameter name="filePath">c:\Users\lars-\Documents\B1C3\projects\b1c3-ux-tools\docs\ACCESSIBILITY_GUIDE.md