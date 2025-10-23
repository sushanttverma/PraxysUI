'use client'

import { useState } from 'react'
import SearchInput from '@/app/components/ui/search-input'

export default function SearchInputDemo() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = (val: string) => {
    setQuery(val)
    if (val.length > 0) {
      setLoading(true)
      setTimeout(() => setLoading(false), 800)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Default
          </p>
          <SearchInput
            value={query}
            onChange={handleSearch}
            loading={loading}
            placeholder="Search components..."
            onClear={() => setQuery('')}
          />
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            With value
          </p>
          <SearchInput
            value="framer-motion"
            onChange={() => {}}
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  )
}
