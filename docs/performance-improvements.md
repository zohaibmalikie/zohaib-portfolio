# Performance and accessibility improvements — 19 October 2026

The shared scroll reveal animation faded text to 1% opacity until a scroll-timeline threshold was reached. It now animates only position, keeping text readable throughout. The measured accessibility score increased from 96 to 100.

Sanity editing overlays now load through a browser-only lazy boundary inside draft mode. Normal visitors do not need the Studio interface. Initial compressed JavaScript decreased from approximately 467 KB to 200 KB (about 57%). The image URL builder is independent of the CMS client, and the server client imports the direct Sanity SDK explicitly.

The hero portrait preloads only on desktop, where it appears above the fold. On mobile it follows the normal lazy image path. Its responsive sizes match the actual layout, and noncritical monospace fonts no longer compete with primary text preloads.

LedStore's CMS and fallback records are merged under `/work/ledstore`. The duplicate `/work/ledstore-fi-ecommerce-ui-ux` redirects permanently, and discovery/service links use the canonical project. Fallback case study content remains available without Sanity.

## Measurement

Reports are stored privately in `.seo-reports/performance-2026-10-19`. The initial live Lighthouse runs measured 99 performance, 96 accessibility, 100 best practices and 100 SEO on both profiles. These differ from the user's PageSpeed run, which measured 87 mobile and 98 desktop performance. Google PageSpeed API calls returned HTTP 429, so direct Chrome Lighthouse runs were used.

Local checks after improvements measured desktop 100 in all four categories. Mobile accessibility, best practices and SEO measured 100; mobile performance varied with local HTTP/1 and audit conditions. Live production results must be recorded after deployment. No category is hidden or excluded to manufacture a score, and no reduced-functionality version is served to audit tools.

The follow-up release makes the hero glow static and uses native system fonts for body text and small monospace labels, removing two font-family downloads. The distinctive Bricolage heading font remains self-hosted and preloaded, with `font-display: optional` to avoid a late swap on slow first visits. Desktop and 390px mobile layouts were visually checked after the change. See [Google's font-loading guidance](https://web.dev/articles/font-best-practices) for the rendering tradeoff. Final live measurements are reported separately from local HTTP/1 checks.

A later mobile trace showed 12 speculative route-prefetch requests for the initial Work/Services links and same-page navigation. Primary navigation and action buttons now load routes when selected, and homepage hash links use native anchors. This avoids prefetching another copy of the current homepage for About links. The changed production build made zero route-prefetch requests before navigation; normal page selection and cross-page mobile About navigation were checked. This trades speculative route warming for lower initial network work. The local mobile Lighthouse score remained 95, so the request reduction is not presented as a confirmed score increase.

On 20 October, the display typography was consolidated on Bricolage Grotesque's bold 800 face. Its Latin WOFF2 asset is about 22 KB instead of the earlier 41 KB variable-weight download. The hero's existing bold style remains, and native body/label fonts remain in place. Desktop and mobile homepage, service and article layouts were checked, including heading clipping and horizontal overflow. The local mobile check measured 96 performance with the other categories at 100; live scores require a separate deployed measurement.

## Independent cloud audit

The manually triggered `Live Lighthouse audit` GitHub Actions workflow audits the fixed public homepage with standard mobile and desktop Lighthouse 13.5.0 profiles. It uses a standard hosted Ubuntu runner and publishes the HTML/JSON reports as seven-day artifacts, with the actual category scores in each job summary. A green workflow means the audit ran successfully; it is not a 100-point result. The runner's region is not fixed; an optional Cloudflare egress lookup records its reported country/edge location without logging the IP address. These remain lab measurements, separate from Google PageSpeed and real-user Core Web Vitals.

This provides an independent connection when local transfers are unstable. For example, a local retest received a 1 KB stylesheet after about 15 seconds while the homepage's server response was about 0.1 seconds. Do not treat such network variance as proof that a code change caused a regression, and do not report an earlier best score as the latest measurement.

Run `gh workflow run live-lighthouse.yml --ref main`, then inspect both job summaries and artifacts. The workflow is manual, uses read-only repository permissions, and audits only the public site. No Search Console query or enquiry reports are uploaded.

## Offscreen homepage rendering

The independent US-egress cloud baseline measured mobile 93 (FCP 1.3 s, LCP 2.0 s, TBT 280 ms, CLS 0) and desktop 98; accessibility, best practices and SEO were 100 on both. The long homepage now uses native `content-visibility: auto` for sections after the hero/marquee, with responsive remembered-size estimates and a print override. This lets the browser defer offscreen layout and paint while retaining the server-rendered content. Fragment links switch all sections back to normal rendering so estimated heights do not move the destination during smooth scrolling. Mobile Contact/FAQ and desktop About destinations, FAQ disclosure and service-finder interaction were checked; no horizontal overflow was observed. The 127-page/100-article/240-FAQ content check, lint, TypeScript and production build passed. Local Lighthouse measured 96 performance, 20 ms blocking and zero layout shift. A new cloud measurement is required before claiming a live performance gain.

## Technology-strip markup

Reduced the two-row technology strip from six copies of the same 22 labels to four, removing 132 DOM elements. Each row loops across two equal copies with a 50% translation; a copy spans at least the viewport to avoid a gap on wide screens. Only the first copy of the first row is exposed to screen readers. The two-row visual and the existing reduced-motion preference are preserved. Cloud scores vary with hosted-runner CPU speed, so this markup reduction is not a claimed 100-point mobile result.
