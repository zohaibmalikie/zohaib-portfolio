# Blog imagery, FAQs and structured data

Updated 20 October 2026.

## Images and interaction

The 106-article collection uses 106 individually generated editorial illustrations, each saved as a separate 1,600px WebP asset under `public/assets/img/blogs/artwork`. `content/blog-cover-art.json` records the article-specific brief and descriptive alternative text. Native ImageGen produced the original raster artwork; visible captions identify it as AI-generated. These are conceptual illustrations, not screenshots, client evidence or photographs.

`withBlogPhotography` now resolves covers by exact article slug. It never assigns a shared category image. A future article without a bundled illustration retains its own uploaded CMS cover; every publication must supply a unique image and check it against the existing collection. The CMS option **Use this article’s CMS cover** remains available, and the editor is responsible for unique artwork and accurate source/license information when using third-party media.

The earlier six-photo Unsplash library and its license ledger remain archived so previously published image URLs stay available. They are no longer the shared cover source. No paid Freepik or Canva asset license is asserted. Article cover enlargement and the article-specific interactive walkthroughs remain available.

## FAQs and article walkthroughs

`content/blog-enrichment.json` contains article-specific questions, answers and practical stages for the existing collection. CMS `faqs` and `visualSteps` override this local content when supplied. New articles should include useful original FAQs and three to five stages; do not repeat the same questions across articles or manufacture answers for keyword density. Existing unstructured legacy FAQ sections are removed only from rendered bodies when structured FAQs exist, preserving later sections and the original CMS document.

## Structured data

Public pages identify the owner and website with consistent Person and WebSite IDs. Article pages provide BlogPosting, WebPage and BreadcrumbList data. Visible article FAQs also provide matching FAQPage data. Service pages describe actual services without fabricated reviews or fixed-price offers; topic hubs describe their article collections.

Markup describes visible content. It is not a ranking guarantee or an assertion of Google rich-result eligibility. Google controls which search enhancements appear. Consult [Google’s structured data gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) before promising a specific appearance.

Validate JSON syntax, required article fields, canonical URLs, image availability, and that FAQ questions/answers match the rendered page. Check both mobile and desktop controls. Preserve original publish dates; only set modified dates when a real editorial update has occurred.
