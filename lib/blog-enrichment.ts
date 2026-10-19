import enrichmentContent from "@/content/blog-enrichment.json";
import type { Post } from "@/types/sanity";

type ArticleEnrichment = {
  source: string;
  updatedAt?: string;
  faqs: Array<{ question: string; answer: string }>;
  visualSteps: Array<{ title: string; description: string }>;
};

const enrichments: Record<string, ArticleEnrichment> = enrichmentContent;

/** Supplement existing public articles; authored CMS enhancements remain authoritative. */
export function enrichPost(post: Post): Post {
  const enrichment = enrichments[post.slug];
  if (!enrichment) return post;

  const enrichmentUpdatedAt = enrichment.updatedAt || "2026-10-18T22:02:13.000Z";
  return {
    ...post,
    // This is the fixed editorial update time, never the request/build time.
    updatedAt: Date.parse(post.updatedAt || post.firstPublishedAt || post.publishedAt || "") > Date.parse(enrichmentUpdatedAt)
      ? post.updatedAt || post.firstPublishedAt || post.publishedAt
      : enrichmentUpdatedAt,
    faqs: post.faqs?.length ? post.faqs : enrichment.faqs,
    visualSteps: post.visualSteps?.length ? post.visualSteps : enrichment.visualSteps
  };
}
