import type { MetadataRoute } from "next";

import { siteUrl } from "@/sanity/env";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zohaib Ramzan Portfolio",
    short_name: "Zohaib",
    description:
      "Senior frontend developer portfolio for Next.js, React, SvelteKit, CMS, AI integrations, case studies, and technical articles.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    categories: ["business", "productivity", "technology"],
    lang: "en",
    icons: [
      {
        src: new URL("/icon-192.png", siteUrl).toString(),
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: new URL("/icon-192.png", siteUrl).toString(),
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: new URL("/icon-512.png", siteUrl).toString(),
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: new URL("/icon-512.png", siteUrl).toString(),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
