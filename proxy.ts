import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "auth_token";

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1. Define protected routes
  const isProtected =
    path.startsWith("/dashboard") || path.startsWith("/admin");

  if (isProtected) {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    // 2. If NO cookie at all, redirect to login
    if (!token) {
      console.log("No token found, redirecting to login...");
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("from", path);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Ensure this matches your folder structure exactly
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
