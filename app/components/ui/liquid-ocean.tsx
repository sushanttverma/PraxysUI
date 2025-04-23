'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LiquidOceanProps {
  className?: string
  color?: string
  waveCount?: number
  speed?: number
}

const LiquidOcean: React.FC<LiquidOceanProps> = ({
  className = '',
  color = 'var(--color-ignite)',
  waveCount = 4,
  speed = 6,
}) => {
  return (
    <div
      className={cn(
        'relative w-full h-64 overflow-hidden rounded-xl bg-obsidian border border-border',
        className
      )}
    >
      {Array.from({ length: waveCount }).map((_, i) => {
        const opacity = 0.08 + i * 0.04
        const yOffset = 40 + i * 20
        const dur = speed + i * 1.5

        return (
          <motion.div
            key={i}
            className="absolute left-0 right-0"
            style={{
              bottom: 0,
              height: `${yOffset}%`,
            }}
          >
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="absolute bottom-0 w-[200%] h-full"
            >
              <motion.path
                d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z"
                fill={color}
                fillOpacity={opacity}
                animate={{ x: [0, -600] }}
                transition={{
                  duration: dur,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </svg>
          </motion.div>
        )
      })}

      {/* Surface shimmer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 40%, ${color}08 100%)`,
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export default LiquidOcean
