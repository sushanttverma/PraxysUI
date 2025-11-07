'use client'

import GradientText from '@/app/components/ui/gradient-text'

export default function GradientTextDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <h2 className="text-4xl font-bold">
        <GradientText>Praxys UI Components</GradientText>
      </h2>
      <p className="text-lg">
        Build{' '}
        <GradientText colors={['#8B5CF6', '#06B6D4', '#10B981']} speed={5}>
          beautiful interfaces
        </GradientText>{' '}
        with ease.
      </p>
      <h3 className="text-2xl font-semibold">
        <GradientText colors={['#F59E0B', '#EF4444', '#EC4899']} speed={2}>
          Fast and vibrant
        </GradientText>
      </h3>
    </div>
  )
}
