import type { PropDef } from "@/lib/registry";

interface PropsTableProps {
  props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-obsidian/50">
            <th className="px-4 py-3 text-left font-medium text-chalk">
              Prop
            </th>
            <th className="px-4 py-3 text-left font-medium text-chalk">
              Type
            </th>
            <th className="px-4 py-3 text-left font-medium text-chalk">
              Default
            </th>
            <th className="px-4 py-3 text-left font-medium text-chalk">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-border/50 last:border-0"
            >
              <td className="px-4 py-3">
                <code className="rounded bg-ignite/10 px-1.5 py-0.5 font-mono text-xs text-ignite">
                  {prop.name}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="font-mono text-xs text-blush">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="font-mono text-xs text-text-faint">
                  {prop.default}
                </code>
              </td>
              <td className="px-4 py-3 text-blush">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
