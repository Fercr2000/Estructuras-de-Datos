import { SectionHeader } from "@/components/ui/SectionHeader";
import { TermCard } from "@/components/ui/TermCard";
import { TechList, TechItem } from "@/components/ui/TechList";
import { ClassificationGroup } from "@/components/fundamentos/ClassificationGroup";
import { AsymptoticNotations } from "@/components/fundamentos/AsymptoticNotations";
import { ComplexityChart } from "@/components/fundamentos/ComplexityChart";
import { ComplexityOrders } from "@/components/fundamentos/ComplexityOrders";
import { ComplexityCalculation } from "@/components/fundamentos/ComplexityCalculation";
import { structures } from "@/lib/structures-registry";

const definiciones = [
  { term: "Estructura de datos", def: "Una forma particular de guardar y organizar la información en un ordenador de forma que pueda ser usada eficientemente.", tag: "data_structure.h" },
  { term: "Contenedor", def: "Una estructura de datos que sirve para guardar colecciones de otros objetos.", tag: "container.h" },
  { term: "Tipo de dato abstracto (TDA)", def: "Un modelo matemático para una estructura de datos definida indirectamente por las operaciones que la manejan.", tag: "adt.h" },
  { term: "Clase de objetos", def: "La representación de un TDA que se hace en un lenguaje orientado a objetos.", tag: "class.h" },
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
          Fundamentos
        </h1>
        <p className="text-ink-soft text-lg max-w-2xl leading-relaxed">
          Antes de implementar cada estructura, conviene fijar el vocabulario:
          qué es una EEDD, cómo se clasifican y cómo medimos su eficiencia.
        </p>
      </div>

      <hr className="divider-gradient mb-16" />

      {/* Definiciones */}
      <section className="mb-20">
        <SectionHeader
          comment="definitions"
          title="Definiciones"
          subtitle="Cuatro conceptos afines que aparecerán constantemente en el resto del temario."
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
          comment="classification"
          title="Clasificación"
          subtitle="Las EEDD pueden clasificarse según múltiples criterios. Las que tengan punto ámbar ya están implementadas; el resto se irán encendiendo conforme avancemos."
        />
        <div className="grid lg:grid-cols-2 gap-4">
          <ClassificationGroup title="Tipo de acceso" comment="access_type" categories={[
            { label: "Acceso directo", structures: structures.filter(s => s.access === "directo") },
            { label: "Acceso secuencial", structures: structures.filter(s => s.access === "secuencial") },
            { label: "Acceso por clave", structures: structures.filter(s => s.access === "clave") },
          ]} />
          <ClassificationGroup title="Estructura interna" comment="internal_structure" categories={[
            { label: "Lineales", structures: structures.filter(s => s.internal === "lineal") },
            { label: "No lineales", structures: structures.filter(s => s.internal === "no-lineal") },
          ]} />
          <ClassificationGroup title="Manejo de memoria" comment="memory_management" categories={[
            { label: "Estáticas", structures: structures.filter(s => s.memory === "estatica") },
            { label: "Dinámicas", structures: structures.filter(s => s.memory === "dinamica") },
          ]} />
          <ClassificationGroup title="Dimensionalidad" comment="dimensionality" categories={[
            { label: "Unidimensionales", structures: structures.filter(s => s.dimensionality === "1d") },
            { label: "Multidimensionales", structures: structures.filter(s => s.dimensionality === "multi") },
          ]} />
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Elegir la EEDD correcta */}
      <section className="mb-20">
        <SectionHeader
          comment="choosing_the_right_one"
          title="Elegir la EEDD correcta"
          subtitle="La elección de una estructura de datos depende del tipo de algoritmo que resuelve el problema."
        />
        <div className="grid md:grid-cols-2 gap-4">
          <TermCard filename="search.cpp">
            <h3 className="font-serif text-xl mb-3">Búsqueda eficiente</h3>
            <TechList>
              <TechItem bullet="→">Por un campo: <strong>árboles AVL, tablas hash, EEDD en ficheros</strong>.</TechItem>
              <TechItem bullet="→">Por dos o más campos: <strong>quadtree, mallas regulares</strong>.</TechItem>
            </TechList>
          </TermCard>
          <TermCard filename="access.cpp">
            <h3 className="font-serif text-xl mb-3">Acceso específico</h3>
            <TechList>
              <TechItem bullet="→">Dato siempre en misma posición: <strong>pilas, colas, colas con prioridad</strong>.</TechItem>
              <TechItem bullet="→">Problemas de caminos: <strong>grafos</strong>.</TechItem>
            </TechList>
          </TermCard>
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Notaciones asintóticas */}
      <section className="mb-20">
        <SectionHeader
          comment="asymptotic_notations"
          title="Notaciones asintóticas"
          subtitle="Para medir la eficiencia independientemente de la máquina o los datos concretos, comparamos cómo crece el tiempo de ejecución cuando n tiende a infinito."
        />
        <AsymptoticNotations />
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Gráfica interactiva */}
      <section className="mb-20">
        <SectionHeader
          comment="growth_rates"
          title="Órdenes de crecimiento"
          subtitle="Activa o desactiva curvas, mueve el cursor y ajusta los rangos para ver cómo se separan los distintos órdenes a medida que n crece."
        />
        <ComplexityChart />
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Tabla de órdenes */}
      <section className="mb-20">
        <SectionHeader
          comment="reference_table"
          title="Tabla de referencia"
          subtitle="Los órdenes más habituales que verás en cualquier análisis, con un ejemplo real de cada uno."
        />
        <ComplexityOrders />
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Cálculo */}
      <section className="mb-20">
        <SectionHeader
          comment="how_to_calculate"
          title="Cálculo paso a paso"
          subtitle="Tres patrones típicos: ramificación con if/else, bucles anidados y recursión divide-y-vencerás."
        />
        <ComplexityCalculation />
      </section>
    </main>
  );
}