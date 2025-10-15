<div align="center">

# Praxys UI

**70+ beautifully crafted, animated React components. One CLI to rule them all.**

Browse. Add. Ship.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?style=flat-square&logo=framer)](https://www.framer.com/motion)
[![License](https://img.shields.io/badge/License-MIT-E84E2D?style=flat-square)](LICENSE)
[![npm version](https://img.shields.io/npm/v/praxys-ui?style=flat-square&color=E84E2D&logo=npm)](https://www.npmjs.com/package/praxys-ui)
[![npm downloads](https://img.shields.io/npm/dm/praxys-ui?style=flat-square&color=C9958A)](https://www.npmjs.com/package/praxys-ui)
[![GitHub stars](https://img.shields.io/github/stars/sushanttverma/Praxys-UI?style=flat-square&color=F2ECE2&logo=github)](https://github.com/sushanttverma/Praxys-UI)
[![CI](https://img.shields.io/github/actions/workflow/status/sushanttverma/Praxys-UI/ci.yml?style=flat-square&label=CI&logo=githubactions)](https://github.com/sushanttverma/Praxys-UI/actions)

[Live Demo](https://ui.praxys.xyz) · [Documentation](https://ui.praxys.xyz/docs) · [Components](https://ui.praxys.xyz/docs/components-overview) · [Animation Studio](https://ui.praxys.xyz/studio) · [Theme Customizer](https://ui.praxys.xyz/customize)

</div>

---

## About

Praxys UI is an open-source component library for animated React components. No runtime dependency — you own the source code. Use the CLI to scaffold components into your project in seconds, or copy them manually from the docs.

- **Copy & Paste** — No package registry dependency. Own the code.
- **TypeScript First** — Full type safety with well-defined interfaces.
- **Animated** — Powered by Framer Motion for smooth, performant animations.
- **Themeable** — Light and dark mode with CSS custom properties. [Customize your theme](https://ui.praxys.xyz/customize).
- **Full-featured CLI** — Add, remove, update, diff, search, and manage components from the terminal.
- **Animation Studio** — Visually design animations with live preview and instant code export.

## Quick Start

### Option A: Use the CLI (recommended)

```bash
# Initialize your project
npx praxys-ui init

# Add components by name
npx praxys-ui add animated-button accordion toast-notification

# Or pick interactively
npx praxys-ui add
```

The `init` command installs shared dependencies, creates `cn()`, and writes a `praxys.config.json`. Then use `add` to pull any component directly into your project.

### Option B: Manual setup

```bash
npm install framer-motion clsx tailwind-merge
```

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Copy any component from `app/components/ui/` into your project and import it.

## CLI

The CLI (`npx praxys-ui`) is the fastest way to work with Praxys UI components.

### Commands

```bash
# Setup
praxys-ui init              # Initialize project (alias: i)

# Adding components
praxys-ui add               # Interactive multi-select picker
praxys-ui add accordion     # Add a single component
praxys-ui add alert badge   # Add multiple at once
praxys-ui add all           # Add all 71 components
praxys-ui add alert --install-deps  # Add + install dependencies

# Browsing
praxys-ui list                      # List all components (alias: ls)
praxys-ui list --category buttons   # Filter by category
praxys-ui list --new                # Show only new components
praxys-ui list --search modal       # Search by name/description
praxys-ui list --installed          # Show only installed components
praxys-ui info animated-button      # Component details + docs link

# Inspecting
praxys-ui view switch        # View source with syntax highlighting
praxys-ui diff accordion     # Compare local file with latest version

# Managing
praxys-ui remove alert              # Remove with confirmation (alias: rm)
praxys-ui remove alert --yes        # Remove without confirmation
praxys-ui update                    # Update all installed components
praxys-ui update accordion          # Update a specific component
praxys-ui update --check            # Check for updates without writing

# Diagnostics
praxys-ui doctor             # Check project setup for issues
praxys-ui stats              # Installed vs available breakdown by category
```

### Features

- **Interactive picker** — Run `add` with no arguments to browse and select from a categorized list
- **Multi-component add** — `add accordion alert badge` fetches in parallel batches
- **Did-you-mean** — Typo `animted-button`? The CLI suggests `animated-button`
- **Config file** — `praxys.config.json` stores your component and utils directories
- **Auto-detect package manager** — Works with npm, pnpm, yarn, and bun
- **Update checker** — Notifies you when a new CLI version is available

## Components

71 production-ready components across 6 categories:

| Category | Count | Highlights |
|----------|-------|-----------|
| **Buttons** | 17 | Animated Button, Creepy Button, Social Flip Button, Color Picker, Date Picker, File Upload, OTP Input, Rating, Slider, Switch |
| **Cards & Layout** | 10 | Glow Border Card, Spotlight Card, Data Table, Expandable Bento Grid, Perspective Grid, Stats Card, Timeline |
| **Text Effects** | 8 | Flip Text, Morphing Text, Typewriter Text, 3D Displacement Text, Animated Counter, Animated Number |
| **Navigation** | 18 | Accordion, Animated Tabs, Command Menu, Glass Dock, Spotlight Navbar, Combobox, Autocomplete, Floating Menu |
| **Visual Effects** | 12 | Liquid Ocean, Liquid Metal, Gradient Mesh, Parallax Scroll, Magnetic Cursor, Toast Notification, Skeleton Loader |
| **Media & Content** | 6 | Animated Hero, Interactive Book, Image Comparison, Folder Preview, Logo Slider, Masked Avatars |

Every component includes a live preview, full source code, usage example, interactive props playground, and props API table.

## Animation Studio

The [Animation Studio](https://ui.praxys.xyz/studio) lets you visually design animations for any component:

- **Live preview** — See animations play in real-time as you adjust parameters
- **30+ presets** — Entrance, attention, exit, and loop animations
- **Code export** — Copy Framer Motion or CSS `@keyframes` code instantly
- **Color schemes** — 10 pre-made palettes + random palette generator

## Running Locally

```bash
git clone https://github.com/sushanttverma/Praxys-UI.git
cd Praxys-UI
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or [http://localhost:3000/docs](http://localhost:3000/docs) for documentation.

## Features

- **71 Animated Components** — Buttons, cards, text effects, navigation, visual effects, and media
- **Animation Studio** — Visual animation builder with live preview and code export
- **Interactive Props Playground** — Tweak every prop and see changes live
- **Light / Dark Mode** — Theme toggle with CSS custom properties, persisted to localStorage
- **Theme Customizer** — Pick brand colors, preview live, export CSS / JSON / Tailwind config
- **Command Palette** — `Ctrl+K` to fuzzy-search all components and docs
- **Shiki Syntax Highlighting** — Server-rendered code blocks with dual themes
- **Dynamic Docs** — Single `[slug]` route with a component registry
- **Templates Gallery** — Curated page templates to jumpstart full layouts
- **Full CLI** — init, add, remove, update, diff, view, list, info, doctor, stats

## Project Structure

```
praxys-ui/
├── app/
│   ├── globals.css              # Design system — brand palette, fonts, scrollbar
│   ├── layout.tsx               # Root layout — fonts, ThemeProvider
│   ├── page.tsx                 # Landing page
│   ├── components/
│   │   ├── ui/                  # 71 reusable animated components
│   │   ├── demos/               # Demo wrappers for docs previews
│   │   └── shared/              # Navbar, Footer, ThemeProvider, CommandPalette
│   ├── studio/                  # Animation Studio
│   ├── customize/               # Theme customizer
│   ├── docs/
│   │   ├── components/          # Sidebar, CodeBlock, PropsPlayground
│   │   └── [slug]/              # Dynamic component + doc pages
│   └── templates/               # Templates gallery
├── lib/
│   ├── utils.ts                 # cn() utility
│   └── registry/                # Component metadata (71 entries)
├── packages/
│   └── cli/                     # npx praxys-ui (v1.3.1)
│       ├── package.json
│       ├── tsconfig.json
│       └── src/index.ts
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── CHANGELOG.md
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Animation | [Framer Motion 12](https://www.framer.com/motion) |
| Syntax Highlighting | [Shiki](https://shiki.style) (dual-theme, server-rendered) |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | Geist Pixel Square, Satoshi, JetBrains Mono |

## Design System

Praxys UI uses a warm palette with full light/dark mode support:

| Token | Dark | Light | Role |
|-------|------|-------|------|
| **Void** | `#050505` | `#FAFAF8` | Primary background |
| **Obsidian** | `#0B0A08` | `#F0EDE8` | Surface / card background |
| **Ignite** | `#E84E2D` | `#D4432A` | Brand accent |
| **Blush** | `#C9958A` | `#8B6B62` | Secondary text, hover states |
| **Chalk** | `#F2ECE2` | `#1A1714` | Primary text |

All colors are available as CSS custom properties and Tailwind utilities. Use the [Theme Customizer](https://ui.praxys.xyz/customize) to create your own palette.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

1. **Add a component** — Create it in `app/components/ui/`, add a demo in `app/components/demos/`, register it in `lib/registry/`, and the CLI picks it up automatically.
2. **Improve existing components** — Better animations, accessibility, or customization.
3. **Fix bugs** — Open an issue or submit a PR.

```bash
git checkout -b feature/my-component
npm run build   # Verify build passes
npm run lint    # Check for lint errors
```

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [Sushant Verma](https://github.com/sushanttverma)

</div>
