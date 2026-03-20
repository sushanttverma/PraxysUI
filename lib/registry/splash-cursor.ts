import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "splash-cursor",
  title: "Splash Cursor",
  description:
    "Fluid splash effect that follows cursor movement with ripple and wave dynamics.",
  category: "visual",
  dependencies: [],
  code: `// Component source - see app/components/ui/splash-cursor.tsx`,
  usage: `import SplashCursor from "@/app/components/ui/splash-cursor"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <SplashCursor />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/splash-cursor-demo"),
  demo: () => import("@/app/components/demos/splash-cursor-demo"),
};

export default entry;
