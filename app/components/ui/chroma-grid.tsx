'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'

export interface ChromaGridItem {
  image?: string
  title: string
  subtitle?: string
  color: string
  className?: string
}

interface ChromaGridProps {
  items: ChromaGridItem[]
  radius?: number
  columns?: number
  gap?: number
  damping?: number
  className?: string
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  radius = 300,
  columns = 3,
  gap = 16,
  damping = 0.45,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const mousePos = useRef({ x: -9999, y: -9999 })
  const smoothPos = useRef({ x: -9999, y: -9999 })
  const rafId = useRef<number>(0)
  const isHovering = useRef(false)
  const [, forceRender] = useState(0)

  const updateCards = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()

    cardRefs.current.forEach((card) => {
      if (!card) return

      const cardRect = card.getBoundingClientRect()
      const cardCenterX = cardRect.left + cardRect.width / 2 - containerRect.left
      const cardCenterY = cardRect.top + cardRect.height / 2 - containerRect.top

      const dx = smoothPos.current.x - cardCenterX
      const dy = smoothPos.current.y - cardCenterY
      const distance = Math.sqrt(dx * dx + dy * dy)

      const intensity = isHovering.current
        ? clamp(1 - distance / radius, 0, 1)
        : 0

      const grayscale = 1 - intensity
      card.style.filter = `grayscale(${grayscale * 100}%)`
    })
  }, [radius])

  const animate = useCallback(() => {
    smoothPos.current.x = lerp(smoothPos.current.x, mousePos.current.x, damping)
    smoothPos.current.y = lerp(smoothPos.current.y, mousePos.current.y, damping)

    updateCards()
    rafId.current = requestAnimationFrame(animate)
  }, [damping, updateCards])

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [animate])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      mousePos.current.x = e.clientX - rect.left
      mousePos.current.y = e.clientY - rect.top
    },
    []
  )

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false
    mousePos.current = { x: -9999, y: -9999 }
    smoothPos.current = { x: -9999, y: -9999 }
    // Force one more render cycle to reset all cards to grayscale
    forceRender((n) => n + 1)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            cardRefs.current[index] = el
          }}
          className={item.className}
          style={{
            background: `linear-gradient(135deg, ${item.color}, ${adjustColor(item.color, -40)})`,
            borderRadius: '12px',
            padding: '24px',
            minHeight: '160px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            filter: 'grayscale(100%)',
            transition: 'filter 0.1s ease-out',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.3,
                pointerEvents: 'none',
              }}
            />
          )}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3
              style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 600,
                color: '#ffffff',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
            >
              {item.title}
            </h3>
            {item.subtitle && (
              <p
                style={{
                  margin: '6px 0 0',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.8)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                {item.subtitle}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Darken or lighten a hex/rgb color by a fixed amount.
 */
function adjustColor(color: string, amount: number): string {
  // Handle hex
  if (color.startsWith('#')) {
    const hex = color.replace('#', '')
    const num = parseInt(hex.length === 3
      ? hex.split('').map(c => c + c).join('')
      : hex, 16)
    const r = clamp(((num >> 16) & 0xff) + amount, 0, 255)
    const g = clamp(((num >> 8) & 0xff) + amount, 0, 255)
    const b = clamp((num & 0xff) + amount, 0, 255)
    return `rgb(${r}, ${g}, ${b})`
  }
  // Fallback: return a slightly transparent version
  return color
}

export default ChromaGrid
