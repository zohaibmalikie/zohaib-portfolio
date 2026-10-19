"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import "@/components/growth-tools.css";

const recommendations = {
  audit: { slug: "ai-automation-health-check", title: "AI / Automation Health Check", reason: "Start with a review of one workflow to identify failures, duplicate actions, missing alerts, and avoidable costs before deciding what to change." },
  build: { slug: "workflow-implementation-or-repair", title: "Workflow Implementation or Repair", reason: "A focused build or repair gives you a defined workflow, acceptance criteria, and a clear handover." },
  maintain: { slug: "ongoing-automation-maintenance", title: "Ongoing Automation Maintenance", reason: "An agreed maintenance scope helps keep existing integrations reliable, with clear support hours and response expectations." },
  website: { slug: "react-nextjs-frontends", title: "React & Next.js Development", reason: "Start with your customer journey, content, and required features, then build a responsive website or application around them." },
  seo: { slug: "technical-seo-performance", title: "Technical SEO & Performance", reason: "Review crawlability, page performance, metadata, and internal links to find technical barriers to discovery and use." }
};

export function ServiceFinder() {
  const id = useId();
  const [goal, setGoal] = useState("workflow");
  const [state, setState] = useState("unsure");
  const [support, setSupport] = useState("project");
  const key = goal === "website" ? "website" : goal === "search" ? "seo" : state === "unsure" ? "audit" : state === "existing" && support === "ongoing" ? "maintain" : "build";
  const recommendation = recommendations[key];

  return (
    <div className="service-finder">
      <div className="tool-heading"><span className="tool-index">01 / FIND YOUR STARTING POINT</span><h2>A better brief in three questions.</h2><p>Select what best describes your situation. This is a simple guide; we’ll confirm the right scope together.</p></div>
      <div className="finder-fields">
        <label htmlFor={`${id}-goal`}>What would you like to improve?<select id={`${id}-goal`} value={goal} onChange={(event) => setGoal(event.target.value)}><option value="workflow">Manual work or disconnected tools</option><option value="website">My website or web application</option><option value="search">Search visibility or page speed</option></select></label>
        <label htmlFor={`${id}-state`}>Where are you starting?<select id={`${id}-state`} value={state} onChange={(event) => setState(event.target.value)}><option value="unsure">I need help identifying the problem</option><option value="existing">I have something that needs attention</option><option value="new">I have a defined new project</option></select></label>
        <label htmlFor={`${id}-support`}>What kind of help do you need?<select id={`${id}-support`} value={support} onChange={(event) => setSupport(event.target.value)}><option value="project">A focused project or review</option><option value="ongoing">Ongoing maintenance and support</option></select></label>
      </div>
      <div className="finder-result" aria-live="polite" aria-atomic="true"><span className="eyebrow">Suggested starting point</span><h3>{recommendation.title}</h3><p>{recommendation.reason}</p></div>
      <div className="tool-actions"><ActionLink href={`/services/${recommendation.slug}`} variant="secondary">See the scope <ArrowUpRight size={16} aria-hidden="true" /></ActionLink><ActionLink href={`/contact?service=${recommendation.slug}`} variant="ghost">Discuss your project</ActionLink></div>
      <noscript><p>Choose a service on the <Link href="/services">services page</Link>, or <Link href="/contact">tell me about your project</Link>. Interactive recommendations need JavaScript.</p></noscript>
    </div>
  );
}
