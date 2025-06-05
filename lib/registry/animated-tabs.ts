import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "animated-tabs",
title: "Animated Tabs",
description:
  "Tab navigation with a smooth sliding indicator and crossfade content transitions.",
category: "navigation",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface AnimatedTabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  tabs,
  defaultTab,
  className,
}) => {
  const [activeTab, setActiveTab] = useState<string>(
defaultTab ?? tabs[0]?.id ?? ''
  )

  const activeContent = tabs.find((tab) => tab.id === activeTab)

  return (
<div className={cn('w-full', className)}>
  <div className="relative flex items-center gap-1 rounded-xl border border-border bg-obsidian p-1.5">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        type="button"
        onClick={() => setActiveTab(tab.id)}
        className={cn(
          'relative z-10 rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer',
          activeTab === tab.id ? 'text-chalk' : 'text-blush hover:text-chalk'
        )}
      >
        {activeTab === tab.id && (
          <motion.div
            layoutId="tab-indicator"
            className="absolute inset-0 rounded-lg bg-ignite/10 border border-ignite/20"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">{tab.label}</span>
      </button>
    ))}
  </div>
  <div className="mt-4">
    <AnimatePresence mode="wait">
      {activeContent && (
        <motion.div
          key={activeContent.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {activeContent.content}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>
  )
}

export default AnimatedTabs`,
usage: `import AnimatedTabs from "@/app/components/ui/animated-tabs"

export function Demo() {
  return (
<AnimatedTabs
  tabs={[
    { id: "preview", label: "Preview", content: <div>Preview content</div> },
    { id: "code", label: "Code", content: <div>Code content</div> },
  ]}
  defaultTab="preview"
/>
  )
}`,
props: [
  {
    name: "tabs",
    type: "Tab[]",
    default: "—",
    description: "Array of tab objects with id, label, and content.",
  },
  {
    name: "defaultTab",
    type: "string",
    default: "first tab id",
    description: "ID of the initially active tab.",
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
    tabs: [
      { id: "tab-1", label: "Preview", content: "This is the preview panel content." },
      { id: "tab-2", label: "Code", content: "This is the code panel content." },
      { id: "tab-3", label: "Usage", content: "This is the usage panel content." },
    ],
  },
},
component: () => import("@/app/components/ui/animated-tabs"),
demo: () => import("@/app/components/demos/animated-tabs-demo"),
};

export default entry;
