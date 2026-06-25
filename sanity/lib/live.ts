import type { QueryParams } from "next-sanity";
import { defineLive } from "next-sanity/live";

import { client } from "@/sanity/lib/client";
import { hasSanityConfig, readToken } from "@/sanity/env";

const live = defineLive({
  client,
  ...(readToken ? { serverToken: readToken, browserToken: readToken } : {})
});

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  tags?: string[];
  perspective?: "published" | "drafts";
  stega?: boolean;
};

export async function sanityFetch<T>({
  query,
  params = {},
  ...options
}: SanityFetchOptions): Promise<{ data: T | null }> {
  if (!hasSanityConfig) {
    return { data: null };
  }

  const result = await live.sanityFetch({
    query,
    params,
    ...options
  });

  return { data: result.data as T | null };
}

function EmptySanityLive() {
  return null;
}

export const SanityLive = hasSanityConfig && readToken ? live.SanityLive : EmptySanityLive;
