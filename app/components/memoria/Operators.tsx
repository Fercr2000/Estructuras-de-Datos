import { CppViewer } from "@/components/ui/CppViewer";

interface OperatorExample {
  id: string;
  badge: string;
  title: string;
  what: string;
  why: string;
  warning?: string;
  filename: string;
  code: string;
}

const operators: OperatorExample[] = [
  {
    id: "bracket",
    badge: "01",
    title: "operator[]",
    what: "Sobrecargar el operador [] nos permite acceder a las posiciones del vector con la misma sintaxis que un array nativo: v[3] en lugar de v.leer(3). Devuelve una referencia, así que podemos usarlo para leer (x = v[3]) o para escribir (v[3] = 99).",
    why: "El código se vuelve mucho más natural de leer. Cualquiera que sepa C++ entiende qué hace v[i] sin necesitar leer la documentación de la clase.",
    filename: "operator_brackets.cpp",
    code: `template<class T>
class Vector {
    T *mem;
    long int tam;
public:
    // ... constructor y destructor

    // Devuelve una referencia: vale
    // tanto para leer como para escribir
    T &operator[](int pos) {
        return mem[pos];
    }
};

// Uso:
Vector<int> v(10);
v[3] = 5;          // escribir
int x = v[3];      // leer
cout << v[3];      // imprimir`,
  },
  {
    id: "assign",
    badge: "02",
    title: "operator= (el más importante)",
    what: "Sobrecargar el operador = controla qué pasa cuando escribimos v1 = v2. Si no lo definimos, C++ copia campo a campo, lo que significa que ambos vectores apuntarían al mismo bloque de memoria. Cuando uno se destruya y libere ese bloque, el otro quedará apuntando a memoria liberada: bomba de relojería.",
    why: "Si tu clase reserva memoria con new, casi siempre necesitas un operador= que haga una copia profunda: liberar lo que había, reservar memoria nueva, y copiar los elementos uno a uno. Esto se conoce como la 'regla de los tres': si implementas el destructor, probablemente necesites también el operador= y el constructor copia.",
    warning:
      "Detalle importante: la comprobación 'if (&arr != this)' evita un caso patológico, v = v, en el que estaríamos liberando nuestra propia memoria justo antes de intentar copiar de ella.",
    filename: "operator_assign.cpp",
    code: `template<class T>
Vector<T>& Vector<T>::operator=(Vector &arr) {
    // Protección contra auto-asignación
    if (&arr != this) {
        // 1. Liberar la memoria actual
        delete[] mem;

        // 2. Reservar memoria nueva
        tam = arr.tam;
        mem = new T[tam];

        // 3. Copiar los elementos uno a uno
        for (int c = 0; c < tam; c++) {
            mem[c] = arr.mem[c];
        }
    }
    // Devolver *this permite encadenar:
    // v1 = v2 = v3;
    return *this;
}`,
  },
  {
    id: "equals",
    badge: "03",
    title: "operator==",
    what: "Sobrecargar el operador == define qué significa que dos vectores sean iguales. La definición habitual: mismo tamaño y mismos elementos en las mismas posiciones. Si alguno falla, devolvemos false; si todo coincide, true.",
    why: "Sin esta sobrecarga, el == compararía punteros internos, no contenidos. Dos vectores con los mismos números darían false porque viven en zonas distintas del heap. Definir == permite que el código exprese qué quiere preguntar de verdad.",
    filename: "operator_equals.cpp",
    code: `template<class T>
bool Vector<T>::operator==(Vector &arr) {
    // Si los tamaños no coinciden,
    // no pueden ser iguales
    if (tam != arr.tam)
        return false;

    // Comparar elemento a elemento
    for (int c = 0; c < tam; c++) {
        if (mem[c] != arr.mem[c])
            return false;
    }

    // Todos iguales: son el mismo vector
    return true;
}

// Uso:
if (v1 == v2)
    cout << "iguales" << endl;`,
  },
];

export function Operators() {
  return (
    <div className="space-y-12">
      {operators.map((op) => (
        <div key={op.id} className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span
              className="font-mono text-xs px-2 py-0.5 rounded-md font-medium"
              style={{
                color: "#D97706",
                backgroundColor: "#D9770615",
              }}
            >
              {op.badge}
            </span>
            <h3 className="font-serif text-2xl text-ink">{op.title}</h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="bg-card border border-border-warm rounded-lg p-4">
                <div className="font-mono text-xs text-amber mb-1">// qué hace</div>
                <p className="text-ink-soft text-sm leading-relaxed">{op.what}</p>
              </div>
              <div className="bg-card border border-border-warm rounded-lg p-4">
                <div className="font-mono text-xs text-amber mb-1">
                  // por qué nos interesa
                </div>
                <p className="text-ink-soft text-sm leading-relaxed">{op.why}</p>
              </div>
              {op.warning && (
                <div className="relative bg-card border border-border-warm rounded-lg p-4 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: "var(--gradient-amber)" }}
                  />
                  <div
                    className="font-mono text-xs mb-1"
                    style={{ color: "#D97706" }}
                  >
                    // ojo con esto
                  </div>
                  <p className="text-ink-soft text-sm leading-relaxed">
                    {op.warning}
                  </p>
                </div>
              )}
            </div>
            <CppViewer filename={op.filename} code={op.code} />
          </div>
        </div>
      ))}
    </div>
  );
}