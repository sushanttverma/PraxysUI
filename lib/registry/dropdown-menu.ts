import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "dropdown-menu",
title: "Dropdown Menu",
description:
  "An animated dropdown menu with full keyboard navigation, click-outside close, divider and disabled item support.",
category: "navigation",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DropdownItem {
  label: string
  onClick?: () => void
  icon?: React.ReactNode
  disabled?: boolean
  divider?: boolean
}

interface DropdownMenuProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  align = 'left',
  className,
}) => {
  const [open, setOpen] = useState(false)
  const [focusIndex, setFocusIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
const handleClickOutside = (e: MouseEvent) => {
  if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
    setOpen(false)
  }
}
if (open) {
  document.addEventListener('mousedown', handleClickOutside)
}
return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Get actionable (non-divider, non-disabled) item indices
  const actionableIndices = items
.map((item, i) => (!item.divider && !item.disabled ? i : -1))
.filter((i) => i !== -1)

  const handleKeyDown = useCallback(
(e: React.KeyboardEvent) => {
  if (!open) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(true)
      setFocusIndex(actionableIndices[0] ?? -1)
    }
    return
  }

  switch (e.key) {
    case 'Escape':
      e.preventDefault()
      setOpen(false)
      setFocusIndex(-1)
      break
    case 'ArrowDown': {
      e.preventDefault()
      const currentPos = actionableIndices.indexOf(focusIndex)
      const next = actionableIndices[(currentPos + 1) % actionableIndices.length]
      setFocusIndex(next)
      break
    }
    case 'ArrowUp': {
      e.preventDefault()
      const currentPos = actionableIndices.indexOf(focusIndex)
      const prev =
        actionableIndices[
          (currentPos - 1 + actionableIndices.length) % actionableIndices.length
        ]
      setFocusIndex(prev)
      break
    }
    case 'Enter':
    case ' ': {
      e.preventDefault()
      const item = items[focusIndex]
      if (item && !item.disabled && !item.divider && item.onClick) {
        item.onClick()
      }
      setOpen(false)
      setFocusIndex(-1)
      break
    }
  }
},
[open, focusIndex, items, actionableIndices]
  )

  const toggleOpen = () => {
setOpen((prev) => {
  if (!prev) setFocusIndex(-1)
  return !prev
})
  }

  return (
<div ref={containerRef} className="relative inline-block" onKeyDown={handleKeyDown}>
  {/* Trigger */}
  <div
    role="button"
    tabIndex={0}
    aria-haspopup="true"
    aria-expanded={open}
    onClick={toggleOpen}
    className="cursor-pointer"
  >
    {trigger}
  </div>

  {/* Menu */}
  <AnimatePresence>
    {open && (
      <motion.div
        ref={menuRef}
        role="menu"
        initial={{ opacity: 0, scale: 0.95, y: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -4 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
        className={cn(
          'absolute z-50 mt-1 min-w-[180px] overflow-hidden rounded-lg border border-border bg-obsidian py-1 shadow-xl',
          align === 'right' ? 'right-0' : 'left-0',
          className
        )}
      >
        {items.map((item, i) => {
          if (item.divider) {
            return (
              <div
                key={\`divider-\${i}\`}
                className="my-1 h-px bg-border"
                role="separator"
              />
            )
          }

          const isFocused = focusIndex === i

          return (
            <button
              key={\`\${item.label}-\${i}\`}
              role="menuitem"
              type="button"
              disabled={item.disabled}
              tabIndex={-1}
              onClick={() => {
                if (!item.disabled && item.onClick) item.onClick()
                setOpen(false)
              }}
              className={cn(
                'flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors cursor-pointer',
                item.disabled
                  ? 'text-text-faint cursor-not-allowed'
                  : 'text-chalk hover:bg-ignite/10',
                isFocused && !item.disabled && 'bg-ignite/10'
              )}
            >
              {item.icon && (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center text-blush">
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
            </button>
          )
        })}
      </motion.div>
    )}
  </AnimatePresence>
</div>
  )
}

export default DropdownMenu`,
usage: `import DropdownMenu from "@/app/components/ui/dropdown-menu"

export function Demo() {
  return (
<DropdownMenu
  trigger={<button className="rounded-lg bg-ignite px-4 py-2 text-sm text-chalk">Menu</button>}
  items={[
    { label: "Profile", onClick: () => console.log("Profile") },
    { label: "Settings", onClick: () => console.log("Settings") },
    { divider: true, label: "" },
    { label: "Log Out", onClick: () => console.log("Logout") },
  ]}
/>
  )
}`,
props: [
  {
    name: "trigger",
    type: "React.ReactNode",
    default: "—",
    description: "The element that triggers the dropdown.",
  },
  {
    name: "items",
    type: "DropdownItem[]",
    default: "—",
    description: "Array of menu items ({ label, onClick?, icon?, disabled?, divider? }).",
  },
  {
    name: "align",
    type: "'left' | 'right'",
    default: "'left'",
    description: "Horizontal alignment of the dropdown.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes for the dropdown panel.",
  },
],
playground: {
  controls: [
    { name: "align", label: "Align", type: "select", default: "left", options: ["left", "right"] },
  ],
  defaults: {
    items: [
      { label: "Profile" },
      { label: "Settings" },
      { divider: true, label: "" },
      { label: "Log Out" },
    ],
  },
},
component: () => import("@/app/components/ui/dropdown-menu"),
demo: () => import("@/app/components/demos/dropdown-menu-demo"),
};

export default entry;
