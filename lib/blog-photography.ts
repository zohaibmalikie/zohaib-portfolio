import coverArt from "@/content/blog-cover-art.json";
import type { Post, SanityImage } from "@/types/sanity";

type CoverBrief = { alt: string; prompt: string; source: string };
const articleCovers: Record<string, CoverBrief> = coverArt;

/** Each published article has its own original cover; never reuse a category image. */
export function withBlogPhotography(post: Post): Post {
  if (post.useOriginalImage && post.mainImage?.asset) return post;
  const cover = articleCovers[post.slug];
  // Future CMS articles retain their uploaded cover until a unique asset is supplied.
  if (!cover) return post;
  const mainImage: SanityImage = {
    asset: { url: `/assets/img/blogs/artwork/${post.slug}.webp` },
    alt: cover.alt,
    caption: "AI-generated editorial illustration created for this article."
  };
  return { ...post, mainImage };
}
