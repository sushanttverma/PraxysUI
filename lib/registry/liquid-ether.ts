import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "liquid-ether",
  title: "Liquid Ether",
  description:
    "Ethereal liquid background with flowing color gradients and smooth WebGL animation.",
  category: "visual",
  dependencies: ["three"],
  code: `// Component source - see app/components/ui/liquid-ether.tsx`,
  usage: `import LiquidEther from "@/app/components/ui/liquid-ether"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <LiquidEther />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/liquid-ether-demo"),
  demo: () => import("@/app/components/demos/liquid-ether-demo"),
};

export default entry;
