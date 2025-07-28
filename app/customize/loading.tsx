export default function CustomizeLoading() {
  return (
    <div className="min-h-screen bg-void">
      <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/60 bg-void/85 backdrop-blur-xl" />

      <div className="min-h-screen pt-16 animate-pulse">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* Header */}
          <div className="mb-8">
            <div className="h-4 w-24 rounded bg-obsidian mb-3" />
            <div className="h-9 w-56 rounded bg-obsidian" />
            <div className="mt-3 h-5 w-96 max-w-full rounded bg-obsidian" />
          </div>

          {/* Two-column layout */}
          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            {/* Controls */}
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-obsidian/30 p-4"
                >
                  <div className="h-4 w-20 rounded bg-obsidian mb-3" />
                  <div className="h-10 w-full rounded-lg bg-obsidian" />
                </div>
              ))}
            </div>

            {/* Preview */}
            <div className="rounded-xl border border-border bg-obsidian/30 p-8">
              <div className="h-96 rounded-lg bg-obsidian" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
