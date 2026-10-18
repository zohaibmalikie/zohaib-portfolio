import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";

import { EnquiryForm } from "@/components/enquiry-form";
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
          <p className="eyebrow">Let&apos;s solve it</p>
          <div className="section-heading">
            <h2>Tell me what is <span className="text-accent">slowing your team down.</span></h2>
          </div>
          <p>
            A failing integration, repetitive work, or a website that needs attention?
            Share the tools you use and the outcome you want. We can agree on a
            focused scope and the right next step.
          </p>
          <EnquiryForm />
          <p className="contact-direct-label">Prefer to start a conversation directly?</p>
          <div className="button-row contact-direct-links">
            <ActionLink
              href={whatsappHref}
              variant="ghost"
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
