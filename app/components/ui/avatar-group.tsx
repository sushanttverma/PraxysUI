'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface Avatar {
  src?: string
  alt: string
  fallback?: string
}

interface AvatarGroupProps {
  avatars: Avatar[]
  max?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: { container: 'h-7 w-7 text-[9px]', overlap: '-ml-2', ring: 'ring-2' },
  md: { container: 'h-9 w-9 text-xs', overlap: '-ml-2.5', ring: 'ring-2' },
  lg: { container: 'h-12 w-12 text-sm', overlap: '-ml-3', ring: 'ring-[3px]' },
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 5,
  size = 'md',
  className,
}) => {
  const config = sizeMap[size]
  const visible = avatars.slice(0, max)
  const remaining = avatars.length - max

  return (
    <div className={cn('flex items-center', className)}>
      {visible.map((avatar, i) => (
        <div
          key={avatar.alt + i}
          className={cn(
            'relative shrink-0 rounded-full ring-void',
            config.container,
            config.ring,
            i > 0 && config.overlap
          )}
          style={{ zIndex: visible.length - i }}
          title={avatar.alt}
        >
          {avatar.src ? (
            <img
              src={avatar.src}
              alt={avatar.alt}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-obsidian border border-border font-medium text-blush">
              {avatar.fallback || avatar.alt.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      ))}

      {remaining > 0 && (
        <div
          className={cn(
            'relative flex shrink-0 items-center justify-center rounded-full bg-obsidian border border-border font-medium text-text-faint ring-void',
            config.container,
            config.ring,
            config.overlap
          )}
          style={{ zIndex: 0 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}

export default AvatarGroup
