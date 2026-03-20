'use client'

import dynamic from 'next/dynamic'

const ColorBends = dynamic(() => import('@/app/components/ui/color-bends'), { ssr: false })

export default function ColorBendsDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <ColorBends />
    </div>
  )
}
