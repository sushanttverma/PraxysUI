'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Copy,
    Check,
    RotateCcw,
    Code,
    Shuffle,
    Eye,
    Image as ImageIcon,
    Palette,
    Droplets,
    Layers,
} from 'lucide-react'
import Navbar from '@/app/components/Navbar'
import { cn } from '@/lib/utils'

// ─── Slider ──────────────────────────────────────────────

function Slider({ label, value, min, max, step = 1, unit = '', onChange }: {
    label: string; value: number; min: number; max: number; step?: number; unit?: string;
    onChange: (v: number) => void
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
                <span className="text-blush">{label}</span>
                <span className="text-chalk font-mono">{value}{unit}</span>
            </div>
            <input
                type="range"
                min={min} max={max} step={step} value={value}
                onChange={e => onChange(Number(e.target.value))}
                className="slider-thumb w-full"
            />
        </div>
    )
}

// ─── Types ───────────────────────────────────────────────

interface GlassConfig {
    blur: number
    opacity: number
    saturation: number
    borderOpacity: number
    borderWidth: number
    borderRadius: number
    tint: string
    tintOpacity: number
    noise: boolean
    noiseOpacity: number
}

interface BackgroundPreset {
    name: string
    style: React.CSSProperties
}

interface GlassPreset {
    name: string
    config: GlassConfig
}

// ─── Presets ─────────────────────────────────────────────

const backgroundPresets: BackgroundPreset[] = [
    {
        name: 'Gradient Mesh',
        style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
    },
    {
        name: 'Aurora',
        style: {
            background: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)',
        },
    },
    {
        name: 'Sunset',
        style: {
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        },
    },
    {
        name: 'Ocean',
        style: {
            background: 'linear-gradient(135deg, #0077b6 0%, #00b4d8 50%, #90e0ef 100%)',
        },
    },
    {
        name: 'Forest',
        style: {
            background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
        },
    },
    {
        name: 'Ignite',
        style: {
            background: 'linear-gradient(135deg, #E84E2D 0%, #C9958A 50%, #050505 100%)',
        },
    },
]

const glassPresets: GlassPreset[] = [
    {
        name: 'Apple',
        config: {
            blur: 40, opacity: 12, saturation: 180, borderOpacity: 20,
            borderWidth: 1, borderRadius: 16, tint: '#ffffff', tintOpacity: 8,
            noise: false, noiseOpacity: 3,
        },
    },
    {
        name: 'Frosted',
        config: {
            blur: 20, opacity: 25, saturation: 150, borderOpacity: 30,
            borderWidth: 1, borderRadius: 12, tint: '#ffffff', tintOpacity: 15,
            noise: true, noiseOpacity: 5,
        },
    },
    {
        name: 'Crystal',
        config: {
            blur: 60, opacity: 8, saturation: 200, borderOpacity: 15,
            borderWidth: 1, borderRadius: 20, tint: '#ffffff', tintOpacity: 5,
            noise: false, noiseOpacity: 2,
        },
    },
    {
        name: 'Smoke',
        config: {
            blur: 30, opacity: 40, saturation: 100, borderOpacity: 10,
            borderWidth: 0, borderRadius: 8, tint: '#000000', tintOpacity: 20,
            noise: true, noiseOpacity: 8,
        },
    },
    {
        name: 'Neon',
        config: {
            blur: 25, opacity: 10, saturation: 250, borderOpacity: 40,
            borderWidth: 1, borderRadius: 16, tint: '#00ff88', tintOpacity: 5,
            noise: false, noiseOpacity: 3,
        },
    },
    {
        name: 'Subtle',
        config: {
            blur: 12, opacity: 6, saturation: 120, borderOpacity: 12,
            borderWidth: 1, borderRadius: 12, tint: '#ffffff', tintOpacity: 4,
            noise: false, noiseOpacity: 2,
        },
    },
    {
        name: 'Heavy',
        config: {
            blur: 50, opacity: 50, saturation: 130, borderOpacity: 25,
            borderWidth: 2, borderRadius: 24, tint: '#ffffff', tintOpacity: 25,
            noise: true, noiseOpacity: 4,
        },
    },
    {
        name: 'Linear',
        config: {
            blur: 16, opacity: 10, saturation: 160, borderOpacity: 18,
            borderWidth: 1, borderRadius: 12, tint: '#ffffff', tintOpacity: 6,
            noise: false, noiseOpacity: 2,
        },
    },
]

// ─── Helpers ─────────────────────────────────────────────

function hexToRgba(hex: string, opacity: number): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${(opacity / 100).toFixed(2)})`
}

function configToCSS(config: GlassConfig): string {
    const lines: string[] = []
    lines.push(`/* Glassmorphism */`)
    lines.push(`background: ${hexToRgba(config.tint, config.tintOpacity)};`)
    lines.push(`backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%);`)
    lines.push(`-webkit-backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%);`)
    if (config.borderWidth > 0) {
        lines.push(`border: ${config.borderWidth}px solid ${hexToRgba('#ffffff', config.borderOpacity)};`)
    }
    lines.push(`border-radius: ${config.borderRadius}px;`)
    return lines.join('\n')
}

function configToTailwind(config: GlassConfig): string {
    const lines: string[] = []
    lines.push(`<!-- Glassmorphism with Tailwind -->`)
    lines.push(`<div class="`)
    lines.push(`  backdrop-blur-[${config.blur}px]`)
    lines.push(`  backdrop-saturate-[${config.saturation}%]`)
    lines.push(`  bg-white/${Math.round(config.tintOpacity)}`)
    if (config.borderWidth > 0) {
        lines.push(`  border border-white/${Math.round(config.borderOpacity)}`)
    }
    lines.push(`  rounded-[${config.borderRadius}px]`)
    lines.push(`">`)
    lines.push(`  <!-- Content -->`)
    lines.push(`</div>`)
    return lines.join('\n')
}

// ─── Export Format ───────────────────────────────────────

type ExportFormat = 'css' | 'tailwind'

// ─── Component ───────────────────────────────────────────

export default function GlassGenerator() {
    const [config, setConfig] = useState<GlassConfig>(glassPresets[0].config)
    const [background, setBackground] = useState(0)
    const [exportFormat, setExportFormat] = useState<ExportFormat>('css')
    const [copied, setCopied] = useState(false)
    const [showContent, setShowContent] = useState(true)

    // ── Glass style ──
    const glassStyle = useMemo<React.CSSProperties>(() => ({
        background: hexToRgba(config.tint, config.tintOpacity),
        backdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%)`,
        WebkitBackdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%)`,
        border: config.borderWidth > 0
            ? `${config.borderWidth}px solid ${hexToRgba('#ffffff', config.borderOpacity)}`
            : 'none',
        borderRadius: `${config.borderRadius}px`,
    }), [config])

    // ── Export output ──
    const exportOutput = useMemo(() => {
        switch (exportFormat) {
            case 'css': return configToCSS(config)
            case 'tailwind': return configToTailwind(config)
        }
    }, [config, exportFormat])

    // ── Handlers ──
    const updateConfig = useCallback((key: keyof GlassConfig, value: number | string | boolean) => {
        setConfig(prev => ({ ...prev, [key]: value }))
    }, [])

    const applyPreset = useCallback((preset: GlassPreset) => {
        setConfig({ ...preset.config })
    }, [])

    const randomize = useCallback(() => {
        setConfig({
            blur: 10 + Math.floor(Math.random() * 50),
            opacity: 5 + Math.floor(Math.random() * 40),
            saturation: 100 + Math.floor(Math.random() * 200),
            borderOpacity: 5 + Math.floor(Math.random() * 40),
            borderWidth: Math.random() > 0.3 ? 1 : 0,
            borderRadius: 8 + Math.floor(Math.random() * 24),
            tint: Math.random() > 0.5 ? '#ffffff' : '#000000',
            tintOpacity: 3 + Math.floor(Math.random() * 25),
            noise: Math.random() > 0.5,
            noiseOpacity: 2 + Math.floor(Math.random() * 8),
        })
    }, [])

    const handleReset = useCallback(() => {
        setConfig(glassPresets[0].config)
    }, [])

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(exportOutput)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [exportOutput])

    const formatTabs: { key: ExportFormat; label: string }[] = [
        { key: 'css', label: 'CSS' },
        { key: 'tailwind', label: 'Tailwind' },
    ]

    return (
        <div className="relative h-screen overflow-hidden flex flex-col">
            <Navbar />
            <div className="relative flex flex-col flex-1 min-h-0">
                {/* Ambient background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-void" />
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, hsla(180, 50%, 35%, 0.2) 0%, transparent 100%)' }} />
                </div>

                {/* Glass header */}
                <div className="flex-shrink-0 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-xl px-4 md:px-6 pt-4 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-chalk flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] border border-white/[0.1]">
                                    <Layers className="h-4 w-4 text-blue-400" />
                                </div>
                                Glassmorphism
                            </h1>
                            <p className="text-xs md:text-sm text-white/35 mt-1 pl-10">
                                Frosted-glass effects with live preview
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={randomize}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/[0.14] backdrop-blur-sm transition-all duration-200"
                            >
                                <Shuffle className="h-3.5 w-3.5" /> Randomize
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/[0.14] backdrop-blur-sm transition-all duration-200"
                            >
                                <RotateCcw className="h-3.5 w-3.5" /> Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto min-h-0">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:h-full">
                        {/* Preview */}
                        <div className="col-span-1 lg:col-span-8 p-4 md:p-6 flex items-center justify-center min-h-[400px]"
                            style={backgroundPresets[background].style}
                        >
                            {/* Decorative background shapes */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 rounded-full bg-white/20 blur-xl" />
                                <div className="absolute bottom-1/3 right-1/4 w-40 h-40 md:w-56 md:h-56 rounded-full bg-white/10 blur-2xl" />
                                <div className="absolute top-1/2 left-1/2 w-24 h-24 md:w-36 md:h-36 rounded-full bg-white/15 blur-lg -translate-x-1/2 -translate-y-1/2" />
                            </div>

                            {/* Glass card */}
                            <motion.div
                                layout
                                className="relative w-full max-w-md z-10"
                                style={glassStyle}
                            >
                                {/* Noise overlay */}
                                {config.noise && (
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            borderRadius: `${config.borderRadius}px`,
                                            opacity: config.noiseOpacity / 100,
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                                        }}
                                    />
                                )}

                                {showContent ? (
                                    <div className="p-6 md:p-8 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                                <Droplets className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold text-sm md:text-base">Glass Card</h3>
                                                <p className="text-white/60 text-xs">Frosted glass effect</p>
                                            </div>
                                        </div>
                                        <p className="text-white/80 text-sm leading-relaxed">
                                            A beautiful frosted glass card with customizable blur, opacity, saturation, and border effects.
                                        </p>
                                        <div className="flex gap-2">
                                            <div className="px-3 py-1.5 rounded-md bg-white/10 text-white/90 text-xs font-medium">
                                                backdrop-filter
                                            </div>
                                            <div className="px-3 py-1.5 rounded-md bg-white/10 text-white/90 text-xs font-medium">
                                                CSS
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-6 md:p-8 h-48" />
                                )}
                            </motion.div>
                        </div>

                        {/* Controls Panel */}
                        <div className="col-span-1 lg:col-span-4 border-t lg:border-t-0 lg:border-l border-border overflow-auto">
                            <div className="p-4 space-y-5">
                                {/* Glass Presets */}
                                <div>
                                    <h3 className="text-xs font-semibold text-text-faint uppercase tracking-wider mb-3">Presets</h3>
                                    <div className="grid grid-cols-4 gap-1.5">
                                        {glassPresets.map((preset) => (
                                            <button
                                                key={preset.name}
                                                onClick={() => applyPreset(preset)}
                                                className={cn(
                                                    'px-2 py-1.5 rounded-md text-xs font-medium transition-colors border',
                                                    JSON.stringify(config) === JSON.stringify(preset.config)
                                                        ? 'border-ignite bg-ignite/10 text-ignite'
                                                        : 'border-border text-blush hover:text-chalk hover:border-border-light'
                                                )}
                                            >
                                                {preset.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Background */}
                                <div>
                                    <h3 className="text-xs font-semibold text-text-faint uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                        <ImageIcon className="h-3.5 w-3.5" /> Background
                                    </h3>
                                    <div className="grid grid-cols-6 gap-1.5">
                                        {backgroundPresets.map((bg, i) => (
                                            <button
                                                key={bg.name}
                                                onClick={() => setBackground(i)}
                                                className={cn(
                                                    'h-8 rounded-md border transition-all',
                                                    background === i
                                                        ? 'border-ignite ring-1 ring-ignite/30 scale-105'
                                                        : 'border-border hover:border-border-light'
                                                )}
                                                style={bg.style}
                                                title={bg.name}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Glass Controls */}
                                <div>
                                    <h3 className="text-xs font-semibold text-text-faint uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                        <Palette className="h-3.5 w-3.5" /> Glass Properties
                                    </h3>
                                    <div className="space-y-3">
                                        <Slider label="Blur" value={config.blur} min={0} max={100} unit="px"
                                            onChange={v => updateConfig('blur', v)} />
                                        <Slider label="Saturation" value={config.saturation} min={0} max={300} unit="%"
                                            onChange={v => updateConfig('saturation', v)} />
                                        <Slider label="Border Opacity" value={config.borderOpacity} min={0} max={100} unit="%"
                                            onChange={v => updateConfig('borderOpacity', v)} />
                                        <Slider label="Border Width" value={config.borderWidth} min={0} max={4} unit="px"
                                            onChange={v => updateConfig('borderWidth', v)} />
                                        <Slider label="Border Radius" value={config.borderRadius} min={0} max={40} unit="px"
                                            onChange={v => updateConfig('borderRadius', v)} />
                                    </div>
                                </div>

                                {/* Tint */}
                                <div>
                                    <h3 className="text-xs font-semibold text-text-faint uppercase tracking-wider mb-3">Tint</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <input
                                                    type="color"
                                                    value={config.tint}
                                                    onChange={e => updateConfig('tint', e.target.value)}
                                                    className="w-8 h-8 rounded-md border border-border cursor-pointer bg-transparent"
                                                />
                                            </div>
                                            <span className="text-xs font-mono text-blush">{config.tint}</span>
                                        </div>
                                        <Slider label="Tint Opacity" value={config.tintOpacity} min={0} max={60} unit="%"
                                            onChange={v => updateConfig('tintOpacity', v)} />
                                    </div>
                                </div>

                                {/* Noise */}
                                <div>
                                    <h3 className="text-xs font-semibold text-text-faint uppercase tracking-wider mb-3">Texture</h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={config.noise}
                                                onChange={e => updateConfig('noise', e.target.checked)}
                                                className="rounded border-border bg-obsidian accent-ignite"
                                            />
                                            <span className="text-xs text-blush">Noise texture</span>
                                        </label>
                                        {config.noise && (
                                            <Slider label="Noise Opacity" value={config.noiseOpacity} min={1} max={20} unit="%"
                                                onChange={v => updateConfig('noiseOpacity', v)} />
                                        )}
                                    </div>
                                </div>

                                {/* Show content toggle */}
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={showContent}
                                            onChange={e => setShowContent(e.target.checked)}
                                            className="rounded border-border bg-obsidian accent-ignite"
                                        />
                                        <span className="text-xs text-blush flex items-center gap-1">
                                            {showContent ? <Eye className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                            Show sample content
                                        </span>
                                    </label>
                                </div>

                                {/* Export */}
                                <div className="border-t border-border pt-4">
                                    <h3 className="text-xs font-semibold text-text-faint uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                        <Code className="h-3.5 w-3.5" /> Export Code
                                    </h3>
                                    <div className="rounded-lg border border-border bg-void overflow-hidden">
                                        <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
                                            <div className="flex items-center gap-1">
                                                {formatTabs.map(tab => (
                                                    <button
                                                        key={tab.key}
                                                        onClick={() => setExportFormat(tab.key)}
                                                        className={cn(
                                                            'px-2.5 py-1 rounded text-xs font-medium transition-colors',
                                                            exportFormat === tab.key
                                                                ? 'bg-ignite/10 text-ignite'
                                                                : 'text-text-faint hover:text-blush'
                                                        )}
                                                    >
                                                        {tab.label}
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                onClick={handleCopy}
                                                className="flex items-center gap-1 px-2 py-1 rounded text-xs text-blush hover:text-chalk transition-colors"
                                            >
                                                <AnimatePresence mode="wait">
                                                    {copied ? (
                                                        <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1 text-green-400">
                                                            <Check className="h-3 w-3" /> Copied
                                                        </motion.span>
                                                    ) : (
                                                        <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                                                            <Copy className="h-3 w-3" /> Copy
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </button>
                                        </div>
                                        <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-all p-3 font-mono text-xs leading-relaxed text-blush">
                                            <code>{exportOutput}</code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
