'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LightboxImage {
  src: string
  alt?: string
}

interface LightboxProps {
  images: LightboxImage[]
  initialIndex?: number
  open: boolean
  onClose: () => void
}

/* Inner component resets `current` via key-based remount */
const LightboxInner: React.FC<{
  images: LightboxImage[]
  initialIndex: number
  onClose: () => void
}> = ({ images, initialIndex, onClose }) => {
  const [current, setCurrent] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const total = images.length

  const next = useCallback(() => {
    setZoom(1)
    setCurrent((c) => (c + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setZoom(1)
    setCurrent((c) => (c - 1 + total) % total)
  }, [total])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    },
    [onClose, next, prev]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const toggleZoom = useCallback(() => {
    setZoom((z) => (z === 1 ? 2 : 1))
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-void/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 z-20 cursor-pointer rounded-md p-2 text-blush transition-colors hover:bg-ignite/10 hover:text-chalk"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute left-4 top-4 z-20 rounded-md bg-obsidian/80 px-3 py-1 text-xs font-medium text-chalk backdrop-blur-sm">
        {current + 1} / {total}
      </div>

      {/* Image */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={current}
          src={images[current].src}
          alt={images[current].alt || ''}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: zoom }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
          onClick={toggleZoom}
          className={cn(
            'relative z-10 max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl',
            zoom > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
          )}
          draggable={false}
        />
      </AnimatePresence>

      {/* Arrows */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-obsidian/80 text-blush backdrop-blur-sm transition-colors hover:bg-ignite/10 hover:text-chalk"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-obsidian/80 text-blush backdrop-blur-sm transition-colors hover:bg-ignite/10 hover:text-chalk"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Thumbnails */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setZoom(1)
                setCurrent(i)
              }}
              aria-label={`View image ${i + 1}`}
              className={cn(
                'h-10 w-10 overflow-hidden rounded-md border-2 transition-all',
                i === current
                  ? 'border-ignite opacity-100'
                  : 'border-border opacity-50 hover:opacity-80'
              )}
            >
              <img
                src={img.src}
                alt={img.alt || ''}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  initialIndex = 0,
  open,
  onClose,
}) => {
  if (!images.length) return null

  return (
    <AnimatePresence>
      {open && (
        <LightboxInner
          key={initialIndex}
          images={images}
          initialIndex={initialIndex}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  )
}

export default Lightbox
