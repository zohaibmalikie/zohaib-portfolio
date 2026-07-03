export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const hasSanityConfig = Boolean(projectId && dataset);

export const readToken = process.env.SANITY_API_READ_TOKEN || "";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const fallbackSiteUrl = "https://www.zohaibramzan.com";
const isLocalSiteUrl = configuredSiteUrl
  ? /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?/i.test(configuredSiteUrl)
  : false;
const canonicalSiteUrl =
  configuredSiteUrl && !isLocalSiteUrl
    ? configuredSiteUrl.replace(
        /^https?:\/\/zohaibramzan\.com\/?$/i,
        fallbackSiteUrl
      )
    : configuredSiteUrl;

export const siteUrl =
  process.env.NODE_ENV === "production" && isLocalSiteUrl
    ? fallbackSiteUrl
    : canonicalSiteUrl || fallbackSiteUrl;

export const previewOrigin =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const studioUrl = "/studio";
