import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "masked-avatars",
title: "Masked Avatars",
description:
  "A stacked avatar group with overlapping circular avatars, hover-to-pop animation, tooltips, and a +N overflow indicator.",
category: "media",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Avatar {
  src?: string
  name: string
}

interface MaskedAvatarsProps {
  avatars: Avatar[]
  max?: number
  size?: number
  className?: string
}

const MaskedAvatars: React.FC<MaskedAvatarsProps> = ({
  avatars,
  max = 5,
  size = 44,
  className = '',
}) => {
  const visible = avatars.slice(0, max)
  const remaining = avatars.length - max

  return (
<div className={cn('flex items-center', className)}>
  {visible.map((avatar, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, x: -10, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        delay: i * 0.08,
        duration: 0.4,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
      className="relative group"
      style={{
        marginLeft: i === 0 ? 0 : -(size * 0.28),
        zIndex: visible.length - i,
      }}
    >
      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-void border border-border px-2 py-0.5 text-xs text-chalk shadow-md opacity-0 transition-opacity group-hover:opacity-100">
        {avatar.name}
      </span>

      <motion.div
        whileHover={{ scale: 1.15, y: -4, zIndex: 50 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="cursor-pointer"
      >
        {avatar.src ? (
          <img
            src={avatar.src}
            alt={avatar.name}
            className="rounded-full border-2 border-obsidian object-cover ring-2 ring-border transition-all group-hover:ring-ignite/40"
            style={{ width: size, height: size }}
          />
        ) : (
          <div
            className="flex items-center justify-center rounded-full border-2 border-obsidian bg-ignite/10 font-pixel text-sm font-semibold text-ignite ring-2 ring-border transition-all group-hover:ring-ignite/40"
            style={{ width: size, height: size }}
          >
            {avatar.name.charAt(0).toUpperCase()}
          </div>
        )}
      </motion.div>
    </motion.div>
  ))}

  {/* +N overflow */}
  {remaining > 0 && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: visible.length * 0.08, duration: 0.4 }}
      className="flex items-center justify-center rounded-full border-2 border-obsidian bg-obsidian font-pixel text-xs font-semibold text-blush ring-2 ring-border"
      style={{
        width: size,
        height: size,
        marginLeft: -(size * 0.28),
      }}
    >
      +{remaining}
    </motion.div>
  )}
</div>
  )
}

export default MaskedAvatars`,
usage: `import MaskedAvatars from "@/app/components/ui/masked-avatars"

export function Demo() {
  return (
<MaskedAvatars
  avatars={[
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
    { name: "Diana" },
    { name: "Eve" },
  ]}
  max={4}
  size={44}
/>
  )
}`,
props: [
  {
    name: "avatars",
    type: "Avatar[]",
    default: "—",
    description:
      "Array of avatars with name and optional src (image URL). Falls back to initial letter if no src.",
  },
  {
    name: "max",
    type: "number",
    default: "5",
    description:
      "Maximum number of avatars to show before the +N overflow indicator.",
  },
  {
    name: "size",
    type: "number",
    default: "44",
    description: "Size of each avatar in pixels.",
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
    { name: "max", label: "Max Visible", type: "number", default: 5, min: 1, max: 10, step: 1 },
    { name: "size", label: "Avatar Size (px)", type: "number", default: 44, min: 24, max: 72, step: 4 },
  ],
  defaults: {
    avatars: [
      { name: "Alice" },
      { name: "Bob" },
      { name: "Charlie" },
      { name: "Diana" },
      { name: "Eve" },
      { name: "Frank" },
      { name: "Grace" },
    ],
  },
},
component: () => import("@/app/components/ui/masked-avatars"),
demo: () => import("@/app/components/demos/masked-avatars-demo"),
};

export default entry;
