import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "glitch-text",
title: "Glitch Text",
description:
  "A glitchy text effect with RGB color split, clip-path slicing, and flicker animation for a cyberpunk aesthetic.",
category: "text",
dependencies: ["framer-motion", "clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface GlitchTextProps {
  children: string
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}

const intensityMap = {
  low: { clipDuration: '4s', shadowSize: '1px' },
  medium: { clipDuration: '2s', shadowSize: '2px' },
  high: { clipDuration: '1s', shadowSize: '3px' },
}

const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  intensity = 'medium',
  className = '',
}) => {
  const config = intensityMap[intensity]

  return (
    <>
      <style>{\`
        @keyframes glitch-clip-1 {
          0% { clip-path: inset(20% 0 60% 0); }
          10% { clip-path: inset(50% 0 10% 0); }
          20% { clip-path: inset(10% 0 70% 0); }
          30% { clip-path: inset(80% 0 5% 0); }
          40% { clip-path: inset(30% 0 40% 0); }
          50% { clip-path: inset(60% 0 20% 0); }
          60% { clip-path: inset(5% 0 80% 0); }
          70% { clip-path: inset(45% 0 30% 0); }
          80% { clip-path: inset(70% 0 10% 0); }
          90% { clip-path: inset(15% 0 55% 0); }
          100% { clip-path: inset(40% 0 35% 0); }
        }
        @keyframes glitch-clip-2 {
          0% { clip-path: inset(60% 0 10% 0); }
          10% { clip-path: inset(10% 0 70% 0); }
          20% { clip-path: inset(80% 0 5% 0); }
          30% { clip-path: inset(20% 0 60% 0); }
          40% { clip-path: inset(50% 0 20% 0); }
          50% { clip-path: inset(5% 0 75% 0); }
          60% { clip-path: inset(70% 0 15% 0); }
          70% { clip-path: inset(25% 0 50% 0); }
          80% { clip-path: inset(40% 0 30% 0); }
          90% { clip-path: inset(65% 0 10% 0); }
          100% { clip-path: inset(15% 0 60% 0); }
        }
        @keyframes glitch-flicker {
          0%, 100% { opacity: 1; }
          41% { opacity: 1; }
          42% { opacity: 0.8; }
          43% { opacity: 1; }
          45% { opacity: 0.3; }
          46% { opacity: 1; }
        }
      \`}</style>
      <span
        className={cn('relative inline-block', className)}
        style={{ animation: \`glitch-flicker \${config.clipDuration} infinite\` }}
      >
        {children}
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            color: 'inherit',
            textShadow: \`\${config.shadowSize} 0 #ff0000\`,
            animation: \`glitch-clip-1 \${config.clipDuration} infinite linear alternate-reverse\`,
            left: \`-\${config.shadowSize}\`,
          }}
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            color: 'inherit',
            textShadow: \`-\${config.shadowSize} 0 #00ffff\`,
            animation: \`glitch-clip-2 \${config.clipDuration} infinite linear alternate-reverse\`,
            left: config.shadowSize,
          }}
        >
          {children}
        </span>
      </span>
    </>
  )
}

export default GlitchText`,
usage: `import GlitchText from "@/app/components/ui/glitch-text"

export function Demo() {
  return (
<h1 className="text-4xl font-bold text-chalk">
  <GlitchText intensity="medium">Glitch Effect</GlitchText>
</h1>
  )
}`,
props: [
  {
    name: "children",
    type: "string",
    default: "—",
    description: "The text content to display with the glitch effect.",
  },
  {
    name: "intensity",
    type: "'low' | 'medium' | 'high'",
    default: "'medium'",
    description: "Controls the speed and magnitude of the glitch effect.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes.",
  },
],
playground: {
  controls: [
    { name: "intensity", label: "Intensity", type: "select", default: "medium", options: ["low", "medium", "high"] },
  ],
  defaults: {
    children: "Glitch Effect",
  },
},
component: () => import("@/app/components/ui/glitch-text"),
demo: () => import("@/app/components/demos/glitch-text-demo"),
};

export default entry;
