import { ArrowUpRight, MessageCircle } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import type { SiteSettings } from "@/types/sanity";

export function Contact({ settings }: { settings: SiteSettings }) {
  return (
    <section id="contact" className="section section-muted contact-section">
      <Container>
        <Reveal className="contact-panel">
          <p className="eyebrow">Let&apos;s Collaborate</p>
          <h2>Have a project in mind?</h2>
          <p>
            From a quick consultation to a full-stack product partnership, let&apos;s
            talk about what you&apos;re building and how to ship it with polish.
          </p>
          <div className="button-row">
            <ActionLink
              href="https://wa.me/923090844077?text=Hello%20Zohaib%2C%20I%20have%20a%20query%20regarding%20your%20services"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} aria-hidden="true" /> WhatsApp Me
            </ActionLink>
            {settings.linkedinLink ? (
              <ActionLink
                href={settings.linkedinLink}
                variant="ghost"
                target="_blank"
                rel="me noreferrer"
              >
                LinkedIn <ArrowUpRight size={17} aria-hidden="true" />
              </ActionLink>
            ) : settings.email ? (
              <ActionLink href={`mailto:${settings.email}`} variant="ghost">
                Email Zohaib
              </ActionLink>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
