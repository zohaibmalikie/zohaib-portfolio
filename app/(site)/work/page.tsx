import { ProjectExplorer } from "@/components/project-explorer";

import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getProjects, getSiteSettings } from "@/sanity/lib/fetchers";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSiteSettings({ stega: false });
  return buildMetadata({
    title: "Work",
    description:
      "Frontend case studies and portfolio projects by Muhammad Zohaib Ramzan, including CMS, ecommerce, SaaS, and responsive website work.",
    path: "/work",
    settings
  });
}

export default async function WorkPage() {
  const projects = await getProjects();
  const workListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Website development case studies by Muhammad Zohaib Ramzan",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/work/${project.slug}`),
      name: project.title,
      description: project.shortDescription
    }))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/")
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: absoluteUrl("/work")
      }
    ]
  };

  return (
    <main id="main-content" className="main">
      <JsonLd data={workListSchema} />
      <JsonLd data={breadcrumbSchema} />
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Work</p>
          <div className="page-heading">
            <h1>Real projects. Thoughtful solutions.</h1>
          </div>
          <p className="lead">
            Explore ecommerce experiences, content-managed websites, and application
            interfaces. See the problem, my contribution, and the work delivered.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <ProjectExplorer projects={projects} />
        </div>
      </section>
    </main>
  );
}
