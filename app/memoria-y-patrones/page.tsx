import { SectionHeader } from "@/components/ui/SectionHeader";
import { DropCap } from "@/components/ui/DropCap";
import { MemoryMap } from "@/components/memoria/MemoryMap";
import { MemoryTypeCard } from "@/components/memoria/MemoryTypeCard";
import { PointerWalkthrough } from "@/components/memoria/PointerWalkthrough";
import { MemoryErrors } from "@/components/memoria/MemoryErrors";
import { BestPractices } from "@/components/memoria/BestPractices";
import { VectorSaga } from "@/components/memoria/VectorSaga";
import { TemplateExplained } from "@/components/memoria/TemplateExplained";
import { Operators } from "@/components/memoria/Operators";
import { OperatorsCheatsheet } from "@/components/memoria/OperatorsCheatsheet";

const estaticaCode = `// Variables globales y constantes
const float PI = 3.1416;
char fichero[] = "datos.txt";

// El compilador les reserva sitio
// antes de que el programa arranque.
// Existen mientras el programa vive.`;

const automaticaCode = `// Variables locales: nacen al entrar
// en la función y mueren al salir
void f(int k) {
    int p;            // se reserva en la pila
    float arr[3];     // también
    // ...
}   // ← aquí desaparecen, sin tocar nada`;

const dinamicaCode = `// Reserva manual con 'new'
float *f = new float;
int *arr = new int[3];

// Asignamos valores accediendo
// a la memoria reservada
*f = 3.1415;
arr[0] = 3;
arr[1] = 2;
arr[2] = 5;

// Liberación manual con 'delete'
// (¡delete[] para los arrays!)
delete f;
delete[] arr;`;

export default function MemoriaPatronesPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
      {/* Hero */}
      <div className="mb-16">
        <div className="font-mono text-sm text-ink-mute mb-3">
          <span className="text-amber">$</span> cd ~/memoria-y-patrones
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-tight mb-4">
          <DropCap text="Memoria y patrones" />
        </h1>
        <p className="text-ink-soft text-lg max-w-2xl leading-relaxed">
          Antes de implementar la primera estructura toca dominar tres
          herramientas de C++ que vamos a usar constantemente: cómo gestionar la
          memoria, cómo escribir clases parametrizadas con templates y cómo
          sobrecargar operadores para que el código sea natural de leer.
        </p>
      </div>

      <hr className="divider-gradient mb-16" />

      {/* Por qué importa */}
      <section className="mb-20">
        <SectionHeader
          comment="por_que_importa"
          title="Por qué importa la memoria"
          subtitle="Una estructura de datos no sabe de antemano cuántos elementos va a tener: una lista puede crecer mientras el programa funciona. Eso obliga a pedir memoria al sistema sobre la marcha y a devolverla cuando ya no haga falta. Si entiendes bien cómo funciona ese proceso, escribir estructuras será mucho más sencillo."
        />
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative bg-card border border-border-warm rounded-lg p-6 overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "var(--gradient-amber)" }}
            />
            <h3 className="font-serif text-xl mb-3">La idea en una frase</h3>
            <p className="text-ink-soft leading-relaxed">
              Tu programa tiene varias <strong>zonas</strong> en las que puede
              guardar datos. Cada zona se comporta de una forma distinta: una se
              gestiona sola, otra es muy rápida pero pequeña, y otra es enorme
              pero te toca a ti gestionarla a mano. Saber en qué zona estás
              trabajando en cada momento es la mitad del trabajo.
            </p>
          </div>
          <div className="relative bg-card border border-border-warm rounded-lg p-6 overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "var(--gradient-amber)" }}
            />
            <h3 className="font-serif text-xl mb-3">Por qué C++ y no otros</h3>
            <p className="text-ink-soft leading-relaxed">
              Lenguajes como Java o Python esconden la memoria con un{" "}
              <em>garbage collector</em>. C++ te la deja al descubierto. Eso es
              más exigente pero también más educativo: cuando entiendes lo que
              pasa en C++, entiendes lo que el resto de lenguajes hacen por
              dentro sin contártelo.
            </p>
          </div>
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Tipos de asignación */}
      <section className="mb-20">
        <SectionHeader
          comment="tipos_de_memoria"
          title="Los tres tipos de memoria"
          subtitle="Tu programa tiene tres formas distintas de reservar espacio para datos. Cada una vive en una zona del proceso, se comporta de una manera y sirve para cosas distintas. Vamos a verlas con calma porque son la base de todo lo demás."
        />
        <div className="space-y-12">
          <MemoryTypeCard
            badge="01"
            badgeColor="#D97706"
            title="Asignación estática"
            description="Es la más sencilla: el compilador (no el programa) reserva el sitio mucho antes de que el programa empiece a ejecutarse. Sirve para cosas que existen desde el principio hasta el final: el valor de pi, una cadena con el nombre de un archivo, una constante de configuración. Como están ahí desde el primer microsegundo, no hay que pedirlas ni liberarlas: ya están."
            filename="estatica.cpp"
            code={estaticaCode}
            pros={[
              "No tiene coste en tiempo de ejecución: el espacio ya está cuando arranca el programa.",
              "Imposible olvidarse de liberarla porque tampoco se asigna en tiempo de ejecución.",
            ]}
            cons={[
              "Tamaño fijo desde el momento de compilar: no se puede pedir más después.",
              "Apenas se usa en estructuras de datos, que casi siempre necesitan crecer.",
            ]}
          />
          <MemoryTypeCard
            badge="02"
            badgeColor="#0284C7"
            title="Asignación automática (pila)"
            description="Cuando entras en una función, todas sus variables locales y sus parámetros se reservan en una zona llamada pila o stack. La idea es muy intuitiva: como en una pila de platos, lo último que se mete es lo primero que se saca. Al salir de la función, todas sus variables se quitan automáticamente. Tú no tienes que hacer nada: el lenguaje se encarga. Por eso se llama automática."
            filename="pila.cpp"
            code={automaticaCode}
            pros={[
              "Súper rápida: el programa solo mueve un puntero interno para reservar o liberar.",
              "Liberación automática al salir del bloque: imposible filtrar memoria por descuido.",
            ]}
            cons={[
              "Tamaño total limitado (suelen ser unos pocos MB que fija el compilador).",
              "Si reservas demasiadas variables o demasiado grandes: stack overflow y el programa muere.",
              "La memoria desaparece al salir de la función: no sirve para datos que deban sobrevivir.",
            ]}
          />
          <MemoryTypeCard
            badge="03"
            badgeColor="#059669"
            title="Asignación dinámica (heap)"
            description="Aquí es donde se pone interesante. El heap es una zona enorme de memoria libre. Cuando escribes 'new', le pides al sistema un trozo de ese heap del tamaño que necesites. El sistema te devuelve la dirección donde te lo ha dado y tú la guardas en un puntero. Cuando ya no lo necesitas, escribes 'delete' y le devuelves ese trozo al sistema. La pega: si te olvidas de devolverlo, esa memoria queda ocupada para siempre (hasta que cierres el programa). Esto es lo que se llama fuga de memoria."
            filename="heap.cpp"
            code={dinamicaCode}
            pros={[
              "Tamaño prácticamente ilimitado: puede usar casi toda la RAM disponible.",
              "Vida útil controlada por ti: la memoria dura lo que tú decidas.",
              "Imprescindible para estructuras de tamaño variable: listas, árboles, grafos.",
            ]}
            cons={[
              "Asignar y liberar es más lento que en la pila (hay que buscar un hueco disponible).",
              "Tú eres responsable de liberarla. Si te olvidas, hay fuga.",
              "Si accedes mal (fuera de límites, doble delete, puntero nulo) el programa peta.",
            ]}
          />
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Mapa de memoria interactivo */}
      <section className="mb-20">
        <SectionHeader
          comment="mapa_de_memoria"
          title="Mapa de memoria interactivo"
          subtitle="Esta es la disposición real de la memoria de un proceso, dividida en sus tres zonas. Pulsa las acciones de la derecha en el orden que quieras y observa qué pasa en cada zona. Las acciones se acumulan, así que puedes simular un programa entero paso a paso."
        />
        <MemoryMap />
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="relative bg-card border border-border-warm rounded-lg p-5 overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "var(--gradient-amber)" }}
            />
            <h3 className="font-serif text-xl mb-2">Prueba a hacer esto</h3>
            <p className="text-ink-soft leading-relaxed text-sm">
              Pulsa <em>Declarar globales</em>, después{" "}
              <em>Entrar en f(int k)</em>, luego los dos <em>new</em>, y
              finalmente <em>Salir de f()</em> sin haber liberado nada. Verás
              que los punteros desaparecen de la pila pero los datos siguen
              vivos en el heap, ¡sin nadie que los apunte! Eso es exactamente
              una fuga de memoria.
            </p>
          </div>
          <div className="relative bg-card border border-border-warm rounded-lg p-5 overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "var(--gradient-amber)" }}
            />
            <h3 className="font-serif text-xl mb-2">Qué deberías recordar</h3>
            <p className="text-ink-soft leading-relaxed text-sm">
              La pila se gestiona sola: entras, salen, todo limpio. El heap{" "}
              <strong>no</strong>: cada{" "}
              <span className="font-mono text-sm">new</span> que escribas debe
              tener su <span className="font-mono text-sm">delete</span>{" "}
              correspondiente en algún momento, o esa memoria se pierde hasta
              que el programa termine.
            </p>
          </div>
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Punteros desde cero */}
      <section className="mb-20">
        <SectionHeader
          comment="punteros"
          title="Entender los punteros"
          subtitle="Esta es la parte que cuesta más al principio, pero también la que más se va a usar. Vamos a empezar por la idea fundamental y a partir de ahí construir todo lo demás."
        />
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="relative bg-card border border-border-warm rounded-lg p-6 overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "var(--gradient-amber)" }}
            />
            <h3 className="font-serif text-xl mb-3">¿Qué es un puntero?</h3>
            <p className="text-ink-soft leading-relaxed">
              Cada variable de tu programa vive en una dirección concreta de la
              memoria, igual que cada casa tiene una dirección postal. Un
              puntero es, simplemente, una variable cuyo valor es una dirección:
              en lugar de guardar un número o un texto, guarda dónde vive otro
              dato. La sintaxis{" "}
              <span className="font-mono text-sm">int *p</span> se lee como{" "}
              <em>p es un puntero a un entero</em>: p no es un entero, es el
              sitio donde un entero está guardado.
            </p>
          </div>
          <div className="relative bg-card border border-border-warm rounded-lg p-6 overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "var(--gradient-amber)" }}
            />
            <h3 className="font-serif text-xl mb-3">Los dos operadores clave</h3>
            <p className="text-ink-soft leading-relaxed mb-3">
              Hay dos símbolos que aparecen siempre con punteros y conviene
              tenerlos claros:
            </p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>
                <span className="font-mono text-amber-hover">&amp;</span> delante
                de una variable significa <em>dame su dirección</em>. Convierte
                un dato en un puntero.
              </li>
              <li>
                <span className="font-mono text-amber-hover">*</span> delante de
                un puntero significa <em>ve a donde apunta</em>. Convierte un
                puntero en el dato al que apunta. Esto es{" "}
                <em>desreferenciar</em>.
              </li>
            </ul>
          </div>
        </div>
        <PointerWalkthrough />
        <div className="mt-6 relative bg-card border border-border-warm rounded-lg p-5 overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "var(--gradient-amber)" }}
          />
          <h3 className="font-serif text-xl mb-2">
            ¿Y para qué sirve un puntero doble?
          </h3>
          <p className="text-ink-soft leading-relaxed text-sm">
            Suena rebuscado pero tiene un uso muy práctico: cuando queremos un{" "}
            <strong>array de punteros</strong>. Por ejemplo, si tenemos una
            lista de personas y cada persona es un objeto que vive en el heap,
            podemos guardar todas las direcciones en un array. La variable que
            apunta a ese array es un puntero a punteros, es decir, un puntero
            doble. Lo vamos a ver más adelante cuando implementemos estructuras
            que guardan punteros a objetos.
          </p>
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Errores típicos */}
      <section className="mb-20">
        <SectionHeader
          comment="errores_tipicos"
          title="Errores típicos de memoria"
          subtitle="La memoria dinámica es muy potente pero también muy delicada. Estos cuatro errores son los que más cuestan en cualquier examen de C++ y los que más quebraderos de cabeza dan en proyectos reales. Lo importante es reconocerlos para evitarlos y, cuando aparezcan, saber por qué."
        />
        <MemoryErrors />
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Buenas prácticas */}
      <section className="mb-20">
        <SectionHeader
          comment="buenas_practicas"
          title="Buenas prácticas"
          subtitle="Si interiorizas estas seis reglas, evitarás la inmensa mayoría de bugs de memoria. Son tan importantes que conviene leerlas más de una vez."
        />
        <BestPractices />
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Saga del Vector */}
      <section className="mb-20">
        <SectionHeader
          comment="saga_del_vector"
          title="La saga del Vector: hacia los templates"
          subtitle="Vamos a construir paso a paso una clase Vector en C++, viendo los problemas que aparecen y cómo se resuelven. El recorrido tiene cuatro etapas: dos intentos sencillos pero limitados, un experimento feo pero educativo, y por fin la solución correcta. Es exactamente el camino histórico que recorrió C++ hasta llegar a los templates."
        />
        <VectorSaga />
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Cómo funcionan los templates */}
      <section className="mb-20">
        <SectionHeader
          comment="como_funcionan_templates"
          title="Cómo funcionan los templates"
          subtitle="Una vez vista la solución, conviene entender bien qué hace exactamente C++ cuando escribimos un template. Es un mecanismo poderoso pero peculiar: lo que escribimos no es directamente código compilado, sino un molde a partir del cual el compilador fabrica clases reales bajo demanda."
        />
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="relative bg-card border border-border-warm rounded-lg p-6 overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "var(--gradient-amber)" }}
            />
            <h3 className="font-serif text-xl mb-3">Una plantilla, no una clase</h3>
            <p className="text-ink-soft leading-relaxed">
              Cuando escribes un template, no estás creando una clase. Estás
              creando una <strong>receta</strong> para fabricar clases. El
              compilador no la traduce a código máquina por sí sola: necesita
              que alguien la "instancie" indicando con qué tipo concreto. Hasta
              que no aparece <span className="font-mono text-sm">Vector&lt;int&gt;</span>{" "}
              en algún sitio, la plantilla no produce código.
            </p>
          </div>
          <div className="relative bg-card border border-border-warm rounded-lg p-6 overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "var(--gradient-amber)" }}
            />
            <h3 className="font-serif text-xl mb-3">Una clase por cada tipo</h3>
            <p className="text-ink-soft leading-relaxed">
              Cuando escribes{" "}
              <span className="font-mono text-sm">Vector&lt;int&gt;</span> y{" "}
              <span className="font-mono text-sm">Vector&lt;float&gt;</span> en
              tu programa, el compilador genera dos clases distintas: una
              específica para int y otra específica para float. Son tipos
              completamente diferentes: un{" "}
              <span className="font-mono text-sm">Vector&lt;int&gt;</span> no
              es asignable a un{" "}
              <span className="font-mono text-sm">Vector&lt;float&gt;</span>.
              Esto es lo que llamamos "seguridad de tipos".
            </p>
          </div>
        </div>

        <TemplateExplained />

        <div className="mt-8 relative bg-card border border-border-warm rounded-lg p-5 overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "var(--gradient-amber)" }}
          />
          <h3 className="font-serif text-xl mb-3">Tres detalles importantes</h3>
          <ul className="space-y-3 text-sm text-ink-soft">
            <li className="flex gap-3">
              <span className="font-mono text-amber-hover shrink-0">→</span>
              <span className="leading-relaxed">
                <strong className="text-ink">Todo en el .h.</strong> Los
                templates tienen que ir enteros (declaración e implementación)
                en el fichero de cabecera. No hay fichero .cpp aparte. El motivo
                es técnico: el compilador necesita ver el código fuente
                completo cada vez que aparece una nueva instanciación.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-amber-hover shrink-0">→</span>
              <span className="leading-relaxed">
                <strong className="text-ink">
                  Definir métodos fuera de la clase.
                </strong>{" "}
                Cuando una función del template se define fuera de la
                declaración de la clase, hay que repetir{" "}
                <span className="font-mono text-amber-hover">
                  template&lt;class T&gt;
                </span>{" "}
                y usar{" "}
                <span className="font-mono text-amber-hover">
                  Vector&lt;T&gt;::
                </span>{" "}
                en lugar de solo{" "}
                <span className="font-mono text-amber-hover">Vector::</span>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-amber-hover shrink-0">→</span>
              <span className="leading-relaxed">
                <strong className="text-ink">
                  Puedes asumir cosas sobre T.
                </strong>{" "}
                Si en tu código escribes{" "}
                <span className="font-mono text-amber-hover">a &lt; b</span> con
                dos objetos de tipo T, estás asumiendo que T soporta el
                operador &lt;. Si alguien instancia tu template con un tipo que
                no lo soporta, el compilador dará un error en ese punto.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <hr className="divider-gradient mb-20" />

      {/* Operadores */}
      <section className="mb-20">
        <SectionHeader
          comment="sobrecarga_de_operadores"
          title="Sobrecarga de operadores"
          subtitle="C++ nos permite definir qué hacen los operadores como +, ==, [] o = cuando se aplican a objetos de nuestras clases. No añade funcionalidad nueva, pero hace que el código sea natural de leer y escribir. Es lo que permite que escribamos v[3] = 5 en lugar de v.escribir(3, 5)."
        />
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="relative bg-card border border-border-warm rounded-lg p-6 overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "var(--gradient-amber)" }}
            />
            <h3 className="font-serif text-xl mb-3">¿Qué es sobrecargar?</h3>
            <p className="text-ink-soft leading-relaxed">
              Sobrecargar un operador significa definir qué pasa cuando ese
              operador se aplica a objetos de nuestra clase. El operador +
              entre dos enteros suma; entre dos cadenas, concatena; y entre
              dos objetos de nuestra clase, hace lo que nosotros decidamos. El
              compilador busca la versión adecuada según los tipos.
            </p>
          </div>
          <div className="relative bg-card border border-border-warm rounded-lg p-6 overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "var(--gradient-amber)" }}
            />
            <h3 className="font-serif text-xl mb-3">Unarios y binarios</h3>
            <p className="text-ink-soft leading-relaxed">
              Los operadores unarios actúan sobre un solo operando (++a, *a,
              !a). Los binarios actúan sobre dos (a+b, a==b, a[i]). C++ define
              una sintaxis específica para sobrecargar cada uno. La tabla de
              abajo recoge los patrones más habituales.
            </p>
          </div>
        </div>
        <OperatorsCheatsheet />
        <div className="mt-10">
          <Operators />
        </div>
      </section>
    </main>
  );
}