import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "light-rays",
  title: "Light Rays",
  description:
    "Dynamic light ray background with configurable color, speed, and ray count.",
  category: "visual",
  dependencies: ["ogl"],
  code: `// Component source - see app/components/ui/light-rays.tsx`,
  usage: `import LightRays from "@/app/components/ui/light-rays"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <LightRays />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/light-rays-demo"),
  demo: () => import("@/app/components/demos/light-rays-demo"),
};

export default entry;
