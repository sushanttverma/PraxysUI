'use client'

import DisplacementText from '@/app/components/ui/displacement-text'

export default function DisplacementTextDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <DisplacementText text="PRAXYS" fontSize={72} depth={10} />
      <p className="text-sm text-blush">Move your cursor over the text</p>
    </div>
  )
}
