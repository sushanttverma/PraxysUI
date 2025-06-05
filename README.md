<div align="center">

# Praxys UI

**A curated collection of 44 beautifully crafted, animated React components.**

Browse. Copy. Paste. Ship.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?style=flat-square&logo=framer)](https://www.framer.com/motion)
[![License](https://img.shields.io/badge/License-MIT-E84E2D?style=flat-square)](LICENSE)

[Live Demo](https://ui.praxys.xyz) · [Documentation](https://ui.praxys.xyz/docs) · [Components](https://ui.praxys.xyz/docs/components-overview) · [Theme Customizer](https://ui.praxys.xyz/customize)

</div>

---

## About

Praxys UI is an open-source component library and documentation site for animated React components. No npm package to install — browse the docs, copy the source code, and drop it into your project.

- **Copy & Paste** — No dependency on a package registry. Own the code.
- **TypeScript First** — Full type safety with well-defined interfaces.
- **Animated** — Powered by Framer Motion for smooth, performant animations.
- **Themeable** — Light and dark mode with CSS custom properties. [Customize your theme](https://ui.praxys.xyz/customize).
- **CLI Available** — Scaffold components directly from the terminal.

## Components

44 production-ready components across 6 categories:

| Category | Components |
|----------|-----------|
| **Buttons** | Animated Button, Creepy Button, Social Flip Button, Animated Toggle |
| **Cards & Layout** | Glow Border Card, Testimonials Card, Staggered Grid, Expandable Bento Grid, Perspective Grid, Spotlight Card |
| **Text Effects** | Flip Text, Animated Number, Flip Fade Text, Displacement Text, Typewriter Text, Morphing Text, Animated Counter |
| **Navigation** | Line Hover Link, Spotlight Navbar, Glass Dock, Accordion, Animated Tabs, Modal Dialog, Tooltip, Dropdown Menu, Stepper, Infinite Scroll, Command Menu |
| **Visual Effects** | Light Lines, Liquid Ocean, Liquid Metal, Reveal Loader, Toast Notification, Magnetic Cursor, Parallax Scroll, Gradient Mesh, Skeleton Loader, Progress Bar |
| **Media & Content** | Animated Hero, Masked Avatars, Folder Preview, Interactive Book, Logo Slider, Image Comparison |

Every component includes a live preview, full source code, installation steps, usage example, interactive props playground, and props table.

## Quick Start

### Option A: Use the CLI

```bash
npx praxys-ui init
npx praxys-ui add animated-button
npx praxys-ui list
```

The `init` command installs shared dependencies (`clsx`, `tailwind-merge`, `framer-motion`) and creates the `cn()` utility. Then use `add` to pull any component directly into your project.

### Option B: Manual setup

**1. Install dependencies**

```bash
npm install framer-motion clsx tailwind-merge
```

**2. Add the `cn()` utility**

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**3. Copy any component** from `app/components/ui/` into your project and import it.

## Running Locally

```bash
git clone https://github.com/sushanttverma/Praxys-UI.git
cd Praxys-UI
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or [http://localhost:3000/docs](http://localhost:3000/docs) for documentation.

## Features

- **44 Animated Components** — Buttons, cards, text effects, navigation, visual effects, and media components
- **Interactive Props Playground** — Tweak every prop and see changes live on each component page
- **Light / Dark Mode** — Theme toggle with CSS custom properties, persisted to localStorage, no FOUC
- **Theme Customizer** — Pick brand colors, preview components live, export CSS / JSON / Tailwind config
- **Command Palette** — Press `Ctrl+K` to fuzzy-search across all components and docs pages
- **Shiki Syntax Highlighting** — Server-rendered code blocks with dual themes (vitesse-dark / vitesse-light)
- **Dynamic Docs** — Single `[slug]` route with a component registry, no per-page files needed
- **Templates Gallery** — Curated page templates to jumpstart full layouts
- **CLI Tool** — `npx praxys-ui init` / `add` / `list` to scaffold components from the terminal
- **Examples & Recipes** — Real-world patterns combining multiple components

## Project Structure

```
praxys-ui/
├── app/
│   ├── globals.css              # Design system — brand palette, fonts, scrollbar, noise, glow
│   ├── layout.tsx               # Root layout — font loading, ThemeProvider, FOUC prevention
│   ├── page.tsx                 # Landing page
│   ├── fonts/
│   │   └── GeistPixel-Square.woff2
│   ├── components/
│   │   ├── ui/                  # 44 reusable animated components
│   │   ├── demos/               # Demo wrappers for docs previews
│   │   ├── ThemeProvider.tsx     # React context + localStorage + system preference
│   │   ├── ThemeToggle.tsx       # Animated sun/moon toggle
│   │   ├── CommandPalette.tsx    # Ctrl+K search modal
│   │   ├── Navbar.tsx            # Site navbar
│   │   ├── Hero.tsx, Features.tsx, ComponentGrid.tsx, CTA.tsx, Footer.tsx
│   │   └── ComponentShowcase.tsx # Landing marquee carousel
│   ├── customize/               # Theme customizer page
│   ├── docs/
│   │   ├── layout.tsx           # Server layout
│   │   ├── DocsShell.tsx        # Client shell — navbar + sidebar toggle
│   │   ├── page.tsx             # /docs — introduction
│   │   ├── components/          # Sidebar, CodeBlock, CopyButton, PropsPlayground, etc.
│   │   └── [slug]/
│   │       ├── page.tsx         # Dynamic route for all doc + component pages
│   │       ├── ComponentPageClient.tsx
│   │       └── pages/           # Static doc page content (intro, installation, etc.)
│   ├── templates/               # Templates gallery + individual template pages
│   └── changelog/               # Changelog page
├── lib/
│   ├── utils.ts                 # cn() utility
│   ├── registry.ts              # Component registry + sidebar configuration
│   └── templates.ts             # Templates registry
├── packages/
│   └── cli/                     # npx praxys-ui CLI tool (v0.2.0)
│       ├── package.json
│       ├── tsconfig.json
│       └── src/index.ts
├── .github/
│   ├── ISSUE_TEMPLATE/          # Bug report and feature request templates
│   └── pull_request_template.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── package.json
└── README.md
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
| Fonts | Geist Pixel Square · Satoshi · JetBrains Mono |

## Design System

Praxys UI uses a warm palette with five intentional brand colors and full light/dark mode support:

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

1. **Add a component** — Create it in `app/components/ui/`, add a demo in `app/components/demos/`, register it in `lib/registry.ts`, and add its slug to `packages/cli/src/index.ts`.
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
