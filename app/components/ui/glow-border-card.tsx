'use client'

import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowBorderCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

const GlowBorderCard: React.FC<GlowBorderCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(232, 78, 45, 0.35)',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const background = useMotionTemplate`radial-gradient(
    300px circle at ${mouseX}px ${mouseY}px,
    ${glowColor},
    transparent 80%
  )`

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative rounded-xl border border-border bg-obsidian p-px overflow-hidden',
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative rounded-xl bg-obsidian p-6">
        {children}
      </div>
    </div>
  )
}

export default GlowBorderCard
