export default function DocsSlugLoading() {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Header skeleton */}
      <div>
        <div className="mb-2 h-4 w-24 rounded bg-obsidian" />
        <div className="h-8 w-64 rounded bg-obsidian" />
        <div className="mt-3 h-5 w-96 max-w-full rounded bg-obsidian" />
      </div>

      {/* Preview skeleton */}
      <div className="overflow-hidden rounded-xl border border-border">
        {/* Tab bar */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <div className="h-7 w-20 rounded-md bg-obsidian" />
          <div className="h-7 w-16 rounded-md bg-obsidian" />
        </div>
        {/* Preview area */}
        <div className="flex h-72 items-center justify-center bg-void/50">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-ignite/30 border-t-ignite" />
        </div>
      </div>

      {/* Installation skeleton */}
      <div>
        <div className="mb-4 h-6 w-32 rounded bg-obsidian" />
        <div className="space-y-3">
          <div className="h-12 rounded-lg bg-obsidian" />
          <div className="h-12 rounded-lg bg-obsidian" />
          <div className="h-12 rounded-lg bg-obsidian" />
        </div>
      </div>

      {/* Usage skeleton */}
      <div>
        <div className="mb-4 h-6 w-20 rounded bg-obsidian" />
        <div className="h-24 rounded-lg bg-obsidian" />
      </div>

      {/* Props skeleton */}
      <div>
        <div className="mb-4 h-6 w-16 rounded bg-obsidian" />
        <div className="h-32 rounded-lg bg-obsidian" />
      </div>
    </div>
  );
}
