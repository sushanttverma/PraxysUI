'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DisplacementTextProps {
  text: string
  className?: string
  fontSize?: number
  color?: string
  shadowColor?: string
  depth?: number
}

const DisplacementText: React.FC<DisplacementTextProps> = ({
  text,
  className = '',
  fontSize = 64,
  color = 'var(--color-chalk)',
  shadowColor = 'var(--color-ignite)',
  depth = 12,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(springY, [0, 1], [depth, -depth])
  const rotateY = useTransform(springX, [0, 1], [-depth, depth])

  const shadowX = useTransform(springX, [0, 1], [depth, -depth])
  const shadowY = useTransform(springY, [0, 1], [depth, -depth])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'flex items-center justify-center cursor-crosshair select-none',
        className
      )}
      style={{ perspective: '800px' }}
    >
      <motion.span
        className="font-pixel font-bold"
        style={{
          fontSize,
          color,
          rotateX,
          rotateY,
          textShadow: useTransform(
            [shadowX, shadowY],
            ([x, y]) =>
              `${x}px ${y}px 0px ${shadowColor}, ${Number(x) * 2}px ${Number(y) * 2}px 0px ${shadowColor}40`
          ),
          transformStyle: 'preserve-3d',
        }}
      >
        {text}
      </motion.span>
    </div>
  )
}

export default DisplacementText
