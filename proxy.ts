import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const isStudioRoute = request.nextUrl.pathname.startsWith("/studio");

  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  if (isStudioRoute) {
    response.headers.set(
      "Content-Security-Policy",
      "frame-ancestors 'self' https://sanity.io https://*.sanity.io"
    );
  } else {
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
};
