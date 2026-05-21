const rules = [
  {
    number: "01",
    title: "Identifica qué crece",
    description:
      "n es el tamaño de la entrada: número de elementos del vector, nodos del árbol, libros de la biblioteca... Es la variable de la que dependerá el tiempo.",
    example: "for (i = 0; i < n; i++)   // aquí n es lo que crece",
  },
  {
    number: "02",
    title: "Cuenta operaciones, no líneas",
    description:
      "Una asignación, una comparación, un acceso a memoria o un return cuentan como 1 operación. No nos interesa el tiempo en segundos, sino cuántas operaciones hay en función de n.",
    example: "x = a + b;   // 1 operación → O(1)",
  },
  {
    number: "03",
    title: "Los bucles multiplican",
    description:
      "Un bucle de 0 a n ejecuta su contenido n veces. Si dentro hay otro bucle, los costes se multiplican. Es la regla más útil para identificar O(n) y O(n²) de un vistazo.",
    example: "for n veces { for n veces { ... } }   →   n · n = n²",
  },
  {
    number: "04",
    title: "Bloques en secuencia: gana el peor",
    description:
      "Si tu código tiene un trozo O(n) seguido de uno O(n²), el total es O(n²). Cuando n se hace grande, el término mayor aplasta al menor: el pequeño se vuelve irrelevante.",
    example: "O(n) + O(n²)   →   O(n²)",
  },
  {
    number: "05",
    title: "Tira constantes y términos menores",
    description:
      "5n², 100n² y n² son todos O(n²): la constante delante no cambia cómo crece la función. Lo mismo con los términos menores: 3n² + 7n + 42 se queda en O(n²).",
    example: "3n² + 7n + 42   →   O(n²)",
  },
  {
    number: "06",
    title: "Recursión: plantea una recurrencia",
    description:
      "Si una función se llama a sí misma con un subproblema más pequeño, escribe T(n) = (coste de combinar) + (llamadas recursivas) y resuélvela. El patrón más típico es dividir entre 2.",
    example: "T(n) = 2 · T(n/2) + n   →   O(n log n)",
  },
];

export function CalculationGuide() {
  return (
    <div className="space-y-6">
      {/* Idea general */}
      <div
        className="relative bg-card border border-border-warm rounded-lg p-5 overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "var(--gradient-amber)" }}
        />
        <div className="font-mono text-xs text-amber mb-2">// idea_general</div>
        <p className="text-ink leading-relaxed">
          Calcular la complejidad de un algoritmo es{" "}
          <strong className="text-ink">
            contar cuántas operaciones hace en función de n
          </strong>{" "}
          y quedarnos con el término que más crece cuando n se hace grande. No
          buscamos el número exacto de operaciones: buscamos la{" "}
          <em>forma</em> en que crecen. Por eso da igual si nuestro código tarda{" "}
          <span className="font-mono text-sm">5n</span> o{" "}
          <span className="font-mono text-sm">100n</span> operaciones: ambos son{" "}
          <span className="font-mono text-sm text-amber-hover">O(n)</span>.
        </p>
      </div>

      {/* Reglas */}
      <div className="grid md:grid-cols-2 gap-4">
        {rules.map((r) => (
          <div
            key={r.number}
            className="relative bg-card border border-border-warm rounded-lg p-5 overflow-hidden hover:shadow-[0_4px_12px_rgba(217,119,6,0.08)] hover:-translate-y-0.5 transition-all"
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "var(--gradient-line)" }}
            />
            <div className="flex items-baseline gap-3 mb-2">
              <span
                className="font-serif text-3xl leading-none text-gradient-amber"
                style={{ fontWeight: 500 }}
              >
                {r.number}
              </span>
              <h4 className="font-sans font-semibold text-ink">{r.title}</h4>
            </div>
            <p className="text-ink-soft text-sm leading-relaxed mb-3">
              {r.description}
            </p>
            <div className="font-mono text-xs bg-subtle border border-border-warm rounded px-3 py-2 text-ink">
              {r.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}