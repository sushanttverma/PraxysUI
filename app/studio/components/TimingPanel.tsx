'use client'

import React from 'react'
import { AnimationConfig } from '../lib/types'
import { cn } from '@/lib/utils'

interface TimingPanelProps {
    config: AnimationConfig
    onUpdate: (updates: Partial<AnimationConfig>) => void
}

const directions: AnimationConfig['direction'][] = ['normal', 'reverse', 'alternate', 'alternate-reverse']
const fillModes: AnimationConfig['fillMode'][] = ['none', 'forwards', 'backwards', 'both']

export default function TimingPanel({ config, onUpdate }: TimingPanelProps) {
    return (
        <div>
            <h3 className="text-xs font-semibold text-text-faint uppercase tracking-wider mb-3">Timing</h3>
            <div className="space-y-3">
                <Slider label="Duration" value={config.duration} min={0.1} max={5} step={0.1} unit="s"
                    onChange={v => onUpdate({ duration: v })} />
                <Slider label="Delay" value={config.delay} min={0} max={3} step={0.1} unit="s"
                    onChange={v => onUpdate({ delay: v })} />
            </div>

            <div className="mt-3">
                <span className="text-xs text-blush mb-1.5 block">Direction</span>
                <div className="flex flex-wrap gap-1">
                    {directions.map(d => (
                        <button
                            key={d}
                            onClick={() => onUpdate({ direction: d })}
                            className={cn(
                                'px-2 py-1 rounded-md text-[10px] font-medium transition-colors border',
                                config.direction === d
                                    ? 'border-ignite bg-ignite/10 text-ignite'
                                    : 'border-border text-blush hover:text-chalk hover:border-border-light'
                            )}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-3">
                <span className="text-xs text-blush mb-1.5 block">Fill Mode</span>
                <div className="flex flex-wrap gap-1">
                    {fillModes.map(f => (
                        <button
                            key={f}
                            onClick={() => onUpdate({ fillMode: f })}
                            className={cn(
                                'px-2 py-1 rounded-md text-[10px] font-medium transition-colors border',
                                config.fillMode === f
                                    ? 'border-ignite bg-ignite/10 text-ignite'
                                    : 'border-border text-blush hover:text-chalk hover:border-border-light'
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

function Slider({ label, value, min, max, step = 1, unit = '', onChange }: {
    label: string; value: number; min: number; max: number; step?: number; unit?: string
    onChange: (v: number) => void
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
                <span className="text-blush">{label}</span>
                <span className="text-chalk font-mono">{Number.isInteger(step) ? value : value.toFixed(2)}{unit}</span>
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
