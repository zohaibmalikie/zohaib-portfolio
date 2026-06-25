import { buildLlmsFullTxt, textResponse } from "@/lib/llms";
import { getHomePageData } from "@/sanity/lib/fetchers";

export const revalidate = 3600;

export async function GET() {
  const data = await getHomePageData();
  return textResponse(buildLlmsFullTxt(data));
}
