import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
slug: "noise-texture",
title: "Noise Texture",
description:
  "Subtle animated noise/grain overlay using SVG turbulence filters for a film-grain aesthetic.",
category: "visual",
isNew: true,
dependencies: ["clsx", "tailwind-merge"],
code: `'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface NoiseTextureProps {
  opacity?: number
  speed?: number
  className?: string
}

const NoiseTexture: React.FC<NoiseTextureProps> = ({
  opacity = 0.05,
  speed = 8,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      <style jsx>{\\\`
        @keyframes noise-shift {
          0% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-5%, -5%);
          }
          20% {
            transform: translate(-10%, 5%);
          }
          30% {
            transform: translate(5%, -10%);
          }
          40% {
            transform: translate(-5%, 15%);
          }
          50% {
            transform: translate(-10%, 5%);
          }
          60% {
            transform: translate(15%, 0);
          }
          70% {
            transform: translate(0, 10%);
          }
          80% {
            transform: translate(-15%, 0);
          }
          90% {
            transform: translate(10%, 5%);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      \\\`}</style>
      <svg
        className="absolute inset-0 h-[300%] w-[300%]"
        style={{
          opacity,
          animation: \\\`noise-shift \\\${speed}s steps(4) infinite\\\`,
        }}
      >
        <filter id="praxys-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#praxys-noise)" />
      </svg>
    </div>
  )
}

export default NoiseTexture`,
usage: `import NoiseTexture from "@/app/components/ui/noise-texture"

export function Demo() {
  return (
    <div className="relative h-64 w-full bg-obsidian">
      <NoiseTexture opacity={0.05} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-chalk">Content with noise overlay</p>
      </div>
    </div>
  )
}`,
props: [
  {
    name: "opacity",
    type: "number",
    default: "0.05",
    description: "Noise overlay opacity.",
  },
  {
    name: "speed",
    type: "number",
    default: "8",
    description: "Animation speed in seconds.",
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
    { name: "opacity", label: "Opacity", type: "number", default: 0.05, min: 0.01, max: 0.3, step: 0.01 },
    { name: "speed", label: "Speed (s)", type: "number", default: 8, min: 2, max: 20, step: 1 },
  ],
},
component: () => import("@/app/components/ui/noise-texture"),
demo: () => import("@/app/components/demos/noise-texture-demo"),
};

export default entry;
