import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SanityImage } from "@/components/sanity-image";
import { getTopics } from "@/lib/topics";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/fetchers";
import "@/components/topic-pages.css";

export const revalidate = 3600;
export async function generateMetadata() {
  const settings = await getSiteSettings({ stega: false });
  return buildMetadata({ title: "Practical Guides by Topic | Automation, Websites & SEO", description: "Follow curated reading paths for automation reliability, API integrations, AI safeguards, frontend development, web performance, technical SEO and Sanity CMS.", path: "/blog/topics", settings });
}

export default async function TopicsPage() {
  const topics = await getTopics();
  const itemList = { "@type": "ItemList", itemListElement: topics.map((topic, index) => ({ "@type": "ListItem", position: index + 1, name: topic.title, url: absoluteUrl(`/blog/topics/${topic.slug}`) })) };
  return <main id="main-content" className="main topic-pages">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Practical guides by topic", description: "Curated reading paths for reliable automations and better websites.", url: absoluteUrl("/blog/topics"), mainEntity: itemList }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") }, { "@type": "ListItem", position: 3, name: "Topics", item: absoluteUrl("/blog/topics") }] }} />
    <header className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Topics" }]} /><p className="eyebrow">A practical reading library</p><div className="page-heading"><h1>Find the guide<br />for your next step.</h1></div><p className="lead">Curated reading paths for reliable automations and better websites. Choose the problem you are working on, then start with the recommended guides.</p><Link className="topic-inline-link" href="/blog">Browse all articles <ArrowUpRight size={16} aria-hidden="true" /></Link></div></header>
    <section className="section topic-index-section"><div className="container"><h2 className="sr-only">Explore topics</h2>{topics.length ? <div className="topic-index">{topics.map((topic, index) => {
      const coverPost = topic.posts.find((post) => topic.featuredPostSlugs.includes(post.slug) && post.mainImage) || topic.posts.find((post) => post.mainImage);
      return <article className="topic-index-row" key={topic.slug}><span className="topic-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><p className="topic-count">{topic.posts.length} practical {topic.posts.length === 1 ? "guide" : "guides"}</p><h2><Link href={`/blog/topics/${topic.slug}`}>{topic.title}</Link></h2><p>{topic.description}</p><Link className="topic-inline-link" href={`/blog/topics/${topic.slug}`}>Explore this reading path <ArrowUpRight size={16} aria-hidden="true" /></Link></div>{coverPost ? <Link href={`/blog/topics/${topic.slug}`} className="topic-index-cover" aria-label={`Explore ${topic.title}`} tabIndex={-1}><SanityImage image={coverPost.mainImage} width={500} height={300} sizes="(max-width: 650px) 100vw, 260px" /></Link> : null}</article>;
    })}</div> : <p className="empty-state">Reading paths are being updated. <Link href="/blog">Browse the article library.</Link></p>}</div></section>
  </main>;
}
