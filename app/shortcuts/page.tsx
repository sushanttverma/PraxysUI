import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Keyboard Shortcuts",
  description: "Keyboard shortcuts for navigating Praxys UI.",
};

const shortcuts = [
  {
    keys: ["⌘", "K"],
    description: "Open command palette",
  },
  {
    keys: ["Esc"],
    description: "Close command palette or dialog",
  },
  {
    keys: ["↑", "↓"],
    description: "Navigate search results",
  },
  {
    keys: ["Enter"],
    description: "Open selected result",
  },
];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border-light bg-void px-1.5 font-mono text-[11px] text-chalk shadow-sm">
      {children}
    </kbd>
  );
}

export default function ShortcutsPage() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pt-24 pb-20">
        {/* Editorial header */}
        <div className="mb-10">
          <p className="font-mono text-[10px] text-text-faint tracking-wider mb-1">
            {"// shortcuts"}
          </p>
          <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl font-bold text-chalk leading-none">
            Keyboard Shortcuts
          </h1>
          <div
            className="mt-4 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, var(--color-ignite), var(--color-ignite) 30%, transparent)",
            }}
          />
        </div>

        {/* Shortcuts list */}
        <div className="space-y-2">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.description}
              className="flex items-center justify-between rounded-xl border border-border bg-obsidian/50 px-5 py-4"
            >
              <span className="text-sm text-blush">
                {shortcut.description}
              </span>
              <div className="flex items-center gap-1.5">
                {shortcut.keys.map((key) => (
                  <Kbd key={key}>{key}</Kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
