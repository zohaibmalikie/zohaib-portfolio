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
    const [{ VisualEditing }, { DisableDraftMode }, { SanityLive }] =
      await Promise.all([
        import("next-sanity/visual-editing"),
        import("@/components/disable-draft-mode"),
        import("@/sanity/lib/live")
      ]);

    draftTools = (
      <>
        <SanityLive />
        <VisualEditing />
        <DisableDraftMode />
      </>
    );
  }

  return (
    <>
      <SiteHeader settings={settings} />
      {children}
      <SiteFooter settings={settings} />
      {draftTools}
    </>
  );
}
 