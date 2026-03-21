'use client'

import MagicBento from '@/app/components/ui/magic-bento'

export default function MagicBentoDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <MagicBento
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        glowColor="224, 78, 45"
      />
    </div>
  )
}
