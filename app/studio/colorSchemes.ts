// Color schemes for component customization in Animation Studio

export interface ColorScheme {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export const colorSchemes: ColorScheme[] = [
  {
    id: 'default',
    name: 'Praxys (Default)',
    primary: '#FF4405',
    secondary: '#1a1a1a',
    accent: '#FF6B35',
    background: '#0f0f0f',
    text: '#e8e8e8',
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    primary: '#0077BE',
    secondary: '#00A8E8',
    accent: '#00D9FF',
    background: '#001F3F',
    text: '#E0F7FF',
  },
  {
    id: 'forest',
    name: 'Forest Green',
    primary: '#2D5016',
    secondary: '#4A7C2A',
    accent: '#8BC34A',
    background: '#1B2E0F',
    text: '#E8F5E9',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    primary: '#FF6B35',
    secondary: '#F7931E',
    accent: '#FDC830',
    background: '#2C1810',
    text: '#FFF8E7',
  },
  {
    id: 'purple',
    name: 'Purple Haze',
    primary: '#6A0DAD',
    secondary: '#9D4EDD',
    accent: '#E0AAFF',
    background: '#1A0033',
    text: '#F8F0FF',
  },
  {
    id: 'rose',
    name: 'Rose Gold',
    primary: '#B76E79',
    secondary: '#E8B4B8',
    accent: '#FFD6D6',
    background: '#2D1B1F',
    text: '#FFF0F3',
  },
  {
    id: 'mint',
    name: 'Mint Fresh',
    primary: '#3EB489',
    secondary: '#5CD2A4',
    accent: '#A8E6CE',
    background: '#0F2419',
    text: '#E8FFF6',
  },
  {
    id: 'fire',
    name: 'Fire Red',
    primary: '#D32F2F',
    secondary: '#F44336',
    accent: '#FF6F61',
    background: '#1A0C0C',
    text: '#FFE5E5',
  },
  {
    id: 'cyber',
    name: 'Cyberpunk',
    primary: '#00FFF0',
    secondary: '#FF00E5',
    accent: '#FFE600',
    background: '#0A0A0A',
    text: '#FFFFFF',
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    accent: '#888888',
    background: '#000000',
    text: '#FFFFFF',
  },
]

// Generate a random color scheme
export function generateRandomColorScheme(): ColorScheme {
  const baseHue = Math.floor(Math.random() * 360)
  
  // Generate complementary colors based on the base hue
  const primary = `hsl(${baseHue}, 70%, 50%)`
  const secondary = `hsl(${(baseHue + 30) % 360}, 65%, 55%)`
  const accent = `hsl(${(baseHue + 60) % 360}, 75%, 60%)`
  const background = `hsl(${baseHue}, 20%, 8%)`
  const text = `hsl(${baseHue}, 10%, 92%)`
  
  return {
    id: 'random-' + Date.now(),
    name: 'Random',
    primary,
    secondary,
    accent,
    background,
    text,
  }
}

// Convert HSL to Hex (for display purposes)
export function hslToHex(hsl: string): string {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
  if (!match) return hsl
  
  const h = parseInt(match[1])
  const s = parseInt(match[2]) / 100
  const l = parseInt(match[3]) / 100
  
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  
  let r = 0, g = 0, b = 0
  
  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c
  } else {
    r = c; g = 0; b = x
  }
  
  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
