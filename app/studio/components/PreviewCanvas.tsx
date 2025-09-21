'use client'

import React, { useRef, useEffect, useCallback, useImperativeHandle, forwardRef, useState, useMemo, Suspense } from 'react'
import gsap from 'gsap'
import {
    PreviewShape, AnimationConfig, SequencerConfig, MotionPathConfig,
    SpringConfig, EasingMode, OnionSkinConfig, GridSnapConfig,
    ComparisonConfig, buildTransformString,
    isRegistryShape, getRegistrySlug,
} from '../lib/types'
import { buildTimeline, buildStaggeredTimelines, buildMotionPathTimeline } from '../lib/gsapEngine'
import { cubicPointsToString } from '../lib/easing'
import { springToCSSEasing } from '../lib/spring'
import { samplePathEvenly } from '../lib/motionPath'
import { cn } from '@/lib/utils'
import { componentRegistry } from '@/lib/registry'
import ErrorBoundary from './ErrorBoundary'
import CanvasToolbar from './CanvasToolbar'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentCache = new Map<string, React.LazyExoticComponent<React.ComponentType<any>>>()

function getOrCreateLazy(slug: string) {
    if (!componentCache.has(slug)) {
        const entry = componentRegistry[slug]
        if (!entry) return null
        componentCache.set(slug, React.lazy(entry.component))
    }
    return componentCache.get(slug)!
}

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
    componentProps?: Record<string, unknown>
}

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
        componentProps,
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
    }, [config, getEffectiveEasing, sequencer, motionPath, speed, loop, playing, progressRef])

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

    const allCategories = useMemo(() => {
        const basic = {
            label: 'Basic',
            shapes: [
                { key: 'box' as PreviewShape, label: 'Box' },
                { key: 'circle' as PreviewShape, label: 'Circle' },
                { key: 'card' as PreviewShape, label: 'Card' },
                { key: 'text' as PreviewShape, label: 'Text' },
            ],
        }

        const grouped: Record<string, { key: PreviewShape; label: string }[]> = {}
        for (const [slug, entry] of Object.entries(componentRegistry)) {
            const cat = entry.category
            if (!grouped[cat]) grouped[cat] = []
            grouped[cat].push({ key: `registry:${slug}` as PreviewShape, label: entry.title })
        }

        const order = ['buttons', 'cards', 'text', 'navigation', 'visual', 'media'] as const
        const registryCats = order
            .filter(cat => grouped[cat]?.length)
            .map(cat => ({
                label: cat.charAt(0).toUpperCase() + cat.slice(1),
                shapes: grouped[cat],
            }))

        return [basic, ...registryCats]
    }, [])

    const renderShape = () => {
        // Registry component rendering
        const slug = getRegistrySlug(previewShape)
        if (slug) {
            const LazyComp = getOrCreateLazy(slug)
            if (!LazyComp) return <div className="text-xs text-red-400">Component not found</div>
            return (
                <Suspense fallback={<div className="w-24 h-24 rounded-xl bg-white/[0.06] animate-pulse" />}>
                    <ErrorBoundary fallback={<div className="text-xs text-red-400">Preview unavailable</div>}>
                        <LazyComp {...componentProps} />
                    </ErrorBoundary>
                </Suspense>
            )
        }

        // Basic shapes
        switch (previewShape) {
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
            default:
                return <div className="w-24 h-24 rounded-xl bg-ignite" />
        }
    }

    // Render onion skin ghosts
    const renderOnionSkinGhosts = () => {
        if (!onionSkin.enabled) return null
        const sorted = [...config.keyframes].sort((a, b) => a.offset - b.offset)
        const ghosts = sorted.slice(0, 8)

        return ghosts.map((kf) => (
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
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
                        {allCategories.map((cat, i) => (
                            <button
                                key={cat.label}
                                onClick={() => setActiveCat(i)}
                                className={cn(
                                    'text-[10px] font-semibold uppercase tracking-wider transition-colors whitespace-nowrap',
                                    activeCat === i
                                        ? canvasTheme === 'light' ? 'text-gray-900' : 'text-chalk'
                                        : canvasTheme === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-white/25 hover:text-white/40'
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap max-h-[72px] overflow-y-auto scrollbar-none">
                        {allCategories[activeCat]?.shapes.map(s => (
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
