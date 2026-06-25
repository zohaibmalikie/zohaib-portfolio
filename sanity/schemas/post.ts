import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog article",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "taxonomy", title: "Taxonomy" },
    { name: "seo", title: "SEO" }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(100)
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(220)
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      group: "content",
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
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "taxonomy",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "taxonomy",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" }
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "updatedAt",
      title: "Updated date",
      type: "datetime",
      group: "content"
    }),
    defineField({
      name: "readingTime",
      title: "Reading time",
      type: "number",
      group: "content",
      description: "Optional manual override in minutes. The website falls back to an estimate.",
      validation: (Rule) => Rule.min(1).max(120)
    }),
    defineField({
      name: "featured",
      title: "Featured article",
      type: "boolean",
      group: "content",
      initialValue: false
    }),
    defineField({
      name: "body",
      title: "Portable Text content",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.required(),
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
      group: "seo"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "mainImage"
    }
  }
});
