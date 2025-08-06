'use client'

import { cn } from '@/lib/utils'
import type { AnimationConfig } from './AnimationStudio'

interface AnimationControlsProps {
  config: AnimationConfig
  onConfigChange: (key: keyof AnimationConfig, value: number | string) => void
}

const easeOptions = [
  'linear',
  'easeIn',
  'easeOut',
  'easeInOut',
  'circIn',
  'circOut',
  'circInOut',
  'backIn',
  'backOut',
  'backInOut',
  'anticipate',
]

export default function AnimationControls({ config, onConfigChange }: AnimationControlsProps) {
  return (
    <div className="bg-obsidian border border-border rounded-xl h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-chalk">Animation Controls</h2>
      </div>

      {/* Controls */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Animation Type */}
        <div>
          <label className="block text-xs font-medium text-text-faint mb-2">
            Animation Type
          </label>
          <div className="flex gap-2">
            {(['tween', 'spring', 'inertia'] as const).map((type) => (
              <button
                key={type}
                onClick={() => onConfigChange('type', type)}
                className={cn(
                  'flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize',
                  config.type === type
                    ? 'bg-ignite text-white'
                    : 'bg-border/20 text-text-faint hover:bg-border/40'
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Timing Controls */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-chalk uppercase tracking-wider">Timing</h3>
          
          {/* Duration */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-text-faint">Duration</label>
              <span className="text-xs text-chalk font-mono">{config.duration}s</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={config.duration}
              onChange={(e) => onConfigChange('duration', parseFloat(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          {/* Delay */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-text-faint">Delay</label>
              <span className="text-xs text-chalk font-mono">{config.delay}s</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={config.delay}
              onChange={(e) => onConfigChange('delay', parseFloat(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          {/* Ease (only for tween) */}
          {config.type === 'tween' && (
            <div>
              <label className="block text-xs text-text-faint mb-2">Easing Function</label>
              <select
                value={config.ease}
                onChange={(e) => onConfigChange('ease', e.target.value)}
                className="w-full px-3 py-2 bg-border/20 border border-border rounded-lg text-sm text-chalk focus:outline-none focus:ring-1 focus:ring-ignite"
              >
                {easeOptions.map((ease) => (
                  <option key={ease} value={ease}>
                    {ease}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Spring Properties */}
        {config.type === 'spring' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-chalk uppercase tracking-wider">
              Spring Physics
            </h3>

            {/* Stiffness */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-text-faint">Stiffness</label>
                <span className="text-xs text-chalk font-mono">{config.stiffness}</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={config.stiffness}
                onChange={(e) => onConfigChange('stiffness', parseFloat(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>

            {/* Damping */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-text-faint">Damping</label>
                <span className="text-xs text-chalk font-mono">{config.damping}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={config.damping}
                onChange={(e) => onConfigChange('damping', parseFloat(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>

            {/* Mass */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-text-faint">Mass</label>
                <span className="text-xs text-chalk font-mono">{config.mass}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={config.mass}
                onChange={(e) => onConfigChange('mass', parseFloat(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>
          </div>
        )}

        {/* Transform Properties */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-chalk uppercase tracking-wider">
            Transform
          </h3>

          {/* X */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-text-faint">X Position</label>
              <span className="text-xs text-chalk font-mono">{config.x}px</span>
            </div>
            <input
              type="range"
              min="-200"
              max="200"
              step="10"
              value={config.x}
              onChange={(e) => onConfigChange('x', parseFloat(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          {/* Y */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-text-faint">Y Position</label>
              <span className="text-xs text-chalk font-mono">{config.y}px</span>
            </div>
            <input
              type="range"
              min="-200"
              max="200"
              step="10"
              value={config.y}
              onChange={(e) => onConfigChange('y', parseFloat(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          {/* Scale */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-text-faint">Scale</label>
              <span className="text-xs text-chalk font-mono">{config.scale}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={config.scale}
              onChange={(e) => onConfigChange('scale', parseFloat(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          {/* Rotate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-text-faint">Rotate</label>
              <span className="text-xs text-chalk font-mono">{config.rotate}°</span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              step="15"
              value={config.rotate}
              onChange={(e) => onConfigChange('rotate', parseFloat(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          {/* Opacity */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-text-faint">Opacity</label>
              <span className="text-xs text-chalk font-mono">{config.opacity}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={config.opacity}
              onChange={(e) => onConfigChange('opacity', parseFloat(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>
        </div>

        {/* Repeat */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-chalk uppercase tracking-wider">Repeat</h3>

          {/* Repeat Count */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-text-faint">Repeat Count</label>
              <span className="text-xs text-chalk font-mono">
                {config.repeat === 0 ? 'None' : config.repeat === -1 ? '∞' : config.repeat}
              </span>
            </div>
            <input
              type="range"
              min="-1"
              max="10"
              step="1"
              value={config.repeat}
              onChange={(e) => onConfigChange('repeat', parseFloat(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          {/* Repeat Type */}
          {config.repeat !== 0 && (
            <div>
              <label className="block text-xs text-text-faint mb-2">Repeat Type</label>
              <select
                value={config.repeatType}
                onChange={(e) =>
                  onConfigChange('repeatType', e.target.value as 'loop' | 'reverse' | 'mirror')
                }
                className="w-full px-3 py-2 bg-border/20 border border-border rounded-lg text-sm text-chalk focus:outline-none focus:ring-1 focus:ring-ignite"
              >
                <option value="loop">Loop</option>
                <option value="reverse">Reverse</option>
                <option value="mirror">Mirror</option>
              </select>
            </div>
          )}

          {/* Repeat Delay */}
          {config.repeat !== 0 && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-text-faint">Repeat Delay</label>
                <span className="text-xs text-chalk font-mono">{config.repeatDelay}s</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={config.repeatDelay}
                onChange={(e) => onConfigChange('repeatDelay', parseFloat(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
