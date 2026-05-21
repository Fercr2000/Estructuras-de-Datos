import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  slug: string;
  name: string;
  implemented: boolean;
}

export function StructurePill({ slug, name, implemented }: Props) {
  const baseClass = cn(
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-md border font-mono text-xs transition-all",
    implemented
      ? "bg-amber-soft border-amber-light text-amber-hover hover:scale-105 cursor-pointer"
      : "bg-subtle border-border-warm text-ink-mute"
  );

  const dot = (
    <span className={implemented ? "text-amber" : "text-ink-mute"}>
      {implemented ? "●" : "○"}
    </span>
  );

  if (implemented) {
    return (
      <Link href={`/estructuras/${slug}`} className={baseClass}>
        {dot}
        {name}
      </Link>
    );
  }

  return (
    <span className={baseClass}>
      {dot}
      {name}
    </span>
  );
}