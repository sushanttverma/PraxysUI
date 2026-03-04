// ─── Single source of truth for changelog data ──────────
// Both the website (/changelog) and CHANGELOG.md are derived from this file.

export type ChangeType = 'added' | 'fixed' | 'improved'

export interface ChangeItem {
  type: ChangeType
  text: string
}

export interface ChangelogEntry {
  version: string
  date: string
  title: string
  description: string
  /** Lucide icon name — resolved in the UI component */
  iconName: 'sparkles' | 'puzzle' | 'shield' | 'wrench' | 'terminal' | 'search' | 'palette' | 'zap'
  changes: ChangeItem[]
}

export const changelog: ChangelogEntry[] = [
  {
    version: '1.0.3',
    date: 'Mar 4, 2026',
    title: 'Scroll DNA + Homepage Redesign',
    description:
      'New Scroll DNA signature component — a DNA-strand scroll navigator with interactive scrubbing, section waypoints, and a floating code card. Also ships a full homepage redesign with cinematic loader, horizontal showcase, and interactive forge sections.',
    iconName: 'sparkles',
    changes: [
      { type: 'added', text: 'Scroll DNA — DNA-strand scroll navigator with click-to-jump, drag scrubbing, section dots, and floating copyable code card (Praxys Signature)' },
      { type: 'added', text: 'Homepage — CinematicLoader, HeroVoid, HorizontalShowcase, InteractiveForge, PulseNumbers, SignalCTA, ShowcaseCard, ScrollBarWidget sections' },
    ],
  },
  {
    version: '1.0.2',
    date: 'Mar 4, 2026',
    title: 'Scroll Progress — Stability Fix',
    description:
      'Fixes scroll chaining in the Scroll Progress demo container so scrolling inside the demo does not propagate to the outer page.',
    iconName: 'wrench',
    changes: [
      { type: 'fixed', text: 'ScrollProgress demo — added overscroll-contain to prevent scroll chaining to outer page' },
      { type: 'fixed', text: 'ScrollProgress demo — replaced scrollIntoView() with container.scrollTo() to prevent outer page scroll on section navigation' },
    ],
  },
  {
    version: '1.0.1',
    date: 'Mar 4, 2026',
    title: 'Scroll Progress',
    description:
      'New Scroll Progress component — animated reading indicator with spring physics, top bar and right-side section dots navigator.',
    iconName: 'sparkles',
    changes: [
      { type: 'added', text: 'Scroll Progress — spring-animated reading progress bar and section dots navigator, scopeable to any scroll container' },
    ],
  },
  {
    version: '1.0.0',
    date: 'Feb 14, 2026',
    title: 'Public Launch — 101 Components',
    description:
      'Initial public release of @praxys/ui. 101 animated React components, a full-featured CLI with 10 commands, Animation Studio, and four design tools — all MIT licensed.',
    iconName: 'zap',
    changes: [
      { type: 'added', text: '101 animated React components across 6 categories: buttons/forms, cards, text effects, navigation, visual effects, and media' },
      { type: 'added', text: 'CLI (@praxys/ui) — init, add, list, info, view, diff, remove, update, doctor, stats commands' },
      { type: 'added', text: 'Animation Studio — GSAP-powered timeline editor with 30+ presets and live code generation' },
      { type: 'added', text: 'Gradient Maker — interactive gradient builder with CSS/Tailwind/SVG export' },
      { type: 'added', text: 'Shadow Lab — layered box-shadow designer with live preview' },
      { type: 'added', text: 'Glassmorphism Tool — frosted glass effect designer' },
      { type: 'added', text: 'Theme Customizer — brand palette editor with 9 presets and CSS export' },
      { type: 'added', text: 'Published to npm as @praxys/ui — MIT license' },
    ],
  },
  {
    version: '0.9.0',
    date: 'Feb 10, 2026',
    title: '10 New Components',
    description:
      '10 new interactive components spanning modals, tooltips, dropdowns, progress indicators, and more — bringing the total to 50.',
    iconName: 'sparkles',
    changes: [
      { type: 'added', text: 'Modal Dialog — animated modal with backdrop blur, spring scale, Escape key, scroll lock, and ARIA attributes' },
      { type: 'added', text: 'Tooltip — 4-position tooltip with configurable delay, direction-aware animation, and arrow pointer' },
      { type: 'added', text: 'Dropdown Menu — full keyboard navigation, click-outside close, divider and disabled item support' },
      { type: 'added', text: 'Progress Bar — animated bar with sm/md/lg sizes, candy-stripe overlay, custom colors, and label/value display' },
      { type: 'added', text: 'Stepper — horizontal/vertical multi-step indicator with animated check icons and connector fill' },
      { type: 'added', text: 'Image Comparison — before/after slider with pointer-capture drag, clip-based reveal, and animated handle' },
      { type: 'added', text: 'Animated Counter — spring-physics number counter triggered on scroll into view with prefix/suffix/decimals' },
      { type: 'added', text: 'Infinite Scroll — Intersection Observer-based with configurable threshold and animated loader' },
      { type: 'added', text: 'Command Menu — search-filtered palette with grouped items, keyboard nav, match highlighting, and shortcut badges' },
      { type: 'added', text: 'Animated Toggle — switch with spring-animated knob, 3 sizes, ARIA role="switch", and disabled state' },
    ],
  },
  {
    version: '0.8.0',
    date: 'Feb 2, 2026',
    title: 'Theme Customizer & Open Source',
    description:
      '10 new components, interactive theme customizer with export, Props Playground for all components, and full open-source community setup.',
    iconName: 'puzzle',
    changes: [
      { type: 'added', text: 'Typewriter Text — animated typing effect with cursor and configurable speed' },
      { type: 'added', text: 'Toast Notification — stackable toast system with multiple variants' },
      { type: 'added', text: 'Accordion — smooth expand/collapse with icon rotation' },
      { type: 'added', text: 'Animated Tabs — tab switcher with sliding indicator and content transitions' },
      { type: 'added', text: 'Magnetic Cursor — element that pulls toward the mouse pointer' },
      { type: 'added', text: 'Parallax Scroll — depth-based scroll animations for layered content' },
      { type: 'added', text: 'Gradient Mesh — animated multi-point gradient background' },
      { type: 'added', text: 'Skeleton Loader — pulsing placeholder for loading states' },
      { type: 'added', text: 'Morphing Text — smooth text transitions between words' },
      { type: 'added', text: 'Spotlight Card — card with mouse-following light effect' },
      { type: 'added', text: 'Theme Customizer (/customize) — color pickers, 6 presets, live preview, and CSS export' },
      { type: 'added', text: 'Interactive Props Playground with live controls for all 34 components' },
      { type: 'added', text: '6 interactive template pages with preview toolbar and responsive viewport switcher' },
      { type: 'added', text: 'CONTRIBUTING.md, CODE_OF_CONDUCT.md, issue templates, and PR template' },
      { type: 'fixed', text: 'Nested <a> tags in ComponentShowcase — replaced Link with div + useRouter' },
      { type: 'fixed', text: 'LogoSlider animation shorthand/longhand conflict in React 19' },
    ],
  },
  {
    version: '0.7.0',
    date: 'Jan 11, 2026',
    title: 'SEO, Accessibility & Polish',
    description:
      'Comprehensive SEO metadata, accessibility audit fixes, and public assets.',
    iconName: 'shield',
    changes: [
      { type: 'added', text: 'Open Graph and Twitter Card metadata across all pages' },
      { type: 'added', text: 'Dynamic generateMetadata for all component pages' },
      { type: 'added', text: 'SVG favicon, robots.txt, and sitemap.xml' },
      { type: 'improved', text: 'ARIA labels, roles, and keyboard navigation on Navbar, CommandPalette, Sidebar' },
      { type: 'improved', text: 'Focus trap in command palette dialog' },
      { type: 'fixed', text: 'suppressHydrationWarning on body to handle browser extension attributes' },
    ],
  },
  {
    version: '0.6.0',
    date: 'Jan 8, 2026',
    title: 'Bug Fix Pass',
    description:
      'Major audit fixing 10 issues across the docs — broken links, duplicate pages, layout problems, and error handling.',
    iconName: 'wrench',
    changes: [
      { type: 'fixed', text: 'Broken component doc links across 5 files' },
      { type: 'fixed', text: 'Mobile menu not closing on link click in Navbar' },
      { type: 'fixed', text: 'Duplicate IntroductionPage — single source of truth now' },
      { type: 'improved', text: 'Docs layout extracted to server component + DocsShell client component' },
      { type: 'fixed', text: 'ComponentPageClient dynamic import error handling' },
      { type: 'fixed', text: 'GitHub links in Footer now point to actual repository' },
    ],
  },
  {
    version: '0.5.0',
    date: 'Jan 7, 2026',
    title: 'CLI Tool & Templates',
    description:
      'Added a CLI for scaffolding components and a templates gallery page.',
    iconName: 'terminal',
    changes: [
      { type: 'added', text: 'npx @praxys/ui CLI with init, add, and list commands' },
      { type: 'added', text: 'Templates gallery page with 6 template previews' },
      { type: 'added', text: 'CLI docs page' },
    ],
  },
  {
    version: '0.4.0',
    date: 'Jan 4, 2026',
    title: 'Command Palette',
    description:
      'Ctrl+K fuzzy search across all components and documentation pages.',
    iconName: 'search',
    changes: [
      { type: 'added', text: 'Ctrl+K / Cmd+K keyboard shortcut to open search' },
      { type: 'added', text: 'Fuzzy matching with scoring (exact > starts with > contains > fuzzy)' },
      { type: 'added', text: 'Arrow key navigation and Enter to select' },
    ],
  },
  {
    version: '0.3.0',
    date: 'Jan 2, 2026',
    title: 'Complete Component Library',
    description:
      'All 24 initial components implemented with live previews, code examples, and props tables.',
    iconName: 'sparkles',
    changes: [
      { type: 'added', text: 'Interactive Book — 3D page-flip book component' },
      { type: 'added', text: 'Logo Slider — infinite marquee logo carousel' },
      { type: 'added', text: 'Animated Hero — cinematic hero section with parallax' },
      { type: 'added', text: 'Masked Avatars — overlapping avatar stack with hover reveal' },
      { type: 'added', text: 'Folder Preview — macOS-style folder with hover preview' },
      { type: 'added', text: 'Liquid Ocean, Liquid Metal, Reveal Loader — visual effects' },
      { type: 'added', text: 'Spotlight Navbar, Glass Dock — navigation components' },
      { type: 'added', text: 'Flip Fade Text, 3D Displacement Text — text effects' },
      { type: 'added', text: 'Testimonials Card, Staggered Grid, Expandable Bento Grid, Perspective Grid — cards & layout' },
      { type: 'added', text: 'Creepy Button, Social Flip Button — button variants' },
    ],
  },
  {
    version: '0.2.0',
    date: 'Dec 22, 2025',
    title: 'Theme System & First Components',
    description:
      'Light/dark mode with CSS custom properties and the first 6 animated components.',
    iconName: 'palette',
    changes: [
      { type: 'added', text: 'Light/dark theme toggle with localStorage persistence and FOUC prevention' },
      { type: 'added', text: 'Animated Button, Flip Text, Glow Border Card, Animated Number, Line Hover Link, Light Lines' },
      { type: 'added', text: 'Shiki dual-theme code blocks (vitesse-dark + vitesse-light)' },
      { type: 'added', text: 'Component preview with Preview/Code tab switcher' },
    ],
  },
  {
    version: '0.1.0',
    date: 'Dec 15, 2025',
    title: 'Initial Release',
    description:
      'Project scaffolding, design system, landing page, and docs infrastructure.',
    iconName: 'zap',
    changes: [
      { type: 'added', text: 'Next.js 16 project with React 19, Tailwind CSS 4, Framer Motion 12' },
      { type: 'added', text: 'Praxys brand palette — Void, Obsidian, Ignite, Blush, Chalk' },
      { type: 'added', text: 'Font stack — Geist Pixel Square, Satoshi, JetBrains Mono' },
      { type: 'added', text: 'Landing page with 7 sections (Navbar, Hero, Showcase, Features, Grid, CTA, Footer)' },
      { type: 'added', text: 'Docs with sidebar navigation and dynamic [slug] routing' },
      { type: 'added', text: 'Getting Started pages (Installation, Tailwind, Utilities)' },
      { type: 'added', text: 'Component registry architecture with lazy-loaded demos' },
    ],
  },
]

// ─── Helper: generate standard CHANGELOG.md content ──────

const typeLabels: Record<ChangeType, string> = {
  added: 'Added',
  fixed: 'Fixed',
  improved: 'Improved',
}

export function generateChangelogMarkdown(): string {
  const lines: string[] = ['# Changelog', '', 'All notable changes to Praxys UI are documented here.', '']

  for (const entry of changelog) {
    lines.push(`## [${entry.version}] — ${entry.date}`)
    lines.push('')
    lines.push(`**${entry.title}**`)
    lines.push('')
    lines.push(entry.description)
    lines.push('')

    // Group by type
    for (const type of ['added', 'fixed', 'improved'] as ChangeType[]) {
      const items = entry.changes.filter((c) => c.type === type)
      if (items.length === 0) continue
      lines.push(`### ${typeLabels[type]}`)
      lines.push('')
      for (const item of items) {
        lines.push(`- ${item.text}`)
      }
      lines.push('')
    }
  }

  return lines.join('\n')
}
