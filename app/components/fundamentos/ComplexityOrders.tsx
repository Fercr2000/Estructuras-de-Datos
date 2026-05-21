import { TermBar } from "@/components/ui/TermBar";
import { ComplexityBadge } from "@/components/ui/ComplexityBadge";
import { getComplexityColor } from "@/lib/complexity-colors";

const orders = [
  { label: "O(1)", name: "Constante", example: "Acceder a v[i] en un vector", verdict: "óptimo" },
  { label: "O(log n)", name: "Logarítmico", example: "Búsqueda binaria, AVL", verdict: "excelente" },
  { label: "O(n)", name: "Lineal", example: "Recorrer una lista", verdict: "bueno" },
  { label: "O(n log n)", name: "Linealítmico", example: "Mergesort, quicksort (avg)", verdict: "aceptable" },
  { label: "O(n²)", name: "Cuadrático", example: "Bucles anidados, bubblesort", verdict: "lento" },
  { label: "O(nᵃ)", name: "Polinomial", example: "Triple bucle anidado", verdict: "muy lento" },
  { label: "O(aⁿ)", name: "Exponencial", example: "Fibonacci recursivo ingenuo", verdict: "inviable" },
  { label: "O(n!)", name: "Factorial", example: "Permutaciones, viajante (fuerza bruta)", verdict: "intratable" },
];

export function ComplexityOrders() {
  return (
    <div className="bg-card border border-border-warm rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <TermBar filename="orders_table.cpp" />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-warm bg-subtle/50">
              <th className="text-left px-5 py-3 font-mono text-xs text-ink-mute font-medium">orden</th>
              <th className="text-left px-5 py-3 font-mono text-xs text-ink-mute font-medium">nombre</th>
              <th className="text-left px-5 py-3 font-mono text-xs text-ink-mute font-medium">ejemplo real</th>
              <th className="text-left px-5 py-3 font-mono text-xs text-ink-mute font-medium">veredicto</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => {
              const { color } = getComplexityColor(o.label);
              return (
                <tr
                  key={o.label}
                  className={`border-b border-border-warm last:border-0 ${
                    i % 2 === 1 ? "bg-subtle/30" : ""
                  }`}
                >
                  <td className="px-5 py-3">
                    <ComplexityBadge label={o.label} size="md" />
                  </td>
                  <td className="px-5 py-3 text-ink">{o.name}</td>
                  <td className="px-5 py-3 text-ink-soft text-sm">{o.example}</td>
                  <td className="px-5 py-3 font-mono text-xs" style={{ color }}>
                    {o.verdict}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}