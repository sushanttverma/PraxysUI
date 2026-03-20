import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "liquid-chrome",
  title: "Liquid Chrome",
  description:
    "Chrome-like liquid metal background with reflective distortion and mouse-reactive movement.",
  category: "visual",
  dependencies: ["ogl"],
  code: `// Component source - see app/components/ui/liquid-chrome.tsx`,
  usage: `import LiquidChrome from "@/app/components/ui/liquid-chrome"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <LiquidChrome />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/liquid-chrome-demo"),
  demo: () => import("@/app/components/demos/liquid-chrome-demo"),
};

export default entry;
