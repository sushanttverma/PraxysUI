'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { AnimationConfig } from './AnimationStudio'
import { componentRegistry } from '@/lib/registry'

interface PreviewCanvasProps {
  selectedComponent: string | null
  config: AnimationConfig
  isPlaying: boolean
}

interface MotionProps {
  x?: number
  y?: number
  scale?: number
  rotate?: number
  opacity?: number
}

interface TransitionProps {
  duration: number
  delay: number
  repeat: number | typeof Infinity
  repeatType: 'loop' | 'reverse' | 'mirror'
  repeatDelay: number
  ease?: string
  type?: string
  stiffness?: number
  damping?: number
  mass?: number
}

export default function PreviewCanvas({
  selectedComponent,
  config,
  isPlaying,
}: PreviewCanvasProps) {
  const [animationKey, setAnimationKey] = useState(0)
  const [prevIsPlaying, setPrevIsPlaying] = useState(false)

  // Derived state pattern - update key when isPlaying changes to true
  if (isPlaying !== prevIsPlaying) {
    setPrevIsPlaying(isPlaying)
    if (isPlaying) {
      setAnimationKey(k => k + 1)
    }
  }

  // Build animation props
  const animateProps: MotionProps = {
    x: config.x,
    y: config.y,
    scale: config.scale,
    rotate: config.rotate,
    opacity: config.opacity,
  }

  const transitionProps: TransitionProps = {
    duration: config.duration,
    delay: config.delay,
    repeat: config.repeat === -1 ? Infinity : config.repeat,
    repeatType: config.repeatType,
    repeatDelay: config.repeatDelay,
  }

  if (config.type === 'tween') {
    transitionProps.ease = config.ease
  } else if (config.type === 'spring') {
    transitionProps.type = 'spring'
    transitionProps.stiffness = config.stiffness
    transitionProps.damping = config.damping
    transitionProps.mass = config.mass
  } else if (config.type === 'inertia') {
    transitionProps.type = 'inertia'
  }

  const componentEntry = selectedComponent ? componentRegistry[selectedComponent] : null

  return (
    <div className="bg-obsidian border border-border rounded-xl h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-chalk">Preview Canvas</h2>
          {componentEntry && (
            <p className="text-xs text-text-faint mt-1">{componentEntry.title}</p>
          )}
        </div>
        {isPlaying && (
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-ignite/10 border border-ignite text-ignite text-xs font-medium">
            <span className="w-2 h-2 bg-ignite rounded-full animate-pulse" />
            Playing
          </span>
        )}
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-border/5 to-transparent relative overflow-hidden">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Component Preview */}
        {selectedComponent ? (
          <div className="relative z-10">
            <div className={cn(
              'rounded-xl border border-border bg-obsidian overflow-hidden',
              'shadow-lg shadow-black/20'
            )}>
              {/* Component-specific preview with animations */}
              {componentEntry?.category === 'buttons' && (
                <div className="px-8 py-6">
                  <motion.button
                    key={animationKey}
                    initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                    animate={isPlaying ? animateProps : undefined}
                    transition={transitionProps}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-ignite to-blush text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {componentEntry.title}
                  </motion.button>
                </div>
              )}
              
              {componentEntry?.category === 'cards' && (
                <motion.div
                  key={animationKey}
                  initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                  animate={isPlaying ? animateProps : undefined}
                  transition={transitionProps}
                  className="p-6 max-w-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-ignite/20 to-blush/20 border border-ignite/30" />
                    <div>
                      <h3 className="text-base font-bold text-chalk">{componentEntry.title}</h3>
                      <p className="text-xs text-text-faint">Interactive card</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-faint">
                    {componentEntry.description.split('.')[0]}.
                  </p>
                </motion.div>
              )}
              
              {componentEntry?.category === 'text' && (
                <div className="px-8 py-6 text-center">
                  <motion.h2
                    key={animationKey}
                    initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                    animate={isPlaying ? animateProps : undefined}
                    transition={transitionProps}
                    className="text-3xl font-bold bg-gradient-to-r from-ignite via-blush to-ignite bg-clip-text text-transparent"
                  >
                    {componentEntry.title}
                  </motion.h2>
                  <p className="text-sm text-text-faint mt-2">Animated typography</p>
                </div>
              )}
              
              {componentEntry?.category === 'navigation' && (
                <div className="px-8 py-6">
                  <motion.nav
                    key={animationKey}
                    initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                    animate={isPlaying ? animateProps : undefined}
                    transition={transitionProps}
                    className="flex items-center gap-4"
                  >
                    <a className="text-sm text-chalk hover:text-ignite transition-colors font-medium">Home</a>
                    <a className="text-sm text-chalk hover:text-ignite transition-colors font-medium">About</a>
                    <a className="text-sm text-ignite font-medium border-b-2 border-ignite">Studio</a>
                    <a className="text-sm text-chalk hover:text-ignite transition-colors font-medium">Docs</a>
                  </motion.nav>
                </div>
              )}
              
              {componentEntry?.category === 'visual' && (
                <div className="p-6">
                  <motion.div
                    key={animationKey}
                    initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                    animate={isPlaying ? animateProps : undefined}
                    transition={transitionProps}
                    className="relative w-full h-32 rounded-lg bg-gradient-to-br from-ignite/10 via-blush/5 to-ignite/10 overflow-hidden"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ignite to-blush opacity-50 blur-xl" />
                    </div>
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <p className="text-xs text-chalk font-medium">{componentEntry.title}</p>
                    </div>
                  </motion.div>
                </div>
              )}
              
              {/* Default fallback */}
              {!['buttons', 'cards', 'text', 'navigation', 'visual'].includes(componentEntry?.category || '') && (
                <motion.div
                  key={animationKey}
                  initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                  animate={isPlaying ? animateProps : undefined}
                  transition={transitionProps}
                  className="px-8 py-6 text-center"
                >
                  <h3 className="text-lg font-bold text-chalk mb-2">
                    {componentEntry?.title}
                  </h3>
                  <p className="text-sm text-text-faint max-w-xs mx-auto mb-4">
                    {componentEntry?.description.split('.')[0]}.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-ignite/20 to-blush/20 border border-ignite/30" />
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blush/20 to-ignite/20 border border-blush/30" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-border/20 border-2 border-dashed border-border mx-auto mb-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-text-faint"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
            </div>
            <p className="text-text-faint text-sm">Select a component to begin</p>
            <p className="text-text-faint text-xs mt-1">
              Choose from the sidebar to see the animation preview
            </p>
          </div>
        )}
      </div>

      {/* Footer - Animation Info */}
      {selectedComponent && (
        <div className="p-3 border-t border-border bg-border/5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4 text-text-faint">
              <span>Type: <span className="text-chalk capitalize">{config.type}</span></span>
              <span>Duration: <span className="text-chalk">{config.duration}s</span></span>
              {config.type === 'tween' && (
                <span>Ease: <span className="text-chalk">{config.ease}</span></span>
              )}
            </div>
            <div className="text-text-faint">
              {config.repeat === -1 ? '∞ Loop' : config.repeat > 0 ? `${config.repeat}x` : 'No repeat'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
