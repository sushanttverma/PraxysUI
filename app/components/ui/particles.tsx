'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParticlesProps {
  count?: number
  color?: string
  speed?: number
  size?: number
  className?: string
}

// Deterministic pseudo-random from seed — pure function, no Math.random()
function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

const Particles: React.FC<ParticlesProps> = ({
  count = 30,
  color = '#E84E2D',
  speed = 6,
  size = 4,
  className = '',
}) => {
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: seeded(i * 7 + 1) * 100,
    y: seeded(i * 7 + 2) * 100,
    delay: seeded(i * 7 + 3) * speed,
    driftX: (seeded(i * 7 + 4) - 0.5) * 60,
    driftY: (seeded(i * 7 + 5) - 0.5) * 60,
    scale: 0.5 + seeded(i * 7 + 6) * 1,
  }))

  return (
    <div
      className={cn(
        'relative w-full h-64 overflow-hidden rounded-xl bg-obsidian border border-border',
        className
      )}
    >
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: size * dot.scale,
            height: size * dot.scale,
            backgroundColor: color,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            opacity: 0.6,
          }}
          animate={{
            x: [0, dot.driftX, -dot.driftX / 2, 0],
            y: [0, dot.driftY, -dot.driftY / 2, 0],
            opacity: [0.2, 0.8, 0.4, 0.2],
          }}
          transition={{
            duration: speed + dot.delay,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default Particles
