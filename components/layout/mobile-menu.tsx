import { Menu, X } from "lucide-react";
import Link from "next/link";

export type NavItem = {
  label: string;
  href: string;
};

export function MobileMenu({
  navItems,
  hireHref
}: {
  navItems: NavItem[];
  hireHref: string;
}) {
  const isExternalHireLink = /^https?:\/\//.test(hireHref);

  return (
    <details className="mobile-menu">
      <summary
        className="menu-toggle"
        aria-label="Toggle navigation menu"
      >
        <span className="sr-only">Toggle navigation menu</span>
        <Menu className="menu-icon menu-icon-open" size={18} aria-hidden="true" />
        <X className="menu-icon menu-icon-close" size={18} aria-hidden="true" />
      </summary>
      <div className="mobile-menu-panel">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <a
          href={hireHref}
          className="button button-primary"
          target={isExternalHireLink ? "_blank" : undefined}
          rel={isExternalHireLink ? "noopener noreferrer" : undefined}
        >
          Hire Me
        </a>
      </div>
    </details>
  );
}
