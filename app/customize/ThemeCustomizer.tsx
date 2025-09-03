'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, RotateCcw, Download, Palette, FileJson, FileCode, Figma } from 'lucide-react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import {
  type ThemeColors,
  type ThemePreset,
  defaultDark,
  defaultLight,
  themePresets,
  deriveBorder,
  deriveBorderLight,
  deriveTextFaint,
} from '@/lib/theme-presets'

// ─── Types ───────────────────────────────────────────────

interface ColorToken {
  key: string
  label: string
  description: string
}

const colorTokens: ColorToken[] = [
  { key: 'void', label: 'Void', description: 'Primary background' },
  { key: 'obsidian', label: 'Obsidian', description: 'Surface / card background' },
  { key: 'ignite', label: 'Ignite', description: 'Brand accent color' },
  { key: 'blush', label: 'Blush', description: 'Secondary text / hover' },
  { key: 'chalk', label: 'Chalk', description: 'Primary text color' },
]

// ─── Helpers ─────────────────────────────────────────────

function generateCSS(dark: ThemeColors, light: ThemeColors): string {
  const dBorder = deriveBorder(dark.obsidian, dark.chalk)
  const dBorderLight = deriveBorderLight(dark.obsidian, dark.chalk)
  const dTextFaint = deriveTextFaint(dark.blush)
  const lBorder = deriveBorder(light.obsidian, light.chalk)
  const lBorderLight = deriveBorderLight(light.obsidian, light.chalk)
  const lTextFaint = deriveTextFaint(light.blush)

  return `:root {
  /* Core 5 — dark mode (default) */
  --color-void: ${dark.void};
  --color-obsidian: ${dark.obsidian};
  --color-ignite: ${dark.ignite};
  --color-blush: ${dark.blush};
  --color-chalk: ${dark.chalk};

  /* Derived from core palette */
  --color-border: ${dBorder};
  --color-border-light: ${dBorderLight};
  --color-text-faint: ${dTextFaint};
  --color-ignite-dim: ${dark.ignite}14;

  /* Glow / gradient tokens */
  --glow-ignite-shadow: 0 0 60px -12px ${dark.ignite}30, 0 0 120px -24px ${dark.ignite}15;
  --selection-bg: ${dark.ignite}40;
  --color-code-bg: ${dark.obsidian};

  /* Hero / CTA radial glow tokens */
  --hero-glow-primary: ${dark.ignite}12;
  --hero-glow-primary-mid: ${dark.ignite}06;
  --hero-glow-secondary: ${dark.blush}08;
  --cta-glow: ${dark.ignite}15;
}

[data-theme="light"] {
  --color-void: ${light.void};
  --color-obsidian: ${light.obsidian};
  --color-ignite: ${light.ignite};
  --color-blush: ${light.blush};
  --color-chalk: ${light.chalk};

  --color-border: ${lBorder};
  --color-border-light: ${lBorderLight};
  --color-text-faint: ${lTextFaint};
  --color-ignite-dim: ${light.ignite}12;

  --glow-ignite-shadow: 0 0 60px -12px ${light.ignite}20, 0 0 120px -24px ${light.ignite}10;
  --selection-bg: ${light.ignite}30;
  --color-code-bg: ${light.obsidian};

  --hero-glow-primary: ${light.ignite}10;
  --hero-glow-primary-mid: ${light.ignite}06;
  --hero-glow-secondary: ${light.blush}08;
  --cta-glow: ${light.ignite}10;
}`
}

// ─── Component ───────────────────────────────────────────

type ExportFormat = 'css' | 'json' | 'tailwind' | 'figma'

const exportFormats: { key: ExportFormat; label: string; icon: React.ReactNode; ext: string; mime: string }[] = [
  { key: 'css', label: 'CSS', icon: <FileCode className="h-3.5 w-3.5" />, ext: 'css', mime: 'text/css' },
  { key: 'json', label: 'JSON', icon: <FileJson className="h-3.5 w-3.5" />, ext: 'json', mime: 'application/json' },
  { key: 'tailwind', label: 'Tailwind', icon: <FileCode className="h-3.5 w-3.5" />, ext: 'js', mime: 'application/javascript' },
  { key: 'figma', label: 'Figma', icon: <Figma className="h-3.5 w-3.5" />, ext: 'json', mime: 'application/json' },
]

function generateJSON(dark: ThemeColors, light: ThemeColors): string {
  const buildTokens = (c: ThemeColors, mode: string) => {
    const border = deriveBorder(c.obsidian, c.chalk)
    const borderLight = deriveBorderLight(c.obsidian, c.chalk)
    const textFaint = deriveTextFaint(c.blush)
    return {
      [`${mode}`]: {
        core: {
          void: c.void,
          obsidian: c.obsidian,
          ignite: c.ignite,
          blush: c.blush,
          chalk: c.chalk,
        },
        derived: {
          border,
          'border-light': borderLight,
          'text-faint': textFaint,
          'ignite-dim': `${c.ignite}14`,
          'code-bg': c.obsidian,
        },
        glow: {
          'ignite-shadow': `0 0 60px -12px ${c.ignite}30, 0 0 120px -24px ${c.ignite}15`,
          'selection-bg': `${c.ignite}40`,
        },
      },
    }
  }
  const tokens = {
    $schema: 'https://ui.praxys.xyz/theme-schema.json',
    name: 'Praxys UI Custom Theme',
    version: '1.0.0',
    ...buildTokens(dark, 'dark'),
    ...buildTokens(light, 'light'),
  }
  return JSON.stringify(tokens, null, 2)
}

function generateTailwindConfig(dark: ThemeColors, light: ThemeColors): string {
  const dBorder = deriveBorder(dark.obsidian, dark.chalk)
  const dBorderLight = deriveBorderLight(dark.obsidian, dark.chalk)
  const dTextFaint = deriveTextFaint(dark.blush)
  const lBorder = deriveBorder(light.obsidian, light.chalk)
  const lBorderLight = deriveBorderLight(light.obsidian, light.chalk)
  const lTextFaint = deriveTextFaint(light.blush)

  return `// praxys-theme.js
// Paste into your tailwind.config.js or import into your CSS theme
// For Tailwind CSS v4, add these as @theme values in your globals.css

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Core brand palette
        void: 'var(--color-void)',
        obsidian: 'var(--color-obsidian)',
        ignite: 'var(--color-ignite)',
        blush: 'var(--color-blush)',
        chalk: 'var(--color-chalk)',

        // Derived tokens
        border: 'var(--color-border)',
        'border-light': 'var(--color-border-light)',
        'text-faint': 'var(--color-text-faint)',
        'ignite-dim': 'var(--color-ignite-dim)',
        'code-bg': 'var(--color-code-bg)',
      },
    },
  },
}

/*
 * CSS variables to add to your globals.css:
 *
 * :root {
 *   --color-void: ${dark.void};
 *   --color-obsidian: ${dark.obsidian};
 *   --color-ignite: ${dark.ignite};
 *   --color-blush: ${dark.blush};
 *   --color-chalk: ${dark.chalk};
 *   --color-border: ${dBorder};
 *   --color-border-light: ${dBorderLight};
 *   --color-text-faint: ${dTextFaint};
 *   --color-ignite-dim: ${dark.ignite}14;
 *   --color-code-bg: ${dark.obsidian};
 * }
 *
 * [data-theme="light"] {
 *   --color-void: ${light.void};
 *   --color-obsidian: ${light.obsidian};
 *   --color-ignite: ${light.ignite};
 *   --color-blush: ${light.blush};
 *   --color-chalk: ${light.chalk};
 *   --color-border: ${lBorder};
 *   --color-border-light: ${lBorderLight};
 *   --color-text-faint: ${lTextFaint};
 *   --color-ignite-dim: ${light.ignite}12;
 *   --color-code-bg: ${light.obsidian};
 * }
 */`
}

function generateFigmaVariables(dark: ThemeColors, light: ThemeColors): string {
  const buildCollection = (c: ThemeColors, mode: string) => {
    const border = deriveBorder(c.obsidian, c.chalk)
    const borderLight = deriveBorderLight(c.obsidian, c.chalk)
    const textFaint = deriveTextFaint(c.blush)

    const hexToRgba = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255
      const g = parseInt(hex.slice(3, 5), 16) / 255
      const b = parseInt(hex.slice(5, 7), 16) / 255
      return { r: +r.toFixed(4), g: +g.toFixed(4), b: +b.toFixed(4), a: 1 }
    }

    return [
      { name: `${mode}/core/void`, value: hexToRgba(c.void) },
      { name: `${mode}/core/obsidian`, value: hexToRgba(c.obsidian) },
      { name: `${mode}/core/ignite`, value: hexToRgba(c.ignite) },
      { name: `${mode}/core/blush`, value: hexToRgba(c.blush) },
      { name: `${mode}/core/chalk`, value: hexToRgba(c.chalk) },
      { name: `${mode}/derived/border`, value: hexToRgba(border) },
      { name: `${mode}/derived/border-light`, value: hexToRgba(borderLight) },
      { name: `${mode}/derived/text-faint`, value: hexToRgba(textFaint) },
    ]
  }

  const figmaPayload = {
    $description: 'Praxys UI theme variables for Figma. Import via Figma Variables REST API or Tokens Studio.',
    $format: 'figma-variables',
    collections: [
      {
        name: 'Praxys UI Theme',
        modes: ['dark', 'light'],
        variables: [
          ...buildCollection(dark, 'dark'),
          ...buildCollection(light, 'light'),
        ],
      },
    ],
  }
  return JSON.stringify(figmaPayload, null, 2)
}

export default function ThemeCustomizer() {
  const [darkColors, setDarkColors] = useState<ThemeColors>({ ...defaultDark })
  const [lightColors, setLightColors] = useState<ThemeColors>({ ...defaultLight })
  const [activeMode, setActiveMode] = useState<'dark' | 'light'>('dark')
  const [copied, setCopied] = useState(false)
  const [exportFormat, setExportFormat] = useState<ExportFormat>('css')

  const activeColors = activeMode === 'dark' ? darkColors : lightColors
  const setActiveColors = activeMode === 'dark' ? setDarkColors : setLightColors

  const exportOutput = useMemo(() => {
    switch (exportFormat) {
      case 'css': return generateCSS(darkColors, lightColors)
      case 'json': return generateJSON(darkColors, lightColors)
      case 'tailwind': return generateTailwindConfig(darkColors, lightColors)
      case 'figma': return generateFigmaVariables(darkColors, lightColors)
    }
  }, [darkColors, lightColors, exportFormat])

  const activeFormatMeta = exportFormats.find((f) => f.key === exportFormat)!

  const updateColor = useCallback(
    (key: string, value: string) => {
      setActiveColors((prev) => ({ ...prev, [key]: value }))
    },
    [setActiveColors]
  )

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(exportOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [exportOutput])

  const handleDownload = useCallback(() => {
    const blob = new Blob([exportOutput], { type: activeFormatMeta.mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `praxys-theme.${activeFormatMeta.ext}`
    a.click()
    URL.revokeObjectURL(url)
  }, [exportOutput, activeFormatMeta])

  const handleReset = useCallback(() => {
    setDarkColors({ ...defaultDark })
    setLightColors({ ...defaultLight })
  }, [])

  const applyPreset = useCallback((preset: ThemePreset) => {
    setDarkColors({ ...preset.dark })
    setLightColors({ ...preset.light })
  }, [])

  const generateRandomPalette = useCallback(() => {
    // Helper to convert HSL to Hex
    const hslToHex = (h: number, s: number, l: number): string => {
      s /= 100
      l /= 100
      const c = (1 - Math.abs(2 * l - 1)) * s
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
      const m = l - c / 2
      let r = 0, g = 0, b = 0

      if (h >= 0 && h < 60) { r = c; g = x; b = 0 }
      else if (h >= 60 && h < 120) { r = x; g = c; b = 0 }
      else if (h >= 120 && h < 180) { r = 0; g = c; b = x }
      else if (h >= 180 && h < 240) { r = 0; g = x; b = c }
      else if (h >= 240 && h < 300) { r = x; g = 0; b = c }
      else { r = c; g = 0; b = x }

      const toHex = (n: number) => {
        const hex = Math.round((n + m) * 255).toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }

      return `#${toHex(r)}${toHex(g)}${toHex(b)}`
    }

    // Generate a base hue and create a harmonious palette
    const baseHue = Math.floor(Math.random() * 360)

    if (activeMode === 'dark') {
      // Dark mode palette - dark backgrounds, vibrant accents
      setDarkColors({
        void: hslToHex(baseHue, 15, 6),              // Very dark base
        obsidian: hslToHex(baseHue, 20, 10),        // Slightly lighter dark
        ignite: hslToHex(baseHue, 80, 55),          // Vibrant primary accent
        blush: hslToHex((baseHue + 30) % 360, 70, 65), // Complementary lighter accent
        chalk: hslToHex(baseHue, 5, 90),            // Light text
      })
    } else {
      // Light mode palette - light backgrounds, rich accents
      setLightColors({
        void: hslToHex(baseHue, 10, 98),            // Very light base
        obsidian: hslToHex(baseHue, 15, 95),        // Slightly darker light
        ignite: hslToHex(baseHue, 75, 50),          // Rich primary accent
        blush: hslToHex((baseHue + 30) % 360, 60, 45), // Complementary darker accent
        chalk: hslToHex(baseHue, 10, 15),           // Dark text
      })
    }
  }, [activeMode])

  // Live preview CSS vars scoped to the preview panel
  const previewVars = useMemo(() => {
    const c = activeColors
    const border = deriveBorder(c.obsidian, c.chalk)
    const borderLight = deriveBorderLight(c.obsidian, c.chalk)
    return {
      '--p-void': c.void,
      '--p-obsidian': c.obsidian,
      '--p-ignite': c.ignite,
      '--p-blush': c.blush,
      '--p-chalk': c.chalk,
      '--p-border': border,
      '--p-border-light': borderLight,
    } as React.CSSProperties
  }, [activeColors])

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen overflow-x-hidden pt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ignite/20 bg-ignite-dim px-4 py-1.5 text-xs font-medium text-ignite">
              <Palette className="h-3.5 w-3.5" />
              Theme Customizer
            </div>
            <h1 className="font-pixel text-3xl font-bold text-chalk md:text-5xl">
              Make it yours
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-blush">
              Pick your brand colors, preview components live, then copy the generated
              CSS into your <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">globals.css</code>.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:gap-8">
            {/* ── Left panel: Controls ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="min-w-0 space-y-6"
            >
              {/* Mode toggle */}
              <div className="rounded-xl border border-border bg-obsidian p-4">
                <label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-text-faint">
                  Editing Mode
                </label>
                <div className="flex rounded-lg border border-border bg-void p-1">
                  <button
                    onClick={() => setActiveMode('dark')}
                    className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${activeMode === 'dark'
                      ? 'bg-ignite text-void'
                      : 'text-blush hover:text-chalk'
                      }`}
                  >
                    Dark Mode
                  </button>
                  <button
                    onClick={() => setActiveMode('light')}
                    className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${activeMode === 'light'
                      ? 'bg-ignite text-void'
                      : 'text-blush hover:text-chalk'
                      }`}
                  >
                    Light Mode
                  </button>
                </div>
              </div>

              {/* Color pickers */}
              <div className="rounded-xl border border-border bg-obsidian p-4">
                <label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-text-faint">
                  Colors
                </label>
                <div className="space-y-3">
                  {colorTokens.map((token) => (
                    <div key={token.key} className="flex items-center gap-3">
                      <label
                        className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-border"
                        title={`Pick ${token.label}`}
                      >
                        <input
                          type="color"
                          value={activeColors[token.key as keyof ThemeColors]}
                          onChange={(e) => updateColor(token.key, e.target.value)}
                          className="absolute -inset-2 h-14 w-14 cursor-pointer border-0 bg-transparent"
                        />
                      </label>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-chalk">{token.label}</span>
                          <span className="font-mono text-xs text-text-faint">
                            {activeColors[token.key as keyof ThemeColors]}
                          </span>
                        </div>
                        <p className="text-xs text-text-faint truncate">{token.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Presets */}
              <div className="rounded-xl border border-border bg-obsidian p-4">
                <label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-text-faint">
                  Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {themePresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="group flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-left transition-all hover:border-border-light hover:bg-void"
                    >
                      <div className="flex -space-x-1">
                        {Object.values(preset.dark).map((color, i) => (
                          <div
                            key={i}
                            className="h-4 w-4 rounded-full border border-border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-blush group-hover:text-chalk truncate">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Random Colors Button */}
                <button
                  onClick={generateRandomPalette}
                  className="w-full mt-3 px-4 py-3 rounded-lg border-2 border-dashed border-ignite/50 bg-ignite/5 text-ignite hover:bg-ignite/10 transition-colors text-sm font-medium"
                >
                  🎲 Generate Random Palette
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
                <button
                  onClick={handleDownload}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </button>
              </div>
            </motion.div>

            {/* ── Right panel: Preview ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="min-w-0 space-y-6"
            >
              {/* Live preview */}
              <div
                className="overflow-hidden rounded-xl border border-border"
                style={previewVars}
              >
                <div className="border-b border-border bg-obsidian px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-text-faint">
                    Live Preview ({activeMode} mode)
                  </span>
                </div>
                <div
                  className="p-6 space-y-6 transition-colors duration-200"
                  style={{ backgroundColor: 'var(--p-void)' }}
                >
                  {/* Navbar preview */}
                  <div
                    className="flex items-center justify-between rounded-lg border px-4 py-3"
                    style={{
                      borderColor: 'var(--p-border)',
                      backgroundColor: 'var(--p-obsidian)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-md font-pixel text-xs font-bold"
                        style={{
                          backgroundColor: 'var(--p-ignite)',
                          color: 'var(--p-void)',
                        }}
                      >
                        P
                      </div>
                      <span
                        className="font-pixel text-sm font-semibold"
                        style={{ color: 'var(--p-chalk)' }}
                      >
                        Praxys UI
                      </span>
                    </div>
                    <div className="flex gap-4">
                      {['Components', 'Docs', 'Templates'].map((t) => (
                        <span
                          key={t}
                          className="text-xs"
                          style={{ color: 'var(--p-blush)' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hero preview */}
                  <div className="text-center py-6">
                    <span
                      className="mb-2 inline-block rounded-full px-3 py-1 text-[10px] font-medium"
                      style={{
                        backgroundColor: `color-mix(in srgb, var(--p-ignite) 10%, transparent)`,
                        color: 'var(--p-ignite)',
                        border: `1px solid color-mix(in srgb, var(--p-ignite) 20%, transparent)`,
                      }}
                    >
                      34 Components
                    </span>
                    <h2
                      className="font-pixel text-xl font-bold"
                      style={{ color: 'var(--p-chalk)' }}
                    >
                      Build beautiful UIs
                    </h2>
                    <p
                      className="mt-2 text-xs"
                      style={{ color: 'var(--p-blush)' }}
                    >
                      Copy-paste animated React components for your next project.
                    </p>
                    <button
                      className="mt-4 rounded-lg px-5 py-2 text-xs font-medium transition-opacity hover:opacity-90"
                      style={{
                        backgroundColor: 'var(--p-ignite)',
                        color: 'var(--p-void)',
                      }}
                    >
                      Get Started
                    </button>
                  </div>

                  {/* Cards preview */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { title: 'Buttons', count: 3 },
                      { title: 'Cards', count: 6 },
                      { title: 'Text Effects', count: 6 },
                    ].map((cat) => (
                      <div
                        key={cat.title}
                        className="rounded-lg border p-3"
                        style={{
                          borderColor: 'var(--p-border)',
                          backgroundColor: 'var(--p-obsidian)',
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-xs font-medium"
                            style={{ color: 'var(--p-chalk)' }}
                          >
                            {cat.title}
                          </span>
                          <span
                            className="rounded-full px-1.5 py-0.5 text-[10px] font-medium"
                            style={{
                              backgroundColor: `color-mix(in srgb, var(--p-ignite) 10%, transparent)`,
                              color: 'var(--p-ignite)',
                            }}
                          >
                            {cat.count}
                          </span>
                        </div>
                        {/* Skeleton lines */}
                        <div className="space-y-1.5">
                          {[85, 72, 95].map((width, j) => (
                            <div
                              key={j}
                              className="h-2 rounded"
                              style={{
                                backgroundColor: 'var(--p-border)',
                                width: `${width}%`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Code block preview */}
                  <div
                    className="rounded-lg border p-4 font-mono text-xs"
                    style={{
                      borderColor: 'var(--p-border)',
                      backgroundColor: 'var(--p-obsidian)',
                    }}
                  >
                    <div style={{ color: 'var(--p-blush)' }}>
                      <span style={{ color: 'var(--p-ignite)' }}>import</span> {'{ AnimatedButton }'}{' '}
                      <span style={{ color: 'var(--p-ignite)' }}>from</span>{' '}
                      <span style={{ color: 'var(--p-blush)' }}>&apos;@/components/ui&apos;</span>
                    </div>
                    <div className="mt-1" style={{ color: 'var(--p-chalk)' }}>
                      <span style={{ color: 'var(--p-ignite)' }}>export default</span> function{' '}
                      <span style={{ color: 'var(--p-chalk)' }}>App</span>() {'{'}
                    </div>
                    <div className="ml-4" style={{ color: 'var(--p-blush)' }}>
                      return {'<'}<span style={{ color: 'var(--p-ignite)' }}>AnimatedButton</span>{'>'}Click me{'</'}<span style={{ color: 'var(--p-ignite)' }}>AnimatedButton</span>{'>'}
                    </div>
                    <div style={{ color: 'var(--p-chalk)' }}>{'}'}</div>
                  </div>
                </div>
              </div>

              {/* Generated export output */}
              <div className="rounded-xl border border-border bg-obsidian overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div className="flex items-center gap-1">
                    {exportFormats.map((fmt) => (
                      <button
                        key={fmt.key}
                        onClick={() => { setExportFormat(fmt.key); setCopied(false) }}
                        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all ${exportFormat === fmt.key
                          ? 'bg-ignite/10 text-ignite border border-ignite/20'
                          : 'text-text-faint hover:text-blush border border-transparent'
                          }`}
                      >
                        {fmt.icon}
                        <span className="hidden sm:inline">{fmt.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
                    >
                      <Download className="h-3 w-3" />
                      <span className="hidden sm:inline">.{activeFormatMeta.ext}</span>
                    </button>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-green-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <pre className="max-h-80 overflow-auto p-4 font-mono text-xs leading-relaxed text-blush">
                  <code>{exportOutput}</code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
