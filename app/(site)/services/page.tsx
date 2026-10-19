import Link from "next/link";
import { RemoteCollaboration } from "@/components/remote-collaboration";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getServices, getSiteSettings } from "@/sanity/lib/fetchers";
import "@/components/service-pages.css";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSiteSettings({ stega: false });
  return buildMetadata({ title: "Automation, Next.js & Technical SEO Services | Zohaib Ramzan", description: "Remote Next.js development, automation audits and API integration repair for US, UK and European businesses. Clear scope, USD pilot prices and a practical handoff.", keywords: ["remote Next.js developer", "workflow automation consultant", "API integration repair"], path: "/services", settings });
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()]);
  return (
    <main id="main-content" className="main service-pages">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "Services", itemListElement: services.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.title, url: absoluteUrl(`/services/${service.slug}`) })) }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") }] }} />
      <header className="page-hero"><div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <p className="eyebrow">Choose a useful next step</p>
        <div className="page-heading"><h1>Better websites.<br /><span className="text-accent">Workflows that work.</span></h1></div>
        <p className="lead">Start with the problem you need to solve. Explore the scope, deliverables and process before starting a conversation.</p>
        <div className="button-row"><Link className="button button-primary" href="/tools">Help me choose a service <ArrowUpRight size={17} aria-hidden="true" /></Link><Link className="button button-secondary" href="/contact">Discuss your project</Link></div>
      </div></header>
      <section className="section service-catalogue"><div className="container">
        <div className="service-catalogue-heading"><h2>A clear scope. A concrete deliverable.</h2><p>Illustrative prices are in USD. Final scope, access requirements and acceptance criteria are agreed before work starts.</p></div>
        {services.length ? <div className="service-offer-list">{services.map((service, index) => (
          <article className="service-offer-row" key={service.slug}>
            <span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div><h3><Link href={`/services/${service.slug}`}>{service.title}</Link></h3><p>{service.description}</p>{service.audience ? <p className="service-audience">For {service.audience}</p> : null}<Link className="service-text-link" href={`/services/${service.slug}`}>Explore scope and deliverables <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
            <div className="service-offer-price"><span>{service.offerLabel || "Focused project scope"}</span><strong>{service.priceRange || "Scoped after discussion"}</strong>{service.priceNote ? <p>{service.priceNote}</p> : null}</div>
          </article>
        ))}</div> : <p className="empty-state">Service details are being updated. <Link href="/contact">Tell me what you need.</Link></p>}
      </div></section>
      <RemoteCollaboration settings={settings} />
      <section className="section"><div className="container service-bottom-cta"><div><p className="eyebrow">Not sure where to start?</p><h2>Bring the problem.<br />We can define the scope.</h2><p>Share your current tools, the issue and the outcome you want. No passwords or API keys needed.</p></div><Link className="button button-primary" href="/contact">Tell me about your project <ArrowUpRight size={17} aria-hidden="true" /></Link></div></section>
    </main>
  );
}
