import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "stepper",
title: "Stepper",
description:
  "A multi-step indicator with animated check icons, spring-scaled active step, and animated connector lines. Supports horizontal and vertical orientation.",
category: "navigation",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Step {
  label: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

function CheckIcon() {
  return (
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="14"
  height="14"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2.5"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <polyline points="20 6 9 17 4 12" />
</svg>
  )
}

const StepCircle: React.FC<{
  index: number
  status: 'completed' | 'active' | 'upcoming'
}> = ({ index, status }) => {
  return (
<motion.div
  layout
  className={cn(
    'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-medium transition-colors',
    status === 'completed' && 'border-ignite bg-ignite text-chalk',
    status === 'active' && 'border-ignite bg-ignite/10 text-ignite',
    status === 'upcoming' && 'border-border bg-obsidian text-text-faint'
  )}
  animate={{
    scale: status === 'active' ? 1.1 : 1,
  }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>
  {status === 'completed' ? <CheckIcon /> : index + 1}
</motion.div>
  )
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  className,
}) => {
  const isHorizontal = orientation === 'horizontal'

  return (
<div
  className={cn(
    'flex',
    isHorizontal ? 'flex-row items-start' : 'flex-col',
    className
  )}
>
  {steps.map((step, i) => {
    const status: 'completed' | 'active' | 'upcoming' =
      i < currentStep ? 'completed' : i === currentStep ? 'active' : 'upcoming'
    const isLast = i === steps.length - 1

    return (
      <div
        key={i}
        className={cn(
          'flex',
          isHorizontal ? 'flex-1 flex-col items-center' : 'flex-row items-start',
          isHorizontal && isLast && 'flex-none'
        )}
      >
        <div
          className={cn(
            'flex items-center',
            isHorizontal ? 'w-full' : 'flex-col'
          )}
        >
          <StepCircle index={i} status={status} />

          {/* Connector line */}
          {!isLast && (
            <div
              className={cn(
                'relative overflow-hidden',
                isHorizontal ? 'mx-2 h-0.5 flex-1' : 'my-2 ml-[15px] w-0.5 min-h-[24px]'
              )}
            >
              {/* Background track */}
              <div className="absolute inset-0 bg-border" />
              {/* Filled portion */}
              <motion.div
                className="absolute inset-0 bg-ignite"
                initial={false}
                animate={{
                  [isHorizontal ? 'scaleX' : 'scaleY']:
                    i < currentStep ? 1 : 0,
                }}
                style={{
                  transformOrigin: isHorizontal ? 'left' : 'top',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>
          )}
        </div>

        {/* Labels */}
        <div
          className={cn(
            isHorizontal ? 'mt-2 text-center' : 'ml-3 pb-6',
            isHorizontal && !isLast && 'w-full'
          )}
        >
          <motion.p
            className={cn(
              'text-sm font-medium',
              status === 'completed' && 'text-chalk',
              status === 'active' && 'text-ignite',
              status === 'upcoming' && 'text-text-faint'
            )}
            animate={{
              color:
                status === 'active'
                  ? 'var(--color-ignite)'
                  : status === 'completed'
                    ? 'var(--color-chalk)'
                    : 'var(--color-text-faint)',
            }}
            transition={{ duration: 0.3 }}
          >
            {step.label}
          </motion.p>
          {step.description && (
            <p className="mt-0.5 text-xs text-blush">{step.description}</p>
          )}
        </div>
      </div>
    )
  })}
</div>
  )
}

export default Stepper`,
usage: `import Stepper from "@/app/components/ui/stepper"

export function Demo() {
  return (
<Stepper
  steps={[
    { label: "Account", description: "Create your account" },
    { label: "Profile", description: "Set up your profile" },
    { label: "Complete", description: "All done!" },
  ]}
  currentStep={1}
/>
  )
}`,
props: [
  {
    name: "steps",
    type: "Step[]",
    default: "—",
    description: "Array of step objects ({ label, description? }).",
  },
  {
    name: "currentStep",
    type: "number",
    default: "—",
    description: "Zero-based index of the currently active step.",
  },
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: "Layout direction of the stepper.",
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
    { name: "currentStep", label: "Current Step", type: "number", default: 1, min: 0, max: 3, step: 1 },
    { name: "orientation", label: "Orientation", type: "select", default: "horizontal", options: ["horizontal", "vertical"] },
  ],
  defaults: {
    steps: [
      { label: "Account", description: "Create your account" },
      { label: "Profile", description: "Set up your profile" },
      { label: "Billing", description: "Add payment method" },
      { label: "Complete", description: "All done!" },
    ],
  },
},
component: () => import("@/app/components/ui/stepper"),
demo: () => import("@/app/components/demos/stepper-demo"),
};

export default entry;
