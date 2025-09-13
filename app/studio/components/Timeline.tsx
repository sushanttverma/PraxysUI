'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { AnimationKeyframe, AnimationChain, makeKeyframe } from '../lib/types'
import { cn } from '@/lib/utils'

const EASING_OPTIONS = [
    'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear',
    'cubic-bezier(0.34, 1.56, 0.64, 1)',
    'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
]

interface TimelineProps {
    keyframes: AnimationKeyframe[]
    activeKeyframeIdx: number
    progressRef: React.MutableRefObject<number>
    playing: boolean
    onSelectKeyframe: (idx: number) => void
    onUpdateKeyframeOffset: (idx: number, offset: number) => void
    onAddKeyframe: (offset: number) => void
    onDeleteKeyframe: (idx: number) => void
    onSeek: (progress: number) => void
    chain?: AnimationChain
    onUpdateKeyframeEasing?: (idx: number, easing: string) => void
}

export default function Timeline({
    keyframes,
    activeKeyframeIdx,
    progressRef,
    playing,
    onSelectKeyframe,
    onUpdateKeyframeOffset,
    onAddKeyframe,
    onDeleteKeyframe,
    onSeek,
    chain,
    onUpdateKeyframeEasing,
}: TimelineProps) {
    const trackRef = useRef<HTMLDivElement>(null)
    const playheadRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number>(0)
    const draggingKfIdx = useRef<number | null>(null)
    const isDraggingPlayhead = useRef(false)
    const [easingPopoverIdx, setEasingPopoverIdx] = useState<number | null>(null)

    // Animate playhead position via rAF
    useEffect(() => {
        const animate = () => {
            if (playheadRef.current && trackRef.current) {
                const progress = progressRef.current
                const width = trackRef.current.offsetWidth
                playheadRef.current.style.left = `${progress * width}px`
            }
            rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafRef.current)
    }, [progressRef])

    const getOffsetFromPointer = useCallback((clientX: number): number => {
        if (!trackRef.current) return 0
        const rect = trackRef.current.getBoundingClientRect()
        return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    }, [])

    const handleTrackPointerDown = useCallback((e: React.PointerEvent) => {
        if (draggingKfIdx.current !== null) return
        e.preventDefault()
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
        isDraggingPlayhead.current = true
        const offset = getOffsetFromPointer(e.clientX)
        onSeek(offset)
    }, [getOffsetFromPointer, onSeek])

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (isDraggingPlayhead.current) {
            const offset = getOffsetFromPointer(e.clientX)
            onSeek(offset)
            return
        }
        if (draggingKfIdx.current !== null) {
            const idx = draggingKfIdx.current
            const kf = keyframes[idx]
            if (kf.offset === 0 || kf.offset === 1) return
            const offset = getOffsetFromPointer(e.clientX)
            const clamped = Math.max(0.01, Math.min(0.99, offset))
            onUpdateKeyframeOffset(idx, +clamped.toFixed(3))
        }
    }, [getOffsetFromPointer, keyframes, onUpdateKeyframeOffset, onSeek])

    const handlePointerUp = useCallback(() => {
        isDraggingPlayhead.current = false
        draggingKfIdx.current = null
    }, [])

    const handleKfPointerDown = useCallback((e: React.PointerEvent, idx: number) => {
        e.preventDefault()
        e.stopPropagation()
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
        draggingKfIdx.current = idx
        onSelectKeyframe(idx)
    }, [onSelectKeyframe])

    const handleTrackDoubleClick = useCallback((e: React.MouseEvent) => {
        const offset = getOffsetFromPointer(e.clientX)
        onAddKeyframe(+offset.toFixed(3))
    }, [getOffsetFromPointer, onAddKeyframe])

    const sortedKeyframes = [...keyframes].sort((a, b) => a.offset - b.offset)

    // Chain phase proportions
    const chainPhases = chain?.enabled ? (() => {
        const total = chain.enterDuration + chain.idleDuration + chain.exitDuration
        if (total <= 0) return null
        return {
            enter: (chain.enterDuration / total) * 100,
            idle: (chain.idleDuration / total) * 100,
            exit: (chain.exitDuration / total) * 100,
        }
    })() : null

    return (
        <div className="px-4 pb-2">
            {/* Chain phase strips */}
            {chainPhases && (
                <div className="flex h-4 rounded-t-md overflow-hidden mb-px">
                    <div className="flex items-center justify-center text-[8px] font-bold uppercase tracking-wider text-green-400/80 bg-green-500/10 border-b border-green-500/20"
                        style={{ width: `${chainPhases.enter}%` }}>
                        Enter
                    </div>
                    <div className="flex items-center justify-center text-[8px] font-bold uppercase tracking-wider text-blue-400/80 bg-blue-500/10 border-b border-blue-500/20"
                        style={{ width: `${chainPhases.idle}%` }}>
                        Idle
                    </div>
                    <div className="flex items-center justify-center text-[8px] font-bold uppercase tracking-wider text-orange-400/80 bg-orange-500/10 border-b border-orange-500/20"
                        style={{ width: `${chainPhases.exit}%` }}>
                        Exit
                    </div>
                </div>
            )}

            <div
                ref={trackRef}
                className="relative h-10 rounded-full bg-white/[0.06] cursor-pointer touch-none select-none"
                onPointerDown={handleTrackPointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onDoubleClick={handleTrackDoubleClick}
            >
                {/* Time markers */}
                {[0, 0.25, 0.5, 0.75, 1].map(t => (
                    <div
                        key={t}
                        className="absolute top-0 h-full flex items-end pb-1"
                        style={{
                            left: `${t * 100}%`,
                            transform: t === 0 ? 'none' : t === 1 ? 'translateX(-100%)' : 'translateX(-50%)',
                        }}
                    >
                        <span className="text-[8px] text-white/20 font-mono">{Math.round(t * 100)}%</span>
                    </div>
                ))}

                {/* Per-segment easing dots between keyframes */}
                {onUpdateKeyframeEasing && sortedKeyframes.map((kf, sortedIdx) => {
                    if (sortedIdx === 0) return null
                    const prevKf = sortedKeyframes[sortedIdx - 1]
                    const midOffset = (prevKf.offset + kf.offset) / 2
                    const realIdx = keyframes.indexOf(kf)
                    const hasCustomEasing = !!kf.easing

                    return (
                        <div
                            key={`easing-${kf.id}`}
                            className="absolute top-1/2 z-10"
                            style={{
                                left: `${midOffset * 100}%`,
                                transform: 'translateX(-50%) translateY(-50%)',
                            }}
                        >
                            <button
                                className={cn(
                                    'w-2 h-2 rounded-full transition-colors',
                                    hasCustomEasing ? 'bg-purple-400' : 'bg-white/20 hover:bg-white/40'
                                )}
                                onClick={e => {
                                    e.stopPropagation()
                                    setEasingPopoverIdx(easingPopoverIdx === realIdx ? null : realIdx)
                                }}
                            />
                            {/* Easing popover */}
                            {easingPopoverIdx === realIdx && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 rounded-lg border border-border bg-void/95 backdrop-blur-md shadow-xl z-30 min-w-[140px]"
                                    onClick={e => e.stopPropagation()}>
                                    <div className="text-[9px] font-semibold text-text-faint uppercase tracking-wider mb-1.5">Segment Easing</div>
                                    {EASING_OPTIONS.map(opt => (
                                        <button
                                            key={opt}
                                            className={cn(
                                                'block w-full text-left px-2 py-1 rounded text-[10px] font-mono transition-colors',
                                                kf.easing === opt ? 'bg-purple-400/15 text-purple-400' : 'text-blush hover:text-chalk hover:bg-white/[0.04]'
                                            )}
                                            onClick={() => {
                                                onUpdateKeyframeEasing(realIdx, opt)
                                                setEasingPopoverIdx(null)
                                            }}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                    {kf.easing && (
                                        <button
                                            className="block w-full text-left px-2 py-1 rounded text-[10px] text-red-400 hover:bg-red-400/10 mt-1 border-t border-border pt-1"
                                            onClick={() => {
                                                onUpdateKeyframeEasing(realIdx, '')
                                                setEasingPopoverIdx(null)
                                            }}
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}

                {/* Keyframe diamonds */}
                {sortedKeyframes.map((kf, sortedIdx) => {
                    const realIdx = keyframes.indexOf(kf)
                    const isActive = activeKeyframeIdx === realIdx
                    const isEdge = kf.offset === 0 || kf.offset === 1
                    return (
                        <div
                            key={kf.id}
                            className="absolute top-1/2 group z-10"
                            style={{
                                left: `${kf.offset * 100}%`,
                                transform: kf.offset === 0
                                    ? 'translateY(-50%)'
                                    : kf.offset === 1
                                        ? 'translateX(-100%) translateY(-50%)'
                                        : 'translateX(-50%) translateY(-50%)',
                            }}
                        >
                            <div
                                className={cn(
                                    'w-3.5 h-3.5 rotate-45 rounded-[2px] cursor-grab active:cursor-grabbing transition-colors',
                                    isActive
                                        ? 'bg-ignite shadow-lg shadow-ignite/30'
                                        : 'bg-white/30 hover:bg-white/50'
                                )}
                                onPointerDown={e => handleKfPointerDown(e, realIdx)}
                            />
                            {/* Delete button for non-edge keyframes */}
                            {!isEdge && isActive && (
                                <button
                                    className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => { e.stopPropagation(); onDeleteKeyframe(realIdx) }}
                                >
                                    <X className="h-2.5 w-2.5 text-white" />
                                </button>
                            )}
                        </div>
                    )
                })}

                {/* Playhead */}
                <div
                    ref={playheadRef}
                    className="absolute top-0 h-full w-0.5 bg-ignite pointer-events-none z-20"
                    style={{ left: 0 }}
                >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-ignite" />
                </div>
            </div>
        </div>
    )
}
