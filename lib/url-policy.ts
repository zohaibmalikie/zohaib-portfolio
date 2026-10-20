const defaultOrigin = "https://www.zohaibramzan.com";

/** A deployment setting is a site origin, not a page path or tracking URL. */
export function canonicalSiteOrigin(value?: string, production = false) {
  try {
    const url = new URL(value || defaultOrigin);
    if (!["http:", "https:"].includes(url.protocol)) return defaultOrigin;
    if (production && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) return defaultOrigin;
    if (["zohaibramzan.com", "www.zohaibramzan.com"].includes(url.hostname)) {
      return defaultOrigin;
    }
    return url.origin;
  } catch {
    return defaultOrigin;
  }
}

export function canonicalPageUrl(path: string, origin: string) {
  const url = new URL(path, origin);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Canonical URLs must use HTTP or HTTPS");
  if (["zohaibramzan.com", "www.zohaibramzan.com"].includes(url.hostname)) {
    url.hostname = "www.zohaibramzan.com";
    url.protocol = "https:";
    url.port = "";
  }
  url.hash = "";
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
  return url.toString();
}
