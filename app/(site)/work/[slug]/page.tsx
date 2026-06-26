import { notFound } from "next/navigation";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PortableContent } from "@/components/portable-content";
import { SanityImage } from "@/components/sanity-image";
import { formatProjectDate } from "@/lib/content-utils";
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

function getProjectSeoTitle(project: {
  title: string;
  seo?: {
    title?: string;
    metaTitle?: string;
  };
}) {
  const seoTitle = project.seo?.metaTitle || project.seo?.title;
  if (seoTitle && seoTitle.trim() !== project.title.trim()) return seoTitle;

  return `${project.title} Case Study | Frontend Development Portfolio`;
}

function getFallbackProblem(project: {
  title: string;
  shortDescription?: string;
  techStack?: string[];
}) {
  const stack = project.techStack?.length
    ? ` The work needed to fit the project's stack, including ${project.techStack.join(", ")}.`
    : "";

  return `${project.title} needed a clear, reliable digital experience that could communicate the value of the project quickly and support users across desktop and mobile screens. ${project.shortDescription || ""}${stack}`;
}

function getFallbackSolution(project: {
  servicesProvided?: string[];
  results?: string[];
}) {
  const services = project.servicesProvided?.length
    ? ` My role focused on ${project.servicesProvided.join(", ").toLowerCase()}.`
    : "";
  const results = project.results?.length
    ? ` The outcome included ${project.results.join(", ").toLowerCase()}.`
    : "";

  return `I approached the project with a frontend-first implementation process: clarify the content structure, shape responsive layouts, keep important actions easy to find, and polish the interface for practical user journeys.${services}${results}`;
}

function getProjectScope(project: {
  title: string;
  techStack?: string[];
  servicesProvided?: string[];
}) {
  const services = project.servicesProvided?.length
    ? project.servicesProvided.join(", ").toLowerCase()
    : "frontend implementation, responsive design, and user experience polish";
  const stack = project.techStack?.length
    ? ` The implementation used ${project.techStack.join(", ")} to support a maintainable and responsive delivery.`
    : "";

  return `For ${project.title}, the scope covered ${services}. The focus was to make the interface easier to understand, easier to navigate, and more useful for the people arriving from search, referrals, or direct client workflows.${stack}`;
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

  if (!project) {
    return buildMetadata({
      title: "Case study not found",
      path: "/work",
      settings
    });
  }

  return buildMetadata({
    title: getProjectSeoTitle(project),
    description:
      project.seo?.metaDescription ||
      project.seo?.description ||
      project.shortDescription,
    path: project.seo?.canonicalUrl || `/work/${project.slug}`,
    image: project.seo?.ogImage || project.seo?.openGraphImage || project.mainImage,
    settings
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const imageUrl = getImageUrl(project.mainImage);
  const projectUrl = absoluteUrl(`/work/${project.slug}`);
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
      name: "Muhammad Zohaib Ramzan"
    },
    datePublished: project.projectDate,
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
              <Link href="/#contact" className="button">
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
              <h2>Challenge</h2>
              {hasProblem ? (
                <PortableContent value={project.problem} />
              ) : (
                <p>{getFallbackProblem(project)}</p>
              )}
              <h2>Solution</h2>
              {hasSolution ? (
                <PortableContent value={project.solution} />
              ) : (
                <p>{getFallbackSolution(project)}</p>
              )}
              <h2>Project scope</h2>
              <p>{getProjectScope(project)}</p>
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
