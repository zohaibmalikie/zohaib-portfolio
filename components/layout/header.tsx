import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { MobileMenu, type NavItem } from "@/components/layout/mobile-menu";
import type { SiteSettings } from "@/types/sanity";

const navItems: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faqs" },
  { label: "Contact", href: "/#contact" }
];

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const hireHref = settings.upworkLink || "/#contact";
  const isExternalHireLink = /^https?:\/\//.test(hireHref);

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label={`ZR. ${settings.name} home`}>
        ZR<span>.</span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <a
          href={hireHref}
          className="button button-primary button-small"
          target={isExternalHireLink ? "_blank" : undefined}
          rel={isExternalHireLink ? "noopener noreferrer" : undefined}
        >
          Hire Me <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <MobileMenu navItems={navItems} hireHref={hireHref} />
      </div>
    </header>
  );
}
