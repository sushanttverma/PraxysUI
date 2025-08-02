'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RatingProps {
  value?: number
  onChange?: (value: number) => void
  max?: number
  allowHalf?: boolean
  readOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  className?: string
}

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const sizeConfig = {
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-9 h-9',
}

const Rating: React.FC<RatingProps> = ({
  value: controlledValue,
  onChange,
  max = 5,
  allowHalf = false,
  readOnly = false,
  size = 'md',
  icon,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(0)
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  // Support both controlled and uncontrolled usage
  const isControlled = controlledValue !== undefined && onChange !== undefined
  const value = isControlled ? controlledValue : internalValue

  const displayValue = hoverValue !== null ? hoverValue : value

  const updateValue = useCallback(
    (newValue: number) => {
      if (readOnly) return
      
      const clampedValue = Math.max(0, Math.min(max, newValue))
      
      if (!isControlled) {
        setInternalValue(clampedValue)
      }
      onChange?.(clampedValue)
    },
    [isControlled, onChange, max, readOnly]
  )

  const handleClick = useCallback(
    (starIndex: number, isHalf: boolean) => {
      if (readOnly) return
      const newValue = starIndex + (isHalf && allowHalf ? 0.5 : 1)
      updateValue(newValue)
    },
    [allowHalf, readOnly, updateValue]
  )

  const handleMouseMove = useCallback(
    (starIndex: number, e: React.MouseEvent<HTMLDivElement>) => {
      if (readOnly) return
      
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const isHalf = allowHalf && x < rect.width / 2
      
      setHoverValue(starIndex + (isHalf ? 0.5 : 1))
    },
    [allowHalf, readOnly]
  )

  const handleMouseLeave = useCallback(() => {
    if (readOnly) return
    setHoverValue(null)
  }, [readOnly])

  const stars = useMemo(() => Array.from({ length: max }, (_, i) => i), [max])

  return (
    <div
      className={cn('flex gap-1', className)}
      onMouseLeave={handleMouseLeave}
      role="radiogroup"
      aria-label={`Rating: ${value} out of ${max}`}
    >
      {stars.map((starIndex) => {
        const fillAmount = Math.max(0, Math.min(1, displayValue - starIndex))
        const isFilled = fillAmount > 0
        const isHalfFilled = fillAmount > 0 && fillAmount < 1

        return (
          <div
            key={starIndex}
            className={cn(
              'relative cursor-pointer transition-transform',
              !readOnly && 'hover:scale-110',
              readOnly && 'cursor-default'
            )}
            onClick={() => handleClick(starIndex, false)}
            onMouseMove={(e) => handleMouseMove(starIndex, e)}
            role="radio"
            aria-checked={starIndex < value}
            aria-label={`${starIndex + 1} star${starIndex !== 0 ? 's' : ''}`}
          >
            {/* Background star (empty) */}
            <div className={cn('text-border-light', sizeConfig[size])}>
              {icon || <StarIcon className="w-full h-full" />}
            </div>

            {/* Filled star overlay */}
            <AnimatePresence>
              {isFilled && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className={cn(
                    'absolute inset-0 overflow-hidden text-ignite',
                    sizeConfig[size]
                  )}
                  style={{
                    clipPath: isHalfFilled
                      ? 'inset(0 50% 0 0)'
                      : 'inset(0 0 0 0)',
                  }}
                >
                  {icon || <StarIcon className="w-full h-full" />}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Half-star click target */}
            {allowHalf && !readOnly && (
              <div
                className="absolute inset-0 w-1/2"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClick(starIndex, true)
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Rating
