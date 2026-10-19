import { absoluteUrl } from "@/lib/seo";
import type { SeoFields } from "@/types/sanity";

export function isCanonicalPublicPage(path: string, seo?: SeoFields) {
  if (seo?.noIndex) return false;
  if (!seo?.canonicalUrl) return true;
  try {
    const canonical = new URL(seo.canonicalUrl, absoluteUrl("/"));
    const own = new URL(absoluteUrl(path));
    return canonical.origin === own.origin && canonical.pathname.replace(/\/$/, "") === own.pathname.replace(/\/$/, "") && !canonical.search;
  } catch {
    return false;
  }
}
