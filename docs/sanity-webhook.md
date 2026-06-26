# Sanity Blog Automation Webhook

Use this webhook to refresh the Next.js blog after Sanity blog documents change.

## Endpoint

```text
https://yourdomain.com/api/revalidate?secret=YOUR_SECRET
```

Set the same secret in your deployment environment:

```text
SANITY_REVALIDATE_SECRET=YOUR_SECRET
```

The endpoint accepts `POST` requests only. It also supports Sanity webhook signatures when the webhook secret matches `SANITY_REVALIDATE_SECRET`.

## Trigger

Configure the webhook for blog article documents:

```groq
_type == "post"
```

Recommended document events:

- Create
- Update
- Delete
- Publish

## Projection

Use this projection so the revalidation endpoint can identify the changed blog page:

```groq
{
  "_id": _id,
  "_type": _type,
  "title": title,
  "slug": slug.current,
  "workflowStatus": workflowStatus
}
```

## What Gets Revalidated

For blog posts, the endpoint revalidates:

- `/`
- `/blog`
- `/blog/[slug]` when a slug is provided
- Cache tag `posts`
- Cache tag `post:[slug]` when a slug is provided
- Cache tag `sitemap`

## Scheduled Publishing

This project stores a `scheduledAt` field and hides future scheduled posts from public queries. Actual scheduling should be handled by Sanity Scheduled Drafts or Sanity Content Releases. When Sanity publishes the document at the scheduled time, this webhook refreshes the public site.

## Future n8n/Social Automation

The blog schema includes preparation fields for later automation:

- `socialPostStatus`
- `socialPlatforms`
- `socialPostText`
- `socialShareTitle`
- `socialShareDescription`

Do not connect n8n from this app yet. A future Sanity webhook can send published blog payloads to n8n when `workflowStatus == "published"` and `socialPostStatus == "notCreated"`.
