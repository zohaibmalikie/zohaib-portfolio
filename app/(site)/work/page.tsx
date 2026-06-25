import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { SanityImage } from "@/components/sanity-image";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getProjects, getSiteSettings } from "@/sanity/lib/fetchers";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSiteSettings({ stega: false });
  return buildMetadata({
    title: "Work",
    description:
      "Frontend case studies and portfolio projects by Zohaib Ramzan, including CMS, ecommerce, SaaS, and responsive website work.",
    path: "/work",
    settings
  });
}

export default async function WorkPage() {
  const projects = await getProjects();
  const workListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Frontend and AI development case studies by Zohaib Ramzan",
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
          <h1>Case studies with editable outcomes, stacks, and SEO.</h1>
          <p className="lead">
            Portfolio entries are powered by Sanity and structured around the
            problem, role, solution, technologies, results, screenshots, and CTA.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="grid grid-3">
            {projects.map((project) => (
              <Link
                href={`/work/${project.slug}`}
                className="card project-card"
                key={project._id}
              >
                <SanityImage
                  image={project.mainImage}
                  width={760}
                  height={475}
                  className="card-image"
                />
                <div className="card-body">
                  <h2>{project.title}</h2>
                  <p>{project.shortDescription}</p>
                  <div className="chip-list">
                    {project.techStack?.slice(0, 4).map((tech) => (
                      <span className="tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
