# Performance and accessibility improvements — 19 October 2026

The shared scroll reveal animation faded text to 1% opacity until a scroll-timeline threshold was reached. It now animates only position, keeping text readable throughout. The measured accessibility score increased from 96 to 100.

Sanity editing overlays now load through a browser-only lazy boundary inside draft mode. Normal visitors do not need the Studio interface. Initial compressed JavaScript decreased from approximately 467 KB to 200 KB (about 57%). The image URL builder is independent of the CMS client, and the server client imports the direct Sanity SDK explicitly.

The hero portrait preloads only on desktop, where it appears above the fold. On mobile it follows the normal lazy image path. Its responsive sizes match the actual layout, and noncritical monospace fonts no longer compete with primary text preloads.

LedStore's CMS and fallback records are merged under `/work/ledstore`. The duplicate `/work/ledstore-fi-ecommerce-ui-ux` redirects permanently, and discovery/service links use the canonical project. Fallback case study content remains available without Sanity.

## Measurement

Reports are stored privately in `.seo-reports/performance-2026-10-19`. The initial live Lighthouse runs measured 99 performance, 96 accessibility, 100 best practices and 100 SEO on both profiles. These differ from the user's PageSpeed run, which measured 87 mobile and 98 desktop performance. Google PageSpeed API calls returned HTTP 429, so direct Chrome Lighthouse runs were used.

Local checks after improvements measured desktop 100 in all four categories. Mobile accessibility, best practices and SEO measured 100; mobile performance varied with local HTTP/1 and audit conditions. Live production results must be recorded after deployment. No category is hidden or excluded to manufacture a score, and no reduced-functionality version is served to audit tools.
