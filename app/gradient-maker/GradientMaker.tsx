'use client'

import React, { useState, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Copy,
    Check,
    Maximize2,
    Minimize2,
    Plus,
    Trash2,
    RotateCcw,
    Shuffle,
    Code,
    Image as ImageIcon,
} from 'lucide-react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

// ─── Types ───────────────────────────────────────────────

interface ColorBlob {
    id: string
    color: string
    x: number // 0–100
    y: number // 0–100
    size: number // 20–100 (percent of canvas)
}

interface GradientPreset {
    name: string
    background: string
    blobs: Omit<ColorBlob, 'id'>[]
}

// ─── Presets ─────────────────────────────────────────────

const presets: GradientPreset[] = [
    {
        name: 'Amethyst Dream',
        background: '#1a0a2e',
        blobs: [
            { color: '#7b2ff7', x: 30, y: 20, size: 70 },
            { color: '#c850c0', x: 60, y: 50, size: 60 },
            { color: '#f0d0ff', x: 50, y: 85, size: 55 },
            { color: '#4a0e78', x: 80, y: 15, size: 50 },
        ],
    },
    {
        name: 'Solar Flare',
        background: '#0d0500',
        blobs: [
            { color: '#ff4500', x: 55, y: 40, size: 65 },
            { color: '#ff8c00', x: 35, y: 65, size: 60 },
            { color: '#ff1493', x: 75, y: 70, size: 55 },
            { color: '#ffd700', x: 25, y: 90, size: 45 },
        ],
    },
    {
        name: 'Aurora',
        background: '#0a0020',
        blobs: [
            { color: '#2d1b69', x: 40, y: 15, size: 65 },
            { color: '#c850c0', x: 55, y: 45, size: 60 },
            { color: '#ff9de2', x: 45, y: 75, size: 55 },
            { color: '#ffcba4', x: 60, y: 90, size: 45 },
            { color: '#4a0e78', x: 25, y: 30, size: 50 },
        ],
    },
    {
        name: 'Ember Glow',
        background: '#050000',
        blobs: [
            { color: '#8b2500', x: 40, y: 25, size: 70 },
            { color: '#ff6a00', x: 50, y: 55, size: 65 },
            { color: '#ffa940', x: 45, y: 80, size: 55 },
            { color: '#fff5e6', x: 50, y: 95, size: 40 },
        ],
    },
    {
        name: 'Ocean Depth',
        background: '#000a14',
        blobs: [
            { color: '#003366', x: 30, y: 20, size: 70 },
            { color: '#0077b6', x: 60, y: 45, size: 60 },
            { color: '#00b4d8', x: 45, y: 70, size: 55 },
            { color: '#90e0ef', x: 55, y: 90, size: 45 },
        ],
    },
    {
        name: 'Rose Gold',
        background: '#1a0a10',
        blobs: [
            { color: '#b76e79', x: 35, y: 30, size: 65 },
            { color: '#e8a0bf', x: 60, y: 55, size: 60 },
            { color: '#fdd5b1', x: 50, y: 80, size: 50 },
            { color: '#fff0db', x: 45, y: 95, size: 40 },
        ],
    },
    {
        name: 'Midnight Bloom',
        background: '#05000a',
        blobs: [
            { color: '#2a0845', x: 35, y: 15, size: 70 },
            { color: '#6a0dad', x: 55, y: 40, size: 65 },
            { color: '#e040fb', x: 50, y: 65, size: 55 },
            { color: '#ff80ab', x: 60, y: 85, size: 45 },
        ],
    },
    {
        name: 'Sunset Coast',
        background: '#0a0200',
        blobs: [
            { color: '#ff6b35', x: 40, y: 25, size: 65 },
            { color: '#f7931e', x: 55, y: 50, size: 60 },
            { color: '#ffcd69', x: 45, y: 75, size: 55 },
            { color: '#fff5e1', x: 50, y: 90, size: 45 },
        ],
    },
    {
        name: 'Northern Lights',
        background: '#000510',
        blobs: [
            { color: '#00ff87', x: 30, y: 30, size: 60 },
            { color: '#60efff', x: 55, y: 50, size: 55 },
            { color: '#0061ff', x: 70, y: 25, size: 65 },
            { color: '#7b2ff7', x: 40, y: 70, size: 50 },
        ],
    },
    {
        name: 'Velvet Night',
        background: '#050008',
        blobs: [
            { color: '#1a0033', x: 35, y: 20, size: 75 },
            { color: '#4a0080', x: 55, y: 45, size: 65 },
            { color: '#8f00ff', x: 50, y: 70, size: 55 },
            { color: '#da70d6', x: 60, y: 90, size: 40 },
        ],
    },
    {
        name: 'Coral Reef',
        background: '#000a0a',
        blobs: [
            { color: '#ff6f61', x: 40, y: 30, size: 60 },
            { color: '#ffb997', x: 60, y: 55, size: 55 },
            { color: '#40e0d0', x: 35, y: 70, size: 50 },
            { color: '#ffe5d9', x: 55, y: 85, size: 45 },
        ],
    },
    {
        name: 'Lavender Haze',
        background: '#0a0510',
        blobs: [
            { color: '#e6e6fa', x: 45, y: 30, size: 65 },
            { color: '#dcd0ff', x: 55, y: 55, size: 60 },
            { color: '#b0a0e0', x: 40, y: 75, size: 55 },
            { color: '#8070c0', x: 60, y: 20, size: 50 },
        ],
    },
]

// ─── Helpers ─────────────────────────────────────────────

let idCounter = 0
function generateId(): string {
    return `blob-${Date.now()}-${idCounter++}`
}

function blobsToCSS(blobs: ColorBlob[], background: string): string {
    if (blobs.length === 0) return `background: ${background};`

    const layers = blobs
        .map(
            (b) =>
                `radial-gradient(circle at ${b.x}% ${b.y}%, ${b.color} 0%, transparent ${b.size}%)`
        )
        .join(',\n    ')

    return `background: ${background};\nbackground-image:\n    ${layers};`
}

function blobsToTailwind(blobs: ColorBlob[], background: string): string {
    return `{/* Use inline styles for mesh gradients — Tailwind doesn't support multiple radial-gradient layers */}
<div
  className="w-full h-full"
  style={{
    background: '${background}',
    backgroundImage: [
${blobs
            .map(
                (b) =>
                    `      'radial-gradient(circle at ${b.x}% ${b.y}%, ${b.color} 0%, transparent ${b.size}%)'`
            )
            .join(',\n')}
    ].join(', '),
  }}
/>`
}

function blobsToSVG(
    blobs: ColorBlob[],
    background: string,
    width = 800,
    height = 600
): string {
    const circles = blobs
        .map((b) => {
            const cx = (b.x / 100) * width
            const cy = (b.y / 100) * height
            const r = (b.size / 100) * Math.max(width, height)
            return `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${b.color}" opacity="0.8" />`
        })
        .join('\n')

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${background}" />
  <g filter="url(#mesh-blur)">
${circles}
  </g>
  <defs>
    <filter id="mesh-blur">
      <feGaussianBlur stdDeviation="80" />
    </filter>
  </defs>
</svg>`
}

// ─── Default State ───────────────────────────────────────



// ─── Export Format Type ──────────────────────────────────

type ExportFormat = 'css' | 'tailwind' | 'svg'

// ─── Component ───────────────────────────────────────────

export default function GradientMaker() {
    const [blobs, setBlobs] = useState<ColorBlob[]>([])
    const [background, setBackground] = useState('#0a0a0a')
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [exportFormat, setExportFormat] = useState<ExportFormat>('css')
    const [copied, setCopied] = useState(false)
    const [activeBlob, setActiveBlob] = useState<string | null>(null)
    const [draggingBlob, setDraggingBlob] = useState<string | null>(null)
    const canvasRef = useRef<HTMLDivElement>(null)

    // ── Gradient style ──
    const gradientStyle = useMemo<React.CSSProperties>(() => {
        if (blobs.length === 0) return { backgroundColor: background }
        const layers = blobs
            .map(
                (b) =>
                    `radial-gradient(circle at ${b.x}% ${b.y}%, ${b.color} 0%, transparent ${b.size}%)`
            )
            .join(', ')
        return {
            backgroundColor: background,
            backgroundImage: layers,
        }
    }, [blobs, background])

    // ── Export output ──
    const exportOutput = useMemo(() => {
        switch (exportFormat) {
            case 'css':
                return blobsToCSS(blobs, background)
            case 'tailwind':
                return blobsToTailwind(blobs, background)
            case 'svg':
                return blobsToSVG(blobs, background)
        }
    }, [blobs, background, exportFormat])

    // ── Blob CRUD ──
    const addBlob = useCallback(() => {
        if (blobs.length >= 6) return
        const newBlob: ColorBlob = {
            id: generateId(),
            color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
            x: 30 + Math.floor(Math.random() * 40),
            y: 30 + Math.floor(Math.random() * 40),
            size: 50,
        }
        // Convert HSL string to hex for consistency
        const tempEl = document.createElement('div')
        tempEl.style.color = newBlob.color
        document.body.appendChild(tempEl)
        const computed = getComputedStyle(tempEl).color
        document.body.removeChild(tempEl)
        const match = computed.match(/\d+/g)
        if (match) {
            const [r, g, b] = match.map(Number)
            newBlob.color = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
        }
        setBlobs((prev) => [...prev, newBlob])
        setActiveBlob(newBlob.id)
    }, [blobs.length])

    const removeBlob = useCallback(
        (id: string) => {
            setBlobs((prev) => prev.filter((b) => b.id !== id))
            if (activeBlob === id) setActiveBlob(null)
        },
        [activeBlob]
    )

    const updateBlob = useCallback(
        (id: string, updates: Partial<Omit<ColorBlob, 'id'>>) => {
            setBlobs((prev) =>
                prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
            )
        },
        []
    )

    // ── Preset apply ──
    const applyPreset = useCallback((preset: GradientPreset) => {
        setBackground(preset.background)
        setBlobs(preset.blobs.map((b) => ({ ...b, id: generateId() })))
        setActiveBlob(null)
    }, [])

    // ── Randomize ──
    const randomize = useCallback(() => {
        const count = 3 + Math.floor(Math.random() * 3)
        const hueBase = Math.floor(Math.random() * 360)
        const newBlobs: ColorBlob[] = Array.from({ length: count }, (_, i) => {
            const hue = (hueBase + i * (360 / count) + Math.floor(Math.random() * 30)) % 360
            const sat = 60 + Math.floor(Math.random() * 30)
            const light = 40 + Math.floor(Math.random() * 40)
            // Convert HSL to hex
            const s = sat / 100
            const l = light / 100
            const c = (1 - Math.abs(2 * l - 1)) * s
            const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
            const m = l - c / 2
            let r = 0, g = 0, b = 0
            if (hue < 60) { r = c; g = x }
            else if (hue < 120) { r = x; g = c }
            else if (hue < 180) { g = c; b = x }
            else if (hue < 240) { g = x; b = c }
            else if (hue < 300) { r = x; b = c }
            else { r = c; b = x }
            const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0')
            return {
                id: generateId(),
                color: `#${toHex(r)}${toHex(g)}${toHex(b)}`,
                x: 15 + Math.floor(Math.random() * 70),
                y: 15 + Math.floor(Math.random() * 70),
                size: 40 + Math.floor(Math.random() * 35),
            }
        })
        // Dark background from the dominant hue
        const bgL = 2 + Math.floor(Math.random() * 5)
        const bgS = 20 + Math.floor(Math.random() * 20)
        const bgs = bgS / 100
        const bgl = bgL / 100
        const bgc = (1 - Math.abs(2 * bgl - 1)) * bgs
        const bgx = bgc * (1 - Math.abs(((hueBase / 60) % 2) - 1))
        const bgm = bgl - bgc / 2
        let br = 0, bg2 = 0, bb = 0
        if (hueBase < 60) { br = bgc; bg2 = bgx }
        else if (hueBase < 120) { br = bgx; bg2 = bgc }
        else if (hueBase < 180) { bg2 = bgc; bb = bgx }
        else if (hueBase < 240) { bg2 = bgx; bb = bgc }
        else if (hueBase < 300) { br = bgx; bb = bgc }
        else { br = bgc; bb = bgx }
        const toHex = (n: number) => Math.round((n + bgm) * 255).toString(16).padStart(2, '0')
        setBackground(`#${toHex(br)}${toHex(bg2)}${toHex(bb)}`)
        setBlobs(newBlobs)
        setActiveBlob(null)
    }, [])

    // ── Reset ──
    const handleReset = useCallback(() => {
        setBlobs([])
        setBackground('#0a0a0a')
        setActiveBlob(null)
    }, [])

    // ── Copy ──
    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(exportOutput)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [exportOutput])

    // ── Download PNG ──
    const handleDownloadPNG = useCallback(() => {
        const canvas = document.createElement('canvas')
        const w = 1920
        const h = 1080
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Draw background
        ctx.fillStyle = background
        ctx.fillRect(0, 0, w, h)

        // Draw each blob as a radial gradient
        for (const blob of blobs) {
            const cx = (blob.x / 100) * w
            const cy = (blob.y / 100) * h
            const r = (blob.size / 100) * Math.max(w, h)
            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
            gradient.addColorStop(0, blob.color)
            gradient.addColorStop(1, 'transparent')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, w, h)
        }

        const link = document.createElement('a')
        link.download = 'praxys-gradient.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
    }, [blobs, background])

    // ── Fullscreen ──
    const toggleFullscreen = useCallback(() => {
        setIsFullscreen((prev) => !prev)
    }, [])

    // ── Drag handling ──
    const getCanvasPercent = useCallback(
        (clientX: number, clientY: number): { x: number; y: number } | null => {
            if (!canvasRef.current) return null
            const rect = canvasRef.current.getBoundingClientRect()
            const x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
            const y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100))
            return { x: Math.round(x), y: Math.round(y) }
        },
        []
    )

    const handlePointerDown = useCallback(
        (e: React.PointerEvent, blobId: string) => {
            e.preventDefault()
            e.stopPropagation()
                ; (e.target as HTMLElement).setPointerCapture(e.pointerId)
            setDraggingBlob(blobId)
            setActiveBlob(blobId)
        },
        []
    )

    const handlePointerMove = useCallback(
        (e: React.PointerEvent) => {
            if (!draggingBlob) return
            const pos = getCanvasPercent(e.clientX, e.clientY)
            if (pos) {
                updateBlob(draggingBlob, { x: pos.x, y: pos.y })
            }
        },
        [draggingBlob, getCanvasPercent, updateBlob]
    )

    const handlePointerUp = useCallback(() => {
        setDraggingBlob(null)
    }, [])

    const handleCanvasClick = useCallback(
        (e: React.MouseEvent) => {
            // Don't create a new blob if we just finished dragging
            if (draggingBlob) return
            if (blobs.length >= 6) return
            const pos = getCanvasPercent(e.clientX, e.clientY)
            if (!pos) return
            const hue = Math.floor(Math.random() * 360)
            const newBlob: ColorBlob = {
                id: generateId(),
                color: `hsl(${hue}, 70%, 60%)`,
                x: pos.x,
                y: pos.y,
                size: 50,
            }
            // Convert HSL → hex
            const tempEl = document.createElement('div')
            tempEl.style.color = newBlob.color
            document.body.appendChild(tempEl)
            const computed = getComputedStyle(tempEl).color
            document.body.removeChild(tempEl)
            const match = computed.match(/\d+/g)
            if (match) {
                const [r, g, b] = match.map(Number)
                newBlob.color = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
            }
            setBlobs((prev) => [...prev, newBlob])
            setActiveBlob(newBlob.id)
        },
        [blobs.length, draggingBlob, getCanvasPercent]
    )

    // ── Format tabs ──
    const formatTabs: { key: ExportFormat; label: string; icon: React.ReactNode }[] = [
        { key: 'css', label: 'CSS', icon: <Code className="h-3.5 w-3.5" /> },
        { key: 'tailwind', label: 'Tailwind', icon: <Code className="h-3.5 w-3.5" /> },
        { key: 'svg', label: 'SVG', icon: <Code className="h-3.5 w-3.5" /> },
    ]

    return (
        <>
            <Navbar />

            {/* ── Fullscreen overlay ── */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black"
                    >
                        <div
                            className="absolute inset-0"
                            style={gradientStyle}
                        />
                        <button
                            onClick={toggleFullscreen}
                            className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
                        >
                            <Minimize2 className="h-5 w-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <main id="main-content" className="min-h-screen overflow-x-hidden">
                <div className="mx-auto max-w-7xl px-6 pt-24 pb-20">
                    {/* Editorial header */}
                    <div className="mb-10">
                        <div className="flex items-end justify-between gap-4">
                            <div className="min-w-0">
                                <p className="font-mono text-[10px] text-text-faint tracking-wider mb-1">{"// tools / gradient-maker"}</p>
                                <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl font-bold text-chalk leading-none">Gradient Maker</h1>
                            </div>
                        </div>
                        {/* Accent gradient line */}
                        <div className="mt-4 h-px w-full" style={{ background: 'linear-gradient(90deg, #f59e0b, #f59e0b 30%, transparent)' }} />
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:gap-8">
                        {/* ── Left: Preview + Export ── */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="min-w-0 space-y-6"
                        >
                            {/* Preview canvas */}
                            <div className="relative overflow-hidden rounded-2xl border border-border bg-black">
                                {/* Top bar */}
                                <div className="flex items-center justify-between border-b border-white/10 bg-black/60 px-4 py-3 backdrop-blur-sm">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                                        Preview
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleDownloadPNG}
                                            className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                                        >
                                            <ImageIcon className="h-3 w-3" />
                                            PNG
                                        </button>
                                        <button
                                            onClick={toggleFullscreen}
                                            className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                                        >
                                            <Maximize2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Gradient display */}
                                <div className="relative flex items-center justify-center p-4 sm:p-8 md:p-12">
                                    {/* Starfield dots */}
                                    <div className="absolute inset-0 overflow-hidden">
                                        {Array.from({ length: 30 }).map((_, i) => {
                                            // Deterministic pseudo-random positions to avoid hydration mismatch
                                            const seed = (i * 7919 + 104729) % 100
                                            const seed2 = (i * 6271 + 73477) % 100
                                            const opSeed = ((i * 3571 + 15473) % 35) / 100
                                            return (
                                                <div
                                                    key={i}
                                                    className="absolute h-px w-px rounded-full bg-white"
                                                    style={{
                                                        left: `${seed}%`,
                                                        top: `${seed2}%`,
                                                        opacity: 0.15 + opSeed,
                                                    }}
                                                />
                                            )
                                        })}
                                    </div>

                                    <div
                                        ref={canvasRef}
                                        className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-2xl sm:aspect-[4/3] sm:max-w-2xl"
                                        style={{
                                            ...gradientStyle,
                                            boxShadow: '0 0 80px -20px rgba(255,255,255,0.1), 0 25px 50px -12px rgba(0,0,0,0.5)',
                                            cursor: draggingBlob ? 'grabbing' : blobs.length < 6 ? 'crosshair' : 'default',
                                            touchAction: 'none',
                                        }}
                                        onPointerMove={handlePointerMove}
                                        onPointerUp={handlePointerUp}
                                        onPointerLeave={handlePointerUp}
                                        onClick={handleCanvasClick}
                                    >
                                        {/* Glass border effect */}
                                        <div
                                            className="pointer-events-none absolute inset-0 rounded-2xl"
                                            style={{
                                                border: '1px solid rgba(255,255,255,0.12)',
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
                                            }}
                                        />

                                        {/* Hint text */}
                                        {blobs.length === 0 && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <p className="text-xs text-white/30">Click anywhere to add a color blob</p>
                                            </div>
                                        )}

                                        {/* Mesh wireframe overlay */}
                                        <svg
                                            className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
                                            viewBox="0 0 100 100"
                                            preserveAspectRatio="none"
                                        >
                                            {/* Connection lines between points */}
                                            {blobs.map((blob, i) => {
                                                // Connect to the 2-3 nearest blobs
                                                const distances = blobs
                                                    .map((other, j) => ({
                                                        j,
                                                        dist: Math.hypot(other.x - blob.x, other.y - blob.y),
                                                    }))
                                                    .filter((d) => d.j !== i)
                                                    .sort((a, b) => a.dist - b.dist)
                                                    .slice(0, 3)

                                                return distances.map(({ j }) => {
                                                    // Only draw line once (from lower index to higher)
                                                    if (i > j) return null
                                                    const other = blobs[j]
                                                    const isEitherActive =
                                                        activeBlob === blob.id ||
                                                        activeBlob === other.id ||
                                                        draggingBlob === blob.id ||
                                                        draggingBlob === other.id
                                                    return (
                                                        <line
                                                            key={`${blob.id}-${other.id}`}
                                                            x1={blob.x}
                                                            y1={blob.y}
                                                            x2={other.x}
                                                            y2={other.y}
                                                            stroke={isEitherActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)'}
                                                            strokeWidth={isEitherActive ? 0.3 : 0.15}
                                                            vectorEffect="non-scaling-stroke"
                                                            style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                                                        />
                                                    )
                                                })
                                            })}
                                        </svg>

                                        {/* Draggable mesh control points */}
                                        {blobs.map((blob) => {
                                            const isActive = activeBlob === blob.id || draggingBlob === blob.id
                                            return (
                                                <div
                                                    key={blob.id}
                                                    onPointerDown={(e) => handlePointerDown(e, blob.id)}
                                                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                                                    style={{
                                                        left: `${blob.x}%`,
                                                        top: `${blob.y}%`,
                                                        cursor: draggingBlob === blob.id ? 'grabbing' : 'grab',
                                                    }}
                                                >
                                                    {/* Outer glow ring */}
                                                    {isActive && (
                                                        <div
                                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                                            style={{
                                                                width: 22,
                                                                height: 22,
                                                                background: `radial-gradient(circle, ${blob.color}40 0%, transparent 70%)`,
                                                            }}
                                                        />
                                                    )}

                                                    {/* Control point dot */}
                                                    <div
                                                        className={`rounded-full transition-all duration-150 ${isActive
                                                            ? 'h-3 w-3 shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                                                            : 'h-2 w-2 hover:h-2.5 hover:w-2.5 hover:shadow-[0_0_6px_rgba(255,255,255,0.3)]'
                                                            }`}
                                                        style={{
                                                            backgroundColor: blob.color,
                                                            border: isActive ? '1.5px solid rgba(255,255,255,0.9)' : '1px solid rgba(255,255,255,0.5)',
                                                        }}
                                                    />

                                                    {/* Label tooltip */}
                                                    {isActive && (
                                                        <div
                                                            className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-1.5 py-0.5 text-[8px] font-mono text-white/90 backdrop-blur-md"
                                                            style={{ border: `1px solid ${blob.color}50` }}
                                                        >
                                                            {blob.x}%, {blob.y}%
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Export code */}
                            <div className="overflow-hidden rounded-xl border border-border bg-obsidian">
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
                                    <div className="flex flex-wrap items-center gap-1">
                                        {formatTabs.map((fmt) => (
                                            <button
                                                key={fmt.key}
                                                onClick={() => {
                                                    setExportFormat(fmt.key)
                                                    setCopied(false)
                                                }}
                                                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all ${exportFormat === fmt.key
                                                    ? 'bg-ignite/10 text-ignite border border-ignite/20'
                                                    : 'text-text-faint hover:text-blush border border-transparent'
                                                    }`}
                                            >
                                                {fmt.icon}
                                                <span>{fmt.label}</span>
                                            </button>
                                        ))}
                                    </div>
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
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={randomize}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-ignite/30 bg-ignite/5 px-3 py-2.5 text-xs font-medium text-ignite transition-colors hover:bg-ignite/10"
                                >
                                    <Shuffle className="h-3.5 w-3.5" />
                                    Randomize
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-medium text-blush transition-colors hover:border-border-light hover:text-chalk"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    Reset
                                </button>
                            </div>

                            {/* Background color */}
                            <div className="rounded-xl border border-border bg-obsidian p-4">
                                <label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-text-faint">
                                    Background
                                </label>
                                <div className="flex items-center gap-3">
                                    <label className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-border">
                                        <input
                                            type="color"
                                            value={background}
                                            onChange={(e) => setBackground(e.target.value)}
                                            className="absolute -inset-2 h-14 w-14 cursor-pointer border-0 bg-transparent"
                                        />
                                    </label>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-sm font-medium text-chalk">Base Color</span>
                                        <p className="font-mono text-xs text-text-faint">{background}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Color blobs */}
                            <div className="rounded-xl border border-border bg-obsidian p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <label className="text-xs font-semibold uppercase tracking-widest text-text-faint">
                                        Color Blobs ({blobs.length}/6)
                                    </label>
                                    <button
                                        onClick={addBlob}
                                        disabled={blobs.length >= 6}
                                        className="flex items-center gap-1 rounded-md border border-ignite/30 bg-ignite/5 px-2 py-1 text-[10px] font-medium text-ignite transition-colors hover:bg-ignite/10 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <Plus className="h-3 w-3" />
                                        Add
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {blobs.map((blob, index) => (
                                        <div
                                            key={blob.id}
                                            className={`rounded-lg border p-3 transition-all cursor-pointer ${activeBlob === blob.id
                                                ? 'border-ignite/40 bg-ignite/5'
                                                : 'border-border hover:border-border-light'
                                                }`}
                                            onClick={() => setActiveBlob(activeBlob === blob.id ? null : blob.id)}
                                        >
                                            {/* Blob header */}
                                            <div className="flex items-center gap-2">
                                                <label
                                                    className="relative h-7 w-7 shrink-0 cursor-pointer overflow-hidden rounded-md border border-border"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <input
                                                        type="color"
                                                        value={blob.color}
                                                        onChange={(e) =>
                                                            updateBlob(blob.id, { color: e.target.value })
                                                        }
                                                        className="absolute -inset-2 h-11 w-11 cursor-pointer border-0 bg-transparent"
                                                    />
                                                </label>
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-xs font-medium text-chalk">
                                                        Blob {index + 1}
                                                    </span>
                                                    <span className="ml-2 font-mono text-[10px] text-text-faint">
                                                        {blob.color}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        removeBlob(blob.id)
                                                    }}
                                                    className="flex h-6 w-6 items-center justify-center rounded-md text-text-faint transition-colors hover:bg-red-500/10 hover:text-red-400"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </button>
                                            </div>

                                            {/* Expanded controls */}
                                            <AnimatePresence>
                                                {activeBlob === blob.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-3 space-y-3 border-t border-border pt-3">
                                                            {/* X position */}
                                                            <div>
                                                                <div className="mb-1 flex justify-between text-[10px] text-text-faint">
                                                                    <span>X Position</span>
                                                                    <span>{blob.x}%</span>
                                                                </div>
                                                                <input
                                                                    type="range"
                                                                    min={0}
                                                                    max={100}
                                                                    value={blob.x}
                                                                    onChange={(e) =>
                                                                        updateBlob(blob.id, { x: Number(e.target.value) })
                                                                    }
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="slider-thumb w-full"
                                                                />
                                                            </div>
                                                            {/* Y position */}
                                                            <div>
                                                                <div className="mb-1 flex justify-between text-[10px] text-text-faint">
                                                                    <span>Y Position</span>
                                                                    <span>{blob.y}%</span>
                                                                </div>
                                                                <input
                                                                    type="range"
                                                                    min={0}
                                                                    max={100}
                                                                    value={blob.y}
                                                                    onChange={(e) =>
                                                                        updateBlob(blob.id, { y: Number(e.target.value) })
                                                                    }
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="slider-thumb w-full"
                                                                />
                                                            </div>
                                                            {/* Size */}
                                                            <div>
                                                                <div className="mb-1 flex justify-between text-[10px] text-text-faint">
                                                                    <span>Spread</span>
                                                                    <span>{blob.size}%</span>
                                                                </div>
                                                                <input
                                                                    type="range"
                                                                    min={20}
                                                                    max={100}
                                                                    value={blob.size}
                                                                    onChange={(e) =>
                                                                        updateBlob(blob.id, { size: Number(e.target.value) })
                                                                    }
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="slider-thumb w-full"
                                                                />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
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
                                            className="group overflow-hidden rounded-lg border border-border transition-all hover:border-border-light hover:shadow-lg"
                                        >
                                            {/* Mini gradient preview */}
                                            <div
                                                className="h-12 w-full"
                                                style={{
                                                    background: preset.background,
                                                    backgroundImage: preset.blobs
                                                        .map(
                                                            (b) =>
                                                                `radial-gradient(circle at ${b.x}% ${b.y}%, ${b.color} 0%, transparent ${b.size}%)`
                                                        )
                                                        .join(', '),
                                                }}
                                            />
                                            <div className="px-2 py-1.5">
                                                <span className="text-[10px] font-medium text-blush group-hover:text-chalk transition-colors">
                                                    {preset.name}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
