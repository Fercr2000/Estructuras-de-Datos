"use client";
import { TermBar } from "@/components/ui/TermBar";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Curve {
  id: string;
  label: string;
  name: string;
  fn: (n: number) => number;
  color: string;
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

const CURVES: Curve[] = [
  { id: "constant", label: "O(1)", name: "Constante", fn: () => 1, color: "#059669" },
  { id: "log", label: "O(log n)", name: "Logarítmico", fn: (n) => Math.log2(Math.max(n, 1)), color: "#0891B2" },
  { id: "linear", label: "O(n)", name: "Lineal", fn: (n) => n, color: "#0284C7" },
  { id: "nlogn", label: "O(n log n)", name: "Linealítmico", fn: (n) => n * Math.log2(Math.max(n, 1)), color: "#D97706" },
  { id: "quadratic", label: "O(n²)", name: "Cuadrático", fn: (n) => n * n, color: "#EA580C" },
  { id: "exponential", label: "O(2ⁿ)", name: "Exponencial", fn: (n) => Math.pow(2, n), color: "#DC2626" },
  { id: "factorial", label: "O(n!)", name: "Factorial", fn: factorial, color: "#7C2D12" },
];

// Geometría del SVG
const VW = 800;
const VH = 480;
const PAD_L = 60;
const PAD_R = 30;
const PAD_T = 30;
const PAD_B = 50;
const CW = VW - PAD_L - PAD_R;
const CH = VH - PAD_T - PAD_B;

export function ComplexityChart() {
  const [active, setActive] = useState<Set<string>>(
    new Set(["constant", "log", "linear", "nlogn", "quadratic"])
  );
  const [maxN, setMaxN] = useState(15);
  const [yMax, setYMax] = useState(80);
  const [cursorN, setCursorN] = useState(8);

  const mapX = (n: number) => PAD_L + ((n - 1) / (maxN - 1)) * CW;
  const mapY = (v: number) => PAD_T + CH - (v / yMax) * CH;

  const paths = useMemo(() => {
    return CURVES.map((c) => {
      const points: string[] = [];
      const step = (maxN - 1) / 200;
      for (let n = 1; n <= maxN; n += step) {
        const v = c.fn(n);
        if (v > yMax * 1.1) {
          points.push(`${mapX(n).toFixed(2)},${mapY(yMax * 1.1).toFixed(2)}`);
          break;
        }
        points.push(`${mapX(n).toFixed(2)},${mapY(v).toFixed(2)}`);
      }
      return { id: c.id, d: `M ${points.join(" L ")}` };
    });
  }, [maxN, yMax]);

  const toggle = (id: string) => {
    const next = new Set(active);
    next.has(id) ? next.delete(id) : next.add(id);
    setActive(next);
  };

  // Ticks
  const xTicks = Array.from({ length: 6 }, (_, i) => 1 + Math.round(((maxN - 1) / 5) * i));
  const yTicks = Array.from({ length: 5 }, (_, i) => Math.round((yMax / 4) * i));

  return (
    <div className="bg-card border border-border-warm rounded-lg overflow-hidden">
      {/* Header tipo terminal */}
      <TermBar filename="complexity_chart.tsx" />

      <div className="p-6 grid lg:grid-cols-[1fr_240px] gap-6">
        {/* SVG */}
        <div>
          <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-auto">
            <defs>
              <linearGradient id="cursorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
                <stop offset="50%" stopColor="#D97706" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid */}
            {yTicks.map((t) => (
              <line
                key={`gy-${t}`}
                x1={PAD_L}
                x2={PAD_L + CW}
                y1={mapY(t)}
                y2={mapY(t)}
                stroke="#E8E4DC"
                strokeDasharray="3 3"
              />
            ))}
            {xTicks.map((t) => (
              <line
                key={`gx-${t}`}
                x1={mapX(t)}
                x2={mapX(t)}
                y1={PAD_T}
                y2={PAD_T + CH}
                stroke="#E8E4DC"
                strokeDasharray="3 3"
              />
            ))}

            {/* Ejes */}
            <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + CH} stroke="#1A1A1A" strokeWidth="1.5" />
            <line x1={PAD_L} y1={PAD_T + CH} x2={PAD_L + CW} y2={PAD_T + CH} stroke="#1A1A1A" strokeWidth="1.5" />

            {/* Labels eje X */}
            {xTicks.map((t) => (
              <text
                key={`tx-${t}`}
                x={mapX(t)}
                y={PAD_T + CH + 20}
                textAnchor="middle"
                className="fill-ink-soft"
                style={{ fontSize: 12, fontFamily: "var(--font-mono)" }}
              >
                {t}
              </text>
            ))}
            <text
              x={PAD_L + CW / 2}
              y={VH - 8}
              textAnchor="middle"
              className="fill-ink"
              style={{ fontSize: 13, fontFamily: "var(--font-mono)" }}
            >
              n (tamaño de entrada)
            </text>

            {/* Labels eje Y */}
            {yTicks.map((t) => (
              <text
                key={`ty-${t}`}
                x={PAD_L - 8}
                y={mapY(t) + 4}
                textAnchor="end"
                className="fill-ink-soft"
                style={{ fontSize: 12, fontFamily: "var(--font-mono)" }}
              >
                {t}
              </text>
            ))}
            <text
              x={-(PAD_T + CH / 2)}
              y={18}
              textAnchor="middle"
              transform={`rotate(-90)`}
              className="fill-ink"
              style={{ fontSize: 13, fontFamily: "var(--font-mono)" }}
            >
              operaciones
            </text>

            {/* Cursor vertical */}
            <line
              x1={mapX(cursorN)}
              x2={mapX(cursorN)}
              y1={PAD_T}
              y2={PAD_T + CH}
              stroke="url(#cursorGrad)"
              strokeWidth="2"
            />

            {/* Curvas */}
            {CURVES.map((c) => {
              const isActive = active.has(c.id);
              const path = paths.find((p) => p.id === c.id)!;
              return (
                <motion.path
                  key={c.id}
                  d={path.d}
                  fill="none"
                  stroke={c.color}
                  strokeWidth={isActive ? 2.5 : 1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={isActive ? 1 : 0.12}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              );
            })}

            {/* Puntos en el cursor */}
            {CURVES.filter((c) => active.has(c.id)).map((c) => {
              const v = c.fn(cursorN);
              if (v > yMax * 1.1) return null;
              return (
                <circle
                  key={`pt-${c.id}`}
                  cx={mapX(cursorN)}
                  cy={mapY(v)}
                  r={5}
                  fill={c.color}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              );
            })}
          </svg>

          {/* Slider cursor */}
          <div className="mt-4 px-2">
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-mono text-xs text-ink-mute">cursor</span>
              <span className="font-mono text-sm text-ink">
                n = <span className="text-amber-hover font-medium">{cursorN}</span>
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={maxN}
              value={cursorN}
              onChange={(e) => setCursorN(Number(e.target.value))}
              className="w-full accent-amber"
            />
          </div>
        </div>

        {/* Panel lateral */}
        <div className="space-y-5">
          <div>
            <div className="font-mono text-xs text-amber mb-2">// curvas</div>
            <div className="space-y-1.5">
              {CURVES.map((c) => {
                const isActive = active.has(c.id);
                const v = c.fn(cursorN);
                const display = v > 1e9 ? v.toExponential(1) : Math.round(v).toLocaleString();
                return (
                  <button
                    key={c.id}
                    onClick={() => toggle(c.id)}
                    className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded hover:bg-subtle transition-colors"
                  >
                    <span
                      className="w-3 h-3 rounded-sm shrink-0 transition-opacity"
                      style={{
                        backgroundColor: c.color,
                        opacity: isActive ? 1 : 0.25,
                      }}
                    />
                    <span
                      className={`font-mono text-sm flex-1 ${
                        isActive ? "text-ink" : "text-ink-mute"
                      }`}
                    >
                      {c.label}
                    </span>
                    {isActive && (
                      <span className="font-mono text-xs text-ink-soft">
                        {display}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border-warm">
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="font-mono text-xs text-ink-mute">max n</span>
                <span className="font-mono text-sm text-ink">{maxN}</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                value={maxN}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setMaxN(v);
                  if (cursorN > v) setCursorN(v);
                }}
                className="w-full accent-amber"
              />
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="font-mono text-xs text-ink-mute">max y</span>
                <span className="font-mono text-sm text-ink">{yMax}</span>
              </div>
              <input
                type="range"
                min={10}
                max={500}
                step={10}
                value={yMax}
                onChange={(e) => setYMax(Number(e.target.value))}
                className="w-full accent-amber"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}