import { PathPoint } from './types'

/** Build SVG `d` attribute from path points */
export function pointsToSvgD(points: PathPoint[]): string {
    if (points.length < 2) return ''
    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1]
        const curr = points[i]
        d += ` C ${prev.cx2} ${prev.cy2}, ${curr.cx1} ${curr.cy1}, ${curr.x} ${curr.y}`
    }
    return d
}

/** Sample a point at parameter t along the full path */
export function samplePathAtT(points: PathPoint[], t: number): { x: number; y: number } {
    if (points.length < 2) return { x: 0, y: 0 }
    const clampedT = Math.max(0, Math.min(1, t))
    const totalSegments = points.length - 1
    const segFloat = clampedT * totalSegments
    const seg = Math.min(Math.floor(segFloat), totalSegments - 1)
    const segT = segFloat - seg

    const p0 = points[seg]
    const p1 = points[seg + 1]
    return {
        x: cubicBezier1D(p0.x, p0.cx2, p1.cx1, p1.x, segT),
        y: cubicBezier1D(p0.y, p0.cy2, p1.cy1, p1.y, segT),
    }
}

/** Sample path at N evenly-spaced intervals */
export function samplePathEvenly(points: PathPoint[], steps: number): { x: number; y: number }[] {
    const samples: { x: number; y: number }[] = []
    for (let i = 0; i <= steps; i++) {
        samples.push(samplePathAtT(points, i / steps))
    }
    return samples
}

function cubicBezier1D(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const u = 1 - t
    return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}

/** Template paths (points in 0-300 coordinate space for the editor canvas) */
export function getTemplatePath(name: 'line' | 'curve' | 'arc' | 'figure8'): PathPoint[] {
    switch (name) {
        case 'line':
            return [
                { x: 50, y: 150, cx1: 50, cy1: 150, cx2: 125, cy2: 150 },
                { x: 250, y: 150, cx1: 175, cy1: 150, cx2: 250, cy2: 150 },
            ]
        case 'curve':
            return [
                { x: 50, y: 250, cx1: 50, cy1: 250, cx2: 50, cy2: 50 },
                { x: 150, y: 100, cx1: 100, cy1: 50, cx2: 200, cy2: 50 },
                { x: 250, y: 250, cx1: 250, cy1: 50, cx2: 250, cy2: 250 },
            ]
        case 'arc':
            return [
                { x: 50, y: 200, cx1: 50, cy1: 200, cx2: 50, cy2: 50 },
                { x: 250, y: 200, cx1: 250, cy1: 50, cx2: 250, cy2: 200 },
            ]
        case 'figure8':
            return [
                { x: 150, y: 75, cx1: 150, cy1: 75, cx2: 250, cy2: 25 },
                { x: 150, y: 150, cx1: 250, cy1: 125, cx2: 50, cy2: 175 },
                { x: 150, y: 225, cx1: 50, cy1: 275, cx2: 150, cy2: 225 },
            ]
        default:
            return getTemplatePath('line')
    }
}
