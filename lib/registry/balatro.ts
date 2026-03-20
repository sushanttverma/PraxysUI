import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "balatro",
  title: "Balatro",
  description:
    "Psychedelic swirling background effect with vivid color distortion inspired by retro aesthetics.",
  category: "visual",
  dependencies: ["ogl"],
  code: `// Component source - see app/components/ui/balatro.tsx`,
  usage: `import Balatro from "@/app/components/ui/balatro"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Balatro />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/balatro-demo"),
  demo: () => import("@/app/components/demos/balatro-demo"),
};

export default entry;
