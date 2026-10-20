# Service buyer guides — 20 October 2026

Added five original guides (4,245 body words) for distinct buyer questions across the five main services. Each guide includes three original visible FAQs, three interactive visual stages, an individual illustration, natural title/description/keyword metadata, links to the relevant service and enquiry route, and contextual article links. Existing CMS content and publish dates were preserved.

| Guide | Cover asset |
| --- | --- |
| [AI Automation Audit Deliverables: What a Business Owner Should Receive](/blog/automation-audit-deliverables-business-owner) | `public/assets/img/blogs/artwork/automation-audit-deliverables-business-owner.webp` |
| [API Integration Repair or Rebuild? How to Choose the Right Scope](/blog/api-integration-repair-or-rebuild) | `public/assets/img/blogs/artwork/api-integration-repair-or-rebuild.webp` |
| [Automation Maintenance Support: Hours, Response Times and Ownership](/blog/automation-maintenance-support-hours) | `public/assets/img/blogs/artwork/automation-maintenance-support-hours.webp` |
| [Hiring a Freelance Next.js Developer: A Business Website Project Brief](/blog/hire-freelance-nextjs-developer-project-brief) | `public/assets/img/blogs/artwork/hire-freelance-nextjs-developer-project-brief.webp` |
| [Technical SEO Audit vs Monthly SEO: Which Service Do You Need?](/blog/technical-seo-audit-vs-monthly-seo) | `public/assets/img/blogs/artwork/technical-seo-audit-vs-monthly-seo.webp` |

## Image provenance and prompts

All five covers were created with the built-in ImageGen tool and visually reviewed together. The original generated PNGs remain in the default Codex generated-images directory; optimized 1600px WebP copies are saved in this repository. No third-party stock license or client screenshot is asserted. Exact final prompts and alternative text are recorded under the five slugs in `content/blog-cover-art.json`. Captions visibly identify the artwork as AI-generated.

## Research and editorial approach

The practical scoping frameworks and illustrative examples are original editorial guidance, not claims of completed client work, certified expertise, measured search volume or guaranteed outcomes. Primary references used for the relevant technical distinctions:

- [n8n workflow export and import](https://docs.n8n.io/workflows/export-import/): review exports for sensitive credential references or HTTP headers.
- [Next.js production checklist](https://nextjs.org/docs/app/guides/production-checklist): production checks as an implementation reference.
- [Google SRE service-level objectives](https://sre.google/sre-book/service-level-objectives/): distinguish indicators, objectives and agreements.
- [Google guidance on hiring an SEO](https://developers.google.com/search/docs/fundamentals/do-i-need-seo): evaluate scope, evidence and realistic expectations.

Article bodies link to their supporting sources. Titles and primary intent were compared with the existing library to avoid duplicating its procedural checklists. New guides focus on evaluating and commissioning a service. The five relevant service defaults link back to the new guides; CMS overrides remain authoritative.

## Verification

Run `npm run validate:content`, `npm run lint`, `npm run typecheck` and `npm run build`. Verify the five public articles, service backlinks, topic hubs, sitemap and machine-readable discovery routes after deployment. Check that all 15 new visible FAQ answers match FAQPage markup, cover files load, and canonical URLs are self-referencing.

Local verification passed: 132 public pages, 105 articles and 255 matching visible/schema FAQ answers. All five service backlinks, service/enquiry links and sitemap/full discovery entries passed. Content validation confirms 105 distinct cover hashes and 224 unique enrichment questions. Lint, TypeScript and production build passed. Mobile cover zoom/Escape, walkthrough selection, FAQ expansion and desktop/mobile layouts were checked before release.

Publication authorization: the owner approved all five guides on 20 October 2026. The release uses that first-publication date; verify live routes and deployed revision before reporting completion.
