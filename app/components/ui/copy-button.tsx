'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  children?: React.ReactNode
  className?: string
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  children,
  className,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [text])

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border border-border bg-obsidian px-3 py-2 text-sm font-medium text-chalk transition-colors hover:bg-void hover:text-blush',
        copied && 'border-green-500/30 text-green-400',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.svg
            key="check"
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 20 }}
          >
            <path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        ) : (
          <motion.svg
            key="copy"
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 20 }}
          >
            <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 11V3.5A1.5 1.5 0 014.5 2H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </motion.svg>
        )}
      </AnimatePresence>
      {children || (copied ? 'Copied!' : 'Copy')}
    </button>
  )
}

export default CopyButton
