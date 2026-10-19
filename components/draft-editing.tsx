"use client";

import dynamic from "next/dynamic";

// Editing overlays are only needed in an authenticated draft session. Keeping
// these behind browser-only imports prevents Studio UI shipping to visitors.
const VisualEditing = dynamic(
  () => import("next-sanity/visual-editing").then((module) => module.VisualEditing),
  { ssr: false }
);
const DisableDraftMode = dynamic(
  () => import("@/components/disable-draft-mode").then((module) => module.DisableDraftMode),
  { ssr: false }
);

export function DraftEditing() {
  return <><VisualEditing /><DisableDraftMode /></>;
}
