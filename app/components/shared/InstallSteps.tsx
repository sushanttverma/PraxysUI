import { CodeBlock } from "./CodeBlock";

interface Step {
  title: string;
  description?: string;
  code?: string;
  language?: string;
  filename?: string;
}

interface InstallStepsProps {
  steps: Step[];
}

export async function InstallSteps({ steps }: InstallStepsProps) {
  return (
    <div className="space-y-6">
      {steps.map((step, i) => (
        <div key={i} className="relative pl-10">
          {/* Step number */}
          <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-ignite/30 bg-ignite/10 font-pixel text-xs text-ignite">
            {i + 1}
          </div>

          {/* Connecting line */}
          {i < steps.length - 1 && (
            <div className="absolute left-[13px] top-8 bottom-0 w-px bg-border" />
          )}

          <div className="space-y-3 pb-6">
            <h4 className="text-sm font-semibold text-chalk">{step.title}</h4>
            {step.description && (
              <p className="text-sm text-blush">{step.description}</p>
            )}
            {step.code && (
              <CodeBlock
                code={step.code}
                language={step.language || "bash"}
                filename={step.filename}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
