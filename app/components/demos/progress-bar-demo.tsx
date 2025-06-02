'use client'

import ProgressBar from '@/app/components/ui/progress-bar'

export default function ProgressBarDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-8">
        <ProgressBar
          value={25}
          size="sm"
          label="Storage"
          showValue
        />

        <ProgressBar
          value={60}
          size="md"
          label="Upload Progress"
          showValue
          color="#f97316"
        />

        <ProgressBar
          value={90}
          size="lg"
          label="Course Completion"
          showValue
        />
      </div>
    </div>
  )
}
