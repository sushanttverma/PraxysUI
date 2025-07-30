import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "timeline",
title: "Timeline",
description:
  "Alternating two-column timeline with scroll-triggered animations, connecting lines, active-state pulse rings, optional icons, and responsive single-column mobile layout.",
category: "cards",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TimelineItem {
  title: string
  description: string
  date?: string
  icon?: React.ReactNode
  active?: boolean
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 500, damping: 25 },
  },
}

const contentVariants = {
  hidden: (side: 'left' | 'right') => ({
    opacity: 0,
    x: side === 'left' ? 24 : -24,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  },
}

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { type: 'spring', stiffness: 200, damping: 30, delay: 0.1 },
  },
}

const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  return (
    <div
      className={cn('relative w-full', className)}
      role="list"
      aria-label="Timeline"
    >
      {items.map((item, index) => {
        const isCompleted = item.active === true
        const side: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right'

        return (
          <div
            key={index}
            role="listitem"
            className={cn(
              'relative grid gap-x-4 pb-12 last:pb-0',
              // Desktop: alternating two-column layout; mobile: single column
              'grid-cols-[1fr_40px_1fr]',
              'max-md:grid-cols-[40px_1fr]'
            )}
          >
            {/* ---- Left content (desktop only) ---- */}
            <div
              className={cn(
                'hidden md:flex',
                side === 'left' ? 'justify-end' : 'justify-start'
              )}
            >
              {side === 'left' ? (
                <motion.div
                  custom="left"
                  variants={contentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className="max-w-xs text-right"
                >
                  <TimelineContent item={item} isCompleted={isCompleted} align="right" />
                </motion.div>
              ) : (
                /* Date label on the opposite side when content is on the right */
                <motion.div
                  custom="left"
                  variants={contentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className="flex items-start justify-end pt-0.5"
                >
                  {item.date && (
                    <span className="text-xs text-text-faint font-medium">
                      {item.date}
                    </span>
                  )}
                </motion.div>
              )}
            </div>

            {/* ---- Center column: dot + connecting line ---- */}
            <div className="relative flex flex-col items-center">
              {/* Connecting line (not shown for last item) */}
              {index < items.length - 1 && (
                <motion.div
                  className={cn(
                    'absolute top-10 bottom-0 w-px',
                    isCompleted
                      ? 'bg-gradient-to-b from-ignite/60 to-ignite/10'
                      : 'bg-gradient-to-b from-border-light/60 to-border-light/10'
                  )}
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  style={{ originY: 0 }}
                />
              )}

              {/* Dot / Icon */}
              <motion.div
                variants={dotVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className={cn(
                  'relative z-10 flex items-center justify-center rounded-full shrink-0',
                  item.icon ? 'h-10 w-10' : 'h-4 w-4 mt-1.5',
                  isCompleted
                    ? item.icon
                      ? 'bg-ignite/20 border border-ignite/40 text-ignite'
                      : 'bg-ignite border border-ignite/60'
                    : item.icon
                      ? 'bg-obsidian border border-border-light text-text-faint'
                      : 'bg-border-light border border-border'
                )}
              >
                {item.icon && (
                  <span className="flex items-center justify-center h-5 w-5">
                    {item.icon}
                  </span>
                )}

                {/* Pulse ring for active items */}
                {isCompleted && !item.icon && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-ignite/30"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                )}
              </motion.div>
            </div>

            {/* ---- Right content (desktop) / Main content (mobile) ---- */}
            <div
              className={cn(
                'hidden md:flex',
                side === 'right' ? 'justify-start' : 'justify-end'
              )}
            >
              {side === 'right' ? (
                <motion.div
                  custom="right"
                  variants={contentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className="max-w-xs"
                >
                  <TimelineContent item={item} isCompleted={isCompleted} align="left" />
                </motion.div>
              ) : (
                /* Date label on the opposite side when content is on the left */
                <motion.div
                  custom="right"
                  variants={contentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className="flex items-start pt-0.5"
                >
                  {item.date && (
                    <span className="text-xs text-text-faint font-medium">
                      {item.date}
                    </span>
                  )}
                </motion.div>
              )}
            </div>

            {/* ---- Mobile content (always on the right of the dot) ---- */}
            <motion.div
              custom="right"
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="md:hidden"
            >
              <TimelineContent item={item} isCompleted={isCompleted} align="left" showDate />
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Sub-component for the content card ---------- */

interface TimelineContentProps {
  item: TimelineItem
  isCompleted: boolean
  align: 'left' | 'right'
  showDate?: boolean
}

const TimelineContent: React.FC<TimelineContentProps> = ({
  item,
  isCompleted,
  align,
  showDate = false,
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border bg-obsidian p-4 transition-colors',
        isCompleted
          ? 'border-ignite/30 shadow-[0_0_12px_rgba(232,78,45,0.06)]'
          : 'border-border hover:border-border-light',
        align === 'right' && 'text-right'
      )}
    >
      {showDate && item.date && (
        <span className="mb-1.5 block text-[11px] font-medium text-text-faint uppercase tracking-wider">
          {item.date}
        </span>
      )}
      <h3
        className={cn(
          'text-sm font-semibold',
          isCompleted ? 'text-ignite' : 'text-chalk'
        )}
      >
        {item.title}
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-text-faint">
        {item.description}
      </p>
    </div>
  )
}

export default Timeline`,
usage: `import Timeline from "@/app/components/ui/timeline"

const items = [
  { title: "Step 1", description: "Getting started with the project.", date: "Jan 2025", active: true },
  { title: "Step 2", description: "Implementation phase begins.", date: "Feb 2025", active: true },
  { title: "Step 3", description: "Testing and QA.", date: "Mar 2025" },
]

export function Demo() {
  return <Timeline items={items} />
}`,
props: [
  {
    name: "items",
    type: "TimelineItem[]",
    default: "[]",
    description: "Array of timeline items with title, description, date, icon, and active flag.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
],
playground: {
  controls: [],
  defaults: {
    items: [
      { title: "Project Kickoff", description: "Initial planning and scope definition.", date: "Jan 2025", active: true },
      { title: "Development", description: "Building the core features.", date: "Feb 2025", active: true },
      { title: "Launch", description: "Going live to production.", date: "Mar 2025" },
    ],
  },
},
component: () => import("@/app/components/ui/timeline"),
demo: () => import("@/app/components/demos/timeline-demo"),
};

export default entry;
