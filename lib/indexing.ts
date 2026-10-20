import { siteUrl } from "@/sanity/env";
import { canonicalPageUrl } from "@/lib/url-policy";
import type { SeoFields } from "@/types/sanity";

export function isCanonicalPublicPage(path: string, seo?: SeoFields) {
  if (seo?.noIndex) return false;
  if (!seo?.canonicalUrl) return true;
  try {
    const canonical = new URL(canonicalPageUrl(seo.canonicalUrl, siteUrl));
    const own = new URL(canonicalPageUrl(path, siteUrl));
    return canonical.origin === own.origin && canonical.pathname.replace(/\/$/, "") === own.pathname.replace(/\/$/, "") && !canonical.search;
  } catch {
    return false;
  }
}
