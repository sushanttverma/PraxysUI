'use client'

import { useState } from 'react'
import { Mail, Lock, Search, Eye, EyeOff } from 'lucide-react'
import AnimatedInput from '@/app/components/ui/animated-input'

export default function AnimatedInputDemo() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [search, setSearch] = useState('')
  const [errorVal, setErrorVal] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-md mx-auto">
      <div className="w-full space-y-6 rounded-xl border border-border bg-obsidian p-6">
        {/* Default with icon */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            With Icons
          </p>
          <div className="space-y-4">
            <AnimatedInput
              label="Email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <AnimatedInput
              label="Password"
              placeholder="Enter password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />
            <AnimatedInput
              label="Search"
              placeholder="Type to search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Error state */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Error State
          </p>
          <AnimatedInput
            label="Username"
            placeholder="Choose a username"
            value={errorVal}
            onChange={(e) => setErrorVal(e.target.value)}
            error={errorVal.length > 0 && errorVal.length < 3 ? 'Username must be at least 3 characters' : undefined}
          />
        </div>

        <div className="h-px bg-border" />

        {/* Sizes */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Sizes
          </p>
          <div className="space-y-4">
            <AnimatedInput label="Small" size="sm" value="" onChange={() => {}} />
            <AnimatedInput label="Medium (default)" size="md" value="" onChange={() => {}} />
            <AnimatedInput label="Large" size="lg" value="" onChange={() => {}} />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Disabled */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-faint">
            Disabled
          </p>
          <AnimatedInput
            label="Disabled field"
            value="Cannot edit this"
            disabled
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
