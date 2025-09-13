'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { SequencerConfig, StaggerDirection } from '../lib/types'
import { cn } from '@/lib/utils'

interface SequencerProps {
    config: SequencerConfig
    onChange: (config: SequencerConfig) => void
    expanded: boolean
    onToggle: () => void
}

const directions: { key: StaggerDirection; label: string }[] = [
    { key: 'forward', label: 'Forward' },
    { key: 'reverse', label: 'Reverse' },
    { key: 'center', label: 'Center' },
    { key: 'random', label: 'Random' },
]

export default function Sequencer({ config, onChange, expanded, onToggle }: SequencerProps) {
    const computeDelays = (): number[] => {
        const delays: number[] = []
        for (let i = 0; i < config.elementCount; i++) {
            switch (config.staggerDirection) {
                case 'forward': delays.push(i * config.staggerDelay); break
                case 'reverse': delays.push((config.elementCount - 1 - i) * config.staggerDelay); break
                case 'center': {
                    const mid = (config.elementCount - 1) / 2
                    delays.push(Math.abs(i - mid) * config.staggerDelay)
                    break
                }
                case 'random': delays.push(Math.random() * (config.elementCount - 1) * config.staggerDelay); break
            }
        }
        return delays
    }

    const delays = computeDelays()
    const maxDelay = Math.max(...delays, 0.001)

    return (
        <div>
            <button
                onClick={onToggle}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors w-full justify-between"
            >
                <div className="flex items-center gap-1.5">
                    {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    <span className="text-xs font-semibold text-text-faint uppercase tracking-wider">Sequencer</span>
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
                            {/* Element count */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-blush">Elements</span>
                                    <span className="text-chalk font-mono">{config.elementCount}</span>
                                </div>
                                <input
                                    type="range"
                                    min={2} max={12} step={1}
                                    value={config.elementCount}
                                    onChange={e => onChange({ ...config, elementCount: Number(e.target.value) })}
                                    className="slider-thumb w-full"
                                />
                            </div>

                            {/* Stagger delay */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-blush">Stagger Delay</span>
                                    <span className="text-chalk font-mono">{config.staggerDelay.toFixed(2)}s</span>
                                </div>
                                <input
                                    type="range"
                                    min={0.01} max={0.5} step={0.01}
                                    value={config.staggerDelay}
                                    onChange={e => onChange({ ...config, staggerDelay: Number(e.target.value) })}
                                    className="slider-thumb w-full"
                                />
                            </div>

                            {/* Direction pills */}
                            <div>
                                <span className="text-xs text-blush mb-1.5 block">Direction</span>
                                <div className="flex gap-1">
                                    {directions.map(d => (
                                        <button
                                            key={d.key}
                                            onClick={() => onChange({ ...config, staggerDirection: d.key })}
                                            className={cn(
                                                'flex-1 px-2 py-1 rounded-md text-[10px] font-medium transition-colors border',
                                                config.staggerDirection === d.key
                                                    ? 'border-ignite bg-ignite/10 text-ignite'
                                                    : 'border-border text-blush hover:text-chalk hover:border-border-light'
                                            )}
                                        >
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Stagger visualization */}
                            <div className="space-y-1">
                                <span className="text-[10px] text-white/30">Preview</span>
                                <div className="flex items-end gap-1 h-8">
                                    {delays.map((delay, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 rounded-sm bg-ignite/60 transition-all"
                                            style={{
                                                height: `${Math.max(10, (delay / maxDelay) * 100)}%`,
                                                opacity: 0.4 + (delay / maxDelay) * 0.6,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
