'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FlipFadeTextProps {
  words: string[]
  className?: string
  interval?: number
  duration?: number
}

const FlipFadeText: React.FC<FlipFadeTextProps> = ({
  words,
  className = '',
  interval = 3000,
  duration = 0.5,
}) => {
  const [index, setIndex] = useState(0)

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % words.length)
  }, [words.length])

  useEffect(() => {
    const timer = setInterval(advance, interval)
    return () => clearInterval(timer)
  }, [advance, interval])

  return (
    <span className={cn('relative inline-flex overflow-hidden', className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ rotateX: 90, opacity: 0, y: 10 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: -90, opacity: 0, y: -10 }}
          transition={{ duration, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="inline-block"
          style={{ transformOrigin: 'bottom center' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default FlipFadeText
