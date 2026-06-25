import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      description: "Recommended length: 45 to 60 characters.",
      validation: (Rule) => Rule.max(70)
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "text",
      rows: 3,
      description: "Recommended length: 120 to 160 characters.",
      validation: (Rule) => Rule.max(180)
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url"
    }),
    defineField({
      name: "openGraphImage",
      title: "Open Graph image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.max(140)
        })
      ]
    })
  ]
});
