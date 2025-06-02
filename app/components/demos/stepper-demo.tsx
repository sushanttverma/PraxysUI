'use client'

import { useState } from 'react'
import Stepper from '@/app/components/ui/stepper'

const steps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Set up your profile' },
  { label: 'Billing', description: 'Add payment method' },
  { label: 'Complete', description: 'Review & finish' },
]

export default function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(2)

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-xl mx-auto">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        orientation="horizontal"
      />

      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          className="rounded-lg border border-border bg-obsidian px-4 py-2 text-sm font-medium text-chalk transition-colors hover:bg-ignite/10 hover:border-ignite disabled:opacity-40 disabled:pointer-events-none"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={currentStep === steps.length - 1}
          className="rounded-lg bg-ignite px-4 py-2 text-sm font-medium text-chalk transition-colors hover:bg-ignite/90 disabled:opacity-40 disabled:pointer-events-none"
        >
          Next
        </button>
      </div>
    </div>
  )
}
