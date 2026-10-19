import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { ActionLink } from "@/components/ui/action-link";
import { AnimatedText } from "@/components/ui/animated-text";
import { Badge } from "@/components/ui/badge";
import type { SiteSettings } from "@/types/sanity";
import "@/components/growth-tools.css";

export type HeroStat = {
  value: string;
  label: string;
};

export function Hero({ stats, settings }: { stats: HeroStat[]; settings: SiteSettings }) {
  return (
    <section className="hero">
      <div className="grid-background" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-content">
          <Badge className="status-badge">
            <span aria-hidden="true" /> Available for new projects
          </Badge>
          <AnimatedText
            className="hero-title-enter conversion-title"
            lines={settings.conversionHeadline
              ? [{ text: settings.conversionHeadline }]
              : [{ text: "Fast websites." }, { text: "Reliable workflows.", accent: true }, { text: "Less manual work." }]}
          />
          <p className="hero-summary">
            {settings.conversionDescription || "I help small businesses, SaaS teams, and ecommerce stores build better websites, connect their tools, and make everyday work run more smoothly."}
          </p>
          <p className="hero-identity">{settings.name} · Frontend developer & automation partner</p>
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
            sizes="(max-width: 768px) 100vw, 900px"
            className="hero-banner-image"
            priority
          />
        </div>
      </div>
    </section>
  );
}
