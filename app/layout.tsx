import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Mono, DM_Sans } from "next/font/google";

import "@/app/globals.css";
import { siteUrl } from "@/sanity/env";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const monoFont = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Muhammad Zohaib Ramzan Portfolio",
  manifest: "/manifest.webmanifest",
  title: {
    default: "Muhammad Zohaib Ramzan | Senior Frontend and AI Automation Developer",
    template: "%s | Muhammad Zohaib Ramzan"
  },
  description:
    "Senior frontend developer and AI automation expert specializing in AI-native products, Next.js, React, SvelteKit, Sanity CMS, integrations, and technical SEO.",
  authors: [{ name: "Muhammad Zohaib Ramzan", url: siteUrl }],
  creator: "Muhammad Zohaib Ramzan",
  publisher: "Muhammad Zohaib Ramzan",
  category: "Frontend Development",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
    apple: [{ url: "/icon-180.png", sizes: "180x180", type: "image/png" }]
  },
  keywords: [
    "Muhammad Zohaib Ramzan",
    "Frontend developer",
    "Next.js developer",
    "React developer",
    "AI automation expert",
    "AI integration expert",
    "AI native developer",
    "SvelteKit developer",
    "Sanity CMS",
    "Builder.io",
    "shadcn",
    "shadcn-ui",
    "WordPress developer",
    "technical SEO",
    "Core Web Vitals",
    "ecommerce optimization",
    "SaaS frontend architecture",
    "AI automation"
  ],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Muhammad Zohaib Ramzan | Senior Frontend and AI Automation Developer",
    description: "Senior frontend developer and AI automation expert specializing in AI-native products, Next.js, React, SvelteKit, Sanity CMS, integrations, and technical SEO.",
    siteName: "Muhammad Zohaib Ramzan"
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZohaibM87432701",
    creator: "@ZohaibM87432701"
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent" as const,
    title: "Muhammad Zohaib Ramzan"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" type="text/markdown" href="/llms.txt" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" />
        <link rel="author" href="/humans.txt" />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
