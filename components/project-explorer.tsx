"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SanityImage } from "@/components/sanity-image";
import { formatProjectDate } from "@/lib/content-utils";
import type { Project } from "@/types/sanity";
import "@/components/growth-tools.css";

const categories = [
  { label: "Ecommerce", pattern: /ecommerce|e-commerce|commerce|catalog|storefront/i },
  { label: "CMS", pattern: /\bcms\b|sanity|wordpress|webflow|content management/i },
  { label: "Web apps", pattern: /application|web app|dashboard|saas|software/i }
];
const matches = (project: Project, pattern: RegExp) => pattern.test([project.title, project.shortDescription, ...(project.servicesProvided || []), ...(project.techStack || [])].join(" "));

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");
  const available = categories.filter((category) => projects.some((project) => matches(project, category.pattern)));
  const category = available.find((item) => item.label === active);
  const visible = category ? projects.filter((project) => matches(project, category.pattern)) : projects;
  return (
    <div className="project-explorer">
      {available.length ? <div className="project-filter" aria-label="Filter projects"><button type="button" aria-pressed={active === "All"} onClick={() => setActive("All")}>All projects <span>{projects.length}</span></button>{available.map((item) => <button key={item.label} type="button" aria-pressed={active === item.label} onClick={() => setActive(item.label)}>{item.label} <span>{projects.filter((project) => matches(project, item.pattern)).length}</span></button>)}</div> : null}
      <p className="project-count" role="status">{visible.length} {visible.length === 1 ? "project" : "projects"}{category ? ` in ${category.label}` : " to explore"}</p>
      <div className="grid grid-3">{visible.map((project) => <Link href={`/work/${project.slug}`} className="card project-card explorer-card" key={project._id}><SanityImage image={project.mainImage} width={760} height={475} className="card-image" sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /><div className="card-body"><div className="project-meta"><span>{project.servicesProvided?.[0] || "Website development"}</span>{project.projectDate ? <span>{formatProjectDate(project.projectDate)}</span> : null}</div><h2>{project.title}</h2><p>{project.shortDescription}</p>{project.results?.[0] ? <p className="project-result">{project.results[0]}</p> : null}<div className="chip-list">{project.techStack?.slice(0, 3).map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div><span className="project-read">Explore the project <ArrowUpRight size={16} aria-hidden="true" /></span></div></Link>)}</div>
      {!visible.length ? <p>Project details are being updated. <Link href="/contact">Tell me what you’re building</Link> to discuss relevant experience.</p> : null}
    </div>
  );
}
