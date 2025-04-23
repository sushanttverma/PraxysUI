'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedHeroProps {
  title: string
  subtitle?: string
  badge?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  title,
  subtitle,
  badge,
  primaryCta,
  secondaryCta,
  className = '',
}) => {
  return (
    <section
      className={cn(
        'relative flex min-h-[480px] flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-obsidian px-6 py-20 text-center',
        className
      )}
    >
      {/* Animated background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-ignite) 1px, transparent 1px), linear-gradient(90deg, var(--color-ignite) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Radial glow */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--color-ignite) 0%, transparent 70%)',
          opacity: 0.08,
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center rounded-full border border-ignite/20 bg-ignite/5 px-4 py-1.5"
        >
          <span className="text-xs font-medium tracking-wide text-ignite">
            {badge}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 max-w-3xl font-pixel text-4xl font-bold leading-tight text-chalk sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h1>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative z-10 mt-6 max-w-xl text-base leading-relaxed text-blush sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}

      {/* CTAs */}
      {(primaryCta || secondaryCta) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {primaryCta && (
            <a
              href={primaryCta.href}
              className="rounded-lg bg-ignite px-6 py-2.5 text-sm font-semibold text-void transition-colors hover:bg-ignite/90"
            >
              {primaryCta.label}
            </a>
          )}
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-chalk transition-colors hover:border-border-light hover:text-ignite"
            >
              {secondaryCta.label}
            </a>
          )}
        </motion.div>
      )}

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-obsidian to-transparent" />
    </section>
  )
}

export default AnimatedHero
