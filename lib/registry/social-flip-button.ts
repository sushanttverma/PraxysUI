import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "social-flip-button",
title: "Social Flip Button",
description:
  "A button that flips to reveal social media icons on hover, with a smooth 3D rotation transition.",
category: "buttons",
dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"],
code: `'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SocialLink {
  icon: React.ReactNode
  href: string
  label: string
}

interface SocialFlipButtonProps {
  frontLabel?: string
  links: SocialLink[]
  className?: string
}

const SocialFlipButton: React.FC<SocialFlipButtonProps> = ({
  frontLabel = 'Follow',
  links,
  className = '',
}) => {
  const [flipped, setFlipped] = useState(false)

  return (
<div
  className={cn('relative', className)}
  onMouseEnter={() => setFlipped(true)}
  onMouseLeave={() => setFlipped(false)}
>
  <div className="relative h-10" style={{ perspective: '600px' }}>
    <AnimatePresence mode="wait">
      {!flipped ? (
        <motion.button
          key="front"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex h-10 items-center gap-2 rounded-lg border border-border bg-obsidian px-5 text-sm font-medium text-chalk cursor-pointer"
          style={{ transformOrigin: 'center center' }}
        >
          {frontLabel}
        </motion.button>
      ) : (
        <motion.div
          key="back"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex h-10 items-center gap-1 rounded-lg border border-ignite/30 bg-ignite/10 px-2"
          style={{ transformOrigin: 'center center' }}
        >
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-7 w-7 items-center justify-center rounded-md text-chalk transition-colors hover:bg-ignite/20 hover:text-ignite"
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>
  )
}

export default SocialFlipButton`,
usage: `import SocialFlipButton from "@/app/components/ui/social-flip-button"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Demo() {
  return (
<SocialFlipButton
  frontLabel="Follow"
  links={[
    { icon: <Github className="h-4 w-4" />, href: "#", label: "GitHub" },
    { icon: <Twitter className="h-4 w-4" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-4 w-4" />, href: "#", label: "LinkedIn" },
  ]}
/>
  )
}`,
props: [
  {
    name: "frontLabel",
    type: "string",
    default: "'Follow'",
    description: "Text shown on the front face of the button.",
  },
  {
    name: "links",
    type: "SocialLink[]",
    default: "—",
    description:
      "Array of social links, each with icon (ReactNode), href, and label.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes to apply.",
  },
],
playground: {
  controls: [
    { name: "frontLabel", label: "Front Label", type: "text", default: "Follow" },
  ],
  defaults: {
    links: [
      { icon: null, href: "#", label: "GitHub" },
      { icon: null, href: "#", label: "Twitter" },
      { icon: null, href: "#", label: "LinkedIn" },
    ],
  },
},
component: () => import("@/app/components/ui/social-flip-button"),
demo: () => import("@/app/components/demos/social-flip-button-demo"),
};

export default entry;
