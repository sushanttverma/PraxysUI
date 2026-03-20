import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "prism",
  title: "Prism",
  description:
    "Rainbow prismatic refraction background with light dispersion and chromatic effects.",
  category: "visual",
  dependencies: ["ogl"],
  code: `// Component source - see app/components/ui/prism.tsx`,
  usage: `import Prism from "@/app/components/ui/prism"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Prism />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/prism-demo"),
  demo: () => import("@/app/components/demos/prism-demo"),
};

export default entry;
