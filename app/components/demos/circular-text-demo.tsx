'use client'

import CircularText from '@/app/components/ui/circular-text'

export default function CircularTextDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <CircularText
        text="Praxys UI • Animated Components • "
        centerText="Praxys"
        className="h-52 w-52"
        textClassName="text-sm tracking-[0.08em] text-chalk"
      />

      <CircularText
        text="Hover me to rotate • Hover me to rotate • "
        centerText="Hover"
        radius={72}
        spinDuration={12}
        onHover
        className="h-44 w-44"
        textClassName="text-xs uppercase tracking-[0.16em] text-ignite"
      />
    </div>
  )
}
