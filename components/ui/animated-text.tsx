export function AnimatedText({
  lines,
  className
}: {
  lines: { text: string; accent?: boolean }[];
  className?: string;
}) {
  return (
    <h1
      className={["hero-title", className].filter(Boolean).join(" ")}
    >
      {lines.map((line, index) => (
        <span key={line.text} className={line.accent ? "text-accent" : undefined}>
          {line.text}
          {index < lines.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}
