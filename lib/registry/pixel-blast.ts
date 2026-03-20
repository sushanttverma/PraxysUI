import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "pixel-blast",
  title: "Pixel Blast",
  description:
    "Explosive pixel dissolution background with Three.js particle system and postprocessing.",
  category: "visual",
  dependencies: ["three", "postprocessing"],
  code: `// Component source - see app/components/ui/pixel-blast.tsx`,
  usage: `import PixelBlast from "@/app/components/ui/pixel-blast"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <PixelBlast />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/pixel-blast-demo"),
  demo: () => import("@/app/components/demos/pixel-blast-demo"),
};

export default entry;
