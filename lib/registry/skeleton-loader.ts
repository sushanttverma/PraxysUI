import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "skeleton-loader",
title: "Skeleton Loader",
description:
  "Animated placeholder loading states with shimmer effect, supporting text, avatar, card, and button variants.",
category: "visual",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkeletonLoaderProps {
  variant?: 'text' | 'avatar' | 'card' | 'button'
  width?: string | number
  height?: string | number
  count?: number
  animate?: boolean
  className?: string
}

const variantStyles = {
  text: 'rounded-md w-full h-4',
  avatar: 'rounded-full w-12 h-12',
  card: 'rounded-xl w-full h-[200px]',
  button: 'rounded-lg w-[120px] h-10',
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width,
  height,
  count = 1,
  animate = true,
  className = '',
}) => {
  const lines = variant === 'text' ? count : 1

  return (
<>
  {Array.from({ length: lines }).map((_, i) => {
    const isLastLine = variant === 'text' && lines > 1 && i === lines - 1
    return (
      <div
        key={i}
        className={cn('bg-border/20 overflow-hidden', variantStyles[variant], className)}
        style={{ width: isLastLine ? '75%' : width, height }}
      >
        {animate && (
          <motion.div
            className="h-full w-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(232,78,45,0.06), transparent)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>
    )
  })}
</>
  )
}

export default SkeletonLoader`,
usage: `import SkeletonLoader from "@/app/components/ui/skeleton-loader"

export function Demo() {
  return (
<div className="space-y-4">
  <SkeletonLoader variant="card" height={160} />
  <div className="flex items-center gap-3">
    <SkeletonLoader variant="avatar" />
    <div className="flex-1 space-y-2">
      <SkeletonLoader variant="text" />
      <SkeletonLoader variant="text" width="60%" />
    </div>
  </div>
</div>
  )
}`,
props: [
  {
    name: "variant",
    type: "'text' | 'avatar' | 'card' | 'button'",
    default: "'text'",
    description: "Shape variant of the skeleton.",
  },
  {
    name: "width",
    type: "string | number",
    default: "auto",
    description: "Custom width override.",
  },
  {
    name: "height",
    type: "string | number",
    default: "auto",
    description: "Custom height override.",
  },
  {
    name: "count",
    type: "number",
    default: "1",
    description: "Number of skeleton lines (text variant only).",
  },
  {
    name: "animate",
    type: "boolean",
    default: "true",
    description: "Whether the shimmer animation plays.",
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
    { name: "variant", label: "Variant", type: "select", default: "text", options: ["text", "avatar", "card", "button"] },
    { name: "count", label: "Count", type: "number", default: 1, min: 1, max: 6, step: 1 },
    { name: "animate", label: "Animate", type: "boolean", default: true },
  ],
},
component: () => import("@/app/components/ui/skeleton-loader"),
demo: () => import("@/app/components/demos/skeleton-loader-demo"),
};

export default entry;
