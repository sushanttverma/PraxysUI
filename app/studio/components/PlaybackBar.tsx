'use client'

import React from 'react'
import { Play, Pause, RotateCcw, Repeat, Gauge, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PlaybackBarProps {
    playing: boolean
    loop: boolean
    speed: number
    isRecording?: boolean
    recordingProgress?: number
    onTogglePlay: () => void
    onReplay: () => void
    onToggleLoop: () => void
    onSpeedChange: (speed: number) => void
    onRecord?: () => void
}

const speeds = [0.25, 0.5, 1, 2]

export default function PlaybackBar({
    playing,
    loop,
    speed,
    isRecording,
    recordingProgress,
    onTogglePlay,
    onReplay,
    onToggleLoop,
    onSpeedChange,
    onRecord,
}: PlaybackBarProps) {
    return (
        <div className="flex items-center justify-center px-4 pb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md">
                <button
                    onClick={onTogglePlay}
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white/60 hover:text-white transition-colors"
                >
                    {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>
                <button
                    onClick={onReplay}
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white/60 hover:text-white transition-colors"
                    title="Replay"
                >
                    <RotateCcw className="h-3 w-3" />
                </button>
                <div className="w-px h-4 bg-white/[0.08]" />
                <button
                    onClick={onToggleLoop}
                    className={cn(
                        'flex items-center justify-center w-7 h-7 rounded-full transition-colors',
                        loop ? 'bg-ignite/20 text-ignite' : 'bg-white/[0.06] text-white/40 hover:text-white/60'
                    )}
                    title="Loop"
                >
                    <Repeat className="h-3 w-3" />
                </button>
                <div className="w-px h-4 bg-white/[0.08]" />
                <div className="flex items-center gap-1">
                    <Gauge className="h-3 w-3 text-white/30" />
                    {speeds.map(s => (
                        <button
                            key={s}
                            onClick={() => onSpeedChange(s)}
                            className={cn(
                                'px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors',
                                speed === s
                                    ? 'bg-ignite/20 text-ignite'
                                    : 'text-white/40 hover:text-white/60'
                            )}
                        >
                            {s}x
                        </button>
                    ))}
                </div>

                {/* Record button */}
                {onRecord && (
                    <>
                        <div className="w-px h-4 bg-white/[0.08]" />
                        <button
                            onClick={onRecord}
                            className={cn(
                                'flex items-center justify-center w-7 h-7 rounded-full transition-colors relative',
                                isRecording
                                    ? 'bg-red-500/20 text-red-400'
                                    : 'bg-white/[0.06] text-white/40 hover:text-white/60'
                            )}
                            title={isRecording ? 'Recording...' : 'Record WebM'}
                        >
                            <Circle className={cn('h-3 w-3', isRecording && 'fill-current animate-pulse')} />
                            {isRecording && recordingProgress !== undefined && (
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle
                                        cx="14" cy="14" r="12"
                                        fill="none" stroke="#ef4444" strokeWidth="2"
                                        strokeDasharray={`${recordingProgress * 75.4} 75.4`}
                                    />
                                </svg>
                            )}
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
