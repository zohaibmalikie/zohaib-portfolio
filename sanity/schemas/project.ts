import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Case study",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "story", title: "Story" },
    { name: "seo", title: "SEO" }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Project title",
      type: "string",
      group: "overview",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "overview",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "overview",
      validation: (Rule) => Rule.required().max(240)
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      group: "overview",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required()
        })
      ]
    }),
    defineField({
      name: "screenshots",
      title: "Screenshots",
      type: "array",
      group: "overview",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (Rule) => Rule.required()
            })
          ]
        })
      ]
    }),
    defineField({
      name: "problem",
      title: "Problem",
      type: "array",
      group: "story",
      of: [defineArrayMember({ type: "block" })]
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "array",
      group: "story",
      of: [defineArrayMember({ type: "block" })]
    }),
    defineField({
      name: "techStack",
      title: "Tech stack",
      type: "array",
      group: "overview",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" }
    }),
    defineField({
      name: "servicesProvided",
      title: "Services provided",
      type: "array",
      group: "overview",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" }
    }),
    defineField({
      name: "results",
      title: "Results and outcomes",
      type: "array",
      group: "story",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "projectUrl",
      title: "Project URL",
      type: "url",
      group: "overview"
    }),
    defineField({
      name: "featured",
      title: "Featured project",
      type: "boolean",
      group: "overview",
      initialValue: false
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
      subtitle: "shortDescription",
      media: "mainImage"
    }
  }
});
