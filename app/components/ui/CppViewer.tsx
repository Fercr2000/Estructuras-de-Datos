"use client";

import dynamic from "next/dynamic";
import { TermBar } from "./TermBar";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface Props {
  filename: string;
  code: string;
  centerVertically?: boolean;
}

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

export function CppViewer({ filename, code, centerVertically = true }: Props) {
  const lines = code.split("\n").length;
  const height = `${lines * 22 + 16}px`;

  return (
    <div className="bg-card border border-border-warm rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <TermBar filename={filename} />
      <div
        className={
          centerVertically
            ? "flex items-center justify-center py-4 bg-white"
            : "py-4 bg-white"
        }
      >
        <div className="w-full">
          <Editor
            height={height}
            defaultLanguage="cpp"
            value={code}
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
    </div>
  );
}