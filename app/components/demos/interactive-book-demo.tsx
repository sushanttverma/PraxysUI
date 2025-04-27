'use client'

import InteractiveBook from '@/app/components/ui/interactive-book'

const samplePages = [
  {
    title: 'Chapter 1: Getting Started',
    content: (
      <p>
        Welcome to the interactive book component. This page-flip animation
        uses Framer Motion&apos;s AnimatePresence to create a realistic 3D
        turning effect. Navigate with the buttons below or click the dots.
      </p>
    ),
  },
  {
    title: 'Chapter 2: Design Tokens',
    content: (
      <p>
        Praxys UI uses five intentional brand colors — Void, Obsidian, Ignite,
        Blush, and Chalk — mapped to CSS custom properties that swap
        automatically between light and dark themes.
      </p>
    ),
  },
  {
    title: 'Chapter 3: Copy & Paste',
    content: (
      <p>
        Every component is designed to be copied directly into your project.
        No npm install required — just grab the source, drop it in, and
        customize to your heart&apos;s content.
      </p>
    ),
  },
  {
    title: 'Chapter 4: Animations',
    content: (
      <p>
        Framer Motion powers all animations in Praxys UI. From subtle hover
        states to complex orchestrated sequences, each component ships with
        polished motion out of the box.
      </p>
    ),
  },
  {
    title: 'Chapter 5: Go Build',
    content: (
      <p>
        You&apos;ve reached the end. Now go build something beautiful.
        Praxys UI gives you the building blocks — the rest is up to your
        imagination.
      </p>
    ),
  },
]

export default function InteractiveBookDemo() {
  return (
    <div className="flex items-center justify-center py-8">
      <InteractiveBook pages={samplePages} />
    </div>
  )
}
