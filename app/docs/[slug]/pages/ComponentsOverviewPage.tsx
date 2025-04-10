import Link from "next/link";
import { componentRegistry } from "@/lib/registry";

const categoryLabels: Record<string, string> = {
  buttons: "Buttons",
  cards: "Cards & Layout",
  text: "Text Effects",
  navigation: "Navigation",
  visual: "Visual Effects",
  media: "Media & Content",
};

const categoryColors: Record<string, string> = {
  buttons: "bg-ignite/10 text-ignite border-ignite/20",
  cards: "bg-blush/10 text-blush border-blush/20",
  text: "bg-chalk/10 text-chalk border-chalk/20",
  navigation: "bg-ignite/10 text-ignite border-ignite/20",
  visual: "bg-blush/10 text-blush border-blush/20",
  media: "bg-chalk/10 text-chalk border-chalk/20",
};

export default function ComponentsOverviewPage() {
  const components = Object.values(componentRegistry);

  // Group by category
  const grouped = components.reduce(
    (acc, comp) => {
      if (!acc[comp.category]) acc[comp.category] = [];
      acc[comp.category].push(comp);
      return acc;
    },
    {} as Record<string, typeof components>
  );

  return (
    <div className="space-y-10">
      <div>
        <p className="mb-2 font-pixel text-xs uppercase tracking-wider text-ignite">
          Components
        </p>
        <h1 className="font-pixel text-3xl font-bold text-chalk">
          Components Overview
        </h1>
        <p className="mt-3 text-lg text-blush">
          Explore our collection of beautifully crafted, animated React
          components.
        </p>
      </div>

      {/* Component grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {components.map((comp) => (
          <Link
            key={comp.slug}
            href={`/docs/${comp.slug}`}
            className="group rounded-xl border border-border bg-obsidian/50 p-5 transition-all hover:border-border-light hover:bg-obsidian"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-chalk transition-colors group-hover:text-ignite">
                {comp.title}
              </h3>
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                  categoryColors[comp.category] || ""
                }`}
              >
                {categoryLabels[comp.category] || comp.category}
              </span>
            </div>
            <p className="text-sm text-blush line-clamp-2">
              {comp.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Upcoming components note */}
      <div className="rounded-xl border border-border bg-obsidian/50 p-6 text-center">
        <p className="font-pixel text-sm text-text-faint">
          More components coming soon. Check back for updates.
        </p>
      </div>
    </div>
  );
}
