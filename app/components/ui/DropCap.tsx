interface Props {
  text: string;
}

export function DropCap({ text }: Props) {
  const first = text.charAt(0);
  const rest = text.slice(1);
  return (
    <>
      <span
        className="text-gradient-amber"
        style={{ fontSize: "1.18em", fontWeight: 500 }}
      >
        {first}
      </span>
      {rest}
    </>
  );
}