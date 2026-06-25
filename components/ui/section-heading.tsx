import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  className
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={[
        "section-heading",
        align === "center" ? "section-heading-center" : "",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children ? <div className="section-heading-aside">{children}</div> : null}
    </div>
  );
}
