import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "folder-preview",
title: "Folder Preview",
description:
  "An interactive folder component that expands to reveal a file tree with staggered entrance animations and custom icons.",
category: "media",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FileItem {
  name: string
  type: 'file' | 'folder'
  icon?: React.ReactNode
}

interface FolderPreviewProps {
  name: string
  files: FileItem[]
  className?: string
}

const FolderPreview: React.FC<FolderPreviewProps> = ({
  name,
  files,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
<div
  className={cn(
    'w-full max-w-xs rounded-xl border border-border bg-obsidian overflow-hidden',
    className
  )}
>
  {/* Folder header */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-ignite/5 cursor-pointer"
  >
    <motion.div
      animate={{ rotateZ: isOpen ? -10 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-ignite">
        <path
          d="M2 6C2 4.89543 2.89543 4 4 4H9L11 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z"
          fill="currentColor" fillOpacity={isOpen ? 0.25 : 0.15}
          stroke="currentColor" strokeWidth="1.5"
        />
        {isOpen && (
          <path d="M2 10H22" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
        )}
      </svg>
    </motion.div>

    <span className="flex-1 text-left font-pixel text-sm font-semibold text-chalk">
      {name}
    </span>

    <motion.svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      className="text-blush"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  </button>

  {/* File list */}
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="overflow-hidden"
      >
        <div className="border-t border-border px-2 py-2">
          {files.map((file, i) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-ignite/5"
            >
              {file.icon || (
                <span className="text-xs">
                  {file.type === 'folder' ? '📁' : '📄'}
                </span>
              )}
              <span className={cn(
                'text-sm',
                file.type === 'folder' ? 'font-medium text-chalk' : 'text-blush'
              )}>
                {file.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
  )
}

export default FolderPreview`,
usage: `import FolderPreview from "@/app/components/ui/folder-preview"

export function Demo() {
  return (
<FolderPreview
  name="components"
  files={[
    { name: "ui", type: "folder" },
    { name: "Navbar.tsx", type: "file" },
    { name: "Hero.tsx", type: "file" },
  ]}
/>
  )
}`,
props: [
  {
    name: "name",
    type: "string",
    default: "—",
    description: "The folder name displayed in the header.",
  },
  {
    name: "files",
    type: "FileItem[]",
    default: "—",
    description:
      "Array of file items with name, type ('file' | 'folder'), and optional custom icon.",
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
    { name: "name", label: "Folder Name", type: "text", default: "components" },
  ],
  defaults: {
    files: [
      { name: "ui", type: "folder" },
      { name: "Navbar.tsx", type: "file" },
      { name: "Hero.tsx", type: "file" },
      { name: "Footer.tsx", type: "file" },
    ],
  },
},
component: () => import("@/app/components/ui/folder-preview"),
demo: () => import("@/app/components/demos/folder-preview-demo"),
};

export default entry;
