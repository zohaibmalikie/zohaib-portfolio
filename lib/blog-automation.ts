import type { PortableTextBlock } from "@portabletext/types";

import type { SeoFields } from "@/types/sanity";

const WORDS_PER_MINUTE = 200;

export function extractPortableTextPlainText(blocks: PortableTextBlock[] = []) {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !Array.isArray(block.children)) {
        return "";
      }

      return block.children
        .map((child) => ("text" in child ? child.text : ""))
        .join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

export function calculateReadingTime(blocks: PortableTextBlock[] = []) {
  const words = extractPortableTextPlainText(blocks)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function generateExcerptFromPortableText(
  blocks: PortableTextBlock[] = [],
  existingExcerpt?: string,
  maxLength = 160
) {
  if (existingExcerpt?.trim()) return existingExcerpt;

  const plainText = extractPortableTextPlainText(blocks).replace(/\s+/g, " ").trim();
  if (plainText.length <= maxLength) return plainText;

  return `${plainText.slice(0, maxLength).replace(/\s+\S*$/, "")}...`;
}

export function setFirstPublishedAtOnce(
  firstPublishedAt?: string,
  workflowStatus?: string,
  now = new Date().toISOString()
) {
  if (firstPublishedAt || workflowStatus !== "published") return firstPublishedAt;
  return now;
}

export function mergeSeoWithoutOverwritingManualFields(
  currentSeo: SeoFields = {},
  generatedSeo: SeoFields = {}
) {
  return {
    ...generatedSeo,
    ...Object.fromEntries(
      Object.entries(currentSeo).filter(([, value]) => {
        if (typeof value === "string") return value.trim().length > 0;
        return value !== undefined && value !== null;
      })
    )
  };
}
