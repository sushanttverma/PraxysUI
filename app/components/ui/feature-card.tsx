'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  })

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
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 24 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      className={cn(
        'rounded-xl border border-border bg-obsidian p-6 transition-shadow hover:shadow-[0_0_20px_rgba(232,78,45,0.08)]',
        className
      )}
    >
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ignite/10 border border-ignite/20 text-ignite">
        <span className="flex h-5 w-5 items-center justify-center">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-base font-semibold text-chalk">{title}</h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-relaxed text-blush">{description}</p>
    </motion.div>
  )
}

export default FeatureCard
