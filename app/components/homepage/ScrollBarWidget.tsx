"use client";

import ScrollDNA from "@/app/components/ui/scroll-dna";
import { componentCount } from "@/lib/registry";

const SECTIONS = [
  { id: "hero", label: "#1 Hero", code: "<HeroVoid />" },
  { id: "showcase", label: "#2 Library", code: 'const demos = ["Aurora", ...]' },
  { id: "numbers", label: "#3 Stats", code: `const components = ${componentCount}` },
  { id: "forge", label: "#4 Playground", code: "<InteractiveForge tabs={4} />" },
  { id: "cta", label: "#5 Get Started", code: "npx @praxys/ui init" },
];

export default function ScrollBarWidget() {
  return (
    <div className="hidden sm:block">
      <ScrollDNA sections={SECTIONS} color="#E84E2D" barCount={28} />
    </div>
  );
}
