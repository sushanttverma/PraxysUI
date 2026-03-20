import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "laser-flow",
  title: "Laser Flow",
  description:
    "Animated laser beam flow with neon glow and configurable beam paths.",
  category: "visual",
  dependencies: ["three"],
  code: `// Component source - see app/components/ui/laser-flow.tsx`,
  usage: `import LaserFlow from "@/app/components/ui/laser-flow"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <LaserFlow />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/laser-flow-demo"),
  demo: () => import("@/app/components/demos/laser-flow-demo"),
};

export default entry;
