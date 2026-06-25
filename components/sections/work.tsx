import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SanityImage } from "@/components/sanity-image";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatProjectDate } from "@/lib/content-utils";
import type { Project } from "@/types/sanity";

const fallbackLabels = ["Marketplace Platform", "Operations Software", "Federation Platform"];

export function Work({ projects }: { projects: Project[] }) {
  const visualProjects = projects.filter(
    (project) => !/upwork|profile/i.test(`${project.slug} ${project.title}`)
  );
  const featuredProjects = visualProjects.length >= 3 ? visualProjects : projects;

  return (
    <section id="work" className="section section-muted">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Selected Work" 
            title={
              <>
                Featured
                <span className="text-accent"> Projects</span>
              </>
            }
          >
            <ActionLink href="/work" variant="ghost">
              All Work <ArrowUpRight size={15} aria-hidden="true" />
            </ActionLink>
          </SectionHeading>
        </Reveal>
        <Stagger className="project-grid">
          {featuredProjects.slice(0, 3).map((project, index) => (
            <StaggerItem key={project._id}>
              <Link href={`/work/${project.slug}`} className="project-card">
                <SanityImage
                  image={project.mainImage}
                  width={760}
                  height={510}
                  className="card-image"
                  sizes="(max-width: 900px) 100vw, 31vw"
                />
                <div className="project-card-body">
                  <div className="project-meta">
                    <span>{fallbackLabels[index] || "Case Study"}</span>
                    {project.projectDate ? <span>{formatProjectDate(project.projectDate)}</span> : null}
                  </div>
                  <h3>{project.title}</h3>
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
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
