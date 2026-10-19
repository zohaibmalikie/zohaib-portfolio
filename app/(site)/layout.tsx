import { DraftEditing } from "@/components/draft-editing";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/seo";

import { draftMode } from "next/headers";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getSiteSettings } from "@/sanity/lib/fetchers";

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const draft = await draftMode();
  let draftTools: React.ReactNode = null;

  if (draft.isEnabled) {
    const { SanityLive } = await import("@/sanity/lib/live");

    draftTools = (
      <>
        <SanityLive />
        <DraftEditing />
      </>
    );
  }

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "Person", "@id": absoluteUrl("/#person"), name: settings.name,
            url: absoluteUrl("/"), image: settings.profileImage?.asset?.url,
            sameAs: [settings.githubLink, settings.linkedinLink, settings.upworkLink].filter(Boolean) },
          { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: settings.name,
            url: absoluteUrl("/"), inLanguage: "en", publisher: { "@id": absoluteUrl("/#person") } }
        ]
      }} />
      <SiteHeader settings={settings} />
      {children}
      <SiteFooter settings={settings} />
      {draftTools}
    </>
  );
}
 