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
  BarChart3,
  ClipboardList,
  HelpCircle,
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
  {
    id: 'dashboard-stats',
    title: 'Dashboard Stats Panel',
    description:
      'An analytics dashboard section combining AnimatedCounter for live KPIs, ProgressBar for usage meters, AnimatedToggle for settings, and SpotlightCard for interactive panels.',
    icon: <BarChart3 className="h-4 w-4" />,
    components: ['animated-counter', 'progress-bar', 'animated-toggle', 'spotlight-card'],
    preview: <DashboardStatsPreview />,
    code: `import { useState } from 'react'
import AnimatedCounter from '@/components/ui/animated-counter'
import ProgressBar from '@/components/ui/progress-bar'
import AnimatedToggle from '@/components/ui/animated-toggle'
import SpotlightCard from '@/components/ui/spotlight-card'

const metrics = [
  { label: 'Revenue', to: 48250, prefix: '$', suffix: '' },
  { label: 'Users', to: 3842, prefix: '', suffix: '+' },
  { label: 'Uptime', to: 99.9, prefix: '', suffix: '%', decimals: 1 },
]

export default function DashboardStats() {
  const [liveMode, setLiveMode] = useState(true)

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with toggle */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-pixel text-2xl font-bold text-chalk">
            Analytics
          </h2>
          <div className="flex items-center gap-2">
            <AnimatedToggle
              checked={liveMode}
              onChange={setLiveMode}
              label="Live"
              size="sm"
            />
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {metrics.map((m) => (
            <SpotlightCard key={m.label} className="text-center py-6">
              <AnimatedCounter
                to={m.to}
                prefix={m.prefix}
                suffix={m.suffix}
                decimals={m.decimals ?? 0}
                duration={2}
                className="text-3xl font-bold text-chalk"
              />
              <p className="mt-1 text-sm text-blush">{m.label}</p>
            </SpotlightCard>
          ))}
        </div>

        {/* Usage meters */}
        <div className="rounded-xl border border-border bg-obsidian p-6 space-y-5">
          <h3 className="font-pixel text-sm font-bold text-chalk">
            Resource Usage
          </h3>
          <ProgressBar value={73} label="CPU" showValue size="md" />
          <ProgressBar value={58} label="Memory" showValue size="md" />
          <ProgressBar
            value={91}
            label="Storage"
            showValue
            size="md"
            color="#E84E2D"
          />
        </div>
      </div>
    </section>
  )
}`,
  },
  {
    id: 'onboarding-form',
    title: 'Multi-step Onboarding Form',
    description:
      'A guided onboarding wizard using Stepper for progress tracking, AnimatedButton for navigation, ModalDialog for confirmations, and toast notifications for feedback.',
    icon: <ClipboardList className="h-4 w-4" />,
    components: ['stepper', 'animated-button', 'modal-dialog', 'toast-notification'],
    preview: <OnboardingFormPreview />,
    code: `import { useState } from 'react'
import Stepper from '@/components/ui/stepper'
import AnimatedButton from '@/components/ui/animated-button'
import ModalDialog from '@/components/ui/modal-dialog'
import { useToast } from '@/components/ui/toast-notification'
import ToastContainer from '@/components/ui/toast-notification'

const steps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Add personal info' },
  { label: 'Workspace', description: 'Set up your workspace' },
  { label: 'Done', description: 'All set!' },
]

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showConfirm, setShowConfirm] = useState(false)
  const { toasts, addToast, dismissToast } = useToast()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1)
      addToast({
        message: \`Step \${currentStep + 2}: \${steps[currentStep + 1].label}\`,
        variant: 'success',
      })
    } else {
      setShowConfirm(true)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      {/* Stepper */}
      <Stepper steps={steps} currentStep={currentStep} />

      {/* Form content */}
      <div className="mt-8 rounded-xl border border-border bg-obsidian p-6">
        <h3 className="font-pixel text-lg text-chalk mb-2">
          {steps[currentStep].label}
        </h3>
        <p className="text-sm text-blush mb-6">
          {steps[currentStep].description}
        </p>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <AnimatedButton
              className="bg-transparent border-border text-blush"
              onClick={() => setCurrentStep((s) => s - 1)}
            >
              Back
            </AnimatedButton>
          )}
          <AnimatedButton onClick={handleNext}>
            {currentStep < steps.length - 1 ? 'Continue' : 'Finish'}
          </AnimatedButton>
        </div>
      </div>

      {/* Confirmation modal */}
      <ModalDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="All done!"
        description="Your workspace is ready to go."
      >
        <AnimatedButton onClick={() => setShowConfirm(false)}>
          Get Started
        </AnimatedButton>
      </ModalDialog>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}`,
  },
  {
    id: 'faq-help-center',
    title: 'FAQ & Help Center',
    description:
      'A support page pattern using Accordion for expandable FAQs, AnimatedTabs for category switching, Tooltip for contextual help, and DropdownMenu for quick actions.',
    icon: <HelpCircle className="h-4 w-4" />,
    components: ['accordion', 'animated-tabs', 'tooltip', 'dropdown-menu'],
    preview: <FaqHelpPreview />,
    code: `import Accordion from '@/components/ui/accordion'
import AnimatedTabs from '@/components/ui/animated-tabs'
import Tooltip from '@/components/ui/tooltip'
import DropdownMenu from '@/components/ui/dropdown-menu'
import { HelpCircle, MessageSquare, Book, Mail } from 'lucide-react'

const generalFaqs = [
  {
    id: 'g1',
    title: 'How do I install components?',
    content: 'Use the CLI: npx praxys-ui add <component-name>. Each component is copied directly into your project.',
  },
  {
    id: 'g2',
    title: 'Do I need to install any dependencies?',
    content: 'Most components only require framer-motion and tailwindcss, which are listed as peer dependencies.',
  },
  {
    id: 'g3',
    title: 'Can I customize the styling?',
    content: 'Absolutely. Every component uses Tailwind classes and CSS custom properties, so you can override anything.',
  },
]

const billingFaqs = [
  {
    id: 'b1',
    title: 'Is Praxys UI free?',
    content: 'Yes! Praxys UI is completely open source under the MIT license.',
  },
  {
    id: 'b2',
    title: 'Do you offer paid support?',
    content: 'We offer priority support and custom component development. Contact us for details.',
  },
]

const tabs = [
  {
    id: 'general',
    label: 'General',
    content: <Accordion items={generalFaqs} />,
  },
  {
    id: 'billing',
    label: 'Billing',
    content: <Accordion items={billingFaqs} />,
  },
]

const contactActions = [
  { label: 'Email Support', icon: <Mail className="h-4 w-4" /> },
  { label: 'Live Chat', icon: <MessageSquare className="h-4 w-4" /> },
  { label: 'Documentation', icon: <Book className="h-4 w-4" /> },
]

export default function FaqHelpCenter() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-pixel text-2xl font-bold text-chalk">
              Help Center
            </h2>
            <p className="mt-1 text-sm text-blush">
              Find answers or{' '}
              <Tooltip content="We typically respond within 2 hours">
                <span className="text-ignite underline decoration-dotted cursor-help">
                  contact us
                </span>
              </Tooltip>
            </p>
          </div>
          <DropdownMenu
            trigger={
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-blush hover:text-chalk">
                <HelpCircle className="h-4 w-4" />
                Contact
              </button>
            }
            items={contactActions}
          />
        </div>

        <AnimatedTabs tabs={tabs} defaultTab="general" />
      </div>
    </section>
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

function DashboardStatsPreview() {
  return (
    <div className="p-4 space-y-3">
      {/* Toggle row */}
      <div className="flex items-center justify-between">
        <div className="h-2 w-16 rounded bg-chalk/40" />
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-6 rounded bg-border" />
          <div className="h-3.5 w-7 rounded-full bg-ignite relative">
            <div className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-chalk" />
          </div>
        </div>
      </div>
      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-2">
        {[{ v: '$48K', l: 'Revenue' }, { v: '3.8K', l: 'Users' }, { v: '99.9%', l: 'Uptime' }].map((m) => (
          <div key={m.l} className="rounded-lg border border-border bg-obsidian p-2 text-center">
            <div className="text-sm font-bold text-ignite">{m.v}</div>
            <div className="text-[9px] text-blush">{m.l}</div>
          </div>
        ))}
      </div>
      {/* Progress bars */}
      <div className="rounded-lg border border-border bg-obsidian p-3 space-y-2">
        {[73, 58, 91].map((v) => (
          <div key={v} className="space-y-1">
            <div className="flex justify-between">
              <div className="h-1.5 w-8 rounded bg-border" />
              <span className="text-[8px] text-text-faint">{v}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-void overflow-hidden">
              <div
                className={`h-full rounded-full ${v > 85 ? 'bg-ignite' : 'bg-ignite/70'}`}
                style={{ width: `${v}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function OnboardingFormPreview() {
  return (
    <div className="p-4 space-y-3">
      {/* Stepper */}
      <div className="flex items-center justify-between px-2">
        {['Account', 'Profile', 'Workspace', 'Done'].map((step, i) => (
          <div key={step} className="flex items-center gap-1">
            <div className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold ${
              i < 2 ? 'bg-ignite text-void' : i === 2 ? 'border border-ignite text-ignite' : 'border border-border text-text-faint'
            }`}>
              {i < 2 ? '\u2713' : i + 1}
            </div>
            <span className={`text-[8px] hidden sm:inline ${i <= 2 ? 'text-chalk' : 'text-text-faint'}`}>{step}</span>
            {i < 3 && <div className={`mx-1 h-px w-4 ${i < 2 ? 'bg-ignite' : 'bg-border'}`} />}
          </div>
        ))}
      </div>
      {/* Form card */}
      <div className="rounded-lg border border-border bg-obsidian p-3">
        <div className="h-2 w-20 rounded bg-chalk/40 mb-1.5" />
        <div className="h-1.5 w-32 rounded bg-border mb-3" />
        <div className="space-y-2 mb-3">
          <div className="h-6 w-full rounded border border-border bg-void" />
          <div className="h-6 w-full rounded border border-border bg-void" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-12 rounded bg-obsidian border border-border" />
          <div className="h-5 w-14 rounded bg-ignite" />
        </div>
      </div>
    </div>
  )
}

function FaqHelpPreview() {
  return (
    <div className="p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 w-20 rounded bg-chalk/40 mb-1" />
          <div className="h-1.5 w-28 rounded bg-border" />
        </div>
        <div className="h-6 w-16 rounded border border-border flex items-center justify-center">
          <span className="text-[8px] text-blush">Contact</span>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-1">
        {['General', 'Billing'].map((t, i) => (
          <span key={t} className={`rounded px-2.5 py-0.5 text-[9px] ${i === 0 ? 'bg-ignite/10 text-ignite' : 'text-text-faint'}`}>
            {t}
          </span>
        ))}
      </div>
      {/* Accordion items */}
      <div className="space-y-1.5">
        {['How do I install?', 'Any dependencies?', 'Customize styling?'].map((q, i) => (
          <div key={q} className="rounded border border-border bg-obsidian overflow-hidden">
            <div className="flex items-center justify-between px-2.5 py-1.5">
              <span className="text-[9px] text-chalk">{q}</span>
              <ChevronDown className={`h-2.5 w-2.5 text-text-faint transition-transform ${i === 0 ? 'rotate-180' : ''}`} />
            </div>
            {i === 0 && (
              <div className="border-t border-border px-2.5 py-1.5">
                <div className="h-1 w-full rounded bg-border mb-1" />
                <div className="h-1 w-3/4 rounded bg-border" />
              </div>
            )}
          </div>
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

      <main id="main-content" className="mx-auto max-w-4xl px-6 pt-28 pb-20">
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
            Currently featuring <span className="text-ignite font-medium">9 recipes</span> across
            common UI patterns.
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
              href="/components"
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
