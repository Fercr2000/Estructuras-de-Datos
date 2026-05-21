import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Bullet = ">" | "$" | "~" | "→" | "▸" | "└─" | "├─";

interface ItemProps {
  bullet?: Bullet;
  children: ReactNode;
  className?: string;
}

export function TechItem({ bullet = ">", children, className }: ItemProps) {
  return (
    <li className={cn("flex gap-3 items-baseline", className)}>
      <span className="font-mono text-amber text-sm shrink-0 select-none leading-relaxed">
        {bullet}
      </span>
      <span className="text-ink leading-relaxed flex-1">{children}</span>
    </li>
  );
}

export function TechList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <ul className={cn("space-y-2.5", className)}>{children}</ul>;
}