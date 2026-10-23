# SEO automation implementation log

## 2026-10-19 — Initial setup

- Connected Search Console through Windsor.ai and verified the intended domain property. Private account metrics and reports are stored only in git-ignored `.seo-reports/`.
- Added 50 distinct practical guides, branded covers, keyword hypotheses, topic filters, pagination, related links, and article enquiry CTAs.
- Added three automation offers with illustrative USD ranges and CMS-editable pricing.
- Unified CMS and bundled article collections for listings and discovery routes.
- Added an accessible form that prepares a WhatsApp message for review; it does not save a lead or claim delivery.
- Scheduled the local thread maintenance automation twice weekly.
- Keyword search volume/difficulty remains unverified because the research account had no API units.
- Initial full checks and route verification passed; final release verification is recorded separately.

Private traffic, query and enquiry data must not be added to this file.

### Release validation

- `npm run lint`, `npm run typecheck`, `npm run validate:content`, and `npm run build` passed.
- HTTP checks passed for all 50 new article routes, BlogPosting data, article enquiry CTAs, new sitemap URLs, category/tag filters, pagination, robots, manifest, and both LLM text routes. Unknown article returned 404.
- Reviewed offers at desktop and narrow mobile widths; fixed decorative hero overflow and confirmed responsive offer stacking.
- Existing historical work URLs checked from the private search analysis still return 200; no speculative redirects added.
- Final publication revision and production verification will be recorded in the local private run report to avoid a post-release documentation-only deployment.

## 19 October 2026 — international services, FAQs and unique covers

Reviewed connected Search Console query/page and country evidence and three relevant automation consulting websites. Added original buyer FAQs, nine query-informed article questions, editable topic keyword fields, focused homepage/service metadata and international remote-collaboration content. Service FAQPage markup matches visible answers; areaServed describes remote markets without claiming offices. Updated recurring maintenance instructions to prioritize US, UK and European enquiry intent and unique artwork. Private metrics stay in `.seo-reports/`; no external outreach or partner applications were submitted.

Replaced shared category photographs with 100 distinct, article-specific AI-generated WebP illustrations, with alt text, provenance briefs and visible captions. Existing image zoom and walkthrough interactions remain. The content validator checks exact asset uniqueness and completeness. Validation passed for 100 assets, 209 unique article FAQs, lint, TypeScript and the 138-path production build. A local crawl checked all 127 HTML sitemap pages plus generated discovery routes, visible/schema FAQ parity and cover/keyword availability. All 100 source covers returned image responses. Final production publication and live measurements must be confirmed against the deployed revision.

Removed the hero's perpetual decorative glow animation while retaining a static glow. The local mobile Speed Index improved from the affected live run's 7.2 seconds to 1.4 seconds; these environments differ, so this is diagnostic evidence rather than a controlled before/after claim. Lighthouse performance scores vary; report live results separately.

Follow-up verification retained the Bricolage heading font while moving body and label typography to native system fonts, removing unnecessary font requests. Optional heading-font rendering avoids a late swap on slow first visits. Desktop/mobile visual checks, content/route checks, lint, TypeScript and the production build passed. Added the real website, services and useful resource links to this public repository's README; no third-party endorsement or acquired ranking benefit is claimed.

## 19 October 2026 — reduce initial route prefetching

Removed speculative prefetching from primary navigation and action buttons. Same-page homepage anchors now use native navigation, retaining real hrefs, keyboard use and the existing mobile menu close behavior. The production build made zero route-prefetch requests before navigation. Local mobile Lighthouse remained 95 performance and 100 in accessibility, best practices and SEO; no 100 mobile claim is made. Existing fonts, article artwork and content remain in place.

## 20 October 2026 — smaller display font

Consolidated Bricolage display typography on the bold 800 face, reducing its Latin font payload from about 41 KB to 22 KB. Checked desktop/mobile home layouts and mobile service/article headings for clipping and horizontal overflow. Lint, TypeScript, production build and the 127-page content/schema check passed. Local Lighthouse measured 96 mobile performance and 100 in the other categories; no live score is inferred from this local result.

## 20 October 2026 — independent performance verification

Added a manual cloud Lighthouse workflow with standard mobile and desktop profiles, pinned Node/action versions, public-page HTML/JSON artifacts and explicit measured-score summaries. It uses a hosted Ubuntu runner independently of the local connection and has no repository checkout or Search Console inputs. Runtime validation is required after the workflow is available on the default branch; no cloud score is claimed before that run.

## 20 October 2026 — maintenance inspection during pending audit release

Verified the connected domain property through Windsor.ai and reviewed equal complete 28-day daily, query, page and country reports with unfinalized data excluded. Private exports and comparisons remain in ignored `.seo-reports/`; the connector does not expose URL-level indexing exclusion reasons. Reviewed sitemap reporting without interpreting submitted counts as indexed counts. No new maintenance article was created, no outreach was sent, and no changes were published. The current technical SEO audit and five preceding service guides remain under the owner's explicit release hold.

Local audit work covers canonical/indexing/CMS/schema fixes, professional positioning, service links and a smaller Work page client payload. A later Sanity timeout exposed false article 404s; CMS-only detail error handling was corrected so failed requests are not treated as successful missing-document results. Validation and remaining limits are recorded in `SEO_AUDIT.md`.

Final local checks passed: content validation, lint, TypeScript, five native SEO tests, production build, 132-page content/FAQ crawl and 140-page canonical HTTP audit. Read-only live checks returned 200 for home, services, contact, robots and sitemap; no enquiry was sent. The final Work filter keyboard check passed. No pending audit change was deployed.

## 20 October 2026 — follow-up performance fixes, unpublished

Moved existing shared growth and FAQ styles to the root layout, reducing homepage stylesheet requests from three to one. Retained Bricolage typography and optional display while disabling font preload. Local mobile Lighthouse measured 97 performance in two final runs with LCP 2.526–2.546 seconds and zero CLS; desktop measured 100 in all four standard categories. Mobile accessibility, best practices and SEO remained 100. These are local lab results, not production or field results.

Lint, typecheck, build, content validation, five SEO tests, the 140-page HTTP audit and 132-page content/schema crawl passed. Mobile menu, service-finder and native FAQ keyboard behavior checked. No publication, CMS writes or enquiry messages occurred; the pending manual release hold remains.

## 20 October 2026 — authorized production release

The owner explicitly requested “publish all of them,” authorizing the reviewed technical SEO fixes, shared CSS/font-priority changes and five new service guides. Lifted the temporary automation release hold and set first-release timestamps for the five guides; preserved existing articles' dates. Verified the existing repository, Vercel team/project, production branch and domain aliases. Release must use the tested revision; exact deployment and live-verification results are stored privately under `.seo-reports/` and reported in the chat once confirmed. Private Search Console exports, enquiry data and environment secrets are excluded.

Production publication confirmed: PR #10 merged as `33043b8892a9b1f9484f3210c65313054c540d4a`; Vercel deployment `dpl_9iiSTjBgn5xVdHmms9pWaDqnpmhL` reached READY with both domain aliases. Live checks passed for 132 sitemap pages, 140 canonical pages, 149 internal destinations, 105 articles and 255 visible/schema FAQ answers. All five new covers returned WebP responses. Contact service selection and direct email/WhatsApp paths were verified without sending messages. No runtime error clusters were returned in the short post-release inspection window.

Independent live Lighthouse run [39431294210](https://github.com/zohaibmalikie/zohaib-portfolio/actions/runs/39431294210) measured desktop performance 100 and mobile 87; accessibility, best practices and SEO were 100 on both. Mobile LCP was 2.2 seconds, TBT 460 ms and CLS 0. The local mobile 97 result does not describe production; remaining main-thread work needs further investigation. Scores vary by runner and are not field INP. All approved product changes and the five guides are live; ongoing maintenance remains authorized.

## 23 October 2026 — invoice-reminder guide improvement

Reviewed the verified Search Console property through Windsor.ai using two complete 28-day periods with unfinalized data excluded, separating query, page, country and invoice-topic country/page evidence. Kept all exact metrics and source exports under ignored `.seo-reports/`. The connector exposes sitemap summaries but not URL-level indexing exclusion reasons; submission totals were not interpreted as indexed-page counts. Confirmed enquiries remain unmeasured and separate from enquiry intent.

Expanded the existing invoice-reminder guide with native-versus-custom scoping, an explicitly illustrative three-invoice example, durable duplicate prevention, uncertain-send recovery, timezone boundaries and seven acceptance checks. Added three original FAQs and improved walkthrough stages, metadata and service/contact links. Checked Stripe primary documentation. Retained the article's unique original cover and first publication date, and set a meaningful editorial modified date. No new article, image reuse across posts, pricing/identity/dependency change, CMS write or off-page outreach occurred.

Publication state at preparation: local release candidate; publish only after content, lint, TypeScript, native SEO tests, production build, browser and route checks pass. Record the exact released revision, Vercel READY state and live verification in ignored `.seo-reports/heartbeat-release-2026-10-23.json`; do not treat this preparation entry alone as proof of publication.

Pre-release validation passed: content validator (105 articles, 227 unique article FAQs and 105 distinct covers), lint, TypeScript, five SEO tests, production build and the 140-page local canonical audit. Updated article metadata, preserved publication date, discovery excerpt, FAQ/schema parity, all three primary-source HTTP responses, walkthrough selection, FAQ keyboard expansion, enquiry href and sampled mobile overflow were checked. No message was sent.
