'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Sparkles, Layout, Monitor, Smartphone, Code } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const templates = [
  {
    title: 'Startup Landing',
    slug: 'startup-landing',
    description:
      'A high-converting landing page with hero section, feature grid, testimonials, and CTA. Uses Animated Hero, Glow Border Cards, and Testimonials Card.',
    components: ['animated-hero', 'glow-border-card', 'testimonials-card', 'animated-button'],
    category: 'Marketing',
  },
  {
    title: 'SaaS Dashboard',
    slug: 'saas-dashboard',
    description:
      'A modern analytics dashboard with animated numbers, bento grid layout, and spotlight navigation. Uses Animated Number, Expandable Bento Grid, and Spotlight Navbar.',
    components: ['animated-number', 'expandable-bento-grid', 'spotlight-navbar', 'light-lines'],
    category: 'Application',
  },
  {
    title: 'Developer Portfolio',
    slug: 'developer-portfolio',
    description:
      'A personal portfolio with 3D text effects, interactive project cards, and a glass dock navigation. Uses Displacement Text, Perspective Grid, and Glass Dock.',
    components: ['displacement-text', 'perspective-grid', 'glass-dock', 'flip-text'],
    category: 'Portfolio',
  },
  {
    title: 'Agency Showcase',
    slug: 'agency-showcase',
    description:
      'A bold agency website with marquee logo sliders, staggered project grids, and liquid visual effects. Uses Logo Slider, Staggered Grid, and Liquid Ocean.',
    components: ['logo-slider', 'staggered-grid', 'liquid-ocean', 'creepy-button'],
    category: 'Agency',
  },
  {
    title: 'Documentation Site',
    slug: 'documentation-site',
    description:
      'A clean docs site template with sidebar navigation, code blocks, interactive book, and folder previews. Uses Interactive Book, Folder Preview, and Line Hover Link.',
    components: ['interactive-book', 'folder-preview', 'line-hover-link', 'flip-fade-text'],
    category: 'Documentation',
  },
  {
    title: 'E-commerce Product',
    slug: 'ecommerce-product',
    description:
      'A product-focused landing page with masked avatar testimonials, social sharing buttons, and animated reveals. Uses Masked Avatars, Social Flip Button, and Reveal Loader.',
    components: ['masked-avatars', 'social-flip-button', 'reveal-loader', 'animated-button'],
    category: 'E-commerce',
  },
  {
    title: 'Blog & Magazine',
    slug: 'blog-magazine',
    description:
      'A content-driven blog layout with animated headings, category tabs, parallax hero, and article cards. Uses Typewriter Text, Morphing Text, Animated Tabs, and Parallax Scroll.',
    components: ['typewriter-text', 'morphing-text', 'animated-tabs', 'parallax-scroll'],
    category: 'Content',
  },
  {
    title: 'SaaS Pricing',
    slug: 'saas-pricing',
    description:
      'A conversion-focused pricing page with animated counters, spotlight cards, billing toggle, and usage meters. Uses Animated Counter, Spotlight Card, Animated Toggle, and Progress Bar.',
    components: ['animated-counter', 'spotlight-card', 'animated-toggle', 'progress-bar'],
    category: 'SaaS',
  },
  {
    title: 'Ocean Theme',
    slug: 'ocean-theme',
    description:
      'A cloud SaaS landing page themed with the Ocean preset — deep navy and cyan tones. Features Typewriter Text, Spotlight Cards, Animated Counters, and Animated Buttons.',
    components: ['typewriter-text', 'spotlight-card', 'animated-counter', 'animated-button'],
    category: 'Theme',
  },
  {
    title: 'Forest Theme',
    slug: 'forest-theme',
    description:
      'A sustainability-focused landing page themed with the Forest preset — rich greens and earth tones. Features Morphing Text, Glow Border Cards, Progress Bars, and Animated Buttons.',
    components: ['morphing-text', 'glow-border-card', 'progress-bar', 'animated-button'],
    category: 'Theme',
  },
  {
    title: 'Purple Haze Theme',
    slug: 'purple-haze-theme',
    description:
      'A creative agency page themed with the Purple Haze preset — vibrant purples and magentas. Features Animated Tabs, Spotlight Cards, Animated Counters, and Animated Buttons.',
    components: ['animated-tabs', 'spotlight-card', 'animated-counter', 'animated-button'],
    category: 'Theme',
  },
  {
    title: 'Rose Gold Theme',
    slug: 'rose-gold-theme',
    description:
      'A luxury brand landing page themed with the Rose Gold preset — warm pinks and gold accents. Features Typewriter Text, Spotlight Cards, Animated Counters, and Animated Buttons.',
    components: ['typewriter-text', 'spotlight-card', 'animated-counter', 'animated-button'],
    category: 'Theme',
  },
  {
    title: 'Amber Theme',
    slug: 'amber-theme',
    description:
      'A restaurant landing page themed with the Amber preset — warm oranges and golden tones. Features Spotlight Cards, Animated Counters, Animated Buttons, and Tooltips.',
    components: ['spotlight-card', 'animated-counter', 'animated-button', 'tooltip'],
    category: 'Theme',
  },
  {
    title: 'Neutral Theme',
    slug: 'neutral-theme',
    description:
      'A minimal portfolio page themed with the Neutral preset — monochromatic grays. Features Accordion, Kbd, Badge, and Animated Buttons.',
    components: ['accordion', 'kbd', 'badge', 'animated-button'],
    category: 'Theme',
  },
]

const categories = ['All', ...Array.from(new Set(templates.map((t) => t.category)))]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function TemplatesContent() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? templates
      : templates.filter((t) => t.category === activeCategory)

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <main id="main-content" className="mx-auto max-w-6xl px-6 pt-28 pb-20">
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

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="h-5 w-5 text-ignite" />
            <span className="font-pixel text-xs uppercase tracking-widest text-ignite">
              Templates
            </span>
          </div>
          <h1 className="font-pixel text-3xl font-bold text-chalk sm:text-4xl">
            Page Templates
          </h1>
          <p className="mt-3 max-w-2xl text-base text-blush leading-relaxed">
            Pre-built page layouts that combine multiple Praxys UI components into
            production-ready templates. Preview live, then copy the full source code.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-ignite/10 text-ignite border border-ignite/20'
                  : 'border border-border text-text-faint hover:text-blush hover:border-border-light'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  {templates.filter((t) => t.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Template grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((template) => (
            <motion.div
              key={template.slug}
              variants={cardVariants}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-obsidian transition-colors hover:border-ignite/30"
            >
              {/* Clickable overlay */}
              <Link
                href={`/templates/${template.slug}`}
                className="absolute inset-0 z-10"
                aria-label={`Preview ${template.title} template`}
              />

              {/* Preview placeholder */}
              <div className="relative flex h-44 items-center justify-center border-b border-border bg-void/50">
                <div className="flex items-center gap-3 text-text-faint">
                  <Monitor className="h-8 w-8" />
                  <div className="h-6 w-px bg-border" />
                  <Smartphone className="h-6 w-6" />
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 rounded-full border border-ignite/30 bg-ignite/10 px-2.5 py-0.5 font-pixel text-[10px] text-ignite">
                  {template.category}
                </div>

                {/* Code available badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-border bg-obsidian/80 px-2 py-0.5 text-[10px] text-blush">
                  <Code className="h-2.5 w-2.5" />
                  Source
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-pixel text-base font-bold text-chalk">
                  {template.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-blush/80 line-clamp-3">
                  {template.description}
                </p>

                {/* Component tags */}
                <div className="relative z-20 mt-4 flex flex-wrap gap-1.5">
                  {template.components.map((slug) => (
                    <Link
                      key={slug}
                      href={`/docs/${slug}`}
                      className="rounded-md border border-border bg-void px-2 py-0.5 text-[11px] text-text-faint transition-colors hover:border-ignite/30 hover:text-ignite"
                    >
                      {slug}
                    </Link>
                  ))}
                </div>

                {/* Action */}
                <div className="mt-4 flex items-center gap-2 pt-2 border-t border-border">
                  <span className="flex items-center gap-1.5 text-xs text-text-faint">
                    <Layout className="h-3 w-3" />
                    {template.components.length} components
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-xs text-ignite/60 group-hover:text-ignite transition-colors">
                    Preview &amp; Code
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-blush">
            Want a specific template?{' '}
            <a
              href="https://github.com/sushanttverma/Praxys-UI/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ignite underline underline-offset-2 hover:text-chalk transition-colors"
            >
              Request one on GitHub
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
