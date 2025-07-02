// ─── Shared theme presets & helpers ──────────────────────
// Used by both ThemeCustomizer and ComponentPreview theme selector

export interface ThemeColors {
  void: string;
  obsidian: string;
  ignite: string;
  blush: string;
  chalk: string;
}

export interface ThemePreset {
  name: string;
  dark: ThemeColors;
  light: ThemeColors;
}

// ─── Derive helpers ──────────────────────────────────────

export function deriveBorder(obsidian: string, chalk: string): string {
  const obsL = lightness(obsidian);
  const chkL = lightness(chalk);
  const isDark = obsL < chkL;
  const r = parseInt(obsidian.slice(1, 3), 16);
  const g = parseInt(obsidian.slice(3, 5), 16);
  const b = parseInt(obsidian.slice(5, 7), 16);
  if (isDark) {
    return toHex(Math.min(255, r + 20), Math.min(255, g + 18), Math.min(255, b + 16));
  }
  return toHex(Math.max(0, r - 30), Math.max(0, g - 28), Math.max(0, b - 25));
}

export function deriveBorderLight(obsidian: string, chalk: string): string {
  const obsL = lightness(obsidian);
  const chkL = lightness(chalk);
  const isDark = obsL < chkL;
  const r = parseInt(obsidian.slice(1, 3), 16);
  const g = parseInt(obsidian.slice(3, 5), 16);
  const b = parseInt(obsidian.slice(5, 7), 16);
  if (isDark) {
    return toHex(Math.min(255, r + 35), Math.min(255, g + 32), Math.min(255, b + 28));
  }
  return toHex(Math.max(0, r - 45), Math.max(0, g - 42), Math.max(0, b - 38));
}

export function deriveTextFaint(blush: string): string {
  const r = parseInt(blush.slice(1, 3), 16);
  const g = parseInt(blush.slice(3, 5), 16);
  const b = parseInt(blush.slice(5, 7), 16);
  return toHex(Math.round(r * 0.7), Math.round(g * 0.7), Math.round(b * 0.7));
}

function lightness(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
}

function toHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/** Build a full set of CSS variable overrides from 5 core colors */
export function buildThemeVars(colors: ThemeColors): Record<string, string> {
  const border = deriveBorder(colors.obsidian, colors.chalk);
  const borderLight = deriveBorderLight(colors.obsidian, colors.chalk);
  const textFaint = deriveTextFaint(colors.blush);
  return {
    "--color-void": colors.void,
    "--color-obsidian": colors.obsidian,
    "--color-ignite": colors.ignite,
    "--color-blush": colors.blush,
    "--color-chalk": colors.chalk,
    "--color-border": border,
    "--color-border-light": borderLight,
    "--color-text-faint": textFaint,
    "--color-ignite-dim": `${colors.ignite}14`,
    "--color-code-bg": colors.obsidian,
  };
}

// ─── Presets ─────────────────────────────────────────────

export const defaultDark: ThemeColors = {
  void: "#050505",
  obsidian: "#0B0A08",
  ignite: "#E84E2D",
  blush: "#C9958A",
  chalk: "#F2ECE2",
};

export const defaultLight: ThemeColors = {
  void: "#FAFAF8",
  obsidian: "#F0EDE8",
  ignite: "#D4432A",
  blush: "#8B6B62",
  chalk: "#1A1714",
};

export const themePresets: ThemePreset[] = [
  { name: "Praxys", dark: defaultDark, light: defaultLight },
  {
    name: "Ocean",
    dark: { void: "#020617", obsidian: "#0f172a", ignite: "#3b82f6", blush: "#94a3b8", chalk: "#f1f5f9" },
    light: { void: "#f8fafc", obsidian: "#e2e8f0", ignite: "#2563eb", blush: "#64748b", chalk: "#0f172a" },
  },
  {
    name: "Forest",
    dark: { void: "#022c22", obsidian: "#064e3b", ignite: "#10b981", blush: "#6ee7b7", chalk: "#ecfdf5" },
    light: { void: "#f0fdf4", obsidian: "#dcfce7", ignite: "#059669", blush: "#4ade80", chalk: "#052e16" },
  },
  {
    name: "Purple Haze",
    dark: { void: "#09090b", obsidian: "#18181b", ignite: "#a855f7", blush: "#c4b5fd", chalk: "#faf5ff" },
    light: { void: "#faf5ff", obsidian: "#f3e8ff", ignite: "#9333ea", blush: "#7c3aed", chalk: "#1e1b4b" },
  },
  {
    name: "Rose Gold",
    dark: { void: "#0c0a09", obsidian: "#1c1917", ignite: "#f43f5e", blush: "#fda4af", chalk: "#fff1f2" },
    light: { void: "#fff1f2", obsidian: "#ffe4e6", ignite: "#e11d48", blush: "#be123c", chalk: "#1c1917" },
  },
  {
    name: "Amber",
    dark: { void: "#0a0a00", obsidian: "#1a1a0a", ignite: "#f59e0b", blush: "#fbbf24", chalk: "#fffbeb" },
    light: { void: "#fffbeb", obsidian: "#fef3c7", ignite: "#d97706", blush: "#b45309", chalk: "#1c1917" },
  },
  {
    name: "Neutral",
    dark: { void: "#0a0a0a", obsidian: "#171717", ignite: "#a3a3a3", blush: "#737373", chalk: "#ededed" },
    light: { void: "#fafafa", obsidian: "#f0f0f0", ignite: "#404040", blush: "#737373", chalk: "#171717" },
  },
];
