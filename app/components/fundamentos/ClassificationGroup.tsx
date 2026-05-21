import { StructureEntry } from "@/lib/structures-registry";
import { StructurePill } from "@/components/ui/StructurePill";

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
    <div className="bg-card border border-border-warm rounded-lg p-6">
      <div className="mb-5">
        <span className="font-mono text-xs text-amber">// {comment}</span>
        <h3 className="font-serif text-2xl mt-1 text-ink">{title}</h3>
      </div>
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="font-mono text-sm text-ink-soft mb-2 flex items-center gap-2">
              <span className="text-amber">→</span>
              <span>{cat.label}</span>
            </div>
            <div className="flex flex-wrap gap-2 ml-5">
              {cat.structures.map((s) => (
                <StructurePill key={s.slug} {...s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}