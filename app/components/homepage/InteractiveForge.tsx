"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Aurora from "@/app/components/ui/aurora";
import GlowBorderCard from "@/app/components/ui/glow-border-card";
import FlipText from "@/app/components/ui/flip-text";
import Particles from "@/app/components/ui/particles";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

const TABS = [
  {
    name: "Aurora",
    code: `<Aurora
  colors={["#E84E2D", "#C9958A",
           "#7B61FF", "#06b6d4"]}
  blur={120}
  speed={10}
/>`,
    render: () => (
      <Aurora
        colors={["#E84E2D", "#C9958A", "#7B61FF", "#06b6d4"]}
        blur={120}
        speed={10}
        className="!border-0 !rounded-none w-full h-full"
      />
    ),
  },
  {
    name: "GlowBorderCard",
    code: `<GlowBorderCard>
  <h4 className="text-base
    font-medium text-chalk mb-2">
    Deploy Complete
  </h4>
  <p className="text-sm text-blush">
    Your app is live at praxys.xyz
  </p>
</GlowBorderCard>`,
    render: () => (
      <div className="flex items-center justify-center p-8">
        <GlowBorderCard className="max-w-[280px]">
          <h4 className="text-base font-medium text-chalk mb-2">
            Deploy Complete
          </h4>
          <p className="text-sm text-blush">
            Your app is live at praxys.xyz. 3 components updated successfully.
          </p>
        </GlowBorderCard>
      </div>
    ),
  },
  {
    name: "FlipText",
    code: `<FlipText
  text="Praxys UI"
  className="text-4xl font-bold
    text-chalk font-pixel"
  staggerDelay={0.02}
  duration={0.5}
/>`,
    render: () => (
      <div className="flex items-center justify-center">
        <FlipText
          text="Praxys UI"
          className="text-4xl sm:text-5xl font-bold text-chalk font-pixel"
          staggerDelay={0.02}
          duration={0.5}
        />
      </div>
    ),
  },
  {
    name: "Particles",
    code: `<Particles
  count={30}
  size={4}
  color="#E84E2D"
  speed={6}
/>`,
    render: () => (
      <Particles
        count={30}
        size={4}
        color="#E84E2D"
        speed={6}
        className="!border-0 !rounded-none !bg-transparent w-full !h-full"
      />
    ),
  },
];

// Simple syntax highlighting
function highlightJSX(code: string) {
  return code.split("\n").map((line, lineIdx) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let partKey = 0;

    // Process patterns in order
    while (remaining.length > 0) {
      // String values (double quotes)
      const strMatch = remaining.match(/^("(?:[^"\\]|\\.)*")/);
      if (strMatch) {
        parts.push(
          <span key={partKey++} className="text-green-400">
            {strMatch[1]}
          </span>
        );
        remaining = remaining.slice(strMatch[1].length);
        continue;
      }

      // JSX tag names
      const tagMatch = remaining.match(/^(<\/?)([\w]+)/);
      if (tagMatch) {
        parts.push(
          <span key={partKey++} className="text-text-faint">
            {tagMatch[1]}
          </span>
        );
        parts.push(
          <span key={partKey++} className="text-ignite">
            {tagMatch[2]}
          </span>
        );
        remaining = remaining.slice(tagMatch[0].length);
        continue;
      }

      // Props/attributes
      const propMatch = remaining.match(/^(\s+)([\w]+)(=)/);
      if (propMatch) {
        parts.push(
          <span key={partKey++}>{propMatch[1]}</span>
        );
        parts.push(
          <span key={partKey++} className="text-blush">
            {propMatch[2]}
          </span>
        );
        parts.push(
          <span key={partKey++} className="text-text-faint">
            {propMatch[3]}
          </span>
        );
        remaining = remaining.slice(propMatch[0].length);
        continue;
      }

      // Numbers
      const numMatch = remaining.match(/^(\d+)/);
      if (numMatch) {
        parts.push(
          <span key={partKey++} className="text-amber-400">
            {numMatch[1]}
          </span>
        );
        remaining = remaining.slice(numMatch[1].length);
        continue;
      }

      // Braces and brackets
      const braceMatch = remaining.match(/^([{}[\]()])/);
      if (braceMatch) {
        parts.push(
          <span key={partKey++} className="text-blush/60">
            {braceMatch[1]}
          </span>
        );
        remaining = remaining.slice(1);
        continue;
      }

      // Closing tags
      const closeMatch = remaining.match(/^(\/?>)/);
      if (closeMatch) {
        parts.push(
          <span key={partKey++} className="text-text-faint">
            {closeMatch[1]}
          </span>
        );
        remaining = remaining.slice(closeMatch[1].length);
        continue;
      }

      // Default: consume one character
      parts.push(<span key={partKey++}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }

    return (
      <div key={lineIdx} className="flex">
        <span className="w-8 text-right text-text-faint/40 select-none mr-4 flex-shrink-0">
          {lineIdx + 1}
        </span>
        <span>{parts}</span>
      </div>
    );
  });
}

export default function InteractiveForge() {
  const [activeTab, setActiveTab] = useState(0);
  const [displayCode, setDisplayCode] = useState(TABS[0].code);
  const scrambleRef = useRef<NodeJS.Timeout | null>(null);

  // Scramble code text on tab switch
  const scrambleToCode = useCallback(
    (targetCode: string) => {
      if (scrambleRef.current) clearInterval(scrambleRef.current);

      const steps = 12;
      let step = 0;

      scrambleRef.current = setInterval(() => {
        step++;
        const progress = step / steps;
        const lines = targetCode.split("\n");
        const scrambled = lines
          .map((line) => {
            return line
              .split("")
              .map((char, i) => {
                if (char === " " || char === "\n") return char;
                const revealed = Math.floor(progress * line.length);
                if (i < revealed) return char;
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              })
              .join("");
          })
          .join("\n");

        setDisplayCode(scrambled);

        if (step >= steps) {
          clearInterval(scrambleRef.current!);
          scrambleRef.current = null;
          setDisplayCode(targetCode);
        }
      }, 30);
    },
    []
  );

  const handleTabSwitch = useCallback(
    (index: number) => {
      setActiveTab(index);
      scrambleToCode(TABS[index].code);
    },
    [scrambleToCode]
  );

  useEffect(() => {
    return () => {
      if (scrambleRef.current) clearInterval(scrambleRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center py-24 px-6 overflow-hidden">
      {/* Subtle background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232, 78, 45, 0.03), transparent)",
        }}
      />

      <div className="relative z-10 max-w-6xl w-full">
        {/* Section header */}
        <div className="mb-12">
          <span className="font-mono text-xs text-ignite/60 block mb-3">
            {"// interactive playground"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalk font-pixel">
            See it. Copy it. Ship it.
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((tab, i) => (
            <button
              key={tab.name}
              onClick={() => handleTabSwitch(i)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all cursor-pointer ${
                i === activeTab
                  ? "bg-ignite/15 text-ignite border border-ignite/30"
                  : "bg-obsidian/60 text-blush border border-border hover:border-border-light hover:text-chalk"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Split-screen layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code panel */}
          <div className="rounded-2xl border border-border bg-obsidian/80 overflow-hidden">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-ignite/40" />
                <div className="h-2.5 w-2.5 rounded-full bg-blush/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-chalk/20" />
              </div>
              <span className="ml-2 font-mono text-[11px] text-text-faint">
                {TABS[activeTab].name.toLowerCase()}.tsx
              </span>
            </div>

            {/* Code content */}
            <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed min-h-[300px] overflow-x-auto">
              <pre className="text-chalk/90">
                {highlightJSX(displayCode)}
              </pre>
            </div>
          </div>

          {/* Preview panel */}
          <div className="rounded-2xl border border-border bg-void/80 overflow-hidden">
            {/* Preview header */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="h-2 w-2 rounded-full bg-green-500/60" />
              <span className="font-mono text-[11px] text-text-faint">
                preview
              </span>
            </div>

            {/* Live component */}
            <div className="relative h-[300px] sm:h-[340px] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {TABS[activeTab].render()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
