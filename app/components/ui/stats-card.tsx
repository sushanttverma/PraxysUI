'use client'

import React, { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  useTransform,
} from 'framer-motion'
import { cn } from '@/lib/utils'

interface Trend {
  value: number
  direction: 'up' | 'down'
}

interface StatsCardProps {
  value: number
  label?: string
  trend?: Trend
  icon?: React.ReactNode
  prefix?: string
  suffix?: string
  className?: string
}

/* ---------- Animated counter sub-component ---------- */

const AnimatedNumber: React.FC<{
  value: number
  prefix?: string
  suffix?: string
}> = ({ value, prefix, suffix }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.01,
  })
  const display = useTransform(spring, (latest) =>
    Math.round(latest).toLocaleString()
  )
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  return (
    <span ref={ref} className="inline-flex items-baseline gap-0.5">
      {prefix && (
        <span className="text-text-faint text-lg font-medium">{prefix}</span>
      )}
      <motion.span className="tabular-nums">{display}</motion.span>
      {suffix && (
        <span className="text-text-faint text-lg font-medium">{suffix}</span>
      )}
    </span>
  )
}

/* ---------- Trend arrow SVGs ---------- */

const TrendUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 12L8 4l4 8" />
  </svg>
)

const TrendDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 4L8 12l4-8" />
  </svg>
)

/* ---------- Card entrance variants ---------- */

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 400, damping: 30 },
  },
}

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 500, damping: 25, delay: 0.1 },
  },
}

const trendVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 400, damping: 28, delay: 0.25 },
  },
}

/* ---------- Main component ---------- */

const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  trend,
  icon,
  prefix,
  suffix,
  className,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      role="figure"
      aria-label={
        label
          ? `${label}: ${prefix ?? ''}${value.toLocaleString()}${suffix ?? ''}`
          : undefined
      }
      className={cn(
        'relative overflow-hidden rounded-xl border border-border bg-obsidian p-5 transition-colors',
        'hover:border-border-light',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ignite/40',
        className
      )}
    >
      {/* Subtle gradient glow at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ignite/20 to-transparent" />

      <div className="flex items-start justify-between gap-3">
        {/* Text content */}
        <div className="min-w-0 flex-1">
          {label && (
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-text-faint">
              {label}
            </p>
          )}
          <p className="text-3xl font-bold text-chalk leading-tight">
            <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
          </p>

          {/* Trend indicator */}
          {trend && (
            <motion.div
              variants={trendVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn(
                'mt-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                trend.direction === 'up'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-red-500/10 text-red-400'
              )}
              aria-label={`Trend: ${trend.direction === 'up' ? 'up' : 'down'} ${trend.value}%`}
            >
              {trend.direction === 'up' ? (
                <TrendUpIcon className="h-3 w-3" />
              ) : (
                <TrendDownIcon className="h-3 w-3" />
              )}
              <span>{trend.value}%</span>
            </motion.div>
          )}
        </div>

        {/* Icon */}
        {icon && (
          <motion.div
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ignite/10 border border-ignite/20 text-ignite"
          >
            <span className="flex h-5 w-5 items-center justify-center">
              {icon}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default StatsCard
