import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

type WebhookPayload = {
  _id?: string;
  _type?: string;
  title?: string;
  slug?: string | { current?: string };
  workflowStatus?: string;
};

function getSlug(slug?: WebhookPayload["slug"]) {
  if (!slug) return undefined;
  if (typeof slug === "string") return slug;
  return slug.current;
}

function getPathsForPayload(type?: string, slug?: string) {
  const paths = new Set<string>();

  if (type === "post") {
    paths.add("/");
    paths.add("/blog");
    if (slug) paths.add(`/blog/${slug}`);
  }

  if (type === "project") {
    paths.add("/work");
    if (slug) paths.add(`/work/${slug}`);
  }

  if (type === "service" || type === "faq" || type === "testimonial") {
    paths.add("/");
  }

  if (type === "siteSettings") {
    paths.add("/");
    paths.add("/blog");
    paths.add("/work");
  }

  return Array.from(paths);
}

function getTagsForPayload(type?: string, slug?: string) {
  const tags = new Set<string>(["sitemap"]);

  if (type === "post") {
    tags.add("posts");
    if (slug) tags.add(`post:${slug}`);
  } else if (type) {
    tags.add(type);
  }

  return Array.from(tags);
}

async function isAuthorized(request: NextRequest, body: string, secret: string) {
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);

  if (signature) {
    return isValidSignature(body, signature, secret);
  }

  const querySecret = request.nextUrl.searchParams.get("secret");
  const headerSecret = request.headers.get("x-revalidate-secret");
  return querySecret === secret || headerSecret === secret;
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { revalidated: false, message: "Revalidation is not configured." },
      { status: 500 }
    );
  }

  try {
    const body = await request.text();
    const authorized = await isAuthorized(request, body, secret);

    if (!authorized) {
      return NextResponse.json(
        { revalidated: false, message: "Unauthorized revalidation request." },
        { status: 401 }
      );
    }

    let payload: WebhookPayload = {};

    try {
      payload = body ? (JSON.parse(body) as WebhookPayload) : {};
    } catch {
      return NextResponse.json(
        { revalidated: false, message: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const type = payload._type;
    const slug = getSlug(payload.slug);
    const paths = getPathsForPayload(type, slug);
    const tags = getTagsForPayload(type, slug);

    for (const tag of tags) {
      revalidateTag(tag, "max");
    }

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      documentId: payload._id,
      type,
      slug,
      workflowStatus: payload.workflowStatus,
      paths,
      tags
    });
  } catch {
    return NextResponse.json(
      { revalidated: false, message: "Revalidation failed." },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { revalidated: false, message: "Use POST for Sanity revalidation webhooks." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
