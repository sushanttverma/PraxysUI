'use client'

import React, { useMemo } from 'react'
import { SpringConfig } from '../lib/types'
import { solveSpring, getSettleTime } from '../lib/spring'

interface SpringEditorProps {
    config: SpringConfig
    onChange: (config: SpringConfig) => void
}

export default function SpringEditor({ config, onChange }: SpringEditorProps) {
    const samples = useMemo(() => solveSpring(config, 80), [config])
    const settleTime = useMemo(() => getSettleTime(config), [config])

    // Build SVG path from samples
    const pathD = useMemo(() => {
        if (samples.length === 0) return ''
        const w = 160
        const h = 100
        const padY = 10

        return samples.map((s, i) => {
            const x = s.t * w
            // Normalize value to fit in view — clamp to -0.5..1.5 range
            const normalizedY = Math.max(-0.5, Math.min(1.5, s.value))
            const y = h - padY - normalizedY * (h - 2 * padY)
            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
        }).join(' ')
    }, [samples])

    return (
        <div className="space-y-3">
            {/* Spring curve visualization */}
            <div className="rounded-lg border border-border bg-void p-2">
                <svg viewBox="0 0 160 100" className="w-full" style={{ maxWidth: 200 }}>
                    {/* Grid lines */}
                    <line x1={0} y1={10} x2={160} y2={10} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
                    <line x1={0} y1={50} x2={160} y2={50} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
                    <line x1={0} y1={90} x2={160} y2={90} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />

                    {/* Target line (value = 1) */}
                    <line x1={0} y1={10} x2={160} y2={10} stroke="rgba(255,255,255,0.15)" strokeWidth={0.5} strokeDasharray="3 3" />

                    {/* Spring curve */}
                    <path d={pathD} fill="none" stroke="#E84E2D" strokeWidth={1.5} />

                    {/* Zero line */}
                    <line x1={0} y1={90} x2={160} y2={90} stroke="rgba(255,255,255,0.1)" strokeWidth={0.5} />
                </svg>
            </div>

            {/* Settle time */}
            <div className="text-[10px] text-blush text-center">
                Settle time: {settleTime === Infinity ? '∞' : `${settleTime.toFixed(2)}s`}
            </div>

            {/* Sliders */}
            <Slider label="Mass" value={config.mass} min={0.1} max={10} step={0.1}
                onChange={v => onChange({ ...config, mass: v })} />
            <Slider label="Stiffness" value={config.stiffness} min={1} max={1000} step={1}
                onChange={v => onChange({ ...config, stiffness: v })} />
            <Slider label="Damping" value={config.damping} min={0.1} max={100} step={0.1}
                onChange={v => onChange({ ...config, damping: v })} />
            <Slider label="Velocity" value={config.velocity} min={-10} max={10} step={0.1}
                onChange={v => onChange({ ...config, velocity: v })} />
        </div>
    )
}

function Slider({ label, value, min, max, step = 1, onChange }: {
    label: string; value: number; min: number; max: number; step?: number
    onChange: (v: number) => void
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
                <span className="text-blush">{label}</span>
                <span className="text-chalk font-mono">{Number.isInteger(step) ? value : value.toFixed(1)}</span>
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
