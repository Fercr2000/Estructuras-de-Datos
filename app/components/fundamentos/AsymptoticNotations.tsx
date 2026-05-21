import { TermCard } from "@/components/ui/TermCard";

const notations = [
  {
    symbol: "O",
    name: "O grande",
    subtitle: "Peor caso · cota superior",
    filename: "big_o.h",
    definition:
      "T(n) = O(f(n)) si existen C y x₀ tales que T(x) ≤ C·f(x) para todo x > x₀.",
    intuition: "f(n) acota por arriba: ninguna ejecución tarda más que eso.",
    color: "#DC2626",
  },
  {
    symbol: "Ω",
    name: "Omega",
    subtitle: "Mejor caso · cota inferior",
    filename: "omega.h",
    definition:
      "T(n) = Ω(f(n)) si existen C y x₀ tales que T(x) ≥ C·f(x) para todo x > x₀.",
    intuition: "f(n) acota por abajo: ninguna ejecución es más rápida que eso.",
    color: "#059669",
  },
  {
    symbol: "Θ",
    name: "Theta",
    subtitle: "Cota ajustada · óptimo",
    filename: "theta.h",
    definition:
      "T(n) = Θ(f(n)) cuando O(f(n)) y Ω(f(n)) coinciden. Cota ajustada.",
    intuition: "Si lo encontramos, sabemos que no se puede mejorar asintóticamente.",
    color: "#D97706",
  },
];

export function AsymptoticNotations() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {notations.map((n) => (
        <TermCard key={n.symbol} filename={n.filename}>
          <div className="flex items-baseline gap-3 mb-4">
            <span
              className="font-serif text-5xl leading-none"
              style={{ color: n.color }}
            >
              {n.symbol}
            </span>
            <div>
              <h3 className="font-serif text-xl text-ink">{n.name}</h3>
              <p className="font-mono text-xs text-ink-mute mt-0.5">
                {n.subtitle}
              </p>
            </div>
          </div>
          <p className="font-mono text-sm text-ink leading-relaxed mb-3 bg-subtle p-3 rounded border border-border-warm">
            {n.definition}
          </p>
          <p className="text-ink-soft text-sm leading-relaxed">
            <span className="text-amber font-mono">→</span> {n.intuition}
          </p>
        </TermCard>
      ))}
    </div>
  );
}