import type { MetadataRoute } from "next";

import { siteUrl } from "@/sanity/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/", "/blog?tag=", "/blog?category="]
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "DuckDuckBot",
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "PerplexityBot",
          "Applebot",
          "Bytespider"
        ],
        allow: "/",
        disallow: ["/studio", "/api/", "/blog?tag=", "/blog?category="]
      }
    ],
    sitemap: new URL("/sitemap.xml", siteUrl).toString()
  };
}
