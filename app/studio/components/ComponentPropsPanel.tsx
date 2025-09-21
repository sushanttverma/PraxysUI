'use client'

import React, { useState } from 'react'
import { componentRegistry } from '@/lib/registry'
import type { PlaygroundPropDef } from '@/lib/registry'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface ComponentPropsPanelProps {
    slug: string
    values: Record<string, unknown>
    onChange: (values: Record<string, unknown>) => void
}

export default function ComponentPropsPanel({ slug, values, onChange }: ComponentPropsPanelProps) {
    const [expanded, setExpanded] = useState(true)
    const entry = componentRegistry[slug]
    if (!entry?.playground) return null

    const controls = entry.playground.controls

    const updateProp = (name: string, value: unknown) => {
        onChange({ ...values, [name]: value })
    }

    return (
        <div className="border-t border-border pt-4">
            <button
                onClick={() => setExpanded(e => !e)}
                className="flex items-center justify-between w-full mb-3"
            >
                <h3 className="text-xs font-semibold text-text-faint uppercase tracking-wider">
                    Component Props
                </h3>
                <ChevronDown className={cn(
                    'h-3.5 w-3.5 text-white/30 transition-transform',
                    expanded && 'rotate-180'
                )} />
            </button>

            {expanded && (
                <div className="space-y-3">
                    {controls.map((control: PlaygroundPropDef) => (
                        <div key={control.name} className="space-y-1">
                            <label className="text-[10px] font-medium text-blush uppercase tracking-wider">
                                {control.label}
                            </label>
                            {renderControl(control, values[control.name], (v) => updateProp(control.name, v))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function renderControl(
    control: PlaygroundPropDef,
    value: unknown,
    onChange: (value: unknown) => void,
) {
    switch (control.type) {
        case 'text':
            return (
                <input
                    type="text"
                    value={(value as string) ?? control.default}
                    onChange={e => onChange(e.target.value)}
                    className="w-full h-8 rounded-md border border-border bg-obsidian px-2.5 text-xs text-chalk focus:border-ignite/50 focus:outline-none"
                />
            )

        case 'number':
            return (
                <div className="flex items-center gap-2">
                    <input
                        type="range"
                        min={control.min ?? 0}
                        max={control.max ?? 100}
                        step={control.step ?? 1}
                        value={(value as number) ?? control.default}
                        onChange={e => onChange(Number(e.target.value))}
                        className="flex-1 h-1 accent-ignite"
                    />
                    <span className="text-[10px] font-mono text-chalk w-8 text-right">
                        {(value as number) ?? control.default}
                    </span>
                </div>
            )

        case 'boolean':
            return (
                <button
                    onClick={() => onChange(!(value as boolean))}
                    className={cn(
                        'relative h-5 w-9 rounded-full border-2 transition-colors',
                        (value as boolean)
                            ? 'border-ignite bg-ignite'
                            : 'border-border bg-obsidian'
                    )}
                >
                    <div className={cn(
                        'absolute top-[2px] h-[12px] w-[12px] rounded-full transition-all',
                        (value as boolean)
                            ? 'right-[2px] bg-chalk'
                            : 'left-[2px] bg-blush'
                    )} />
                </button>
            )

        case 'select':
            return (
                <div className="flex flex-wrap gap-1">
                    {control.options.map(opt => (
                        <button
                            key={opt}
                            onClick={() => onChange(opt)}
                            className={cn(
                                'px-2 py-0.5 rounded-md text-[10px] font-medium border transition-colors',
                                value === opt
                                    ? 'border-ignite bg-ignite/10 text-ignite'
                                    : 'border-border text-blush hover:text-chalk hover:border-border-light'
                            )}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )

        case 'color':
            return (
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={(value as string) ?? control.default}
                        onChange={e => onChange(e.target.value)}
                        className="h-7 w-7 rounded border border-border bg-transparent cursor-pointer"
                    />
                    <span className="text-[10px] font-mono text-chalk">
                        {(value as string) ?? control.default}
                    </span>
                </div>
            )

        default:
            return null
    }
}
