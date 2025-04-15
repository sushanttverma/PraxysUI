'use client'

import CreepyButton from '@/app/components/ui/creepy-button'

export default function CreepyButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-8">
      <CreepyButton>Enter</CreepyButton>
      <CreepyButton className="border-blush/20">Discover</CreepyButton>
    </div>
  )
}
