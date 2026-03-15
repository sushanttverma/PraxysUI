'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CircularTextProps {
  text: string
  radius?: number
  spinDuration?: number
  onHover?: boolean
  direction?: 'clockwise' | 'counter-clockwise'
  centerText?: string
  className?: string
  textClassName?: string
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  radius = 88,
  spinDuration = 20,
  onHover = false,
  direction = 'clockwise',
  centerText,
  className = '',
  textClassName = '',
}) => {
  const chars = Array.from(text)
  if (chars.length === 0) return null

  const angleStep = 360 / chars.length
  const size = radius * 2

  const containerStyle: React.CSSProperties & { '--spin-duration': string } = {
    width: size,
    height: size,
    '--spin-duration': `${spinDuration}s`,
  }

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={containerStyle}>
      <div
        className={cn(
          'praxys-circular-track absolute inset-0',
          onHover && 'praxys-circular-track--hover',
          direction === 'counter-clockwise' && 'praxys-circular-track--reverse'
        )}
        aria-label={text}
      >
        {chars.map((char, index) => (
          <span
            key={`${char}-${index}`}
            className={cn(
              'absolute left-1/2 top-1/2 select-none whitespace-pre text-base font-medium text-chalk',
              textClassName
            )}
            style={{
              transform: `translate(-50%, -50%) rotate(${index * angleStep}deg) translateY(-${radius}px)`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {centerText ? <span className="z-10 text-sm font-semibold text-blush">{centerText}</span> : null}

      <style jsx>{`
        .praxys-circular-track {
          animation: praxys-spin var(--spin-duration, 20s) linear infinite;
        }

        .praxys-circular-track--hover {
          animation-play-state: paused;
        }

        .praxys-circular-track--hover:hover {
          animation-play-state: running;
        }

        .praxys-circular-track--reverse {
          animation-direction: reverse;
        }

        @keyframes praxys-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default CircularText
