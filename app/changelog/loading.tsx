export default function ChangelogLoading() {
  return (
    <div className="min-h-screen bg-void">
      {/* Navbar placeholder */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/60 bg-void/85 backdrop-blur-xl" />

      <div className="mx-auto max-w-3xl px-6 pt-28 pb-20 animate-pulse">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-lg bg-obsidian" />
            <div className="h-4 w-24 rounded bg-obsidian" />
          </div>
          <div className="h-9 w-48 rounded bg-obsidian" />
          <div className="mt-3 h-5 w-96 max-w-full rounded bg-obsidian" />
          <div className="mt-6 flex gap-3">
            <div className="h-16 w-24 rounded-lg bg-obsidian" />
            <div className="h-16 w-24 rounded-lg bg-obsidian" />
            <div className="h-16 w-24 rounded-lg bg-obsidian" />
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-obsidian/30 px-5 py-5"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-obsidian" />
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <div className="h-5 w-16 rounded bg-obsidian" />
                    <div className="h-5 w-24 rounded bg-obsidian" />
                  </div>
                  <div className="h-5 w-64 max-w-full rounded bg-obsidian" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
