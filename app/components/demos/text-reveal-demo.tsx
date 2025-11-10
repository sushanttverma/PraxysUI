'use client'

import TextReveal from '@/app/components/ui/text-reveal'

export default function TextRevealDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <TextReveal className="text-3xl font-bold text-chalk">
        Build stunning interfaces with Praxys UI
      </TextReveal>
      <TextReveal className="text-lg text-blush">
        Each word fades up as it enters the viewport creating a smooth staggered reveal effect
      </TextReveal>
      <TextReveal className="text-xl font-semibold text-ignite">
        Scroll triggered word by word animation
      </TextReveal>
    </div>
  )
}
