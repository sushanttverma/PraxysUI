'use client'

import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ConfettiProps {
  trigger?: boolean
  count?: number
  colors?: string[]
  duration?: number
  className?: string
}

interface Particle {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  scale: number
  shape: 'circle' | 'square'
  driftX: number
  rotateDir: number
  extraDuration: number
}

const DEFAULT_COLORS = ['#E84E2D', '#C9958A', '#F2ECE2', '#FFD700', '#7B61FF']

// Deterministic pseudo-random from seed — pure function, no Math.random()
function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

const Confetti: React.FC<ConfettiProps> = ({
  trigger = false,
  count = 50,
  colors,
  duration = 2,
  className = '',
}) => {
  const resolvedColors = useMemo(() => colors ?? DEFAULT_COLORS, [colors])

  const particles: Particle[] = useMemo(() => {
    if (!trigger) return []
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: seeded(i * 9 + 1) * 100,
      y: seeded(i * 9 + 2) * 20,
      color: resolvedColors[i % resolvedColors.length],
      rotation: seeded(i * 9 + 3) * 360,
      scale: 0.5 + seeded(i * 9 + 4) * 0.8,
      shape: (seeded(i * 9 + 5) > 0.5 ? 'circle' : 'square') as 'circle' | 'square',
      driftX: (seeded(i * 9 + 6) - 0.5) * 200,
      rotateDir: seeded(i * 9 + 7) > 0.5 ? 1 : -1,
      extraDuration: seeded(i * 9 + 8) * 0.5,
    }))
  }, [trigger, count, resolvedColors])

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 z-50 overflow-hidden',
        className
      )}
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: 10 * p.scale,
              height: 10 * p.scale,
              backgroundColor: p.color,
              borderRadius: p.shape === 'circle' ? '50%' : '2px',
            }}
            initial={{
              opacity: 1,
              y: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              y: [0, typeof window !== 'undefined' ? window.innerHeight : 800],
              x: [0, p.driftX],
              rotate: [0, p.rotation + 360 * p.rotateDir],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: duration + p.extraDuration,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Confetti
