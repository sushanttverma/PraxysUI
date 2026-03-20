'use client'

import dynamic from 'next/dynamic'

const Beams = dynamic(() => import('@/app/components/ui/beams'), { ssr: false })

export default function BeamsDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <Beams />
    </div>
  )
}
