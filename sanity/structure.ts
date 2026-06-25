import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Muhammad Zohaib Ramzan Portfolio CMS")
    .items([
      S.listItem()
        .title("Content")
        .child(
          S.list()
            .title("Content")
            .items([
              S.documentTypeListItem("post").title("Blog articles"),
              S.documentTypeListItem("author").title("Authors"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("faq").title("FAQs"),
              S.documentTypeListItem("testimonial").title("Testimonials")
            ])
        ),
      S.listItem()
        .title("Portfolio")
        .child(
          S.list()
            .title("Portfolio")
            .items([S.documentTypeListItem("project").title("Case studies")])
        ),
      S.listItem()
        .title("Services")
        .child(
          S.list()
            .title("Services")
            .items([S.documentTypeListItem("service").title("Services")])
        ),
      S.listItem()
        .title("SEO")
        .child(
          S.list()
            .title("SEO")
            .items([
              S.listItem()
                .title("Default SEO")
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("siteSettings")
                )
            ])
        ),
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        )
    ]);
