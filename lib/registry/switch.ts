import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "switch",
title: "Switch",
description:
  "An accessible animated toggle switch with spring thumb animation, size variants, label support, and keyboard interaction.",
category: "buttons",
isNew: true,
dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"],
code: `'use client'

import React, { useId, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  label,
  size = 'md',
  disabled = false,
  className,
}) => {
  const id = useId()

  const handleToggle = useCallback(() => {
    if (disabled) return
    onChange?.(!checked)
  }, [disabled, checked, onChange])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleToggle()
      }
    },
    [handleToggle]
  )

  // Size variants (container includes padding for thumb)
  const sizeClasses = {
    sm: {
      container: 'w-9 h-5',
      thumb: 'w-3 h-3',
      translateX: 16, // pixels
    },
    md: {
      container: 'w-11 h-6',
      thumb: 'w-4 h-4',
      translateX: 20,
    },
    lg: {
      container: 'w-14 h-8',
      thumb: 'w-6 h-6',
      translateX: 24,
    },
  }

  const sizes = sizeClasses[size]

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        id={id}
        role="switch"
        type="button"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-label={label || 'Toggle switch'}
        tabIndex={disabled ? -1 : 0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          'relative inline-flex items-center shrink-0 rounded-full transition-colors p-1',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite/40',
          checked
            ? 'bg-ignite border-ignite'
            : 'bg-obsidian border-border hover:border-border-light',
          disabled && 'opacity-40 cursor-not-allowed',
          !disabled && 'cursor-pointer',
          sizes.container,
          'border'
        )}
      >
        <motion.span
          className={cn(
            'block rounded-full shadow-md',
            checked ? 'bg-chalk' : 'bg-text-faint',
            sizes.thumb
          )}
          initial={false}
          animate={{
            x: checked ? sizes.translateX : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            mass: 0.8,
          }}
        />
      </button>

      {label && (
        <label
          htmlFor={id}
          className={cn(
            'text-sm text-chalk select-none',
            disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
          )}
          onClick={handleToggle}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default Switch`,
usage: `import Switch from "@/app/components/ui/switch"

export function Demo() {
  const [enabled, setEnabled] = React.useState(false)

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      label="Enable notifications"
      size="md"
    />
  )
}`,
props: [
  {
    name: "checked",
    type: "boolean",
    default: "false",
    description: "Whether the switch is checked.",
  },
  {
    name: "onChange",
    type: "(checked: boolean) => void",
    default: "undefined",
    description: "Callback when the switch is toggled.",
  },
  {
    name: "label",
    type: "string",
    default: "undefined",
    description: "Label text displayed next to the switch.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "Size variant of the switch.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the switch.",
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
    { name: "checked", label: "Checked", type: "boolean", default: false },
    { name: "label", label: "Label", type: "text", default: "Enable feature" },
    { name: "size", label: "Size", type: "select", options: ["sm", "md", "lg"], default: "md" },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
},
component: () => import("@/app/components/ui/switch"),
demo: () => import("@/app/components/demos/switch-demo"),
};

export default entry;
