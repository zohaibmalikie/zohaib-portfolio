import { notFound } from "next/navigation";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PortableContent } from "@/components/portable-content";
import { SanityImage } from "@/components/sanity-image";
import { absoluteUrl, buildMetadata, getImageUrl } from "@/lib/seo";
import {
  getProject,
  getProjectSlugs,
  getSiteSettings
} from "@/sanity/lib/fetchers";

export const revalidate = 3600;

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProject(slug, { stega: false }),
    getSiteSettings({ stega: false })
  ]);

  if (!project) {
    return buildMetadata({
      title: "Case study not found",
      path: "/work",
      settings
    });
  }

  return buildMetadata({
    title: project.seo?.title || project.title,
    description: project.seo?.description || project.shortDescription,
    path: project.seo?.canonicalUrl || `/work/${project.slug}`,
    image: project.seo?.openGraphImage || project.mainImage,
    settings
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const imageUrl = getImageUrl(project.mainImage);
  const projectUrl = absoluteUrl(`/work/${project.slug}`);
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    url: projectUrl,
    image: imageUrl ? absoluteUrl(imageUrl) : undefined,
    creator: {
      "@type": "Person",
      name: "Zohaib Ramzan"
    },
    keywords: project.techStack?.join(", "),
    sameAs: project.projectUrl
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
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: projectUrl
      }
    ]
  };

  return (
    <main id="main-content" className="main">
      <JsonLd data={projectSchema} />
      <JsonLd data={breadcrumbSchema} />
      <article>
        <header className="article-header">
          <div className="container">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Work", href: "/work" },
                { label: project.title }
              ]}
            />
            <p className="eyebrow">Case study</p>
            <h1>{project.title}</h1>
            <p className="lead">{project.shortDescription}</p>
            <div className="button-row">
              <Link href="/#contact" className="button">
                Start a similar project
              </Link>
              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary"
                >
                  Visit project
                </a>
              ) : null}
            </div>
          </div>
        </header>

        <SanityImage
          image={project.mainImage}
          width={1200}
          height={680}
          className="article-cover"
          priority
          sizes="(max-width: 1200px) calc(100vw - 36px), 1100px"
        />

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container case-study-grid">
            <aside className="side-panel">
              <h2>Overview</h2>
              {project.techStack?.length ? (
                <>
                  <h3>Technologies</h3>
                  <div className="chip-list">
                    {project.techStack.map((tech) => (
                      <span className="tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              ) : null}
              {project.servicesProvided?.length ? (
                <>
                  <h3>Services</h3>
                  <ul className="outcome-list">
                    {project.servicesProvided.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </aside>

            <div className="rich-text">
              <h2>Challenge</h2>
              <PortableContent value={project.problem} />
              <h2>Solution</h2>
              <PortableContent value={project.solution} />
              {project.results?.length ? (
                <>
                  <h2>Results</h2>
                  <ul className="outcome-list">
                    {project.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </section>

        {project.screenshots?.length ? (
          <section className="section section-muted">
            <div className="container">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Screenshots</p>
                  <h2>Project visuals.</h2>
                </div>
              </div>
              <div className="grid grid-2">
                {project.screenshots.map((screenshot, index) => (
                  <SanityImage
                    key={`${screenshot.alt}-${index}`}
                    image={screenshot}
                    width={900}
                    height={620}
                    className="card-image card"
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
