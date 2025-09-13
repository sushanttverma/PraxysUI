'use client'

import React, { useRef, useEffect, useCallback, useImperativeHandle, forwardRef, useState } from 'react'
import gsap from 'gsap'
import {
    PreviewShape, AnimationConfig, SequencerConfig, MotionPathConfig,
    SpringConfig, EasingMode, OnionSkinConfig, GridSnapConfig,
    ComparisonConfig, buildTransformString,
} from '../lib/types'
import { buildTimeline, buildStaggeredTimelines, buildMotionPathTimeline } from '../lib/gsapEngine'
import { cubicPointsToString } from '../lib/easing'
import { springToCSSEasing } from '../lib/spring'
import { samplePathEvenly } from '../lib/motionPath'
import { cn } from '@/lib/utils'
import CanvasToolbar from './CanvasToolbar'

export interface PreviewCanvasHandle {
    getTimeline: () => gsap.core.Timeline | null
    getElement: () => HTMLDivElement | null
    getTimelineB: () => gsap.core.Timeline | null
}

interface PreviewCanvasProps {
    config: AnimationConfig
    previewShape: PreviewShape
    playing: boolean
    loop: boolean
    speed: number
    easingMode: EasingMode
    controlPoints: [number, number, number, number]
    springConfig: SpringConfig
    sequencer: SequencerConfig
    motionPath: MotionPathConfig
    progressRef: React.MutableRefObject<number>
    onShapeChange: (shape: PreviewShape) => void
    hideShapeSelector?: boolean
    // New props
    onionSkin: OnionSkinConfig
    onOnionSkinChange: (config: OnionSkinConfig) => void
    gridSnap: GridSnapConfig
    onGridSnapChange: (config: GridSnapConfig) => void
    comparison: ComparisonConfig
    activePerspective: number
}

interface ShapeCategory {
    label: string
    shapes: { key: PreviewShape; label: string }[]
}

const shapeCategories: ShapeCategory[] = [
    {
        label: 'Basic',
        shapes: [
            { key: 'box', label: 'Box' },
            { key: 'circle', label: 'Circle' },
            { key: 'card', label: 'Card' },
            { key: 'text', label: 'Text' },
        ],
    },
    {
        label: 'Praxys UI',
        shapes: [
            { key: 'button', label: 'Button' },
            { key: 'input', label: 'Input' },
            { key: 'toggle', label: 'Toggle' },
            { key: 'checkbox', label: 'Checkbox' },
            { key: 'badge', label: 'Badge' },
            { key: 'tooltip', label: 'Tooltip' },
            { key: 'toast', label: 'Toast' },
            { key: 'dock', label: 'Dock' },
            { key: 'modal', label: 'Modal' },
            { key: 'stats', label: 'Stats' },
        ],
    },
]

const PreviewCanvas = forwardRef<PreviewCanvasHandle, PreviewCanvasProps>(function PreviewCanvas(
    {
        config,
        previewShape,
        playing,
        loop,
        speed,
        easingMode,
        controlPoints,
        springConfig,
        sequencer,
        motionPath,
        progressRef,
        onShapeChange,
        hideShapeSelector,
        onionSkin,
        onOnionSkinChange,
        gridSnap,
        onGridSnapChange,
        comparison,
        activePerspective,
    },
    ref,
) {
    const elementRef = useRef<HTMLDivElement>(null)
    const elementBRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const staggerRefs = useRef<HTMLDivElement[]>([])
    const tlRef = useRef<gsap.core.Timeline | null>(null)
    const tlBRef = useRef<gsap.core.Timeline | null>(null)
    const [activeCat, setActiveCat] = useState(0)
    const [canvasTheme, setCanvasTheme] = useState<'dark' | 'light'>('dark')

    useImperativeHandle(ref, () => ({
        getTimeline: () => tlRef.current,
        getElement: () => containerRef.current,
        getTimelineB: () => tlBRef.current,
    }))

    const getEffectiveEasing = useCallback((): string => {
        switch (easingMode) {
            case 'cubic-bezier':
                return cubicPointsToString(controlPoints)
            case 'spring':
                return springToCSSEasing(springConfig)
            default:
                return config.easing
        }
    }, [easingMode, controlPoints, springConfig, config.easing])

    // Rebuild GSAP timeline when config changes
    useEffect(() => {
        if (tlRef.current) {
            tlRef.current.kill()
            tlRef.current = null
        }

        const effectiveEasing = getEffectiveEasing()

        if (motionPath.enabled && motionPath.points.length >= 2) {
            const samples = samplePathEvenly(motionPath.points, 40)
            const scaledSamples = samples.map(s => ({
                x: (s.x - 150),
                y: (s.y - 150),
            }))
            const target = elementRef.current
            if (!target) return

            const tl = buildMotionPathTimeline(
                target,
                scaledSamples,
                config.duration,
                effectiveEasing,
                motionPath.autoRotate,
                (p: number) => { progressRef.current = p },
            )
            tlRef.current = tl
        } else if (sequencer.enabled && staggerRefs.current.length > 0) {
            const targets = staggerRefs.current.filter(Boolean)
            if (targets.length === 0) return
            const tl = buildStaggeredTimelines(
                targets,
                config.keyframes,
                effectiveEasing,
                config.duration,
                sequencer.staggerDelay,
                sequencer.staggerDirection,
                (p: number) => { progressRef.current = p },
            )
            tlRef.current = tl
        } else {
            const target = elementRef.current
            if (!target) return
            const tl = buildTimeline({
                target,
                keyframes: config.keyframes,
                easing: effectiveEasing,
                duration: config.duration,
                onUpdate: (p: number) => { progressRef.current = p },
            })
            tlRef.current = tl
        }

        const tl = tlRef.current
        if (!tl) return

        tl.timeScale(speed)
        if (loop) {
            tl.repeat(-1)
        } else {
            const iterCount = config.iterationCount === 'infinite' ? -1 : (config.iterationCount as number) - 1
            tl.repeat(iterCount)
        }
        if (config.direction === 'alternate' || config.direction === 'alternate-reverse') {
            tl.yoyo(true)
        }
        if (config.direction === 'reverse' || config.direction === 'alternate-reverse') {
            tl.reversed(true)
        }
        if (config.delay > 0) {
            tl.delay(config.delay)
        }

        if (playing) {
            tl.restart()
        }

        return () => {
            if (tlRef.current) {
                tlRef.current.kill()
                tlRef.current = null
            }
        }
    }, [config, getEffectiveEasing, sequencer, motionPath, speed, loop])

    // Build comparison B timeline
    useEffect(() => {
        if (tlBRef.current) {
            tlBRef.current.kill()
            tlBRef.current = null
        }
        if (!comparison.enabled || !elementBRef.current) return

        const tl = buildTimeline({
            target: elementBRef.current,
            keyframes: comparison.configB.keyframes,
            easing: comparison.easingB,
            duration: comparison.configB.duration,
            onUpdate: () => {},
        })
        tlBRef.current = tl

        tl.timeScale(speed)
        if (loop) tl.repeat(-1)
        if (playing) tl.restart()

        return () => {
            if (tlBRef.current) {
                tlBRef.current.kill()
                tlBRef.current = null
            }
        }
    }, [comparison, speed, loop, playing])

    // Sync A & B timelines
    useEffect(() => {
        if (!comparison.enabled || !tlRef.current || !tlBRef.current) return

        const syncTl = () => {
            if (tlRef.current && tlBRef.current) {
                tlBRef.current.progress(tlRef.current.progress())
            }
        }

        const id = setInterval(syncTl, 16)
        return () => clearInterval(id)
    }, [comparison.enabled])

    useEffect(() => {
        const tl = tlRef.current
        if (!tl) return
        if (playing) {
            if (tl.progress() >= 1) tl.restart()
            else tl.play()
        } else {
            tl.pause()
        }
    }, [playing])

    useEffect(() => {
        const tl = tlRef.current
        if (tl) tl.timeScale(speed)
    }, [speed])

    const renderShape = () => {
        switch (previewShape) {
            // ── Basic ──
            case 'box':
                return <div className="w-24 h-24 rounded-xl" style={{ background: 'linear-gradient(135deg, #E84E2D 0%, #C9958A 50%, #050505 100%)' }} />
            case 'circle':
                return <div className="w-24 h-24 rounded-full" style={{ background: 'linear-gradient(135deg, #E84E2D 0%, #C9958A 50%, #050505 100%)' }} />
            case 'card':
                return (
                    <div className="w-[200px] rounded-xl border border-white/[0.1] bg-white/[0.06] backdrop-blur-md p-4 space-y-2">
                        <div className="h-2 w-24 rounded-full bg-white/20" />
                        <div className="h-1.5 w-32 rounded-full bg-white/10" />
                        <div className="mt-3 h-7 w-16 rounded-md bg-ignite/80 flex items-center justify-center">
                            <span className="text-[9px] font-medium text-white">Button</span>
                        </div>
                    </div>
                )
            case 'text':
                return <span className="text-4xl font-bold text-chalk select-none">Hello</span>

            // ── Praxys UI Components ──
            case 'button':
                return (
                    <button className="relative overflow-hidden px-6 py-2.5 rounded-lg border border-ignite/30 bg-ignite/10">
                        <span className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(-75deg, transparent 30%, rgba(232,78,45,0.15) 50%, transparent 70%)' }} />
                        <span className="relative z-10 text-sm font-medium tracking-wide text-chalk flex items-center gap-2">
                            <svg className="h-4 w-4 text-ignite" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            Get Started
                        </span>
                    </button>
                )

            case 'input':
                return (
                    <div className="w-[260px]">
                        <div className="relative h-11 rounded-lg">
                            <div className="absolute inset-0 rounded-lg" style={{ boxShadow: '0 0 0 1.5px rgba(232,78,45,0.6), 0 0 0 4px rgba(232,78,45,0.1)' }} />
                            <div className="absolute inset-0 rounded-lg bg-obsidian" />
                            <span className="absolute z-[2] left-3 -top-2 text-[10px] font-medium text-ignite bg-obsidian px-1 rounded-sm">Email</span>
                            <div className="relative z-[1] h-full flex items-center px-3.5">
                                <span className="text-sm text-chalk">hello@praxys.design</span>
                            </div>
                        </div>
                    </div>
                )

            case 'toggle':
                return (
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="relative h-6 w-11 rounded-full border-2 border-border bg-obsidian">
                                <div className="absolute top-[3px] left-[3px] h-[14px] w-[14px] rounded-full bg-blush shadow-sm" />
                            </div>
                            <span className="text-sm font-medium text-blush">Off</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative h-6 w-11 rounded-full border-2 border-ignite bg-ignite">
                                <div className="absolute top-[3px] right-[3px] h-[14px] w-[14px] rounded-full bg-chalk shadow-sm" />
                            </div>
                            <span className="text-sm font-medium text-chalk">On</span>
                        </div>
                    </div>
                )

            case 'checkbox':
                return (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-5 w-5 items-center justify-center rounded-md border border-ignite bg-ignite/20">
                                <svg className="h-3.5 w-3.5 text-ignite" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7.5L5.5 10L11 4" /></svg>
                            </div>
                            <span className="text-sm text-chalk">Notifications enabled</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-5 w-5 items-center justify-center rounded-md border border-border bg-obsidian" />
                            <span className="text-sm text-blush">Marketing emails</span>
                        </div>
                    </div>
                )

            case 'badge':
                return (
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-ignite/30 bg-ignite/10 px-2.5 py-1 text-xs font-medium text-ignite">
                            <span className="h-1.5 w-1.5 rounded-full bg-ignite" />New
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>Active
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400">Pending</span>
                        <span className="inline-flex items-center rounded-full border border-border bg-obsidian px-2.5 py-1 text-xs font-medium text-blush">Draft</span>
                    </div>
                )

            case 'tooltip':
                return (
                    <div className="flex flex-col items-center gap-1">
                        <div className="relative rounded-md border border-border bg-obsidian px-3 py-1.5 text-xs text-chalk shadow-lg">
                            Copy to clipboard
                            <span className="absolute top-full left-1/2 -translate-x-1/2 h-0 w-0 border-[4px] border-b-transparent border-x-transparent border-t-obsidian" />
                        </div>
                        <div className="mt-2 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-obsidian text-blush">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                        </div>
                    </div>
                )

            case 'toast':
                return (
                    <div className="flex flex-col gap-2 w-[280px]">
                        <div className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm shadow-lg">
                            <svg className="h-4 w-4 shrink-0 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" /><path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span className="flex-1 text-green-400">Changes saved</span>
                            <svg className="h-3.5 w-3.5 shrink-0 text-green-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm shadow-lg">
                            <svg className="h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" /></svg>
                            <span className="flex-1 text-red-400">Upload failed</span>
                            <svg className="h-3.5 w-3.5 shrink-0 text-red-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
                        </div>
                    </div>
                )

            case 'dock':
                return (
                    <div className="inline-flex items-end gap-2 rounded-2xl border border-white/[0.06] bg-obsidian/60 px-3 py-2 backdrop-blur-xl shadow-lg">
                        {[
                            <svg key="h" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
                            <svg key="s" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>,
                            <svg key="st" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
                            <svg key="u" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
                            <svg key="g" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
                        ].map((icon, i) => (
                            <div key={i} className="group flex flex-col items-center">
                                <div className={cn(
                                    'flex items-center justify-center rounded-xl border p-2.5 transition-colors',
                                    i === 2
                                        ? 'border-ignite/30 bg-ignite/10 text-ignite'
                                        : 'border-white/[0.05] bg-obsidian text-blush'
                                )} style={{ width: 44, height: 44 }}>
                                    {icon}
                                </div>
                                <div className={cn('mt-1 h-1 w-1 rounded-full', i === 2 ? 'bg-ignite/50' : 'bg-transparent')} />
                            </div>
                        ))}
                    </div>
                )

            case 'modal':
                return (
                    <div className="w-[320px] rounded-xl border border-border bg-obsidian p-5 shadow-xl relative">
                        <div className="absolute right-3 top-3 rounded-md p-1 text-blush">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
                        </div>
                        <div className="mb-4 pr-6">
                            <h2 className="text-base font-medium text-chalk">Delete project?</h2>
                            <p className="mt-1 text-xs text-blush">This action cannot be undone. All data will be permanently removed.</p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <button className="rounded-lg border border-border bg-obsidian px-3 py-1.5 text-xs font-medium text-blush">Cancel</button>
                            <button className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">Delete</button>
                        </div>
                    </div>
                )

            case 'stats':
                return (
                    <div className="w-[240px] relative overflow-hidden rounded-xl border border-border bg-obsidian p-5">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(232,78,45,0.2), transparent)' }} />
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                                <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-text-faint">Revenue</p>
                                <p className="text-3xl font-bold text-chalk leading-tight">
                                    <span className="text-lg font-medium text-text-faint">$</span>48.2<span className="text-lg font-medium text-text-faint">k</span>
                                </p>
                                <div className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    +12.5%
                                </div>
                            </div>
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-ignite/20 bg-ignite/10 text-ignite">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                            </div>
                        </div>
                    </div>
                )

            default:
                return <div className="w-24 h-24 rounded-xl bg-ignite" />
        }
    }

    // Render onion skin ghosts
    const renderOnionSkinGhosts = () => {
        if (!onionSkin.enabled) return null
        const sorted = [...config.keyframes].sort((a, b) => a.offset - b.offset)
        const ghosts = sorted.slice(0, 8)

        return ghosts.map((kf, i) => (
            <div
                key={`ghost-${kf.id}`}
                className="absolute pointer-events-none"
                style={{
                    transform: buildTransformString(kf),
                    opacity: onionSkin.opacity,
                }}
            >
                {renderShape()}
            </div>
        ))
    }

    const canvasContent = (
        <div className="flex-1 flex items-center justify-center relative p-6">
            {/* Background - dot grid or snap grid */}
            {gridSnap.enabled ? (
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, ${canvasTheme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px),
                            linear-gradient(to bottom, ${canvasTheme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)
                        `,
                        backgroundSize: `${gridSnap.size}px ${gridSnap.size}px`,
                    }}
                />
            ) : (
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(circle, ${canvasTheme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.4)'} 1px, transparent 1px)`,
                        backgroundSize: '24px 24px',
                    }}
                />
            )}

            {/* Onion skin ghosts */}
            {onionSkin.enabled && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {renderOnionSkinGhosts()}
                </div>
            )}

            {/* Comparison mode */}
            {comparison.enabled ? (
                <div className="flex items-center gap-6 w-full justify-center">
                    {/* Side A */}
                    <div className="flex flex-col items-center gap-2 flex-1 max-w-[45%]">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-ignite/60">A</span>
                        <div ref={elementRef} style={activePerspective > 0 ? { perspective: activePerspective } : undefined}>
                            {renderShape()}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-32 w-px bg-white/[0.08]" />

                    {/* Side B */}
                    <div className="flex flex-col items-center gap-2 flex-1 max-w-[45%]">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400/60">B</span>
                        <div ref={elementBRef} style={activePerspective > 0 ? { perspective: activePerspective } : undefined}>
                            {renderShape()}
                        </div>
                    </div>
                </div>
            ) : (
                /* Normal mode - animated element(s) */
                sequencer.enabled ? (
                    <div className="flex items-center gap-3 flex-wrap justify-center">
                        {Array.from({ length: sequencer.elementCount }).map((_, i) => (
                            <div
                                key={i}
                                ref={el => { if (el) staggerRefs.current[i] = el }}
                            >
                                {renderShape()}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div ref={elementRef} style={activePerspective > 0 ? { perspective: activePerspective } : undefined}>
                        {renderShape()}
                    </div>
                )
            )}
        </div>
    )

    return (
        <div
            className={cn(
                'flex-1 flex flex-col min-h-0 relative',
                canvasTheme === 'light' ? 'bg-[#fafafa]' : 'bg-transparent'
            )}
            ref={containerRef}
        >
            {/* Canvas Toolbar */}
            {!hideShapeSelector && (
                <CanvasToolbar
                    canvasTheme={canvasTheme}
                    onThemeToggle={() => setCanvasTheme(t => t === 'dark' ? 'light' : 'dark')}
                    gridSnap={gridSnap}
                    onGridSnapChange={onGridSnapChange}
                    onionSkin={onionSkin}
                    onOnionSkinChange={onOnionSkinChange}
                />
            )}

            {/* Shape selector */}
            {!hideShapeSelector && (
                <div className="flex flex-col gap-2 px-4 pt-4">
                    <div className="flex items-center gap-3">
                        {shapeCategories.map((cat, i) => (
                            <button
                                key={cat.label}
                                onClick={() => setActiveCat(i)}
                                className={cn(
                                    'text-[10px] font-semibold uppercase tracking-wider transition-colors',
                                    activeCat === i
                                        ? canvasTheme === 'light' ? 'text-gray-900' : 'text-chalk'
                                        : canvasTheme === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-white/25 hover:text-white/40'
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {shapeCategories[activeCat].shapes.map(s => (
                            <button
                                key={s.key}
                                onClick={() => onShapeChange(s.key)}
                                className={cn(
                                    'px-3 py-1 rounded-full text-xs font-medium transition-colors border',
                                    previewShape === s.key
                                        ? 'border-ignite bg-ignite/10 text-ignite'
                                        : canvasTheme === 'light'
                                            ? 'border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            : 'border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/[0.14]'
                                )}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {canvasContent}
        </div>
    )
})

export default PreviewCanvas
