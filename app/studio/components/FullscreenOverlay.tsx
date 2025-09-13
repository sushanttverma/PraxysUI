'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minimize2 } from 'lucide-react'

interface FullscreenOverlayProps {
    isOpen: boolean
    onClose: () => void
}

export default function FullscreenOverlay({ isOpen, onClose }: FullscreenOverlayProps) {
    React.useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-void/95 backdrop-blur-sm"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.1] text-white/60 hover:text-white hover:bg-white/[0.12] backdrop-blur-md transition-all"
                    >
                        <Minimize2 className="h-5 w-5" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
