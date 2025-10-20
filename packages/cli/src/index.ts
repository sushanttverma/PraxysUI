#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";
import { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const VERSION = "1.3.3";

// ─── Types ──────────────────────────────────────────────

type ComponentMeta = {
  title: string;
  description: string;
  category: "buttons" | "cards" | "text" | "navigation" | "visual" | "media";
  dependencies: string[];
  isNew?: boolean;
};

type PraxysConfig = {
  componentsDir: string;
  utilsDir: string;
};

// ─── Utility file contents ──────────────────────────────

const UTILS_CONTENT = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

// ─── Component registry ─────────────────────────────────

const COMPONENTS_BASE_URL =
  "https://raw.githubusercontent.com/sushanttverma/Praxys-UI/main/app/components/ui";

const COMPONENT_REGISTRY: Record<string, ComponentMeta> = {
  "accordion": { title: "Accordion", description: "Smooth expand/collapse panels with animated chevron, supports single or multiple open panels.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "alert": { title: "Alert", description: "Animated alert banner with four variants (info, success, warning, error), contextual icons, optional title, dismissible with exit animation.", category: "visual", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "animated-button": { title: "Animated Button", description: "A button with a shiny border sweep and text reveal effect, perfect for calls to action.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "animated-counter": { title: "Animated Counter", description: "A number counter that animates from one value to another using spring physics, triggered when scrolled into view.", category: "text", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "animated-hero": { title: "Animated Hero", description: "A reusable hero section with staggered entrance animations, pulsing radial glow, grid background, badge, and dual CTA buttons.", category: "media", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "animated-input": { title: "Animated Input", description: "A floating-label text input with animated border, focus ring, optional left/right icons, error state, and three sizes.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "animated-number": { title: "Animated Number", description: "Smoothly animates between number values with a spring transition.", category: "text", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "animated-select": { title: "Animated Select", description: "An accessible custom dropdown select with animated open/close, keyboard navigation, and spring transitions.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"] },
  "animated-tabs": { title: "Animated Tabs", description: "Tab navigation with a smooth sliding indicator and crossfade content transitions.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "animated-textarea": { title: "Animated Textarea", description: "A floating-label textarea with animated border, focus ring, character counter, auto-resize support, and error state.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "animated-toggle": { title: "Animated Toggle", description: "A switch toggle with spring-animated knob, multiple sizes, ARIA role='switch', keyboard support, and disabled state.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "autocomplete": { title: "Autocomplete", description: "An accessible autocomplete input with async search, debouncing, keyboard navigation, loading states, and animated dropdown.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"], isNew: true },
  "avatar-group": { title: "Avatar Group", description: "Stacked avatar circles with overlap, max display count with '+N' overflow indicator, three sizes, and fallback initials.", category: "visual", dependencies: ["clsx", "tailwind-merge"] },
  "badge": { title: "Badge", description: "Animated badge with multiple variants (default, success, warning, error, info), three sizes, optional icon, and removable.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "breadcrumbs": { title: "Breadcrumbs", description: "Navigation breadcrumbs with Next.js Link integration, custom separator support, aria-label accessibility, and current page indicator.", category: "navigation", dependencies: ["clsx", "tailwind-merge", "lucide-react"] },
  "checkbox": { title: "Checkbox", description: "An accessible animated checkbox with spring check-mark animation, error state, label support, and keyboard interaction.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "color-picker": { title: "Color Picker", description: "A comprehensive color picker with HSL sliders, preset swatches, hex/RGB/HSL format toggling, and copy-to-clipboard.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"], isNew: true },
  "combobox": { title: "Combobox", description: "A searchable select component with keyboard navigation, multi-select support, and animated dropdown.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"] },
  "command-menu": { title: "Command Menu", description: "A command palette with search filtering, grouped items, keyboard navigation, match highlighting, and shortcut badges.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "creepy-button": { title: "Creepy Button", description: "A horror-inspired button with flickering background, dripping accent line, and staggered glitchy text animation on hover.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "data-table": { title: "Data Table", description: "Sortable data table with column definitions, ascending/descending sort indicators, striped rows, and hover state.", category: "cards", dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"] },
  "date-picker": { title: "Date Picker", description: "A fully-featured date picker with calendar view, keyboard navigation, month/year selectors, and optional range selection.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"] },
  "displacement-text": { title: "3D Displacement Text", description: "Mouse-reactive 3D text with depth shadows that follows cursor movement, creating a dramatic displacement effect.", category: "text", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "divider": { title: "Divider", description: "Animated divider with horizontal/vertical orientation, optional centered label, and gradient mode.", category: "cards", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "dropdown-menu": { title: "Dropdown Menu", description: "An animated dropdown menu with full keyboard navigation, click-outside close, divider and disabled item support.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "expandable-bento-grid": { title: "Expandable Bento Grid", description: "A bento-style grid where clicking an item expands it into a full overlay modal with smooth layout animations.", category: "cards", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "file-upload": { title: "File Upload", description: "An accessible drag-and-drop file upload component with validation, progress animation, file list preview, and keyboard interaction.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"], isNew: true },
  "flip-fade-text": { title: "Flip Fade Text", description: "A rotating text component that cycles through words with a 3D flip and fade transition, perfect for hero taglines.", category: "text", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "flip-text": { title: "Flip Text", description: "Characters flip in with a smooth 3D rotation on mount and on hover, great for headings and titles.", category: "text", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "floating-menu": { title: "Floating Menu", description: "A floating pill menu that expands into a card with GSAP-animated hamburger-to-X, text scramble effect, and staggered item reveals.", category: "navigation", dependencies: ["gsap", "clsx", "tailwind-merge"], isNew: true },
  "folder-preview": { title: "Folder Preview", description: "An interactive folder component that expands to reveal a file tree with staggered entrance animations and custom icons.", category: "media", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "glass-dock": { title: "Glass Dock", description: "A macOS-inspired dock with glassmorphism styling, spring-animated hover magnification, and tooltips.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "glow-border-card": { title: "Glow Border Card", description: "A card with an animated glowing border that follows cursor movement.", category: "cards", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "gradient-mesh": { title: "Gradient Mesh", description: "Animated multi-color gradient mesh background with smooth transitions between color states.", category: "visual", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "image-comparison": { title: "Image Comparison", description: "A before/after image comparison slider with pointer-capture dragging, clip-based reveal, and an animated drag handle.", category: "media", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "infinite-scroll": { title: "Infinite Scroll", description: "An Intersection Observer-based infinite scroll container with loading state, configurable threshold, and animated loader.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "interactive-book": { title: "Interactive Book", description: "A 3D page-flip book component with AnimatePresence transitions, directional flip variants, and dot navigation.", category: "media", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "kbd": { title: "Kbd", description: "Keyboard shortcut indicator with monospace font, shadow border styling, and inline usage support.", category: "text", dependencies: ["clsx", "tailwind-merge"] },
  "light-lines": { title: "Light Lines", description: "Animated vertical light beams that sweep across a container, creating a dramatic visual effect.", category: "visual", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "line-hover-link": { title: "Line Hover Link", description: "A link with an animated underline that slides in on hover.", category: "navigation", dependencies: ["clsx", "tailwind-merge"] },
  "liquid-metal": { title: "Liquid Metal", description: "A cursor-reactive surface with chrome-like liquid metal reflections that follow mouse movement.", category: "visual", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "liquid-ocean": { title: "Liquid Ocean", description: "Animated layered SVG waves with configurable colors, wave count, and speed for a mesmerizing ocean effect.", category: "visual", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "logo-slider": { title: "Logo Slider", description: "An infinite-scrolling marquee of logos or brand icons with fade edges, pause-on-hover, and bidirectional support.", category: "media", dependencies: ["clsx", "tailwind-merge"] },
  "magnetic-cursor": { title: "Magnetic Cursor", description: "A wrapper that creates a magnetic pull effect, attracting elements toward the cursor with configurable strength.", category: "visual", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "masked-avatars": { title: "Masked Avatars", description: "A stacked avatar group with overlapping circular avatars, hover-to-pop animation, tooltips, and a +N overflow indicator.", category: "media", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "modal-dialog": { title: "Modal Dialog", description: "An animated modal dialog with backdrop blur, spring scale transition, Escape key handling, scroll lock, and ARIA attributes.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "morphing-text": { title: "Morphing Text", description: "Text that morphs between words using a blur crossfade effect, creating smooth character interpolation transitions.", category: "text", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "otp-input": { title: "OTP Input", description: "An accessible OTP/PIN input component with auto-focus, paste support, keyboard navigation, and animated focus states.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"], isNew: true },
  "pagination": { title: "Pagination", description: "Accessible pagination with animated active-page indicator, smart ellipsis, two sizes, and prev/next buttons.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "parallax-scroll": { title: "Parallax Scroll", description: "Scroll-driven parallax layers with configurable speed multipliers for creating depth effects.", category: "visual", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "perspective-grid": { title: "Perspective Grid", description: "A 3D perspective grid that tilts items on hover with smooth spring animations and staggered entrance.", category: "cards", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "progress-bar": { title: "Progress Bar", description: "An animated progress bar with multiple sizes, optional label and value display, custom colors, and candy-stripe animation.", category: "visual", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "radio-group": { title: "Radio Group", description: "An accessible animated radio group with spring selection animation, horizontal/vertical layout, and keyboard navigation.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "rating": { title: "Rating", description: "An accessible animated rating component with star icons, half-star support, custom icons, hover states, and spring animations.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"], isNew: true },
  "reveal-loader": { title: "Reveal Loader", description: "A loading animation with a curtain reveal effect — shows a progress bar, then slides away to reveal content.", category: "visual", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "sheet": { title: "Sheet", description: "A slide-in panel overlay (drawer) with four sides, backdrop blur, scroll lock, Escape-to-close, and spring transition.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "skeleton-loader": { title: "Skeleton Loader", description: "Animated placeholder loading states with shimmer effect, supporting text, avatar, card, and button variants.", category: "visual", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "slider": { title: "Slider", description: "An accessible animated slider with drag interaction, keyboard navigation, tooltip value display, and spring animations.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"], isNew: true },
  "social-flip-button": { title: "Social Flip Button", description: "A button that flips to reveal social media icons on hover, with a smooth 3D rotation transition.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"] },
  "spotlight-card": { title: "Spotlight Card", description: "A card with a radial spotlight that follows the cursor, creating a flashlight reveal effect.", category: "cards", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "spotlight-navbar": { title: "Spotlight Navbar", description: "A horizontal navigation bar with a smooth animated spotlight background that follows the hovered item.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "staggered-grid": { title: "Staggered Grid", description: "A grid layout where children animate in with a staggered fade-up effect as they enter the viewport.", category: "cards", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "stats-card": { title: "Stats Card", description: "Animated statistics card with spring-based number counter, trend indicator, optional icon, and scroll-triggered entrance.", category: "cards", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "stepper": { title: "Stepper", description: "A multi-step indicator with animated check icons, spring-scaled active step, and animated connector lines.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "switch": { title: "Switch", description: "An accessible animated toggle switch with spring thumb animation, size variants, label support, and keyboard interaction.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"], isNew: true },
  "tag-input": { title: "Tag Input", description: "Animated tag input with Enter/comma to add, Backspace to remove, max tags limit, and AnimatePresence transitions.", category: "buttons", dependencies: ["framer-motion", "clsx", "tailwind-merge", "lucide-react"] },
  "testimonials-card": { title: "Testimonials Card", description: "An auto-rotating testimonials card with smooth crossfade transitions, avatar display, and dot navigation.", category: "cards", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "timeline": { title: "Timeline", description: "Alternating two-column timeline with scroll-triggered animations, connecting lines, active-state pulse rings, and optional icons.", category: "cards", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "toast-notification": { title: "Toast Notification", description: "Stackable animated toast notifications with variants (success, error, warning, info), auto-dismiss, and manual dismiss.", category: "visual", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "tooltip": { title: "Tooltip", description: "A tooltip with 4 positions, configurable delay, direction-aware motion animation, and arrow pointer.", category: "navigation", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
  "typewriter-text": { title: "Typewriter Text", description: "An animated typing effect that cycles through strings, typing and deleting characters with a blinking cursor.", category: "text", dependencies: ["framer-motion", "clsx", "tailwind-merge"] },
};

const COMPONENT_LIST = Object.keys(COMPONENT_REGISTRY);

const CATEGORY_COLORS: Record<string, string> = {
  buttons: "#E84E2D",
  cards: "#3B82F6",
  text: "#8B5CF6",
  navigation: "#10B981",
  visual: "#F59E0B",
  media: "#EC4899",
};

// ─── Helpers ─────────────────────────────────────────────

function detectPackageManager(): "npm" | "pnpm" | "yarn" | "bun" {
  const cwd = process.cwd();
  if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock")))
    return "bun";
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

function installCmd(pm: string, deps: string[]): string {
  const d = deps.join(" ");
  switch (pm) {
    case "pnpm":
      return `pnpm add ${d}`;
    case "yarn":
      return `yarn add ${d}`;
    case "bun":
      return `bun add ${d}`;
    default:
      return `npm install ${d}`;
  }
}

function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

async function fetchComponent(slug: string): Promise<string> {
  const url = `${COMPONENTS_BASE_URL}/${slug}.tsx`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${slug}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

function toPascalCase(slug: string): string {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function loadConfig(): PraxysConfig | null {
  const configPath = join(process.cwd(), "praxys.config.json");
  if (!existsSync(configPath)) return null;
  try {
    const raw = readFileSync(configPath, "utf-8");
    return JSON.parse(raw) as PraxysConfig;
  } catch {
    return null;
  }
}

function getComponentsDir(optDir?: string): string {
  if (optDir) return optDir;
  const config = loadConfig();
  return config?.componentsDir ?? "components/ui";
}

function fuzzyMatch(query: string, text: string): boolean {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  return lower.includes(q);
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 1) + "…";
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function didYouMean(input: string): string | null {
  let best = "";
  let bestDist = Infinity;
  for (const slug of COMPONENT_LIST) {
    const dist = levenshtein(input.toLowerCase(), slug.toLowerCase());
    if (dist < bestDist) {
      bestDist = dist;
      best = slug;
    }
  }
  // Only suggest if distance is reasonable (less than ~40% of input length)
  if (bestDist <= Math.max(2, Math.floor(input.length * 0.4))) {
    return best;
  }
  return null;
}

function printNotFound(slug: string) {
  const suggestion = didYouMean(slug);
  if (suggestion) {
    console.log(chalk.red(`  Component "${slug}" not found.`) + chalk.dim(` Did you mean ${chalk.bold(suggestion)}?`));
  } else {
    console.log(chalk.red(`  Component "${slug}" not found.`));
  }
}

async function checkForUpdates() {
  try {
    const res = await fetch("https://registry.npmjs.org/praxys-ui/latest", {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return;
    const data = await res.json() as { version?: string };
    const latest = data.version;
    if (latest && latest !== VERSION) {
      console.log(
        chalk.dim(`  Update available: ${VERSION} → ${chalk.bold(latest)}  Run ${chalk.cyan("npm i -g praxys-ui")} to update.`)
      );
      console.log("");
    }
  } catch {
    // Silently ignore — no network, timeout, etc.
  }
}

function colorizeSource(source: string): string {
  const lines = source.split("\n");
  return lines
    .map((line) => {
      // Comments
      if (line.trimStart().startsWith("//")) return chalk.dim.green(line);
      if (line.trimStart().startsWith("/*") || line.trimStart().startsWith("*"))
        return chalk.dim.green(line);

      // Highlight keywords
      let colored = line;
      const keywords = [
        "import",
        "export",
        "from",
        "const",
        "let",
        "var",
        "function",
        "return",
        "if",
        "else",
        "type",
        "interface",
        "default",
        "async",
        "await",
        "new",
        "class",
        "extends",
        "implements",
      ];
      for (const kw of keywords) {
        const regex = new RegExp(`\\b${kw}\\b`, "g");
        colored = colored.replace(regex, chalk.cyan(kw));
      }
      // Highlight strings
      colored = colored.replace(
        /(["'`])(?:(?!\1|\\).|\\.)*\1/g,
        (m) => chalk.yellow(m)
      );
      return colored;
    })
    .join("\n");
}

// ─── Commands ────────────────────────────────────────────

const program = new Command();

program
  .name("praxys-ui")
  .description("CLI for scaffolding Praxys UI components")
  .version(VERSION);

// ── init ─────────────────────────────────────────────────

program
  .command("init")
  .alias("i")
  .description("Initialize Praxys UI in your project")
  .option("-d, --dir <directory>", "Component directory", "components/ui")
  .option("--utils-dir <directory>", "Utils directory", "lib")
  .action(async (opts: { dir: string; utilsDir: string }) => {
    const componentDir = opts.dir;
    const utilsDir = opts.utilsDir;
    const pm = detectPackageManager();

    console.log("");
    console.log(
      chalk.bold(`  ${chalk.hex("#E84E2D")("Praxys UI")} — init`)
    );
    console.log("");
    console.log(chalk.dim(`  Package manager  ${pm}`));
    console.log(chalk.dim(`  Components       ${componentDir}/`));
    console.log(chalk.dim(`  Utils            ${utilsDir}/utils.ts`));
    console.log("");

    // 1. Install dependencies
    const spinner = ora("Installing dependencies...").start();
    try {
      const deps = ["clsx", "tailwind-merge", "framer-motion"];
      execSync(installCmd(pm, deps), { stdio: "pipe", cwd: process.cwd() });
      spinner.succeed("Dependencies installed");
    } catch {
      spinner.fail("Failed to install dependencies");
      console.log(
        chalk.dim(
          "  Run manually: " +
            installCmd(pm, ["clsx", "tailwind-merge", "framer-motion"])
        )
      );
    }

    // 2. Create utils file
    const utilsPath = join(process.cwd(), utilsDir);
    ensureDir(utilsPath);
    const utilsFile = join(utilsPath, "utils.ts");
    if (existsSync(utilsFile)) {
      console.log(chalk.dim("  ○ utils.ts already exists, skipping"));
    } else {
      writeFileSync(utilsFile, UTILS_CONTENT, "utf-8");
      console.log(chalk.green(`  ✓ Created ${utilsDir}/utils.ts`));
    }

    // 3. Create component directory
    const compPath = join(process.cwd(), componentDir);
    ensureDir(compPath);
    console.log(chalk.green(`  ✓ Created ${componentDir}/`));

    // 4. Write config file
    const configPath = join(process.cwd(), "praxys.config.json");
    const config: PraxysConfig = {
      componentsDir: componentDir,
      utilsDir: utilsDir,
    };
    writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8");
    console.log(chalk.green("  ✓ Created praxys.config.json"));

    console.log("");
    console.log(chalk.green("  Done!"));
    console.log("");
    console.log(
      chalk.dim(`  npx praxys-ui add animated-button   Add a component`)
    );
    console.log(
      chalk.dim(`  npx praxys-ui add                   Browse & pick`)
    );
    console.log(
      chalk.dim(`  npx praxys-ui list                  See all 71 components`)
    );
    console.log("");
  });

// ── add <component> ──────────────────────────────────────

async function addSingleComponent(
  component: string,
  dir: string,
  skipExisting: boolean
): Promise<boolean> {
  const spinner = ora(`Fetching ${component}...`).start();

  try {
    const source = await fetchComponent(component);

    const compDir = join(process.cwd(), dir);
    ensureDir(compDir);

    const filePath = join(compDir, `${component}.tsx`);
    if (existsSync(filePath)) {
      if (skipExisting) {
        spinner.info(`Skipped ${component} (already exists)`);
        return true;
      }
      spinner.stop();
      const { overwrite } = await prompts({
        type: "confirm",
        name: "overwrite",
        message: `${component}.tsx already exists. Overwrite?`,
        initial: false,
      });
      if (!overwrite) {
        console.log(chalk.yellow("  Skipped."));
        return true;
      }
    }

    writeFileSync(filePath, source, "utf-8");
    spinner.succeed(`Added ${dir}/${component}.tsx`);
    return true;
  } catch (err) {
    spinner.fail(`Failed to fetch ${component}`);
    console.log(
      chalk.dim(
        `  ${err instanceof Error ? err.message : "Unknown error"}`
      )
    );
    return false;
  }
}

async function installDepsForComponents(slugs: string[]) {
  // Collect unique dependencies across all given components
  const allDeps = new Set<string>();
  for (const slug of slugs) {
    const meta = COMPONENT_REGISTRY[slug];
    if (meta) {
      for (const dep of meta.dependencies) {
        allDeps.add(dep);
      }
    }
  }

  if (allDeps.size === 0) return;

  const pm = detectPackageManager();
  const depsArr = Array.from(allDeps);
  const spinner = ora(`Installing dependencies: ${depsArr.join(", ")}...`).start();
  try {
    execSync(installCmd(pm, depsArr), { stdio: "pipe", cwd: process.cwd() });
    spinner.succeed(`Installed ${depsArr.length} dependencies`);
  } catch {
    spinner.fail("Failed to install dependencies");
    console.log(chalk.dim(`  Run manually: ${installCmd(pm, depsArr)}`));
  }
}

program
  .command("add")
  .description("Add one or more components to your project")
  .argument("[components...]", 'Component slugs (e.g. animated-button alert) or "all". Omit for interactive picker.')
  .option("-d, --dir <directory>", "Component directory")
  .option("-y, --yes", "Skip overwrite prompts (skip existing files)", false)
  .option("--install-deps", "Install component dependencies after adding", false)
  .action(async (components: string[], opts: { dir?: string; yes: boolean; installDeps: boolean }) => {
    const dir = getComponentsDir(opts.dir);

    // ── interactive picker when no args ──────────────────
    if (!components || components.length === 0) {
      console.log("");
      console.log(
        chalk.bold(`  ${chalk.hex("#E84E2D")("Praxys UI")} — add components`)
      );
      console.log("");

      const categoryOrder = ["buttons", "cards", "text", "navigation", "visual", "media"];
      const choices: { title: string; value: string; description?: string }[] = [];

      for (const cat of categoryOrder) {
        const color = CATEGORY_COLORS[cat] || "#FFFFFF";
        // Category separator
        choices.push({
          title: chalk.hex(color).bold(`── ${cat.toUpperCase()} ──`),
          value: `__sep_${cat}`,
          description: "",
        });
        for (const [slug, meta] of Object.entries(COMPONENT_REGISTRY)) {
          if (meta.category !== cat) continue;
          const newBadge = meta.isNew ? chalk.green(" NEW") : "";
          choices.push({
            title: `${meta.title}${newBadge}`,
            value: slug,
            description: truncate(meta.description, 50),
          });
        }
      }

      const { selected } = await prompts({
        type: "multiselect",
        name: "selected",
        message: "Pick components to add (space to select, enter to confirm)",
        choices: choices.map((c) => ({
          title: c.title,
          value: c.value,
          description: c.description,
          disabled: c.value.startsWith("__sep_"),
        })),
        hint: "- Space to select. Return to submit",
      });

      if (!selected || selected.length === 0) {
        console.log(chalk.yellow("  No components selected."));
        console.log("");
        return;
      }

      const slugs = (selected as string[]).filter((s) => !s.startsWith("__sep_"));
      if (slugs.length === 0) {
        console.log(chalk.yellow("  No components selected."));
        console.log("");
        return;
      }

      let added = 0;
      let failed = 0;
      for (const slug of slugs) {
        const ok = await addSingleComponent(slug, dir, opts.yes);
        if (ok) added++;
        else failed++;
      }

      console.log("");
      console.log(
        chalk.green(`  ✓ ${added} components added`) +
          (failed > 0 ? chalk.red(`, ${failed} failed`) : "")
      );

      if (opts.installDeps) {
        await installDepsForComponents(slugs);
      }

      console.log("");
      return;
    }

    const label = components.length === 1 ? chalk.cyan(components[0]) : chalk.cyan(`${components.length} components`);
    console.log("");
    console.log(
      chalk.bold(
        `  ${chalk.hex("#E84E2D")("Praxys UI")} — add ${label}`
      )
    );
    console.log("");

    // ── add all ──────────────────────────────────────────
    if (components.includes("all")) {
      const { confirm } = await prompts({
        type: "confirm",
        name: "confirm",
        message: `Add all ${COMPONENT_LIST.length} components to ${dir}?`,
        initial: true,
      });

      if (!confirm) {
        console.log(chalk.yellow("  Cancelled."));
        return;
      }

      // Parallel fetch in batches of 6
      let added = 0;
      let failed = 0;
      const batchSize = 6;
      for (let i = 0; i < COMPONENT_LIST.length; i += batchSize) {
        const batch = COMPONENT_LIST.slice(i, i + batchSize);
        const results = await Promise.allSettled(
          batch.map((slug) => addSingleComponent(slug, dir, opts.yes))
        );
        for (const r of results) {
          if (r.status === "fulfilled" && r.value) added++;
          else failed++;
        }
      }

      console.log("");
      console.log(
        chalk.green(`  ✓ ${added} components added`) +
          (failed > 0 ? chalk.red(`, ${failed} failed`) : "")
      );

      if (opts.installDeps) {
        await installDepsForComponents(COMPONENT_LIST);
      }

      console.log("");
      return;
    }

    // ── validate all slugs first ─────────────────────────
    const invalidSlugs = components.filter((c) => !COMPONENT_LIST.includes(c));
    if (invalidSlugs.length > 0) {
      for (const bad of invalidSlugs) {
        const suggestion = didYouMean(bad);
        if (suggestion) {
          console.log(chalk.red(`  Component "${bad}" not found.`) + chalk.dim(` Did you mean ${chalk.bold(suggestion)}?`));
        } else {
          console.log(chalk.red(`  Component "${bad}" not found.`));
        }
      }
      console.log(chalk.dim(`\n  Run ${chalk.bold("praxys-ui list")} to see available components.`));
      console.log("");
      return;
    }

    // ── add single or multiple ───────────────────────────
    if (components.length === 1) {
      const slug = components[0];
      const ok = await addSingleComponent(slug, dir, false);

      if (ok && opts.installDeps) {
        await installDepsForComponents([slug]);
      }

      console.log("");
      console.log(
        chalk.dim(
          `  Import: ${chalk.bold(
            `import ${toPascalCase(slug)} from '@/${dir}/${slug}'`
          )}`
        )
      );
      console.log("");
    } else {
      // Parallel fetch in batches of 6
      let added = 0;
      let failed = 0;
      const batchSize = 6;
      for (let i = 0; i < components.length; i += batchSize) {
        const batch = components.slice(i, i + batchSize);
        const results = await Promise.allSettled(
          batch.map((slug) => addSingleComponent(slug, dir, opts.yes))
        );
        for (const r of results) {
          if (r.status === "fulfilled" && r.value) added++;
          else failed++;
        }
      }

      console.log("");
      console.log(
        chalk.green(`  ✓ ${added} components added`) +
          (failed > 0 ? chalk.red(`, ${failed} failed`) : "")
      );

      if (opts.installDeps) {
        await installDepsForComponents(components);
      }

      console.log("");
    }
  });

// ── list ─────────────────────────────────────────────────

program
  .command("list")
  .alias("ls")
  .description("List all available components")
  .option("-c, --category <category>", "Filter by category (buttons, cards, text, navigation, visual, media)")
  .option("-n, --new", "Show only new components", false)
  .option("-s, --search <query>", "Search components by name or description")
  .option("--installed", "Show only locally installed components", false)
  .option("-d, --dir <directory>", "Component directory (used with --installed)")
  .action((opts: { category?: string; new: boolean; search?: string; installed: boolean; dir?: string }) => {
    console.log("");
    console.log(
      chalk.bold(`  ${chalk.hex("#E84E2D")("Praxys UI")} — components`)
    );
    console.log("");

    let entries = Object.entries(COMPONENT_REGISTRY);

    // Filter by category
    if (opts.category) {
      const cat = opts.category.toLowerCase();
      entries = entries.filter(([, meta]) => meta.category === cat);
      if (entries.length === 0) {
        console.log(chalk.yellow(`  No components found in category "${opts.category}".`));
        console.log(chalk.dim(`  Categories: buttons, cards, text, navigation, visual, media`));
        console.log("");
        return;
      }
    }

    // Filter by installed
    if (opts.installed) {
      const compPath = join(process.cwd(), getComponentsDir(opts.dir));
      entries = entries.filter(([slug]) =>
        existsSync(join(compPath, `${slug}.tsx`))
      );
      if (entries.length === 0) {
        console.log(chalk.yellow(`  No installed components found.`));
        console.log("");
        return;
      }
    }

    // Filter by new
    if (opts.new) {
      entries = entries.filter(([, meta]) => meta.isNew);
    }

    // Filter by search
    if (opts.search) {
      const q = opts.search;
      entries = entries.filter(
        ([slug, meta]) =>
          fuzzyMatch(q, slug) ||
          fuzzyMatch(q, meta.title) ||
          fuzzyMatch(q, meta.description)
      );
      if (entries.length === 0) {
        console.log(chalk.yellow(`  No components matched "${opts.search}".`));
        console.log("");
        return;
      }
    }

    // Group by category
    const grouped: Record<string, [string, ComponentMeta][]> = {};
    for (const entry of entries) {
      const cat = entry[1].category;
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(entry);
    }

    const categoryOrder = ["buttons", "cards", "text", "navigation", "visual", "media"];
    let total = 0;

    for (const cat of categoryOrder) {
      const items = grouped[cat];
      if (!items || items.length === 0) continue;

      const color = CATEGORY_COLORS[cat] || "#FFFFFF";
      console.log(chalk.hex(color).bold(`  ${cat.toUpperCase()}`));

      for (const [slug, meta] of items) {
        const newBadge = meta.isNew ? chalk.green(" NEW") : "";
        const desc = chalk.dim(` — ${truncate(meta.description, 60)}`);
        console.log(`    ${chalk.hex(color)("●")} ${slug}${newBadge}${desc}`);
        total++;
      }
      console.log("");
    }

    console.log(chalk.dim(`  ${total} components shown`));
    console.log("");
  });

// ── info <component> ─────────────────────────────────────

program
  .command("info")
  .description("Show detailed information about a component")
  .argument("<component>", "Component slug")
  .action((component: string) => {
    const meta = COMPONENT_REGISTRY[component];
    if (!meta) {
      console.log("");
      printNotFound(component);
      console.log(chalk.dim(`  Run ${chalk.bold("praxys-ui list")} to see available components.`));
      console.log("");
      return;
    }

    const catColor = CATEGORY_COLORS[meta.category] || "#FFFFFF";

    console.log("");
    console.log(chalk.bold(`  ${meta.title}`) + (meta.isNew ? chalk.green(" NEW") : ""));
    console.log(chalk.hex(catColor)(`  Category: ${meta.category}`));
    console.log(`  Dependencies: ${chalk.cyan(meta.dependencies.join(", "))}`);
    console.log(`  ${chalk.dim(meta.description)}`);
    console.log(chalk.dim(`  Docs: https://praxysui.vercel.app/components/${component}`));
    console.log("");
  });

// ── view <component> ─────────────────────────────────────

program
  .command("view")
  .description("View the source code of a component")
  .argument("<component>", "Component slug")
  .action(async (component: string) => {
    if (!COMPONENT_REGISTRY[component]) {
      console.log("");
      printNotFound(component);
      console.log(chalk.dim(`  Run ${chalk.bold("praxys-ui list")} to see available components.`));
      console.log("");
      return;
    }

    const spinner = ora(`Fetching ${component} source...`).start();
    try {
      const source = await fetchComponent(component);
      spinner.stop();
      console.log("");
      console.log(chalk.bold(`  ${COMPONENT_REGISTRY[component].title} — source`));
      console.log(chalk.dim("  ─".repeat(30)));
      console.log("");
      console.log(colorizeSource(source));
      console.log("");
    } catch (err) {
      spinner.fail(`Failed to fetch ${component}`);
      console.log(
        chalk.dim(`  ${err instanceof Error ? err.message : "Unknown error"}`)
      );
    }
  });

// ── diff <component> ─────────────────────────────────────

program
  .command("diff")
  .description("Compare local component with latest remote version")
  .argument("<component>", "Component slug")
  .option("-d, --dir <directory>", "Component directory")
  .action(async (component: string, opts: { dir?: string }) => {
    const dir = getComponentsDir(opts.dir);

    if (!COMPONENT_REGISTRY[component]) {
      console.log("");
      printNotFound(component);
      console.log("");
      return;
    }

    const localPath = join(process.cwd(), dir, `${component}.tsx`);
    if (!existsSync(localPath)) {
      console.log("");
      console.log(chalk.yellow(`  Not installed. ${component}.tsx not found in ${dir}/`));
      console.log("");
      return;
    }

    const spinner = ora(`Fetching latest ${component}...`).start();
    try {
      const remote = await fetchComponent(component);
      const local = readFileSync(localPath, "utf-8");
      spinner.stop();

      if (local === remote) {
        console.log("");
        console.log(chalk.green(`  ✓ ${component} is up to date.`));
        console.log("");
        return;
      }

      console.log("");
      console.log(chalk.bold(`  ${component} — diff (local vs remote)`));
      console.log(chalk.dim("  ─".repeat(30)));
      console.log("");

      const localLines = local.split("\n");
      const remoteLines = remote.split("\n");
      const maxLen = Math.max(localLines.length, remoteLines.length);

      for (let i = 0; i < maxLen; i++) {
        const localLine = localLines[i];
        const remoteLine = remoteLines[i];
        if (localLine === remoteLine) continue;
        if (localLine !== undefined && remoteLine === undefined) {
          console.log(chalk.red(`  - L${i + 1}: ${localLine}`));
        } else if (localLine === undefined && remoteLine !== undefined) {
          console.log(chalk.green(`  + L${i + 1}: ${remoteLine}`));
        } else if (localLine !== remoteLine) {
          console.log(chalk.red(`  - L${i + 1}: ${localLine}`));
          console.log(chalk.green(`  + L${i + 1}: ${remoteLine}`));
        }
      }

      console.log("");
    } catch (err) {
      spinner.fail(`Failed to fetch ${component}`);
      console.log(
        chalk.dim(`  ${err instanceof Error ? err.message : "Unknown error"}`)
      );
    }
  });

// ── remove <component> ───────────────────────────────────

program
  .command("remove")
  .alias("rm")
  .description("Remove a component from your project")
  .argument("<component>", "Component slug")
  .option("-d, --dir <directory>", "Component directory")
  .option("-y, --yes", "Skip confirmation prompt", false)
  .action(async (component: string, opts: { dir?: string; yes: boolean }) => {
    const dir = getComponentsDir(opts.dir);

    if (!COMPONENT_REGISTRY[component]) {
      console.log("");
      printNotFound(component);
      console.log("");
      return;
    }

    const filePath = join(process.cwd(), dir, `${component}.tsx`);
    if (!existsSync(filePath)) {
      console.log("");
      console.log(chalk.yellow(`  ${component}.tsx not found in ${dir}/`));
      console.log("");
      return;
    }

    if (!opts.yes) {
      const { confirm } = await prompts({
        type: "confirm",
        name: "confirm",
        message: `Remove ${dir}/${component}.tsx?`,
        initial: false,
      });
      if (!confirm) {
        console.log(chalk.yellow("  Cancelled."));
        return;
      }
    }

    try {
      unlinkSync(filePath);
      console.log("");
      console.log(chalk.green(`  ✓ Removed ${dir}/${component}.tsx`));
      console.log("");
    } catch (err) {
      console.log("");
      console.log(chalk.red(`  Failed to remove ${component}.tsx`));
      console.log(
        chalk.dim(`  ${err instanceof Error ? err.message : "Unknown error"}`)
      );
      console.log("");
    }
  });

// ── update [component] ───────────────────────────────────

program
  .command("update")
  .description("Update installed components to the latest version")
  .argument("[component]", "Component slug (omit to check all)")
  .option("-d, --dir <directory>", "Component directory")
  .option("--check", "Only check for updates, don't write files", false)
  .action(async (component: string | undefined, opts: { dir?: string; check: boolean }) => {
    const dir = getComponentsDir(opts.dir);
    const compDir = join(process.cwd(), dir);

    console.log("");
    console.log(
      chalk.bold(`  ${chalk.hex("#E84E2D")("Praxys UI")} — update`)
    );
    console.log("");

    // Determine which components to check
    let slugsToCheck: string[];
    if (component) {
      if (!COMPONENT_REGISTRY[component]) {
        printNotFound(component);
        console.log("");
        return;
      }
      slugsToCheck = [component];
    } else {
      // Find all installed components
      slugsToCheck = COMPONENT_LIST.filter((slug) =>
        existsSync(join(compDir, `${slug}.tsx`))
      );
      if (slugsToCheck.length === 0) {
        console.log(chalk.yellow(`  No installed components found in ${dir}/`));
        console.log("");
        return;
      }
      console.log(chalk.dim(`  Checking ${slugsToCheck.length} installed components...\n`));
    }

    let updatedCount = 0;
    let upToDateCount = 0;
    let failedCount = 0;

    for (const slug of slugsToCheck) {
      const localPath = join(compDir, `${slug}.tsx`);
      if (!existsSync(localPath)) {
        if (component) {
          console.log(chalk.yellow(`  Not installed. ${slug}.tsx not found in ${dir}/`));
        }
        continue;
      }

      const spinner = ora(`Checking ${slug}...`).start();
      try {
        const remote = await fetchComponent(slug);
        const local = readFileSync(localPath, "utf-8");

        if (local === remote) {
          spinner.succeed(`${slug} is up to date`);
          upToDateCount++;
          continue;
        }

        if (opts.check) {
          spinner.warn(`${slug} has updates available`);
          updatedCount++;
          continue;
        }

        // Show diff summary
        const localLines = local.split("\n");
        const remoteLines = remote.split("\n");
        let additions = 0;
        let removals = 0;
        const maxLen = Math.max(localLines.length, remoteLines.length);
        for (let i = 0; i < maxLen; i++) {
          if (localLines[i] !== remoteLines[i]) {
            if (localLines[i] !== undefined) removals++;
            if (remoteLines[i] !== undefined) additions++;
          }
        }

        spinner.stop();
        console.log(
          `  ${slug}: ${chalk.green(`+${additions}`)} ${chalk.red(`-${removals}`)} lines changed`
        );

        const { overwrite } = await prompts({
          type: "confirm",
          name: "overwrite",
          message: `  Update ${slug}?`,
          initial: true,
        });

        if (overwrite) {
          writeFileSync(localPath, remote, "utf-8");
          console.log(chalk.green(`  ✓ Updated ${slug}`));
          updatedCount++;
        } else {
          console.log(chalk.yellow(`  Skipped ${slug}`));
        }
      } catch {
        spinner.fail(`Failed to check ${slug}`);
        failedCount++;
      }
    }

    console.log("");
    if (opts.check) {
      console.log(
        chalk.dim(`  ${upToDateCount} up to date, ${updatedCount} with updates available`) +
          (failedCount > 0 ? chalk.red(`, ${failedCount} failed`) : "")
      );
    } else {
      console.log(
        chalk.dim(`  ${updatedCount} updated, ${upToDateCount} up to date`) +
          (failedCount > 0 ? chalk.red(`, ${failedCount} failed`) : "")
      );
    }
    console.log("");
  });

// ── doctor ───────────────────────────────────────────────

program
  .command("doctor")
  .description("Check your Praxys UI project setup for issues")
  .action(() => {
    console.log("");
    console.log(
      chalk.bold(`  ${chalk.hex("#E84E2D")("Praxys UI")} — doctor`)
    );
    console.log("");

    let issues = 0;

    // 1. Config file
    const config = loadConfig();
    if (config) {
      console.log(chalk.green("  ✓ praxys.config.json found"));
    } else {
      console.log(chalk.yellow("  ✗ praxys.config.json not found"));
      console.log(chalk.dim("    Run `praxys-ui init` to create it."));
      issues++;
    }

    // 2. Components directory
    const compDir = config?.componentsDir ?? "components/ui";
    const compPath = join(process.cwd(), compDir);
    if (existsSync(compPath)) {
      console.log(chalk.green(`  ✓ Components directory exists (${compDir})`));
    } else {
      console.log(chalk.yellow(`  ✗ Components directory missing (${compDir})`));
      issues++;
    }

    // 3. Utils file
    const utilsDir = config?.utilsDir ?? "lib";
    const utilsPath = join(process.cwd(), utilsDir, "utils.ts");
    if (existsSync(utilsPath)) {
      console.log(chalk.green(`  ✓ Utils file exists (${utilsDir}/utils.ts)`));
    } else {
      console.log(chalk.yellow(`  ✗ Utils file missing (${utilsDir}/utils.ts)`));
      issues++;
    }

    // 4. Package manager
    const pm = detectPackageManager();
    console.log(chalk.green(`  ✓ Package manager: ${pm}`));

    // 5. Core dependencies
    const pkgJsonPath = join(process.cwd(), "package.json");
    if (existsSync(pkgJsonPath)) {
      try {
        const pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
        const allDeps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
        const coreDeps = ["clsx", "tailwind-merge", "framer-motion"];
        for (const dep of coreDeps) {
          if (allDeps[dep]) {
            console.log(chalk.green(`  ✓ ${dep} installed (${allDeps[dep]})`));
          } else {
            console.log(chalk.yellow(`  ✗ ${dep} not found in package.json`));
            issues++;
          }
        }
      } catch {
        console.log(chalk.yellow("  ✗ Could not parse package.json"));
        issues++;
      }
    } else {
      console.log(chalk.yellow("  ✗ No package.json found"));
      issues++;
    }

    // 6. Installed components count
    if (existsSync(compPath)) {
      const installed = COMPONENT_LIST.filter((slug) =>
        existsSync(join(compPath, `${slug}.tsx`))
      );
      console.log(chalk.green(`  ✓ ${installed.length}/${COMPONENT_LIST.length} components installed`));
    }

    console.log("");
    if (issues === 0) {
      console.log(chalk.green.bold("  All checks passed!"));
    } else {
      console.log(chalk.yellow(`  ${issues} issue${issues > 1 ? "s" : ""} found.`));
    }
    console.log("");
  });

// ── stats ────────────────────────────────────────────────

program
  .command("stats")
  .description("Show statistics about installed and available components")
  .option("-d, --dir <directory>", "Component directory")
  .action((opts: { dir?: string }) => {
    const dir = getComponentsDir(opts.dir);
    const compPath = join(process.cwd(), dir);

    console.log("");
    console.log(
      chalk.bold(`  ${chalk.hex("#E84E2D")("Praxys UI")} — stats`)
    );
    console.log("");

    const categoryOrder = ["buttons", "cards", "text", "navigation", "visual", "media"];

    // Count per category
    const catStats: Record<string, { total: number; installed: number }> = {};
    for (const cat of categoryOrder) {
      catStats[cat] = { total: 0, installed: 0 };
    }

    let totalInstalled = 0;

    for (const [slug, meta] of Object.entries(COMPONENT_REGISTRY)) {
      catStats[meta.category].total++;
      if (existsSync(join(compPath, `${slug}.tsx`))) {
        catStats[meta.category].installed++;
        totalInstalled++;
      }
    }

    // Header
    console.log(
      chalk.dim("  Category        Installed   Available")
    );
    console.log(chalk.dim("  " + "─".repeat(40)));

    for (const cat of categoryOrder) {
      const { total, installed } = catStats[cat];
      const color = CATEGORY_COLORS[cat] || "#FFFFFF";
      const bar = installed > 0
        ? chalk.hex(color)("█".repeat(installed)) + chalk.dim("░".repeat(total - installed))
        : chalk.dim("░".repeat(total));
      const catLabel = cat.padEnd(16);
      console.log(
        `  ${chalk.hex(color)(catLabel)} ${String(installed).padStart(3)}/${String(total).padEnd(5)}  ${bar}`
      );
    }

    console.log(chalk.dim("  " + "─".repeat(40)));
    console.log(
      chalk.bold(`  ${"Total".padEnd(16)} ${String(totalInstalled).padStart(3)}/${String(COMPONENT_LIST.length).padEnd(5)}`)
    );

    // Coverage percentage
    const pct = COMPONENT_LIST.length > 0
      ? Math.round((totalInstalled / COMPONENT_LIST.length) * 100)
      : 0;
    console.log("");
    console.log(chalk.dim(`  Coverage: ${pct}% of components installed`));
    console.log(chalk.dim(`  Directory: ${dir}`));
    console.log("");
  });

// ── run ──────────────────────────────────────────────────

program.parseAsync().then(() => checkForUpdates());
