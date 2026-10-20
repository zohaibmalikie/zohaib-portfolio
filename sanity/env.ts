import { canonicalSiteOrigin } from "@/lib/url-policy";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const hasSanityConfig = Boolean(projectId && dataset);

export const readToken = process.env.SANITY_API_READ_TOKEN || "";

export const siteUrl = canonicalSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL, process.env.NODE_ENV === "production");

export const previewOrigin =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const studioUrl = "/studio";
