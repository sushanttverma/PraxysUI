import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "otp-input",
title: "OTP Input",
description:
  "An accessible OTP/PIN input component with auto-focus, paste support, keyboard navigation, and animated focus states.",
category: "buttons",
dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"],
code: `'use client'

import React, { useState, useRef, useCallback, useId, ClipboardEvent, KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface OtpInputProps {
  length?: 4 | 5 | 6
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value: controlledValue,
  onChange,
  disabled = false,
  className,
}) => {
  const id = useId()
  const [internalValue, setInternalValue] = useState('')
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Support both controlled and uncontrolled usage
  const isControlled = controlledValue !== undefined && onChange !== undefined
  const value = isControlled ? controlledValue : internalValue

  // Ensure value is padded to length
  const digits = (value + ''.repeat(length)).slice(0, length).split('')

  const updateValue = useCallback(
    (newValue: string) => {
      const sanitized = newValue.replace(/\\D/g, '').slice(0, length)
      if (!isControlled) {
        setInternalValue(sanitized)
      }
      onChange?.(sanitized)
    },
    [isControlled, onChange, length]
  )

  const handleInputChange = useCallback(
    (index: number, inputValue: string) => {
      // Only take the last character if multiple were typed
      const digit = inputValue.replace(/\\D/g, '').slice(-1)
      
      if (digit) {
        const newDigits = [...digits]
        newDigits[index] = digit
        const newValue = newDigits.join('').slice(0, length)
        updateValue(newValue)

        // Auto-focus next box
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus()
        }
      }
    },
    [digits, length, updateValue]
  )

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      // Handle backspace
      if (e.key === 'Backspace') {
        e.preventDefault()
        const newDigits = [...digits]
        
        if (newDigits[index]) {
          // Clear current box
          newDigits[index] = ''
          updateValue(newDigits.join('').trim())
        } else if (index > 0) {
          // Move to previous box and clear it
          newDigits[index - 1] = ''
          updateValue(newDigits.join('').trim())
          inputRefs.current[index - 1]?.focus()
        }
      }
      // Handle left arrow
      else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault()
        inputRefs.current[index - 1]?.focus()
      }
      // Handle right arrow
      else if (e.key === 'ArrowRight' && index < length - 1) {
        e.preventDefault()
        inputRefs.current[index + 1]?.focus()
      }
    },
    [digits, length, updateValue]
  )

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData('text/plain')
      const sanitized = pastedData.replace(/\\D/g, '').slice(0, length)
      
      if (sanitized) {
        updateValue(sanitized)
        // Focus the last filled box or the last box
        const focusIndex = Math.min(sanitized.length, length - 1)
        inputRefs.current[focusIndex]?.focus()
      }
    },
    [length, updateValue]
  )

  const handleFocus = useCallback((index: number) => {
    setFocusedIndex(index)
    // Select the content for easier replacement
    inputRefs.current[index]?.select()
  }, [])

  const handleBlur = useCallback(() => {
    setFocusedIndex(null)
  }, [])

  return (
    <div className={cn('flex gap-2 justify-center', className)}>
      {Array.from({ length }, (_, index) => {
        const isFocused = focusedIndex === index
        const hasValue = !!digits[index]

        return (
          <div key={\`\${id}-\${index}\`} className="relative">
            {/* Animated border / focus ring */}
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              initial={false}
              animate={{
                boxShadow: isFocused
                  ? '0 0 0 2px rgba(232,78,45,0.6), 0 0 0 4px rgba(232,78,45,0.1)'
                  : hasValue
                    ? '0 0 0 1px rgba(232,78,45,0.4)'
                    : '0 0 0 1px rgba(255,255,255,0.08)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />

            {/* Input box */}
            <input
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digits[index] || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              disabled={disabled}
              className={cn(
                'relative z-[1] w-12 h-14 bg-obsidian rounded-lg text-center text-xl font-semibold text-chalk outline-none transition-colors',
                disabled && 'opacity-40 cursor-not-allowed',
                !disabled && 'cursor-text'
              )}
              aria-label={\`Digit \${index + 1} of \${length}\`}
            />
          </div>
        )
      })}
    </div>
  )
}

export default OtpInput`,
usage: `import OtpInput from "@/app/components/ui/otp-input"

export function Demo() {
  const [otp, setOtp] = React.useState("")

  return (
    <OtpInput
      length={6}
      value={otp}
      onChange={setOtp}
    />
  )
}`,
props: [
  {
    name: "length",
    type: "4 | 5 | 6",
    default: "6",
    description: "Number of OTP digits.",
  },
  {
    name: "value",
    type: "string",
    default: "''",
    description: "Current OTP value.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    default: "undefined",
    description: "Callback when the OTP value changes.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the OTP input.",
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
    { name: "length", label: "Length", type: "select", options: ["4", "5", "6"], default: "6" },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
},
component: () => import("@/app/components/ui/otp-input"),
demo: () => import("@/app/components/demos/otp-input-demo"),
};

export default entry;
