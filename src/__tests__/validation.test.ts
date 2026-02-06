import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidUrl, sanitizeInput } from '../validation';

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('should validate standard email format', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.user@example.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(isValidEmail('plainaddress')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('user @example.com')).toBe(false);
    });

    it('should reject emails with consecutive dots', () => {
      expect(isValidEmail('user..name@example.com')).toBe(false);
    });

    it('should reject emails with leading/trailing dots in local part', () => {
      expect(isValidEmail('.user@example.com')).toBe(false);
      expect(isValidEmail('user.@example.com')).toBe(false);
    });

    it('should reject non-string input', () => {
      expect(isValidEmail(null as unknown as string)).toBe(false);
      expect(isValidEmail(undefined as unknown as string)).toBe(false);
      expect(isValidEmail(123 as unknown as string)).toBe(false);
    });

    it('should handle unicode characters', () => {
      // RFC 6531 allows unicode in local part
      expect(isValidEmail('üser@example.com')).toBe(true);
    });
  });

  describe('isValidUrl', () => {
    it('should validate absolute URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path')).toBe(true);
      expect(isValidUrl('https://example.com/path?query=value')).toBe(true);
    });

    it('should reject relative URLs', () => {
      expect(isValidUrl('/path')).toBe(false);
      expect(isValidUrl('example.com')).toBe(false);
      expect(isValidUrl('example.com/path')).toBe(false);
    });

    it('should reject invalid protocols', () => {
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('file:///path')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isValidUrl('https://localhost')).toBe(true);
      expect(isValidUrl('https://example.com:8080')).toBe(true);
    });

    it('should reject non-string input', () => {
      expect(isValidUrl(null as unknown as string)).toBe(false);
      expect(isValidUrl(undefined as unknown as string)).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should escape HTML special characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
      );
      expect(sanitizeInput('Hello & goodbye')).toContain('&amp;');
      expect(sanitizeInput("It's quote")).toContain('&#x27;');
    });

    it('should trim by default', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
      expect(sanitizeInput('\nhello\n')).toBe('hello');
    });

    it('should normalize whitespace when option enabled', () => {
      expect(sanitizeInput('hello    world', { normalize: true })).toBe('hello world');
      expect(sanitizeInput('hello\n\nworld', { normalize: true })).toBe('hello world');
    });

    it('should preserve line breaks with preserveLineBreaks option', () => {
      const result = sanitizeInput('hello\nworld', { normalize: true, preserveLineBreaks: true });
      expect(result).toContain('\n');
    });

    it('should handle non-string input gracefully', () => {
      expect(sanitizeInput(null as unknown as string)).toBe('');
      expect(sanitizeInput(undefined as unknown as string)).toBe('');
    });

    it('should not trim when trim is false', () => {
      expect(sanitizeInput('  hello  ', { trim: false })).toBe('  hello  ');
    });
  });
});
