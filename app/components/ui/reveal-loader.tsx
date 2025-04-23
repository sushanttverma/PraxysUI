'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RevealLoaderProps {
  className?: string
  duration?: number
  color?: string
  onComplete?: () => void
  children?: React.ReactNode
}

const RevealLoader: React.FC<RevealLoaderProps> = ({
  className = '',
  duration = 2,
  color = 'var(--color-ignite)',
  onComplete,
  children,
}) => {
  const [phase, setPhase] = useState<'loading' | 'revealing' | 'done'>('loading')

  useEffect(() => {
    const loadTimer = setTimeout(() => setPhase('revealing'), duration * 500)
    const revealTimer = setTimeout(() => {
      setPhase('done')
      onComplete?.()
    }, duration * 1000)

    return () => {
      clearTimeout(loadTimer)
      clearTimeout(revealTimer)
    }
  }, [duration, onComplete])

  return (
    <div
      className={cn(
        'relative w-full h-64 overflow-hidden rounded-xl border border-border bg-obsidian',
        className
      )}
    >
      {/* Content behind the curtain */}
      <div className="relative z-0 flex h-full items-center justify-center">
        {children || (
          <span className="font-pixel text-xl text-chalk">Content Revealed</span>
        )}
      </div>

      {/* Reveal curtain */}
      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center bg-obsidian"
            initial={{ clipPath: 'inset(0 0 0 0)' }}
            animate={
              phase === 'revealing'
                ? { clipPath: 'inset(0 0 100% 0)' }
                : { clipPath: 'inset(0 0 0 0)' }
            }
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: duration * 0.5, ease: [0.7, 0, 0.3, 1] }}
          >
            {/* Loading indicator */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
              <motion.div
                className="h-0.5 w-32 overflow-hidden rounded-full bg-border"
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: duration * 0.5, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RevealLoader
