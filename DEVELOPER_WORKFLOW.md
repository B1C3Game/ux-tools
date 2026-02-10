# Developer Workflow Guide for B1C3 UX Tools Repository

## Overview

This document provides a comprehensive workflow for software developers working with the B1C3 UX Tools repository. It covers environment setup, development practices, testing, documentation, code review, and deployment. Real-world examples are included to illustrate best practices and intended usage.

---

## 1. Environment Setup

### 1.1. Prerequisites
- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js)
- **Git**
- Recommended: **VS Code** with extensions for TypeScript, ESLint, and Prettier


### 1.2. Clone the Repository (Manual Step)
Clone the repository using your preferred Git client or the command line. If using the command line:
```sh
git clone https://github.com/B1C3Game/ux-tools.git
cd ux-tools
```
**Manual Tips:**
- Ensure you have the correct permissions to access the repository.
- If using a GUI client (e.g., GitHub Desktop, SourceTree), follow the application's prompts to clone and open the project folder.

### 1.3. Install Dependencies
```sh
npm install
```

---

## 2. Project Structure

- **src/**: Source code (TypeScript)
- **docs/**: Documentation and guides
- **examples/**: Usage examples and integration samples
- **project-docs/**: Project-level documentation
- **__tests__/**: Unit and integration tests

---

## 3. Development Workflow


### 3.1. Branching Strategy (Manual Step)
- Always create a new branch for each feature or bugfix: `feature/<name>` or `bugfix/<name>`
- Keep the `main` branch stable and up to date.
**Manual Tips:**
- Use descriptive branch names (e.g., `feature/add-accessibility-checks`).
- Regularly pull changes from `main` to keep your branch updated: `git pull origin main`.


### 3.2. Making Changes (Manual Steps)
1. **Create a new branch:**
   ```sh
   git checkout -b feature/add-new-utility
   ```
   - If using a GUI, use the branch creation feature and ensure you are working on the new branch.
2. **Implement your feature or fix:**
   - Manually edit or create files in `src/` using your code editor.
   - Add or update tests in `src/__tests__/`.
   - Update documentation in `docs/` or `project-docs/` as needed.
   - Save your changes frequently and use version control to track progress.
3. **Stage and commit your changes:**
   ```sh
   git add .
   git commit -m "Describe your changes"
   ```
   - Review your changes before committing. Use `git status` and `git diff` to inspect modifications.

#### Example: Adding a Utility Function
Suppose you want to add a new utility `capitalizeText`:
- Add `capitalizeText` to `src/utils.ts`
- Add tests in `src/__tests__/utils.test.ts`
- Document usage in `docs/utility-catalog.html`


### 3.3. Linting and Formatting (Manual Step)
- Run lint checks:
   ```sh
   npm run lint
   ```
- Format code:
   ```sh
   npm run format
   ```
**Manual Tips:**
- If lint errors are reported, manually review and fix the highlighted issues in your code editor.
- Use editor extensions for auto-formatting (e.g., Prettier) to reduce manual formatting effort.


### 3.4. Testing (Manual Step)
- Run all tests:
   ```sh
   npm test
   ```
- For TDD, run tests in watch mode:
   ```sh
   npm run test:watch
   ```
**Manual Tips:**
- If a test fails, manually review the test output, open the relevant test and source files, and debug the issue.
- Add new tests for any new features or bugfixes you implement.

#### Example: Fixing a Failing Test
If a test in `src/__tests__/validation.test.ts` fails:
- Review the error output
- Update the relevant function in `src/validation.ts`
- Re-run tests until all pass

---


## 4. Documentation (Manual Step)

- Update or add documentation for new features in `docs/` or `project-docs/`.
- Use Markdown for guides and HTML for reference docs.
- Keep `QUICK_REFERENCE.md` and `README.md` up to date.
**Manual Tips:**
- Open the relevant documentation file in your editor and add clear, concise explanations and examples.
- For new features, include usage instructions and code samples.
- Review documentation for clarity and completeness before committing.

#### Example: Documenting a New Focus Utility
- Add a section in `docs/B1C3_GUI_GUIDE.md` describing the new utility, its purpose, and usage.
- Update `docs/utility-catalog.html` with code examples and integration tips.

---


## 5. Code Review & Pull Requests (Manual Steps)

1. **Push your branch:**
   ```sh
   git push origin feature/add-new-utility
   ```
   - If using a GUI, use the push feature to upload your branch to the remote repository.
2. **Open a Pull Request (PR):**
   - Navigate to the repository on GitHub.
   - Click "Compare & pull request" for your branch.
   - Fill in a descriptive title and summary.
   - Reference related issues or documentation.
   - Ensure all checks pass (lint, tests) before submitting.
3. **Respond to feedback:**
   - Review comments from reviewers.
   - Make requested changes in your branch, commit, and push again.
   - Re-request review if needed.
   - Engage in discussion to clarify any questions.

#### Example: Submitting a PR
- Title: "Add capitalizeText utility to utils"
- Description: "Implements a function to capitalize the first letter of a string. Includes tests and documentation."

---


## 6. Merging & Deployment (Manual Steps)

- Only merge PRs after approval and passing all checks.
- Use the GitHub interface to merge PRs ("Squash and merge" or "Merge pull request").
- Use the `main` branch for releases.
- Tag releases as needed using the GitHub releases page or via command line:
   ```sh
   git tag v1.2.3
   git push origin v1.2.3
   ```
**Manual Tips:**
- Double-check that all documentation and tests are up to date before merging.
- Communicate with the team about new releases or breaking changes.

---


## 7. Real-World Usage Scenarios

### Scenario 1: Adding a New Validation Rule
1. Create a branch: `feature/validate-phone`
2. Implement `isValidPhone` in `src/validation.ts`
3. Add tests in `src/__tests__/validation.test.ts`
4. Document in `docs/validation-guide.md`
5. Lint, test, and submit a PR

### Scenario 2: Improving Accessibility
1. Update `docs/ACCESSIBILITY_CHECKLIST.md` with new criteria
2. Refactor components in `src/` to meet new standards
3. Add examples in `examples/real-world-integration.ts`
4. Test and document changes

### Scenario 3: Integrating with a Real Project
1. Reference utilities from `src/` in your own project
2. Follow examples in `examples/real-world-integration.ts`
3. Consult `docs/` for API and usage guidance

---


## 8. Best Practices (Manual Habits)
- Write clear, maintainable code with meaningful comments.
- Keep tests and documentation up to date with every change.
- Follow accessibility and UX standards outlined in project docs.
- Communicate changes clearly in PRs and team discussions.

---


## 9. Troubleshooting (Manual Step)
- **Build errors:**
   - Review TypeScript and lint output in the terminal or editor.
   - Manually inspect the code for typos, missing imports, or type mismatches.
- **Test failures:**
   - Review stack traces and error messages.
   - Open the relevant test and source files, debug, and rerun tests.
- **Dependency issues:**
   - Run `npm install` to refresh dependencies.
   - Manually update `package.json` if new packages are needed, then run `npm install` again.

---


## 10. Additional Resources
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- [SOFTWARE_DEVELOPMENT_STANDARDS.md](SOFTWARE_DEVELOPMENT_STANDARDS.md)
- [DX_CONVENTIONS.md](docs/DX_CONVENTIONS.md)
- [ACCESSIBILITY_GUIDE.md](docs/ACCESSIBILITY_GUIDE.md)



---


## 11. Automation Opportunities & Best Practices

Many tasks in the development workflow can be automated to improve efficiency, consistency, and reliability. The b1c3-ux-tools package is designed to integrate smoothly into automated workflows, both for development within this repository and for external projects that consume these utilities. Below are common automation opportunities, best practices, and specific guidance for integrating b1c3-ux-tools:

### Linting and Formatting
- **Automation:**
   - Use pre-commit hooks (e.g., with [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://github.com/typicode/husky)) to automatically lint and format code before each commit.
   - Configure your editor to auto-format on save (e.g., with Prettier or ESLint extensions).
- **Best Practice:**
   - Ensure all contributors have the same linting and formatting rules by sharing configuration files (e.g., `.eslintrc`, `.prettierrc`).
   - Run `npm run lint` and `npm run format` as part of CI workflows to enforce standards.

#### Integrating b1c3-ux-tools
- If you use b1c3-ux-tools in another project, ensure your linting rules are compatible with the code style of the utilities. You can extend or reference the linting configuration from this repo for consistency.

### Testing
- **Automation:**
   - Set up continuous integration (CI) to run all tests automatically on every push and pull request (e.g., using GitHub Actions, Travis CI, or similar).
   - Use watch mode (`npm run test:watch`) during development for instant feedback.
- **Best Practice:**
   - Require all tests to pass before merging PRs.
   - Add new tests for every new feature or bugfix.

#### Integrating b1c3-ux-tools
- When using b1c3-ux-tools in your own project, write automated tests that import and exercise the utilities as part of your CI pipeline.
- Example (in your test file):
  ```ts
  import { isValidEmail } from 'b1c3-ux-tools';
  expect(isValidEmail('test@example.com')).toBe(true);
  ```
- Add b1c3-ux-tools to your `devDependencies` or `dependencies` and ensure your test runner (e.g., Vitest, Jest) is configured to resolve the package.

### Dependency Management
- **Automation:**
   - Use tools like [Dependabot](https://github.com/dependabot) to automatically check for and propose updates to dependencies.
   - Run `npm audit` regularly (or in CI) to detect vulnerabilities.
- **Best Practice:**
   - Review and test dependency updates before merging.
   - Keep dependencies up to date to minimize security risks.

#### Integrating b1c3-ux-tools
- If you depend on b1c3-ux-tools, configure Dependabot or a similar tool to notify you of new releases so you can stay up to date with bug fixes and new features.

### Documentation Generation
- **Automation:**
   - Use tools like [TypeDoc](https://typedoc.org/) to generate API documentation from TypeScript source code.
   - Automate documentation builds in CI to ensure docs are always current.
- **Best Practice:**
   - Document new features and changes in code comments and Markdown files.
   - Link generated docs in the main documentation site or README.

#### Integrating b1c3-ux-tools
- If you build your own documentation site, you can reference or embed documentation generated from b1c3-ux-tools (see `docs/api/` for HTML output).
- For custom integrations, use TypeDoc or similar tools to generate unified docs that include both your code and b1c3-ux-tools APIs.

### Release and Versioning
- **Automation:**
   - Use tools like [semantic-release](https://semantic-release.gitbook.io/) to automate versioning and changelog generation based on commit messages.
   - Automate publishing to npm or other registries as part of the release process.
- **Best Practice:**
   - Follow conventional commit message guidelines for automated changelog generation.
   - Tag releases consistently and document changes.

#### Integrating b1c3-ux-tools
- When you update b1c3-ux-tools in your project, automate changelog updates and regression testing to ensure compatibility.

### Example: Setting Up a Pre-commit Hook for Linting
1. Install Husky and lint-staged:
    ```sh
    npm install --save-dev husky lint-staged
    ```
2. Add to `package.json`:
    ```json
    "husky": {
       "hooks": {
          "pre-commit": "lint-staged"
       }
    },
    "lint-staged": {
       "*.ts": ["npm run lint", "npm run format"]
    }
    ```
3. Now, every time you commit, linting and formatting will run automatically on staged files.

---

### Example: CI Integration with b1c3-ux-tools

Suppose you want to use b1c3-ux-tools in your own project and ensure it works as part of your automated pipeline. Here’s a sample GitHub Actions workflow:

```yaml
name: CI
on:
   push:
      branches: [main]
   pull_request:
      branches: [main]
jobs:
   build-and-test:
      runs-on: ubuntu-latest
      steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
            with:
               node-version: '18'
         - run: npm install
         - run: npm test
```

In your `package.json`, add b1c3-ux-tools as a dependency:
```json
"dependencies": {
   "b1c3-ux-tools": "^1.0.0"
}
```

Now, your tests and builds will automatically use the latest version of b1c3-ux-tools, and any issues will be caught early in your CI pipeline.

---


For further questions, consult the documentation or reach out to the project maintainers.