import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "tag-input",
title: "Tag Input",
description:
  "Animated tag input with Enter/comma to add, Backspace to remove, max tags limit, controlled and uncontrolled modes, and framer-motion AnimatePresence transitions.",
category: "buttons",
dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"],
code: `'use client'

import React, { useState, useRef, useCallback, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TagInputProps {
  tags?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
  className?: string
}

const TagInput: React.FC<TagInputProps> = ({
  tags: controlledTags,
  onChange,
  placeholder = 'Add a tag...',
  maxTags = 10,
  className,
}) => {
  const id = useId()
  const [internalTags, setInternalTags] = useState<string[]>([])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const tags = controlledTags ?? internalTags
  const setTags = useCallback(
    (next: string[]) => {
      if (onChange) onChange(next)
      else setInternalTags(next)
    },
    [onChange]
  )

  const addTag = useCallback(
    (value: string) => {
      const trimmed = value.trim().toLowerCase()
      if (trimmed && !tags.includes(trimmed) && tags.length < maxTags) {
        setTags([...tags, trimmed])
      }
      setInput('')
    },
    [tags, maxTags, setTags]
  )

  const removeTag = useCallback(
    (tag: string) => {
      setTags(tags.filter((t) => t !== tag))
    },
    [tags, setTags]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
        e.preventDefault()
        addTag(input)
      } else if (e.key === 'Backspace' && !input && tags.length > 0) {
        removeTag(tags[tags.length - 1])
      }
    },
    [input, tags, addTag, removeTag]
  )

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-1.5 rounded-lg border border-border bg-void px-3 py-2 transition-colors focus-within:border-ignite/50 focus-within:ring-1 focus-within:ring-ignite/20',
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <AnimatePresence mode="popLayout">
        {tags.map((tag) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-obsidian px-2 py-0.5 text-xs font-medium text-blush"
          >
            {tag}
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeTag(tag)
              }}
              className="shrink-0 rounded p-0.5 text-text-faint transition-colors hover:text-chalk"
              aria-label={\`Remove \${tag}\`}
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>

      <input
        ref={inputRef}
        id={id}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (input.trim()) addTag(input)
        }}
        placeholder={tags.length === 0 ? placeholder : ''}
        disabled={tags.length >= maxTags}
        className="min-w-[80px] flex-1 bg-transparent text-sm text-chalk placeholder:text-text-faint outline-none disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Tag input"
      />

      {tags.length > 0 && (
        <span className="text-[10px] text-text-faint">
          {tags.length}/{maxTags}
        </span>
      )}
    </div>
  )
}

export default TagInput`,
usage: `import { useState } from "react"
import TagInput from "@/app/components/ui/tag-input"

export function Demo() {
  const [tags, setTags] = useState(["react", "nextjs"])

  return (
    <TagInput
      tags={tags}
      onChange={setTags}
      placeholder="Add a tag..."
      maxTags={8}
    />
  )
}`,
props: [
  {
    name: "tags",
    type: "string[]",
    default: "undefined",
    description: "Controlled tag array. Omit for uncontrolled mode.",
  },
  {
    name: "onChange",
    type: "(tags: string[]) => void",
    default: "undefined",
    description: "Callback fired when the tag list changes.",
  },
  {
    name: "placeholder",
    type: "string",
    default: "'Add a tag...'",
    description: "Placeholder text shown when no tags exist.",
  },
  {
    name: "maxTags",
    type: "number",
    default: "10",
    description: "Maximum number of tags allowed.",
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
    { name: "placeholder", label: "Placeholder", type: "text", default: "Add a tag..." },
    { name: "maxTags", label: "Max tags", type: "number", default: 8, min: 1, max: 20 },
  ],
},
component: () => import("@/app/components/ui/tag-input"),
demo: () => import("@/app/components/demos/tag-input-demo"),
};

export default entry;
