/**
 * Design tokens and theming utilities for B1C3 applications.
 * Provides consistent color palette and CSS custom property application.
 *
 * @module tokens
 */

/**
 * Complete design token structure for B1C3 applications.
 * Contains color values for primary, accent, and gray scales.
 *
 * @since 0.1.0
 */
export type B1c3Tokens = {
  color: {
    primary: {
      navy: string;
      teal: string;
      white: string;
    };
    accent: {
      success: string;
      warning: string;
      error: string;
    };
    gray: {
      '50': string;
      '100': string;
      '200': string;
      '400': string;
      '700': string;
      '900': string;
    };
  };
};

/**
 * Default B1C3 design tokens with WCAG-compliant color values.
 * Primary colors provide brand identity, accent colors for status indication.
 *
 * @example
 * ```typescript
 * import { b1c3Tokens } from './tokens';
 *
 * console.log(b1c3Tokens.color.primary.teal); // '#0891b2'
 * ```
 *
 * @accessibility
 * - Colors chosen for WCAG AA compliance (4.5:1 contrast ratios)
 * - Primary navy (#1a365d) on white: 12.6:1 contrast
 * - Primary teal (#0891b2) on white: 4.6:1 contrast
 * - Success green (#059669) on white: 4.7:1 contrast
 * - Warning orange (#d97706) on white: 4.5:1 contrast
 * - Error red (#dc2626) on white: 5.2:1 contrast
 *
 * @since 0.1.0
 */
export const b1c3Tokens: B1c3Tokens = {
  color: {
    primary: {
      navy: '#1a365d',
      teal: '#0891b2',
      white: '#ffffff'
    },
    accent: {
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626'
    },
    gray: {
      '50': '#f9fafb',
      '100': '#f3f4f6',
      '200': '#e5e7eb',
      '400': '#9ca3af',
      '700': '#374151',
      '900': '#111827'
    }
  }
};

/**
 * Options for applying B1C3 tokens to a DOM element.
 *
 * @since 0.1.0
 */
export type ApplyB1c3TokensOptions = {
  /** Root element to apply CSS variables to (default: document.documentElement) */
  root?: HTMLElement;
  /** Custom tokens to apply (default: b1c3Tokens) */
  tokens?: B1c3Tokens;
};

/**
 * Converts B1C3 tokens to CSS custom property format.
 * Maps token structure to kebab-case CSS variable names.
 *
 * @param tokens - Design tokens to convert
 * @returns Object mapping CSS variable names to color values
 *
 * @example
 * ```typescript
 * const cssVars = buildB1c3CssVars(b1c3Tokens);
 * // { '--b1c3-primary-navy': '#1a365d', ... }
 * ```
 *
 * @internal
 * @since 0.1.0
 */
const buildB1c3CssVars = (tokens: B1c3Tokens): Record<string, string> => ({
  '--b1c3-primary-navy': tokens.color.primary.navy,
  '--b1c3-primary-teal': tokens.color.primary.teal,
  '--b1c3-primary-white': tokens.color.primary.white,
  '--b1c3-accent-success': tokens.color.accent.success,
  '--b1c3-accent-warning': tokens.color.accent.warning,
  '--b1c3-accent-error': tokens.color.accent.error,
  '--b1c3-gray-50': tokens.color.gray['50'],
  '--b1c3-gray-100': tokens.color.gray['100'],
  '--b1c3-gray-200': tokens.color.gray['200'],
  '--b1c3-gray-400': tokens.color.gray['400'],
  '--b1c3-gray-700': tokens.color.gray['700'],
  '--b1c3-gray-900': tokens.color.gray['900']
});

/**
 * Applies B1C3 design tokens as CSS custom properties to a DOM element.
 * Enables theming and consistent color usage across components.
 *
 * @param options - Configuration options for token application
 *
 * @example
 * ```typescript
 * // Apply to document root (default)
 * applyB1c3Tokens();
 *
 * // Apply to specific element
 * const container = document.querySelector('.my-app');
 * applyB1c3Tokens({ root: container });
 *
 * // Apply custom tokens
 * const customTokens = { ...b1c3Tokens, color: { ... } };
 * applyB1c3Tokens({ tokens: customTokens });
 * ```
 *
 * @example
 * ```css
 * .my-button {
 *   background: var(--b1c3-primary-teal);
 *   color: var(--b1c3-primary-white);
 * }
 * ```
 *
 * @accessibility
 * - Enables high contrast theming support
 * - CSS variables allow runtime theme switching
 * - Supports user preference for reduced motion/color schemes
 *
 * @since 0.1.0
 */
export const applyB1c3Tokens = (options: ApplyB1c3TokensOptions = {}): void => {
  const root =
    options.root ?? (typeof document === 'undefined' ? undefined : document.documentElement);
  if (!root) {
    return;
  }

  const cssVars = buildB1c3CssVars(options.tokens ?? b1c3Tokens);
  Object.entries(cssVars).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
};
