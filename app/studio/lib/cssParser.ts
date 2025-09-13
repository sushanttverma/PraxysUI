import { AnimationKeyframe, makeKeyframe } from './types'

export function parseCSSKeyframes(css: string): AnimationKeyframe[] | null {
    // Extract @keyframes block
    const blockMatch = css.match(/@keyframes\s+[\w-]+\s*\{([\s\S]*)\}/)
    if (!blockMatch) return null

    const body = blockMatch[1]

    // Extract percentage stops
    const stopRegex = /([\d.]+)%\s*\{([^}]+)\}/g
    const keyframes: AnimationKeyframe[] = []
    let match: RegExpExecArray | null

    while ((match = stopRegex.exec(body)) !== null) {
        const offset = parseFloat(match[1]) / 100
        const declarations = match[2]

        // Check for unsupported matrix()
        if (/matrix\s*\(/.test(declarations)) return null

        const overrides: Partial<AnimationKeyframe> = {}

        // Parse transform
        const transformMatch = declarations.match(/transform\s*:\s*([^;]+)/)
        if (transformMatch) {
            const t = transformMatch[1]
            const tX = t.match(/translateX\(\s*([-\d.]+)px\s*\)/)
            if (tX) overrides.translateX = parseFloat(tX[1])
            const tY = t.match(/translateY\(\s*([-\d.]+)px\s*\)/)
            if (tY) overrides.translateY = parseFloat(tY[1])
            const sc = t.match(/scale\(\s*([-\d.]+)\s*\)/)
            if (sc) overrides.scale = parseFloat(sc[1])
            const rot = t.match(/(?<![XY])rotate\(\s*([-\d.]+)deg\s*\)/)
            if (rot) overrides.rotate = parseFloat(rot[1])
            const rX = t.match(/rotateX\(\s*([-\d.]+)deg\s*\)/)
            if (rX) overrides.rotateX = parseFloat(rX[1])
            const rY = t.match(/rotateY\(\s*([-\d.]+)deg\s*\)/)
            if (rY) overrides.rotateY = parseFloat(rY[1])
            const skX = t.match(/skewX\(\s*([-\d.]+)deg\s*\)/)
            if (skX) overrides.skewX = parseFloat(skX[1])
            const skY = t.match(/skewY\(\s*([-\d.]+)deg\s*\)/)
            if (skY) overrides.skewY = parseFloat(skY[1])
        }

        // Parse opacity
        const opMatch = declarations.match(/opacity\s*:\s*([-\d.]+)/)
        if (opMatch) overrides.opacity = parseFloat(opMatch[1])

        keyframes.push(makeKeyframe(offset, overrides))
    }

    return keyframes.length >= 2 ? keyframes : null
}
