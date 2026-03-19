import type { PropDef } from "@/lib/registry";

interface PropsTableProps {
  props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] shadow-[0_4px_32px_rgba(0,0,0,0.1)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-obsidian)]/50">
            <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-faint)]">
              Prop
            </th>
            <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-faint)]">
              Type
            </th>
            <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-faint)]">
              Default
            </th>
            <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-faint)]">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-[var(--color-border)]/50 transition-colors last:border-0 hover:bg-[var(--color-obsidian)]/20"
            >
              <td className="whitespace-nowrap px-5 py-3">
                <code className="rounded-lg bg-[var(--color-ignite)]/10 px-2 py-0.5 font-mono text-xs font-medium text-[var(--color-ignite)]">
                  {prop.name}
                </code>
              </td>
              <td className="whitespace-nowrap px-5 py-3">
                <code className="rounded-lg bg-[var(--color-border)]/50 px-2 py-0.5 font-mono text-xs text-[var(--color-blush)]">
                  {prop.type}
                </code>
              </td>
              <td className="whitespace-nowrap px-5 py-3">
                <code className="font-mono text-xs text-[var(--color-text-faint)]">
                  {prop.default}
                </code>
              </td>
              <td className="px-5 py-3 text-[13px] text-[var(--color-blush)]">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
