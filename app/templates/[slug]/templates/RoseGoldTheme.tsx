'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Diamond, Crown, Heart, ArrowRight, Star, Gem } from 'lucide-react'
import { buildThemeVars, themePresets } from '@/lib/theme-presets'
import TypewriterText from '@/app/components/ui/typewriter-text'
import SpotlightCard from '@/app/components/ui/spotlight-card'
import AnimatedCounter from '@/app/components/ui/animated-counter'
import AnimatedButton from '@/app/components/ui/animated-button'

const preset = themePresets.find((p) => p.name === 'Rose Gold')!

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

const collections = [
  {
    icon: Diamond,
    title: 'Eternal Collection',
    description: 'Timeless pieces crafted from ethically sourced diamonds and 18K gold.',
    tag: 'New Season',
  },
  {
    icon: Crown,
    title: 'Royal Heritage',
    description: 'Inspired by centuries of royal craftsmanship, reimagined for the modern era.',
    tag: 'Exclusive',
  },
  {
    icon: Gem,
    title: 'Celestial Series',
    description: 'Delicate designs featuring sapphires and moonstones set in platinum.',
    tag: 'Limited',
  },
]

const stats = [
  { label: 'Years of Heritage', value: 127, suffix: '' },
  { label: 'Boutiques Worldwide', value: 84, suffix: '' },
  { label: 'Master Artisans', value: 350, suffix: '+' },
]

const testimonials = [
  {
    quote: 'The craftsmanship is unparalleled. Each piece tells a story that transcends time.',
    author: 'Isabella Fontaine',
    role: 'Style Director, Vogue Paris',
  },
  {
    quote: 'Maison defines what modern luxury should be — ethical, exquisite, and unforgettable.',
    author: 'Alexander Chen',
    role: 'Chief Curator, Sotheby\'s',
  },
]

export default function RoseGoldTheme() {
  const mode = useThemeMode()
  const themeVars = buildThemeVars(mode === 'light' ? preset.light : preset.dark)

  return (
    <div style={themeVars} className="min-h-screen bg-void">
      {/* Header */}
      <header className="border-b border-border bg-void/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ignite">
              <Diamond className="h-4 w-4 text-void" />
            </div>
            <span className="font-pixel text-lg font-semibold text-chalk">Maison</span>
          </div>
          <nav className="hidden items-center gap-6 sm:flex">
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Collections</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Artisans</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Heritage</span>
          </nav>
          <button className="flex h-8 items-center rounded-lg bg-ignite px-3 text-xs font-medium text-void cursor-pointer">
            Book Appointment
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-ignite/4 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ignite/30 bg-ignite/10 px-3 py-1 text-xs font-medium text-ignite mb-6">
              <Heart className="h-3 w-3" />
              Rose Gold Theme Preview
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-pixel text-3xl font-bold text-chalk sm:text-5xl leading-tight"
          >
            Crafted for{' '}
            <span className="text-ignite">
              <TypewriterText strings={['elegance', 'eternity', 'excellence', 'you']} typingSpeed={70} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base text-blush leading-relaxed"
          >
            Maison brings 127 years of artisanal excellence to every piece. Discover
            jewelry that becomes part of your story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <AnimatedButton className="bg-ignite text-void border-ignite">
              Explore Collections
            </AnimatedButton>
            <button className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-blush hover:text-chalk transition-colors cursor-pointer">
              Our Story
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

      {/* Collections */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="font-pixel text-2xl font-bold text-chalk sm:text-3xl">
            Signature <span className="text-ignite">Collections</span>
          </h2>
          <p className="mt-3 text-sm text-blush">Each collection is a testament to artisanal mastery.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {collections.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <SpotlightCard className="h-full rounded-2xl border border-border bg-obsidian">
                <div className="mb-3 flex items-center justify-between">
                  <item.icon className="h-8 w-8 text-ignite" />
                  <span className="rounded-full border border-ignite/30 bg-ignite/10 px-2 py-0.5 text-[10px] text-ignite">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-pixel text-base font-bold text-chalk">{item.title}</h3>
                <p className="mt-2 text-sm text-blush leading-relaxed">{item.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-obsidian/30 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-10">
            <h2 className="font-pixel text-xl font-bold text-chalk">Voices of <span className="text-ignite">Excellence</span></h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="rounded-2xl border border-border bg-obsidian p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-ignite text-ignite" />
                  ))}
                </div>
                <p className="text-sm text-blush leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm font-medium text-chalk">{t.author}</p>
                  <p className="text-xs text-text-faint">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-lg px-6">
          <Crown className="mx-auto h-10 w-10 text-ignite mb-4" />
          <h2 className="font-pixel text-xl font-bold text-chalk sm:text-2xl">
            Begin your journey
          </h2>
          <p className="mt-3 text-sm text-blush">
            Visit our boutique or schedule a private viewing with our specialists.
          </p>
          <div className="mt-6">
            <AnimatedButton className="bg-ignite text-void border-ignite">
              Book Private Viewing
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  )
}
