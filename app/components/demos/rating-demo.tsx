'use client'

import { useState } from 'react'
import Rating from '@/app/components/ui/rating'

export default function RatingDemo() {
  const [userRating, setUserRating] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-8 rounded-xl border border-border bg-obsidian p-6">
        {/* Interactive rating */}
        <div>
          <p className="mb-4 text-sm font-medium text-chalk text-center">
            Rate your experience
          </p>
          <div className="flex justify-center">
            <Rating
              value={userRating}
              onChange={setUserRating}
              max={5}
              allowHalf={true}
              size="md"
            />
          </div>
          <p className="mt-3 text-center text-sm text-text-faint">
            Your rating: <span className="text-ignite font-semibold">{userRating > 0 ? `${userRating} / 5` : 'Not rated yet'}</span>
          </p>
        </div>

        <div className="h-px bg-border" />

        {/* Read-only display */}
        <div>
          <p className="mb-4 text-sm font-medium text-chalk text-center">
            Product rating (read-only)
          </p>
          <div className="flex justify-center">
            <Rating
              value={4.5}
              readOnly={true}
              max={5}
              allowHalf={true}
              size="md"
            />
          </div>
          <p className="mt-3 text-center text-sm text-text-faint">
            Average rating: <span className="text-ignite font-semibold">4.5 / 5</span>
          </p>
        </div>

        <div className="h-px bg-border" />

        {/* Size variants */}
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-text-faint text-center">
            Size Variants
          </p>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs text-text-faint text-center">Small</p>
              <div className="flex justify-center">
                <Rating
                  value={4}
                  readOnly={true}
                  max={5}
                  size="sm"
                />
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs text-text-faint text-center">Medium (default)</p>
              <div className="flex justify-center">
                <Rating
                  value={4}
                  readOnly={true}
                  max={5}
                  size="md"
                />
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs text-text-faint text-center">Large</p>
              <div className="flex justify-center">
                <Rating
                  value={4}
                  readOnly={true}
                  max={5}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Rating breakdown */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Rating Breakdown
          </p>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-xs text-text-faint w-6">{stars} ★</span>
                <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-ignite rounded-full"
                    style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%` }}
                  />
                </div>
                <span className="text-xs text-text-faint w-8 text-right">
                  {stars === 5 ? '70' : stars === 4 ? '20' : stars === 3 ? '5' : stars === 2 ? '3' : '2'}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
