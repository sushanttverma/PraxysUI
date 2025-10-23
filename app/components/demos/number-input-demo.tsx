'use client'

import { useState } from 'react'
import NumberInput from '@/app/components/ui/number-input'

export default function NumberInputDemo() {
  const [qty, setQty] = useState(1)
  const [temp, setTemp] = useState(20)
  const [amount, setAmount] = useState(50)

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Small — Quantity
          </p>
          <NumberInput value={qty} onChange={setQty} min={1} max={99} size="sm" />
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Medium — Temperature
          </p>
          <NumberInput value={temp} onChange={setTemp} min={-40} max={50} size="md" />
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Large — Amount (step 10)
          </p>
          <NumberInput value={amount} onChange={setAmount} min={0} max={1000} step={10} size="lg" />
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Disabled
          </p>
          <NumberInput value={5} onChange={() => {}} disabled />
        </div>
      </div>
    </div>
  )
}
