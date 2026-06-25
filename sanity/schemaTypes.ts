import { author } from "@/sanity/schemas/author";
import { category } from "@/sanity/schemas/category";
import { faq } from "@/sanity/schemas/faq";
import { post } from "@/sanity/schemas/post";
import { project } from "@/sanity/schemas/project";
import { seo } from "@/sanity/schemas/seo";
import { service } from "@/sanity/schemas/service";
import { siteSettings } from "@/sanity/schemas/siteSettings";
import { testimonial } from "@/sanity/schemas/testimonial";

export const schemaTypes = [
  post,
  project,
  service,
  author,
  category,
  faq,
  testimonial,
  siteSettings,
  seo
];
