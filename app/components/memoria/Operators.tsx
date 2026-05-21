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
    what: "Sobrecargar el operador [] nos permite acceder a las posiciones del vector con la misma sintaxis que un array nativo: v[3] en lugar de v.leer(3). Devuelve una referencia, así que podemos usarlo para leer (x = v[3]) o para escribir (v[3] = 99). Este operador sustituye a las operaciones de lectura/escritura que teníamos antes.",
    why: "El código se vuelve mucho más natural de leer. Cualquiera que sepa C++ entiende qué hace v[i] sin necesidad de leer la documentación de la clase.",
    filename: "operator_brackets.cpp",
    code: `template<class T>
class Vector {
    T *mem;
    long int tam;
public:
    Vector(long int atam) { mem = new T[tam = atam]; }
    ~Vector() { delete[] mem; }

    // El operador [] sustituye a leer y escribir.
    // Devuelve una referencia: vale para ambas.
    T &operator[](int pos) { return mem[pos]; }

    bool operator==(Vector &arr);
    Vector &operator=(Vector &arr);
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
    why: "Si tu clase reserva memoria con new, casi siempre necesitas un operator= que haga una copia profunda: liberar lo que había, reservar memoria nueva y copiar los elementos uno a uno. Esto se conoce como la 'regla de los tres': si implementas el destructor, probablemente necesites también el operator= y el constructor copia.",
    warning:
      "Detalle importante: la comprobación 'if (&arr != this)' evita un caso patológico, v = v, en el que estaríamos liberando nuestra propia memoria justo antes de intentar copiar de ella.",
    filename: "operator_assign.cpp",
    code: `template<class T>
Vector<T>& Vector<T>::operator=(Vector &arr) {
    if (&arr != this) {
        delete[] mem;
        tam = arr.tam;
        mem = new T[tam];
        for (int c = 0; c < tam; c++) {
            mem[c] = arr.mem[c];
        }
    }
    return *this;
}`,
  },
  {
    id: "equals",
    badge: "03",
    title: "operator==",
    what: "Sobrecargar el operator == define qué significa que dos vectores sean iguales. La definición habitual: mismo tamaño y mismos elementos en las mismas posiciones. Si alguno falla, devolvemos false; si todo coincide, true. Es poco común definir este operador sobre un vector pero ilustra bien la idea.",
    why: "Sin esta sobrecarga, el == compararía punteros internos, no contenidos. Dos vectores con los mismos números darían false porque viven en zonas distintas del heap. Definir == permite que el código exprese qué quiere preguntar de verdad.",
    filename: "operator_equals.cpp",
    code: `template<class T>
bool Vector<T>::operator==(Vector &arr) {
    if (tam != arr.tam)
        return false;

    for (int c = 0; c < tam; c++) {
        if (mem[c] != arr.mem[c])
            return false;
    }
    return true;
}`,
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