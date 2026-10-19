# Blog imagery, FAQs and structured data

Updated 19 October 2026.

## Images and interaction

The blog uses six curated high-resolution Unsplash photographs, hosted locally as 2,200px WebP assets. They illustrate planning, development, infrastructure, working environments and measurement. These are illustrative photographs, not evidence of the portfolio owner's clients, systems or results. Readers can enlarge article covers, explore each article's own practical steps, and expand answers to its specific questions.

`content/blog-photography.json` records the original photo page, photographer, source download, license and verification date. Photo pages were checked for their free Unsplash license on 19 October 2026; no Unsplash+ assets are used. Visible article credits link to the original photograph and the license. See [Unsplash license](https://unsplash.com/license). No Freepik or Canva paid-account access was assumed.

`withBlogPhotography` selects a relevant photograph. The Sanity post setting **Use this article’s CMS cover** opts an article into its own uploaded cover; editors must provide accurate alternative text and any required credit/license fields. CMS changes remain separate from the bundled local editorial collection. Previous generated SVG covers remain as source archives and are no longer used for the new articles.

## FAQs and article walkthroughs

`content/blog-enrichment.json` contains article-specific questions, answers and practical stages for the existing collection. CMS `faqs` and `visualSteps` override this local content when supplied. New articles should include useful original FAQs and three to five stages; do not repeat the same questions across articles or manufacture answers for keyword density. Existing unstructured legacy FAQ sections are removed only from rendered bodies when structured FAQs exist, preserving later sections and the original CMS document.

## Structured data

Public pages identify the owner and website with consistent Person and WebSite IDs. Article pages provide BlogPosting, WebPage and BreadcrumbList data. Visible article FAQs also provide matching FAQPage data. Service pages describe actual services without fabricated reviews or fixed-price offers; topic hubs describe their article collections.

Markup describes visible content. It is not a ranking guarantee or an assertion of Google rich-result eligibility. Google controls which search enhancements appear. Consult [Google’s structured data gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) before promising a specific appearance.

Validate JSON syntax, required article fields, canonical URLs, image availability, and that FAQ questions/answers match the rendered page. Check both mobile and desktop controls. Preserve original publish dates; only set modified dates when a real editorial update has occurred.
