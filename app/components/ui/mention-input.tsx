'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MentionUser {
  id: string
  name: string
  avatar?: string
}

interface MentionInputProps {
  value: string
  onChange: (value: string) => void
  users: MentionUser[]
  placeholder?: string
  className?: string
}

const MentionInput: React.FC<MentionInputProps> = ({
  value,
  onChange,
  users,
  placeholder = 'Type @ to mention someone...',
  className,
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  )

  const detectMention = useCallback((text: string) => {
    const match = text.match(/@(\w*)$/)
    if (match) {
      setShowDropdown(true)
      setQuery(match[1])
      setSelectedIndex(0)
    } else {
      setShowDropdown(false)
      setQuery('')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    detectMention(newValue)
  }

  const insertMention = (user: MentionUser) => {
    const mentionMatch = value.match(/@(\w*)$/)
    if (mentionMatch) {
      const before = value.slice(0, value.length - mentionMatch[0].length)
      onChange(`${before}@${user.name} `)
    }
    setShowDropdown(false)
    setQuery('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || filteredUsers.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => (i + 1) % filteredUsers.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => (i - 1 + filteredUsers.length) % filteredUsers.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      insertMention(filteredUsers[selectedIndex])
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className={cn('relative', className)} onClick={(e) => e.stopPropagation()}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-void px-3 py-2.5 text-sm text-chalk placeholder:text-text-faint outline-none transition-colors focus:border-ignite/50"
      />

      <AnimatePresence>
        {showDropdown && filteredUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-obsidian shadow-xl"
          >
            {filteredUsers.map((user, index) => (
              <button
                key={user.id}
                onClick={() => insertMention(user)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors',
                  index === selectedIndex
                    ? 'bg-ignite/10 text-ignite'
                    : 'text-chalk hover:bg-void'
                )}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ignite/20 text-xs font-medium text-ignite">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="font-medium">{user.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MentionInput
