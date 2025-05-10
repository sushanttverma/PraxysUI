'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, GitCommit, Sparkles, Wrench, Zap, BookOpen, Palette, Terminal, Search, Layout, Shield, Globe } from 'lucide-react'
import Navbar from '../components/Navbar'
import ThemeToggle from '../components/ThemeToggle'

interface ChangelogEntry {
  version: string
  date: string
  title: string
  description: string
  icon: React.ReactNode
  changes: {
    type: 'added' | 'fixed' | 'improved'
    text: string
  }[]
}

const changelog: ChangelogEntry[] = [
  {
    version: '0.7.0',
    date: 'Feb 14, 2026',
    title: 'SEO, Accessibility & Polish',
    description: 'Comprehensive SEO metadata, accessibility audit fixes, and public assets.',
    icon: <Shield className="h-4 w-4" />,
    changes: [
      { type: 'added', text: 'Open Graph and Twitter Card metadata across all pages' },
      { type: 'added', text: 'Dynamic generateMetadata for all /docs/[slug] pages' },
      { type: 'added', text: 'SVG favicon, robots.txt, and sitemap.xml' },
      { type: 'improved', text: 'ARIA labels, roles, and keyboard navigation on Navbar, CommandPalette, Sidebar' },
      { type: 'improved', text: 'Focus trap in command palette dialog' },
      { type: 'improved', text: 'aria-current="page" on active sidebar links' },
      { type: 'fixed', text: 'suppressHydrationWarning on body to handle browser extension attributes' },
    ],
  },
  {
    version: '0.6.0',
    date: 'Feb 14, 2026',
    title: 'Bug Fix Pass',
    description: 'Major audit fixing 10 issues across the docs — broken links, duplicate pages, layout problems, and error handling.',
    icon: <Wrench className="h-4 w-4" />,
    changes: [
      { type: 'fixed', text: 'Broken /docs/components links across 5 files — now points to /docs/components-overview' },
      { type: 'fixed', text: 'Mobile menu not closing on link click in Navbar' },
      { type: 'fixed', text: 'Duplicate IntroductionPage — single source of truth now' },
      { type: 'improved', text: 'Docs layout.tsx extracted to server component + DocsShell client component' },
      { type: 'fixed', text: 'ComponentPageClient dynamic import error handling with .catch() and error state' },
      { type: 'fixed', text: 'Sidebar slug extraction for trailing slashes' },
      { type: 'fixed', text: 'ComponentsOverviewPage uses sidebar order, removed dead code' },
      { type: 'fixed', text: 'Component count corrected to 24, added missing Logo Slider' },
      { type: 'fixed', text: 'GitHub links in Footer now point to actual repository' },
    ],
  },
  {
    version: '0.5.0',
    date: 'Feb 14, 2026',
    title: 'CLI Tool & Templates',
    description: 'Added a CLI for scaffolding components and a templates gallery page.',
    icon: <Terminal className="h-4 w-4" />,
    changes: [
      { type: 'added', text: 'npx praxys-ui CLI with init, add, and list commands' },
      { type: 'added', text: 'Templates gallery page with 6 template previews' },
      { type: 'added', text: 'CLI docs page at /docs/cli' },
    ],
  },
  {
    version: '0.4.0',
    date: 'Feb 14, 2026',
    title: 'Command Palette',
    description: 'Ctrl+K fuzzy search across all components and documentation pages.',
    icon: <Search className="h-4 w-4" />,
    changes: [
      { type: 'added', text: 'Ctrl+K / Cmd+K keyboard shortcut to open search' },
      { type: 'added', text: 'Fuzzy matching with scoring (exact > starts with > contains > fuzzy)' },
      { type: 'added', text: 'Arrow key navigation and Enter to select' },
    ],
  },
  {
    version: '0.3.0',
    date: 'Feb 14, 2026',
    title: 'Complete Component Library',
    description: 'All 24 components implemented with live previews, code examples, and props tables.',
    icon: <Sparkles className="h-4 w-4" />,
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
    date: 'Feb 14, 2026',
    title: 'Theme System & First Components',
    description: 'Light/dark mode with CSS custom properties and the first 6 animated components.',
    icon: <Palette className="h-4 w-4" />,
    changes: [
      { type: 'added', text: 'Light/dark theme toggle with localStorage persistence and FOUC prevention' },
      { type: 'added', text: 'Animated Button, Flip Text, Glow Border Card, Animated Number, Line Hover Link, Light Lines' },
      { type: 'added', text: 'Shiki dual-theme code blocks (vitesse-dark + vitesse-light)' },
      { type: 'added', text: 'Component preview with Preview/Code tab switcher' },
    ],
  },
  {
    version: '0.1.0',
    date: 'Feb 14, 2026',
    title: 'Initial Release',
    description: 'Project scaffolding, design system, landing page, and docs infrastructure.',
    icon: <Zap className="h-4 w-4" />,
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

const typeColors = {
  added: 'text-emerald-400',
  fixed: 'text-amber-400',
  improved: 'text-sky-400',
}

const typeLabels = {
  added: 'Added',
  fixed: 'Fixed',
  improved: 'Improved',
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
}

export default function ChangelogContent() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-blush transition-colors hover:text-chalk"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back home
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="h-5 w-5 text-ignite" />
            <span className="font-pixel text-xs uppercase tracking-widest text-ignite">
              Changelog
            </span>
          </div>
          <h1 className="font-pixel text-3xl font-bold text-chalk sm:text-4xl">
            What&apos;s New
          </h1>
          <p className="mt-3 max-w-2xl text-base text-blush leading-relaxed">
            A complete history of features, fixes, and improvements to Praxys UI.
          </p>
        </div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-10">
            {changelog.map((entry) => (
              <motion.div key={entry.version} variants={itemVariants} className="relative pl-12">
                {/* Dot on timeline */}
                <div className="absolute left-2 top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-border bg-obsidian text-ignite">
                  <GitCommit className="h-3 w-3" />
                </div>

                {/* Version header */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="rounded-md border border-ignite/30 bg-ignite/10 px-2 py-0.5 font-mono text-xs font-medium text-ignite">
                    v{entry.version}
                  </span>
                  <span className="text-xs text-text-faint">{entry.date}</span>
                </div>

                <h2 className="font-pixel text-lg font-bold text-chalk flex items-center gap-2">
                  <span className="text-ignite/60">{entry.icon}</span>
                  {entry.title}
                </h2>
                <p className="mt-1 text-sm text-blush/80 leading-relaxed">
                  {entry.description}
                </p>

                {/* Changes list */}
                <ul className="mt-3 space-y-1.5">
                  {entry.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className={`shrink-0 font-mono text-[10px] font-medium uppercase tracking-wide mt-0.5 ${typeColors[change.type]}`}>
                        {typeLabels[change.type]}
                      </span>
                      <span className="text-chalk/80">{change.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Floating theme toggle for mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-30">
        <ThemeToggle />
      </div>
    </div>
  )
}
