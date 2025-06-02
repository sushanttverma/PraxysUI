'use client'

import ImageComparison from '@/app/components/ui/image-comparison'

const beforeSvg = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a1a2e"/>
        <stop offset="100%" style="stop-color:#16213e"/>
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#bg)"/>
    <text x="400" y="240" font-family="sans-serif" font-size="32" font-weight="bold" fill="#a0a0b0" text-anchor="middle">Before</text>
    <text x="400" y="280" font-family="sans-serif" font-size="16" fill="#606070" text-anchor="middle">Original version</text>
  </svg>`
)}`

const afterSvg = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0f2027"/>
        <stop offset="50%" style="stop-color:#203a43"/>
        <stop offset="100%" style="stop-color:#2c5364"/>
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#bg)"/>
    <text x="400" y="240" font-family="sans-serif" font-size="32" font-weight="bold" fill="#e0e0ff" text-anchor="middle">After</text>
    <text x="400" y="280" font-family="sans-serif" font-size="16" fill="#90b0c0" text-anchor="middle">Enhanced version</text>
  </svg>`
)}`

export default function ImageComparisonDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-xl mx-auto">
      <ImageComparison
        beforeSrc={beforeSvg}
        afterSrc={afterSvg}
        beforeAlt="Before enhancement"
        afterAlt="After enhancement"
        initialPosition={50}
      />
    </div>
  )
}
