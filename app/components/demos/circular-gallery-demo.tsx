'use client'

import CircularGallery from '@/app/components/ui/circular-gallery'

const items = [
  { image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: 'Lavender Dreams' },
  { image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', text: 'Rose Petal' },
  { image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', text: 'Ocean Breeze' },
  { image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', text: 'Mint Fresh' },
  { image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', text: 'Sunset Glow' },
  { image: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', text: 'Soft Lilac' },
  { image: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', text: 'Warm Peach' },
  { image: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', text: 'Sky Light' },
]

export default function CircularGalleryDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <CircularGallery
        items={items}
        radius={600}
        itemWidth={280}
        itemHeight={200}
        scrollSpeed={2}
        textColor="#ffffff"
        borderRadius={12}
      />
    </div>
  )
}
