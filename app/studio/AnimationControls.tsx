'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { AnimationConfig, MotionState, TransitionConfig } from './AnimationStudio'
import type { AnimationPreset } from './presets'
import { colorSchemes, hslToHex, generateRandomHexColor, type ColorScheme } from './colorSchemes'

/* ─── Props ──────────────────────────────────────────────── */

interface AnimationControlsProps {
  config: AnimationConfig
  onInitialChange: (key: keyof MotionState, value: number) => void
  onAnimateChange: (key: keyof MotionState, value: number) => void
  onTransitionChange: (key: keyof TransitionConfig, value: number | string) => void
  onApplyPreset: (preset: AnimationPreset) => void
  onReplay: () => void
  presets: AnimationPreset[]
  colorScheme: ColorScheme
  onColorSchemeChange: (scheme: ColorScheme) => void
  onRandomColors: () => void
  onCustomColorChange: (key: keyof ColorScheme, value: string) => void
}

/* ─── Ease options ───────────────────────────────────────── */

const EASES = [
  'linear', 'easeIn', 'easeOut', 'easeInOut',
  'circIn', 'circOut', 'circInOut',
  'backIn', 'backOut', 'backInOut',
  'anticipate',
]

/* ─── Tab types ──────────────────────────────────────────── */

type Tab = 'presets' | 'colors' | 'initial' | 'animate' | 'transition'

const PRESET_CATS = ['entrance', 'attention', 'exit', 'loop'] as const

/* ─── Component ──────────────────────────────────────────── */

export default function AnimationControls({
  config,
  onInitialChange,
  onAnimateChange,
  onTransitionChange,
  onApplyPreset,
  onReplay,
  presets,
  colorScheme,
  onColorSchemeChange,
  onRandomColors,
  onCustomColorChange,
}: AnimationControlsProps) {
  const [tab, setTab] = useState<Tab>('presets')
  const [presetCat, setPresetCat] = useState<string>('entrance')

  return (
    <div className="bg-obsidian border border-border rounded-xl h-full flex flex-col overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-border flex-shrink-0 overflow-x-auto">
        {(['presets', 'colors', 'initial', 'animate', 'transition'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'flex-1 py-2 md:py-3 text-xs font-medium capitalize transition-colors whitespace-nowrap px-2',
              tab === t
                ? 'text-ignite border-b-2 border-ignite bg-ignite/5'
                : 'text-text-faint hover:text-chalk'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 md:space-y-5">
        {/* ── Presets tab ── */}
        {tab === 'presets' && (
          <>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {PRESET_CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setPresetCat(c)}
                  className={cn(
                    'px-2 md:px-2.5 py-0.5 md:py-1 rounded-md text-xs font-medium capitalize transition-colors whitespace-nowrap',
                    presetCat === c
                      ? 'bg-ignite text-white'
                      : 'bg-border/20 text-text-faint hover:bg-border/40'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-1.5 md:gap-2">
              {presets
                .filter((p) => p.category === presetCat)
                .map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      onApplyPreset(preset)
                      onReplay()
                    }}
                    className="px-2 md:px-3 py-2 md:py-2.5 rounded-lg border border-border bg-border/10 text-xs font-medium text-chalk hover:bg-ignite/10 hover:border-ignite/50 hover:text-ignite transition-colors text-left leading-tight"
                  >
                    {preset.name}
                  </button>
                ))}
            </div>
          </>
        )}

        {/* ── Colors tab ── */}
        {tab === 'colors' && (
          <>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-chalk mb-2">Color Schemes</h3>
                <p className="text-xs text-text-faint mb-3">
                  Apply pre-made color themes or generate random colors
                </p>
              </div>

              {/* Preset Color Schemes */}
              <div className="grid grid-cols-2 gap-2">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.id}
                    onClick={() => onColorSchemeChange(scheme)}
                    className={cn(
                      'p-3 rounded-lg border transition-all text-left',
                      colorScheme.id === scheme.id
                        ? 'border-ignite bg-ignite/10'
                        : 'border-border bg-border/10 hover:border-border-light'
                    )}
                  >
                    <div className="text-xs font-medium text-chalk mb-2">{scheme.name}</div>
                    <div className="flex gap-1">
                      {[scheme.primary, scheme.secondary, scheme.accent].map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded border border-border-light"
                          style={{ backgroundColor: color.startsWith('hsl') ? hslToHex(color) : color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              {/* Random Colors Button */}
              <button
                onClick={onRandomColors}
                className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-ignite/50 bg-ignite/5 text-ignite hover:bg-ignite/10 transition-colors text-sm font-medium"
              >
                🎲 Generate Random Colors
              </button>

              {/* Current Scheme Preview & Customize */}
              <div className="p-3 rounded-lg bg-border/10 border border-border">
                <div className="text-xs font-medium text-text-faint mb-2">Current Scheme - Customize</div>
                <div className="text-sm font-medium text-chalk mb-3">{colorScheme.name}</div>
                <div className="space-y-2">
                  {[
                    { label: 'Primary', key: 'primary' as keyof ColorScheme, color: colorScheme.primary },
                    { label: 'Secondary', key: 'secondary' as keyof ColorScheme, color: colorScheme.secondary },
                    { label: 'Accent', key: 'accent' as keyof ColorScheme, color: colorScheme.accent },
                    { label: 'Background', key: 'background' as keyof ColorScheme, color: colorScheme.background },
                    { label: 'Text', key: 'text' as keyof ColorScheme, color: colorScheme.text },
                  ].map(({ label, key, color }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="flex-1">
                        <label className="text-xs text-text-faint mb-1 block">{label}</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={color.startsWith('hsl') ? hslToHex(color) : color}
                            onChange={(e) => onCustomColorChange(key, e.target.value)}
                            className="w-12 h-8 rounded border border-border cursor-pointer bg-transparent"
                          />
                          <input
                            type="text"
                            value={color}
                            onChange={(e) => onCustomColorChange(key, e.target.value)}
                            className="flex-1 px-2 py-1 text-xs rounded border border-border bg-obsidian text-chalk focus:outline-none focus:ring-1 focus:ring-ignite"
                            placeholder="#FF4405"
                          />
                          <button
                            onClick={() => onCustomColorChange(key, generateRandomHexColor())}
                            className="px-2 py-1 rounded border border-border bg-border/20 hover:bg-ignite/10 hover:border-ignite/50 transition-colors text-xs"
                            title="Random color"
                          >
                            🎲
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Initial state tab ── */}
        {tab === 'initial' && (
          <MotionStateControls
            label="Initial State"
            sublabel="Where the animation starts from"
            state={config.initial}
            onChange={onInitialChange}
          />
        )}

        {/* ── Animate state tab ── */}
        {tab === 'animate' && (
          <MotionStateControls
            label="Animate State"
            sublabel="Where the animation ends at"
            state={config.animate}
            onChange={onAnimateChange}
          />
        )}

        {/* ── Transition tab ── */}
        {tab === 'transition' && (
          <TransitionControls config={config.transition} onChange={onTransitionChange} />
        )}
      </div>
    </div>
  )
}

/* ─── Motion State Controls (initial / animate) ──────────── */

function MotionStateControls({
  label,
  sublabel,
  state,
  onChange,
}: {
  label: string
  sublabel: string
  state: MotionState
  onChange: (key: keyof MotionState, value: number) => void
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-semibold text-chalk">{label}</h3>
        <p className="text-xs text-text-faint mt-0.5">{sublabel}</p>
      </div>

      <Slider label="X" unit="px" min={-200} max={200} step={5} value={state.x} onChange={(v) => onChange('x', v)} />
      <Slider label="Y" unit="px" min={-200} max={200} step={5} value={state.y} onChange={(v) => onChange('y', v)} />
      <Slider label="Scale" unit="" min={0} max={3} step={0.05} value={state.scale} onChange={(v) => onChange('scale', v)} />
      <Slider label="Rotate" unit="°" min={-360} max={360} step={5} value={state.rotate} onChange={(v) => onChange('rotate', v)} />
      <Slider label="Opacity" unit="" min={0} max={1} step={0.05} value={state.opacity} onChange={(v) => onChange('opacity', v)} />
      <Slider label="Skew X" unit="°" min={-45} max={45} step={1} value={state.skewX} onChange={(v) => onChange('skewX', v)} />
      <Slider label="Skew Y" unit="°" min={-45} max={45} step={1} value={state.skewY} onChange={(v) => onChange('skewY', v)} />
    </div>
  )
}

/* ─── Transition Controls ────────────────────────────────── */

function TransitionControls({
  config,
  onChange,
}: {
  config: TransitionConfig
  onChange: (key: keyof TransitionConfig, value: number | string) => void
}) {
  return (
    <div className="space-y-5">
      {/* Type */}
      <div>
        <label className="block text-xs font-medium text-text-faint mb-2">Type</label>
        <div className="flex gap-2">
          {(['tween', 'spring'] as const).map((t) => (
            <button
              key={t}
              onClick={() => onChange('type', t)}
              className={cn(
                'flex-1 px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors',
                config.type === t
                  ? 'bg-ignite text-white'
                  : 'bg-border/20 text-text-faint hover:bg-border/40'
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <Slider label="Duration" unit="s" min={0} max={5} step={0.1} value={config.duration} onChange={(v) => onChange('duration', v)} />
      <Slider label="Delay" unit="s" min={0} max={3} step={0.1} value={config.delay} onChange={(v) => onChange('delay', v)} />

      {/* Ease (tween only) */}
      {config.type === 'tween' && (
        <div>
          <label className="block text-xs text-text-faint mb-2">Easing</label>
          <select
            value={config.ease}
            onChange={(e) => onChange('ease', e.target.value)}
            className="w-full px-3 py-2 bg-border/20 border border-border rounded-lg text-sm text-chalk focus:outline-none focus:ring-1 focus:ring-ignite"
          >
            {EASES.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
      )}

      {/* Spring properties */}
      {config.type === 'spring' && (
        <>
          <Slider label="Stiffness" unit="" min={10} max={500} step={10} value={config.stiffness} onChange={(v) => onChange('stiffness', v)} />
          <Slider label="Damping" unit="" min={1} max={50} step={1} value={config.damping} onChange={(v) => onChange('damping', v)} />
          <Slider label="Mass" unit="" min={0.1} max={5} step={0.1} value={config.mass} onChange={(v) => onChange('mass', v)} />
        </>
      )}

      {/* Repeat */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs text-text-faint">Repeat</label>
          <span className="text-xs text-chalk font-mono">
            {config.repeat === -1 ? '∞' : config.repeat === 0 ? 'None' : config.repeat}
          </span>
        </div>
        <input
          type="range"
          min={-1}
          max={10}
          step={1}
          value={config.repeat}
          onChange={(e) => onChange('repeat', parseInt(e.target.value))}
          className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
        />
      </div>

      {config.repeat !== 0 && (
        <>
          <div>
            <label className="block text-xs text-text-faint mb-2">Repeat Type</label>
            <div className="flex gap-2">
              {(['loop', 'reverse', 'mirror'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => onChange('repeatType', t)}
                  className={cn(
                    'flex-1 px-2 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors',
                    config.repeatType === t
                      ? 'bg-ignite text-white'
                      : 'bg-border/20 text-text-faint hover:bg-border/40'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <Slider label="Repeat Delay" unit="s" min={0} max={2} step={0.1} value={config.repeatDelay} onChange={(v) => onChange('repeatDelay', v)} />
        </>
      )}
    </div>
  )
}

/* ─── Reusable Slider ────────────────────────────────────── */

function Slider({
  label,
  unit,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string
  unit: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs text-text-faint">{label}</label>
        <span className="text-xs text-chalk font-mono">
          {Number.isInteger(value) ? value : value.toFixed(2)}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider-thumb"
      />
    </div>
  )
}
