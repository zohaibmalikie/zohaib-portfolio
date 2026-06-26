import { defineArrayMember, defineField, defineType } from "sanity";

type SeoValidationValue = {
  metaTitle?: string;
  title?: string;
  metaDescription?: string;
  description?: string;
  focusKeyword?: string;
};

function getSeoValidationValue(value?: unknown) {
  if (!value || typeof value !== "object") return {};
  return value as SeoValidationValue;
}

function isPortableTextEmpty(value?: unknown[]) {
  return !Array.isArray(value) || value.length === 0;
}

export const post = defineType({
  name: "post",
  title: "Blog article",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "taxonomy", title: "Taxonomy" },
    { name: "seo", title: "SEO" },
    { name: "automation", title: "Automation" }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "The public article headline.",
      validation: (Rule) => Rule.required().max(100)
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description:
        "The URL segment for this article. Generate from the title, then keep it stable after publishing.",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (slug, context) => context.defaultIsUnique(slug, context)
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "Short public summary used on blog cards, metadata fallbacks, and social previews.",
      validation: (Rule) => Rule.required().max(220)
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      group: "content",
      description:
        "Featured image used at the top of the article, in blog cards, and as the fallback social image.",
      options: { hotspot: true },
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value?.asset?._ref) {
            return "Featured image is required.";
          }

          return true;
        }),
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "content",
      description: "The credited writer shown on the article page.",
      to: [{ type: "author" }],
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value?._ref) {
            return "Author is required.";
          }

          return true;
        })
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "taxonomy",
      description: "Primary category used for filtering and related posts.",
      to: [{ type: "category" }],
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value?._ref) {
            return "Category is required.";
          }

          return true;
        })
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "taxonomy",
      description: "Optional topic tags used for article filters and related posts.",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" }
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      group: "content",
      description:
        "Public display date. Keep this aligned with the original publish date for existing articles.",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "updatedAt",
      title: "Updated date",
      type: "datetime",
      group: "content",
      description: "Optional public updated date shown in metadata."
    }),
    defineField({
      name: "firstPublishedAt",
      title: "First published at",
      type: "datetime",
      group: "automation",
      readOnly: true,
      description:
        "Automation-owned timestamp set only once when the article is first published."
    }),
    defineField({
      name: "readingTime",
      title: "Reading time",
      type: "number",
      group: "automation",
      readOnly: true,
      description:
        "Automation-owned estimate in minutes, calculated from article body at about 200 words per minute.",
      validation: (Rule) => Rule.min(1).max(120)
    }),
    defineField({
      name: "featured",
      title: "Featured article",
      type: "boolean",
      group: "content",
      description: "Feature this article in highlighted blog sections.",
      initialValue: false
    }),
    defineField({
      name: "body",
      title: "Portable Text content",
      type: "array",
      group: "content",
      description:
        "Main article content. Add headings, lists, links, and inline images here.",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (isPortableTextEmpty(value)) {
            return "Body content is required.";
          }

          return true;
        }),
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" }
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" }
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" }
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) => Rule.required()
                  })
                ]
              }
            ]
          }
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string"
            })
          ]
        })
      ]
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      description:
        "Search metadata. Meta title, meta description, and focus keyword are required.",
      validation: (Rule) =>
        Rule.custom((value) => {
          const seo = getSeoValidationValue(value);

          if (!seo.metaTitle && !seo.title) {
            return "SEO meta title is required.";
          }

          if (!seo.metaDescription && !seo.description) {
            return "SEO meta description is required.";
          }

          if (!seo.focusKeyword) {
            return "Focus keyword is required.";
          }

          return true;
        })
    })
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      media: "mainImage",
      publishedAt: "publishedAt"
    },
    prepare({ title, slug, media, publishedAt }) {
      const dateLabel = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : "No date";

      return {
        title: title || "Untitled article",
        subtitle: [slug ? `/${slug}` : "No slug", dateLabel].join(" | "),
        media
      };
    }
  }
});
