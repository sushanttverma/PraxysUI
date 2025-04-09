import type { ComponentType } from "react";

// ─── Types ───────────────────────────────────────────────

export type PropDef = {
  name: string;
  type: string;
  default: string;
  description: string;
};

export type ComponentEntry = {
  slug: string;
  title: string;
  description: string;
  category: "buttons" | "cards" | "text" | "navigation" | "visual" | "media";
  dependencies: string[];
  code: string;
  usage: string;
  props: PropDef[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: () => Promise<{ default: ComponentType<any> }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  demo: () => Promise<{ default: ComponentType<any> }>;
};

export type DocPage = {
  slug: string;
  title: string;
  description: string;
  type: "doc";
  content: () => Promise<{ default: ComponentType }>;
};

export type SidebarGroup = {
  title: string;
  items: { slug: string; title: string }[];
};

// ─── Sidebar structure ───────────────────────────────────

export const sidebarGroups: SidebarGroup[] = [
  {
    title: "Getting Started",
    items: [
      { slug: "introduction", title: "Introduction" },
      { slug: "installation", title: "Install Next.js" },
      { slug: "install-tailwind", title: "Install Tailwind CSS" },
      { slug: "add-utilities", title: "Add Utilities" },
      { slug: "cli", title: "CLI" },
    ],
  },
  {
    title: "Components",
    items: [
      { slug: "components-overview", title: "Overview" },
      { slug: "animated-button", title: "Animated Button" },
      { slug: "flip-text", title: "Flip Text" },
      { slug: "glow-border-card", title: "Glow Border Card" },
      { slug: "animated-number", title: "Animated Number" },
      { slug: "line-hover-link", title: "Line Hover Link" },
      { slug: "light-lines", title: "Light Lines" },
      { slug: "creepy-button", title: "Creepy Button" },
      { slug: "social-flip-button", title: "Social Flip Button" },
      { slug: "testimonials-card", title: "Testimonials Card" },
      { slug: "staggered-grid", title: "Staggered Grid" },
      { slug: "expandable-bento-grid", title: "Expandable Bento Grid" },
      { slug: "perspective-grid", title: "Perspective Grid" },
      { slug: "flip-fade-text", title: "Flip Fade Text" },
      { slug: "displacement-text", title: "3D Displacement Text" },
      { slug: "spotlight-navbar", title: "Spotlight Navbar" },
      { slug: "glass-dock", title: "Glass Dock" },
      { slug: "liquid-ocean", title: "Liquid Ocean" },
      { slug: "liquid-metal", title: "Liquid Metal" },
      { slug: "animated-hero", title: "Animated Hero" },
      { slug: "masked-avatars", title: "Masked Avatars" },
      { slug: "folder-preview", title: "Folder Preview" },
      { slug: "interactive-book", title: "Interactive Book" },
      { slug: "reveal-loader", title: "Reveal Loader" },
      { slug: "logo-slider", title: "Logo Slider" },
    ],
  },
];

// ─── All slugs in order (for prev/next navigation) ──────

export const allSlugs: string[] = sidebarGroups.flatMap((g) =>
  g.items.map((i) => i.slug)
);

export function getPrevNext(slug: string) {
  const idx = allSlugs.indexOf(slug);
  return {
    prev: idx > 0 ? allSlugs[idx - 1] : null,
    next: idx < allSlugs.length - 1 ? allSlugs[idx + 1] : null,
  };
}

export function getTitle(slug: string): string {
  for (const group of sidebarGroups) {
    const item = group.items.find((i) => i.slug === slug);
    if (item) return item.title;
  }
  return slug;
}

// ─── Component registry ──────────────────────────────────

export const componentRegistry: Record<string, ComponentEntry> = {
  "animated-button": {
    slug: "animated-button",
    title: "Animated Button",
    description:
      "A button with a shiny border sweep and text reveal effect, perfect for calls to action.",
    category: "buttons",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React from 'react'
import { motion, type MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type AnimatedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps & {
    children?: React.ReactNode
  }

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children = 'Browse Components',
  className = '',
  ...rest
}) => {
  return (
    <motion.button
      {...rest}
      whileTap={{ scale: 0.97 }}
      transition={{
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: { type: 'spring', stiffness: 10, damping: 5, mass: 0.1 },
      }}
      className={cn(
        'px-6 py-2.5 rounded-lg relative overflow-hidden',
        'bg-ignite/10 border border-ignite/30',
        'text-chalk cursor-pointer',
        className
      )}
    >
      <motion.span
        className="tracking-wide font-medium h-full w-full flex items-center justify-center relative z-10"
        style={{
          maskImage:
            'linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))',
          WebkitMaskImage:
            'linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))',
        }}
        initial={{ ['--mask-x' as string]: '100%' }}
        animate={{ ['--mask-x' as string]: '-100%' }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear', repeatDelay: 1 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="block absolute inset-0 rounded-lg p-px"
        style={{
          background:
            'linear-gradient(-75deg, transparent 30%, rgba(232,78,45,0.5) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
        }}
        initial={{ backgroundPosition: '100% 0', opacity: 0 }}
        animate={{ backgroundPosition: ['100% 0', '0% 0'], opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
      />
    </motion.button>
  )
}

export default AnimatedButton`,
    usage: `import AnimatedButton from "@/app/components/ui/animated-button"

export function Demo() {
  return (
    <AnimatedButton>
      Get Started
    </AnimatedButton>
  )
}`,
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "'Browse Components'",
        description: "The content displayed inside the button.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes to apply.",
      },
    ],
    component: () => import("@/app/components/ui/animated-button"),
    demo: () => import("@/app/components/demos/animated-button-demo"),
  },

  "flip-text": {
    slug: "flip-text",
    title: "Flip Text",
    description:
      "Characters flip in one-by-one with a smooth 3D rotation, great for headings and titles.",
    category: "text",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FlipTextProps {
  text: string
  className?: string
  staggerDelay?: number
  duration?: number
}

const FlipText: React.FC<FlipTextProps> = ({
  text,
  className = '',
  staggerDelay = 0.05,
  duration = 0.5,
}) => {
  return (
    <span className={cn('inline-flex overflow-hidden', className)}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{
            delay: i * staggerDelay,
            duration,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          style={{ transformOrigin: 'bottom', display: 'inline-block' }}
        >
          {char === ' ' ? '\\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default FlipText`,
    usage: `import FlipText from "@/app/components/ui/flip-text"

export function Demo() {
  return (
    <FlipText
      text="Hello World"
      className="text-4xl font-bold text-chalk"
    />
  )
}`,
    props: [
      {
        name: "text",
        type: "string",
        default: "—",
        description: "The text to animate.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "staggerDelay",
        type: "number",
        default: "0.05",
        description: "Delay between each character animation (seconds).",
      },
      {
        name: "duration",
        type: "number",
        default: "0.5",
        description: "Duration of each character flip (seconds).",
      },
    ],
    component: () => import("@/app/components/ui/flip-text"),
    demo: () => import("@/app/components/demos/flip-text-demo"),
  },

  "glow-border-card": {
    slug: "glow-border-card",
    title: "Glow Border Card",
    description:
      "A card with an animated glowing border that follows cursor movement.",
    category: "cards",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowBorderCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

const GlowBorderCard: React.FC<GlowBorderCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(232, 78, 45, 0.35)',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const background = useMotionTemplate\`radial-gradient(
    300px circle at \${mouseX}px \${mouseY}px,
    \${glowColor},
    transparent 80%
  )\`

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative rounded-xl border border-border bg-obsidian p-px overflow-hidden',
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative rounded-xl bg-obsidian p-6">
        {children}
      </div>
    </div>
  )
}

export default GlowBorderCard`,
    usage: `import GlowBorderCard from "@/app/components/ui/glow-border-card"

export function Demo() {
  return (
    <GlowBorderCard>
      <h3 className="text-lg font-semibold text-chalk">Card Title</h3>
      <p className="mt-2 text-sm text-blush">
        Hover over this card to see the glow effect.
      </p>
    </GlowBorderCard>
  )
}`,
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description: "Content inside the card.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "glowColor",
        type: "string",
        default: "'rgba(232,78,45,0.35)'",
        description: "Color of the glow effect.",
      },
    ],
    component: () => import("@/app/components/ui/glow-border-card"),
    demo: () => import("@/app/components/demos/glow-border-card-demo"),
  },

  "animated-number": {
    slug: "animated-number",
    title: "Animated Number",
    description:
      "Smoothly animates between number values with a spring transition.",
    category: "text",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React, { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedNumberProps {
  value: number
  className?: string
  duration?: number
  formatFn?: (n: number) => string
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  className = '',
  duration = 1.5,
  formatFn = (n) => Math.round(n).toLocaleString(),
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: duration * 1000,
  })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = formatFn(latest)
      }
    })
    return unsubscribe
  }, [springValue, formatFn])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      0
    </span>
  )
}

export default AnimatedNumber`,
    usage: `import AnimatedNumber from "@/app/components/ui/animated-number"

export function Demo() {
  return (
    <div className="text-5xl font-bold text-chalk">
      <AnimatedNumber value={1234} />
    </div>
  )
}`,
    props: [
      {
        name: "value",
        type: "number",
        default: "—",
        description: "The target number to animate to.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "duration",
        type: "number",
        default: "1.5",
        description: "Animation duration in seconds.",
      },
      {
        name: "formatFn",
        type: "(n: number) => string",
        default: "Math.round(n).toLocaleString()",
        description: "Custom format function for the displayed number.",
      },
    ],
    component: () => import("@/app/components/ui/animated-number"),
    demo: () => import("@/app/components/demos/animated-number-demo"),
  },

  "line-hover-link": {
    slug: "line-hover-link",
    title: "Line Hover Link",
    description:
      "A link with an animated underline that slides in on hover.",
    category: "navigation",
    dependencies: ["clsx", "tailwind-merge"],
    code: `'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface LineHoverLinkProps {
  children: React.ReactNode
  href?: string
  className?: string
  lineColor?: string
}

const LineHoverLink: React.FC<LineHoverLinkProps> = ({
  children,
  href = '#',
  className = '',
  lineColor,
}) => {
  return (
    <a
      href={href}
      className={cn(
        'group relative inline-block text-chalk transition-colors hover:text-ignite',
        className
      )}
    >
      {children}
      <span
        className="absolute bottom-0 left-0 h-px w-0 transition-all duration-300 ease-out group-hover:w-full"
        style={{ backgroundColor: lineColor || 'var(--color-ignite)' }}
      />
    </a>
  )
}

export default LineHoverLink`,
    usage: `import LineHoverLink from "@/app/components/ui/line-hover-link"

export function Demo() {
  return (
    <LineHoverLink href="#">
      Hover over me
    </LineHoverLink>
  )
}`,
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description: "Link content.",
      },
      {
        name: "href",
        type: "string",
        default: "'#'",
        description: "Link destination URL.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "lineColor",
        type: "string",
        default: "var(--color-ignite)",
        description: "Color of the underline.",
      },
    ],
    component: () => import("@/app/components/ui/line-hover-link"),
    demo: () => import("@/app/components/demos/line-hover-link-demo"),
  },

  "light-lines": {
    slug: "light-lines",
    title: "Light Lines",
    description:
      "Animated vertical light beams that sweep across a container, creating a dramatic visual effect.",
    category: "visual",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LightLinesProps {
  className?: string
  lineCount?: number
  color?: string
  duration?: number
}

const LightLines: React.FC<LightLinesProps> = ({
  className = '',
  lineCount = 5,
  color = 'rgba(232, 78, 45, 0.15)',
  duration = 3,
}) => {
  return (
    <div
      className={cn(
        'relative w-full h-64 overflow-hidden rounded-xl bg-obsidian border border-border',
        className
      )}
    >
      {Array.from({ length: lineCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-full"
          style={{
            width: '1px',
            background: \`linear-gradient(to bottom, transparent, \${color}, transparent)\`,
            left: \`\${((i + 1) / (lineCount + 1)) * 100}%\`,
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scaleY: [0, 1, 1, 0],
          }}
          transition={{
            duration,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {Array.from({ length: lineCount }).map((_, i) => (
        <motion.div
          key={\`glow-\${i}\`}
          className="absolute top-0 h-full"
          style={{
            width: '30px',
            background: \`radial-gradient(ellipse at center, \${color}, transparent)\`,
            left: \`calc(\${((i + 1) / (lineCount + 1)) * 100}% - 15px)\`,
            filter: 'blur(8px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.6, 0] }}
          transition={{
            duration,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default LightLines`,
    usage: `import LightLines from "@/app/components/ui/light-lines"

export function Demo() {
  return <LightLines lineCount={5} />
}`,
    props: [
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "lineCount",
        type: "number",
        default: "5",
        description: "Number of light beams.",
      },
      {
        name: "color",
        type: "string",
        default: "'rgba(232,78,45,0.15)'",
        description: "Color of the light beams.",
      },
      {
        name: "duration",
        type: "number",
        default: "3",
        description: "Animation cycle duration in seconds.",
      },
    ],
    component: () => import("@/app/components/ui/light-lines"),
    demo: () => import("@/app/components/demos/light-lines-demo"),
  },
};

// Helper: check if a slug is a component page
export function isComponentSlug(slug: string): boolean {
  return slug in componentRegistry;
}

// Helper: get all component entries as array
export function getAllComponents(): ComponentEntry[] {
  return Object.values(componentRegistry);
}
