import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";

import "@/app/globals.css";
import { siteUrl } from "@/sanity/env";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "optional"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Muhammad Zohaib Ramzan Portfolio",
  manifest: "/manifest.webmanifest",
  title: {
    default: "Muhammad Zohaib Ramzan | Next.js & Workflow Automation",
    template: "%s | Muhammad Zohaib Ramzan"
  },
  description:
    "Responsive Next.js websites, reliable workflow automation, API integration repair and technical SEO for businesses.",
  authors: [{ name: "Muhammad Zohaib Ramzan", url: siteUrl }],
  creator: "Muhammad Zohaib Ramzan",
  publisher: "Muhammad Zohaib Ramzan",
  category: "Frontend Development",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
    apple: [{ url: "/icon-180.png", sizes: "180x180", type: "image/png" }]
  },
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
    title: "Muhammad Zohaib Ramzan | Next.js & Workflow Automation",
    description:
      "Responsive Next.js websites, reliable workflow automation, API integration repair and technical SEO for businesses.",
    siteName: "Muhammad Zohaib Ramzan",
    images: [{ url: "/assets/img/social/site-card.png", width: 1200, height: 630, alt: "Zohaib Ramzan — websites and workflow automation" }]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/img/social/site-card.png"],
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
        <link rel="alternate" type="text/markdown" href="/llms.txt" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" />
        <link rel="author" href="/humans.txt" />
      </head>
      <body className={displayFont.variable}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
