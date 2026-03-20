import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "beams",
  title: "Beams",
  description:
    "Volumetric light beam background with Three.js, customizable beam count, colors, and speed.",
  category: "visual",
  dependencies: ["@react-three/fiber", "@react-three/drei", "three"],
  code: `// Component source - see app/components/ui/beams.tsx`,
  usage: `import Beams from "@/app/components/ui/beams"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Beams />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/beams-demo"),
  demo: () => import("@/app/components/demos/beams-demo"),
};

export default entry;
