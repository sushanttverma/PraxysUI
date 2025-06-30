'use client'

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
              aria-label={`Remove ${tag}`}
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

export default TagInput
