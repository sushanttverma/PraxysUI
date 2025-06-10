'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Sparkles, Layout, Monitor, Smartphone } from 'lucide-react'
import Navbar from '../components/Navbar'
import ThemeToggle from '../components/ThemeToggle'

const templates = [
  {
    title: 'Startup Landing',
    slug: 'startup-landing',
    description:
      'A high-converting landing page with hero section, feature grid, testimonials, and CTA. Uses Animated Hero, Glow Border Cards, and Testimonials Card.',
    components: ['animated-hero', 'glow-border-card', 'testimonials-card', 'animated-button'],
    status: 'ready' as const,
    category: 'Marketing',
  },
  {
    title: 'SaaS Dashboard',
    slug: 'saas-dashboard',
    description:
      'A modern analytics dashboard with animated numbers, bento grid layout, and spotlight navigation. Uses Animated Number, Expandable Bento Grid, and Spotlight Navbar.',
    components: ['animated-number', 'expandable-bento-grid', 'spotlight-navbar', 'light-lines'],
    status: 'ready' as const,
    category: 'Application',
  },
  {
    title: 'Developer Portfolio',
    slug: 'developer-portfolio',
    description:
      'A personal portfolio with 3D text effects, interactive project cards, and a glass dock navigation. Uses Displacement Text, Perspective Grid, and Glass Dock.',
    components: ['displacement-text', 'perspective-grid', 'glass-dock', 'flip-text'],
    status: 'ready' as const,
    category: 'Portfolio',
  },
  {
    title: 'Agency Showcase',
    slug: 'agency-showcase',
    description:
      'A bold agency website with marquee logo sliders, staggered project grids, and liquid visual effects. Uses Logo Slider, Staggered Grid, and Liquid Ocean.',
    components: ['logo-slider', 'staggered-grid', 'liquid-ocean', 'creepy-button'],
    status: 'ready' as const,
    category: 'Agency',
  },
  {
    title: 'Documentation Site',
    slug: 'documentation-site',
    description:
      'A clean docs site template with sidebar navigation, code blocks, interactive book, and folder previews. Uses Interactive Book, Folder Preview, and Line Hover Link.',
    components: ['interactive-book', 'folder-preview', 'line-hover-link', 'flip-fade-text'],
    status: 'ready' as const,
    category: 'Documentation',
  },
  {
    title: 'E-commerce Product',
    slug: 'ecommerce-product',
    description:
      'A product-focused landing page with masked avatar testimonials, social sharing buttons, and animated reveals. Uses Masked Avatars, Social Flip Button, and Reveal Loader.',
    components: ['masked-avatars', 'social-flip-button', 'reveal-loader', 'animated-button'],
    status: 'ready' as const,
    category: 'E-commerce',
  },
]

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
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-28 pb-20">
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
            production-ready templates. Copy the full source and customize to match your brand.
          </p>
        </div>

        {/* Template grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {templates.map((template) => (
            <motion.div
              key={template.title}
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
                <div className="absolute top-3 right-3 rounded-full border border-ignite/30 bg-ignite/10 px-2.5 py-0.5 font-pixel text-[10px] text-ignite">
                  {template.category}
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
                    Preview
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

      {/* Floating theme toggle for mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-30">
        <ThemeToggle />
      </div>
    </div>
  )
}
