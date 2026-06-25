import { ArrowUpRight, Star } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SanityImage } from "@/components/sanity-image";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteSettings } from "@/types/sanity";

const profileFacts = [
  { label: "Based in", value: "Pakistan" },
  { label: "Timezone", value: "PKT (UTC+5)" },
  { label: "Partner", value: "AI Commerce, FI" },
  { label: "Status", value: "Open to work" }
];

export function About({ settings }: { settings: SiteSettings }) {
  return (
    <section id="about" className="section section-muted">
      <Container className="about-grid">
        <Reveal className="about-portrait">
          <SanityImage
            image={settings.profileImage}
            width={760}
            height={900}
            priority={false}
            sizes="(max-width: 980px) 100vw, 48vw"
          />
          <div className="about-profile-card">
            <strong>{settings.name}</strong>
            <span>Frontend Partner @ AI Commerce, Finland</span>
            <span className="rating-inline">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={14} fill="currentColor" aria-hidden="true" />
              ))}
              5.0 on Upwork
            </span>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="About"
              title={
                <>
                  Building interfaces people{" "}
                  <span className="text-accent">actually love</span>
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.12}>
            <div className="about-copy">
              <p>
                I&apos;m Muhammad Zohaib Ramzan, a senior frontend developer with 5+ years building
                high-quality, responsive, and user-friendly interfaces. I work
                closely with designers, back-end teams, founders, and marketing
                teams to turn complex requirements into clean, maintainable code.
              </p>
              <p>
                My work focuses on premium frontend development, CMS architecture,
                AI integrations, technical SEO, Core Web Vitals, and conversion
                details that help SaaS, ecommerce, and growing businesses ship
                with confidence.
              </p>
            </div>
          </Reveal>
          <Stagger className="profile-facts" delay={0.1}>
            {profileFacts.map((fact) => (
              <StaggerItem className="profile-fact" key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2}>
            <ActionLink href="/#contact">
              Get In Touch <ArrowUpRight size={16} aria-hidden="true" />
            </ActionLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
