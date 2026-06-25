import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

type WebhookPayload = {
  _type?: string;
  slug?: string | { current?: string };
};

function getSlug(slug?: WebhookPayload["slug"]) {
  if (!slug) return undefined;
  if (typeof slug === "string") return slug;
  return slug.current;
}

function getPathsForPayload(type?: string, slug?: string) {
  const paths = new Set<string>(["/"]);

  if (type === "post") {
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
      { message: "Missing SANITY_REVALIDATE_SECRET." },
      { status: 500 }
    );
  }

  const body = await request.text();
  const authorized = await isAuthorized(request, body, secret);

  if (!authorized) {
    return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
  }

  let payload: WebhookPayload = {};

  try {
    payload = body ? (JSON.parse(body) as WebhookPayload) : {};
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const type = payload._type;
  const slug = getSlug(payload.slug);
  const paths = getPathsForPayload(type, slug);

  if (type) {
    revalidateTag(type, "max");
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    type,
    slug,
    paths
  });
}

export async function GET(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const querySecret = request.nextUrl.searchParams.get("secret");

  if (!secret || querySecret !== secret) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  ["/", "/blog", "/work"].forEach((path) => revalidatePath(path));
  ["siteSettings", "post", "project", "service", "faq", "testimonial"].forEach(
    (tag) => revalidateTag(tag, "max")
  );

  return NextResponse.json({
    revalidated: true,
    paths: ["/", "/blog", "/work"]
  });
}
