'use client'

import dynamic from 'next/dynamic'

const LiquidEther = dynamic(() => import('@/app/components/ui/liquid-ether'), { ssr: false })

export default function LiquidEtherDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <LiquidEther />
    </div>
  )
}
