import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "line-hover-link",
title: "Line Hover Link",
description:
  "A link with an animated underline that slides in on hover.",
category: "navigation",
dependencies: ["clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface LineHoverLinkProps {
  children: React.ReactNode
  href?: string
  className?: string
  lineColor?: string
}

const LineHoverLink: React.FC<LineHoverLinkProps> = ({
  children,
  href = '#',
  className = '',
  lineColor,
}) => {
  return (
<a
  href={href}
  className={cn(
    'group relative inline-block text-chalk transition-colors hover:text-ignite',
    className
  )}
>
  {children}
  <span
    className="absolute bottom-0 left-0 h-px w-0 transition-all duration-300 ease-out group-hover:w-full"
    style={{ backgroundColor: lineColor || 'var(--color-ignite)' }}
  />
</a>
  )
}

export default LineHoverLink`,
usage: `import LineHoverLink from "@/app/components/ui/line-hover-link"

export function Demo() {
  return (
<LineHoverLink href="#">
  Hover over me
</LineHoverLink>
  )
}`,
props: [
  {
    name: "children",
    type: "React.ReactNode",
    default: "—",
    description: "Link content.",
  },
  {
    name: "href",
    type: "string",
    default: "'#'",
    description: "Link destination URL.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
  {
    name: "lineColor",
    type: "string",
    default: "var(--color-ignite)",
    description: "Color of the underline.",
  },
],
playground: {
  controls: [
    { name: "children", label: "Link Text", type: "text", default: "Hover over me" },
    { name: "lineColor", label: "Line Color", type: "color", default: "#E84E2D" },
  ],
},
component: () => import("@/app/components/ui/line-hover-link"),
demo: () => import("@/app/components/demos/line-hover-link-demo"),
};

export default entry;
