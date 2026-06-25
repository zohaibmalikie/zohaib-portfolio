# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router portfolio with Sanity CMS integration. Public site routes live in `app/(site)`, while generated machine-readable routes such as `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `humans.txt`, and the web manifest live directly under `app`. Sanity Studio is embedded at `app/studio/[[...tool]]`; Studio config, schemas, structure, and queries are under `sanity`. Shared rendering components are in `components`, general helpers and fallback content are in `lib`, and shared Sanity-shaped TypeScript types are in `types`. Static runtime images are served from `public/assets/img`.

## Build, Test, and Development Commands

Use the scripts defined in `package.json`:

- `npm run dev` starts the local Next server.
- `npm run build` creates a production build.
- `npm run start` serves the built app.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs `tsc --noEmit`.

There is no test script or test framework configured in this repo. Validate changes with `npm run lint`, `npm run typecheck`, and `npm run build`.

## Coding Style & Naming Conventions

TypeScript is strict via `tsconfig.json`; imports can use the `@/*` path alias. ESLint uses `eslint-config-next` from `eslint.config.mjs`. Keep route components inside `app`, reusable UI in `components`, and data-fetching or GROQ changes inside `sanity/lib`. Use Sanity schemas in `sanity/schemas` for CMS fields rather than hardcoding new editable content in page components.

## Commit & Pull Request Guidelines

Git history currently contains only `first commit`, so no project-specific commit convention is established. Keep commit subjects short and imperative until a stronger convention appears.

## Agent Instructions

Do not commit real `.env` secrets. Preserve Sanity fallback content in `lib/fallback-data.ts` so pages still render without a configured Sanity project. When editing SEO or GEO behavior, verify the generated routes as well as the visible pages.
