'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flame, UtensilsCrossed, Clock, MapPin, Star, Phone } from 'lucide-react'
import { buildThemeVars, themePresets } from '@/lib/theme-presets'
import SpotlightCard from '@/app/components/ui/spotlight-card'
import AnimatedCounter from '@/app/components/ui/animated-counter'
import AnimatedButton from '@/app/components/ui/animated-button'
import Tooltip from '@/app/components/ui/tooltip'

const preset = themePresets.find((p) => p.name === 'Amber')!

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

const menuCategories = [
  {
    title: 'Fire-Grilled Mains',
    description: 'Wagyu beef, heritage pork, and free-range poultry prepared over open flame with seasonal glazes.',
    items: '12 dishes',
    icon: Flame,
  },
  {
    title: 'Ocean & Garden',
    description: 'Daily seafood catch and farm-to-table vegetables with house-made sauces and dressings.',
    items: '8 dishes',
    icon: UtensilsCrossed,
  },
  {
    title: 'Sweet Finales',
    description: 'Artisanal desserts featuring dark chocolate, seasonal fruit, and hand-spun sugar work.',
    items: '6 dishes',
    icon: Star,
  },
]

const stats = [
  { label: 'Years Serving', value: 15, suffix: '' },
  { label: 'Dishes Crafted', value: 1200, suffix: '+' },
  { label: 'Five-Star Reviews', value: 4800, suffix: '+' },
]

const hours = [
  { day: 'Mon - Thu', time: '5:00 PM - 10:00 PM' },
  { day: 'Fri - Sat', time: '5:00 PM - 11:30 PM' },
  { day: 'Sunday', time: '4:00 PM - 9:00 PM' },
]

export default function AmberTheme() {
  const mode = useThemeMode()
  const themeVars = buildThemeVars(mode === 'light' ? preset.light : preset.dark)

  return (
    <div style={themeVars} className="min-h-screen bg-void">
      {/* Header */}
      <header className="border-b border-border bg-void/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ignite">
              <Flame className="h-4 w-4 text-void" />
            </div>
            <span className="font-pixel text-lg font-semibold text-chalk">Fuego</span>
          </div>
          <nav className="hidden items-center gap-6 sm:flex">
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Menu</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Story</span>
            <span className="text-sm text-blush hover:text-chalk transition-colors cursor-pointer">Events</span>
          </nav>
          <button className="flex h-8 items-center rounded-lg bg-ignite px-3 text-xs font-medium text-void cursor-pointer">
            Reserve a Table
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[500px] w-[600px] rounded-full bg-ignite/5 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ignite/30 bg-ignite/10 px-3 py-1 text-xs font-medium text-ignite mb-6">
              <Star className="h-3 w-3" />
              Amber Theme Preview
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-pixel text-3xl font-bold text-chalk sm:text-5xl leading-tight"
          >
            Where fire meets <span className="text-ignite">flavor</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base text-blush leading-relaxed"
          >
            Fuego is a celebration of fire-kissed cuisine. Every dish is crafted with
            passion, served with warmth, and remembered forever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <AnimatedButton className="bg-ignite text-void border-ignite hover:bg-ignite/90">
              Reserve Tonight
            </AnimatedButton>
            <Tooltip content="Call us at (555) 234-5678" position="bottom">
              <button className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-blush hover:text-chalk transition-colors cursor-pointer">
                <Phone className="h-3.5 w-3.5" />
                Call Us
              </button>
            </Tooltip>
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

      {/* Menu */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="font-pixel text-2xl font-bold text-chalk sm:text-3xl">
            Our <span className="text-ignite">Menu</span>
          </h2>
          <p className="mt-3 text-sm text-blush">Seasonal ingredients, timeless techniques.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {menuCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <SpotlightCard className="h-full rounded-2xl border border-border bg-obsidian">
                <div className="flex items-center justify-between mb-4">
                  <cat.icon className="h-8 w-8 text-ignite" />
                  <Tooltip content={`Browse all ${cat.items}`}>
                    <span className="rounded-full border border-ignite/30 bg-ignite/10 px-2 py-0.5 text-[10px] text-ignite cursor-help">
                      {cat.items}
                    </span>
                  </Tooltip>
                </div>
                <h3 className="font-pixel text-base font-bold text-chalk">{cat.title}</h3>
                <p className="mt-2 text-sm text-blush leading-relaxed">{cat.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hours & Location */}
      <section className="border-t border-border bg-obsidian/30 py-16">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center mb-10">
            <h2 className="font-pixel text-xl font-bold text-chalk">Visit <span className="text-ignite">Fuego</span></h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Hours */}
            <div className="rounded-2xl border border-border bg-obsidian p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-ignite" />
                <h3 className="font-pixel text-sm font-bold text-chalk">Hours</h3>
              </div>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between text-sm">
                    <span className="text-blush">{h.day}</span>
                    <span className="text-text-faint">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="rounded-2xl border border-border bg-obsidian p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-ignite" />
                <h3 className="font-pixel text-sm font-bold text-chalk">Location</h3>
              </div>
              <p className="text-sm text-blush leading-relaxed">
                742 Ember Avenue<br />
                Arts District, Los Angeles<br />
                CA 90013
              </p>
              <Tooltip content="Opens in Google Maps">
                <button className="mt-4 text-xs text-ignite hover:underline cursor-pointer">
                  Get Directions
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-lg px-6">
          <Flame className="mx-auto h-10 w-10 text-ignite mb-4" />
          <h2 className="font-pixel text-xl font-bold text-chalk sm:text-2xl">
            Your table awaits
          </h2>
          <p className="mt-3 text-sm text-blush">
            Reserve your experience at Fuego. Walk-ins welcome for bar seating.
          </p>
          <div className="mt-6">
            <AnimatedButton className="bg-ignite text-void border-ignite">
              Make a Reservation
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  )
}
