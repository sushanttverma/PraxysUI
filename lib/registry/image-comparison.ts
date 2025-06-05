import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "image-comparison",
title: "Image Comparison",
description:
  "A before/after image comparison slider with pointer-capture dragging, clip-based reveal, and an animated drag handle.",
category: "media",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ImageComparisonProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
  initialPosition?: number
  className?: string
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before',
  afterAlt = 'After',
  initialPosition = 50,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)

  const updatePosition = useCallback((clientX: number) => {
const rect = containerRef.current?.getBoundingClientRect()
if (!rect) return
const x = clientX - rect.left
const pct = Math.min(100, Math.max(0, (x / rect.width) * 100))
setPosition(pct)
  }, [])

  const handlePointerDown = useCallback(
(e: React.PointerEvent) => {
  e.preventDefault()
  setIsDragging(true)
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  updatePosition(e.clientX)
},
[updatePosition]
  )

  const handlePointerMove = useCallback(
(e: React.PointerEvent) => {
  if (!isDragging) return
  updatePosition(e.clientX)
},
[isDragging, updatePosition]
  )

  const handlePointerUp = useCallback(() => {
setIsDragging(false)
  }, [])

  return (
<div
  ref={containerRef}
  className={cn(
    'relative w-full select-none overflow-hidden rounded-xl border border-border bg-void',
    className
  )}
  style={{ aspectRatio: '16 / 10' }}
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerUp={handlePointerUp}
  onPointerCancel={handlePointerUp}
>
  {/* After image (full background) */}
  <img
    src={afterSrc}
    alt={afterAlt}
    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
    draggable={false}
  />

  {/* Before image (clipped) */}
  <div
    className="absolute inset-0 overflow-hidden"
    style={{ width: \`\${position}%\` }}
  >
    <img
      src={beforeSrc}
      alt={beforeAlt}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      style={{ minWidth: containerRef.current?.offsetWidth ?? '100%' }}
      draggable={false}
    />
  </div>

  {/* Labels */}
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="absolute left-3 top-3 rounded-md bg-obsidian/80 px-2 py-0.5 text-xs font-medium text-chalk backdrop-blur-sm"
  >
    Before
  </motion.span>
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="absolute right-3 top-3 rounded-md bg-obsidian/80 px-2 py-0.5 text-xs font-medium text-chalk backdrop-blur-sm"
  >
    After
  </motion.span>

  {/* Divider line */}
  <div
    className="absolute top-0 bottom-0 z-10 w-0.5 bg-chalk/70"
    style={{ left: \`\${position}%\`, transform: 'translateX(-50%)' }}
  />

  {/* Handle grip */}
  <motion.div
    className={cn(
      'absolute top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border-2 border-chalk bg-obsidian shadow-lg',
      isDragging && 'cursor-grabbing scale-110'
    )}
    style={{ left: \`\${position}%\` }}
    whileHover={{ scale: 1.1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="text-chalk"
    >
      <path
        d="M4 3L1 8L4 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3L15 8L12 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </motion.div>
</div>
  )
}

export default ImageComparison`,
usage: `import ImageComparison from "@/app/components/ui/image-comparison"

export function Demo() {
  return (
<ImageComparison
  beforeSrc="/images/before.jpg"
  afterSrc="/images/after.jpg"
  beforeAlt="Original"
  afterAlt="Enhanced"
  initialPosition={50}
/>
  )
}`,
props: [
  {
    name: "beforeSrc",
    type: "string",
    default: "—",
    description: "URL of the 'before' image.",
  },
  {
    name: "afterSrc",
    type: "string",
    default: "—",
    description: "URL of the 'after' image.",
  },
  {
    name: "beforeAlt",
    type: "string",
    default: "'Before'",
    description: "Alt text for the before image.",
  },
  {
    name: "afterAlt",
    type: "string",
    default: "'After'",
    description: "Alt text for the after image.",
  },
  {
    name: "initialPosition",
    type: "number",
    default: "50",
    description: "Initial slider position as a percentage (0–100).",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
],
playground: {
  controls: [
    { name: "initialPosition", label: "Initial Position (%)", type: "number", default: 50, min: 0, max: 100, step: 5 },
  ],
},
component: () => import("@/app/components/ui/image-comparison"),
demo: () => import("@/app/components/demos/image-comparison-demo"),
};

export default entry;
