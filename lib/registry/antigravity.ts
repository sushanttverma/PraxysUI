import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "antigravity",
  title: "Antigravity",
  description:
    "Floating particle system with anti-gravity physics, 3D depth, and mouse interaction.",
  category: "visual",
  dependencies: ["@react-three/fiber", "three"],
  code: `// Component source - see app/components/ui/antigravity.tsx`,
  usage: `import Antigravity from "@/app/components/ui/antigravity"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Antigravity />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/antigravity-demo"),
  demo: () => import("@/app/components/demos/antigravity-demo"),
};

export default entry;
