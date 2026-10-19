"use client";

import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export type NavItem = { label: string; href: string };

export function MobileMenu({ navItems, hireHref }: { navItems: NavItem[]; hireHref: string }) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const close = () => { if (menuRef.current) menuRef.current.open = false; };
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) {
        close();
        menuRef.current.querySelector("summary")?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) close();
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", escape); document.removeEventListener("pointerdown", outside); };
  }, []);

  return <details className="mobile-menu" ref={menuRef}><summary className="menu-toggle" aria-label="Toggle navigation menu"><span className="sr-only">Toggle navigation menu</span><Menu className="menu-icon menu-icon-open" size={18} aria-hidden="true" /><X className="menu-icon menu-icon-close" size={18} aria-hidden="true" /></summary><nav className="mobile-menu-panel" aria-label="Mobile navigation">{navItems.map((item) => item.href.includes("#") ? <a key={item.href} href={item.href} onClick={close}>{item.label}</a> : <Link key={item.href} href={item.href} prefetch={false} onClick={close}>{item.label}</Link>)}<Link href={hireHref} prefetch={false} className="button button-primary" onClick={close}>Discuss a project</Link></nav></details>;
}
