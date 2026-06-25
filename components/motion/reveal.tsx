import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 34
}: RevealProps) {
  return (
    <div
      className={["reveal", className].filter(Boolean).join(" ")}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-distance": `${distance}px`
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={["stagger", className].filter(Boolean).join(" ")}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={["stagger-item", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
