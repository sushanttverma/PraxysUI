import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "ribbons",
  title: "Ribbons",
  description:
    "Flowing 3D ribbon animation with OGL-powered smooth curves and color gradients.",
  category: "visual",
  dependencies: ["ogl"],
  code: `// Component source - see app/components/ui/ribbons.tsx`,
  usage: `import Ribbons from "@/app/components/ui/ribbons"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Ribbons />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/ribbons-demo"),
  demo: () => import("@/app/components/demos/ribbons-demo"),
};

export default entry;
