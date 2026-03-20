import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "dark-veil",
  title: "Dark Veil",
  description:
    "Shadowy layered veil background with OGL-powered animated dark gradients and depth.",
  category: "visual",
  dependencies: ["ogl"],
  code: `// Component source - see app/components/ui/dark-veil.tsx`,
  usage: `import DarkVeil from "@/app/components/ui/dark-veil"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <DarkVeil />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/dark-veil-demo"),
  demo: () => import("@/app/components/demos/dark-veil-demo"),
};

export default entry;
