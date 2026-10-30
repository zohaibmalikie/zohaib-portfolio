import Link from "next/link";
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EnquiryForm } from "@/components/enquiry-form";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getServices, getSiteSettings } from "@/sanity/lib/fetchers";
import "@/components/service-pages.css";

export const revalidate = 3600;
const enquiryOptions: Record<string, string> = {
  "ai-automation-health-check": "health-check",
  "workflow-implementation-or-repair": "build-or-repair",
  "ongoing-automation-maintenance": "maintenance",
  "react-nextjs-frontends": "website",
  "technical-seo-performance": "seo"
};
const whatsappUrl = "https://api.whatsapp.com/send?phone=923090844077";

export async function generateMetadata() {
  const settings = await getSiteSettings({ stega: false });
  return buildMetadata({ title: "Discuss Your Website or Automation Project | Zohaib Ramzan", description: "Describe your website, workflow or integration problem. Discuss a focused scope with Muhammad Zohaib Ramzan through WhatsApp or email.", path: "/contact", settings });
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const [settings, services, query] = await Promise.all([getSiteSettings(), getServices(), searchParams]);
  const selectedService = services.find((service) => service.slug === query.service && enquiryOptions[service.slug]);
  return <main id="main-content" className="main service-pages">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Contact", item: absoluteUrl("/contact") }] }} />
    <header className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} /><p className="eyebrow">Let’s solve it</p><div className="page-heading"><h1>Tell me what is<br /><span className="text-accent">slowing you down.</span></h1></div><p className="lead">A failing integration, repetitive work, or a website that needs attention? Start with the problem. We can work out a focused scope together.</p></div></header>
    <section className="section service-contact-section"><div className="container service-contact-grid">
      <aside className="service-contact-notes"><p className="eyebrow">A useful first message</p><h2>A little context<br />goes a long way.</h2><ol><li><strong>Your tools</strong><span>The website, platforms or integrations you use.</span></li><li><strong>The problem</strong><span>What is failing, taking too long or holding you back.</span></li><li><strong>The outcome</strong><span>What you want to work differently, plus any deadline.</span></li></ol><p>No passwords, API keys or private customer data needed.</p><div className="service-direct-contact"><h3>Prefer a direct conversation?</h3><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /> WhatsApp <ArrowUpRight size={15} aria-hidden="true" /></a>{settings.email ? <a href={`mailto:${settings.email}`}><Mail size={18} aria-hidden="true" />{settings.email}</a> : null}{settings.linkedinLink ? <a href={settings.linkedinLink} target="_blank" rel="me noopener noreferrer">LinkedIn <ArrowUpRight size={15} aria-hidden="true" /></a> : null}</div><h3>What happens next?</h3><p>I review your brief to clarify the problem and whether the work is a fit. We then agree deliverables, access, price and acceptance checks before work begins. Remote projects can use written updates and an agreed meeting window across time zones.</p></aside>
      <div className="service-contact-form"><h2>Start your enquiry</h2>{selectedService ? <p className="service-selected-context">You selected <Link href={`/services/${selectedService.slug}`}>{selectedService.title}</Link>. You can change the service below.</p> : <p>Share the essentials. A rough budget is helpful, and “not sure yet” is fine.</p>}<EnquiryForm email={settings.email} key={selectedService?.slug || "general"} defaultService={selectedService ? enquiryOptions[selectedService.slug] : undefined} /><p className="service-contact-explanation">Prepare your brief here, then choose email or WhatsApp to review and send it. No message is delivered or booking confirmed until you complete that step in your chosen app.</p></div>
    </div></section>
  </main>;
}
