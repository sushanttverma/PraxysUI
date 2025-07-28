export default function ExamplesLoading() {
  return (
    <div className="min-h-screen bg-void">
      <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/60 bg-void/85 backdrop-blur-xl" />

      <div className="mx-auto max-w-4xl px-6 pt-28 pb-20 animate-pulse">
        {/* Header */}
        <div className="mb-12">
          <div className="h-4 w-24 rounded bg-obsidian mb-3" />
          <div className="h-9 w-64 rounded bg-obsidian" />
          <div className="mt-3 h-5 w-96 max-w-full rounded bg-obsidian" />
        </div>

        {/* Recipe cards */}
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-obsidian/30 overflow-hidden"
            >
              <div className="h-64 bg-obsidian" />
              <div className="p-5 space-y-3">
                <div className="h-6 w-48 rounded bg-obsidian" />
                <div className="h-4 w-full rounded bg-obsidian" />
                <div className="flex gap-2">
                  <div className="h-6 w-20 rounded-full bg-obsidian" />
                  <div className="h-6 w-20 rounded-full bg-obsidian" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
