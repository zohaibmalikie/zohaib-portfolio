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
