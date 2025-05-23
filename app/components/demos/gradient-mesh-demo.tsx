'use client'

import GradientMesh from '@/app/components/ui/gradient-mesh'

export default function GradientMeshDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <GradientMesh className="h-64 w-full max-w-xl">
        <div className="flex h-full items-center justify-center">
          <p className="font-pixel text-2xl text-chalk drop-shadow-lg">
            Gradient Mesh
          </p>
        </div>
      </GradientMesh>
    </div>
  )
}
