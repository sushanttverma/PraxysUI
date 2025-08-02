'use client'

import { useState } from 'react'
import OtpInput from '@/app/components/ui/otp-input'

export default function OtpInputDemo() {
  const [verificationCode, setVerificationCode] = useState('')
  const [pin, setPin] = useState('')

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-8 rounded-xl border border-border bg-obsidian p-6">
        {/* 6-digit verification code */}
        <div>
          <p className="mb-4 text-sm font-medium text-chalk text-center">
            Enter verification code
          </p>
          <OtpInput
            length={6}
            value={verificationCode}
            onChange={setVerificationCode}
          />
          <div className="mt-4 text-center">
            <p className="text-xs text-text-faint mb-1">Entered value:</p>
            <p className="text-sm font-mono text-ignite">
              {verificationCode || '(empty)'}
            </p>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* 4-digit PIN */}
        <div>
          <p className="mb-4 text-sm font-medium text-chalk text-center">
            Enter PIN
          </p>
          <OtpInput
            length={4}
            value={pin}
            onChange={setPin}
          />
          <div className="mt-4 text-center">
            <p className="text-xs text-text-faint mb-1">Entered PIN:</p>
            <p className="text-sm font-mono text-ignite">
              {pin ? '•'.repeat(pin.length) : '(empty)'}
            </p>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Instructions */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Instructions
          </p>
          <div className="space-y-2 text-xs text-text-faint">
            <p>• Type digits to fill the input boxes</p>
            <p>• Use Backspace to delete digits</p>
            <p>• Use Arrow keys to navigate between boxes</p>
            <p>• Paste a complete code to auto-fill all boxes</p>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Status */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Status
          </p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-text-faint">Verification code:</span>
              <span className={verificationCode.length === 6 ? 'text-green-400' : 'text-text-faint'}>
                {verificationCode.length === 6 ? 'Complete ✓' : `${verificationCode.length}/6`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-faint">PIN:</span>
              <span className={pin.length === 4 ? 'text-green-400' : 'text-text-faint'}>
                {pin.length === 4 ? 'Complete ✓' : `${pin.length}/4`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
