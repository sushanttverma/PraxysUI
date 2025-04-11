'use client'

import AnimatedButton from '@/app/components/ui/animated-button'

export default function AnimatedButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-8">
      <AnimatedButton>Get Started</AnimatedButton>
      <AnimatedButton className="bg-transparent border-blush/30 text-blush">
        Learn More
      </AnimatedButton>
    </div>
  )
}
