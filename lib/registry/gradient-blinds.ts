import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "gradient-blinds",
  title: "Gradient Blinds",
  description:
    "Animated gradient blinds with configurable colors, angle, and transition speed.",
  category: "visual",
  dependencies: ["ogl"],
  code: `// Component source - see app/components/ui/gradient-blinds.tsx`,
  usage: `import GradientBlinds from "@/app/components/ui/gradient-blinds"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <GradientBlinds />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/gradient-blinds-demo"),
  demo: () => import("@/app/components/demos/gradient-blinds-demo"),
};

export default entry;
