import { CodeBlock } from "../../components/CodeBlock";

export default async function CliPage() {
  return (
    <div className="space-y-10">
      <div>
        <p className="mb-2 font-pixel text-xs uppercase tracking-wider text-ignite">
          Installation
        </p>
        <h1 className="font-pixel text-3xl font-bold text-chalk">CLI</h1>
        <p className="mt-3 text-lg text-blush">
          Use the Praxys UI CLI to quickly scaffold components in your project.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            Initialize Project
          </h2>
          <p className="mb-4 text-blush">
            Run the init command to set up Praxys UI in your project:
          </p>
          <CodeBlock code="npx praxys-ui init" language="bash" />
          <p className="mt-3 text-sm text-blush">
            This will install the required dependencies and create the utility
            files needed by Praxys UI components.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            Add Components
          </h2>
          <p className="mb-4 text-blush">
            Add individual components to your project:
          </p>
          <CodeBlock
            code="npx praxys-ui add animated-button"
            language="bash"
          />
          <p className="mt-3 text-sm text-blush">
            This copies the component source code into your{" "}
            <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
              components/ui
            </code>{" "}
            directory.
          </p>
        </div>

        <div className="rounded-xl border border-ignite/20 bg-ignite/5 p-4">
          <p className="text-sm text-blush">
            <strong className="text-chalk">Coming Soon:</strong> The CLI is
            currently under development. For now, you can manually copy
            components from the documentation pages.
          </p>
        </div>
      </div>
    </div>
  );
}
