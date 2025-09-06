'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FlipTextProps {
  text: string
  className?: string
  staggerDelay?: number
  duration?: number
}

const FlipText: React.FC<FlipTextProps> = ({
  text,
  className = '',
  staggerDelay = 0.015,
  duration = 0.5,
}) => {
  const [key, setKey] = useState(0)

  const replay = useCallback(() => {
    setKey((k) => k + 1)
  }, [])

  return (
    <span
      className={cn('inline-flex', className)}
      onMouseEnter={replay}
    >
      {text.split('').map((char, i) => (
        <span
          key={`${key}-${i}`}
          className="inline-block [perspective:600px]"
        >
          <motion.span
            className="inline-block"
            initial={{ rotateX: -90 }}
            animate={{ rotateX: 0 }}
            transition={{
              delay: i * staggerDelay,
              duration,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            style={{
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              display: 'inline-block',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default FlipText
