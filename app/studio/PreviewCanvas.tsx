'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { AnimationConfig } from './AnimationStudio'
import { componentRegistry } from '@/lib/registry'
import type { ColorScheme } from './colorSchemes'

interface PreviewCanvasProps {
  selectedComponent: string | null
  config: AnimationConfig
  playKey: number
  colorScheme: ColorScheme
}

export default function PreviewCanvas({
  selectedComponent,
  config,
  playKey,
  colorScheme,
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
      <div className="p-3 md:p-4 border-b border-border flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="text-xs md:text-sm font-semibold text-chalk">Preview</h2>
          {componentEntry && (
            <p className="text-xs text-text-faint mt-0.5 hidden md:block">{componentEntry.title}</p>
          )}
        </div>
        <div className="flex items-center gap-2 md:gap-3 text-xs text-text-faint">
          <span className="hidden sm:inline">{config.transition.type === 'spring' ? 'Spring' : config.transition.ease}</span>
          <span>{config.transition.duration}s</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
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
          <div className="relative z-10 rounded-xl border border-border bg-obsidian shadow-lg shadow-black/20 overflow-hidden max-w-full">
            <div className="p-4 md:p-8">
              <motion.div
                key={playKey}
                initial={initial}
                animate={animate}
                transition={transition}
              >
                <ComponentPreview
                  category={componentEntry?.category || ''}
                  title={componentEntry?.title || ''}
                  colorScheme={colorScheme}
                />
              </motion.div>
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Footer */}
      <div className="p-2 md:p-3 border-t border-border bg-border/5 flex-shrink-0">
        <div className="flex items-center justify-between text-xs text-text-faint">
          <span className="hidden sm:inline">
            initial → animate &nbsp;·&nbsp;{' '}
            <span className="text-chalk capitalize">{config.transition.type}</span>
          </span>
          <span className="sm:hidden text-chalk capitalize">{config.transition.type}</span>
          <span>
            {config.transition.repeat === -1
              ? '∞'
              : config.transition.repeat > 0
                ? `${config.transition.repeat}×`
                : 'Once'}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Category-specific preview elements ─── */

function ComponentPreview({ category, title, colorScheme }: { category: string; title: string; colorScheme: ColorScheme }) {
  const primaryColor = colorScheme.primary
  const secondaryColor = colorScheme.secondary
  const accentColor = colorScheme.accent
  const textColor = colorScheme.text
  
  switch (category) {
    case 'buttons':
      return (
        <button 
          className="px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold shadow-lg text-xs md:text-sm whitespace-nowrap"
          style={{ 
            backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
            color: textColor 
          }}
        >
          {title}
        </button>
      )
    case 'cards':
      return (
        <div className="w-48 md:w-56">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div 
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex-shrink-0" 
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${primaryColor}33, ${secondaryColor}33)`,
                borderColor: `${primaryColor}66`,
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            />
            <div>
              <p className="text-xs md:text-sm font-bold leading-tight" style={{ color: textColor }}>{title}</p>
              <p className="text-xs opacity-60" style={{ color: textColor }}>Card</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded" style={{ backgroundColor: `${primaryColor}33` }} />
            <div className="h-2 w-3/4 rounded" style={{ backgroundColor: `${primaryColor}33` }} />
          </div>
        </div>
      )
    case 'text':
      return (
        <h2 
          className="text-xl md:text-3xl font-bold whitespace-nowrap"
          style={{
            backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor}, ${accentColor})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          {title}
        </h2>
      )
    case 'navigation':
      return (
        <nav className="flex items-center gap-2 md:gap-4">
          {['Home', 'About', 'Studio', 'Docs'].map((t) => (
            <span
              key={t}
              className={cn('text-xs md:text-sm font-medium', t === 'Studio' && 'border-b-2 pb-0.5')}
              style={{
                color: t === 'Studio' ? primaryColor : textColor,
                borderColor: t === 'Studio' ? primaryColor : 'transparent'
              }}
            >
              {t}
            </span>
          ))}
        </nav>
      )
    case 'visual':
      return (
        <div className="relative w-40 md:w-48 h-20 md:h-24 rounded-lg overflow-hidden flex items-center justify-center"
          style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}1A, ${secondaryColor}0D, ${accentColor}1A)` }}
        >
          <div className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full opacity-40 blur-xl"
            style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
          />
          <p className="relative text-xs font-medium" style={{ color: textColor }}>{title}</p>
        </div>
      )
    default:
      return (
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex-shrink-0"
            style={{ 
              backgroundImage: `linear-gradient(135deg, ${primaryColor}33, ${secondaryColor}33)`,
              borderColor: `${primaryColor}66`,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          />
          <div>
            <p className="text-xs md:text-sm font-bold" style={{ color: textColor }}>{title}</p>
            <p className="text-xs capitalize opacity-60" style={{ color: textColor }}>{category}</p>
          </div>
        </div>
      )
  }
}

function EmptyState() {
  return (
    <div className="text-center relative z-10 px-4">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-border/20 border-2 border-dashed border-border mx-auto mb-3 md:mb-4 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-text-faint">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      </div>
      <p className="text-text-faint text-xs md:text-sm font-medium">Select a component</p>
      <p className="text-text-faint text-xs mt-1 hidden md:block">Then pick a preset or customise the animation</p>
    </div>
  )
}
