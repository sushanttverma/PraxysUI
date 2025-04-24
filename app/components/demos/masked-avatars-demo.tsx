'use client'

import MaskedAvatars from '@/app/components/ui/masked-avatars'

const sampleAvatars = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
  { name: 'Diana' },
  { name: 'Eve' },
  { name: 'Frank' },
  { name: 'Grace' },
]

export default function MaskedAvatarsDemo() {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <MaskedAvatars avatars={sampleAvatars} max={5} size={44} />
      <MaskedAvatars avatars={sampleAvatars.slice(0, 3)} max={3} size={52} />
    </div>
  )
}
