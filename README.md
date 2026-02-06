# B1C3 UX Tools

Shared UX utilities for the main B1C3 project.

## What lives here
- Small, dependency-light UX utilities and patterns
- Design tokens / theme helpers (if needed)
- Accessibility helpers

## Documentation

- **[UX_STRATEGY.md](UX_STRATEGY.md)** - Overall strategy for DX, Accessibility, and Documentation
- **[docs/DX_CONVENTIONS.md](docs/DX_CONVENTIONS.md)** - API design patterns, naming conventions, and style guide
- **[docs/ACCESSIBILITY_CHECKLIST.md](docs/ACCESSIBILITY_CHECKLIST.md)** - Testing procedures and WCAG compliance requirements
- **[docs/DOCUMENTATION_INFRASTRUCTURE.md](docs/DOCUMENTATION_INFRASTRUCTURE.md)** - Setup for auto-generated docs and discoverability

## Todo

### Phase 1: Foundation (In Progress)
- [x] Finalize DX API patterns and establish conventions
- [x] Create accessibility checklist and testing setup
- [x] Set up documentation infrastructure

### Phase 2: Existing Utilities
- [ ] Audit existing utilities against DX standards
- [ ] Add comprehensive JSDoc comments
- [ ] Conduct accessibility review and remediation
- [ ] Generate initial API documentation

### Phase 3: Documentation & Discovery
- [ ] Build interactive example/playground
- [ ] Create getting started guide
- [ ] Build utility catalog with search
- [ ] Write accessibility guide

### Phase 4: Polish & Launch
- [ ] Gather user feedback
- [ ] Iterate based on developer feedback
- [ ] Create launch announcement
- [ ] Set up monitoring/analytics

## Dev
Because PowerShell script execution is restricted on this machine, prefer `npm.cmd` instead of `npm`.

```sh
npm.cmd install
npm.cmd run build
npm.cmd run typecheck
```
