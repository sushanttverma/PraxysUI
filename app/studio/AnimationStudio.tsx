'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getAllComponents } from '@/lib/registry'
import ComponentSelector from './ComponentSelector'
import AnimationControls from './AnimationControls'
import PreviewCanvas from './PreviewCanvas'
import CodeGenerator from './CodeGenerator'
import { presets, type AnimationPreset } from './presets'

/* ─── Types ──────────────────────────────────────────────── */

export interface MotionState {
  x: number
  y: number
  scale: number
  rotate: number
  opacity: number
  skewX: number
  skewY: number
}

export interface TransitionConfig {
  type: 'tween' | 'spring'
  duration: number
  delay: number
  ease: string
  // spring
  stiffness: number
  damping: number
  mass: number
  // repeat
  repeat: number
  repeatType: 'loop' | 'reverse' | 'mirror'
  repeatDelay: number
}

export interface AnimationConfig {
  initial: MotionState
  animate: MotionState
  transition: TransitionConfig
}

/* ─── Defaults ───────────────────────────────────────────── */

export const defaultInitial: MotionState = {
  x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, skewX: 0, skewY: 0,
}

export const defaultAnimate: MotionState = {
  x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, skewX: 0, skewY: 0,
}

export const defaultTransition: TransitionConfig = {
  type: 'tween',
  duration: 0.5,
  delay: 0,
  ease: 'easeInOut',
  stiffness: 100,
  damping: 10,
  mass: 1,
  repeat: 0,
  repeatType: 'loop',
  repeatDelay: 0,
}

export const defaultConfig: AnimationConfig = {
  initial: { ...defaultInitial },
  animate: { ...defaultAnimate },
  transition: { ...defaultTransition },
}

/* ─── Component ──────────────────────────────────────────── */

export default function AnimationStudio() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [config, setConfig] = useState<AnimationConfig>(defaultConfig)
  const [showCode, setShowCode] = useState(false)
  const [playKey, setPlayKey] = useState(0)

  const components = useMemo(() => getAllComponents(), [])

  /* ── Handlers ─────── */

  const replay = useCallback(() => {
    setPlayKey((k) => k + 1)
  }, [])

  const applyPreset = useCallback((preset: AnimationPreset) => {
    setConfig({
      initial: { ...defaultInitial, ...preset.initial },
      animate: { ...defaultAnimate, ...preset.animate },
      transition: { ...defaultTransition, ...preset.transition },
    })
    setTimeout(replay, 50)
  }, [replay])

  const handleReset = useCallback(() => {
    setConfig(defaultConfig)
    replay()
  }, [replay])

  const handleInitialChange = useCallback(
    (key: keyof MotionState, value: number) => {
      setConfig((prev) => ({
        ...prev,
        initial: { ...prev.initial, [key]: value },
      }))
    },
    []
  )

  const handleAnimateChange = useCallback(
    (key: keyof MotionState, value: number) => {
      setConfig((prev) => ({
        ...prev,
        animate: { ...prev.animate, [key]: value },
      }))
    },
    []
  )

  const handleTransitionChange = useCallback(
    (key: keyof TransitionConfig, value: number | string) => {
      setConfig((prev) => ({
        ...prev,
        transition: { ...prev.transition, [key]: value },
      }))
    },
    []
  )

  const handleComponentSelect = useCallback(
    (slug: string) => {
      setSelectedComponent(slug)
      setTimeout(replay, 50)
    },
    [replay]
  )

  /* ── Render ─────── */

  return (
    <div className="h-screen bg-obsidian flex flex-col overflow-hidden">
      {/* ── Header ── */}
      <header className="border-b border-border bg-obsidian/95 backdrop-blur-sm flex-shrink-0">
        <div className="mx-auto max-w-[1800px] px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
              <Link
                href="/"
                className="p-1.5 md:p-2 rounded-lg border border-border bg-obsidian text-text-faint hover:text-chalk hover:bg-border/20 transition-colors flex-shrink-0"
                aria-label="Back to home"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </Link>
              <div className="min-w-0">
                <h1 className="text-lg md:text-2xl font-bold text-chalk truncate">Animation Studio</h1>
                <p className="text-xs md:text-sm text-text-faint mt-0.5 md:mt-1 hidden sm:block">
                  Customize animations with real-time preview
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <button
                onClick={handleReset}
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-border bg-obsidian text-chalk text-xs md:text-sm font-medium hover:bg-border/20 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={replay}
                disabled={!selectedComponent}
                className={cn(
                  'px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors',
                  selectedComponent
                    ? 'bg-ignite text-white hover:bg-ignite/90'
                    : 'bg-border/20 text-text-faint cursor-not-allowed'
                )}
              >
                Replay
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-[1800px] h-full px-4 md:px-6 py-4 md:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:h-full">
            {/* Component Selector */}
            <div className="col-span-1 lg:col-span-2 lg:h-full min-h-0">
              <ComponentSelector
                components={components}
                selectedComponent={selectedComponent}
                onSelectComponent={handleComponentSelect}
              />
            </div>

            {/* Preview Canvas */}
            <div className="col-span-1 lg:col-span-6 lg:h-full min-h-[300px] md:min-h-[400px]">
              <PreviewCanvas
                selectedComponent={selectedComponent}
                config={config}
                playKey={playKey}
              />
            </div>

            {/* Controls */}
            <div className="col-span-1 lg:col-span-4 lg:h-full min-h-[400px]">
              <div className="flex flex-col gap-3 md:gap-4 h-full">
                <AnimationControls
                  config={config}
                  onInitialChange={handleInitialChange}
                  onAnimateChange={handleAnimateChange}
                  onTransitionChange={handleTransitionChange}
                  onApplyPreset={applyPreset}
                  onReplay={replay}
                  presets={presets}
                />

                {/* Get Code */}
                <button
                  onClick={() => setShowCode(!showCode)}
                  disabled={!selectedComponent}
                  className={cn(
                    'px-4 py-2.5 md:py-3 rounded-lg text-sm font-medium transition-colors border flex-shrink-0',
                    selectedComponent
                      ? 'border-ignite bg-ignite/10 text-ignite hover:bg-ignite/20'
                      : 'border-border bg-border/10 text-text-faint cursor-not-allowed'
                  )}
                >
                  {showCode ? 'Hide Code' : 'Get Code'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Code Generator Modal ── */}
      <AnimatePresence>
        {showCode && selectedComponent && (
          <CodeGenerator
            component={selectedComponent}
            config={config}
            onClose={() => setShowCode(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
