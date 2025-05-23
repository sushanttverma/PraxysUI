'use client'

import React, { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticCursorProps {
  children: React.ReactNode
  className?: string
  strength?: number
  radius?: number
  springConfig?: { stiffness?: number; damping?: number }
}

const MagneticCursor: React.FC<MagneticCursorProps> = ({
  children,
  className = '',
  strength = 0.3,
  radius = 200,
  springConfig,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const xMotion = useMotionValue(0)
  const yMotion = useMotionValue(0)

  const springOpts = {
    stiffness: springConfig?.stiffness ?? 150,
    damping: springConfig?.damping ?? 15,
  }

  const x = useSpring(xMotion, springOpts)
  const y = useSpring(yMotion, springOpts)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      if (distance < radius) {
        xMotion.set(distX * strength)
        yMotion.set(distY * strength)
      } else {
        xMotion.set(0)
        yMotion.set(0)
      }
    },
    [radius, strength, xMotion, yMotion]
  )

  const handleMouseLeave = useCallback(() => {
    xMotion.set(0)
    yMotion.set(0)
  }, [xMotion, yMotion])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export default MagneticCursor
