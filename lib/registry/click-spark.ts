import type { ComponentEntry } from "./types";

const entry: ComponentEntry = {
  slug: "click-spark",
  title: "Click Spark",
  description:
    "Spark burst effect on click with radiating animated particles and configurable colors.",
  category: "visual",
  dependencies: [],
  code: `// Component source - see app/components/ui/click-spark.tsx`,
  usage: `import ClickSpark from "@/app/components/ui/click-spark"

export function Demo() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <ClickSpark />
    </div>
  )
}`,
  props: [],
  component: () => import("@/app/components/demos/click-spark-demo"),
  demo: () => import("@/app/components/demos/click-spark-demo"),
};

export default entry;
