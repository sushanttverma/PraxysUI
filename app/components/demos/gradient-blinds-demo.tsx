'use client'

import dynamic from 'next/dynamic'

const GradientBlinds = dynamic(() => import('@/app/components/ui/gradient-blinds'), { ssr: false })

export default function GradientBlindsDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <GradientBlinds />
    </div>
  )
}
