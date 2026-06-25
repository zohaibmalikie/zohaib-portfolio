"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool) return null;

  return (
    <a href="/api/draft-mode/disable" className="draft-mode-button">
      Disable draft mode
    </a>
  );
}
