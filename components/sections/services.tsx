import type { LucideIcon } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export type ServiceRow = {
  title: string;
  description?: string;
  icon: LucideIcon;
};

export function Services({ services }: { services: ServiceRow[] }) {
  return (
    <section id="services" className="section section-dark">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Services"
            title={
              <>
                What I 
                <span className="text-accent"> Build</span>
              </>
            } 
          />
        </Reveal>
        <Stagger className="service-rows">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <StaggerItem className="service-row" key={service.title}>
                <span className="service-number">0{index + 1}</span>
                <span className="service-icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3>{service.title}</h3>
                  {service.description ? <p>{service.description}</p> : null}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
