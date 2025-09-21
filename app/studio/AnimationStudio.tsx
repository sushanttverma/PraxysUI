'use client'

import React, { useState, useMemo, useCallback, useRef } from 'react'
import {
    RotateCcw,
    Play,
    Maximize2,
    Minimize2,
    Layers,
    Link as LinkIcon,
    Upload,
    Code,
} from 'lucide-react'
import Navbar from '@/app/components/Navbar'
import { cn } from '@/lib/utils'

import {
    AnimationConfig,
    AnimationKeyframe,
    AnimationPreset,
    PreviewShape,
    ExportFormat,
    EasingMode,
    SpringConfig,
    SequencerConfig,
    MotionPathConfig,
    RecordingState,
    AnimationChain,
    GridSnapConfig,
    ComparisonConfig,
    OnionSkinConfig,

    ChainPhase,
    makeKeyframe,
    makeDefaultChain,
    getRegistrySlug,
} from './lib/types'
import { componentRegistry } from '@/lib/registry'
import { presets } from './lib/presets'
import { cubicPointsToString } from './lib/easing'
import { springToCSSEasing } from './lib/spring'
import {
    generateCSS, generateFramerMotion, generateTailwind,
    generateReactComponent, generateGSAP, generateLottie,
} from './lib/exporters'
import { downloadBlob, recordAnimationSimple } from './lib/recorder'
import { getTemplatePath } from './lib/motionPath'
import { encodeState, decodeState } from './lib/urlState'

import PreviewCanvas, { PreviewCanvasHandle } from './components/PreviewCanvas'
import Timeline from './components/Timeline'
import GraphEditor from './components/GraphEditor'
import PlaybackBar from './components/PlaybackBar'
import FullscreenOverlay from './components/FullscreenOverlay'
import Sequencer from './components/Sequencer'
import MotionPathEditor from './components/MotionPathEditor'
import KeyframePanel from './components/KeyframePanel'
import EasingPanel from './components/EasingPanel'
import TimingPanel from './components/TimingPanel'
import ExportPanel from './components/ExportPanel'
import PresetsPanel from './components/PresetsPanel'
import ChainPanel from './components/ChainPanel'

import ComparisonPanel from './components/ComparisonPanel'
import ImportModal from './components/ImportModal'
import ComponentPropsPanel from './components/ComponentPropsPanel'

function getInitialUrlState() {
    if (typeof window === 'undefined') return null
    const hash = window.location.hash
    if (!hash) return null
    const state = decodeState(hash)
    if (state) window.history.replaceState(null, '', window.location.pathname)
    return state
}

const _cachedUrlState = typeof window !== 'undefined' ? getInitialUrlState() : null

export default function AnimationStudio() {
    // ── Core state ──
    const [config, setConfig] = useState<AnimationConfig>(_cachedUrlState?.config ?? presets[2].config)
    const [previewShape, setPreviewShape] = useState<PreviewShape>('box')
    const [componentProps, setComponentProps] = useState<Record<string, unknown>>({})
    const [playing, setPlaying] = useState(true)
    const [loop, setLoop] = useState(false)
    const [speed, setSpeed] = useState(1)
    const [exportFormat, setExportFormat] = useState<ExportFormat>((_cachedUrlState?.exportFormat as ExportFormat) ?? 'css')
    const [activeKeyframeIdx, setActiveKeyframeIdx] = useState(0)
    const [activePresetName, setActivePresetName] = useState<string | null>('slideUp')

    // ── Easing state ──
    const [easingMode, setEasingMode] = useState<EasingMode>((_cachedUrlState?.easingMode as EasingMode) ?? 'named')
    const [controlPoints, setControlPoints] = useState<[number, number, number, number]>([0.4, 0, 0.2, 1])
    const [springConfig, setSpringConfig] = useState<SpringConfig>({
        mass: 1, stiffness: 100, damping: 10, velocity: 0,
    })

    // ── Sequencer state ──
    const [sequencer, setSequencer] = useState<SequencerConfig>({
        enabled: false, elementCount: 4, staggerDelay: 0.1, staggerDirection: 'forward',
    })

    // ── Motion Path state ──
    const [motionPath, setMotionPath] = useState<MotionPathConfig>({
        enabled: false, points: getTemplatePath('curve'), autoRotate: false,
    })

    // ── Recording state ──
    const [recording, setRecording] = useState<RecordingState>({ isRecording: false, progress: 0 })

    // ── UI state ──
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [graphExpanded, setGraphExpanded] = useState(false)
    const [sequencerExpanded, setSequencerExpanded] = useState(false)
    const [motionPathExpanded, setMotionPathExpanded] = useState(false)

    // ── New feature state ──
    const [chain, setChain] = useState<AnimationChain>(_cachedUrlState?.chain ?? makeDefaultChain(presets[2].config))
    const [chainExpanded, setChainExpanded] = useState(false)

    const [onionSkin, setOnionSkin] = useState<OnionSkinConfig>(_cachedUrlState?.onionSkin ?? { enabled: false, opacity: 0.15 })
    const [gridSnap, setGridSnap] = useState<GridSnapConfig>(_cachedUrlState?.gridSnap ?? { enabled: false, size: 24 })
    const [showImportModal, setShowImportModal] = useState(false)
    const [showCodeModal, setShowCodeModal] = useState(false)
    const [comparison, setComparison] = useState<ComparisonConfig>(_cachedUrlState?.comparison ?? {
        enabled: false,
        configB: presets[0].config,
        easingB: 'ease',
    })
    const [comparisonExpanded, setComparisonExpanded] = useState(false)

    // ── Refs ──
    const progressRef = useRef(0)
    const previewRef = useRef<PreviewCanvasHandle>(null)
    // ── Derived values ──
    const activeConfig = useMemo(() => {
        if (chain.enabled) {
            return chain[chain.activePhase]
        }
        return config
    }, [chain, config])

    const activePerspective = useMemo(() => {
        const kfs = activeConfig.keyframes
        return Math.max(0, ...kfs.map(kf => kf.perspective ?? 0))
    }, [activeConfig])

    const effectiveEasing = useMemo(() => {
        switch (easingMode) {
            case 'cubic-bezier':
                return cubicPointsToString(controlPoints)
            case 'spring':
                return springToCSSEasing(springConfig)
            default:
                return activeConfig.easing
        }
    }, [easingMode, controlPoints, springConfig, activeConfig.easing])

    const exportConfig = useMemo(() => ({
        ...activeConfig,
        easing: effectiveEasing,
    }), [activeConfig, effectiveEasing])

    const exportOutput = useMemo(() => {
        const seq = sequencer.enabled ? sequencer : undefined
        const mp = motionPath.enabled ? motionPath : undefined
        const sc = easingMode === 'spring' ? springConfig : undefined
        switch (exportFormat) {
            case 'css': return generateCSS(exportConfig, seq, mp, sc)
            case 'framer': return generateFramerMotion(exportConfig, seq, mp, sc, easingMode)
            case 'tailwind': return generateTailwind(exportConfig, seq)
            case 'react-component': return generateReactComponent(exportConfig, easingMode, sc, getRegistrySlug(previewShape) ?? undefined)
            case 'gsap': return generateGSAP(exportConfig, sc, easingMode)
            case 'lottie': return generateLottie(exportConfig)
        }
    }, [exportConfig, exportFormat, sequencer, motionPath, springConfig, easingMode, previewShape])


    // ── Handlers ──
    const setActiveConfig = useCallback((updates: Partial<AnimationConfig>) => {
        if (chain.enabled) {
            setChain(prev => ({
                ...prev,
                [prev.activePhase]: { ...prev[prev.activePhase], ...updates },
            }))
        } else {
            setConfig(prev => ({ ...prev, ...updates }))
        }
        setActivePresetName(null)
    }, [chain.enabled])

    const updateKeyframe = useCallback((idx: number, key: keyof AnimationKeyframe, value: number) => {
        if (chain.enabled) {
            setChain(prev => {
                const phase = prev.activePhase
                const phaseConfig = prev[phase]
                const newKfs = phaseConfig.keyframes.map((kf, i) => i === idx ? { ...kf, [key]: value } : kf)
                return { ...prev, [phase]: { ...phaseConfig, keyframes: newKfs } }
            })
        } else {
            setConfig(prev => {
                const newKfs = prev.keyframes.map((kf, i) => i === idx ? { ...kf, [key]: value } : kf)
                return { ...prev, keyframes: newKfs }
            })
        }
        setActivePresetName(null)
    }, [chain.enabled])

    const updateKeyframeEasing = useCallback((idx: number, easing: string) => {
        if (chain.enabled) {
            setChain(prev => {
                const phase = prev.activePhase
                const phaseConfig = prev[phase]
                const newKfs = phaseConfig.keyframes.map((kf, i) =>
                    i === idx ? { ...kf, easing: easing || undefined } : kf
                )
                return { ...prev, [phase]: { ...phaseConfig, keyframes: newKfs } }
            })
        } else {
            setConfig(prev => {
                const newKfs = prev.keyframes.map((kf, i) =>
                    i === idx ? { ...kf, easing: easing || undefined } : kf
                )
                return { ...prev, keyframes: newKfs }
            })
        }
    }, [chain.enabled])

    const updateKeyframeOffset = useCallback((idx: number, offset: number) => {
        if (chain.enabled) {
            setChain(prev => {
                const phase = prev.activePhase
                const phaseConfig = prev[phase]
                const newKfs = phaseConfig.keyframes.map((kf, i) => i === idx ? { ...kf, offset } : kf)
                return { ...prev, [phase]: { ...phaseConfig, keyframes: newKfs } }
            })
        } else {
            setConfig(prev => {
                const newKfs = prev.keyframes.map((kf, i) => i === idx ? { ...kf, offset } : kf)
                return { ...prev, keyframes: newKfs }
            })
        }
        setActivePresetName(null)
    }, [chain.enabled])

    const addKeyframe = useCallback((offset: number) => {
        const kfs = activeConfig.keyframes
        const sorted = [...kfs].sort((a, b) => a.offset - b.offset)
        let before = sorted[0]
        let after = sorted[sorted.length - 1]
        for (let i = 0; i < sorted.length - 1; i++) {
            if (sorted[i].offset <= offset && sorted[i + 1].offset >= offset) {
                before = sorted[i]
                after = sorted[i + 1]
                break
            }
        }
        const t = after.offset === before.offset ? 0.5 : (offset - before.offset) / (after.offset - before.offset)
        const lerp = (a: number, b: number) => +(a + (b - a) * t).toFixed(2)

        const newKf = makeKeyframe(offset, {
            translateX: Math.round(lerp(before.translateX, after.translateX)),
            translateY: Math.round(lerp(before.translateY, after.translateY)),
            scale: lerp(before.scale, after.scale),
            rotate: Math.round(lerp(before.rotate, after.rotate)),
            skewX: Math.round(lerp(before.skewX, after.skewX)),
            skewY: Math.round(lerp(before.skewY, after.skewY)),
            opacity: lerp(before.opacity, after.opacity),
        })

        setActiveConfig({ keyframes: [...kfs, newKf] })
    }, [activeConfig, setActiveConfig])

    const deleteKeyframe = useCallback((idx: number) => {
        const kfs = activeConfig.keyframes
        const kf = kfs[idx]
        if (kf.offset === 0 || kf.offset === 1) return
        const newKfs = kfs.filter((_, i) => i !== idx)
        setActiveKeyframeIdx(i => Math.min(i, newKfs.length - 1))
        setActiveConfig({ keyframes: newKfs })
    }, [activeConfig, setActiveConfig])

    const handleReplay = useCallback(() => {
        const tl = previewRef.current?.getTimeline()
        if (tl) {
            tl.restart()
        }
        setPlaying(true)
    }, [])

    const handleSeek = useCallback((progress: number) => {
        const tl = previewRef.current?.getTimeline()
        if (tl) {
            tl.pause()
            tl.progress(progress)
        }
        progressRef.current = progress
        setPlaying(false)
    }, [])

    const applyPreset = useCallback((preset: AnimationPreset) => {
        if (chain.enabled) {
            setChain(prev => ({
                ...prev,
                [prev.activePhase]: { ...preset.config },
            }))
        } else {
            setConfig({ ...preset.config })
        }
        setActiveKeyframeIdx(0)
        setEasingMode('named')
        setActivePresetName(preset.name)
        setPlaying(true)
    }, [chain.enabled])

    const handleReset = useCallback(() => {
        setConfig(presets[2].config)
        setActiveKeyframeIdx(0)
        setEasingMode('named')
        setActivePresetName('slideUp')
        setSequencer({ enabled: false, elementCount: 4, staggerDelay: 0.1, staggerDirection: 'forward' })
        setMotionPath({ enabled: false, points: getTemplatePath('curve'), autoRotate: false })
        setChain(makeDefaultChain(presets[2].config))
        setOnionSkin({ enabled: false, opacity: 0.15 })
        setGridSnap({ enabled: false, size: 24 })
        setComparison({ enabled: false, configB: presets[0].config, easingB: 'ease' })
        setPlaying(true)
    }, [])

    const handleRecord = useCallback(async () => {
        if (recording.isRecording) return
        const tl = previewRef.current?.getTimeline()
        const el = previewRef.current?.getElement()
        if (!tl || !el) return

        setRecording({ isRecording: true, progress: 0 })
        setPlaying(false)

        await recordAnimationSimple({
            timeline: tl,
            targetElement: el,
            duration: activeConfig.duration,
            fps: 30,
            onProgress: (p) => setRecording(prev => ({ ...prev, progress: p })),
            onComplete: (blob) => {
                downloadBlob(blob)
                setRecording({ isRecording: false, progress: 0 })
            },
            onError: (err) => {
                console.error('Recording failed:', err)
                setRecording({ isRecording: false, progress: 0 })
            },
        })
    }, [recording.isRecording, activeConfig.duration])

    const handleConfigUpdate = useCallback((updates: Partial<AnimationConfig>) => {
        setActiveConfig(updates)
    }, [setActiveConfig])

    const handleShare = useCallback(async () => {
        const state = {
            config,
            chain: chain.enabled ? chain : undefined,
            gridSnap: gridSnap.enabled ? gridSnap : undefined,
            onionSkin: onionSkin.enabled ? onionSkin : undefined,

            comparison: comparison.enabled ? comparison : undefined,
            easingMode,
            exportFormat,
        }
        const hash = encodeState(state)
        const url = `${window.location.origin}${window.location.pathname}#${hash}`
        await navigator.clipboard.writeText(url)
    }, [config, chain, gridSnap, onionSkin, comparison, easingMode, exportFormat])

    const handleImportCSS = useCallback((keyframes: AnimationKeyframe[]) => {
        setActiveConfig({ keyframes })
        setActiveKeyframeIdx(0)
        setActivePresetName(null)
    }, [setActiveConfig])

    const handleImportToPhase = useCallback((phase: ChainPhase, keyframes: AnimationKeyframe[]) => {
        setChain(prev => ({
            ...prev,
            [phase]: { ...prev[phase], keyframes },
        }))
        setActiveKeyframeIdx(0)
        setActivePresetName(null)
    }, [])

    const handleShapeChange = useCallback((shape: PreviewShape) => {
        setPreviewShape(shape)
        const slug = getRegistrySlug(shape)
        if (!slug) { setComponentProps({}); return }
        const entry = componentRegistry[slug]
        if (!entry?.playground) { setComponentProps({}); return }
        const defaults: Record<string, unknown> = { ...(entry.playground.defaults ?? {}) }
        for (const control of entry.playground.controls) {
            if (!(control.name in defaults)) defaults[control.name] = control.default
        }
        if (entry.props.some(p => p.name === 'onChange')) defaults.onChange = () => {}
        if (entry.props.some(p => p.name === 'onClose')) defaults.onClose = () => {}
        if (entry.props.some(p => p.name === 'open')) defaults.open = true
        setComponentProps(defaults)
    }, [])

    const handleComparisonChange = useCallback((cfg: ComparisonConfig) => {
        setComparison(cfg)
    }, [])

    return (
        <div className="relative h-screen overflow-hidden flex flex-col">
            <Navbar />
            <div className="relative flex flex-col flex-1 min-h-0 overflow-hidden">
                {/* Ambient background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-void" />
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, hsla(30, 60%, 40%, 0.2) 0%, transparent 50%), radial-gradient(ellipse 40% 40% at 80% 100%, hsla(240, 50%, 35%, 0.15) 0%, transparent 100%)' }} />
                </div>

                {/* Glass header (hidden in fullscreen) */}
                <div className={cn(
                    'flex-shrink-0 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-xl px-4 md:px-6 pt-16 pb-4',
                    isFullscreen && 'hidden'
                )}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-chalk flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] border border-white/[0.1]">
                                    <Layers className="h-4 w-4 text-blue-400" />
                                </div>
                                Animation Studio
                            </h1>
                            <p className="text-xs md:text-sm text-white/35 mt-1 pl-10">
                                GSAP-powered animation configurator with timeline, spring physics, and motion paths
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setShowCodeModal(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ignite/20 bg-ignite/[0.08] text-xs font-medium text-ignite hover:bg-ignite/[0.14] hover:border-ignite/30 backdrop-blur-sm transition-all duration-200"
                            >
                                <Code className="h-3.5 w-3.5" /> Get Code
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/[0.14] backdrop-blur-sm transition-all duration-200"
                            >
                                <LinkIcon className="h-3.5 w-3.5" /> Share
                            </button>
                            <button
                                onClick={() => setShowImportModal(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/[0.14] backdrop-blur-sm transition-all duration-200"
                            >
                                <Upload className="h-3.5 w-3.5" /> Import
                            </button>
                            <button
                                onClick={() => setIsFullscreen(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/[0.14] backdrop-blur-sm transition-all duration-200"
                            >
                                <Maximize2 className="h-3.5 w-3.5" /> Fullscreen
                            </button>
                            <button
                                onClick={handleReplay}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/[0.14] backdrop-blur-sm transition-all duration-200"
                            >
                                <Play className="h-3.5 w-3.5" /> Replay
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/[0.14] backdrop-blur-sm transition-all duration-200"
                            >
                                <RotateCcw className="h-3.5 w-3.5" /> Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-hidden min-h-0">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-full">
                        {/* ── Left: Preview + Timeline + Graph ── */}
                        <div className={
                            isFullscreen
                                ? 'fixed inset-0 z-[70] flex flex-col bg-void/95 backdrop-blur-sm p-6'
                                : 'col-span-1 lg:col-span-8 flex flex-col overflow-hidden min-h-0'
                        }>
                            {/* Fullscreen close button */}
                            {isFullscreen && (
                                <button
                                    onClick={() => setIsFullscreen(false)}
                                    className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.1] text-white/60 hover:text-white hover:bg-white/[0.12] backdrop-blur-md transition-all"
                                >
                                    <Minimize2 className="h-5 w-5" />
                                </button>
                            )}

                            <PreviewCanvas
                                ref={previewRef}
                                config={activeConfig}
                                previewShape={previewShape}
                                playing={playing}
                                loop={loop}
                                speed={speed}
                                easingMode={easingMode}
                                controlPoints={controlPoints}
                                springConfig={springConfig}
                                sequencer={sequencer}
                                motionPath={motionPath}
                                progressRef={progressRef}
                                onShapeChange={handleShapeChange}
                                hideShapeSelector={isFullscreen}
                                onionSkin={onionSkin}
                                onOnionSkinChange={setOnionSkin}
                                gridSnap={gridSnap}
                                onGridSnapChange={setGridSnap}

                                comparison={comparison}
                                activePerspective={activePerspective}
                                componentProps={componentProps}
                            />

                            {/* Timeline */}
                            <Timeline
                                keyframes={activeConfig.keyframes}
                                activeKeyframeIdx={activeKeyframeIdx}
                                progressRef={progressRef}
                                playing={playing}
                                onSelectKeyframe={setActiveKeyframeIdx}
                                onUpdateKeyframeOffset={updateKeyframeOffset}
                                onAddKeyframe={addKeyframe}
                                onDeleteKeyframe={deleteKeyframe}
                                onSeek={handleSeek}
                                chain={chain}
                                onUpdateKeyframeEasing={updateKeyframeEasing}
                            />

                            {/* Graph Editor (hidden in fullscreen) */}
                            {!isFullscreen && (
                                <GraphEditor
                                    keyframes={activeConfig.keyframes}
                                    progressRef={progressRef}
                                    expanded={graphExpanded}
                                    onToggle={() => setGraphExpanded(e => !e)}
                                    onUpdateKeyframe={updateKeyframe}
                                />
                            )}

                            {/* Playback Bar */}
                            <PlaybackBar
                                playing={playing}
                                loop={loop}
                                speed={speed}
                                isRecording={recording.isRecording}
                                recordingProgress={recording.progress}
                                onTogglePlay={() => setPlaying(p => !p)}
                                onReplay={handleReplay}
                                onToggleLoop={() => setLoop(l => !l)}
                                onSpeedChange={setSpeed}
                                onRecord={handleRecord}
                            />
                        </div>

                        {/* ── Right: Controls (hidden in fullscreen) ── */}
                        <div className={cn(
                            'col-span-1 lg:col-span-4 border-t lg:border-t-0 lg:border-l border-border overflow-auto',
                            isFullscreen && 'hidden'
                        )}>
                            <div className="p-4 space-y-5">
                                <PresetsPanel
                                    activePresetName={activePresetName}
                                    onApplyPreset={applyPreset}
                                    previewShape={previewShape}
                                />

                                {getRegistrySlug(previewShape) && componentRegistry[getRegistrySlug(previewShape)!]?.playground && (
                                    <ComponentPropsPanel
                                        slug={getRegistrySlug(previewShape)!}
                                        values={componentProps}
                                        onChange={setComponentProps}
                                    />
                                )}

                                <KeyframePanel
                                    keyframes={activeConfig.keyframes}
                                    activeKeyframeIdx={activeKeyframeIdx}
                                    onSelectKeyframe={setActiveKeyframeIdx}
                                    onUpdateKeyframe={updateKeyframe}
                                    motionPath={motionPath}
                                    gridSnap={gridSnap}
                                />

                                <EasingPanel
                                    easingMode={easingMode}
                                    namedEasing={activeConfig.easing}
                                    controlPoints={controlPoints}
                                    springConfig={springConfig}
                                    onEasingModeChange={setEasingMode}
                                    onNamedEasingChange={e => {
                                        setActiveConfig({ easing: e })
                                    }}
                                    onControlPointsChange={setControlPoints}
                                    onSpringConfigChange={setSpringConfig}
                                />

                                <TimingPanel
                                    config={activeConfig}
                                    onUpdate={handleConfigUpdate}
                                />

                                {/* Chain Panel */}
                                <ChainPanel
                                    chain={chain}
                                    onChange={setChain}
                                    expanded={chainExpanded}
                                    onToggle={() => setChainExpanded(e => !e)}
                                />

                                {/* Sequencer */}
                                <div className="border-t border-border pt-4">
                                    <Sequencer
                                        config={sequencer}
                                        onChange={setSequencer}
                                        expanded={sequencerExpanded}
                                        onToggle={() => setSequencerExpanded(e => !e)}
                                    />
                                </div>

                                {/* Motion Path */}
                                <div className="border-t border-border pt-4">
                                    <MotionPathEditor
                                        config={motionPath}
                                        onChange={setMotionPath}
                                        expanded={motionPathExpanded}
                                        onToggle={() => setMotionPathExpanded(e => !e)}
                                    />
                                </div>

                                {/* Comparison */}
                                <ComparisonPanel
                                    comparison={comparison}
                                    onChange={handleComparisonChange}
                                    expanded={comparisonExpanded}
                                    onToggle={() => setComparisonExpanded(e => !e)}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen backdrop */}
            <FullscreenOverlay
                isOpen={isFullscreen}
                onClose={() => setIsFullscreen(false)}
            />

            {/* Get Code Modal */}
            <ExportPanel
                isOpen={showCodeModal}
                onClose={() => setShowCodeModal(false)}
                exportOutput={exportOutput}
                exportFormat={exportFormat}
                onFormatChange={setExportFormat}
                previewShape={previewShape}
            />

            {/* Import CSS Modal */}
            <ImportModal
                isOpen={showImportModal}
                onClose={() => setShowImportModal(false)}
                onImport={handleImportCSS}
                chain={chain}
                onImportToPhase={handleImportToPhase}
            />
        </div>
    )
}
