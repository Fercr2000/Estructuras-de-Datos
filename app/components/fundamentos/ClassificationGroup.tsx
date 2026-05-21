import { StructureEntry } from "@/lib/structures-registry";
import { StructurePill } from "@/components/ui/StructurePill";
import { TermBar } from "@/components/ui/TermBar";
import { DropCap } from "@/components/ui/DropCap";

interface Props {
  title: string;
  comment: string;
  categories: {
    label: string;
    structures: StructureEntry[];
  }[];
}

export function ClassificationGroup({ title, comment, categories }: Props) {
  return (
    <div className="bg-card border border-border-warm rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <TermBar filename={`${comment}.schema`} />

      <div className="p-6">
        <h3 className="font-serif text-2xl text-ink mb-6">
          <DropCap text={title} />
        </h3>

        {/* Esquema con rama vertical de gradiente */}
        <div className="relative">
          {/* Línea vertical continua */}
          <div
            className="absolute left-[5.5px] top-2 bottom-2 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, #F59E0B 8%, #D97706 50%, #B45309 92%, transparent 100%)",
            }}
          />

          <div className="space-y-5">
            {categories.map((cat) => (
              <div key={cat.label} className="relative pl-6">
                {/* Rombo (diamante) ámbar */}
                <div
                  className="absolute left-0 top-[5px] w-3 h-3 rotate-45 shadow-sm"
                  style={{ background: "var(--gradient-amber)" }}
                />

                {/* Pequeño "tick" horizontal hacia la etiqueta */}
                <div
                  className="absolute left-[14px] top-[10px] h-px w-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #D97706 0%, transparent 100%)",
                  }}
                />

                <div className="font-sans font-semibold text-sm text-ink mb-2">
                  {cat.label}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.structures.map((s) => (
                    <StructurePill key={s.slug} {...s} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}