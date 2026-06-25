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
  type = "website"
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: SanityImage;
  settings?: SiteSettings;
  type?: "website" | "article";
}): Metadata {
  const resolvedTitle =
    title ||
    settings?.defaultSeoTitle ||
    "Zohaib Ramzan | Frontend Website Developer";
  const resolvedDescription =
    description ||
    settings?.defaultSeoDescription ||
    "Frontend development, responsive UI, technical SEO, and CMS implementation for high-performing websites.";
  const resolvedUrl = absoluteUrl(path || "/");
  const resolvedImage =
    getImageUrl(image) || getImageUrl(settings?.defaultOpenGraphImage);

  return {
    title: {
      absolute: resolvedTitle
    },
    description: resolvedDescription,
    alternates: {
      canonical: resolvedUrl
    },
    openGraph: {
      type,
      title: resolvedTitle,
      description: resolvedDescription,
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
        : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: resolvedImage ? [resolvedImage] : undefined
    }
  };
}
