'use client'

import React, { useState, useMemo } from 'react'
import { AnimationPreset, PreviewShape, getRegistrySlug } from '../lib/types'
import { presetCategories, presets } from '../lib/presets'
import { cn } from '@/lib/utils'

const componentPresetHints: Record<string, string[]> = {
    'animated-button': ['shimmer', 'popover', 'pulse', 'bounce'],
    'creepy-button': ['creepyFlicker', 'shake', 'jello', 'glitchIn'],
    'social-flip-button': ['socialFlip', 'flip', 'flipText'],
    'modal-dialog': ['modalSpring', 'modalIn', 'scaleIn', 'fadeIn'],
    'toast-notification': ['toastSlide', 'toast', 'slideRight', 'slideLeft'],
    'animated-toggle': ['toggleKnob', 'switch'],
    'checkbox': ['checkBounce', 'scaleIn'],
    'badge': ['popover', 'scaleIn', 'pulse', 'ping'],
    'glass-dock': ['dockBounce', 'bounce'],
    'dropdown-menu': ['dropdown', 'popover', 'slideDown'],
    'flip-text': ['flipText', 'flipFade', 'typewriter'],
    'flip-fade-text': ['flipFade', 'flipText', 'fadeIn'],
    'skeleton-loader': ['skeleton', 'shimmer'],
    'tooltip': ['tooltip', 'popover', 'fadeIn'],
    'accordion': ['unfold', 'slideDown', 'drawer'],
    'animated-tabs': ['tabSlide', 'slideLeft', 'slideRight'],
    'spotlight-card': ['shimmer', 'lightBeam', 'scaleIn'],
    'glow-border-card': ['shimmer', 'lightBeam', 'pulse'],
    'animated-input': ['fadeIn', 'slideUp', 'scaleIn'],
    'animated-hero': ['heroReveal', 'heroFloat', 'heroZoom', 'heroStagger'],
    'masked-avatars': ['avatarPop', 'scaleIn', 'cascadeIn'],
    'folder-preview': ['folderOpen', 'unfold'],
    'animated-number': ['fadeIn', 'slideUp', 'bounce'],
    'animated-counter': ['fadeIn', 'slideUp', 'bounce'],
    'stats-card': ['slideUp', 'fadeIn', 'scaleIn'],
    'progress-bar': ['slideRight', 'shimmer'],
    'stepper': ['slideRight', 'tabSlide'],
    'sheet': ['drawer', 'slideRight', 'slideLeft'],
    'pagination': ['tabSlide', 'slideLeft', 'slideRight'],
    'alert': ['toast', 'slideDown', 'fadeIn'],
    'tag-input': ['popover', 'scaleIn'],
    'morphing-text': ['morphIn', 'flipText', 'typewriter'],
    'typewriter-text': ['typewriter', 'flipText'],
    'spotlight-navbar': ['shimmer', 'lightBeam', 'slideDown'],
    'magnetic-cursor': ['magnetic', 'orbit'],
    'reveal-loader': ['curtainReveal', 'shimmer'],
    'staggered-grid': ['gridReveal', 'cascadeIn', 'heroStagger'],
    'perspective-grid': ['gridReveal', 'vortex', 'orbit'],
    'logo-slider': ['slideLeft', 'slideRight', 'shimmer'],
    'interactive-book': ['pageFlip', 'flip', 'unfold'],
    'floating-menu': ['popover', 'scaleIn', 'fadeIn'],
    'command-menu': ['modalIn', 'modalSpring', 'scaleIn'],
}

interface PresetsPanelProps {
    activePresetName: string | null
    onApplyPreset: (preset: AnimationPreset) => void
    previewShape?: PreviewShape
}

export default function PresetsPanel({ activePresetName, onApplyPreset, previewShape }: PresetsPanelProps) {
    const [activeCategory, setActiveCategory] = useState(0)

    const slug = previewShape ? getRegistrySlug(previewShape) : null
    const hintNames = slug ? componentPresetHints[slug] : null

    const recommendedPresets = useMemo(() => {
        if (!hintNames) return null
        const matched = hintNames
            .map(name => presets.find(p => p.name === name))
            .filter((p): p is AnimationPreset => !!p)
        return matched.length > 0 ? matched : null
    }, [hintNames])

    const effectiveCategories = useMemo(() => {
        if (!slug) return presetCategories
        if (recommendedPresets) return presetCategories
        const praxysIdx = presetCategories.findIndex(c => c.label === 'Praxys UI')
        if (praxysIdx <= 0) return presetCategories
        const reordered = [...presetCategories]
        const [praxys] = reordered.splice(praxysIdx, 1)
        return [praxys, ...reordered]
    }, [slug, recommendedPresets])

    const category = effectiveCategories[activeCategory]

    return (
        <div>
            <h3 className="text-xs font-semibold text-text-faint uppercase tracking-wider mb-3">Presets</h3>

            {/* Recommended presets for current component */}
            {recommendedPresets && (
                <div className="mb-3">
                    <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-[10px] font-semibold text-ignite uppercase tracking-wider">Recommended</span>
                        <span className="px-1.5 py-0.5 rounded-full bg-ignite/10 border border-ignite/20 text-[9px] font-medium text-ignite">
                            {recommendedPresets.length}
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                        {recommendedPresets.map(p => (
                            <button
                                key={p.name}
                                onClick={() => onApplyPreset(p)}
                                className={cn(
                                    'px-2 py-1.5 rounded-md text-xs font-medium transition-colors border truncate',
                                    activePresetName === p.name
                                        ? 'border-ignite bg-ignite/10 text-ignite'
                                        : 'border-ignite/20 bg-ignite/[0.04] text-blush hover:text-chalk hover:border-ignite/30'
                                )}
                                title={p.name}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                    <div className="h-px bg-border mb-3" />
                </div>
            )}

            {/* Category tabs */}
            <div className="flex gap-1 mb-3 overflow-x-auto scrollbar-none pb-0.5">
                {effectiveCategories.map((cat, i) => (
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
