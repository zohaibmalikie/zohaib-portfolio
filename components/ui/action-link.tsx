import Link from "next/link";
import type { ReactNode } from "react";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  target?: string;
  rel?: string;
};

export function ActionLink({
  href,
  children,
  className,
  variant = "primary",
  target,
  rel
}: ActionLinkProps) {
  const classes = ["button", `button-${variant}`, className]
    .filter(Boolean)
    .join(" ");
  const nativeNavigation =
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    target === "_blank" ||
    href.startsWith("#") ||
    href.startsWith("/#");

  if (nativeNavigation) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={false} className={classes}>
      {children}
    </Link>
  );
}
