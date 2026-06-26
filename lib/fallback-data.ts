import type {
  Faq,
  HomePageData,
  Post,
  Project,
  Service,
  SiteSettings,
  Testimonial
} from "@/types/sanity";

const localImage = (url: string, alt: string) => ({
  asset: { url },
  alt
});

const localImages = (basePath: string, count: number, alt: string) =>
  Array.from({ length: count }, (_, index) =>
    localImage(`${basePath}/${index + 1}.png`, `${alt} ${index + 1}`)
  );

const paragraphBlock = (key: string, text: string) => [
  {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `${key}-span`,
        _type: "span",
        text
      }
    ]
  }
];

export const fallbackSettings: SiteSettings = {
  name: "Muhammad Zohaib Ramzan",
  profileImage: localImage(
    "/assets/img/zohaib-profile-portrait.png",
    "Muhammad Zohaib Ramzan portrait"
  ),
  defaultOpenGraphImage: localImage(
    "/assets/img/zohaib-profile-portrait.png",
    "Muhammad Zohaib Ramzan portrait"
  ),
  heroHeadline:
    "Senior frontend developer building AI-native web products and automated systems.",
  heroDescription:
    "I help businesses turn ideas into responsive, SEO-friendly websites, SaaS frontends, AI integrations, and automated workflows using React, Next.js, SvelteKit, Sanity, Builder.io, WordPress, and modern AI tools.",
  email: "hello@zohaibramzan.com",
  linkedinLink: "https://www.linkedin.com/in/zohaib-dev/",
  githubLink: "https://github.com/",
  upworkLink: "https://www.upwork.com/freelancers/zohaibramzan",
  socialLinks: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/zohaib-dev/"
    },
    {
      label: "X",
      url: "https://twitter.com/ZohaibM87432701"
    },
    {
      label: "Fiverr",
      url: "https://www.fiverr.com/zohaibmalik82"
    }
  ],
  defaultSeoTitle:
    "Muhammad Zohaib Ramzan | Senior Frontend Developer and AI Automation Expert",
  defaultSeoDescription:
    "Portfolio of Muhammad Zohaib Ramzan, a senior frontend developer and AI automation expert specializing in Next.js, React, SvelteKit, Sanity CMS, integrations, and AI-native web products."
};

export const fallbackServices: Service[] = [
  {
    _id: "service-ai-automation",
    title: "AI Automation and Integrations",
    slug: "ai-automation-integrations",
    icon: "ai",
    description:
      "AI workflows, API bridges, webhooks, assistants, n8n-style automations, and ChatGPT-powered product features.",
    benefits: ["Less manual work", "Connected tools", "Smarter workflows"],
    relatedTechnologies: ["ChatGPT", "n8n", "APIs", "Webhooks", "Automation"]
  },
  {
    _id: "service-ai-native",
    title: "AI-Native Product Development",
    slug: "ai-native-product-development",
    icon: "llm",
    description:
      "Rapid AI-first product features, prompt workflows, prototype-to-product builds, and LLM-assisted user experiences.",
    benefits: ["Faster prototypes", "AI-first UX", "Production focus"],
    relatedTechnologies: ["OpenAI", "LLMs", "Prompting", "Next.js", "React"]
  },
  {
    _id: "service-wordpress",
    title: "WordPress Development",
    slug: "wordpress-development",
    icon: "cms",
    description:
      "Custom WordPress builds, theme work, Elementor, Divi, performance improvements, and responsive polish.",
    benefits: ["Easy editing", "Responsive UI", "Performance-focused"],
    relatedTechnologies: ["WordPress", "Elementor", "Divi", "PHP", "CSS"]
  },
  {
    _id: "service-react",
    title: "Senior React and Next.js Frontends",
    slug: "react-nextjs-frontends",
    icon: "code",
    description:
      "Modern React interfaces with App Router, reusable components, TypeScript, clean state patterns, and SEO-safe rendering.",
    benefits: ["Scalable UI", "Server rendering", "CMS-ready pages"],
    relatedTechnologies: ["React", "Next.js", "TypeScript", "Sanity"]
  },
  {
    _id: "service-responsive",
    title: "Responsive UI and Web Performance",
    slug: "responsive-ui-web-performance",
    icon: "speed",
    description:
      "Careful layout, mobile-first implementation, accessibility, Core Web Vitals, and browser compatibility.",
    benefits: ["Mobile-friendly", "Accessible", "Fast page loads"],
    relatedTechnologies: ["HTML", "CSS", "Tailwind", "Lighthouse"]
  },
  {
    _id: "service-headless",
    title: "Headless CMS Implementation",
    slug: "headless-cms-implementation",
    icon: "content",
    description:
      "Structured content models and CMS workflows for blogs, case studies, services, FAQs, and SEO metadata.",
    benefits: ["Editable content", "Preview support", "Revalidation"],
    relatedTechnologies: ["Sanity", "Builder.io", "GROQ", "Next.js"]
  }
];

export const fallbackProjects: Project[] = [
  {
    _id: "project-partco-electronics-store",
    title: "Partco Electronics Store",
    slug: "partco-electronics-store",
    shortDescription:
      "Premium electronics ecommerce UI/UX focused on fast product discovery, B2B buying flows, campaigns, outlet deals, and conversion-focused catalog navigation.",
    projectDate: "2026-03-01",
    mainImage: localImage(
      "/assets/img/portfolio/partco/1.png",
      "Partco Electronics Store ecommerce UI screen"
    ),
    screenshots: localImages(
      "/assets/img/portfolio/partco",
      5,
      "Partco Electronics Store ecommerce UI screenshot"
    ),
    problem: paragraphBlock(
      "partco-problem",
      "Partco needed an electronics shopping experience that made product discovery fast for professionals, hobbyists, and business customers while also surfacing campaigns, outlet deals, support content, delivery information, and B2B buying paths."
    ),
    solution: paragraphBlock(
      "partco-solution",
      "I supported AI Cloud Commerce maintenance and management work for the store experience, with attention to search-first navigation, clear category browsing, filterable catalogs, trust sections, and conversion-focused UI patterns."
    ),
    techStack: [
      "Svelte",
      "Next.js",
      "Responsive Design",
      "Software Integration",
      "Full-Stack Development"
    ],
    servicesProvided: [
      "AI Cloud Commerce maintenance and management",
      "Ecommerce UI/UX refinement",
      "Product discovery improvements",
      "Responsive catalog interface",
      "B2B buying flow support"
    ],
    results: [
      "Improved search-first product navigation",
      "Strengthened category and catalog browsing",
      "Supported clearer campaign, outlet, blog, and support journeys",
      "Improved trust and conversion-focused ecommerce sections"
    ],
    featured: true,
    seo: {
      title: "Partco Electronics Store Ecommerce UI/UX Case Study",
      description:
        "Ecommerce UI/UX case study for Partco Electronics Store covering product discovery, B2B buying flows, Svelte, Next.js, responsive design, and integrations."
    }
  },
  {
    _id: "project-warehouse-equipment-b2b",
    title: "B2B Industrial Ecommerce Website for Warehouse Equipment",
    slug: "warehouse-equipment-b2b-ecommerce",
    shortDescription:
      "A professional B2B ecommerce website for industrial warehouse and logistics equipment with structured catalogs, responsive product categories, and quote/cart flows.",
    projectDate: "2025-11-01",
    mainImage: localImage(
      "/assets/img/portfolio/rastec/1.png",
      "B2B industrial warehouse equipment ecommerce screen"
    ),
    screenshots: localImages(
      "/assets/img/portfolio/rastec",
      5,
      "B2B industrial warehouse equipment ecommerce screenshot"
    ),
    problem: paragraphBlock(
      "warehouse-problem",
      "Industrial B2B buyers need a clear way to browse warehouse and logistics equipment, compare categories, and move into quote or cart flows without consumer-style clutter."
    ),
    solution: paragraphBlock(
      "warehouse-solution",
      "As frontend developer, I improved the ecommerce UI, product catalog structure, responsive category pages, and buying flow patterns for a cleaner business purchasing experience."
    ),
    techStack: [
      "React",
      "Svelte",
      "AI App Development",
      "Ecommerce Website Development"
    ],
    servicesProvided: [
      "Frontend development",
      "Responsive ecommerce UI",
      "Product category structure",
      "Quote and cart flow support",
      "B2B buyer experience improvements"
    ],
    results: [
      "Improved product catalog clarity",
      "Created cleaner category and product discovery flows",
      "Supported business-friendly quote/cart interactions",
      "Strengthened responsive UI for B2B buyers"
    ],
    featured: true,
    seo: {
      title: "B2B Industrial Ecommerce Website Case Study",
      description:
        "Frontend case study for an industrial warehouse equipment ecommerce website using React, Svelte, responsive UI, quote flows, and product catalog improvements."
    }
  },
  {
    _id: "project-ledstore-fi",
    title: "LedStore.fi — Ecommerce UI/UX, Product Catalog and Service Experience",
    slug: "ledstore-fi-ecommerce-ui-ux",
    shortDescription:
      "A Finnish LED lighting ecommerce experience combining online shopping, lighting design services, custom LED solution content, blogs, FAQs, and conversion-focused layouts.",
    projectDate: "2025-08-01",
    mainImage: localImage(
      "/assets/img/portfolio/ledstore/1.png",
      "LedStore.fi lighting ecommerce UI screen"
    ),
    screenshots: localImages(
      "/assets/img/portfolio/ledstore",
      4,
      "LedStore.fi lighting ecommerce UI screenshot"
    ),
    problem: paragraphBlock(
      "ledstore-problem",
      "LedStore.fi needed a professional ecommerce experience that could support product shopping, service discovery, custom LED solutions, educational content, and customer trust across a large lighting catalog."
    ),
    solution: paragraphBlock(
      "ledstore-solution",
      "I worked on frontend experience improvements including product catalog structure, lighting design service presentation, custom solution sections, blog and FAQ surfaces, API/CMS-connected content, ecommerce SEO, and conversion-focused layout polish."
    ),
    techStack: [
      "Front-End Development",
      "CMS Development",
      "Ecommerce SEO",
      "API Integration"
    ],
    servicesProvided: [
      "Frontend development",
      "CMS development",
      "Ecommerce SEO support",
      "API integration",
      "Product catalog and service UX"
    ],
    results: [
      "Improved product catalog structure",
      "Highlighted the lighting design service flow",
      "Supported custom LED solution presentation",
      "Showcased blog, FAQ, and educational content sections",
      "Strengthened conversion-focused ecommerce UI/UX"
    ],
    featured: true,
    seo: {
      title: "LedStore.fi Ecommerce UI/UX and Product Catalog Case Study",
      description:
        "Frontend ecommerce case study for LedStore.fi covering product catalog UX, service presentation, CMS development, ecommerce SEO, and API integration."
    }
  },
  {
    _id: "project-grobal",
    title: "Grobal",
    slug: "grobal",
    shortDescription:
      "A service marketplace where buyers can discover providers and providers can publish their services.",
    projectDate: "2024-06-01",
    mainImage: localImage("/assets/img/grobal.webp", "Grobal project screen"),
    techStack: ["React", "Netlify", "Responsive UI"],
    servicesProvided: ["Frontend development", "Responsive design"],
    results: [
      "Built a clean marketplace flow",
      "Improved service discovery",
      "Delivered a responsive public experience"
    ],
    projectUrl: "https://grobal.netlify.app/",
    featured: true
  },
  {
    _id: "project-drift-golf",
    title: "Drift Golf",
    slug: "drift-golf",
    shortDescription:
      "An operations management system for golf course managers who need customer insight and better decisions.",
    projectDate: "2024-04-01",
    mainImage: localImage("/assets/img/drift.webp", "Drift Golf project screen"),
    techStack: ["React", "Dashboard UI", "Netlify"],
    servicesProvided: ["Frontend development", "Application UI"],
    results: [
      "Created operational screens for managers",
      "Structured dashboard workflows",
      "Supported a QA deployment flow"
    ],
    projectUrl: "https://driftgolf-qa.netlify.app/login",
    featured: true
  },
  {
    _id: "project-asian-handball",
    title: "Asian Handball",
    slug: "asian-handball",
    shortDescription:
      "An official federation website for handball news, content, and regional sport information.",
    projectDate: "2023-10-01",
    mainImage: localImage(
      "/assets/img/asian-handball.webp",
      "Asian Handball project screen"
    ),
    techStack: ["WordPress", "Responsive UI", "Content publishing"],
    servicesProvided: ["Website development", "CMS implementation"],
    results: [
      "Supported a content-heavy sports website",
      "Improved mobile presentation",
      "Created a scalable publishing surface"
    ],
    projectUrl: "https://asianhandball.org/",
    featured: true
  }
];

export const fallbackPosts: Post[] = [
  {
    _id: "post-web-developer",
    title: "What does a web developer do? How do I become one?",
    slug: "what-does-a-web-developer-do-how-do-i-become-one",
    excerpt:
      "Web developers create reliable, efficient websites. Learn about the role, skills, and path into web development.",
    mainImage: localImage(
      "/assets/img/blogs/main/what-does-a-web-developer-do-how-do-i-become-one.webp",
      "Laptop workspace for web development article"
    ),
    author: {
      name: "Muhammad Zohaib Ramzan",
      slug: "zohaib-ramzan",
      image: localImage(
        "/assets/img/zohaib-profile-portrait.png",
        "Muhammad Zohaib Ramzan portrait"
      )
    },
    category: {
      title: "Web Development",
      slug: "web-development"
    },
    tags: ["Frontend", "Career", "Web Development"],
    publishedAt: "2024-02-19T00:00:00.000Z",
    readingTime: 6,
    featured: true,
    body: [
      {
        _key: "intro",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "intro-span",
            _type: "span",
            text: "Web developers build and maintain websites. They shape the user interface, improve performance, and make sure content works across browsers and devices."
          }
        ]
      },
      {
        _key: "types",
        _type: "block",
        style: "h2",
        markDefs: [],
        children: [
          {
            _key: "types-span",
            _type: "span",
            text: "Types of web developers"
          }
        ]
      },
      {
        _key: "types-body",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "types-body-span",
            _type: "span",
            text: "Most developers focus on frontend, backend, or full-stack work. Frontend developers work closest to the visual interface, accessibility, responsiveness, and interaction quality."
          }
        ]
      },
      {
        _key: "skills",
        _type: "block",
        style: "h2",
        markDefs: [],
        children: [
          {
            _key: "skills-span",
            _type: "span",
            text: "Skills worth building"
          }
        ]
      },
      {
        _key: "skills-body",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "skills-body-span",
            _type: "span",
            text: "Start with HTML, CSS, JavaScript, responsive layouts, version control, debugging, and the fundamentals of how browsers render pages."
          }
        ]
      }
    ]
  }
];

export const fallbackFaqs: Faq[] = [
  {
    _id: "faq-cms",
    question: "Can I publish blog posts from Sanity?",
    answer:
      "Yes. Blog articles, SEO metadata, categories, tags, images, and Portable Text content are all modeled in Sanity Studio.",
    category: "CMS",
    sortOrder: 1
  },
  {
    _id: "faq-case-studies",
    question: "Can portfolio projects be managed from the CMS?",
    answer:
      "Yes. Case studies include problem, solution, technology stack, services, outcomes, screenshots, featured state, and SEO fields.",
    category: "CMS",
    sortOrder: 2
  },
  {
    _id: "faq-revalidation",
    question: "Will pages update after publishing?",
    answer:
      "Yes. The `/api/revalidate` route accepts Sanity webhooks and revalidates the affected pages and cache tags.",
    category: "Publishing",
    sortOrder: 3
  },
  {
    _id: "faq-react-nextjs-timeline",
    question: "How long does a typical React or Next.js project take?",
    answer:
      "Timeline depends on scope. Simple frontends take 2–4 weeks, full-stack SaaS builds take 6–12 weeks. I provide clear estimates and milestone breakdowns upfront.",
    category: "Development",
    sortOrder: 4
  },
  {
    _id: "faq-ai-integration",
    question: "Can you integrate ChatGPT or other AI models into my product?",
    answer:
      "Yes. I specialize in AI automation, chatbot integrations, LLM APIs, prompt workflows, and AI-native UX patterns using OpenAI, Anthropic, and other providers.",
    category: "Services",
    sortOrder: 5
  },
  {
    _id: "faq-wordpress-custom",
    question: "Can you build custom WordPress themes and functionality?",
    answer:
      "Absolutely. I build custom WordPress themes, plugin development, page builders (Elementor, Divi), performance optimization, and responsive design implementations.",
    category: "Services",
    sortOrder: 6
  },
  {
    _id: "faq-seo-performance",
    question: "Do you handle SEO and performance optimization?",
    answer:
      "Yes. I implement Core Web Vitals optimization, Server-Side Rendering (SSR), image optimization, structured data (JSON-LD), and technical SEO best practices.",
    category: "Development",
    sortOrder: 7
  },
  {
    _id: "faq-design-implementation",
    question: "Can you take a Figma design and build a responsive website?",
    answer:
      "Yes. I convert Figma, Adobe XD, and other design tools into production-ready React, Next.js, or Svelte components with pixel-perfect accuracy and responsive behavior.",
    category: "Development",
    sortOrder: 8
  },
  {
    _id: "faq-typescript",
    question: "Do you use TypeScript in your projects?",
    answer:
      "Yes. I build with strict TypeScript by default for better type safety, IDE support, and fewer runtime errors. Type-safe architecture is a core practice.",
    category: "Development",
    sortOrder: 9
  },
  {
    _id: "faq-mobile-responsive",
    question: "Will my site work on mobile and tablets?",
    answer:
      "Yes. I use mobile-first design, responsive breakpoints, and touch-friendly interactions. All projects are tested across devices and browsers.",
    category: "Development",
    sortOrder: 10
  },
  {
    _id: "faq-maintenance-support",
    question: "Do you offer post-launch support and maintenance?",
    answer:
      "Yes. I provide bug fixes, feature updates, dependency updates, performance audits, and ongoing support packages tailored to your needs.",
    category: "Services",
    sortOrder: 11
  },
  {
    _id: "faq-revision-rounds",
    question: "How many revision rounds are included?",
    answer:
      "Revision rounds depend on the project scope and contract. I typically include 2–3 rounds. Additional revisions are billed hourly or included in retainer agreements.",
    category: "Services",
    sortOrder: 12
  },
  {
    _id: "faq-payment-terms",
    question: "What are your payment terms and pricing?",
    answer:
      "I work with fixed-price projects, hourly rates, and retainers. Projects typically require a 50% deposit upfront, with the remainder due on delivery. Retainers are billed monthly.",
    category: "Services",
    sortOrder: 13
  },
  {
    _id: "faq-communication",
    question: "How do you keep clients updated on project progress?",
    answer:
      "I provide regular updates via email, Slack, or your preferred channel. Weekly standups, demo links, and transparent timelines ensure clear communication throughout.",
    category: "Services",
    sortOrder: 14
  },
  {
    _id: "faq-svelte-sveltekit",
    question: "Do you build with Svelte and SvelteKit?",
    answer:
      "Yes. I develop fast, lightweight Svelte applications and full-stack SvelteKit projects with stores, transitions, animations, and server-side rendering capabilities.",
    category: "Development",
    sortOrder: 15
  },
  {
    _id: "faq-api-development",
    question: "Can you build REST or GraphQL APIs?",
    answer:
      "Yes. I create scalable APIs using Node.js, Express, Next.js API routes, and headless architecture. I work with REST, GraphQL, WebSockets, and API documentation.",
    category: "Development",
    sortOrder: 16
  },
  {
    _id: "faq-accessibility-wcag",
    question: "Do you ensure WCAG accessibility compliance?",
    answer:
      "Yes. I implement semantic HTML, ARIA labels, keyboard navigation, screen reader support, color contrast, and WCAG 2.1 AA compliance across all projects.",
    category: "Development",
    sortOrder: 17
  },
  {
    _id: "faq-deployment-hosting",
    question: "What hosting and deployment platforms do you support?",
    answer:
      "I deploy to Vercel, Netlify, AWS, DigitalOcean, Heroku, and custom servers. I set up CI/CD pipelines, environment configurations, and automatic deployments.",
    category: "Development",
    sortOrder: 18
  },
  {
    _id: "faq-testing-qa",
    question: "Do you include testing in your development process?",
    answer:
      "Yes. I use Jest, Vitest, React Testing Library, Playwright, and other tools for unit testing, integration testing, and end-to-end testing coverage.",
    category: "Development",
    sortOrder: 19
  },
  {
    _id: "faq-database-backends",
    question: "Which databases and backend technologies do you use?",
    answer:
      "I work with PostgreSQL, MongoDB, Firebase, Supabase, MySQL, Redis, and various backend services. I design scalable database schemas and API architectures.",
    category: "Development",
    sortOrder: 20
  },
  {
    _id: "faq-builder-cms-tools",
    question: "Do you work with page builders like Builder.io?",
    answer:
      "Yes. I integrate and customize page builders, visual CMS platforms, and no-code tools alongside traditional code. I combine flexibility with performance.",
    category: "Services",
    sortOrder: 21
  },
  {
    _id: "faq-scalability-growth",
    question: "Can you build scalable applications for growing businesses?",
    answer:
      "Absolutely. I architect scalable solutions with proper state management, database optimization, caching strategies, and load handling for thousands of users.",
    category: "Development",
    sortOrder: 22
  },
  {
    _id: "faq-analytics-tracking",
    question: "Do you implement analytics and user tracking?",
    answer:
      "Yes. I set up Google Analytics, Mixpanel, Segment, custom event tracking, A/B testing infrastructure, and privacy-compliant analytics implementations.",
    category: "Development",
    sortOrder: 23
  },
  {
    _id: "faq-security-auth",
    question: "How do you handle authentication and security?",
    answer:
      "I implement OAuth2, JWT, NextAuth.js, role-based access control, encryption, secure headers, CORS policies, and OWASP security best practices.",
    category: "Development",
    sortOrder: 24
  },
  {
    _id: "faq-tailwind-css-framework",
    question: "Do you use Tailwind CSS and modern CSS frameworks?",
    answer:
      "Yes. I build responsive UIs with Tailwind CSS, CSS Modules, Styled Components, and other modern CSS solutions with proper theming and design system implementation.",
    category: "Development",
    sortOrder: 25
  }
];

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: "testimonial-vercel-domain-greg",
    clientName: "Greg M.",
    clientRoleCompany: "Vercel deployment and domain connection · March 27, 2026",
    text: "Fantastic job done, knows Vercel VERY well. Was readily available within minutes of requesting the work, would HIGHLY recommend Muhammad!!!!",
    rating: 5,
    project: {
      title: "Fix Vercel Deployment Error (Next.js Site) + Domain Connection Issue",
      slug: "vercel-deployment-domain-connection"
    }
  },
  {
    _id: "testimonial-react-ui-tayyab",
    clientName: "Tayyab I.",
    clientRoleCompany: "Frontend React Js Issues · September 7, 2024",
    text: "M. Zohaib exceeded our expectations by quickly fixing React UI issues and enhancing the user experience. His ability to rebuild and improve the UI was outstanding.",
    rating: 5,
    project: {
      title: "Frontend React Js Issues",
      slug: "frontend-react-js-issues"
    }
  },
  {
    _id: "testimonial-svelte-ui",
    clientName: "Janne Halttu",
    clientRoleCompany: "Frontend Svelte UI · August 25, 2024",
    text: "Got what asked =)",
    rating: 5,
    project: {
      title: "Frontend Svelte UI",
      slug: "frontend-svelte-ui"
    }
  },
  {
    _id: "testimonial-website-ui-issues",
    clientName: "Janne Halttu",
    clientRoleCompany: "Website UI issues · August 22, 2024",
    text: "Recommend this guy. Sometimes busy, but when free he is worth it.",
    rating: 5
  }
];

export const fallbackHomePageData: HomePageData = {
  settings: fallbackSettings,
  services: fallbackServices,
  projects: fallbackProjects,
  posts: fallbackPosts,
  faqs: fallbackFaqs,
  testimonials: fallbackTestimonials
};
