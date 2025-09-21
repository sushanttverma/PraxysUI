export interface AnimationKeyframe {
    id: string
    offset: number
    translateX: number
    translateY: number
    scale: number
    rotate: number
    skewX: number
    skewY: number
    opacity: number
    rotateX?: number
    rotateY?: number
    perspective?: number
    easing?: string
}

export interface AnimationConfig {
    keyframes: AnimationKeyframe[]
    duration: number
    delay: number
    easing: string
    iterationCount: number | 'infinite'
    direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
    fillMode: 'none' | 'forwards' | 'backwards' | 'both'
}

export type BasicShape = 'box' | 'circle' | 'card' | 'text'
export type PreviewShape = BasicShape | `registry:${string}`

export function isRegistryShape(shape: PreviewShape): shape is `registry:${string}` {
    return typeof shape === 'string' && shape.startsWith('registry:')
}

export function getRegistrySlug(shape: PreviewShape): string | null {
    return isRegistryShape(shape) ? shape.slice(9) : null
}
export type ExportFormat = 'css' | 'framer' | 'tailwind' | 'react-component' | 'gsap' | 'lottie'
export type EasingMode = 'named' | 'cubic-bezier' | 'spring'
export type StaggerDirection = 'forward' | 'reverse' | 'center' | 'random'

export interface SpringConfig {
    mass: number
    stiffness: number
    damping: number
    velocity: number
}

export interface SequencerConfig {
    enabled: boolean
    elementCount: number
    staggerDelay: number
    staggerDirection: StaggerDirection
}

export interface PathPoint {
    x: number
    y: number
    cx1: number
    cy1: number
    cx2: number
    cy2: number
}

export interface MotionPathConfig {
    enabled: boolean
    points: PathPoint[]
    autoRotate: boolean
}

export interface RecordingState {
    isRecording: boolean
    progress: number
}

export type ChainPhase = 'enter' | 'idle' | 'exit'

export interface AnimationChain {
    enabled: boolean
    activePhase: ChainPhase
    enter: AnimationConfig
    idle: AnimationConfig
    exit: AnimationConfig
    enterDuration: number
    idleDuration: number
    exitDuration: number
}

export interface GridSnapConfig {
    enabled: boolean
    size: number
}

export interface ComparisonConfig {
    enabled: boolean
    configB: AnimationConfig
    easingB: string
}

export interface OnionSkinConfig {
    enabled: boolean
    opacity: number
}

export interface AnimationPreset {
    name: string
    config: AnimationConfig
}

export function makeKeyframe(offset: number, overrides: Partial<AnimationKeyframe> = {}): AnimationKeyframe {
    return {
        id: `kf-${offset}-${Date.now()}`,
        offset,
        translateX: 0,
        translateY: 0,
        scale: 1,
        rotate: 0,
        skewX: 0,
        skewY: 0,
        opacity: 1,
        ...overrides,
    }
}

export function makeDefaultChain(baseConfig: AnimationConfig): AnimationChain {
    return {
        enabled: false,
        activePhase: 'enter',
        enter: { ...baseConfig },
        idle: { ...baseConfig, keyframes: baseConfig.keyframes.map(kf => ({ ...kf })) },
        exit: { ...baseConfig, keyframes: baseConfig.keyframes.map(kf => ({ ...kf })) },
        enterDuration: 0.5,
        idleDuration: 1,
        exitDuration: 0.5,
    }
}

export function buildTransformString(kf: AnimationKeyframe): string {
    const parts: string[] = []
    if (kf.perspective) parts.push(`perspective(${kf.perspective}px)`)
    if (kf.translateX !== 0) parts.push(`translateX(${kf.translateX}px)`)
    if (kf.translateY !== 0) parts.push(`translateY(${kf.translateY}px)`)
    if (kf.scale !== 1) parts.push(`scale(${kf.scale})`)
    if (kf.rotate !== 0) parts.push(`rotate(${kf.rotate}deg)`)
    if (kf.rotateX) parts.push(`rotateX(${kf.rotateX}deg)`)
    if (kf.rotateY) parts.push(`rotateY(${kf.rotateY}deg)`)
    if (kf.skewX !== 0) parts.push(`skewX(${kf.skewX}deg)`)
    if (kf.skewY !== 0) parts.push(`skewY(${kf.skewY}deg)`)
    return parts.length > 0 ? parts.join(' ') : 'none'
}
