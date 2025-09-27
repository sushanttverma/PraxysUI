'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Code, FileCode2, Package, Terminal, X } from 'lucide-react'
import { ExportFormat, PreviewShape, getRegistrySlug } from '../lib/types'
import { componentRegistry } from '@/lib/registry'
import { cn } from '@/lib/utils'

type CodeTab = 'source' | 'usage' | 'dependencies'
type ViewMode = 'animation' | 'component'

interface ExportPanelProps {
    isOpen: boolean
    onClose: () => void
    exportOutput: string
    exportFormat: ExportFormat
    onFormatChange: (format: ExportFormat) => void
    previewShape?: PreviewShape
}

const formatTabs: { key: ExportFormat; label: string }[] = [
    { key: 'css', label: 'CSS' },
    { key: 'framer', label: 'Framer Motion' },
    { key: 'tailwind', label: 'Tailwind' },
    { key: 'react-component', label: 'React' },
    { key: 'gsap', label: 'GSAP' },
    { key: 'lottie', label: 'Lottie' },
]

function CopyBtn({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [text])

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-blush hover:text-chalk hover:bg-white/[0.06] transition-colors shrink-0"
        >
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5 text-green-400">
                        <Check className="h-3.5 w-3.5" /> Copied
                    </motion.span>
                ) : (
                    <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                        <Copy className="h-3.5 w-3.5" /> Copy
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    )
}

export default function ExportPanel({ isOpen, onClose, exportOutput, exportFormat, onFormatChange, previewShape }: ExportPanelProps) {
    const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>('source')
    const [viewMode, setViewMode] = useState<ViewMode>('animation')

    const slug = previewShape ? getRegistrySlug(previewShape) : null
    const entry = slug ? componentRegistry[slug] : null

    // Reset to animation view when opening, or component view if a component is selected
    const prevIsOpen = useRef(isOpen)
    useEffect(() => {
        if (isOpen && !prevIsOpen.current) {
            // Defer state updates to avoid synchronous setState in effect
            queueMicrotask(() => {
                setViewMode(entry ? 'component' : 'animation')
                setActiveCodeTab('source')
            })
        }
        prevIsOpen.current = isOpen
    }, [isOpen, entry])

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [isOpen, onClose])

    const codeTabContent = entry ? (() => {
        switch (activeCodeTab) {
            case 'source':
                return entry.code
            case 'usage':
                return entry.usage
            case 'dependencies':
                return entry.dependencies.length > 0
                    ? `pnpm add ${entry.dependencies.join(' ')}`
                    : '# No additional dependencies required'
        }
    })() : ''

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-4 md:inset-x-auto md:inset-y-8 md:left-1/2 md:-translate-x-1/2 md:w-[720px] md:max-w-[90vw] z-[81] flex flex-col rounded-2xl border border-white/[0.08] bg-obsidian/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ignite/10 border border-ignite/20">
                                    <Code className="h-4 w-4 text-ignite" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-chalk">Get Code</h2>
                                    <p className="text-[10px] text-white/30">Export animation or component code</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* View mode switcher */}
                        <div className="flex items-center gap-1 px-5 py-3 border-b border-white/[0.06]">
                            <button
                                onClick={() => setViewMode('animation')}
                                className={cn(
                                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                                    viewMode === 'animation'
                                        ? 'bg-ignite/10 text-ignite border border-ignite/20'
                                        : 'text-white/40 hover:text-white/70 border border-transparent'
                                )}
                            >
                                <Code className="h-3.5 w-3.5" /> Animation Code
                            </button>
                            {entry && (
                                <button
                                    onClick={() => setViewMode('component')}
                                    className={cn(
                                        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                                        viewMode === 'component'
                                            ? 'bg-ignite/10 text-ignite border border-ignite/20'
                                            : 'text-white/40 hover:text-white/70 border border-transparent'
                                    )}
                                >
                                    <FileCode2 className="h-3.5 w-3.5" /> Component Code
                                </button>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto p-5">
                            <AnimatePresence mode="wait">
                                {viewMode === 'animation' ? (
                                    <motion.div
                                        key="animation"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {/* Format tabs */}
                                        <div className="rounded-xl border border-white/[0.06] bg-void/50 overflow-hidden">
                                            <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-2.5">
                                                <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                                                    {formatTabs.map(tab => (
                                                        <button
                                                            key={tab.key}
                                                            onClick={() => onFormatChange(tab.key)}
                                                            className={cn(
                                                                'px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap',
                                                                exportFormat === tab.key
                                                                    ? 'bg-ignite/10 text-ignite'
                                                                    : 'text-white/35 hover:text-white/60'
                                                            )}
                                                        >
                                                            {tab.label}
                                                        </button>
                                                    ))}
                                                </div>
                                                <CopyBtn text={exportOutput} />
                                            </div>
                                            <pre className="max-h-[50vh] overflow-auto whitespace-pre-wrap break-all p-4 font-mono text-xs leading-relaxed text-blush">
                                                <code>{exportOutput}</code>
                                            </pre>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="component"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <div className="rounded-xl border border-white/[0.06] bg-void/50 overflow-hidden">
                                            {/* Code sub-tabs */}
                                            <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-2.5">
                                                <div className="flex items-center gap-1">
                                                    {([
                                                        { key: 'source' as CodeTab, label: 'Source', icon: <Code className="h-3 w-3" /> },
                                                        { key: 'usage' as CodeTab, label: 'Usage', icon: <FileCode2 className="h-3 w-3" /> },
                                                        { key: 'dependencies' as CodeTab, label: 'Install', icon: <Terminal className="h-3 w-3" /> },
                                                    ]).map(tab => (
                                                        <button
                                                            key={tab.key}
                                                            onClick={() => setActiveCodeTab(tab.key)}
                                                            className={cn(
                                                                'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap',
                                                                activeCodeTab === tab.key
                                                                    ? 'bg-ignite/10 text-ignite'
                                                                    : 'text-white/35 hover:text-white/60'
                                                            )}
                                                        >
                                                            {tab.icon} {tab.label}
                                                        </button>
                                                    ))}
                                                </div>
                                                <CopyBtn text={codeTabContent} />
                                            </div>

                                            {/* File name badge */}
                                            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.04] bg-white/[0.02]">
                                                {activeCodeTab === 'source' && (
                                                    <>
                                                        <Package className="h-3 w-3 text-ignite/60" />
                                                        <span className="text-[10px] font-mono text-white/30">
                                                            components/ui/{slug}.tsx
                                                        </span>
                                                    </>
                                                )}
                                                {activeCodeTab === 'usage' && (
                                                    <>
                                                        <FileCode2 className="h-3 w-3 text-blue-400/60" />
                                                        <span className="text-[10px] font-mono text-white/30">
                                                            example.tsx
                                                        </span>
                                                    </>
                                                )}
                                                {activeCodeTab === 'dependencies' && (
                                                    <>
                                                        <Terminal className="h-3 w-3 text-green-400/60" />
                                                        <span className="text-[10px] font-mono text-white/30">
                                                            terminal
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Code content */}
                                            <pre className="max-h-[50vh] overflow-auto whitespace-pre-wrap break-all p-4 font-mono text-xs leading-relaxed text-blush">
                                                <code>{codeTabContent}</code>
                                            </pre>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
