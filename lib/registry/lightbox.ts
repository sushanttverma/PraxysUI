import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "lightbox",
title: "Lightbox",
description:
  "Fullscreen image viewer with spring scale animation, backdrop blur, click-to-zoom, arrow key navigation, thumbnail strip, and click-outside-to-close.",
category: "media",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

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

const Lightbox: React.FC<LightboxProps> = ({
  images,
  initialIndex = 0,
  open,
  onClose,
}) => {
  const [current, setCurrent] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const total = images.length

  useEffect(() => {
    if (open) setCurrent(initialIndex)
  }, [open, initialIndex])

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
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  const toggleZoom = useCallback(() => {
    setZoom((z) => (z === 1 ? 2 : 1))
  }, [])

  if (!images.length) return null

  return (
    <AnimatePresence>
      {open && (
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
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
                  aria-label={\`View image \${i + 1}\`}
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
      )}
    </AnimatePresence>
  )
}

export default Lightbox`,
usage: `import Lightbox from "@/app/components/ui/lightbox"
import { useState } from "react"

export function Demo() {
  const [open, setOpen] = useState(false)
  const images = [
    { src: "https://picsum.photos/seed/a/800/600", alt: "Photo 1" },
    { src: "https://picsum.photos/seed/b/800/600", alt: "Photo 2" },
  ]

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Lightbox</button>
      <Lightbox images={images} open={open} onClose={() => setOpen(false)} />
    </>
  )
}`,
props: [
  {
    name: "images",
    type: "{ src: string; alt?: string }[]",
    default: "[]",
    description: "Array of image objects with src and optional alt text.",
  },
  {
    name: "initialIndex",
    type: "number",
    default: "0",
    description: "Index of the image to display when opened.",
  },
  {
    name: "open",
    type: "boolean",
    default: "false",
    description: "Whether the lightbox is visible.",
  },
  {
    name: "onClose",
    type: "() => void",
    default: "—",
    description: "Callback fired when the lightbox should close.",
  },
],
playground: {
  controls: [
    { name: "initialIndex", label: "Start index", type: "number", default: 0, min: 0, max: 3 },
  ],
  defaults: {
    images: [
      { src: "https://picsum.photos/seed/praxys1/800/600", alt: "Mountain landscape" },
      { src: "https://picsum.photos/seed/praxys2/800/600", alt: "Ocean sunset" },
      { src: "https://picsum.photos/seed/praxys3/800/600", alt: "Forest path" },
      { src: "https://picsum.photos/seed/praxys4/800/600", alt: "City skyline" },
    ],
    open: true,
  },
},
component: () => import("@/app/components/ui/lightbox"),
demo: () => import("@/app/components/demos/lightbox-demo"),
};

export default entry;
