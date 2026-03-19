'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'

export interface MasonryItem {
  id: number | string
  height: number
  content?: React.ReactNode
  image?: string
  className?: string
}

interface MasonryProps {
  items: MasonryItem[]
  columnCount?: number
  gap?: number
  animationDuration?: number
  stagger?: number
  scaleOnHover?: boolean
  className?: string
}

function getResponsiveColumns(width: number): number {
  if (width < 640) return 1
  if (width < 768) return 2
  if (width < 1024) return 3
  return 4
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  columnCount = 0,
  gap = 16,
  animationDuration = 0.6,
  stagger = 0.05,
  scaleOnHover = true,
  className = '',
}) => {
  const [columns, setColumns] = useState<MasonryItem[][]>([])
  const [colCount, setColCount] = useState(() =>
    columnCount > 0 ? columnCount : 3
  )
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateColumnCount = useCallback(() => {
    if (columnCount > 0) {
      setColCount(columnCount)
    } else {
      setColCount(getResponsiveColumns(window.innerWidth))
    }
  }, [columnCount])

  useEffect(() => {
    updateColumnCount()
    setMounted(true)

    const handleResize = () => updateColumnCount()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateColumnCount])

  useEffect(() => {
    const result: MasonryItem[][] = Array.from({ length: colCount }, () => [])
    const heights: number[] = new Array(colCount).fill(0)

    for (const item of items) {
      let shortest = 0
      for (let c = 1; c < colCount; c++) {
        if (heights[c] < heights[shortest]) shortest = c
      }
      result[shortest].push(item)
      heights[shortest] += item.height + gap
    }

    setColumns(result)
  }, [items, colCount, gap])

  // Track global index for stagger delay
  let globalIndex = 0
  const getGlobalIndex = () => globalIndex++

  const styleId = 'masonry-keyframes'
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.getElementById(styleId)) return
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes masonry-fade-up {
        from {
          opacity: 0;
          transform: translateY(24px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `
    document.head.appendChild(style)
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: 'flex',
        gap: `${gap}px`,
        width: '100%',
      }}
    >
      {columns.map((colItems, colIdx) => (
        <div
          key={colIdx}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: `${gap}px`,
          }}
        >
          {colItems.map((item) => {
            const idx = getGlobalIndex()
            return (
              <div
                key={item.id}
                className={item.className}
                style={{
                  height: `${item.height}px`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  ...(item.image
                    ? {
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : {}),
                  animation: mounted
                    ? `masonry-fade-up ${animationDuration}s ${idx * stagger}s both cubic-bezier(0.22, 1, 0.36, 1)`
                    : 'none',
                  opacity: mounted ? undefined : 0,
                  transition: scaleOnHover
                    ? 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                    : undefined,
                  cursor: scaleOnHover ? 'pointer' : undefined,
                }}
                onMouseEnter={(e) => {
                  if (scaleOnHover) {
                    e.currentTarget.style.transform = 'scale(1.03)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (scaleOnHover) {
                    e.currentTarget.style.transform = 'scale(1)'
                  }
                }}
              >
                {!item.image && item.content && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.content}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Masonry
