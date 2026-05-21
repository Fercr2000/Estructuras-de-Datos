import { TermBar } from "@/components/ui/TermBar";

const unaryOps = [
  { expr: "++a", signature: "A::operator++()", desc: "Incremento prefijo" },
  { expr: "a++", signature: "A::operator++(int)", desc: "Incremento postfijo" },
  { expr: "*a", signature: "A::operator*()", desc: "Desreferencia" },
  { expr: "!a", signature: "A::operator!()", desc: "Negación lógica" },
];

const binaryOps = [
  { expr: "a + b", signature: "A A::operator+(B&)", desc: "Suma, devuelve nuevo objeto" },
  { expr: "a += b", signature: "A& A::operator+=(B&)", desc: "Suma acumulada, devuelve referencia" },
  { expr: "a < b", signature: "bool A::operator<(B&)", desc: "Comparación menor que" },
  { expr: "a == b", signature: "bool A::operator==(B&)", desc: "Comparación igualdad" },
  { expr: "a[i]", signature: "T& A::operator[](int)", desc: "Indexación, devuelve referencia" },
  { expr: "a = b", signature: "A& A::operator=(A&)", desc: "Asignación, devuelve referencia" },
];

export function OperatorsCheatsheet() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-card border border-border-warm rounded-lg overflow-hidden">
        <TermBar filename="unarios.cpp" />
        <div className="p-5">
          <div className="font-mono text-xs text-amber mb-3">
            // operadores unarios (un solo operando)
          </div>
          <div className="space-y-2">
            {unaryOps.map((op) => (
              <div
                key={op.expr}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-2 border-b border-border-warm last:border-0"
              >
                <span className="font-mono text-sm text-amber-hover w-12 shrink-0">
                  {op.expr}
                </span>
                <span className="font-mono text-xs text-ink-soft flex-1">
                  {op.signature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-card border border-border-warm rounded-lg overflow-hidden">
        <TermBar filename="binarios.cpp" />
        <div className="p-5">
          <div className="font-mono text-xs text-amber mb-3">
            // operadores binarios (dos operandos)
          </div>
          <div className="space-y-2">
            {binaryOps.map((op) => (
              <div
                key={op.expr}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-2 border-b border-border-warm last:border-0"
              >
                <span className="font-mono text-sm text-amber-hover w-16 shrink-0">
                  {op.expr}
                </span>
                <span className="font-mono text-xs text-ink-soft flex-1">
                  {op.signature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}