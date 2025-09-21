'use client'

import React, { useState, useCallback } from 'react'
import { X, Upload, Check, AlertCircle } from 'lucide-react'
import { AnimationKeyframe, AnimationChain, ChainPhase } from '../lib/types'
import { parseCSSKeyframes } from '../lib/cssParser'

interface ImportModalProps {
    isOpen: boolean
    onClose: () => void
    onImport: (keyframes: AnimationKeyframe[]) => void
    chain?: AnimationChain
    onImportToPhase?: (phase: ChainPhase, keyframes: AnimationKeyframe[]) => void
}

export default function ImportModal({ isOpen, onClose, onImport, chain, onImportToPhase }: ImportModalProps) {
    const [cssText, setCssText] = useState('')
    const [parsed, setParsed] = useState<AnimationKeyframe[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [targetPhase, setTargetPhase] = useState<ChainPhase | 'main'>('main')

    const handleParse = useCallback(() => {
        setError(null)
        setParsed(null)
        if (!cssText.trim()) {
            setError('Please paste CSS @keyframes code.')
            return
        }
        const result = parseCSSKeyframes(cssText)
        if (!result) {
            setError('Could not parse @keyframes. Ensure valid CSS with percentage stops. matrix() transforms are not supported.')
            return
        }
        setParsed(result)
    }, [cssText])

    const handleConfirm = useCallback(() => {
        if (!parsed) return
        if (chain?.enabled && targetPhase !== 'main' && onImportToPhase) {
            onImportToPhase(targetPhase as ChainPhase, parsed)
        } else {
            onImport(parsed)
        }
        setCssText('')
        setParsed(null)
        onClose()
    }, [parsed, chain, targetPhase, onImport, onImportToPhase, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-lg mx-4 rounded-xl border border-border bg-obsidian shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4 text-ignite" />
                        <h2 className="text-sm font-semibold text-chalk">Import CSS @keyframes</h2>
                    </div>
                    <button onClick={onClose} className="text-blush hover:text-chalk transition-colors">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                    {/* Chain phase target */}
                    {chain?.enabled && (
                        <div>
                            <label className="text-[10px] font-semibold text-text-faint uppercase tracking-wider mb-1.5 block">
                                Import Target
                            </label>
                            <select
                                value={targetPhase}
                                onChange={e => setTargetPhase(e.target.value as ChainPhase | 'main')}
                                className="w-full h-8 rounded-md border border-border bg-void text-xs text-blush px-2 outline-none"
                            >
                                <option value="main">Main Config</option>
                                <option value="enter">Enter Phase</option>
                                <option value="idle">Idle Phase</option>
                                <option value="exit">Exit Phase</option>
                            </select>
                        </div>
                    )}

                    {/* Textarea */}
                    <textarea
                        value={cssText}
                        onChange={e => setCssText(e.target.value)}
                        placeholder={`@keyframes fadeIn {\n  0% { opacity: 0; transform: translateY(20px); }\n  100% { opacity: 1; transform: translateY(0); }\n}`}
                        className="w-full h-40 rounded-lg border border-border bg-void p-3 font-mono text-xs text-blush placeholder:text-white/15 outline-none resize-none focus:border-ignite/40"
                    />

                    {/* Error */}
                    {error && (
                        <div className="flex items-start gap-2 text-xs text-red-400 bg-red-400/10 rounded-md px-3 py-2 border border-red-400/20">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                            {error}
                        </div>
                    )}

                    {/* Preview */}
                    {parsed && (
                        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
                            <div className="flex items-center gap-1.5 text-xs text-green-400 mb-2">
                                <Check className="h-3.5 w-3.5" />
                                Detected {parsed.length} keyframes
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {parsed.map((kf, i) => (
                                    <span key={i} className="px-2 py-0.5 rounded-full bg-green-500/10 text-[10px] font-mono text-green-400 border border-green-500/20">
                                        {Math.round(kf.offset * 100)}%
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border">
                    {!parsed ? (
                        <button
                            onClick={handleParse}
                            className="px-4 py-2 rounded-lg bg-ignite/10 border border-ignite/30 text-xs font-medium text-ignite hover:bg-ignite/20 transition-colors"
                        >
                            Parse CSS
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => { setParsed(null); setError(null) }}
                                className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-blush hover:text-chalk transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-xs font-medium text-green-400 hover:bg-green-500/20 transition-colors"
                            >
                                Apply Keyframes
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
