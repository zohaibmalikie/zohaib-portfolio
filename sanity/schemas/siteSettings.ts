import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "hero", title: "Hero" },
    { name: "contact", title: "Contact" },
    { name: "seo", title: "SEO" }
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "brand",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "brand",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "profileImage",
      title: "Profile image",
      type: "image",
      group: "brand",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.max(120)
    }),
    defineField({
      name: "heroDescription",
      title: "Hero description",
      type: "text",
      rows: 4,
      group: "hero",
      validation: (Rule) => Rule.max(320)
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
      group: "contact"
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required()
            })
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "url"
            }
          }
        })
      ]
    }),
    defineField({
      name: "upworkLink",
      title: "Upwork link",
      type: "url",
      group: "contact"
    }),
    defineField({
      name: "githubLink",
      title: "GitHub link",
      type: "url",
      group: "contact"
    }),
    defineField({
      name: "linkedinLink",
      title: "LinkedIn link",
      type: "url",
      group: "contact"
    }),
    defineField({
      name: "defaultSeoTitle",
      title: "Default SEO title",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(70)
    }),
    defineField({
      name: "defaultSeoDescription",
      title: "Default SEO description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule) => Rule.max(180)
    }),
    defineField({
      name: "defaultOpenGraphImage",
      title: "Default Open Graph image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    })
  ],
  preview: {
    select: {
      title: "name",
      media: "logo"
    }
  }
});
