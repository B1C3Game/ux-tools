import { describe, it, expect, vi } from 'vitest';
import { clamp, debounce, throttle } from '../utils';

describe('Utility Functions', () => {
  describe('clamp', () => {
    it('should return value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('should return min when value is below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('should return max when value is above range', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('should handle negative ranges', () => {
      expect(clamp(-5, -10, -1)).toBe(-5);
      expect(clamp(-15, -10, -1)).toBe(-10);
    });

    it('should handle decimal values', () => {
      expect(clamp(2.5, 0, 5)).toBe(2.5);
      expect(clamp(-0.5, 0, 5)).toBe(0);
    });

    it('should work when min equals max', () => {
      expect(clamp(5, 10, 10)).toBe(10);
      expect(clamp(15, 10, 10)).toBe(10);
    });

    it('should throw when min > max', () => {
      expect(() => clamp(5, 10, 0)).toThrow();
    });

    it('should throw on non-numeric input', () => {
      // NaN is a valid number type in JavaScript, but fails numeric checks
      expect(() => clamp(Infinity, 0, 10)).toThrow();
      expect(() => clamp(5, 'string' as unknown as number, 10)).toThrow();
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should delay function execution', () => {
      const callback = vi.fn();
      const debounced = debounce(callback, 100);

      debounced('value1');
      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledWith('value1');
    });

    it('should cancel previous call on rapid invocation', () => {
      const callback = vi.fn();
      const debounced = debounce(callback, 100);

      debounced('value1');
      vi.advanceTimersByTime(50);
      debounced('value2');
      vi.advanceTimersByTime(50);

      // Neither call should have executed yet
      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      // Only value2 should have executed
      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith('value2');
    });

    it('should handle multiple arguments', () => {
      const callback = vi.fn();
      const debounced = debounce(callback, 100);

      debounced('arg1', 'arg2', 42);
      vi.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 42);
    });

    it('should reset timer on each call', () => {
      const callback = vi.fn();
      const debounced = debounce(callback, 100);

      debounced('value1');
      vi.advanceTimersByTime(75);
      debounced('value2');
      vi.advanceTimersByTime(75);

      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(25);
      expect(callback).toHaveBeenCalledOnce();
    });

    it('should throw on non-function input', () => {
      expect(() => debounce('not a function' as unknown as () => void, 100)).toThrow();
    });

    it('should throw on negative delay', () => {
      expect(() => debounce(() => {}, -100)).toThrow();
    });
  });

  describe('throttle', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should execute immediately on first call', () => {
      const callback = vi.fn();
      const throttled = throttle(callback, 100);

      throttled('value1');
      expect(callback).toHaveBeenCalledWith('value1');
    });

    it('should ignore calls within throttle interval', () => {
      const callback = vi.fn();
      const throttled = throttle(callback, 100);

      throttled('value1');
      vi.advanceTimersByTime(50);
      throttled('value2');

      expect(callback).toHaveBeenCalledOnce();
    });

    it('should execute pending call after interval', () => {
      const callback = vi.fn();
      const throttled = throttle(callback, 100);

      throttled('value1');
      vi.advanceTimersByTime(50);
      throttled('value2');
      vi.advanceTimersByTime(50);

      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(1, 'value1');
      expect(callback).toHaveBeenNthCalledWith(2, 'value2');
    });

    it('should execute at interval boundaries', () => {
      const callback = vi.fn();
      const throttled = throttle(callback, 100);

      throttled('value1');
      vi.advanceTimersByTime(100);
      throttled('value2');

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should handle multiple arguments', () => {
      const callback = vi.fn();
      const throttled = throttle(callback, 100);

      throttled('arg1', 42, 'arg3');
      expect(callback).toHaveBeenCalledWith('arg1', 42, 'arg3');
    });

    it('should throw on non-function input', () => {
      expect(() => throttle('not a function' as unknown as () => void, 100)).toThrow();
    });

    it('should throw on negative interval', () => {
      expect(() => throttle(() => {}, -100)).toThrow();
    });
  });
});
