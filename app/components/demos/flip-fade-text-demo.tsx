'use client'

import FlipFadeText from '@/app/components/ui/flip-fade-text'

export default function FlipFadeTextDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <h2 className="font-pixel text-3xl font-bold text-chalk">
        Build{' '}
        <FlipFadeText
          words={['beautiful', 'stunning', 'modern', 'elegant']}
          className="text-ignite"
          interval={2500}
        />{' '}
        interfaces
      </h2>
      <p className="text-blush">
        We make{' '}
        <FlipFadeText
          words={['React', 'Next.js', 'Tailwind', 'TypeScript']}
          className="font-semibold text-chalk"
          interval={2000}
        />{' '}
        components easy.
      </p>
    </div>
  )
}
