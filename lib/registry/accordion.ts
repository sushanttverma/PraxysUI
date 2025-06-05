import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "accordion",
title: "Accordion",
description:
  "Smooth expand/collapse panels with animated chevron, supports single or multiple open panels.",
category: "navigation",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: string[]
  className?: string
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen)

  const toggle = (id: string) => {
setOpenIds((prev) => {
  if (prev.includes(id)) {
    return prev.filter((i) => i !== id)
  }
  return allowMultiple ? [...prev, id] : [id]
})
  }

  return (
<div
  className={cn(
    'rounded-xl border border-border bg-obsidian overflow-hidden divide-y divide-border',
    className
  )}
>
  {items.map((item) => {
    const isOpen = openIds.includes(item.id)

    return (
      <div key={item.id}>
        <button
          type="button"
          onClick={() => toggle(item.id)}
          className="flex w-full items-center justify-between px-5 py-4 cursor-pointer transition-colors hover:bg-ignite/5"
        >
          <span className="text-sm font-medium text-chalk">{item.title}</span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            className="text-blush"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 text-sm leading-relaxed text-blush">
                {item.content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  })}
</div>
  )
}

export default Accordion`,
usage: `import Accordion from "@/app/components/ui/accordion"

export function Demo() {
  return (
<Accordion
  items={[
    { id: "1", title: "What is Praxys UI?", content: "An open-source animated component library." },
    { id: "2", title: "Is it free?", content: "Yes! MIT licensed." },
  ]}
  defaultOpen={["1"]}
/>
  )
}`,
props: [
  {
    name: "items",
    type: "AccordionItem[]",
    default: "—",
    description: "Array of accordion items with id, title, and content.",
  },
  {
    name: "allowMultiple",
    type: "boolean",
    default: "false",
    description: "Whether multiple panels can be open simultaneously.",
  },
  {
    name: "defaultOpen",
    type: "string[]",
    default: "[]",
    description: "Array of item ids to open by default.",
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
    { name: "allowMultiple", label: "Allow Multiple", type: "boolean", default: false },
  ],
  defaults: {
    items: [
      { id: "1", title: "What is Praxys UI?", content: "An open-source collection of animated React components you can copy-paste into your projects." },
      { id: "2", title: "How do I install?", content: "Use the CLI: npx praxys-ui add accordion — or copy the source code." },
      { id: "3", title: "Is it free?", content: "Yes! Completely free and open-source under the MIT license." },
    ],
    defaultOpen: ["1"],
  },
},
component: () => import("@/app/components/ui/accordion"),
demo: () => import("@/app/components/demos/accordion-demo"),
};

export default entry;
