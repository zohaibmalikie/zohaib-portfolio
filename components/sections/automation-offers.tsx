import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Service } from "@/types/sanity";

export function AutomationOffers({ offers }: { offers: Service[] }) {
  return (
    <section id="automation-offers" className="section section-muted automation-offers">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Automation services"
            title={<>Make your workflows <span className="text-accent">work.</span></>}
          >
            <p className="automation-offers-intro">
              Start with one workflow. Find the weak spots, ship a focused fix,
              or keep your integrations running with ongoing support.
            </p>
          </SectionHeading>
        </Reveal>
        <div className="automation-offer-grid">
          {offers.map((offer, index) => (
            <article className="automation-offer" key={offer.slug}>
              <div className="automation-offer-topline">
                <span className="automation-offer-number">0{index + 1}</span>
                <span>{["Review", "Build & repair", "Maintain"][index]}</span>
              </div>
              <h3><Link href={`/services/${offer.slug}`}>{offer.title}</Link></h3>
              <p className="automation-offer-description">{offer.description}</p>
              <div className="automation-offer-pricing">
                <p className="automation-offer-label">{offer.offerLabel}</p>
                <p className="automation-offer-price">{offer.priceRange}</p>
                <p className="automation-offer-currency">USD</p>
                <p className="automation-offer-note">{offer.priceNote}</p>
              </div>
              <ul className="automation-offer-deliverables">
                {offer.benefits?.map((benefit) => (
                  <li key={benefit}><Check size={16} aria-hidden="true" />{benefit}</li>
                ))}
              </ul>
              <Link href={`/services/${offer.slug}`} className="offer-details-link">Explore scope and deliverables <ArrowUpRight size={14} aria-hidden="true" /></Link>
              <ActionLink href={`/contact?service=${offer.slug}`} variant="secondary" className="automation-offer-cta">
                {["Discuss a health check", "Discuss your workflow", "Discuss ongoing support"][index]}
                <ArrowUpRight size={16} aria-hidden="true" />
              </ActionLink>
            </article>
          ))}
        </div>
        <p className="automation-offers-disclaimer">
          All prices are illustrative estimates in USD. Final scope, deliverables
          and pricing are confirmed before work begins.
        </p>
      </Container>
    </section>
  );
}
