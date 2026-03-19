'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'

export interface CircularGalleryItem {
  image: string
  text: string
}

export interface CircularGalleryProps {
  items?: CircularGalleryItem[]
  radius?: number
  itemWidth?: number
  itemHeight?: number
  scrollSpeed?: number
  textColor?: string
  borderRadius?: number
  className?: string
}

const defaultItems: CircularGalleryItem[] = [
  { image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: 'Lavender Dreams' },
  { image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', text: 'Rose Petal' },
  { image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', text: 'Ocean Breeze' },
  { image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', text: 'Mint Fresh' },
  { image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', text: 'Sunset Glow' },
  { image: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', text: 'Soft Lilac' },
  { image: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', text: 'Warm Peach' },
  { image: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', text: 'Sky Light' },
]

const CircularGallery: React.FC<CircularGalleryProps> = ({
  items = defaultItems,
  radius = 600,
  itemWidth = 280,
  itemHeight = 200,
  scrollSpeed = 2,
  textColor = '#ffffff',
  borderRadius = 12,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const angleRef = useRef(0)
  const velocityRef = useRef(0)
  const isDraggingRef = useRef(false)
  const lastXRef = useRef(0)
  const rafRef = useRef<number>(0)
  const [, forceRender] = useState(0)

  const itemCount = items.length
  const angleStep = 360 / itemCount

  const animate = useCallback(() => {
    if (!isDraggingRef.current) {
      // Apply friction-based deceleration
      velocityRef.current *= 0.95

      // Stop when velocity is negligible
      if (Math.abs(velocityRef.current) < 0.01) {
        velocityRef.current = 0
      } else {
        angleRef.current += velocityRef.current
        forceRender((n) => n + 1)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  // Drag handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true
    lastXRef.current = e.clientX
    velocityRef.current = 0
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return
      const dx = e.clientX - lastXRef.current
      const delta = (dx / (radius * 0.5)) * scrollSpeed * 15
      angleRef.current += delta
      velocityRef.current = delta
      lastXRef.current = e.clientX
      forceRender((n) => n + 1)
    },
    [radius, scrollSpeed]
  )

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  // Wheel handler
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      const delta = (e.deltaY / 100) * scrollSpeed * 3
      angleRef.current += delta
      velocityRef.current = delta * 0.5
      forceRender((n) => n + 1)
    },
    [scrollSpeed]
  )

  // Normalize angle to 0-360
  const normalizeAngle = (a: number) => ((a % 360) + 360) % 360

  return (
    <div
      ref={containerRef}
      className={className}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      style={{
        position: 'relative',
        width: '100%',
        height: itemHeight + 80,
        overflow: 'hidden',
        cursor: isDraggingRef.current ? 'grabbing' : 'grab',
        perspective: 1200,
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, i) => {
          const itemAngle = normalizeAngle(angleRef.current + i * angleStep)
          // Convert to radians, center at 0 (front-facing)
          const rad = ((itemAngle - 180) * Math.PI) / 180

          const x = Math.sin(rad) * radius
          const z = Math.cos(rad) * radius

          // Items in front (z > 0) are more visible
          const normalizedZ = (z + radius) / (2 * radius) // 0 = back, 1 = front
          const scale = 0.5 + normalizedZ * 0.5
          const opacity = 0.2 + normalizedZ * 0.8

          const isImage = item.image.startsWith('http') || item.image.startsWith('/')

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: itemWidth,
                height: itemHeight,
                marginLeft: -itemWidth / 2,
                marginTop: -itemHeight / 2 - 20,
                transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                opacity,
                zIndex: Math.round(normalizedZ * 1000),
                transition: isDraggingRef.current ? 'none' : 'opacity 0.1s ease-out',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius,
                  overflow: 'hidden',
                  boxShadow: `0 ${4 + normalizedZ * 12}px ${12 + normalizedZ * 24}px rgba(0,0,0,${0.15 + normalizedZ * 0.2})`,
                  background: isImage ? undefined : item.image,
                }}
              >
                {isImage && (
                  <img
                    src={item.image}
                    alt={item.text}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                    draggable={false}
                  />
                )}
              </div>
              <p
                style={{
                  textAlign: 'center',
                  marginTop: 10,
                  fontSize: 14,
                  fontWeight: 500,
                  color: textColor,
                  opacity: Math.max(0.4, normalizedZ),
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.text}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CircularGallery
