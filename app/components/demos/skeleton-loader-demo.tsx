'use client'

import SkeletonLoader from '@/app/components/ui/skeleton-loader'

export default function SkeletonLoaderDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8 w-full max-w-md mx-auto">
      {/* Card skeleton */}
      <div className="w-full space-y-4">
        <SkeletonLoader variant="card" height={160} />
        <div className="flex items-center gap-3">
          <SkeletonLoader variant="avatar" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader variant="text" />
            <SkeletonLoader variant="text" width="60%" />
          </div>
        </div>
        <SkeletonLoader variant="text" count={3} />
        <div className="flex gap-2">
          <SkeletonLoader variant="button" />
          <SkeletonLoader variant="button" width={100} />
        </div>
      </div>
    </div>
  )
}
