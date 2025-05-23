'use client'

import TypewriterText from '@/app/components/ui/typewriter-text'

export default function TypewriterTextDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <div className="text-2xl font-bold text-chalk">
        I build{' '}
        <TypewriterText
          strings={['websites', 'components', 'experiences', 'interfaces']}
          className="text-ignite"
        />
      </div>
      <TypewriterText
        strings={['npx praxys-ui init', 'npx praxys-ui add typewriter-text']}
        className="font-mono text-sm text-blush"
        typingSpeed={60}
        cursorColor="#C9958A"
      />
    </div>
  )
}
