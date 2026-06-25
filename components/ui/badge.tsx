import type { ReactNode } from "react";

export function Badge({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={["badge", className].filter(Boolean).join(" ")}>{children}</span>;
}
