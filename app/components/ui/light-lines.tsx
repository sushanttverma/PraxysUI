'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LightLinesProps {
  className?: string
  lineCount?: number
  color?: string
  duration?: number
}

const LightLines: React.FC<LightLinesProps> = ({
  className = '',
  lineCount = 5,
  color = 'rgba(232, 78, 45, 0.15)',
  duration = 3,
}) => {
  return (
    <div
      className={cn(
        'relative w-full h-64 overflow-hidden rounded-xl bg-obsidian border border-border',
        className
      )}
    >
      {Array.from({ length: lineCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-full"
          style={{
            width: '1px',
            background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
            left: `${((i + 1) / (lineCount + 1)) * 100}%`,
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scaleY: [0, 1, 1, 0],
          }}
          transition={{
            duration,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {Array.from({ length: lineCount }).map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute top-0 h-full"
          style={{
            width: '30px',
            background: `radial-gradient(ellipse at center, ${color}, transparent)`,
            left: `calc(${((i + 1) / (lineCount + 1)) * 100}% - 15px)`,
            filter: 'blur(8px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.6, 0] }}
          transition={{
            duration,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default LightLines
