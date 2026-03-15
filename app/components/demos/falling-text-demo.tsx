'use client'

import { useMemo, useState } from 'react'
import FallingText from '@/app/components/ui/falling-text'

type TriggerMode = 'hover' | 'click' | 'auto' | 'scroll'

export default function FallingTextDemo() {
  const [trigger, setTrigger] = useState<TriggerMode>('hover')
  const [gravity, setGravity] = useState(0.56)
  const [mouseConstraintStiffness, setMouseConstraintStiffness] = useState(0.9)
  const [previewKey, setPreviewKey] = useState(0)

  const triggerLabel = useMemo(() => {
    if (trigger === 'hover') return 'Praxys'
    if (trigger === 'click') return 'Click Me'
    if (trigger === 'scroll') return 'Scroll To Start'
    return 'Auto Start'
  }, [trigger])

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="relative h-[400px] overflow-hidden rounded-xl border border-border bg-void">
        <FallingText
          key={previewKey}
          text="React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow."
          highlightWords={['React', 'Bits', 'animated', 'components', 'simplify']}
          trigger={trigger}
          gravity={gravity}
          fontSize="2rem"
          mouseConstraintStiffness={mouseConstraintStiffness}
        />
        <p className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center text-5xl font-black text-blush/25">
          {triggerLabel}
        </p>
      </div>

      <div className="grid gap-3 rounded-xl border border-border bg-obsidian/40 p-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-blush">
          Trigger
          <select
            value={trigger}
            onChange={(e) => {
              setTrigger(e.target.value as TriggerMode)
              setPreviewKey((k) => k + 1)
            }}
            className="rounded-md border border-border bg-void px-2 py-1.5 text-chalk"
          >
            <option value="hover">Hover</option>
            <option value="click">Click</option>
            <option value="auto">Auto</option>
            <option value="scroll">Scroll</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs text-blush">
          Gravity ({gravity.toFixed(2)})
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.01}
            value={gravity}
            onChange={(e) => {
              setGravity(Number(e.target.value))
              setPreviewKey((k) => k + 1)
            }}
            className="accent-ignite"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-blush">
          Mouse Stiffness ({mouseConstraintStiffness.toFixed(1)})
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.1}
            value={mouseConstraintStiffness}
            onChange={(e) => {
              setMouseConstraintStiffness(Number(e.target.value))
              setPreviewKey((k) => k + 1)
            }}
            className="accent-ignite"
          />
        </label>
      </div>
    </div>
  )
}
