import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { MobileMenu, type NavItem } from "@/components/layout/mobile-menu";
import type { SiteSettings } from "@/types/sanity";

const navItems: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/#about" },
  { label: "Tools", href: "/tools" },
  { label: "Contact", href: "/contact" }
];

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const hireHref = "/contact";

  return (
    <header className="site-header">
      <Link prefetch={false} href="/" className="brand" aria-label={`ZR. ${settings.name} home`}>
        ZR<span>.</span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          item.href.includes("#") ? <a key={item.href} href={item.href}>{item.label}</a> : <Link key={item.href} href={item.href} prefetch={false}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link
          href={hireHref}
          prefetch={false}
          className="button button-primary button-small"
        >
          Discuss a project <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
        <MobileMenu navItems={navItems} hireHref={hireHref} />
      </div>
    </header>
  );
}
