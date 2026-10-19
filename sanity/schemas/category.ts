import { defineArrayMember, defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "introParagraphs", title: "Topic introduction paragraphs", type: "array", of: [defineArrayMember({ type: "text" })] }),
    defineField({ name: "recommendedServiceSlugs", title: "Recommended service slugs", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "featuredPostSlugs", title: "Start-here article slugs", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description"
    }
  }
});
