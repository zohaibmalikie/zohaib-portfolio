import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

import { SanityImage } from "@/components/sanity-image";
import { getHeadingId } from "@/lib/content-utils";
import type { SanityImage as SanityImageType } from "@/types/sanity";

type LinkValue = {
  href?: string;
};

function blockText(children: unknown) {
  if (!Array.isArray(children)) return "";

  return children
    .map((child) =>
      child && typeof child === "object" && "text" in child
        ? String(child.text || "")
        : ""
    )
    .join("");
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="article-image">
        <SanityImage
          image={value as SanityImageType}
          width={1200}
          height={720}
          sizes="(max-width: 900px) 100vw, 900px"
        />
        {(value as SanityImageType).caption ? (
          <figcaption>{(value as SanityImageType).caption}</figcaption>
        ) : null}
      </figure>
    )
  },
  block: {
    h2: ({ children, value }) => {
      const text = blockText(value.children);
      return <h2 id={getHeadingId(text)}>{children}</h2>;
    },
    h3: ({ children, value }) => {
      const text = blockText(value.children);
      return <h3 id={getHeadingId(text)}>{children}</h3>;
    },
    blockquote: ({ children }) => <blockquote>{children}</blockquote>
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value as LinkValue)?.href || "#";
      const isExternal = /^https?:\/\//.test(href);

      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }

      return <Link href={href}>{children}</Link>;
    }
  }
};

export function PortableContent({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="rich-text">
      <PortableText value={value} components={components} />
    </div>
  );
}
