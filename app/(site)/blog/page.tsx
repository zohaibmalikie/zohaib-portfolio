import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { SanityImage } from "@/components/sanity-image";
import { formatDate, getReadingTime } from "@/lib/content-utils";
import { matchesPostFilters } from "@/lib/post-collections";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getPosts, getSiteSettings } from "@/sanity/lib/fetchers";

export const revalidate = 3600;
const PAGE_SIZE = 12;

function getPage(value?: string) {
  const page = Number(value);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

type BlogPageProps = {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    page?: string;
  }>;
};

export async function generateMetadata({ searchParams }: BlogPageProps) {
  const filters = await searchParams;
  const isFiltered = Boolean(filters.category || filters.tag);
  const page = getPage(filters.page);
  const settings = await getSiteSettings({ stega: false });

  return buildMetadata({
    title: isFiltered ? "Filtered Blog Articles" : page > 1 ? `Blog — Page ${page}` : "Automation, Frontend & Technical SEO Guides",
    description:
      "Practical guides to workflow automation, API integration repair, AI costs, Next.js, Sanity CMS, technical SEO, and web performance.",
    path: page > 1 ? `/blog?page=${page}` : "/blog",
    settings,
    noIndex: isFiltered
  });
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const filters = await searchParams;
  const allPosts = await getPosts();
  const matchingPosts = allPosts.filter((post) => matchesPostFilters(post, filters.category, filters.tag));
  const page = getPage(filters.page);
  const pageCount = Math.max(1, Math.ceil(matchingPosts.length / PAGE_SIZE));
  if (page > pageCount) notFound();
  const posts = matchingPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageUrl = (target: number) => {
    const query = new URLSearchParams();
    if (filters.category) query.set("category", filters.category);
    if (filters.tag) query.set("tag", filters.tag);
    if (target > 1) query.set("page", String(target));
    return `/blog${query.size ? `?${query}` : ""}`;
  };
  const categories = Array.from(
    new Map(
      allPosts
        .filter((post) => post.category?.slug)
        .map((post) => [post.category?.slug, post.category])
    ).values()
  );
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Automation, frontend and technical SEO guides by Muhammad Zohaib Ramzan",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: (page - 1) * PAGE_SIZE + index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
      description: post.excerpt
    }))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/")
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: absoluteUrl("/blog")
      }
    ]
  };

  return (
    <main id="main-content" className="main">
      <JsonLd data={blogListSchema} />
      <JsonLd data={breadcrumbSchema} />
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Blog</p>
          <div className="page-heading">
            <h1>Practical guides for reliable workflows and better websites.</h1>
          </div>
          <p className="lead">
            Actionable checklists for automation audits, API integration repair,
            AI workflow costs, Next.js, Sanity CMS, technical SEO, and web performance.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <p><Link href="/blog/topics">Browse the topic guides →</Link></p>
          <div className="filter-bar">
            <Link href="/blog" aria-current={!filters.category && !filters.tag}>
              All
            </Link>
            {categories.map((category) =>
              category?.slug ? (
                <Link
                  key={category.slug}
                  href={["automation-strategy", "automation-reliability", "api-integrations", "business-workflows", "ai-workflows", "technical-seo", "frontend-engineering", "web-performance", "cms-engineering"].includes(category.slug) ? `/blog/topics/${category.slug}` : `/blog?category=${category.slug}`}
                  aria-current={filters.category === category.slug}
                >
                  {category.title}
                </Link>
              ) : null
            )}

          </div>

          <p className="blog-result-count" aria-live="polite">
            {matchingPosts.length} {matchingPosts.length === 1 ? "guide" : "guides"}
            {pageCount > 1 ? ` · Page ${page} of ${pageCount}` : ""}
          </p>
          {posts.length ? (
            <div className="grid grid-3">
              {posts.map((post) => (
                <Link href={`/blog/${post.slug}`} className="card post-card" key={post._id}>
                  <SanityImage
                    image={post.mainImage}
                    width={760}
                    height={475}
                    className="card-image"
                  />
                  <div className="card-body">
                    <div className="meta-row">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>{getReadingTime(post)} min read</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <div className="chip-list">
                      {post.tags?.slice(0, 3).map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              No articles match this filter yet.
            </div>
          )}
          {pageCount > 1 ? (
            <nav className="blog-pagination" aria-label="Blog pages">
              {page > 1 ? <Link href={pageUrl(page - 1)}>← Previous</Link> : null}
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                <Link key={number} href={pageUrl(number)} aria-current={page === number ? "page" : undefined}>
                  <span className="sr-only">Page </span>{number}
                </Link>
              ))}
              {page < pageCount ? <Link href={pageUrl(page + 1)}>Next →</Link> : null}
            </nav>
          ) : null}
        </div>
      </section>
    </main>
  );
}
