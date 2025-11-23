'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface NoiseTextureProps {
  opacity?: number
  speed?: number
  className?: string
}

const NoiseTexture: React.FC<NoiseTextureProps> = ({
  opacity = 0.05,
  speed = 8,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      <style jsx>{`
        @keyframes noise-shift {
          0% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-5%, -5%);
          }
          20% {
            transform: translate(-10%, 5%);
          }
          30% {
            transform: translate(5%, -10%);
          }
          40% {
            transform: translate(-5%, 15%);
          }
          50% {
            transform: translate(-10%, 5%);
          }
          60% {
            transform: translate(15%, 0);
          }
          70% {
            transform: translate(0, 10%);
          }
          80% {
            transform: translate(-15%, 0);
          }
          90% {
            transform: translate(10%, 5%);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
      <svg
        className="absolute inset-0 h-[300%] w-[300%]"
        style={{
          opacity,
          animation: `noise-shift ${speed}s steps(4) infinite`,
        }}
      >
        <filter id="praxys-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#praxys-noise)" />
      </svg>
    </div>
  )
}

export default NoiseTexture
