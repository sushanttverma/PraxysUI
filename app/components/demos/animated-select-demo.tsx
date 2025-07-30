'use client'

import { useState } from 'react'
import AnimatedSelect from '@/app/components/ui/animated-select'

const frameworks = [
  { value: 'next', label: 'Next.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'svelte', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'solid', label: 'SolidStart' },
]

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
  { value: 'orange', label: 'Orange' },
  { value: 'strawberry', label: 'Strawberry' },
]

export default function AnimatedSelectDemo() {
  const [framework, setFramework] = useState('')
  const [fruit, setFruit] = useState('')

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Framework select */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Framework
          </p>
          <AnimatedSelect
            options={frameworks}
            value={framework}
            onChange={setFramework}
            placeholder="Choose a framework"
          />
          {framework && (
            <p className="mt-2 text-sm text-text-faint">
              Selected: <span className="text-ignite font-medium">{frameworks.find((f) => f.value === framework)?.label}</span>
            </p>
          )}
        </div>

        <div className="h-px bg-border" />

        {/* Fruit select */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Fruit
          </p>
          <AnimatedSelect
            options={fruits}
            value={fruit}
            onChange={setFruit}
            placeholder="Pick a fruit"
          />
          {fruit && (
            <p className="mt-2 text-sm text-text-faint">
              Selected: <span className="text-ignite font-medium">{fruits.find((f) => f.value === fruit)?.label}</span>
            </p>
          )}
        </div>

        <div className="h-px bg-border" />

        {/* Disabled */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Disabled
          </p>
          <AnimatedSelect
            options={frameworks}
            value="next"
            onChange={() => {}}
            placeholder="Disabled select"
            disabled
          />
        </div>
      </div>
    </div>
  )
}
