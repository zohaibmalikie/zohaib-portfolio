import { buildLlmsTxt, textResponse } from "@/lib/llms";
import { getHomePageData, getPosts } from "@/sanity/lib/fetchers";

export const revalidate = 3600;

export async function GET() {
  const [data, posts] = await Promise.all([getHomePageData(), getPosts()]);
  return textResponse(buildLlmsTxt({ ...data, posts: posts.filter((post) => !post.seo?.noIndex) }));
}
