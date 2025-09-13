'use client'

import React, { useState } from 'react'
import { AnimationPreset } from '../lib/types'
import { presetCategories, PresetCategory } from '../lib/presets'
import { cn } from '@/lib/utils'

interface PresetsPanelProps {
    activePresetName: string | null
    onApplyPreset: (preset: AnimationPreset) => void
}

export default function PresetsPanel({ activePresetName, onApplyPreset }: PresetsPanelProps) {
    const [activeCategory, setActiveCategory] = useState(0)
    const category = presetCategories[activeCategory]

    return (
        <div>
            <h3 className="text-xs font-semibold text-text-faint uppercase tracking-wider mb-3">Presets</h3>

            {/* Category tabs */}
            <div className="flex gap-1 mb-3 overflow-x-auto scrollbar-none pb-0.5">
                {presetCategories.map((cat, i) => (
                    <button
                        key={cat.label}
                        onClick={() => setActiveCategory(i)}
                        className={cn(
                            'px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors border whitespace-nowrap',
                            activeCategory === i
                                ? 'border-ignite bg-ignite/10 text-ignite'
                                : 'border-border text-text-faint hover:text-blush hover:border-border-light'
                        )}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Preset grid for active category */}
            <div className="grid grid-cols-3 gap-1.5">
                {category.presets.map(p => (
                    <button
                        key={p.name}
                        onClick={() => onApplyPreset(p)}
                        className={cn(
                            'px-2 py-1.5 rounded-md text-xs font-medium transition-colors border truncate',
                            activePresetName === p.name
                                ? 'border-ignite bg-ignite/10 text-ignite'
                                : 'border-border text-blush hover:text-chalk hover:border-border-light'
                        )}
                        title={p.name}
                    >
                        {p.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
