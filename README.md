# Muhammad Zohaib Ramzan Portfolio

Next.js App Router portfolio for Muhammad Zohaib Ramzan, with Sanity CMS-powered articles, case studies, services, FAQs, testimonials, SEO metadata, sitemap generation, and LLM/GEO discovery files.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Sanity Studio embedded at `/studio`
- `next-sanity`, GROQ, Portable Text, Sanity image URLs
- Dynamic SEO files: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, `/humans.txt`, `/manifest.webmanifest`

## Getting Started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

If Next reports that another dev server is already running, stop the PID shown in the terminal:

```bash
kill <PID>
```

Then run `npm run dev` again.

## Environment

Copy `.env.example` and fill in real values:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-01
SANITY_API_READ_TOKEN=
SANITY_WRITE_TOKEN=
SANITY_REVALIDATE_SECRET=
SANITY_DEFAULT_AUTHOR_ID=
SANITY_DEFAULT_CATEGORY_ID=
NEXT_PUBLIC_SITE_URL=https://www.zohaibramzan.com
DRY_RUN=true
```

Do not commit `.env` or real secrets.

## Commands

```bash
npm run dev        # Start local Next dev server
npm run build      # Production build
npm run start      # Serve built app
npm run lint       # ESLint
npm run typecheck  # TypeScript check
npm run import:posts -- content/articles.example.json  # Dry-run local Sanity article import
```

## Content Model

Sanity schemas live in `sanity/schemas`. The site supports:

- Blog articles with Portable Text, authors, categories, tags, featured state, SEO, and OG images
- Case studies with problem, solution, tech stack, services, results, screenshots, project URL, and SEO
- Services with benefits and related technologies
- FAQs with category and sort order
- Real testimonials only
- Site settings for profile content, social links, and default SEO

Fallback content is in `lib/fallback-data.ts` so the site renders before Sanity is connected.

## Publishing And Revalidation

Sanity webhooks should call:

```text
/api/revalidate
```

Set `SANITY_REVALIDATE_SECRET` and send either a valid Sanity webhook signature or the secret through the supported local-testing query/header path.

## Local Article Automation

Bulk articles can be imported from JSON with:

```bash
npm run import:posts -- content/articles.example.json
```

The importer reads `.env`, converts each article's `markdown` field into Sanity Portable Text, uploads or references the main image, calculates reading time, fills SEO fields, and writes `post` documents with `createOrReplace`.

Keep `DRY_RUN=true` while reviewing generated documents. To publish for real:

```bash
DRY_RUN=false npm run import:posts -- content/articles.json
```

Each JSON item should include `title`, `markdown`, `authorId` or `SANITY_DEFAULT_AUTHOR_ID`, `categoryId` or `SANITY_DEFAULT_CATEGORY_ID`, and one of `image`, `imageAssetId`, or `mainImageAssetId`. Use `REVALIDATE_AFTER_IMPORT=true` only when you want the script to call `/api/revalidate` after importing.

## Deployment Notes

Set `NEXT_PUBLIC_SITE_URL` to the production domain. This controls canonical URLs, sitemap URLs, `llms.txt`, JSON-LD, and Open Graph metadata.
