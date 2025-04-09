"use client";

import { useEffect, useState, type ComponentType } from "react";
import { componentRegistry } from "@/lib/registry";

interface ComponentPageClientProps {
  slug: string;
}

export default function ComponentPageClient({ slug }: ComponentPageClientProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [DemoComponent, setDemoComponent] = useState<ComponentType<any> | null>(
    null
  );

  useEffect(() => {
    const entry = componentRegistry[slug];
    if (entry) {
      entry.demo().then((mod) => {
        setDemoComponent(() => mod.default);
      });
    }
  }, [slug]);

  if (!DemoComponent) {
    return (
      <div className="flex h-32 items-center justify-center text-text-faint">
        Loading preview...
      </div>
    );
  }

  return <DemoComponent />;
}
