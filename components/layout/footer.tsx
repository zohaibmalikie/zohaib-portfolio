import Link from "next/link";

import type { SiteSettings } from "@/types/sanity";

const crawlerBlockedDomains = ["fiverr.com", "upwork.com"];

function isCrawlerBlockedSocialUrl(url: string) {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return crawlerBlockedDomains.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const links = [
    ...(settings.socialLinks || []),
    settings.linkedinLink ? { label: "LinkedIn", url: settings.linkedinLink } : null,
    settings.githubLink ? { label: "GitHub", url: settings.githubLink } : null
  ].reduce<{ label: string; url: string }[]>((uniqueLinks, link) => {
    if (
      link &&
      !isCrawlerBlockedSocialUrl(link.url) &&
      !uniqueLinks.some((item) => item.url === link.url)
    ) {
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
