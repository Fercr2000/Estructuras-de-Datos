"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Zone = "estatica" | "pila" | "heap";

interface MemoryCell {
  id: string;
  label: string;
  detail: string;
  zone: Zone;
}

const examples: { id: string; label: string; cells: MemoryCell[] }[] = [
  {
    id: "vacio",
    label: "Estado inicial",
    cells: [],
  },
  {
    id: "estaticas",
    label: "+ variables globales",
    cells: [
      { id: "pi", label: "PI = 3.1416", detail: "const float", zone: "estatica" },
      { id: "fichero", label: "\"datos.txt\"", detail: "char[]", zone: "estatica" },
    ],
  },
  {
    id: "funcion",
    label: "+ llamada a f()",
    cells: [
      { id: "pi", label: "PI = 3.1416", detail: "const float", zone: "estatica" },
      { id: "fichero", label: "\"datos.txt\"", detail: "char[]", zone: "estatica" },
      { id: "k", label: "k", detail: "int (parámetro)", zone: "pila" },
      { id: "p", label: "p", detail: "int local", zone: "pila" },
      { id: "arr0", label: "arr[0]", detail: "float local", zone: "pila" },
      { id: "arr1", label: "arr[1]", detail: "float local", zone: "pila" },
      { id: "arr2", label: "arr[2]", detail: "float local", zone: "pila" },
    ],
  },
  {
    id: "new",
    label: "+ new float / new int[3]",
    cells: [
      { id: "pi", label: "PI = 3.1416", detail: "const float", zone: "estatica" },
      { id: "fichero", label: "\"datos.txt\"", detail: "char[]", zone: "estatica" },
      { id: "k", label: "k", detail: "int (parámetro)", zone: "pila" },
      { id: "p", label: "p", detail: "int local", zone: "pila" },
      { id: "f-ptr", label: "f → ●", detail: "puntero a heap", zone: "pila" },
      { id: "arr-ptr", label: "arr → ●", detail: "puntero a heap", zone: "pila" },
      { id: "f-data", label: "3.1415", detail: "float dinámico", zone: "heap" },
      { id: "arr0-data", label: "3", detail: "int dinámico", zone: "heap" },
      { id: "arr1-data", label: "2", detail: "int dinámico", zone: "heap" },
      { id: "arr2-data", label: "5", detail: "int dinámico", zone: "heap" },
    ],
  },
  {
    id: "salida",
    label: "− salir de f()",
    cells: [
      { id: "pi", label: "PI = 3.1416", detail: "const float", zone: "estatica" },
      { id: "fichero", label: "\"datos.txt\"", detail: "char[]", zone: "estatica" },
      { id: "f-data", label: "3.1415", detail: "float dinámico", zone: "heap" },
      { id: "arr0-data", label: "3", detail: "int dinámico", zone: "heap" },
      { id: "arr1-data", label: "2", detail: "int dinámico", zone: "heap" },
      { id: "arr2-data", label: "5", detail: "int dinámico", zone: "heap" },
    ],
  },
];

const zoneInfo: Record<Zone, { name: string; color: string; bg: string; description: string }> = {
  estatica: {
    name: "Área estática",
    color: "#D97706",
    bg: "#FEF3C7",
    description: "Variables globales y constantes. Asignadas en compilación.",
  },
  pila: {
    name: "Pila (stack)",
    color: "#0284C7",
    bg: "#DBEAFE",
    description: "Variables locales y parámetros. Se libera al salir de la función.",
  },
  heap: {
    name: "Heap (memoria dinámica)",
    color: "#059669",
    bg: "#D1FAE5",
    description: "Reservada con new, liberada con delete. Tú la gestionas.",
  },
};

export function MemoryMap() {
  const [stepIdx, setStepIdx] = useState(0);
  const current = examples[stepIdx];

  const cellsByZone = (zone: Zone) =>
    current.cells.filter((c) => c.zone === zone);

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
          memory_map.sim
        </span>
      </div>

      <div className="p-6">
        {/* Controles */}
        <div className="mb-6">
          <div className="font-mono text-xs text-amber mb-3">// acciones</div>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex, i) => {
              const isActive = i === stepIdx;
              return (
                <button
                  key={ex.id}
                  onClick={() => setStepIdx(i)}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs border transition-all ${
                    isActive
                      ? "bg-gradient-amber-soft border-amber-light text-amber-hover"
                      : "bg-card border-border-warm text-ink-soft hover:border-amber-light hover:text-amber-hover"
                  }`}
                >
                  <span className="text-amber-hover mr-1.5">
                    {String(i).padStart(2, "0")}
                  </span>
                  {ex.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mapa */}
        <div className="grid md:grid-cols-3 gap-4">
          {(["estatica", "pila", "heap"] as Zone[]).map((zone) => {
            const info = zoneInfo[zone];
            const cells = cellsByZone(zone);
            return (
              <div
                key={zone}
                className="rounded-lg border border-border-warm overflow-hidden"
              >
                <div
                  className="px-4 py-2 border-b border-border-warm"
                  style={{ backgroundColor: info.bg }}
                >
                  <div
                    className="font-mono text-xs font-semibold"
                    style={{ color: info.color }}
                  >
                    {info.name}
                  </div>
                </div>
                <div className="p-3 bg-card min-h-[280px]">
                  <AnimatePresence mode="popLayout">
                    {cells.length === 0 ? (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-mono text-xs text-ink-mute italic text-center py-8"
                      >
                        vacío
                      </motion.div>
                    ) : (
                      <div className="space-y-1.5">
                        {cells.map((cell) => (
                          <motion.div
                            key={cell.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="rounded-md border px-3 py-2"
                            style={{
                              backgroundColor: `${info.color}10`,
                              borderColor: `${info.color}40`,
                            }}
                          >
                            <div
                              className="font-mono text-sm font-medium"
                              style={{ color: info.color }}
                            >
                              {cell.label}
                            </div>
                            <div className="font-mono text-xs text-ink-mute mt-0.5">
                              {cell.detail}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="px-4 py-2 bg-subtle border-t border-border-warm">
                  <div className="text-xs text-ink-soft leading-relaxed">
                    {info.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}