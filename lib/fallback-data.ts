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
  name: "Zohaib Ramzan",
  profileImage: localImage(
    "/assets/img/zohaib-profile-portrait.png",
    "Zohaib Ramzan portrait"
  ),
  defaultOpenGraphImage: localImage(
    "/assets/img/zohaib-profile-portrait.png",
    "Zohaib Ramzan portrait"
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
    "Zohaib Ramzan | Senior Frontend Developer and AI Automation Expert",
  defaultSeoDescription:
    "Portfolio of Zohaib Ramzan, a senior frontend developer and AI automation expert specializing in Next.js, React, SvelteKit, Sanity CMS, integrations, and AI-native web products."
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
    _id: "project-upwork-saas-frontends",
    title: "Upwork SaaS Frontend Projects",
    slug: "upwork-saas-frontends",
    shortDescription:
      "A public Upwork profile-backed case study highlighting React, Next.js, Svelte, TypeScript, SaaS frontend work, and AI-powered product delivery.",
    mainImage: localImage(
      "/assets/img/zohaib-profile-portrait.png",
      "Zohaib Ramzan portrait"
    ),
    problem: paragraphBlock(
      "upwork-problem",
      "Clients on Upwork need dependable frontend and AI-native engineering for modern SaaS products: responsive interfaces, maintainable React and Next.js code, TypeScript reliability, AI integrations, and clean delivery across production workflows."
    ),
    solution: paragraphBlock(
      "upwork-solution",
      "The Upwork profile positions Zohaib as a Senior React and Next.js developer working with Svelte, TypeScript, and SaaS products, with public marketplace proof points that include Top Rated Plus status, 97% Job Success, 16 total jobs, and 1.6K total hours."
    ),
    techStack: [
      "React",
      "Next.js",
      "Svelte",
      "TypeScript",
      "SaaS Products",
      "AI Workflows"
    ],
    servicesProvided: [
      "SaaS frontend development",
      "React and Next.js implementation",
      "TypeScript UI engineering",
      "Svelte frontend work",
      "AI automation and integration planning"
    ],
    results: [
      "97% Job Success on Upwork",
      "Top Rated Plus marketplace status",
      "5.0 rating from public profile reviews",
      "16 total jobs and 1.6K total hours shown on Upwork"
    ],
    projectUrl: "https://www.upwork.com/freelancers/zohaibramzan",
    featured: true,
    seo: {
      title: "Upwork SaaS Frontend and AI Automation Case Study",
      description:
        "Upwork profile-backed case study for Zohaib Ramzan's React, Next.js, Svelte, TypeScript, SaaS frontend, and AI automation work."
    }
  },
  {
    _id: "project-grobal",
    title: "Grobal",
    slug: "grobal",
    shortDescription:
      "A service marketplace where buyers can discover providers and providers can publish their services.",
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
      name: "Zohaib Ramzan",
      slug: "zohaib-ramzan",
      image: localImage(
        "/assets/img/zohaib-profile-portrait.png",
        "Zohaib Ramzan portrait"
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
  }
];

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: "testimonial-upwork-marya",
    clientName: "Marya A.",
    clientRoleCompany: "Upwork client",
    text: "\"excellent job\" on a React and TypeScript structure, with a clear note that they would work with him again.",
    rating: 5
  },
  {
    _id: "testimonial-upwork-heer",
    clientName: "Heer B.",
    clientRoleCompany: "Upwork client",
    text: "\"You are true expert.\" The client said the React/Next work matched what they wanted and they were happy with the result.",
    rating: 5
  },
  {
    _id: "testimonial-upwork-sharn",
    clientName: "Sharn C.",
    clientRoleCompany: "Upwork client",
    text: "\"This guy is a rockstar!!!\" The client highlighted availability, helpful React support, humility, and willingness to collaborate again.",
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
