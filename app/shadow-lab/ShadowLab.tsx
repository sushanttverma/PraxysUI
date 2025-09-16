'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Copy,
    Check,
    Plus,
    Trash2,
    RotateCcw,
    Code,
    Layers,
    Eye,
    EyeOff,
    ChevronDown,
    ChevronUp,
    Sun,
} from 'lucide-react'
import Navbar from '@/app/components/Navbar'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────

interface ShadowLayer {
    id: string
    x: number       // px
    y: number       // px
    blur: number    // px
    spread: number  // px
    color: string
    opacity: number // 0–100
    inset: boolean
    visible: boolean
}

interface ShadowPreset {
    name: string
    layers: Omit<ShadowLayer, 'id'>[]
}

// ─── Presets ─────────────────────────────────────────────

const presets: ShadowPreset[] = [
    {
        name: 'Subtle',
        layers: [
            { x: 0, y: 1, blur: 3, spread: 0, color: '#000000', opacity: 10, inset: false, visible: true },
            { x: 0, y: 2, blur: 8, spread: 0, color: '#000000', opacity: 8, inset: false, visible: true },
        ],
    },
    {
        name: 'Medium',
        layers: [
            { x: 0, y: 4, blur: 6, spread: -1, color: '#000000', opacity: 12, inset: false, visible: true },
            { x: 0, y: 10, blur: 15, spread: -3, color: '#000000', opacity: 10, inset: false, visible: true },
            { x: 0, y: 20, blur: 25, spread: -5, color: '#000000', opacity: 8, inset: false, visible: true },
        ],
    },
    {
        name: 'Dramatic',
        layers: [
            { x: 0, y: 1, blur: 2, spread: 0, color: '#000000', opacity: 15, inset: false, visible: true },
            { x: 0, y: 4, blur: 8, spread: 0, color: '#000000', opacity: 12, inset: false, visible: true },
            { x: 0, y: 16, blur: 24, spread: 0, color: '#000000', opacity: 10, inset: false, visible: true },
            { x: 0, y: 48, blur: 64, spread: 0, color: '#000000', opacity: 8, inset: false, visible: true },
        ],
    },
    {
        name: 'Soft Glow',
        layers: [
            { x: 0, y: 0, blur: 20, spread: 0, color: '#E84E2D', opacity: 15, inset: false, visible: true },
            { x: 0, y: 0, blur: 60, spread: -10, color: '#E84E2D', opacity: 10, inset: false, visible: true },
        ],
    },
    {
        name: 'Neon',
        layers: [
            { x: 0, y: 0, blur: 5, spread: 0, color: '#00ff88', opacity: 40, inset: false, visible: true },
            { x: 0, y: 0, blur: 20, spread: 0, color: '#00ff88', opacity: 25, inset: false, visible: true },
            { x: 0, y: 0, blur: 60, spread: -5, color: '#00ff88', opacity: 15, inset: false, visible: true },
            { x: 0, y: 0, blur: 120, spread: -10, color: '#00ff88', opacity: 8, inset: false, visible: true },
        ],
    },
    {
        name: 'Inner Glow',
        layers: [
            { x: 0, y: 0, blur: 20, spread: 0, color: '#ffffff', opacity: 5, inset: true, visible: true },
            { x: 0, y: 2, blur: 10, spread: -2, color: '#000000', opacity: 20, inset: true, visible: true },
        ],
    },
    {
        name: 'Layered Card',
        layers: [
            { x: 0, y: 0, blur: 0, spread: 1, color: '#ffffff', opacity: 5, inset: false, visible: true },
            { x: 0, y: 1, blur: 2, spread: 0, color: '#000000', opacity: 12, inset: false, visible: true },
            { x: 0, y: 8, blur: 16, spread: -4, color: '#000000', opacity: 10, inset: false, visible: true },
            { x: 0, y: 24, blur: 48, spread: -12, color: '#000000', opacity: 8, inset: false, visible: true },
        ],
    },
    {
        name: 'Sharp',
        layers: [
            { x: 6, y: 6, blur: 0, spread: 0, color: '#E84E2D', opacity: 30, inset: false, visible: true },
        ],
    },
]

// ─── Helpers ─────────────────────────────────────────────

let idCounter = 0
function generateId(): string {
    return `shadow-${++idCounter}`
}

function hexToRgba(hex: string, opacity: number): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${(opacity / 100).toFixed(2)})`
}

function layersToCSS(layers: ShadowLayer[]): string {
    const visible = layers.filter((l) => l.visible)
    if (visible.length === 0) return 'box-shadow: none;'
    const value = visible
        .map((l) => {
            const rgba = hexToRgba(l.color, l.opacity)
            return `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${rgba}`
        })
        .join(',\n    ')
    return `box-shadow:\n    ${value};`
}

function layersToTailwind(layers: ShadowLayer[]): string {
    const visible = layers.filter((l) => l.visible)
    if (visible.length === 0) return '// No visible shadow layers'
    const value = visible
        .map((l) => {
            const rgba = hexToRgba(l.color, l.opacity)
            return `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${rgba}`
        })
        .join(', ')
    return `// Tailwind v4 arbitrary shadow\nclassName="shadow-[${value.replace(/ /g, '_')}]"\n\n// Or use inline style\nstyle={{ boxShadow: '${value}' }}`
}

function layersToBoxShadow(layers: ShadowLayer[]): string {
    const visible = layers.filter((l) => l.visible)
    if (visible.length === 0) return 'none'
    return visible
        .map((l) => {
            const rgba = hexToRgba(l.color, l.opacity)
            return `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${rgba}`
        })
        .join(', ')
}

// ─── Default layers (used as initial state) ──────────────

const defaultLayers: Omit<ShadowLayer, 'id'>[] = [
    { x: 0, y: 4, blur: 6, spread: -1, color: '#000000', opacity: 12, inset: false, visible: true },
    { x: 0, y: 10, blur: 15, spread: -3, color: '#000000', opacity: 10, inset: false, visible: true },
    { x: 0, y: 20, blur: 25, spread: -5, color: '#000000', opacity: 8, inset: false, visible: true },
]

// ─── Export Format ───────────────────────────────────────

type ExportFormat = 'css' | 'tailwind'

// ─── Component ───────────────────────────────────────────

export default function ShadowLab() {
    const [layers, setLayers] = useState<ShadowLayer[]>(() =>
        defaultLayers.map((l) => ({ ...l, id: generateId() }))
    )
    const [exportFormat, setExportFormat] = useState<ExportFormat>('css')
    const [copied, setCopied] = useState(false)
    const [expandedLayer, setExpandedLayer] = useState<string | null>(null)
    const [previewBg, setPreviewBg] = useState('#1a1a1a')
    const [previewShape, setPreviewShape] = useState<'card' | 'circle' | 'button'>('card')
    const [lightAngle, setLightAngle] = useState(180) // degrees, 180 = from top

    // ── Computed shadow ──
    const boxShadow = useMemo(() => layersToBoxShadow(layers), [layers])

    const exportOutput = useMemo(() => {
        switch (exportFormat) {
            case 'css':
                return layersToCSS(layers)
            case 'tailwind':
                return layersToTailwind(layers)
        }
    }, [layers, exportFormat])

    // ── Layer CRUD ──
    const addLayer = useCallback(() => {
        if (layers.length >= 6) return
        setLayers((prev) => [
            ...prev,
            {
                id: generateId(),
                x: 0,
                y: 4,
                blur: 12,
                spread: 0,
                color: '#000000',
                opacity: 15,
                inset: false,
                visible: true,
            },
        ])
    }, [layers.length])

    const removeLayer = useCallback((id: string) => {
        setLayers((prev) => prev.filter((l) => l.id !== id))
    }, [])

    const updateLayer = useCallback(
        (id: string, updates: Partial<Omit<ShadowLayer, 'id'>>) => {
            setLayers((prev) =>
                prev.map((l) => (l.id === id ? { ...l, ...updates } : l))
            )
        },
        []
    )

    const toggleVisibility = useCallback((id: string) => {
        setLayers((prev) =>
            prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
        )
    }, [])

    // ── Preset apply ──
    const applyPreset = useCallback((preset: ShadowPreset) => {
        setLayers(preset.layers.map((l) => ({ ...l, id: generateId() })))
        setExpandedLayer(null)
    }, [])

    // ── Reset ──
    const handleReset = useCallback(() => {
        setLayers([])
        setExpandedLayer(null)
    }, [])

    // ── Apply light direction ──
    const applyLightDirection = useCallback((angle: number) => {
        setLightAngle(angle)
        const rad = (angle * Math.PI) / 180
        setLayers((prev) =>
            prev.map((l) => {
                if (l.inset) return l
                const magnitude = Math.sqrt(l.x * l.x + l.y * l.y) || 6
                return {
                    ...l,
                    x: Math.round(Math.sin(rad) * magnitude),
                    y: Math.round(Math.cos(rad) * magnitude),
                }
            })
        )
    }, [])

    // ── Copy ──
    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(exportOutput)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [exportOutput])

    // ── Format tabs ──
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
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, hsla(230, 50%, 35%, 0.2) 0%, transparent 100%)' }} />
                </div>

                {/* Glass header */}
                <div className="flex-shrink-0 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-xl px-4 md:px-6 pt-4 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-chalk flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] border border-white/[0.1]">
                                    <Layers className="h-4 w-4 text-blue-400" />
                                </div>
                                Shadow Lab
                            </h1>
                            <p className="text-xs md:text-sm text-white/35 mt-1 pl-10">
                                Stack multiple shadow layers for ultra-premium depth
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/[0.14] backdrop-blur-sm transition-all duration-200"
                            >
                                <RotateCcw className="h-3.5 w-3.5" /> Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-auto min-h-0">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
                            {/* ── Left: Preview + Export ── */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="min-w-0 space-y-6"
                            >
                                {/* Preview */}
                                <div className="relative overflow-hidden rounded-2xl border border-border">
                                    {/* Top bar */}
                                    <div className="flex items-center justify-between border-b border-border bg-obsidian/60 px-4 py-3 backdrop-blur-sm">
                                        <span className="text-xs font-semibold uppercase tracking-widest text-text-faint">
                                            Preview
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {/* Shape selector */}
                                            {(['card', 'circle', 'button'] as const).map((shape) => (
                                                <button
                                                    key={shape}
                                                    onClick={() => setPreviewShape(shape)}
                                                    className={cn(
                                                        'rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-all',
                                                        previewShape === shape
                                                            ? 'bg-ignite/10 text-ignite border border-ignite/20'
                                                            : 'text-text-faint hover:text-blush border border-transparent'
                                                    )}
                                                >
                                                    {shape}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Preview area */}
                                    <div
                                        className="flex items-center justify-center p-12 sm:p-20 transition-colors duration-300"
                                        style={{ backgroundColor: previewBg }}
                                    >
                                        {/* Grid pattern */}
                                        <div
                                            className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                            style={{
                                                backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                                                backgroundSize: '40px 40px',
                                            }}
                                        />

                                        <motion.div
                                            layout
                                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                            className={cn(
                                                'relative z-10 transition-all duration-300',
                                                previewShape === 'card' && 'w-72 h-44 rounded-2xl bg-obsidian border border-border',
                                                previewShape === 'circle' && 'w-40 h-40 rounded-full bg-obsidian border border-border',
                                                previewShape === 'button' && 'px-8 py-3 rounded-xl bg-ignite text-white font-semibold text-sm'
                                            )}
                                            style={{ boxShadow }}
                                        >
                                            {previewShape === 'card' && (
                                                <div className="flex h-full flex-col items-center justify-center gap-2 p-6">
                                                    <div className="h-3 w-20 rounded-full bg-border" />
                                                    <div className="h-2 w-32 rounded-full bg-border/60" />
                                                    <div className="mt-3 h-2 w-24 rounded-full bg-border/40" />
                                                </div>
                                            )}
                                            {previewShape === 'button' && (
                                                <span>Get Started</span>
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Background toggle */}
                                    <div className="flex items-center gap-3 border-t border-border bg-obsidian/40 px-4 py-2.5">
                                        <span className="text-[10px] text-text-faint uppercase tracking-wide">Background</span>
                                        <div className="flex gap-1.5">
                                            {['#1a1a1a', '#ffffff', '#0f172a', '#fafaf8', '#000000'].map((bg) => (
                                                <button
                                                    key={bg}
                                                    onClick={() => setPreviewBg(bg)}
                                                    className={cn(
                                                        'h-5 w-5 rounded-full border-2 transition-transform hover:scale-110',
                                                        previewBg === bg ? 'border-ignite scale-110' : 'border-border'
                                                    )}
                                                    style={{ backgroundColor: bg }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Export code */}
                                <div className="overflow-hidden rounded-xl border border-border bg-obsidian">
                                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            {formatTabs.map((fmt) => (
                                                <button
                                                    key={fmt.key}
                                                    onClick={() => {
                                                        setExportFormat(fmt.key)
                                                        setCopied(false)
                                                    }}
                                                    className={cn(
                                                        'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all border',
                                                        exportFormat === fmt.key
                                                            ? 'bg-ignite/10 text-ignite border-ignite/20'
                                                            : 'text-text-faint hover:text-blush border-transparent'
                                                    )}
                                                >
                                                    <Code className="h-3.5 w-3.5" />
                                                    {fmt.label}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={handleCopy}
                                            className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
                                        >
                                            {copied ? (
                                                <><Check className="h-3 w-3 text-green-400" /> Copied</>
                                            ) : (
                                                <><Copy className="h-3 w-3" /> Copy</>
                                            )}
                                        </button>
                                    </div>
                                    <pre className="max-h-52 overflow-auto whitespace-pre-wrap break-all p-4 font-mono text-xs leading-relaxed text-blush">
                                        <code>{exportOutput}</code>
                                    </pre>
                                </div>
                            </motion.div>

                            {/* ── Right: Controls ── */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-5"
                            >
                                {/* Actions bar */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={addLayer}
                                        disabled={layers.length >= 6}
                                        className={cn(
                                            'flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors',
                                            layers.length >= 6
                                                ? 'border-border text-text-faint cursor-not-allowed'
                                                : 'border-ignite/30 bg-ignite/5 text-ignite hover:bg-ignite/10'
                                        )}
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        Add Layer ({layers.length}/6)
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
                                    >
                                        <RotateCcw className="h-3.5 w-3.5" />
                                    </button>
                                </div>

                                {/* Light Direction */}
                                <div className="rounded-xl border border-border bg-obsidian/50 p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sun className="h-3.5 w-3.5 text-text-faint" />
                                        <span className="text-xs font-medium text-chalk">Light Direction</span>
                                        <span className="ml-auto text-[10px] text-text-faint">{lightAngle}°</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="relative w-24 h-24">
                                            {/* Circular track */}
                                            <div className="absolute inset-0 rounded-full border border-border" />
                                            {/* Direction presets */}
                                            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                                                const rad = (angle * Math.PI) / 180
                                                const x = 50 + Math.sin(rad) * 42
                                                const y = 50 - Math.cos(rad) * 42
                                                return (
                                                    <button
                                                        key={angle}
                                                        onClick={() => applyLightDirection(angle)}
                                                        className={cn(
                                                            'absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all',
                                                            Math.abs(lightAngle - angle) < 23
                                                                ? 'bg-ignite scale-125'
                                                                : 'bg-border hover:bg-border-light'
                                                        )}
                                                        style={{ left: `${x}%`, top: `${y}%` }}
                                                    />
                                                )
                                            })}
                                            {/* Center indicator */}
                                            <div className="absolute inset-0 pointer-events-none">
                                                <div
                                                    className="absolute left-1/2 w-1 h-8 rounded-full bg-ignite/40"
                                                    style={{
                                                        bottom: '50%',
                                                        transform: `translateX(-50%) rotate(${lightAngle}deg)`,
                                                        transformOrigin: '50% 100%',
                                                    }}
                                                />
                                                <div className="absolute left-1/2 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text-faint" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shadow Layers */}
                                <div className="space-y-2">
                                    <AnimatePresence mode="popLayout">
                                        {layers.map((layer, idx) => (
                                            <motion.div
                                                key={layer.id}
                                                layout
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden rounded-xl border border-border bg-obsidian/50"
                                            >
                                                {/* Layer header */}
                                                <div className="flex items-center gap-2 px-3 py-2.5">
                                                    <div
                                                        className="h-3 w-3 rounded-full border border-border"
                                                        style={{ backgroundColor: layer.color + Math.round(layer.opacity * 2.55).toString(16).padStart(2, '0') }}
                                                    />
                                                    <span className="flex-1 text-xs font-medium text-chalk">
                                                        Layer {idx + 1}
                                                        {layer.inset && (
                                                            <span className="ml-1.5 text-[9px] text-text-faint bg-void px-1 py-0.5 rounded">
                                                                inset
                                                            </span>
                                                        )}
                                                    </span>
                                                    <button
                                                        onClick={() => toggleVisibility(layer.id)}
                                                        className="p-1 text-text-faint hover:text-blush transition-colors"
                                                    >
                                                        {layer.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                                                    </button>
                                                    <button
                                                        onClick={() => setExpandedLayer(expandedLayer === layer.id ? null : layer.id)}
                                                        className="p-1 text-text-faint hover:text-blush transition-colors"
                                                    >
                                                        {expandedLayer === layer.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                                                    </button>
                                                    <button
                                                        onClick={() => removeLayer(layer.id)}
                                                        className="p-1 text-text-faint hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </button>
                                                </div>

                                                {/* Expanded controls */}
                                                <AnimatePresence>
                                                    {expandedLayer === layer.id && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="border-t border-border"
                                                        >
                                                            <div className="space-y-3 p-3">
                                                                {/* Color + Inset */}
                                                                <div className="flex items-center gap-3">
                                                                    <label className="flex items-center gap-2">
                                                                        <input
                                                                            type="color"
                                                                            value={layer.color}
                                                                            onChange={(e) => updateLayer(layer.id, { color: e.target.value })}
                                                                            className="h-7 w-7 cursor-pointer rounded border border-border bg-transparent"
                                                                        />
                                                                        <span className="text-[10px] font-mono text-text-faint">{layer.color}</span>
                                                                    </label>
                                                                    <label className="ml-auto flex items-center gap-1.5 text-[10px] text-text-faint cursor-pointer">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={layer.inset}
                                                                            onChange={(e) => updateLayer(layer.id, { inset: e.target.checked })}
                                                                            className="accent-ignite"
                                                                        />
                                                                        Inset
                                                                    </label>
                                                                </div>

                                                                {/* Sliders */}
                                                                {[
                                                                    { label: 'X', key: 'x' as const, min: -50, max: 50, value: layer.x },
                                                                    { label: 'Y', key: 'y' as const, min: -50, max: 50, value: layer.y },
                                                                    { label: 'Blur', key: 'blur' as const, min: 0, max: 100, value: layer.blur },
                                                                    { label: 'Spread', key: 'spread' as const, min: -30, max: 30, value: layer.spread },
                                                                    { label: 'Opacity', key: 'opacity' as const, min: 0, max: 100, value: layer.opacity },
                                                                ].map((ctrl) => (
                                                                    <div key={ctrl.key} className="flex items-center gap-3">
                                                                        <span className="w-12 text-[10px] font-medium text-text-faint">{ctrl.label}</span>
                                                                        <input
                                                                            type="range"
                                                                            min={ctrl.min}
                                                                            max={ctrl.max}
                                                                            value={ctrl.value}
                                                                            onChange={(e) =>
                                                                                updateLayer(layer.id, { [ctrl.key]: Number(e.target.value) })
                                                                            }
                                                                            className="slider-thumb h-1.5 flex-1 cursor-pointer rounded-full bg-border accent-ignite"
                                                                        />
                                                                        <span className="w-8 text-right text-[10px] font-mono text-text-faint">
                                                                            {ctrl.value}{ctrl.key === 'opacity' ? '%' : 'px'}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {layers.length === 0 && (
                                        <div className="rounded-xl border border-dashed border-border p-8 text-center">
                                            <p className="text-xs text-text-faint">
                                                No shadow layers. Click &quot;Add Layer&quot; or choose a preset.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Presets */}
                                <div className="rounded-xl border border-border bg-obsidian/50 p-4">
                                    <h3 className="mb-3 text-xs font-medium text-chalk">Presets</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {presets.map((preset) => (
                                            <button
                                                key={preset.name}
                                                onClick={() => applyPreset(preset)}
                                                className="group flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-left transition-all hover:border-border-light hover:bg-void/50"
                                            >
                                                {/* Mini preview */}
                                                <div
                                                    className="h-6 w-6 flex-shrink-0 rounded bg-obsidian border border-border"
                                                    style={{
                                                        boxShadow: preset.layers
                                                            .filter((l) => l.visible)
                                                            .map(
                                                                (l) =>
                                                                    `${l.inset ? 'inset ' : ''}${l.x * 0.3}px ${l.y * 0.3}px ${l.blur * 0.3}px ${l.spread * 0.3}px ${hexToRgba(l.color, l.opacity)}`
                                                            )
                                                            .join(', '),
                                                    }}
                                                />
                                                <span className="text-[10px] font-medium text-blush group-hover:text-chalk transition-colors">
                                                    {preset.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
