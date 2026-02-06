import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { measureTextWidth, truncateText, getElementVisibleText } from '../dom';

describe('DOM Utilities', () => {
  describe('measureTextWidth', () => {
    it('should throw on invalid text', () => {
      expect(() => measureTextWidth('', 16)).toThrow();
      expect(() => measureTextWidth(null as unknown as string, 16)).toThrow();
    });

    it('should throw on invalid fontSize', () => {
      expect(() => measureTextWidth('Hello', 0)).toThrow();
      expect(() => measureTextWidth('Hello', -10)).toThrow();
      expect(() => measureTextWidth('Hello', NaN)).toThrow();
    });

    it('should throw without canvas context', () => {
      // jsdom doesn't support canvas, so this will throw
      expect(() => measureTextWidth('Hello', 16)).toThrow();
    });
  });

  describe('truncateText', () => {
    it('should not truncate short text', () => {
      const text = 'Hello';
      const result = truncateText({ text, maxLength: 10 });
      expect(result).toBe(text);
    });

    it('should truncate by word boundary by default', () => {
      const text = 'The quick brown fox';
      const result = truncateText({ text, maxLength: 10 });
      expect(result).toContain('...');
      expect(result).toBe('The quick...');
    });

    it('should truncate by character when specified', () => {
      const text = 'The quick brown fox';
      const result = truncateText({ text, maxLength: 10, truncateOn: 'char' });
      expect(result).toBe('The quick ...');
    });

    it('should use custom ellipsis', () => {
      const text = 'The quick brown fox';
      const result = truncateText({ text, maxLength: 10, ellipsis: '→' });
      expect(result).toBe('The quick→');
    });

    it('should handle text with no spaces for word truncation', () => {
      const text = 'Supercalifragilisticexpialidocious';
      const result = truncateText({ text, maxLength: 10, truncateOn: 'word' });
      expect(result).toContain('...');
    });

    it('should throw on invalid maxLength', () => {
      expect(() => truncateText({ text: 'Hello', maxLength: 0 })).toThrow();
      expect(() => truncateText({ text: 'Hello', maxLength: -1 })).toThrow();
    });

    it('should handle empty text gracefully', () => {
      expect(truncateText({ text: '', maxLength: 10 })).toBe('');
      expect(truncateText({ text: null as unknown as string, maxLength: 10 })).toBe('');
    });
  });

  describe('getElementVisibleText', () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement('div');
    });

    afterEach(() => {
      container.remove();
    });

    it('should extract simple text content', () => {
      container.textContent = 'Hello World';
      expect(getElementVisibleText(container)).toBe('Hello World');
    });

    it('should exclude display:none elements', () => {
      container.innerHTML = '<span>visible</span><span style="display:none">hidden</span>';
      const text = getElementVisibleText(container);
      expect(text).toContain('visible');
      expect(text).not.toContain('hidden');
    });

    it('should exclude visibility:hidden elements', () => {
      container.innerHTML = '<span>visible</span><span style="visibility:hidden">hidden</span>';
      const text = getElementVisibleText(container);
      expect(text).toContain('visible');
      expect(text).not.toContain('hidden');
    });

    it('should exclude opacity:0 elements', () => {
      container.innerHTML = '<span>visible</span><span style="opacity:0">hidden</span>';
      const text = getElementVisibleText(container);
      expect(text).toContain('visible');
      expect(text).not.toContain('hidden');
    });

    it('should handle nested elements', () => {
      container.innerHTML = '<div><span>Hello</span> <span>World</span></div>';
      const text = getElementVisibleText(container);
      expect(text).toContain('Hello');
      expect(text).toContain('World');
    });

    it('should trim whitespace', () => {
      container.innerHTML = '  \n  Hello  \n  ';
      expect(getElementVisibleText(container)).toBe('Hello');
    });

    it('should throw on null element', () => {
      expect(() => getElementVisibleText(null as unknown as HTMLElement)).toThrow();
      expect(() => getElementVisibleText(undefined as unknown as HTMLElement)).toThrow();
    });
  });
});
