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
    code: `<Aurora\n  colors={["#E84E2D", "#C9958A",\n           "#7B61FF", "#06b6d4"]}\n  blur={120}\n  speed={10}\n/>`,
    render: () => (
      <Aurora colors={["#E84E2D", "#C9958A", "#7B61FF", "#06b6d4"]} blur={120} speed={10}
        className="!border-0 !rounded-none w-full h-full" />
    ),
  },
  {
    name: "GlowBorderCard",
    code: `<GlowBorderCard>\n  <h4 className="text-base\n    font-medium text-chalk mb-2">\n    Deploy Complete\n  </h4>\n  <p className="text-sm text-blush">\n    Your app is live at praxys.xyz\n  </p>\n</GlowBorderCard>`,
    render: () => (
      <div className="flex items-center justify-center p-8">
        <GlowBorderCard className="max-w-[280px]">
          <h4 className="text-base font-medium text-chalk mb-2">Deploy Complete</h4>
          <p className="text-sm text-blush">Your app is live at praxys.xyz. 3 components updated successfully.</p>
        </GlowBorderCard>
      </div>
    ),
  },
  {
    name: "FlipText",
    code: `<FlipText\n  text="Praxys UI"\n  className="text-4xl font-bold\n    text-chalk font-pixel"\n  staggerDelay={0.02}\n  duration={0.5}\n/>`,
    render: () => (
      <div className="flex items-center justify-center">
        <FlipText text="Praxys UI" className="text-4xl sm:text-5xl font-bold text-chalk font-pixel"
          staggerDelay={0.02} duration={0.5} />
      </div>
    ),
  },
  {
    name: "Particles",
    code: `<Particles\n  count={30}\n  size={4}\n  color="#E84E2D"\n  speed={6}\n/>`,
    render: () => (
      <Particles count={30} size={4} color="#E84E2D" speed={6}
        className="!border-0 !rounded-none !bg-transparent w-full !h-full" />
    ),
  },
];

function highlightJSX(code: string) {
  return code.split("\n").map((line, li) => {
    const parts: React.ReactNode[] = [];
    let r = line, k = 0;
    while (r.length > 0) {
      let m;
      if ((m = r.match(/^("(?:[^"\\]|\\.)*")/))) {
        parts.push(<span key={k++} className="text-blush">{m[1]}</span>);
        r = r.slice(m[1].length); continue;
      }
      if ((m = r.match(/^(<\/?)([\w]+)/))) {
        parts.push(<span key={k++} className="text-text-faint">{m[1]}</span>);
        parts.push(<span key={k++} className="text-ignite">{m[2]}</span>);
        r = r.slice(m[0].length); continue;
      }
      if ((m = r.match(/^(\s+)([\w]+)(=)/))) {
        parts.push(<span key={k++}>{m[1]}</span>);
        parts.push(<span key={k++} className="text-chalk/70">{m[2]}</span>);
        parts.push(<span key={k++} className="text-text-faint">{m[3]}</span>);
        r = r.slice(m[0].length); continue;
      }
      if ((m = r.match(/^(\d+)/))) {
        parts.push(<span key={k++} className="text-ignite/70">{m[1]}</span>);
        r = r.slice(m[1].length); continue;
      }
      if ((m = r.match(/^([{}[\]()])/))) {
        parts.push(<span key={k++} className="text-text-faint">{m[1]}</span>);
        r = r.slice(1); continue;
      }
      if ((m = r.match(/^(\/?>)/))) {
        parts.push(<span key={k++} className="text-text-faint">{m[1]}</span>);
        r = r.slice(m[1].length); continue;
      }
      parts.push(<span key={k++}>{r[0]}</span>);
      r = r.slice(1);
    }
    return (
      <div key={li} className="flex">
        <span className="w-7 text-right text-text-faint/30 select-none mr-4 flex-shrink-0">{li + 1}</span>
        <span>{parts}</span>
      </div>
    );
  });
}

export default function InteractiveForge() {
  const [activeTab, setActiveTab] = useState(0);
  const [displayCode, setDisplayCode] = useState(TABS[0].code);
  const [showPreview, setShowPreview] = useState(true);
  const scrambleRef = useRef<NodeJS.Timeout | null>(null);

  const scrambleToCode = useCallback((target: string) => {
    if (scrambleRef.current) clearInterval(scrambleRef.current);
    const steps = 12;
    let step = 0;
    scrambleRef.current = setInterval(() => {
      step++;
      const p = step / steps;
      const scrambled = target.split("\n").map((ln) =>
        ln.split("").map((ch, i) => {
          if (ch === " " || ch === "\n") return ch;
          return i < Math.floor(p * ln.length) ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      ).join("\n");
      setDisplayCode(scrambled);
      if (step >= steps) {
        clearInterval(scrambleRef.current!);
        scrambleRef.current = null;
        setDisplayCode(target);
      }
    }, 30);
  }, []);

  const handleTabSwitch = useCallback((i: number) => {
    setActiveTab(i);
    setShowPreview(false);
    scrambleToCode(TABS[i].code);
  }, [scrambleToCode]);

  useEffect(() => () => { if (scrambleRef.current) clearInterval(scrambleRef.current); }, []);

  return (
    <section className="relative py-24 px-6 bg-void">
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalk font-pixel mb-3">
            Playground
          </h2>
          <p className="font-mono text-sm text-text-faint">See it. Copy it. Ship it.</p>
        </div>

        {/* Terminal */}
        <div className="rounded-xl border border-border bg-obsidian/80 overflow-hidden">
          {/* Chrome */}
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

          {/* Tabs */}
          <div className="flex border-b border-border bg-void/40">
            {TABS.map((tab, i) => (
              <button key={tab.name} onClick={() => handleTabSwitch(i)}
                className={`relative px-5 py-2.5 font-mono text-xs transition-colors cursor-pointer ${
                  i === activeTab ? "text-chalk" : "text-text-faint hover:text-blush"
                }`}>
                {tab.name}
                {i === activeTab && (
                  <motion.div layoutId="terminal-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-ignite"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
              </button>
            ))}
          </div>

          {/* Code */}
          <div className="relative p-6 font-mono text-xs sm:text-sm leading-relaxed min-h-[260px] overflow-x-auto">
            <pre className="text-chalk/80">{highlightJSX(displayCode)}</pre>
            <button onClick={() => setShowPreview(true)}
              className="absolute bottom-4 right-4 px-4 py-1.5 rounded-md bg-ignite/15 border border-ignite/30 font-mono text-xs text-ignite hover:bg-ignite/25 transition-colors cursor-pointer">
              Run
            </button>
          </div>
        </div>

        {/* Output strip */}
        <div className="mt-4 rounded-xl border border-border bg-obsidian/80 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="h-1.5 w-1.5 rounded-full bg-ignite/50" />
            <span className="font-mono text-[11px] text-text-faint">output</span>
          </div>
          <div className="relative h-[200px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {showPreview ? (
                <motion.div key={activeTab}
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full h-full flex items-center justify-center">
                  {TABS[activeTab].render()}
                </motion.div>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }} className="font-mono text-xs text-text-faint/50">
                  press run to preview
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
