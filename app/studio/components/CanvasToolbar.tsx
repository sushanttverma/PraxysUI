'use client'

import React from 'react'
import { Sun, Moon, Grid3X3, Layers } from 'lucide-react'
import { GridSnapConfig, OnionSkinConfig } from '../lib/types'
import { cn } from '@/lib/utils'

interface CanvasToolbarProps {
    canvasTheme: 'dark' | 'light'
    onThemeToggle: () => void
    gridSnap: GridSnapConfig
    onGridSnapChange: (config: GridSnapConfig) => void
    onionSkin: OnionSkinConfig
    onOnionSkinChange: (config: OnionSkinConfig) => void
}

export default function CanvasToolbar({
    canvasTheme,
    onThemeToggle,
    gridSnap,
    onGridSnapChange,
    onionSkin,
    onOnionSkinChange,
}: CanvasToolbarProps) {
    return (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-lg border border-white/[0.08] bg-void/80 backdrop-blur-md px-1.5 py-1">
            {/* Dark/Light toggle */}
            <button
                onClick={onThemeToggle}
                className={cn(
                    'flex items-center justify-center h-7 w-7 rounded-md transition-colors',
                    'text-white/40 hover:text-white/70 hover:bg-white/[0.06]'
                )}
                title={canvasTheme === 'dark' ? 'Switch to light' : 'Switch to dark'}
            >
                {canvasTheme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>

            {/* Grid snap toggle */}
            <button
                onClick={() => onGridSnapChange({ ...gridSnap, enabled: !gridSnap.enabled })}
                className={cn(
                    'flex items-center justify-center h-7 w-7 rounded-md transition-colors',
                    gridSnap.enabled
                        ? 'text-ignite bg-ignite/10'
                        : 'text-white/40 hover:text-white/70 hover:bg-white/[0.06]'
                )}
                title="Grid snap"
            >
                <Grid3X3 className="h-3.5 w-3.5" />
            </button>

            {/* Grid size selector (shown when grid enabled) */}
            {gridSnap.enabled && (
                <select
                    value={gridSnap.size}
                    onChange={e => onGridSnapChange({ ...gridSnap, size: Number(e.target.value) })}
                    className="h-7 rounded-md border border-white/[0.08] bg-void text-[10px] text-white/60 px-1 outline-none"
                >
                    {[8, 16, 24, 32, 48].map(s => (
                        <option key={s} value={s}>{s}px</option>
                    ))}
                </select>
            )}

            {/* Onion skin toggle */}
            <button
                onClick={() => onOnionSkinChange({ ...onionSkin, enabled: !onionSkin.enabled })}
                className={cn(
                    'flex items-center justify-center h-7 w-7 rounded-md transition-colors',
                    onionSkin.enabled
                        ? 'text-purple-400 bg-purple-400/10'
                        : 'text-white/40 hover:text-white/70 hover:bg-white/[0.06]'
                )}
                title="Onion skin"
            >
                <Layers className="h-3.5 w-3.5" />
            </button>

            {/* Onion opacity slider (shown when enabled) */}
            {onionSkin.enabled && (
                <input
                    type="range"
                    min={0.05} max={0.5} step={0.05}
                    value={onionSkin.opacity}
                    onChange={e => onOnionSkinChange({ ...onionSkin, opacity: Number(e.target.value) })}
                    className="w-16 h-1 slider-thumb"
                    title={`Opacity: ${onionSkin.opacity.toFixed(2)}`}
                />
            )}
        </div>
    )
}
