'use client'

import LiquidOcean from '@/app/components/ui/liquid-ocean'

export default function LiquidOceanDemo() {
  return (
    <div className="py-4">
      <LiquidOcean waveCount={4} speed={6} />
    </div>
  )
}
