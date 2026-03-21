'use client'

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  Children,
  type ReactNode,
} from 'react'

/* ─── Types ──────────────────────────────────────────────── */

interface ScrollStackProps {
  children: ReactNode
  itemHeight?: number
  spacing?: number
  baseScale?: number
  scaleIncrement?: number
  rotationAmount?: number
  className?: string
}

interface ScrollStackItemProps {
  children: ReactNode
  className?: string
}

/* ─── ScrollStackItem ────────────────────────────────────── */

export function ScrollStackItem({ children, className = '' }: ScrollStackItemProps) {
  return <div className={className}>{children}</div>
}

/* ─── ScrollStack ────────────────────────────────────────── */

export default function ScrollStack({
  children,
  itemHeight = 300,
  spacing = 100,
  baseScale = 0.85,
  scaleIncrement = 0.03,
  rotationAmount = 0,
  className = '',
}: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [containerTop, setContainerTop] = useState(0)
  const rafRef = useRef<number>(0)

  const items = Children.toArray(children)
  const totalItems = items.length

  // Total scrollable height: enough room so the last card can fully arrive
  const totalHeight = totalItems * spacing + itemHeight

  const updateScroll = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setContainerTop(rect.top)
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateScroll)
    }

    updateScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateScroll])

  // Progress through the container: 0 = top of container at viewport top, 1 = bottom
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const containerOffset = scrollY + containerTop
  const rawProgress = (scrollY + viewportHeight * 0.5 - containerOffset) / totalHeight
  const progress = Math.max(0, Math.min(1, rawProgress))

  // Which card index the scroll has "reached"
  const activeFloat = progress * totalItems

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: totalHeight }}
    >
      {/* Sticky viewport where cards visually stack */}
      <div
        className="sticky top-0 flex items-center justify-center overflow-hidden"
        style={{ height: viewportHeight }}
      >
        <div
          className="relative"
          style={{ width: '100%', height: itemHeight }}
        >
          {items.map((child, index) => {
            // How far this card has progressed into view: 0 = not yet, 1 = fully arrived
            const cardProgress = Math.max(0, Math.min(1, activeFloat - index))

            // Cards that haven't started appearing yet stay hidden
            if (activeFloat < index - 0.1) return null

            // Scale: starts at baseScale, reaches 1.0 when fully active
            // Cards behind the current one shrink slightly
            const distBehind = Math.max(0, activeFloat - index - 1)
            const shrinkBehind = distBehind * scaleIncrement
            const scale = baseScale + (1 - baseScale) * cardProgress - shrinkBehind

            // Y offset: cards slide up from below, then shift up as newer cards arrive
            const enterY = (1 - cardProgress) * 60
            const pushUp = distBehind * 15
            const translateY = enterY - pushUp

            // Rotation: subtle tilt that unwinds as the card arrives
            const rotation = rotationAmount * (1 - cardProgress)

            // Opacity: fade in as card enters
            const opacity = Math.min(1, cardProgress * 2.5)

            // Z-index: later cards on top
            const zIndex = index + 1

            return (
              <div
                key={index}
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: `translateY(${translateY}px) scale(${Math.max(0.5, scale)}) rotate(${rotation}deg)`,
                  opacity,
                  zIndex,
                  transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                  height: itemHeight,
                }}
              >
                {child}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
