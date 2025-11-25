'use client'

import Aurora from '@/app/components/ui/aurora'

export default function AuroraDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Aurora className="h-64 w-full max-w-xl">
        <div className="flex h-full items-center justify-center">
          <p className="font-pixel text-2xl text-chalk drop-shadow-lg">
            Aurora Borealis
          </p>
        </div>
      </Aurora>
    </div>
  )
}
