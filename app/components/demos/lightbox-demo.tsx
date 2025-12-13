'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from '@/app/components/ui/lightbox'

const images = [
  { src: 'https://picsum.photos/seed/praxys1/800/600', alt: 'Mountain landscape' },
  { src: 'https://picsum.photos/seed/praxys2/800/600', alt: 'Ocean sunset' },
  { src: 'https://picsum.photos/seed/praxys3/800/600', alt: 'Forest path' },
  { src: 'https://picsum.photos/seed/praxys4/800/600', alt: 'City skyline' },
]

export default function LightboxDemo() {
  const [open, setOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-4 rounded-xl border border-border bg-obsidian p-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
          Click an image to open
        </p>
        <div className="grid grid-cols-2 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setStartIndex(i)
                setOpen(true)
              }}
              className="overflow-hidden rounded-lg border border-border transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ignite"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={225}
                className="aspect-video w-full object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        images={images}
        initialIndex={startIndex}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}
