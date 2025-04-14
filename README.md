<div align="center">

# Praxys UI

**A curated collection of beautifully crafted, animated React components.**

Build stunning interfaces with precision and speed. Copy, paste, and customize.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?style=flat-square&logo=framer)](https://www.framer.com/motion)
[![License](https://img.shields.io/badge/License-MIT-E84E2D?style=flat-square)](LICENSE)

[Live Demo](https://praxys-ui.vercel.app) &bull; [Documentation](https://praxys-ui.vercel.app/docs) &bull; [Components](https://praxys-ui.vercel.app/docs/components-overview)

</div>

---

## About

Praxys UI is an open-source component library and documentation site for animated React components. No npm package to install — just browse the docs, copy the source code, and drop it into your project.

Every component is:

- **Copy & Paste** — No dependency on a package registry. Own the code.
- **Fully Customizable** — Built with Tailwind CSS, accepts `className` props.
- **TypeScript First** — Full type safety with well-defined interfaces.
- **Animated** — Powered by Framer Motion for smooth, performant animations.

## Components

### Available Now

| Component | Category | Description |
|-----------|----------|-------------|
| **Animated Button** | Buttons | Shiny border sweep + text reveal effect |
| **Flip Text** | Text Effects | 3D character-by-character flip animation |
| **Glow Border Card** | Cards | Cursor-tracking radial glow border |
| **Animated Number** | Text Effects | Spring-animated number counter |
| **Line Hover Link** | Navigation | Sliding underline on hover |
| **Light Lines** | Visual Effects | Animated vertical light beams |

### Coming Soon

| Component | Category |
|-----------|----------|
| Creepy Button | Buttons |
| Social Flip Button | Buttons |
| Testimonials Card | Cards & Layout |
| Staggered Grid | Cards & Layout |
| Expandable Bento Grid | Cards & Layout |
| Perspective Grid | Cards & Layout |
| Flip Fade Text | Text Effects |
| 3D Displacement Text | Text Effects |
| Spotlight Navbar | Navigation |
| Glass Dock | Navigation |
| Liquid Ocean | Visual Effects |
| Liquid Metal | Visual Effects |
| Animated Hero | Media & Content |
| Masked Avatars | Media & Content |
| Folder Preview | Media & Content |
| Interactive Book | Media & Content |
| Reveal Loader | Visual Effects |
| Logo Slider | Media & Content |

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/sushanttverma/Praxys-UI.git
cd Praxys-UI
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page, or [http://localhost:3000/docs](http://localhost:3000/docs) for the documentation.

### 3. Use a component in your own project

```bash
# In your project, install the shared dependencies
npm install framer-motion clsx tailwind-merge
```

Add the `cn()` utility:

```ts
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Then copy any component from `app/components/ui/` into your project and import it.

## Project Structure

```
praxys-ui/
├── app/
│   ├── components/
│   │   ├── ui/               # Reusable animated components
│   │   ├── demos/            # Demo wrappers for docs previews
│   │   ├── Navbar.tsx        # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   └── ...
│   ├── docs/
│   │   ├── layout.tsx        # Docs shell (sidebar + navbar)
│   │   ├── page.tsx          # /docs intro page
│   │   ├── [slug]/
│   │   │   ├── page.tsx      # Dynamic route for all doc/component pages
│   │   │   └── pages/        # Static doc page content
│   │   └── components/       # Docs UI (CodeBlock, Sidebar, etc.)
│   ├── globals.css           # Design system & brand palette
│   ├── layout.tsx            # Root layout with font loading
│   └── page.tsx              # Landing page
├── lib/
│   ├── utils.ts              # cn() utility
│   └── registry.ts           # Component registry & sidebar config
└── package.json
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Animation | [Framer Motion 12](https://www.framer.com/motion) |
| Syntax Highlighting | [Shiki](https://shiki.style) |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | Geist Pixel Square, Satoshi, JetBrains Mono |

## Design System

Praxys UI uses a warm, dark palette with five intentional brand colors:

| Token | Hex | Role |
|-------|-----|------|
| **Void** | `#050505` | Primary background |
| **Obsidian** | `#0B0A08` | Warm dark surface |
| **Ignite** | `#E84E2D` | Brand accent (red-orange) |
| **Blush** | `#C9958A` | Secondary text, hover states |
| **Chalk** | `#F2ECE2` | Primary text (warm off-white) |

All colors are available as Tailwind utilities: `bg-void`, `text-ignite`, `border-blush`, etc.

## Contributing

Contributions are welcome! Here's how you can help:

1. **Add a new component** — Create the component in `app/components/ui/`, add a demo in `app/components/demos/`, and register it in `lib/registry.ts`.
2. **Improve existing components** — Better animations, accessibility, or customization options.
3. **Fix bugs** — Found something broken? Open an issue or submit a PR.

```bash
# Fork the repo, create a branch, make changes, then:
npm run build    # Verify build passes
npm run lint     # Check for lint errors
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [Sushant Verma](https://github.com/sushanttverma)

</div>
