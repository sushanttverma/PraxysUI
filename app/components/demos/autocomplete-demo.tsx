'use client'

import { useState } from 'react'
import Autocomplete from '@/app/components/ui/autocomplete'

// Mock programming languages data
const programmingLanguages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Rust',
  'Go',
  'Java',
  'C++',
  'Ruby',
  'PHP',
  'Swift',
]

export default function AutocompleteDemo() {
  const [selectedLanguage, setSelectedLanguage] = useState('')

  // Simulate async search with debouncing
  const handleSearch = async (query: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Filter languages that match the query
    const results = programmingLanguages
      .filter((lang) => lang.toLowerCase().includes(query.toLowerCase()))
      .map((lang) => ({
        value: lang.toLowerCase(),
        label: lang,
      }))

    return results
  }

  const handleSelect = (option: { value: string; label: string }) => {
    setSelectedLanguage(option.value)
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Autocomplete component */}
        <div>
          <p className="mb-4 text-sm font-medium text-chalk">
            Search programming languages
          </p>
          <Autocomplete
            onSearch={handleSearch}
            onSelect={handleSelect}
            placeholder="Type to search..."
            label="Programming Language"
            debounceMs={300}
          />
        </div>

        <div className="h-px bg-border" />

        {/* Selected value */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Selected Language
          </p>
          <div className="p-3 rounded-lg bg-border/20 text-center">
            {selectedLanguage ? (
              <p className="text-sm text-chalk font-medium">
                {programmingLanguages.find((lang) => lang.toLowerCase() === selectedLanguage) || selectedLanguage}
              </p>
            ) : (
              <p className="text-sm text-text-faint">No language selected</p>
            )}
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Instructions */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Instructions
          </p>
          <div className="space-y-2 text-xs text-text-faint">
            <p>• Start typing to search for a programming language</p>
            <p>• Results appear after 300ms debounce delay</p>
            <p>• Use ↑↓ arrow keys to navigate suggestions</p>
            <p>• Press Enter to select highlighted option</p>
            <p>• Press Escape to close the dropdown</p>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Available languages */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Available Languages
          </p>
          <div className="flex flex-wrap gap-2">
            {programmingLanguages.map((lang) => (
              <span
                key={lang}
                className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                  selectedLanguage === lang.toLowerCase()
                    ? 'border-ignite bg-ignite/10 text-ignite'
                    : 'border-border bg-border/20 text-text-faint'
                }`}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
