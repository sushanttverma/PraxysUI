import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "animated-toggle",
title: "Animated Toggle",
description:
  "A switch toggle with spring-animated knob, multiple sizes, ARIA role='switch', keyboard support, and disabled state.",
category: "buttons",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useCallback, useId } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedToggleProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

const sizeConfig = {
  sm: { track: 'h-5 w-9', knob: 'h-3.5 w-3.5', translate: 16, padding: 3 },
  md: { track: 'h-6 w-11', knob: 'h-4.5 w-4.5', translate: 20, padding: 3 },
  lg: { track: 'h-8 w-14', knob: 'h-6 w-6', translate: 24, padding: 4 },
}

const AnimatedToggle: React.FC<AnimatedToggleProps> = ({
  checked = false,
  onChange,
  label,
  size = 'md',
  disabled = false,
  className,
}) => {
  const id = useId()
  const config = sizeConfig[size]

  const handleToggle = useCallback(() => {
if (!disabled) {
  onChange?.(!checked)
}
  }, [checked, onChange, disabled])

  const handleKeyDown = useCallback(
(e: React.KeyboardEvent) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault()
    handleToggle()
  }
},
[handleToggle]
  )

  return (
<div
  className={cn(
    'inline-flex items-center gap-3',
    disabled && 'opacity-40 pointer-events-none',
    className
  )}
>
  <button
    id={id}
    role="switch"
    type="button"
    aria-checked={checked}
    aria-label={label ?? 'Toggle'}
    disabled={disabled}
    onClick={handleToggle}
    onKeyDown={handleKeyDown}
    className={cn(
      'relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite focus-visible:ring-offset-2 focus-visible:ring-offset-void',
      checked
        ? 'border-ignite bg-ignite'
        : 'border-border bg-obsidian',
      config.track
    )}
  >
    <motion.span
      className={cn(
        'block rounded-full shadow-sm',
        checked ? 'bg-chalk' : 'bg-blush',
        config.knob
      )}
      initial={false}
      animate={{
        x: checked ? config.translate : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
      style={{
        marginLeft: config.padding,
      }}
    />
  </button>

  {label && (
    <label
      htmlFor={id}
      className={cn(
        'cursor-pointer select-none text-sm font-medium',
        checked ? 'text-chalk' : 'text-blush'
      )}
    >
      {label}
    </label>
  )}
</div>
  )
}

export default AnimatedToggle`,
usage: `import AnimatedToggle from "@/app/components/ui/animated-toggle"

export function Demo() {
  const [enabled, setEnabled] = useState(false)

  return (
<AnimatedToggle
  checked={enabled}
  onChange={setEnabled}
  label="Dark Mode"
/>
  )
}`,
props: [
  {
    name: "checked",
    type: "boolean",
    default: "false",
    description: "Whether the toggle is on.",
  },
  {
    name: "onChange",
    type: "(checked: boolean) => void",
    default: "undefined",
    description: "Callback fired when the toggle state changes.",
  },
  {
    name: "label",
    type: "string",
    default: "undefined",
    description: "Optional text label displayed next to the toggle.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "Toggle size variant.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable interaction.",
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
    { name: "label", label: "Label", type: "text", default: "Dark Mode" },
    { name: "size", label: "Size", type: "select", default: "md", options: ["sm", "md", "lg"] },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
},
component: () => import("@/app/components/ui/animated-toggle"),
demo: () => import("@/app/components/demos/animated-toggle-demo"),
};

export default entry;
