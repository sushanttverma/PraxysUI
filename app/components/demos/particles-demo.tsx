'use client'

import Particles from '@/app/components/ui/particles'

export default function ParticlesDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Particles
        count={30}
        color="#E84E2D"
        speed={6}
        size={4}
        className="h-64 w-full max-w-xl"
      />
    </div>
  )
}
