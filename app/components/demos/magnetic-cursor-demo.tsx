'use client'

import MagneticCursor from '@/app/components/ui/magnetic-cursor'

export default function MagneticCursorDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      <p className="text-sm text-blush">Hover near the elements below</p>
      <div className="flex items-center gap-12">
        <MagneticCursor strength={0.4} radius={150}>
          <button className="rounded-xl border border-ignite/30 bg-ignite/10 px-8 py-4 font-pixel text-lg text-ignite transition-colors hover:bg-ignite/20 cursor-pointer">
            Magnetic
          </button>
        </MagneticCursor>

        <MagneticCursor strength={0.25} radius={120}>
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-obsidian text-2xl text-chalk">
            ✦
          </div>
        </MagneticCursor>

        <MagneticCursor strength={0.5} radius={200}>
          <div className="rounded-lg border border-border bg-obsidian px-6 py-3 text-sm text-blush">
            Strong pull
          </div>
        </MagneticCursor>
      </div>
    </div>
  )
}
