import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "badge",
title: "Badge",
description:
  "Animated badge with multiple variants (default, success, warning, error, info), three sizes, optional icon, removable with AnimatePresence, and framer-motion entrance animation.",
category: "buttons",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'
type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  animated?: boolean
  removable?: boolean
  onRemove?: () => void
  icon?: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'border-border bg-obsidian text-blush',
  success: 'border-green-500/30 bg-green-500/10 text-green-400',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  error: 'border-red-500/30 bg-red-500/10 text-red-400',
  info: 'border-ignite/30 bg-ignite/10 text-ignite',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[10px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
  lg: 'px-3 py-1.5 text-sm gap-2',
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  animated = true,
  removable = false,
  onRemove,
  icon,
  className,
}) => {
  const Component = animated ? motion.span : 'span'
  const animationProps = animated
    ? {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration: 0.2 },
      }
    : {}

  return (
    <Component
      className={cn(
        'inline-flex items-center rounded-full border font-medium leading-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...animationProps}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-0.5 shrink-0 rounded-full p-0.5 transition-colors hover:bg-chalk/10"
          aria-label="Remove"
        >
          <svg className="h-2.5 w-2.5" viewBox="0 0 10 10" fill="none">
            <path d="M2.5 2.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </Component>
  )
}

export default Badge`,
usage: `import Badge from "@/app/components/ui/badge"
import { Check } from "lucide-react"

export function Demo() {
  return (
    <div className="flex gap-2">
      <Badge variant="success" icon={<Check className="h-3 w-3" />}>
        Approved
      </Badge>
      <Badge variant="error" removable onRemove={() => alert("Removed!")}>
        Failed
      </Badge>
    </div>
  )
}`,
props: [
  {
    name: "children",
    type: "React.ReactNode",
    default: "—",
    description: "Badge content.",
  },
  {
    name: "variant",
    type: "'default' | 'success' | 'warning' | 'error' | 'info'",
    default: "'default'",
    description: "Color variant of the badge.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "Badge size.",
  },
  {
    name: "animated",
    type: "boolean",
    default: "true",
    description: "Enable entrance/exit animation.",
  },
  {
    name: "removable",
    type: "boolean",
    default: "false",
    description: "Show a remove (X) button.",
  },
  {
    name: "onRemove",
    type: "() => void",
    default: "undefined",
    description: "Callback when remove button is clicked.",
  },
  {
    name: "icon",
    type: "React.ReactNode",
    default: "undefined",
    description: "Optional icon displayed before the label.",
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
    { name: "variant", label: "Variant", type: "select", default: "info", options: ["default", "success", "warning", "error", "info"] },
    { name: "size", label: "Size", type: "select", default: "md", options: ["sm", "md", "lg"] },
    { name: "animated", label: "Animated", type: "boolean", default: true },
    { name: "removable", label: "Removable", type: "boolean", default: false },
    { name: "children", label: "Label", type: "text", default: "Badge" },
  ],
},
component: () => import("@/app/components/ui/badge"),
demo: () => import("@/app/components/demos/badge-demo"),
};

export default entry;
