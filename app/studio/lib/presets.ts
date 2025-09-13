import { AnimationPreset, makeKeyframe } from './types'

export interface PresetCategory {
    label: string
    presets: AnimationPreset[]
}

// ─── Basic ──────────────────────────────────────────────

const basicPresets: AnimationPreset[] = [
    {
        name: 'fadeIn',
        config: {
            keyframes: [makeKeyframe(0, { opacity: 0 }), makeKeyframe(1, { opacity: 1 })],
            duration: 0.6, delay: 0, easing: 'ease-out', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'fadeOut',
        config: {
            keyframes: [makeKeyframe(0, { opacity: 1 }), makeKeyframe(1, { opacity: 0 })],
            duration: 0.6, delay: 0, easing: 'ease-in', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'slideUp',
        config: {
            keyframes: [makeKeyframe(0, { translateY: 40, opacity: 0 }), makeKeyframe(1, { translateY: 0, opacity: 1 })],
            duration: 0.5, delay: 0, easing: 'ease-out', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'slideDown',
        config: {
            keyframes: [makeKeyframe(0, { translateY: -40, opacity: 0 }), makeKeyframe(1, { translateY: 0, opacity: 1 })],
            duration: 0.5, delay: 0, easing: 'ease-out', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'slideLeft',
        config: {
            keyframes: [makeKeyframe(0, { translateX: 40, opacity: 0 }), makeKeyframe(1, { translateX: 0, opacity: 1 })],
            duration: 0.5, delay: 0, easing: 'ease-out', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'slideRight',
        config: {
            keyframes: [makeKeyframe(0, { translateX: -40, opacity: 0 }), makeKeyframe(1, { translateX: 0, opacity: 1 })],
            duration: 0.5, delay: 0, easing: 'ease-out', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'scaleIn',
        config: {
            keyframes: [makeKeyframe(0, { scale: 0, opacity: 0 }), makeKeyframe(1, { scale: 1, opacity: 1 })],
            duration: 0.4, delay: 0, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'scaleOut',
        config: {
            keyframes: [makeKeyframe(0, { scale: 1, opacity: 1 }), makeKeyframe(1, { scale: 0, opacity: 0 })],
            duration: 0.3, delay: 0, easing: 'ease-in', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'bounce',
        config: {
            keyframes: [
                makeKeyframe(0, { translateY: 0, scale: 1 }),
                makeKeyframe(0.5, { translateY: -30, scale: 1.05 }),
                makeKeyframe(1, { translateY: 0, scale: 1 }),
            ],
            duration: 0.6, delay: 0, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iterationCount: 1, direction: 'normal', fillMode: 'none',
        },
    },
    {
        name: 'pulse',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 1, opacity: 1 }),
                makeKeyframe(0.5, { scale: 1.08, opacity: 0.8 }),
                makeKeyframe(1, { scale: 1, opacity: 1 }),
            ],
            duration: 1, delay: 0, easing: 'ease-in-out', iterationCount: 'infinite', direction: 'normal', fillMode: 'none',
        },
    },
    {
        name: 'shake',
        config: {
            keyframes: [
                makeKeyframe(0, { translateX: 0 }),
                makeKeyframe(0.5, { translateX: -12 }),
                makeKeyframe(1, { translateX: 0 }),
            ],
            duration: 0.4, delay: 0, easing: 'ease-in-out', iterationCount: 1, direction: 'alternate', fillMode: 'none',
        },
    },
    {
        name: 'spin',
        config: {
            keyframes: [makeKeyframe(0, { rotate: 0 }), makeKeyframe(1, { rotate: 360 })],
            duration: 1, delay: 0, easing: 'linear', iterationCount: 'infinite', direction: 'normal', fillMode: 'none',
        },
    },
    {
        name: 'flip',
        config: {
            keyframes: [
                makeKeyframe(0, { rotate: 0, scale: 1 }),
                makeKeyframe(0.5, { rotate: 180, scale: 0.9 }),
                makeKeyframe(1, { rotate: 360, scale: 1 }),
            ],
            duration: 0.8, delay: 0, easing: 'ease-in-out', iterationCount: 1, direction: 'normal', fillMode: 'none',
        },
    },
]

// ─── Hero / Landing ─────────────────────────────────────

const heroPresets: AnimationPreset[] = [
    {
        name: 'heroReveal',
        config: {
            keyframes: [
                makeKeyframe(0, { translateY: 80, opacity: 0, scale: 0.9 }),
                makeKeyframe(0.6, { translateY: -8, opacity: 1, scale: 1.02 }),
                makeKeyframe(1, { translateY: 0, opacity: 1, scale: 1 }),
            ],
            duration: 1.2, delay: 0, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'heroFloat',
        config: {
            keyframes: [
                makeKeyframe(0, { translateY: 0, rotate: 0 }),
                makeKeyframe(0.25, { translateY: -12, rotate: 1 }),
                makeKeyframe(0.5, { translateY: 0, rotate: 0 }),
                makeKeyframe(0.75, { translateY: -8, rotate: -1 }),
                makeKeyframe(1, { translateY: 0, rotate: 0 }),
            ],
            duration: 4, delay: 0, easing: 'ease-in-out', iterationCount: 'infinite', direction: 'normal', fillMode: 'none',
        },
    },
    {
        name: 'heroZoom',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 0.3, opacity: 0, rotate: -8 }),
                makeKeyframe(0.5, { scale: 1.08, opacity: 1, rotate: 2 }),
                makeKeyframe(0.7, { scale: 0.96, opacity: 1, rotate: -1 }),
                makeKeyframe(1, { scale: 1, opacity: 1, rotate: 0 }),
            ],
            duration: 1, delay: 0, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'cascadeIn',
        config: {
            keyframes: [
                makeKeyframe(0, { translateY: 60, translateX: -30, opacity: 0, scale: 0.85 }),
                makeKeyframe(0.7, { translateY: -4, translateX: 2, opacity: 1, scale: 1.02 }),
                makeKeyframe(1, { translateY: 0, translateX: 0, opacity: 1, scale: 1 }),
            ],
            duration: 0.9, delay: 0, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'cinematic',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 1.3, opacity: 0 }),
                makeKeyframe(0.4, { scale: 1, opacity: 1 }),
                makeKeyframe(1, { scale: 1, opacity: 1 }),
            ],
            duration: 1.8, delay: 0, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'elasticDrop',
        config: {
            keyframes: [
                makeKeyframe(0, { translateY: -120, opacity: 0, scale: 0.8 }),
                makeKeyframe(0.4, { translateY: 10, opacity: 1, scale: 1.05 }),
                makeKeyframe(0.6, { translateY: -6, opacity: 1, scale: 0.98 }),
                makeKeyframe(0.8, { translateY: 3, opacity: 1, scale: 1.01 }),
                makeKeyframe(1, { translateY: 0, opacity: 1, scale: 1 }),
            ],
            duration: 1.1, delay: 0, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
]

// ─── UI Components ──────────────────────────────────────

const uiPresets: AnimationPreset[] = [
    {
        name: 'popover',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 0.9, opacity: 0, translateY: 8 }),
                makeKeyframe(0.5, { scale: 1.03, opacity: 1, translateY: -2 }),
                makeKeyframe(1, { scale: 1, opacity: 1, translateY: 0 }),
            ],
            duration: 0.35, delay: 0, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'tooltip',
        config: {
            keyframes: [
                makeKeyframe(0, { opacity: 0, translateY: 4, scale: 0.96 }),
                makeKeyframe(1, { opacity: 1, translateY: 0, scale: 1 }),
            ],
            duration: 0.15, delay: 0, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'modalIn',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 0.95, opacity: 0 }),
                makeKeyframe(0.6, { scale: 1.02, opacity: 1 }),
                makeKeyframe(1, { scale: 1, opacity: 1 }),
            ],
            duration: 0.3, delay: 0, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'drawer',
        config: {
            keyframes: [
                makeKeyframe(0, { translateX: -200, opacity: 0 }),
                makeKeyframe(0.7, { translateX: 6, opacity: 1 }),
                makeKeyframe(1, { translateX: 0, opacity: 1 }),
            ],
            duration: 0.4, delay: 0, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'toast',
        config: {
            keyframes: [
                makeKeyframe(0, { translateY: 30, translateX: 0, opacity: 0, scale: 0.95 }),
                makeKeyframe(0.15, { translateY: -4, translateX: 0, opacity: 1, scale: 1.02 }),
                makeKeyframe(0.3, { translateY: 0, translateX: 0, opacity: 1, scale: 1 }),
                makeKeyframe(0.85, { translateY: 0, translateX: 0, opacity: 1, scale: 1 }),
                makeKeyframe(1, { translateY: -8, translateX: 0, opacity: 0, scale: 0.95 }),
            ],
            duration: 3, delay: 0, easing: 'ease-in-out', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'switch',
        config: {
            keyframes: [
                makeKeyframe(0, { translateX: 0, scale: 1 }),
                makeKeyframe(0.4, { translateX: 10, scale: 1.15 }),
                makeKeyframe(0.6, { translateX: 18, scale: 1.15 }),
                makeKeyframe(1, { translateX: 24, scale: 1 }),
            ],
            duration: 0.35, delay: 0, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
]

// ─── Attention / Micro-interactions ─────────────────────

const attentionPresets: AnimationPreset[] = [
    {
        name: 'wiggle',
        config: {
            keyframes: [
                makeKeyframe(0, { rotate: 0 }),
                makeKeyframe(0.15, { rotate: -14 }),
                makeKeyframe(0.3, { rotate: 10 }),
                makeKeyframe(0.45, { rotate: -8 }),
                makeKeyframe(0.6, { rotate: 5 }),
                makeKeyframe(0.75, { rotate: -2 }),
                makeKeyframe(1, { rotate: 0 }),
            ],
            duration: 0.6, delay: 0, easing: 'ease-in-out', iterationCount: 1, direction: 'normal', fillMode: 'none',
        },
    },
    {
        name: 'rubberBand',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 1, skewX: 0 }),
                makeKeyframe(0.3, { scale: 1.25, skewX: -5 }),
                makeKeyframe(0.4, { scale: 0.75, skewX: 5 }),
                makeKeyframe(0.5, { scale: 1.15, skewX: -3 }),
                makeKeyframe(0.65, { scale: 0.95, skewX: 2 }),
                makeKeyframe(0.75, { scale: 1.05, skewX: -1 }),
                makeKeyframe(1, { scale: 1, skewX: 0 }),
            ],
            duration: 0.8, delay: 0, easing: 'ease-in-out', iterationCount: 1, direction: 'normal', fillMode: 'none',
        },
    },
    {
        name: 'jello',
        config: {
            keyframes: [
                makeKeyframe(0, { skewX: 0, skewY: 0 }),
                makeKeyframe(0.22, { skewX: -12, skewY: -12 }),
                makeKeyframe(0.33, { skewX: 6, skewY: 6 }),
                makeKeyframe(0.44, { skewX: -4, skewY: -4 }),
                makeKeyframe(0.55, { skewX: 2, skewY: 2 }),
                makeKeyframe(0.66, { skewX: -1, skewY: -1 }),
                makeKeyframe(1, { skewX: 0, skewY: 0 }),
            ],
            duration: 1, delay: 0, easing: 'ease-in-out', iterationCount: 1, direction: 'normal', fillMode: 'none',
        },
    },
    {
        name: 'heartbeat',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 1 }),
                makeKeyframe(0.14, { scale: 1.3 }),
                makeKeyframe(0.28, { scale: 1 }),
                makeKeyframe(0.42, { scale: 1.3 }),
                makeKeyframe(0.7, { scale: 1 }),
                makeKeyframe(1, { scale: 1 }),
            ],
            duration: 1.4, delay: 0, easing: 'ease-in-out', iterationCount: 'infinite', direction: 'normal', fillMode: 'none',
        },
    },
    {
        name: 'ping',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 1, opacity: 1 }),
                makeKeyframe(0.75, { scale: 2, opacity: 0 }),
                makeKeyframe(1, { scale: 2, opacity: 0 }),
            ],
            duration: 1, delay: 0, easing: 'cubic-bezier(0, 0, 0.2, 1)', iterationCount: 'infinite', direction: 'normal', fillMode: 'none',
        },
    },
    {
        name: 'tada',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 1, rotate: 0 }),
                makeKeyframe(0.1, { scale: 0.9, rotate: -3 }),
                makeKeyframe(0.2, { scale: 0.9, rotate: -3 }),
                makeKeyframe(0.3, { scale: 1.1, rotate: 3 }),
                makeKeyframe(0.5, { scale: 1.1, rotate: -3 }),
                makeKeyframe(0.7, { scale: 1.1, rotate: 3 }),
                makeKeyframe(0.8, { scale: 1.1, rotate: -3 }),
                makeKeyframe(1, { scale: 1, rotate: 0 }),
            ],
            duration: 1, delay: 0, easing: 'ease-in-out', iterationCount: 1, direction: 'normal', fillMode: 'none',
        },
    },
]

// ─── Advanced / Cinematic ───────────────────────────────

const advancedPresets: AnimationPreset[] = [
    {
        name: 'glitchIn',
        config: {
            keyframes: [
                makeKeyframe(0, { opacity: 0, translateX: -8, skewX: 20 }),
                makeKeyframe(0.2, { opacity: 1, translateX: 6, skewX: -10 }),
                makeKeyframe(0.35, { opacity: 0.8, translateX: -3, skewX: 6 }),
                makeKeyframe(0.5, { opacity: 1, translateX: 2, skewX: -3 }),
                makeKeyframe(0.65, { opacity: 0.9, translateX: -1, skewX: 1 }),
                makeKeyframe(1, { opacity: 1, translateX: 0, skewX: 0 }),
            ],
            duration: 0.6, delay: 0, easing: 'linear', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'morphIn',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 0.5, rotate: -180, opacity: 0, skewX: 20, skewY: 10 }),
                makeKeyframe(0.4, { scale: 1.1, rotate: 10, opacity: 0.9, skewX: -5, skewY: -3 }),
                makeKeyframe(0.7, { scale: 0.98, rotate: -3, opacity: 1, skewX: 2, skewY: 1 }),
                makeKeyframe(1, { scale: 1, rotate: 0, opacity: 1, skewX: 0, skewY: 0 }),
            ],
            duration: 1.2, delay: 0, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'vortex',
        config: {
            keyframes: [
                makeKeyframe(0, { rotate: 0, scale: 1, opacity: 1 }),
                makeKeyframe(0.25, { rotate: 90, scale: 0.7, opacity: 0.8 }),
                makeKeyframe(0.5, { rotate: 180, scale: 0.4, opacity: 0.5 }),
                makeKeyframe(0.75, { rotate: 270, scale: 0.7, opacity: 0.8 }),
                makeKeyframe(1, { rotate: 360, scale: 1, opacity: 1 }),
            ],
            duration: 1.5, delay: 0, easing: 'ease-in-out', iterationCount: 'infinite', direction: 'normal', fillMode: 'none',
        },
    },
    {
        name: 'orbit',
        config: {
            keyframes: [
                makeKeyframe(0, { translateX: 0, translateY: 0, scale: 1 }),
                makeKeyframe(0.25, { translateX: 60, translateY: -30, scale: 0.85 }),
                makeKeyframe(0.5, { translateX: 0, translateY: -50, scale: 0.7 }),
                makeKeyframe(0.75, { translateX: -60, translateY: -30, scale: 0.85 }),
                makeKeyframe(1, { translateX: 0, translateY: 0, scale: 1 }),
            ],
            duration: 3, delay: 0, easing: 'ease-in-out', iterationCount: 'infinite', direction: 'normal', fillMode: 'none',
        },
    },
    {
        name: 'unfold',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 0, rotate: -45, skewX: 25, skewY: 15, opacity: 0 }),
                makeKeyframe(0.3, { scale: 0.6, rotate: 10, skewX: -8, skewY: -5, opacity: 0.7 }),
                makeKeyframe(0.6, { scale: 1.05, rotate: -3, skewX: 3, skewY: 2, opacity: 1 }),
                makeKeyframe(1, { scale: 1, rotate: 0, skewX: 0, skewY: 0, opacity: 1 }),
            ],
            duration: 1, delay: 0, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'breathe',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 1, opacity: 0.7 }),
                makeKeyframe(0.3, { scale: 1.06, opacity: 1 }),
                makeKeyframe(0.5, { scale: 1.06, opacity: 1 }),
                makeKeyframe(0.8, { scale: 1, opacity: 0.7 }),
                makeKeyframe(1, { scale: 1, opacity: 0.7 }),
            ],
            duration: 4, delay: 0, easing: 'ease-in-out', iterationCount: 'infinite', direction: 'normal', fillMode: 'none',
        },
    },
    {
        name: 'slideRotate',
        config: {
            keyframes: [
                makeKeyframe(0, { translateX: -100, rotate: -90, opacity: 0 }),
                makeKeyframe(0.6, { translateX: 8, rotate: 5, opacity: 1 }),
                makeKeyframe(0.8, { translateX: -3, rotate: -2, opacity: 1 }),
                makeKeyframe(1, { translateX: 0, rotate: 0, opacity: 1 }),
            ],
            duration: 0.8, delay: 0, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        name: 'typewriter',
        config: {
            keyframes: [
                makeKeyframe(0, { translateX: -4, opacity: 0, scale: 0.95 }),
                makeKeyframe(0.1, { translateX: 0, opacity: 1, scale: 1 }),
                makeKeyframe(0.12, { translateX: 0, opacity: 1, scale: 1 }),
                makeKeyframe(0.14, { translateX: 0, opacity: 0, scale: 1 }),
                makeKeyframe(0.16, { translateX: 0, opacity: 1, scale: 1 }),
                makeKeyframe(0.5, { translateX: 0, opacity: 1, scale: 1 }),
                makeKeyframe(1, { translateX: 0, opacity: 1, scale: 1 }),
            ],
            duration: 2, delay: 0, easing: 'linear', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
]

// ─── Praxys UI — Component Signatures ───────────────────

const praxysUIPresets: AnimationPreset[] = [
    {
        // FlipText: rotateX -90 → 0 with custom ease, stagger-ready
        name: 'flipText',
        config: {
            keyframes: [
                makeKeyframe(0, { rotate: -90, opacity: 0 }),
                makeKeyframe(1, { rotate: 0, opacity: 1 }),
            ],
            duration: 0.5, delay: 0, easing: 'cubic-bezier(0.2, 0.65, 0.3, 0.9)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        // FlipFadeText: word swap rotateX 90 → 0 entry
        name: 'flipFade',
        config: {
            keyframes: [
                makeKeyframe(0, { translateY: 8, opacity: 0, rotate: 12 }),
                makeKeyframe(0.4, { translateY: -2, opacity: 1, rotate: -1 }),
                makeKeyframe(0.6, { translateY: 0, opacity: 1, rotate: 0 }),
                makeKeyframe(0.85, { translateY: 0, opacity: 1, rotate: 0 }),
                makeKeyframe(1, { translateY: -8, opacity: 0, rotate: -12 }),
            ],
            duration: 2.5, delay: 0, easing: 'cubic-bezier(0.2, 0.65, 0.3, 0.9)', iterationCount: 'infinite', direction: 'normal', fillMode: 'none',
        },
    },
    {
        // GlassDock: icon hover — scale up + float
        name: 'dockBounce',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 1, translateY: 0 }),
                makeKeyframe(0.4, { scale: 1.4, translateY: -8 }),
                makeKeyframe(0.7, { scale: 1.35, translateY: -6 }),
                makeKeyframe(1, { scale: 1, translateY: 0 }),
            ],
            duration: 0.45, delay: 0, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iterationCount: 1, direction: 'normal', fillMode: 'none',
        },
    },
    {
        // AnimatedButton: shimmer sweep feel
        name: 'shimmer',
        config: {
            keyframes: [
                makeKeyframe(0, { translateX: -100, opacity: 0.3, skewX: -15 }),
                makeKeyframe(0.5, { translateX: 0, opacity: 1, skewX: 0 }),
                makeKeyframe(1, { translateX: 100, opacity: 0.3, skewX: 15 }),
            ],
            duration: 1.5, delay: 0, easing: 'ease-in-out', iterationCount: 'infinite', direction: 'normal', fillMode: 'none',
        },
    },
    {
        // ModalDialog: scale 0.95 → 1.02 → 1, spring overshoot
        name: 'modalSpring',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 0.95, opacity: 0 }),
                makeKeyframe(0.5, { scale: 1.02, opacity: 1 }),
                makeKeyframe(0.75, { scale: 0.995, opacity: 1 }),
                makeKeyframe(1, { scale: 1, opacity: 1 }),
            ],
            duration: 0.35, delay: 0, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        // ToastNotification: slide in from right + settle + auto dismiss
        name: 'toastSlide',
        config: {
            keyframes: [
                makeKeyframe(0, { translateX: 50, scale: 0.95, opacity: 0 }),
                makeKeyframe(0.1, { translateX: -4, scale: 1.01, opacity: 1 }),
                makeKeyframe(0.15, { translateX: 0, scale: 1, opacity: 1 }),
                makeKeyframe(0.85, { translateX: 0, scale: 1, opacity: 1 }),
                makeKeyframe(1, { translateX: 60, scale: 0.95, opacity: 0 }),
            ],
            duration: 3, delay: 0, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        // AnimatedHero: staggered section reveal — badge/title/subtitle/cta rise up
        name: 'heroStagger',
        config: {
            keyframes: [
                makeKeyframe(0, { translateY: 30, opacity: 0, scale: 0.97 }),
                makeKeyframe(0.6, { translateY: -3, opacity: 1, scale: 1.01 }),
                makeKeyframe(1, { translateY: 0, opacity: 1, scale: 1 }),
            ],
            duration: 0.7, delay: 0, easing: 'cubic-bezier(0.2, 0.65, 0.3, 0.9)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        // StaggeredGrid: whileInView reveal — y 30 → 0, scale 0.95 → 1
        name: 'gridReveal',
        config: {
            keyframes: [
                makeKeyframe(0, { translateY: 30, opacity: 0, scale: 0.95 }),
                makeKeyframe(0.7, { translateY: -2, opacity: 1, scale: 1.01 }),
                makeKeyframe(1, { translateY: 0, opacity: 1, scale: 1 }),
            ],
            duration: 0.55, delay: 0, easing: 'cubic-bezier(0.2, 0.65, 0.3, 0.9)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        // SpotlightNavbar: tab indicator slide — squish + stretch
        name: 'tabSlide',
        config: {
            keyframes: [
                makeKeyframe(0, { translateX: -40, scale: 0.9, opacity: 0.6 }),
                makeKeyframe(0.5, { translateX: 3, scale: 1.05, opacity: 1 }),
                makeKeyframe(0.75, { translateX: -1, scale: 0.98, opacity: 1 }),
                makeKeyframe(1, { translateX: 0, scale: 1, opacity: 1 }),
            ],
            duration: 0.35, delay: 0, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        // Checkbox: check mark bounce — scale overshoot
        name: 'checkBounce',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 0, opacity: 0 }),
                makeKeyframe(0.5, { scale: 1.15, opacity: 1 }),
                makeKeyframe(0.7, { scale: 0.95, opacity: 1 }),
                makeKeyframe(1, { scale: 1, opacity: 1 }),
            ],
            duration: 0.3, delay: 0, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        // AnimatedToggle: knob slide — translate with spring squish
        name: 'toggleKnob',
        config: {
            keyframes: [
                makeKeyframe(0, { translateX: 0, scale: 1 }),
                makeKeyframe(0.3, { translateX: 8, scale: 1.15 }),
                makeKeyframe(0.6, { translateX: 20, scale: 1.1 }),
                makeKeyframe(1, { translateX: 24, scale: 1 }),
            ],
            duration: 0.3, delay: 0, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        // CreepyButton: flicker + jitter horror feel
        name: 'creepyFlicker',
        config: {
            keyframes: [
                makeKeyframe(0, { opacity: 1, translateX: 0, skewX: 0 }),
                makeKeyframe(0.1, { opacity: 0.4, translateX: -2, skewX: 2 }),
                makeKeyframe(0.2, { opacity: 1, translateX: 1, skewX: -1 }),
                makeKeyframe(0.3, { opacity: 0.6, translateX: -1, skewX: 1 }),
                makeKeyframe(0.4, { opacity: 1, translateX: 0, skewX: 0 }),
                makeKeyframe(0.7, { opacity: 1, translateX: 0, skewX: 0 }),
                makeKeyframe(0.8, { opacity: 0.3, translateX: 3, skewX: -3 }),
                makeKeyframe(0.85, { opacity: 1, translateX: -1, skewX: 1 }),
                makeKeyframe(1, { opacity: 1, translateX: 0, skewX: 0 }),
            ],
            duration: 0.8, delay: 0, easing: 'linear', iterationCount: 'infinite', direction: 'normal', fillMode: 'none',
        },
    },
    {
        // RevealLoader: curtain wipe reveal
        name: 'curtainReveal',
        config: {
            keyframes: [
                makeKeyframe(0, { translateY: 100, opacity: 0, scale: 1.05 }),
                makeKeyframe(0.3, { translateY: 100, opacity: 0, scale: 1.05 }),
                makeKeyframe(0.7, { translateY: 0, opacity: 1, scale: 1 }),
                makeKeyframe(1, { translateY: 0, opacity: 1, scale: 1 }),
            ],
            duration: 1.2, delay: 0, easing: 'cubic-bezier(0.7, 0, 0.3, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        // InteractiveBook: page flip feel
        name: 'pageFlip',
        config: {
            keyframes: [
                makeKeyframe(0, { rotate: 45, scale: 0.95, opacity: 0 }),
                makeKeyframe(0.5, { rotate: -5, scale: 1.02, opacity: 1 }),
                makeKeyframe(0.75, { rotate: 2, scale: 0.99, opacity: 1 }),
                makeKeyframe(1, { rotate: 0, scale: 1, opacity: 1 }),
            ],
            duration: 0.6, delay: 0, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        // MaskedAvatars: stagger-ready avatar pop in
        name: 'avatarPop',
        config: {
            keyframes: [
                makeKeyframe(0, { translateX: -10, scale: 0.8, opacity: 0 }),
                makeKeyframe(0.6, { translateX: 2, scale: 1.08, opacity: 1 }),
                makeKeyframe(1, { translateX: 0, scale: 1, opacity: 1 }),
            ],
            duration: 0.35, delay: 0, easing: 'cubic-bezier(0.2, 0.65, 0.3, 0.9)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        // FolderPreview: folder open — rotate + expand
        name: 'folderOpen',
        config: {
            keyframes: [
                makeKeyframe(0, { rotate: 0, translateY: 0, scale: 1 }),
                makeKeyframe(0.3, { rotate: -10, translateY: -4, scale: 1.02 }),
                makeKeyframe(0.6, { rotate: -10, translateY: -4, scale: 1.02 }),
                makeKeyframe(1, { rotate: 0, translateY: 0, scale: 1 }),
            ],
            duration: 0.7, delay: 0, easing: 'cubic-bezier(0.2, 0.65, 0.3, 0.9)', iterationCount: 1, direction: 'normal', fillMode: 'none',
        },
    },
    {
        // DropdownMenu: scale 0.95 → 1, y -4 → 0, fast spring
        name: 'dropdown',
        config: {
            keyframes: [
                makeKeyframe(0, { scale: 0.95, translateY: -4, opacity: 0 }),
                makeKeyframe(0.6, { scale: 1.01, translateY: 1, opacity: 1 }),
                makeKeyframe(1, { scale: 1, translateY: 0, opacity: 1 }),
            ],
            duration: 0.2, delay: 0, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iterationCount: 1, direction: 'normal', fillMode: 'forwards',
        },
    },
    {
        // SkeletonLoader: shimmer sweep
        name: 'skeleton',
        config: {
            keyframes: [
                makeKeyframe(0, { opacity: 0.4, translateX: -60 }),
                makeKeyframe(0.5, { opacity: 0.7, translateX: 0 }),
                makeKeyframe(1, { opacity: 0.4, translateX: 60 }),
            ],
            duration: 2, delay: 0, easing: 'linear', iterationCount: 'infinite', direction: 'normal', fillMode: 'none',
        },
    },
    {
        // SocialFlipButton: flip between front/back
        name: 'socialFlip',
        config: {
            keyframes: [
                makeKeyframe(0, { rotate: 0, scale: 1, opacity: 1 }),
                makeKeyframe(0.4, { rotate: 90, scale: 0.9, opacity: 0 }),
                makeKeyframe(0.5, { rotate: -90, scale: 0.9, opacity: 0 }),
                makeKeyframe(1, { rotate: 0, scale: 1, opacity: 1 }),
            ],
            duration: 0.6, delay: 0, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', iterationCount: 1, direction: 'normal', fillMode: 'none',
        },
    },
    {
        // MagneticCursor: magnetic pull + spring back
        name: 'magnetic',
        config: {
            keyframes: [
                makeKeyframe(0, { translateX: 0, translateY: 0, scale: 1 }),
                makeKeyframe(0.3, { translateX: 12, translateY: -8, scale: 1.06 }),
                makeKeyframe(0.5, { translateX: 12, translateY: -8, scale: 1.06 }),
                makeKeyframe(0.7, { translateX: -3, translateY: 2, scale: 0.98 }),
                makeKeyframe(0.85, { translateX: 1, translateY: -1, scale: 1.01 }),
                makeKeyframe(1, { translateX: 0, translateY: 0, scale: 1 }),
            ],
            duration: 1, delay: 0, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', iterationCount: 1, direction: 'normal', fillMode: 'none',
        },
    },
    {
        // LightLines: vertical beam pulse
        name: 'lightBeam',
        config: {
            keyframes: [
                makeKeyframe(0, { opacity: 0, scale: 0 }),
                makeKeyframe(0.2, { opacity: 1, scale: 1 }),
                makeKeyframe(0.8, { opacity: 1, scale: 1 }),
                makeKeyframe(1, { opacity: 0, scale: 0 }),
            ],
            duration: 2.5, delay: 0, easing: 'ease-in-out', iterationCount: 'infinite', direction: 'normal', fillMode: 'none',
        },
    },
]

// ─── Categorized export ─────────────────────────────────

export const presetCategories: PresetCategory[] = [
    { label: 'Basic', presets: basicPresets },
    { label: 'Hero / Landing', presets: heroPresets },
    { label: 'UI Components', presets: uiPresets },
    { label: 'Attention', presets: attentionPresets },
    { label: 'Advanced', presets: advancedPresets },
    { label: 'Praxys UI', presets: praxysUIPresets },
]

/** Flat array for backwards compat */
export const presets: AnimationPreset[] = presetCategories.flatMap(c => c.presets)
