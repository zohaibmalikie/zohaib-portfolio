import { AutomationCalculator } from "@/components/automation-calculator";
import { ServiceFinder } from "@/components/service-finder";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/fetchers";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSiteSettings({ stega: false });
  return buildMetadata({ title: "Automation Savings Calculator & Service Finder | Zohaib Ramzan", description: "Estimate the time capacity and potential value of workflow automation with transparent assumptions. Find a practical starting point for your website or automation project.", path: "/tools", settings });
}

export default function ToolsPage() {
  return <main id="main-content" className="main"><JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Planning tools", item: absoluteUrl("/tools") }] }} /><section className="page-hero"><div className="container"><p className="eyebrow">Free planning tools</p><div className="page-heading"><h1>Make your next investment a thoughtful one.</h1></div><p className="lead">Find a starting point for your project, then put the potential value of automation into perspective. No signup, no external API calls; calculations happen in your browser.</p></div></section><section className="section tools-page" style={{ paddingTop: 24 }} aria-label="Project planning tools"><div className="container"><ServiceFinder /><AutomationCalculator /><section className="planning-downloads" aria-labelledby="downloads-heading"><p className="eyebrow">Take the next step</p><h2 id="downloads-heading">Bring a clearer brief to your project.</h2><p>Use these practical starting points to review an existing workflow or agree what a successful implementation should do.</p><div className="planning-download-links"><a href="/resources/automation-audit-checklist.md" download><strong>Automation audit checklist</strong><span>Review failure handling, duplicate actions, alerts, access, and running costs. Download Markdown →</span></a><a href="/resources/workflow-acceptance-template.json" download><strong>Workflow acceptance template</strong><span>Define inputs, expected outputs, failure cases, and acceptance criteria. Download JSON →</span></a></div></section></div></section></main>;
}
