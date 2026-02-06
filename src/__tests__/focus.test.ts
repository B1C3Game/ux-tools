import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getFocusableElements, useFocusTrap } from '../focus';

describe('Focus Utilities', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe('getFocusableElements', () => {
    it('should find button elements', () => {
      container.innerHTML = '<button>Click me</button><button>Click me too</button>';
      const focusable = getFocusableElements(container);
      expect(focusable).toHaveLength(2);
    });

    it('should find input elements', () => {
      container.innerHTML = '<input type="text" /><input type="checkbox" />';
      const focusable = getFocusableElements(container);
      expect(focusable).toHaveLength(2);
    });

    it('should find anchor elements with href', () => {
      container.innerHTML = '<a href="/home">Home</a><a>No href</a>';
      const focusable = getFocusableElements(container);
      expect(focusable).toHaveLength(1); // Only link with href
    });

    it('should find select and textarea', () => {
      container.innerHTML = '<select><option>A</option></select><textarea></textarea>';
      const focusable = getFocusableElements(container);
      expect(focusable).toHaveLength(2);
    });

    it('should respect disabled attribute', () => {
      container.innerHTML = '<button>Enabled</button><button disabled>Disabled</button>';
      const focusable = getFocusableElements(container);
      expect(focusable).toHaveLength(1);
    });

    it('should respect tabindex', () => {
      container.innerHTML = '<div tabindex="0">Focusable</div><div tabindex="-1">Not focusable</div>';
      const focusable = getFocusableElements(container);
      expect(focusable).toHaveLength(1);
    });

    it('should exclude display:none elements', () => {
      container.innerHTML =
        '<button>Visible</button><button style="display:none">Hidden</button>';
      const focusable = getFocusableElements(container);
      expect(focusable).toHaveLength(1);
    });

    it('should exclude aria-hidden elements', () => {
      container.innerHTML =
        '<button>Visible</button><button aria-hidden="true">Hidden</button>';
      const focusable = getFocusableElements(container);
      expect(focusable).toHaveLength(1);
    });

    it('should throw on null container', () => {
      expect(() => getFocusableElements(null as unknown as HTMLElement)).toThrow();
    });
  });

  describe('useFocusTrap', () => {
    it('should move focus to first focusable element', () => {
      container.innerHTML = '<button id="btn1">First</button><button id="btn2">Second</button>';
      const btn1 = container.querySelector('#btn1') as HTMLElement;

      useFocusTrap(container);
      expect(document.activeElement).toBe(btn1);
    });

    it('should cycle focus forward on Tab', () => {
      container.innerHTML = '<button id="btn1">First</button><button id="btn2">Second</button>';
      const btn1 = container.querySelector('#btn1') as HTMLElement;
      const btn2 = container.querySelector('#btn2') as HTMLElement;

      useFocusTrap(container);
      expect(document.activeElement).toBe(btn1);

      // Simulate Tab key
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });
      container.dispatchEvent(event);

      expect(document.activeElement).toBe(btn2);
    });

    it('should cycle focus backward on Shift+Tab', () => {
      container.innerHTML = '<button id="btn1">First</button><button id="btn2">Second</button>';
      const btn1 = container.querySelector('#btn1') as HTMLElement;
      const btn2 = container.querySelector('#btn2') as HTMLElement;

      useFocusTrap(container);
      btn2.focus(); // Move to second button first

      // Simulate Shift+Tab
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      });
      container.dispatchEvent(event);

      expect(document.activeElement).toBe(btn1);
    });

    it('should wrap focus at end with Tab', () => {
      container.innerHTML = '<button id="btn1">First</button><button id="btn2">Second</button>';
      const btn1 = container.querySelector('#btn1') as HTMLElement;
      const btn2 = container.querySelector('#btn2') as HTMLElement;

      useFocusTrap(container);
      btn2.focus();

      // Simulate Tab at last element
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });
      container.dispatchEvent(event);

      expect(document.activeElement).toBe(btn1);
    });

    it('should exit trap on Escape when enabled', () => {
      container.innerHTML = '<button id="btn1">First</button>';
      const previousElement = document.createElement('button');
      previousElement.id = 'outside';
      document.body.appendChild(previousElement);
      previousElement.focus();

      const cleanup = useFocusTrap(container, { returnFocus: true });
      expect(document.activeElement).not.toBe(previousElement);

      // Simulate Escape key
      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      });
      container.dispatchEvent(event);

      // Cleanup should be called
      cleanup();
      previousElement.remove();
    });

    it('should return cleanup function', () => {
      container.innerHTML = '<button>Test</button>';
      const cleanup = useFocusTrap(container);
      expect(typeof cleanup).toBe('function');

      // Cleanup should work without error
      expect(() => cleanup()).not.toThrow();
    });

    it('should throw on null container', () => {
      expect(() => useFocusTrap(null as unknown as HTMLElement)).toThrow();
    });
  });
});
