"use client";

import { useState } from "react";
import { TermBar } from "@/components/ui/TermBar";

const TEMPLATE_BODY = `template<class {T}>
class Vector {
    {T} *mem;
    long int tam;

public:
    Vector(long int atam) {
        mem = new {T}[tam = atam];
    }

    ~Vector() {
        delete[] mem;
    }

    {T} leer(long int pos) {
        return mem[pos];
    }

    void escribir(long int pos, const {T} &valor) {
        mem[pos] = valor;
    }
};`;

const INSTANCE_BODY = `// El compilador genera esta clase
// cuando ve Vector<{T}> en tu código
class Vector {
    {T} *mem;
    long int tam;

public:
    Vector(long int atam) {
        mem = new {T}[tam = atam];
    }

    ~Vector() {
        delete[] mem;
    }

    {T} leer(long int pos) {
        return mem[pos];
    }

    void escribir(long int pos, const {T} &valor) {
        mem[pos] = valor;
    }
};`;

const types = ["int", "float", "char", "string", "Empleado"];

function HighlightedCode({
  template,
  value,
}: {
  template: string;
  value: string;
}) {
  const lines = template.split("\n");
  return (
    <pre className="font-mono text-sm leading-relaxed whitespace-pre overflow-x-auto bg-white p-4 m-0">
      {lines.map((line, lineIdx) => {
        const segments = line.split("{T}");
        return (
          <div key={lineIdx} className="flex">
            <span className="text-ink-mute select-none w-8 text-right pr-3 shrink-0">
              {lineIdx + 1}
            </span>
            <span className="text-ink">
              {segments.map((seg, i) => (
                <span key={i}>
                  {seg}
                  {i < segments.length - 1 && (
                    <span className="bg-amber-soft text-amber-hover font-semibold rounded px-1">
                      {value}
                    </span>
                  )}
                </span>
              ))}
            </span>
          </div>
        );
      })}
    </pre>
  );
}

export function TemplateExplained() {
  const [selectedType, setSelectedType] = useState("int");

  return (
    <div className="space-y-8">
      {/* Anatomía de la sintaxis */}
      <div className="bg-card border border-border-warm rounded-lg overflow-hidden">
        <TermBar filename="anatomia_template.cpp" />
        <div className="p-8 bg-white">
          <div className="font-mono text-2xl md:text-3xl text-center mb-8 tracking-wide">
            <span className="text-amber-hover font-semibold">template</span>
            <span className="text-ink">&lt;</span>
            <span className="text-[#0284C7] font-semibold">class</span>
            <span className="text-ink"> </span>
            <span className="text-[#059669] font-semibold">T</span>
            <span className="text-ink">&gt;</span>
          </div>
          <ul className="space-y-4 max-w-2xl mx-auto">
            <li className="flex gap-4 items-start">
              <span className="font-mono text-sm text-amber-hover bg-amber-soft px-2 py-0.5 rounded shrink-0 font-medium min-w-[80px] text-center">
                template
              </span>
              <span className="text-ink-soft text-sm leading-relaxed">
                Palabra clave que le dice al compilador <em>"aquí viene una
                plantilla"</em>. Lo que escribas a continuación no es una clase
                concreta, es un modelo del que el compilador podrá generar
                varias clases.
              </span>
            </li>
            <li className="flex gap-4 items-start">
              <span
                className="font-mono text-sm font-medium shrink-0 min-w-[80px] text-center rounded px-2 py-0.5"
                style={{ color: "#0284C7", backgroundColor: "#DBEAFE" }}
              >
                class
              </span>
              <span className="text-ink-soft text-sm leading-relaxed">
                Indica que el siguiente identificador es un parámetro de tipo
                (no un valor concreto). También vale{" "}
                <span className="font-mono text-xs">typename</span>, significa
                exactamente lo mismo.
              </span>
            </li>
            <li className="flex gap-4 items-start">
              <span
                className="font-mono text-sm font-medium shrink-0 min-w-[80px] text-center rounded px-2 py-0.5"
                style={{ color: "#059669", backgroundColor: "#D1FAE5" }}
              >
                T
              </span>
              <span className="text-ink-soft text-sm leading-relaxed">
                Nombre del parámetro de tipo. Es una etiqueta que usaremos
                dentro de la clase cada vez que necesitemos referirnos al tipo
                "real" que se decida más tarde. T es lo más común por
                convención, pero puede ser cualquier identificador.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Instanciación interactiva */}
      <div>
        <div className="font-mono text-xs text-amber mb-3">
          // selecciona un tipo y observa qué clase genera el compilador
        </div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {types.map((t) => {
            const isActive = t === selectedType;
            return (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3.5 py-1.5 rounded-md font-mono text-xs border transition-all ${
                  isActive
                    ? "bg-gradient-amber-soft border-amber-light text-amber-hover"
                    : "bg-card border-border-warm text-ink-soft hover:border-amber-light hover:text-amber-hover"
                }`}
              >
                Vector&lt;{t}&gt;
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-card border border-border-warm rounded-lg overflow-hidden">
            <TermBar filename="plantilla_que_escribes.h" />
            <HighlightedCode template={TEMPLATE_BODY} value="T" />
          </div>
          <div className="bg-card border border-border-warm rounded-lg overflow-hidden">
            <TermBar filename={`generado_${selectedType}.h`} />
            <HighlightedCode template={INSTANCE_BODY} value={selectedType} />
          </div>
        </div>

        <div className="mt-4 font-mono text-xs text-ink-mute text-center">
          tú escribes <span className="text-amber-hover">{`Vector<${selectedType}>`}</span>{" "}
          → el compilador genera la clase de la derecha sustituyendo cada{" "}
          <span className="bg-amber-soft text-amber-hover px-1 rounded">T</span>{" "}
          por{" "}
          <span className="bg-amber-soft text-amber-hover px-1 rounded">
            {selectedType}
          </span>
        </div>
      </div>
    </div>
  );
}