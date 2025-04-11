'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface LineHoverLinkProps {
  children: React.ReactNode
  href?: string
  className?: string
  lineColor?: string
}

const LineHoverLink: React.FC<LineHoverLinkProps> = ({
  children,
  href = '#',
  className = '',
  lineColor,
}) => {
  return (
    <a
      href={href}
      className={cn(
        'group relative inline-block text-chalk transition-colors hover:text-ignite',
        className
      )}
    >
      {children}
      <span
        className="absolute bottom-0 left-0 h-px w-0 transition-all duration-300 ease-out group-hover:w-full"
        style={{ backgroundColor: lineColor || 'var(--color-ignite)' }}
      />
    </a>
  )
}

export default LineHoverLink
