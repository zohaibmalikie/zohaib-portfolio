import { Star } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Testimonial } from "@/types/sanity";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  const featured = testimonials[0];

  return (
    <section id="testimonials" className="section section-dark testimonials-section">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Client Feedback" title={
              <>
                What Clients
                <span className="text-accent"> Say</span>
              </>
            }
          />
        </Reveal>
        <Reveal className="testimonial-panel" delay={0.12}>
          <div className="rating-row" role="img" aria-label={`${featured.rating || 5} star rating`}>
            {Array.from({ length: featured.rating || 5 }).map((_, index) => (
              <Star key={index} size={18} fill="currentColor" aria-hidden="true" />
            ))}
          </div>
          <blockquote>
            &ldquo;{featured.text.replace(/^"|"$/g, "")}&rdquo;
          </blockquote>
          <cite>
            <strong>{featured.clientName}</strong>
            {featured.clientRoleCompany ? <span>{featured.clientRoleCompany}</span> : null}
          </cite>
        </Reveal>
        {testimonials.length > 1 ? (
          <div className="testimonial-grid">
            {testimonials.slice(1).map((testimonial) => (
              <article className="testimonial-card" key={testimonial._id}>
                <div
                  className="rating-row rating-row-small"
                  role="img"
                  aria-label={`${testimonial.rating || 5} star rating`}
                >
                  {Array.from({ length: testimonial.rating || 5 }).map((_, index) => (
                    <Star key={index} size={15} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <blockquote>
                  &ldquo;{testimonial.text.replace(/^"|"$/g, "")}&rdquo;
                </blockquote>
                <cite>
                  <strong>{testimonial.clientName}</strong>
                  {testimonial.clientRoleCompany ? (
                    <span>{testimonial.clientRoleCompany}</span>
                  ) : null}
                </cite>
              </article>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
