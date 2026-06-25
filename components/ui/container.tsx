import type { ReactNode } from "react";

export function Container({
  children,
  className,
  narrow = false
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={[narrow ? "container container-narrow" : "container", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
