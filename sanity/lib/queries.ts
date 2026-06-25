import { defineQuery } from "next-sanity";

const imageProjection = `
  ...,
  alt,
  caption,
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions
    }
  }
`;

const seoProjection = `
  seo {
    title,
    description,
    canonicalUrl,
    openGraphImage {
      ${imageProjection}
    }
  }
`;

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    name,
    logo { ${imageProjection} },
    profileImage { ${imageProjection} },
    heroHeadline,
    heroDescription,
    email,
    socialLinks[] {
      label,
      url
    },
    upworkLink,
    githubLink,
    linkedinLink,
    defaultSeoTitle,
    defaultSeoDescription,
    defaultOpenGraphImage { ${imageProjection} }
  }
`);

export const POST_CARD_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage { ${imageProjection} },
  author->{
    _id,
    name,
    "slug": slug.current,
    image { ${imageProjection} },
    bio
  },
  category->{
    _id,
    title,
    "slug": slug.current,
    description
  },
  tags,
  publishedAt,
  updatedAt,
  readingTime,
  featured,
  ${seoProjection}
`;

export const POST_DETAIL_PROJECTION = `
  ${POST_CARD_PROJECTION},
  body
`;

export const PROJECT_CARD_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  mainImage { ${imageProjection} },
  screenshots[] { ${imageProjection} },
  techStack,
  servicesProvided,
  results,
  projectUrl,
  featured,
  ${seoProjection}
`;

export const PROJECT_DETAIL_PROJECTION = `
  ${PROJECT_CARD_PROJECTION},
  problem,
  solution
`;

export const SERVICE_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  description,
  icon,
  benefits,
  relatedTechnologies,
  ${seoProjection}
`;

export const HOME_QUERY = defineQuery(`
  {
    "settings": ${SITE_SETTINGS_QUERY},
    "services": *[_type == "service" && defined(slug.current)] | order(title asc)[0...8] {
      ${SERVICE_PROJECTION}
    },
    "projects": *[_type == "project" && defined(slug.current) && featured == true] | order(_updatedAt desc)[0...6] {
      ${PROJECT_CARD_PROJECTION}
    },
    "posts": *[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
      ${POST_CARD_PROJECTION}
    },
    "faqs": *[_type == "faq"] | order(sortOrder asc, _createdAt asc)[0...8] {
      _id,
      question,
      answer,
      category,
      sortOrder
    },
    "testimonials": *[_type == "testimonial"] | order(_createdAt desc)[0...6] {
      _id,
      clientName,
      clientRoleCompany,
      text,
      rating,
      project->{
        title,
        "slug": slug.current
      }
    }
  }
`);

export const POSTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    ($category == null || category->slug.current == $category) &&
    ($tag == null || $tag in tags[])
  ] | order(coalesce(publishedAt, _createdAt) desc) {
    ${POST_CARD_PROJECTION}
  }
`);

export const FEATURED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && featured == true] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
    ${POST_CARD_PROJECTION}
  }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_DETAIL_PROJECTION}
  }
`);

export const RELATED_POSTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    slug.current != $slug &&
    defined(slug.current) &&
    (
      category->slug.current == $category ||
      count((tags[])[@ in $tags]) > 0
    )
  ] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
    ${POST_CARD_PROJECTION}
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(featured desc, _updatedAt desc) {
    ${PROJECT_CARD_PROJECTION}
  }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ${PROJECT_DETAIL_PROJECTION}
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`);
