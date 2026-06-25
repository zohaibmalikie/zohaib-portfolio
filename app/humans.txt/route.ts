import { absoluteUrl } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/fetchers";

export const revalidate = 3600;

export async function GET() {
  const settings = await getSiteSettings({ stega: false });

  return new Response(
    `
/* TEAM */
Owner: ${settings.name}
Role: Frontend developer
Site: ${absoluteUrl("/")}
${settings.email ? `Contact: ${settings.email}` : ""}
${settings.linkedinLink ? `LinkedIn: ${settings.linkedinLink}` : ""}

/* SITE */
Stack: Next.js App Router, Sanity CMS, React, TypeScript
Purpose: Portfolio, technical articles, CMS-managed services, and case studies
LLM guide: ${absoluteUrl("/llms.txt")}
Full LLM context: ${absoluteUrl("/llms-full.txt")}
Sitemap: ${absoluteUrl("/sitemap.xml")}
`.trim() + "\n",
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600"
      }
    }
  );
}
