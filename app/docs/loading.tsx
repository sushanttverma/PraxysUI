export default function DocsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Title skeleton */}
      <div>
        <div className="h-4 w-28 rounded bg-obsidian mb-3" />
        <div className="h-9 w-72 rounded bg-obsidian" />
        <div className="mt-3 h-5 w-full max-w-lg rounded bg-obsidian" />
      </div>

      {/* Content blocks */}
      <div className="space-y-4">
        <div className="h-4 w-full rounded bg-obsidian" />
        <div className="h-4 w-5/6 rounded bg-obsidian" />
        <div className="h-4 w-4/6 rounded bg-obsidian" />
      </div>

      <div className="space-y-4">
        <div className="h-6 w-40 rounded bg-obsidian" />
        <div className="h-4 w-full rounded bg-obsidian" />
        <div className="h-4 w-3/4 rounded bg-obsidian" />
      </div>
    </div>
  );
}
