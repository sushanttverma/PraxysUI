'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Database, Globe, ArrowRight, Shield, Zap, BarChart3 } from 'lucide-react'
import { buildThemeVars, themePresets } from '@/lib/theme-presets'
import TypewriterText from '@/app/components/ui/typewriter-text'
import SpotlightCard from '@/app/components/ui/spotlight-card'
import AnimatedCounter from '@/app/components/ui/animated-counter'
import AnimatedButton from '@/app/components/ui/animated-button'

const preset = themePresets.find((p) => p.name === 'Ocean')!

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

const features = [
  {
    icon: Cloud,
    title: 'Cloud Native',
    description: 'Deploy globally in seconds with edge-first infrastructure built for scale.',
  },
  {
    icon: Database,
    title: 'Real-time Sync',
    description: 'Instant data synchronization across all clients with conflict resolution.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 certified with end-to-end encryption and role-based access control.',
  },
]

const stats = [
  { label: 'Global Users', value: 85000, suffix: '+' },
  { label: 'Uptime SLA', value: 99.99, suffix: '%', decimals: 2 },
  { label: 'Avg Latency', value: 23, suffix: 'ms' },
]

export default function OceanTheme() {
  const mode = useThemeMode()
  const themeVars = buildThemeVars(mode === 'light' ? preset.light : preset.dark)

  return (
    <div style={themeVars} className="min-h-screen bg-void">
      {/* Header */}
      <header className="border-b border-border bg-void/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ignite">
              <Globe className="h-4 w-4 text-void" />
            </div>
            <span className="font-pixel text-lg font-semibold text-chalk">Streamline</span>
          </div>
          <nav className="hidden items-center gap-6 sm:flex">
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Features</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Pricing</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Docs</span>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex h-8 items-center rounded-lg border border-border px-3 text-xs text-blush hover:text-chalk transition-colors cursor-pointer">
              Sign in
            </button>
            <button className="flex h-8 items-center rounded-lg bg-ignite px-3 text-xs font-medium text-void cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[600px] rounded-full bg-ignite/5 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ignite/30 bg-ignite/10 px-3 py-1 text-xs font-medium text-ignite mb-6">
              <Zap className="h-3 w-3" />
              Ocean Theme Preview
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-pixel text-3xl font-bold text-chalk sm:text-5xl leading-tight"
          >
            Ship faster with{' '}
            <span className="text-ignite">
              <TypewriterText strings={['cloud sync', 'real-time data', 'edge compute', 'auto scaling']} typingSpeed={60} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base text-blush leading-relaxed"
          >
            The modern infrastructure platform that lets your team focus on building products,
            not managing servers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <AnimatedButton className="bg-ignite text-void border-ignite hover:bg-ignite/90">
              Start Building Free
            </AnimatedButton>
            <button className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-blush hover:text-chalk transition-colors cursor-pointer">
              View Documentation
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
                <AnimatedCounter to={stat.value} duration={2} decimals={stat.decimals ?? 0} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-xs text-text-faint">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="font-pixel text-2xl font-bold text-chalk sm:text-3xl">
            Everything you need to <span className="text-ignite">scale</span>
          </h2>
          <p className="mt-3 text-sm text-blush">Built for teams that move fast and build reliably.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <SpotlightCard className="h-full rounded-2xl border border-border bg-obsidian">
                <feat.icon className="h-8 w-8 text-ignite mb-4" />
                <h3 className="font-pixel text-base font-bold text-chalk">{feat.title}</h3>
                <p className="mt-2 text-sm text-blush leading-relaxed">{feat.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 text-center">
        <div className="mx-auto max-w-lg px-6">
          <BarChart3 className="mx-auto h-10 w-10 text-ignite mb-4" />
          <h2 className="font-pixel text-xl font-bold text-chalk sm:text-2xl">
            Ready to streamline your workflow?
          </h2>
          <p className="mt-3 text-sm text-blush">
            Join 85,000+ developers building on Streamline. Free tier available.
          </p>
          <div className="mt-6">
            <AnimatedButton className="bg-ignite text-void border-ignite">
              Get Started Free
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  )
}
