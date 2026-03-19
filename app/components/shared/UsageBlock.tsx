"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface UsageBlockProps {
  code: string;
}

export default function UsageBlock({ code }: UsageBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  }, [code]);

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-[var(--color-chalk)]">Usage</h2>

      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-[0_4px_32px_rgba(0,0,0,0.15)]">
        <div className="relative bg-[var(--color-void)]/50 p-5">
          <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-[var(--color-chalk)]/80">
            {code.split("\n").map((line, i) => (
              <div key={i} className="flex">
                <span className="mr-5 inline-block w-6 select-none text-right text-[var(--color-text-faint)]/40">{i + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </pre>
          <button
            onClick={copy}
            className="absolute right-4 top-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-obsidian)] p-2.5 text-[var(--color-text-faint)] transition-all hover:border-[var(--color-border-light)] hover:text-[var(--color-chalk)]"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
