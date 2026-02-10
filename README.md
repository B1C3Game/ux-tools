# B1C3 UX Tools

Shared UX utilities for the main B1C3 project.

## Todo

- [ ] Implement software development standards
### Implement software development standards

- [ ] Review and understand B1C3 software development standards ([software-development-standards-of-b1c3](../software-development-standards-of-b1c3/))
- [ ] Audit current codebase for compliance
- [ ] Refactor code to meet standards (naming, structure, documentation)
- [ ] Update documentation to reflect standards
- [ ] Set up automated checks (linting, formatting, testing)
- [ ] Monitor and maintain standards adherence

## What lives here
- Small, dependency-light UX utilities and patterns
- Design tokens / theme helpers (if needed)
- Accessibility helpers

## Documentation

- **[API Documentation](docs/api/)** - Complete TypeDoc-generated API reference
- **[Interactive Playground](docs/interactive-playground.html)** - Try utilities live in your browser
- **[Utility Catalog](docs/utility-catalog.html)** - Searchable catalog of all utilities
- **[Getting Started Guide](docs/GETTING_STARTED.md)** - Quick start guide and examples
- **[Accessibility Guide](docs/ACCESSIBILITY_GUIDE.md)** - WCAG compliance and best practices
- **[Public Standards](docs/PUBLIC_STANDARDS.md)** - Guidelines and conventions used
- **[UX_STRATEGY.md](UX_STRATEGY.md)** - Overall strategy for DX, Accessibility, and Documentation
- **[docs/B1C3_GUI_GUIDE.md](docs/B1C3_GUI_GUIDE.md)** - B1C3 palette and GUI implementation rules
- **[docs/b1c3.tokens.json](docs/b1c3.tokens.json)** - JSON token file for tooling and theming
- **[docs/DX_CONVENTIONS.md](docs/DX_CONVENTIONS.md)** - API design patterns, naming conventions, and style guide
- **[docs/ACCESSIBILITY_CHECKLIST.md](docs/ACCESSIBILITY_CHECKLIST.md)** - Testing procedures and WCAG compliance requirements
- **[docs/DOCUMENTATION_INFRASTRUCTURE.md](docs/DOCUMENTATION_INFRASTRUCTURE.md)** - Setup for auto-generated docs and discoverability

## Usage

- Runtime helper: `applyB1c3Tokens()` applies the default palette as CSS variables (local dev uses `./src/index`).
- Token file: use [docs/b1c3.tokens.json](docs/b1c3.tokens.json) for design tooling or custom theming.

```ts
import { applyB1c3Tokens } from './src/index';

applyB1c3Tokens();
```

```css
.btn-primary {
	background: var(--b1c3-primary-teal);
	color: var(--b1c3-primary-white);
	border-radius: 6px;
	padding: 12px 24px;
}

.btn-primary:focus-visible {
	outline: 2px solid var(--b1c3-primary-navy);
	outline-offset: 2px;
}
```

```html
<button class="btn-primary">Open Repo</button>
```

```html
<section class="panel">
	<h2>Repo Status</h2>
	<div class="status-row">
		<span class="badge badge--success">Clean</span>
		<button class="btn-primary">Open Repo</button>
	</div>
	<label class="field">
		<span>Search</span>
		<input type="text" placeholder="Type a repo name" />
	</label>
</section>
```

## Todo

### Phase 1: Foundation (Completed)
- [x] Finalize DX API patterns and establish conventions
- [x] Create accessibility checklist and testing setup
- [x] Set up documentation infrastructure

### Phase 2: Existing Utilities (Completed)
- [x] Audit existing utilities against DX standards
- [x] Add comprehensive JSDoc comments
- [x] Conduct accessibility review and remediation
- [x] Generate initial API documentation

### Phase 3: Documentation & Discovery (Completed)
- [x] Build interactive example/playground
- [x] Create getting started guide
- [x] Build utility catalog with search
- [x] Write accessibility guide

### Phase 4: Polish & Launch
- **Gather user feedback:**
	- Share the interactive playground and utility catalog with target users (internal and external).
	- Add a feedback form link to the documentation and playground (e.g., Google Form or GitHub Discussions).
	- Encourage feedback via GitHub Issues for bugs, feature requests, and usability concerns.
	- Reach out to early adopters and stakeholders for direct input.
	- Monitor analytics (see below) for usage patterns and drop-off points.

- [ ] Gather user feedback
- [ ] Iterate based on developer feedback
- [ ] Create launch announcement

#### Draft: GitHub Launch Announcement

🚀 **B1C3 UX Tools is Live!**

We’re excited to announce the public release of B1C3 UX Tools—a collection of accessibility-first, dependency-light utilities for building beautiful, compliant, and maintainable user experiences.

**What’s inside?**
- Interactive Playground: Try utilities live and see instant results ([docs/interactive-playground.html](docs/interactive-playground.html))
- Utility Catalog: Search and explore all available helpers ([docs/utility-catalog.html](docs/utility-catalog.html))
- Design Tokens: Consistent, accessible color palette and theming ([docs/b1c3.tokens.json](docs/b1c3.tokens.json))
- Comprehensive Documentation: API docs, accessibility guide, and more

**Why B1C3 UX Tools?**
- Accessibility and WCAG compliance by default
- Developer experience (DX) focused patterns
- Small bundle size, no heavy dependencies
- Easy to integrate and extend

**Get Started:**
```sh
npm install b1c3-ux-tools
```
See the [Getting Started Guide](docs/GETTING_STARTED.md) for usage examples.

**Feedback & Contributions:**
We welcome your feedback! Please use the [GitHub Discussions](https://github.com/B1C3/b1c3-ux-tools/discussions) or open an issue for bugs and feature requests.

---
- [ ] Set up monitoring/analytics

## Dev
Because PowerShell script execution is restricted on this machine, prefer `npm.cmd` instead of `npm`.

```sh
npm.cmd install
npm.cmd run build
npm.cmd run typecheck
npm.cmd run docs
```
