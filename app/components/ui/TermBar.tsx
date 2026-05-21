interface Props {
  filename: string;
}

export function TermBar({ filename }: Props) {
  return (
    <div
      className="relative flex items-center gap-2 px-4 py-2 border-b border-border-warm"
      style={{
        background:
          "linear-gradient(90deg, rgba(254, 215, 170, 0.55) 0%, rgba(254, 243, 199, 0.35) 45%, rgba(245, 243, 238, 0.85) 100%)",
      }}
    >
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </div>
      <span className="font-mono text-xs text-ink-soft ml-2 font-medium">
        {filename}
      </span>
    </div>
  );
}