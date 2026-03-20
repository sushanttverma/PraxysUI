'use client'

import dynamic from 'next/dynamic'

const Grainient = dynamic(() => import('@/app/components/ui/grainient'), { ssr: false })

export default function GrainientDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <Grainient />
    </div>
  )
}
