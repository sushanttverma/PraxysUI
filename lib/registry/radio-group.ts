import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "radio-group",
title: "Radio Group",
description:
  "An accessible animated radio group with spring selection animation, horizontal/vertical layout, keyboard navigation, and per-option disable.",
category: "buttons",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useId, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  className?: string
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  direction = 'vertical',
  disabled = false,
  className,
}) => {
  const groupId = useId()

  const handleSelect = useCallback(
    (optionValue: string, optionDisabled?: boolean) => {
      if (disabled || optionDisabled) return
      onChange?.(optionValue)
    },
    [disabled, onChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const enabledOptions = options
        .map((opt, i) => ({ ...opt, index: i }))
        .filter((opt) => !opt.disabled && !disabled)

      if (enabledOptions.length === 0) return

      const currentEnabledIdx = enabledOptions.findIndex(
        (opt) => opt.index === index
      )
      let nextOption: (typeof enabledOptions)[number] | undefined

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight': {
          e.preventDefault()
          const nextIdx = (currentEnabledIdx + 1) % enabledOptions.length
          nextOption = enabledOptions[nextIdx]
          break
        }
        case 'ArrowUp':
        case 'ArrowLeft': {
          e.preventDefault()
          const prevIdx =
            (currentEnabledIdx - 1 + enabledOptions.length) %
            enabledOptions.length
          nextOption = enabledOptions[prevIdx]
          break
        }
        case ' ':
        case 'Enter': {
          e.preventDefault()
          const opt = options[index]
          if (opt && !opt.disabled) {
            handleSelect(opt.value, opt.disabled)
          }
          return
        }
        default:
          return
      }

      if (nextOption) {
        handleSelect(nextOption.value, nextOption.disabled)
        // Move focus to the next radio element
        const container = (e.target as HTMLElement).closest(
          '[role="radiogroup"]'
        )
        if (container) {
          const radios = container.querySelectorAll<HTMLElement>('[role="radio"]')
          radios[nextOption.index]?.focus()
        }
      }
    },
    [options, disabled, handleSelect]
  )

  return (
    <div
      role="radiogroup"
      aria-disabled={disabled}
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col gap-3' : 'flex-row flex-wrap gap-4',
        disabled && 'opacity-40 pointer-events-none',
        className
      )}
    >
      {options.map((option, index) => {
        const isSelected = option.value === value
        const isDisabled = disabled || !!option.disabled
        const optionId = \`\${groupId}-\${option.value}\`

        return (
          <div
            key={option.value}
            className={cn(
              'flex items-center gap-3 select-none',
              isDisabled
                ? 'opacity-40 pointer-events-none'
                : 'cursor-pointer'
            )}
            onClick={() => handleSelect(option.value, option.disabled)}
          >
            {/* Custom radio circle */}
            <motion.div
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isDisabled}
              aria-labelledby={\`\${optionId}-label\`}
              tabIndex={
                isDisabled
                  ? -1
                  : isSelected || (!value && index === 0)
                    ? 0
                    : -1
              }
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                'relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite/40',
                isSelected
                  ? 'border-ignite bg-ignite/20'
                  : 'border-border bg-obsidian hover:border-border-light'
              )}
              initial={false}
              animate={{
                scale: isSelected ? [1, 1.12, 1] : 1,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <AnimatePresence>
                {isSelected && (
                  <motion.span
                    className="block h-2 w-2 rounded-full bg-ignite"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 25,
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Label */}
            <span
              id={\`\${optionId}-label\`}
              className="text-sm text-chalk leading-snug"
            >
              {option.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default RadioGroup`,
usage: `import RadioGroup from "@/app/components/ui/radio-group"

const options = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
]

export function Demo() {
  const [value, setValue] = React.useState("md")

  return (
    <RadioGroup
      options={options}
      value={value}
      onChange={setValue}
      direction="vertical"
    />
  )
}`,
props: [
  {
    name: "options",
    type: "RadioOption[]",
    default: "[]",
    description: "Array of { value, label, disabled? } objects.",
  },
  {
    name: "value",
    type: "string",
    default: "undefined",
    description: "Currently selected value.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    default: "undefined",
    description: "Callback when a radio option is selected.",
  },
  {
    name: "direction",
    type: "'horizontal' | 'vertical'",
    default: "'vertical'",
    description: "Layout direction of the radio group.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the entire radio group.",
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
    { name: "direction", label: "Direction", type: "select", default: "vertical", options: ["vertical", "horizontal"] },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
  defaults: {
    options: [
      { value: "sm", label: "Small" },
      { value: "md", label: "Medium" },
      { value: "lg", label: "Large" },
    ],
  },
},
component: () => import("@/app/components/ui/radio-group"),
demo: () => import("@/app/components/demos/radio-group-demo"),
};

export default entry;
