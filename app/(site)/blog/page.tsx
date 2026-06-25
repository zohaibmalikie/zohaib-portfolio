import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { SanityImage } from "@/components/sanity-image";
import { formatDate, getReadingTime } from "@/lib/content-utils";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getPosts, getSiteSettings } from "@/sanity/lib/fetchers";

export const revalidate = 3600;

type BlogPageProps = {
  searchParams: Promise<{
    category?: string;
    tag?: string;
  }>;
};

export async function generateMetadata() {
  const settings = await getSiteSettings({ stega: false });
  return buildMetadata({
    title: "Blog",
    description:
      "Technical articles about Next.js, React, SvelteKit, Sanity CMS, Builder.io, technical SEO, and frontend architecture.",
    path: "/blog",
    settings
  });
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const filters = await searchParams;
  const posts = await getPosts({
    category: filters.category,
    tag: filters.tag
  });
  const categories = Array.from(
    new Map(
      posts
        .filter((post) => post.category?.slug)
        .map((post) => [post.category?.slug, post.category])
    ).values()
  );
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Frontend development articles by Zohaib Ramzan",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
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
          <h1>Technical articles for better frontend publishing.</h1>
          <p className="lead">
            Notes on Next.js, React, SvelteKit, technical SEO, Core Web Vitals,
            Sanity CMS, Builder.io, AI automation, SaaS frontend architecture,
            and ecommerce optimization.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="filter-bar">
            <Link href="/blog" aria-current={!filters.category && !filters.tag}>
              All
            </Link>
            {categories.map((category) =>
              category?.slug ? (
                <Link
                  key={category.slug}
                  href={`/blog?category=${category.slug}`}
                  aria-current={filters.category === category.slug}
                >
                  {category.title}
                </Link>
              ) : null
            )}
            {tags.slice(0, 6).map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                aria-current={filters.tag === tag}
              >
                {tag}
              </Link>
            ))}
          </div>

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
        </div>
      </section>
    </main>
  );
}
