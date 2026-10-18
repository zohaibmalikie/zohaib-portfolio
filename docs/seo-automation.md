# Portfolio search and enquiry automation

## Schedule and scope

The `grow-portfolio-enquiries` thread automation runs Tuesdays and Fridays at 09:00 in the app's configured local timezone (Asia/Karachi for this session). It reviews search evidence, improves existing guides or publishes at most one useful distinct article per run, and checks the website's technical health. This is a local thread automation: the computer and Codex app need to be available for local repository work. It is not an always-on server process.

The goal is qualified enquiries, with thousands of clicks and millions of impressions as long-term ambitions, not forecasts or guarantees. Do not optimize for irrelevant impressions or claim a WhatsApp click is a confirmed enquiry.

## Search Console connection

The Windsor.ai integration is connected in this chat and the intended domain property has been verified. Verify its current connected source accounts each run. The intended Google Search Console property is `sc-domain:zohaibramzan.com`. A plugin connection and Google source authorization are separate steps; do not claim data access until the property is actually returned.

Read connector fields before requesting reports. Compare complete recent 28-day windows, allowing for reporting lag. Use the source's reported timezone and data completeness; annotate partial dates. Request query and page performance separately before subdividing by country/device. Preserve aggregate metrics because query rows can omit anonymized data. CTR is clicks/impressions and average position is not a simple unweighted mean across rows.

Search Console measures search visibility, not completed WhatsApp conversations. Indexing reports may need separate Search Console access if the connector exposes only performance data. Never invent exclusion reasons from a total.

## Each run

1. Read `AGENTS.md`, `docs/search-growth-plan.md`, and the previous run log. Inspect repository changes and preserve unrelated work.
2. Read current verified source data. Identify a relevant opportunity, broken important URL, or outdated factual statement. If there is no actionable evidence, avoid publishing merely to meet a quota.
3. Prefer improving one useful existing article. For a new topic, verify it answers a distinct question and relates to a real service. Research primary sources and write substantive original analysis with a concrete example or actionable procedure, internal links and an enquiry next step. No fabricated results, qualifications, testimonials or keyword metrics.
4. Maintain the article schema in `content/editorial-articles.json`. Add an appropriate cover under `public/assets/img/blogs/guides`. Preserve first publication dates; add `updatedAt` support only when there is a meaningful content change. Avoid cosmetic freshness edits.
5. Run `npm run validate:content`, `npm run lint`, `npm run typecheck`, `npm run build`. Inspect the relevant public page, metadata, listing/filter, related content, sitemap, robots and generated text routes. Do not send test WhatsApp/email messages.
6. Publish through the verified existing CMS or deployment for this exact site only after checks pass. User authorization covers valuable article publication and maintenance. Include only the workflow's own changes. Do not deploy an old Git revision and claim local changes went live. No force-pushing, secret logging or unrelated production changes.
7. If a required authorization or publishing prerequisite is missing, retain reviewed local work and identify the exact required action once. Never report a local article as live.
8. Record implementation changes in `docs/seo-automation-log.md`; keep private metrics, query exports and enquiry data only in git-ignored `.seo-reports/`. Notify for meaningful publication, material changes, failure or required user action. Remain quiet for unchanged non-actionable state.

## Content and publishing paths

Bundled articles render without Sanity. CMS documents override bundled posts by slug. Use `node scripts/export-editorial-posts.mjs` only when intentionally importing articles to Sanity, with actual author/category IDs and an authorized write token configured privately. The current local configuration has no Sanity write token; do not assume it can publish to CMS. The local repository is linked to GitHub `zohaibmalikie/zohaib-portfolio`; the existing Vercel project is `zohaib-portfolio`, serving `www.zohaibramzan.com` and `zohaibramzan.com`. Verify its connection and revision before releases.

## Enquiry behavior and measurement

The site has direct WhatsApp and email links plus a short form that prepares a WhatsApp message. The visitor reviews and sends it in WhatsApp. The form does not save enquiries to a database or confirm delivery. Its `portfolio:enquiry-intent` browser event contains service/channel only and has no configured reporting destination. It is not persistent analytics. Confirmed enquiries must be recorded from actual received conversations or a future connected CRM/analytics setup.

Record search metrics and received enquiry counts separately. When enquiry data is unavailable, say so. Do not access unrelated inbox messages or contact prospective customers without explicit authorization.
