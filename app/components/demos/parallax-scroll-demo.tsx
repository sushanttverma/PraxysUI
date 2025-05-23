'use client'

import ParallaxScroll from '@/app/components/ui/parallax-scroll'

export default function ParallaxScrollDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <ParallaxScroll
        height="300px"
        layers={[
          {
            speed: 0.2,
            content: (
              <div className="text-[120px] font-pixel text-ignite/5 select-none">
                PRAXYS
              </div>
            ),
          },
          {
            speed: 0.5,
            content: (
              <div className="flex gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-16 w-16 rounded-lg border border-border bg-ignite/10" />
                ))}
              </div>
            ),
          },
          {
            speed: 0.8,
            content: (
              <p className="font-pixel text-xl text-chalk">Scroll to see parallax</p>
            ),
          },
        ]}
      />
    </div>
  )
}
