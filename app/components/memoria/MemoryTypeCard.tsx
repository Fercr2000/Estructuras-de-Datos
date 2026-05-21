import { CppViewer } from "@/components/ui/CppViewer";
import { TechList, TechItem } from "@/components/ui/TechList";

interface Props {
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  filename: string;
  code: string;
  pros: string[];
  cons: string[];
}

export function MemoryTypeCard({
  badge,
  badgeColor,
  title,
  description,
  filename,
  code,
  pros,
  cons,
}: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-3">
        <span
          className="font-mono text-xs px-2 py-0.5 rounded-md font-medium"
          style={{
            color: badgeColor,
            backgroundColor: `${badgeColor}15`,
          }}
        >
          {badge}
        </span>
        <h3 className="font-serif text-2xl text-ink">{title}</h3>
      </div>
      <p className="text-ink-soft leading-relaxed">{description}</p>
      <CppViewer filename={filename} code={code} />
      <div className="grid md:grid-cols-2 gap-3 pt-2">
        <div className="bg-card border border-border-warm rounded-lg p-4">
          <div className="font-mono text-xs text-amber mb-2">// ventajas</div>
          <TechList>
            {pros.map((p, i) => (
              <TechItem key={i} bullet="→">
                {p}
              </TechItem>
            ))}
          </TechList>
        </div>
        <div className="bg-card border border-border-warm rounded-lg p-4">
          <div className="font-mono text-xs text-amber mb-2">// inconvenientes</div>
          <TechList>
            {cons.map((c, i) => (
              <TechItem key={i} bullet="→">
                {c}
              </TechItem>
            ))}
          </TechList>
        </div>
      </div>
    </div>
  );
}