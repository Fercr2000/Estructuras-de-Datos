import { getComplexityColor } from "@/lib/complexity-colors";

interface Props {
  label: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-base",
};

export function ComplexityBadge({ label, size = "md" }: Props) {
  const { color, bg } = getComplexityColor(label);
  return (
    <span
      className={`inline-block rounded-md font-mono font-medium ${sizes[size]}`}
      style={{ color, backgroundColor: bg }}
    >
      {label}
    </span>
  );
}