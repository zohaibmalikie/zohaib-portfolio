import type { MetadataRoute } from "next";

import {
  fallbackPosts,
  fallbackProjects,
  fallbackSettings
} from "@/lib/fallback-data";
import { absoluteUrl, getImageUrl } from "@/lib/seo";
import { hasSanityConfig } from "@/sanity/env";
import { siteUrl } from "@/sanity/env";
import { metadataClient } from "@/sanity/lib/client";
import { POSTS_QUERY, PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { Post, Project } from "@/types/sanity";

function url(path: string) {
  return new URL(path, siteUrl).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([
    getSitemapData<Post[]>(POSTS_QUERY, fallbackPosts, {
      category: null,
      tag: null
    }),
    getSitemapData<Project[]>(PROJECTS_QUERY, fallbackProjects)
  ]);
  const now = new Date();
  const defaultImage = getImageUrl(fallbackSettings.defaultOpenGraphImage);

  return [
    {
      url: url("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: defaultImage ? [absoluteUrl(defaultImage)] : undefined
    },
    {
      url: url("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: url("/work"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    ...posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: post.updatedAt || post.publishedAt || now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: getSitemapImages(post.mainImage)
    })),
    ...projects.map((project) => ({
      url: url(`/work/${project.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: getSitemapImages(project.mainImage)
    })),
    {
      url: url("/llms.txt"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4
    },
    {
      url: url("/llms-full.txt"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4
    },
    {
      url: url("/humans.txt"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.2
    }
  ];
}

async function getSitemapData<T>(
  query: string,
  fallback: T,
  params: Record<string, string | null> = {}
) {
  if (!hasSanityConfig) return fallback;

  try {
    const data = await metadataClient.fetch<T>(query, params);
    return Array.isArray(data) && data.length === 0 ? fallback : data || fallback;
  } catch (error) {
    console.warn("Sanity sitemap fetch failed, using fallback data.", error);
    return fallback;
  }
}

function getSitemapImages(image: Parameters<typeof getImageUrl>[0]) {
  const imageUrl = getImageUrl(image);
  return imageUrl ? [absoluteUrl(imageUrl)] : undefined;
}
