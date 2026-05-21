const orders = [
  { label: "O(1)", name: "Constante", example: "Acceder a v[i] en un vector", verdict: "óptimo", color: "#059669" },
  { label: "O(log n)", name: "Logarítmico", example: "Búsqueda binaria, AVL", verdict: "excelente", color: "#0891B2" },
  { label: "O(n)", name: "Lineal", example: "Recorrer una lista", verdict: "bueno", color: "#0284C7" },
  { label: "O(n log n)", name: "Linealítmico", example: "Mergesort, quicksort (avg)", verdict: "aceptable", color: "#D97706" },
  { label: "O(n²)", name: "Cuadrático", example: "Bucles anidados, bubblesort", verdict: "lento", color: "#EA580C" },
  { label: "O(nᵃ)", name: "Polinomial", example: "Triple bucle anidado", verdict: "muy lento", color: "#EA580C" },
  { label: "O(aⁿ)", name: "Exponencial", example: "Fibonacci recursivo ingenuo", verdict: "inviable", color: "#DC2626" },
  { label: "O(n!)", name: "Factorial", example: "Permutaciones, viajante (fuerza bruta)", verdict: "intratable", color: "#7C2D12" },
];

export function ComplexityOrders() {
  return (
    <div className="bg-card border border-border-warm rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-subtle border-b border-border-warm">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-mono text-xs text-ink-mute ml-2">orders_table.cpp</span>
      </div>
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
            {orders.map((o, i) => (
              <tr
                key={o.label}
                className={`border-b border-border-warm last:border-0 ${
                  i % 2 === 1 ? "bg-subtle/30" : ""
                }`}
              >
                <td className="px-5 py-3">
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-md font-mono text-sm font-medium"
                    style={{ color: o.color, backgroundColor: `${o.color}15` }}
                  >
                    {o.label}
                  </span>
                </td>
                <td className="px-5 py-3 text-ink">{o.name}</td>
                <td className="px-5 py-3 text-ink-soft text-sm">{o.example}</td>
                <td className="px-5 py-3 font-mono text-xs" style={{ color: o.color }}>
                  {o.verdict}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}