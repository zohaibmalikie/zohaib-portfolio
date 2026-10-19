# Website and SEO release — 19 October 2026

This release expands the portfolio into a service and enquiry website. The homepage explains outcomes, guides readers toward a suitable service, and links to actual project examples. Five detailed service pages explain deliverables, process, FAQs and scope. Contact links preserve the selected service. Tools include a local automation-capacity calculator, a service finder and two reusable planning downloads. Nine topic hubs connect relevant articles and service pages.

Blog improvements replace the generated cover graphics with licensed local photography, accessible image enlargement, article-specific practical walkthroughs and expandable FAQs. Structured data describes the visible owner, website, articles, breadcrumbs, services and collections; article FAQ schema matches the displayed answers. Sanity fields let editors maintain these additions.

Technical changes include canonical-aware sitemap filtering, crawlable noindex filter pages, meaningful modification dates, absolute social-image URLs, a branded site-sharing card and CMS cache invalidation for the new pages. The 50 new guides' publication timestamps were corrected from a future midnight UTC placeholder to their original release commit time; the local calendar date remains 19 October.

## External work and limits

The Search Console property is connected through Windsor.ai. The existing Tuesday/Friday automation follows `docs/seo-automation.md`, which now includes requirements for images, useful FAQ content and structured data. Private analytics and evidence stay in the ignored `.seo-reports` directory.

Off-page opportunities and publication/outreach drafts are in `docs/off-page-seo-plan.md`. No emails, social posts, directory submissions, paid links or external account edits were performed in this release. Those placements require destination-specific authorization. No ranking, traffic or enquiry target is guaranteed.

The enquiry form opens a prepared WhatsApp conversation. It does not store leads or confirm that a message was sent. Conversion counts must distinguish this outbound contact action from confirmed enquiries. There is no GA4 measurement ID or server-side lead store configured in this repository at release time.

Validation results are recorded after the final checks below.

## Validation

- ESLint, strict TypeScript, editorial validation and production build pass.
- All 100 article enhancements checked: 200 unique questions with answers and 300 visual stages. Optional CMS import was dry-run successfully for all 50 bundled articles, including their image credits and FAQ/visual fields; no CMS writes occurred.
- Rendered crawl: 128 HTML pages, 128 unique titles and one H1/canonical per page. Article FAQ JSON matches visible server-rendered answers; filter noindex/follow, robots and LLM routes checked.
- Sitemap contains 131 URLs. XML escaping covers query separators in transformed image URLs.
- Design evaluation passed after fixing the editorial parser: headings no longer absorb following paragraphs or lists. Desktop/mobile article layout, dialog/Escape/focus return, process selection and FAQ expansion verified. Service selection, calculator positive/negative branches and contact context verified.
- Local Sanity project-image optimization requests encountered CDN connection timeouts; raw source availability was confirmed. Production image delivery must be checked after deployment. The new blog photography is locally hosted and its optimizer responses passed.
