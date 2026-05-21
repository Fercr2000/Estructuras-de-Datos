import Link from "next/link";

interface Props {
  slug: string;
  name: string;
  implemented: boolean;
}

export function StructurePill({ slug, name, implemented }: Props) {
  const className =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-amber-light text-amber-hover font-mono text-xs transition-all bg-gradient-amber-soft hover:scale-105 hover:shadow-sm cursor-pointer";

  // Si la estructura aún no tiene página, enlazamos a la home (luego ya enlazará a su detalle)
  const href = implemented ? `/estructuras/${slug}` : "/";

  return (
    <Link href={href} className={className}>
      <span className="text-amber-hover">◆</span>
      {name}
    </Link>
  );
}