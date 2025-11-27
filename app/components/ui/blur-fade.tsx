'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BlurFadeProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

const directionOffset: Record<string, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
}

const BlurFade: React.FC<BlurFadeProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className = '',
}) => {
  const offset = directionOffset[direction] ?? directionOffset.up

  return (
    <motion.div
      className={cn(className)}
      initial={{
        opacity: 0,
        filter: 'blur(12px)',
        x: offset.x,
        y: offset.y,
      }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)',
        x: 0,
        y: 0,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export default BlurFade
