import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "context-menu",
title: "Context Menu",
description:
  "Right-click context menu that opens at cursor position with keyboard navigation, dividers, disabled items, and AnimatePresence animation.",
category: "navigation",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ContextMenuItem {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  divider?: boolean
  disabled?: boolean
}

interface ContextMenuProps {
  items: ContextMenuItem[]
  children: React.ReactNode
  className?: string
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const menuRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setIsOpen(false)
    setFocusedIndex(-1)
  }, [])

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setPosition({ x: e.clientX, y: e.clientY })
    setIsOpen(true)
    setFocusedIndex(-1)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, close])

  const actionableItems = items
    .map((item, i) => ({ ...item, originalIndex: i }))
    .filter((item) => !item.divider && !item.disabled)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex((prev) => {
          const currentActionIdx = actionableItems.findIndex(
            (a) => a.originalIndex === prev
          )
          const nextIdx =
            currentActionIdx < actionableItems.length - 1
              ? currentActionIdx + 1
              : 0
          return actionableItems[nextIdx].originalIndex
        })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex((prev) => {
          const currentActionIdx = actionableItems.findIndex(
            (a) => a.originalIndex === prev
          )
          const nextIdx =
            currentActionIdx > 0
              ? currentActionIdx - 1
              : actionableItems.length - 1
          return actionableItems[nextIdx].originalIndex
        })
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        e.preventDefault()
        const item = items[focusedIndex]
        if (item && !item.disabled && !item.divider && item.onClick) {
          item.onClick()
        }
        close()
      }
    },
    [isOpen, focusedIndex, items, actionableItems, close]
  )

  return (
    <div ref={containerRef}>
      <div onContextMenu={handleContextMenu}>{children}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            role="menu"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={cn(
              'fixed z-50 min-w-[180px] rounded-xl border border-border bg-obsidian py-1.5 shadow-2xl outline-none',
              className
            )}
            style={{ left: position.x, top: position.y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            autoFocus
          >
            {items.map((item, i) => {
              if (item.divider) {
                return (
                  <div
                    key={\`divider-\${i}\`}
                    className="my-1.5 h-px bg-border"
                  />
                )
              }

              return (
                <button
                  key={item.label + i}
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => {
                    if (!item.disabled && item.onClick) item.onClick()
                    close()
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 px-3 py-1.5 text-sm transition-colors cursor-pointer',
                    focusedIndex === i
                      ? 'bg-ignite/10 text-chalk'
                      : 'text-blush hover:bg-ignite/5 hover:text-chalk',
                    item.disabled && 'pointer-events-none opacity-40'
                  )}
                >
                  {item.icon && (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center text-text-faint">
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

export default ContextMenu`,
usage: `import ContextMenu from "@/app/components/ui/context-menu"

export function Demo() {
  return (
    <ContextMenu
      items={[
        { label: "Cut", onClick: () => {} },
        { label: "Copy", onClick: () => {} },
        { label: "Paste", onClick: () => {} },
        { label: "", divider: true },
        { label: "Delete", disabled: true },
      ]}
    >
      <div>Right-click this area</div>
    </ContextMenu>
  )
}`,
props: [
  {
    name: "items",
    type: "ContextMenuItem[]",
    default: "[]",
    description: "Array of menu items with label, optional icon, onClick, divider, and disabled flags.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "—",
    description: "The trigger element that responds to right-click.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
],
playground: {
  controls: [],
  defaults: {
    items: [
      { label: "Cut" },
      { label: "Copy" },
      { label: "Paste" },
      { label: "", divider: true },
      { label: "Select All" },
    ],
  },
},
component: () => import("@/app/components/ui/context-menu"),
demo: () => import("@/app/components/demos/context-menu-demo"),
};

export default entry;
