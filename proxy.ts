import { type NextRequest, NextResponse } from "next/server";

function setSecurityHeaders(response: NextResponse) {
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'self' https://sanity.io https://*.sanity.io"
  );

  return response;
}

export function proxy(request: NextRequest) {
  const isRootPath = request.nextUrl.pathname === "/";
  const isIframeRequest = request.headers.get("sec-fetch-dest") === "iframe";
  const referrer = request.headers.get("referer") || "";
  const isFromSanity = /https:\/\/([a-z0-9-]+\.)?sanity\.io/i.test(referrer);

  if (isRootPath && isIframeRequest && isFromSanity) {
    return setSecurityHeaders(
      NextResponse.redirect(new URL("/studio", request.url))
    );
  }

  const response = NextResponse.next();
  setSecurityHeaders(response);

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
};
