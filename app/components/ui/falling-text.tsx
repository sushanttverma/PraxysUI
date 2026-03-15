'use client'

import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import { cn } from '@/lib/utils'

interface FallingTextProps {
  text?: string
  highlightWords?: string[]
  highlightClassName?: string
  trigger?: 'auto' | 'scroll' | 'click' | 'hover'
  backgroundColor?: string
  wireframes?: boolean
  gravity?: number
  mouseConstraintStiffness?: number
  fontSize?: string
  className?: string
}

const FallingText: React.FC<FallingTextProps> = ({
  text = '',
  highlightWords = [],
  highlightClassName = 'text-ignite font-semibold',
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)

  const [effectStarted, setEffectStarted] = useState(trigger === 'auto')

  useEffect(() => {
    if (!textRef.current) return
    const words = text.split(' ')

    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw))
        return `<span class="inline-block mx-[2px] select-none ${isHighlighted ? highlightClassName : ''}">${word}</span>`
      })
      .join(' ')

    textRef.current.innerHTML = newHTML
  }, [text, highlightWords, highlightClassName])

  useEffect(() => {
    if (trigger !== 'scroll' || !containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEffectStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [trigger])

  const shouldRun = trigger === 'auto' || effectStarted

  useEffect(() => {
    if (!shouldRun) return

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter

    if (!containerRef.current || !canvasContainerRef.current || !textRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const width = containerRect.width
    const height = containerRect.height

    if (width <= 0 || height <= 0) return

    const engine = Engine.create()
    engine.world.gravity.y = gravity

    const canvasContainerEl = canvasContainerRef.current

    const render = Render.create({
      element: canvasContainerEl,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    })

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    }

    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions)
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions)
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions)
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions)

    const wordSpans = textRef.current.querySelectorAll('span')
    const wordBodies = [...wordSpans].map((elem) => {
      const rect = elem.getBoundingClientRect()
      const x = rect.left - containerRect.left + rect.width / 2
      const y = rect.top - containerRect.top + rect.height / 2

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2,
      })

      Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 })
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05)

      return { elem, body }
    })

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute'
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`
      elem.style.transform = 'none'
    })

    const mouse = Mouse.create(containerRef.current)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    })
    render.mouse = mouse

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...wordBodies.map((wb) => wb.body),
    ])

    const runner = Runner.create()
    Runner.run(runner, engine)
    Render.run(render)

    let rafId = 0
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position
        elem.style.left = `${x}px`
        elem.style.top = `${y}px`
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`
      })

      Matter.Engine.update(engine)
      rafId = requestAnimationFrame(updateLoop)
    }
    updateLoop()

    return () => {
      cancelAnimationFrame(rafId)
      Render.stop(render)
      Runner.stop(runner)
      if (render.canvas && canvasContainerEl.contains(render.canvas)) {
        canvasContainerEl.removeChild(render.canvas)
      }
      World.clear(engine.world, false)
      Engine.clear(engine)
    }
  }, [shouldRun, gravity, wireframes, backgroundColor, mouseConstraintStiffness])

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative z-[1] flex h-full min-h-[220px] w-full cursor-pointer items-start justify-center overflow-hidden pt-8 text-center',
        className
      )}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        className="inline-block text-chalk"
        style={{
          fontSize,
          lineHeight: 1.4,
        }}
      />
      <div ref={canvasContainerRef} className="pointer-events-none absolute left-0 top-0 z-0" />
    </div>
  )
}

export default FallingText
