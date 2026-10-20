import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  asset?: {
    _id?: string;
    _ref?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
  alt?: string;
  caption?: string;
  creditName?: string;
  creditUrl?: string;
  licenseUrl?: string;
};

export type SeoFields = {
  title?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  keywords?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImage;
  openGraphImage?: SanityImage;
};

export type Author = {
  _id?: string;
  name: string;
  slug?: string;
  image?: SanityImage;
  bio?: string;
};

export type Category = {
  introParagraphs?: string[];
  recommendedServiceSlugs?: string[];
  featuredPostSlugs?: string[];
  _id?: string;
  title: string;
  slug?: string;
  description?: string;
};

export type ArticleFaq = { question: string; answer: string };
export type ArticleVisualStep = { title: string; description: string };

export type Post = {
  useOriginalImage?: boolean;
  faqs?: ArticleFaq[];
  visualSteps?: ArticleVisualStep[];
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImage;
  author?: Author;
  category?: Category;
  tags?: string[];
  publishedAt?: string;
  updatedAt?: string;
  firstPublishedAt?: string;
  readingTime?: number;
  body?: PortableTextBlock[];
  seo?: SeoFields;
  featured?: boolean;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  projectDate?: string;
  mainImage?: SanityImage;
  screenshots?: SanityImage[];
  problem?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  techStack?: string[];
  servicesProvided?: string[];
  results?: string[];
  projectUrl?: string;
  featured?: boolean;
  seo?: SeoFields;
};

export type Service = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  headline?: string;
  audience?: string;
  overview?: string[];
  deliverables?: string[];
  process?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  relatedPostSlugs?: string[];
  relatedProjectSlugs?: string[];
  relatedServiceSlugs?: string[];
  offerLabel?: string;
  priceRange?: string;
  priceNote?: string;
  icon?: string;
  benefits?: string[];
  relatedTechnologies?: string[];
  seo?: SeoFields;
};

export type Faq = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  sortOrder?: number;
};

export type Testimonial = {
  _id: string;
  clientName: string;
  clientRoleCompany?: string;
  text: string;
  rating?: number;
  project?: Pick<Project, "title" | "slug">;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type SiteSettings = {
  remoteCollaboration?: { heading?: string; description?: string; faqs?: ArticleFaq[] };
  name: string;
  logo?: SanityImage;
  profileImage?: SanityImage;
  heroHeadline?: string;
  professionalHeadline?: string;
  professionalSummary?: string;
  conversionHeadline?: string;
  conversionDescription?: string;
  heroDescription?: string;
  email?: string;
  socialLinks?: SocialLink[];
  upworkLink?: string;
  githubLink?: string;
  linkedinLink?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultSeoKeywords?: string[];
  defaultOpenGraphImage?: SanityImage;
};

export type HomePageData = {
  settings: SiteSettings;
  posts: Post[];
  projects: Project[];
  services: Service[];
  faqs: Faq[];
  testimonials: Testimonial[];
};
