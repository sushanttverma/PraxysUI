'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { AnimationConfig } from './AnimationStudio'
import { componentRegistry } from '@/lib/registry'

interface CodeGeneratorProps {
  component: string
  config: AnimationConfig
  onClose: () => void
}

interface AnimateObject {
  x?: number
  y?: number
  scale?: number
  rotate?: number
  opacity?: number
}

interface TransitionObject {
  duration: number
  delay?: number
  ease?: string
  type?: string
  stiffness?: number
  damping?: number
  mass?: number
  repeat?: number | string
  repeatType?: string
  repeatDelay?: number
}

export default function CodeGenerator({ component, config, onClose }: CodeGeneratorProps) {
  const [copied, setCopied] = useState(false)
  const [codeType, setCodeType] = useState<'framer' | 'css'>('framer')

  const componentEntry = componentRegistry[component]

  // Generate Framer Motion code
  const generateFramerCode = () => {
    const animateObj: AnimateObject = {}
    if (config.x !== 0) animateObj.x = config.x
    if (config.y !== 0) animateObj.y = config.y
    if (config.scale !== 1) animateObj.scale = config.scale
    if (config.rotate !== 0) animateObj.rotate = config.rotate
    if (config.opacity !== 1) animateObj.opacity = config.opacity

    const transitionObj: TransitionObject = {
      duration: config.duration,
    }
    if (config.delay > 0) transitionObj.delay = config.delay

    if (config.type === 'tween') {
      transitionObj.ease = `"${config.ease}"`
    } else if (config.type === 'spring') {
      transitionObj.type = '"spring"'
      transitionObj.stiffness = config.stiffness
      transitionObj.damping = config.damping
      transitionObj.mass = config.mass
    } else if (config.type === 'inertia') {
      transitionObj.type = '"inertia"'
    }

    if (config.repeat !== 0) {
      transitionObj.repeat = config.repeat === -1 ? 'Infinity' : config.repeat
      transitionObj.repeatType = `"${config.repeatType}"`
      if (config.repeatDelay > 0) transitionObj.repeatDelay = config.repeatDelay
    }

    const animateStr = JSON.stringify(animateObj, null, 2)
    const transitionStr = JSON.stringify(transitionObj, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/: "([^"]+)"/g, ': $1')

    return `import { motion } from 'framer-motion'

export default function AnimatedComponent() {
  return (
    <motion.div
      initial={{
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
      }}
      animate={${animateStr}}
      transition={${transitionStr}}
    >
      {/* Your ${componentEntry?.title || 'component'} here */}
    </motion.div>
  )
}`
  }

  // Generate CSS animation code
  const generateCSSCode = () => {
    const transforms = []
    if (config.x !== 0) transforms.push(`translateX(${config.x}px)`)
    if (config.y !== 0) transforms.push(`translateY(${config.y}px)`)
    if (config.scale !== 1) transforms.push(`scale(${config.scale})`)
    if (config.rotate !== 0) transforms.push(`rotate(${config.rotate}deg)`)

    const transformStr = transforms.length > 0 ? transforms.join(' ') : 'none'
    const easingMap: Record<string, string> = {
      linear: 'linear',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      circIn: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
      circOut: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      circInOut: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
      backIn: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
      backOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      backInOut: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      anticipate: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    }
    const easing = easingMap[config.ease] || 'ease'

    return `/* CSS Animation */
@keyframes customAnimation {
  from {
    transform: translateX(0) translateY(0) scale(1) rotate(0deg);
    opacity: 1;
  }
  to {
    transform: ${transformStr};
    opacity: ${config.opacity};
  }
}

.animated-element {
  animation-name: customAnimation;
  animation-duration: ${config.duration}s;
  animation-delay: ${config.delay}s;
  animation-timing-function: ${easing};
  animation-iteration-count: ${config.repeat === -1 ? 'infinite' : config.repeat === 0 ? '1' : config.repeat + 1};
  animation-direction: ${config.repeatType === 'reverse' ? 'alternate' : 'normal'};
  animation-fill-mode: forwards;
}

/* Usage */
<div class="animated-element">
  <!-- Your ${componentEntry?.title || 'component'} here -->
</div>`
  }

  const code = codeType === 'framer' ? generateFramerCode() : generateCSSCode()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-obsidian border border-border rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-chalk">Generated Code</h2>
            <p className="text-sm text-text-faint mt-1">
              Copy and paste into your project
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-border/20 text-text-faint hover:text-chalk transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Code Type Selector */}
        <div className="px-6 pt-4 flex gap-2">
          <button
            onClick={() => setCodeType('framer')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              codeType === 'framer'
                ? 'bg-ignite text-white'
                : 'bg-border/20 text-text-faint hover:bg-border/40'
            )}
          >
            Framer Motion
          </button>
          <button
            onClick={() => setCodeType('css')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              codeType === 'css'
                ? 'bg-ignite text-white'
                : 'bg-border/20 text-text-faint hover:bg-border/40'
            )}
          >
            CSS Animation
          </button>
        </div>

        {/* Code Display */}
        <div className="flex-1 overflow-auto p-6">
          <div className="relative">
            <pre className="bg-black/40 rounded-lg p-4 text-sm text-chalk font-mono overflow-x-auto border border-border/50">
              <code>{code}</code>
            </pre>
            <button
              onClick={handleCopy}
              className={cn(
                'absolute top-3 right-3 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                copied
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'bg-ignite/10 text-ignite border border-ignite/50 hover:bg-ignite/20'
              )}
            >
              {copied ? (
                <span className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Copied!
                </span>
              ) : (
                'Copy Code'
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-border/5">
          <div className="flex items-center gap-2 text-xs text-text-faint">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <span>
              Make sure to install{' '}
              <code className="px-1.5 py-0.5 rounded bg-border/40 text-chalk font-mono">
                framer-motion
              </code>{' '}
              for Framer Motion code
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
