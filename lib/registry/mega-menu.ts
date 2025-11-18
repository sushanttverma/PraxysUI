import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "mega-menu",
title: "Mega Menu",
description:
  "Large dropdown navigation menu with hover trigger, delayed close, grid layout for sections, and AnimatePresence entrance animation.",
category: "navigation",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MegaMenuItem {
  label: string
  href: string
  description?: string
}

interface MegaMenuSection {
  title: string
  items: MegaMenuItem[]
}

interface MegaMenuProps {
  trigger: React.ReactNode
  sections: MegaMenuSection[]
  className?: string
}

const MegaMenu: React.FC<MegaMenuProps> = ({
  trigger,
  sections,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const open = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200)
  }, [])

  const cancelClose = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  const cols = sections.length <= 2 ? sections.length : sections.length <= 4 ? sections.length : 4

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <div className="cursor-pointer">{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-1/2 z-50 mt-2 -translate-x-1/2"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onMouseEnter={cancelClose}
            onMouseLeave={close}
          >
            <div
              className={cn(
                'grid gap-6 rounded-xl border border-border bg-obsidian p-6 shadow-2xl',
                className
              )}
              style={{
                gridTemplateColumns: \`repeat(\${cols}, minmax(200px, 1fr))\`,
              }}
            >
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-faint">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="group block rounded-lg px-3 py-2 transition-colors hover:bg-ignite/5"
                        >
                          <span className="text-sm font-medium text-chalk group-hover:text-ignite transition-colors">
                            {item.label}
                          </span>
                          {item.description && (
                            <p className="mt-0.5 text-xs leading-relaxed text-text-faint">
                              {item.description}
                            </p>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MegaMenu`,
usage: `import MegaMenu from "@/app/components/ui/mega-menu"

export function Demo() {
  return (
    <MegaMenu
      trigger={<button>Products</button>}
      sections={[
        {
          title: "Platform",
          items: [
            { label: "Analytics", href: "#", description: "Track metrics" },
            { label: "Automation", href: "#", description: "Streamline workflows" },
          ],
        },
        {
          title: "Resources",
          items: [
            { label: "Docs", href: "#" },
            { label: "Blog", href: "#" },
          ],
        },
      ]}
    />
  )
}`,
props: [
  {
    name: "trigger",
    type: "React.ReactNode",
    default: "—",
    description: "The element that triggers the mega menu on hover.",
  },
  {
    name: "sections",
    type: "MegaMenuSection[]",
    default: "[]",
    description: "Array of sections, each with a title and array of menu items.",
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
    sections: [
      {
        title: "Platform",
        items: [
          { label: "Analytics", href: "#", description: "Track performance metrics" },
          { label: "Automation", href: "#", description: "Streamline your workflows" },
        ],
      },
      {
        title: "Resources",
        items: [
          { label: "Documentation", href: "#" },
          { label: "Blog", href: "#" },
        ],
      },
    ],
  },
},
component: () => import("@/app/components/ui/mega-menu"),
demo: () => import("@/app/components/demos/mega-menu-demo"),
};

export default entry;
