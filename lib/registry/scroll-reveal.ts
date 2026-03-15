import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "scroll-reveal",
title: "Scroll Reveal",
description:
  "GSAP ScrollTrigger text reveal with progressive word opacity, optional blur, and subtle rotational unwind.",
category: "text",
dependencies: ["gsap", "clsx", "tailwind-merge"],
code: `'use client'

import React, { useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  scrollContainerRef?: RefObject<HTMLElement | null>
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  containerClassName?: string
  textClassName?: string
  rotationEnd?: string
  wordAnimationEnd?: string
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null)

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : ''
    return text.split(/(\\s+)/).map((word, index) => {
      if (word.match(/^\\s+$/)) return word
      return (
        <span className="word inline-block" key={index}>
          {word}
        </span>
      )
    })
  }, [children])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scroller = scrollContainerRef?.current ?? window
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom',
            end: rotationEnd,
            scrub: true,
          },
        }
      )

      const wordElements = el.querySelectorAll<HTMLElement>('.word')
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      )

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: \`blur(\${blurStrength}px)\` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom-=20%',
              end: wordAnimationEnd,
              scrub: true,
            },
          }
        )
      }
    }, el)

    return () => ctx.revert()
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength])

  return (
    <h2 ref={containerRef} className={\`my-5 \${containerClassName}\`}>
      <p className={\`text-[clamp(1.6rem,4vw,3rem)] font-semibold leading-[1.5] \${textClassName}\`}>{splitText}</p>
    </h2>
  )
}

export default ScrollReveal`,
usage: `import ScrollReveal from "@/app/components/ui/scroll-reveal"

export function Demo() {
  return (
    <ScrollReveal baseOpacity={0.15} baseRotation={4} blurStrength={6}>
      Praxys helps teams ship tactile interfaces with expressive motion.
    </ScrollReveal>
  )
}`,
props: [
  { name: "children", type: "React.ReactNode", default: "required", description: "String text content to reveal on scroll." },
  { name: "scrollContainerRef", type: "RefObject<HTMLElement | null>", default: "undefined", description: "Optional custom scroll container reference." },
  { name: "enableBlur", type: "boolean", default: "true", description: "Enable blur-to-clear word transition." },
  { name: "baseOpacity", type: "number", default: "0.1", description: "Starting opacity for each word." },
  { name: "baseRotation", type: "number", default: "3", description: "Initial heading rotation in degrees." },
  { name: "blurStrength", type: "number", default: "4", description: "Initial blur radius in pixels." },
  { name: "containerClassName", type: "string", default: "''", description: "Additional classes for the wrapper heading." },
  { name: "textClassName", type: "string", default: "''", description: "Additional classes for the text element." },
  { name: "rotationEnd", type: "string", default: "'bottom bottom'", description: "ScrollTrigger end for rotation animation." },
  { name: "wordAnimationEnd", type: "string", default: "'bottom bottom'", description: "ScrollTrigger end for opacity/blur animation." },
],
playground: {
  controls: [
    {
      name: "children",
      label: "Text",
      type: "text",
      default: "Praxys helps teams ship tactile interfaces with expressive motion and handcrafted details.",
    },
    { name: "enableBlur", label: "Enable Blur", type: "boolean", default: true },
    { name: "baseOpacity", label: "Base Opacity", type: "number", default: 0.15, min: 0.05, max: 0.5, step: 0.01 },
    { name: "baseRotation", label: "Base Rotation", type: "number", default: 4, min: 0, max: 12, step: 0.5 },
    { name: "blurStrength", label: "Blur Strength", type: "number", default: 6, min: 0, max: 14, step: 1 },
  ],
  defaults: {
    textClassName: "text-chalk",
    containerClassName: "my-0",
  },
},
component: () => import("@/app/components/ui/scroll-reveal"),
demo: () => import("@/app/components/demos/scroll-reveal-demo"),
};

export default entry;
