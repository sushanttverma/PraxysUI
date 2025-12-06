<div align="center">

# praxys-ui

**CLI for scaffolding [Praxys UI](https://ui.praxys.xyz) components into your React project.**

[![npm version](https://img.shields.io/npm/v/praxys-ui?style=flat-square&color=E84E2D&logo=npm)](https://www.npmjs.com/package/praxys-ui)
[![npm downloads](https://img.shields.io/npm/dm/praxys-ui?style=flat-square&color=C9958A)](https://www.npmjs.com/package/praxys-ui)
[![License](https://img.shields.io/badge/License-MIT-E84E2D?style=flat-square)](LICENSE)

</div>

---

## Install

No global install needed — use `npx`:

```bash
npx praxys-ui init
```

Or install globally:

```bash
npm i -g praxys-ui
```

## Setup

```bash
npx praxys-ui init
```

This will:

1. Detect your package manager (npm, pnpm, yarn, bun)
2. Install core dependencies (`clsx`, `tailwind-merge`, `framer-motion`)
3. Create `lib/utils.ts` with the `cn()` helper
4. Write `praxys.config.json` for directory defaults

## Adding Components

```bash
# Interactive picker — browse and select from categories
npx praxys-ui add

# Add by name
npx praxys-ui add animated-button

# Add multiple at once
npx praxys-ui add accordion alert badge tooltip

# Add all 100 components
npx praxys-ui add all

# Add and install dependencies
npx praxys-ui add floating-menu --install-deps
```

## Browsing Components

```bash
# List all components (grouped by category)
npx praxys-ui list

# Filter by category
npx praxys-ui list --category buttons

# Show only new components
npx praxys-ui list --new

# Search by name or description
npx praxys-ui list --search modal

# Show only installed components
npx praxys-ui list --installed

# Component details
npx praxys-ui info animated-button
```

**Output:**

```
  Animated Button
  Category: buttons
  Dependencies: framer-motion, clsx, tailwind-merge
  A button with a shiny border sweep and text reveal effect.
  Docs: https://praxysui.vercel.app/components/animated-button
```

## Inspecting & Comparing

```bash
# View source with syntax highlighting
npx praxys-ui view switch

# Compare local file with latest version
npx praxys-ui diff accordion
```

## Managing Components

```bash
# Remove a component
npx praxys-ui remove alert
npx praxys-ui rm alert --yes    # skip confirmation

# Update all installed components
npx praxys-ui update

# Update a specific component
npx praxys-ui update accordion

# Check for updates without writing
npx praxys-ui update --check
```

## Diagnostics

```bash
# Check project setup
npx praxys-ui doctor
```

```
  ✓ praxys.config.json found
  ✓ Components directory exists (components/ui)
  ✓ Utils file exists (lib/utils.ts)
  ✓ Package manager: pnpm
  ✓ clsx installed (^2.1.1)
  ✓ tailwind-merge installed (^2.6.0)
  ✓ framer-motion installed (^12.0.0)
  ✓ 12/100 components installed

  All checks passed!
```

```bash
# Installed vs available breakdown
npx praxys-ui stats
```

```
  Category        Installed   Available
  ────────────────────────────────────────
  buttons            5/17     █████░░░░░░░░░░░░
  cards              3/10     ███░░░░░░░
  text               2/8      ██░░░░░░
  navigation         2/18     ██░░░░░░░░░░░░░░░░
  visual             0/12     ░░░░░░░░░░░░
  media              0/6      ░░░░░░
  ────────────────────────────────────────
  Total             12/100

  Coverage: 17% of components installed
```

## Commands Reference

| Command | Alias | Description |
|---------|-------|-------------|
| `init` | `i` | Initialize project — deps, utils, config |
| `add [components...]` | | Add components (interactive picker if no args) |
| `list` | `ls` | List components with filters |
| `info <component>` | | Show component metadata |
| `view <component>` | | View source with syntax highlighting |
| `diff <component>` | | Compare local vs remote |
| `remove <component>` | `rm` | Remove a component file |
| `update [component]` | | Update installed components |
| `doctor` | | Check project health |
| `stats` | | Installed vs available dashboard |

### Global Options

| Flag | Commands | Description |
|------|----------|-------------|
| `-d, --dir <path>` | add, list, diff, remove, update, stats | Override component directory |
| `-y, --yes` | add, remove | Skip confirmation prompts |
| `--install-deps` | add | Install component dependencies |
| `-c, --category <cat>` | list | Filter by category |
| `-n, --new` | list | Show only new components |
| `-s, --search <query>` | list | Search by name/description |
| `--installed` | list | Show only installed components |
| `--check` | update | Dry-run — report changes only |

## Config File

After `init`, a `praxys.config.json` is created:

```json
{
  "componentsDir": "components/ui",
  "utilsDir": "lib"
}
```

All commands read this file for directory defaults. You can override per-command with `--dir`.

## Components

100 components across 6 categories:

- **Buttons** (17) — Animated Button, Checkbox, Color Picker, Date Picker, File Upload, OTP Input, Rating, Slider, Switch, and more
- **Cards** (10) — Data Table, Glow Border Card, Spotlight Card, Stats Card, Timeline, and more
- **Text** (8) — Flip Text, Morphing Text, Typewriter Text, 3D Displacement Text, and more
- **Navigation** (18) — Accordion, Command Menu, Glass Dock, Combobox, Autocomplete, Floating Menu, and more
- **Visual** (12) — Liquid Ocean, Gradient Mesh, Parallax Scroll, Toast Notification, and more
- **Media** (6) — Animated Hero, Interactive Book, Image Comparison, and more

Browse all components at [ui.praxys.xyz/docs/components-overview](https://ui.praxys.xyz/docs/components-overview).

## License

MIT
