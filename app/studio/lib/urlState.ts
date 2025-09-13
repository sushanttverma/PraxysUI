import { AnimationConfig, AnimationChain, GridSnapConfig, OnionSkinConfig, ComparisonConfig } from './types'

export interface ShareableState {
    config: AnimationConfig
    chain?: AnimationChain
    gridSnap?: GridSnapConfig
    onionSkin?: OnionSkinConfig
    comparison?: ComparisonConfig
    easingMode?: string
    exportFormat?: string
}

export function encodeState(state: ShareableState): string {
    try {
        const slim = { ...state }
        return btoa(encodeURIComponent(JSON.stringify(slim)))
    } catch {
        return ''
    }
}

export function decodeState(hash: string): ShareableState | null {
    try {
        const raw = hash.startsWith('#') ? hash.slice(1) : hash
        if (!raw) return null
        const json = decodeURIComponent(atob(raw))
        return JSON.parse(json) as ShareableState
    } catch {
        return null
    }
}
