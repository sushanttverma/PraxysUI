'use client'

import NoiseTexture from '@/app/components/ui/noise-texture'

export default function NoiseTextureDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-obsidian">
        <NoiseTexture opacity={0.05} speed={8} />
        <div className="relative z-10 flex h-full items-center justify-center">
          <p className="font-pixel text-2xl text-chalk">Noise Texture</p>
        </div>
      </div>
    </div>
  )
}
