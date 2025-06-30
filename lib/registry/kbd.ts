import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "kbd",
title: "Kbd",
description:
  "Keyboard shortcut indicator with monospace font, shadow border styling, and inline usage support.",
category: "text",
dependencies: ["clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface KbdProps {
  children: React.ReactNode
  className?: string
}

const Kbd: React.FC<KbdProps> = ({ children, className }) => {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-border bg-obsidian px-1.5 font-mono text-[11px] font-medium text-blush shadow-[0_1px_0_1px_var(--color-void)]',
        className
      )}
    >
      {children}
    </kbd>
  )
}

export default Kbd`,
usage: `import Kbd from "@/app/components/ui/kbd"

export function Demo() {
  return (
    <p className="text-sm text-blush">
      Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open search
    </p>
  )
}`,
props: [
  {
    name: "children",
    type: "React.ReactNode",
    default: "—",
    description: "Key label content (e.g. 'Ctrl', 'K', 'Enter').",
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
    { name: "children", label: "Key", type: "text", default: "Ctrl" },
  ],
},
component: () => import("@/app/components/ui/kbd"),
demo: () => import("@/app/components/demos/kbd-demo"),
};

export default entry;
