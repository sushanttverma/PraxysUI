export default function TemplatesLoading() {
  return (
    <div className="min-h-screen bg-void">
      <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/60 bg-void/85 backdrop-blur-xl" />

      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20 animate-pulse">
        {/* Header */}
        <div className="mb-12">
          <div className="h-4 w-24 rounded bg-obsidian mb-3" />
          <div className="h-9 w-48 rounded bg-obsidian" />
          <div className="mt-3 h-5 w-96 max-w-full rounded bg-obsidian" />
        </div>

        {/* Filter pills */}
        <div className="mb-8 flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-24 rounded-lg bg-obsidian" />
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-obsidian/30 p-5"
            >
              <div className="mb-4 h-40 rounded-lg bg-obsidian" />
              <div className="h-5 w-40 rounded bg-obsidian" />
              <div className="mt-2 h-4 w-full rounded bg-obsidian" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
