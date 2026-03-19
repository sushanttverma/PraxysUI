'use client'

import Masonry, { type MasonryItem } from '@/app/components/ui/masonry'

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #f5576c 0%, #ff6a88 100%)',
  'linear-gradient(135deg, #667eea 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
]

const labels = [
  'Design', 'Create', 'Build', 'Ship',
  'Explore', 'Iterate', 'Launch', 'Scale',
  'Dream', 'Craft', 'Polish', 'Deploy',
]

const heights = [200, 280, 180, 320, 240, 160, 300, 220, 350, 190, 260, 150]

const items: MasonryItem[] = heights.map((h, i) => ({
  id: i + 1,
  height: h,
  content: (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: gradients[i],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <span
        style={{
          color: 'white',
          fontSize: '1.25rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          textShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        {labels[i]}
      </span>
      <span
        style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.8rem',
        }}
      >
        {h}px
      </span>
    </div>
  ),
}))

export default function MasonryDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <Masonry
        items={items}
        columnCount={0}
        gap={12}
        animationDuration={0.6}
        stagger={0.05}
        scaleOnHover
      />
    </div>
  )
}
