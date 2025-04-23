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

  "creepy-button": {
    slug: "creepy-button",
    title: "Creepy Button",
    description:
      "A horror-inspired button with flickering background, dripping accent line, and staggered glitchy text animation on hover.",
    category: "buttons",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CreepyButtonProps {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

const CreepyButton: React.FC<CreepyButtonProps> = ({
  children = 'Enter',
  className = '',
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const letters = typeof children === 'string' ? children.split('') : []

  return (
    <motion.button
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'group relative px-8 py-3 rounded-lg cursor-pointer overflow-hidden',
        'bg-void border border-ignite/20',
        'transition-shadow duration-500',
        isHovered && 'shadow-[0_0_30px_-5px_rgba(232,78,45,0.4)]',
        className
      )}
    >
      {/* Flickering background */}
      <motion.div
        className="absolute inset-0 bg-ignite/5"
        animate={
          isHovered
            ? { opacity: [0, 0.15, 0, 0.1, 0, 0.2, 0] }
            : { opacity: 0 }
        }
        transition={
          isHovered
            ? { duration: 0.8, repeat: Infinity, ease: 'linear' }
            : {}
        }
      />

      {/* Drip line from top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-ignite to-transparent"
        initial={{ height: 0, opacity: 0 }}
        animate={
          isHovered
            ? { height: '100%', opacity: [0, 1, 0.5] }
            : { height: 0, opacity: 0 }
        }
        transition={{ duration: 1.2, ease: 'easeIn' }}
      />

      {/* Text with creepy stagger */}
      <span className="relative z-10 flex items-center justify-center font-medium tracking-wider">
        {letters.length > 0
          ? letters.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-chalk"
                animate={
                  isHovered
                    ? {
                        y: [0, -2, 1, -1, 0],
                        opacity: [1, 0.4, 1, 0.6, 1],
                        color: [
                          'var(--color-chalk)',
                          'var(--color-ignite)',
                          'var(--color-chalk)',
                        ],
                      }
                    : { y: 0, opacity: 1 }
                }
                transition={
                  isHovered
                    ? {
                        duration: 0.6,
                        delay: i * 0.05,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }
                    : {}
                }
              >
                {char === ' ' ? '\\u00A0' : char}
              </motion.span>
            ))
          : children}
      </span>

      {/* Corner accents */}
      <motion.span
        className="absolute top-0 left-0 h-2 w-2 border-t border-l border-ignite/50"
        animate={isHovered ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
        transition={isHovered ? { duration: 1.5, repeat: Infinity } : {}}
      />
      <motion.span
        className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-ignite/50"
        animate={isHovered ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
        transition={
          isHovered ? { duration: 1.5, repeat: Infinity, delay: 0.5 } : {}
        }
      />
    </motion.button>
  )
}

export default CreepyButton`,
    usage: `import CreepyButton from "@/app/components/ui/creepy-button"

export function Demo() {
  return (
    <CreepyButton onClick={() => console.log('clicked')}>
      Enter
    </CreepyButton>
  )
}`,
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "'Enter'",
        description: "The content displayed inside the button.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes to apply.",
      },
      {
        name: "onClick",
        type: "() => void",
        default: "—",
        description: "Click handler function.",
      },
    ],
    component: () => import("@/app/components/ui/creepy-button"),
    demo: () => import("@/app/components/demos/creepy-button-demo"),
  },

  "social-flip-button": {
    slug: "social-flip-button",
    title: "Social Flip Button",
    description:
      "A button that flips to reveal social media icons on hover, with a smooth 3D rotation transition.",
    category: "buttons",
    dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"],
    code: `'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SocialLink {
  icon: React.ReactNode
  href: string
  label: string
}

interface SocialFlipButtonProps {
  frontLabel?: string
  links: SocialLink[]
  className?: string
}

const SocialFlipButton: React.FC<SocialFlipButtonProps> = ({
  frontLabel = 'Follow',
  links,
  className = '',
}) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className="relative h-10" style={{ perspective: '600px' }}>
        <AnimatePresence mode="wait">
          {!flipped ? (
            <motion.button
              key="front"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex h-10 items-center gap-2 rounded-lg border border-border bg-obsidian px-5 text-sm font-medium text-chalk cursor-pointer"
              style={{ transformOrigin: 'center center' }}
            >
              {frontLabel}
            </motion.button>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex h-10 items-center gap-1 rounded-lg border border-ignite/30 bg-ignite/10 px-2"
              style={{ transformOrigin: 'center center' }}
            >
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-chalk transition-colors hover:bg-ignite/20 hover:text-ignite"
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SocialFlipButton`,
    usage: `import SocialFlipButton from "@/app/components/ui/social-flip-button"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Demo() {
  return (
    <SocialFlipButton
      frontLabel="Follow"
      links={[
        { icon: <Github className="h-4 w-4" />, href: "#", label: "GitHub" },
        { icon: <Twitter className="h-4 w-4" />, href: "#", label: "Twitter" },
        { icon: <Linkedin className="h-4 w-4" />, href: "#", label: "LinkedIn" },
      ]}
    />
  )
}`,
    props: [
      {
        name: "frontLabel",
        type: "string",
        default: "'Follow'",
        description: "Text shown on the front face of the button.",
      },
      {
        name: "links",
        type: "SocialLink[]",
        default: "—",
        description:
          "Array of social links, each with icon (ReactNode), href, and label.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes to apply.",
      },
    ],
    component: () => import("@/app/components/ui/social-flip-button"),
    demo: () => import("@/app/components/demos/social-flip-button-demo"),
  },

  "testimonials-card": {
    slug: "testimonials-card",
    title: "Testimonials Card",
    description:
      "An auto-rotating testimonials card with smooth crossfade transitions, avatar display, and dot navigation.",
    category: "cards",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Testimonial {
  quote: string
  author: string
  role: string
  avatar?: string
}

interface TestimonialsCardProps {
  testimonials: Testimonial[]
  className?: string
  autoPlay?: boolean
  interval?: number
}

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({
  testimonials,
  className = '',
  autoPlay = true,
  interval = 5000,
}) => {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, next, testimonials.length])

  const t = testimonials[current]

  return (
    <div
      className={cn(
        'relative rounded-xl border border-border bg-obsidian p-8 overflow-hidden',
        className
      )}
    >
      {/* Quote mark */}
      <span className="absolute top-4 right-6 font-pixel text-6xl leading-none text-ignite/10">
        &ldquo;
      </span>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="relative z-10"
        >
          <p className="text-base leading-relaxed text-chalk italic">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-3">
            {t.avatar ? (
              <img
                src={t.avatar}
                alt={t.author}
                className="h-10 w-10 rounded-full border border-border object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-ignite/10 font-pixel text-sm text-ignite">
                {t.author.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-chalk">{t.author}</p>
              <p className="text-xs text-blush">{t.role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      {testimonials.length > 1 && (
        <div className="mt-6 flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                i === current
                  ? 'w-6 bg-ignite'
                  : 'w-1.5 bg-border-light hover:bg-blush/50'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TestimonialsCard`,
    usage: `import TestimonialsCard from "@/app/components/ui/testimonials-card"

export function Demo() {
  return (
    <TestimonialsCard
      testimonials={[
        { quote: "Amazing components!", author: "Jane Doe", role: "Developer" },
        { quote: "Saved me hours.", author: "John Smith", role: "Designer" },
      ]}
    />
  )
}`,
    props: [
      {
        name: "testimonials",
        type: "Testimonial[]",
        default: "—",
        description:
          "Array of testimonials with quote, author, role, and optional avatar URL.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "autoPlay",
        type: "boolean",
        default: "true",
        description: "Whether to auto-rotate testimonials.",
      },
      {
        name: "interval",
        type: "number",
        default: "5000",
        description: "Auto-rotation interval in milliseconds.",
      },
    ],
    component: () => import("@/app/components/ui/testimonials-card"),
    demo: () => import("@/app/components/demos/testimonials-card-demo"),
  },

  "staggered-grid": {
    slug: "staggered-grid",
    title: "Staggered Grid",
    description:
      "A grid layout where children animate in with a staggered fade-up effect as they enter the viewport.",
    category: "cards",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StaggeredGridProps {
  children: React.ReactNode[]
  className?: string
  columns?: number
  staggerDelay?: number
}

const StaggeredGrid: React.FC<StaggeredGridProps> = ({
  children,
  className = '',
  columns = 3,
  staggerDelay = 0.08,
}) => {
  return (
    <div
      className={cn('grid gap-4', className)}
      style={{
        gridTemplateColumns: \`repeat(\${columns}, minmax(0, 1fr))\`,
      }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.5,
            delay: i * staggerDelay,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

export default StaggeredGrid`,
    usage: `import StaggeredGrid from "@/app/components/ui/staggered-grid"

export function Demo() {
  return (
    <StaggeredGrid columns={3}>
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="rounded-lg border border-border bg-obsidian p-6 text-chalk">
          Item {n}
        </div>
      ))}
    </StaggeredGrid>
  )
}`,
    props: [
      {
        name: "children",
        type: "React.ReactNode[]",
        default: "—",
        description: "Array of child elements to render in the grid.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "columns",
        type: "number",
        default: "3",
        description: "Number of grid columns.",
      },
      {
        name: "staggerDelay",
        type: "number",
        default: "0.08",
        description: "Delay between each child animation in seconds.",
      },
    ],
    component: () => import("@/app/components/ui/staggered-grid"),
    demo: () => import("@/app/components/demos/staggered-grid-demo"),
  },

  "expandable-bento-grid": {
    slug: "expandable-bento-grid",
    title: "Expandable Bento Grid",
    description:
      "A bento-style grid where clicking an item expands it into a full overlay modal with smooth layout animations.",
    category: "cards",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BentoItem {
  id: string
  title: string
  description: string
  icon?: React.ReactNode
  span?: 'normal' | 'wide' | 'tall'
}

interface ExpandableBentoGridProps {
  items: BentoItem[]
  className?: string
}

const ExpandableBentoGrid: React.FC<ExpandableBentoGridProps> = ({
  items,
  className = '',
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <>
      <div
        className={cn(
          'grid auto-rows-[140px] grid-cols-3 gap-3',
          className
        )}
      >
        {items.map((item) => {
          const isExpanded = expandedId === item.id
          return (
            <motion.div
              key={item.id}
              layoutId={\`bento-\${item.id}\`}
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className={cn(
                'group relative cursor-pointer rounded-xl border border-border bg-obsidian p-5 overflow-hidden transition-colors hover:border-border-light',
                item.span === 'wide' && 'col-span-2',
                item.span === 'tall' && 'row-span-2'
              )}
            >
              {item.icon && (
                <div className="mb-3 text-ignite">{item.icon}</div>
              )}
              <h3 className="font-pixel text-sm font-semibold text-chalk">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-blush line-clamp-2">
                {item.description}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expandedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-void/60 backdrop-blur-sm"
              onClick={() => setExpandedId(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div
                layoutId={\`bento-\${expandedId}\`}
                className="w-full max-w-lg rounded-xl border border-border bg-obsidian p-8"
              >
                {(() => {
                  const item = items.find((i) => i.id === expandedId)
                  if (!item) return null
                  return (
                    <>
                      {item.icon && (
                        <div className="mb-4 text-ignite">{item.icon}</div>
                      )}
                      <h3 className="font-pixel text-xl font-semibold text-chalk">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-blush">
                        {item.description}
                      </p>
                      <button
                        onClick={() => setExpandedId(null)}
                        className="mt-6 rounded-lg border border-border px-4 py-2 text-sm text-blush transition-colors hover:text-chalk cursor-pointer"
                      >
                        Close
                      </button>
                    </>
                  )
                })()}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ExpandableBentoGrid`,
    usage: `import ExpandableBentoGrid from "@/app/components/ui/expandable-bento-grid"

export function Demo() {
  return (
    <ExpandableBentoGrid
      items={[
        { id: "1", title: "Analytics", description: "Track performance metrics.", span: "wide" },
        { id: "2", title: "Settings", description: "Configure your preferences." },
        { id: "3", title: "Users", description: "Manage team members.", span: "tall" },
      ]}
    />
  )
}`,
    props: [
      {
        name: "items",
        type: "BentoItem[]",
        default: "—",
        description:
          "Array of items with id, title, description, optional icon, and optional span ('normal' | 'wide' | 'tall').",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
    ],
    component: () => import("@/app/components/ui/expandable-bento-grid"),
    demo: () => import("@/app/components/demos/expandable-bento-grid-demo"),
  },

  "perspective-grid": {
    slug: "perspective-grid",
    title: "Perspective Grid",
    description:
      "A 3D perspective grid that tilts items on hover with smooth spring animations and staggered entrance.",
    category: "cards",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PerspectiveGridProps {
  children: React.ReactNode[]
  className?: string
  columns?: number
  tiltAmount?: number
}

const PerspectiveGrid: React.FC<PerspectiveGridProps> = ({
  children,
  className = '',
  columns = 3,
  tiltAmount = 8,
}) => {
  return (
    <div
      className={cn('grid gap-4', className)}
      style={{
        gridTemplateColumns: \`repeat(\${columns}, minmax(0, 1fr))\`,
        perspective: '1000px',
      }}
    >
      {React.Children.map(children, (child, i) => (
        <PerspectiveItem key={i} tiltAmount={tiltAmount} index={i}>
          {child}
        </PerspectiveItem>
      ))}
    </div>
  )
}

function PerspectiveItem({
  children,
  tiltAmount,
  index,
}: {
  children: React.ReactNode
  tiltAmount: number
  index: number
}) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        rotateX: hovered ? tiltAmount : 0,
        rotateY: hovered ? -tiltAmount : 0,
        scale: hovered ? 1.02 : 1,
      }}
      style={{ transformStyle: 'preserve-3d' }}
      className="cursor-pointer transition-shadow duration-300"
    >
      {children}
    </motion.div>
  )
}

export default PerspectiveGrid`,
    usage: `import PerspectiveGrid from "@/app/components/ui/perspective-grid"

export function Demo() {
  return (
    <PerspectiveGrid columns={3} tiltAmount={8}>
      {[1, 2, 3].map((n) => (
        <div key={n} className="rounded-lg border border-border bg-obsidian p-8 text-center text-chalk">
          Card {n}
        </div>
      ))}
    </PerspectiveGrid>
  )
}`,
    props: [
      {
        name: "children",
        type: "React.ReactNode[]",
        default: "—",
        description: "Array of child elements to render in the grid.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "columns",
        type: "number",
        default: "3",
        description: "Number of grid columns.",
      },
      {
        name: "tiltAmount",
        type: "number",
        default: "8",
        description: "Degrees of 3D tilt on hover.",
      },
    ],
    component: () => import("@/app/components/ui/perspective-grid"),
    demo: () => import("@/app/components/demos/perspective-grid-demo"),
  },

  "flip-fade-text": {
    slug: "flip-fade-text",
    title: "Flip Fade Text",
    description:
      "A rotating text component that cycles through words with a 3D flip and fade transition, perfect for hero taglines.",
    category: "text",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FlipFadeTextProps {
  words: string[]
  className?: string
  interval?: number
  duration?: number
}

const FlipFadeText: React.FC<FlipFadeTextProps> = ({
  words,
  className = '',
  interval = 3000,
  duration = 0.5,
}) => {
  const [index, setIndex] = useState(0)

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % words.length)
  }, [words.length])

  useEffect(() => {
    const timer = setInterval(advance, interval)
    return () => clearInterval(timer)
  }, [advance, interval])

  return (
    <span className={cn('relative inline-flex overflow-hidden', className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ rotateX: 90, opacity: 0, y: 10 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: -90, opacity: 0, y: -10 }}
          transition={{ duration, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="inline-block"
          style={{ transformOrigin: 'bottom center' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default FlipFadeText`,
    usage: `import FlipFadeText from "@/app/components/ui/flip-fade-text"

export function Demo() {
  return (
    <h1 className="text-4xl font-bold text-chalk">
      Build{" "}
      <FlipFadeText
        words={["faster", "better", "smarter"]}
        className="text-ignite"
      />
    </h1>
  )
}`,
    props: [
      {
        name: "words",
        type: "string[]",
        default: "—",
        description: "Array of words to cycle through.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "interval",
        type: "number",
        default: "3000",
        description: "Time between word changes in milliseconds.",
      },
      {
        name: "duration",
        type: "number",
        default: "0.5",
        description: "Duration of the flip animation in seconds.",
      },
    ],
    component: () => import("@/app/components/ui/flip-fade-text"),
    demo: () => import("@/app/components/demos/flip-fade-text-demo"),
  },

  "displacement-text": {
    slug: "displacement-text",
    title: "3D Displacement Text",
    description:
      "Mouse-reactive 3D text with depth shadows that follows cursor movement, creating a dramatic displacement effect.",
    category: "text",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DisplacementTextProps {
  text: string
  className?: string
  fontSize?: number
  color?: string
  shadowColor?: string
  depth?: number
}

const DisplacementText: React.FC<DisplacementTextProps> = ({
  text,
  className = '',
  fontSize = 64,
  color = 'var(--color-chalk)',
  shadowColor = 'var(--color-ignite)',
  depth = 12,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(springY, [0, 1], [depth, -depth])
  const rotateY = useTransform(springX, [0, 1], [-depth, depth])

  const shadowX = useTransform(springX, [0, 1], [depth, -depth])
  const shadowY = useTransform(springY, [0, 1], [depth, -depth])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'flex items-center justify-center cursor-crosshair select-none',
        className
      )}
      style={{ perspective: '800px' }}
    >
      <motion.span
        className="font-pixel font-bold"
        style={{
          fontSize,
          color,
          rotateX,
          rotateY,
          textShadow: useTransform(
            [shadowX, shadowY],
            ([x, y]) =>
              \`\${x}px \${y}px 0px \${shadowColor}, \${Number(x) * 2}px \${Number(y) * 2}px 0px \${shadowColor}40\`
          ),
          transformStyle: 'preserve-3d',
        }}
      >
        {text}
      </motion.span>
    </div>
  )
}

export default DisplacementText`,
    usage: `import DisplacementText from "@/app/components/ui/displacement-text"

export function Demo() {
  return (
    <DisplacementText
      text="PRAXYS"
      fontSize={72}
      depth={15}
    />
  )
}`,
    props: [
      {
        name: "text",
        type: "string",
        default: "—",
        description: "The text to display.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "fontSize",
        type: "number",
        default: "64",
        description: "Font size in pixels.",
      },
      {
        name: "color",
        type: "string",
        default: "'var(--color-chalk)'",
        description: "Text color.",
      },
      {
        name: "shadowColor",
        type: "string",
        default: "'var(--color-ignite)'",
        description: "Color of the 3D shadow.",
      },
      {
        name: "depth",
        type: "number",
        default: "12",
        description: "Maximum rotation and shadow offset in pixels/degrees.",
      },
    ],
    component: () => import("@/app/components/ui/displacement-text"),
    demo: () => import("@/app/components/demos/displacement-text-demo"),
  },

  "spotlight-navbar": {
    slug: "spotlight-navbar",
    title: "Spotlight Navbar",
    description:
      "A horizontal navigation bar with a smooth animated spotlight background that follows the hovered item.",
    category: "navigation",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
}

interface SpotlightNavbarProps {
  items: NavItem[]
  className?: string
}

const SpotlightNavbar: React.FC<SpotlightNavbarProps> = ({
  items,
  className = '',
}) => {
  const navRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, width: 0 })

  function handleHover(e: React.MouseEvent<HTMLAnchorElement>, index: number) {
    const rect = e.currentTarget.getBoundingClientRect()
    const navRect = navRef.current?.getBoundingClientRect()
    if (!navRect) return

    setSpotlightPos({
      x: rect.left - navRect.left,
      width: rect.width,
    })
    setHoveredIndex(index)
  }

  return (
    <div
      ref={navRef}
      className={cn(
        'relative inline-flex items-center gap-1 rounded-xl border border-border bg-obsidian p-1.5',
        className
      )}
    >
      {/* Spotlight background */}
      {hoveredIndex !== null && (
        <motion.div
          className="absolute top-1.5 bottom-1.5 rounded-lg bg-ignite/10 border border-ignite/20"
          initial={false}
          animate={{
            x: spotlightPos.x - 6,
            width: spotlightPos.width,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}

      {items.map((item, i) => (
        <a
          key={item.href}
          href={item.href}
          onMouseEnter={(e) => handleHover(e, i)}
          onMouseLeave={() => setHoveredIndex(null)}
          className={cn(
            'relative z-10 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            hoveredIndex === i ? 'text-ignite' : 'text-blush hover:text-chalk'
          )}
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}

export default SpotlightNavbar`,
    usage: `import SpotlightNavbar from "@/app/components/ui/spotlight-navbar"

export function Demo() {
  return (
    <SpotlightNavbar
      items={[
        { label: "Home", href: "#" },
        { label: "About", href: "#" },
        { label: "Projects", href: "#" },
        { label: "Contact", href: "#" },
      ]}
    />
  )
}`,
    props: [
      {
        name: "items",
        type: "NavItem[]",
        default: "—",
        description: "Array of navigation items with label and href.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
    ],
    component: () => import("@/app/components/ui/spotlight-navbar"),
    demo: () => import("@/app/components/demos/spotlight-navbar-demo"),
  },

  "glass-dock": {
    slug: "glass-dock",
    title: "Glass Dock",
    description:
      "A macOS-inspired dock with glassmorphism styling, spring-animated hover magnification, and tooltips.",
    category: "navigation",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DockItem {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

interface GlassDockProps {
  items: DockItem[]
  className?: string
  iconSize?: number
}

const GlassDock: React.FC<GlassDockProps> = ({
  items,
  className = '',
  iconSize = 24,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-end gap-2 rounded-2xl border border-border/60 px-3 py-2',
        'bg-obsidian/60 backdrop-blur-xl shadow-lg',
        className
      )}
    >
      {items.map((item, i) => (
        <DockIcon key={i} item={item} iconSize={iconSize} />
      ))}
    </div>
  )
}

function DockIcon({
  item,
  iconSize,
}: {
  item: DockItem
  iconSize: number
}) {
  return (
    <motion.button
      onClick={item.onClick}
      whileHover={{ scale: 1.4, y: -8 }}
      whileTap={{ scale: 1.2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="group relative flex flex-col items-center cursor-pointer"
    >
      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, y: 4, scale: 0.8 }}
        whileHover={{ opacity: 1, y: -4, scale: 1 }}
        className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-void border border-border px-2 py-0.5 text-xs text-chalk shadow-md"
      >
        {item.label}
      </motion.span>

      <div
        className="flex items-center justify-center rounded-xl bg-obsidian border border-border/50 p-2.5 transition-colors group-hover:border-ignite/30 group-hover:bg-ignite/10"
        style={{ width: iconSize + 20, height: iconSize + 20 }}
      >
        <div className="text-blush transition-colors group-hover:text-ignite" style={{ width: iconSize, height: iconSize }}>
          {item.icon}
        </div>
      </div>

      {/* Reflection dot */}
      <motion.div
        className="mt-1 h-1 w-1 rounded-full bg-ignite/50"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.button>
  )
}

export default GlassDock`,
    usage: `import GlassDock from "@/app/components/ui/glass-dock"
import { Home, Search, Settings, User } from "lucide-react"

export function Demo() {
  return (
    <GlassDock
      items={[
        { icon: <Home className="h-full w-full" />, label: "Home" },
        { icon: <Search className="h-full w-full" />, label: "Search" },
        { icon: <User className="h-full w-full" />, label: "Profile" },
        { icon: <Settings className="h-full w-full" />, label: "Settings" },
      ]}
    />
  )
}`,
    props: [
      {
        name: "items",
        type: "DockItem[]",
        default: "—",
        description:
          "Array of dock items with icon (ReactNode), label, and optional onClick handler.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "iconSize",
        type: "number",
        default: "24",
        description: "Size of the icons in pixels.",
      },
    ],
    component: () => import("@/app/components/ui/glass-dock"),
    demo: () => import("@/app/components/demos/glass-dock-demo"),
  },

  "liquid-ocean": {
    slug: "liquid-ocean",
    title: "Liquid Ocean",
    description:
      "Animated layered SVG waves with configurable colors, wave count, and speed for a mesmerizing ocean effect.",
    category: "visual",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LiquidOceanProps {
  className?: string
  color?: string
  waveCount?: number
  speed?: number
}

const LiquidOcean: React.FC<LiquidOceanProps> = ({
  className = '',
  color = 'var(--color-ignite)',
  waveCount = 4,
  speed = 6,
}) => {
  return (
    <div
      className={cn(
        'relative w-full h-64 overflow-hidden rounded-xl bg-obsidian border border-border',
        className
      )}
    >
      {Array.from({ length: waveCount }).map((_, i) => {
        const opacity = 0.08 + i * 0.04
        const yOffset = 40 + i * 20
        const dur = speed + i * 1.5

        return (
          <motion.div
            key={i}
            className="absolute left-0 right-0"
            style={{
              bottom: 0,
              height: \`\${yOffset}%\`,
            }}
          >
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="absolute bottom-0 w-[200%] h-full"
            >
              <motion.path
                d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z"
                fill={color}
                fillOpacity={opacity}
                animate={{ x: [0, -600] }}
                transition={{
                  duration: dur,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </svg>
          </motion.div>
        )
      })}

      {/* Surface shimmer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: \`linear-gradient(180deg, transparent 40%, \${color}08 100%)\`,
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export default LiquidOcean`,
    usage: `import LiquidOcean from "@/app/components/ui/liquid-ocean"

export function Demo() {
  return <LiquidOcean waveCount={4} speed={6} />
}`,
    props: [
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "color",
        type: "string",
        default: "'var(--color-ignite)'",
        description: "Color of the waves.",
      },
      {
        name: "waveCount",
        type: "number",
        default: "4",
        description: "Number of wave layers.",
      },
      {
        name: "speed",
        type: "number",
        default: "6",
        description: "Base animation speed in seconds.",
      },
    ],
    component: () => import("@/app/components/ui/liquid-ocean"),
    demo: () => import("@/app/components/demos/liquid-ocean-demo"),
  },

  "liquid-metal": {
    slug: "liquid-metal",
    title: "Liquid Metal",
    description:
      "A cursor-reactive surface with chrome-like liquid metal reflections that follow mouse movement.",
    category: "visual",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LiquidMetalProps {
  className?: string
  children?: React.ReactNode
  baseColor?: string
  highlightColor?: string
}

const LiquidMetal: React.FC<LiquidMetalProps> = ({
  className = '',
  children,
  baseColor = '#1c1a17',
  highlightColor = '#E84E2D',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  const background = useMotionTemplate\`
    radial-gradient(circle at \${mouseX}% \${mouseY}%, \${highlightColor}30 0%, transparent 50%),
    radial-gradient(circle at \${mouseX}% \${mouseY}%, \${highlightColor}15 0%, transparent 70%),
    linear-gradient(135deg, \${baseColor} 0%, \${baseColor}dd 50%, \${baseColor} 100%)
  \`

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100)
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  function handleMouseLeave() {
    mouseX.set(50)
    mouseY.set(50)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative w-full h-64 overflow-hidden rounded-xl border border-border cursor-crosshair',
        className
      )}
      style={{ background }}
    >
      {/* Chrome-like reflections */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: useMotionTemplate\`
            linear-gradient(
              \${mouseX}deg,
              transparent 20%,
              \${highlightColor}20 45%,
              \${highlightColor}40 50%,
              \${highlightColor}20 55%,
              transparent 80%
            )
          \`,
        }}
      />

      {/* Content */}
      {children && (
        <div className="relative z-10 flex h-full items-center justify-center">
          {children}
        </div>
      )}
    </motion.div>
  )
}

export default LiquidMetal`,
    usage: `import LiquidMetal from "@/app/components/ui/liquid-metal"

export function Demo() {
  return (
    <LiquidMetal>
      <span className="font-pixel text-2xl text-chalk">
        Move your cursor
      </span>
    </LiquidMetal>
  )
}`,
    props: [
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description: "Content to display inside the metal surface.",
      },
      {
        name: "baseColor",
        type: "string",
        default: "'#1c1a17'",
        description: "Base background color of the surface.",
      },
      {
        name: "highlightColor",
        type: "string",
        default: "'#E84E2D'",
        description: "Color of the metallic highlight reflections.",
      },
    ],
    component: () => import("@/app/components/ui/liquid-metal"),
    demo: () => import("@/app/components/demos/liquid-metal-demo"),
  },

  "reveal-loader": {
    slug: "reveal-loader",
    title: "Reveal Loader",
    description:
      "A loading animation with a curtain reveal effect — shows a progress bar, then slides away to reveal content underneath.",
    category: "visual",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RevealLoaderProps {
  className?: string
  duration?: number
  color?: string
  onComplete?: () => void
  children?: React.ReactNode
}

const RevealLoader: React.FC<RevealLoaderProps> = ({
  className = '',
  duration = 2,
  color = 'var(--color-ignite)',
  onComplete,
  children,
}) => {
  const [phase, setPhase] = useState<'loading' | 'revealing' | 'done'>('loading')

  useEffect(() => {
    const loadTimer = setTimeout(() => setPhase('revealing'), duration * 500)
    const revealTimer = setTimeout(() => {
      setPhase('done')
      onComplete?.()
    }, duration * 1000)

    return () => {
      clearTimeout(loadTimer)
      clearTimeout(revealTimer)
    }
  }, [duration, onComplete])

  return (
    <div
      className={cn(
        'relative w-full h-64 overflow-hidden rounded-xl border border-border bg-obsidian',
        className
      )}
    >
      {/* Content behind the curtain */}
      <div className="relative z-0 flex h-full items-center justify-center">
        {children || (
          <span className="font-pixel text-xl text-chalk">Content Revealed</span>
        )}
      </div>

      {/* Reveal curtain */}
      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center bg-obsidian"
            initial={{ clipPath: 'inset(0 0 0 0)' }}
            animate={
              phase === 'revealing'
                ? { clipPath: 'inset(0 0 100% 0)' }
                : { clipPath: 'inset(0 0 0 0)' }
            }
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: duration * 0.5, ease: [0.7, 0, 0.3, 1] }}
          >
            {/* Loading indicator */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
              <motion.div
                className="h-0.5 w-32 overflow-hidden rounded-full bg-border"
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: duration * 0.5, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RevealLoader`,
    usage: `import RevealLoader from "@/app/components/ui/reveal-loader"

export function Demo() {
  return (
    <RevealLoader duration={2.5}>
      <span className="font-pixel text-2xl text-ignite">
        Content Revealed!
      </span>
    </RevealLoader>
  )
}`,
    props: [
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
      {
        name: "duration",
        type: "number",
        default: "2",
        description: "Total animation duration in seconds.",
      },
      {
        name: "color",
        type: "string",
        default: "'var(--color-ignite)'",
        description: "Color of the loading indicator.",
      },
      {
        name: "onComplete",
        type: "() => void",
        default: "—",
        description: "Callback fired when the reveal animation completes.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description: "Content revealed after loading.",
      },
    ],
    component: () => import("@/app/components/ui/reveal-loader"),
    demo: () => import("@/app/components/demos/reveal-loader-demo"),
  },

  "animated-hero": {
    slug: "animated-hero",
    title: "Animated Hero",
    description:
      "A reusable hero section with staggered entrance animations, pulsing radial glow, grid background, badge, and dual CTA buttons.",
    category: "media",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedHeroProps {
  title: string
  subtitle?: string
  badge?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  title,
  subtitle,
  badge,
  primaryCta,
  secondaryCta,
  className = '',
}) => {
  return (
    <section
      className={cn(
        'relative flex min-h-[480px] flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-obsidian px-6 py-20 text-center',
        className
      )}
    >
      {/* Animated background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-ignite) 1px, transparent 1px), linear-gradient(90deg, var(--color-ignite) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Radial glow */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--color-ignite) 0%, transparent 70%)',
          opacity: 0.08,
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center rounded-full border border-ignite/20 bg-ignite/5 px-4 py-1.5"
        >
          <span className="text-xs font-medium tracking-wide text-ignite">
            {badge}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 max-w-3xl font-pixel text-4xl font-bold leading-tight text-chalk sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h1>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative z-10 mt-6 max-w-xl text-base leading-relaxed text-blush sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}

      {/* CTAs */}
      {(primaryCta || secondaryCta) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {primaryCta && (
            <a
              href={primaryCta.href}
              className="rounded-lg bg-ignite px-6 py-2.5 text-sm font-semibold text-void transition-colors hover:bg-ignite/90"
            >
              {primaryCta.label}
            </a>
          )}
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-chalk transition-colors hover:border-border-light hover:text-ignite"
            >
              {secondaryCta.label}
            </a>
          )}
        </motion.div>
      )}

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-obsidian to-transparent" />
    </section>
  )
}

export default AnimatedHero`,
    usage: `import AnimatedHero from "@/app/components/ui/animated-hero"

export function Demo() {
  return (
    <AnimatedHero
      badge="New Release"
      title="Build Stunning Interfaces"
      subtitle="Copy-paste animated components for your Next.js projects."
      primaryCta={{ label: "Get Started", href: "#" }}
      secondaryCta={{ label: "Browse Components", href: "#" }}
    />
  )
}`,
    props: [
      {
        name: "title",
        type: "string",
        default: "—",
        description: "The main heading text.",
      },
      {
        name: "subtitle",
        type: "string",
        default: "—",
        description: "Optional subheading text below the title.",
      },
      {
        name: "badge",
        type: "string",
        default: "—",
        description: "Optional badge text shown above the title.",
      },
      {
        name: "primaryCta",
        type: "{ label: string; href: string }",
        default: "—",
        description: "Primary call-to-action button.",
      },
      {
        name: "secondaryCta",
        type: "{ label: string; href: string }",
        default: "—",
        description: "Secondary call-to-action button.",
      },
      {
        name: "className",
        type: "string",
        default: "''",
        description: "Additional CSS classes.",
      },
    ],
    component: () => import("@/app/components/ui/animated-hero"),
    demo: () => import("@/app/components/demos/animated-hero-demo"),
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
