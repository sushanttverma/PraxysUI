import gsap from 'gsap'
import { AnimationKeyframe, AnimationChain } from './types'
import { easingToGsap } from './easing'

export interface BuildTimelineOptions {
    target: HTMLElement
    keyframes: AnimationKeyframe[]
    easing: string
    duration: number
    onUpdate?: (progress: number) => void
}

export function buildTimeline(opts: BuildTimelineOptions): gsap.core.Timeline {
    const { target, keyframes, easing, duration, onUpdate } = opts
    const sorted = [...keyframes].sort((a, b) => a.offset - b.offset)

    const tl = gsap.timeline({
        paused: true,
        onUpdate: () => {
            onUpdate?.(tl.progress())
        },
    })

    if (sorted.length === 0) return tl

    // Set initial state from first keyframe
    const first = sorted[0]
    gsap.set(target, {
        x: first.translateX,
        y: first.translateY,
        scale: first.scale,
        rotation: first.rotate,
        rotationX: first.rotateX ?? 0,
        rotationY: first.rotateY ?? 0,
        skewX: first.skewX,
        skewY: first.skewY,
        opacity: first.opacity,
    })

    const gsapEase = easingToGsap(easing)

    // Build segment tweens between consecutive keyframes
    for (let i = 1; i < sorted.length; i++) {
        const prev = sorted[i - 1]
        const curr = sorted[i]
        const segmentDuration = (curr.offset - prev.offset) * duration
        const segmentEase = curr.easing ? easingToGsap(curr.easing) : gsapEase

        tl.to(target, {
            x: curr.translateX,
            y: curr.translateY,
            scale: curr.scale,
            rotation: curr.rotate,
            rotationX: curr.rotateX ?? 0,
            rotationY: curr.rotateY ?? 0,
            skewX: curr.skewX,
            skewY: curr.skewY,
            opacity: curr.opacity,
            duration: segmentDuration,
            ease: segmentEase,
        })
    }

    return tl
}

/** Build staggered timelines for sequencer mode */
export function buildStaggeredTimelines(
    targets: HTMLElement[],
    keyframes: AnimationKeyframe[],
    easing: string,
    duration: number,
    staggerDelay: number,
    staggerDirection: 'forward' | 'reverse' | 'center' | 'random',
    onUpdate?: (progress: number) => void,
): gsap.core.Timeline {
    const masterTl = gsap.timeline({
        paused: true,
        onUpdate: () => {
            onUpdate?.(masterTl.progress())
        },
    })

    const count = targets.length
    const delays = targets.map((_, i) => {
        switch (staggerDirection) {
            case 'forward': return i * staggerDelay
            case 'reverse': return (count - 1 - i) * staggerDelay
            case 'center': {
                const mid = (count - 1) / 2
                return Math.abs(i - mid) * staggerDelay
            }
            case 'random': return Math.random() * (count - 1) * staggerDelay
            default: return i * staggerDelay
        }
    })

    targets.forEach((target, i) => {
        const childTl = buildTimeline({
            target,
            keyframes,
            easing,
            duration,
        })
        masterTl.add(childTl.play(), delays[i])
    })

    return masterTl
}

/** Build a chained timeline (enter → idle → exit) */
export function buildChainedTimeline(
    target: HTMLElement,
    chain: AnimationChain,
    easing: string,
    onUpdate?: (progress: number) => void,
): gsap.core.Timeline {
    const masterTl = gsap.timeline({
        paused: true,
        onUpdate: () => {
            onUpdate?.(masterTl.progress())
        },
    })

    const enterTl = buildTimeline({
        target,
        keyframes: chain.enter.keyframes,
        easing,
        duration: chain.enterDuration,
    })
    const idleTl = buildTimeline({
        target,
        keyframes: chain.idle.keyframes,
        easing,
        duration: chain.idleDuration,
    })
    const exitTl = buildTimeline({
        target,
        keyframes: chain.exit.keyframes,
        easing,
        duration: chain.exitDuration,
    })

    masterTl.add(enterTl.play())
    masterTl.add(idleTl.play())
    masterTl.add(exitTl.play())

    return masterTl
}

/** Build a timeline that follows a motion path */
export function buildMotionPathTimeline(
    target: HTMLElement,
    pathPoints: { x: number; y: number }[],
    duration: number,
    easing: string,
    autoRotate: boolean,
    onUpdate?: (progress: number) => void,
): gsap.core.Timeline {
    const tl = gsap.timeline({
        paused: true,
        onUpdate: () => {
            onUpdate?.(tl.progress())
        },
    })

    if (pathPoints.length < 2) return tl

    const gsapEase = easingToGsap(easing)

    // Set initial position
    gsap.set(target, { x: pathPoints[0].x, y: pathPoints[0].y })

    // Create keyframe-like tweens along the path
    const totalPoints = pathPoints.length
    for (let i = 1; i < totalPoints; i++) {
        const segDuration = duration / (totalPoints - 1)
        const point = pathPoints[i]
        const prevPoint = pathPoints[i - 1]

        const tweenVars: gsap.TweenVars = {
            x: point.x,
            y: point.y,
            duration: segDuration,
            ease: i === totalPoints - 1 ? gsapEase : 'none',
        }

        if (autoRotate && i > 0) {
            const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) * (180 / Math.PI)
            tweenVars.rotation = angle
        }

        tl.to(target, tweenVars)
    }

    return tl
}
