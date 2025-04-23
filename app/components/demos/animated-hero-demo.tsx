'use client'

import AnimatedHero from '@/app/components/ui/animated-hero'

export default function AnimatedHeroDemo() {
  return (
    <div className="py-4">
      <AnimatedHero
        badge="New Release"
        title="Build Stunning Interfaces"
        subtitle="A collection of animated React components you can copy and paste into your projects. Open source. Customizable."
        primaryCta={{ label: 'Get Started', href: '#' }}
        secondaryCta={{ label: 'Browse Components', href: '#' }}
      />
    </div>
  )
}
