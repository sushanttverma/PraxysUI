'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Link2 } from 'lucide-react'
import { AnimationChain, ChainPhase, AnimationConfig } from '../lib/types'
import { presets } from '../lib/presets'
import { cn } from '@/lib/utils'

interface ChainPanelProps {
    chain: AnimationChain
    onChange: (chain: AnimationChain) => void
    expanded: boolean
    onToggle: () => void
}

const PHASE_COLORS: Record<ChainPhase, string> = {
    enter: 'text-green-400',
    idle: 'text-blue-400',
    exit: 'text-orange-400',
}

const PHASE_BG: Record<ChainPhase, string> = {
    enter: 'bg-green-500/10 border-green-500/20',
    idle: 'bg-blue-500/10 border-blue-500/20',
    exit: 'bg-orange-500/10 border-orange-500/20',
}

export default function ChainPanel({ chain, onChange, expanded, onToggle }: ChainPanelProps) {
    const updatePhaseConfig = (phase: ChainPhase, config: AnimationConfig) => {
        onChange({ ...chain, [phase]: config })
    }

    const updatePhaseDuration = (phase: ChainPhase, duration: number) => {
        const key = `${phase}Duration` as 'enterDuration' | 'idleDuration' | 'exitDuration'
        onChange({ ...chain, [key]: duration })
    }

    const applyPresetToPhase = (phase: ChainPhase, presetName: string) => {
        const preset = presets.find(p => p.name === presetName)
        if (preset) {
            updatePhaseConfig(phase, { ...preset.config })
        }
    }

    return (
        <div className="border-t border-border pt-4">
            <button
                onClick={onToggle}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors mb-2 w-full"
            >
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                <Link2 className="h-3 w-3" />
                Animation Chain
                <span className={cn(
                    'ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full border',
                    chain.enabled ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-white/[0.08] text-white/25'
                )}>
                    {chain.enabled ? 'ON' : 'OFF'}
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
                            {/* Enable toggle */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={chain.enabled}
                                    onChange={e => onChange({ ...chain, enabled: e.target.checked })}
                                    className="sr-only"
                                />
                                <div className={cn(
                                    'relative h-5 w-9 rounded-full border-2 transition-colors',
                                    chain.enabled ? 'border-green-500 bg-green-500' : 'border-border bg-obsidian'
                                )}>
                                    <div className={cn(
                                        'absolute top-[2px] h-[12px] w-[12px] rounded-full bg-white shadow-sm transition-transform',
                                        chain.enabled ? 'translate-x-[16px]' : 'translate-x-[2px]'
                                    )} />
                                </div>
                                <span className="text-xs text-blush">Enable chain mode</span>
                            </label>

                            {chain.enabled && (
                                <>
                                    {/* Phase tabs */}
                                    <div className="flex gap-1">
                                        {(['enter', 'idle', 'exit'] as ChainPhase[]).map(phase => (
                                            <button
                                                key={phase}
                                                onClick={() => onChange({ ...chain, activePhase: phase })}
                                                className={cn(
                                                    'flex-1 px-2 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider border transition-colors',
                                                    chain.activePhase === phase
                                                        ? PHASE_BG[phase] + ' ' + PHASE_COLORS[phase]
                                                        : 'border-border text-blush hover:text-chalk'
                                                )}
                                            >
                                                {phase}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Duration slider for active phase */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className={PHASE_COLORS[chain.activePhase]}>
                                                {chain.activePhase} Duration
                                            </span>
                                            <span className="text-chalk font-mono">
                                                {chain[`${chain.activePhase}Duration`].toFixed(2)}s
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min={0.1} max={5} step={0.1}
                                            value={chain[`${chain.activePhase}Duration`]}
                                            onChange={e => updatePhaseDuration(chain.activePhase, Number(e.target.value))}
                                            className="slider-thumb w-full"
                                        />
                                    </div>

                                    {/* Phase preset selector */}
                                    <div>
                                        <div className="text-[10px] font-semibold text-text-faint uppercase tracking-wider mb-1.5">
                                            Phase Preset
                                        </div>
                                        <select
                                            onChange={e => applyPresetToPhase(chain.activePhase, e.target.value)}
                                            className="w-full h-8 rounded-md border border-border bg-obsidian text-xs text-blush px-2 outline-none"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Select preset...</option>
                                            {presets.map(p => (
                                                <option key={p.name} value={p.name}>{p.name}</option>
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
