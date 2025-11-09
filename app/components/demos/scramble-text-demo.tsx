'use client'

import { useState } from 'react'
import ScrambleText from '@/app/components/ui/scramble-text'

export default function ScrambleTextDemo() {
  const [trigger, setTrigger] = useState(true)

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <h2 className="text-3xl font-bold text-chalk">
        <ScrambleText text="Decode the future" trigger={trigger} speed={40} />
      </h2>
      <p className="text-lg text-blush">
        <ScrambleText
          text="Scramble text reveals character by character"
          trigger={trigger}
          speed={30}
        />
      </p>
      <button
        onClick={() => {
          setTrigger(false)
          setTimeout(() => setTrigger(true), 100)
        }}
        className="rounded-lg bg-ignite px-4 py-2 text-sm font-medium text-chalk transition-opacity hover:opacity-80"
      >
        Replay
      </button>
    </div>
  )
}
