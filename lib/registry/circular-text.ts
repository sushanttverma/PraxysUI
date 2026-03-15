import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "circular-text",
title: "Circular Text",
description:
  "Wraps text around a rotating circular path with optional hover-to-spin behavior and center label.",
category: "text",
dependencies: ["clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CircularTextProps {
  text: string
  radius?: number
  spinDuration?: number
  onHover?: boolean
  direction?: 'clockwise' | 'counter-clockwise'
  centerText?: string
  className?: string
  textClassName?: string
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  radius = 88,
  spinDuration = 20,
  onHover = false,
  direction = 'clockwise',
  centerText,
  className = '',
  textClassName = '',
}) => {
  const chars = Array.from(text)
  if (chars.length === 0) return null

  const angleStep = 360 / chars.length
  const size = radius * 2

  const containerStyle = {
    width: size,
    height: size,
    ['--spin-duration' as '--spin-duration']: \`\${spinDuration}s\`,
  } as React.CSSProperties

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={containerStyle}>
      <div
        className={cn(
          'praxys-circular-track absolute inset-0',
          onHover && 'praxys-circular-track--hover',
          direction === 'counter-clockwise' && 'praxys-circular-track--reverse'
        )}
        aria-label={text}
      >
        {chars.map((char, index) => (
          <span
            key={\`\${char}-\${index}\`}
            className={cn(
              'absolute left-1/2 top-1/2 select-none whitespace-pre text-base font-medium text-chalk',
              textClassName
            )}
            style={{
              transform: \`translate(-50%, -50%) rotate(\${index * angleStep}deg) translateY(-\${radius}px)\`,
            }}
          >
            {char === ' ' ? '\\u00A0' : char}
          </span>
        ))}
      </div>

      {centerText ? <span className="z-10 text-sm font-semibold text-blush">{centerText}</span> : null}

      <style jsx>{\`
        .praxys-circular-track {
          animation: praxys-spin var(--spin-duration, 20s) linear infinite;
        }

        .praxys-circular-track--hover {
          animation-play-state: paused;
        }

        .praxys-circular-track--hover:hover {
          animation-play-state: running;
        }

        .praxys-circular-track--reverse {
          animation-direction: reverse;
        }

        @keyframes praxys-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      \`}</style>
    </div>
  )
}

export default CircularText`,
usage: `import CircularText from "@/app/components/ui/circular-text"

export function Demo() {
  return (
    <CircularText
      text="Praxys UI • Animated Components • "
      centerText="Praxys"
      spinDuration={18}
    />
  )
}`,
props: [
  {
    name: "text",
    type: "string",
    default: "â€”",
    description: "Text rendered around the circle. Include spaces or separators to control spacing.",
  },
  {
    name: "radius",
    type: "number",
    default: "88",
    description: "Distance from center to characters in pixels.",
  },
  {
    name: "spinDuration",
    type: "number",
    default: "20",
    description: "Duration in seconds for one full rotation.",
  },
  {
    name: "onHover",
    type: "boolean",
    default: "false",
    description: "When true, rotation is paused until hover.",
  },
  {
    name: "direction",
    type: "'clockwise' | 'counter-clockwise'",
    default: "'clockwise'",
    description: "Rotation direction of the text ring.",
  },
  {
    name: "centerText",
    type: "string",
    default: "undefined",
    description: "Optional label rendered at the center of the circle.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional classes for the container.",
  },
  {
    name: "textClassName",
    type: "string",
    default: "''",
    description: "Additional classes for each character.",
  },
],
playground: {
  controls: [
    { name: "text", label: "Text", type: "text", default: "Praxys UI • Animated Components • " },
    { name: "centerText", label: "Center Text", type: "text", default: "Praxys" },
    { name: "radius", label: "Radius", type: "number", default: 88, min: 48, max: 160, step: 4 },
    { name: "spinDuration", label: "Spin Duration (s)", type: "number", default: 20, min: 4, max: 40, step: 1 },
    { name: "onHover", label: "Spin On Hover", type: "boolean", default: false },
    {
      name: "direction",
      label: "Direction",
      type: "select",
      default: "clockwise",
      options: [
        { label: "Clockwise", value: "clockwise" },
        { label: "Counter Clockwise", value: "counter-clockwise" },
      ],
    },
  ],
},
component: () => import("@/app/components/ui/circular-text"),
demo: () => import("@/app/components/demos/circular-text-demo"),
};

export default entry;
