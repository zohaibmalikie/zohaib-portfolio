import type { MetadataRoute } from "next";

import { isCanonicalPublicPage } from "@/lib/indexing";
import { absoluteUrl, getImageUrl } from "@/lib/seo";
import { getTopics } from "@/lib/topics";
import { getPosts, getProjects, getServices } from "@/sanity/lib/fetchers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects, services, topics] = await Promise.all([
    getPosts({ stega: false, publishedOnly: true }), getProjects({ stega: false }), getServices({ publishedOnly: true }), getTopics({ publishedOnly: true })
  ]);
  return [
    ...["/", "/services", "/work", "/blog", "/blog/topics", "/tools", "/contact"].map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8
    })),
    ...services.filter((service) => isCanonicalPublicPage(`/services/${service.slug}`, service.seo)).map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`), changeFrequency: "monthly" as const, priority: 0.8
    })),
    ...topics.map((topic) => ({ url: absoluteUrl(`/blog/topics/${topic.slug}`), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...posts.filter((post) => isCanonicalPublicPage(`/blog/${post.slug}`, post.seo)).map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt || post.firstPublishedAt || post.publishedAt || undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: sitemapImages(post.mainImage)
    })),
    ...projects.filter((project) => isCanonicalPublicPage(`/work/${project.slug}`, project.seo)).map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`), changeFrequency: "monthly" as const, priority: 0.7, images: sitemapImages(project.mainImage)
    }))
  ];
}

function sitemapImages(image: Parameters<typeof getImageUrl>[0]) {
  const value = getImageUrl(image);
  // Next's metadata sitemap serializer writes image URLs verbatim. Escape
  // query separators here so transformed Sanity URLs remain valid XML.
  return value ? [absoluteUrl(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")] : undefined;
}
