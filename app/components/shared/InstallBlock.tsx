"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const PKG_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;
type PkgManager = (typeof PKG_MANAGERS)[number];

interface InstallBlockProps {
  slug: string;
  dependencies: string[];
}

function getCliCommand(slug: string, pm: PkgManager): string {
  const sub = `@praxys/ui add ${slug}`;
  switch (pm) {
    case "pnpm":
      return `pnpm dlx ${sub}`;
    case "npm":
      return `npx ${sub}`;
    case "yarn":
      return `yarn dlx ${sub}`;
    case "bun":
      return `bunx ${sub}`;
  }
}

function getManualCommand(deps: string[], pm: PkgManager): string {
  if (deps.length === 0) return "# No dependencies required";
  const d = deps.join(" ");
  switch (pm) {
    case "pnpm":
      return `pnpm add ${d}`;
    case "npm":
      return `npm install ${d}`;
    case "yarn":
      return `yarn add ${d}`;
    case "bun":
      return `bun add ${d}`;
  }
}

export default function InstallBlock({ slug, dependencies }: InstallBlockProps) {
  const [mode, setMode] = useState<"cli" | "manual">("cli");
  const [pkg, setPkg] = useState<PkgManager>("npm");
  const [copied, setCopied] = useState(false);

  const command = mode === "cli" ? getCliCommand(slug, pkg) : getManualCommand(dependencies, pkg);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  }, [command]);

  return (
    <div>
      {/* Mode + heading */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[var(--color-chalk)]">Install</h2>
      </div>

      {/* CLI / Manual toggle */}
      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={() => setMode("cli")}
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs font-semibold transition-all",
            mode === "cli"
              ? "border-[var(--color-ignite)]/30 bg-[var(--color-ignite)]/10 text-[var(--color-ignite)]"
              : "border-[var(--color-border)] text-[var(--color-text-faint)] hover:text-[var(--color-chalk)]"
          )}
        >
          <span className="flex items-center gap-1.5">
            <Terminal className="h-3 w-3" />
            CLI
          </span>
        </button>
        <button
          onClick={() => setMode("manual")}
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs font-semibold transition-all",
            mode === "manual"
              ? "border-[var(--color-ignite)]/30 bg-[var(--color-ignite)]/10 text-[var(--color-ignite)]"
              : "border-[var(--color-border)] text-[var(--color-text-faint)] hover:text-[var(--color-chalk)]"
          )}
        >
          Manual
        </button>
      </div>

      {/* Command block */}
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-[0_4px_32px_rgba(0,0,0,0.15)]">
        {/* Package manager tabs */}
        <div className="flex border-b border-[var(--color-border)] bg-[var(--color-obsidian)]/50">
          {PKG_MANAGERS.map((m) => (
            <button
              key={m}
              onClick={() => setPkg(m)}
              className={cn(
                "px-4 py-2.5 text-xs font-medium transition-all",
                pkg === m
                  ? "text-[var(--color-ignite)] border-b-2 border-[var(--color-ignite)]"
                  : "text-[var(--color-text-faint)] hover:text-[var(--color-chalk)]"
              )}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Command */}
        <div className="relative flex items-center bg-[var(--color-void)]/50 px-5 py-4">
          <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-[var(--color-chalk)]">
            {command}
          </code>
          <button
            onClick={copy}
            className="ml-4 shrink-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] p-2.5 text-[var(--color-text-faint)] transition-all hover:border-[var(--color-border-light)] hover:text-[var(--color-chalk)]"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
