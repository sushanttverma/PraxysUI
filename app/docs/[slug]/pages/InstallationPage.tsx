import { CodeBlock } from "../../components/CodeBlock";

export default function InstallationPage() {
  return (
    <div className="space-y-10">
      <div>
        <p className="mb-2 font-pixel text-xs uppercase tracking-wider text-ignite">
          Installation
        </p>
        <h1 className="font-pixel text-3xl font-bold text-chalk">
          Install Next.js
        </h1>
        <p className="mt-3 text-lg text-blush">
          Create a new Next.js project with TypeScript, Tailwind CSS, ESLint,
          and App Router.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            Create Project
          </h2>
          <p className="mb-4 text-blush">
            Run the following command to create a new Next.js project:
          </p>
          <CodeBlock
            code={`npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias '@/*'`}
            language="bash"
          />
        </div>

        <div>
          <p className="mb-4 text-blush">
            Navigate to your project directory:
          </p>
          <CodeBlock code="cd my-app" language="bash" />
        </div>

        <div>
          <h2 className="mb-3 font-pixel text-xl font-semibold text-chalk">
            Start Development Server
          </h2>
          <p className="mb-4 text-blush">
            Start the development server to verify your setup:
          </p>
          <CodeBlock code="npm run dev" language="bash" />
        </div>

        <div className="rounded-xl border border-ignite/20 bg-ignite/5 p-4">
          <p className="text-sm text-blush">
            <strong className="text-chalk">Note:</strong> Praxys UI components
            require React 18+ and Next.js 14+ with the App Router. Make sure
            you have the latest versions installed.
          </p>
        </div>
      </div>
    </div>
  );
}
