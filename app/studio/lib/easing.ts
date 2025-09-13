export const NAMED_EASINGS: Record<string, string> = {
    'linear': 'linear',
    'ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
    'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
}

export const NAMED_EASING_LIST = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'] as const

export function easingToCubicPoints(easing: string): [number, number, number, number] {
    const match = easing.match(/cubic-bezier\(\s*([\d.]+)\s*,\s*([\d.-]+)\s*,\s*([\d.]+)\s*,\s*([\d.-]+)\s*\)/)
    if (match) return [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]), parseFloat(match[4])]
    const resolved = NAMED_EASINGS[easing]
    if (resolved && resolved !== 'linear') {
        return easingToCubicPoints(resolved)
    }
    return [0, 0, 1, 1] // linear
}

export function cubicPointsToString(points: [number, number, number, number]): string {
    return `cubic-bezier(${points.map(v => v.toFixed(2)).join(', ')})`
}

/** Convert named easing to GSAP-compatible ease string */
export function easingToGsap(easing: string): string {
    // GSAP understands named CSS easings directly
    const gsapMap: Record<string, string> = {
        'linear': 'none',
        'ease': 'power1.inOut',
        'ease-in': 'power2.in',
        'ease-out': 'power2.out',
        'ease-in-out': 'power2.inOut',
    }
    if (gsapMap[easing]) return gsapMap[easing]
    // cubic-bezier — GSAP doesn't natively support this, so we build a CustomEase string
    // For now, approximate with the closest power ease
    const points = easingToCubicPoints(easing)
    // Use the cubic-bezier values directly — GSAP supports this format with quotes
    return `cubic-bezier(${points.join(',')})`
}
