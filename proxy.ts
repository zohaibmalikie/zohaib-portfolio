import { type NextRequest, NextResponse } from "next/server";

function isStudioRoute(pathname: string) {
  return pathname === "/studio" || pathname.startsWith("/studio/");
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const studioRoute = isStudioRoute(pathname);

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

  if (studioRoute) {
    // Sanity Dashboard frames /studio, so this route must allow Sanity origins.
    response.headers.set(
      "Content-Security-Policy",
      "frame-ancestors 'self' https://www.sanity.io https://sanity.io https://*.sanity.io;"
    );

    response.headers.delete("X-Frame-Options");
  } else {
    // Public pages keep the stricter iframe protection.
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
