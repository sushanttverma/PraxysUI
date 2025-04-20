'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DockItem {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

interface GlassDockProps {
  items: DockItem[]
  className?: string
  iconSize?: number
}

const GlassDock: React.FC<GlassDockProps> = ({
  items,
  className = '',
  iconSize = 24,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-end gap-2 rounded-2xl border border-border/60 px-3 py-2',
        'bg-obsidian/60 backdrop-blur-xl shadow-lg',
        className
      )}
    >
      {items.map((item, i) => (
        <DockIcon key={i} item={item} iconSize={iconSize} />
      ))}
    </div>
  )
}

function DockIcon({
  item,
  iconSize,
}: {
  item: DockItem
  iconSize: number
}) {
  return (
    <motion.button
      onClick={item.onClick}
      whileHover={{ scale: 1.4, y: -8 }}
      whileTap={{ scale: 1.2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="group relative flex flex-col items-center cursor-pointer"
    >
      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, y: 4, scale: 0.8 }}
        whileHover={{ opacity: 1, y: -4, scale: 1 }}
        className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-void border border-border px-2 py-0.5 text-xs text-chalk shadow-md"
      >
        {item.label}
      </motion.span>

      <div
        className="flex items-center justify-center rounded-xl bg-obsidian border border-border/50 p-2.5 transition-colors group-hover:border-ignite/30 group-hover:bg-ignite/10"
        style={{ width: iconSize + 20, height: iconSize + 20 }}
      >
        <div className="text-blush transition-colors group-hover:text-ignite" style={{ width: iconSize, height: iconSize }}>
          {item.icon}
        </div>
      </div>

      {/* Reflection dot */}
      <motion.div
        className="mt-1 h-1 w-1 rounded-full bg-ignite/50"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.button>
  )
}

export default GlassDock
