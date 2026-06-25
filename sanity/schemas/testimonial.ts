import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  description: "Only add real testimonials from real clients.",
  fields: [
    defineField({
      name: "clientName",
      title: "Client name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "clientRoleCompany",
      title: "Client role/company",
      type: "string"
    }),
    defineField({
      name: "text",
      title: "Testimonial text",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5)
    }),
    defineField({
      name: "project",
      title: "Project relation",
      type: "reference",
      to: [{ type: "project" }]
    })
  ],
  preview: {
    select: {
      title: "clientName",
      subtitle: "clientRoleCompany"
    }
  }
});
