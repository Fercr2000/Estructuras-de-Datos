import { DropCap } from "./DropCap";

interface Props {
  comment?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ comment, title, subtitle }: Props) {
  return (
    <header className="mb-10">
      {comment && (
        <div className="font-mono text-xs text-amber mb-2">// {comment}</div>
      )}
      <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-ink">
        <DropCap text={title} />
      </h2>
      {subtitle && (
        <p className="mt-3 text-ink-soft text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  );
}