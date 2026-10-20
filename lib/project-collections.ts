import type { Project } from "@/types/sanity";

// The CMS and bundled case study describe the same LedStore engagement.
// Preserve its established public URL and enrich it with the fallback content.
export function canonicalProjectSlug(slug: string) {
  return slug === "ledstore-fi-ecommerce-ui-ux" ? "ledstore" : slug;
}

export function mergeProjects(primary: Project[], fallback: Project[]): Project[] {
  const bySlug = new Map<string, Project>();
  // Merge legacy documents first so the canonical CMS document wins regardless
  // of query ordering; bundled fields still fill missing optional content.
  const orderedPrimary = [...primary].sort((a, b) =>
    Number(a.slug === canonicalProjectSlug(a.slug)) - Number(b.slug === canonicalProjectSlug(b.slug))
  );
  for (const project of [...fallback, ...orderedPrimary]) {
    const slug = canonicalProjectSlug(project.slug);
    const previous = bySlug.get(slug);
    const defined = Object.fromEntries(Object.entries(project).filter(([, value]) => value != null && value !== ""));
    bySlug.set(slug, {
      ...previous, ...defined, _id: project._id, title: project.title, slug,
      seo: { ...previous?.seo, ...Object.fromEntries(Object.entries(project.seo || {}).filter(([, value]) => value != null && value !== "")) }
    });
  }
  return [...bySlug.values()];
}
