import type { PortableTextBlock } from "@portabletext/types";

import {
  calculateReadingTime,
  extractPortableTextPlainText
} from "@/lib/blog-automation";

export function formatDate(value?: string) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export function formatProjectDate(value?: string) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function toPlainText(blocks: PortableTextBlock[] = []) {
  return extractPortableTextPlainText(blocks);
}

export function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getReadingTime({
  readingTime,
  excerpt,
  body
}: {
  readingTime?: number;
  excerpt?: string;
  body?: PortableTextBlock[];
}) {
  if (readingTime) return readingTime;
  if (body?.length) return calculateReadingTime(body);
  return estimateReadingTime(excerpt || "");
}

export function getHeadingId(value: string) {
  return slugify(value).slice(0, 72);
}
