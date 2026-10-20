import Image, { getImageProps } from "next/image";
import { ArrowUpRight } from "lucide-react";

import { ActionLink } from "@/components/ui/action-link";
import { AnimatedText } from "@/components/ui/animated-text";
import { Badge } from "@/components/ui/badge";
import type { SiteSettings } from "@/types/sanity";

export type HeroStat = {
  value: string;
  label: string;
};

export function Hero({ stats, settings }: { stats: HeroStat[]; settings: SiteSettings }) {
  const { props: portrait } = getImageProps({ src: "/assets/img/banner.webp", alt: "", width: 1200, height: 620, sizes: "(max-width: 1024px) calc(100vw - 40px), 42vw" });
  return (
    <section className="hero">
      <link rel="preload" as="image" imageSrcSet={portrait.srcSet} imageSizes={portrait.sizes} media="(min-width: 1025px)" fetchPriority="high" />
      <div className="grid-background" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-content">
          <Badge className="status-badge">
            <span aria-hidden="true" /> Available for new projects
          </Badge>
          <AnimatedText
            className="hero-title-enter conversion-title"
            lines={settings.professionalHeadline
              ? [{ text: settings.professionalHeadline }]
              : [{ text: "Senior Next.js &" }, { text: "SvelteKit Developer", accent: true }, { text: "for SaaS and Ecommerce" }]}
          />
          <p className="hero-summary">
            {settings.professionalSummary || "I build Next.js, React and SvelteKit websites, SaaS applications and ecommerce experiences, with reliable API and AI integrations. Based in Pakistan, working remotely with teams in the US, UK and Europe."}
          </p>
          <p className="hero-identity">{settings.name} · Senior Full Stack SaaS & AI Developer</p>
          <div className="hero-actions">
            <ActionLink href="/services">
              Explore Services <ArrowUpRight size={16} aria-hidden="true" />
            </ActionLink>
            <ActionLink href="/work" variant="ghost">
              See My Work
            </ActionLink>
          </div>
          <div className="hero-proof-grid">
            {stats.map((stat) => (
              <div className="proof-tile" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-banner">
          <Image
            src="/assets/img/banner.webp"
            alt="Zohaib Ramzan portrait alongside website interface previews"
            width={1200}
            height={620}
            sizes={portrait.sizes}
            className="hero-banner-image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
