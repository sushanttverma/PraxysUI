import { SpringConfig } from './types'

export interface SpringSample {
    t: number
    value: number
}

/**
 * Solve a damped harmonic oscillator.
 * x(t) = A * e^(-γt) * cos(ωd*t + φ)
 * where γ = damping / (2 * mass), ωn = sqrt(stiffness / mass), ωd = sqrt(ωn² - γ²)
 */
export function solveSpring(config: SpringConfig, steps: number = 100): SpringSample[] {
    const { mass, stiffness, damping, velocity } = config
    const samples: SpringSample[] = []

    const omega_n = Math.sqrt(stiffness / mass)       // natural frequency
    const gamma = damping / (2 * mass)                  // damping ratio coefficient
    const omega_d = Math.sqrt(Math.max(0, omega_n * omega_n - gamma * gamma)) // damped frequency

    // Estimate settle time (when amplitude < 0.001)
    const settleTime = gamma > 0 ? Math.log(1000) / gamma : 5
    const totalTime = Math.min(settleTime * 1.2, 10) // Cap at 10s

    for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * totalTime
        const normalizedT = i / steps

        let value: number
        if (omega_d > 0.001) {
            // Underdamped: oscillates
            const A = 1
            const phi = Math.atan2(gamma + velocity, omega_d)
            const amp = A / Math.cos(phi)
            value = 1 - amp * Math.exp(-gamma * t) * Math.cos(omega_d * t - phi)
        } else if (gamma > 0) {
            // Critically damped or overdamped
            value = 1 - (1 + gamma * t) * Math.exp(-gamma * t)
        } else {
            // No damping — pure oscillation
            value = 1 - Math.cos(omega_n * t)
        }

        samples.push({ t: normalizedT, value })
    }

    return samples
}

/** Get approximate settle time in seconds */
export function getSettleTime(config: SpringConfig): number {
    const gamma = config.damping / (2 * config.mass)
    if (gamma <= 0) return Infinity
    return Math.log(1000) / gamma
}

/**
 * Approximate a spring curve as a cubic-bezier.
 * This is lossy — only captures the first approach, not oscillations.
 */
export function springToCubicBezier(config: SpringConfig): [number, number, number, number] {
    const samples = solveSpring(config, 50)

    // Find where the curve first reaches ~0.5 and ~1.0
    let t50 = 0.5, t100 = 1
    for (const s of samples) {
        if (s.value >= 0.5 && t50 === 0.5) t50 = s.t
        if (s.value >= 0.98 && t100 === 1) { t100 = s.t; break }
    }

    // Check for overshoot
    const maxVal = Math.max(...samples.map(s => s.value))
    const hasOvershoot = maxVal > 1.05

    if (hasOvershoot) {
        return [0.34, 1.56, 0.64, 1]  // spring-like overshoot
    }

    // Approximate control points
    const x1 = Math.max(0, Math.min(1, t50 * 0.6))
    const y1 = Math.max(0, Math.min(1, 0.5 / t50 * 0.3))
    const x2 = Math.max(0, Math.min(1, t100 * 0.8))
    const y2 = 1

    return [+x1.toFixed(2), +y1.toFixed(2), +x2.toFixed(2), +y2.toFixed(2)]
}

/** Convert spring samples to a CSS easing-function string (cubic-bezier approximation) */
export function springToCSSEasing(config: SpringConfig): string {
    const [x1, y1, x2, y2] = springToCubicBezier(config)
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`
}
