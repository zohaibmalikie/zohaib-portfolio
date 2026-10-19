import { buildLlmsTxt, textResponse } from "@/lib/llms";
import { isCanonicalPublicPage } from "@/lib/indexing";
import { getTopics } from "@/lib/topics";
import { getHomePageData, getPosts, getServices } from "@/sanity/lib/fetchers";

export const revalidate = 3600;

export async function GET() {
  const [data, posts, services, topics] = await Promise.all([getHomePageData(), getPosts(), getServices(), getTopics()]);
  return textResponse(buildLlmsTxt({
    ...data,
    topics,
    services: services.filter((service) => isCanonicalPublicPage(`/services/${service.slug}`, service.seo)),
    projects: data.projects.filter((project) => isCanonicalPublicPage(`/work/${project.slug}`, project.seo)),
    posts: posts.filter((post) => isCanonicalPublicPage(`/blog/${post.slug}`, post.seo))
  }));
}
