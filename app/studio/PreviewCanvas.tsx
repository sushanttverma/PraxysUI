'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { AnimationConfig } from './AnimationStudio'
import { componentRegistry } from '@/lib/registry'

interface PreviewCanvasProps {
  selectedComponent: string | null
  config: AnimationConfig
  playKey: number
}

export default function PreviewCanvas({
  selectedComponent,
  config,
  playKey,
}: PreviewCanvasProps) {
  const componentEntry = selectedComponent ? componentRegistry[selectedComponent] : null

  /* ── Build framer-motion props ── */
  const initial = { ...config.initial }
  const animate = { ...config.animate }

  const transition: Record<string, unknown> = {
    duration: config.transition.duration,
    delay: config.transition.delay,
  }

  if (config.transition.type === 'spring') {
    transition.type = 'spring'
    transition.stiffness = config.transition.stiffness
    transition.damping = config.transition.damping
    transition.mass = config.transition.mass
  } else {
    transition.ease = config.transition.ease
  }

  if (config.transition.repeat !== 0) {
    transition.repeat = config.transition.repeat === -1 ? Infinity : config.transition.repeat
    transition.repeatType = config.transition.repeatType
    transition.repeatDelay = config.transition.repeatDelay
  }

  return (
    <div className="bg-obsidian border border-border rounded-xl h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="text-sm font-semibold text-chalk">Preview</h2>
          {componentEntry && (
            <p className="text-xs text-text-faint mt-0.5">{componentEntry.title}</p>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-text-faint">
          <span>{config.transition.type === 'spring' ? 'Spring' : config.transition.ease}</span>
          <span>{config.transition.duration}s</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {selectedComponent ? (
          <div className="relative z-10 rounded-xl border border-border bg-obsidian shadow-lg shadow-black/20 overflow-hidden">
            <div className="p-8">
              <motion.div
                key={playKey}
                initial={initial}
                animate={animate}
                transition={transition}
              >
                <ComponentPreview
                  category={componentEntry?.category || ''}
                  title={componentEntry?.title || ''}
                />
              </motion.div>
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border bg-border/5 flex-shrink-0">
        <div className="flex items-center justify-between text-xs text-text-faint">
          <span>
            initial → animate &nbsp;·&nbsp;{' '}
            <span className="text-chalk capitalize">{config.transition.type}</span>
          </span>
          <span>
            {config.transition.repeat === -1
              ? '∞ Loop'
              : config.transition.repeat > 0
                ? `${config.transition.repeat}× repeat`
                : 'Once'}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Category-specific preview elements ─── */

function ComponentPreview({ category, title }: { category: string; title: string }) {
  switch (category) {
    case 'buttons':
      return (
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-ignite to-blush text-white font-semibold shadow-lg text-sm whitespace-nowrap">
          {title}
        </button>
      )
    case 'cards':
      return (
        <div className="w-56">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ignite/20 to-blush/20 border border-ignite/30 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-chalk">{title}</p>
              <p className="text-xs text-text-faint">Card component</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded bg-border/40" />
            <div className="h-2 w-3/4 rounded bg-border/40" />
          </div>
        </div>
      )
    case 'text':
      return (
        <h2 className="text-3xl font-bold bg-gradient-to-r from-ignite via-blush to-ignite bg-clip-text text-transparent whitespace-nowrap">
          {title}
        </h2>
      )
    case 'navigation':
      return (
        <nav className="flex items-center gap-4">
          {['Home', 'About', 'Studio', 'Docs'].map((t) => (
            <span
              key={t}
              className={cn(
                'text-sm font-medium',
                t === 'Studio'
                  ? 'text-ignite border-b-2 border-ignite pb-0.5'
                  : 'text-chalk'
              )}
            >
              {t}
            </span>
          ))}
        </nav>
      )
    case 'visual':
      return (
        <div className="relative w-48 h-24 rounded-lg bg-gradient-to-br from-ignite/10 via-blush/5 to-ignite/10 overflow-hidden flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-ignite to-blush opacity-40 blur-xl" />
          <p className="relative text-xs text-chalk font-medium">{title}</p>
        </div>
      )
    default:
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ignite/20 to-blush/20 border border-ignite/30" />
          <div>
            <p className="text-sm font-bold text-chalk">{title}</p>
            <p className="text-xs text-text-faint capitalize">{category}</p>
          </div>
        </div>
      )
  }
}

function EmptyState() {
  return (
    <div className="text-center relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-border/20 border-2 border-dashed border-border mx-auto mb-4 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-text-faint">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      </div>
      <p className="text-text-faint text-sm font-medium">Select a component</p>
      <p className="text-text-faint text-xs mt-1">Then pick a preset or customise the animation</p>
    </div>
  )
}
