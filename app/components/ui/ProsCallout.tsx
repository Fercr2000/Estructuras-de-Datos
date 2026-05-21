import { Check } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  items: ReactNode[];
  title?: string;
}

export function ProsCallout({ items, title = "ventajas" }: Props) {
  return (
    <div className="rounded-lg overflow-hidden border border-[#86EFAC]/70 bg-[#F0FDF4]">
      <div
        className="flex items-center gap-2 px-4 py-2 border-b border-[#86EFAC]/70"
        style={{
          background:
            "linear-gradient(90deg, rgba(134, 239, 172, 0.55) 0%, rgba(187, 247, 208, 0.30) 55%, rgba(240, 253, 244, 0.85) 100%)",
        }}
      >
        <Check size={14} strokeWidth={2.5} className="text-[#059669]" />
        <span className="font-mono text-xs font-medium text-[#047857]">
          // {title}
        </span>
      </div>
      <ul className="p-4 space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-2.5 items-start text-sm leading-relaxed text-ink"
          >
            <Check
              size={14}
              strokeWidth={2.5}
              className="text-[#059669] mt-1 shrink-0"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}