import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export async function CodeBlock({
  code,
  language = "tsx",
  filename,
}: CodeBlockProps) {
  const [darkHtml, lightHtml] = await Promise.all([
    codeToHtml(code.trim(), { lang: language, theme: "vitesse-dark" }),
    codeToHtml(code.trim(), { lang: language, theme: "vitesse-light" }),
  ]);

  return (
    <div className="group relative rounded-xl border border-border overflow-hidden bg-[var(--color-code-bg)]">
      {filename && (
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="font-mono text-xs text-text-faint">{filename}</span>
        </div>
      )}
      <div className="relative">
        <CopyButton code={code.trim()} />
        {/* Dark theme code block */}
        <div
          className="code-block-dark overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent font-mono leading-relaxed"
          dangerouslySetInnerHTML={{ __html: darkHtml }}
        />
        {/* Light theme code block */}
        <div
          className="code-block-light overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent font-mono leading-relaxed"
          dangerouslySetInnerHTML={{ __html: lightHtml }}
        />
      </div>
    </div>
  );
}
