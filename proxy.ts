import { type NextRequest, NextResponse } from "next/server";

const sanityFrameAncestors =
  "frame-ancestors 'self' https://www.sanity.io https://sanity.io https://*.sanity.io;";

function isStudioRoute(pathname: string) {
  return pathname === "/studio" || pathname.startsWith("/studio/");
}

function isPresentationPreviewRoute(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/blog" ||
    pathname.startsWith("/blog/") ||
    pathname === "/work" ||
    pathname.startsWith("/work/")
  );
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sanityFrameableRoute =
    isStudioRoute(pathname) || isPresentationPreviewRoute(pathname);

  const response = NextResponse.next();

  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );

  if (sanityFrameableRoute) {
    // Sanity Dashboard frames Studio and Presentation preview routes.
    response.headers.set("Content-Security-Policy", sanityFrameAncestors);

    response.headers.delete("X-Frame-Options");
  } else {
    // Non-preview public pages keep stricter iframe protection.
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
    response.headers.set("Content-Security-Policy", "frame-ancestors 'self';");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
