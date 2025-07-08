'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Palette, Sparkles, ArrowRight, Star } from 'lucide-react'
import { buildThemeVars, themePresets } from '@/lib/theme-presets'
import AnimatedTabs from '@/app/components/ui/animated-tabs'
import SpotlightCard from '@/app/components/ui/spotlight-card'
import AnimatedCounter from '@/app/components/ui/animated-counter'
import AnimatedButton from '@/app/components/ui/animated-button'

const preset = themePresets.find((p) => p.name === 'Purple Haze')!

function useThemeMode(): 'dark' | 'light' {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  useEffect(() => {
    const el = document.documentElement
    const check = () => setMode(el.getAttribute('data-theme') === 'light' ? 'light' : 'dark')
    check()
    const obs = new MutationObserver(check)
    obs.observe(el, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])
  return mode
}

const services = [
  {
    id: 'branding',
    label: 'Branding',
    content: (
      <div className="p-4 space-y-3">
        <h4 className="font-pixel text-lg font-bold text-chalk">Brand Identity</h4>
        <p className="text-sm text-blush leading-relaxed">
          We craft memorable brand identities that resonate with your audience. From logo design
          to brand guidelines, we build the visual foundation your company deserves.
        </p>
        <div className="flex gap-2">
          <span className="rounded-full border border-border bg-void px-2.5 py-0.5 text-[11px] text-text-faint">Logo Design</span>
          <span className="rounded-full border border-border bg-void px-2.5 py-0.5 text-[11px] text-text-faint">Color Systems</span>
          <span className="rounded-full border border-border bg-void px-2.5 py-0.5 text-[11px] text-text-faint">Typography</span>
        </div>
      </div>
    ),
  },
  {
    id: 'web',
    label: 'Web Design',
    content: (
      <div className="p-4 space-y-3">
        <h4 className="font-pixel text-lg font-bold text-chalk">Web Experiences</h4>
        <p className="text-sm text-blush leading-relaxed">
          We design and build stunning websites that convert visitors into customers. Every pixel
          is crafted with purpose, every interaction designed with intent.
        </p>
        <div className="flex gap-2">
          <span className="rounded-full border border-border bg-void px-2.5 py-0.5 text-[11px] text-text-faint">UI/UX Design</span>
          <span className="rounded-full border border-border bg-void px-2.5 py-0.5 text-[11px] text-text-faint">Development</span>
          <span className="rounded-full border border-border bg-void px-2.5 py-0.5 text-[11px] text-text-faint">Animation</span>
        </div>
      </div>
    ),
  },
  {
    id: 'motion',
    label: 'Motion',
    content: (
      <div className="p-4 space-y-3">
        <h4 className="font-pixel text-lg font-bold text-chalk">Motion Design</h4>
        <p className="text-sm text-blush leading-relaxed">
          Bring your brand to life with cinematic motion graphics, micro-interactions,
          and scroll-driven animations that captivate and engage.
        </p>
        <div className="flex gap-2">
          <span className="rounded-full border border-border bg-void px-2.5 py-0.5 text-[11px] text-text-faint">3D Animation</span>
          <span className="rounded-full border border-border bg-void px-2.5 py-0.5 text-[11px] text-text-faint">Micro-interactions</span>
          <span className="rounded-full border border-border bg-void px-2.5 py-0.5 text-[11px] text-text-faint">Video</span>
        </div>
      </div>
    ),
  },
]

const portfolio = [
  { title: 'Nova Finance', category: 'Branding', description: 'Complete brand identity for a fintech startup.' },
  { title: 'Lumix Gallery', category: 'Web Design', description: 'Immersive portfolio for an art collective.' },
  { title: 'Drift Audio', category: 'Motion', description: 'Product launch video and website animations.' },
]

const stats = [
  { label: 'Projects Completed', value: 240, suffix: '+' },
  { label: 'Awards Won', value: 18, suffix: '' },
  { label: 'Happy Clients', value: 120, suffix: '+' },
]

export default function PurpleHazeTheme() {
  const mode = useThemeMode()
  const themeVars = buildThemeVars(mode === 'light' ? preset.light : preset.dark)

  return (
    <div style={themeVars} className="min-h-screen bg-void">
      {/* Header */}
      <header className="border-b border-border bg-void/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ignite">
              <Palette className="h-4 w-4 text-void" />
            </div>
            <span className="font-pixel text-lg font-semibold text-chalk">Nebula Studio</span>
          </div>
          <nav className="hidden items-center gap-6 sm:flex">
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Work</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Services</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">About</span>
          </nav>
          <button className="flex h-8 items-center rounded-lg bg-ignite px-3 text-xs font-medium text-void cursor-pointer">
            Contact Us
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-ignite/6 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ignite/30 bg-ignite/10 px-3 py-1 text-xs font-medium text-ignite mb-6">
              <Sparkles className="h-3 w-3" />
              Purple Haze Theme Preview
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-pixel text-3xl font-bold text-chalk sm:text-5xl leading-tight"
          >
            We design experiences that <span className="text-ignite">inspire</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base text-blush leading-relaxed"
          >
            Nebula Studio is a creative agency specializing in branding, web design,
            and motion graphics for forward-thinking companies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <AnimatedButton className="bg-ignite text-void border-ignite">
              View Our Work
            </AnimatedButton>
            <button className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-blush hover:text-chalk transition-colors cursor-pointer">
              Our Process
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-obsidian/50 py-10">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 px-6 sm:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-pixel text-2xl font-bold text-chalk">
                <AnimatedCounter to={stat.value} duration={2} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-xs text-text-faint">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <div className="text-center mb-10">
          <h2 className="font-pixel text-2xl font-bold text-chalk sm:text-3xl">
            What we <span className="text-ignite">do</span>
          </h2>
          <p className="mt-3 text-sm text-blush">Full-service creative capabilities.</p>
        </div>
        <AnimatedTabs tabs={services} defaultTab="branding" />
      </section>

      {/* Portfolio */}
      <section className="border-t border-border bg-obsidian/30 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-pixel text-2xl font-bold text-chalk sm:text-3xl">
              Selected <span className="text-ignite">Work</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {portfolio.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <SpotlightCard className="h-full rounded-2xl border border-border bg-obsidian">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full border border-ignite/30 bg-ignite/10 px-2 py-0.5 text-[10px] text-ignite">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-pixel text-base font-bold text-chalk">{item.title}</h3>
                  <p className="mt-2 text-sm text-blush leading-relaxed">{item.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-lg px-6">
          <Star className="mx-auto h-10 w-10 text-ignite mb-4" />
          <h2 className="font-pixel text-xl font-bold text-chalk sm:text-2xl">
            Have a project in mind?
          </h2>
          <p className="mt-3 text-sm text-blush">
            Let&apos;s create something extraordinary together.
          </p>
          <div className="mt-6">
            <AnimatedButton className="bg-ignite text-void border-ignite">
              Start a Project
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  )
}
