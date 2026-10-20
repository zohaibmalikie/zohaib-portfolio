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
    defineField({ name: "defaultSeoKeywords", title: "Homepage topic keywords", type: "array", group: "seo", of: [{ type: "string" }], options: { layout: "tags" }, description: "A few relevant homepage phrases. Google does not use the meta keywords tag for rankings.", validation: (Rule) => Rule.max(8) }),
    defineField({ name: "remoteCollaboration", title: "International collaboration", type: "object", group: "contact", fields: [
      defineField({ name: "heading", type: "string" }),
      defineField({ name: "description", type: "text", rows: 4 }),
      defineField({ name: "faqs", title: "Remote project FAQs", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "question", type: "string", validation: (Rule) => Rule.required() }), defineField({ name: "answer", type: "text", validation: (Rule) => Rule.required() })] })] })
    ] }),
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
    defineField({ name: "professionalHeadline", title: "Professional homepage H1", type: "string", group: "hero", initialValue: "Senior Next.js & SvelteKit Developer for SaaS and Ecommerce", description: "The main visible heading. Use an accurate role and client focus.", validation: (Rule) => Rule.max(120) }),
    defineField({ name: "professionalSummary", title: "Professional homepage introduction", type: "text", group: "hero", rows: 3, validation: (Rule) => Rule.max(320) }),
    defineField({ name: "conversionHeadline", group: "hero", title: "Homepage outcome headline", type: "string", description: "A short headline about the value for clients, rather than a list of technologies." }),
    defineField({ name: "conversionDescription", group: "hero", title: "Homepage client introduction", type: "text", rows: 3 }),
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
