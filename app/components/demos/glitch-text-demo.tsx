'use client'

import GlitchText from '@/app/components/ui/glitch-text'

export default function GlitchTextDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <h2 className="text-4xl font-bold text-chalk">
        <GlitchText intensity="low">Low Glitch</GlitchText>
      </h2>
      <h2 className="text-4xl font-bold text-ignite">
        <GlitchText intensity="medium">Medium Glitch</GlitchText>
      </h2>
      <h2 className="text-4xl font-bold text-blush">
        <GlitchText intensity="high">High Glitch</GlitchText>
      </h2>
    </div>
  )
}
