'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  BookOpen,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Layers,
  Sparkles,
  Layout,
  CreditCard,
  Users,
  Zap,
} from 'lucide-react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

// ─── Recipe data ─────────────────────────────────────────

interface Recipe {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  components: string[]
  preview: React.ReactNode
  code: string
}

const recipes: Recipe[] = [
  {
    id: 'landing-hero',
    title: 'Landing Hero Section',
    description:
      'A cinematic hero combining AnimatedHero, TypewriterText, and AnimatedButton for a high-impact landing page opening.',
    icon: <Layout className="h-4 w-4" />,
    components: ['animated-hero', 'typewriter-text', 'animated-button'],
    preview: <LandingHeroPreview />,
    code: `import AnimatedHero from '@/components/ui/animated-hero'
import TypewriterText from '@/components/ui/typewriter-text'
import AnimatedButton from '@/components/ui/animated-button'

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-3xl mx-auto px-6">
        {/* Badge */}
        <span className="inline-block rounded-full border border-ignite/20
          bg-ignite/10 px-4 py-1.5 text-xs font-medium text-ignite mb-6">
          Now in Beta
        </span>

        {/* Heading with typewriter */}
        <h1 className="font-pixel text-4xl md:text-6xl font-bold text-chalk mb-4">
          Build{' '}
          <TypewriterText
            strings={['beautiful', 'animated', 'accessible', 'modern']}
            className="text-ignite"
          />{' '}
          interfaces
        </h1>

        <p className="text-blush text-lg max-w-xl mx-auto mb-8">
          Copy-paste React components with smooth animations.
          Open source, customizable, and ready to ship.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-4">
          <AnimatedButton>Get Started</AnimatedButton>
          <AnimatedButton className="bg-transparent border-blush/30 text-blush">
            View Components
          </AnimatedButton>
        </div>
      </div>
    </section>
  )
}`,
  },
  {
    id: 'feature-grid',
    title: 'Feature Grid with Spotlight Cards',
    description:
      'A responsive feature section using SpotlightCard for mouse-follow glow effects and GlowBorderCard for highlighted items.',
    icon: <Sparkles className="h-4 w-4" />,
    components: ['spotlight-card', 'glow-border-card', 'animated-number'],
    preview: <FeatureGridPreview />,
    code: `import SpotlightCard from '@/components/ui/spotlight-card'
import AnimatedNumber from '@/components/ui/animated-number'

const features = [
  { title: 'Components', value: 34, suffix: '+', desc: 'Ready to use' },
  { title: 'Bundle Size', value: 0, suffix: 'kb', desc: 'Zero runtime overhead' },
  { title: 'Accessibility', value: 100, suffix: '%', desc: 'ARIA compliant' },
]

export default function FeatureGrid() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-pixel text-3xl font-bold text-chalk text-center mb-12">
          Why Praxys UI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <SpotlightCard key={f.title} className="p-6">
              <div className="text-3xl font-bold text-ignite mb-2">
                <AnimatedNumber value={f.value} />{f.suffix}
              </div>
              <h3 className="font-pixel text-lg text-chalk mb-1">
                {f.title}
              </h3>
              <p className="text-sm text-blush">{f.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}`,
  },
  {
    id: 'pricing-section',
    title: 'Pricing Cards',
    description:
      'Pricing table using GlowBorderCard for the featured tier with AnimatedButton CTAs and AnimatedNumber for prices.',
    icon: <CreditCard className="h-4 w-4" />,
    components: ['glow-border-card', 'animated-button', 'animated-number'],
    preview: <PricingPreview />,
    code: `import GlowBorderCard from '@/components/ui/glow-border-card'
import AnimatedButton from '@/components/ui/animated-button'
import AnimatedNumber from '@/components/ui/animated-number'

const tiers = [
  { name: 'Starter', price: 0, features: ['5 components', 'MIT License', 'Community support'] },
  { name: 'Pro', price: 29, featured: true, features: ['All components', 'Priority support', 'Figma file', 'Updates'] },
  { name: 'Team', price: 99, features: ['Everything in Pro', '10 seats', 'Custom themes', 'Slack access'] },
]

export default function PricingSection() {
  return (
    <section className="py-20 px-6">
      <h2 className="font-pixel text-3xl font-bold text-chalk text-center mb-12">
        Simple Pricing
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiers.map((tier) => {
          const Card = tier.featured ? GlowBorderCard : 'div'
          return (
            <Card
              key={tier.name}
              className={\`rounded-xl border border-border bg-obsidian p-6
                \${tier.featured ? 'ring-2 ring-ignite/20' : ''}\`}
            >
              <h3 className="font-pixel text-lg text-chalk">{tier.name}</h3>
              <div className="my-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-chalk">
                  $<AnimatedNumber value={tier.price} />
                </span>
                <span className="text-sm text-blush">/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-blush">
                    <span className="text-ignite">✓</span> {f}
                  </li>
                ))}
              </ul>
              <AnimatedButton className={tier.featured ? '' : 'bg-obsidian border-border text-blush'}>
                {tier.price === 0 ? 'Get Started' : 'Subscribe'}
              </AnimatedButton>
            </Card>
          )
        })}
      </div>
    </section>
  )
}`,
  },
  {
    id: 'testimonials-section',
    title: 'Testimonials Carousel',
    description:
      'Social proof section combining TestimonialsCard with MaskedAvatars for team display and FlipFadeText for rotating quotes.',
    icon: <Users className="h-4 w-4" />,
    components: ['testimonials-card', 'masked-avatars', 'flip-fade-text'],
    preview: <TestimonialsPreview />,
    code: `import TestimonialsCard from '@/components/ui/testimonials-card'
import MaskedAvatars from '@/components/ui/masked-avatars'
import FlipFadeText from '@/components/ui/flip-fade-text'

const testimonials = [
  { name: 'Sarah Chen', role: 'Frontend Lead', text: 'Praxys UI cut our prototyping time in half.' },
  { name: 'Alex Rivera', role: 'CTO', text: 'The animation quality is exceptional.' },
  { name: 'Jordan Park', role: 'Designer', text: 'Finally, components that match our Figma designs.' },
]

const avatars = [
  { src: '/avatars/1.jpg', alt: 'Sarah' },
  { src: '/avatars/2.jpg', alt: 'Alex' },
  { src: '/avatars/3.jpg', alt: 'Jordan' },
  { src: '/avatars/4.jpg', alt: 'Casey' },
  { src: '/avatars/5.jpg', alt: 'Morgan' },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-6 text-center">
      <h2 className="font-pixel text-3xl font-bold text-chalk mb-2">
        Loved by{' '}
        <FlipFadeText texts={['developers', 'designers', 'teams']} className="text-ignite" />
      </h2>
      <div className="flex justify-center my-6">
        <MaskedAvatars avatars={avatars} size={40} overlap={12} />
      </div>
      <p className="text-blush mb-10">Trusted by 500+ developers worldwide</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t) => (
          <TestimonialsCard key={t.name} {...t} />
        ))}
      </div>
    </section>
  )
}`,
  },
  {
    id: 'loading-state',
    title: 'Loading State Pattern',
    description:
      'A polished loading experience using SkeletonLoader for content placeholders, RevealLoader for page transitions, and MorphingText for status updates.',
    icon: <Zap className="h-4 w-4" />,
    components: ['skeleton-loader', 'reveal-loader', 'morphing-text'],
    preview: <LoadingStatePreview />,
    code: `import SkeletonLoader from '@/components/ui/skeleton-loader'
import MorphingText from '@/components/ui/morphing-text'

export default function LoadingState() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Status text that morphs between states */}
      <div className="text-center mb-6">
        <MorphingText
          texts={['Loading data...', 'Almost there...', 'Preparing view...']}
          className="text-lg font-medium text-chalk"
        />
      </div>

      {/* Skeleton placeholders */}
      <div className="space-y-4">
        {/* Avatar + name skeleton */}
        <div className="flex items-center gap-3">
          <SkeletonLoader className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <SkeletonLoader className="h-4 w-32 mb-2" />
            <SkeletonLoader className="h-3 w-24" />
          </div>
        </div>

        {/* Content lines */}
        <SkeletonLoader className="h-4 w-full" />
        <SkeletonLoader className="h-4 w-4/5" />
        <SkeletonLoader className="h-4 w-3/5" />

        {/* Card skeleton */}
        <SkeletonLoader className="h-32 w-full rounded-lg" />

        {/* Button skeleton */}
        <div className="flex gap-3">
          <SkeletonLoader className="h-10 w-28 rounded-lg" />
          <SkeletonLoader className="h-10 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    id: 'nav-layout',
    title: 'App Navigation Layout',
    description:
      'Full app chrome combining SpotlightNavbar for the top bar, GlassDock for a floating bottom bar, and AnimatedTabs for content sections.',
    icon: <Layers className="h-4 w-4" />,
    components: ['spotlight-navbar', 'glass-dock', 'animated-tabs'],
    preview: <NavLayoutPreview />,
    code: `import SpotlightNavbar from '@/components/ui/spotlight-navbar'
import GlassDock from '@/components/ui/glass-dock'
import AnimatedTabs from '@/components/ui/animated-tabs'
import { Home, Search, Bell, User, Settings } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Dashboard', href: '#dash' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Settings', href: '#settings' },
]

const dockItems = [
  { icon: <Home />, label: 'Home' },
  { icon: <Search />, label: 'Search' },
  { icon: <Bell />, label: 'Alerts' },
  { icon: <User />, label: 'Profile' },
  { icon: <Settings />, label: 'Settings' },
]

const tabs = [
  { label: 'Overview', content: <div>Dashboard overview content...</div> },
  { label: 'Analytics', content: <div>Analytics charts here...</div> },
  { label: 'Reports', content: <div>Generated reports...</div> },
]

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-void">
      {/* Top navigation */}
      <SpotlightNavbar items={navItems} />

      {/* Main content with tabs */}
      <main className="max-w-5xl mx-auto px-6 pt-20 pb-24">
        <h1 className="font-pixel text-2xl text-chalk mb-6">Dashboard</h1>
        <AnimatedTabs tabs={tabs} />
      </main>

      {/* Bottom dock for mobile */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden">
        <GlassDock items={dockItems} />
      </div>
    </div>
  )
}`,
  },
]

// ─── Preview components (simplified visual previews) ─────

function LandingHeroPreview() {
  return (
    <div className="p-6 text-center bg-void rounded-lg">
      <span className="inline-block rounded-full border border-ignite/20 bg-ignite/10 px-3 py-1 text-[10px] font-medium text-ignite mb-3">
        Now in Beta
      </span>
      <h3 className="font-pixel text-lg font-bold text-chalk mb-2">
        Build <span className="text-ignite">beautiful</span> interfaces
      </h3>
      <p className="text-xs text-blush mb-4 max-w-xs mx-auto">
        Copy-paste React components with smooth animations.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button className="rounded-lg bg-ignite px-4 py-2 text-xs font-medium text-void">
          Get Started
        </button>
        <button className="rounded-lg border border-blush/30 px-4 py-2 text-xs font-medium text-blush">
          View Components
        </button>
      </div>
    </div>
  )
}

function FeatureGridPreview() {
  const items = [
    { label: 'Components', value: '34+' },
    { label: 'Bundle Size', value: '0kb' },
    { label: 'Accessible', value: '100%' },
  ]
  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-border bg-obsidian p-3 text-center">
          <div className="text-lg font-bold text-ignite">{item.value}</div>
          <div className="text-[10px] text-blush">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

function PricingPreview() {
  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      {['Free', 'Pro', 'Team'].map((name, i) => (
        <div
          key={name}
          className={`rounded-lg border p-3 text-center ${
            i === 1 ? 'border-ignite/30 bg-ignite/5 ring-1 ring-ignite/10' : 'border-border bg-obsidian'
          }`}
        >
          <div className="text-[10px] text-blush mb-1">{name}</div>
          <div className="text-sm font-bold text-chalk">
            ${[0, 29, 99][i]}
          </div>
          <div className="mt-2 space-y-1">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-1.5 rounded bg-border mx-auto" style={{ width: `${50 + j * 10}%` }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function TestimonialsPreview() {
  return (
    <div className="p-4 text-center">
      <div className="text-xs text-blush mb-3">
        Loved by <span className="text-ignite">developers</span>
      </div>
      <div className="flex justify-center -space-x-2 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-7 w-7 rounded-full border-2 border-void"
            style={{ backgroundColor: `hsl(${i * 40 + 10}, 50%, 50%)` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-border bg-obsidian p-2">
            <div className="h-1.5 w-8 rounded bg-border mx-auto mb-1.5" />
            <div className="space-y-1">
              <div className="h-1 rounded bg-border/60 mx-1" />
              <div className="h-1 rounded bg-border/60 mx-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LoadingStatePreview() {
  return (
    <div className="p-4 space-y-3">
      <div className="text-xs text-blush text-center mb-2">Loading data...</div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-border animate-pulse" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2 w-20 rounded bg-border animate-pulse" />
          <div className="h-1.5 w-14 rounded bg-border/60 animate-pulse" />
        </div>
      </div>
      <div className="h-2 w-full rounded bg-border animate-pulse" />
      <div className="h-2 w-4/5 rounded bg-border animate-pulse" />
      <div className="h-16 w-full rounded-lg bg-border animate-pulse" />
      <div className="flex gap-2">
        <div className="h-6 w-16 rounded bg-border animate-pulse" />
        <div className="h-6 w-16 rounded bg-border animate-pulse" />
      </div>
    </div>
  )
}

function NavLayoutPreview() {
  return (
    <div className="p-2">
      {/* Mini navbar */}
      <div className="flex items-center justify-between rounded-md border border-border bg-obsidian px-3 py-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-ignite" />
          <div className="h-1.5 w-10 rounded bg-chalk/50" />
        </div>
        <div className="flex gap-3">
          {['Home', 'Dash', 'Settings'].map((t) => (
            <span key={t} className="text-[8px] text-blush">{t}</span>
          ))}
        </div>
      </div>
      {/* Mini tabs + content */}
      <div className="rounded-lg border border-border bg-obsidian p-2">
        <div className="flex gap-1 mb-2">
          {['Overview', 'Analytics', 'Reports'].map((t, i) => (
            <span
              key={t}
              className={`rounded px-2 py-0.5 text-[8px] ${
                i === 0 ? 'bg-ignite/10 text-ignite' : 'text-text-faint'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="space-y-1.5">
          {[1, 2, 3].map((j) => (
            <div key={j} className="h-1.5 rounded bg-border" style={{ width: `${60 + j * 10}%` }} />
          ))}
        </div>
      </div>
      {/* Mini dock */}
      <div className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-full border border-border bg-obsidian/80 px-3 py-1.5 backdrop-blur">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-3.5 w-3.5 rounded-md ${i === 1 ? 'bg-ignite' : 'bg-border'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Code copy button ────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-green-400" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          Copy
        </>
      )}
    </button>
  )
}

// ─── Recipe Card ─────────────────────────────────────────

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      layout
      className="rounded-xl border border-border bg-obsidian overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-ignite">{recipe.icon}</span>
              <h3 className="font-pixel text-lg font-bold text-chalk">
                {recipe.title}
              </h3>
            </div>
            <p className="text-sm text-blush leading-relaxed">
              {recipe.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {recipe.components.map((c) => (
                <Link
                  key={c}
                  href={`/docs/${c}`}
                  className="rounded-md border border-border bg-void px-2 py-0.5 font-mono text-[10px] text-text-faint transition-colors hover:border-ignite/30 hover:text-ignite"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Visual preview */}
        <div className="mt-4 rounded-lg border border-border bg-void overflow-hidden">
          {recipe.preview}
        </div>
      </div>

      {/* Expand / collapse code */}
      <div className="border-t border-border">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between px-5 py-3 text-xs font-medium text-blush transition-colors hover:text-chalk sm:px-6"
        >
          <span className="flex items-center gap-1.5">
            {expanded ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
            {expanded ? 'Hide code' : 'View full code'}
          </span>
          {expanded && <CopyButton text={recipe.code} />}
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <pre className="max-h-96 overflow-auto border-t border-border bg-void p-4 font-mono text-xs leading-relaxed text-blush sm:p-6">
                <code>{recipe.code}</code>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Main Page ───────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function ExamplesContent() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 pt-28 pb-20">
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
              Examples & Recipes
            </span>
          </div>
          <h1 className="font-pixel text-3xl font-bold text-chalk sm:text-4xl">
            Real-world Patterns
          </h1>
          <p className="mt-3 max-w-2xl text-base text-blush leading-relaxed">
            Complete code recipes combining multiple Praxys UI components into
            production-ready sections. Copy the full pattern, then customize.
          </p>
        </div>

        {/* Recipes grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {recipes.map((recipe) => (
            <motion.div key={recipe.id} variants={itemVariants}>
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-text-faint mb-4">
            Want to see a specific recipe? Open an issue on GitHub.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/docs/components-overview"
              className="rounded-lg bg-ignite px-5 py-2.5 text-sm font-medium text-void transition-opacity hover:opacity-90"
            >
              Browse Components
            </Link>
            <Link
              href="https://github.com/sushanttverma/Praxys-UI/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
            >
              Request a Recipe
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
