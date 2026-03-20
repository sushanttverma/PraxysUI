import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "silk",
  title: "Silk",
  description:
    "WebGL silk fabric background with flowing noise-driven animation, configurable speed, scale, and color.",
  category: "visual",
  dependencies: ["@react-three/fiber", "three"],
  code: `// Component source - see app/components/ui/silk.tsx`,
  usage: `import Silk from "@/app/components/ui/silk"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Silk />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/silk-demo"),
  demo: () => import("@/app/components/demos/silk-demo"),
};

export default entry;
