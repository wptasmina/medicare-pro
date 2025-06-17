import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = localStorage.getItem("token");

  // Allow access to /signin and static files
  if (
    request.nextUrl.pathname === "/signin" ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Redirect to /signin if not authenticated
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    url.search = ""; // Optional: remove query params
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Match all routes except:
      - /_next (Next.js internals)
      - /favicon.ico
      - /signin
    */
    "/((?!_next/|favicon.ico|signin).*)",
  ],
};