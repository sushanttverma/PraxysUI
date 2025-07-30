'use client'

import { useState } from 'react'
import Pagination from '@/app/components/ui/pagination'

export default function PaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 20

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Main pagination */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Pagination
          </p>
          <p className="mb-4 text-center text-sm text-chalk">
            Page <span className="text-ignite font-semibold">{currentPage}</span> of{' '}
            <span className="text-text-faint">{totalPages}</span>
          </p>
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Small size */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Small Size
          </p>
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              size="sm"
            />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Quick jump */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Quick Jump
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[1, 5, 10, 15, 20].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className="rounded-lg border border-border bg-obsidian px-3 py-1.5 text-xs text-text-faint transition-colors hover:border-border-light hover:text-chalk"
              >
                Go to {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
