import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "color-picker",
title: "Color Picker",
description:
  "A comprehensive color picker with HSL sliders, preset swatches, hex/RGB/HSL format toggling, and copy-to-clipboard functionality. Features animated popover and real-time color preview.",
category: "buttons",
dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"],
code: `'use client'

import React, { useState, useRef, useEffect, useCallback, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ColorPickerProps {
  value?: string // hex color like "#ff0000"
  onChange?: (color: string) => void
  label?: string
  disabled?: boolean
  showAlpha?: boolean
  presets?: string[] // array of hex colors
  className?: string
}

interface HSL {
  h: number // 0-360
  s: number // 0-100
  l: number // 0-100
}

interface RGB {
  r: number // 0-255
  g: number // 0-255
  b: number // 0-255
}

type ColorFormat = 'HEX' | 'RGB' | 'HSL'

// Default preset colors
const DEFAULT_PRESETS = [
  '#E84E2D', // ignite
  '#FF6B9D', // blush
  '#8B5CF6', // purple
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#EC4899', // pink
  '#6366F1', // indigo
  '#14B8A6', // teal
  '#F97316', // orange
  '#A855F7', // violet
]

// Color conversion utilities
function hexToRgb(hex: string): RGB {
  const sanitized = hex.replace('#', '')
  const bigint = parseInt(sanitized, 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  }
}

function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / delta + 2) / 6
        break
      case b:
        h = ((r - g) / delta + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360
  const s = hsl.s / 100
  const l = hsl.l / 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return \`#\${toHex(rgb.r)}\${toHex(rgb.g)}\${toHex(rgb.b)}\`
}

function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex))
}

function hslToHex(hsl: HSL): string {
  return rgbToHex(hslToRgb(hsl))
}

function isValidHex(hex: string): boolean {
  return /^#?[0-9A-Fa-f]{6}$/.test(hex)
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  value = '#E84E2D',
  onChange,
  label,
  disabled = false,
  showAlpha = false,
  presets = DEFAULT_PRESETS,
  className,
}) => {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [hsl, setHsl] = useState<HSL>(() => hexToHsl(value))
  const [alpha, setAlpha] = useState(100)
  const [hexInput, setHexInput] = useState(value.toUpperCase())
  const [format, setFormat] = useState<ColorFormat>('HEX')
  const [copied, setCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const copiedTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [prevValue, setPrevValue] = useState(value)

  // Sync external value changes (React-recommended derived state pattern)
  if (value !== prevValue && value && isValidHex(value)) {
    setPrevValue(value)
    setHsl(hexToHsl(value))
    setHexInput(value.toUpperCase())
  }

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Clear copied timeout on unmount
  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current)
      }
    }
  }, [])

  const currentHex = hslToHex(hsl)
  const currentRgb = hslToRgb(hsl)

  const updateColor = useCallback(
    (newHsl: HSL) => {
      setHsl(newHsl)
      const hex = hslToHex(newHsl)
      setHexInput(hex.toUpperCase())
      onChange?.(hex)
    },
    [onChange]
  )

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateColor({ ...hsl, h: Number(e.target.value) })
  }

  const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateColor({ ...hsl, s: Number(e.target.value) })
  }

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateColor({ ...hsl, l: Number(e.target.value) })
  }

  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlpha(Number(e.target.value))
  }

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setHexInput(input)

    // Validate and update color
    if (isValidHex(input)) {
      const normalized = input.startsWith('#') ? input : \`#\${input}\`
      const newHsl = hexToHsl(normalized)
      setHsl(newHsl)
      onChange?.(normalized)
    }
  }

  const handlePresetClick = (preset: string) => {
    const newHsl = hexToHsl(preset)
    updateColor(newHsl)
  }

  const handleCopy = async () => {
    let textToCopy = ''
    switch (format) {
      case 'HEX':
        textToCopy = currentHex
        break
      case 'RGB':
        textToCopy = \`rgb(\${currentRgb.r}, \${currentRgb.g}, \${currentRgb.b})\`
        break
      case 'HSL':
        textToCopy = \`hsl(\${hsl.h}, \${hsl.s}%, \${hsl.l}%)\`
        break
    }

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current)
      }
      copiedTimeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const toggleFormat = () => {
    const formats: ColorFormat[] = ['HEX', 'RGB', 'HSL']
    const currentIndex = formats.indexOf(format)
    setFormat(formats[(currentIndex + 1) % formats.length])
  }

  const getFormattedValue = () => {
    switch (format) {
      case 'HEX':
        return currentHex
      case 'RGB':
        return \`\${currentRgb.r}, \${currentRgb.g}, \${currentRgb.b}\`
      case 'HSL':
        return \`\${hsl.h}°, \${hsl.s}%, \${hsl.l}%\`
    }
  }

  return (
    <div ref={containerRef} className={cn('relative w-fit', className)}>
      {/* Label */}
      {label && (
        <label htmlFor={\`\${id}-trigger\`} className="block text-sm text-chalk mb-2">
          {label}
        </label>
      )}

      {/* Trigger button */}
      <button
        id={\`\${id}-trigger\`}
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        aria-label="Choose color"
        aria-expanded={open}
        className={cn(
          'relative h-12 w-12 rounded-lg border-2 overflow-hidden transition-all cursor-pointer',
          'focus-visible:outline-none',
          open ? 'border-ignite ring-2 ring-ignite/20' : 'border-border hover:border-border-light',
          disabled && 'opacity-40 pointer-events-none'
        )}
        style={{ backgroundColor: currentHex }}
      >
        {/* Checkerboard pattern for transparency preview */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              'linear-gradient(45deg, #18181b 25%, transparent 25%), linear-gradient(-45deg, #18181b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #18181b 75%), linear-gradient(-45deg, transparent 75%, #18181b 75%)',
            backgroundSize: '8px 8px',
            backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
          }}
        />
      </button>

      {/* Popover panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Choose color"
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="absolute z-50 mt-2 w-72 rounded-xl border border-border bg-obsidian p-4 shadow-2xl"
            style={{ transformOrigin: 'top left' }}
          >
            {/* Color preview circle */}
            <div className="flex items-center justify-center mb-4">
              <div
                className="relative h-20 w-20 rounded-full border-2 border-border overflow-hidden"
                style={{ backgroundColor: currentHex }}
              >
                {/* Checkerboard pattern */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(45deg, #18181b 25%, transparent 25%), linear-gradient(-45deg, #18181b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #18181b 75%), linear-gradient(-45deg, transparent 75%, #18181b 75%)',
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
                  }}
                />
              </div>
            </div>

            {/* HSL Sliders */}
            <div className="space-y-3 mb-4">
              {/* Hue slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={\`\${id}-hue\`} className="text-xs text-text-faint">
                    Hue
                  </label>
                  <span className="text-xs text-chalk">{hsl.h}°</span>
                </div>
                <input
                  id={\`\${id}-hue\`}
                  type="range"
                  min="0"
                  max="360"
                  value={hsl.h}
                  onChange={handleHueChange}
                  className="slider-hue w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background:
                      'linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))',
                  }}
                />
              </div>

              {/* Saturation slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={\`\${id}-saturation\`} className="text-xs text-text-faint">
                    Saturation
                  </label>
                  <span className="text-xs text-chalk">{hsl.s}%</span>
                </div>
                <input
                  id={\`\${id}-saturation\`}
                  type="range"
                  min="0"
                  max="100"
                  value={hsl.s}
                  onChange={handleSaturationChange}
                  className="slider w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: \`linear-gradient(to right, hsl(\${hsl.h}, 0%, \${hsl.l}%), hsl(\${hsl.h}, 100%, \${hsl.l}%))\`,
                  }}
                />
              </div>

              {/* Lightness slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={\`\${id}-lightness\`} className="text-xs text-text-faint">
                    Lightness
                  </label>
                  <span className="text-xs text-chalk">{hsl.l}%</span>
                </div>
                <input
                  id={\`\${id}-lightness\`}
                  type="range"
                  min="0"
                  max="100"
                  value={hsl.l}
                  onChange={handleLightnessChange}
                  className="slider w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: \`linear-gradient(to right, hsl(\${hsl.h}, \${hsl.s}%, 0%), hsl(\${hsl.h}, \${hsl.s}%, 50%), hsl(\${hsl.h}, \${hsl.s}%, 100%))\`,
                  }}
                />
              </div>

              {/* Alpha slider (optional) */}
              {showAlpha && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor={\`\${id}-alpha\`} className="text-xs text-text-faint">
                      Opacity
                    </label>
                    <span className="text-xs text-chalk">{alpha}%</span>
                  </div>
                  <input
                    id={\`\${id}-alpha\`}
                    type="range"
                    min="0"
                    max="100"
                    value={alpha}
                    onChange={handleAlphaChange}
                    className="slider w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: \`linear-gradient(to right, transparent, \${currentHex})\`,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Hex input and format toggle */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1">
                <label htmlFor={\`\${id}-hex\`} className="text-xs text-text-faint mb-1 block">
                  {format}
                </label>
                <input
                  id={\`\${id}-hex\`}
                  type="text"
                  value={format === 'HEX' ? hexInput : getFormattedValue()}
                  onChange={format === 'HEX' ? handleHexInputChange : undefined}
                  readOnly={format !== 'HEX'}
                  className={cn(
                    'w-full px-3 py-1.5 text-sm bg-void border border-border rounded-lg',
                    'text-chalk focus:outline-none focus:border-ignite focus:ring-1 focus:ring-ignite/20',
                    format !== 'HEX' && 'cursor-default'
                  )}
                />
              </div>

              {/* Format toggle button */}
              <button
                type="button"
                onClick={toggleFormat}
                className="px-3 py-1.5 text-xs font-medium bg-void border border-border rounded-lg text-text-faint hover:text-ignite hover:border-ignite/50 transition-colors mt-auto"
              >
                {format}
              </button>
            </div>

            {/* Preset swatches */}
            {presets.length > 0 && (
              <div>
                <p className="text-xs text-text-faint mb-2">Presets</p>
                <div className="grid grid-cols-6 gap-2">
                  {presets.map((preset) => (
                    <motion.button
                      key={preset}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className={cn(
                        'h-8 w-8 rounded-lg border-2 transition-colors cursor-pointer',
                        preset.toLowerCase() === currentHex.toLowerCase()
                          ? 'border-ignite ring-2 ring-ignite/20'
                          : 'border-border hover:border-border-light'
                      )}
                      style={{ backgroundColor: preset }}
                      aria-label={\`Select color \${preset}\`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Copy button */}
            <button
              type="button"
              onClick={handleCopy}
              className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-void border border-border rounded-lg text-chalk hover:border-ignite/50 hover:text-ignite transition-colors"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy Color</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom slider styles */}
      <style jsx>{\`
        input[type='range'].slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e84e2d;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        input[type='range'].slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e84e2d;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        input[type='range'].slider-hue::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e84e2d;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        input[type='range'].slider-hue::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e84e2d;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        input[type='range']:focus-visible {
          outline: none;
        }
      \`}</style>
    </div>
  )
}

export default ColorPicker`,
usage: `import ColorPicker from "@/app/components/ui/color-picker"
import { useState } from "react"

export function Demo() {
  const [color, setColor] = useState("#E84E2D")

  return (
    <ColorPicker
      label="Theme Color"
      value={color}
      onChange={setColor}
    />
  )
}`,
props: [
  {
    name: "value",
    type: "string",
    default: "'#E84E2D'",
    description: "The selected color value in hex format (e.g., '#ff0000').",
  },
  {
    name: "onChange",
    type: "(color: string) => void",
    default: "undefined",
    description: "Callback fired when the color is changed.",
  },
  {
    name: "label",
    type: "string",
    default: "undefined",
    description: "Label text displayed above the color picker button.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the color picker.",
  },
  {
    name: "showAlpha",
    type: "boolean",
    default: "false",
    description: "Shows the alpha/opacity slider in the picker.",
  },
  {
    name: "presets",
    type: "string[]",
    default: "DEFAULT_PRESETS",
    description: "Array of preset hex colors to display as quick selects.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
],
playground: {
  controls: [
    { name: "label", label: "Label", type: "text", default: "Theme Color" },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
    { name: "showAlpha", label: "Show Alpha", type: "boolean", default: false },
  ],
},
component: () => import("@/app/components/ui/color-picker"),
demo: () => import("@/app/components/demos/color-picker-demo"),
};

export default entry;
