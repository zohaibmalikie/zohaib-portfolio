import type { Service } from "@/types/sanity";

// Editorial defaults are also available as editable fields on Sanity services.
// Existing CMS documents override these by slug, without requiring a CMS write.
export const serviceDetails: Record<string, Partial<Service>> = {
  "ai-automation-health-check": {
    headline: "Find out why your automation is unreliable—and what to fix first.",
    audience: "For teams with one live workflow that produces errors, duplicate records, missed alerts, or an unexpectedly high AI bill.",
    overview: [
      "A workflow can report a successful execution while a customer record never reaches the right destination. This health check follows one business process from its trigger to the final outcome, comparing the rules you expect with the behavior your tools actually produce.",
      "The review covers failure handling, duplicate prevention, missing notifications, credential ownership, unnecessary data exposure, and avoidable AI usage. Findings include evidence, business impact, a recommended next action, and a way to verify the repair. Where access is limited, the report distinguishes confirmed behavior from questions that still need investigation.",
      "The pilot is deliberately bounded to one existing workflow. It is a practical starting point before commissioning repairs or a wider redesign. Implementation, a full security assessment, and continuous monitoring are separate scopes rather than implied parts of the audit."
    ],
    deliverables: ["A map of the selected workflow, connected tools, and expected outcome", "A prioritized findings report with evidence and actionable repairs", "Checks for duplicate actions, failures, missing alerts, and recovery gaps", "A review of unnecessary AI calls and data copied between systems", "Acceptance checks for the most important recommended fixes"],
    process: [
      { title: "Choose one outcome", description: "Agree the workflow, connected accounts, sample records, and what a successful business result looks like." },
      { title: "Trace normal and failed records", description: "Inspect execution history and destination records using appropriate access and sanitized examples." },
      { title: "Prioritize the repairs", description: "Review the short audit together and separate immediate fixes from optional improvements." }
    ],
    faqs: [
      { question: "What access is needed for a remote automation audit?", answer: "Start with a workflow summary and sanitized execution examples. Agree the minimum account access needed for the review, use role-based invitations where possible, and remove temporary access after handoff. The audit scope records any checks that cannot be verified with the access provided." },
      { question: "What do I need to provide?", answer: "A description of the workflow, the tools it connects, the expected result, and suitable access to recent execution history. Do not send passwords, API keys, or customer records through the contact form." },
      { question: "Does the health check include implementation?", answer: "The deliverable is an actionable audit. Repairs can be scoped separately after the findings are understood, with explicit acceptance criteria." },
      { question: "Is the $150–$300 range a fixed quote?", answer: "It is an illustrative pilot range in USD. The selected workflow, access requirements, and deliverables are confirmed before work begins." }
    ],
    relatedPostSlugs: ["ai-automation-audit-checklist", "automation-monitoring-metrics", "reduce-ai-workflow-costs"],
    relatedProjectSlugs: [],
    seo: { keywords: ["AI automation audit", "workflow health check", "automation consultant"], metaTitle: "AI Automation Audit & Workflow Health Check | Zohaib Ramzan", metaDescription: "Review one workflow for failures, duplicate actions, missing alerts, privacy risks and unnecessary AI costs. Get a prioritized, actionable automation audit." }
  },
  "workflow-implementation-or-repair": {
    headline: "Build a focused automation—or repair the integration holding your team back.",
    audience: "For businesses that know the process they want to automate, or have a broken API connection that needs a clear diagnosis and repair.",
    overview: [
      "Reliable automation starts with a specific business outcome. That might be creating one correctly assigned CRM lead from each valid enquiry, keeping selected fields synchronized between tools, or recovering a workflow that fails after an API change. The scope identifies the trigger, destination, rules, and exceptions before implementation begins.",
      "The work can involve supported automation platforms, webhooks, or custom API code when the requirements justify it. The choice follows the process and the team's maintenance needs. Validation, bounded retries, stable identifiers, and recovery behavior are considered alongside the ordinary successful path.",
      "Delivery includes agreed checks and a usable handoff. We verify the destination outcome, not only whether the workflow runs without an error. Historical cleanup, unsupported APIs, additional workflows, vendor subscriptions, and ongoing support are discussed explicitly when they fall outside the initial scope."
    ],
    deliverables: ["An agreed workflow scope and field mapping", "A narrowly scoped integration or repair in the selected environment", "Tests for valid, invalid, duplicate, and failure inputs where relevant", "Clear acceptance criteria tied to actual destination outcomes", "Configuration handoff and practical recovery instructions"],
    process: [
      { title: "Define the contract", description: "Agree supported inputs, account permissions, expected outputs, volume assumptions, and exclusions." },
      { title: "Implement and exercise failure paths", description: "Build or repair the flow and verify how it handles incomplete data, repeated events, and unavailable dependencies." },
      { title: "Verify and hand over", description: "Review acceptance evidence, deploy the agreed workflow, and document safe operation and recovery." }
    ],
    faqs: [
      { question: "Who owns the workflow and pays ongoing API costs?", answer: "Account ownership, custom deliverables and any third-party licensing are recorded in the scope. Production should use accounts your business controls, with vendor subscriptions and API usage paid directly to those providers. The handoff identifies configuration, exports or source code, and recovery instructions." },
      { question: "Can you repair an existing workflow?", answer: "Yes. The first step is tracing the failure and checking what has already completed. A repair can be scoped around the existing tools when that is the most suitable approach." },
      { question: "Which integrations can you work with?", answer: "Work is scoped around accessible APIs, webhooks, and the connected tools' supported capabilities. Endpoint availability, permissions, rate limits, and account plans are checked before a delivery commitment." },
      { question: "What does the illustrative $400–$1,200+ include?", answer: "It describes a possible range for a focused project in USD, not every integration. The final deliverables, testing, deployment, and exclusions are agreed before work starts." }
    ],
    relatedPostSlugs: ["automation-project-acceptance-criteria", "idempotent-workflows-prevent-duplicates", "api-rate-limit-retry-strategy"],
    relatedProjectSlugs: ["partco-electronics-store"],
    seo: { keywords: ["workflow automation consultant", "API integration repair", "business process automation"], metaTitle: "Workflow Automation Consultant & API Repair | Zohaib Ramzan", metaDescription: "Build a focused business automation or repair a broken API integration, with duplicate prevention, failure checks, acceptance criteria and a clear handoff." }
  },
  "ongoing-automation-maintenance": {
    headline: "Keep your integrations understandable, monitored, and recoverable.",
    audience: "For teams with live integrations that need a named maintenance owner, useful health reporting, and agreed support expectations.",
    overview: [
      "Automations change after launch because applications, credentials, fields, traffic, and business rules change. A maintenance arrangement makes ownership explicit: which workflows are covered, what signals are reviewed, who investigates failures, and when support is available.",
      "Routine reviews can cover failed executions, delayed records, queue growth, recurring alert patterns, and unexpected usage. A small reconciliation sample helps check whether expected business outcomes are happening even when execution dashboards look healthy. Findings and incidents feed into a short system-health report.",
      "The plan is tailored to the supported workflows and their business importance. Support hours, timezone, response expectations, escalation contacts, and included maintenance work are agreed in advance. A response target is distinct from a resolution guarantee, particularly when an external provider is unavailable."
    ],
    deliverables: ["An inventory of supported workflows and responsible owners", "Review of agreed failure, alert, latency, and usage signals", "Investigation and recovery within the agreed maintenance scope", "A concise health report with recurring causes and proposed improvements", "Updated runbooks and escalation information when the workflow changes"],
    process: [
      { title: "Establish the baseline", description: "Review the existing flows, access, operational history, business priorities, and current recovery instructions." },
      { title: "Agree the support boundary", description: "Set covered workflows, hours, timezone, response expectations, reporting cadence, and change exclusions." },
      { title: "Maintain and report", description: "Review agreed signals, investigate issues, record recovery actions, and prioritize recurring causes." }
    ],
    faqs: [
      { question: "Can maintenance continue across US or European time zones?", answer: "Yes, remote support can be scoped for international teams. Before starting, agree the support timezone, operating hours, escalation route and response expectations. An asynchronous update is distinct from an emergency response; round-the-clock coverage is not implied." },
      { question: "Is this 24/7 support?", answer: "No round-the-clock coverage is implied. Support hours, timezone, escalation routes, and response expectations are agreed for the specific arrangement." },
      { question: "Are new workflows included?", answer: "New integrations and substantial redesigns are scoped separately unless explicitly included. The inventory makes it clear which existing workflows the plan covers." },
      { question: "How is the monthly retainer determined?", answer: "The $150–$400/month range is an illustrative starting range in USD. The number of workflows, business importance, review cadence, and support scope determine the final arrangement." }
    ],
    relatedPostSlugs: ["automation-maintenance-plan", "automation-incident-response-runbook", "automation-documentation-handoff-checklist"],
    relatedProjectSlugs: [],
    seo: { keywords: ["automation maintenance", "integration support", "workflow monitoring"], metaTitle: "Automation Maintenance & Integration Support | Zohaib Ramzan", metaDescription: "Maintain business integrations with agreed support hours, alert review, failure investigation, recovery instructions and clear system-health reporting." }
  },
  "react-nextjs-frontends": {
    headline: "A fast, editable website that makes your business easier to understand.",
    audience: "For businesses, SaaS teams, and ecommerce brands that need a responsive Next.js or React frontend, a CMS, or a focused improvement to an existing website.",
    overview: [
      "A business website needs more than polished screens. Visitors need a clear explanation of the offer, credible examples of work, usable navigation, and an enquiry path that behaves predictably. Development connects those needs to maintainable components, structured content, and a rendering approach suited to the site.",
      "Projects can cover a new marketing website, a CMS-powered content site, an ecommerce interface, or a defined section of an existing product. React, Next.js, TypeScript, and compatible CMS integrations are selected according to the requirements. The editorial team should be able to manage the content that belongs in their workflow without relying on a developer for every text change.",
      "The delivery scope includes the important states and devices, not just a desktop screenshot. We agree how content is published, how forms behave, what happens on missing or failed data, and which technical search foundations are needed. Features, integrations, migration, and support are estimated around the actual brief."
    ],
    deliverables: ["A responsive frontend built around the agreed user journeys", "Reusable components and structured CMS content where required", "Accessible navigation, forms, and important interaction states", "Metadata, canonical URLs, sitemap and rendering foundations", "Relevant build checks, documented setup, and a focused handoff"],
    process: [
      { title: "Clarify the website's job", description: "Define the audience, key pages, conversion actions, content ownership, and integration requirements." },
      { title: "Build the core journey", description: "Implement the visual system and representative pages, then complete content, CMS, and interaction states." },
      { title: "Verify and release", description: "Check mobile layouts, navigation, enquiries, public responses, metadata, and the deployment environment." }
    ],
    faqs: [
      { question: "How do we manage a Next.js project remotely from the US, UK or Europe?", answer: "Begin with the page or product brief, the current site and the outcome you need. Agree milestones, review checkpoints and a practical meeting window across time zones. Use a staging deployment for feedback and confirm the acceptance checks before the production release." },
      { question: "Can you improve an existing website?", answer: "Yes. A focused scope can address a slow template, unclear service page, CMS problem, frontend feature, or broken enquiry path without rebuilding the entire site." },
      { question: "Can my team edit the website?", answer: "The content that needs ongoing editorial changes can be modeled in a CMS such as Sanity. Editing requirements, preview, and publishing behavior are agreed during scoping." },
      { question: "Does a Next.js website guarantee better rankings?", answer: "No framework guarantees rankings. The implementation can support crawlable content, fast pages, clear metadata, and reliable publishing; search performance also depends on relevance, content, competition, and other signals." }
    ],
    relatedPostSlugs: ["nextjs-technical-seo-checklist", "cms-publishing-workflow-checklist", "accessible-contact-form-checklist"],
    relatedProjectSlugs: ["partco-electronics-store", "warehouse-equipment-b2b-ecommerce", "ledstore"],
    seo: { keywords: ["freelance Next.js developer", "remote React developer", "Sanity CMS development"], metaTitle: "Freelance Next.js & React Developer | Zohaib Ramzan", metaDescription: "Responsive Next.js and React websites with clear service journeys, editable CMS content, accessible interactions and practical technical SEO foundations." }
  },
  "technical-seo-performance": {
    headline: "Fix the website issues that get between your content and potential clients.",
    audience: "For businesses with a live website that needs clearer indexing signals, better page experience, stronger service content, or a more reliable enquiry journey.",
    overview: [
      "Technical SEO starts with evidence about the public website and the important pages it needs people to find. The review examines response behavior, crawl controls, canonical URLs, sitemap coverage, metadata, internal links, structured data, and the relationship between published content and the CMS.",
      "Performance work follows the affected user journey. A slow main image, delayed interaction, unstable layout, or unnecessary third-party script needs a different repair. Where real-user or Search Console evidence is available, it is used alongside repeatable page checks to prioritize work rather than treating every automated warning as equally important.",
      "On-page improvements connect the visitor's question to a useful answer and a relevant next step. That can include clearer service scope, better page titles, more descriptive internal links, and stronger case-study presentation. Off-page opportunities focus on useful resources and legitimate professional references; purchased links, fabricated reviews, and ranking guarantees are not part of the service."
    ],
    deliverables: ["A prioritized review of important pages and generated discovery routes", "Repairs to agreed metadata, canonical, indexing, and internal-link issues", "Targeted performance improvements supported by measurements", "Clearer on-page service content and enquiry pathways", "Verification evidence and a plan for observing search performance after release"],
    process: [
      { title: "Establish what matters", description: "Identify business-critical pages and inspect available search, publishing, performance, and enquiry evidence." },
      { title: "Repair the priority issues", description: "Implement the agreed fixes, keeping visible pages and generated routes consistent." },
      { title: "Verify and observe", description: "Check the deployed result and compare subsequent search evidence over suitable reporting windows." }
    ],
    faqs: [
      { question: "Can an English website target US, UK and European clients?", answer: "Yes. Useful English service pages can serve international buyers when the offer, examples and remote enquiry process are relevant to them. Use real business details and consistent canonical URLs. Translated or region-specific pages should be added only when there is substantive content for that audience; geography keywords alone do not establish relevance." },
      { question: "Can you guarantee a number-one ranking?", answer: "No. Search rankings and lead volume cannot be guaranteed. The work improves specific technical, content, and user-experience foundations and measures the result honestly." },
      { question: "Will you fix every page marked not indexed?", answer: "Not every exclusion is an error. Duplicates, redirects, filters, and intentionally unavailable pages can be correctly excluded. Important canonical pages are reviewed against the actual reported reason." },
      { question: "What access is useful for an SEO review?", answer: "Search Console access, the public site, relevant CMS or repository access, and available analytics can help. Sensitive credentials should be shared through approved account access methods, not the enquiry form." }
    ],
    relatedPostSlugs: ["technical-seo-audit-small-business", "core-web-vitals-prioritization", "search-console-pages-not-indexed"],
    relatedProjectSlugs: ["ledstore", "partco-electronics-store"],
    seo: { keywords: ["technical SEO consultant", "Next.js SEO services", "Core Web Vitals optimization"], metaTitle: "Technical SEO & Website Performance Services | Zohaib Ramzan", metaDescription: "Improve technical SEO, page performance, metadata, internal links and enquiry journeys with evidence-led fixes for your business website." }
  }
};

export const additionalServices: Service[] = [{
  _id: "service-technical-seo-performance",
  slug: "technical-seo-performance",
  title: "Technical SEO & Website Performance",
  description: "Evidence-led improvements to crawlability, indexing signals, metadata, internal links, page performance, and the journey from content to enquiry.",
  icon: "seo",
  benefits: ["Clearer search foundations", "Better page experience", "Focused enquiry paths"],
  relatedTechnologies: ["Search Console", "Core Web Vitals", "Next.js", "Structured data"]
}];
