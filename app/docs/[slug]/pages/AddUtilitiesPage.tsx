import { CodeBlock } from "../../components/CodeBlock";

export default function AddUtilitiesPage() {
  return (
    <div className="space-y-10">
      <div>
        <p className="mb-2 font-pixel text-xs uppercase tracking-wider text-ignite">
          Installation
        </p>
        <h1 className="font-pixel text-3xl font-bold text-chalk">
          Add Utilities
        </h1>
        <p className="mt-3 text-lg text-blush">
          Add the <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">cn()</code> utility
          function used by all Praxys UI components.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            Install Dependencies
          </h2>
          <p className="mb-4 text-blush">
            Install <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">clsx</code> and{" "}
            <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">tailwind-merge</code>:
          </p>
          <CodeBlock code="npm install clsx tailwind-merge" language="bash" />
        </div>

        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            Create Utility File
          </h2>
          <p className="mb-4 text-blush">
            Create <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">lib/utils.ts</code> with
            the following code:
          </p>
          <CodeBlock
            code={`import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
            language="tsx"
            filename="lib/utils.ts"
          />
        </div>

        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            What is cn()?
          </h2>
          <p className="text-blush">
            The <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">cn()</code> function
            combines <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">clsx</code> for
            conditional class names with{" "}
            <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">tailwind-merge</code> for
            smart Tailwind class deduplication. This ensures that when you pass
            custom classes via the <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">className</code> prop,
            they properly override default styles without conflicts.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            Usage Example
          </h2>
          <CodeBlock
            code={`import { cn } from "@/lib/utils";

// Merge conditional + override classes
cn("px-4 py-2 bg-blue-500", isActive && "bg-red-500", className)
// Result: "px-4 py-2 bg-red-500" (tailwind-merge resolves conflicts)`}
            language="tsx"
          />
        </div>
      </div>
    </div>
  );
}
