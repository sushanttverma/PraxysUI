import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "split-text",
title: "Split Text",
description:
  "GSAP SplitText-powered reveal animation with per-character, per-word, or per-line staggering and scroll trigger support.",
category: "text",
dependencies: ["gsap", "@gsap/react", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP)

export interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string | ((t: number) => number)
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  textAlign?: React.CSSProperties['textAlign']
  onLetterAnimationComplete?: () => void
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLElement | null>(null)
  const animationCompletedRef = useRef(false)
  const onCompleteRef = useRef(onLetterAnimationComplete)
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(() => document.fonts.status === 'loaded')

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete
  }, [onLetterAnimationComplete])

  useEffect(() => {
    if (document.fonts.status === 'loaded') return
    document.fonts.ready.then(() => setFontsLoaded(true))
  }, [])

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return
      if (animationCompletedRef.current) return

      const el = ref.current as HTMLElement & { _rbsplitInstance?: GSAPSplitText }
      if (el._rbsplitInstance) {
        try { el._rbsplitInstance.revert() } catch {}
        el._rbsplitInstance = undefined
      }

      const startPct = (1 - threshold) * 100
      const marginMatch = /^(-?\\d+(?:\\.\\d+)?)(px|em|rem|%)?$/.exec(rootMargin)
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px'
      const sign = marginValue === 0 ? '' : marginValue < 0 ? \`-=\${Math.abs(marginValue)}\${marginUnit}\` : \`+=\${marginValue}\${marginUnit}\`
      const start = \`top \${startPct}%\${sign}\`

      let targets: Element[] = []
      const assignTargets = (self: GSAPSplitText) => {
        if (splitType.includes('chars') && self.chars?.length) targets = self.chars
        if (!targets.length && splitType.includes('words') && self.words.length) targets = self.words
        if (!targets.length && splitType.includes('lines') && self.lines.length) targets = self.lines
        if (!targets.length) targets = self.chars || self.words || self.lines
      }

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: (self: GSAPSplitText) => {
          assignTargets(self)
          return gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4,
              },
              onComplete: () => {
                animationCompletedRef.current = true
                onCompleteRef.current?.()
              },
              willChange: 'transform, opacity',
              force3D: true,
            }
          )
        },
      })

      el._rbsplitInstance = splitInstance
      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill()
        })
        try { splitInstance.revert() } catch {}
        el._rbsplitInstance = undefined
      }
    },
    {
      dependencies: [text, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), threshold, rootMargin, fontsLoaded],
      scope: ref,
    }
  )

  const style: React.CSSProperties = { textAlign, wordWrap: 'break-word', willChange: 'transform, opacity' }
  const classes = \`split-parent overflow-hidden inline-block whitespace-normal \${className}\`
  const Tag = tag as React.ElementType

  return (
    <Tag ref={ref} style={style} className={classes}>
      {text}
    </Tag>
  )
}

export default SplitText`,
usage: `import SplitText from "@/app/components/ui/split-text"

export function Demo() {
  return (
    <SplitText
      text="Hello, Praxys."
      splitType="chars"
      delay={50}
      duration={1.25}
      ease="power3.out"
      className="text-4xl font-bold text-chalk"
    />
  )
}`,
props: [
  { name: "text", type: "string", default: "''", description: "The text content to animate." },
  { name: "className", type: "string", default: "''", description: "Additional classes applied to the text element." },
  { name: "delay", type: "number", default: "50", description: "Stagger delay in milliseconds between split items." },
  { name: "duration", type: "number", default: "1.25", description: "Duration of each split item animation in seconds." },
  { name: "ease", type: "string | Function", default: "'power3.out'", description: "GSAP easing function." },
  { name: "splitType", type: "'chars' | 'words' | 'lines' | 'words, chars'", default: "'chars'", description: "How text should be split before animation." },
  { name: "from", type: "gsap.TweenVars", default: "{ opacity: 0, y: 40 }", description: "Initial tween values for split targets." },
  { name: "to", type: "gsap.TweenVars", default: "{ opacity: 1, y: 0 }", description: "Target tween values for split targets." },
  { name: "threshold", type: "number", default: "0.1", description: "Visibility threshold used to trigger animation." },
  { name: "rootMargin", type: "string", default: "'-100px'", description: "Root margin offset used in start calculation." },
  { name: "tag", type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'", default: "'p'", description: "HTML tag used to render text." },
  { name: "textAlign", type: "CSSProperties['textAlign']", default: "'center'", description: "Text alignment." },
  { name: "onLetterAnimationComplete", type: "() => void", default: "undefined", description: "Callback fired once animation completes." },
],
playground: {
  controls: [
    { name: "text", label: "Text", type: "text", default: "Hello, Praxys." },
    { name: "delay", label: "Stagger Delay (ms)", type: "number", default: 50, min: 10, max: 500, step: 10 },
    { name: "duration", label: "Duration (s)", type: "number", default: 1.25, min: 0.1, max: 2, step: 0.1 },
    {
      name: "splitType",
      label: "Split Type",
      type: "select",
      default: "chars",
      options: ["chars", "words", "lines", "words, chars"],
    },
    {
      name: "ease",
      label: "Ease",
      type: "select",
      default: "power3.out",
      options: ["power3.out", "bounce.out", "elastic.out(1, 0.3)"],
    },
  ],
  defaults: {
    className: "text-4xl font-bold text-chalk",
  },
},
component: () => import("@/app/components/ui/split-text"),
demo: () => import("@/app/components/demos/split-text-demo"),
};

export default entry;
