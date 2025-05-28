# Contributing to Praxys UI

Thank you for your interest in contributing to Praxys UI! This guide will help you get started.

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, yarn, or bun

### Local Development

1. **Fork and clone the repository:**

   ```bash
   git clone https://github.com/<your-username>/Praxys-UI.git
   cd Praxys-UI
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the dev server:**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  components/
    ui/          # Reusable components (the actual library)
    demos/       # Demo wrappers for each component
  docs/          # Documentation pages
  customize/     # Theme customizer page
  templates/     # Template gallery pages
lib/
  registry.ts    # Component registry (metadata, code, props, playground)
  utils.ts       # Utility functions (cn)
packages/
  cli/           # npm CLI tool (praxys-ui)
```

## Adding a New Component

1. **Create the component** in `app/components/ui/<slug>.tsx`:
   - Must be a `'use client'` component
   - Import `cn` from `@/lib/utils`
   - Export a default component
   - Use Tailwind CSS classes with the Praxys design tokens (`text-chalk`, `bg-void`, etc.)
   - Use Framer Motion for animations

2. **Create a demo** in `app/components/demos/<slug>-demo.tsx`:
   - Import your component
   - Render a self-contained demo with sample props

3. **Register it** in `lib/registry.ts`:
   - Add an entry to `sidebarGroups` under "Components"
   - Add a `ComponentEntry` to `componentRegistry` with:
     - `slug`, `title`, `description`, `category`
     - `dependencies` array
     - `code` (the full source as a template string)
     - `usage` example
     - `props` table
     - `playground` config (controls + optional defaults)
     - `component` and `demo` dynamic imports

4. **Update the CLI** in `packages/cli/src/index.ts`:
   - Add the slug to `COMPONENT_LIST` (keep alphabetical order)

5. **Test the build:**

   ```bash
   npm run build
   ```

## Code Style

- TypeScript strict mode
- Tailwind CSS v4 with `@theme inline` design tokens
- Framer Motion for animations (avoid `ease` string in `Variants` — use tuples)
- Components should be self-contained and copy-pasteable
- Use CSS custom properties (`var(--color-*)`) for theme-aware colors

## Commit Messages

We follow conventional commits:

- `feat:` — New feature or component
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `chore:` — Tooling, config, or dependency updates
- `refactor:` — Code restructuring without behavior change

## Pull Request Process

1. Create a branch from `main` with a descriptive name (e.g., `feat/accordion-component`)
2. Make your changes following the guidelines above
3. Run `npm run build` to verify no errors
4. Submit a pull request with a clear description
5. Wait for review — we aim to review PRs within a few days

## Bug Reports

Please use the [Bug Report issue template](https://github.com/sushanttverma/Praxys-UI/issues/new?template=bug_report.md) and include:

- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

## Feature Requests

Use the [Feature Request issue template](https://github.com/sushanttverma/Praxys-UI/issues/new?template=feature_request.md).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
