import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "fuzzy-text",
title: "Fuzzy Text",
description:
  "Canvas-powered text distortion effect with hover-reactive intensity, glitch mode, and directional fuzzing.",
category: "text",
dependencies: ["clsx", "tailwind-merge"],
code: `'use client'

import React, { useEffect, useRef } from 'react'

interface FuzzyTextProps {
  children: React.ReactNode
  fontSize?: number | string
  fontWeight?: string | number
  fontFamily?: string
  color?: string
  enableHover?: boolean
  baseIntensity?: number
  hoverIntensity?: number
  fuzzRange?: number
  fps?: number
  direction?: 'horizontal' | 'vertical' | 'both'
  transitionDuration?: number
  clickEffect?: boolean
  glitchMode?: boolean
  glitchInterval?: number
  glitchDuration?: number
  gradient?: string[] | null
  letterSpacing?: number
  className?: string
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  fontSize = 'clamp(2rem, 8vw, 8rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  color = '#fff',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  fuzzRange = 30,
  fps = 60,
  direction = 'horizontal',
  transitionDuration = 0,
  clickEffect = false,
  glitchMode = false,
  glitchInterval = 2000,
  glitchDuration = 200,
  gradient = null,
  letterSpacing = 0,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement & { cleanupFuzzyText?: () => void }>(null)

  useEffect(() => {
    let animationFrameId = 0
    let isCancelled = false
    let glitchTimeoutId: ReturnType<typeof setTimeout>
    let glitchEndTimeoutId: ReturnType<typeof setTimeout>
    let clickTimeoutId: ReturnType<typeof setTimeout>
    const canvas = canvasRef.current
    if (!canvas) return

    const init = async () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const computedFontFamily =
        fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily

      const fontSizeStr = typeof fontSize === 'number' ? \`\${fontSize}px\` : fontSize
      const fontString = \`\${fontWeight} \${fontSizeStr} \${computedFontFamily}\`

      try {
        await document.fonts.load(fontString)
      } catch {
        await document.fonts.ready
      }
      if (isCancelled) return

      let numericFontSize = 0
      if (typeof fontSize === 'number') {
        numericFontSize = fontSize
      } else {
        const temp = document.createElement('span')
        temp.style.fontSize = fontSize
        document.body.appendChild(temp)
        numericFontSize = parseFloat(window.getComputedStyle(temp).fontSize)
        document.body.removeChild(temp)
      }

      const text = React.Children.toArray(children).join('')
      const offscreen = document.createElement('canvas')
      const offCtx = offscreen.getContext('2d')
      if (!offCtx) return

      offCtx.font = \`\${fontWeight} \${fontSizeStr} \${computedFontFamily}\`
      offCtx.textBaseline = 'alphabetic'

      let totalWidth = 0
      if (letterSpacing !== 0) {
        for (const char of text) totalWidth += offCtx.measureText(char).width + letterSpacing
        totalWidth -= letterSpacing
      } else {
        totalWidth = offCtx.measureText(text).width
      }

      const metrics = offCtx.measureText(text)
      const actualLeft = metrics.actualBoundingBoxLeft ?? 0
      const actualRight = letterSpacing !== 0 ? totalWidth : (metrics.actualBoundingBoxRight ?? metrics.width)
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2
      const textBoundingWidth = Math.ceil(letterSpacing !== 0 ? totalWidth : actualLeft + actualRight)
      const tightHeight = Math.ceil(actualAscent + actualDescent)
      const extraWidthBuffer = 10
      const offscreenWidth = textBoundingWidth + extraWidthBuffer

      offscreen.width = offscreenWidth
      offscreen.height = tightHeight

      const xOffset = extraWidthBuffer / 2
      offCtx.font = \`\${fontWeight} \${fontSizeStr} \${computedFontFamily}\`
      offCtx.textBaseline = 'alphabetic'

      if (gradient && Array.isArray(gradient) && gradient.length >= 2) {
        const grad = offCtx.createLinearGradient(0, 0, offscreenWidth, 0)
        gradient.forEach((c, i) => grad.addColorStop(i / (gradient.length - 1), c))
        offCtx.fillStyle = grad
      } else {
        offCtx.fillStyle = color
      }

      if (letterSpacing !== 0) {
        let xPos = xOffset
        for (const char of text) {
          offCtx.fillText(char, xPos, actualAscent)
          xPos += offCtx.measureText(char).width + letterSpacing
        }
      } else {
        offCtx.fillText(text, xOffset - actualLeft, actualAscent)
      }

      const horizontalMargin = fuzzRange + 20
      const verticalMargin = direction === 'vertical' || direction === 'both' ? fuzzRange + 10 : 0
      canvas.width = offscreenWidth + horizontalMargin * 2
      canvas.height = tightHeight + verticalMargin * 2
      ctx.translate(horizontalMargin, verticalMargin)

      const interactiveLeft = horizontalMargin + xOffset
      const interactiveTop = verticalMargin
      const interactiveRight = interactiveLeft + textBoundingWidth
      const interactiveBottom = interactiveTop + tightHeight

      let isHovering = false
      let isClicking = false
      let isGlitching = false
      let currentIntensity = baseIntensity
      let targetIntensity = baseIntensity
      let lastFrameTime = 0
      const frameDuration = 1000 / fps

      const startGlitchLoop = () => {
        if (!glitchMode || isCancelled) return
        glitchTimeoutId = setTimeout(() => {
          if (isCancelled) return
          isGlitching = true
          glitchEndTimeoutId = setTimeout(() => {
            isGlitching = false
            startGlitchLoop()
          }, glitchDuration)
        }, glitchInterval)
      }

      if (glitchMode) startGlitchLoop()

      const run = (timestamp: number) => {
        if (isCancelled) return
        if (timestamp - lastFrameTime < frameDuration) {
          animationFrameId = window.requestAnimationFrame(run)
          return
        }

        lastFrameTime = timestamp
        ctx.clearRect(-fuzzRange - 20, -fuzzRange - 10, offscreenWidth + 2 * (fuzzRange + 20), tightHeight + 2 * (fuzzRange + 10))
        if (isClicking || isGlitching) targetIntensity = 1
        else if (isHovering) targetIntensity = hoverIntensity
        else targetIntensity = baseIntensity

        if (transitionDuration > 0) {
          const step = 1 / (transitionDuration / frameDuration)
          if (currentIntensity < targetIntensity) currentIntensity = Math.min(currentIntensity + step, targetIntensity)
          else if (currentIntensity > targetIntensity) currentIntensity = Math.max(currentIntensity - step, targetIntensity)
        } else {
          currentIntensity = targetIntensity
        }

        for (let j = 0; j < tightHeight; j++) {
          let dx = 0
          let dy = 0
          if (direction === 'horizontal' || direction === 'both') dx = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange)
          if (direction === 'vertical' || direction === 'both') dy = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange * 0.5)
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j + dy, offscreenWidth, 1)
        }
        animationFrameId = window.requestAnimationFrame(run)
      }

      animationFrameId = window.requestAnimationFrame(run)

      const isInsideTextArea = (x: number, y: number) => x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom
      const handleMouseMove = (e: MouseEvent) => {
        if (!enableHover) return
        const rect = canvas.getBoundingClientRect()
        isHovering = isInsideTextArea(e.clientX - rect.left, e.clientY - rect.top)
      }
      const handleMouseLeave = () => { isHovering = false }
      const handleClick = () => {
        if (!clickEffect) return
        isClicking = true
        clearTimeout(clickTimeoutId)
        clickTimeoutId = setTimeout(() => { isClicking = false }, 150)
      }
      const handleTouchMove = (e: TouchEvent) => {
        if (!enableHover) return
        e.preventDefault()
        const rect = canvas.getBoundingClientRect()
        const touch = e.touches[0]
        isHovering = isInsideTextArea(touch.clientX - rect.left, touch.clientY - rect.top)
      }
      const handleTouchEnd = () => { isHovering = false }

      if (enableHover) {
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseleave', handleMouseLeave)
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
        canvas.addEventListener('touchend', handleTouchEnd)
      }
      if (clickEffect) canvas.addEventListener('click', handleClick)

      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId)
        clearTimeout(glitchTimeoutId)
        clearTimeout(glitchEndTimeoutId)
        clearTimeout(clickTimeoutId)
        if (enableHover) {
          canvas.removeEventListener('mousemove', handleMouseMove)
          canvas.removeEventListener('mouseleave', handleMouseLeave)
          canvas.removeEventListener('touchmove', handleTouchMove)
          canvas.removeEventListener('touchend', handleTouchEnd)
        }
        if (clickEffect) canvas.removeEventListener('click', handleClick)
      }

      canvas.cleanupFuzzyText = cleanup
    }

    init()

    return () => {
      isCancelled = true
      window.cancelAnimationFrame(animationFrameId)
      clearTimeout(glitchTimeoutId)
      clearTimeout(glitchEndTimeoutId)
      clearTimeout(clickTimeoutId)
      if (canvas?.cleanupFuzzyText) canvas.cleanupFuzzyText()
    }
  }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity, fuzzRange, fps, direction, transitionDuration, clickEffect, glitchMode, glitchInterval, glitchDuration, gradient, letterSpacing])

  return <canvas ref={canvasRef} className={className} />
}

export default FuzzyText`,
usage: `import FuzzyText from "@/app/components/ui/fuzzy-text"

export function Demo() {
  return (
    <FuzzyText
      baseIntensity={0.18}
      hoverIntensity={0.5}
      fuzzRange={30}
      fontSize="clamp(2.6rem, 8vw, 5.8rem)"
      fontWeight={900}
    >
      Praxys
    </FuzzyText>
  )
}`,
props: [
  { name: "children", type: "React.ReactNode", default: "required", description: "Text content rendered into the canvas." },
  { name: "fontSize", type: "number | string", default: "'clamp(2rem, 8vw, 8rem)'", description: "Canvas text size." },
  { name: "fontWeight", type: "number | string", default: "900", description: "Text weight used in canvas drawing." },
  { name: "fontFamily", type: "string", default: "'inherit'", description: "Font family for rendered text." },
  { name: "color", type: "string", default: "'#fff'", description: "Text fill color when no gradient is set." },
  { name: "enableHover", type: "boolean", default: "true", description: "Enable hover reactivity on the text area." },
  { name: "baseIntensity", type: "number", default: "0.18", description: "Base fuzz intensity." },
  { name: "hoverIntensity", type: "number", default: "0.5", description: "Hover fuzz intensity." },
  { name: "fuzzRange", type: "number", default: "30", description: "Maximum displacement range in pixels." },
  { name: "fps", type: "number", default: "60", description: "Target draw FPS." },
  { name: "direction", type: "'horizontal' | 'vertical' | 'both'", default: "'horizontal'", description: "Distortion axis." },
  { name: "transitionDuration", type: "number", default: "0", description: "Smoothing time for intensity changes (ms)." },
  { name: "clickEffect", type: "boolean", default: "false", description: "Temporarily spikes intensity on click." },
  { name: "glitchMode", type: "boolean", default: "false", description: "Auto glitch spikes over time." },
  { name: "glitchInterval", type: "number", default: "2000", description: "Interval between glitch spikes (ms)." },
  { name: "glitchDuration", type: "number", default: "200", description: "Glitch spike duration (ms)." },
  { name: "gradient", type: "string[] | null", default: "null", description: "Optional horizontal gradient colors." },
  { name: "letterSpacing", type: "number", default: "0", description: "Additional letter spacing in pixels." },
  { name: "className", type: "string", default: "''", description: "Additional classes for the canvas element." },
],
playground: {
  controls: [
    { name: "children", label: "Text", type: "text", default: "Praxys" },
    { name: "baseIntensity", label: "Base Intensity", type: "number", default: 0.18, min: 0.02, max: 0.4, step: 0.01 },
    { name: "hoverIntensity", label: "Hover Intensity", type: "number", default: 0.5, min: 0.1, max: 1, step: 0.01 },
    { name: "fuzzRange", label: "Fuzz Range", type: "number", default: 30, min: 8, max: 60, step: 1 },
    { name: "direction", label: "Direction", type: "select", default: "horizontal", options: ["horizontal", "vertical", "both"] },
    { name: "fontSize", label: "Font Size", type: "text", default: "clamp(2.6rem, 8vw, 5.8rem)" },
    { name: "fontWeight", label: "Font Weight", type: "number", default: 900, min: 100, max: 900, step: 100 },
    { name: "enableHover", label: "Enable Hover", type: "boolean", default: true },
  ],
  defaults: {
    color: "#F8F8F2",
    className: "max-w-full",
  },
},
component: () => import("@/app/components/ui/fuzzy-text"),
demo: () => import("@/app/components/demos/fuzzy-text-demo"),
};

export default entry;
