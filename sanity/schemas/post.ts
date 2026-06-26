import { defineArrayMember, defineField, defineType } from "sanity";

const publishReadyStatuses = ["approved", "scheduled", "published"];

type WorkflowDocument = {
  workflowStatus?: unknown;
};

type SeoValidationValue = {
  metaTitle?: string;
  title?: string;
  metaDescription?: string;
  description?: string;
  focusKeyword?: string;
};

function getWorkflowStatus(document?: unknown) {
  if (!document || typeof document !== "object" || !("workflowStatus" in document)) {
    return undefined;
  }

  const { workflowStatus } = document as WorkflowDocument;
  return typeof workflowStatus === "string" ? workflowStatus : undefined;
}

function requiresPublishReadyFields(document?: unknown) {
  const workflowStatus = getWorkflowStatus(document);
  return workflowStatus ? publishReadyStatuses.includes(workflowStatus) : false;
}

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
    { name: "workflow", title: "Workflow" },
    { name: "social", title: "Social Sharing" },
    { name: "automation", title: "Automation" }
  ],
  fields: [
    defineField({
      name: "workflowStatus",
      title: "Workflow status",
      type: "string",
      group: "workflow",
      description:
        "Move the article through editorial review. Approved, scheduled, and published articles must pass all required publishing fields.",
      initialValue: "draft",
      options: {
        layout: "radio",
        list: [
          { title: "Draft", value: "draft" },
          { title: "In review", value: "inReview" },
          { title: "Approved", value: "approved" },
          { title: "Scheduled", value: "scheduled" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "The public article headline.",
      validation: (Rule) =>
        Rule.max(100).custom((value, context) => {
          if (requiresPublishReadyFields(context.document) && !value) {
            return "Title is required before approval, scheduling, or publishing.";
          }

          return true;
        })
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
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (requiresPublishReadyFields(context.document) && !value?.current) {
            return "Slug is required before approval, scheduling, or publishing.";
          }

          return true;
        })
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "Short public summary used on blog cards, metadata fallbacks, and social previews.",
      validation: (Rule) =>
        Rule.max(220).custom((value, context) => {
          if (requiresPublishReadyFields(context.document) && !value) {
            return "Excerpt is required before approval, scheduling, or publishing.";
          }

          return true;
        })
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
        Rule.custom((value, context) => {
          if (requiresPublishReadyFields(context.document) && !value?.asset?._ref) {
            return "Featured image is required before approval, scheduling, or publishing.";
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
        Rule.custom((value, context) => {
          if (requiresPublishReadyFields(context.document) && !value?._ref) {
            return "Author is required before approval, scheduling, or publishing.";
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
        Rule.custom((value, context) => {
          if (requiresPublishReadyFields(context.document) && !value?._ref) {
            return "Category is required before approval, scheduling, or publishing.";
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
      group: "workflow",
      description:
        "Public display date. Keep this aligned with the original publish date for existing articles.",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "updatedAt",
      title: "Updated date",
      type: "datetime",
      group: "workflow",
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
      name: "scheduledAt",
      title: "Scheduled publish date",
      type: "datetime",
      group: "workflow",
      description:
        "Required when Workflow status is Scheduled. Future scheduled posts stay hidden on the public site.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (getWorkflowStatus(context.document) === "scheduled" && !value) {
            return "Scheduled publish date is required for scheduled articles.";
          }

          return true;
        })
    }),
    defineField({
      name: "lastReviewedAt",
      title: "Last reviewed at",
      type: "datetime",
      group: "workflow",
      description:
        "Date this article was last editorially reviewed for accuracy."
    }),
    defineField({
      name: "reviewedBy",
      title: "Reviewed by",
      type: "reference",
      group: "workflow",
      description: "Editor or author who last reviewed this article.",
      to: [{ type: "author" }]
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
        Rule.custom((value, context) => {
          if (requiresPublishReadyFields(context.document) && isPortableTextEmpty(value)) {
            return "Body content is required before approval, scheduling, or publishing.";
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
        "Search and social metadata. Meta title, meta description, and focus keyword are required before approval or publishing.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!requiresPublishReadyFields(context.document)) return true;
          const seo = getSeoValidationValue(value);

          if (!seo.metaTitle && !seo.title) {
            return "SEO meta title is required before approval, scheduling, or publishing.";
          }

          if (!seo.metaDescription && !seo.description) {
            return "SEO meta description is required before approval, scheduling, or publishing.";
          }

          if (!seo.focusKeyword) {
            return "Focus keyword is required before approval, scheduling, or publishing.";
          }

          return true;
        })
    }),
    defineField({
      name: "socialShareTitle",
      title: "Social share title",
      type: "string",
      group: "social",
      description:
        "Optional title for manual or automated social posts. Leave blank to reuse the article title.",
      validation: (Rule) => Rule.max(90)
    }),
    defineField({
      name: "socialShareDescription",
      title: "Social share description",
      type: "text",
      rows: 3,
      group: "social",
      description:
        "Optional social summary for manual or automated sharing. Leave blank to reuse the excerpt.",
      validation: (Rule) => Rule.max(220)
    }),
    defineField({
      name: "socialPostStatus",
      title: "Social post status",
      type: "string",
      group: "social",
      description:
        "Preparation field for future n8n or webhook automation. It does not publish anything by itself.",
      initialValue: "notCreated",
      options: {
        layout: "radio",
        list: [
          { title: "Not created", value: "notCreated" },
          { title: "Draft created", value: "draftCreated" },
          { title: "Published", value: "published" }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "socialPlatforms",
      title: "Social platforms",
      type: "array",
      group: "social",
      description:
        "Platforms a future automation can target after the article is published.",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: [
              { title: "LinkedIn", value: "linkedin" },
              { title: "Facebook", value: "facebook" },
              { title: "Twitter/X", value: "twitterX" }
            ]
          }
        })
      ],
      options: { layout: "tags" }
    }),
    defineField({
      name: "socialPostText",
      title: "Social post text",
      type: "text",
      rows: 5,
      group: "social",
      description:
        "Optional draft copy that future n8n automation can send to social channels.",
      validation: (Rule) => Rule.max(1000)
    })
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      media: "mainImage",
      workflowStatus: "workflowStatus",
      publishedAt: "publishedAt",
      scheduledAt: "scheduledAt"
    },
    prepare({ title, slug, media, workflowStatus, publishedAt, scheduledAt }) {
      const status = workflowStatus || "draft";
      const date = scheduledAt || publishedAt;
      const dateLabel = date ? new Date(date).toLocaleDateString() : "No date";

      return {
        title: title || "Untitled article",
        subtitle: [slug ? `/${slug}` : "No slug", status, dateLabel].join(" | "),
        media
      };
    }
  }
});
