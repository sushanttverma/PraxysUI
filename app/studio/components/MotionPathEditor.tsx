'use client'

import React, { useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { MotionPathConfig } from '../lib/types'
import { pointsToSvgD, getTemplatePath } from '../lib/motionPath'

interface MotionPathEditorProps {
    config: MotionPathConfig
    onChange: (config: MotionPathConfig) => void
    expanded: boolean
    onToggle: () => void
}

type DragTarget = { type: 'anchor'; idx: number } | { type: 'control'; idx: number; which: 'c1' | 'c2' }

const templates: { key: 'line' | 'curve' | 'arc' | 'figure8'; label: string }[] = [
    { key: 'line', label: 'Line' },
    { key: 'curve', label: 'S-Curve' },
    { key: 'arc', label: 'Arc' },
    { key: 'figure8', label: 'Figure-8' },
]

export default function MotionPathEditor({ config, onChange, expanded, onToggle }: MotionPathEditorProps) {
    const svgRef = useRef<SVGSVGElement>(null)
    const dragTarget = useRef<DragTarget | null>(null)
    const [activePoint, setActivePoint] = useState<number>(0)

    const SIZE = 300

    const getPos = useCallback((e: React.PointerEvent): { x: number; y: number } => {
        if (!svgRef.current) return { x: 0, y: 0 }
        const rect = svgRef.current.getBoundingClientRect()
        return {
            x: Math.max(0, Math.min(SIZE, (e.clientX - rect.left) / rect.width * SIZE)),
            y: Math.max(0, Math.min(SIZE, (e.clientY - rect.top) / rect.height * SIZE)),
        }
    }, [])

    const handlePointerDown = useCallback((e: React.PointerEvent, target: DragTarget) => {
        e.preventDefault()
        e.stopPropagation()
        ;(e.target as SVGElement).setPointerCapture(e.pointerId)
        dragTarget.current = target
        if (target.type === 'anchor') setActivePoint(target.idx)
    }, [])

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!dragTarget.current) return
        const pos = getPos(e)
        const points = [...config.points]
        const t = dragTarget.current

        if (t.type === 'anchor') {
            const old = points[t.idx]
            const dx = pos.x - old.x
            const dy = pos.y - old.y
            points[t.idx] = {
                ...old,
                x: pos.x,
                y: pos.y,
                cx1: old.cx1 + dx,
                cy1: old.cy1 + dy,
                cx2: old.cx2 + dx,
                cy2: old.cy2 + dy,
            }
        } else {
            const old = points[t.idx]
            if (t.which === 'c1') {
                points[t.idx] = { ...old, cx1: pos.x, cy1: pos.y }
            } else {
                points[t.idx] = { ...old, cx2: pos.x, cy2: pos.y }
            }
        }

        onChange({ ...config, points })
    }, [config, getPos, onChange])

    const handlePointerUp = useCallback(() => {
        dragTarget.current = null
    }, [])

    const pathD = pointsToSvgD(config.points)

    return (
        <div>
            <button
                onClick={onToggle}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors w-full justify-between"
            >
                <div className="flex items-center gap-1.5">
                    {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    <span className="text-xs font-semibold text-text-faint uppercase tracking-wider">Motion Path</span>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer" onClick={e => e.stopPropagation()}>
                    <input
                        type="checkbox"
                        checked={config.enabled}
                        onChange={e => onChange({ ...config, enabled: e.target.checked })}
                        className="rounded border-border bg-obsidian accent-ignite"
                    />
                    <span className="text-[10px] text-blush">{config.enabled ? 'On' : 'Off'}</span>
                </label>
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-3 space-y-3">
                            {/* Template paths */}
                            <div className="flex gap-1">
                                {templates.map(t => (
                                    <button
                                        key={t.key}
                                        onClick={() => onChange({ ...config, points: getTemplatePath(t.key) })}
                                        className="flex-1 px-2 py-1 rounded-md text-[10px] font-medium transition-colors border border-border text-blush hover:text-chalk hover:border-border-light"
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>

                            {/* Auto-rotate toggle */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.autoRotate}
                                    onChange={e => onChange({ ...config, autoRotate: e.target.checked })}
                                    className="rounded border-border bg-obsidian accent-ignite"
                                />
                                <span className="text-xs text-blush">Auto-rotate along path</span>
                            </label>

                            {/* SVG Path Editor */}
                            <div className="rounded-lg border border-border bg-void overflow-hidden">
                                <svg
                                    ref={svgRef}
                                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                                    className="w-full aspect-square touch-none"
                                    onPointerMove={handlePointerMove}
                                    onPointerUp={handlePointerUp}
                                    onPointerLeave={handlePointerUp}
                                >
                                    {/* Grid */}
                                    {[75, 150, 225].map(v => (
                                        <React.Fragment key={v}>
                                            <line x1={v} y1={0} x2={v} y2={SIZE} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
                                            <line x1={0} y1={v} x2={SIZE} y2={v} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
                                        </React.Fragment>
                                    ))}

                                    {/* Path */}
                                    <path
                                        d={pathD}
                                        fill="none"
                                        stroke="#E84E2D"
                                        strokeWidth={2}
                                        strokeDasharray="6 4"
                                    />

                                    {/* Control handles */}
                                    {config.points.map((point, idx) => (
                                        <g key={idx}>
                                            {/* Control lines */}
                                            <line x1={point.x} y1={point.y} x2={point.cx1} y2={point.cy1} stroke="rgba(232,78,45,0.3)" strokeWidth={1} />
                                            <line x1={point.x} y1={point.y} x2={point.cx2} y2={point.cy2} stroke="rgba(232,78,45,0.3)" strokeWidth={1} />

                                            {/* Control points */}
                                            <circle
                                                cx={point.cx1} cy={point.cy1} r={4}
                                                fill="transparent" stroke="#E84E2D" strokeWidth={1}
                                                className="cursor-grab active:cursor-grabbing"
                                                onPointerDown={e => handlePointerDown(e, { type: 'control', idx, which: 'c1' })}
                                            />
                                            <circle
                                                cx={point.cx2} cy={point.cy2} r={4}
                                                fill="transparent" stroke="#E84E2D" strokeWidth={1}
                                                className="cursor-grab active:cursor-grabbing"
                                                onPointerDown={e => handlePointerDown(e, { type: 'control', idx, which: 'c2' })}
                                            />

                                            {/* Anchor point */}
                                            <circle
                                                cx={point.x} cy={point.y} r={6}
                                                fill={activePoint === idx ? '#E84E2D' : 'rgba(232,78,45,0.5)'}
                                                stroke="#050505" strokeWidth={1.5}
                                                className="cursor-grab active:cursor-grabbing"
                                                onPointerDown={e => handlePointerDown(e, { type: 'anchor', idx })}
                                            />
                                        </g>
                                    ))}
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
