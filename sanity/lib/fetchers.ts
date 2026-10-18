import { draftMode } from "next/headers";

import { getAutomationOffers, isAutomationOffer } from "@/lib/automation-offers";
import { matchesPostFilters, mergePosts } from "@/lib/post-collections";

import {
  fallbackFaqs,
  fallbackHomePageData,
  fallbackPosts,
  fallbackProjects,
  fallbackServices,
  fallbackSettings,
  fallbackTestimonials
} from "@/lib/fallback-data";
import { hasSanityConfig } from "@/sanity/env";
import { metadataClient } from "@/sanity/lib/client";
import {
  HOME_QUERY,
  POST_QUERY,
  POST_SLUGS_QUERY,
  POSTS_QUERY,
  PROJECT_QUERY,
  PROJECT_SLUGS_QUERY,
  PROJECTS_QUERY,
  SITE_SETTINGS_QUERY
} from "@/sanity/lib/queries";
import type {
  HomePageData,
  Post,
  Project,
  SiteSettings
} from "@/types/sanity";

type SlugResult = { slug: string };

function mergeBySlug<T extends { slug?: string }>(primary: T[] = [], fallback: T[] = []) {
  const merged = new Map<string, T>();

  for (const item of fallback) {
    if (item.slug) merged.set(item.slug, item);
  }

  for (const item of primary) {
    if (item.slug) merged.set(item.slug, item);
  }

  return Array.from(merged.values());
}

async function getData<T>({
  query,
  params,
  tags,
  fallback,
  stega
}: {
  query: string;
  params?: Record<string, string | string[] | null>;
  tags?: string[];
  fallback: T;
  stega?: boolean;
}): Promise<T> {
  if (!hasSanityConfig) return fallback;

  try {
    const draft = await draftMode();
    const data = draft.isEnabled
      ? (
          await import("@/sanity/lib/live").then(({ sanityFetch }) =>
            sanityFetch<T>({
              query,
              params,
              tags,
              stega
            })
          )
        ).data
      : await metadataClient.fetch<T>(query, params || {}, {
          next: {
            revalidate: 3600,
            tags
          }
        });

    if (Array.isArray(data) && data.length === 0) return fallback;
    return data ?? fallback;
  } catch (error) {
    console.warn("Sanity fetch failed, using fallback data.", error);
    return fallback;
  }
}

export function getSiteSettings(options?: { stega?: boolean }) {
  return getData<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
    fallback: fallbackSettings,
    stega: options?.stega
  });
}

export async function getHomePageData() {
  const [data, posts] = await Promise.all([getData<HomePageData>({
    query: HOME_QUERY,
    tags: ["siteSettings", "service", "project", "posts", "faq", "testimonial"],
    fallback: fallbackHomePageData
  }), getPosts()]);

  return {
    settings: data.settings || fallbackSettings,
    services: [
      ...(data.services?.length ? data.services : fallbackServices).filter((service) => !isAutomationOffer(service)),
      ...getAutomationOffers(data.services || [])
    ],
    projects: mergeBySlug(data.projects || [], fallbackProjects),
    posts: posts.slice(0, 4),
    faqs: data.faqs?.length ? data.faqs : fallbackFaqs,
    testimonials: data.testimonials?.length
      ? data.testimonials
      : fallbackTestimonials
  };
}

export async function getPosts({
  category,
  tag,
  stega
}: {
  category?: string;
  tag?: string;
  stega?: boolean;
} = {}) {
  // Merge the complete CMS collection before filtering so a CMS override that
  // changes taxonomy cannot leave its bundled version in the old category.
  const posts = await getData<Post[]>({
    query: POSTS_QUERY,
    params: { category: null, tag: null },
    tags: ["posts"],
    fallback: fallbackPosts,
    stega
  });

  return mergePosts(posts, fallbackPosts).filter((post) => matchesPostFilters(post, category, tag));
}

export function getPost(slug: string, options?: { stega?: boolean }) {
  return getData<Post | null>({
    query: POST_QUERY,
    params: { slug },
    tags: ["posts", `post:${slug}`],
    fallback: fallbackPosts.find((post) => post.slug === slug) || null,
    stega: options?.stega
  });
}

export async function getRelatedPosts(post: Post) {
  const posts = await getPosts();
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score: (candidate.category?.slug && candidate.category.slug === post.category?.slug ? 2 : 0) +
        (candidate.tags?.filter((tag) => post.tags?.includes(tag)).length || 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ candidate }) => candidate);
}

export function getPostSlugs() {
  return getStaticSlugs({
    query: POST_SLUGS_QUERY,
    fallback: fallbackPosts.map((post) => ({ slug: post.slug }))
  });
}

export async function getProjects(options?: { stega?: boolean }) {
  const projects = await getData<Project[]>({
    query: PROJECTS_QUERY,
    tags: ["project"],
    fallback: fallbackProjects,
    stega: options?.stega
  });

  return mergeBySlug(projects, fallbackProjects);
}

export function getProject(slug: string, options?: { stega?: boolean }) {
  return getData<Project | null>({
    query: PROJECT_QUERY,
    params: { slug },
    tags: ["project"],
    fallback: fallbackProjects.find((project) => project.slug === slug) || null,
    stega: options?.stega
  });
}

export function getProjectSlugs() {
  return getStaticSlugs({
    query: PROJECT_SLUGS_QUERY,
    fallback: fallbackProjects.map((project) => ({ slug: project.slug }))
  });
}

async function getStaticSlugs({
  query,
  fallback
}: {
  query: string;
  fallback: SlugResult[];
}) {
  if (!hasSanityConfig) return fallback;

  try {
    const data = await metadataClient.fetch<SlugResult[]>(query);
    return mergeBySlug(data || [], fallback);
  } catch (error) {
    console.warn("Sanity slug fetch failed, using fallback slugs.", error);
    return fallback;
  }
}
