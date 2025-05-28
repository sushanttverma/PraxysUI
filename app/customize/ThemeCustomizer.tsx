'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, RotateCcw, Download, Palette } from 'lucide-react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

// ─── Types ───────────────────────────────────────────────

interface ColorToken {
  key: string
  label: string
  description: string
}

interface ThemeColors {
  void: string
  obsidian: string
  ignite: string
  blush: string
  chalk: string
}

// ─── Default brand palettes ──────────────────────────────

const defaultDark: ThemeColors = {
  void: '#050505',
  obsidian: '#0B0A08',
  ignite: '#E84E2D',
  blush: '#C9958A',
  chalk: '#F2ECE2',
}

const defaultLight: ThemeColors = {
  void: '#FAFAF8',
  obsidian: '#F0EDE8',
  ignite: '#D4432A',
  blush: '#8B6B62',
  chalk: '#1A1714',
}

const colorTokens: ColorToken[] = [
  { key: 'void', label: 'Void', description: 'Primary background' },
  { key: 'obsidian', label: 'Obsidian', description: 'Surface / card background' },
  { key: 'ignite', label: 'Ignite', description: 'Brand accent color' },
  { key: 'blush', label: 'Blush', description: 'Secondary text / hover' },
  { key: 'chalk', label: 'Chalk', description: 'Primary text color' },
]

// ─── Preset themes ───────────────────────────────────────

const presets: { name: string; dark: ThemeColors; light: ThemeColors }[] = [
  { name: 'Praxys (Default)', dark: defaultDark, light: defaultLight },
  {
    name: 'Ocean',
    dark: { void: '#020617', obsidian: '#0f172a', ignite: '#3b82f6', blush: '#94a3b8', chalk: '#f1f5f9' },
    light: { void: '#f8fafc', obsidian: '#e2e8f0', ignite: '#2563eb', blush: '#64748b', chalk: '#0f172a' },
  },
  {
    name: 'Forest',
    dark: { void: '#022c22', obsidian: '#064e3b', ignite: '#10b981', blush: '#6ee7b7', chalk: '#ecfdf5' },
    light: { void: '#f0fdf4', obsidian: '#dcfce7', ignite: '#059669', blush: '#4ade80', chalk: '#052e16' },
  },
  {
    name: 'Purple Haze',
    dark: { void: '#09090b', obsidian: '#18181b', ignite: '#a855f7', blush: '#c4b5fd', chalk: '#faf5ff' },
    light: { void: '#faf5ff', obsidian: '#f3e8ff', ignite: '#9333ea', blush: '#7c3aed', chalk: '#1e1b4b' },
  },
  {
    name: 'Rose Gold',
    dark: { void: '#0c0a09', obsidian: '#1c1917', ignite: '#f43f5e', blush: '#fda4af', chalk: '#fff1f2' },
    light: { void: '#fff1f2', obsidian: '#ffe4e6', ignite: '#e11d48', blush: '#be123c', chalk: '#1c1917' },
  },
  {
    name: 'Amber',
    dark: { void: '#0a0a00', obsidian: '#1a1a0a', ignite: '#f59e0b', blush: '#fbbf24', chalk: '#fffbeb' },
    light: { void: '#fffbeb', obsidian: '#fef3c7', ignite: '#d97706', blush: '#b45309', chalk: '#1c1917' },
  },
]

// ─── Helpers ─────────────────────────────────────────────

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function deriveBorder(obsidian: string, chalk: string): string {
  const [, , obsL] = hexToHsl(obsidian)
  const [, , chkL] = hexToHsl(chalk)
  const isDark = obsL < chkL
  if (isDark) {
    const r = parseInt(obsidian.slice(1, 3), 16)
    const g = parseInt(obsidian.slice(3, 5), 16)
    const b = parseInt(obsidian.slice(5, 7), 16)
    return `#${Math.min(255, r + 20).toString(16).padStart(2, '0')}${Math.min(255, g + 18).toString(16).padStart(2, '0')}${Math.min(255, b + 16).toString(16).padStart(2, '0')}`
  }
  const r = parseInt(obsidian.slice(1, 3), 16)
  const g = parseInt(obsidian.slice(3, 5), 16)
  const b = parseInt(obsidian.slice(5, 7), 16)
  return `#${Math.max(0, r - 30).toString(16).padStart(2, '0')}${Math.max(0, g - 28).toString(16).padStart(2, '0')}${Math.max(0, b - 25).toString(16).padStart(2, '0')}`
}

function deriveBorderLight(obsidian: string, chalk: string): string {
  const [, , obsL] = hexToHsl(obsidian)
  const [, , chkL] = hexToHsl(chalk)
  const isDark = obsL < chkL
  if (isDark) {
    const r = parseInt(obsidian.slice(1, 3), 16)
    const g = parseInt(obsidian.slice(3, 5), 16)
    const b = parseInt(obsidian.slice(5, 7), 16)
    return `#${Math.min(255, r + 35).toString(16).padStart(2, '0')}${Math.min(255, g + 32).toString(16).padStart(2, '0')}${Math.min(255, b + 28).toString(16).padStart(2, '0')}`
  }
  const r = parseInt(obsidian.slice(1, 3), 16)
  const g = parseInt(obsidian.slice(3, 5), 16)
  const b = parseInt(obsidian.slice(5, 7), 16)
  return `#${Math.max(0, r - 45).toString(16).padStart(2, '0')}${Math.max(0, g - 42).toString(16).padStart(2, '0')}${Math.max(0, b - 38).toString(16).padStart(2, '0')}`
}

function deriveTextFaint(blush: string): string {
  const r = parseInt(blush.slice(1, 3), 16)
  const g = parseInt(blush.slice(3, 5), 16)
  const b = parseInt(blush.slice(5, 7), 16)
  return `#${Math.round(r * 0.7).toString(16).padStart(2, '0')}${Math.round(g * 0.7).toString(16).padStart(2, '0')}${Math.round(b * 0.7).toString(16).padStart(2, '0')}`
}

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

export default function ThemeCustomizer() {
  const [darkColors, setDarkColors] = useState<ThemeColors>({ ...defaultDark })
  const [lightColors, setLightColors] = useState<ThemeColors>({ ...defaultLight })
  const [activeMode, setActiveMode] = useState<'dark' | 'light'>('dark')
  const [copied, setCopied] = useState(false)

  const activeColors = activeMode === 'dark' ? darkColors : lightColors
  const setActiveColors = activeMode === 'dark' ? setDarkColors : setLightColors

  const css = useMemo(() => generateCSS(darkColors, lightColors), [darkColors, lightColors])

  const updateColor = useCallback(
    (key: string, value: string) => {
      setActiveColors((prev) => ({ ...prev, [key]: value }))
    },
    [setActiveColors]
  )

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [css])

  const handleDownload = useCallback(() => {
    const blob = new Blob([css], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'praxys-theme.css'
    a.click()
    URL.revokeObjectURL(url)
  }, [css])

  const handleReset = useCallback(() => {
    setDarkColors({ ...defaultDark })
    setLightColors({ ...defaultLight })
  }, [])

  const applyPreset = useCallback((preset: typeof presets[0]) => {
    setDarkColors({ ...preset.dark })
    setLightColors({ ...preset.light })
  }, [])

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
      <main className="min-h-screen pt-16">
        <div className="mx-auto max-w-7xl px-6 py-16">
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

          <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
            {/* ── Left panel: Controls ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Mode toggle */}
              <div className="rounded-xl border border-border bg-obsidian p-4">
                <label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-text-faint">
                  Editing Mode
                </label>
                <div className="flex rounded-lg border border-border bg-void p-1">
                  <button
                    onClick={() => setActiveMode('dark')}
                    className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                      activeMode === 'dark'
                        ? 'bg-ignite text-void'
                        : 'text-blush hover:text-chalk'
                    }`}
                  >
                    Dark Mode
                  </button>
                  <button
                    onClick={() => setActiveMode('light')}
                    className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                      activeMode === 'light'
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
                  {presets.map((preset) => (
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
              className="space-y-6"
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
                          {Array.from({ length: 3 }).map((_, j) => (
                            <div
                              key={j}
                              className="h-2 rounded"
                              style={{
                                backgroundColor: 'var(--p-border)',
                                width: `${70 + Math.random() * 30}%`,
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

              {/* Generated CSS output */}
              <div className="rounded-xl border border-border bg-obsidian overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-text-faint">
                    Generated CSS
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-green-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy CSS
                      </>
                    )}
                  </button>
                </div>
                <pre className="max-h-80 overflow-auto p-4 font-mono text-xs leading-relaxed text-blush">
                  <code>{css}</code>
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
