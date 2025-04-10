import { CodeBlock } from "../../components/CodeBlock";

export default async function InstallTailwindPage() {
  return (
    <div className="space-y-10">
      <div>
        <p className="mb-2 font-pixel text-xs uppercase tracking-wider text-ignite">
          Installation
        </p>
        <h1 className="font-pixel text-3xl font-bold text-chalk">
          Install Tailwind CSS
        </h1>
        <p className="mt-3 text-lg text-blush">
          Set up Tailwind CSS v4 in your Next.js project.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            Install Tailwind CSS
          </h2>
          <p className="mb-4 text-blush">
            Install Tailwind CSS and the PostCSS plugin:
          </p>
          <CodeBlock
            code="npm install tailwindcss @tailwindcss/postcss"
            language="bash"
          />
        </div>

        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            Configure PostCSS
          </h2>
          <p className="mb-4 text-blush">
            Update your <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">postcss.config.mjs</code> file:
          </p>
          <CodeBlock
            code={`/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;`}
            language="js"
            filename="postcss.config.mjs"
          />
        </div>

        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            Import Tailwind
          </h2>
          <p className="mb-4 text-blush">
            Add the Tailwind import to your global CSS file:
          </p>
          <CodeBlock
            code={`@import "tailwindcss";`}
            language="css"
            filename="app/globals.css"
          />
        </div>

        <div className="rounded-xl border border-ignite/20 bg-ignite/5 p-4">
          <p className="text-sm text-blush">
            <strong className="text-chalk">Tip:</strong> If you used{" "}
            <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">
              create-next-app
            </code>{" "}
            with the <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-xs text-ignite">--tailwind</code> flag,
            Tailwind CSS is already set up for you.
          </p>
        </div>
      </div>
    </div>
  );
}
