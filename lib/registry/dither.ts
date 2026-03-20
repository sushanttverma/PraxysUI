import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "dither",
  title: "Dither",
  description:
    "Dithered wave background with configurable colors, wave amplitude, and Three.js postprocessing.",
  category: "visual",
  dependencies: ["@react-three/fiber", "@react-three/postprocessing", "postprocessing", "three"],
  code: `// Component source - see app/components/ui/dither.tsx`,
  usage: `import Dither from "@/app/components/ui/dither"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Dither />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/dither-demo"),
  demo: () => import("@/app/components/demos/dither-demo"),
};

export default entry;
