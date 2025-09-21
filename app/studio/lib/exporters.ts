import {
    AnimationConfig,
    AnimationKeyframe,
    buildTransformString,
    SequencerConfig,
    MotionPathConfig,
    PathPoint,
    SpringConfig,
} from './types'
import { easingToCubicPoints } from './easing'

export function generateCSS(
    config: AnimationConfig,
    sequencer?: SequencerConfig,
    motionPath?: MotionPathConfig,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    springConfig?: SpringConfig,
): string {
    const lines: string[] = []

    if (motionPath?.enabled && motionPath.points.length >= 2) {
        const d = pointsToSvgD(motionPath.points)
        lines.push(`@keyframes praxys-animation {`)
        lines.push(`  0% { offset-distance: 0%; }`)
        lines.push(`  100% { offset-distance: 100%; }`)
        lines.push('}')
        lines.push('')
        const iter = config.iterationCount === 'infinite' ? 'infinite' : String(config.iterationCount)
        lines.push(`.animate-praxys {`)
        lines.push(`  offset-path: path('${d}');`)
        if (motionPath.autoRotate) lines.push(`  offset-rotate: auto;`)
        lines.push(`  animation: praxys-animation ${config.duration}s ${config.easing} ${config.delay}s ${iter} ${config.direction} ${config.fillMode};`)
        lines.push('}')
    } else {
        lines.push('@keyframes praxys-animation {')
        for (const kf of config.keyframes) {
            const pct = Math.round(kf.offset * 100)
            const transform = buildTransformString(kf)
            lines.push(`  ${pct}% {`)
            if (transform !== 'none') lines.push(`    transform: ${transform};`)
            if (kf.opacity !== 1) lines.push(`    opacity: ${kf.opacity};`)
            if (transform === 'none' && kf.opacity === 1) lines.push(`    transform: none;`)
            lines.push(`  }`)
        }
        lines.push('}')
        lines.push('')
        const iter = config.iterationCount === 'infinite' ? 'infinite' : String(config.iterationCount)
        lines.push(`.animate-praxys {`)
        lines.push(`  animation: praxys-animation ${config.duration}s ${config.easing} ${config.delay}s ${iter} ${config.direction} ${config.fillMode};`)
        lines.push('}')
    }

    if (sequencer?.enabled) {
        lines.push('')
        lines.push(`/* Stagger: apply to ${sequencer.elementCount} children */`)
        for (let i = 0; i < sequencer.elementCount; i++) {
            const delay = computeStaggerDelay(i, sequencer)
            lines.push(`.animate-praxys:nth-child(${i + 1}) { animation-delay: ${(config.delay + delay).toFixed(3)}s; }`)
        }
    }

    return lines.join('\n')
}

export function generateFramerMotion(
    config: AnimationConfig,
    sequencer?: SequencerConfig,
    motionPath?: MotionPathConfig,
    springConfig?: SpringConfig,
    easingMode?: string,
): string {
    const kfs = config.keyframes

    if (motionPath?.enabled && motionPath.points.length >= 2) {
        const samples = samplePathAtIntervals(motionPath.points, 20)
        const xs = samples.map(p => Math.round(p.x))
        const ys = samples.map(p => Math.round(p.y))
        const times = samples.map((_, i) => +(i / (samples.length - 1)).toFixed(3))

        const transition: Record<string, unknown> = { duration: config.duration, times }
        if (config.delay > 0) transition.delay = config.delay

        return `<motion.div\n  animate={{ x: ${JSON.stringify(xs)}, y: ${JSON.stringify(ys)} }}\n  transition={${JSON.stringify(transition)}}\n/>`
    }

    const buildTransition = (): Record<string, unknown> => {
        if (easingMode === 'spring' && springConfig) {
            const t: Record<string, unknown> = {
                type: 'spring',
                mass: springConfig.mass,
                stiffness: springConfig.stiffness,
                damping: springConfig.damping,
                velocity: springConfig.velocity,
            }
            if (config.delay > 0) t.delay = config.delay
            return t
        }

        const [x1, y1, x2, y2] = easingToCubicPoints(config.easing)
        const t: Record<string, unknown> = {
            duration: config.duration,
            ease: config.easing === 'linear' ? [0, 0, 1, 1] : [x1, y1, x2, y2],
        }
        if (config.delay > 0) t.delay = config.delay
        if (config.iterationCount === 'infinite') t.repeat = 'Infinity'
        if (config.direction === 'alternate' || config.direction === 'alternate-reverse') t.repeatType = 'reverse'
        return t
    }

    if (sequencer?.enabled) {
        const transition = buildTransition()
        const variants: Record<string, unknown> = {
            hidden: keyframeToFramerProps(kfs[0]),
            visible: {
                ...keyframeToFramerProps(kfs[kfs.length - 1]),
                transition: {
                    ...transition,
                    staggerChildren: sequencer.staggerDelay,
                    ...(sequencer.staggerDirection === 'reverse' ? { staggerDirection: -1 } : {}),
                },
            },
        }
        return `const variants = ${JSON.stringify(variants, null, 2)}\n\n<motion.div variants={variants} initial="hidden" animate="visible">\n  {children.map((child, i) => (\n    <motion.div key={i} variants={variants} />\n  ))}\n</motion.div>`
    }

    if (kfs.length === 2) {
        const from = kfs[0]
        const to = kfs[1]
        const initial: Record<string, number> = {}
        const animate: Record<string, number> = {}
        if (from.translateX !== 0 || to.translateX !== 0) { initial.x = from.translateX; animate.x = to.translateX }
        if (from.translateY !== 0 || to.translateY !== 0) { initial.y = from.translateY; animate.y = to.translateY }
        if (from.scale !== 1 || to.scale !== 1) { initial.scale = from.scale; animate.scale = to.scale }
        if (from.rotate !== 0 || to.rotate !== 0) { initial.rotate = from.rotate; animate.rotate = to.rotate }
        if (from.skewX !== 0 || to.skewX !== 0) { initial.skewX = from.skewX; animate.skewX = to.skewX }
        if (from.skewY !== 0 || to.skewY !== 0) { initial.skewY = from.skewY; animate.skewY = to.skewY }
        if (from.opacity !== 1 || to.opacity !== 1) { initial.opacity = from.opacity; animate.opacity = to.opacity }

        const transition = buildTransition()
        return `<motion.div\n  initial={${JSON.stringify(initial)}}\n  animate={${JSON.stringify(animate)}}\n  transition={${JSON.stringify(transition)}}\n/>`
    }

    // Multi-keyframe — use array values
    const props: Record<string, number[]> = {}
    const keys = ['translateX', 'translateY', 'scale', 'rotate', 'skewX', 'skewY', 'opacity'] as const
    const framerKeys: Record<string, string> = { translateX: 'x', translateY: 'y', scale: 'scale', rotate: 'rotate', skewX: 'skewX', skewY: 'skewY', opacity: 'opacity' }
    for (const k of keys) {
        const vals = kfs.map(kf => kf[k])
        const defaultVal = k === 'scale' || k === 'opacity' ? 1 : 0
        if (vals.some(v => v !== defaultVal)) {
            props[framerKeys[k]] = vals
        }
    }
    const times = kfs.map(kf => kf.offset)
    const transition = buildTransition()
    if (kfs.length > 2) (transition as Record<string, unknown>).times = times

    const animateObj: Record<string, number[]> = {}
    for (const [k, v] of Object.entries(props)) animateObj[k] = v
    const initialObj: Record<string, number> = {}
    for (const [k, v] of Object.entries(props)) initialObj[k] = v[0]

    return `<motion.div\n  initial={${JSON.stringify(initialObj)}}\n  animate={${JSON.stringify(animateObj)}}\n  transition={${JSON.stringify(transition)}}\n/>`
}

export function generateTailwind(
    config: AnimationConfig,
    sequencer?: SequencerConfig,
): string {
    const lines: string[] = ['// tailwind.config.js', 'module.exports = {', '  theme: {', '    extend: {', '      keyframes: {']
    lines.push(`        'praxys-animation': {`)
    for (const kf of config.keyframes) {
        const pct = `${Math.round(kf.offset * 100)}%`
        const transform = buildTransformString(kf)
        const props: string[] = []
        if (transform !== 'none') props.push(`transform: '${transform}'`)
        if (kf.opacity !== 1) props.push(`opacity: '${kf.opacity}'`)
        if (props.length === 0) props.push(`transform: 'none'`)
        lines.push(`          '${pct}': { ${props.join(', ')} },`)
    }
    lines.push(`        },`)
    lines.push(`      },`)
    const iter = config.iterationCount === 'infinite' ? 'infinite' : String(config.iterationCount)
    lines.push(`      animation: {`)
    lines.push(`        'praxys': 'praxys-animation ${config.duration}s ${config.easing} ${config.delay}s ${iter} ${config.direction} ${config.fillMode}',`)
    lines.push(`      },`)
    lines.push(`    },`)
    lines.push(`  },`)
    lines.push(`}`)
    lines.push('')
    lines.push(`// Usage: <div className="animate-praxys" />`)

    if (sequencer?.enabled) {
        lines.push('')
        lines.push(`// Stagger delays for ${sequencer.elementCount} children:`)
        for (let i = 0; i < sequencer.elementCount; i++) {
            const delay = computeStaggerDelay(i, sequencer)
            lines.push(`// Child ${i + 1}: className="animate-praxys [animation-delay:${Math.round((config.delay + delay) * 1000)}ms]"`)
        }
    }

    return lines.join('\n')
}

function slugToPascalCase(slug: string): string {
    return slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

export function generateReactComponent(
    config: AnimationConfig,
    easingMode?: string,
    springConfig?: SpringConfig,
    componentSlug?: string,
): string {
    const kfs = config.keyframes
    const lines: string[] = []
    lines.push(`'use client'`)
    lines.push(``)
    lines.push(`import { motion } from 'framer-motion'`)

    if (componentSlug) {
        const componentName = slugToPascalCase(componentSlug)
        lines.push(`import ${componentName} from '@/app/components/ui/${componentSlug}'`)
    }

    lines.push(``)

    const funcName = componentSlug ? `Animated${slugToPascalCase(componentSlug)}` : 'PraxysAnimation'
    lines.push(`export default function ${funcName}(${componentSlug ? '' : '{ children }: { children?: React.ReactNode }'}) {`)

    // Build animate object
    const keys = ['translateX', 'translateY', 'scale', 'rotate', 'skewX', 'skewY', 'opacity', 'rotateX', 'rotateY'] as const
    const framerMap: Record<string, string> = {
        translateX: 'x', translateY: 'y', scale: 'scale', rotate: 'rotate',
        skewX: 'skewX', skewY: 'skewY', opacity: 'opacity', rotateX: 'rotateX', rotateY: 'rotateY',
    }

    const animateProps: Record<string, number[]> = {}
    for (const k of keys) {
        const vals = kfs.map(kf => (kf[k] as number) ?? (k === 'scale' || k === 'opacity' ? 1 : 0))
        const defaultVal = k === 'scale' || k === 'opacity' ? 1 : 0
        if (vals.some(v => v !== defaultVal)) {
            animateProps[framerMap[k]] = vals
        }
    }

    const times = kfs.map(kf => kf.offset)

    let transitionStr: string
    if (easingMode === 'spring' && springConfig) {
        transitionStr = JSON.stringify({
            type: 'spring',
            mass: springConfig.mass,
            stiffness: springConfig.stiffness,
            damping: springConfig.damping,
            velocity: springConfig.velocity,
            ...(kfs.length > 2 ? { times } : {}),
        }, null, 4)
    } else {
        const [x1, y1, x2, y2] = easingToCubicPoints(config.easing)
        transitionStr = JSON.stringify({
            duration: config.duration,
            ease: config.easing === 'linear' ? [0, 0, 1, 1] : [x1, y1, x2, y2],
            ...(config.delay > 0 ? { delay: config.delay } : {}),
            ...(config.iterationCount === 'infinite' ? { repeat: Infinity } : {}),
            ...(kfs.length > 2 ? { times } : {}),
        }, null, 4)
    }

    const initialObj: Record<string, number> = {}
    for (const [k, v] of Object.entries(animateProps)) initialObj[k] = v[0]

    lines.push(`  return (`)
    lines.push(`    <motion.div`)
    lines.push(`      initial={${JSON.stringify(initialObj)}}`)
    lines.push(`      animate={${JSON.stringify(animateProps)}}`)
    lines.push(`      transition={${transitionStr}}`)
    lines.push(`    >`)
    if (componentSlug) {
        const componentName = slugToPascalCase(componentSlug)
        lines.push(`      <${componentName} />`)
    } else {
        lines.push(`      {children}`)
    }
    lines.push(`    </motion.div>`)
    lines.push(`  )`)
    lines.push(`}`)
    return lines.join('\n')
}

export function generateGSAP(
    config: AnimationConfig,
    springConfig?: SpringConfig,
    easingMode?: string,
): string {
    const kfs = [...config.keyframes].sort((a, b) => a.offset - b.offset)
    const lines: string[] = []
    lines.push(`import gsap from 'gsap'`)
    lines.push(``)
    lines.push(`const el = document.querySelector('.animate-praxys')`)
    lines.push(`const tl = gsap.timeline()`)
    lines.push(``)

    if (kfs.length > 0) {
        const first = kfs[0]
        lines.push(`gsap.set(el, {`)
        if (first.translateX !== 0) lines.push(`  x: ${first.translateX},`)
        if (first.translateY !== 0) lines.push(`  y: ${first.translateY},`)
        if (first.scale !== 1) lines.push(`  scale: ${first.scale},`)
        if (first.rotate !== 0) lines.push(`  rotation: ${first.rotate},`)
        if (first.rotateX) lines.push(`  rotationX: ${first.rotateX},`)
        if (first.rotateY) lines.push(`  rotationY: ${first.rotateY},`)
        if (first.opacity !== 1) lines.push(`  opacity: ${first.opacity},`)
        lines.push(`})`)
        lines.push(``)
    }

    const defaultEase = easingMode === 'spring' ? 'elastic.out(1, 0.3)' : gsapEaseString(config.easing)

    for (let i = 1; i < kfs.length; i++) {
        const curr = kfs[i]
        const prev = kfs[i - 1]
        const dur = +((curr.offset - prev.offset) * config.duration).toFixed(3)
        const ease = curr.easing ? gsapEaseString(curr.easing) : defaultEase

        lines.push(`tl.to(el, {`)
        lines.push(`  duration: ${dur},`)
        if (curr.translateX !== 0) lines.push(`  x: ${curr.translateX},`)
        if (curr.translateY !== 0) lines.push(`  y: ${curr.translateY},`)
        if (curr.scale !== 1) lines.push(`  scale: ${curr.scale},`)
        if (curr.rotate !== 0) lines.push(`  rotation: ${curr.rotate},`)
        if (curr.rotateX) lines.push(`  rotationX: ${curr.rotateX},`)
        if (curr.rotateY) lines.push(`  rotationY: ${curr.rotateY},`)
        if (curr.opacity !== 1) lines.push(`  opacity: ${curr.opacity},`)
        lines.push(`  ease: '${ease}',`)
        lines.push(`})`)
        lines.push(``)
    }

    if (config.iterationCount === 'infinite') {
        lines.push(`tl.repeat(-1)`)
    }
    if (config.direction === 'alternate' || config.direction === 'alternate-reverse') {
        lines.push(`tl.yoyo(true)`)
    }

    return lines.join('\n')
}

export function generateLottie(config: AnimationConfig): string {
    const kfs = [...config.keyframes].sort((a, b) => a.offset - b.offset)
    const fps = 60
    const totalFrames = Math.round(config.duration * fps)

    const positionKfs = kfs.map(kf => ({
        t: Math.round(kf.offset * totalFrames),
        s: [150 + kf.translateX, 150 + kf.translateY],
    }))

    const scaleKfs = kfs.map(kf => ({
        t: Math.round(kf.offset * totalFrames),
        s: [kf.scale * 100, kf.scale * 100],
    }))

    const rotationKfs = kfs.map(kf => ({
        t: Math.round(kf.offset * totalFrames),
        s: [kf.rotate],
    }))

    const opacityKfs = kfs.map(kf => ({
        t: Math.round(kf.offset * totalFrames),
        s: [kf.opacity * 100],
    }))

    const lottie = {
        v: '5.7.4',
        fr: fps,
        ip: 0,
        op: totalFrames,
        w: 300,
        h: 300,
        layers: [
            {
                ty: 4,
                nm: 'Shape',
                ip: 0,
                op: totalFrames,
                st: 0,
                ks: {
                    p: { a: 1, k: positionKfs.map((kf, i) => ({ t: kf.t, s: kf.s, ...(i < positionKfs.length - 1 ? { i: { x: [0.4], y: [0] }, o: { x: [0.2], y: [1] } } : {}) })) },
                    s: { a: 1, k: scaleKfs.map((kf, i) => ({ t: kf.t, s: kf.s, ...(i < scaleKfs.length - 1 ? { i: { x: [0.4], y: [0] }, o: { x: [0.2], y: [1] } } : {}) })) },
                    r: { a: 1, k: rotationKfs.map((kf, i) => ({ t: kf.t, s: kf.s, ...(i < rotationKfs.length - 1 ? { i: { x: [0.4], y: [0] }, o: { x: [0.2], y: [1] } } : {}) })) },
                    o: { a: 1, k: opacityKfs.map((kf, i) => ({ t: kf.t, s: kf.s, ...(i < opacityKfs.length - 1 ? { i: { x: [0.4], y: [0] }, o: { x: [0.2], y: [1] } } : {}) })) },
                },
                shapes: [
                    {
                        ty: 'rc',
                        p: { a: 0, k: [0, 0] },
                        s: { a: 0, k: [100, 100] },
                        r: { a: 0, k: 12 },
                    },
                    {
                        ty: 'fl',
                        c: { a: 0, k: [0.91, 0.31, 0.18, 1] },
                        o: { a: 0, k: 100 },
                    },
                ],
            },
        ],
    }

    return JSON.stringify(lottie, null, 2)
}

// ── Helpers ──

function gsapEaseString(cssEasing: string): string {
    if (cssEasing === 'linear') return 'none'
    if (cssEasing === 'ease') return 'power1.inOut'
    if (cssEasing === 'ease-in') return 'power2.in'
    if (cssEasing === 'ease-out') return 'power2.out'
    if (cssEasing === 'ease-in-out') return 'power2.inOut'
    const m = cssEasing.match(/cubic-bezier\(([\d.,\s]+)\)/)
    if (m) return `cubic-bezier(${m[1]})`
    return 'power1.inOut'
}

function keyframeToFramerProps(kf: AnimationKeyframe): Record<string, number> {
    const props: Record<string, number> = {}
    if (kf.translateX !== 0) props.x = kf.translateX
    if (kf.translateY !== 0) props.y = kf.translateY
    if (kf.scale !== 1) props.scale = kf.scale
    if (kf.rotate !== 0) props.rotate = kf.rotate
    if (kf.rotateX) props.rotateX = kf.rotateX
    if (kf.rotateY) props.rotateY = kf.rotateY
    if (kf.opacity !== 1) props.opacity = kf.opacity
    return props
}

function computeStaggerDelay(index: number, seq: SequencerConfig): number {
    const count = seq.elementCount
    switch (seq.staggerDirection) {
        case 'forward': return index * seq.staggerDelay
        case 'reverse': return (count - 1 - index) * seq.staggerDelay
        case 'center': {
            const mid = (count - 1) / 2
            return Math.abs(index - mid) * seq.staggerDelay
        }
        case 'random': return Math.random() * (count - 1) * seq.staggerDelay
        default: return index * seq.staggerDelay
    }
}

function pointsToSvgD(points: PathPoint[]): string {
    if (points.length < 2) return ''
    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1]
        const curr = points[i]
        d += ` C ${prev.cx2} ${prev.cy2}, ${curr.cx1} ${curr.cy1}, ${curr.x} ${curr.y}`
    }
    return d
}

function samplePathAtIntervals(points: PathPoint[], steps: number): { x: number; y: number }[] {
    if (points.length < 2) return []
    const samples: { x: number; y: number }[] = []
    for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const totalSegments = points.length - 1
        const segFloat = t * totalSegments
        const seg = Math.min(Math.floor(segFloat), totalSegments - 1)
        const segT = segFloat - seg

        const p0 = points[seg]
        const p1 = points[seg + 1]
        const x = cubicBezierSample(p0.x, p0.cx2, p1.cx1, p1.x, segT)
        const y = cubicBezierSample(p0.y, p0.cy2, p1.cy1, p1.y, segT)
        samples.push({ x, y })
    }
    return samples
}

function cubicBezierSample(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const u = 1 - t
    return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}
