import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  filename?: string;
  children: ReactNode;
  className?: string;
}

export function TermCard({ filename, children, className }: Props) {
  return (
    <div
      className={cn(
        "bg-card border border-border-warm rounded-lg overflow-hidden",
        "shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all",
        "hover:shadow-[0_4px_12px_rgba(217,119,6,0.08)] hover:-translate-y-0.5",
        className
      )}
    >
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2 bg-subtle border-b border-border-warm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="font-mono text-xs text-ink-mute ml-2">{filename}</span>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}