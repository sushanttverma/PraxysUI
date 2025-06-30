import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "breadcrumbs",
title: "Breadcrumbs",
description:
  "Navigation breadcrumbs with Next.js Link integration, custom separator support, aria-label accessibility, and current page indicator.",
category: "navigation",
dependencies: ["clsx", "tailwind-merge", "lucide-react"],
code: `'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  className?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator,
  className,
}) => {
  const sep = separator ?? <ChevronRight className="h-3 w-3 text-text-faint" />

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1

          return (
            <li key={item.label + i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">{sep}</span>}
              {isLast || !item.href ? (
                <span
                  className={cn(
                    'text-sm',
                    isLast ? 'font-medium text-chalk' : 'text-text-faint'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm text-blush transition-colors hover:text-chalk"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs`,
usage: `import Breadcrumbs from "@/app/components/ui/breadcrumbs"

export function Demo() {
  return (
    <Breadcrumbs
      items={[
        { label: "Home", href: "/" },
        { label: "Docs", href: "/docs" },
        { label: "Breadcrumbs" },
      ]}
    />
  )
}`,
props: [
  {
    name: "items",
    type: "{ label: string; href?: string }[]",
    default: "[]",
    description: "Array of breadcrumb items. The last item is rendered as current page.",
  },
  {
    name: "separator",
    type: "React.ReactNode",
    default: "<ChevronRight />",
    description: "Custom separator between breadcrumb items.",
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
      { label: "Docs", href: "#" },
      { label: "Breadcrumbs" },
    ],
  },
},
component: () => import("@/app/components/ui/breadcrumbs"),
demo: () => import("@/app/components/demos/breadcrumbs-demo"),
};

export default entry;
