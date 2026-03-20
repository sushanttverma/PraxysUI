'use client'

import dynamic from 'next/dynamic'

const SplashCursor = dynamic(() => import('@/app/components/ui/splash-cursor'), { ssr: false })

export default function SplashCursorDemo() {
  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl mx-auto">
      <SplashCursor />
    </div>
  )
}
