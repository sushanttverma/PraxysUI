'use client'

import ScrollStack, { ScrollStackItem } from '@/app/components/ui/scroll-stack'

const cards = [
  {
    label: 'Card 1',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    label: 'Card 2',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    label: 'Card 3',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    label: 'Card 4',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
]

export default function ScrollStackDemo() {
  return (
    <div className="w-full">
      <ScrollStack
        itemHeight={280}
        spacing={120}
        baseScale={0.85}
        scaleIncrement={0.03}
        rotationAmount={2}
      >
        {cards.map((card) => (
          <ScrollStackItem key={card.label}>
            <div
              className="flex h-full w-full items-center justify-center rounded-2xl shadow-lg"
              style={{ background: card.gradient }}
            >
              <span className="text-3xl font-bold text-white drop-shadow-md">
                {card.label}
              </span>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  )
}
