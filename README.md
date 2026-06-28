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
SANITY_REVALIDATE_SECRET=
NEXT_PUBLIC_SITE_URL=https://zohaibramzan.com
```

Do not commit `.env` or real secrets.

## Commands

```bash
npm run dev        # Start local Next dev server
npm run build      # Production build
npm run start      # Serve built app
npm run lint       # ESLint
npm run typecheck  # TypeScript check
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

## Deployment Notes

Set `NEXT_PUBLIC_SITE_URL` to the production domain. This controls canonical URLs, sitemap URLs, `llms.txt`, JSON-LD, and Open Graph metadata.
