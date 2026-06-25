import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Faq } from "@/types/sanity";

export function FAQ({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;

  return (
    <section id="faqs" className="section section-dark faq-section">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="FAQs" title="Common questions before we build." />
        </Reveal>
        <Stagger className="faq-list">
          {faqs.slice(0, 4).map((faq, index) => (
            <StaggerItem className="faq-row" key={faq._id}>
              <span>0{index + 1}</span>
              <div>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
