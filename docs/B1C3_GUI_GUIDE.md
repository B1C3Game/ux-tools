# B1C3 GUI Guide (Palette + Usability)

**Status:** Draft
**Last Updated:** February 7, 2026
**Purpose:** Define the B1C3 palette and the GUI implementation rules that ensure ease of use, accessibility, and intuitive, effective workflows.

---

## 1. Scope and Sources

This guide is the practical UI layer for B1C3 apps. It summarizes key rules from:
- [../WEB_STANDARDS.md](../WEB_STANDARDS.md) for the canonical palette and web UX standards.
- [../UX_STRATEGY.md](../UX_STRATEGY.md) for accessibility and documentation priorities.

---

## 2. B1C3 Palette (Canonical)

Use these as the default tokens for all B1C3 apps unless a project has a documented exception.

### 2.1 Primary
- Navy Blue: #1a365d (trust, authority)
- Bright Teal: #0891b2 (action, innovation)
- Clean White: #ffffff (clarity)

### 2.2 Accents
- Success Green: #059669 (success, compliance)
- Warning Orange: #d97706 (caution)
- Error Red: #dc2626 (critical)

### 2.3 Neutral Grays
- #f9fafb (bg-light)
- #f3f4f6 (bg)
- #e5e7eb (border)
- #9ca3af (text-muted)
- #374151 (text-default)
- #111827 (text-dark)

### 2.4 Contrast Rules
- Minimum contrast: 4.5:1 for body text.
- Never rely on color alone for meaning; pair with text or icons.
- Provide visible focus states on all interactive elements.

### 2.5 Recommended Tokens (CSS Variables)

Use these names in CSS or design tokens to keep usage consistent across apps.

```css
:root {
	--b1c3-primary-navy: #1a365d;
	--b1c3-primary-teal: #0891b2;
	--b1c3-primary-white: #ffffff;

	--b1c3-accent-success: #059669;
	--b1c3-accent-warning: #d97706;
	--b1c3-accent-error: #dc2626;

	--b1c3-gray-50: #f9fafb;
	--b1c3-gray-100: #f3f4f6;
	--b1c3-gray-200: #e5e7eb;
	--b1c3-gray-400: #9ca3af;
	--b1c3-gray-700: #374151;
	--b1c3-gray-900: #111827;
}
```

### 2.6 Token File (JSON)

Use this file for tooling or app-level theming:
- [b1c3.tokens.json](b1c3.tokens.json)

---

## 3. Usability Principles (Non-Negotiable)

### 3.1 Accessibility First
- WCAG 2.1 AA minimum.
- Full keyboard navigation for all actions.
- Screen reader friendly labels and semantic HTML.
- Respect prefers-reduced-motion.

### 3.2 Clarity and Scan-ability
- Use short labels and plain language; avoid jargon.
- Keep hierarchy clear: H1 -> H2 -> H3, no jumps.
- Prefer scannable layouts over dense blocks of text.

### 3.3 Safe, Predictable Actions
- Destructive actions require explicit confirmation.
- Provide undo when possible.
- Keep primary actions visible and consistent per screen.

---

## 4. Workflow Design Rules

### 4.1 Minimize Steps
- Default to the most common path.
- Use sensible defaults; allow overrides only when needed.
- Keep the primary workflow to 3 to 5 steps where possible.

### 4.2 Progressive Disclosure
- Show the essentials first.
- Reveal advanced options on demand.
- Avoid forcing configuration before value is visible.

### 4.3 Feedback and Status
- Show immediate feedback for every action (success, error, loading).
- Use text labels for status; color is supplemental.
- Never block the UI while background work can continue.

---

## 5. UI Implementation Guidelines

### 5.1 Layout and Spacing
- Use an 8px spacing grid.
- Touch targets: at least 48x48px on mobile.
- Ensure primary actions are visible without scrolling on desktop.

### 5.2 Typography
- Use the system font stack for clarity and performance.
- Minimum font size: 16px on mobile.
- Maintain generous line height (1.5 to 1.6 for body text).

### 5.3 Forms and Inputs
- Labels must be visible and persistent (no placeholder-only labels).
- Show inline error text below the control.
- Provide clear focus and error states.

### 5.4 Navigation
- Keep navigation shallow; avoid deep nesting.
- Use clear, short section names.
- Provide a visible current location and page title.

### 5.5 Component Baselines (Examples)

Use these as the default look and behavior for common controls.

**Primary button**
- Background: teal, text white
- Padding: 12px 24px, radius: 6px
- Hover: darker teal; Focus: 2px outline in navy

**Secondary button**
- Background: gray-100, text navy, border gray-200
- Hover: gray-50

**Links**
- Color: teal; underline on hover and focus
- External links show an icon and have visible focus outline

**Status badges**
- Always include text label; color is supplemental only
- Use success/warning/error accents with a neutral background

**Inputs**
- Height: 44px minimum; font size: 16px
- Focus: 2px teal border; Error: red border + error text

**Cards**
- White background, gray-200 border, radius 8px
- Subtle shadow; avoid heavy depth or motion

### 5.6 HTML/CSS Snippet (Reference)

Use this as a minimal baseline for buttons, inputs, and status badges.

```html
<section class="panel">
	<h2>Repo Status</h2>
	<div class="status-row">
		<span class="badge badge--success">Clean</span>
		<button class="btn btn--primary">Open Repo</button>
	</div>
	<label class="field">
		<span>Search</span>
		<input type="text" placeholder="Type a repo name" />
	</label>
</section>
```

```css
:root {
	--b1c3-primary-navy: #1a365d;
	--b1c3-primary-teal: #0891b2;
	--b1c3-primary-white: #ffffff;
	--b1c3-gray-50: #f9fafb;
	--b1c3-gray-100: #f3f4f6;
	--b1c3-gray-200: #e5e7eb;
	--b1c3-gray-700: #374151;
	--b1c3-gray-900: #111827;
	--b1c3-accent-success: #059669;
}

.panel {
	background: var(--b1c3-primary-white);
	border: 1px solid var(--b1c3-gray-200);
	border-radius: 8px;
	padding: 24px;
}

.status-row {
	display: flex;
	align-items: center;
	gap: 12px;
}

.btn {
	border-radius: 6px;
	padding: 12px 24px;
	font-weight: 600;
}

.btn--primary {
	background: var(--b1c3-primary-teal);
	color: var(--b1c3-primary-white);
	border: none;
}

.btn--primary:focus-visible {
	outline: 2px solid var(--b1c3-primary-navy);
	outline-offset: 2px;
}

.badge {
	display: inline-flex;
	align-items: center;
	padding: 4px 10px;
	border-radius: 999px;
	font-size: 12px;
	font-weight: 600;
	background: var(--b1c3-gray-100);
	color: var(--b1c3-gray-900);
}

.badge--success {
	background: rgba(5, 150, 105, 0.12);
	color: var(--b1c3-accent-success);
}

.field {
	display: grid;
	gap: 6px;
	margin-top: 16px;
}

.field input {
	min-height: 44px;
	padding: 12px 16px;
	border: 2px solid var(--b1c3-gray-200);
	border-radius: 6px;
}

.field input:focus {
	border-color: var(--b1c3-primary-teal);
	outline: none;
}
```

---

## 6. Accessibility Implementation Checklist

- Every control has an accessible name.
- All interactive elements are keyboard reachable.
- Focus order matches the visual flow.
- Color is never the only signal for state.
- Motion honors prefers-reduced-motion.

---

## 7. Copy and Tone

- Use short, direct phrases.
- Prefer concrete terms over abstract labels.
- Errors should explain what happened and how to fix it.

---

## 8. Exception Process

If a product needs to diverge from the palette or rules:
1. Document the reason and scope in the product README.
2. Validate accessibility impact.
3. Keep the deviation as small as possible.

---

## 9. Related Docs

- [../WEB_STANDARDS.md](../WEB_STANDARDS.md)
- [../UX_STRATEGY.md](../UX_STRATEGY.md)
- [ACCESSIBILITY_CHECKLIST.md](ACCESSIBILITY_CHECKLIST.md)
- [b1c3.tokens.json](b1c3.tokens.json)
