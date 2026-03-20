import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "grainient",
  title: "Grainient",
  description:
    "Grainy gradient background with film-grain noise overlay and smooth color transitions.",
  category: "visual",
  dependencies: ["ogl"],
  code: `// Component source - see app/components/ui/grainient.tsx`,
  usage: `import Grainient from "@/app/components/ui/grainient"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Grainient />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/grainient-demo"),
  demo: () => import("@/app/components/demos/grainient-demo"),
};

export default entry;
