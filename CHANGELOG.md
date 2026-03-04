# Changelog

All notable changes to Praxys UI are documented here.

## [1.0.3] — Mar 4, 2026

**Scroll DNA + Homepage Redesign**

New Scroll DNA signature component — a DNA-strand scroll navigator with interactive scrubbing, section waypoints, and a floating code card. Also ships a full homepage redesign with cinematic loader, horizontal showcase, and interactive forge sections.

### Added

- Scroll DNA — DNA-strand scroll navigator with click-to-jump, drag scrubbing, section dots, and floating copyable code card (Praxys Signature)
- Homepage — CinematicLoader, HeroVoid, HorizontalShowcase, InteractiveForge, PulseNumbers, SignalCTA, ShowcaseCard, ScrollBarWidget sections

## [1.0.2] — Mar 4, 2026

**Scroll Progress — Stability Fix**

Fixes scroll chaining in the Scroll Progress demo container so scrolling inside the demo does not propagate to the outer page.

### Fixed

- ScrollProgress demo — added overscroll-contain to prevent scroll chaining to outer page
- ScrollProgress demo — replaced scrollIntoView() with container.scrollTo() to prevent outer page scroll on section navigation

## [1.0.1] — Mar 4, 2026

**Scroll Progress**

New Scroll Progress component — animated reading indicator with spring physics, top bar and right-side section dots navigator.

### Added

- Scroll Progress — spring-animated reading progress bar and section dots navigator, scopeable to any scroll container

## [1.0.0] — Feb 14, 2026

**Public Launch — 101 Components**

Initial public release of @praxys/ui. 101 animated React components, a full-featured CLI with 10 commands, Animation Studio, and four design tools — all MIT licensed.

### Added

- 101 animated React components across 6 categories: buttons/forms, cards, text effects, navigation, visual effects, and media
- CLI (@praxys/ui) — init, add, list, info, view, diff, remove, update, doctor, stats commands
- Animation Studio — GSAP-powered timeline editor with 30+ presets and live code generation
- Gradient Maker — interactive gradient builder with CSS/Tailwind/SVG export
- Shadow Lab — layered box-shadow designer with live preview
- Glassmorphism Tool — frosted glass effect designer
- Theme Customizer — brand palette editor with 9 presets and CSS export
- Published to npm as @praxys/ui — MIT license

## [0.9.0] — Feb 10, 2026

**10 New Components**

10 new interactive components spanning modals, tooltips, dropdowns, progress indicators, and more — bringing the total to 50.

### Added

- Modal Dialog — animated modal with backdrop blur, spring scale, Escape key, scroll lock, and ARIA attributes
- Tooltip — 4-position tooltip with configurable delay, direction-aware animation, and arrow pointer
- Dropdown Menu — full keyboard navigation, click-outside close, divider and disabled item support
- Progress Bar — animated bar with sm/md/lg sizes, candy-stripe overlay, custom colors, and label/value display
- Stepper — horizontal/vertical multi-step indicator with animated check icons and connector fill
- Image Comparison — before/after slider with pointer-capture drag, clip-based reveal, and animated handle
- Animated Counter — spring-physics number counter triggered on scroll into view with prefix/suffix/decimals
- Infinite Scroll — Intersection Observer-based with configurable threshold and animated loader
- Command Menu — search-filtered palette with grouped items, keyboard nav, match highlighting, and shortcut badges
- Animated Toggle — switch with spring-animated knob, 3 sizes, ARIA role="switch", and disabled state

## [0.8.0] — Feb 2, 2026

**Theme Customizer & Open Source**

10 new components, interactive theme customizer with export, Props Playground for all components, and full open-source community setup.

### Added

- Typewriter Text — animated typing effect with cursor and configurable speed
- Toast Notification — stackable toast system with multiple variants
- Accordion — smooth expand/collapse with icon rotation
- Animated Tabs — tab switcher with sliding indicator and content transitions
- Magnetic Cursor — element that pulls toward the mouse pointer
- Parallax Scroll — depth-based scroll animations for layered content
- Gradient Mesh — animated multi-point gradient background
- Skeleton Loader — pulsing placeholder for loading states
- Morphing Text — smooth text transitions between words
- Spotlight Card — card with mouse-following light effect
- Theme Customizer (/customize) — color pickers, 6 presets, live preview, and CSS export
- Interactive Props Playground with live controls for all 34 components
- 6 interactive template pages with preview toolbar and responsive viewport switcher
- CONTRIBUTING.md, CODE_OF_CONDUCT.md, issue templates, and PR template

### Fixed

- Nested <a> tags in ComponentShowcase — replaced Link with div + useRouter
- LogoSlider animation shorthand/longhand conflict in React 19

## [0.7.0] — Jan 11, 2026

**SEO, Accessibility & Polish**

Comprehensive SEO metadata, accessibility audit fixes, and public assets.

### Added

- Open Graph and Twitter Card metadata across all pages
- Dynamic generateMetadata for all component pages
- SVG favicon, robots.txt, and sitemap.xml

### Fixed

- suppressHydrationWarning on body to handle browser extension attributes

### Improved

- ARIA labels, roles, and keyboard navigation on Navbar, CommandPalette, Sidebar
- Focus trap in command palette dialog

## [0.6.0] — Jan 8, 2026

**Bug Fix Pass**

Major audit fixing 10 issues across the docs — broken links, duplicate pages, layout problems, and error handling.

### Fixed

- Broken component doc links across 5 files
- Mobile menu not closing on link click in Navbar
- Duplicate IntroductionPage — single source of truth now
- ComponentPageClient dynamic import error handling
- GitHub links in Footer now point to actual repository

### Improved

- Docs layout extracted to server component + DocsShell client component

## [0.5.0] — Jan 7, 2026

**CLI Tool & Templates**

Added a CLI for scaffolding components and a templates gallery page.

### Added

- npx @praxys/ui CLI with init, add, and list commands
- Templates gallery page with 6 template previews
- CLI docs page

## [0.4.0] — Jan 4, 2026

**Command Palette**

Ctrl+K fuzzy search across all components and documentation pages.

### Added

- Ctrl+K / Cmd+K keyboard shortcut to open search
- Fuzzy matching with scoring (exact > starts with > contains > fuzzy)
- Arrow key navigation and Enter to select

## [0.3.0] — Jan 2, 2026

**Complete Component Library**

All 24 initial components implemented with live previews, code examples, and props tables.

### Added

- Interactive Book — 3D page-flip book component
- Logo Slider — infinite marquee logo carousel
- Animated Hero — cinematic hero section with parallax
- Masked Avatars — overlapping avatar stack with hover reveal
- Folder Preview — macOS-style folder with hover preview
- Liquid Ocean, Liquid Metal, Reveal Loader — visual effects
- Spotlight Navbar, Glass Dock — navigation components
- Flip Fade Text, 3D Displacement Text — text effects
- Testimonials Card, Staggered Grid, Expandable Bento Grid, Perspective Grid — cards & layout
- Creepy Button, Social Flip Button — button variants

## [0.2.0] — Dec 22, 2025

**Theme System & First Components**

Light/dark mode with CSS custom properties and the first 6 animated components.

### Added

- Light/dark theme toggle with localStorage persistence and FOUC prevention
- Animated Button, Flip Text, Glow Border Card, Animated Number, Line Hover Link, Light Lines
- Shiki dual-theme code blocks (vitesse-dark + vitesse-light)
- Component preview with Preview/Code tab switcher

## [0.1.0] — Dec 15, 2025

**Initial Release**

Project scaffolding, design system, landing page, and docs infrastructure.

### Added

- Next.js 16 project with React 19, Tailwind CSS 4, Framer Motion 12
- Praxys brand palette — Void, Obsidian, Ignite, Blush, Chalk
- Font stack — Geist Pixel Square, Satoshi, JetBrains Mono
- Landing page with 7 sections (Navbar, Hero, Showcase, Features, Grid, CTA, Footer)
- Docs with sidebar navigation and dynamic [slug] routing
- Getting Started pages (Installation, Tailwind, Utilities)
- Component registry architecture with lazy-loaded demos
