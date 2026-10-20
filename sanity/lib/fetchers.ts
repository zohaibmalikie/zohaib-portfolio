import { isCanonicalPublicPage } from "@/lib/indexing";
import { enrichPost } from "@/lib/blog-enrichment";
import { withBlogPhotography } from "@/lib/blog-photography";

import { canonicalProjectSlug, mergeProjects } from "@/lib/project-collections";

import { draftMode } from "next/headers";

import { getAutomationOffers, isAutomationOffer } from "@/lib/automation-offers";
import { additionalServices, serviceDetails } from "@/lib/service-content";
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
  PROJECTS_QUERY,
  PROJECT_QUERY,
  SITE_SETTINGS_QUERY,
  SERVICES_QUERY
} from "@/sanity/lib/queries";
import type {
  HomePageData,
  Post,
  Project,
  SiteSettings,
  Service
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
  stega,
  publishedOnly,
  throwOnError = false
}: {
  query: string;
  params?: Record<string, string | string[] | null>;
  tags?: string[];
  fallback: T;
  stega?: boolean;
  publishedOnly?: boolean;
  throwOnError?: boolean;
}): Promise<T> {
  if (!hasSanityConfig) return fallback;

  try {
    const draft = publishedOnly ? { isEnabled: false } : await draftMode();
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
    // A failed CMS request does not prove that a CMS-only detail page is absent.
    // Let Next retain a previously generated page rather than caching a false 404.
    if (throwOnError) throw error;
    console.warn("Sanity fetch failed, using fallback data.", error);
    return fallback;
  }
}

export function getSiteSettings(options?: { stega?: boolean; publishedOnly?: boolean }) {
  return getData<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
    fallback: fallbackSettings,
    publishedOnly: options?.publishedOnly,
    stega: options?.stega
  });
}

export async function getHomePageData({ publishedOnly = false }: { publishedOnly?: boolean } = {}) {
  const [data, posts] = await Promise.all([getData<HomePageData>({
    query: HOME_QUERY,
    publishedOnly,
    tags: ["siteSettings", "service", "project", "posts", "faq", "testimonial"],
    fallback: fallbackHomePageData
  }), getPosts({ publishedOnly })]);

  return {
    settings: data.settings || fallbackSettings,
    services: [
      ...(data.services?.length ? data.services : fallbackServices).filter((service) => !isAutomationOffer(service)),
      ...getAutomationOffers(data.services || [])
    ],
    projects: mergeProjects(data.projects || [], fallbackProjects),
    posts: posts.filter((post) => isCanonicalPublicPage(`/blog/${post.slug}`, post.seo)).slice(0, 4),
    faqs: data.faqs?.length ? data.faqs : fallbackFaqs,
    testimonials: data.testimonials?.length
      ? data.testimonials
      : fallbackTestimonials
  };
}

export async function getPosts({
  category,
  tag,
  stega,
  publishedOnly
}: {
  category?: string;
  tag?: string;
  stega?: boolean;
  publishedOnly?: boolean;
} = {}) {
  // Merge the complete CMS collection before filtering so a CMS override that
  // changes taxonomy cannot leave its bundled version in the old category.
  const posts = await getData<Post[]>({
    query: POSTS_QUERY,
    params: { category: null, tag: null },
    tags: ["posts"],
    fallback: fallbackPosts,
    stega,
    publishedOnly
  });

  return mergePosts(posts, fallbackPosts).map(enrichPost).map(withBlogPhotography).filter((post) => matchesPostFilters(post, category, tag));
}

export async function getPost(slug: string, options?: { stega?: boolean }) {
  const fallback = fallbackPosts.find((post) => post.slug === slug) || null;
  const post = await getData<Post | null>({
    query: POST_QUERY,
    params: { slug },
    tags: ["posts", `post:${slug}`],
    fallback,
    throwOnError: !fallback,
    stega: options?.stega
  });
  return post ? withBlogPhotography(enrichPost(post)) : null;
}

export async function getRelatedPosts(post: Post) {
  const posts = await getPosts();
  return posts
    .filter((candidate) => candidate.slug !== post.slug && isCanonicalPublicPage(`/blog/${candidate.slug}`, candidate.seo))
    .map((candidate) => ({
      candidate,
      score: (candidate.category?.slug && candidate.category.slug === post.category?.slug ? 2 : 0) +
        (candidate.tags?.filter((tag) => post.tags?.includes(tag)).length || 0)
    }))
    .filter(({ score }) => score > 0)
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

export async function getProjects(options?: { stega?: boolean; publishedOnly?: boolean }) {
  const projects = await getData<Project[]>({
    query: PROJECTS_QUERY,
    tags: ["project"],
    fallback: fallbackProjects,
    stega: options?.stega,
    publishedOnly: options?.publishedOnly
  });

  return mergeProjects(projects, fallbackProjects);
}

export async function getProject(slug: string, options?: { stega?: boolean }) {
  const canonicalSlug = canonicalProjectSlug(slug);
  const fallback = fallbackProjects.filter((project) => project.slug === canonicalSlug);
  const project = await getData<Project | null>({
    query: PROJECT_QUERY,
    params: { slug: canonicalSlug, legacySlug: canonicalSlug === "ledstore" ? "ledstore-fi-ecommerce-ui-ux" : canonicalSlug },
    tags: ["project"],
    fallback: fallback[0] || null,
    throwOnError: !fallback.length,
    stega: options?.stega
  });
  return project ? mergeProjects([project], fallback)[0] : null;
}

export async function getProjectSlugs() {
  return (await getProjects({ stega: false, publishedOnly: true })).map(({ slug }) => ({ slug }));
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

export async function getServices({ publishedOnly = false }: { publishedOnly?: boolean } = {}) {
  const bundled = [...fallbackServices, ...additionalServices].map((service) => ({
    ...service,
    ...serviceDetails[service.slug]
  }));
  const managed = await getData<Service[]>({
    query: SERVICES_QUERY,
    publishedOnly,
    tags: ["service"],
    fallback: []
  });
  const merged = new Map(bundled.map((service) => [service.slug, service]));
  for (const service of managed) {
    const existing = merged.get(service.slug);
    merged.set(service.slug, {
      ...existing,
      ...Object.fromEntries(Object.entries(service).filter(([, value]) => value != null && value !== "")),
      _id: service._id,
      slug: service.slug,
      title: service.title,
      headline: service.headline || existing?.headline,
      audience: service.audience || existing?.audience,
      overview: service.overview?.length ? service.overview : existing?.overview,
      deliverables: service.deliverables?.length ? service.deliverables : existing?.deliverables,
      process: service.process?.length ? service.process : existing?.process,
      faqs: service.faqs?.length ? service.faqs : existing?.faqs,
      relatedPostSlugs: service.relatedPostSlugs ?? existing?.relatedPostSlugs,
      relatedProjectSlugs: service.relatedProjectSlugs ?? existing?.relatedProjectSlugs,
      relatedServiceSlugs: service.relatedServiceSlugs ?? existing?.relatedServiceSlugs,
      seo: { ...existing?.seo, ...Object.fromEntries(Object.entries(service.seo || {}).filter(([, value]) => value != null && value !== "")) }
    });
  }
  return Array.from(merged.values()).filter((service) => service.overview?.length);
}

export async function getService(slug: string) {
  return (await getServices()).find((service) => service.slug === slug) || null;
}
