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
  const [loadError, setLoadError] = useState<string | null>(null);

  const entry = componentRegistry[slug];
  const registryError = !entry ? `Component "${slug}" not found in registry.` : null;

  useEffect(() => {
    if (!entry) return;

    entry
      .demo()
      .then((mod) => {
        setDemoComponent(() => mod.default);
      })
      .catch((err) => {
        console.error(`Failed to load demo for "${slug}":`, err);
        setLoadError(`Failed to load preview for "${slug}".`);
      });
  }, [slug, entry]);

  const error = registryError || loadError;

  if (error) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-ignite/70">
        {error}
      </div>
    );
  }

  if (!DemoComponent) {
    return (
      <div className="flex h-32 items-center justify-center text-text-faint">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-ignite/30 border-t-ignite" />
          Loading preview...
        </div>
      </div>
    );
  }

  return <DemoComponent />;
}
