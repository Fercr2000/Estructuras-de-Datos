"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Box {
  id: string;
  label: string;
  value: string;
  type: "ptr" | "data";
  pointsTo?: string;
  freed?: boolean;
}

interface Step {
  code: string;
  explanation: string;
  boxes: Box[];
}

interface Scenario {
  id: string;
  title: string;
  steps: Step[];
}

const scenarios: Scenario[] = [
  {
    id: "puntero-simple",
    title: "Un puntero a un entero",
    steps: [
      {
        code: "int n = 42;",
        explanation:
          "Creamos una variable n con el valor 42. Vive en la pila como cualquier otra variable local.",
        boxes: [{ id: "n", label: "n", value: "42", type: "data" }],
      },
      {
        code: "int *p;",
        explanation:
          "Declaramos un puntero p que podrá apuntar a algún entero. Aún no apunta a nada concreto: está sin inicializar.",
        boxes: [
          { id: "p", label: "p", value: "?", type: "ptr" },
          { id: "n", label: "n", value: "42", type: "data" },
        ],
      },
      {
        code: "p = &n;",
        explanation:
          "Hacemos que p apunte a n. El operador & significa 'dame la dirección de'. Ahora p guarda la dirección donde vive n: la flecha lo indica.",
        boxes: [
          { id: "p", label: "p", value: "●", type: "ptr", pointsTo: "n" },
          { id: "n", label: "n", value: "42", type: "data" },
        ],
      },
      {
        code: "*p = 99;",
        explanation:
          "El asterisco delante de p significa 've a donde apunta p'. Como apunta a n, en realidad estamos cambiando el valor de n a 99.",
        boxes: [
          { id: "p", label: "p", value: "●", type: "ptr", pointsTo: "n" },
          { id: "n", label: "n", value: "99", type: "data" },
        ],
      },
    ],
  },
  {
    id: "puntero-doble",
    title: "Un puntero doble (puntero a puntero)",
    steps: [
      {
        code: "int **p = new int*;",
        explanation:
          "Reservamos en el heap un hueco para guardar un puntero a entero. p apunta a ese hueco, pero el hueco aún no apunta a ningún entero: contiene basura.",
        boxes: [
          { id: "p", label: "p", value: "●", type: "ptr", pointsTo: "mid" },
          { id: "mid", label: "*p", value: "?", type: "ptr" },
        ],
      },
      {
        code: "*p = new int;",
        explanation:
          "Reservamos un entero en el heap. Como *p significa 'el contenido de lo que apunta p', estamos guardando la dirección de ese entero dentro del primer hueco. Ahora hay dos saltos: p apunta a algo que apunta al entero.",
        boxes: [
          { id: "p", label: "p", value: "●", type: "ptr", pointsTo: "mid" },
          { id: "mid", label: "*p", value: "●", type: "ptr", pointsTo: "data" },
          { id: "data", label: "**p", value: "?", type: "data" },
        ],
      },
      {
        code: "**p = 3;",
        explanation:
          "Dos asteriscos: 've a donde apunta p, y desde ahí ve a donde apunta'. Llegamos al entero del final y le ponemos un 3.",
        boxes: [
          { id: "p", label: "p", value: "●", type: "ptr", pointsTo: "mid" },
          { id: "mid", label: "*p", value: "●", type: "ptr", pointsTo: "data" },
          { id: "data", label: "**p", value: "3", type: "data" },
        ],
      },
      {
        code: "delete *p;",
        explanation:
          "Liberamos el entero del heap. Pero el hueco intermedio (al que apunta p) sigue existiendo: ahora contiene una dirección que ya no es válida.",
        boxes: [
          { id: "p", label: "p", value: "●", type: "ptr", pointsTo: "mid" },
          { id: "mid", label: "*p", value: "✗", type: "ptr", freed: true },
        ],
      },
      {
        code: "delete p;",
        explanation:
          "Liberamos también el hueco intermedio. Ahora p apunta a una zona que ya no nos pertenece: cualquier uso posterior daría error. Toda la memoria del heap ha sido devuelta.",
        boxes: [{ id: "p", label: "p", value: "✗", type: "ptr", freed: true }],
      },
    ],
  },
];

// Geometría del SVG (todo en el mismo sistema de coordenadas)
const VBW = 600;
const VBH = 220;
const BOX_W = 130;
const BOX_H = 70;
const ROW_Y = 75;

// Posiciones de cada caja por id
const positions: Record<string, { x: number }> = {
  p: { x: 40 },
  n: { x: 230 },
  mid: { x: 230 },
  data: { x: 420 },
};

export function PointerWalkthrough() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const scenario = scenarios[scenarioIdx];
  const step = scenario.steps[stepIdx];

  const changeScenario = (i: number) => {
    setScenarioIdx(i);
    setStepIdx(0);
  };

  const prev = () => setStepIdx((i) => Math.max(0, i - 1));
  const next = () =>
    setStepIdx((i) => Math.min(scenario.steps.length - 1, i + 1));

  return (
    <div className="bg-card border border-border-warm rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div
        className="relative flex items-center gap-2 px-4 py-2 border-b border-border-warm"
        style={{
          background:
            "linear-gradient(90deg, rgba(254, 215, 170, 0.55) 0%, rgba(254, 243, 199, 0.35) 45%, rgba(245, 243, 238, 0.85) 100%)",
        }}
      >
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-mono text-xs text-ink-soft ml-2 font-medium">
          pointers.walk
        </span>
      </div>

      {/* Selector de escenario */}
      <div className="px-6 pt-5 pb-2">
        <div className="flex flex-wrap gap-1.5">
          {scenarios.map((s, i) => {
            const isActive = i === scenarioIdx;
            return (
              <button
                key={s.id}
                onClick={() => changeScenario(i)}
                className={`px-3 py-1.5 rounded-md font-mono text-xs border transition-all ${
                  isActive
                    ? "bg-gradient-amber-soft border-amber-light text-amber-hover"
                    : "bg-card border-border-warm text-ink-soft hover:border-amber-light hover:text-amber-hover"
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-6 pt-3 grid lg:grid-cols-2 gap-6">
        {/* Columna izquierda: código y explicación */}
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-mono text-xs text-amber">// código</div>
              <div className="font-mono text-xs text-ink-mute">
                paso {stepIdx + 1} de {scenario.steps.length}
              </div>
            </div>
            <div className="bg-white border border-border-warm rounded-md px-4 py-3 font-mono text-sm text-ink min-h-[48px] flex items-center">
              {step.code}
            </div>
          </div>
          <div>
            <div className="font-mono text-xs text-amber mb-2">// explicación</div>
            <p className="text-ink leading-relaxed text-sm">{step.explanation}</p>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={prev}
              disabled={stepIdx === 0}
              className="px-4 py-2 rounded-md border border-border-warm bg-card font-mono text-xs text-ink-soft hover:border-amber-light hover:text-amber-hover transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← anterior
            </button>
            <button
              onClick={next}
              disabled={stepIdx === scenario.steps.length - 1}
              className="px-4 py-2 rounded-md border border-amber-light bg-gradient-amber-soft font-mono text-xs text-amber-hover hover:shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              siguiente →
            </button>
          </div>
        </div>

        {/* Columna derecha: visualización */}
        <div className="bg-subtle/50 border border-border-warm rounded-lg p-4">
          <div className="font-mono text-xs text-amber mb-3">
            // estado en memoria
          </div>
          <PointerDiagram boxes={step.boxes} />
        </div>
      </div>
    </div>
  );
}

function PointerDiagram({ boxes }: { boxes: Box[] }) {
  return (
    <svg
      viewBox={`0 0 ${VBW} ${VBH}`}
      className="w-full h-auto"
      style={{ maxHeight: "260px" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker
          id="arrow-amber"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#D97706" />
        </marker>
        <marker
          id="arrow-red"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#DC2626" />
        </marker>
      </defs>

      {/* Flechas: dibujadas DENTRO del SVG, con coordenadas reales */}
      <AnimatePresence>
        {boxes.map((b) => {
          if (!b.pointsTo) return null;
          const target = boxes.find((bb) => bb.id === b.pointsTo);
          if (!target) return null;
          const srcX = positions[b.id]?.x;
          const tgtX = positions[target.id]?.x;
          if (srcX === undefined || tgtX === undefined) return null;

          // La flecha sale del borde derecho de la caja origen
          // y llega al borde izquierdo de la caja destino
          const x1 = srcX + BOX_W;
          const y1 = ROW_Y + BOX_H / 2;
          const x2 = tgtX;
          const y2 = ROW_Y + BOX_H / 2;

          return (
            <motion.line
              key={`arrow-${b.id}-${b.pointsTo}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#D97706"
              strokeWidth="2.5"
              markerEnd="url(#arrow-amber)"
            />
          );
        })}
      </AnimatePresence>

      {/* Cajas */}
      <AnimatePresence>
        {boxes.map((b) => {
          const x = positions[b.id]?.x;
          if (x === undefined) return null;

          const isFreed = b.freed;
          const isPtr = b.type === "ptr";

          const fill = isFreed
            ? "#FEF2F2"
            : isPtr
            ? "#FEF3C7"
            : "#FFFFFF";
          const stroke = isFreed
            ? "#DC2626"
            : isPtr
            ? "#FCD34D"
            : "#E8E4DC";
          const labelColor = isFreed
            ? "#DC2626"
            : isPtr
            ? "#B45309"
            : "#8A8A8A";
          const valueColor = isFreed ? "#DC2626" : "#1A1A1A";

          return (
            <motion.g
              key={`box-${b.id}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              style={{ transformOrigin: `${x + BOX_W / 2}px ${ROW_Y + BOX_H / 2}px` }}
            >
              <rect
                x={x}
                y={ROW_Y}
                width={BOX_W}
                height={BOX_H}
                rx="8"
                fill={fill}
                stroke={stroke}
                strokeWidth="1.5"
              />
              {/* Etiqueta superior (p, n, *p, **p…) */}
              <text
                x={x + BOX_W / 2}
                y={ROW_Y + 22}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="13"
                fill={labelColor}
                fontWeight="500"
              >
                {b.label}
              </text>
              {/* Valor */}
              <text
                x={x + BOX_W / 2}
                y={ROW_Y + 50}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="20"
                fill={valueColor}
                fontWeight="500"
              >
                {b.value}
              </text>
            </motion.g>
          );
        })}
      </AnimatePresence>

      {/* Etiqueta "apunta a" debajo de las flechas (decorativa) */}
      <AnimatePresence>
        {boxes.map((b) => {
          if (!b.pointsTo) return null;
          const target = boxes.find((bb) => bb.id === b.pointsTo);
          if (!target) return null;
          const srcX = positions[b.id]?.x;
          const tgtX = positions[target.id]?.x;
          if (srcX === undefined || tgtX === undefined) return null;
          const midX = (srcX + BOX_W + tgtX) / 2;
          return (
            <motion.text
              key={`label-${b.id}-${b.pointsTo}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              x={midX}
              y={ROW_Y + BOX_H / 2 - 8}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10"
              fill="#B45309"
              fontStyle="italic"
            >
              apunta a
            </motion.text>
          );
        })}
      </AnimatePresence>
    </svg>
  );
}