'use client'

import MorphingText from '@/app/components/ui/morphing-text'

export default function MorphingTextDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <div className="text-3xl font-bold text-chalk">
        We make it{' '}
        <MorphingText
          words={['simple', 'beautiful', 'powerful', 'fast']}
          className="text-ignite"
        />
      </div>
      <MorphingText
        words={['React', 'Next.js', 'Tailwind', 'Framer Motion']}
        className="font-pixel text-4xl text-chalk"
        interval={2500}
        morphDuration={1200}
      />
    </div>
  )
}
