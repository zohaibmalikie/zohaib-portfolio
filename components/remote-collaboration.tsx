import { JsonLd } from "@/components/json-ld";
import { remoteCollaborationDefaults } from "@/lib/remote-collaboration";
import type { SiteSettings } from "@/types/sanity";

export function RemoteCollaboration({ settings }: { settings: SiteSettings }) {
  const content = settings.remoteCollaboration;
  const faqs = content?.faqs?.length ? content.faqs : remoteCollaborationDefaults.faqs;
  return <section className="section" aria-labelledby="remote-collaboration-heading">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }} />
    <div className="container service-faq-grid"><div><p className="eyebrow">Working internationally</p><h2 id="remote-collaboration-heading">{content?.heading || remoteCollaborationDefaults.heading}</h2><p>{content?.description || remoteCollaborationDefaults.description}</p></div><div className="service-faqs">{faqs.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div>
  </section>;
}
