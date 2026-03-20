'use client'

import dynamic from 'next/dynamic'

const LightPillar = dynamic(() => import('@/app/components/ui/light-pillar'), { ssr: false })

export default function LightPillarDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <LightPillar />
    </div>
  )
}
