'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SidebarItem {
  label: string
  icon?: React.ReactNode
  href?: string
  children?: SidebarItem[]
}

interface SidebarProps {
  items: SidebarItem[]
  collapsed?: boolean
  onToggle?: () => void
  className?: string
}

const SidebarItemRow: React.FC<{
  item: SidebarItem
  collapsed: boolean
  depth?: number
  index: number
}> = ({ item, collapsed, depth = 0, index }) => {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  const content = (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <button
        type="button"
        onClick={() => {
          if (hasChildren) setExpanded((p) => !p)
          else if (item.href) window.location.href = item.href
        }}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer',
          'text-blush hover:bg-ignite/5 hover:text-chalk',
          depth > 0 && 'pl-8'
        )}
      >
        {item.icon && (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center text-text-faint">
            {item.icon}
          </span>
        )}
        {!collapsed && (
          <span className="flex-1 truncate text-left">{item.label}</span>
        )}
        {!collapsed && hasChildren && (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-faint"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        )}
      </button>

      <AnimatePresence initial={false}>
        {!collapsed && expanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {item.children!.map((child, i) => (
              <SidebarItemRow
                key={child.label + i}
                item={child}
                collapsed={collapsed}
                depth={depth + 1}
                index={i}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return content
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  collapsed = false,
  onToggle,
  className,
}) => {
  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'flex h-full flex-col border-r border-border bg-obsidian',
        className
      )}
    >
      <div className="flex items-center justify-between px-3 py-4">
        {!collapsed && (
          <span className="text-sm font-semibold text-chalk">Navigation</span>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="flex h-8 w-8 items-center justify-center rounded-md text-text-faint transition-colors hover:bg-ignite/5 hover:text-chalk cursor-pointer"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ scaleX: collapsed ? -1 : 1 }}
            transition={{ duration: 0.25 }}
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="15" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </motion.svg>
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
        {items.map((item, i) => (
          <SidebarItemRow
            key={item.label + i}
            item={item}
            collapsed={collapsed}
            index={i}
          />
        ))}
      </nav>
    </motion.aside>
  )
}

export default Sidebar
