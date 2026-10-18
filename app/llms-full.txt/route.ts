import { buildLlmsFullTxt, textResponse } from "@/lib/llms";
import { getHomePageData, getPosts } from "@/sanity/lib/fetchers";

export const revalidate = 3600;

export async function GET() {
  const [data, posts] = await Promise.all([getHomePageData(), getPosts()]);
  return textResponse(buildLlmsFullTxt({ ...data, posts: posts.filter((post) => !post.seo?.noIndex) }));
}
