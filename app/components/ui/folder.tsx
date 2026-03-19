'use client'

import React, { useState, useCallback } from 'react'

interface FolderProps {
  color?: string
  size?: number
  items?: Array<React.ReactNode>
  className?: string
}

const Folder: React.FC<FolderProps> = ({
  color = '#E04E2D',
  size = 1,
  items = [],
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredPaper, setHoveredPaper] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const papers = items.slice(0, 3)

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setHoveredPaper(null)
  }, [])

  const darken = (hex: string, amount: number): string => {
    const num = parseInt(hex.replace('#', ''), 16)
    const r = Math.max(0, (num >> 16) - amount)
    const g = Math.max(0, ((num >> 8) & 0x00ff) - amount)
    const b = Math.max(0, (num & 0x0000ff) - amount)
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }

  const lighten = (hex: string, amount: number): string => {
    const num = parseInt(hex.replace('#', ''), 16)
    const r = Math.min(255, (num >> 16) + amount)
    const g = Math.min(255, ((num >> 8) & 0x00ff) + amount)
    const b = Math.min(255, (num & 0x0000ff) + amount)
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }

  const frontColor = darken(color, 20)
  const backColor = color
  const tabColor = lighten(color, 15)

  const baseWidth = 200
  const baseHeight = 160
  const w = baseWidth * size
  const h = baseHeight * size

  const paperRotations = [-15, 0, 15]
  const paperDelays = [0, 0.05, 0.1]

  return (
    <div
      className={className}
      style={{
        width: w,
        height: h + 40 * size,
        position: 'relative',
        cursor: 'pointer',
        transform: 'translateY(' + (isHovered && !isOpen ? -8 * size : 0) + 'px)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onClick={toggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Back panel */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: h,
          backgroundColor: backColor,
          borderRadius: 8 * size,
          boxShadow: '0 ' + (2 * size) + 'px ' + (8 * size) + 'px rgba(0,0,0,0.2)',
          zIndex: 1,
        }}
      />

      {/* Papers */}
      {papers.map((content, i) => {
        const rotation = isOpen ? paperRotations[i] : 0
        const translateY = isOpen
          ? -(60 + i * 20) * size
          : -(10 + i * 5) * size
        const translateYFinal = !isOpen && isHovered
          ? translateY - 5 * size
          : translateY
        const paperScale = isOpen && hoveredPaper === i ? 1.05 : 1

        return (
          <div
            key={i}
            onMouseEnter={(e) => {
              if (isOpen) {
                e.stopPropagation()
                setHoveredPaper(i)
              }
            }}
            onMouseLeave={() => {
              if (isOpen) {
                setHoveredPaper(null)
              }
            }}
            style={{
              position: 'absolute',
              bottom: h * 0.1,
              left: '50%',
              width: w * 0.75,
              height: h * 0.85,
              backgroundColor: '#f5f0e8',
              borderRadius: 4 * size,
              boxShadow: '0 ' + (1 * size) + 'px ' + (4 * size) + 'px rgba(0,0,0,0.1)',
              zIndex: 2 + i,
              transform: 'translateX(-50%) translateY(' + translateYFinal + 'px) rotate(' + rotation + 'deg) scale(' + paperScale + ')',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ' + paperDelays[i] + 's',
              transformOrigin: 'bottom center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8 * size,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: 12 * size,
                color: '#444',
                textAlign: 'center',
                lineHeight: 1.4,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {content}
            </div>
            {!content && (
              <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: 6 * size }}>
                {[0.9, 0.7, 0.85, 0.6].map((widthFrac, j) => (
                  <div
                    key={j}
                    style={{
                      width: (widthFrac * 100) + '%',
                      height: 2 * size,
                      backgroundColor: '#ddd',
                      borderRadius: 1,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* Front panel */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: h * 0.55,
          backgroundColor: frontColor,
          borderRadius: '0 0 ' + (8 * size) + 'px ' + (8 * size) + 'px',
          zIndex: 5 + papers.length,
          boxShadow: '0 ' + (1 * size) + 'px ' + (4 * size) + 'px rgba(0,0,0,0.15)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'bottom center',
          transform: isOpen ? 'rotateX(10deg) translateY(4px)' : 'rotateX(0deg)',
        }}
      >
        {/* Fold line accent */}
        <div
          style={{
            position: 'absolute',
            top: 2 * size,
            left: '10%',
            width: '80%',
            height: 2 * size,
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: 1,
          }}
        />
      </div>

      {/* Tab on top of front panel */}
      <div
        style={{
          position: 'absolute',
          bottom: h * 0.55 - 1,
          left: w * 0.05,
          width: w * 0.35,
          height: 18 * size,
          backgroundColor: tabColor,
          borderRadius: (6 * size) + 'px ' + (6 * size) + 'px 0 0',
          zIndex: 5 + papers.length,
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'bottom center',
          transform: isOpen ? 'rotateX(10deg) translateY(4px)' : 'rotateX(0deg)',
        }}
      />
    </div>
  )
}

export default Folder
