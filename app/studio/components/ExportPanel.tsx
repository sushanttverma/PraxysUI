'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Code } from 'lucide-react'
import { ExportFormat } from '../lib/types'
import { cn } from '@/lib/utils'

interface ExportPanelProps {
    exportOutput: string
    exportFormat: ExportFormat
    onFormatChange: (format: ExportFormat) => void
}

const formatTabs: { key: ExportFormat; label: string }[] = [
    { key: 'css', label: 'CSS' },
    { key: 'framer', label: 'Framer Motion' },
    { key: 'tailwind', label: 'Tailwind' },
    { key: 'react-component', label: 'React' },
    { key: 'gsap', label: 'GSAP' },
    { key: 'lottie', label: 'Lottie' },
]

export default function ExportPanel({ exportOutput, exportFormat, onFormatChange }: ExportPanelProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(exportOutput)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [exportOutput])

    return (
        <div className="border-t border-border pt-4">
            <h3 className="text-xs font-semibold text-text-faint uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Code className="h-3.5 w-3.5" /> Export Code
            </h3>
            <div className="rounded-lg border border-border bg-void overflow-hidden">
                <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
                    <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                        {formatTabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => onFormatChange(tab.key)}
                                className={cn(
                                    'px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap',
                                    exportFormat === tab.key
                                        ? 'bg-ignite/10 text-ignite'
                                        : 'text-text-faint hover:text-blush'
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs text-blush hover:text-chalk transition-colors shrink-0"
                    >
                        <AnimatePresence mode="wait">
                            {copied ? (
                                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1 text-green-400">
                                    <Check className="h-3 w-3" /> Copied
                                </motion.span>
                            ) : (
                                <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                                    <Copy className="h-3 w-3" /> Copy
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
                <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-all p-3 font-mono text-xs leading-relaxed text-blush">
                    <code>{exportOutput}</code>
                </pre>
            </div>
        </div>
    )
}
