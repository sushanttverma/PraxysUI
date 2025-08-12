'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getAllComponents } from '@/lib/registry'
import ComponentSelector from './ComponentSelector'
import AnimationControls from './AnimationControls'
import PreviewCanvas from './PreviewCanvas'
import CodeGenerator from './CodeGenerator'

export interface AnimationConfig {
  duration: number
  delay: number
  ease: string
  type: 'tween' | 'spring' | 'inertia'
  // Spring properties
  stiffness: number
  damping: number
  mass: number
  // Transform properties
  x: number
  y: number
  scale: number
  rotate: number
  opacity: number
  // Advanced
  repeat: number
  repeatType: 'loop' | 'reverse' | 'mirror'
  repeatDelay: number
}

const defaultConfig: AnimationConfig = {
  duration: 0.5,
  delay: 0,
  ease: 'easeInOut',
  type: 'tween',
  stiffness: 100,
  damping: 10,
  mass: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  opacity: 1,
  repeat: 0,
  repeatType: 'loop',
  repeatDelay: 0,
}

export default function AnimationStudio() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [config, setConfig] = useState<AnimationConfig>(defaultConfig)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)

  const components = useMemo(() => getAllComponents(), [])

  const handleConfigChange = (key: keyof AnimationConfig, value: number | string) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
    // Auto-play when config changes if autoPlay is enabled
    if (autoPlay && selectedComponent) {
      setIsPlaying(true)
      const duration = key === 'duration' ? (value as number) : config.duration
      const delay = key === 'delay' ? (value as number) : config.delay
      setTimeout(() => setIsPlaying(false), (duration + delay) * 1000 + 100)
    }
  }

  const handleReset = () => {
    setConfig(defaultConfig)
    setIsPlaying(false)
  }

  const handlePlay = () => {
    setIsPlaying(true)
    const totalDuration = (config.duration + config.delay) * 1000
    // If repeat is set, don't auto-stop
    if (config.repeat === 0) {
      setTimeout(() => setIsPlaying(false), totalDuration + 100)
    }
  }

  const handleComponentSelect = (slug: string) => {
    setSelectedComponent(slug)
    if (autoPlay) {
      // Trigger animation when component changes
      setTimeout(() => {
        setIsPlaying(true)
        setTimeout(() => setIsPlaying(false), (config.duration + config.delay) * 1000 + 100)
      }, 100)
    }
  }

  return (
    <div className="h-screen bg-obsidian flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-obsidian/95 backdrop-blur-sm flex-shrink-0">
        <div className="mx-auto max-w-[1800px] px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-chalk">Animation Studio</h1>
              <p className="text-sm text-text-faint mt-1">
                Customize animations with real-time preview and code generation
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-text-faint cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoPlay}
                  onChange={(e) => setAutoPlay(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-border/20 text-ignite focus:ring-ignite focus:ring-2"
                />
                Auto-play
              </label>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg border border-border bg-obsidian text-chalk text-sm font-medium hover:bg-border/20 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handlePlay}
                disabled={!selectedComponent}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedComponent
                    ? 'bg-ignite text-white hover:bg-ignite/90'
                    : 'bg-border/20 text-text-faint cursor-not-allowed'
                )}
              >
                Play Animation
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-[1800px] h-full px-6 py-6">
          <div className="grid grid-cols-12 gap-6 lg:h-full">
            {/* Left Sidebar - Component Selector */}
            <div className="col-span-12 lg:col-span-3 lg:h-full min-h-[400px]">
            <ComponentSelector
              components={components}
              selectedComponent={selectedComponent}
              onSelectComponent={handleComponentSelect}
            />
            </div>

            {/* Center - Preview Canvas */}
            <div className="col-span-12 lg:col-span-6 lg:h-full min-h-[500px]">
              <PreviewCanvas
                selectedComponent={selectedComponent}
                config={config}
                isPlaying={isPlaying}
              />
            </div>

            {/* Right Sidebar - Animation Controls */}
            <div className="col-span-12 lg:col-span-3 lg:h-full min-h-[400px]">
              <div className="flex flex-col gap-4 h-full">
                <AnimationControls config={config} onConfigChange={handleConfigChange} />
                
                {/* Code Generator Toggle */}
                <button
                  onClick={() => setShowCode(!showCode)}
                  disabled={!selectedComponent}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors border flex-shrink-0',
                    selectedComponent
                      ? 'border-ignite bg-ignite/10 text-ignite hover:bg-ignite/20'
                      : 'border-border bg-border/10 text-text-faint cursor-not-allowed'
                  )}
                >
                  {showCode ? 'Hide Code' : 'Show Code'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Generator Modal */}
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
