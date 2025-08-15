'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { AnimationConfig, MotionState, TransitionConfig } from './AnimationStudio'
import { componentRegistry } from '@/lib/registry'

interface CodeGeneratorProps {
  component: string
  config: AnimationConfig
  onClose: () => void
}

/* ─── Helpers ────────────────────────────────────────────── */

function stateToString(state: MotionState, indent: number): string {
  const pad = ' '.repeat(indent)
  const entries = Object.entries(state).filter(
    ([, v]) => v !== 0 && v !== 1 // skip default-looking values
  )
  // Always include at least opacity if nothing else
  if (entries.length === 0 && state.opacity !== 1) {
    entries.push(['opacity', state.opacity])
  }
  if (entries.length === 0) {
    // all defaults — include a minimal representation
    return `${pad}{ opacity: ${state.opacity}, scale: ${state.scale} }`
  }
  const inner = entries.map(([k, v]) => `${pad}  ${k}: ${v},`).join('\n')
  return `${pad}{\n${inner}\n${pad}}`
}

function transitionToString(t: TransitionConfig, indent: number): string {
  const pad = ' '.repeat(indent)
  const lines: string[] = []

  if (t.type === 'spring') {
    lines.push(`type: "spring"`)
    lines.push(`stiffness: ${t.stiffness}`)
    lines.push(`damping: ${t.damping}`)
    lines.push(`mass: ${t.mass}`)
  } else {
    lines.push(`duration: ${t.duration}`)
    lines.push(`ease: "${t.ease}"`)
  }

  if (t.delay > 0) lines.push(`delay: ${t.delay}`)

  if (t.repeat !== 0) {
    lines.push(`repeat: ${t.repeat === -1 ? 'Infinity' : t.repeat}`)
    lines.push(`repeatType: "${t.repeatType}"`)
    if (t.repeatDelay > 0) lines.push(`repeatDelay: ${t.repeatDelay}`)
  }

  const inner = lines.map((l) => `${pad}  ${l},`).join('\n')
  return `${pad}{\n${inner}\n${pad}}`
}

function generateCSSCode(config: AnimationConfig, title: string): string {
  const { initial, animate, transition: t } = config

  const buildTransform = (s: MotionState) => {
    const parts: string[] = []
    if (s.x !== 0) parts.push(`translateX(${s.x}px)`)
    if (s.y !== 0) parts.push(`translateY(${s.y}px)`)
    if (s.scale !== 1) parts.push(`scale(${s.scale})`)
    if (s.rotate !== 0) parts.push(`rotate(${s.rotate}deg)`)
    if (s.skewX !== 0) parts.push(`skewX(${s.skewX}deg)`)
    if (s.skewY !== 0) parts.push(`skewY(${s.skewY}deg)`)
    return parts.length ? parts.join(' ') : 'none'
  }

  const easingMap: Record<string, string> = {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    backOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    backIn: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    backInOut: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }

  return `/* CSS Animation — ${title} */
@keyframes customAnimation {
  from {
    transform: ${buildTransform(initial)};
    opacity: ${initial.opacity};
  }
  to {
    transform: ${buildTransform(animate)};
    opacity: ${animate.opacity};
  }
}

.animated-element {
  animation: customAnimation ${t.duration}s ${easingMap[t.ease] || 'ease'} ${t.delay}s ${
    t.repeat === -1 ? 'infinite' : t.repeat === 0 ? '1' : t.repeat + 1
  } ${t.repeatType === 'mirror' || t.repeatType === 'reverse' ? 'alternate' : 'normal'} forwards;
}`
}

/* ─── Component ──────────────────────────────────────────── */

export default function CodeGenerator({ component, config, onClose }: CodeGeneratorProps) {
  const [copied, setCopied] = useState(false)
  const [codeType, setCodeType] = useState<'framer' | 'css'>('framer')

  const entry = componentRegistry[component]
  const title = entry?.title || component

  const framerCode = `import { motion } from "framer-motion"

export default function Animated${title.replace(/\s/g, '')}() {
  return (
    <motion.div
      initial={${stateToString(config.initial, 6)}}
      animate={${stateToString(config.animate, 6)}}
      transition={${transitionToString(config.transition, 6)}}
    >
      {/* Your ${title} component here */}
    </motion.div>
  )
}`

  const cssCode = generateCSSCode(config, title)
  const code = codeType === 'framer' ? framerCode : cssCode

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
        <div className="p-6 border-b border-border flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-chalk">Generated Code</h2>
            <p className="text-sm text-text-faint mt-1">Copy and paste into your project</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-border/20 text-text-faint hover:text-chalk transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4 flex gap-2 flex-shrink-0">
          {(['framer', 'css'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setCodeType(t)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                codeType === t
                  ? 'bg-ignite text-white'
                  : 'bg-border/20 text-text-faint hover:bg-border/40'
              )}
            >
              {t === 'framer' ? 'Framer Motion' : 'CSS Animation'}
            </button>
          ))}
        </div>

        {/* Code */}
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
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-border/5 flex-shrink-0">
          <p className="text-xs text-text-faint">
            {codeType === 'framer'
              ? 'Requires framer-motion — npm install framer-motion'
              : 'Pure CSS — no dependencies required'}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
