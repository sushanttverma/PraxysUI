export const BACKGROUNDS = [
  {
    id: 'silk',
    label: 'Silk',
    component: () => import('../../../backgrounds/Silk/Silk.tsx'),
    installCommand: 'npx @praxys/ui add silk',
    props: [
      { name: 'speed', type: 'number', default: 5, min: 0, max: 20, step: 0.1, label: 'Speed' },
      { name: 'scale', type: 'number', default: 1, min: 0.1, max: 5, step: 0.1, label: 'Scale' },
      { name: 'color', type: 'color', default: '#7B7481', label: 'Color' },
      { name: 'noiseIntensity', type: 'number', default: 1.5, min: 0, max: 5, step: 0.1, label: 'Noise Intensity' },
      { name: 'rotation', type: 'number', default: 0, min: 0, max: 6.28, step: 0.1, label: 'Rotation' }
    ]
  },
  {
    id: 'aurora',
    label: 'Aurora',
    component: () => import('../../../backgrounds/Aurora/Aurora.tsx'),
    installCommand: 'npx @praxys/ui add aurora',
    props: [
      {
        name: 'colorStops',
        type: 'colorArray',
        default: ['#5227FF', '#7cff67', '#5227FF'],
        label: 'Color Stops',
        minItems: 2,
        maxItems: 5
      },
      { name: 'amplitude', type: 'number', default: 1.0, min: 0, max: 3, step: 0.1, label: 'Amplitude' },
      { name: 'blend', type: 'number', default: 0.5, min: 0, max: 1, step: 0.05, label: 'Blend' }
    ]
  },
  {
    id: 'particles',
    label: 'Particles',
    component: () => import('../../../backgrounds/Particles/Particles.tsx'),
    installCommand: 'npx @praxys/ui add particles',
    props: [
      { name: 'particleCount', type: 'number', default: 200, min: 10, max: 1000, step: 10, label: 'Particle Count' },
      { name: 'particleSpread', type: 'number', default: 10, min: 1, max: 50, step: 1, label: 'Spread' },
      { name: 'speed', type: 'number', default: 0.1, min: 0, max: 2, step: 0.01, label: 'Speed' },
      {
        name: 'particleColors',
        type: 'colorArray',
        default: ['#ffffff', '#ffffff', '#ffffff'],
        label: 'Colors',
        minItems: 1,
        maxItems: 5
      },
      { name: 'moveParticlesOnHover', type: 'boolean', default: false, label: 'Move on Hover' },
      { name: 'particleHoverFactor', type: 'number', default: 1, min: 0.1, max: 5, step: 0.1, label: 'Hover Factor' },
      { name: 'alphaParticles', type: 'boolean', default: false, label: 'Alpha Particles' },
      { name: 'particleBaseSize', type: 'number', default: 100, min: 10, max: 500, step: 10, label: 'Base Size' },
      { name: 'sizeRandomness', type: 'number', default: 1, min: 0, max: 3, step: 0.1, label: 'Size Randomness' },
      { name: 'cameraDistance', type: 'number', default: 20, min: 5, max: 100, step: 1, label: 'Camera Distance' },
      { name: 'disableRotation', type: 'boolean', default: false, label: 'Disable Rotation' }
    ]
  },
  {
    id: 'grid-motion',
    label: 'Grid Motion',
    component: () => import('../../../backgrounds/GridMotion/GridMotion.tsx'),
    installCommand: 'npx @praxys/ui add grid-motion',
    props: [{ name: 'gradientColor', type: 'color', default: '#5227FF', label: 'Gradient Color' }]
  },
  {
    id: 'orb',
    label: 'Orb',
    component: () => import('../../../backgrounds/Orb/Orb.tsx'),
    installCommand: 'npx @praxys/ui add orb',
    props: [
      { name: 'hue', type: 'number', default: 0, min: 0, max: 360, step: 1, label: 'Hue' },
      { name: 'hoverIntensity', type: 'number', default: 0.5, min: 0, max: 2, step: 0.1, label: 'Hover Intensity' },
      { name: 'rotateOnHover', type: 'boolean', default: true, label: 'Rotate on Hover' },
      { name: 'forceHoverState', type: 'boolean', default: false, label: 'Force Hover State' }
    ]
  },
  {
    id: 'liquid-chrome',
    label: 'Liquid Chrome',
    component: () => import('../../../backgrounds/LiquidChrome/LiquidChrome.tsx'),
    installCommand: 'npx @praxys/ui add liquid-chrome',
    props: [
      { name: 'speed', type: 'number', default: 0.2, min: 0, max: 2, step: 0.05, label: 'Speed' },
      { name: 'amplitude', type: 'number', default: 0.3, min: 0, max: 1, step: 0.05, label: 'Amplitude' },
      { name: 'frequencyX', type: 'number', default: 3, min: 0.5, max: 10, step: 0.5, label: 'Frequency X' },
      { name: 'frequencyY', type: 'number', default: 3, min: 0.5, max: 10, step: 0.5, label: 'Frequency Y' },
      { name: 'interactive', type: 'boolean', default: true, label: 'Interactive' }
    ]
  },
  {
    id: 'balatro',
    label: 'Balatro',
    component: () => import('../../../backgrounds/Balatro/Balatro.tsx'),
    installCommand: 'npx @praxys/ui add balatro',
    props: [
      { name: 'spinRotation', type: 'number', default: -2.0, min: -10, max: 10, step: 0.5, label: 'Spin Rotation' },
      { name: 'spinSpeed', type: 'number', default: 7.0, min: 0, max: 20, step: 0.5, label: 'Spin Speed' },
      { name: 'color1', type: 'color', default: '#DE443B', label: 'Color 1' },
      { name: 'color2', type: 'color', default: '#006BB4', label: 'Color 2' },
      { name: 'color3', type: 'color', default: '#162325', label: 'Color 3' },
      { name: 'contrast', type: 'number', default: 3.5, min: 1, max: 10, step: 0.5, label: 'Contrast' },
      { name: 'lighting', type: 'number', default: 0.4, min: 0, max: 1, step: 0.05, label: 'Lighting' },
      { name: 'spinAmount', type: 'number', default: 0.25, min: 0, max: 1, step: 0.05, label: 'Spin Amount' },
      { name: 'pixelFilter', type: 'number', default: 700, min: 100, max: 2000, step: 50, label: 'Pixel Filter' }
    ]
  },
  {
    id: 'dither',
    label: 'Dither',
    component: () => import('../../../backgrounds/Dither/Dither.tsx'),
    installCommand: 'npx @praxys/ui add dither',
    props: [
      { name: 'waveColor', type: 'rgbArray', default: [0.32, 0.15, 1.0], label: 'Color' },
      { name: 'disableAnimation', type: 'boolean', default: false, label: 'Disable Animation' },
      { name: 'enableMouseInteraction', type: 'boolean', default: true, label: 'Mouse Interaction' },
      { name: 'mouseRadius', type: 'number', default: 1, min: 0, max: 2, step: 0.1, label: 'Mouse Radius' },
      { name: 'colorNum', type: 'number', default: 4, min: 2, max: 16, step: 1, label: 'Color Num' },
      { name: 'pixelSize', type: 'number', default: 2, min: 1, max: 8, step: 1, label: 'Pixel Size' },
      { name: 'waveAmplitude', type: 'number', default: 0.3, min: 0, max: 1, step: 0.05, label: 'Wave Amplitude' },
      { name: 'waveFrequency', type: 'number', default: 3, min: 1, max: 10, step: 0.5, label: 'Wave Frequency' },
      { name: 'waveSpeed', type: 'number', default: 0.05, min: 0, max: 0.2, step: 0.01, label: 'Wave Speed' }
    ]
  },
  {
    id: 'dot-grid',
    label: 'Dot Grid',
    component: () => import('../../../backgrounds/DotGrid/DotGrid.tsx'),
    installCommand: 'npx @praxys/ui add dot-grid',
    props: [
      { name: 'dotSize', type: 'number', default: 16, min: 4, max: 40, step: 2, label: 'Dot Size' },
      { name: 'gap', type: 'number', default: 32, min: 10, max: 80, step: 4, label: 'Gap' },
      { name: 'baseColor', type: 'color', default: '#5227FF', label: 'Base Color' },
      { name: 'activeColor', type: 'color', default: '#5227FF', label: 'Active Color' },
      { name: 'proximity', type: 'number', default: 150, min: 50, max: 400, step: 10, label: 'Proximity' },
      { name: 'speedTrigger', type: 'number', default: 100, min: 10, max: 500, step: 10, label: 'Speed Trigger' },
      { name: 'shockRadius', type: 'number', default: 250, min: 50, max: 500, step: 10, label: 'Shock Radius' },
      { name: 'shockStrength', type: 'number', default: 5, min: 1, max: 20, step: 0.5, label: 'Shock Strength' },
      { name: 'maxSpeed', type: 'number', default: 5000, min: 1000, max: 10000, step: 500, label: 'Max Speed' },
      { name: 'resistance', type: 'number', default: 750, min: 100, max: 2000, step: 50, label: 'Resistance' },
      { name: 'returnDuration', type: 'number', default: 1.5, min: 0.3, max: 5, step: 0.1, label: 'Return Duration' }
    ]
  },
  {
    id: 'beams',
    label: 'Beams',
    component: () => import('../../../backgrounds/Beams/Beams.tsx'),
    installCommand: 'npx @praxys/ui add beams',
    props: [
      { name: 'beamWidth', type: 'number', default: 2, min: 0.5, max: 10, step: 0.5, label: 'Beam Width' },
      { name: 'beamHeight', type: 'number', default: 15, min: 5, max: 30, step: 1, label: 'Beam Height' },
      { name: 'beamNumber', type: 'number', default: 12, min: 2, max: 30, step: 1, label: 'Beam Number' },
      { name: 'lightColor', type: 'color', default: '#ffffff', label: 'Light Color' },
      { name: 'speed', type: 'number', default: 2, min: 0.1, max: 10, step: 0.1, label: 'Speed' },
      { name: 'noiseIntensity', type: 'number', default: 1.75, min: 0, max: 5, step: 0.25, label: 'Noise Intensity' },
      { name: 'scale', type: 'number', default: 0.2, min: 0.05, max: 1, step: 0.05, label: 'Scale' },
      { name: 'rotation', type: 'number', default: 0, min: -180, max: 180, step: 5, label: 'Rotation' }
    ]
  },
  {
    id: 'dark-veil',
    label: 'Dark Veil',
    component: () => import('../../../backgrounds/DarkVeil/DarkVeil.tsx'),
    installCommand: 'npx @praxys/ui add dark-veil',
    props: [
      { name: 'hueShift', type: 'number', default: 0, min: -180, max: 180, step: 5, label: 'Hue Shift' },
      { name: 'noiseIntensity', type: 'number', default: 0, min: 0, max: 0.5, step: 0.01, label: 'Noise Intensity' },
      {
        name: 'scanlineIntensity',
        type: 'number',
        default: 0,
        min: 0,
        max: 1,
        step: 0.05,
        label: 'Scanline Intensity'
      },
      { name: 'speed', type: 'number', default: 0.5, min: 0, max: 2, step: 0.1, label: 'Speed' },
      { name: 'scanlineFrequency', type: 'number', default: 0, min: 0, max: 50, step: 1, label: 'Scanline Frequency' },
      { name: 'warpAmount', type: 'number', default: 0, min: 0, max: 1, step: 0.05, label: 'Warp Amount' },
      { name: 'resolutionScale', type: 'number', default: 1, min: 0.25, max: 2, step: 0.25, label: 'Resolution Scale' }
    ]
  },
  {
    id: 'light-rays',
    label: 'Light Rays',
    component: () => import('../../../backgrounds/LightRays/LightRays.tsx'),
    installCommand: 'npx @praxys/ui add light-rays',
    props: [
      {
        name: 'raysOrigin',
        type: 'select',
        default: 'top-center',
        options: [
          'top-left',
          'top-center',
          'top-right',
          'left',
          'right',
          'bottom-left',
          'bottom-center',
          'bottom-right'
        ],
        label: 'Rays Origin'
      },
      { name: 'raysColor', type: 'color', default: '#ffffff', label: 'Rays Color' },
      { name: 'raysSpeed', type: 'number', default: 1, min: 0, max: 5, step: 0.1, label: 'Speed' },
      { name: 'lightSpread', type: 'number', default: 1, min: 0.1, max: 3, step: 0.1, label: 'Light Spread' },
      { name: 'rayLength', type: 'number', default: 2, min: 0.5, max: 5, step: 0.1, label: 'Ray Length' },
      { name: 'pulsating', type: 'boolean', default: false, label: 'Pulsating' },
      { name: 'fadeDistance', type: 'number', default: 1, min: 0, max: 3, step: 0.1, label: 'Fade Distance' },
      { name: 'saturation', type: 'number', default: 1, min: 0, max: 2, step: 0.1, label: 'Saturation' },
      { name: 'followMouse', type: 'boolean', default: true, label: 'Follow Mouse' },
      { name: 'mouseInfluence', type: 'number', default: 0.1, min: 0, max: 1, step: 0.05, label: 'Mouse Influence' },
      { name: 'noiseAmount', type: 'number', default: 0, min: 0, max: 1, step: 0.05, label: 'Noise Amount' },
      { name: 'distortion', type: 'number', default: 0, min: 0, max: 1, step: 0.05, label: 'Distortion' }
    ]
  },
  {
    id: 'prism',
    label: 'Prism',
    component: () => import('../../../backgrounds/Prism/Prism.tsx'),
    installCommand: 'npx @praxys/ui add prism',
    props: [
      { name: 'height', type: 'number', default: 3.5, min: 1, max: 10, step: 0.5, label: 'Height' },
      { name: 'baseWidth', type: 'number', default: 5.5, min: 1, max: 15, step: 0.5, label: 'Base Width' },
      {
        name: 'animationType',
        type: 'select',
        default: 'rotate',
        options: ['rotate', 'rotate3d', 'hover'],
        label: 'Animation Type'
      },
      { name: 'glow', type: 'number', default: 1, min: 0, max: 3, step: 0.1, label: 'Glow' },
      { name: 'noise', type: 'number', default: 0.5, min: 0, max: 2, step: 0.1, label: 'Noise' },
      { name: 'transparent', type: 'boolean', default: true, label: 'Transparent' },
      { name: 'scale', type: 'number', default: 3.6, min: 0.5, max: 10, step: 0.2, label: 'Scale' },
      { name: 'hueShift', type: 'number', default: 0, min: 0, max: 360, step: 5, label: 'Hue Shift' },
      { name: 'colorFrequency', type: 'number', default: 1, min: 0.1, max: 5, step: 0.1, label: 'Color Frequency' },
      { name: 'hoverStrength', type: 'number', default: 2, min: 0, max: 5, step: 0.5, label: 'Hover Strength' },
      { name: 'inertia', type: 'number', default: 0.05, min: 0.01, max: 0.2, step: 0.01, label: 'Inertia' },
      { name: 'bloom', type: 'number', default: 1, min: 0, max: 3, step: 0.1, label: 'Bloom' },
      { name: 'timeScale', type: 'number', default: 0.5, min: 0.1, max: 3, step: 0.1, label: 'Time Scale' }
    ]
  },
  {
    id: 'gradient-blinds',
    label: 'Gradient Blinds',
    component: () => import('../../../backgrounds/GradientBlinds/GradientBlinds.tsx'),
    installCommand: 'npx @praxys/ui add gradient-blinds',
    props: [
      {
        name: 'gradientColors',
        type: 'colorArray',
        default: ['#FF9FFC', '#5227FF'],
        label: 'Gradient Colors',
        minItems: 2,
        maxItems: 8
      },
      { name: 'angle', type: 'number', default: 0, min: -180, max: 180, step: 5, label: 'Angle' },
      { name: 'noise', type: 'number', default: 0.3, min: 0, max: 1, step: 0.05, label: 'Noise' },
      { name: 'blindCount', type: 'number', default: 16, min: 4, max: 50, step: 1, label: 'Blind Count' },
      { name: 'blindMinWidth', type: 'number', default: 60, min: 10, max: 200, step: 10, label: 'Blind Min Width' },
      { name: 'mouseDampening', type: 'number', default: 0.15, min: 0, max: 0.5, step: 0.05, label: 'Mouse Dampening' },
      { name: 'mirrorGradient', type: 'boolean', default: false, label: 'Mirror Gradient' },
      { name: 'spotlightRadius', type: 'number', default: 0.5, min: 0, max: 2, step: 0.1, label: 'Spotlight Radius' },
      { name: 'spotlightSoftness', type: 'number', default: 1, min: 0, max: 3, step: 0.1, label: 'Spotlight Softness' },
      { name: 'spotlightOpacity', type: 'number', default: 1, min: 0, max: 1, step: 0.05, label: 'Spotlight Opacity' },
      { name: 'distortAmount', type: 'number', default: 0, min: 0, max: 1, step: 0.05, label: 'Distort Amount' },
      {
        name: 'shineDirection',
        type: 'select',
        default: 'left',
        options: ['left', 'right', 'none'],
        label: 'Shine Direction'
      }
    ]
  },
  {
    id: 'grainient',
    label: 'Grainient',
    component: () => import('../../../backgrounds/Grainient/Grainient.tsx'),
    installCommand: 'npx @praxys/ui add grainient',
    props: [
      { name: 'color1', type: 'color', default: '#FF9FFC', label: 'Color 1' },
      { name: 'color2', type: 'color', default: '#5227FF', label: 'Color 2' },
      { name: 'color3', type: 'color', default: '#B19EEF', label: 'Color 3' },
      { name: 'timeSpeed', type: 'number', default: 0.25, min: 0, max: 5, step: 0.05, label: 'Time Speed' },
      { name: 'colorBalance', type: 'number', default: 0.0, min: -1, max: 1, step: 0.01, label: 'Color Balance' },
      { name: 'warpStrength', type: 'number', default: 1.0, min: 0, max: 4, step: 0.05, label: 'Warp Strength' },
      { name: 'warpFrequency', type: 'number', default: 5.0, min: 0, max: 12, step: 0.1, label: 'Warp Frequency' },
      { name: 'warpSpeed', type: 'number', default: 2.0, min: 0, max: 6, step: 0.1, label: 'Warp Speed' },
      { name: 'warpAmplitude', type: 'number', default: 50.0, min: 5, max: 80, step: 1, label: 'Warp Amplitude' },
      { name: 'blendAngle', type: 'number', default: 0.0, min: -180, max: 180, step: 1, label: 'Blend Angle' },
      { name: 'blendSoftness', type: 'number', default: 0.05, min: 0, max: 1, step: 0.01, label: 'Blend Softness' },
      { name: 'rotationAmount', type: 'number', default: 500.0, min: 0, max: 1440, step: 10, label: 'Rotation Amount' },
      { name: 'noiseScale', type: 'number', default: 2.0, min: 0, max: 4, step: 0.05, label: 'Noise Scale' },
      { name: 'grainAmount', type: 'number', default: 0.1, min: 0, max: 0.4, step: 0.01, label: 'Grain Amount' },
      { name: 'grainScale', type: 'number', default: 2.0, min: 0.2, max: 8, step: 0.1, label: 'Grain Scale' },
      { name: 'grainAnimated', type: 'boolean', default: false, label: 'Grain Animated' },
      { name: 'contrast', type: 'number', default: 1.5, min: 0, max: 2.5, step: 0.05, label: 'Contrast' },
      { name: 'gamma', type: 'number', default: 1.0, min: 0.4, max: 2.5, step: 0.05, label: 'Gamma' },
      { name: 'saturation', type: 'number', default: 1.0, min: 0, max: 2.5, step: 0.05, label: 'Saturation' },
      { name: 'centerX', type: 'number', default: 0.0, min: -1, max: 1, step: 0.01, label: 'Center X' },
      { name: 'centerY', type: 'number', default: 0.0, min: -1, max: 1, step: 0.01, label: 'Center Y' },
      { name: 'zoom', type: 'number', default: 0.9, min: 0.3, max: 3, step: 0.05, label: 'Zoom' }
    ]
  },
  {
    id: 'pixel-blast',
    label: 'Pixel Blast',
    component: () => import('../../../backgrounds/PixelBlast/PixelBlast.tsx'),
    installCommand: 'npx @praxys/ui add pixel-blast',
    props: [
      {
        name: 'variant',
        type: 'select',
        default: 'square',
        options: ['square', 'circle', 'triangle', 'diamond'],
        label: 'Variant'
      },
      { name: 'pixelSize', type: 'number', default: 3, min: 1, max: 10, step: 1, label: 'Pixel Size' },
      { name: 'color', type: 'color', default: '#B19EEF', label: 'Color' },
      { name: 'patternScale', type: 'number', default: 2, min: 0.5, max: 5, step: 0.5, label: 'Pattern Scale' },
      { name: 'patternDensity', type: 'number', default: 1, min: 0.1, max: 2, step: 0.1, label: 'Pattern Density' },
      { name: 'enableRipples', type: 'boolean', default: true, label: 'Enable Ripples' },
      { name: 'rippleSpeed', type: 'number', default: 0.3, min: 0.05, max: 1, step: 0.05, label: 'Ripple Speed' },
      {
        name: 'rippleThickness',
        type: 'number',
        default: 0.1,
        min: 0.01,
        max: 0.5,
        step: 0.02,
        label: 'Ripple Thickness'
      },
      {
        name: 'rippleIntensityScale',
        type: 'number',
        default: 1,
        min: 0.1,
        max: 3,
        step: 0.1,
        label: 'Ripple Intensity'
      },
      { name: 'speed', type: 'number', default: 0.5, min: 0, max: 2, step: 0.1, label: 'Speed' },
      { name: 'transparent', type: 'boolean', default: true, label: 'Transparent' },
      { name: 'edgeFade', type: 'number', default: 0.5, min: 0, max: 1, step: 0.05, label: 'Edge Fade' }
    ]
  },
  {
    id: 'liquid-ether',
    label: 'Liquid Ether',
    component: () => import('../../../backgrounds/LiquidEther/LiquidEther.tsx'),
    installCommand: 'npx @praxys/ui add liquid-ether',
    props: [
      { name: 'mouseForce', type: 'number', default: 20, min: 1, max: 50, step: 1, label: 'Mouse Force' },
      { name: 'cursorSize', type: 'number', default: 100, min: 20, max: 300, step: 10, label: 'Cursor Size' },
      { name: 'isViscous', type: 'boolean', default: false, label: 'Viscous' },
      { name: 'viscous', type: 'number', default: 30, min: 5, max: 100, step: 5, label: 'Viscosity' },
      {
        name: 'colors',
        type: 'colorArray',
        default: ['#5227FF', '#FF9FFC', '#B19EEF'],
        label: 'Colors',
        minItems: 2,
        maxItems: 5
      },
      { name: 'autoDemo', type: 'boolean', default: true, label: 'Auto Demo' },
      { name: 'autoSpeed', type: 'number', default: 0.5, min: 0.1, max: 2, step: 0.1, label: 'Auto Speed' },
      { name: 'autoIntensity', type: 'number', default: 2.2, min: 0.5, max: 5, step: 0.2, label: 'Auto Intensity' },
      { name: 'isBounce', type: 'boolean', default: false, label: 'Bounce' },
      { name: 'resolution', type: 'number', default: 0.5, min: 0.25, max: 1, step: 0.25, label: 'Resolution' }
    ]
  },
  {
    id: 'color-bends',
    label: 'Color Bends',
    component: () => import('../../../backgrounds/ColorBends/ColorBends.tsx'),
    installCommand: 'npx @praxys/ui add color-bends',
    props: [
      { name: 'rotation', type: 'number', default: 45, min: 0, max: 360, step: 5, label: 'Rotation' },
      { name: 'speed', type: 'number', default: 0.2, min: 0, max: 1, step: 0.05, label: 'Speed' },
      {
        name: 'colors',
        type: 'colorArray',
        default: ['#5227FF', '#FF9FFC', '#7cff67'],
        label: 'Colors',
        minItems: 2,
        maxItems: 8
      },
      { name: 'transparent', type: 'boolean', default: true, label: 'Transparent' },
      { name: 'autoRotate', type: 'number', default: 0, min: 0, max: 1, step: 0.05, label: 'Auto Rotate' },
      { name: 'scale', type: 'number', default: 1, min: 0.1, max: 3, step: 0.1, label: 'Scale' },
      { name: 'frequency', type: 'number', default: 1, min: 0.1, max: 3, step: 0.1, label: 'Frequency' },
      { name: 'warpStrength', type: 'number', default: 1, min: 0, max: 3, step: 0.1, label: 'Warp Strength' },
      { name: 'mouseInfluence', type: 'number', default: 1, min: 0, max: 3, step: 0.1, label: 'Mouse Influence' },
      { name: 'parallax', type: 'number', default: 0.5, min: 0, max: 2, step: 0.1, label: 'Parallax' },
      { name: 'noise', type: 'number', default: 0.1, min: 0, max: 0.5, step: 0.05, label: 'Noise' }
    ]
  },
  {
    id: 'light-pillar',
    label: 'Light Pillar',
    component: () => import('../../../backgrounds/LightPillar/LightPillar.tsx'),
    installCommand: 'npx @praxys/ui add light-pillar',
    props: [
      { name: 'topColor', type: 'color', default: '#5227FF', label: 'Top Color' },
      { name: 'bottomColor', type: 'color', default: '#FF9FFC', label: 'Bottom Color' },
      { name: 'intensity', type: 'number', default: 1, min: 0.1, max: 3, step: 0.1, label: 'Intensity' },
      { name: 'rotationSpeed', type: 'number', default: 0.3, min: 0, max: 2, step: 0.1, label: 'Rotation Speed' },
      { name: 'interactive', type: 'boolean', default: false, label: 'Interactive' },
      { name: 'glowAmount', type: 'number', default: 0.005, min: 0, max: 0.02, step: 0.001, label: 'Glow Amount' },
      { name: 'pillarWidth', type: 'number', default: 3, min: 0.5, max: 10, step: 0.5, label: 'Pillar Width' },
      { name: 'pillarHeight', type: 'number', default: 0.4, min: 0.1, max: 1, step: 0.05, label: 'Pillar Height' },
      { name: 'noiseIntensity', type: 'number', default: 0.5, min: 0, max: 2, step: 0.1, label: 'Noise Intensity' },
      { name: 'pillarRotation', type: 'number', default: 0, min: 0, max: 360, step: 5, label: 'Pillar Rotation' }
    ]
  },
  {
    id: 'antigravity',
    label: 'Antigravity',
    component: () => import('../../../animations/Antigravity/Antigravity.jsx'),
    installCommand: 'npx @praxys/ui add antigravity',
    props: [
      { name: 'count', type: 'number', default: 300, min: 50, max: 1000, step: 10, label: 'Particle Count' },
      { name: 'magnetRadius', type: 'number', default: 10, min: 1, max: 30, step: 1, label: 'Magnet Radius' },
      { name: 'ringRadius', type: 'number', default: 10, min: 1, max: 30, step: 1, label: 'Ring Radius' },
      { name: 'waveSpeed', type: 'number', default: 0.4, min: 0, max: 2, step: 0.1, label: 'Wave Speed' },
      { name: 'waveAmplitude', type: 'number', default: 1, min: 0, max: 5, step: 0.1, label: 'Wave Amplitude' },
      { name: 'particleSize', type: 'number', default: 2, min: 0.5, max: 10, step: 0.5, label: 'Particle Size' },
      { name: 'lerpSpeed', type: 'number', default: 0.1, min: 0.01, max: 0.5, step: 0.01, label: 'Lerp Speed' },
      { name: 'color', type: 'color', default: '#FF9FFC', label: 'Color' },
      { name: 'autoAnimate', type: 'boolean', default: false, label: 'Auto Animate' },
      { name: 'particleVariance', type: 'number', default: 1, min: 0, max: 3, step: 0.1, label: 'Particle Variance' },
      { name: 'rotationSpeed', type: 'number', default: 0, min: 0, max: 2, step: 0.1, label: 'Rotation Speed' },
      { name: 'depthFactor', type: 'number', default: 1, min: 0, max: 3, step: 0.1, label: 'Depth Factor' },
      { name: 'pulseSpeed', type: 'number', default: 3, min: 0, max: 10, step: 0.5, label: 'Pulse Speed' },
      {
        name: 'particleShape',
        type: 'select',
        default: 'capsule',
        options: ['capsule', 'sphere', 'box', 'tetrahedron'],
        label: 'Particle Shape'
      },
      { name: 'fieldStrength', type: 'number', default: 10, min: 0, max: 30, step: 1, label: 'Field Strength' }
    ]
  },
  {
    id: 'click-spark',
    label: 'Click Spark',
    component: () => import('../../../animations/ClickSpark/ClickSpark.jsx'),
    installCommand: 'npx @praxys/ui add click-spark',
    props: [
      { name: 'sparkColor', type: 'color', default: '#ffffff', label: 'Spark Color' },
      { name: 'sparkSize', type: 'number', default: 10, min: 2, max: 50, step: 1, label: 'Spark Size' },
      { name: 'sparkRadius', type: 'number', default: 15, min: 5, max: 100, step: 1, label: 'Spark Radius' },
      { name: 'sparkCount', type: 'number', default: 8, min: 3, max: 20, step: 1, label: 'Spark Count' },
      { name: 'duration', type: 'number', default: 400, min: 100, max: 2000, step: 50, label: 'Duration (ms)' },
      {
        name: 'easing',
        type: 'select',
        default: 'ease-out',
        options: ['linear', 'ease-in', 'ease-out', 'ease-in-out'],
        label: 'Easing'
      },
      { name: 'extraScale', type: 'number', default: 1.0, min: 0.5, max: 3, step: 0.1, label: 'Extra Scale' }
    ]
  },
  {
    id: 'laser-flow',
    label: 'Laser Flow',
    component: () =>
      import('../../../animations/LaserFlow/LaserFlow.jsx').then(m => ({ default: m.LaserFlow })),
    installCommand: 'npx @praxys/ui add laser-flow',
    props: [
      { name: 'color', type: 'color', default: '#FF79C6', label: 'Color' },
      { name: 'wispDensity', type: 'number', default: 1, min: 0, max: 2, step: 0.1, label: 'Wisp Density' },
      { name: 'flowSpeed', type: 'number', default: 0.35, min: 0, max: 2, step: 0.05, label: 'Flow Speed' },
      { name: 'verticalSizing', type: 'number', default: 2.0, min: 0.5, max: 5, step: 0.1, label: 'Vertical Size' },
      { name: 'horizontalSizing', type: 'number', default: 0.5, min: 0.1, max: 3, step: 0.1, label: 'Horizontal Size' },
      { name: 'fogIntensity', type: 'number', default: 0.45, min: 0, max: 1, step: 0.05, label: 'Fog Intensity' },
      { name: 'fogScale', type: 'number', default: 0.3, min: 0.1, max: 1, step: 0.05, label: 'Fog Scale' },
      { name: 'wispSpeed', type: 'number', default: 15.0, min: 1, max: 30, step: 1, label: 'Wisp Speed' },
      { name: 'wispIntensity', type: 'number', default: 5.0, min: 0, max: 15, step: 0.5, label: 'Wisp Intensity' },
      { name: 'flowStrength', type: 'number', default: 0.25, min: 0, max: 1, step: 0.05, label: 'Flow Strength' },
      { name: 'decay', type: 'number', default: 1.1, min: 0.5, max: 3, step: 0.1, label: 'Decay' },
      {
        name: 'horizontalBeamOffset',
        type: 'number',
        default: 0.0,
        min: -0.5,
        max: 0.5,
        step: 0.05,
        label: 'Horizontal Offset'
      },
      {
        name: 'verticalBeamOffset',
        type: 'number',
        default: -0.5,
        min: -0.5,
        max: 0.5,
        step: 0.05,
        label: 'Vertical Offset'
      }
    ]
  },
  {
    id: 'ribbons',
    label: 'Ribbons',
    component: () => import('../../../animations/Ribbons/Ribbons.jsx'),
    installCommand: 'npx @praxys/ui add ribbons',
    props: [
      { name: 'colors', type: 'colorArray', default: ['#FC8EAC'], label: 'Colors', minItems: 1, maxItems: 5 },
      { name: 'baseSpring', type: 'number', default: 0.03, min: 0.01, max: 0.1, step: 0.01, label: 'Spring' },
      { name: 'baseFriction', type: 'number', default: 0.9, min: 0.5, max: 0.99, step: 0.01, label: 'Friction' },
      { name: 'baseThickness', type: 'number', default: 30, min: 5, max: 100, step: 5, label: 'Thickness' },
      { name: 'offsetFactor', type: 'number', default: 0.05, min: 0, max: 0.2, step: 0.01, label: 'Offset Factor' },
      { name: 'maxAge', type: 'number', default: 500, min: 100, max: 2000, step: 50, label: 'Max Age (ms)' },
      { name: 'pointCount', type: 'number', default: 50, min: 10, max: 150, step: 5, label: 'Point Count' },
      { name: 'speedMultiplier', type: 'number', default: 0.6, min: 0.1, max: 2, step: 0.1, label: 'Speed' },
      { name: 'enableFade', type: 'boolean', default: false, label: 'Enable Fade' },
      { name: 'enableShaderEffect', type: 'boolean', default: false, label: 'Shader Effect' },
      { name: 'effectAmplitude', type: 'number', default: 2, min: 0, max: 10, step: 0.5, label: 'Effect Amplitude' }
    ]
  },
  {
    id: 'splash-cursor',
    label: 'Splash Cursor',
    component: () => import('../../../animations/SplashCursor/SplashCursor.jsx'),
    installCommand: 'npx @praxys/ui add splash-cursor',
    forceRemountOnPropChange: true,
    props: [
      {
        name: 'SIM_RESOLUTION',
        type: 'number',
        default: 128,
        min: 32,
        max: 256,
        step: 32,
        label: 'Simulation Resolution'
      },
      {
        name: 'DYE_RESOLUTION',
        type: 'number',
        default: 1440,
        min: 512,
        max: 2048,
        step: 128,
        label: 'Dye Resolution'
      },
      {
        name: 'DENSITY_DISSIPATION',
        type: 'number',
        default: 3.5,
        min: 0.5,
        max: 10,
        step: 0.5,
        label: 'Density Dissipation'
      },
      {
        name: 'VELOCITY_DISSIPATION',
        type: 'number',
        default: 2,
        min: 0.5,
        max: 5,
        step: 0.5,
        label: 'Velocity Dissipation'
      },
      { name: 'PRESSURE', type: 'number', default: 0.1, min: 0, max: 1, step: 0.1, label: 'Pressure' },
      { name: 'CURL', type: 'number', default: 3, min: 0, max: 30, step: 1, label: 'Curl' },
      { name: 'SPLAT_RADIUS', type: 'number', default: 0.2, min: 0.05, max: 1, step: 0.05, label: 'Splat Radius' },
      { name: 'SPLAT_FORCE', type: 'number', default: 6000, min: 1000, max: 20000, step: 500, label: 'Splat Force' },
      { name: 'COLOR_UPDATE_SPEED', type: 'number', default: 10, min: 1, max: 50, step: 1, label: 'Color Update Speed' }
    ]
  }
];

export const getBackgroundById = id => BACKGROUNDS.find(bg => bg.id === id);
export const getDefaultProps = background => {
  if (!background?.props) return {};
  return background.props.reduce((acc, prop) => {
    acc[prop.name] = prop.default;
    return acc;
  }, {});
};

const ANIMATION_IDS = [
  'antigravity',
  'click-spark',
  'ghost-cursor',
  'image-trail',
  'laser-flow',
  'noise',
  'ribbons',
  'splash-cursor'
];

export const getDocsPath = background => {
  if (!background?.id) return '/';
  const category = ANIMATION_IDS.includes(background.id) ? 'animations' : 'backgrounds';
  return `/${category}/${background.id}`;
};

