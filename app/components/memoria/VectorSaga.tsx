"use client";

import { useState } from "react";
import { CppViewer } from "@/components/ui/CppViewer";
import { ProsCallout } from "@/components/ui/ProsCallout";
import { ConsCallout } from "@/components/ui/ConsCallout";

interface VectorVersion {
  id: string;
  label: string;
  badge: string;
  badgeColor: string;
  title: string;
  intro: string;
  filename: string;
  code: string;
  usageFilename: string;
  usageCode: string;
  pros: string[];
  cons: string[];
  conclusion: string;
}

const versions: VectorVersion[] = [
  {
    id: "int",
    label: "VectorInt",
    badge: "01",
    badgeColor: "#0284C7",
    title: "Vector solo para enteros",
    intro:
      "Empecemos por el caso más simple: una clase que envuelve un array de enteros en memoria dinámica. Internamente guarda un puntero al bloque y su tamaño. El constructor reserva memoria, el destructor la libera, y dos métodos leen y escriben en posiciones concretas. Funciona perfectamente... siempre que solo quieras almacenar enteros.",
    filename: "VectorInt.h",
    code: `class VectorInt {
    int *mem;
    long int tam;

public:
    VectorInt(long int atam) { mem = new int[tam = atam]; }
    ~VectorInt() { delete[] mem; }

    int leer(long int pos) { return mem[pos]; }
    void escribir(long int pos, const int &valor) {
        mem[pos] = valor;
    }
};`,
    usageFilename: "uso_int.cpp",
    usageCode: `VectorInt arr(100);
for (int c = 0; c < 100; c++)
    arr.escribir(c, 0);

VectorInt arr2(50);
for (int c = 0; c < 50; c++)
    arr2.escribir(c, arr.leer(c));`,
    pros: [
      "Sencillo de leer y entender.",
      "El destructor libera automáticamente la memoria del heap cuando el objeto desaparece.",
    ],
    cons: [
      "Solo sirve para enteros. Si queremos almacenar floats, hay que duplicar toda la clase.",
    ],
    conclusion:
      "Funciona, pero la limitación está clara: solo enteros. Si necesitamos otro tipo, ¿qué hacemos?",
  },
  {
    id: "float",
    label: "VectorFloat",
    badge: "02",
    badgeColor: "#0891B2",
    title: "...y otro vector para flotantes",
    intro:
      "Como nuestra clase solo sirve para enteros, hacemos otra prácticamente idéntica pero con floats. El problema salta a la vista: es exactamente el mismo código cambiando 'int' por 'float'. Y si mañana queremos un vector de cadenas o de objetos personalizados, tendríamos que duplicarlo otra vez. Y otra. Y otra.",
    filename: "VectorFloat.h",
    code: `class VectorFloat {
    float *mem;
    long int tam;

public:
    VectorFloat(long int atam) { mem = new float[tam = atam]; }
    ~VectorFloat() { delete[] mem; }

    float leer(long int pos) { return mem[pos]; }
    void escribir(long int pos, const float &valor) {
        mem[pos] = valor;
    }
};`,
    usageFilename: "uso_float.cpp",
    usageCode: `VectorFloat arr(100);
arr.escribir(0, 3.14);
arr.escribir(1, 2.71);

float x = arr.leer(0);
// x vale 3.14

// Pero... ¿qué hago si ahora
// quiero un vector de strings?
// ¿Y de mis propios objetos?
// ¿Una clase para cada tipo?`,
    pros: ["Funciona para floats."],
    cons: [
      "Duplicación masiva: el código es idéntico salvo el tipo.",
      "Si arreglamos un bug en una versión, hay que repetirlo en todas las demás.",
      "Mantener N clases prácticamente idénticas es una pesadilla.",
    ],
    conclusion:
      "Es evidente que duplicar la clase para cada tipo no es la respuesta. Tiene que haber algo mejor.",
  },
  {
    id: "void",
    label: "Vector con void*",
    badge: "03",
    badgeColor: "#EA580C",
    title: "Quitar el tipo del todo (void*)",
    intro:
      "Primer intento de solución: que el vector no use ningún tipo concreto. Internamente guardamos un puntero a void (sin tipo) y el tamaño en bytes de cada elemento. Para leer y escribir copiamos bloques de memoria con memcpy. Funciona... pero el uso resulta horrible: hay que pasar punteros y tamaños manualmente, perdemos toda la seguridad de tipos y debemos hacer castings constantemente.",
    filename: "Vector.h",
    code: `class Vector {
    void *mem;
    long int tam;
    long int tamdato;

public:
    Vector(long int atam, long int atamdato);
    ~Vector() { delete[] mem; }

    void leer(long int pos, void *dato) {
        memcpy(dato, mem + tamdato * pos, tamdato);
    }
    void escribir(long int pos, const void *dato) {
        memcpy(mem + tamdato * pos, dato, tamdato);
    }
};

// Constructor definido fuera de la clase
Vector::Vector(long int atam, long int atamdato) {
    tam = atam;
    tamdato = atamdato;
    mem = new char[tamdato * tam];
}`,
    usageFilename: "uso_void.cpp",
    usageCode: `int main() {
    Vector ai(10, sizeof(int));
    Vector af(25, sizeof(float));
    int itmp = 5;
    float ftmp = 2.3;

    ai.escribir(3, &itmp);
    af.escribir(7, &ftmp);

    ai.leer(3, &itmp);
    af.leer(7, &ftmp);

    return 0;
}`,
    pros: ["Una sola clase para cualquier tipo de dato."],
    cons: [
      "Sintaxis tediosa: hay que pasar punteros y sizeof a todo.",
      "Sin comprobación de tipos: el compilador no avisa si metes la pata.",
      "Errores que solo aparecen en ejecución (y a veces ni eso: corrupción silenciosa).",
      "Implementar y usar este tipo de clases es tedioso y propenso a errores.",
    ],
    conclusion:
      "Funciona pero es horrible de usar. Tiene que haber una forma de tener una sola clase reutilizable manteniendo la seguridad de tipos.",
  },
  {
    id: "template",
    label: "Vector<T>",
    badge: "04",
    badgeColor: "#059669",
    title: "La solución elegante: templates",
    intro:
      "C++ tiene un mecanismo diseñado exactamente para esto: los templates (patrones, en castellano). Le decimos al compilador 'esta clase usa un tipo T que se decidirá más tarde'. Cuando alguien escribe Vector<int>, el compilador genera automáticamente una versión específica para int. Cuando alguien escribe Vector<float>, genera otra para float. Una sola plantilla, infinitas versiones especializadas, comprobación estricta de tipos, sin duplicar nada.",
    filename: "Vector.h",
    code: `template<class T>
class Vector {
    T *mem;
    long int tam;

public:
    Vector(long int atam) { mem = new T[tam = atam]; }
    ~Vector() { delete[] mem; }

    T leer(long int pos) { return mem[pos]; }
    void escribir(long int pos, const T &valor) {
        mem[pos] = valor;
    }
};`,
    usageFilename: "uso_template.cpp",
    usageCode: `int main() {
    Vector<int> ai(10);
    Vector<float> af(25);

    ai.escribir(3, 5);
    af.escribir(7, 2.3);

    cout << ai.leer(3) << " "
         << af.leer(7) << endl;

    return 0;
}`,
    pros: [
      "Una sola clase reutilizable para cualquier tipo.",
      "Comprobación de tipos estricta en tiempo de compilación.",
      "Funciona con tipos simples (int, float, char) y con clases.",
      "Sintaxis de uso natural y elegante.",
    ],
    cons: [
      "El código del template tiene que ir entero en el fichero de cabecera (.h).",
      "Los mensajes de error de compilación pueden ser largos y enrevesados.",
    ],
    conclusion:
      "Esta es la solución correcta y la que vamos a usar a partir de aquí en todas las estructuras de datos. Los templates son una de las herramientas más potentes de C++.",
  },
];

export function VectorSaga() {
  const [activeIdx, setActiveIdx] = useState(0);
  const v = versions[activeIdx];

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-6 border-b border-border-warm pb-3">
        {versions.map((version, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={version.id}
              onClick={() => setActiveIdx(i)}
              className={`px-3.5 py-1.5 rounded-md font-mono text-xs transition-all border ${
                isActive
                  ? "bg-gradient-amber-soft border-amber-light text-amber-hover"
                  : "bg-card border-border-warm text-ink-soft hover:text-amber-hover hover:border-amber-light"
              }`}
            >
              <span className="text-amber-hover mr-1.5">{version.badge}</span>
              {version.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-5">
        <div className="flex items-baseline gap-3">
          <span
            className="font-mono text-xs px-2 py-0.5 rounded-md font-medium"
            style={{
              color: v.badgeColor,
              backgroundColor: `${v.badgeColor}15`,
            }}
          >
            {v.badge}
          </span>
          <h3 className="font-serif text-2xl text-ink">{v.title}</h3>
        </div>

        <p className="text-ink-soft leading-relaxed">{v.intro}</p>

        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <div className="font-mono text-xs text-amber mb-2">// declaración</div>
            <CppViewer filename={v.filename} code={v.code} />
          </div>
          <div>
            <div className="font-mono text-xs text-amber mb-2">// cómo se usa</div>
            <CppViewer filename={v.usageFilename} code={v.usageCode} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3 pt-2">
          <ProsCallout items={v.pros} />
          <ConsCallout items={v.cons} />
        </div>

        <div className="relative bg-card border border-border-warm rounded-lg p-5 overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "var(--gradient-amber)" }}
          />
          <div className="font-mono text-xs text-amber mb-2">
            // conclusión de este paso
          </div>
          <p className="text-ink leading-relaxed text-sm">{v.conclusion}</p>
        </div>
      </div>
    </div>
  );
}