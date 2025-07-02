'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Leaf, TreePine, Droplets, Wind, ArrowRight, Sprout } from 'lucide-react'
import { buildThemeVars, themePresets } from '@/lib/theme-presets'
import MorphingText from '@/app/components/ui/morphing-text'
import GlowBorderCard from '@/app/components/ui/glow-border-card'
import ProgressBar from '@/app/components/ui/progress-bar'
import AnimatedButton from '@/app/components/ui/animated-button'

const preset = themePresets.find((p) => p.name === 'Forest')!

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

const initiatives = [
  {
    icon: TreePine,
    title: 'Reforestation',
    description: 'Plant trees in deforested regions with real-time satellite tracking of growth.',
  },
  {
    icon: Droplets,
    title: 'Clean Water',
    description: 'Fund water purification projects in communities that need it most.',
  },
  {
    icon: Wind,
    title: 'Carbon Offset',
    description: 'Invest in verified carbon offset programs to neutralize your footprint.',
  },
]

const goals = [
  { label: 'Trees Planted', current: 847000, target: 1000000, pct: 84.7 },
  { label: 'Carbon Offset (tons)', current: 12400, target: 20000, pct: 62 },
  { label: 'Communities Reached', current: 156, target: 200, pct: 78 },
]

export default function ForestTheme() {
  const mode = useThemeMode()
  const themeVars = buildThemeVars(mode === 'light' ? preset.light : preset.dark)

  return (
    <div style={themeVars} className="min-h-screen bg-void">
      {/* Header */}
      <header className="border-b border-border bg-void/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ignite">
              <Leaf className="h-4 w-4 text-void" />
            </div>
            <span className="font-pixel text-lg font-semibold text-chalk">Verdant</span>
          </div>
          <nav className="hidden items-center gap-6 sm:flex">
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Impact</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Projects</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">About</span>
          </nav>
          <div className="flex items-center gap-3">
            <button className="flex h-8 items-center rounded-lg bg-ignite px-3 text-xs font-medium text-void cursor-pointer">
              Take Action
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 left-1/4 h-[400px] w-[400px] rounded-full bg-ignite/5 blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 h-[300px] w-[300px] rounded-full bg-ignite/3 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ignite/30 bg-ignite/10 px-3 py-1 text-xs font-medium text-ignite mb-6">
              <Sprout className="h-3 w-3" />
              Forest Theme Preview
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-pixel text-3xl font-bold text-chalk sm:text-5xl leading-tight"
          >
            Restore our planet with{' '}
            <span className="text-ignite">
              <MorphingText words={['reforestation', 'clean water', 'carbon offset', 'biodiversity']} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base text-blush leading-relaxed"
          >
            Join the movement to heal the earth. Track your impact in real-time and
            make a measurable difference with every contribution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <AnimatedButton className="bg-ignite text-void border-ignite hover:bg-ignite/90">
              Start Your Impact
            </AnimatedButton>
            <button className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-blush hover:text-chalk transition-colors cursor-pointer">
              Learn More
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="font-pixel text-2xl font-bold text-chalk sm:text-3xl">
            Our <span className="text-ignite">Initiatives</span>
          </h2>
          <p className="mt-3 text-sm text-blush">Three pillars of environmental restoration.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {initiatives.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <GlowBorderCard className="h-full rounded-2xl border border-border bg-obsidian p-6">
                <item.icon className="h-8 w-8 text-ignite mb-4" />
                <h3 className="font-pixel text-base font-bold text-chalk">{item.title}</h3>
                <p className="mt-2 text-sm text-blush leading-relaxed">{item.description}</p>
              </GlowBorderCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Progress Goals */}
      <section className="border-y border-border bg-obsidian/30 py-16">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center mb-10">
            <h2 className="font-pixel text-xl font-bold text-chalk">Impact Progress</h2>
            <p className="mt-2 text-sm text-blush">Real-time tracking of our environmental goals.</p>
          </div>

          <div className="space-y-6 rounded-2xl border border-border bg-obsidian p-6 sm:p-8">
            {goals.map((goal) => (
              <div key={goal.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-blush">{goal.label}</span>
                  <span className="text-text-faint">
                    {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                  </span>
                </div>
                <ProgressBar value={goal.pct} max={100} animated />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-lg px-6">
          <Leaf className="mx-auto h-10 w-10 text-ignite mb-4" />
          <h2 className="font-pixel text-xl font-bold text-chalk sm:text-2xl">
            Every action counts
          </h2>
          <p className="mt-3 text-sm text-blush">
            Start making a difference today. Your first contribution is matched 2x.
          </p>
          <div className="mt-6">
            <AnimatedButton className="bg-ignite text-void border-ignite">
              Join Verdant
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  )
}
