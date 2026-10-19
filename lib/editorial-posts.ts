import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

import articles from "@/content/editorial-articles.json";
import { calculateReadingTime } from "@/lib/blog-automation";
import type { Post } from "@/types/sanity";

// The bundled editorial format intentionally supports paragraphs, h2/h3,
// bullet/numbered lists and inline links. CMS content remains Portable Text.
function toPortableText(markdown: string): PortableTextBlock[] {
  return markdown.replace(/^(#{2,3} [^\n]+)\n(?!\n)/gm, "$1\n\n").split(/\n\s*\n/).flatMap((paragraph, index) => {
    const lines = paragraph.trim().split("\n");
    const isList = lines.every((line) => /^(?:- |\d+\. )/.test(line));
    return (isList ? lines : [paragraph]).map((text, itemIndex) => {
      const key = `section-${index}-${itemIndex}`;
      const heading = text.match(/^(#{2,3}) /);
      const list = isList ? (text.startsWith("- ") ? "bullet" : "number") : undefined;
      const content = text.replace(/^(?:#{2,3} |(?:- |\d+\. ))/, "").replace(/\n/g, " ");
      const children: PortableTextSpan[] = [];
      const markDefs: NonNullable<PortableTextBlock["markDefs"]> = [];
      let cursor = 0;
      for (const match of content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
        const start = match.index ?? 0;
        if (start > cursor) {
          children.push({ _type: "span", _key: `${key}-${cursor}`, text: content.slice(cursor, start), marks: [] });
        }
        const markKey = `${key}-link-${start}`;
        markDefs.push({ _type: "link", _key: markKey, href: match[2] });
        children.push({ _type: "span", _key: `${key}-label-${start}`, text: match[1], marks: [markKey] });
        cursor = start + match[0].length;
      }
      if (cursor < content.length || !children.length) {
        children.push({ _type: "span", _key: `${key}-tail`, text: content.slice(cursor), marks: [] });
      }
      return {
        _type: "block",
        _key: key,
        style: heading ? `h${heading[1].length}` : "normal",
        children,
        markDefs,
        ...(list ? { listItem: list, level: 1 } : {})
      };
    });
  });
}

export const editorialPosts: Post[] = articles.map((article) => {
  const body = toPortableText(article.markdown);
  return {
    _id: `editorial-${article.slug}`,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    mainImage: {
      asset: { url: article.image.replace("../public", "") },
      alt: article.imageAlt,
      creditName: article.imageCreditName,
      creditUrl: article.imageCreditUrl,
      licenseUrl: article.imageLicenseUrl
    },
    author: { name: "Muhammad Zohaib Ramzan", slug: "zohaib-ramzan" },
    category: article.category,
    tags: article.tags,
    publishedAt: article.publishedAt,
    firstPublishedAt: article.publishedAt,
    updatedAt: "updatedAt" in article && typeof article.updatedAt === "string" ? article.updatedAt : undefined,
    readingTime: calculateReadingTime(body),
    featured: ["ai-automation-audit-checklist", "idempotent-workflows-prevent-duplicates", "nextjs-technical-seo-checklist"].includes(article.slug),
    body,
    seo: {
      metaTitle: article.title,
      metaDescription: article.excerpt,
      focusKeyword: article.focusKeyword
    }
  };
});
