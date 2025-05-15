"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-void/80 text-text-faint opacity-100 sm:opacity-0 transition-all hover:border-border-light hover:text-blush sm:group-hover:opacity-100"
      aria-label={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-ignite" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
