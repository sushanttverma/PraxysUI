import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "comparison-table",
title: "Comparison Table",
description:
  "Side-by-side feature comparison table with staggered row entrance animations and check/cross icons.",
category: "cards",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Plan {
  name: string
  features: Record<string, boolean | string>
}

interface ComparisonTableProps {
  plans: Plan[]
  featureLabels: string[]
  className?: string
}

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      delay: 0.05 * i,
    },
  }),
}

const CheckIcon: React.FC = () => (
  <svg
    className="h-4 w-4 text-emerald-400"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 8.5L6.5 12L13 4" />
  </svg>
)

const CrossIcon: React.FC = () => (
  <svg
    className="h-4 w-4 text-red-400/60"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 4L12 12M12 4L4 12" />
  </svg>
)

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  plans,
  featureLabels,
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-xl border border-border bg-obsidian',
        className
      )}
    >
      <table className="w-full text-sm">
        {/* Header */}
        <thead>
          <motion.tr
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="border-b border-border"
          >
            <th className="px-5 py-4 text-left font-medium text-text-faint">
              Feature
            </th>
            {plans.map((plan) => (
              <th
                key={plan.name}
                className="px-5 py-4 text-center font-semibold text-chalk"
              >
                {plan.name}
              </th>
            ))}
          </motion.tr>
        </thead>

        {/* Body */}
        <tbody>
          {featureLabels.map((label, i) => (
            <motion.tr
              key={label}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn(
                'border-b border-border/50 transition-colors hover:bg-void/50',
                i === featureLabels.length - 1 && 'border-b-0'
              )}
            >
              <td className="px-5 py-3 text-blush">{label}</td>
              {plans.map((plan) => {
                const val = plan.features[label]
                return (
                  <td key={plan.name} className="px-5 py-3 text-center">
                    {typeof val === 'boolean' ? (
                      <span className="inline-flex justify-center">
                        {val ? <CheckIcon /> : <CrossIcon />}
                      </span>
                    ) : (
                      <span className="text-chalk">{val}</span>
                    )}
                  </td>
                )
              })}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonTable`,
usage: `import ComparisonTable from "@/app/components/ui/comparison-table"

const plans = [
  { name: "Free", features: { "Storage": "1 GB", "API Access": false } },
  { name: "Pro", features: { "Storage": "100 GB", "API Access": true } },
]

export function Demo() {
  return (
    <ComparisonTable
      plans={plans}
      featureLabels={["Storage", "API Access"]}
    />
  )
}`,
props: [
  {
    name: "plans",
    type: "{ name: string; features: Record<string, boolean | string> }[]",
    default: "—",
    description: "Array of plan objects with name and feature values.",
  },
  {
    name: "featureLabels",
    type: "string[]",
    default: "—",
    description: "Ordered list of feature label strings for each row.",
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
    plans: [
      { name: "Free", features: { "Storage": "1 GB", "API Access": false, "Priority Support": false } },
      { name: "Pro", features: { "Storage": "100 GB", "API Access": true, "Priority Support": true } },
    ],
    featureLabels: ["Storage", "API Access", "Priority Support"],
  },
},
component: () => import("@/app/components/ui/comparison-table"),
demo: () => import("@/app/components/demos/comparison-table-demo"),
};

export default entry;
