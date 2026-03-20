import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "light-pillar",
  title: "Light Pillar",
  description:
    "Vertical light pillar background with glowing beams and atmospheric scattering.",
  category: "visual",
  dependencies: ["three"],
  code: `// Component source - see app/components/ui/light-pillar.tsx`,
  usage: `import LightPillar from "@/app/components/ui/light-pillar"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <LightPillar />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/light-pillar-demo"),
  demo: () => import("@/app/components/demos/light-pillar-demo"),
};

export default entry;
