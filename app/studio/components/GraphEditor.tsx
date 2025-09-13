'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { AnimationKeyframe } from '../lib/types'
import { cn } from '@/lib/utils'

interface GraphEditorProps {
    keyframes: AnimationKeyframe[]
    progressRef: React.MutableRefObject<number>
    expanded: boolean
    onToggle: () => void
    onUpdateKeyframe: (idx: number, key: keyof AnimationKeyframe, value: number) => void
}

interface PropertyConfig {
    key: keyof AnimationKeyframe
    label: string
    color: string
    min: number
    max: number
    defaultVal: number
}

const PROPERTIES: PropertyConfig[] = [
    { key: 'translateX', label: 'X', color: '#E84E2D', min: -200, max: 200, defaultVal: 0 },
    { key: 'translateY', label: 'Y', color: '#F97316', min: -200, max: 200, defaultVal: 0 },
    { key: 'scale', label: 'Scale', color: '#22C55E', min: 0, max: 3, defaultVal: 1 },
    { key: 'rotate', label: 'Rotate', color: '#3B82F6', min: -360, max: 360, defaultVal: 0 },
    { key: 'opacity', label: 'Opacity', color: '#A855F7', min: 0, max: 1, defaultVal: 1 },
    { key: 'skewX', label: 'SkewX', color: '#06B6D4', min: -45, max: 45, defaultVal: 0 },
    { key: 'skewY', label: 'SkewY', color: '#EC4899', min: -45, max: 45, defaultVal: 0 },
    { key: 'rotateX', label: 'RotX', color: '#F59E0B', min: -180, max: 180, defaultVal: 0 },
    { key: 'rotateY', label: 'RotY', color: '#10B981', min: -180, max: 180, defaultVal: 0 },
]

export default function GraphEditor({
    keyframes,
    progressRef,
    expanded,
    onToggle,
    onUpdateKeyframe,
}: GraphEditorProps) {
    const svgRef = useRef<SVGSVGElement>(null)
    const cursorRef = useRef<SVGLineElement>(null)
    const rafRef = useRef<number>(0)
    const [visibleProps, setVisibleProps] = useState<Set<string>>(new Set(['translateX', 'translateY', 'scale', 'opacity']))
    const dragging = useRef<{ kfIdx: number; prop: keyof AnimationKeyframe } | null>(null)

    const W = 400
    const H = 160
    const PAD = 20

    // Animate time cursor via rAF
    useEffect(() => {
        if (!expanded) return
        const animate = () => {
            if (cursorRef.current) {
                const x = PAD + progressRef.current * (W - 2 * PAD)
                cursorRef.current.setAttribute('x1', String(x))
                cursorRef.current.setAttribute('x2', String(x))
            }
            rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafRef.current)
    }, [expanded, progressRef])

    const normalizeValue = useCallback((value: number, prop: PropertyConfig): number => {
        return (value - prop.min) / (prop.max - prop.min)
    }, [])

    const denormalizeValue = useCallback((norm: number, prop: PropertyConfig): number => {
        return norm * (prop.max - prop.min) + prop.min
    }, [])

    const handleSvgPointerDown = useCallback((e: React.PointerEvent, kfIdx: number, propKey: keyof AnimationKeyframe) => {
        e.preventDefault()
        e.stopPropagation()
        ;(e.target as SVGElement).setPointerCapture(e.pointerId)
        dragging.current = { kfIdx, prop: propKey }
    }, [])

    const handleSvgPointerMove = useCallback((e: React.PointerEvent) => {
        if (!dragging.current || !svgRef.current) return
        const rect = svgRef.current.getBoundingClientRect()
        const normY = 1 - Math.max(0, Math.min(1, (e.clientY - rect.top - PAD) / (H - 2 * PAD)))
        const prop = PROPERTIES.find(p => p.key === dragging.current!.prop)
        if (!prop) return
        const value = denormalizeValue(normY, prop)
        const rounded = prop.max <= 3 ? +value.toFixed(2) : Math.round(value)
        onUpdateKeyframe(dragging.current.kfIdx, dragging.current.prop, rounded)
    }, [denormalizeValue, onUpdateKeyframe])

    const handleSvgPointerUp = useCallback(() => {
        dragging.current = null
    }, [])

    const toggleProp = useCallback((key: string) => {
        setVisibleProps(prev => {
            const next = new Set(prev)
            if (next.has(key)) next.delete(key)
            else next.add(key)
            return next
        })
    }, [])

    const sortedKfs = [...keyframes].sort((a, b) => a.offset - b.offset)

    return (
        <div className="px-4">
            <button
                onClick={onToggle}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors mb-1"
            >
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                Graph Editor
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        {/* Property toggles */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                            {PROPERTIES.map(p => (
                                <button
                                    key={p.key}
                                    onClick={() => toggleProp(p.key)}
                                    className={cn(
                                        'px-2 py-0.5 rounded text-[10px] font-medium transition-colors border',
                                        visibleProps.has(p.key)
                                            ? 'border-current'
                                            : 'border-white/[0.08] text-white/20'
                                    )}
                                    style={visibleProps.has(p.key) ? { color: p.color, borderColor: p.color + '40' } : undefined}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>

                        {/* SVG Graph */}
                        <div className="rounded-lg border border-border bg-void/50 overflow-hidden">
                            <svg
                                ref={svgRef}
                                viewBox={`0 0 ${W} ${H}`}
                                className="w-full touch-none"
                                style={{ height: 160 }}
                                onPointerMove={handleSvgPointerMove}
                                onPointerUp={handleSvgPointerUp}
                                onPointerLeave={handleSvgPointerUp}
                            >
                                {/* Grid */}
                                {[0, 0.25, 0.5, 0.75, 1].map(t => (
                                    <line
                                        key={`v-${t}`}
                                        x1={PAD + t * (W - 2 * PAD)} y1={PAD}
                                        x2={PAD + t * (W - 2 * PAD)} y2={H - PAD}
                                        stroke="rgba(255,255,255,0.06)" strokeWidth={0.5}
                                    />
                                ))}
                                {[0, 0.25, 0.5, 0.75, 1].map(t => (
                                    <line
                                        key={`h-${t}`}
                                        x1={PAD} y1={PAD + t * (H - 2 * PAD)}
                                        x2={W - PAD} y2={PAD + t * (H - 2 * PAD)}
                                        stroke="rgba(255,255,255,0.06)" strokeWidth={0.5}
                                    />
                                ))}

                                {/* Property curves */}
                                {PROPERTIES.filter(p => visibleProps.has(p.key)).map(prop => {
                                    const points = sortedKfs.map(kf => {
                                        const x = PAD + kf.offset * (W - 2 * PAD)
                                        const norm = normalizeValue((kf[prop.key] as number) ?? prop.defaultVal, prop)
                                        const y = H - PAD - norm * (H - 2 * PAD)
                                        return { x, y }
                                    })
                                    const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

                                    return (
                                        <g key={prop.key}>
                                            <path d={d} fill="none" stroke={prop.color} strokeWidth={1.5} opacity={0.8} />
                                            {sortedKfs.map((kf, sortedIdx) => {
                                                const realIdx = keyframes.indexOf(kf)
                                                const norm = normalizeValue((kf[prop.key] as number) ?? prop.defaultVal, prop)
                                                const x = PAD + kf.offset * (W - 2 * PAD)
                                                const y = H - PAD - norm * (H - 2 * PAD)
                                                return (
                                                    <circle
                                                        key={`${prop.key}-${kf.id}`}
                                                        cx={x} cy={y} r={4}
                                                        fill={prop.color} stroke="#050505" strokeWidth={1}
                                                        className="cursor-grab active:cursor-grabbing"
                                                        onPointerDown={e => handleSvgPointerDown(e, realIdx, prop.key)}
                                                    />
                                                )
                                            })}
                                        </g>
                                    )
                                })}

                                {/* Time cursor */}
                                <line
                                    ref={cursorRef}
                                    x1={PAD} y1={PAD}
                                    x2={PAD} y2={H - PAD}
                                    stroke="rgba(232,78,45,0.6)" strokeWidth={1}
                                />
                            </svg>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
