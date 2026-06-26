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
};

export type SeoFields = {
  title?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
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
  _id?: string;
  title: string;
  slug?: string;
  description?: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  workflowStatus?: "draft" | "inReview" | "approved" | "scheduled" | "published" | "archived";
  excerpt?: string;
  mainImage?: SanityImage;
  author?: Author;
  category?: Category;
  tags?: string[];
  publishedAt?: string;
  updatedAt?: string;
  firstPublishedAt?: string;
  scheduledAt?: string;
  lastReviewedAt?: string;
  reviewedBy?: Author;
  readingTime?: number;
  body?: PortableTextBlock[];
  seo?: SeoFields;
  featured?: boolean;
  socialShareTitle?: string;
  socialShareDescription?: string;
  socialPostStatus?: "notCreated" | "draftCreated" | "published";
  socialPlatforms?: Array<"linkedin" | "facebook" | "twitterX">;
  socialPostText?: string;
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
  name: string;
  logo?: SanityImage;
  profileImage?: SanityImage;
  heroHeadline?: string;
  heroDescription?: string;
  email?: string;
  socialLinks?: SocialLink[];
  upworkLink?: string;
  githubLink?: string;
  linkedinLink?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
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
