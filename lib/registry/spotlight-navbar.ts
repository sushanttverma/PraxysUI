import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "spotlight-navbar",
title: "Spotlight Navbar",
description:
  "A horizontal navigation bar with a smooth animated spotlight background that follows the hovered item.",
category: "navigation",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
}

interface SpotlightNavbarProps {
  items: NavItem[]
  className?: string
}

const SpotlightNavbar: React.FC<SpotlightNavbarProps> = ({
  items,
  className = '',
}) => {
  const navRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, width: 0 })

  function handleHover(e: React.MouseEvent<HTMLAnchorElement>, index: number) {
const rect = e.currentTarget.getBoundingClientRect()
const navRect = navRef.current?.getBoundingClientRect()
if (!navRect) return

setSpotlightPos({
  x: rect.left - navRect.left,
  width: rect.width,
})
setHoveredIndex(index)
  }

  return (
<div
  ref={navRef}
  className={cn(
    'relative inline-flex items-center gap-1 rounded-xl border border-border bg-obsidian p-1.5',
    className
  )}
>
  {/* Spotlight background */}
  {hoveredIndex !== null && (
    <motion.div
      className="absolute top-1.5 bottom-1.5 rounded-lg bg-ignite/10 border border-ignite/20"
      initial={false}
      animate={{
        x: spotlightPos.x - 6,
        width: spotlightPos.width,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    />
  )}

  {items.map((item, i) => (
    <a
      key={item.href}
      href={item.href}
      onMouseEnter={(e) => handleHover(e, i)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={cn(
        'relative z-10 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
        hoveredIndex === i ? 'text-ignite' : 'text-blush hover:text-chalk'
      )}
    >
      {item.label}
    </a>
  ))}
</div>
  )
}

export default SpotlightNavbar`,
usage: `import SpotlightNavbar from "@/app/components/ui/spotlight-navbar"

export function Demo() {
  return (
<SpotlightNavbar
  items={[
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Projects", href: "#" },
    { label: "Contact", href: "#" },
  ]}
/>
  )
}`,
props: [
  {
    name: "items",
    type: "NavItem[]",
    default: "—",
    description: "Array of navigation items with label and href.",
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
      { label: "Home", href: "#" },
      { label: "About", href: "#" },
      { label: "Projects", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
},
component: () => import("@/app/components/ui/spotlight-navbar"),
demo: () => import("@/app/components/demos/spotlight-navbar-demo"),
};

export default entry;
