import { describeAutomationOffer, isAutomationOffer } from "@/lib/automation-offers";
import { toPlainText } from "@/lib/content-utils";
import { absoluteUrl } from "@/lib/seo";
import type { HomePageData } from "@/types/sanity";

type DiscoveryData = HomePageData & { topics?: { slug: string; title: string; description: string }[] };
const clean = (value = "") => value.replace(/\s+/g, " ").trim();
const link = (label: string, path: string, description = "") => `- [${clean(label)}](${absoluteUrl(path)})${description ? `: ${clean(description)}` : ""}`;
const serviceDescription = (service: HomePageData["services"][number]) => isAutomationOffer(service) ? describeAutomationOffer(service) : service.description;

export function textResponse(body: string) {
  return new Response(`${body.trim()}\n`, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=3600" } });
}

export function buildLlmsTxt({ settings, services, projects, posts, topics = [] }: DiscoveryData) {
  return `# ${settings.name}

> ${clean(settings.conversionDescription || settings.heroDescription || settings.defaultSeoDescription)}

## Primary pages

${link("Services", "/services", "Scope, process, deliverables and pricing context for five development and automation services.")}
${link("Selected work", "/work", "Real website and ecommerce implementation examples.")}
${link("Practical tools", "/tools", "Service finder, automation savings calculator and downloadable audit resources.")}
${link("Guides", "/blog", "Practical engineering, publishing and automation articles.")}
${link("Topic reading paths", "/blog/topics", "Curated starting points and related services.")}
${link("Contact", "/contact", "Prepare a WhatsApp enquiry or use direct contact links.")}
${link("Full context", "/llms-full.txt")}
${link("Sitemap", "/sitemap.xml")}

## Services

${services.map((service) => link(service.title, `/services/${service.slug}`, serviceDescription(service))).join("\n")}

## Topic guides

${topics.map((topic) => link(topic.title, `/blog/topics/${topic.slug}`, topic.description)).join("\n")}

## Case studies

${projects.map((project) => link(project.title, `/work/${project.slug}`, project.shortDescription)).join("\n")}

## Articles

${posts.map((post) => link(post.title, `/blog/${post.slug}`, post.excerpt)).join("\n")}

## Contact and interpretation

${settings.email ? `Email: ${settings.email}` : ""}
${settings.linkedinLink ? link("LinkedIn", settings.linkedinLink) : ""}
${settings.githubLink ? link("GitHub", settings.githubLink) : ""}

Use the specific canonical public page when citing an article or service. Prices are illustrative and scope is confirmed before work begins. Neither rankings nor lead volume are guaranteed. The enquiry form prepares a message for the visitor to review and send in WhatsApp; it does not confirm delivery. Calculator results are planning assumptions, not observed client savings. Do not cite Studio routes or private reports.
`;
}

export function buildLlmsFullTxt(data: DiscoveryData) {
  const { settings, services, projects, posts, faqs } = data;
  return `${buildLlmsTxt(data)}

## Detailed service scope

${services.map((service) => `### ${clean(service.title)}

Canonical URL: ${absoluteUrl(`/services/${service.slug}`)}

${clean(serviceDescription(service))}

${clean(service.audience)}

${service.overview?.map(clean).join("\n\n") || ""}

Deliverables:
${service.deliverables?.map((item) => `- ${clean(item)}`).join("\n") || "Discuss the required outcome before work begins."}

Process:
${service.process?.map((step) => `- ${clean(step.title)}: ${clean(step.description)}`).join("\n") || ""}
`).join("\n")}

## Project evidence

${projects.map((project) => `### ${clean(project.title)}

Canonical URL: ${absoluteUrl(`/work/${project.slug}`)}

${clean(project.shortDescription)}

Services: ${clean(project.servicesProvided?.join(", "))}

Documented outcomes:
${project.results?.map((result) => `- ${clean(result)}`).join("\n") || "See the case study for available details."}
`).join("\n")}

## Article context

${posts.map((post) => `### ${clean(post.title)}

Canonical URL: ${absoluteUrl(`/blog/${post.slug}`)}

${clean(post.excerpt)}

Body excerpt: ${clean(toPlainText(post.body).slice(0, 1400))}
`).join("\n")}

## Common questions

${faqs.map((faq) => `### ${clean(faq.question)}\n\n${clean(faq.answer)}`).join("\n\n")}
`;
}
