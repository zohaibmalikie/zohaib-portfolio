import {
  defineLocations,
  type PresentationPluginOptions
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current"
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled article",
            href: doc?.slug ? `/blog/${doc.slug}` : "/blog"
          },
          { title: "Blog", href: "/blog" }
        ]
      })
    }),
    project: defineLocations({
      select: {
        title: "title",
        slug: "slug.current"
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled case study",
            href: doc?.slug ? `/work/${doc.slug}` : "/work"
          },
          { title: "Work", href: "/work" }
        ]
      })
    }),
    service: defineLocations({
      select: {
        title: "title"
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Service",
            href: "/#services"
          }
        ]
      })
    }),
    faq: defineLocations({
      select: {
        title: "question"
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "FAQ",
            href: "/#faqs"
          }
        ]
      })
    }),
    siteSettings: defineLocations({
      select: {
        title: "name"
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Homepage",
            href: "/"
          }
        ]
      })
    })
  }
};
