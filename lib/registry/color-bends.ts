import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "color-bends",
  title: "Color Bends",
  description:
    "Curved color band background with smooth bending gradients and animated transitions.",
  category: "visual",
  dependencies: ["three"],
  code: `// Component source - see app/components/ui/color-bends.tsx`,
  usage: `import ColorBends from "@/app/components/ui/color-bends"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <ColorBends />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/color-bends-demo"),
  demo: () => import("@/app/components/demos/color-bends-demo"),
};

export default entry;
