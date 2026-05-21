const practices = [
  {
    number: "01",
    title: "Cada new tiene su delete",
    description:
      "Antes de escribir un new, ten claro quién va a liberar esa memoria y cuándo. Si pides memoria dentro de una función, libérala antes de salir o asegúrate de que alguien fuera lo hará.",
  },
  {
    number: "02",
    title: "delete vs delete[]",
    description:
      "Si reservaste con new (un solo elemento) usas delete. Si reservaste con new[] (un array) usas delete[]. Mezclarlos es comportamiento indefinido. El compilador no te avisa.",
  },
  {
    number: "03",
    title: "Inicializa los punteros",
    description:
      "Declarar 'int *p;' deja el puntero con basura. Usa 'int *p = nullptr;' para que al menos sea predeciblemente nulo. Antes de desreferenciar, comprueba que no es nullptr.",
  },
  {
    number: "04",
    title: "Tras delete, pon a nullptr",
    description:
      "Después de liberar memoria, asigna nullptr al puntero. Si por error alguien intenta usarlo o liberarlo otra vez, el comportamiento será seguro o el error será obvio.",
  },
  {
    number: "05",
    title: "Si tu clase reserva, también libera",
    description:
      "Si una clase usa new en su constructor o en algún método, su destructor debe liberar esa memoria. Plantéate también si necesitas implementar el constructor copia y el operator=.",
  },
  {
    number: "06",
    title: "Cuidado con los límites de los arrays",
    description:
      "C++ no comprueba si te sales del array. Revisa con cuidado los índices, sobre todo el operador del bucle: 'i < n' es seguro, 'i <= n' suele meterse una iteración de más.",
  },
];

export function BestPractices() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {practices.map((p) => (
        <div
          key={p.number}
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
              {p.number}
            </span>
            <h4 className="font-sans font-semibold text-ink">{p.title}</h4>
          </div>
          <p className="text-ink-soft text-sm leading-relaxed">{p.description}</p>
        </div>
      ))}
    </div>
  );
}