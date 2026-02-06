/**
 * DOM and text measurement utilities.
 * Functions that interact with the DOM or calculate text dimensions.
 *
 * @module dom
 */

/**
 * Measures the pixel width of text rendered in a specific font.
 *
 * Uses a temporary canvas element to measure text width accurately,
 * accounting for font properties. This is more accurate than relying
 * on character count.
 *
 * Usage example: Determining if text needs truncation, calculating
 * dynamic layout dimensions, validating text fits in a container.
 *
 * Performance note: Creates a temporary canvas on each call.
 * For measuring many strings, consider implementing your own cache.
 *
 * @param text - Text string to measure
 * @param fontSize - Font size in pixels (e.g., 16 for 16px)
 * @param fontFamily - Font family name (default: 'Arial, sans-serif')
 * @param fontWeight - Font weight (default: 'normal')
 * @returns Width in pixels
 *
 * @throws {Error} If text is empty or undefined
 *
 * @example
 * ```typescript
 * const width = measureTextWidth('Hello World', 16, 'Arial')
 * // width ≈ 90-100 pixels depending on rendering
 *
 * // Check if text fits in container
 * const textWidth = measureTextWidth(longText, 14, 'system-ui')
 * if (textWidth > containerWidth) {
 *   // Text needs truncation
 * }
 * ```
 *
 * @accessibility
 * - Pure calculation, no DOM mutations except temporary canvas
 * - Does not affect screen reader output
 * - Important for ensuring text doesn't overflow and become unreadable
 *
 * @since 0.1.0
 */
export function measureTextWidth(
  text: string,
  fontSize: number,
  fontFamily: string = 'Arial, sans-serif',
  fontWeight: string = 'normal'
): number {
  if (!text || typeof text !== 'string') {
    throw new Error('measureTextWidth requires non-empty text parameter');
  }

  if (typeof fontSize !== 'number' || fontSize <= 0) {
    throw new Error('fontSize must be a positive number');
  }

  // Create temporary canvas for measurement
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    throw new Error('measureTextWidth requires DOM environment (canvas element)');
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas 2D context');
  }

  // Set font properties to match intended rendering
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(text);

  return metrics.width;
}

/**
 * Truncates a string to maximum length, optionally breaking on word boundaries.
 *
 * Strategies:
 * - 'word': Truncates after last complete word within maxLength
 * - 'char': Truncates after maxLength characters exactly
 *
 * When truncating by word, the ellipsis is added AFTER the truncation,
 * so the final string may exceed maxLength. Override with ellipsis='' to prevent this.
 *
 * @param options - Truncation options
 * @param options.text - Text to truncate
 * @param options.maxLength - Maximum character length before ellipsis
 * @param options.ellipsis - String to append if truncated (default: '...')
 * @param options.truncateOn - Break strategy: 'word' or 'char' (default: 'word')
 * @returns Truncated text
 *
 * @example
 * ```typescript
 * truncateText({
 *   text: 'The quick brown fox jumps over the lazy dog',
 *   maxLength: 20,
 *   truncateOn: 'word'
 * })
 * // 'The quick brown fox...'
 *
 * truncateText({
 *   text: 'The quick brown fox jumps over the lazy dog',
 *   maxLength: 20,
 *   truncateOn: 'char'
 * })
 * // 'The quick brown fox ...'
 * ```
 *
 * @accessibility
 * - Pure function, no DOM side effects
 * - Ellipsis helps indicate truncation for all users
 * - Consider using title attribute or tooltip for full text
 *
 * @since 0.1.0
 */
export interface TruncateOptions {
  text: string;
  maxLength: number;
  ellipsis?: string;
  truncateOn?: 'word' | 'char';
}

export function truncateText({
  text,
  maxLength,
  ellipsis = '...',
  truncateOn = 'word',
}: TruncateOptions): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  if (maxLength < 1) {
    throw new Error('maxLength must be at least 1');
  }

  if (text.length <= maxLength) {
    return text;
  }

  if (truncateOn === 'char') {
    return text.substring(0, maxLength) + ellipsis;
  }

  // truncateOn === 'word'
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  // If no space found, truncate at character boundary
  if (lastSpace === -1) {
    return truncated + ellipsis;
  }

  // Truncate at last word boundary
  return truncated.substring(0, lastSpace) + ellipsis;
}

/**
 * Gets visible text content from an element, excluding hidden elements.
 *
 * Respects:
 * - display: none (excluded)
 * - visibility: hidden (excluded)
 * - opacity: 0 (excluded)
 * - visibility: collapse (excluded if table cell)
 *
 * This is useful for testing, accessibility checking, or extracting
 * user-visible text content programmatically.
 *
 * Note: Screen reader behavior may differ due to aria-label,
 * aria-labelledby, and other accessibility attributes.
 *
 * @param element - DOM element to extract text from
 * @returns Text string of visible content
 *
 * @throws {Error} If element is null/undefined
 *
 * @example
 * ```typescript
 * const div = document.createElement('div')
 * div.innerHTML = '<span>visible</span><span style="display:none">hidden</span>'
 * getElementVisibleText(div) // 'visible'
 * ```
 *
 * @accessibility
 * - Returns only *visually* visible text
 * - Does NOT account for screen reader visibility (that requires aria attributes)
 * - Useful for testing that visible text is present, but not a replacement for a11y testing
 *
 * @since 0.1.0
 */
export function getElementVisibleText(element: HTMLElement): string {
  if (!element) {
    throw new Error('getElementVisibleText requires a valid HTMLElement');
  }

  const style = window.getComputedStyle(element);

  // Check if element itself is hidden
  if (
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    style.visibility === 'collapse' ||
    style.opacity === '0'
  ) {
    return '';
  }

  let text = '';

  // Process child nodes
  const childNodes = Array.from(element.childNodes);
  for (const node of childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      // Text node: add trimmed content
      const trimmed = node.textContent?.trim() || '';
      if (trimmed) {
        text += trimmed + ' ';
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Element node: recurse (respects hidden children)
      const childText = getElementVisibleText(node as HTMLElement);
      if (childText) {
        text += childText + ' ';
      }
    }
    // Other node types (comments, etc.) are ignored
  }

  return text.trim();
}
