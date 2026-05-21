"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface Example {
  filename: string;
  code: string;
  steps: string[];
  result: string;
  color: string;
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
      "revisarTodo() es O(n²)",
      "revisarAlgo() es O(n)",
      "El fragmento toma max(n², n)",
    ],
    result: "O(n²)",
    color: "#EA580C",
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
      "Asignación inicial es O(1)",
      "Doble bucle anidado da O(n²)",
      "Bucle final O(n) queda absorbido",
    ],
    result: "O(n²)",
    color: "#EA580C",
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
      "Caso base: resuelvo() es O(1)",
      "unirSoluciones() es O(n)",
      "Recurrencia: T(n) = 2·T(n/2) + c·n",
      "Resolviendo: T(n) = n·log₂(n)",
    ],
    result: "O(n log n)",
    color: "#D97706",
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
          className="bg-card border border-border-warm rounded-lg overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-subtle border-b border-border-warm">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <span className="font-mono text-xs text-ink-mute ml-2">{ex.filename}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="border-r border-border-warm">
              <Editor
                height={`${ex.code.split("\n").length * 22 + 30}px`}
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
                }}
              />
            </div>
            <div className="p-5 flex flex-col">
              <div className="font-mono text-xs text-amber mb-3">// análisis</div>
              <ol className="space-y-2 flex-1">
                {ex.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="font-mono text-amber shrink-0">{i + 1}.</span>
                    <span className="text-ink leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 pt-4 border-t border-border-warm flex items-center gap-3">
                <span className="font-mono text-xs text-ink-mute">resultado</span>
                <span
                  className="font-mono text-base font-medium px-3 py-1 rounded-md"
                  style={{ color: ex.color, backgroundColor: `${ex.color}15` }}
                >
                  {ex.result}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}