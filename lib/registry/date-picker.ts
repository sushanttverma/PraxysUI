import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "date-picker",
title: "Date Picker",
description:
  "A fully-featured date picker with calendar view, keyboard navigation, month/year selectors, and optional range selection mode. Includes animated popover and accessible controls.",
category: "buttons",
dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"],
code: `'use client'

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import AnimatedInput from '@/app/components/ui/animated-input'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

interface DatePickerProps {
  value?: Date | null
  onChange?: (date: Date | null) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  disabledDates?: (date: Date) => boolean
  mode?: 'single' | 'range'
  className?: string
}

interface DateRange {
  start: Date | null
  end: Date | null
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// Date utility functions
const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

const isToday = (date: Date): boolean => {
  const today = new Date()
  return isSameDay(date, today)
}

const formatDate = (date: Date | null): string => {
  if (!date) return ''
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return \`\${month}/\${day}/\${year}\`
}

const formatDateRange = (range: DateRange): string => {
  if (!range.start) return ''
  if (!range.end) return formatDate(range.start)
  return \`\${formatDate(range.start)} - \${formatDate(range.end)}\`
}

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay()
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  label,
  disabled = false,
  disabledDates,
  mode = 'single',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedDate, setFocusedDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [rangeSelection, setRangeSelection] = useState<DateRange>({
    start: null,
    end: null,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen)

  // Initialize focused date when opening (derived state pattern)
  if (isOpen && !prevIsOpen && !focusedDate) {
    const initialDate = value || new Date()
    setFocusedDate(initialDate)
    setCurrentMonth(initialDate.getMonth())
    setCurrentYear(initialDate.getFullYear())
  }
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen)
  }

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleDateSelect = useCallback(
    (date: Date) => {
      if (disabledDates && disabledDates(date)) return

      if (mode === 'range') {
        if (!rangeSelection.start || rangeSelection.end) {
          // Start new range
          setRangeSelection({ start: date, end: null })
        } else {
          // Complete range
          const start = rangeSelection.start
          const end = date
          if (end < start) {
            setRangeSelection({ start: end, end: start })
          } else {
            setRangeSelection({ start, end })
          }
          setIsOpen(false)
        }
      } else {
        onChange?.(date)
        setIsOpen(false)
      }
    },
    [disabledDates, mode, rangeSelection, onChange]
  )

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen || !focusedDate) return

      let newFocusedDate: Date | null = null

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          newFocusedDate = new Date(focusedDate)
          newFocusedDate.setDate(focusedDate.getDate() - 1)
          break
        case 'ArrowRight':
          event.preventDefault()
          newFocusedDate = new Date(focusedDate)
          newFocusedDate.setDate(focusedDate.getDate() + 1)
          break
        case 'ArrowUp':
          event.preventDefault()
          newFocusedDate = new Date(focusedDate)
          newFocusedDate.setDate(focusedDate.getDate() - 7)
          break
        case 'ArrowDown':
          event.preventDefault()
          newFocusedDate = new Date(focusedDate)
          newFocusedDate.setDate(focusedDate.getDate() + 7)
          break
        case 'Enter':
          event.preventDefault()
          handleDateSelect(focusedDate)
          return
        default:
          return
      }

      if (newFocusedDate) {
        setFocusedDate(newFocusedDate)
        setCurrentMonth(newFocusedDate.getMonth())
        setCurrentYear(newFocusedDate.getFullYear())
      }
    },
    [isOpen, focusedDate, handleDateSelect]
  )

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(parseInt(e.target.value))
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(parseInt(e.target.value))
  }

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    const days: (Date | null)[] = []

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentYear, currentMonth, day))
    }

    return days
  }, [currentMonth, currentYear])

  // Generate year options (current year ± 100 years)
  const yearOptions = useMemo(() => {
    const currentYearValue = new Date().getFullYear()
    const years: number[] = []
    for (let i = currentYearValue - 100; i <= currentYearValue + 100; i++) {
      years.push(i)
    }
    return years
  }, [])

  const displayValue = useMemo(() => {
    if (mode === 'range') {
      return formatDateRange(rangeSelection)
    }
    return formatDate(value || null)
  }, [mode, value, rangeSelection])

  const isDateInRange = (date: Date): boolean => {
    if (mode !== 'range' || !rangeSelection.start) return false
    if (!rangeSelection.end) return isSameDay(date, rangeSelection.start)
    
    const start = rangeSelection.start
    const end = rangeSelection.end
    return date >= start && date <= end
  }

  const isDateRangeEdge = (date: Date): boolean => {
    if (mode !== 'range') return false
    return (
      isSameDay(date, rangeSelection.start) || isSameDay(date, rangeSelection.end)
    )
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div onClick={() => !disabled && setIsOpen(true)}>
        <AnimatedInput
          label={label}
          placeholder={placeholder}
          value={displayValue}
          disabled={disabled}
          rightIcon={<Calendar className="h-4 w-4" />}
          onChange={() => {}} // Read-only, controlled by date picker
          type="text"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={calendarRef}
            role="dialog"
            aria-label="Choose date"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            className="absolute z-50 mt-2 w-full min-w-[320px] rounded-lg bg-obsidian border border-border shadow-2xl"
          >
            {/* Month/Year Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 rounded-md hover:bg-chalk/5 text-text-faint hover:text-chalk transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                <select
                  value={currentMonth}
                  onChange={handleMonthChange}
                  className="px-2 py-1 rounded-md bg-void border border-border text-chalk text-sm focus:outline-none focus:ring-1 focus:ring-ignite"
                  aria-label="Select month"
                >
                  {MONTHS.map((month, idx) => (
                    <option key={month} value={idx}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  value={currentYear}
                  onChange={handleYearChange}
                  className="px-2 py-1 rounded-md bg-void border border-border text-chalk text-sm focus:outline-none focus:ring-1 focus:ring-ignite"
                  aria-label="Select year"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded-md hover:bg-chalk/5 text-text-faint hover:text-chalk transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS_OF_WEEK.map((day) => (
                  <div
                    key={day}
                    className="h-8 flex items-center justify-center text-xs font-medium text-text-faint"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, idx) => {
                  if (!date) {
                    return <div key={\`empty-\${idx}\`} className="h-8" />
                  }

                  const isSelected =
                    mode === 'single'
                      ? isSameDay(date, value || null)
                      : isDateRangeEdge(date)
                  const isTodayDate = isToday(date)
                  const isDisabled = disabledDates && disabledDates(date)
                  const isFocused = isSameDay(date, focusedDate)
                  const inRange = isDateInRange(date)

                  return (
                    <motion.button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => handleDateSelect(date)}
                      disabled={isDisabled}
                      onMouseEnter={() => setFocusedDate(date)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                        delay: idx * 0.005,
                      }}
                      className={cn(
                        'relative h-8 rounded-md text-sm font-medium transition-all',
                        'focus:outline-none focus:ring-2 focus:ring-ignite focus:ring-offset-2 focus:ring-offset-obsidian',
                        isDisabled &&
                          'text-text-faint/30 cursor-not-allowed hover:bg-transparent',
                        !isDisabled && 'hover:bg-chalk/5 cursor-pointer',
                        isSelected && 'bg-ignite text-void font-semibold',
                        !isSelected && inRange && 'bg-ignite/20 text-chalk',
                        !isSelected && !inRange && 'text-chalk',
                        isFocused &&
                          !isSelected &&
                          'ring-2 ring-ignite/50 ring-offset-2 ring-offset-obsidian'
                      )}
                      aria-label={date.toLocaleDateString()}
                      aria-selected={isSelected}
                    >
                      {date.getDate()}
                      {isTodayDate && !isSelected && (
                        <motion.div
                          className="absolute inset-0 rounded-md border-2 border-ignite/40 pointer-events-none"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Footer for range mode */}
            {mode === 'range' && (
              <div className="px-4 pb-4 pt-2 border-t border-border">
                <div className="flex items-center justify-between text-xs text-text-faint">
                  <span>
                    {rangeSelection.start && !rangeSelection.end
                      ? 'Select end date'
                      : 'Select start date'}
                  </span>
                  {rangeSelection.start && rangeSelection.end && (
                    <button
                      type="button"
                      onClick={() => {
                        onChange?.(rangeSelection.start)
                        setIsOpen(false)
                      }}
                      className="px-3 py-1.5 rounded-md bg-ignite text-void text-xs font-medium hover:bg-ignite/90 transition-colors"
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DatePicker`,
usage: `import DatePicker from "@/app/components/ui/date-picker"
import { useState } from "react"

export function Demo() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker
      label="Select Date"
      placeholder="Choose a date"
      value={date}
      onChange={setDate}
    />
  )
}`,
props: [
  {
    name: "value",
    type: "Date | null",
    default: "undefined",
    description: "The selected date value.",
  },
  {
    name: "onChange",
    type: "(date: Date | null) => void",
    default: "undefined",
    description: "Callback fired when the date is selected.",
  },
  {
    name: "placeholder",
    type: "string",
    default: "'Select date'",
    description: "Placeholder text for the input.",
  },
  {
    name: "label",
    type: "string",
    default: "undefined",
    description: "Label text displayed above the input.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the date picker.",
  },
  {
    name: "disabledDates",
    type: "(date: Date) => boolean",
    default: "undefined",
    description: "Function to determine if a date should be disabled.",
  },
  {
    name: "mode",
    type: "'single' | 'range'",
    default: "'single'",
    description: "Selection mode: single date or date range.",
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
    { name: "label", label: "Label", type: "text", default: "Select Date" },
    { name: "placeholder", label: "Placeholder", type: "text", default: "Choose a date" },
    { name: "mode", label: "Mode", type: "select", default: "single", options: ["single", "range"] },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
},
component: () => import("@/app/components/ui/date-picker"),
demo: () => import("@/app/components/demos/date-picker-demo"),
};

export default entry;
