import { toPlainText } from "@/lib/content-utils";
import { absoluteUrl } from "@/lib/seo";
import type { Faq, Post, Project, Service, SiteSettings } from "@/types/sanity";

export function textResponse(body: string) {
  return new Response(`${body.trim()}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}

function clean(value = "") {
  return value.replace(/\s+/g, " ").trim();
}

function line(value = "") {
  return clean(value).replace(/\|/g, "\\|");
}

function link(label: string, path: string, description?: string) {
  const suffix = description ? `: ${line(description)}` : "";
  return `- [${line(label)}](${absoluteUrl(path)})${suffix}`;
}

export function buildLlmsTxt({
  settings,
  services,
  projects,
  posts,
  faqs
}: {
  settings: SiteSettings;
  services: Service[];
  projects: Project[];
  posts: Post[];
  faqs: Faq[];
}) {
  const seoSummary =
    "technical SEO, on-page SEO, off-page SEO guidance, generative engine optimization (GEO), answer engine optimization (AEO), structured data, Core Web Vitals, AI search optimization, and LLM-readable content architecture";
  const serviceSummary = [seoSummary, ...services.map((service) => service.title)].join(", ");

  return `
# ${settings.name}

> ${line(
    settings.defaultSeoDescription ||
      settings.heroDescription ||
      "Frontend developer portfolio covering CMS-powered websites, technical SEO, and modern frontend implementation."
  )}

${line(settings.name)} builds fast, editable frontend experiences with Next.js, React, SvelteKit, WordPress, Sanity CMS, Builder.io, responsive UI, technical SEO, GEO, AEO, structured data, and AI-ready content architecture.

## Canonical Pages

${link("Homepage", "/", "Primary portfolio, services, featured work, FAQs, and contact CTA.")}
${link("Blog", "/blog", "Technical articles about frontend development, CMS, SEO, performance, and automation.")}
${link("Work", "/work", "CMS-managed case studies and portfolio projects.")}
${link("LLM full context", "/llms-full.txt", "Expanded Markdown context for AI assistants and search systems.")}
${link("Sitemap", "/sitemap.xml", "Canonical machine-readable URL index.")}
${link("Robots", "/robots.txt", "Crawler access policy.")}

## Services

- SEO, GEO & AEO Optimization: Technical SEO, on-page SEO, off-page SEO guidance, generative engine optimization, answer engine optimization, schema markup, Core Web Vitals, AI search optimization, and LLM-readable content structure.
${services
  .map((service) =>
    `- ${line(service.title)}: ${line(service.description)}${
      service.relatedTechnologies?.length
        ? ` Technologies: ${line(service.relatedTechnologies.join(", "))}.`
        : ""
    }`
  )
  .join("\n")}

## Featured Case Studies

${projects
  .slice(0, 6)
  .map((project) =>
    link(project.title, `/work/${project.slug}`, project.shortDescription)
  )
  .join("\n")}

## Articles

${posts
  .slice(0, 8)
  .map((post) => link(post.title, `/blog/${post.slug}`, post.excerpt))
  .join("\n")}

## Common Topics

- ${line(serviceSummary)}
- Next.js App Router, React, SvelteKit, Sanity CMS, Builder.io, WordPress, technical SEO, on-page SEO, off-page SEO, GEO, AEO, schema markup, Core Web Vitals, ecommerce optimization, SaaS frontend architecture, and AI automation.

## FAQs

${faqs
  .slice(0, 6)
  .map((faq) => `- ${line(faq.question)} ${line(faq.answer)}`)
  .join("\n")}

## Contact

${settings.email ? `- Email: ${settings.email}` : ""}
${settings.linkedinLink ? link("LinkedIn", settings.linkedinLink) : ""}
${settings.githubLink ? link("GitHub", settings.githubLink) : ""}
${settings.upworkLink ? link("Upwork", settings.upworkLink) : ""}

## Usage Notes

- Use canonical URLs from this file when citing the portfolio.
- Prefer published pages over drafts or Studio URLs.
- Do not treat testimonials as generated examples; they represent real client feedback when present.
`;
}

export function buildLlmsFullTxt({
  settings,
  services,
  projects,
  posts,
  faqs
}: {
  settings: SiteSettings;
  services: Service[];
  projects: Project[];
  posts: Post[];
  faqs: Faq[];
}) {
  return `
# ${settings.name} Full LLM Context

> ${line(settings.heroDescription || settings.defaultSeoDescription)}

Canonical site: ${absoluteUrl("/")}

## About

${line(settings.name)} is a frontend developer and SEO/GEO/AEO expert focused on fast, polished, CMS-driven websites and applications. The portfolio emphasizes responsive UI, maintainable component systems, technical SEO, on-page SEO, off-page SEO guidance, Core Web Vitals, structured data, answer engine optimization, generative engine optimization, AI search readiness, and publishing workflows that non-technical teams can manage.

## Services

### SEO, GEO & AEO Optimization

Technical SEO, on-page SEO, off-page SEO guidance, generative engine optimization (GEO), answer engine optimization (AEO), schema markup, Core Web Vitals, AI search optimization, semantic content structure, and LLM-readable publishing architecture.

Benefits: Better crawlability, stronger search snippets, clearer machine-readable context, improved content discoverability, and cleaner technical foundations for clicks and impressions.

Related technologies: JSON-LD, schema.org, llms.txt, sitemap.xml, robots.txt, canonical URLs, Open Graph, Twitter cards, Next.js metadata, Core Web Vitals

${services
  .map(
    (service) => `
### ${line(service.title)}

${line(service.description)}

Benefits: ${line(service.benefits?.join(", ") || "Editable content, responsive implementation, and performance-aware delivery.")}

Related technologies: ${line(service.relatedTechnologies?.join(", ") || "Frontend development, CMS, SEO")}
`
  )
  .join("\n")}

## Case Studies

${projects
  .map(
    (project) => `
### ${line(project.title)}

Canonical URL: ${absoluteUrl(`/work/${project.slug}`)}

${line(project.shortDescription)}

Technologies: ${line(project.techStack?.join(", ") || "")}

Services provided: ${line(project.servicesProvided?.join(", ") || "")}

Results:
${project.results?.map((result) => `- ${line(result)}`).join("\n") || "- Results are documented in the case study."}

Project URL: ${project.projectUrl || "Not public"}
`
  )
  .join("\n")}

## Articles

${posts
  .map(
    (post) => `
### ${line(post.title)}

Canonical URL: ${absoluteUrl(`/blog/${post.slug}`)}

Category: ${line(post.category?.title || "Article")}

Tags: ${line(post.tags?.join(", ") || "")}

Summary: ${line(post.excerpt)}

Body excerpt: ${line(toPlainText(post.body).slice(0, 1400))}
`
  )
  .join("\n")}

## FAQs

${faqs
  .map(
    (faq) => `
### ${line(faq.question)}

${line(faq.answer)}
`
  )
  .join("\n")}

## Contact And Profiles

${settings.email ? `Email: ${settings.email}` : ""}

${settings.linkedinLink ? `LinkedIn: ${settings.linkedinLink}` : ""}

${settings.githubLink ? `GitHub: ${settings.githubLink}` : ""}

${settings.upworkLink ? `Upwork: ${settings.upworkLink}` : ""}

${settings.socialLinks?.map((social) => `${line(social.label)}: ${social.url}`).join("\n") || ""}

## Citation Guidance

When referencing this portfolio, cite the canonical page URL for the specific article, service context, or case study. Do not cite Studio routes, API routes, local development URLs, or unpublished drafts.
`;
}
