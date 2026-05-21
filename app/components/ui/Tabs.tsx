"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface Props {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: Props) {
  const [active, setActive] = useState(defaultTab ?? tabs[0].id);
  const current = tabs.find((t) => t.id === active);

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-5 border-b border-border-warm pb-3">
        {tabs.map((tab, i) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative px-3.5 py-1.5 rounded-md font-mono text-xs transition-all border",
                isActive
                  ? "bg-gradient-amber-soft border-amber-light text-amber-hover"
                  : "bg-card border-border-warm text-ink-soft hover:text-amber-hover hover:border-amber-light"
              )}
            >
              <span className="text-amber-hover mr-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>
      <div>{current?.content}</div>
    </div>
  );
}