'use client'

import dynamic from 'next/dynamic'

const Orb = dynamic(() => import('@/app/components/ui/orb'), { ssr: false })

export default function OrbDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <Orb />
    </div>
  )
}
