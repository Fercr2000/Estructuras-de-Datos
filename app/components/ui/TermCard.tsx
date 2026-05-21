import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { TermBar } from "./TermBar";

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
      {filename && <TermBar filename={filename} />}
      <div className="p-6">{children}</div>
    </div>
  );
}