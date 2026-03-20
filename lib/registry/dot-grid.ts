import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "dot-grid",
  title: "Dot Grid",
  description:
    "Interactive dot grid with GSAP-powered hover trail and directional movement animations.",
  category: "visual",
  dependencies: ["gsap"],
  code: `// Component source - see app/components/ui/dot-grid.tsx`,
  usage: `import DotGrid from "@/app/components/ui/dot-grid"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <DotGrid />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/dot-grid-demo"),
  demo: () => import("@/app/components/demos/dot-grid-demo"),
};

export default entry;
