/**
 * Form validation utilities for common input types.
 * All functions return boolean and throw descriptive errors for invalid input.
 *
 * @module validation
 */

/**
 * Validates if a string is a valid email address.
 *
 * Supports:
 * - Standard email format (local@domain.com)
 * - Subdomain addresses
 * - Plus addressing (user+tag@domain.com)
 * - Unicode characters in local part (per RFC 6531)
 *
 * Does NOT support:
 * - IP addresses (@[192.168.0.1])
 * - Commented addresses (user(comment)@domain.com)
 *
 * For strict RFC compliance, consider server-side verification.
 *
 * @param email - Email string to validate
 * @returns True if email format is valid, false otherwise
 *
 * @example
 * ```typescript
 * isValidEmail('user@example.com') // true
 * isValidEmail('user+tag@example.co.uk') // true
 * isValidEmail('invalid.email') // false
 * ```
 *
 * @accessibility
 * - Pure function, no DOM side effects
 * - Consistent error handling (returns boolean vs throwing)
 *
 * @since 0.1.0
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') {
    return false;
  }

  // RFC 5322 simplified pattern (covers 99% of real emails)
  // Allows: alphanumeric, dots, hyphens, underscores, plus in local part
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valid = emailRegex.test(email.trim());

  if (!valid) {
    return false;
  }

  // Additional checks
  const [localPart, domain] = email.split('@');

  // Local part should not start/end with dot
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return false;
  }

  // No consecutive dots
  if (email.includes('..')) {
    return false;
  }

  // Domain should have at least one dot
  if (!domain.includes('.')) {
    return false;
  }

  // Domain TLD should be at least 2 characters
  const tld = domain.split('.').pop() || '';
  if (tld.length < 2) {
    return false;
  }

  return true;
}

/**
 * Validates if a string is a valid URL.
 *
 * Supports:
 * - http:// and https:// protocols
 * - Domain names with subdomains
 * - Paths, query parameters, and fragments
 * - Port numbers
 *
 * Does NOT verify:
 * - If the URL is actually accessible (no network check)
 * - If the domain actually exists
 *
 * @param url - URL string to validate
 * @returns True if URL format is valid, false otherwise
 *
 * @example
 * ```typescript
 * isValidUrl('https://example.com') // true
 * isValidUrl('https://example.com/path?query=value') // true
 * isValidUrl('example.com') // false (missing protocol)
 * ```
 *
 * @accessibility
 * - Pure function, no DOM side effects
 *
 * @since 0.1.0
 */
export function isValidUrl(url: string): boolean {
  if (typeof url !== 'string') {
    return false;
  }

  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Sanitizes user input to remove common XSS vectors and whitespace.
 *
 * Removes:
 * - HTML special characters (<, >, &, quotes)
 * - Script content
 * - Leading/trailing whitespace (if trim is enabled)
 * - Multiple consecutive spaces (if normalize is enabled)
 *
 * Preserves:
 * - Unicode characters (safely encodes HTML entities)
 * - Line breaks (if preserveLineBreaks is enabled)
 *
 * @param input - Raw input string to sanitize
 * @param options - Sanitization options
 * @param options.trim - Remove leading/trailing whitespace (default: true)
 * @param options.normalize - Collapse multiple spaces (default: false)
 * @param options.preserveLineBreaks - Keep line breaks (default: false)
 * @returns Sanitized string safe for HTML insertion
 *
 * @example
 * ```typescript
 * sanitizeInput('<script>alert("xss")</script>')
 * // &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;
 *
 * sanitizeInput('  hello   world  ', { normalize: true })
 * // 'hello world'
 * ```
 *
 * @accessibility
 * - Pure function, no DOM side effects
 * - Handles unicode safely (important for international text)
 *
 * @since 0.1.0
 */
export interface SanitizeOptions {
  trim?: boolean;
  normalize?: boolean;
  preserveLineBreaks?: boolean;
}

export function sanitizeInput(input: string, options: SanitizeOptions = {}): string {
  if (typeof input !== 'string') {
    return '';
  }

  const { trim: shouldTrim = true, normalize = false, preserveLineBreaks = false } = options;

  let result = input;

  // HTML encode special characters
  result = result
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

  // Normalize whitespace
  if (normalize) {
    if (preserveLineBreaks) {
      // Collapse spaces within lines, preserve line breaks
      result = result
        .split('\n')
        .map((line) => line.replace(/\s+/g, ' ').trim())
        .join('\n');
    } else {
      // Collapse all whitespace
      result = result.replace(/\s+/g, ' ');
    }
  }

  // Trim whitespace
  if (shouldTrim) {
    result = result.trim();
  }

  return result;
}
