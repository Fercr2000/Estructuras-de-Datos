import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md">
      {/* Patrón de puntos sutil de fondo */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #E8E4DC 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="font-serif text-2xl md:text-3xl font-normal tracking-tight"
        >
          <span className="text-ink">
            Estructuras de <span className="text-gradient-amber">Datos</span>
          </span>
        </Link>

        {/* Menú */}
        <div className="flex items-center gap-2 md:gap-7">
          <NavLink href="/fundamentos">~/fundamentos</NavLink>
          <NavLink href="/">~/estructuras</NavLink>
        </div>
      </div>

      {/* Divisor inferior con gradiente */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "var(--gradient-line)" }}
      />
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative group font-sans font-medium text-[15px] md:text-base text-ink hover:text-amber-hover transition-colors duration-300 py-1"
    >
      <span className="relative z-10">{children}</span>
      {/* Subrayado degradado que crece en hover */}
      <span
        className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 ease-out"
        style={{ background: "var(--gradient-amber)" }}
      />
    </Link>
  );
}