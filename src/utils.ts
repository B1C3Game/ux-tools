/**
 * Simple utility functions for common operations.
 * No external dependencies, pure functional style.
 *
 * @module utils
 */

/**
 * Clamps a number to a specified range [min, max].
 *
 * If value is less than min, returns min.
 * If value is greater than max, returns max.
 * Otherwise returns the original value.
 *
 * Useful for: range constraints, boundary validation, slider calculations.
 *
 * @param value - Number to clamp
 * @param min - Minimum allowed value (inclusive)
 * @param max - Maximum allowed value (inclusive)
 * @returns Clamped value within [min, max]
 *
 * @throws {Error} If min > max
 *
 * @example
 * ```typescript
 * clamp(5, 0, 10) // 5
 * clamp(-5, 0, 10) // 0
 * clamp(15, 0, 10) // 10
 *
 * // Useful for slider position
 * const position = clamp(mouseX, 0, sliderWidth)
 * ```
 *
 * @accessibility
 * - Pure function, no side effects
 *
 * @since 0.1.0
 */
export function clamp(value: number, min: number, max: number): number {
  if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('clamp requires three numeric arguments');
  }

  if (!isFinite(value) || !isFinite(min) || !isFinite(max)) {
    throw new Error('clamp requires finite numeric values (no Infinity or NaN)');
  }

  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }

  return Math.max(min, Math.min(max, value));
}

/**
 * Creates a debounced function that delays execution until after a timeout.
 *
 * Useful for: async search, autocomplete, window resize handlers, user typing.
 *
 * Behavior:
 * - First call schedules execution
 * - Subsequent calls reset the timeout
 * - Calling again before timeout fires cancels previous execution
 * - Perfect for "wait for user to stop typing" patterns
 *
 * @param callback - Function to debounce
 * @param delayMs - Delay in milliseconds
 * @returns Debounced function
 *
 * @example
 * ```typescript
 * const handleSearch = debounce((query: string) => {
 *   fetch(`/api/search?q=${query}`)
 * }, 300)
 *
 * // Caller
 * input.addEventListener('input', (e) => {
 *   handleSearch(e.target.value)
 * })
 *
 * // If user types 5 characters in < 300ms, only last char triggers search
 * ```
 *
 * @accessibility
 * - Important for screen reader testing (delays announcements until final value)
 * - Reduces network requests (better for battery/data usage)
 * - Should provide visual feedback that debounce is occurring
 *
 * @since 0.1.0
 */
export function debounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  if (typeof callback !== 'function') {
    throw new Error('debounce requires a function as first argument');
  }

  if (typeof delayMs !== 'number' || delayMs < 0) {
    throw new Error('delayMs must be a non-negative number');
  }

  let timeoutId: NodeJS.Timeout | null = null;

  return function debounced(...args: Parameters<T>) {
    // Clear previous timeout
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // Set new timeout
    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delayMs);
  };
}

/**
 * Creates a throttled function that executes at most once per interval.
 *
 * Useful for: scroll handlers, resize listeners, mousemove tracking, animations.
 *
 * Behavior:
 * - First call executes immediately
 * - Subsequent calls within throttle interval are ignored
 * - Pending call is executed after interval expires
 *
 * @param callback - Function to throttle
 * @param intervalMs - Minimum interval between executions in milliseconds
 * @returns Throttled function
 *
 * @example
 * ```typescript
 * const handleScroll = throttle(() => {
 *   console.log('Scroll position:', window.scrollY)
 * }, 100)
 *
 * window.addEventListener('scroll', handleScroll)
 * // Logs at most once every 100ms during scrolling
 * ```
 *
 * @accessibility
 * - Improves performance during rapid events (scroll, resize)
 * - Reduces strain on assistive technology
 * - Good for high-frequency event handlers
 *
 * @since 0.1.0
 */
export function throttle<T extends (...args: unknown[]) => void>(
  callback: T,
  intervalMs: number
): (...args: Parameters<T>) => void {
  if (typeof callback !== 'function') {
    throw new Error('throttle requires a function as first argument');
  }

  if (typeof intervalMs !== 'number' || intervalMs < 0) {
    throw new Error('intervalMs must be a non-negative number');
  }

  let lastCallTime = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return function throttled(...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    if (timeSinceLastCall >= intervalMs) {
      // Enough time has passed, execute immediately
      lastCallTime = now;
      callback(...args);

      // Clear any pending call
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    } else {
      // Too soon, schedule for later
      if (timeoutId === null) {
        const remainingDelay = intervalMs - timeSinceLastCall;
        timeoutId = setTimeout(() => {
          lastCallTime = Date.now();
          callback(...args);
          timeoutId = null;
        }, remainingDelay);
      }
    }
  };
}
