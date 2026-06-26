import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Legacy SEO title",
      type: "string",
      description: "Deprecated fallback. Use Meta title for new blog content.",
      validation: (Rule) => Rule.max(70)
    }),
    defineField({
      name: "description",
      title: "Legacy SEO description",
      type: "text",
      rows: 3,
      description: "Deprecated fallback. Use Meta description for new blog content.",
      validation: (Rule) => Rule.max(180)
    }),
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description:
        "The title shown in search results. Keep it focused and under 60 characters.",
      validation: (Rule) =>
        Rule.max(60).warning("Search titles usually truncate after about 60 characters.")
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description:
        "The search result summary. Aim for 120-160 characters and include the focus keyword naturally.",
      validation: (Rule) =>
        Rule.max(160).warning("Search descriptions usually truncate after about 155-160 characters.")
    }),
    defineField({
      name: "focusKeyword",
      title: "Focus keyword",
      type: "string",
      description: "The main search phrase this article should target."
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Optional. Use only when this article should point search engines to a different canonical URL."
    }),
    defineField({
      name: "noIndex",
      title: "No index",
      type: "boolean",
      description:
        "Turn on only when this article should not appear in search engines.",
      initialValue: false
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph title",
      type: "string",
      description:
        "Optional social sharing title. Leave blank to reuse the meta title or article title.",
      validation: (Rule) => Rule.max(90)
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph description",
      type: "text",
      rows: 3,
      description:
        "Optional social sharing description. Leave blank to reuse the meta description or excerpt.",
      validation: (Rule) => Rule.max(200)
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      description:
        "Optional social sharing image. Use a 1200x630 image when available.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.max(140)
        })
      ]
    }),
    defineField({
      name: "openGraphImage",
      title: "Legacy Open Graph image",
      type: "image",
      description: "Deprecated fallback. Use Open Graph image for new blog content.",
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
