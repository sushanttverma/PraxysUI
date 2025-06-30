'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface KbdProps {
  children: React.ReactNode
  className?: string
}

const Kbd: React.FC<KbdProps> = ({ children, className }) => {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-border bg-obsidian px-1.5 font-mono text-[11px] font-medium text-blush shadow-[0_1px_0_1px_var(--color-void)]',
        className
      )}
    >
      {children}
    </kbd>
  )
}

export default Kbd
