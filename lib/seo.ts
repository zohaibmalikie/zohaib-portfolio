import type { Metadata } from "next";

import { siteUrl } from "@/sanity/env";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage, SeoFields, SiteSettings } from "@/types/sanity";

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return new URL(path, siteUrl).toString();
}

export function getImageUrl(image?: SanityImage, width = 1200, height = 630) {
  if (!image) return undefined;

  if (image.asset?._ref) {
    return urlForImage(image)
      .width(width)
      .height(height)
      .fit("crop")
      .auto("format")
      .url();
  }

  if (image.asset?.url) {
    // GROQ projects resolved asset URLs, rather than _ref. Resize those CDN
    // assets too so card images do not fetch multi-megabyte originals.
    try {
      const url = new URL(image.asset.url);
      if (url.hostname === "cdn.sanity.io" && url.pathname.startsWith("/images/")) {
        url.searchParams.set("w", String(width));
        url.searchParams.set("h", String(height));
        url.searchParams.set("fit", "crop");
        url.searchParams.set("auto", "format");
        return url.toString();
      }
    } catch { /* Local public assets keep their relative path. */ }
    return image.asset.url;
  }

  return undefined;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  settings,
  type = "website",
  publishedDate,
  modifiedDate,
  author,
  tags,
  keywords,
  noIndex,
  openGraphTitle,
  openGraphDescription,
  twitterTitle,
  twitterDescription
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: SanityImage;
  settings?: SiteSettings;
  type?: "website" | "article";
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
  tags?: string[];
  keywords?: string[];
  noIndex?: boolean;
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}): Metadata {
  const resolvedTitle =
    title ||
    settings?.defaultSeoTitle ||
    "Muhammad Zohaib Ramzan | Frontend Website Developer";
  const resolvedDescription =
    description ||
    settings?.defaultSeoDescription ||
    "Frontend development, responsive UI, technical SEO, and CMS implementation for high-performing websites.";
  const resolvedUrl = absoluteUrl(path || "/");
  const imagePath = getImageUrl(image) || getImageUrl(settings?.defaultOpenGraphImage) || "/assets/img/social/site-card.png";
  const resolvedImage = absoluteUrl(imagePath);

  const metadata: Metadata = {
    title: {
      absolute: resolvedTitle
    },
    description: resolvedDescription,
    keywords: [...new Map((keywords || tags || []).map((keyword) => [keyword.trim().toLowerCase(), keyword.trim()])).values()].filter(Boolean).slice(0, 8),
    alternates: {
      canonical: resolvedUrl
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true
          }
        }
      : undefined,
    openGraph: {
      type,
      title: openGraphTitle || resolvedTitle,
      description: openGraphDescription || resolvedDescription,
      url: resolvedUrl,
      images: resolvedImage
        ? [
            {
              url: resolvedImage,
              width: 1200,
              height: 630,
              alt: image?.alt || resolvedTitle
            }
          ]
        : undefined,
      siteName: "Muhammad Zohaib Ramzan"
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle || openGraphTitle || resolvedTitle,
      description: twitterDescription || openGraphDescription || resolvedDescription,
      images: resolvedImage ? [resolvedImage] : undefined,
      creator: "@ZohaibM87432701"
    }
  };

  // Add article-specific metadata
  if (type === "article") {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: author ? [author] : undefined,
      tags
    };
  }

  return metadata;
}
