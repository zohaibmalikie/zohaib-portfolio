import { createClient } from "@sanity/client";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/env";

export const client = createClient({
  projectId: projectId || "demo",
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl
  }
});

export const metadataClient = client.withConfig({ stega: false });
