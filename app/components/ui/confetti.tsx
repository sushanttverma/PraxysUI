'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
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
}

const DEFAULT_COLORS = ['#E84E2D', '#C9958A', '#F2ECE2', '#FFD700', '#7B61FF']

const Confetti: React.FC<ConfettiProps> = ({
  trigger = false,
  count = 50,
  colors,
  duration = 2,
  className = '',
}) => {
  const resolvedColors = useMemo(() => colors ?? DEFAULT_COLORS, [colors])
  const [particles, setParticles] = useState<Particle[]>([])
  const prevTrigger = useRef(trigger)

  useEffect(() => {
    if (!trigger) {
      prevTrigger.current = false
      return
    }
    if (prevTrigger.current === trigger) return
    prevTrigger.current = trigger

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 20,
      color: resolvedColors[i % resolvedColors.length],
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.8,
    }))

    setParticles(newParticles)
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
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            }}
            initial={{
              opacity: 1,
              y: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              y: [0, window?.innerHeight ?? 800],
              x: [0, (Math.random() - 0.5) * 200],
              rotate: [0, p.rotation + 360 * (Math.random() > 0.5 ? 1 : -1)],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: duration + Math.random() * 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Confetti
