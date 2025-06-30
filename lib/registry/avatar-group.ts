import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "avatar-group",
title: "Avatar Group",
description:
  "Stacked avatar circles with overlap, max display count with '+N' overflow indicator, three sizes, and fallback initials.",
category: "visual",
dependencies: ["clsx", "tailwind-merge"],
code: `'use client'

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

export default AvatarGroup`,
usage: `import AvatarGroup from "@/app/components/ui/avatar-group"

export function Demo() {
  const team = [
    { alt: "Alice", fallback: "A" },
    { alt: "Bob", fallback: "B" },
    { alt: "Charlie", fallback: "C" },
    { alt: "Diana", fallback: "D" },
    { alt: "Eve", fallback: "E" },
  ]

  return <AvatarGroup avatars={team} max={3} size="md" />
}`,
props: [
  {
    name: "avatars",
    type: "{ src?: string; alt: string; fallback?: string }[]",
    default: "[]",
    description: "Array of avatar objects with optional image URL and fallback.",
  },
  {
    name: "max",
    type: "number",
    default: "5",
    description: "Maximum number of visible avatars before showing overflow.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "Avatar size variant.",
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
    { name: "max", label: "Max visible", type: "number", default: 4, min: 1, max: 10 },
    { name: "size", label: "Size", type: "select", default: "md", options: ["sm", "md", "lg"] },
  ],
  defaults: {
    avatars: [
      { alt: "Alice", fallback: "A" },
      { alt: "Bob", fallback: "B" },
      { alt: "Charlie", fallback: "C" },
      { alt: "Diana", fallback: "D" },
      { alt: "Eve", fallback: "E" },
      { alt: "Frank", fallback: "F" },
    ],
  },
},
component: () => import("@/app/components/ui/avatar-group"),
demo: () => import("@/app/components/demos/avatar-group-demo"),
};

export default entry;
