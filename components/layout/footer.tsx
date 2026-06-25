import Link from "next/link";

import type { SiteSettings } from "@/types/sanity";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const links = [
    ...(settings.socialLinks || []),
    settings.linkedinLink ? { label: "LinkedIn", url: settings.linkedinLink } : null,
    settings.githubLink ? { label: "GitHub", url: settings.githubLink } : null,
    settings.upworkLink ? { label: "Upwork", url: settings.upworkLink } : null
  ].reduce<{ label: string; url: string }[]>((uniqueLinks, link) => {
    if (link && !uniqueLinks.some((item) => item.url === link.url)) {
      uniqueLinks.push(link);
    }

    return uniqueLinks;
  }, []);

  return (
    <footer className="site-footer">
      <Link href="/" className="brand footer-brand">
        ZR<span>.</span>
      </Link>
      <p>© {new Date().getFullYear()} Muhammad Zohaib Ramzan — Expert Frontend Developer</p>
      <div className="social-list" aria-label="Social links">
        {links.slice(0, 4).map((link) => (
          <a
            key={`${link.label}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="me noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
