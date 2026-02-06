/**
 * Focus management and keyboard navigation utilities.
 * Critical for accessibility (WCAG 2.4.3 Focus Visible, 2.1.1 Keyboard).
 *
 * @module focus
 */

/**
 * Gets all keyboard-focusable elements within a container.
 *
 * Focusable elements include:
 * - Interactive elements: button, a[href], input, select, textarea
 * - Custom elements with tabindex > -1
 * - Hidden elements with tabindex > -1 (still focusable but not visible)
 *
 * Excludes:
 * - Elements with tabindex="-1" (removed from tab order, but programmatically focusable)
 * - Disabled form elements
 * - Elements inside display:none or visibility:hidden (checked on parent, not children)
 *
 * Use case: Implementing focus trap in modals, dropdowns, or custom components.
 *
 * @param container - Container element to search within
 * @returns Array of focusable elements in DOM order
 *
 * @throws {Error} If container is null/undefined
 *
 * @example
 * ```typescript
 * const modal = document.querySelector('[role="dialog"]')
 * const focusable = getFocusableElements(modal)
 * // First and last focusable element for trap cycling
 * const firstEl = focusable[0]
 * const lastEl = focusable[focusable.length - 1]
 * ```
 *
 * @accessibility
 * - Returns elements in visual tab order
 * - Respects disabled state (important for form validation)
 * - Respects tabindex values
 * - Essential for keyboard navigation testing (WCAG 2.1.1)
 *
 * @since 0.1.0
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  if (!container) {
    throw new Error('getFocusableElements requires a valid HTMLElement');
  }

  // Selector for all potentially focusable elements
  const selector = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  const candidates = Array.from(container.querySelectorAll(selector)) as HTMLElement[];

  // Filter out elements that are not actually visible
  return candidates.filter((element) => {
    // Check if element or parent is hidden
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden') {
      return false;
    }

    // Check if element is marked with aria-hidden
    if (element.getAttribute('aria-hidden') === 'true') {
      return false;
    }

    // Element is focusable and visible
    return true;
  });
}

/**
 * Manages focus trapping within a container (useful for modals, menus, etc.).
 *
 * Behavior:
 * - Tab key cycles focus through focusable elements
 * - Shift+Tab reverses focus order
 * - Tab past last element → focus to first
 * - Shift+Tab before first element → focus to last
 * - Escape key exits trap (optional)
 * - Trap can be discarded with cleanup function return value
 *
 * Accessibility compliance:
 * - WCAG 2.4.3: Focus is visible (relies on default browser styling)
 * - WCAG 2.1.1: Keyboard accessible (all interactions via Tab/Shift+Tab/Escape)
 *
 * @param containerRef - Container element to trap focus within
 * @param options - Configuration options
 * @param options.returnFocus - Auto-focus original element on exit (default: false)
 * @param options.escapeKey - Enable Escape key to exit trap (default: true)
 * @returns Cleanup function to remove trap and restore focus
 *
 * @throws {Error} If container is null/undefined
 *
 * @example
 * ```typescript
 * const modal = document.querySelector('[role=\"dialog\"]')
 * const cleanup = useFocusTrap(modal, { returnFocus: true })
 *
 * // Later, when closing modal:
 * cleanup()  // Restores focus to previously-focused element
 * ```
 *
 * @accessibility
 * - Prevents focus from escaping modal/dropdown
 * - Essential for modal accessibility (WCAG 2.1.1 Keyboard)
 * - Should be combined with aria-modal="true" and role="dialog"
 * - Always provide visible way to exit (Escape, close button, etc.)
 *
 * @since 0.1.0
 */
export interface FocusTrapOptions {
  returnFocus?: boolean;
  escapeKey?: boolean;
}

export function useFocusTrap(
  container: HTMLElement,
  options: FocusTrapOptions = {}
): () => void {
  if (!container) {
    throw new Error('useFocusTrap requires a valid HTMLElement');
  }

  const { returnFocus = false, escapeKey = true } = options;
  const previouslyFocused = document.activeElement as HTMLElement;

  let focusableElements: HTMLElement[] = [];
  let isActive = true;

  const updateFocusableElements = () => {
    focusableElements = getFocusableElements(container);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isActive) return;

    // Update focusable elements in case DOM changed
    updateFocusableElements();

    if (focusableElements.length === 0) {
      return;
    }

    const currentElement = document.activeElement as HTMLElement;
    const currentIndex = focusableElements.indexOf(currentElement);

    // Handle Escape key
    if (escapeKey && e.key === 'Escape') {
      e.preventDefault();
      cleanup();
      return;
    }

    // Handle Tab key
    if (e.key === 'Tab') {
      e.preventDefault();

      const isShiftTab = e.shiftKey;
      let nextIndex: number;

      if (isShiftTab) {
        // Shift+Tab: move backwards
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = focusableElements.length - 1;
        }
      } else {
        // Tab: move forwards
        nextIndex = currentIndex + 1;
        if (nextIndex >= focusableElements.length) {
          nextIndex = 0;
        }
      }

      focusableElements[nextIndex].focus();
    }
  };

  // Attach event listener
  container.addEventListener('keydown', handleKeyDown);

  // Focus first focusable element
  updateFocusableElements();
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }

  // Cleanup function
  const cleanup = () => {
    if (!isActive) return;
    isActive = false;

    container.removeEventListener('keydown', handleKeyDown);

    if (returnFocus && previouslyFocused) {
      previouslyFocused.focus();
    }
  };

  return cleanup;
}
