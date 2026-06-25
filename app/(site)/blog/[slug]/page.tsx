import { notFound } from "next/navigation";

import { ArticleToc } from "@/components/article-toc";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PortableContent } from "@/components/portable-content";
import { SanityImage } from "@/components/sanity-image";
import { formatDate, getReadingTime } from "@/lib/content-utils";
import { absoluteUrl, buildMetadata, getImageUrl } from "@/lib/seo";
import {
  getPost,
  getPostSlugs,
  getRelatedPosts,
  getSiteSettings
} from "@/sanity/lib/fetchers";

export const revalidate = 3600;

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPostSlugs();
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPost(slug, { stega: false }),
    getSiteSettings({ stega: false })
  ]);

  if (!post) {
    return buildMetadata({
      title: "Article not found",
      path: "/blog",
      settings
    });
  }

  return buildMetadata({
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    path: post.seo?.canonicalUrl || `/blog/${post.slug}`,
    image: post.seo?.openGraphImage || post.mainImage,
    settings,
    type: "article",
    publishedDate: post.publishedAt,
    modifiedDate: post.updatedAt || post.publishedAt,
    author: post.author?.name,
    tags: post.tags?.length
      ? post.tags
      : post.category?.title
        ? [post.category.title]
        : undefined
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post);
  const readingTime = getReadingTime(post);
  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const imageUrl = getImageUrl(post.mainImage);
  const absoluteImageUrl = imageUrl ? absoluteUrl(imageUrl) : undefined;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteImageUrl ? [absoluteImageUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: post.author?.name
      ? {
          "@type": "Person",
          name: post.author.name
        }
      : undefined,
    publisher: {
      "@type": "Person",
      name: "Muhammad Zohaib Ramzan"
    },
    articleSection: post.category?.title,
    keywords: post.tags?.join(", "),
    mainEntityOfPage: postUrl
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
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl
      }
    ]
  };

  return (
    <main id="main-content" className="main">
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbSchema} />
      <article>
        <header className="article-header">
          <div className="container-narrow">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title }
              ]}
            />
            <p className="eyebrow">{post.category?.title || "Article"}</p>
            <div className="page-heading">
              <h1>{post.title}</h1>
            </div>
            <p className="lead">{post.excerpt}</p>
            <div className="meta-row">
              <span>{formatDate(post.publishedAt)}</span>
              <span>{readingTime} min read</span>
              {post.author?.name ? <span>{post.author.name}</span> : null}
            </div>
          </div>
        </header>

        <SanityImage
          image={post.mainImage}
          width={1200}
          height={680}
          className="article-cover"
          priority
          sizes="(max-width: 1200px) calc(100vw - 36px), 1100px"
        />

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container article-shell">
            <PortableContent value={post.body} />
            <ArticleToc body={post.body} />
          </div>
        </section>
      </article>

      {relatedPosts.length ? (
        <section className="section section-muted">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Related</p>
                <h2>Keep reading.</h2>
              </div>
            </div>
            <div className="grid grid-3">
              {relatedPosts.map((related) => (
                <a href={`/blog/${related.slug}`} className="card post-card" key={related._id}>
                  <SanityImage
                    image={related.mainImage}
                    width={760}
                    height={475}
                    className="card-image"
                  />
                  <div className="card-body">
                    <h3>{related.title}</h3>
                    <p>{related.excerpt}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
