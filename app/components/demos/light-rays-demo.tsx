'use client'

import dynamic from 'next/dynamic'

const LightRays = dynamic(() => import('@/app/components/ui/light-rays'), { ssr: false })

export default function LightRaysDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <LightRays />
    </div>
  )
}
