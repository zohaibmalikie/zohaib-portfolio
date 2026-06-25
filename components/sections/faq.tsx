"use client";

import { useState } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Faq } from "@/types/sanity";

export function FAQ({ faqs }: { faqs: Faq[] }) {
  const [loadedCount, setLoadedCount] = useState(4);
  const itemsPerLoad = 4;
  const visibleFaqs = faqs.slice(0, loadedCount);
  const hasMore = loadedCount < faqs.length;

  const handleLoadMore = () => {
    setLoadedCount((prev) => Math.min(prev + itemsPerLoad, faqs.length));
  };

  if (!faqs.length) return null;

  return (
    <section id="faqs" className="section section-dark faq-section">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="FAQs" 
            title={
              <>
               Common questions
                <span className="text-accent"> before we build</span>
              </>
            } 
          />
        </Reveal>
        <Stagger className="faq-list">
          {visibleFaqs.map((faq, index) => (
            <StaggerItem className="faq-row" key={faq._id}>
              <span>{(index + 1).toString().padStart(2, '0')}</span>
              <div>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        {hasMore && (
          <div className="faq-load-more">
            <button
              onClick={handleLoadMore}
              className="faq-load-more-button"
            >
              Load More
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
