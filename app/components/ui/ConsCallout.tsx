import { X } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  items: ReactNode[];
  title?: string;
}

export function ConsCallout({ items, title = "inconvenientes" }: Props) {
  return (
    <div className="rounded-lg overflow-hidden border border-[#FCA5A5]/70 bg-[#FEF2F2]">
      <div
        className="flex items-center gap-2 px-4 py-2 border-b border-[#FCA5A5]/70"
        style={{
          background:
            "linear-gradient(90deg, rgba(252, 165, 165, 0.45) 0%, rgba(254, 202, 202, 0.25) 55%, rgba(254, 226, 226, 0.80) 100%)",
        }}
      >
        <X size={14} strokeWidth={2.5} className="text-[#DC2626]" />
        <span className="font-mono text-xs font-medium text-[#B91C1C]">
          // {title}
        </span>
      </div>
      <ul className="p-4 space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-2.5 items-start text-sm leading-relaxed text-ink"
          >
            <X
              size={14}
              strokeWidth={2.5}
              className="text-[#DC2626] mt-1 shrink-0"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}