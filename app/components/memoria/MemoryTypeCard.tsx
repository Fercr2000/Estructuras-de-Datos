import { CppViewer } from "@/components/ui/CppViewer";
import { ProsCallout } from "@/components/ui/ProsCallout";
import { ConsCallout } from "@/components/ui/ConsCallout";

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
        <ProsCallout items={pros} />
        <ConsCallout items={cons} />
      </div>
    </div>
  );
}