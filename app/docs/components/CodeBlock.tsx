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
  const html = await codeToHtml(code.trim(), {
    lang: language,
    theme: "vitesse-dark",
  });

  return (
    <div className="group relative rounded-xl border border-border bg-obsidian overflow-hidden">
      {filename && (
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="font-mono text-xs text-text-faint">{filename}</span>
        </div>
      )}
      <div className="relative">
        <CopyButton code={code.trim()} />
        <div
          className="overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent font-mono leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
