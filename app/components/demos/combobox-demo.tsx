'use client'

import { useState } from 'react'
import Combobox from '@/app/components/ui/combobox'

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'qwik', label: 'Qwik' },
  { value: 'preact', label: 'Preact' },
  { value: 'lit', label: 'Lit' },
]

const languages = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
]

export default function ComboboxDemo() {
  const [selectedFramework, setSelectedFramework] = useState('')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [disabledValue, setDisabledValue] = useState('')

  const getSelectedFrameworkLabel = () => {
    if (!selectedFramework) return 'None'
    const framework = frameworks.find((f) => f.value === selectedFramework)
    return framework?.label || 'None'
  }

  const getSelectedLanguagesLabels = () => {
    if (selectedLanguages.length === 0) return 'None'
    return selectedLanguages
      .map((value) => {
        const lang = languages.find((l) => l.value === value)
        return lang?.label
      })
      .filter(Boolean)
      .join(', ')
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-8">
        {/* Single-select combobox */}
        <div className="space-y-3">
          <Combobox
            label="Framework"
            options={frameworks}
            value={selectedFramework}
            onChange={(value) => setSelectedFramework(value as string)}
            placeholder="Search frameworks..."
            mode="single"
          />
          <div className="text-center text-sm">
            <span className="text-text-faint">Selected: </span>
            <span className="text-chalk font-medium">
              {getSelectedFrameworkLabel()}
            </span>
          </div>
        </div>

        {/* Multi-select combobox */}
        <div className="space-y-3">
          <Combobox
            label="Programming Languages"
            options={languages}
            value={selectedLanguages}
            onChange={(value) => setSelectedLanguages(value as string[])}
            placeholder="Search languages..."
            mode="multiple"
          />
          <div className="text-center text-sm">
            <span className="text-text-faint">Selected: </span>
            <span className="text-chalk font-medium">
              {getSelectedLanguagesLabels()}
            </span>
          </div>
        </div>

        {/* Disabled combobox */}
        <div className="space-y-3">
          <Combobox
            label="Disabled Combobox"
            options={frameworks}
            value={disabledValue}
            onChange={(value) => setDisabledValue(value as string)}
            placeholder="This is disabled"
            mode="single"
            disabled={true}
          />
          <div className="text-center text-xs text-text-faint italic">
            This combobox is disabled
          </div>
        </div>

        {/* Loading state example */}
        <div className="space-y-3">
          <Combobox
            label="Loading State"
            options={[]}
            value=""
            onChange={() => {}}
            placeholder="Loading..."
            mode="single"
            loading={true}
          />
          <div className="text-center text-xs text-text-faint">
            Showing loading indicator
          </div>
        </div>
      </div>
    </div>
  )
}
