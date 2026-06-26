import type { ReactNode } from "react";

const bridgeScript = "https://core.sanity-cdn.com/bridge.js";

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script src={bridgeScript} async type="module" />
      {children}
    </>
  );
}
