import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Faq } from "@/types/sanity";
import "@/components/sections/faq.css";

export function FAQ({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;

  return (
    <section id="faqs" className="section section-dark faq-section">
      <Container>
        <SectionHeading
          eyebrow="FAQs"
          title={<>Common questions<span className="text-accent"> before we build</span></>}
        />
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details className="faq-row home-faq-disclosure" key={faq._id}>
              <summary>
                <span className="home-faq-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{faq.question}</h3>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
