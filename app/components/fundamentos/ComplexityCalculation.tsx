"use client";

import dynamic from "next/dynamic";
import { TermBar } from "@/components/ui/TermBar";
import { ComplexityBadge } from "@/components/ui/ComplexityBadge";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface Example {
  filename: string;
  code: string;
  steps: string[];
  result: string;
}

const examples: Example[] = [
  {
    filename: "branching.cpp",
    code: `if (a > b) {
    revisarTodo();    // O(n²)
} else {
    revisarAlgo();    // O(n)
}`,
    steps: [
      "revisarTodo() es O(n²).",
      "revisarAlgo() es O(n).",
      "Como solo se ejecuta una de las dos ramas, el coste del fragmento es max(n², n).",
    ],
    result: "O(n²)",
  },
  {
    filename: "nested_loops.cpp",
    code: `sum = 0;
for (j = 0; j < n; j++)
    for (i = 0; i < j; i++)
        sum++;
for (k = 0; k < n; k++)
    A[k] = k - 1;`,
    steps: [
      "La asignación inicial es O(1).",
      "Los dos bucles anidados dan O(n²): el interno se ejecuta n·(n−1)/2 veces.",
      "El último bucle es O(n) y queda absorbido por el término mayor.",
    ],
    result: "O(n²)",
  },
  {
    filename: "divide_conquer.cpp",
    code: `void granProblema(1, n) {
    if (n < 3) {
        resuelvo();
    } else {
        a = granProblema(1, n/2);
        b = granProblema(n/2+1, n);
        c = unirSoluciones(a, b);
    }
}`,
    steps: [
      "Caso base: resuelvo() es O(1).",
      "unirSoluciones() es O(n).",
      "La recurrencia queda T(n) = 2·T(n/2) + c·n.",
      "Resolviéndola, T(n) = n·log₂(n).",
    ],
    result: "O(n log n)",
  },
];

function defineTheme(monaco: typeof import("monaco-editor")) {
  monaco.editor.defineTheme("eedd-light", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "8A8A8A", fontStyle: "italic" },
      { token: "keyword", foreground: "D97706", fontStyle: "bold" },
      { token: "type", foreground: "0284C7" },
      { token: "number", foreground: "0284C7" },
      { token: "string", foreground: "059669" },
      { token: "delimiter", foreground: "5C5C5C" },
    ],
    colors: {
      "editor.background": "#FFFFFF",
      "editor.foreground": "#1A1A1A",
      "editorLineNumber.foreground": "#C7C2B8",
      "editorLineNumber.activeForeground": "#8A8A8A",
      "editor.lineHighlightBackground": "#FAFAF7",
      "editor.selectionBackground": "#FED7AA80",
      "editorCursor.foreground": "#D97706",
    },
  });
}

export function ComplexityCalculation() {
  return (
    <div className="space-y-6">
      {examples.map((ex) => (
        <div
          key={ex.filename}
          className="bg-card border border-border-warm rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        >
          <TermBar filename={ex.filename} />
          <div className="grid md:grid-cols-2 gap-0">
            {/* Columna del código: centrada verticalmente */}
            <div className="border-r border-border-warm flex items-center justify-center bg-white py-4">
              <div className="w-full">
                <Editor
                  height={`${ex.code.split("\n").length * 22 + 16}px`}
                  defaultLanguage="cpp"
                  value={ex.code}
                  theme="eedd-light"
                  beforeMount={defineTheme}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "var(--font-mono)",
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    folding: false,
                    renderLineHighlight: "none",
                    scrollbar: { vertical: "hidden", horizontal: "hidden" },
                    overviewRulerLanes: 0,
                    hideCursorInOverviewRuler: true,
                    domReadOnly: true,
                    contextmenu: false,
                    padding: { top: 8, bottom: 8 },
                  }}
                />
              </div>
            </div>

            {/* Columna de análisis */}
            <div className="p-5 flex flex-col">
              <div className="font-mono text-xs text-amber mb-3">// análisis</div>
              <ol className="space-y-2 flex-1">
                {ex.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="font-mono text-amber shrink-0">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span className="text-ink leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 pt-4 border-t border-border-warm flex items-center gap-3">
                <span className="font-mono text-xs text-ink-mute">resultado</span>
                <ComplexityBadge label={ex.result} size="md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}