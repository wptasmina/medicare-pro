import { NextRequest, NextResponse } from "next/server";

interface User {
  role: string;
  [key: string]: unknown;
}

export function middleware(request: NextRequest): NextResponse {
  const token = request.cookies.get("token");
  const userCookie = request.cookies.get("user");

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
    url.search = "";
    return NextResponse.redirect(url);
  }

  // If accessing /dashboard, redirect based on role
  if (request.nextUrl.pathname === "/dashboard" && userCookie) {
    try {
      const user: User = JSON.parse(userCookie.value); // Always use .value to get the string
      if (user.role === "super_admin") {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      }
      if (user.role === "doctor") {
        return NextResponse.redirect(new URL("/dashboard/doctor", request.url));
      }
      // Add more roles as needed
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // If parsing fails, redirect to signin
      const url = request.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|signup|signin).*)"],
};