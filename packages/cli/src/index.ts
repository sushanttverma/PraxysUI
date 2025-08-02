#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const VERSION = "1.2.1";

// ─── Utility file contents ──────────────────────────────

const UTILS_CONTENT = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

// ─── Component registry (slug → raw GitHub URL) ─────────

const COMPONENTS_BASE_URL =
  "https://raw.githubusercontent.com/sushanttverma/Praxys-UI/main/app/components/ui";

const COMPONENT_LIST = [
  "accordion",
  "alert",
  "animated-button",
  "animated-counter",
  "animated-hero",
  "animated-input",
  "animated-number",
  "animated-select",
  "animated-tabs",
  "animated-textarea",
  "animated-toggle",
  "autocomplete",
  "avatar-group",
  "badge",
  "breadcrumbs",
  "checkbox",
  "color-picker",
  "combobox",
  "command-menu",
  "creepy-button",
  "data-table",
  "date-picker",
  "displacement-text",
  "divider",
  "dropdown-menu",
  "expandable-bento-grid",
  "file-upload",
  "flip-fade-text",
  "flip-text",
  "folder-preview",
  "glass-dock",
  "glow-border-card",
  "gradient-mesh",
  "image-comparison",
  "infinite-scroll",
  "interactive-book",
  "kbd",
  "light-lines",
  "line-hover-link",
  "liquid-metal",
  "liquid-ocean",
  "logo-slider",
  "magnetic-cursor",
  "masked-avatars",
  "modal-dialog",
  "morphing-text",
  "otp-input",
  "pagination",
  "parallax-scroll",
  "perspective-grid",
  "progress-bar",
  "radio-group",
  "rating",
  "reveal-loader",
  "sheet",
  "skeleton-loader",
  "slider",
  "social-flip-button",
  "spotlight-card",
  "spotlight-navbar",
  "staggered-grid",
  "stats-card",
  "stepper",
  "switch",
  "tag-input",
  "testimonials-card",
  "timeline",
  "toast-notification",
  "tooltip",
  "typewriter-text",
];

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

// ─── Commands ────────────────────────────────────────────

const program = new Command();

program
  .name("praxys-ui")
  .description("CLI for scaffolding Praxys UI components")
  .version(VERSION);

// ── init ─────────────────────────────────────────────────

program
  .command("init")
  .description("Initialize Praxys UI in your project")
  .action(async () => {
    console.log("");
    console.log(
      chalk.bold(`  ${chalk.hex("#E84E2D")("Praxys UI")} — init`)
    );
    console.log("");

    // Detect package manager
    const pm = detectPackageManager();
    console.log(chalk.dim(`  Package manager: ${pm}`));

    // Ask for component directory
    const { componentDir } = await prompts({
      type: "text",
      name: "componentDir",
      message: "Where should components be installed?",
      initial: "components/ui",
    });

    if (!componentDir) {
      console.log(chalk.yellow("  Cancelled."));
      return;
    }

    const { utilsDir } = await prompts({
      type: "text",
      name: "utilsDir",
      message: "Where should the utils file be created?",
      initial: "lib",
    });

    if (!utilsDir) {
      console.log(chalk.yellow("  Cancelled."));
      return;
    }

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
    const utilsSpinner = ora("Creating utility files...").start();
    try {
      const utilsPath = join(process.cwd(), utilsDir);
      ensureDir(utilsPath);
      const utilsFile = join(utilsPath, "utils.ts");
      if (existsSync(utilsFile)) {
        utilsSpinner.warn("utils.ts already exists, skipping");
      } else {
        writeFileSync(utilsFile, UTILS_CONTENT, "utf-8");
        utilsSpinner.succeed(`Created ${utilsDir}/utils.ts`);
      }
    } catch {
      utilsSpinner.fail("Failed to create utils file");
    }

    // 3. Create component directory
    const compPath = join(process.cwd(), componentDir);
    ensureDir(compPath);

    console.log("");
    console.log(chalk.green("  ✓ Praxys UI initialized!"));
    console.log("");
    console.log(
      chalk.dim(
        `  Add components with: ${chalk.bold("npx praxys-ui add <component>")}`
      )
    );
    console.log(
      chalk.dim(
        `  Browse components:   ${chalk.bold(
          "https://github.com/sushanttverma/Praxys-UI"
        )}`
      )
    );
    console.log("");
  });

// ── add <component> ──────────────────────────────────────

program
  .command("add")
  .description("Add a component to your project")
  .argument("<component>", "Component slug (e.g. animated-button)")
  .option(
    "-d, --dir <directory>",
    "Component directory",
    "components/ui"
  )
  .action(async (component: string, opts: { dir: string }) => {
    console.log("");
    console.log(
      chalk.bold(
        `  ${chalk.hex("#E84E2D")("Praxys UI")} — add ${chalk.cyan(
          component
        )}`
      )
    );
    console.log("");

    // Validate component name
    if (!COMPONENT_LIST.includes(component)) {
      console.log(chalk.red(`  Component "${component}" not found.`));
      console.log("");
      console.log(chalk.dim("  Available components:"));
      COMPONENT_LIST.forEach((c) =>
        console.log(chalk.dim(`    - ${c}`))
      );
      console.log("");
      return;
    }

    const spinner = ora(`Fetching ${component}...`).start();

    try {
      const source = await fetchComponent(component);

      // Keep source as-is; import path @/lib/utils works with standard Next.js alias
      const rewritten = source;

      const compDir = join(process.cwd(), opts.dir);
      ensureDir(compDir);

      const filePath = join(compDir, `${component}.tsx`);
      if (existsSync(filePath)) {
        spinner.stop();
        const { overwrite } = await prompts({
          type: "confirm",
          name: "overwrite",
          message: `${component}.tsx already exists. Overwrite?`,
          initial: false,
        });
        if (!overwrite) {
          console.log(chalk.yellow("  Skipped."));
          return;
        }
      }

      writeFileSync(filePath, rewritten, "utf-8");
      spinner.succeed(`Added ${opts.dir}/${component}.tsx`);

      console.log("");
      console.log(
        chalk.dim(
          `  Import: ${chalk.bold(
            `import ${toPascalCase(component)} from '@/${opts.dir}/${component}'`
          )}`
        )
      );
      console.log("");
    } catch (err) {
      spinner.fail(`Failed to fetch ${component}`);
      console.log(
        chalk.dim(
          `  ${err instanceof Error ? err.message : "Unknown error"}`
        )
      );
    }
  });

// ── list ─────────────────────────────────────────────────

program
  .command("list")
  .description("List all available components")
  .action(() => {
    console.log("");
    console.log(
      chalk.bold(`  ${chalk.hex("#E84E2D")("Praxys UI")} — components`)
    );
    console.log("");
    COMPONENT_LIST.forEach((c) =>
      console.log(`  ${chalk.hex("#E84E2D")("●")} ${c}`)
    );
    console.log("");
    console.log(
      chalk.dim(`  ${COMPONENT_LIST.length} components available`)
    );
    console.log("");
  });

// ── helpers ──────────────────────────────────────────────

function toPascalCase(slug: string): string {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

// ── run ──────────────────────────────────────────────────

program.parse();
