import { notFound } from "next/navigation";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PortableContent } from "@/components/portable-content";
import { SanityImage } from "@/components/sanity-image";
import { formatProjectDate } from "@/lib/content-utils";
import { absoluteUrl, buildMetadata, canonicalUrlFor, getImageUrl } from "@/lib/seo";
import {
  getProject,
  getProjectSlugs,
  getServices,
  getSiteSettings
} from "@/sanity/lib/fetchers";

export const revalidate = 3600;

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function getProjectSeoTitle(project: {
  title: string;
  techStack?: string[];
  shortDescription?: string;
  seo?: {
    title?: string;
    metaTitle?: string;
  };
}) {
  const seoTitle = project.seo?.metaTitle || project.seo?.title;
  if (seoTitle && seoTitle.trim() !== project.title.trim()) return seoTitle;

  const shortName = project.title.split("—")[0].trim();
  const context = /ecommerce/i.test(`${project.title} ${project.shortDescription || ""}`)
    ? "Ecommerce UI/UX"
    : project.techStack?.[0] || "Website Development";
  return `${shortName} ${context} Case Study | Zohaib Ramzan`;
}

export async function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProject(slug, { stega: false }),
    getSiteSettings({ stega: false })
  ]);

  if (!project) notFound();

  return buildMetadata({
    title: getProjectSeoTitle(project),
    description:
      project.seo?.metaDescription ||
      project.seo?.description ||
      project.shortDescription,
    path: `/work/${project.slug}`, canonicalUrl: project.seo?.canonicalUrl,
    image: project.seo?.ogImage || project.seo?.openGraphImage || project.mainImage,
    noIndex: project.seo?.noIndex,
    keywords: project.seo?.keywords || project.techStack,
    openGraphTitle: project.seo?.ogTitle,
    openGraphDescription: project.seo?.ogDescription,
    settings
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const [services, settings] = await Promise.all([getServices(), getSiteSettings()]);
  const relatedServices = services.filter((service) => !service.seo?.noIndex && service.relatedProjectSlugs?.includes(project.slug));
  const imageUrl = getImageUrl(project.mainImage);
  const projectUrl = canonicalUrlFor(`/work/${project.slug}`, project.seo?.canonicalUrl);
  const hasProblem = Boolean(project.problem?.length);
  const hasSolution = Boolean(project.solution?.length);
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    url: projectUrl,
    image: imageUrl ? absoluteUrl(imageUrl) : undefined,
    creator: {
      "@type": "Person",
      name: settings.name,
      "@id": absoluteUrl("/#person")
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
            <div className="page-heading">
              <h1>{project.title}</h1>
            </div>
            <p className="lead">{project.shortDescription}</p>
            <div className="button-row">
              <Link href="/contact" className="button">
                Start a similar project
              </Link>
              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
              {project.projectDate ? (
                <>
                  <h3>Date</h3>
                  <p className="project-date">{formatProjectDate(project.projectDate)}</p>
                </>
              ) : null}
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
              {hasProblem ? <><h2>Challenge</h2><PortableContent value={project.problem} /></> : project.shortDescription ? <><h2>Project context</h2><p>{project.shortDescription}</p></> : null}
              {hasSolution ? <><h2>Solution</h2><PortableContent value={project.solution} /></> : null}
              {project.servicesProvided?.length ? <><h2>Documented scope</h2><ul className="outcome-list">{project.servicesProvided.map((item) => <li key={item}>{item}</li>)}</ul></> : null}
              {project.results?.length ? (
                <>
                  <h2>Documented delivery</h2>
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

        {relatedServices.length ? <section className="section section-muted"><div className="container"><h2>Discuss a related service.</h2><p>Explore the scope and delivery process for a similar project.</p><div className="button-row">{relatedServices.map((service) => <Link className="button button-secondary" key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>)}</div></div></section> : null}

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
