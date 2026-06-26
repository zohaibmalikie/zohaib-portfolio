import { type NextRequest, NextResponse } from "next/server";

function isStudioPath(pathname: string) {
  return pathname === "/studio" || pathname.startsWith("/studio/");
}

function setSecurityHeaders(response: NextResponse, isStudioRoute: boolean) {
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

  if (isStudioRoute) {
    /**
     * Sanity Dashboard loads /studio inside an iframe.
     * So /studio must allow Sanity domains as frame ancestors.
     */
    response.headers.set(
      "Content-Security-Policy",
      "frame-ancestors 'self' https://www.sanity.io https://sanity.io https://*.sanity.io;"
    );

    /**
     * Do not send X-Frame-Options for /studio.
     * X-Frame-Options: SAMEORIGIN blocks Sanity Dashboard iframe loading.
     */
    response.headers.delete("X-Frame-Options");
  } else {
    /**
     * Keep normal clickjacking protection for the public website.
     */
    response.headers.set("X-Frame-Options", "SAMEORIGIN");

    response.headers.set(
      "Content-Security-Policy",
      "frame-ancestors 'self';"
    );
  }

  return response;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const studioRoute = isStudioPath(pathname);

  const response = NextResponse.next();

  return setSecurityHeaders(response, studioRoute);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
