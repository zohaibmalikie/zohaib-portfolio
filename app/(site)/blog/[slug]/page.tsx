import { notFound } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";

import { ArticleVisual, ArticleProcess } from "@/components/article-visual";
import { ArticleToc } from "@/components/article-toc";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PortableContent } from "@/components/portable-content";
import { SanityImage } from "@/components/sanity-image";
import { ActionLink } from "@/components/ui/action-link";
import { getTopics } from "@/lib/topics";
import Link from "next/link";
import { formatDate, getHeadingId, getReadingTime } from "@/lib/content-utils";
import { absoluteUrl, buildMetadata, getImageUrl } from "@/lib/seo";
import {
  getPost,
  getPostSlugs,
  getRelatedPosts,
  getSiteSettings
} from "@/sanity/lib/fetchers";

export const revalidate = 3600;

function withoutLegacyFaq(body?: PortableTextBlock[]) {
  let inFaqSection = false;
  return body?.filter((block) => {
    if (block._type === "block" && block.style === "h2") {
      const title = block.children?.map((child) => "text" in child ? child.text : "").join("").trim() || "";
      inFaqSection = /^(?:frequently asked questions|faqs?)(?:\s|$)/i.test(title);
    }
    return !inFaqSection;
  });
}


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

  const seoTitle = post.seo?.metaTitle || post.seo?.title || post.title;
  const seoDescription =
    post.seo?.metaDescription || post.seo?.description || post.excerpt;
  const ogTitle = post.seo?.ogTitle || seoTitle;
  const ogDescription = post.seo?.ogDescription || seoDescription;
  const seoImage = post.seo?.ogImage || post.seo?.openGraphImage || post.mainImage;

  return buildMetadata({
    title: seoTitle,
    description: seoDescription,
    path: post.seo?.canonicalUrl || `/blog/${post.slug}`,
    image: seoImage,
    settings,
    type: "article",
    publishedDate: post.firstPublishedAt || post.publishedAt,
    modifiedDate: post.updatedAt || post.firstPublishedAt || post.publishedAt,
    author: post.author?.name,
    tags: post.tags?.length
      ? post.tags
      : post.category?.title
        ? [post.category.title]
        : undefined,
    noIndex: post.seo?.noIndex,
    openGraphTitle: ogTitle,
    openGraphDescription: ogDescription,
    twitterTitle: ogTitle,
    twitterDescription: ogDescription
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const [relatedPosts, topics, settings] = await Promise.all([getRelatedPosts(post), getTopics(), getSiteSettings({ stega: false })]);
  const faqs = post.faqs?.filter((faq) => faq.question.trim() && faq.answer.trim()) || [];
  const articleBody = faqs.length ? withoutLegacyFaq(post.body) : post.body;
  const faqTitle = "Frequently asked questions";
  const faqAnchor = getHeadingId(faqTitle);
  const tocBody = faqs.length ? [...(articleBody || []), { _type: "block", _key: "article-faq-toc", style: "h2", markDefs: [], children: [{ _type: "span", _key: "faq-toc-span", text: faqTitle, marks: [] }] }] : articleBody;
  const topic = topics.find((candidate) => candidate.slug === post.category?.slug);
  const readingTime = getReadingTime(post);
  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const seoImage = post.seo?.ogImage || post.seo?.openGraphImage || post.mainImage;
  const imageUrl = getImageUrl(post.mainImage || seoImage);
  const absoluteImageUrl = imageUrl ? absoluteUrl(imageUrl) : undefined;
  const schemaDescription =
    post.seo?.metaDescription ||
    post.seo?.description ||
    post.excerpt;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline: post.title,
    description: schemaDescription,
    image: absoluteImageUrl ? [{
      "@type": "ImageObject", contentUrl: absoluteImageUrl,
      caption: post.mainImage?.alt,
      ...(post.mainImage?.creditName ? {
        creditText: post.mainImage.creditName,
        creator: { "@type": "Person", name: post.mainImage.creditName },
        license: post.mainImage.licenseUrl,
        acquireLicensePage: post.mainImage.creditUrl
      } : {})
    }] : undefined,
    datePublished: post.firstPublishedAt || post.publishedAt,
    dateModified: post.updatedAt || post.firstPublishedAt || post.publishedAt,
    author: post.author?.name
      ? {
          "@type": "Person",
          "@id": /zohaib/i.test(post.author.name) || post.author.name === settings.name ? absoluteUrl("/#person") : `${postUrl}#author`,
          name: post.author.name
        }
      : { "@id": absoluteUrl("/#person") },
    publisher: {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: settings.name
    },
    url: postUrl,
    articleSection: post.category?.title,
    keywords: post.tags?.join(", "),
    mainEntityOfPage: { "@id": `${postUrl}#webpage` }
  };

  const pageSchema = {
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${postUrl}#webpage`, url: postUrl, name: post.title,
    isPartOf: { "@id": absoluteUrl("/#website") }, mainEntity: { "@id": `${postUrl}#article` },
    ...(faqs.length ? { hasPart: { "@id": `${postUrl}#faq` } } : {})
  };
  const faqSchema = faqs.length ? {
    "@context": "https://schema.org", "@type": "FAQPage", "@id": `${postUrl}#faq`, url: `${postUrl}#${faqAnchor}`,
    isPartOf: { "@id": `${postUrl}#webpage` },
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } }))
  } : null;

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
      <JsonLd data={pageSchema} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
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
            <p className="eyebrow">{topic ? <Link href={`/blog/topics/${topic.slug}`}>{topic.title}</Link> : post.category?.title || "Article"}</p>
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

        <ArticleVisual image={post.mainImage} />

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container article-shell">
            <div className="article-content-column">
              <ArticleProcess steps={post.visualSteps} />
              <PortableContent value={articleBody} />
              {faqs.length ? <section className="article-faqs" id={faqAnchor} aria-labelledby="article-faq-heading"><p className="eyebrow">A few practical answers</p><h2 id="article-faq-heading">{faqTitle}</h2>{faqs.map((faq, index) => <details key={`${faq.question}-${index}`}><summary><h3>{faq.question}</h3></summary><p>{faq.answer}</p></details>)}</section> : null}
            </div>
            <ArticleToc body={tocBody} />
          </div>
        </section>
      </article>

      <aside className="article-enquiry" aria-labelledby="article-enquiry-title">
        <div className="container-narrow">
          <p className="eyebrow">Put this guide to work</p>
          <h2 id="article-enquiry-title">Need help applying this to your business?</h2>
          <p>
            Share what you are trying to improve, the tools involved, and where
            you are stuck. Let&apos;s turn the next step into a clear scope.
          </p>
          <div className="button-row">
            <ActionLink href="/contact">Discuss your project</ActionLink>
            <ActionLink href="/services" variant="ghost">Explore the services</ActionLink>
          </div>
        </div>
      </aside>

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
                <Link href={`/blog/${related.slug}`} className="card post-card" key={related._id}>
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
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
