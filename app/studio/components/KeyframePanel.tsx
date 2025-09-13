'use client'

import React, { useState } from 'react'
import { AnimationKeyframe, MotionPathConfig, GridSnapConfig } from '../lib/types'
import { cn } from '@/lib/utils'

interface KeyframePanelProps {
    keyframes: AnimationKeyframe[]
    activeKeyframeIdx: number
    onSelectKeyframe: (idx: number) => void
    onUpdateKeyframe: (idx: number, key: keyof AnimationKeyframe, value: number) => void
    motionPath?: MotionPathConfig
    gridSnap?: GridSnapConfig
}

export default function KeyframePanel({
    keyframes,
    activeKeyframeIdx,
    onSelectKeyframe,
    onUpdateKeyframe,
    motionPath,
    gridSnap,
}: KeyframePanelProps) {
    const activeKf = keyframes[activeKeyframeIdx]
    const sortedKeyframes = [...keyframes].sort((a, b) => a.offset - b.offset)
    const [showPerfHints, setShowPerfHints] = useState(false)

    const translateStep = gridSnap?.enabled ? gridSnap.size : 1

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-text-faint uppercase tracking-wider">Keyframes</h3>
                <button
                    onClick={() => setShowPerfHints(p => !p)}
                    className={cn(
                        'text-[10px] font-medium px-2 py-0.5 rounded-full border transition-colors',
                        showPerfHints
                            ? 'border-green-500/30 bg-green-500/10 text-green-400'
                            : 'border-white/[0.08] text-white/30 hover:text-white/50'
                    )}
                >
                    Perf
                </button>
            </div>

            {/* Keyframe tabs */}
            <div className="flex flex-wrap gap-1 mb-3">
                {sortedKeyframes.map((kf) => {
                    const realIdx = keyframes.indexOf(kf)
                    return (
                        <button
                            key={kf.id}
                            onClick={() => onSelectKeyframe(realIdx)}
                            className={cn(
                                'px-2 py-1.5 rounded-md text-xs font-medium transition-colors border min-w-[50px]',
                                activeKeyframeIdx === realIdx
                                    ? 'border-ignite bg-ignite/10 text-ignite'
                                    : 'border-border text-blush hover:text-chalk hover:border-border-light'
                            )}
                        >
                            {Math.round(kf.offset * 100)}%
                        </button>
                    )
                })}
            </div>

            {/* Keyframe sliders */}
            {activeKf && (
                <div className="space-y-3">
                    {!(motionPath?.enabled) && (
                        <>
                            <Slider label="Translate X" value={activeKf.translateX} min={-200} max={200} step={translateStep} unit="px"
                                onChange={v => onUpdateKeyframe(activeKeyframeIdx, 'translateX', v)}
                                perfBadge={showPerfHints} gpuAccelerated />
                            <Slider label="Translate Y" value={activeKf.translateY} min={-200} max={200} step={translateStep} unit="px"
                                onChange={v => onUpdateKeyframe(activeKeyframeIdx, 'translateY', v)}
                                perfBadge={showPerfHints} gpuAccelerated />
                        </>
                    )}
                    <Slider label="Scale" value={activeKf.scale} min={0} max={3} step={0.05} unit="x"
                        onChange={v => onUpdateKeyframe(activeKeyframeIdx, 'scale', v)}
                        perfBadge={showPerfHints} gpuAccelerated />
                    <Slider label="Rotate" value={activeKf.rotate} min={-360} max={360} unit="deg"
                        onChange={v => onUpdateKeyframe(activeKeyframeIdx, 'rotate', v)}
                        perfBadge={showPerfHints} gpuAccelerated />
                    <Slider label="Skew X" value={activeKf.skewX} min={-45} max={45} unit="deg"
                        onChange={v => onUpdateKeyframe(activeKeyframeIdx, 'skewX', v)}
                        perfBadge={showPerfHints} gpuAccelerated />
                    <Slider label="Skew Y" value={activeKf.skewY} min={-45} max={45} unit="deg"
                        onChange={v => onUpdateKeyframe(activeKeyframeIdx, 'skewY', v)}
                        perfBadge={showPerfHints} gpuAccelerated />
                    <Slider label="Opacity" value={activeKf.opacity} min={0} max={1} step={0.01}
                        onChange={v => onUpdateKeyframe(activeKeyframeIdx, 'opacity', v)}
                        perfBadge={showPerfHints} gpuAccelerated />

                    {/* 3D Section */}
                    <div className="border-t border-border pt-3 mt-3">
                        <h4 className="text-[10px] font-semibold text-text-faint uppercase tracking-wider mb-2">3D Transforms</h4>
                        <div className="space-y-3">
                            <Slider label="Rotate X" value={activeKf.rotateX ?? 0} min={-180} max={180} unit="deg"
                                onChange={v => onUpdateKeyframe(activeKeyframeIdx, 'rotateX', v)}
                                perfBadge={showPerfHints} gpuAccelerated />
                            <Slider label="Rotate Y" value={activeKf.rotateY ?? 0} min={-180} max={180} unit="deg"
                                onChange={v => onUpdateKeyframe(activeKeyframeIdx, 'rotateY', v)}
                                perfBadge={showPerfHints} gpuAccelerated />
                            <Slider label="Perspective" value={activeKf.perspective ?? 0} min={0} max={2000} step={10} unit="px"
                                onChange={v => onUpdateKeyframe(activeKeyframeIdx, 'perspective', v)}
                                perfBadge={showPerfHints} gpuAccelerated={false} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function Slider({ label, value, min, max, step = 1, unit = '', onChange, perfBadge = false, gpuAccelerated = false }: {
    label: string; value: number; min: number; max: number; step?: number; unit?: string
    onChange: (v: number) => void
    perfBadge?: boolean; gpuAccelerated?: boolean
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
                <span className="text-blush flex items-center gap-1.5">
                    {label}
                    {perfBadge && gpuAccelerated && (
                        <span className="text-[8px] font-bold uppercase px-1 py-px rounded bg-green-500/15 text-green-400 border border-green-500/20">
                            GPU
                        </span>
                    )}
                </span>
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
