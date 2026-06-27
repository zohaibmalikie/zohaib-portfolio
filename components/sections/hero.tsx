import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { ActionLink } from "@/components/ui/action-link";
import { AnimatedText } from "@/components/ui/animated-text";
import { Badge } from "@/components/ui/badge";

export type HeroStat = {
  value: string;
  label: string;
};

export function Hero({ stats }: { stats: HeroStat[] }) {
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
            className="hero-title-enter"
            lines={[
              { text: "Frontend" },
              { text: "Developer", accent: true },
              { text: "& Partner" }
            ]}
          />
          <p className="hero-summary">
            I build fast, SEO-friendly web experiences for SaaS, ecommerce, CMS,
            and growing businesses using Next.js, React, SvelteKit, TypeScript,
            Sanity, Vercel, technical SEO, GEO, AEO, structured data, and
            AI-ready content architecture.
          </p>
          <div className="hero-actions">
            <ActionLink href="/#work">
              View My Work <ArrowUpRight size={16} aria-hidden="true" />
            </ActionLink>
            <ActionLink href="/#contact" variant="ghost">
              Let&apos;s Talk
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
            alt="Illustrated project banner showing modern web design"
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
