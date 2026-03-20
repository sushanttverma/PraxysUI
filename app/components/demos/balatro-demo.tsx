'use client'

import dynamic from 'next/dynamic'

const Balatro = dynamic(() => import('@/app/components/ui/balatro'), { ssr: false })

export default function BalatroDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <Balatro />
    </div>
  )
}
