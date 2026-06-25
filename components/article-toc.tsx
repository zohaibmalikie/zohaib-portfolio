import type { PortableTextBlock } from "@portabletext/types";

import { getHeadingId } from "@/lib/content-utils";

export function ArticleToc({ body }: { body?: PortableTextBlock[] }) {
  const headings =
    body
      ?.filter((block) => block._type === "block" && ["h2", "h3"].includes(block.style || ""))
      .map((block) => {
        const title =
          block.children
            ?.map((child) => ("text" in child ? child.text : ""))
            .join("") || "";
        return {
          title,
          id: getHeadingId(title),
          level: block.style === "h3" ? 3 : 2
        };
      })
      .filter((heading) => heading.title) || [];

  if (!headings.length) return null;

  return (
    <aside className="toc" aria-label="Table of contents">
      <p>On this page</p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={heading.level === 3 ? "toc-nested" : undefined}
        >
          {heading.title}
        </a>
      ))}
    </aside>
  );
}
