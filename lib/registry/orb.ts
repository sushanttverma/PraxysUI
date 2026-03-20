import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "orb",
  title: "Orb",
  description:
    "WebGL glowing orb with OGL-powered shading, customizable hue and hover-reactive animation.",
  category: "visual",
  dependencies: ["ogl"],
  code: `// Component source - see app/components/ui/orb.tsx`,
  usage: `import Orb from "@/app/components/ui/orb"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Orb />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/orb-demo"),
  demo: () => import("@/app/components/demos/orb-demo"),
};

export default entry;
