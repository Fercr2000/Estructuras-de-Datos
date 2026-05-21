import { CppViewer } from "@/components/ui/CppViewer";

interface MemoryError {
  id: string;
  badge: string;
  title: string;
  whatIs: string;
  whyDangerous: string;
  howToAvoid: string;
  filename: string;
  code: string;
}

const errors: MemoryError[] = [
  {
    id: "overflow",
    badge: "01",
    title: "Acceso fuera de límites (heap overflow)",
    whatIs:
      "Reservas un array de N elementos y luego intentas leer o escribir en una posición que no existe: la N o la −1, por ejemplo. C++ no comprueba esto por ti.",
    whyDangerous:
      "Estás tocando memoria que pertenece a otra variable o a otro proceso. A veces no pasa nada visible, a veces el programa explota, y a veces (lo peor) corrompes datos silenciosamente y los problemas aparecen mucho más tarde, lejos del bug original.",
    howToAvoid:
      "Revisa siempre los índices de tus bucles. Si reservas con new int[3], los índices válidos son 0, 1 y 2. El bucle 'for (i = 0; i <= 3; i++)' escribe en arr[3], que está fuera. Cuidado especialmente con el operador <= que mete una iteración de más.",
    filename: "overflow.cpp",
    code: `int *arr = new int[3];

// ¡Bug! El operador <= recorre i = 0,1,2,3
// pero arr[3] no existe: solo hay arr[0..2]
for (int i = 0; i <= 3; i++)
    arr[i] = 0;          // ← arr[3]: fuera de límites

delete[] arr;`,
  },
  {
    id: "leak",
    badge: "02",
    title: "Fuga de memoria (memory leak)",
    whatIs:
      "Reservas memoria con new y nunca llamas a delete. La memoria queda ocupada hasta que el programa termina. El caso más típico: reasignas un puntero perdiendo la referencia a la memoria anterior.",
    whyDangerous:
      "No hace que el programa peté inmediatamente, pero si la fuga ocurre dentro de un bucle, tu programa va consumiendo más y más RAM hasta agotarla. En servidores que están encendidos durante semanas, una fuga pequeña acaba tumbando la máquina.",
    howToAvoid:
      "Regla mental: por cada new que escribas, prepárate para escribir su delete. Si una clase reserva memoria en su constructor, libérala en su destructor. Si reasignas un puntero, libera primero lo que apuntaba antes.",
    filename: "leak.cpp",
    code: `int *arr = new int;
*arr = 42;

// ¡Bug! Aquí perdemos la referencia
// al entero anterior: queda en el heap
// para siempre, sin nadie que lo libere
arr = new int[3];

delete[] arr;
// El primer 'new int' nunca se liberó.`,
  },
  {
    id: "nullptr",
    badge: "03",
    title: "Acceso a puntero nulo o sin inicializar",
    whatIs:
      "Intentas usar un puntero (con *p o p->algo) antes de haberle asignado una dirección válida, o después de haberlo puesto a nullptr.",
    whyDangerous:
      "El programa termina con un crash (segmentation fault). En el mejor de los casos, lo detectas en desarrollo. En el peor, ocurre en producción justo en el momento que un usuario hace una operación rara.",
    howToAvoid:
      "Inicializa todos los punteros al declararlos: 'int *p = nullptr;' es mejor que 'int *p;'. Antes de usarlo, comprueba que no es nullptr. Y nunca asumas que un puntero recibido como parámetro es válido.",
    filename: "nullptr.cpp",
    code: `int *arr;            // sin inicializar: basura
*arr = 3;            // ¡Crash! Dirección inválida

int *otro = nullptr;
*otro = 3;           // ¡Crash! No apunta a nada

// Lo correcto:
int *p = new int;
if (p != nullptr)
    *p = 3;
delete p;`,
  },
  {
    id: "double-free",
    badge: "04",
    title: "Doble liberación (double delete)",
    whatIs:
      "Llamas a delete sobre el mismo puntero dos veces. El primer delete devuelve la memoria al sistema; el segundo intenta devolver algo que ya no es tuyo.",
    whyDangerous:
      "Comportamiento indefinido: puede que el programa funcione, puede que pete inmediatamente, o puede que corrompa el heap interno y los siguientes new fallen sin razón aparente.",
    howToAvoid:
      "Después de hacer delete sobre un puntero, ponlo a nullptr. Hacer delete sobre nullptr es seguro (no hace nada), así que aunque pase por ahí dos veces el programa estará a salvo.",
    filename: "double_delete.cpp",
    code: `int *arr = new int;
*arr = 42;

delete arr;          // OK, devolvemos la memoria
delete arr;          // ¡Bug! Ya estaba liberada

// Patrón seguro:
int *p = new int;
*p = 42;
delete p;
p = nullptr;         // ahora delete p sería seguro`,
  },
];

export function MemoryErrors() {
  return (
    <div className="space-y-12">
      {errors.map((err) => (
        <div key={err.id} className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span
              className="font-mono text-xs px-2 py-0.5 rounded-md font-medium"
              style={{
                color: "#DC2626",
                backgroundColor: "#DC262615",
              }}
            >
              {err.badge}
            </span>
            <h3 className="font-serif text-2xl text-ink">{err.title}</h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="bg-card border border-border-warm rounded-lg p-4">
                <div className="font-mono text-xs text-amber mb-1">// qué es</div>
                <p className="text-ink-soft text-sm leading-relaxed">{err.whatIs}</p>
              </div>
              <div className="bg-card border border-border-warm rounded-lg p-4">
                <div
                  className="font-mono text-xs mb-1"
                  style={{ color: "#DC2626" }}
                >
                  // por qué es peligroso
                </div>
                <p className="text-ink-soft text-sm leading-relaxed">
                  {err.whyDangerous}
                </p>
              </div>
              <div className="bg-card border border-border-warm rounded-lg p-4">
                <div
                  className="font-mono text-xs mb-1"
                  style={{ color: "#059669" }}
                >
                  // cómo evitarlo
                </div>
                <p className="text-ink-soft text-sm leading-relaxed">
                  {err.howToAvoid}
                </p>
              </div>
            </div>
            <CppViewer filename={err.filename} code={err.code} />
          </div>
        </div>
      ))}
    </div>
  );
}