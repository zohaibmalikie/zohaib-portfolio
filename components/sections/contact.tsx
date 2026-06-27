import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import type { SiteSettings } from "@/types/sanity";

const whatsappHref =
  "https://api.whatsapp.com/send?phone=923090844077&text=Hello%20Muhammad%20Zohaib%20Ramzan%2C%20I%20have%20a%20query%20regarding%20your%20services";

export function Contact({ settings }: { settings: SiteSettings }) {
  return (
    <section id="contact" className="section section-muted contact-section">
      <Container>
        <div className="contact-panel">
          <p className="eyebrow">Let&apos;s Collaborate</p>
          <div className="section-heading">
            <h2>Have a project <span className="text-accent"> in mind?</span></h2>
          </div>
          <p>
            From a quick consultation to a full-stack product partnership, let&apos;s
            talk about what you&apos;re building and how to ship it with polish.
          </p>
          <div className="button-row">
            <ActionLink
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} aria-hidden="true" /> WhatsApp Me
            </ActionLink>
            {settings.email ? (
              <ActionLink href={`mailto:${settings.email}`} variant="ghost">
                <Mail size={17} aria-hidden="true" /> Email Me
              </ActionLink>
            ) : null}
            {settings.linkedinLink ? (
              <ActionLink
                href={settings.linkedinLink}
                variant="ghost"
                target="_blank"
                rel="me noopener noreferrer"
              >
                LinkedIn <ArrowUpRight size={17} aria-hidden="true" />
              </ActionLink>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
