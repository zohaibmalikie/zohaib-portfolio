import photos from "@/content/blog-photography.json";
import type { Post, SanityImage } from "@/types/sanity";

// Curated, locally hosted Unsplash photographs. Full source/license records are
// kept alongside the assets; the visible credit travels with every article.
export function withBlogPhotography(post: Post): Post {
  if (post.useOriginalImage && post.mainImage?.asset) return post;
  const subject = `${post.slug} ${post.category?.slug || ""}`;
  const key = /roi|cost|metrics|monitor|analytics|search-console|seo|index|sitemap|canonical/.test(subject)
    ? (/cost|roi|business/.test(subject) ? "dashboard" : "analytics")
    : /strategy|planning|acceptance|audit|handoff|documentation|onboarding|human|workflow|process|migration/.test(subject)
      ? "planning"
      : /api|webhook|oauth|json|react|code|typescript|javascript|groq|cache|fetch/.test(subject)
        ? "code"
        : /self-host|infrastructure|hardware|server/.test(subject) ? "hardware" : "workspace";
  const photo = photos.find((item) => item.key === key);
  if (!photo) return post;
  const { asset, alt, creditName, creditUrl, licenseUrl } = photo;
  const mainImage: SanityImage = { asset, alt, creditName, creditUrl, licenseUrl };
  return { ...post, mainImage };
}
