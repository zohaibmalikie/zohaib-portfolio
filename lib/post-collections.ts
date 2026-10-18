import type { Post } from "@/types/sanity";

export function mergePosts(primary: Post[], bundled: Post[]): Post[] {
  const bySlug = new Map(bundled.map((post) => [post.slug, post]));
  for (const post of primary) bySlug.set(post.slug, post);
  return Array.from(bySlug.values()).sort((a, b) =>
    (b.firstPublishedAt || b.publishedAt || "").localeCompare(a.firstPublishedAt || a.publishedAt || "")
  );
}

export function matchesPostFilters(post: Post, category?: string, tag?: string) {
  return (!category || post.category?.slug === category) && (!tag || Boolean(post.tags?.includes(tag)));
}
