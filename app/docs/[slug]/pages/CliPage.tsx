import { CodeBlock } from "../../components/CodeBlock";

export default function CliPage() {
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

      <div className="space-y-8">
        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            Initialize Project
          </h2>
          <p className="mb-4 text-blush">
            Run the init command to set up Praxys UI in your project. This
            installs{" "}
            <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
              clsx
            </code>
            ,{" "}
            <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
              tailwind-merge
            </code>
            , and{" "}
            <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
              framer-motion
            </code>
            , then creates the{" "}
            <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
              cn()
            </code>{" "}
            utility helper.
          </p>
          <CodeBlock code="npx praxys-ui init" language="bash" />
          <p className="mt-3 text-sm text-blush">
            The CLI will auto-detect your package manager (npm, pnpm, yarn, or
            bun) and prompt for your preferred directory structure.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            Add Components
          </h2>
          <p className="mb-4 text-blush">
            Add individual components to your project by slug name:
          </p>
          <CodeBlock
            code="npx praxys-ui add animated-button"
            language="bash"
          />
          <p className="mt-3 text-sm text-blush">
            This fetches the component source from GitHub and copies it into
            your{" "}
            <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
              components/ui
            </code>{" "}
            directory. You can specify a custom directory with the{" "}
            <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
              --dir
            </code>{" "}
            flag.
          </p>
          <div className="mt-4">
            <CodeBlock
              code="npx praxys-ui add glass-dock --dir src/components/ui"
              language="bash"
            />
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            List Components
          </h2>
          <p className="mb-4 text-blush">
            View all available components:
          </p>
          <CodeBlock code="npx praxys-ui list" language="bash" />
        </div>

        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            Options
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-obsidian/50">
                  <th className="px-4 py-3 text-left font-medium text-chalk">
                    Command
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-chalk">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                    <code className="font-mono text-xs text-ignite">init</code>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-blush">
                    Install deps & create utility files
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                    <code className="font-mono text-xs text-ignite">
                      add &lt;name&gt;
                    </code>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-blush">
                    Add a component to your project
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                    <code className="font-mono text-xs text-ignite">
                      add &lt;name&gt; --dir &lt;path&gt;
                    </code>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-blush">
                    Add to a custom directory
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                    <code className="font-mono text-xs text-ignite">list</code>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-blush">
                    List all available components
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                    <code className="font-mono text-xs text-ignite">
                      --version
                    </code>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-blush">
                    Show CLI version
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
