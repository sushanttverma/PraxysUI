import gsap from 'gsap'

export interface RecordOptions {
    timeline: gsap.core.Timeline
    targetElement: HTMLElement
    duration: number
    fps?: number
    onProgress?: (progress: number) => void
    onComplete?: (blob: Blob) => void
    onError?: (error: Error) => void
}

export async function recordAnimationSimple(opts: RecordOptions): Promise<void> {
    const { timeline, targetElement, duration, fps = 30, onProgress, onComplete, onError } = opts

    try {
        const canvas = document.createElement('canvas')
        const rect = targetElement.getBoundingClientRect()
        canvas.width = rect.width * 2
        canvas.height = rect.height * 2

        const stream = canvas.captureStream(fps)
        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: getSupportedMimeType(),
            videoBitsPerSecond: 5_000_000,
        })

        const chunks: Blob[] = []
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data)
        }

        return new Promise<void>((resolve) => {
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: getSupportedMimeType() })
                onComplete?.(blob)
                resolve()
            }

            mediaRecorder.start()

            const totalFrames = Math.ceil(duration * fps)
            let frame = 0

            const renderFrame = () => {
                if (frame > totalFrames) {
                    mediaRecorder.stop()
                    return
                }
                const progress = frame / totalFrames
                timeline.progress(progress)
                onProgress?.(progress)
                frame++
                setTimeout(renderFrame, 1000 / fps)
            }

            renderFrame()
        })
    } catch (error) {
        onError?.(error instanceof Error ? error : new Error(String(error)))
    }
}

function getSupportedMimeType(): string {
    const types = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4']
    for (const type of types) {
        if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)) return type
    }
    return 'video/webm'
}

export function downloadBlob(blob: Blob, filename: string = 'praxys-animation.webm') {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
}
