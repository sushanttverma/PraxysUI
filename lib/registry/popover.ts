import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "popover",
title: "Popover",
description:
  "Floating popover with arrow indicator, click-to-toggle, click-outside-to-close, and AnimatePresence entrance animation.",
category: "navigation",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PopoverProps {
  trigger: React.ReactNode
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  className?: string
}

const originMap: Record<string, string> = {
  top: 'origin-bottom',
  bottom: 'origin-top',
  left: 'origin-right',
  right: 'origin-left',
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  side = 'bottom',
  align = 'center',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    },
    []
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClickOutside])

  const positionClasses = cn(
    'absolute z-50',
    side === 'bottom' && 'top-full mt-2',
    side === 'top' && 'bottom-full mb-2',
    side === 'left' && 'right-full mr-2 top-0',
    side === 'right' && 'left-full ml-2 top-0',
    (side === 'top' || side === 'bottom') && align === 'start' && 'left-0',
    (side === 'top' || side === 'bottom') && align === 'center' && 'left-1/2 -translate-x-1/2',
    (side === 'top' || side === 'bottom') && align === 'end' && 'right-0',
    (side === 'left' || side === 'right') && align === 'start' && 'top-0',
    (side === 'left' || side === 'right') && align === 'center' && 'top-1/2 -translate-y-1/2',
    (side === 'left' || side === 'right') && align === 'end' && 'bottom-0'
  )

  const arrowClasses = cn(
    'absolute h-2 w-2 rotate-45 border border-border bg-obsidian',
    side === 'bottom' && 'top-0 -translate-y-1/2 border-b-0 border-r-0',
    side === 'top' && 'bottom-0 translate-y-1/2 border-t-0 border-l-0',
    side === 'left' && 'right-0 translate-x-1/2 border-l-0 border-t-0',
    side === 'right' && 'left-0 -translate-x-1/2 border-r-0 border-b-0',
    align === 'center' && (side === 'top' || side === 'bottom') && 'left-1/2 -translate-x-1/2',
    align === 'start' && (side === 'top' || side === 'bottom') && 'left-4',
    align === 'end' && (side === 'top' || side === 'bottom') && 'right-4',
    align === 'center' && (side === 'left' || side === 'right') && 'top-1/2 -translate-y-1/2',
    align === 'start' && (side === 'left' || side === 'right') && 'top-4',
    align === 'end' && (side === 'left' || side === 'right') && 'bottom-4'
  )

  const initialMotion =
    side === 'bottom'
      ? { opacity: 0, y: -4, scale: 0.95 }
      : side === 'top'
        ? { opacity: 0, y: 4, scale: 0.95 }
        : side === 'left'
          ? { opacity: 0, x: 4, scale: 0.95 }
          : { opacity: 0, x: -4, scale: 0.95 }

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => setIsOpen((p) => !p)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(positionClasses, originMap[side])}
            initial={initialMotion}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={initialMotion}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div
              className={cn(
                'relative rounded-xl border border-border bg-obsidian p-4 shadow-xl',
                className
              )}
            >
              <div className={arrowClasses} />
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Popover`,
usage: `import Popover from "@/app/components/ui/popover"

export function Demo() {
  return (
    <Popover
      trigger={<button>Click me</button>}
      side="bottom"
      align="center"
    >
      <p>Popover content here.</p>
    </Popover>
  )
}`,
props: [
  {
    name: "trigger",
    type: "React.ReactNode",
    default: "—",
    description: "The element that toggles the popover on click.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "—",
    description: "Content rendered inside the popover.",
  },
  {
    name: "side",
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'bottom'",
    description: "Which side of the trigger the popover appears on.",
  },
  {
    name: "align",
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    description: "Alignment of the popover relative to the trigger.",
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
    { name: "side", label: "Side", type: "select", default: "bottom", options: ["top", "bottom", "left", "right"] },
    { name: "align", label: "Align", type: "select", default: "center", options: ["start", "center", "end"] },
  ],
  defaults: {},
},
component: () => import("@/app/components/ui/popover"),
demo: () => import("@/app/components/demos/popover-demo"),
};

export default entry;
