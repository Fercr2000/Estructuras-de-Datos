import { SectionHeader } from "@/components/ui/SectionHeader";
import { TermCard } from "@/components/ui/TermCard";
import { TechList, TechItem } from "@/components/ui/TechList";
import { ClassificationGroup } from "@/components/fundamentos/ClassificationGroup";
import { AsymptoticNotations } from "@/components/fundamentos/AsymptoticNotations";
import { ComplexityChart } from "@/components/fundamentos/ComplexityChart";
import { ComplexityOrders } from "@/components/fundamentos/ComplexityOrders";
import { ComplexityCalculation } from "@/components/fundamentos/ComplexityCalculation";
import { CalculationGuide } from "@/components/fundamentos/CalculationGuide";
import { DropCap } from "@/components/ui/DropCap";
import { structures } from "@/lib/structures-registry";

const definiciones = [
  {
    term: "Estructura de datos",
    def: "Una forma particular de guardar y organizar la información en un ordenador de forma que pueda ser usada eficientemente. No es solo dónde se guardan los datos, sino cómo se organizan para que las operaciones que vamos a hacer sobre ellos sean rápidas.",
    tag: "data_structure.h",
  },
  {
    term: "Contenedor",
    def: "Una estructura de datos que sirve para guardar colecciones de otros objetos. Es el término que se usa habitualmente en C++ para referirse a vectores, listas, colas, etc.",
    tag: "container.h",
  },
  {
    term: "Tipo de dato abstracto (TDA)",
    def: "Un modelo matemático para una estructura de datos definido indirectamente por las operaciones que la manejan. Decimos qué se puede hacer con la estructura (insertar, buscar, eliminar), no cómo se hace por dentro.",
    tag: "adt.h",
  },
  {
    term: "Clase de objetos",
    def: "La representación de un TDA en un lenguaje orientado a objetos. En C++ una clase encapsula los datos (atributos privados) y las operaciones que se pueden hacer con ellos (métodos públicos): es la traducción directa de un TDA a código.",
    tag: "class.h",
  },
];

export default function FundamentosPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
      {/* Hero */}
      <div className="mb-16">
        <div className="font-mono text-sm text-ink-mute mb-3">
          <span className="text-amber">$</span> cd ~/fundamentos
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-tight mb-4">
          <DropCap text="Fundamentos" />
        </h1>
        <p className="text-ink-soft text-lg max-w-2xl leading-relaxed">
          Antes de estudiar cada estructura conviene fijar el vocabulario y las
          herramientas que vamos a usar todo el curso: qué es una estructura de
          datos, cómo se clasifican y cómo se mide su eficiencia.
        </p>
      </div>

      <hr className="divider-gradient mb-16" />

      {/* Definiciones */}
      <section className="mb-20">
        <SectionHeader
          comment="definiciones"
          title="Definiciones"
          subtitle="Cuatro conceptos afines que se entremezclan en cualquier texto sobre estructuras de datos. Conviene distinguirlos bien."
        />
        <div className="grid md:grid-cols-2 gap-4">
          {definiciones.map((d) => (
            <TermCard key={d.tag} filename={d.tag}>
              <h3 className="font-serif text-xl mb-3 text-ink">{d.term}</h3>
              <p className="text-ink-soft leading-relaxed">{d.def}</p>
            </TermCard>
          ))}
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Clasificación */}
      <section className="mb-20">
        <SectionHeader
          comment="clasificacion"
          title="Clasificación"
          subtitle="Las estructuras de datos se pueden clasificar de muchas maneras según el criterio que se mire. Estas cuatro clasificaciones son las más útiles a la hora de elegir una para un problema concreto."
        />
        <div className="grid lg:grid-cols-2 gap-4">
          <ClassificationGroup title="Tipo de acceso" comment="acceso" categories={[
            { label: "Acceso directo", structures: structures.filter(s => s.access === "directo") },
            { label: "Acceso secuencial", structures: structures.filter(s => s.access === "secuencial") },
            { label: "Acceso por clave", structures: structures.filter(s => s.access === "clave") },
          ]} />
          <ClassificationGroup title="Estructura interna" comment="estructura_interna" categories={[
            { label: "Lineales", structures: structures.filter(s => s.internal === "lineal") },
            { label: "No lineales", structures: structures.filter(s => s.internal === "no-lineal") },
          ]} />
          <ClassificationGroup title="Manejo de memoria" comment="memoria" categories={[
            { label: "Estáticas", structures: structures.filter(s => s.memory === "estatica") },
            { label: "Dinámicas", structures: structures.filter(s => s.memory === "dinamica") },
          ]} />
          <ClassificationGroup title="Dimensionalidad" comment="dimensionalidad" categories={[
            { label: "Unidimensionales", structures: structures.filter(s => s.dimensionality === "1d") },
            { label: "Multidimensionales", structures: structures.filter(s => s.dimensionality === "multi") },
          ]} />
        </div>

        {/* Notas explicativas debajo */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <TermCard filename="ubicacion.note">
            <h3 className="font-serif text-xl mb-3">Según su ubicación</h3>
            <p className="text-ink-soft leading-relaxed mb-3">
              También se pueden clasificar según dónde residen los datos:
            </p>
            <TechList>
              <TechItem bullet="→"><strong>En memoria</strong>: vectores, listas, pilas. Son las que vamos a estudiar.</TechItem>
              <TechItem bullet="→"><strong>En fichero</strong>: árboles B, ficheros dispersos. Se usan cuando los datos no caben en RAM.</TechItem>
              <TechItem bullet="→"><strong>Mixtas</strong>: índices simples o secundarios que combinan ambas.</TechItem>
            </TechList>
          </TermCard>
          <TermCard filename="por_que_clasificar.note">
            <h3 className="font-serif text-xl mb-3">¿Por qué clasificar?</h3>
            <p className="text-ink-soft leading-relaxed">
              No existe la estructura «mejor». Cada una se adapta bien a un tipo
              de problema y mal a otros. Saber qué propiedades tiene cada
              familia es lo que permite elegir la adecuada en cada caso, y eso
              es justo lo que se va a evaluar en el examen y en la práctica
              profesional.
            </p>
          </TermCard>
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Elegir la EEDD correcta */}
      <section className="mb-20">
        <SectionHeader
          comment="elegir"
          title="Elegir la estructura adecuada"
          subtitle="La elección de una estructura de datos depende del tipo de problema que vayamos a resolver. Estos son los dos grandes criterios que se aplican."
        />
        <div className="grid md:grid-cols-2 gap-4">
          <TermCard filename="busqueda.cpp">
            <h3 className="font-serif text-xl mb-3">Búsqueda eficiente</h3>
            <p className="text-ink-soft leading-relaxed mb-3">
              Cuando manejamos muchos datos y necesitamos localizar uno
              concreto rápidamente:
            </p>
            <TechList>
              <TechItem bullet="→">Si la búsqueda es <strong>por un solo campo</strong> (ej. ISBN de un libro): árboles AVL, tablas hash, EEDD en ficheros.</TechItem>
              <TechItem bullet="→">Si se busca <strong>por dos o más campos</strong> (ej. coordenadas geográficas): quadtree, mallas regulares.</TechItem>
            </TechList>
          </TermCard>
          <TermCard filename="acceso.cpp">
            <h3 className="font-serif text-xl mb-3">Acceso específico</h3>
            <p className="text-ink-soft leading-relaxed mb-3">
              Cuando el patrón de acceso a los datos sigue una regla concreta:
            </p>
            <TechList>
              <TechItem bullet="→">Si el dato buscado <strong>siempre está en la misma posición</strong> (el último insertado, el más prioritario...): pilas, colas, colas con prioridad.</TechItem>
              <TechItem bullet="→">Si el problema trata de <strong>caminos o relaciones</strong> entre elementos: grafos.</TechItem>
            </TechList>
          </TermCard>
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Por qué importa la eficiencia */}
      <section className="mb-20">
        <SectionHeader
          comment="por_que_importa"
          title="Por qué importa la eficiencia"
          subtitle="La biblioteca de una universidad tiene más de 30.000 libros. ¿Cómo los organizamos para localizar uno por su ISBN en el menor tiempo posible?"
        />
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <TermCard filename="opcion_a.cpp">
            <h3 className="font-serif text-xl mb-3">Array desordenado</h3>
            <p className="text-ink-soft leading-relaxed mb-3">
              Buscamos uno por uno hasta encontrar el libro. Con 30.000 libros,
              en el peor caso recorremos los 30.000.
            </p>
            <div className="font-mono text-sm bg-subtle border border-border-warm rounded px-3 py-2 text-ink">
              tiempo proporcional a <span className="text-amber-hover font-medium">n</span>
            </div>
          </TermCard>
          <TermCard filename="opcion_b.cpp">
            <h3 className="font-serif text-xl mb-3">Array ordenado</h3>
            <p className="text-ink-soft leading-relaxed mb-3">
              Con los libros ordenados por ISBN podemos usar búsqueda binaria:
              partir el array por la mitad cada vez. Encontramos cualquier
              libro en unos 15 accesos.
            </p>
            <div className="font-mono text-sm bg-subtle border border-border-warm rounded px-3 py-2 text-ink">
              tiempo proporcional a <span className="text-amber-hover font-medium">log₂ n</span>
            </div>
          </TermCard>
        </div>
        <div
          className="relative bg-card border border-border-warm rounded-lg p-5 overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "var(--gradient-amber)" }}
          />
          <p className="text-ink leading-relaxed">
            <strong>Pero hay un problema</strong>: si queremos{" "}
            <em>insertar</em> un libro nuevo manteniendo el orden, hay que
            desplazar todos los que van detrás. En el peor caso, n accesos.{" "}
            <strong>Ninguna de las dos soluciones es buena</strong> si hacemos
            búsquedas <em>e</em> inserciones a menudo. La estructura ideal aquí
            sería un contenedor por clave (árbol AVL o tabla hash) que permita
            ambas operaciones de forma eficiente.
          </p>
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Notaciones asintóticas */}
      <section className="mb-20">
        <SectionHeader
          comment="notaciones"
          title="Notaciones asintóticas"
          subtitle="El tiempo real que tarda un programa depende de la máquina, del compilador y de los datos concretos. Para hablar de eficiencia de forma independiente, se estudia cómo crece el tiempo cuando n se hace muy grande (tiende a infinito). Eso es la complejidad asintótica."
        />
        <AsymptoticNotations />
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <TermCard filename="por_que_asintotico.note">
            <h3 className="font-serif text-xl mb-3">¿Por qué «asintótico»?</h3>
            <p className="text-ink-soft leading-relaxed">
              Para entradas pequeñas, las constantes y los términos menores
              pueden dominar el tiempo real. Pero cuando n crece, el término de
              orden mayor aplasta a todo lo demás. Las notaciones O, Ω y Θ
              describen ese comportamiento «a lo grande», que es lo que
              realmente importa al diseñar un algoritmo.
            </p>
          </TermCard>
          <TermCard filename="cual_uso.note">
            <h3 className="font-serif text-xl mb-3">¿Cuál se usa más?</h3>
            <p className="text-ink-soft leading-relaxed">
              La notación O es la más habitual porque garantiza un techo: si un
              algoritmo es O(n²), sabemos que <em>nunca</em> tardará más que
              eso. Ω es útil cuando queremos asegurar que un algoritmo se
              comporta como mínimo de cierta forma. Θ es la más informativa pero
              también la más difícil de demostrar.
            </p>
          </TermCard>
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Gráfica interactiva */}
      <section className="mb-20">
        <SectionHeader
          comment="ordenes"
          title="Órdenes de crecimiento"
          subtitle="Las funciones de complejidad típicas, ordenadas de más rápida a más lenta. Activa o desactiva curvas, mueve el cursor y ajusta los rangos para sentir la diferencia: a partir de cierto tamaño, las diferencias entre órdenes son enormes."
        />
        <ComplexityChart />
        <div
          className="mt-6 relative bg-card border border-border-warm rounded-lg p-5 overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "var(--gradient-amber)" }}
          />
          <p className="text-ink leading-relaxed mb-3">
            En general se cumple esta jerarquía:
          </p>
          <div className="font-mono text-sm bg-subtle border border-border-warm rounded px-4 py-3 text-ink overflow-x-auto">
            O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(n³) &lt; O(2ⁿ) &lt; O(n!)
          </div>
          <p className="text-ink-soft leading-relaxed mt-3 text-sm">
            <strong>Pero ojo</strong>: no siempre la mejor solución asintótica
            es la más rápida para entradas pequeñas. Las constantes que
            ignoramos (las que están delante o sumadas) pueden importar cuando n
            es chico. Por eso un algoritmo se diseña pensando en cualquier n,
            pero al implementarlo conviene conocer también las constantes
            ocultas. Por ejemplo, para n=100 puede ocurrir que{" "}
            <span className="font-mono">5n &lt; 200·log n</span> aunque
            asintóticamente log n sea más rápido.
          </p>
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Tabla de órdenes */}
      <section className="mb-20">
        <SectionHeader
          comment="tabla_referencia"
          title="Tabla de referencia"
          subtitle="Los órdenes más habituales que aparecerán en cualquier análisis, con un ejemplo real para asociar cada complejidad a algo concreto."
        />
        <ComplexityOrders />
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Cálculo */}
      <section className="mb-20">
        <SectionHeader
          comment="calculo_paso_a_paso"
          title="Cálculo paso a paso"
          subtitle="La teoría se aplica a través de unas pocas reglas prácticas. Una vez interiorizadas, se calcula la complejidad de cualquier fragmento de código casi sin pensar."
        />
        <div className="space-y-12">
          <CalculationGuide />
          <div>
            <div className="font-mono text-xs text-amber mb-3">
              // ejemplos prácticos
            </div>
            <ComplexityCalculation />
          </div>
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      
    </main>
  );
}