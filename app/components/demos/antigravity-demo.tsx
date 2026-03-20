'use client'

import dynamic from 'next/dynamic'

const Antigravity = dynamic(() => import('@/app/components/ui/antigravity'), { ssr: false })

export default function AntigravityDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <Antigravity />
    </div>
  )
}
