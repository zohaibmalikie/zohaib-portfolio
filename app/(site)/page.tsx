import type { LucideIcon } from "lucide-react";
import { Bot, Code2, Layers3, Smartphone } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { About } from "@/components/sections/about";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Contact } from "@/components/sections/contact";
import { FAQ } from "@/components/sections/faq";
import { Hero, type HeroStat } from "@/components/sections/hero";
import { Services, type ServiceRow } from "@/components/sections/services";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Testimonials } from "@/components/sections/testimonials";
import { Work } from "@/components/sections/work";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getHomePageData, getSiteSettings } from "@/sanity/lib/fetchers";
import type { Service } from "@/types/sanity";

export const revalidate = 3600;

const heroStats: HeroStat[] = [
  { value: "5+", label: "Years Experience" },
  { value: "80+", label: "Projects Shipped" },
  { value: "40+", label: "Happy Clients" },
  { value: "15+", label: "Tech Stack" }
];

const technologyStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "WordPress",
  "Webflow",
  "React Native",
  "GraphQL",
  "Svelte",
  "Elementor",
  "Divi",
  "Material UI",
  "Builder.io",
  "Ionic React",
  "Bootstrap",
  "Redwood",
  "Figma",
  "Node.js",
  "Framer Motion",
  "Vercel",
  "Supabase",
  "REST APIs"
];

const servicePriorities: { pattern: RegExp; icon: LucideIcon }[] = [
  { pattern: /react|next|frontend|svelte/i, icon: Code2 },
  { pattern: /cms|wordpress|webflow|sanity|builder|content|headless/i, icon: Layers3 },
  { pattern: /mobile|native|ionic|cross/i, icon: Smartphone },
  { pattern: /ai|automation|integration|workflow|llm/i, icon: Bot }
];

const fallbackServiceRows: ServiceRow[] = [
  {
    title: "React & Next.js Development",
    description:
      "Production-grade web apps with SSR, SSG, App Router, clean TypeScript, and interfaces built to scale.",
    icon: Code2
  },
  {
    title: "CMS & No-Code Builds",
    description:
      "Sanity, WordPress, Builder.io, Webflow, Elementor, and Divi websites your team can update without touching code.",
    icon: Layers3
  },
  {
    title: "AI Automation & Integrations",
    description:
      "ChatGPT-powered product features, workflow automation, API integrations, webhooks, and reliable internal tools.",
    icon: Bot
  }
];

const upworkTestimonials = [];

function getServiceIcon(service: Service) {
  const haystack = `${service.title} ${service.description || ""} ${
    service.relatedTechnologies?.join(" ") || ""
  }`;

  return servicePriorities.find((priority) => priority.pattern.test(haystack))?.icon || Code2;
}

function getHomeServices(services: Service[]) {
  const picked = servicePriorities
    .map((priority) =>
      services.find((service) =>
        priority.pattern.test(`${service.title} ${service.description || ""}`)
      )
    )
    .filter((service): service is Service => Boolean(service))
    .filter((service, index, list) => {
      return list.findIndex((item) => item._id === service._id) === index;
    });

  const source = picked.length ? picked : [];
  const remaining = services.filter(
    (service) => !source.some((selected) => selected._id === service._id)
  );
  const rows = [...source, ...remaining].slice(0, 3);

  if (!rows.length) return fallbackServiceRows;

  return rows.map((service) => ({
    title: service.title,
    description: service.description,
    icon: getServiceIcon(service)
  }));
}

export async function generateMetadata() {
  const settings = await getSiteSettings({ stega: false });
  return buildMetadata({
    title: settings.defaultSeoTitle,
    description: settings.defaultSeoDescription,
    path: "/",
    image: settings.defaultOpenGraphImage || settings.profileImage,
    settings
  });
}

export default async function HomePage() {
  const { settings, services, projects, posts, faqs, testimonials } =
    await getHomePageData();

  const sameAs = Array.from(
    new Set(
      [
        settings.linkedinLink,
        settings.githubLink,
        settings.upworkLink,
        ...(settings.socialLinks?.map((link) => link.url) || [])
      ].filter(Boolean)
    )
  ) as string[];

  const testimonialCards = testimonials || []

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer
            }
          }))
        }
      : null;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.name,
    url: absoluteUrl("/"),
    jobTitle:
      "Senior Frontend Developer, AI Automation and Integration Expert, AI Native Developer",
    email: settings.email,
    sameAs
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.name,
    url: absoluteUrl("/"),
    description: settings.defaultSeoDescription || settings.heroDescription,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: settings.name
    }
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${settings.name} Frontend and AI Automation Development`,
    url: absoluteUrl("/"),
    image: settings.profileImage?.asset?.url
      ? absoluteUrl(settings.profileImage.asset.url)
      : undefined,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK"
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Senior frontend development",
      "AI automation",
      "AI integrations",
      "AI-native product development",
      ...services.map((service) => service.title)
    ],
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description
      }
    })),
    sameAs
  };

  const projectItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured frontend and AI case studies",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/work/${project.slug}`),
      name: project.title,
      description: project.shortDescription
    }))
  };

  const articleItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Frontend development articles",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
      description: post.excerpt
    }))
  };

  return (
    <main id="main-content" className="main">
      <JsonLd data={websiteSchema} />
      <JsonLd data={personSchema} />
      <JsonLd data={professionalServiceSchema} />
      {projects.length ? <JsonLd data={projectItemListSchema} /> : null}
      {posts.length ? <JsonLd data={articleItemListSchema} /> : null}
      {faqSchema ? <JsonLd data={faqSchema} /> : null}

      <Hero stats={heroStats} />
      <TechMarquee technologies={technologyStack} />
      <Services services={getHomeServices(services)} />
      <Work projects={projects} />
      <BlogPreview posts={posts} />
      <About settings={settings} />
      <Testimonials testimonials={testimonialCards} />
      <FAQ faqs={faqs} />
      <Contact settings={settings} />
    </main>
  );
}
