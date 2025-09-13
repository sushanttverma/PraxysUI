'use client'

import React, { useRef, useCallback } from 'react'
import { EasingMode, SpringConfig } from '../lib/types'
import { NAMED_EASING_LIST, easingToCubicPoints } from '../lib/easing'
import { cn } from '@/lib/utils'
import SpringEditor from './SpringEditor'

interface EasingPanelProps {
    easingMode: EasingMode
    namedEasing: string
    controlPoints: [number, number, number, number]
    springConfig: SpringConfig
    onEasingModeChange: (mode: EasingMode) => void
    onNamedEasingChange: (easing: string) => void
    onControlPointsChange: (points: [number, number, number, number]) => void
    onSpringConfigChange: (config: SpringConfig) => void
}

export default function EasingPanel({
    easingMode,
    namedEasing,
    controlPoints,
    springConfig,
    onEasingModeChange,
    onNamedEasingChange,
    onControlPointsChange,
    onSpringConfigChange,
}: EasingPanelProps) {
    const easingSvgRef = useRef<SVGSVGElement>(null)
    const draggingPoint = useRef<'p1' | 'p2' | null>(null)

    const handleEasingPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
        if (!draggingPoint.current || !easingSvgRef.current) return
        const rect = easingSvgRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
        const y = Math.max(-0.5, Math.min(1.5, 1 - (e.clientY - rect.top) / rect.height))
        onControlPointsChange(
            draggingPoint.current === 'p1'
                ? [+x.toFixed(2), +y.toFixed(2), controlPoints[2], controlPoints[3]]
                : [controlPoints[0], controlPoints[1], +x.toFixed(2), +y.toFixed(2)]
        )
    }, [controlPoints, onControlPointsChange])

    const handleEasingPointerUp = useCallback(() => {
        draggingPoint.current = null
    }, [])

    const modes: { key: EasingMode; label: string }[] = [
        { key: 'named', label: 'Named' },
        { key: 'cubic-bezier', label: 'Bezier' },
        { key: 'spring', label: 'Spring' },
    ]

    return (
        <div>
            <h3 className="text-xs font-semibold text-text-faint uppercase tracking-wider mb-3">Easing</h3>

            {/* Mode tabs */}
            <div className="flex gap-1 mb-3">
                {modes.map(m => (
                    <button
                        key={m.key}
                        onClick={() => {
                            onEasingModeChange(m.key)
                            if (m.key === 'cubic-bezier') {
                                const pts = easingToCubicPoints(namedEasing)
                                onControlPointsChange(pts)
                            }
                        }}
                        className={cn(
                            'flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors border',
                            easingMode === m.key
                                ? 'border-ignite bg-ignite/10 text-ignite'
                                : 'border-border text-blush hover:text-chalk hover:border-border-light'
                        )}
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            {/* Named easings */}
            {easingMode === 'named' && (
                <div className="flex flex-wrap gap-1.5">
                    {NAMED_EASING_LIST.map(e => (
                        <button
                            key={e}
                            onClick={() => onNamedEasingChange(e)}
                            className={cn(
                                'px-2.5 py-1 rounded-md text-xs font-medium transition-colors border',
                                namedEasing === e
                                    ? 'border-ignite bg-ignite/10 text-ignite'
                                    : 'border-border text-blush hover:text-chalk hover:border-border-light'
                            )}
                        >
                            {e}
                        </button>
                    ))}
                </div>
            )}

            {/* Cubic-bezier editor */}
            {easingMode === 'cubic-bezier' && (
                <div className="space-y-2">
                    <div className="rounded-lg border border-border bg-void p-2">
                        <svg
                            ref={easingSvgRef}
                            viewBox="-0.05 -0.15 1.1 1.3"
                            className="w-full aspect-square max-w-[160px] mx-auto touch-none"
                            onPointerMove={handleEasingPointerMove}
                            onPointerUp={handleEasingPointerUp}
                            onPointerLeave={handleEasingPointerUp}
                        >
                            {/* Grid */}
                            {[0.25, 0.5, 0.75].map(v => (
                                <React.Fragment key={v}>
                                    <line x1={v} y1={0} x2={v} y2={1} stroke="rgba(255,255,255,0.06)" strokeWidth={0.005} />
                                    <line x1={0} y1={v} x2={1} y2={v} stroke="rgba(255,255,255,0.06)" strokeWidth={0.005} />
                                </React.Fragment>
                            ))}
                            <rect x={0} y={0} width={1} height={1} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={0.005} />

                            {/* Guide lines */}
                            <line x1={0} y1={1} x2={controlPoints[0]} y2={1 - controlPoints[1]} stroke="rgba(232,78,45,0.4)" strokeWidth={0.01} strokeDasharray="0.02 0.02" />
                            <line x1={1} y1={0} x2={controlPoints[2]} y2={1 - controlPoints[3]} stroke="rgba(232,78,45,0.4)" strokeWidth={0.01} strokeDasharray="0.02 0.02" />

                            {/* Curve */}
                            <path
                                d={`M 0 1 C ${controlPoints[0]} ${1 - controlPoints[1]}, ${controlPoints[2]} ${1 - controlPoints[3]}, 1 0`}
                                fill="none" stroke="#E84E2D" strokeWidth={0.02}
                            />

                            {/* Control points */}
                            <circle
                                cx={controlPoints[0]} cy={1 - controlPoints[1]} r={0.035}
                                fill="#E84E2D" stroke="#050505" strokeWidth={0.01}
                                className="cursor-grab active:cursor-grabbing"
                                onPointerDown={e => { e.preventDefault(); draggingPoint.current = 'p1' }}
                            />
                            <circle
                                cx={controlPoints[2]} cy={1 - controlPoints[3]} r={0.035}
                                fill="#E84E2D" stroke="#050505" strokeWidth={0.01}
                                className="cursor-grab active:cursor-grabbing"
                                onPointerDown={e => { e.preventDefault(); draggingPoint.current = 'p2' }}
                            />

                            <circle cx={0} cy={1} r={0.02} fill="rgba(255,255,255,0.3)" />
                            <circle cx={1} cy={0} r={0.02} fill="rgba(255,255,255,0.3)" />
                        </svg>
                    </div>
                    <p className="text-[10px] font-mono text-blush text-center">
                        cubic-bezier({controlPoints.map(v => v.toFixed(2)).join(', ')})
                    </p>
                </div>
            )}

            {/* Spring editor */}
            {easingMode === 'spring' && (
                <SpringEditor config={springConfig} onChange={onSpringConfigChange} />
            )}
        </div>
    )
}
