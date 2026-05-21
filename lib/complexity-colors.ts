export const complexityColors: Record<string, { color: string; bg: string }> = {
  "O(1)": { color: "#059669", bg: "#05966915" },
  "O(log n)": { color: "#0891B2", bg: "#0891B215" },
  "O(n)": { color: "#0284C7", bg: "#0284C715" },
  "O(n log n)": { color: "#D97706", bg: "#D9770615" },
  "O(n²)": { color: "#EA580C", bg: "#EA580C15" },
  "O(n³)": { color: "#EA580C", bg: "#EA580C15" },
  "O(nᵃ)": { color: "#EA580C", bg: "#EA580C15" },
  "O(2ⁿ)": { color: "#DC2626", bg: "#DC262615" },
  "O(aⁿ)": { color: "#DC2626", bg: "#DC262615" },
  "O(n!)": { color: "#7C2D12", bg: "#7C2D1215" },
};

export function getComplexityColor(label: string) {
  return complexityColors[label] ?? { color: "#5C5C5C", bg: "#5C5C5C15" };
}