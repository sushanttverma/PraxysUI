'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Columns2 } from 'lucide-react'
import { ComparisonConfig, AnimationConfig } from '../lib/types'
import { presets } from '../lib/presets'
import { cn } from '@/lib/utils'

const EASING_OPTIONS = [
    'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear',
    'cubic-bezier(0.34, 1.56, 0.64, 1)',
]

interface ComparisonPanelProps {
    comparison: ComparisonConfig
    onChange: (config: ComparisonConfig) => void
    expanded: boolean
    onToggle: () => void
    disabled?: boolean
}

export default function ComparisonPanel({ comparison, onChange, expanded, onToggle, disabled }: ComparisonPanelProps) {
    const applyPresetB = (presetName: string) => {
        const preset = presets.find(p => p.name === presetName)
        if (preset) {
            onChange({ ...comparison, configB: { ...preset.config } })
        }
    }

    return (
        <div className="border-t border-border pt-4">
            <button
                onClick={onToggle}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors mb-2 w-full"
            >
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                <Columns2 className="h-3 w-3" />
                A/B Comparison
                <span className={cn(
                    'ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full border',
                    comparison.enabled ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' : 'border-white/[0.08] text-white/25'
                )}>
                    {comparison.enabled ? 'ON' : 'OFF'}
                </span>
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-3 pt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={comparison.enabled}
                                    onChange={e => onChange({ ...comparison, enabled: e.target.checked })}
                                    disabled={disabled}
                                    className="sr-only"
                                />
                                <div className={cn(
                                    'relative h-5 w-9 rounded-full border-2 transition-colors',
                                    disabled ? 'opacity-40 cursor-not-allowed' : '',
                                    comparison.enabled ? 'border-blue-500 bg-blue-500' : 'border-border bg-obsidian'
                                )}>
                                    <div className={cn(
                                        'absolute top-[2px] h-[12px] w-[12px] rounded-full bg-white shadow-sm transition-transform',
                                        comparison.enabled ? 'translate-x-[16px]' : 'translate-x-[2px]'
                                    )} />
                                </div>
                                <span className="text-xs text-blush">Enable comparison</span>
                            </label>

                            {disabled && (
                                <p className="text-[10px] text-amber-400/60">
                                    Disabled while scroll trigger is active.
                                </p>
                            )}

                            {comparison.enabled && !disabled && (
                                <>
                                    {/* Side B preset */}
                                    <div>
                                        <div className="text-[10px] font-semibold text-text-faint uppercase tracking-wider mb-1.5">
                                            Side B Preset
                                        </div>
                                        <select
                                            onChange={e => applyPresetB(e.target.value)}
                                            className="w-full h-8 rounded-md border border-border bg-obsidian text-xs text-blush px-2 outline-none"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Select preset...</option>
                                            {presets.map(p => (
                                                <option key={p.name} value={p.name}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Side B easing */}
                                    <div>
                                        <div className="text-[10px] font-semibold text-text-faint uppercase tracking-wider mb-1.5">
                                            Side B Easing
                                        </div>
                                        <select
                                            value={comparison.easingB}
                                            onChange={e => onChange({ ...comparison, easingB: e.target.value })}
                                            className="w-full h-8 rounded-md border border-border bg-obsidian text-xs text-blush px-2 outline-none"
                                        >
                                            {EASING_OPTIONS.map(e => (
                                                <option key={e} value={e}>{e}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
