import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SanityImage } from "@/components/sanity-image";
import { getReadingTime } from "@/lib/content-utils";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getTopic, getTopics } from "@/lib/topics";
import { getServices, getSiteSettings } from "@/sanity/lib/fetchers";
import "@/components/topic-pages.css";

export const revalidate = 3600;
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getTopics({ publishedOnly: true })).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [topic, settings] = await Promise.all([getTopic(slug), getSiteSettings({ stega: false })]);
  if (!topic) notFound();
  return buildMetadata({ title: `${topic.title} Guides | Zohaib Ramzan`, description: topic.description, path: `/blog/topics/${topic.slug}`, settings });
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = await getTopic(slug);
  if (!topic) notFound();
  const featured = topic.featuredPostSlugs.flatMap((featuredSlug) => {
    const post = topic.posts.find((candidate) => candidate.slug === featuredSlug);
    return post ? [post] : [];
  }).filter((post, index, posts) => posts.findIndex((candidate) => candidate.slug === post.slug) === index);
  const remaining = topic.posts.filter((post) => !featured.some((candidate) => candidate.slug === post.slug));
  const visiblePosts = [...featured, ...remaining];
  const services = (await getServices()).filter((service) => topic.serviceSlugs.includes(service.slug));
  const url = absoluteUrl(`/blog/topics/${topic.slug}`);
  return <main id="main-content" className="main topic-pages">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: topic.title, description: topic.description, url, mainEntity: { "@type": "ItemList", numberOfItems: visiblePosts.length, itemListElement: visiblePosts.map((post, index) => ({ "@type": "ListItem", position: index + 1, name: post.title, url: absoluteUrl(`/blog/${post.slug}`) })) } }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") }, { "@type": "ListItem", position: 3, name: "Topics", item: absoluteUrl("/blog/topics") }, { "@type": "ListItem", position: 4, name: topic.title, item: url }] }} />
    <header className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Topics", href: "/blog/topics" }, { label: topic.title }]} /><p className="eyebrow">Reading path · {topic.posts.length} guides</p><div className="page-heading"><h1>{topic.title}</h1></div><p className="lead">{topic.description}</p><div className="topic-introduction">{topic.introParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div></header>
    {featured.length ? <section className="section topic-start-section"><div className="container"><div className="topic-section-heading"><div><p className="eyebrow">Recommended order</p><h2>Start here.</h2></div><p>Build the foundation, then explore the specific issue you need to solve.</p></div><ol className="topic-featured">{featured.map((post, index) => <li key={post.slug}><Link href={`/blog/${post.slug}`}><div className="topic-featured-image"><SanityImage image={post.mainImage} width={720} height={420} sizes="(max-width: 650px) 100vw, 33vw" /><span aria-label={`Step ${index + 1}`}>{String(index + 1).padStart(2, "0")}</span></div><div className="topic-featured-body"><p className="topic-count">{getReadingTime(post)} min read</p><h3>{post.title} <ArrowUpRight size={17} aria-hidden="true" /></h3><p>{post.excerpt}</p></div></Link></li>)}</ol></div></section> : null}
    {remaining.length ? <section className="section section-muted"><div className="container"><div className="topic-section-heading"><div><p className="eyebrow">The rest of the collection</p><h2>{featured.length ? "Go deeper." : "Explore the guides."}</h2></div><p>Choose the guide closest to your current challenge.</p></div><div className="topic-article-list">{remaining.map((post) => <article key={post.slug}><Link href={`/blog/${post.slug}`} className="topic-article-link"><div><h3>{post.title}</h3><p>{post.excerpt}</p></div><span className="topic-article-time">{getReadingTime(post)} min read <ArrowUpRight size={18} aria-hidden="true" /></span></Link></article>)}</div></div></section> : null}
    <section className="section"><div className="container topic-service-section"><div><p className="eyebrow">From reading to implementation</p><h2>Need help applying this?</h2><p>Bring the tools you use, the issue and the outcome you want. Explore a relevant service or describe your project.</p></div><div className="topic-service-links">{services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}>{service.title}<ArrowUpRight size={17} aria-hidden="true" /></Link>)}<Link className="topic-inline-link" href="/contact">Discuss your project <ArrowUpRight size={17} aria-hidden="true" /></Link><Link className="topic-inline-link" href="/blog/topics">Explore all topics <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div></section>
  </main>;
}
