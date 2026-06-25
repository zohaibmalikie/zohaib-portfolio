import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Service title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "content",
      validation: (Rule) => Rule.required().max(320)
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      group: "content",
      description: "Short icon keyword used by the website, for example code, layout, speed, seo, commerce."
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "relatedTechnologies",
      title: "Related technologies",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" }
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description"
    }
  }
});
