import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SanityImage } from "@/components/sanity-image";
import { absoluteUrl, buildMetadata, canonicalUrlFor } from "@/lib/seo";
import { getPosts, getProjects, getService, getServices, getSiteSettings } from "@/sanity/lib/fetchers";
import "@/components/service-pages.css";

export const revalidate = 3600;
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getServices({ publishedOnly: true })).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getService(slug), getSiteSettings({ stega: false })]);
  if (!service) notFound();
  return buildMetadata({ title: service.seo?.metaTitle || service.seo?.title || `${service.title} | Zohaib Ramzan`, keywords: service.seo?.keywords || [service.seo?.focusKeyword || service.title, ...(service.relatedTechnologies || [])], description: service.seo?.metaDescription || service.seo?.description || service.description, path: `/services/${service.slug}`, canonicalUrl: service.seo?.canonicalUrl, image: service.seo?.ogImage || service.seo?.openGraphImage, noIndex: service.seo?.noIndex, openGraphTitle: service.seo?.ogTitle, openGraphDescription: service.seo?.ogDescription, settings });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service || !service.overview?.length) notFound();
  const [posts, projects, settings, services] = await Promise.all([getPosts(), getProjects(), getSiteSettings(), getServices()]);
  const relatedServices = services.filter((candidate) => candidate.slug !== service.slug && !candidate.seo?.noIndex && service.relatedServiceSlugs?.includes(candidate.slug));
  const relatedPosts = posts.filter((post) => service.relatedPostSlugs?.includes(post.slug) && !post.seo?.noIndex).slice(0, 3);
  const relatedProjects = projects.filter((project) => service.relatedProjectSlugs?.includes(project.slug) && !project.seo?.noIndex).slice(0, 2);
  const enquiryHref = `/contact?service=${encodeURIComponent(service.slug)}`;
  const url = canonicalUrlFor(`/services/${service.slug}`, service.seo?.canonicalUrl);
  return <main id="main-content" className="main service-pages">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.description, url, serviceType: service.title, areaServed: ["United States", "United Kingdom", "Europe"], provider: { "@type": "Person", name: settings.name, url: absoluteUrl("/") } }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") }, { "@type": "ListItem", position: 3, name: service.title, item: url }] }} />
    {service.faqs?.length ? <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }} /> : null}
    <article>
      <header className="page-hero"><div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]} />
        <p className="eyebrow">{service.title}</p><div className="page-heading"><h1>{service.headline || service.title}</h1></div><p className="lead">{service.description}</p>
        <div className="button-row"><Link className="button button-primary" href={enquiryHref}>Discuss this service <ArrowUpRight size={17} aria-hidden="true" /></Link><a className="button button-secondary" href="#service-deliverables">See what is included</a></div>
      </div></header>
      <section className="section service-scope-section"><div className="container service-scope-grid">
        <div className="service-overview"><p className="eyebrow">The scope</p><h2>Make the next step practical.</h2>{service.overview.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        <aside className="service-scope-summary" aria-label="Service summary"><p className="eyebrow">At a glance</p>{service.audience ? <><h2>A good fit for</h2><p>{service.audience}</p></> : null}<span className="service-price-label">{service.offerLabel || "Project pricing"}</span><strong className="service-price">{service.priceRange || "Agreed after scoping"}</strong>{service.priceNote ? <p>{service.priceNote}</p> : null}<p className="service-price-footnote">Illustrative USD pricing. Confirm the deliverables and final price before work begins.</p>{service.relatedTechnologies?.length ? <div className="chip-list">{service.relatedTechnologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div> : null}</aside>
      </div></section>
      {service.deliverables?.length ? <section className="section section-muted" id="service-deliverables"><div className="container service-deliverables-grid"><div><p className="eyebrow">What you receive</p><h2>Deliverables you<br />can put to use.</h2></div><ul className="service-deliverables">{service.deliverables.map((item) => <li key={item}><Check size={19} aria-hidden="true" /><span>{item}</span></li>)}</ul></div></section> : null}
      {service.process?.length ? <section className="section"><div className="container"><p className="eyebrow">How we work</p><h2 className="service-section-title">From first conversation to handover.</h2><ol className="service-process">{service.process.map((step, index) => <li key={step.title}><span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></div></section> : null}
      {relatedProjects.length ? <section className="section section-muted"><div className="container"><p className="eyebrow">Selected work</p><h2 className="service-section-title">See the implementation.</h2><div className="service-related-work">{relatedProjects.map((project) => <Link href={`/work/${project.slug}`} className="service-project-link" key={project.slug}><SanityImage image={project.mainImage} width={800} height={460} className="card-image" /><div><h3>{project.title} <ArrowUpRight size={19} aria-hidden="true" /></h3><p>{project.shortDescription}</p></div></Link>)}</div></div></section> : null}
      {relatedServices.length ? <section className="section"><div className="container"><h2>Related services.</h2><p>Explore adjacent work when your project needs more than one scope.</p><div className="button-row">{relatedServices.map((candidate) => <Link className="button button-secondary" key={candidate.slug} href={`/services/${candidate.slug}`}>{candidate.title}</Link>)}</div></div></section> : null}
      {service.faqs?.length ? <section className="section"><div className="container service-faq-grid"><div><p className="eyebrow">Before you start</p><h2>Useful answers.</h2></div><div className="service-faqs">{service.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section> : null}
      {relatedPosts.length ? <section className="section section-muted"><div className="container"><p className="eyebrow">Practical reading</p><h2 className="service-section-title">Explore the details.</h2><div className="service-reading">{relatedPosts.map((post) => <Link href={`/blog/${post.slug}`} key={post.slug}><h3>{post.title} <ArrowUpRight size={17} aria-hidden="true" /></h3><p>{post.excerpt}</p></Link>)}</div></div></section> : null}
      <section className="section"><div className="container service-bottom-cta"><div><p className="eyebrow">Your next step</p><h2>Let’s define a useful scope.</h2><p>Tell me what you use, what needs attention and what a successful outcome looks like.</p></div><Link className="button button-primary" href={enquiryHref}>Discuss {service.title.toLowerCase()} <ArrowUpRight size={17} aria-hidden="true" /></Link></div></section>
    </article>
  </main>;
}
