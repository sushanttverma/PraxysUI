'use client'

import React from 'react'
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
  staggerDelay = 0.05,
  duration = 0.5,
}) => {
  return (
    <span className={cn('inline-flex overflow-hidden', className)}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{
            delay: i * staggerDelay,
            duration,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          style={{ transformOrigin: 'bottom', display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default FlipText
