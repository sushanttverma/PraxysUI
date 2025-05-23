'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientMeshProps {
  className?: string
  colors?: string[]
  speed?: number
  blur?: number
  children?: React.ReactNode
}

const blobKeyframes = [
  { x: ['0%', '30%', '10%', '0%'], y: ['0%', '20%', '40%', '0%'] },
  { x: ['60%', '30%', '50%', '60%'], y: ['10%', '50%', '20%', '10%'] },
  { x: ['20%', '50%', '10%', '20%'], y: ['50%', '10%', '30%', '50%'] },
  { x: ['40%', '10%', '60%', '40%'], y: ['30%', '60%', '0%', '30%'] },
]

const durationMultipliers = [1, 1.3, 0.9, 1.1]

const GradientMesh: React.FC<GradientMeshProps> = ({
  className = '',
  colors = ['#E84E2D', '#C9958A', '#F2ECE2', '#0B0A08'],
  speed = 8,
  blur = 100,
  children,
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border',
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{ filter: `blur(${blur}px)` }}
      >
        {colors.map((color, i) => {
          const keyframe = blobKeyframes[i % blobKeyframes.length]
          const duration = speed * durationMultipliers[i % durationMultipliers.length]

          return (
            <motion.div
              key={i}
              className="absolute h-[60%] w-[60%] rounded-full"
              style={{
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              }}
              animate={{
                x: keyframe.x,
                y: keyframe.y,
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default GradientMesh
