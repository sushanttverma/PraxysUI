'use client'

import React, { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface LogoSliderProps {
  logos: React.ReactNode[]
  speed?: number
  pauseOnHover?: boolean
  direction?: 'left' | 'right'
  gap?: number
  className?: string
}

const LogoSlider: React.FC<LogoSliderProps> = ({
  logos,
  speed = 30,
  pauseOnHover = true,
  direction = 'left',
  gap = 48,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)

  useEffect(() => {
    if (scrollRef.current) {
      const firstSet = scrollRef.current.querySelector('[data-logo-set="0"]')
      if (firstSet) {
        setContentWidth(firstSet.scrollWidth)
      }
    }
  }, [logos, gap])

  const duration = contentWidth > 0 ? contentWidth / speed : 20

  return (
    <div
      ref={containerRef}
      className={cn(
        'group relative w-full overflow-hidden',
        className
      )}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-void to-transparent" />

      <div
        ref={scrollRef}
        className="flex w-max"
        style={{
          animationName: 'logo-slide',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
          animationPlayState: 'running',
          gap: `${gap}px`,
        }}
        onMouseEnter={(e) => {
          if (pauseOnHover) {
            ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
          }
        }}
        onMouseLeave={(e) => {
          if (pauseOnHover) {
            ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
          }
        }}
      >
        {/* First set */}
        <div
          data-logo-set="0"
          className="flex shrink-0 items-center"
          style={{ gap: `${gap}px` }}
        >
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-center px-2 opacity-50 transition-opacity duration-300 hover:opacity-100"
            >
              {logo}
            </div>
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div
          data-logo-set="1"
          className="flex shrink-0 items-center"
          style={{ gap: `${gap}px` }}
        >
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-center px-2 opacity-50 transition-opacity duration-300 hover:opacity-100"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes logo-slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}

export default LogoSlider
