'use client'

import { useState } from 'react'
import Confetti from '@/app/components/ui/confetti'

export default function ConfettiDemo() {
  const [trigger, setTrigger] = useState(false)

  const handleClick = () => {
    setTrigger(false)
    setTimeout(() => setTrigger(true), 50)
  }

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <Confetti trigger={trigger} count={50} duration={2} />
      <button
        onClick={handleClick}
        className="rounded-lg border border-border bg-ignite px-6 py-2 text-sm font-medium text-chalk transition-colors hover:bg-ignite/80 cursor-pointer"
      >
        Celebrate!
      </button>
      <p className="text-sm text-text-faint">Click the button to launch confetti</p>
    </div>
  )
}
